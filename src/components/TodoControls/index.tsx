import {
    todoText,
    addTodo,
    deleteAllTodos,
    todosFilter,
    numberOfUncompletedTodos,
    todosCount,
} from "../../store/todos"
import type { TodosFilter } from "../../types/index"

import "./TodoControls.css"

export function TodoControls() {
    const filters: TodosFilter[] = ["Completed", "InProgress", "All"]
    return (
        <>
            <div className="todosControls">
                <input
                    value={todoText.value}
                    onChange={(e) => {
                        todoText.value = e.target.value
                    }}
                    className="todosInput"
                    placeholder="Todo..."
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            addTodo(todoText.value)
                        }
                    }}
                />
                <button
                    className="addTodoButton"
                    onClick={() => {
                        addTodo(todoText.value)
                    }}
                >
                    Add
                </button>
                {/* <button className="removeAllTodos" onClick={deleteAllTodos}>
                Remove All
            </button> */}
            </div>
            <div className="bottomTodosControls">
                <div className="filter">
                    <p>Filter By</p>
                    {/* Add className="filterSelect" here */}
                    <select
                        className="filterSelect"
                        value={todosFilter.value}
                        onChange={(e) => (todosFilter.value = e.target.value as TodosFilter)}
                    >
                        {filters.map((filter, index) => (
                            <option key={index} value={filter}>
                                {filter}
                            </option>
                        ))}
                    </select>
                </div>
                <button className="removeAllTodos" onClick={deleteAllTodos}>
                    Clear Todos
                </button>
                <div className="remainingTodosCount">
                    {numberOfUncompletedTodos.value === 0 ? (
                        <p className="label">
                            {todosCount.value === 0 ? "Add a todo!" : "Completed all todos!"}
                        </p>
                    ) : (
                        <>
                            <p className="label">Remaining Todos</p>
                            <p className="number">{numberOfUncompletedTodos.value}</p>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
