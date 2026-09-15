export type QRMode = "text" | "wifi" | "vcard" | "scan"
export type WifiSecurity = "WPA" | "WEP" | "nopass"

export type VCardData = {
    name: string
    phone: string
    email: string
    company: string
}

export type QRFormProps = {
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

    // vCard
    vCardData: VCardData
    onVCardChange: (field: keyof VCardData, value: string) => void

    // Submit & Error
    onSubmit: () => void
    error: string | null
}

export type QRPreviewProps = {
    value: string
    mode: QRMode
}