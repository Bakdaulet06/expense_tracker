import type { Expense } from "../types/Expense";

const categoryConfig: Record<string, { bg: string; iconBg: string; color: string; emoji: string }> = {
    FOOD:    { bg: "bg-green-50",   iconBg: "bg-green-100",  color: "text-green-600",  emoji: "🍴" },
    FUN:     { bg: "bg-purple-50",  iconBg: "bg-purple-100", color: "text-purple-600", emoji: "🎟️" },
    TAXI:    { bg: "bg-blue-50",    iconBg: "bg-blue-100",   color: "text-blue-600",   emoji: "🚕" },
    BOOKS:   { bg: "bg-orange-50",  iconBg: "bg-orange-100", color: "text-orange-600", emoji: "📚" },
    RENT:    { bg: "bg-red-50",     iconBg: "bg-red-100",    color: "text-red-600",    emoji: "🏠" },
    OTHER:   { bg: "bg-gray-50",    iconBg: "bg-gray-100",   color: "text-gray-500",   emoji: "💸" },
}

export default function ExpenseRow({ item }: { item: Expense }) {
    const cfg = categoryConfig[item.category] ?? categoryConfig.OTHER
    return (
        <div className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl ${cfg.bg}`}>
            <div className={`w-11 h-11 rounded-xl ${cfg.iconBg} flex items-center justify-center text-lg shrink-0`}>
                {cfg.emoji}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                <p className="text-xs text-gray-400 truncate">{item.description}</p>
            </div>
            <div className="text-right shrink-0">
                <p className="text-sm font-bold text-gray-800">
                    {item.price < 0 ? "-" : "+"}${Math.abs(item.price).toFixed(2)}
                </p>
                <p className={`text-[10px] font-bold uppercase tracking-widest ${cfg.color}`}>
                    {item.category}
                </p>
            </div>
        </div>
    )
}