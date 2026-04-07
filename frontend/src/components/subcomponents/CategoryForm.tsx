import { useState, useEffect } from "react"
import IconPlus from "../svgs/IconPlus"
import { addCategory, updateCategory } from "../../api/expense";
import { useCategories } from "../context/CategoriesProvider";
import type { Category } from "../types/Category";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const presetColors = [
    "#22c55e",
    "#3b82f6",
    "#a855f7",
    "#f97316",
    "#ef4444",
    "#818cf8",
]

const presetEmojis = ["💸", "🍴", "🚕", "🎟️", "📚", "💻", "🎵", "🏠", "🛒"];

export default function CategoryForm({
    inputClass,
    btnClass,
    circleSize,
    plusSize,
    setPopUpMessage,
    setPopUpStatus,
    category,
    editState
}: {
    inputClass: string
    btnClass: string
    circleSize: string
    plusSize: string
    setPopUpMessage: (message: string) => void
    setPopUpStatus: (status: "inactive" | "success" | "failure") => void,
    category?: Category,
    editState: boolean
}) {
    const [selectedColor, setSelectedColor] = useState(category?.color || presetColors[0])
    const [name, setName] = useState(category?.name || "")
    const [selectedEmoji, setSelectedEmoji] = useState(category?.emoji || presetEmojis[0]);
    const {setCategories} = useCategories()
    const {user} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (category) {
            setSelectedColor(category.color)
            setName(category.name)
            setSelectedEmoji(category.emoji)
        }
    }, [category])

    async function handleAddCategory() {
        if(!user) return
        if (!name) {
            setPopUpMessage("Please, fill out the name for category!")
            setPopUpStatus("failure")
            return
        }
        const newCategory = {
            name,
            color: selectedColor,
            emoji: selectedEmoji
        };

        try{
            const res: Category = await addCategory(newCategory, user.token)
            setCategories((prev: Category[]) => [...prev, res])
            setPopUpMessage("Category created successfully!")
            setPopUpStatus("success")
        }catch(err){
            console.error(err)
        }
        setName("");
        setSelectedColor(presetColors[0]);
        setSelectedEmoji(presetEmojis[0]);
    }

    async function handleUpdateCategory(){
        if(!user || !category) return
        if (!name) {
            setPopUpMessage("Please, fill out the name for category!")
            setPopUpStatus("failure")
            return
        }
        try{
            await updateCategory(user.token, category?._id, name, selectedEmoji, selectedColor)
            navigate("/expense/categories")
        }catch(err){
            console.error(err)
        }
    }

    return (
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Name */}
            <div className="space-y-2">
                <label style={{ color: "var(--text-secondary)" }} className="text-[10px] font-bold uppercase tracking-widest">
                    Name
                </label>
                <input
                    type="text"
                    placeholder="e.g. Subscriptions"
                    className={inputClass}
                    style={{
                        background: "var(--card)",
                        color: "var(--text-primary)",
                        borderColor: "var(--border)"
                    }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            {/* Color theme */}
            <div className="space-y-3">
                <label style={{ color: "var(--text-secondary)" }} className="text-[10px] font-bold uppercase tracking-widest">
                    Color Theme
                </label>
                <div className="flex items-center gap-3 flex-wrap">
                    {presetColors.map((color) => (
                        <button
                            key={color}
                            type="button"
                            onClick={() => setSelectedColor(color)}
                            className={`${circleSize} rounded-full transition-all shrink-0 ${
                                selectedColor === color
                                    ? "ring-2 ring-offset-2 scale-110"
                                    : "hover:scale-105"
                            }`}
                            style={{
                                backgroundColor: color,
                                boxShadow: selectedColor === color ? "0 0 0 2px var(--border)" : undefined
                            }}
                        />
                    ))}
                    <label
                        style={{ borderColor: "var(--border)" }}
                        className={`${circleSize} rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer transition-colors shrink-0 relative`}
                        title="Custom color"
                    >
                        <IconPlus className={`${plusSize}`} />
                        <input
                            type="color"
                            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                            onChange={(e) => {
                                setSelectedColor(e.target.value)
                            }}
                        />
                    </label>
                </div>

                <div className="flex items-center gap-3 mt-1">
                    <div
                        className="w-8 h-8 rounded-xl shadow-sm transition-all"
                        style={{ backgroundColor: selectedColor }}
                    />
                    <span style={{ color: "var(--text-secondary)" }} className="text-sm font-mono">
                        {selectedColor}
                    </span>
                </div>
            </div>

            {/* Emoji Picker */}
            <div className="space-y-3">
                <label style={{ color: "var(--text-secondary)" }} className="text-[10px] font-bold uppercase tracking-widest">
                    Emoji
                </label>
                <div className="flex items-center gap-3 flex-wrap">
                    {presetEmojis.map((emoji) => (
                    <button
                        key={emoji}
                        type="button"
                        onClick={() => setSelectedEmoji(emoji)}
                        className={`text-2xl transition-all shrink-0 ${
                        selectedEmoji === emoji
                            ? "ring-2 ring-offset-2 scale-110"
                            : "hover:scale-105"
                        }`}
                        style={{
                            boxShadow: selectedEmoji === emoji ? "0 0 0 2px var(--border)" : undefined
                        }}
                    >
                        {emoji}
                    </button>
                    ))}
                </div>
            </div>

            {/* Submit */}
            <div className="pt-1">
                <button
                    type="submit"
                    className={`${btnClass} cursor-pointer`}
                    style={{ backgroundColor: selectedColor }}
                    onClick={editState ? handleUpdateCategory : handleAddCategory}
                >
                    Save Category
                </button>
            </div>
        </form>
    )
}