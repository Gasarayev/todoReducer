import React, { useReducer, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
  todo: "",
  error: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TODO":
      return { ...state, todo: action.payload, error: "" };
    case "ADD_TODO":
      if (!state.todo.trim()) {
        return { ...state, error: "err" };
      }
      return {
        ...state,
        todos: [...state.todos, { text: state.todo }],
        todo: "",
        error: ""
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((_, index) => index !== action.payload)
      };
    case "CLEAR_TODOS":
      return { ...state, todos: [] };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]);

  const submitHandle = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_TODO" });
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center mt-5">
      <h1 className="mb-4">Todo List</h1>
      <form onSubmit={submitHandle} className="w-100 mb-3">
        <div className="input-group">
          <input
            type="text"
            value={state.todo}
            onChange={(e) => dispatch({ type: "SET_TODO", payload: e.target.value })}
            className="form-control"
            placeholder="Add..."
          />
          <button className="btn btn-primary" disabled={!state.todo.trim()} type="submit">
            Add
          </button>
        </div>
        {state.error && <div className="text-danger mt-2">{state.error}</div>}
      </form>
      <ul className="list-group w-100">
        {state.todos.map((todo, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{todo.text}</span>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => dispatch({ type: "DELETE_TODO", payload: index })}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      {state.todos.length > 0 && (
        <button
          className="btn btn-warning mt-3"
          onClick={() => dispatch({ type: "CLEAR_TODOS" })}
        >
          Clear All
        </button>
      )}
    </div>
  );
}

export default App;
