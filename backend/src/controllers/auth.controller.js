const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const createToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

const register = async (req, res) => {
    try {
        // console.log(req.body, "body");

        const { name, email, password, role, phone, address } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email and password are required" });
        }

        // const existingUser = await User.findOne({ email });
        // if (existingUser) {
        //     return res.status(400).json({ message: "User already exists" });
        // }

        const user = await User.create({
            name,
            email,
            password,
            role: role === "admin" ? "admin" : "customer",
            phone,
            address,
        });

        // const user = await User.create(req.body);

        // const token = createToken(user);

        return res.status(201).json({
            message: "User registered successfully",
            // token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error(error.stack);
        if (error?.message.startsWith("E11000")) {
            return res.status(400).json({ message: "User already exists" });
        }
        return res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user || !(await user.comparePassword(password))) {
            // if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = createToken(user);

        return res.json({
            message: "Login successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


module.exports = {
    register,
    login,
    getMe,
};