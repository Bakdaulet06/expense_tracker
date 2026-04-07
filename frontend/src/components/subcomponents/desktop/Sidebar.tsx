import IconZen from "../../svgs/IconZen"
import BottomTabDesktop from "./BottomTabDesktop"

export default function Sidebar({activeTab}: {activeTab: string}){
    return(
        <>
            <aside
                style={{ background: "var(--card)", borderRightColor: "var(--border)" }}
                className="hidden md:flex w-72 border-r flex-col px-7 py-10 shrink-0"
            >
                <div className="flex items-center gap-3 mb-12 px-2">
                    <div className="w-11 h-11 bg-indigo-50 rounded-xl flex items-center justify-center">
                        <IconZen />
                    </div>
                    <div>
                        <p style={{ color: "var(--text-primary)" }} className="text-base font-semibold leading-none">ZenFinance</p>
                        <p style={{ color: "var(--text-secondary)" }} className="text-xs mt-0.5">Expense Tracker</p>
                    </div>
                </div>

                <BottomTabDesktop activeTab={activeTab} />
            </aside>
        </>
    )
}