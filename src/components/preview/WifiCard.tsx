import { useState } from "react"
import { useTranslation } from "react-i18next"
import type { WifiCardProps } from "../../types/types"

export function WifiCard({ wifi }: WifiCardProps) {
    const { t } = useTranslation()
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                {t("scanned.cards.wifiData", "Datos de red WiFi")}
            </h3>
            <div className="mt-4 space-y-3 text-sm">
                <div>
                    <p className="text-xs text-neutral-500">
                        {t("form.labels.ssid", "Nombre de la red (SSID)")}
                    </p>
                    <p className="font-medium text-neutral-100">{wifi.ssid}</p>
                </div>
                <div>
                    <p className="text-xs text-neutral-500">
                        {t("form.labels.security", "Seguridad")}
                    </p>
                    <p className="font-medium text-neutral-100">{wifi.security}</p>
                </div>
                {wifi.password && (
                    <div>
                        <p className="text-xs text-neutral-500">
                            {t("form.labels.password", "Contraseña")}
                        </p>
                        <div className="flex items-center justify-between">
                            <p className="font-mono text-neutral-100">
                                {showPassword ? wifi.password : "••••••••••••"}
                            </p>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-xs text-neutral-400 hover:text-neutral-200"
                            >
                                {showPassword
                                    ? t("scanned.cards.hide", "Ocultar")
                                    : t("scanned.cards.show", "Mostrar")}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}