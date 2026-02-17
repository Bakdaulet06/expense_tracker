import type { Category } from "../components/types/Category"
import type { Expense } from "../components/types/Expense"

const API_URL = "http://localhost:3002/expense"


// Add a new expense
export async function addExpense(expense: Omit<Expense, "userId" | "_id">, token: string) {
    const res = await fetch(`${API_URL}/add-expense`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(expense)
    })

    if (!res.ok) throw new Error("Failed to add expense")
    return res.json()
}

export async function getExpenses(token: string): Promise<Expense[]>{
    const res = await fetch(`${API_URL}/list`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    if (!res.ok) throw new Error("Failed to get categories")
    return res.json() as Promise<Expense[]>
}

// Add a new category
export async function addCategory(category: { name: string, color: string, emoji: string }, token: string):  Promise<Category> {
    if (!token) throw new Error("User not authenticated")

    const res = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })

    if (!res.ok) throw new Error("Failed to add category")
    return res.json() as Promise<Category>
}

// Get all categories
export async function getCategories(token: string): Promise<Category[]> {
    const res = await fetch(`${API_URL}/categories`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    if (!res.ok) throw new Error("Failed to get categories")
    return res.json() as Promise<Category[]>
}
