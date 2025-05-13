import Logo from '../../assets/TrackIt_Logo.svg'

export function Login() {
    return (
        <div className="grid grid-cols-2">
            <div>
                <header>
                    <div className="pt-[3.75rem] pl-[3.75rem]">
                        <img className="w-28 h-24" src={Logo} alt="Logo Track It" />
                    </div>
                </header>
                <main>
                    <div className="display: flex flex-col items-center mt-[4rem] mb-[4rem] gap-[0.75rem]">
                        <h2
                            className="justify-start text-slate-800 text-[1.5rem] font-semibold leading-loose font-'[Inter]'">
                            Bem-vindo ao TrackIT
                        </h2>
                        <h1
                            className={`justify-start text-[2rem] text-slate-950  font-bold leading-[3rem]  font-'[Inter]'`}>
                            Entre com suas credenciais
                        </h1>
                    </div>

                    <div className="w-full flex justify-center items-center">
                        <div className="w-[37.5rem] flex flex-col justify-center items-center gap-[1rem]">

                            <div className="w-[100%]">
                                <label
                                    className={`justify-start text-slate-950 text-base font-normal leading-normal text-[1rem]  font-'[Inter]'`}>
                                    E-mail:
                                </label>
                                <input
                                    type="text"
                                    placeholder='Digite seu e-mail'
                                    className={`w-[100%] h-[2.5rem] border-1 border-slate-500 text-[0.875rem] font-normal leading-[20px]  font-'[Inter]' rounded-[6px]`}
                                />
                            </div>

                            <div className="w-[100%]">
                                <label
                                    className={`justify-start text-slate-950 text-base font-normal leading-normal text-[1rem]  font-'[Inter]'`}>
                                    Senha:
                                </label>
                                <input
                                    type="text"
                                    placeholder='Digite sua senha'
                                    className={`w-[100%] h-[2.5rem] border-1 border-slate-500 text-[0.875rem] font-normal leading-[20px]  font-'[Inter]' rounded-[6px]`}
                                />
                            </div>

                            <div className="w-[100%]">
                                <button className={`bg-sky-700 w-[100%] h-[3rem] text-slate-100`}>
                                    Login
                                </button>
                            </div>

                        </div></div>


                </main>
                <footer>

                </footer>
            </div>

            <aside>

            </aside>
        </div>
    )
}