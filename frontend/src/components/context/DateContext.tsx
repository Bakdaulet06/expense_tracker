import { createContext, useContext, useState } from "react"

interface DateContextType {
    date: Date
    setDate: (date: Date) => void
}

const DateContext = createContext<DateContextType | null>(null)

export function DateProvider({ children }: { children: React.ReactNode }) {
    const [date, setDate] = useState<Date>(new Date())

    return (
        <DateContext.Provider value={{ date, setDate }}>
            {children}
        </DateContext.Provider>
    )
}

export function useDate() {
    const context = useContext(DateContext)
    if (!context) throw new Error("useDate must be inside DateProvider")
    return context
}
