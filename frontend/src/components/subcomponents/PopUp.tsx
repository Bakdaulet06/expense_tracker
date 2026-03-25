import { useEffect } from "react"

type PopUpInfo = {
    status: "success" | "failure" | "inactive",
    message: string,
    onClose: () => void,
}

export default function PopUp(props: PopUpInfo) {
    const { status, message, onClose } = props

    useEffect(() => {
        if (status === "inactive") return
        const timer = setTimeout(() => onClose(), 2000)
        return () => clearTimeout(timer)
    }, [status])

    if (status === "inactive") return null

    const isSuccess = status === "success"

    return (
        <div className={`
                fixed top-6 left-1/2 z-50
                flex items-center gap-3
                px-5 py-3.5 rounded-2xl
                shadow-lg backdrop-blur-sm
                animate-slide-up
                max-w-[90vw] w-fit min-w-[220px]
                ${isSuccess
                    ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                    : "bg-red-50 border border-red-200 text-red-600"
                }
            `}
        >
            <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center
                ${isSuccess ? "bg-emerald-100" : "bg-red-100"}`}
            >
                {isSuccess ? (
                    <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                ) : (
                    <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
                        <path d="M3 3l6 6M9 3l-6 6" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                )}
            </div>
            <span className="text-sm font-medium leading-snug">{message}</span>
        </div>
    )
}