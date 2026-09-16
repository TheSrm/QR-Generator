import QRForm from "./components/QRForm"
import QRPreview from "./components/QRPreview"
import { Analytics } from "@vercel/analytics/react"
import { useQRState } from "./hooks/UseQRState"
import { Header } from "./components/Header.tsx"

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
        <main className="min-h-screen bg-neutral-100 text-neutral-900 transition-colors duration-200 px-4 py-12 dark:bg-neutral-950 dark:text-neutral-50 sm:px-6 lg:px-8">
            <Analytics />
            <div className="mx-auto max-w-5xl">
                <Header />

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