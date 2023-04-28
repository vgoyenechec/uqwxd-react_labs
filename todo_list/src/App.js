import React from "react";
import "./App.css";
const App = () => {
    const [todos, setTodos] = React.useState([]);
    const [todo, setTodo] = React.useState("");
    const [todoEditing, setTodoEditing] = React.useState(null);
    const [todoEditingText, setTodoEditingText] = React.useState("");

    React.useEffect(() => {
        const json = localStorage.getItem("todos");
        const loadedTodos = JSON.parse(json);
        if (loadedTodos) {
          setTodos(loadedTodos);
        }
      }, []);
    
      React.useEffect(() => {
        if([todos].length > 0) {
            const json = JSON.stringify(todos);
            localStorage.setItem("todos", json);
        }
      }, [todos]);
      
    // Add the handlesubmit code here
    function handleSubmit(e) {
        e.preventDefault();
        const newTodo = {
            id: new Date().getTime(),
            text: todo.trim(),
            completed: false
        }
        if (newTodo.text.length > 0) {
            setTodos([...todos].concat(newTodo));
        }
        else {
            alert("Enter Valid Task");
        }
        setTodo("");
    }

    // Add the deleteToDo code here
    function deleteTask(id) {
        let keep = todos.filter((todo) => todo.id !== id);
        setTodos(keep)
    }


    // Add the toggleComplete code here
    function toggleComplete(id) {
        let updateStatus = todos.map(td => {
            if (td.id === id) {
                td.completed = !td.completed
            }
            return td;
        })
        setTodos(updateStatus)
    }

    // Add the submitEdits code here
    function editTodo() {
        let edited = todos.map(td => {
            if (td.id === todoEditing) {
                td.text = todoEditingText;
            }
            return td;
        })
        setTodos(edited);
        setTodoEditingText("");
        setTodoEditing(null);
    }


    return (
        <div id="todo-list">
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={(e) => setTodo(e.target.value)}
                    value={todo}
                />
                <button type="submit">Add Todo</button>
            </form>
            {todos.map((todo) =>
                <div className="todo" key={todo.id}>
                    <div className="todo-text">
                        <input
                            type="checkbox"
                            id="completed"
                            checked={todo.completed}
                            onChange={() => { toggleComplete(todo.id) }} />
                        {todo.id === todoEditing ?
                            <div>
                                <input type="text"
                                    onChange={(e) => setTodoEditingText(e.target.value)}
                                    value={todoEditingText} />
                            </div>
                            :
                            <div>{todo.text}</div>}
                    </div>
                    <div className="todo-actions">
                        {todoEditing === todo.id ?
                            <button type="submit" onClick={() => editTodo()}>Submit Change</button>
                            :
                            <button type="submit" onClick={() => setTodoEditing(todo.id)}>Update</button>
                        }
                        <button type="delete" onClick={() => deleteTask(todo.id)}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
};
export default App;
