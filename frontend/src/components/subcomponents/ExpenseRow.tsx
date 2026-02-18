import { useCategories } from "../context/CategoriesProvider";
import type { Expense } from "../types/Expense";

export default function ExpenseRow({ item }: { item: Expense }) {
    const {categories} = useCategories()
    const category = categories.find(cat => cat._id === item.categoryId);
    if(!category) return
    return (
        <div className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl ${category ? `bg-[${category.color}]` : "bg-gray"} opacity-50`}>
  {/* content */}
            <div className={`w-11 h-11 rounded-xl ${category ? `bg-[${category.color}]` : "bg-gray"} flex items-center justify-center text-lg shrink-0 opacity-100`}>
                {category.emoji}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                <p className="text-xs text-gray-400 truncate">{item.description}</p>
            </div>
            <div className="text-right shrink-0">
                <p className="text-sm font-bold text-gray-800">
                    {item.cost < 0 ? "-" : "+"}${Math.abs(item.cost).toFixed(2)}
                </p>
                <p className={`text-[10px] font-bold uppercase tracking-widest ${category ? `text-[${category.color}]` : "text-gray"}`}>
                    {category.name}
                </p>
            </div>
        </div>
    )
}