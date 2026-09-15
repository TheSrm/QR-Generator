export type QRMode = "text" | "wifi"
export type WifiSecurity = "WPA" | "WEP" | "nopass"

export type QRFormProps = {
    // Modo
    mode: QRMode
    onModeChange: (mode: QRMode) => void

    // Texto
    value: string
    onChange: (value: string) => void

    // WiFi
    wifiSsid: string
    wifiPassword: string
    wifiSecurity: WifiSecurity
    onWifiChange: (field: "ssid" | "password" | "security", value: string) => void

    // Submit
    onSubmit: () => void
    error: string | null
}

export type QRPreviewProps = {
    value: string
}