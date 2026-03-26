import type { Category } from "../components/types/Category"
import type { Expense } from "../components/types/Expense"
import type {Stats} from "../components/types/Stats"

const API_URL = `${import.meta.env.VITE_API_URL}/expense`

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

export async function getExpensesByFilter(token: string, activeCategory: string, activeMonth: string): Promise<Expense[]> {
    if (!token) throw new Error("User not authenticated")

    const res = await fetch(`${API_URL}/list`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({categoryName: activeCategory, month: activeMonth})
    })

    if (!res.ok) throw new Error("Failed to filter category")
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

export async function getCategory(token: string, categoryId: string): Promise<Category>{
    console.log("URL:", `${API_URL}/categories/${categoryId}`)
    console.log("token:", token)
    const res = await fetch(`${API_URL}/categories/${categoryId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    console.log("status:", res.status)
    console.log("content-type:", res.headers.get("content-type"))
    const text = await res.text()
    console.log("raw response:", text)

    const data = JSON.parse(text)
    if (!res.ok) {
        throw new Error(data.message || "Failed to get category")
    }
    return data as Category
}

export async function deleteCategory(token: string, categoryId: string){
    const res = await fetch(`${API_URL}/categories/${categoryId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    if(!res.ok) throw new Error("Failed to delete category")
    return res.json()
}

export async function getStats(token: string, startDate: Date, endDate: Date): Promise<Stats[]> {
    const res = await fetch(`${API_URL}/stats?startDate=${startDate}&endDate=${endDate}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    if (!res.ok) throw new Error("Failed to get stats")
    return res.json()
}