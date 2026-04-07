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
    <div
      style={{ background: "var(--card)", borderBottomColor: "var(--border)" }}
      className="px-6 md:px-14 pt-10 pb-6 md:pb-8 md:border-b flex items-end justify-between"
    >
      <div>
        <p style={{ color: "var(--text-secondary)" }} className="text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1">
          Total Spending
        </p>
        <h1 style={{ color: "var(--text-primary)" }} className="text-4xl md:text-5xl font-bold">
          {props.totalSpending.toLocaleString("en-US", { minimumFractionDigits: 2 })}₸
        </h1>
      </div>

      {/* Desktop filters */}
      <div className="hidden md:flex gap-3 pb-1">
        <div className="space-y-1.5 md:space-y-2">
          <label style={{ color: "var(--text-secondary)" }} className="text-[10px] md:text-xs font-bold uppercase tracking-widest">
            Category
          </label>
          <select
            value={props.activeCategory}
            onChange={(e) => props.setActiveCategory(e.target.value)}
            style={{ background: "var(--card)", color: "var(--text-primary)", borderColor: "var(--border)" }}
            className="w-full rounded-xl px-3 py-2 text-sm border outline-none"
          >
            <option value="All Categories">All Categories</option>
            {categories.map(category =>
              <option key={category._id} value={category.name}>{category.name}</option>
            )}
          </select>
        </div>

        <div className="space-y-1.5 md:space-y-2">
          <label style={{ color: "var(--text-secondary)" }} className="text-[10px] md:text-xs font-bold uppercase tracking-widest">
            Month
          </label>
          <select
            value={props.activeMonth}
            onChange={(e) => props.setActiveMonth(e.target.value)}
            style={{ background: "var(--card)", color: "var(--text-primary)", borderColor: "var(--border)" }}
            className="w-full rounded-xl px-3 py-2 text-sm border outline-none"
          >
            <option value="">All Time</option>
            {months.map((month, index) =>
              <option key={month} value={index.toString()}>{month}</option>
            )}
          </select>
        </div>
      </div>
    </div>
  )
}