import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <h2>Loading users...</h2>;
    }

    return (
        <div className="users-container">
            {users.map((user) => (
                <div className="user-card" key={user.id}>
                    <h2>{user.name}</h2>
                    <p>
                        <strong>Username:</strong> {user.username}
                    </p>
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>

                    <button
                        onClick={() => navigate(`/users/${user.id}`,
                            {
                                // replace: true ,
                                state: user
                            }
                        )}
                        className="profile-btn"
                    >
                        View Profile
                    </button>
                </div>
            ))}
        </div>
    );
};