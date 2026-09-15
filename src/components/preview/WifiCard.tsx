import { useState } from "react"
import type { WifiCardProps } from "../../types/types"

export function WifiCard({ wifi }: WifiCardProps) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Datos de red WiFi</h3>
            <div className="mt-4 space-y-3 text-sm">
                <div>
                    <p className="text-xs text-neutral-500">Nombre de red (SSID)</p>
                    <p className="font-medium text-neutral-100">{wifi.ssid}</p>
                </div>
                <div>
                    <p className="text-xs text-neutral-500">Seguridad</p>
                    <p className="font-medium text-neutral-100">{wifi.security}</p>
                </div>
                {wifi.password && (
                    <div>
                        <p className="text-xs text-neutral-500">Contraseña</p>
                        <div className="flex items-center justify-between">
                            <p className="font-mono text-neutral-100">
                                {showPassword ? wifi.password : "••••••••••••"}
                            </p>
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-xs text-neutral-400 hover:text-neutral-200"
                            >
                                {showPassword ? "Ocultar" : "Mostrar"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}