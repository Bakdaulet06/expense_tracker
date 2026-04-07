import MainPageHeader from "../subcomponents/headers/MainPageHeader"
import BottomTabMobile from "../subcomponents/mobile/BottomTabMobile"
import Sidebar from "../subcomponents/desktop/Sidebar"
import type { Expense } from "../types/Expense"
import { useAuth } from "../context/AuthContext"
import { useState, useEffect } from "react"
import { useDate } from "../context/DateContext"
import { useCategories } from "../context/CategoriesProvider"
import { addExpense } from "../../api/expense"
import PopUp from "../subcomponents/PopUp"

export default function MainPage() {
    const [name, setName] = useState("")
    const [cost, setCost] = useState("")
    const [description, setDescription] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [popUpStatus, setPopUpStatus] = useState<"inactive" | "success" | "failure">("inactive")
    const [popUpMessage, setPopUpMessage] = useState("")
    
    const {date, setDate} = useDate()
    const {user} = useAuth()
    const {categories} = useCategories()
    const activeTab = "add"
    
    useEffect(() => {
        if(categories.length && !categoryId) {
            setCategoryId(categories[0]._id)
        }
    }, [categories])

    async function handleAddExpense(){
        if(!user) return
        try{
            const newExpense: Omit<Expense, "userId" | "_id"> = {
                name,
                cost: Number(cost) || 0,
                description,
                categoryId,
                date
            }
            await addExpense(newExpense, user.token)
            setPopUpMessage("Expense created Successfully!")
            setPopUpStatus("success")
            setCost("")
            setName("")
            setDescription("")
            setDate(new Date())
            setCategoryId(categories[0]?._id ?? "")
        }catch(err){
            setPopUpMessage("Error! Please Fill required fields.")
            setPopUpStatus("failure")
            console.error(err)
        }
    }

    return (
        <div style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }} className="flex min-h-screen">
            <Sidebar activeTab={activeTab}/>
            <div className="flex-1 flex flex-col h-screen">
                <PopUp message={popUpMessage} status={popUpStatus} onClose={() => setPopUpStatus("inactive")}/>
                <MainPageHeader />

                {/* Form area */}
                <div className="flex-1 overflow-y-auto px-6 md:px-14 pb-6 md:py-10">
                    <h2 style={{ color: "var(--text-primary)" }} className="text-lg md:text-2xl font-semibold mb-6 md:mb-8">
                        Add a new Expense
                    </h2>

                    <form
                        className="md:max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-x-8 md:gap-y-7"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        {/* Name */}
                        <div className="space-y-1.5 md:space-y-2">
                            <label style={{ color: "var(--text-secondary)" }} className="text-[10px] md:text-xs font-bold uppercase tracking-widest">
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. Pasta Dinner"
                                style={{
                                    background: "var(--card)",
                                    color: "var(--text-primary)",
                                    borderColor: "var(--border)",
                                }}
                                className="w-full rounded-2xl px-4 md:px-5 py-3 md:py-4 text-sm md:text-base outline-none transition-all border placeholder-gray-400 focus:ring-2 focus:ring-indigo-50 focus:border-indigo-400"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        {/* Cost */}
                        <div className="space-y-1.5 md:space-y-2">
                            <label style={{ color: "var(--text-secondary)" }} className="text-[10px] md:text-xs font-bold uppercase tracking-widest">
                                Cost
                            </label>
                            <div className="relative">
                                <span style={{ color: "var(--text-secondary)" }} className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-sm md:text-base">
                                    ₸
                                </span>
                                <input
                                    type="number"
                                    placeholder="0"
                                    style={{
                                        background: "var(--card)",
                                        color: "var(--text-primary)",
                                        borderColor: "var(--border)",
                                    }}
                                    className="w-full rounded-2xl pl-8 md:pl-10 px-4 md:px-5 py-3 md:py-4 text-sm md:text-base outline-none transition-all border placeholder-gray-400 focus:ring-2 focus:ring-indigo-50 focus:border-indigo-400"
                                    value={cost}
                                    onChange={(e) => setCost(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Category */}
                        <div className="space-y-1.5 md:space-y-2 col-span-1 md:col-span-2">
                            <label style={{ color: "var(--text-secondary)" }} className="text-[10px] md:text-xs font-bold uppercase tracking-widest">
                                Category
                            </label>
                            <select
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                style={{
                                    background: "var(--card)",
                                    color: "var(--text-primary)",
                                    borderColor: "var(--border)",
                                }}
                                className="w-full rounded-2xl px-4 md:px-5 py-3 md:py-4 text-sm md:text-base outline-none transition-all border focus:ring-2 focus:ring-indigo-50 focus:border-indigo-400"
                            >
                                {categories.map(category =>
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                )}
                            </select>
                        </div>

                        {/* Description */}
                        <div className="space-y-1.5 md:space-y-2 col-span-1 md:col-span-2">
                            <label style={{ color: "var(--text-secondary)" }} className="text-[10px] md:text-xs font-bold uppercase tracking-widest">
                                Description
                            </label>
                            <textarea
                                placeholder="Add a short note..."
                                rows={4}
                                style={{
                                    background: "var(--card)",
                                    color: "var(--text-primary)",
                                    borderColor: "var(--border)",
                                }}
                                className="w-full rounded-2xl px-4 md:px-5 py-3 md:py-4 text-sm md:text-base outline-none transition-all border placeholder-gray-400 focus:ring-2 focus:ring-indigo-50 focus:border-indigo-400 resize-none"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        {/* Submit */}
                        <div className="col-span-1 md:col-span-2 pt-1 md:pt-2">
                            <button
                                type="submit"
                                className="w-full md:w-auto bg-indigo-500 hover:bg-indigo-600 active:scale-[0.98] text-white font-semibold text-sm md:text-base py-4 md:px-14 rounded-2xl shadow-lg transition-all"
                                onClick={handleAddExpense}
                            >
                                Save Expense
                            </button>
                        </div>
                    </form>

                    <div className="h-6 md:hidden" />
                </div>

                <div className="md:hidden">
                    <BottomTabMobile activeTab={activeTab} />
                </div>
            </div>
        </div>
    )
}