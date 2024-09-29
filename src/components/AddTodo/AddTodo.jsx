import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  updateTodo,
  triggerUpdate,
} from "../../features/TodoFeatures/todoSlice";

function AddTodo() {
  const [input, setInput] = useState("");
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  // Effect to set input value and update availability when editing a todo
  useEffect(() => {
    const editTodo = todos.find((todo) => todo.update === true) ?? {};
    setInput(editTodo.text || "");
    setIsUpdateAvailable(editTodo.update || false);
  }, [todos]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return; // Ignore empty input
    if (isUpdateAvailable) {
      updateTodoHandler(trimmedInput);
    } else {
      addTodoHandler(trimmedInput);
    }
    setInput("");
  };

  const addTodoHandler = (text) => {
    dispatch(addTodo(text));
  };

  const updateTodoHandler = (text) => {
    const editTodo = todos.find((todo) => todo.update === true);
    if (!editTodo) return; // No todo to update
    const updatedTodo = { ...editTodo, text };
    // Or --> const updatedTodo = { ...editTodo, text, update: false }; // !if not wnt to use trigger slice reducer
    dispatch(updateTodo(updatedTodo));
    dispatch(triggerUpdate(updatedTodo.id)); //or

    setIsUpdateAvailable(false);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-x-3 mt-12">
      <input
        type="text"
        className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        {isUpdateAvailable ? "Update Value" : "Add Todo"}
      </button>
    </form>
  );
}

export default AddTodo;
