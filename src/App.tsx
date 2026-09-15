import Header from "./components/Header"
import QRForm from "./components/QRForm"
import QRPreview from "./components/QRPreview"
import { useQRState } from "./hooks/UseQRState"

function App() {
    const qr = useQRState()

    return (
        <main className="min-h-screen bg-neutral-950 text-neutral-50 antialiased">
            <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
                <Header />

                <div className="mt-12 grid gap-8 md:grid-cols-2">
                    <QRForm
                        mode={qr.mode}
                        onModeChange={qr.setMode}
                        value={qr.text}
                        onChange={(val) => {
                            qr.setText(val)
                            qr.setQrValue(val) // Actualiza el preview al leer un QR
                        }}
                        wifiSsid={qr.wifiSsid}
                        wifiPassword={qr.wifiPassword}
                        wifiSecurity={qr.wifiSecurity}
                        onWifiChange={qr.handleWifiChange}
                        vCardData={qr.vCardData}
                        onVCardChange={qr.handleVCardChange}
                        onSubmit={qr.generate}
                        error={qr.error}
                    />

                    <QRPreview value={qr.qrValue} mode={qr.mode} />
                </div>
            </div>
        </main>
    )
}

export default App