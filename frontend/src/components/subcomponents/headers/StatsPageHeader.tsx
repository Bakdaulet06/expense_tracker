import IconChevron from "../../svgs/IconShevron"
import IconCalendar from "../../svgs/IconCalendar"

export default function StatsPageHeader(){
    return(
        <>
            <div className="px-5 md:px-14 pt-10 pb-6 md:pb-8 md:bg-white md:border-b md:border-gray-100 flex items-end justify-between">
                <div>
                    <h1 className="text-2xl md:text-4xl font-bold text-gray-900">Statistics</h1>
                    <p className="text-sm md:text-base text-gray-400 mt-0.5 md:mt-1">January 2026</p>
                </div>
                {/* Filters — shift to header on desktop, below title on mobile */}
                <div className="hidden md:flex gap-3 pb-1">
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 bg-white text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm">
                        All Categories <IconChevron size="md" />
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 bg-white text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm">
                        Monthly <IconCalendar />
                    </button>
                </div>
            </div>
        </>
    )
}