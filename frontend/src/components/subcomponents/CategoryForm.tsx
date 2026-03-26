import { useState } from "react"
import IconPlus from "../svgs/IconPlus"
import { addCategory } from "../../api/expense";
import { useCategories } from "../context/CategoriesProvider";
import type { Category } from "../types/Category";
import { useAuth } from "../context/AuthContext";
const presetColors = [
    "#22c55e", // green
    "#3b82f6", // blue
    "#a855f7", // purple
    "#f97316", // orange
    "#ef4444", // red
    "#818cf8", // indigo-light
]

const presetEmojis = ["💸", "🍴", "🚕", "🎟️", "📚", "💻", "🎵", "🏠", "🛒"];

export default function CategoryForm({
    inputClass,
    btnClass,
    circleSize,
    plusSize,
    setPopUpMessage,
    setPopUpStatus,
    category
}: {
    inputClass: string
    btnClass: string
    circleSize: string
    plusSize: string
    setPopUpMessage: (message: string) => void
    setPopUpStatus: (status: "inactive" | "success" | "failure") => void,
    category?: Category
}) {
    const [selectedColor, setSelectedColor] = useState(category?.color || presetColors[0])
    const [name, setName] = useState(category?.name || "")
    const [selectedEmoji, setSelectedEmoji] = useState(category?.emoji || presetEmojis[0]);
    const {setCategories} = useCategories()
    const {user} = useAuth()

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
        console.log("Category to add:", newCategory);

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

    return (
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Name */}
            <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Name</label>
                <input type="text" placeholder="e.g. Subscriptions" className={inputClass} value={name} onChange={(e) => setName(e.target.value)}/>
            </div>

            {/* Color theme */}
            <div className="space-y-3">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Color Theme</label>
                <div className="flex items-center gap-3 flex-wrap">
                    {presetColors.map((color) => (
                        <button
                            key={color}
                            type="button"
                            onClick={() => setSelectedColor(color)}
                            className={`${circleSize} rounded-full transition-all shrink-0 ${
                                selectedColor === color
                                    ? "ring-2 ring-offset-2 ring-gray-400 scale-110"
                                    : "hover:scale-105"
                            }`}
                            style={{ backgroundColor: color }}
                        />
                    ))}
                    {/* Custom color picker */}
                    <label
                        className={`${circleSize} rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors shrink-0 relative`}
                        title="Custom color"
                    >
                        <IconPlus className={`${plusSize} text-gray-400`} />
                        <input
                            type="color"
                            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                            onChange={(e) => {
                                setSelectedColor(e.target.value)
                            }}
                        />
                    </label>
                </div>

                {/* Color preview swatch */}
                <div className="flex items-center gap-3 mt-1">
                    <div
                        className="w-8 h-8 rounded-xl shadow-sm transition-all"
                        style={{ backgroundColor: selectedColor }}
                    />
                    <span className="text-sm text-gray-500 font-mono">{selectedColor}</span>
                </div>
            </div>

            {/* Emoji Picker */}
            <div className="space-y-3">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
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
                            ? "ring-2 ring-offset-2 ring-gray-400 scale-110"
                            : "hover:scale-105"
                        }`}
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
                    className={btnClass}
                    style={{ backgroundColor: selectedColor }}
                    onClick={handleAddCategory}
                >
                    Save Category
                </button>
            </div>
        </form>
    )
}