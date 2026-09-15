import QRForm from "./components/QRForm"
import QRPreview from "./components/QRPreview"
import { useQRState } from "./hooks/UseQRState"

export default function App() {
    const {
        mode,
        setMode,
        text,
        setText,
        wifiSsid,
        wifiPassword,
        wifiSecurity,
        handleWifiChange,
        vCardData,
        handleVCardChange,
        qrValue,
        error,
        generate,
        history,
        handleScanResult,
        handleSelectHistory,
        clearHistory
    } = useQRState()

    return (
        <main className="min-h-screen bg-neutral-950 px-4 py-12 text-neutral-50 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
                <header className="mb-8 text-center sm:text-left">
                    <h1 className="text-2xl font-bold tracking-tight text-neutral-50 sm:text-3xl">
                        QR Studio
                    </h1>
                    <p className="mt-1 text-sm text-neutral-400">
                        Genera y escanea códigos QR de forma rápida, privada y segura.
                    </p>
                </header>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <QRForm
                        mode={mode}
                        onModeChange={setMode}
                        value={text}
                        onChange={(val) => {
                            if (mode === "scan") {
                                handleScanResult(val)
                            } else {
                                setText(val)
                            }
                        }}
                        wifiSsid={wifiSsid}
                        wifiPassword={wifiPassword}
                        wifiSecurity={wifiSecurity}
                        onWifiChange={handleWifiChange}
                        vCardData={vCardData}
                        onVCardChange={handleVCardChange}
                        onSubmit={generate}
                        error={error}
                    />

                    <QRPreview
                        value={qrValue}
                        mode={mode}
                        history={history}
                        onSelectHistory={handleSelectHistory}
                        onClearHistory={clearHistory}
                    />
                </div>
            </div>
        </main>
    )
}