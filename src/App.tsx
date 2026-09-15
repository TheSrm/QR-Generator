import Header from "./components/Header"
import QRForm from "./components/QRForm"
import QRPreview from "./components/QRPreview"
import {useQRState} from "./hooks/UseQRState.ts";

function App() {
    const qr = useQRState()

    return (
        <main className="min-h-screen bg-neutral-950 text-neutral-50 antialiased">
            <div className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-6 py-12 sm:px-8">
                <Header />

                <div className="mt-12 grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                    <QRForm
                        mode={qr.mode}
                        onModeChange={qr.setMode}
                        value={qr.text}
                        onChange={qr.setText}
                        wifiSsid={qr.wifiSsid}
                        wifiPassword={qr.wifiPassword}
                        wifiSecurity={qr.wifiSecurity}
                        onWifiChange={qr.handleWifiChange}
                        onSubmit={qr.generate}
                        error={qr.error}
                    />

                    <QRPreview value={qr.qrValue} />
                </div>
            </div>
        </main>
    )
}

export default App