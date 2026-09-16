import { useTranslation } from "react-i18next"
import type { QRFormProps } from "../types/types"
import QRReader from "./QReader"
import { FormTabs } from "./forms/FormTabs"
import { TextFormFields } from "./forms/TextFormFields"
import { WifiFormFields } from "./forms/WifiFormFields"
import { VCardFormFields } from "./forms/VCardFormFields"

function QRForm({
                    mode,
                    onModeChange,
                    value,
                    onChange,
                    wifiSsid,
                    wifiPassword,
                    wifiSecurity,
                    onWifiChange,
                    vCardData,
                    onVCardChange,
                    onSubmit,
                    error
                }: QRFormProps) {
    const { t } = useTranslation()

    const inputClasses = (hasError: boolean) =>
        `w-full rounded-lg border bg-neutral-950 px-4 py-3 text-neutral-50 outline-none transition placeholder:text-neutral-600 focus:ring-4 ${
            hasError
                ? "border-red-800 focus:border-red-600 focus:ring-red-900/30"
                : "border-neutral-800 focus:border-neutral-600 focus:ring-neutral-800/50"
        }`

    return (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">
            {/* Pestañas de navegación */}
            <FormTabs mode={mode} onModeChange={onModeChange} />

            {/* Renderizado condicional de subcomponentes */}
            {mode === "text" && (
                <TextFormFields
                    value={value}
                    onChange={onChange}
                    hasError={!!error}
                    inputClasses={inputClasses}
                />
            )}

            {mode === "wifi" && (
                <WifiFormFields
                    ssid={wifiSsid}
                    password={wifiPassword}
                    security={wifiSecurity}
                    onWifiChange={onWifiChange}
                    hasError={!!error}
                    inputClasses={inputClasses}
                />
            )}

            {mode === "vcard" && (
                <VCardFormFields
                    vCardData={vCardData}
                    onVCardChange={onVCardChange}
                    hasError={!!error}
                    inputClasses={inputClasses}
                />
            )}

            {mode === "scan" && (
                <QRReader onResult={(decodedText: string) => onChange(decodedText)} />
            )}

            {/* Mensaje de error general */}
            {error && mode !== "scan" && (
                <p className="mt-4 flex items-center gap-1.5 text-sm text-red-400">
                    <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    {error}
                </p>
            )}

            {/* Botón de acción (oculto en modo lectura) */}
            {mode !== "scan" && (
                <button
                    type="button"
                    onClick={onSubmit}
                    className="mt-6 w-full rounded-lg bg-neutral-50 px-4 py-3 font-medium text-neutral-950 transition hover:bg-neutral-200 active:bg-neutral-300"
                >
                    {t("form.generate", "Generar QR")}
                </button>
            )}
        </div>
    )
}

export default QRForm