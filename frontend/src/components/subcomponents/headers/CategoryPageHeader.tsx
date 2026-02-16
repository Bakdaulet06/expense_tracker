import { useAuth } from "../../context/AuthContext"

export default function CategoryPageHeader(){
    const {user} = useAuth()
    return(
        <>
        <div className="px-6 md:px-14 pt-10 pb-6 md:pb-8 md:bg-white md:border-b md:border-gray-100 flex items-end justify-between">
            <div>
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900">Create category</h1>
                <p className="text-sm md:text-base text-gray-400 mt-1">Organize your spending habits</p>
            </div>
            {user && (
                <p className="hidden md:block text-base text-gray-400 pb-1">
                    Hello, <span className="font-semibold text-gray-600">{user.email?.split("@")[0]}</span>
                </p>
            )}
        </div>
        </>
    )
}