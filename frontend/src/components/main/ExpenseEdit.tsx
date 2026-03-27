import type { Expense } from "../types/Expense"
import { useAuth } from "../context/AuthContext"
import { useState, useEffect } from "react"
import { useDate } from "../context/DateContext"
import { useCategories } from "../context/CategoriesProvider"
import { getExpense, updateExpense } from "../../api/expense"
import PopUp from "../subcomponents/PopUp"
import { useParams } from "react-router-dom"
import IconCalendar from "../svgs/IconCalendar"
import { useRef} from "react"
import { useNavigate } from "react-router-dom"

const inputClass =
    "w-full border border-gray-200 rounded-2xl px-4 md:px-5 py-3 md:py-4 text-sm md:text-base text-gray-700 placeholder-gray-300 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all bg-white"

export default function ExpenseEdit(){
    const [name, setName] = useState("")
    const [cost, setCost] = useState<number>()
    const [description, setDescription] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [popUpStatus, setPopUpStatus] = useState<"inactive" | "success" | "failure">("inactive")
    const [popUpMessage, setPopUpMessage] = useState("")
    const {expenseId} = useParams()
    const navigate = useNavigate()
    
    const {date, setDate} = useDate()
    const {user} = useAuth()
    const {categories} = useCategories()
    const inputRef = useRef<HTMLInputElement>(null)

    const formattedDate = date
        .toLocaleDateString("en-GB")
        .replace(/\//g, ".")

    function handleCalendarClick() {
        inputRef.current?.showPicker()
    }

    function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.value) return
        setDate(new Date(e.target.value))
    }
    
    useEffect(() => {
        if(categories.length && !categoryId) {
            setCategoryId(categories[0]._id)
        }
    }, [categories])

    useEffect(() => {
        async function fetchExpense(){
            if(!user || !expenseId) return
            try{
                const res = await getExpense(user.token, expenseId)
                console.log(res)
                console.log(res.date)
                console.log(user.token, expenseId)
                setName(res.name)
                setCategoryId(res.categoryId)
                setCost(res.cost)
                setDate(new Date(res.date))
                setDescription(res.description)
            }catch(err){
                console.error(err)
            }
        }

        fetchExpense()
    }, [])

    async function handleUpdateExpense(){
        if(!user || !expenseId) return
        try{
            const updatedExpense: Omit<Expense, "userId" | "_id"> = {
                name,
                cost: Number(cost) || 0,
                description,
                categoryId,
                date
            }
            await updateExpense(user.token, expenseId, updatedExpense)
            navigate("/expense/list")
        }catch(err){
            setPopUpMessage("Error! Please Fill required fields.")
            setPopUpStatus("failure")
            console.error(err)
        }
    }
    return(
        <div className="flex-1 flex flex-col h-screen">
            <PopUp message={popUpMessage} status={popUpStatus} onClose={() => setPopUpStatus("inactive")}/>
            
            <div className="flex-1 overflow-y-auto px-6 md:px-14 pb-6 md:py-10">
                <div>
                    <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Date
                    </span>

                    <div className="flex items-center gap-2 md:gap-3 mt-0.5 md:mt-1">
                        <h1 className="text-2xl md:text-4xl font-light text-gray-800">
                            {formattedDate}
                        </h1>

                        <div className="relative">
                            <button
                                onClick={handleCalendarClick}
                                className="w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors"
                            >
                                <IconCalendar />
                            </button>

                            <input
                                type="date"
                                ref={inputRef}
                                onChange={handleDateChange}
                                className="absolute right-0 top-full mt-2 opacity-0 pointer-events-none"
                            />
                        </div>
                    </div>
                </div>
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
                            <span className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-sm md:text-base text-gray-400">₸</span>
                            <input type="number" placeholder="0" className={`${inputClass} pl-8 md:pl-10`} value={cost} onChange={(e) => setCost(Number(e.target.value))}/>
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
                    <div className="col-span-1 md:col-span-2 pt-1 md:pt-2 flex flex-col md:flex-row md:gap-5">
                        <button
                            type="submit"
                            className="w-full md:w-auto bg-indigo-500 hover:bg-indigo-600 active:scale-[0.98] text-white font-semibold text-sm md:text-base py-4 md:px-14 rounded-2xl shadow-lg shadow-indigo-100 transition-all"
                            onClick={handleUpdateExpense}
                        >
                            Save Expense
                        </button>
                        <button 
                            className="w-full md:w-[300px] font-semibold text-sm md:text-base py-4 md:px-14 rounded-2xl shadow-lg transition-all active:scale-[0.98] hover:opacity-90 mt-3 cursor-pointer"
                            onClick={() => navigate("/expense/list")}>
                            Cancel
                        </button>
                    </div>
                </form>

                <div className="h-6 md:hidden" />
            </div>
        </div>
    )   
}