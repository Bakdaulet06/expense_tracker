import type { Stats } from "../types/Stats"
export default function StatsRow({ stats }: { stats: Stats }) {
    return (
        <div className="flex items-center gap-4 md:gap-5 py-4 md:py-5 px-1 md:px-2">
            <div className={`w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center text-lg md:text-2xl shrink-0`}
                style={{ backgroundColor: stats.color + "33" }}>
                {stats.emoji}
            </div>
            <div className="flex-1 min-w-0">
                <p style={{ color: "var(--text-primary)" }} className="text-sm md:text-base font-semibold">
                    {stats.name}
                </p>
                <p style={{ color: "var(--text-secondary)" }} className="text-xs md:text-sm mb-2">
                    {stats.transactions} transaction{stats.transactions !== 1 ? "s" : ""}
                </p>
            </div>
            <p style={{ color: "var(--text-primary)" }} className="text-sm md:text-lg font-bold shrink-0">
                {stats.amount.toFixed(2)}₸
            </p>
        </div>
    )
}