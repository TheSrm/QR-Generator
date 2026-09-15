import { useState } from "react"
import {  validateQRInput } from "../utils/QrUtils"
import {generateWifiString,  validateWifiInput} from "../utils/WifiUtils.tsx"

export type QRMode = "text" | "wifi"
export type WifiSecurity = "WPA" | "WEP" | "nopass"

export function useQRState() {
    const [mode, setMode] = useState<QRMode>("text")

    // Texto/URL
    const [text, setText] = useState("")

    // WiFi
    const [wifiSsid, setWifiSsid] = useState("")
    const [wifiPassword, setWifiPassword] = useState("")
    const [wifiSecurity, setWifiSecurity] = useState<WifiSecurity>("WPA")

    // QR generado
    const [qrValue, setQrValue] = useState("")
    const [error, setError] = useState<string | null>(null)

    const handleWifiChange = (field: "ssid" | "password" | "security", value: string) => {
        if (field === "ssid") setWifiSsid(value)
        if (field === "password") setWifiPassword(value)
        if (field === "security") setWifiSecurity(value as WifiSecurity)
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
        setMode,
        text,
        setText: handleTextChange,
        wifiSsid,
        wifiPassword,
        wifiSecurity,
        handleWifiChange,
        qrValue,
        error,
        generate,
        reset
    }
}