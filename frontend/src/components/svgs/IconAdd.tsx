export default function IconAdd({ active }: { active?: boolean }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={`w-6 h-6 ${active ? "text-indigo-500" : "text-gray-400"}`} stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v8M8 12h8" strokeLinecap="round" />
        </svg>
    )
}