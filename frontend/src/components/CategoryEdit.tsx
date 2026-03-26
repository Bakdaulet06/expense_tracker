import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Category } from "./types/Category";
import { useAuth } from "./context/AuthContext";
import { getCategory } from "../api/expense";
import CategoryForm from "./subcomponents/CategoryForm";
import PopUp from "./subcomponents/PopUp";

export default function CategoryEdit() {
    const { categoryId } = useParams();
    const { user } = useAuth()
    const [popUpMessage, setPopUpMessage] = useState("")
    const [popUpStatus, setPopUpStatus] = useState<"inactive" | "success" | "failure">("inactive")
    const navigate = useNavigate()

    const [category, setCategory] = useState<Category>()
    useEffect(() => {
        async function fetchCategory() {
            if (!user || !categoryId) return
            try {
                const res: Category = await getCategory(user.token, categoryId)
                setCategory(res)
            } catch (err) {
                setPopUpMessage("asdf")
                setPopUpStatus("failure")
                console.error(err)
            }
        }
        fetchCategory()
    }, [user, categoryId])

    return (
        <>
            <div className="flex-1 overflow-y-auto px-6 md:px-14 pb-6 md:py-10">
                <div className="flex flex-col md:gap-12 md:max-w-5xl">
                    <PopUp status={popUpStatus} message={popUpMessage} onClose={() => setPopUpStatus("inactive")} />
                    <div className="flex-1 min-w-0">

                        <CategoryForm
                            category={category}
                            btnClass="w-full md:w-[300px] text-white font-semibold text-sm md:text-base py-4 md:px-14 rounded-2xl shadow-lg transition-all active:scale-[0.98] hover:opacity-90"
                            circleSize="w-9 h-9 md:w-11 md:h-11"
                            plusSize="w-4 h-4 md:w-5 md:h-5"
                            setPopUpMessage={setPopUpMessage}
                            setPopUpStatus={setPopUpStatus}
                            inputClass="w-full border border-gray-200 rounded-2xl px-4 md:px-5 py-3 md:py-4 text-sm md:text-base text-gray-700 placeholder-gray-300 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50 transition-all bg-white"
                        />
                        <button className="w-full md:w-[300px] font-semibold text-sm md:text-base py-4 md:px-14 rounded-2xl shadow-lg transition-all active:scale-[0.98] hover:opacity-90 mt-3 cursor-pointer"
                        onClick={() => navigate("/expense/categories")}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}