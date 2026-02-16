export default function IconChevron({ size = "sm" }: { size?: "sm" | "md" }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={`${size === "md" ? "w-4 h-4" : "w-3 h-3"} text-gray-500 pointer-events-none`} stroke="currentColor" strokeWidth={2.5}>
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}