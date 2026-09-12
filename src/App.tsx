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
        <>
            <Header />

            <QRForm
                value={text}
                onChange={setText}
                onSubmit={handleGenerate}
            />

            <QRPreview value={qrValue} />
        </>
    )
}

export default App