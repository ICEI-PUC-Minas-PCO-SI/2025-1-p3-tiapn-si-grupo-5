export function DefaultSpinner() {
    return (
        <div className="flex items-center justify-center w-screen h-screen min-h-[200px]">
            <div
                className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-slate-800 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-slate-900 dark:border-slate-300 dark:border-r-transparent dark:text-slate-300"
                role="status">
                <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Carregando...</span>
            </div>
        </div>
    )
}