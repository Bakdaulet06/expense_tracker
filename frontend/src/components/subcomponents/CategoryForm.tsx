import { useState } from "react"
import IconPlus from "../svgs/IconPlus"

const presetColors = [
    "#22c55e", // green
    "#3b82f6", // blue
    "#a855f7", // purple
    "#f97316", // orange
    "#ef4444", // red
    "#818cf8", // indigo-light
]

export default function CategoryForm({
    inputClass,
    btnClass,
    circleSize,
    plusSize,
}: {
    inputClass: string
    btnClass: string
    circleSize: string
    plusSize: string
}) {
    const [selectedColor, setSelectedColor] = useState(presetColors[0])
    const [customColor, setCustomColor] = useState("")

    return (
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Name */}
            <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Name</label>
                <input type="text" placeholder="e.g. Subscriptions" className={inputClass} />
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
                                setCustomColor(e.target.value)
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

            {/* Description */}
            <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Description</label>
                <textarea
                    placeholder="Add a short note..."
                    rows={4}
                    className={`${inputClass} resize-none`}
                />
            </div>

            {/* Submit */}
            <div className="pt-1">
                <button
                    type="submit"
                    className={btnClass}
                    style={{ backgroundColor: selectedColor }}
                >
                    Save Category
                </button>
            </div>
        </form>
    )
}