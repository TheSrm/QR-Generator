import { useState } from "react"
import type { QRMode, WifiSecurity, VCardData } from "../types/types"
import { validateQRInput } from "../utils/QrUtils"
import { generateWifiString, validateWifiInput, generateVCardString, validateVCardInput } from "../utils/WifiUtils"

export function useQRState() {
    const [mode, setMode] = useState<QRMode>("text")

    // Texto/URL
    const [text, setText] = useState("")

    // WiFi
    const [wifiSsid, setWifiSsid] = useState("")
    const [wifiPassword, setWifiPassword] = useState("")
    const [wifiSecurity, setWifiSecurity] = useState<WifiSecurity>("WPA")

    // vCard
    const [vCardData, setVCardData] = useState<VCardData>({
        name: "",
        phone: "",
        email: "",
        company: ""
    })

    // QR generado
    const [qrValue, setQrValue] = useState("")
    const [error, setError] = useState<string | null>(null)

    const handleModeChange = (newMode: QRMode) => {
        setMode(newMode)
        setQrValue("") // Limpiar QR al cambiar de pestaña
        setError(null)
    }

    const handleWifiChange = (field: "ssid" | "password" | "security", value: string) => {
        if (field === "ssid") setWifiSsid(value)
        if (field === "password") setWifiPassword(value)
        if (field === "security") setWifiSecurity(value as WifiSecurity)
        if (error) setError(null)
    }

    const handleVCardChange = (field: keyof VCardData, value: string) => {
        setVCardData((prev) => ({ ...prev, [field]: value }))
        if (error) setError(null)
    }

    const handleTextChange = (value: string) => {
        setText(value)
        if (error) setError(null)
    }

    const generate = (): boolean => {
        let validation

        if (mode === "wifi") {
            validation = validateWifiInput(wifiSsid, wifiPassword, wifiSecurity)
            if (validation.valid) {
                setQrValue(generateWifiString(wifiSsid, wifiPassword, wifiSecurity))
            }
        } else if (mode === "vcard") {
            validation = validateVCardInput(vCardData.name)
            if (validation.valid) {
                setQrValue(generateVCardString(vCardData))
            }
        } else {
            validation = validateQRInput(text)
            if (validation.valid) {
                setQrValue(text)
            }
        }

        if (!validation.valid) {
            setError(validation.error || "Error")
            return false
        }

        setError(null)
        return true
    }

    const reset = () => {
        setQrValue("")
        setError(null)
    }

    return {
        mode,
        setMode: handleModeChange,
        text,
        setText: handleTextChange,
        wifiSsid,
        wifiPassword,
        wifiSecurity,
        handleWifiChange,
        vCardData,
        handleVCardChange,
        qrValue,
        setQrValue,
        error,
        generate,
        reset
    }
}