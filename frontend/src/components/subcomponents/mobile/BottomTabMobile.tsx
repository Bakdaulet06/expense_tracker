import IconAdd from "../../svgs/IconAdd"
import IconList from "../../svgs/IconList"
import IconStats from "../../svgs/IconStats"
import IconCategory from "../../svgs/IconCategory"
import IconProfile from "../../svgs/IconProfile"
import { useNavigate } from "react-router-dom"

export default function BottomTabMobile(props: { activeTab: string }) {
    const navigate = useNavigate()
    const navItems = [
        { key: "add",        label: "Add",        path: "/expense/add-expense",   Icon: IconAdd      },
        { key: "list",       label: "List",       path: "/expense/list",           Icon: IconList     },
        { key: "stats",      label: "Stats",      path: "/expense/stats",          Icon: IconStats    },
        { key: "categories", label: "Categories", path: "/expense/categories",     Icon: IconCategory },
        { key: "profile",    label: "Profile",    path: "/expense/profile",        Icon: IconProfile  },
    ]

    return (
        <div
            style={{ background: "var(--card)", borderTopColor: "var(--border)" }}
            className="sticky bottom-0 border-t px-6 py-3 flex justify-between items-center"
        >
            {navItems.map(({ key, label, Icon, path }) => (
                <button key={key} onClick={() => navigate(path)} className="flex flex-col items-center gap-1">
                    <Icon active={props.activeTab === key} />
                    <span
                        style={{ color: props.activeTab === key ? "var(--indigo-active)" : "var(--text-secondary)" }}
                        className="text-[9px] font-bold uppercase tracking-widest"
                    >
                        {label}
                    </span>
                </button>
            ))}
        </div>
    )
}