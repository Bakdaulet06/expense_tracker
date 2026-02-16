export default function IconCalendar({ size = "sm" }: { size?: "sm" | "md" }) {
    const cls = size === "md" ? "w-6 h-6" : "w-4 h-4"
    return (
        <svg viewBox="0 0 24 24" fill="none" className={`${cls} text-gray-400`} stroke="currentColor" strokeWidth={2}>
            <rect x="3" y="4" width="18" height="17" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
        </svg>
    )
}