export default function IconList({ active }: { active?: boolean }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={`w-6 h-6 ${active ? "text-indigo-500" : "text-gray-400"}`} stroke="currentColor" strokeWidth={2}>
            <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
        </svg>
    )
}