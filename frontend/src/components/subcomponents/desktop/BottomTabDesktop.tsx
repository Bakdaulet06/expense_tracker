import IconAdd from "../../svgs/IconAdd"
import IconList from "../../svgs/IconList"
import IconStats from "../../svgs/IconStats"
import IconCategory from "../../svgs/IconCategory"
import { useNavigate } from "react-router-dom"

export default function BottomTabDesktop(props: {activeTab: string}){
    const navigate = useNavigate()
    const navItems = [
        { key: "add",        label: "Add",        path: "/expense/add-expense",               Icon: IconAdd      },
        { key: "list",       label: "List",       path: "/expense/list",           Icon: IconList     },
        { key: "stats",      label: "Stats",      path: "/expense/stats",          Icon: IconStats    },
        { key: "categories", label: "Categories", path: `/expense/categories`, Icon: IconCategory },
    ]
    return(
        <nav className="flex flex-col gap-1.5 flex-1">
            {navItems.map(({ key, label, Icon, path }) => (
                <button
                    key={key}
                    onClick={() => navigate(path)}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl text-base font-medium transition-all text-left ${
                        props.activeTab === key
                            ? "bg-indigo-50 text-indigo-600"
                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    }`}
                >
                    <Icon active={props.activeTab === key} />
                    {label}
                </button>
            ))}
        </nav>
    )
}