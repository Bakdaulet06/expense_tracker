import type { Category } from "../types/Category";

export default function CategoryCard({ cat, size }: { cat: Category; size: "sm" | "md" }) {
    const isSmall = size === "sm"
    return (
        <div
            className={`rounded-2xl p-4 flex flex-col justify-between ${isSmall ? "h-28" : "h-36"}`}
            style={{ backgroundColor: cat.color + "20" }} // 12% opacity tint
        >
            <div
                className={`${isSmall ? "w-9 h-9 text-lg" : "w-12 h-12 text-2xl"} rounded-xl flex items-center justify-center`}
                style={{ backgroundColor: cat.color + "33" }}
            >
                {cat.emoji}
            </div>
            <div>
                <p className={`font-semibold text-gray-800 ${isSmall ? "text-sm" : "text-base"}`}>{cat.name}</p>
                <p className={`text-gray-400 ${isSmall ? "text-xs" : "text-sm"}`}>{cat.count} expenses</p>
            </div>
        </div>
    )
}