import React from "react";
import { Outlet, Link } from "react-router-dom";

export const UsersLayout = () => {
    return (
        <div>
            <h1>Users Section</h1>

            <nav>
                <Link to="/users">All Users</Link>
            </nav>

            <hr />

            {/* Nested Routes Render Here */}
            <Outlet />
        </div>
    );
};