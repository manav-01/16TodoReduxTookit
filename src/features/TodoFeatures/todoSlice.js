import { createSlice, nanoid } from "@reduxjs/toolkit";


const initialState = {
    todos: [{
        id: 1,
        text: "Todo make by using React ToolKit",
        update: false
    }]
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload,
                update: false
            }
            state.todos.push(todo);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => (todo.id !== action.payload))
        },
        updateTodo: (state, action) => {
            state.todos = state.todos.map((todo) => (todo.id === action.payload.id ? action.payload : todo))
        },
        triggerUpdate: (state, action) => {
            state.todos.map((todo) => (todo.id === action.payload ? todo.update = !todo.update : todo))
        }
    }
})

export const { addTodo, removeTodo, updateTodo, triggerUpdate } = todoSlice.actions;

export default todoSlice.reducer