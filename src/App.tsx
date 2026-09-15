import { useState } from "react"
import Header from "./components/Header"
import QRForm from "./components/QRForm"
import QRPreview from "./components/QRPreview"

function App() {
    const [text, setText] = useState("")
    const [qrValue, setQrValue] = useState("")

    const handleGenerate = () => {
        setQrValue(text)
    }

    return (
        <main className="min-h-screen bg-neutral-950 text-neutral-50 antialiased">
            <div className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-6 py-12 sm:px-8">
                <Header />

                <div className="mt-12 grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                    <QRForm
                        value={text}
                        onChange={setText}
                        onSubmit={handleGenerate}
                    />

                    <QRPreview value={qrValue} />
                </div>
            </div>
        </main>
    )
}

export default App