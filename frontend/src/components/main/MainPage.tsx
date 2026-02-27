import MainPageHeader from "../subcomponents/headers/MainPageHeader"
import BottomTabMobile from "../subcomponents/mobile/BottomTabMobile"
import Sidebar from "../subcomponents/desktop/Sidebar"
import type { Expense } from "../types/Expense"
import { useAuth } from "../context/AuthContext"
import { useState, useEffect } from "react"
import { useDate } from "../context/DateContext"
import { useCategories } from "../context/CategoriesProvider"
import { addExpense } from "../../api/expense"

const inputClass =
    "w-full border border-gray-200 rounded-2xl px-4 md:px-5 py-3 md:py-4 text-sm md:text-base text-gray-700 placeholder-gray-300 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all bg-white"

export default function MainPage() {
    const [name, setName] = useState("")
    const [cost, setCost] = useState("")
    const [description, setDescription] = useState("")
    const [categoryId, setCategoryId] = useState("")
    
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
            setCost("")
            setName("")
            setDescription("")
            setDate(new Date())
            setCategoryId("")
        }catch(err){
            console.error(err)
        }
    }
    return (
        <div className="flex min-h-screen bg-white md:bg-gray-50">
            <Sidebar activeTab={activeTab}/>
            <div className="flex-1 flex flex-col min-h-screen">
                <MainPageHeader />

                {/* Form area */}
                <div className="flex-1 overflow-y-auto px-6 md:px-14 pb-6 md:py-10">
                    <h2 className="text-lg md:text-2xl font-semibold text-gray-800 mb-6 md:mb-8">Add a new Expense</h2>

                    <form
                        className="md:max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-x-8 md:gap-y-7"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        {/* Name */}
                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Name</label>
                            <input type="text" placeholder="e.g. Pasta Dinner" className={inputClass} value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>

                        {/* Cost */}
                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Cost</label>
                            <div className="relative">
                                <span className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-sm md:text-base text-gray-400">$</span>
                                <input type="number" placeholder="0" className={`${inputClass} pl-8 md:pl-10`} value={cost} onChange={(e) => setCost(e.target.value)}/>
                            </div>
                        </div>

                        {/* Category — full width on both */}
                        <div className="space-y-1.5 md:space-y-2 col-span-1 md:col-span-2">
                            <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Category</label>
                            <div className="relative">
                                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                                    {categories.map(category => 
                                        <option key={category._id} value={category._id}>{category.name}</option>
                                    )}
                                </select>
                            </div>
                        </div>

                        {/* Description — full width on both */}
                        <div className="space-y-1.5 md:space-y-2 col-span-1 md:col-span-2">
                            <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Description</label>
                            <textarea
                                placeholder="Add a short note..."
                                rows={4}
                                className={`${inputClass} resize-none`}
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        {/* Submit — full width on both */}
                        <div className="col-span-1 md:col-span-2 pt-1 md:pt-2">
                            <button
                                type="submit"
                                className="w-full md:w-auto bg-indigo-500 hover:bg-indigo-600 active:scale-[0.98] text-white font-semibold text-sm md:text-base py-4 md:px-14 rounded-2xl shadow-lg shadow-indigo-100 transition-all"
                                onClick={handleAddExpense}
                            >
                                Save Expense
                            </button>
                        </div>
                    </form>

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