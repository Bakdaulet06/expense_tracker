import { useState } from "react"
import { useCategories } from "../../context/CategoriesProvider"
import IconChevron from "../../svgs/IconShevron"

export default function ListPageHeader(props: {totalSpending: number, activeCategory: string, activeMonth: string}){
    const {categories} = useCategories()
    const [categoryId, setCategoryId] = useState(categories[0]._id)
    return(
        <>
            <div className="px-6 md:px-14 pt-10 pb-6 md:pb-8 md:bg-white md:border-b md:border-gray-100 flex items-end justify-between">
                <div>
                    <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Spending</p>
                    <div className="flex items-center gap-3 md:gap-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                            ${props.totalSpending.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                        </h1>
                    </div>
                </div>

                {/* Filters — visible on both, slightly bigger on desktop */}
                <div className="hidden md:flex gap-3 pb-1">
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 bg-white text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                        {props.activeCategory} <IconChevron size="md" />
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 bg-white text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                        {props.activeMonth} <IconChevron size="md" />
                    </button>
                </div>
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
            </div>
        </> 
    )
}