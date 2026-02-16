import BottomTabMobile from "../subcomponents/mobile/BottomTabMobile"
import IconChevron from "../svgs/IconShevron"
import IconCalendar from "../svgs/IconCalendar"
import Sidebar from "../subcomponents/desktop/Sidebar"
import StatsPageHeader from "../subcomponents/headers/StatsPageHeader"

const stats = [
    { name: "Food",          transactions: 12, amount: 300, color: "#22c55e", emoji: "🍴", iconBg: "bg-green-50"  },
    { name: "Entertainment", transactions: 4,  amount: 300, color: "#6366f1", emoji: "🎬", iconBg: "bg-indigo-50" },
    { name: "Taxi",          transactions: 8,  amount: 300, color: "#f59e0b", emoji: "🚕", iconBg: "bg-amber-50"  },
    { name: "Rent",          transactions: 1,  amount: 300, color: "#ef4444", emoji: "🏠", iconBg: "bg-red-50"    },
]

const totalSpending = stats.reduce((s, c) => s + c.amount, 0)
const maxAmount = Math.max(...stats.map((c) => c.amount))

function CategoryRow({ cat }: { cat: typeof stats[0] }) {
    const barWidth = Math.round((cat.amount / maxAmount) * 100)
    return (
        <div className="flex items-center gap-4 md:gap-5 py-4 md:py-5 px-1 md:px-2">
            <div className={`w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${cat.iconBg} flex items-center justify-center text-lg md:text-2xl shrink-0`}>
                {cat.emoji}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm md:text-base font-semibold text-gray-800">{cat.name}</p>
                <p className="text-xs md:text-sm text-gray-400 mb-2">
                    {cat.transactions} transaction{cat.transactions !== 1 ? "s" : ""}
                </p>
                <div className="h-1.5 md:h-2 bg-gray-100 rounded-full overflow-hidden w-[120px] md:w-[200px]">
                    <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${barWidth}%`, backgroundColor: cat.color }}
                    />
                </div>
            </div>
            <p className="text-sm md:text-lg font-bold text-gray-800 shrink-0">
                ${cat.amount.toFixed(2)}
            </p>
        </div>
    )
}

export default function StatsPage() {
    const activeTab = "stats"

    return (
        <div className="flex min-h-screen bg-gray-50">

            {/* Sidebar — desktop only */}
            <Sidebar activeTab={activeTab}/>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-h-screen">

                {/* Header */}
                <StatsPageHeader />

                {/* Mobile filters */}
                <div className="flex md:hidden gap-3 px-5 mb-5">
                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 bg-white text-sm text-gray-700 font-medium shadow-sm">
                        All Categories <IconChevron />
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 bg-white text-sm text-gray-700 font-medium shadow-sm">
                        Monthly <IconCalendar />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-5 md:px-14 pb-6 md:py-10">
                    <div className="md:max-w-4xl space-y-6 md:space-y-8">

                        {/* Total spending card */}
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
                            {/* Mini bar chart — desktop only */}
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

                        {/* By category */}
                        <div>
                            <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 md:mb-4 px-1 md:px-0">
                                By Category
                            </p>
                            <div className="bg-white rounded-3xl overflow-hidden divide-y divide-gray-50 shadow-sm">
                                {stats.map((cat) => (
                                    <div key={cat.name} className="px-4 md:px-6">
                                        <CategoryRow cat={cat} />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                    <div className="h-6 md:hidden" />
                </div>

                {/* Bottom nav — mobile only */}
                <div className="md:hidden">
                    <BottomTabMobile activeTab={activeTab} />
                </div>

            </div>
        </div>
    )
}