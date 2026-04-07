export default function StatsPageHeader(){
    return(
        <>
            <div
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
                className="px-5 md:px-14 pt-10 pb-6 md:pb-8 md:border-b flex items-end justify-between"
            >
                <div>
                    <h1 style={{ color: "var(--text-primary)" }} className="text-2xl md:text-4xl font-bold">
                        Statistics
                    </h1>
                    <p
                        style={{ color: "var(--text-secondary)" }}
                        className="text-sm md:text-base mt-0.5 md:mt-1"
                    >
                        {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </p>
                </div>
            </div>
        </>
    )
}