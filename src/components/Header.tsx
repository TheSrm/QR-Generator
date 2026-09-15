function Header() {
    return (
        <header className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
                QR Generator
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-50 sm:text-5xl">
                Crea un QR limpio en segundos
            </h1>

            <p className="mt-5 text-base leading-7 text-neutral-400">
                Pega una URL o texto, genera el código y úsalo sin distracciones.
            </p>
        </header>
    )
}

export default Header