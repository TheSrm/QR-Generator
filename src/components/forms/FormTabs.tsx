import type { QRMode } from "../../types/types"

type FormTabsProps = {
    mode: QRMode
    onModeChange: (mode: QRMode) => void
}

export function FormTabs({ mode, onModeChange }: FormTabsProps) {
    const tabs: { id: QRMode; label: string }[] = [
        { id: "text", label: "Texto / URL" },
        { id: "wifi", label: "WiFi" },
        { id: "vcard", label: "Contacto" },
        { id: "scan", label: "Leer QR" },
    ]

    return (
        <div className="mb-6 grid grid-cols-2 gap-1 rounded-xl border border-neutral-800 bg-neutral-950 p-1.5 sm:grid-cols-4">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    type="button"
                    onClick={() => onModeChange(tab.id)}
                    className={`rounded-lg py-2.5 text-xs font-medium transition sm:text-sm ${
                        mode === tab.id
                            ? "bg-neutral-800 text-neutral-50 shadow-sm"
                            : "text-neutral-400 hover:text-neutral-200"
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    )
}