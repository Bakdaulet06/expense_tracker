import { useState } from "react"
import Sidebar from "../subcomponents/desktop/Sidebar"
import ListPageHeader from "../subcomponents/headers/ListPageHeader"
import IconChevron from "../svgs/IconShevron"
import BottomTabMobile from "../subcomponents/mobile/BottomTabMobile"
import type { Expense } from "../types/Expense"

const categoryConfig: Record<string, { bg: string; iconBg: string; color: string; emoji: string }> = {
    FOOD:  { bg: "bg-green-50",  iconBg: "bg-green-100",  color: "text-green-600",  emoji: "🍴" },
    FUN:   { bg: "bg-purple-50", iconBg: "bg-purple-100", color: "text-purple-600", emoji: "🎟️" },
    TAXI:  { bg: "bg-blue-50",   iconBg: "bg-blue-100",   color: "text-blue-600",   emoji: "🚕" },
    BOOKS: { bg: "bg-orange-50", iconBg: "bg-orange-100", color: "text-orange-600", emoji: "📚" },
    RENT:  { bg: "bg-red-50",    iconBg: "bg-red-100",    color: "text-red-600",    emoji: "🏠" },
    OTHER: { bg: "bg-gray-50",   iconBg: "bg-gray-100",   color: "text-gray-500",   emoji: "💸" },
}

const expenses: Expense[] = [
    { id: 1, name: "Artisan Pasta",   price: -34.00,   description: "Dinner with friends",    date: new Date("2026-01-18"), category: "FOOD"  },
    { id: 2, name: "Cinema Ticket",   price: -15.50,   description: "Interstellar Re-release", date: new Date("2026-01-18"), category: "FUN"   },
    { id: 3, name: "Uber Ride",       price: -42.00,   description: "To the airport",          date: new Date("2026-01-17"), category: "TAXI"  },
    { id: 4, name: "Modern Bookshop", price: -28.90,   description: "Design Systems Vol 2",    date: new Date("2026-01-17"), category: "BOOKS" },
    { id: 5, name: "Monthly Rent",    price: -1100.00, description: "January payment",         date: new Date("2026-01-16"), category: "RENT"  },
    { id: 6, name: "Street Tacos",    price: -12.40,   description: "Lunch break",             date: new Date("2026-01-16"), category: "FOOD"  },
    { id: 7, name: "Book Club Fee",   price: -7.70,    description: "Annual membership",       date: new Date("2026-01-16"), category: "BOOKS" },
]

const groupedExpenses = groupExpensesByDate(expenses)
const totalSpending = expenses.reduce((s, i) => s + Math.abs(i.price), 0)

function ExpenseRow({ item }: { item: Expense }) {
    const cfg = categoryConfig[item.category] ?? categoryConfig.OTHER
    return (
        <div className={`flex items-center gap-4 md:gap-5 px-4 md:px-6 py-3.5 md:py-5 rounded-2xl ${cfg.bg}`}>
            <div className={`w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${cfg.iconBg} flex items-center justify-center text-lg md:text-2xl shrink-0`}>
                {cfg.emoji}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm md:text-base font-semibold text-gray-800 truncate">{item.name}</p>
                <p className="text-xs md:text-sm text-gray-400 truncate">{item.description}</p>
            </div>
            <div className="text-right shrink-0">
                <p className="text-sm md:text-lg font-bold text-gray-800">
                    {item.price < 0 ? "-" : "+"}${Math.abs(item.price).toFixed(2)}
                </p>
                <p className={`text-[10px] md:text-xs font-bold uppercase tracking-widest ${cfg.color}`}>
                    {item.category}
                </p>
            </div>
        </div>
    )
}

export default function ListPage() {
    const [activeCategory, setActiveCategory] = useState("All Categories")
    const [activeMonth, setActiveMonth] = useState("January")
    const activeTab = "list"

    return (
        <div className="flex min-h-screen bg-white md:bg-gray-50">

            {/* Sidebar — desktop only */}
            <Sidebar activeTab={activeTab}/>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-h-screen">

                {/* Header */}
                <ListPageHeader totalSpending={totalSpending} activeCategory={activeCategory} activeMonth={activeMonth}/>

                {/* Mobile filters */}
                <div className="flex md:hidden gap-3 px-6 mb-5">
                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 bg-white text-sm text-gray-700 font-medium">
                        {activeCategory} <IconChevron />
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 bg-white text-sm text-gray-700 font-medium">
                        {activeMonth} <IconChevron />
                    </button>
                </div>

                {/* Expense groups */}
                <div className="flex-1 overflow-y-auto px-6 md:px-14 pb-6 md:py-10">
                    <div className="md:max-w-3xl space-y-6 md:space-y-8">
                        {groupedExpenses.map((group) => (
                            <div key={group.group}>
                                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 md:mb-4">
                                    {group.group}
                                </p>
                                <div className="space-y-2.5 md:space-y-3">
                                    {group.items.map((item) => (
                                        <ExpenseRow key={item.id} item={item} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom nav — mobile only */}
                <div className="md:hidden">
                    <BottomTabMobile activeTab={activeTab} />
                </div>
            </div>
        </div>
    )
}

function formatGroupLabel(date: Date): string {
    const today     = new Date()
    const yesterday = new Date()
    yesterday.setDate(today.getDate() - 1)
    const sameDay = (a: Date, b: Date) =>
        a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
    const label = date.toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase()
    if (sameDay(date, today))     return `TODAY, ${label}`
    if (sameDay(date, yesterday)) return `YESTERDAY, ${label}`
    return label
}

function groupExpensesByDate(items: Expense[]) {
    const map = new Map<string, Expense[]>()
    for (const item of items) {
        const key = item.date.toDateString()
        if (!map.has(key)) map.set(key, [])
        map.get(key)!.push(item)
    }
    return Array.from(map.entries()).map(([key, items]) => ({
        group: formatGroupLabel(new Date(key)),
        items,
    }))
}