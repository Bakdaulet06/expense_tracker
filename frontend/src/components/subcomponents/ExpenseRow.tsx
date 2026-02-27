import { useCategories } from "../context/CategoriesProvider";
import type { Expense } from "../types/Expense";

export default function ExpenseRow({ item }: { item: Expense }) {
    const { categories } = useCategories()
    const category = categories.find(cat => cat._id === item.categoryId)
    if (!category) return null

    return (
        <div
            className="flex items-center gap-4 px-4 py-3.5 rounded-2xl"
            style={{ backgroundColor: category.color + "20" }}
        >
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
                    {item.cost < 0 ? "-" : "+"}${Math.abs(item.cost).toFixed(2)}
                </p>
            </div>
        </div>
    )
}