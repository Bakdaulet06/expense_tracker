export default function IconCategory({ active }: { active?: boolean }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={`w-6 h-6 ${active ? "text-indigo-500" : "text-gray-400"}`} stroke="currentColor" strokeWidth={2}>
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
    )
}