import { useEffect, useState } from "react"
import Sidebar from "../subcomponents/desktop/Sidebar"
import ListPageHeader from "../subcomponents/headers/ListPageHeader"
import IconChevron from "../svgs/IconShevron"
import BottomTabMobile from "../subcomponents/mobile/BottomTabMobile"
import type { Expense } from "../types/Expense"
import ExpenseRow from "../subcomponents/ExpenseRow"
import { useAuth } from "../context/AuthContext"
import { getExpenses } from "../../api/expense"
import { useCategories } from "../context/CategoriesProvider"


export default function ListPage() {
    const {categories} = useCategories()
    const [activeCategory, setActiveCategory] = useState("All Categories")
    const [activeMonth, setActiveMonth] = useState("January")
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [groupedExpenses, setGroupedExpenses] = useState<GroupedExpenses[]>([])
    const totalSpending = expenses.reduce((s, i) => s + Math.abs(i.cost), 0);
    const activeTab = "list"
    const {user} = useAuth()
    const [categoryName, setCategoryName] = useState("All Categories")

    useEffect(() => {
        async function fetchExpenses(){
            if(!user) return
            try{
                const res: Expense[] = await getExpenses(user.token)
                setExpenses(res)
            }catch(err){
                console.error(err)
            }
        }
        fetchExpenses()
    }, [user])

    useEffect(() => {
        setGroupedExpenses(groupExpensesByDate(expenses));
    }, [expenses]);

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
                    <div className="space-y-1.5 md:space-y-2 col-span-1 md:col-span-2">
                        <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Category</label>
                        <div className="relative">
                            <select value={categoryName} onChange={(e) => setCategoryName(e.target.value)}>
                                <option value="All Categories" key={"All Categories"}>All Categories</option>
                                {categories.map(category => 
                                    <option key={category._id} value={category.name}>{category.name}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="space-y-1.5 md:space-y-2 col-span-1 md:col-span-2">
                        <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Month</label>
                        <div className="relative">
                            <select value={categoryName} onChange={(e) => setCategoryName(e.target.value)}>
                                {categories.map(category => 
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                )}
                            </select>
                        </div>
                    </div>
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
                                        <ExpenseRow key={item._id} item={item} />
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

function groupExpensesByDate(items: Expense[]): GroupedExpenses[] {
    const map = new Map<string, Expense[]>()
    for (const item of items) {
        const dateObj = new Date(item.date)
        const key = dateObj.toDateString()
        if (!map.has(key)) map.set(key, [])
        map.get(key)!.push(item)
    }
    return Array.from(map.entries()).sort(([dateA], [dateB]) => {
            return new Date(dateB).getTime() - new Date(dateA).getTime()
        }).map(([key, items]) => ({
        group: formatGroupLabel(new Date(key)),
        items: items,
    }))
}

interface GroupedExpenses{
    group: string,
    items: Expense[]
}   