import BottomTabMobile from "../subcomponents/mobile/BottomTabMobile"
import Sidebar from "../subcomponents/desktop/Sidebar"
import StatsPageHeader from "../subcomponents/headers/StatsPageHeader"
import { useCategories } from "../context/CategoriesProvider"
import { useState, useEffect } from "react"
import type { Category } from "../types/Category"

const stats = [
    { name: "Food",          transactions: 12, amount: 300, color: "#22c55e", emoji: "🍴", iconBg: "bg-green-50"  },
    { name: "Entertainment", transactions: 4,  amount: 300, color: "#6366f1", emoji: "🎬", iconBg: "bg-indigo-50" },
    { name: "Taxi",          transactions: 8,  amount: 300, color: "#f59e0b", emoji: "🚕", iconBg: "bg-amber-50"  },
    { name: "Rent",          transactions: 1,  amount: 300, color: "#ef4444", emoji: "🏠", iconBg: "bg-red-50"    },
]

const totalSpending = stats.reduce((s, c) => s + c.amount, 0)
const maxAmount = Math.max(...stats.map((c) => c.amount))

function CategoryRow({ cat }: { cat: Category }) {
    //const barWidth = Math.round((cat. / maxAmount) * 100)
    return (
        <div className="flex items-center gap-4 md:gap-5 py-4 md:py-5 px-1 md:px-2">
            <div className={`w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-2xl shrink-0`}
                style={{ backgroundColor: cat.color + "33" }}>
                {cat.emoji}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm md:text-base font-semibold text-gray-800">{cat.name}</p>
                <p className="text-xs md:text-sm text-gray-400 mb-2">
                    {cat.count} transaction{cat.count !== 1 ? "s" : ""}
                </p>
            </div>
            {/* <p className="text-sm md:text-lg font-bold text-gray-800 shrink-0">
                ${cat.amount.toFixed(2)}
            </p> */}
        </div>
    )
}

export default function StatsPage() {
    const activeTab = "stats"
    const {categories} = useCategories()
    const [activeCategory, setActiveCategory] = useState("")
    const timeFilters = ["Daily", "Weekly", "Monthly", "All Time"];
    const [activeTimeFilter, setActiveTimeFilter] = useState("Monthly");

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar activeTab={activeTab}/>
            <div className="flex-1 flex flex-col min-h-screen">
                <StatsPageHeader />
                <div className="flex md:hidden gap-3 px-6 mb-5">
                    <div className="space-y-1.5 md:space-y-2 col-span-1 md:col-span-2">
                        <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Category</label>
                        <div className="relative">
                            <select value={activeCategory} onChange={(e) => setActiveCategory(e.target.value)}>
                                <option value="All Categories" key={"All Categories"}>All Categories</option>
                                {categories.map(category => 
                                    <option key={category._id} value={category.name}>{category.name}</option>
                                )}
                            </select>
                        </div>
                        <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Time</label>
                        <div className="relative">
                            <select value={activeTimeFilter} onChange={(e) => setActiveTimeFilter(e.target.value)}>
                                <option value="">All Time</option>
                                {timeFilters.map((month, index) => 
                                    <option key={month} value={index.toString()}>{month}</option>
                                )}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto px-5 md:px-14 pb-6 md:py-10">
                    <div className="md:max-w-4xl space-y-6 md:space-y-8">
                        <div className="bg-gray-900 rounded-3xl px-6 md:px-10 py-6 md:py-8 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 md:mb-3">
                                    Total Spending
                                </p>
                                <div className="flex items-baseline gap-0.5 md:gap-1">
                                    <span className="text-4xl md:text-6xl font-bold text-white">
                                        ${Math.floor(totalSpending).toLocaleString()}
                                    </span>
                                    <span className="text-xl md:text-3xl font-light text-gray-400">
                                        .{String((totalSpending % 1).toFixed(2)).slice(2)}
                                    </span>
                                </div>
                            </div>
                            <div className="hidden md:flex items-end gap-2 h-16 pr-2">
                                {stats.map((cat) => (
                                    <div
                                        key={cat.name}
                                        className="w-4 rounded-t-md"
                                        style={{
                                            height: `${(cat.amount / maxAmount) * 100}%`,
                                            backgroundColor: cat.color,
                                            opacity: 0.8,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 md:mb-4 px-1 md:px-0">
                                By Category
                            </p>
                            <div className="bg-white rounded-3xl overflow-hidden divide-y divide-gray-50 shadow-sm">
                                {categories.map((cat) => (
                                    <div key={cat.name} className="px-4 md:px-6">
                                        <CategoryRow cat={cat} />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                    <div className="h-6 md:hidden" />
                </div>
                <div className="md:hidden">
                    <BottomTabMobile activeTab={activeTab} />
                </div>
            </div>
        </div>
    )
}