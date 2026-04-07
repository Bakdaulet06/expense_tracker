import IconAdd from "../../svgs/IconAdd"
import IconList from "../../svgs/IconList"
import IconStats from "../../svgs/IconStats"
import IconCategory from "../../svgs/IconCategory"
import IconProfile from "../../svgs/IconProfile"
import { useNavigate } from "react-router-dom"

export default function BottomTabDesktop(props: {activeTab: string}){
    const navigate = useNavigate()
    const navItems = [
        { key: "add",        label: "Add",        path: "/expense/add-expense",   Icon: IconAdd      },
        { key: "list",       label: "List",       path: "/expense/list",           Icon: IconList     },
        { key: "stats",      label: "Stats",      path: "/expense/stats",          Icon: IconStats    },
        { key: "categories", label: "Categories", path: `/expense/categories`,     Icon: IconCategory },
        { key: "profile",    label: "Profile",    path: "/expense/profile",        Icon: IconProfile  },
    ]

    return(
        <nav className="flex flex-col gap-1.5 flex-1">
            {navItems.map(({ key, label, Icon, path }) => (
                <button
                    key={key}
                    onClick={() => navigate(path)}
                    style={
                        props.activeTab === key
                            ? { background: "var(--indigo-subtle)", color: "var(--indigo-active)" }
                            : { color: "var(--text-secondary)" }
                    }
                    onMouseEnter={e => {
                        if (props.activeTab !== key) {
                            (e.currentTarget as HTMLElement).style.background = "var(--bg-secondary)"
                            ;(e.currentTarget as HTMLElement).style.color = "var(--text-primary)"
                        }
                    }}
                    onMouseLeave={e => {
                        if (props.activeTab !== key) {
                            (e.currentTarget as HTMLElement).style.background = "transparent"
                            ;(e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"
                        }
                    }}
                    className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-base font-medium transition-all text-left"
                >
                    <Icon active={props.activeTab === key} />
                    {label}
                </button>
            ))}
        </nav>
    )
}