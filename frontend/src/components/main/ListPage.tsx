import { useEffect, useState, useMemo } from "react"
import Sidebar from "../subcomponents/desktop/Sidebar"
import ListPageHeader from "../subcomponents/headers/ListPageHeader"
import BottomTabMobile from "../subcomponents/mobile/BottomTabMobile"
import type { Expense } from "../types/Expense"
import ExpenseRow from "../subcomponents/ExpenseRow"
import { useAuth } from "../context/AuthContext"
import { deleteExpense, getExpensesByFilter } from "../../api/expense"
import { useCategories } from "../context/CategoriesProvider"
import Warning from "../subcomponents/Warning"
import PopUp from "../subcomponents/PopUp"

export default function ListPage() {
    const {categories} = useCategories()
    const [activeCategory, setActiveCategory] = useState("All Categories")
    const [activeMonth, setActiveMonth] = useState("")
    const [expenses, setExpenses] = useState<Expense[]>([])
    const [groupedExpenses, setGroupedExpenses] = useState<GroupedExpenses[]>([])
    const totalSpending = useMemo(() => {
        return expenses.reduce((sum, item) => sum + Math.abs(item.cost), 0)
    }, [expenses])
    const activeTab = "list"
    const {user} = useAuth()
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const [warningStatus, setWarningStatus] = useState(false)
    const [popUpMessage, setPopUpMessage] = useState("")
    const [popUpStatus, setPopUpStatus] = useState<"inactive" | "success" | "failure">("inactive")
    const [selectedExpense, setSelectedExpense] = useState<Expense>()

    useEffect(() => {
        async function fetchFiltered() {
            if (!user) return
            try {
                const res = await getExpensesByFilter(user.token, activeCategory, activeMonth)
                setExpenses(res)
            } catch (err) {
                console.error(err)
            }
        }
        fetchFiltered()
    }, [activeCategory, activeMonth, user])

    useEffect(() => {
        setGroupedExpenses(groupExpensesByDate(expenses))
    }, [expenses])

    async function handleDeleteExpense() {
        if (!user || !selectedExpense) return
        try {
            await deleteExpense(user.token, selectedExpense._id)
            setPopUpMessage("Expense deleted successfully!")
            setPopUpStatus("success")
            setWarningStatus(false)
            const res = await getExpensesByFilter(user.token, activeCategory, activeMonth)
            setExpenses(res)
        } catch(err) {
            console.error(err)
        }
    }

    return (
        <div style={{ background: "var(--bg-primary)" }} className="flex min-h-screen">
            <Warning
                status={warningStatus}
                message="Are you sure you want to delete this expense?"
                cancel={() => setWarningStatus(false)}
                action={() => handleDeleteExpense()}
            />
            <PopUp status={popUpStatus} message={popUpMessage} onClose={() => setPopUpStatus("inactive")}/>
            <Sidebar activeTab={activeTab}/>

            <div className="flex-1 flex flex-col h-screen">
                <ListPageHeader
                    totalSpending={totalSpending}
                    activeCategory={activeCategory}
                    activeMonth={activeMonth}
                    setActiveCategory={setActiveCategory}
                    setActiveMonth={setActiveMonth}
                />

                {/* Mobile filters */}
                <div className="flex md:hidden gap-3 px-6 mb-5">
                    <div className="space-y-1.5">
                        <label style={{ color: "var(--text-secondary)" }} className="text-[10px] font-bold uppercase tracking-widest">
                            Category
                        </label>
                        <select
                            value={activeCategory}
                            onChange={(e) => setActiveCategory(e.target.value)}
                            style={{ background: "var(--card)", color: "var(--text-primary)", borderColor: "var(--border)" }}
                            className="w-full rounded-xl px-3 py-2 text-sm border outline-none"
                        >
                            <option value="All Categories">All Categories</option>
                            {categories.map(category =>
                                <option key={category._id} value={category.name}>{category.name}</option>
                            )}
                        </select>
                        <label style={{ color: "var(--text-secondary)" }} className="text-[10px] font-bold uppercase tracking-widest">
                            Month
                        </label>
                        <select
                            value={activeMonth}
                            onChange={(e) => setActiveMonth(e.target.value)}
                            style={{ background: "var(--card)", color: "var(--text-primary)", borderColor: "var(--border)" }}
                            className="w-full rounded-xl px-3 py-2 text-sm border outline-none"
                        >
                            <option value="">All Time</option>
                            {months.map((month, index) =>
                                <option key={month} value={index.toString()}>{month}</option>
                            )}
                        </select>
                    </div>
                </div>

                {/* Expense groups */}
                <div className="flex-1 overflow-y-auto px-6 md:px-14 pb-6 md:py-10">
                    <div className="md:max-w-3xl space-y-6 md:space-y-8">
                        {groupedExpenses.map((group) => (
                            <div key={group.group}>
                                <p style={{ color: "var(--text-secondary)" }} className="text-[10px] md:text-xs font-bold uppercase tracking-widest mb-3 md:mb-4">
                                    {group.group}
                                </p>
                                <div className="space-y-2.5 md:space-y-3">
                                    {group.items.map((item) => (
                                        <ExpenseRow
                                            key={item._id}
                                            item={item}
                                            setWarningStatus={setWarningStatus}
                                            setSelectedExpense={setSelectedExpense}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

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
    return Array.from(map.entries())
        .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
        .map(([key, items]) => ({
            group: formatGroupLabel(new Date(key)),
            items,
        }))
}

interface GroupedExpenses {
    group: string
    items: Expense[]
}