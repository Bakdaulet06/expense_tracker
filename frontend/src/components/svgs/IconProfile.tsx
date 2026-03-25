// src/svgs/IconProfile.tsx
export default function IconProfile({ active }: { active: boolean }) {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle
                cx="12" cy="8" r="4"
                stroke={active ? "#6366f1" : "#9ca3af"}
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                stroke={active ? "#6366f1" : "#9ca3af"}
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    )
}