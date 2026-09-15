import type { FormEvent } from "react"
import type { QRFormProps } from "../types/types.ts"

function QRForm({
                    mode,
                    onModeChange,
                    value,
                    onChange,
                    wifiSsid,
                    wifiPassword,
                    wifiSecurity,
                    onWifiChange,
                    onSubmit,
                    error
                }: QRFormProps) {

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSubmit()
    }

    const inputClasses = (hasError: boolean) =>
        `w-full rounded-lg border bg-neutral-950 px-4 py-3 text-neutral-50 outline-none transition placeholder:text-neutral-600 focus:ring-4 ${
            hasError
                ? "border-red-800 focus:border-red-600 focus:ring-red-900/30"
                : "border-neutral-800 focus:border-neutral-600 focus:ring-neutral-800/50"
        }`

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8"
        >
            {/* Selector de modo */}
            <div className="mb-6 flex rounded-lg border border-neutral-800 bg-neutral-950 p-1">
                <button
                    type="button"
                    onClick={() => onModeChange("text")}
                    className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition ${
                        mode === "text"
                            ? "bg-neutral-800 text-neutral-50"
                            : "text-neutral-400 hover:text-neutral-300"
                    }`}
                >
                    Texto / URL
                </button>
                <button
                    type="button"
                    onClick={() => onModeChange("wifi")}
                    className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition ${
                        mode === "wifi"
                            ? "bg-neutral-800 text-neutral-50"
                            : "text-neutral-400 hover:text-neutral-300"
                    }`}
                >
                    WiFi
                </button>
            </div>

            {mode === "text" ? (
                <>
                    <h2 className="text-lg font-semibold text-neutral-50">Contenido</h2>
                    <p className="mt-2 text-sm leading-6 text-neutral-400">
                        Introduce una URL o cualquier texto que quieras convertir en QR.
                    </p>

                    <div className="mt-8">
                        <label htmlFor="qr-text" className="mb-2 block text-sm font-medium text-neutral-300">
                            Texto o URL
                        </label>
                        <input
                            id="qr-text"
                            type="text"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder="https://ejemplo.com"
                            className={inputClasses(!!error)}
                        />
                    </div>
                </>
            ) : (
                <>
                    <h2 className="text-lg font-semibold text-neutral-50">Red WiFi</h2>
                    <p className="mt-2 text-sm leading-6 text-neutral-400">
                        Genera un QR para conectarse automáticamente a la red.
                    </p>

                    <div className="mt-8 space-y-5">
                        <div>
                            <label htmlFor="wifi-ssid" className="mb-2 block text-sm font-medium text-neutral-300">
                                Nombre de la red (SSID)
                            </label>
                            <input
                                id="wifi-ssid"
                                type="text"
                                value={wifiSsid}
                                onChange={(e) => onWifiChange("ssid", e.target.value)}
                                placeholder="MiRedWifi"
                                className={inputClasses(!!error)}
                            />
                        </div>

                        <div>
                            <label htmlFor="wifi-security" className="mb-2 block text-sm font-medium text-neutral-300">
                                Seguridad
                            </label>
                            <select
                                id="wifi-security"
                                value={wifiSecurity}
                                onChange={(e) => onWifiChange("security", e.target.value)}
                                className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-neutral-50 outline-none transition focus:border-neutral-600 focus:ring-4 focus:ring-neutral-800/50"
                            >
                                <option value="WPA">WPA / WPA2 / WPA3</option>
                                <option value="WEP">WEP</option>
                                <option value="nopass">Red abierta (sin contraseña)</option>
                            </select>
                        </div>

                        {wifiSecurity !== "nopass" && (
                            <div>
                                <label htmlFor="wifi-password" className="mb-2 block text-sm font-medium text-neutral-300">
                                    Contraseña
                                </label>
                                <input
                                    id="wifi-password"
                                    type="password"
                                    value={wifiPassword}
                                    onChange={(e) => onWifiChange("password", e.target.value)}
                                    placeholder="••••••••"
                                    className={inputClasses(!!error)}
                                />
                            </div>
                        )}
                    </div>
                </>
            )}

            {error && (
                <p className="mt-4 flex items-center gap-1.5 text-sm text-red-400">
                    <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    {error}
                </p>
            )}

            <button
                type="submit"
                className="mt-6 w-full rounded-lg bg-neutral-50 px-4 py-3 font-medium text-neutral-950 transition hover:bg-neutral-200 active:bg-neutral-300"
            >
                Generar QR
            </button>
        </form>
    )
}

export default QRForm