const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { createVerificationToken, sendVerificationEmail } = require("../utils/email");

const TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days — same as the JWT expiry

const createToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

// Sends the JWT as an httpOnly cookie so the browser attaches it automatically.
// httpOnly keeps it out of reach of JavaScript, which protects it from XSS.
const setTokenCookie = (res, token) => {
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
        httpOnly: true,
        secure: isProduction,                     // HTTPS only in production
        sameSite: isProduction ? "none" : "lax",  // "none" needs secure: true
        maxAge: TOKEN_MAX_AGE,
        path: "/",
    });
};

const register = async (req, res, next) => {
    try {
        // console.log(req.body, "body");

        const { name, email, password, role, phone, address } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email and password are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const isCustomer = role === "customer";

        const user = await User.create({
            name,
            email,
            password,
            role,
            phone,
            address,
            // ...(role === "admin" ? { isEmailVerified: true } : {}),
            // ...(!isCustomer ? { isEmailVerified: true } : {}),
            ...(isCustomer ? {} : { isEmailVerified: true })
        });


        if (req.body.role === "customer") {
            const verificationToken = createVerificationToken(user);
            user.emailVerificationToken = verificationToken;
            await user.save();

            const baseUrl = process.env.FRONTEND_URL || "http://localhost:3000";
            const verificationLink = `${baseUrl}/verify-email?token=${verificationToken}`;

            await sendVerificationEmail({
                to: user.email,
                name: user.name,
                verificationLink,
            });
        }

        return res.status(201).json({
            message: `User registered successfully.${isCustomer ? " Please verify your email to activate your account." : ""}`,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                ...(isCustomer ? { isEmailVerified: user.isEmailVerified } : {})
            },
        });
    } catch (error) {
        console.error(error.stack);
        if (error?.message.startsWith("E11000")) {
            return res.status(400).json({ message: "User already exists" });
        }
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        if (!user.isEmailVerified) {
            return res.status(403).json({ message: "Please verify your email before logging in" });
        }

        const token = createToken(user);

        setTokenCookie(res, token);

        return res.json({
            message: "Login successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isEmailVerified: user.isEmailVerified,
            },
        });
    } catch (error) {
        next(error);
    }
};

const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json(user);
    } catch (error) {
        next(error);
    }
};

const verifyEmail = async (req, res, next) => {
    try {
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({ message: "Verification token is required" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email: decoded.email, emailVerificationToken: token });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired verification token" });
        }

        user.isEmailVerified = true;
        user.emailVerificationToken = null;
        await user.save();

        return res.json({ message: "Email verified successfully" });
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(400).json({ message: "Verification token has expired" });
        }
        next(error);
    }
};

module.exports = {
    register,
    login,
    getMe,
    verifyEmail,
};