import React, { useState, useReducer } from "react";

export const Todo = () => {
    return (
        <div style={styles.container}>
            <TodoWithUseState />
            <TodoWithUseReducer />
        </div>
    )
}

/* =========================
   1. TODO APP WITH useState
========================= */

function TodoWithUseState() {
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState([]);

    const addTodo = () => {
        if (!input.trim()) return;

        setTodos([
            ...todos,
            {
                id: Date.now(),
                text: input,
                completed: false,
            },
        ]);

        setInput("");
    };

    const toggleTodo = (id) => {
        setTodos(
            todos.map((todo) => {
                // console.log(todo, "todo", id);

                return todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            }
            )
        );
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => {
            console.log(todo, "todo", id);
            return todo.id !== id
        }));
    };

    // console.log(todos, "todos");

    return (
        <div style={styles.card}>
            <h2>Todo App with useState</h2>

            <div style={styles.row}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Add todo..."
                    style={styles.input}
                />
                <button onClick={addTodo}>Add</button>
            </div>

            {todos.map((todo) => (
                <div key={todo.id} style={styles.todo}>
                    <span
                        onClick={() => toggleTodo(todo.id)}
                        style={{
                            cursor: "pointer",
                            textDecoration: todo.completed
                                ? "line-through"
                                : "none",
                        }}
                    >
                        {todo.text} - {todo.id}
                    </span>

                    <button onClick={() => deleteTodo(todo.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

/* =========================
   2. TODO APP WITH useReducer
========================= */

function todoReducer(state, action) {
    console.log(state, action, "state, action");

    switch (action.type) {
        case "ADD":
            return [
                ...state,
                {
                    id: Date.now(),
                    text: action.payload,
                    completed: false,
                },
            ];

        case "TOGGLE":
            return state.map((todo) =>
                todo.id === action.payload
                    ? { ...todo, completed: !todo.completed }
                    : todo
            );

        case "DELETE":
            return state.filter((todo) => todo.id !== action.payload);

        default:
            return state;
    }
}


function TodoWithUseReducer() {
    const [input, setInput] = useState("");

    const [todos, dispatch] = useReducer(todoReducer, []);

console.log(todos, "todos");


    const addTodo = () => {
        if (!input.trim()) return;

        dispatch({
            type: "ADD",
            payload: input,
        });

        setInput("");
    };

    return (
        <div style={styles.card}>
            <h2>Todo App with useReducer</h2>

            <div style={styles.row}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Add todo..."
                    style={styles.input}
                />

                <button onClick={addTodo}>Add</button>
            </div>

            {todos.map((todo) => (
                <div key={todo.id} style={styles.todo}>
                    <span
                        onClick={() =>
                            dispatch({
                                type: "TOGGLE",
                                payload: todo.id,
                            })
                        }
                        style={{
                            cursor: "pointer",
                            textDecoration: todo.completed
                                ? "line-through"
                                : "none",
                        }}
                    >
                        {todo.text}
                    </span>

                    <button
                        onClick={() =>
                            dispatch({
                                type: "DELETE",
                                payload: todo.id,
                            })
                        }
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

/* =========================
   STYLES
========================= */

const styles = {
    container: {
        display: "flex",
        gap: "20px",
        padding: "20px",
        fontFamily: "Arial",
    },

    card: {
        flex: 1,
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        background: "#f9f9f9",
    },

    row: {
        display: "flex",
        gap: "10px",
        marginBottom: "20px",
    },

    input: {
        flex: 1,
        padding: "10px",
    },

    todo: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "10px",
        padding: "10px",
        background: "#fff",
        borderRadius: "5px",
    },
};