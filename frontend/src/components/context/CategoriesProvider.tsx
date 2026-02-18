import { createContext, useState, useContext } from "react";
import type { Category } from "../types/Category";
import { useEffect } from "react";
import axios from "axios";
import { getCategories } from "../../api/expense";

interface CategoriesContextType{
    categories: Category[] | []
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const CategoriesContext = createContext<CategoriesContextType | null>(null)

export function CategoriesProvider({children}: {children: React.ReactNode}){
    const [categories, setCategories] = useState<Category[]>([])
    useEffect(() => {
        fetchCategories()
    }, [])

    async function fetchCategories() {
        try {
            const storedUser = localStorage.getItem("user")
            if(!storedUser) return
            const user = JSON.parse(storedUser)
            const res = await getCategories(user.token)

            setCategories(res)
        } catch (err) {
            console.error(err)
        }
    }
    return(
        <CategoriesContext.Provider value={{categories, setCategories}}>
            {children}
        </CategoriesContext.Provider>
    )
}

export function useCategories() {
    const context = useContext(CategoriesContext)
    if (!context) throw new Error("useCategories must be inside CategoriesProvider")
    return context
}