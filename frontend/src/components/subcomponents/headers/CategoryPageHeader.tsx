export default function CategoryPageHeader(){
    return(
        <>
        <div
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
            className="px-6 md:px-14 pt-10 pb-6 md:pb-8 md:border-b flex items-end justify-between"
        >
            <div>
                <h1 style={{ color: "var(--text-primary)" }} className="text-2xl md:text-4xl font-bold">
                    Create category
                </h1>
                <p style={{ color: "var(--text-secondary)" }} className="text-sm md:text-base mt-1">
                    Organize your spending habits
                </p>
            </div>
        </div>
        </>
    )
}