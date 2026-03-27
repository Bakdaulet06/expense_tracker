import { useCategories } from "../context/CategoriesProvider";
import type { Expense } from "../types/Expense";
import { useState, useRef, useEffect } from "react";
import IconEdit from "../svgs/IconEdit";
import IconDelete from "../svgs/IconDelete";
import { useNavigate } from "react-router-dom";

export default function ExpenseRow({ item, setSelectedExpense, setWarningStatus }: { 
    item: Expense,
    setSelectedExpense: (expense: Expense) => void,
    setWarningStatus: (status: boolean) => void
}) {
    const { categories } = useCategories()
    const category = categories.find(cat => cat._id === item.categoryId)
    const [selected, setSelected] = useState(false)
    const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
    const rowRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (!selected) return
        const handleClickOutside = (e: MouseEvent | TouchEvent) => {
            if (rowRef.current && !rowRef.current.contains(e.target as Node)) {
                setSelected(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("touchstart", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("touchstart", handleClickOutside)
        }
    }, [selected])

    const handlePressStart = () => {
        pressTimer.current = setTimeout(() => setSelected(true), 500)
    }

    const handlePressEnd = () => {
        if (pressTimer.current) clearTimeout(pressTimer.current)
    }

    if (!category) return null

    return (
        <div
            ref={rowRef}
            className="flex flex-col gap-2 px-4 py-3.5 rounded-2xl cursor-pointer"
            style={{ backgroundColor: category.color + "20" }}
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
        >
            <div className="flex items-center gap-4">
                <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-lg shrink-0"
                    style={{ backgroundColor: category.color + "20" }}
                >
                    {category.emoji}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-black truncate">{item.name}</p>
                    <p className="text-xs text-gray-800 truncate">{item.description}</p>
                </div>
                <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-black">
                        {Math.abs(item.cost).toFixed(2)}₸
                    </p>
                </div>
            </div>
            {selected &&
                <div className="flex gap-2">
                    <button
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-white/60 text-gray-600 text-xs font-medium cursor-pointer"
                        onClick={() => navigate(`/expense/list/${item._id}`)}
                    >
                        <IconEdit />
                    </button>
                    <button
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-red-100 text-red-500 text-xs font-medium cursor-pointer"
                        onClick={() => {
                            setSelectedExpense(item)
                            setWarningStatus(true)
                        }}
                    >
                        <IconDelete />
                    </button>
                </div>
            }
        </div>
    )
}