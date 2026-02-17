import { createContext, useState, useContext } from "react";
import type { Category } from "../types/Category";

interface CategoriesContextType{
    categories: Category[] | []
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const CategoriesContext = createContext<CategoriesContextType | null>(null)

export function CategoriesProvider({children}: {children: React.ReactNode}){
    const [categories, setCategories] = useState<Category[]>([])
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