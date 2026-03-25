import CategoryPageHeader from "../subcomponents/headers/CategoryPageHeader"
import CategoryForm from "../subcomponents/CategoryForm"
import CategoryCard from "../subcomponents/CategoryCard"
import BottomTabMobile from "../subcomponents/mobile/BottomTabMobile"
import Sidebar from "../subcomponents/desktop/Sidebar"
import {getCategories} from "../../api/expense"
import { useEffect, useState } from "react"
import { useCategories } from "../context/CategoriesProvider"
import type { Category } from "../types/Category"
import { useAuth } from "../context/AuthContext"
import PopUp from "../subcomponents/PopUp"

const inputClass =
    "w-full border border-gray-200 rounded-2xl px-4 md:px-5 py-3 md:py-4 text-sm md:text-base text-gray-700 placeholder-gray-300 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all bg-white"

export default function CreateCategoryPage() {
    const activeTab = "categories"
    const {categories, setCategories} = useCategories()
    const {user} = useAuth()
    const [popUpMessage, setPopUpMessage] = useState("")
    const [popUpStatus, setPopUpStatus] = useState<"inactive" | "success" | "failure">("inactive")

    useEffect(() => {
        async function fetchCategories() {
            if(!user) return
            try {
                const res: Category[] = await getCategories(user?.token)
                setCategories(res)
            } catch (err) {
                console.error(err)
            }
        }

        fetchCategories()
    }, []) 

    return (
        <div className="flex min-h-screen bg-white md:bg-gray-50">
            <Sidebar activeTab={activeTab}/>
            <PopUp message={popUpMessage} status={popUpStatus} onClose={() => setPopUpStatus("inactive")}/>
            {/* Main content */}
            <div className="flex-1 flex flex-col h-screen">

                {/* Header */}
                <CategoryPageHeader />

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 md:px-14 pb-6 md:py-10">
                    <div className="flex flex-col md:flex-row md:gap-12 md:max-w-5xl">

                        {/* Form */}
                        <div className="flex-1 min-w-0">
                            <CategoryForm
                                inputClass={inputClass}
                                btnClass="w-full md:w-auto text-white font-semibold text-sm md:text-base py-4 md:px-14 rounded-2xl shadow-lg transition-all active:scale-[0.98] hover:opacity-90"
                                circleSize="w-9 h-9 md:w-11 md:h-11"
                                plusSize="w-4 h-4 md:w-5 md:h-5"
                                setPopUpMessage={setPopUpMessage}
                                setPopUpStatus={setPopUpStatus}
                            />
                        </div>

                        {/* Existing categories */}
                        <div className="mt-10 md:mt-0 md:w-80 md:shrink-0">
                            <div className="flex items-center justify-between mb-4 md:mb-5">
                                <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Existing</span>
                                <span className="text-[10px] md:text-xs font-bold text-indigo-400 uppercase tracking-widest">{categories.length} active</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3 md:gap-4">
                                {categories.map((cat) => (
                                    <CategoryCard key={cat.name} cat={cat} size="sm"/>
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