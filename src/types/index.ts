export interface Todo {
    content: string
    completed: boolean
    id: number
}
export type TodosFilter = "Completed" | "InProgress" | "All"
