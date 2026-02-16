export default function IconPlus({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className ?? "w-5 h-5 text-gray-400"} stroke="currentColor" strokeWidth={2.5}>
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
        </svg>
    )
}