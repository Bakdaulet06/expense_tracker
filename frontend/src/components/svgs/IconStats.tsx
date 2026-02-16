export default function IconStats({ active }: { active?: boolean }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={`w-6 h-6 ${active ? "text-indigo-500" : "text-gray-400"}`} stroke="currentColor" strokeWidth={2}>
            <path d="M4 20V14M9 20V8M14 20V12M19 20V4" strokeLinecap="round" />
        </svg>
    )
}