import { signal, computed } from "@preact/signals-react"
import type { Todo, TodosFilter } from "../types" // Import the type
// Import the type

const TODO_LOCAL_STORAGE_KEY = "Todos"

// --- Helper function to get initial data ---
function getTodosFromLocalStorage(): Todo[] {
    const value = localStorage.getItem(TODO_LOCAL_STORAGE_KEY)
    return !value ? [] : JSON.parse(value)
}

// --- State management Signals ---
export const todos = signal<Todo[]>(getTodosFromLocalStorage())
export const todoText = signal<string>("")
export const editedTodoId = signal<number | null>(null)
export const editedTodoText = signal<string>("")
export const todosFilter = signal<TodosFilter>("All")
export const filteredTodos = computed(() => {
    switch (todosFilter.value) {
        case "Completed":
            return todos.value.filter((todo) => todo.completed)
        case "InProgress":
            return todos.value.filter((todo) => !todo.completed)
        case "All":
        default:
            return todos.value
    }
})
export const todosCount = computed<number>(() => todos.value.length)
export const numberOfUncompletedTodos = computed<number>(
    () => todos.value.filter((x) => !x.completed).length
)
// --- State update functions ---
export function addTodo(todoContent: string) {
    if (!todoContent.trim()) return
    const newTodo: Todo = { content: todoContent, id: Date.now(), completed: false }
    todos.value = [...todos.value, newTodo]
    todoText.value = "" // Clear input after adding
}

export function deleteTodo(todoId: number) {
    todos.value = todos.value.filter((x) => x.id !== todoId)
}

export function updateTodoContent(todoId: number, newContent: string) {
    if (!newContent.trim()) {
        deleteTodo(todoId)
        return
    }
    todos.value = todos.value.map((todo) =>
        todo.id === todoId ? { ...todo, content: newContent } : todo
    )
}

export function setCompleted(todoId: number, completed: boolean) {
    todos.value = todos.value.map((todo) =>
        todo.id === todoId ? { ...todo, completed: completed } : todo
    )
}

export function deleteAllTodos() {
    todos.value = []
}
