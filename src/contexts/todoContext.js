import { createContext , useContext } from "react";

export const TodoContext = createContext({
    todos:[
        {
            id:1,
            todo :"Todo massage..",
            completed: false,
        }
    ],
    addTodo : (todo) => {},
    updateTodo : (id,todo) => {},
    deleteTodo : (id) =>{},
    togle : (id) => {}
})

export const UseTodo = () => {
    return useContext(TodoContext);
}

export const TodoProvider = TodoContext.Provider