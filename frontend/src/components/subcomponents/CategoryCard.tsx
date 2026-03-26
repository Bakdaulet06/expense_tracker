import type { Category } from "../types/Category";
import { useState, useRef, useEffect } from "react";
import IconEdit from "../svgs/IconEdit";
import IconDelete from "../svgs/IconDelete";
import { useNavigate } from "react-router-dom";
export default function CategoryCard({ cat, size, setSelectedCategory, setWarningStatus }: { cat: Category; size: "sm" | "md", setSelectedCategory: (cat: Category) => void, setWarningStatus: (status: boolean) => void}) {
    const [selected, setSelected] = useState<boolean>(false)
    const isSmall = size === "sm"
    const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
    const cardRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (!selected) return
        const handleClickOutside = (e: MouseEvent | TouchEvent) => {
            if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
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

    return (
        <div
            ref={cardRef}
            className={`rounded-2xl p-4 flex flex-col gap-3 ${!selected ? (isSmall ? "h-28" : "h-36") : ""} cursor-pointer`}
            style={{ backgroundColor: cat.color + "20" }}
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
        > 
            <div
                className={`${isSmall ? "w-9 h-9 text-lg" : "w-12 h-12 text-2xl"} rounded-xl flex items-center justify-center`}
                style={{ backgroundColor: cat.color + "33" }}
            >
                {cat.emoji}
            </div>
            <div className="flex-1">
                <p className={`font-semibold text-gray-800 ${isSmall ? "text-sm" : "text-base"}`}>{cat.name}</p>
                <p className={`text-gray-400 ${isSmall ? "text-xs" : "text-sm"}`}>{cat.count} expenses</p>
            </div>
            {selected &&
                <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-white/60 text-gray-600 text-xs font-medium cursor-pointer"
                    onClick={() => {console.log("cat:", cat) 
                        navigate(`/expense/categories/${cat._id}`)}}
                    >
                        <IconEdit/> 
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-red-100 text-red-500 text-xs font-medium cursor-pointer"
                        onClick={() => 
                            {setWarningStatus(true)
                                
                            setSelectedCategory(cat)}}
                        >
                        <IconDelete/> 
                    </button>
                </div>
            }
        </div>
    )
}