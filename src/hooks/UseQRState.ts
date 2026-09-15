import { useState } from "react"
import type { QRMode, WifiSecurity, VCardData, QRHistoryItem } from "../types/types"
import { validateQRInput } from "../utils/QrUtils"
import { generateWifiString, validateWifiInput, generateVCardString, validateVCardInput } from "../utils/WifiUtils"
import { useQRHistory } from "./UseQRHistory.ts"

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

    // Integración del Historial
    const { history, addItem, clearHistory } = useQRHistory()

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
        let finalQrValue = ""

        if (mode === "wifi") {
            validation = validateWifiInput(wifiSsid, wifiPassword, wifiSecurity)
            if (validation.valid) {
                finalQrValue = generateWifiString(wifiSsid, wifiPassword, wifiSecurity)
            }
        } else if (mode === "vcard") {
            validation = validateVCardInput(vCardData.name)
            if (validation.valid) {
                finalQrValue = generateVCardString(vCardData)
            }
        } else {
            validation = validateQRInput(text)
            if (validation.valid) {
                finalQrValue = text
            }
        }

        if (!validation.valid) {
            setError(validation.error || "Error")
            return false
        }

        setQrValue(finalQrValue)
        addItem(finalQrValue, mode) // Guardar en el historial tras validar con éxito
        setError(null)
        return true
    }

    // Método para guardar resultados del escáner en el historial
    const handleScanResult = (scannedText: string) => {
        setQrValue(scannedText)
        addItem(scannedText, "scan")
    }

    // Cargar un elemento guardado desde el historial
    const handleSelectHistory = (item: QRHistoryItem) => {
        setMode(item.type)
        setQrValue(item.text)
        setError(null)
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
        reset,
        // Propiedades e interacciones del historial
        history,
        handleScanResult,
        handleSelectHistory,
        clearHistory
    }
}