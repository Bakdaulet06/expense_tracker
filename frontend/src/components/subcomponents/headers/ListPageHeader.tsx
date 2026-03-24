import { useCategories } from "../../context/CategoriesProvider"

export default function ListPageHeader(props: {
  totalSpending: number
  activeCategory: string
  activeMonth: string
  setActiveCategory: (cat: string) => void
  setActiveMonth: (month: string) => void
}) {
  const { categories } = useCategories()
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

  return (
    <div className="px-6 md:px-14 pt-10 pb-6 md:pb-8 md:bg-white md:border-b md:border-gray-100 flex items-end justify-between">
      <div>
        <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
          Total Spending
        </p>
        <div className="flex items-center gap-3 md:gap-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            {props.totalSpending.toLocaleString("en-US", { minimumFractionDigits: 2 })}₸
          </h1>
        </div>
      </div>

      {/* Desktop filters */}
      <div className="hidden md:flex gap-3 pb-1">
        {/* Category */}
        <div className="space-y-1.5 md:space-y-2 col-span-1 md:col-span-2">
          <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">
            Category
          </label>
          <div className="relative">
            <select
              value={props.activeCategory}
              onChange={(e) => props.setActiveCategory(e.target.value)}
            >
              <option value="All Categories">All Categories</option>
              {categories.map(category =>
                <option key={category._id} value={category.name}>{category.name}</option>
              )}
            </select>
          </div>
        </div>

        {/* Month */}
        <div className="space-y-1.5 md:space-y-2 col-span-1 md:col-span-2">
          <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">
            Month
          </label>
          <div className="relative">
            <select
              value={props.activeMonth}
              onChange={(e) => props.setActiveMonth(e.target.value)}
            >
              <option value="">All Time</option>
              {months.map((month, index) =>
                <option key={month} value={index.toString()}>{month}</option>
              )}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}