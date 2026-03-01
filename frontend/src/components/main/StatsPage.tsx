import BottomTabMobile from "../subcomponents/mobile/BottomTabMobile"
import Sidebar from "../subcomponents/desktop/Sidebar"
import StatsPageHeader from "../subcomponents/headers/StatsPageHeader"
import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { getStats } from "../../api/expense"
import type {Stats} from "../types/Stats"
import StatsRow from "../subcomponents/CategoryRow"

export default function StatsPage() {
    const activeTab = "stats"
    const {user} = useAuth()
    const timeFilters = ["Daily", "Weekly", "Monthly", "All Time"];
    const [activeTimeFilter, setActiveTimeFilter] = useState("Monthly");
    const [stats, setStats] = useState<Stats[]>([])
    const [totalSpending, setTotalSpending] = useState(0)
    const maxAmount = Math.max(...stats.map((c) => c.amount))

    useEffect(() => {
        async function fetchFiltered() {
            if (!user) return
            try {
                const res = await getStats(user.token, activeTimeFilter)
                setStats(res)
                setTotalSpending(res.reduce((s, c) => s + c.amount, 0))
                console.log("Stats response:", res)
            } catch (err) {
                console.error(err)
            }}
        fetchFiltered()
    }, [activeTimeFilter, user])

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar activeTab={activeTab}/>
            <div className="flex-1 flex flex-col min-h-screen">
                <StatsPageHeader />
                <div className="flex md:hidden gap-3 px-6 mb-5">
                    <div className="space-y-1.5 md:space-y-2 col-span-1 md:col-span-2">
                        <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Time</label>
                        <div className="relative">
                            <select value={activeTimeFilter} onChange={(e) => setActiveTimeFilter(e.target.value)}>
                                <option value="">All Time</option>
                                {timeFilters.map((time, index) => 
                                    <option key={time} value={index.toString()}>{time}</option>
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
                                {stats.map((stat) => (
                                    <div key={stat.name} className="px-4 md:px-6">
                                        <StatsRow stats={stat} />
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