type WarningInfo = {
    status: boolean,
    message: string,
    cancel: () => void
    action: () => void
}

export default function Warning(props: WarningInfo) {
    const { status, message, action, cancel } = props

    return (
        status ?
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-[90%]">
                {message}
                <div className="flex justify-end gap-3 mt-6">
                    <button onClick={cancel} className="px-5 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer">No</button>
                    <button onClick={action} className="px-5 py-2 rounded bg-gray-900 text-white hover:bg-gray-700 transition-colors cursor-pointer">Yes</button>
                </div>
            </div>
        </div>
        :
        null
    )
}