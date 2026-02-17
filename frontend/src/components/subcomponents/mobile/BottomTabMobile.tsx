import IconAdd from "../../svgs/IconAdd"
import IconList from "../../svgs/IconList"
import IconStats from "../../svgs/IconStats"
import IconCategory from "../../svgs/IconCategory"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export default function BottomTabMobile(props: { activeTab: string }) {
    const navigate = useNavigate()
    const {user} = useAuth()
    const navItems = [
        { key: "add",        label: "Add",        path: "/expense/add-expense",               Icon: IconAdd      },
        { key: "list",       label: "List",       path: "/expense/list",           Icon: IconList     },
        { key: "stats",      label: "Stats",      path: "/expense/stats",          Icon: IconStats    },
        { key: "categories", label: "Categories", path: `/expense/categories`, Icon: IconCategory },
    ]

    return (
        <div className="sticky bottom-0 border-t border-gray-100 px-6 py-3 flex justify-between items-center bg-white">
            {navItems.map(({ key, label, Icon, path }) => (
                <button key={key} onClick={() => navigate(path)} className="flex flex-col items-center gap-1">
                    <Icon active={props.activeTab === key} />
                    <span className={`text-[9px] font-bold uppercase tracking-widest ${props.activeTab === key ? "text-indigo-500" : "text-gray-400"}`}>
                        {label}
                    </span>
                </button>
            ))}
        </div>
    )
}