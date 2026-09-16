// --- Modos globales ---
export type QRMode = "text" | "wifi" | "vcard" | "scan"
export type WifiSecurity = "WPA" | "WEP" | "nopass"

// --- Datos ---
export type VCardData = {
    name: string
    phone: string
    email: string
    company: string
}

export type ParsedWifiData = {
    ssid: string
    password: string
    security: string
}

export type ParsedVCardData = {
    name: string
    phone: string
    email: string
    company: string
}

// --- Componentes Principales ---
export type QRFormProps = {
    mode: QRMode
    onModeChange: (mode: QRMode) => void
    value: string
    onChange: (value: string) => void
    wifiSsid: string
    wifiPassword: string
    wifiSecurity: WifiSecurity
    onWifiChange: (field: "ssid" | "password" | "security", value: string) => void
    vCardData: VCardData
    onVCardChange: (field: keyof VCardData, value: string) => void
    onSubmit: () => void
    error: string | null
}

export type QRPreviewProps = {
    value: string
    mode: QRMode
}

export type QRReaderProps = {
    onResult: (result: string) => void
}

// --- Subcomponentes de Formulario ---
export type FormTabsProps = {
    mode: QRMode
    onModeChange: (mode: QRMode) => void
}

export type TextFormFieldsProps = {
    value: string
    onChange: (value: string) => void
    hasError: boolean
    inputClasses: (hasError: boolean) => string
}

export type WifiFormFieldsProps = {
    ssid: string
    password: string
    security: WifiSecurity
    onWifiChange: (field: "ssid" | "password" | "security", value: string) => void
    hasError: boolean
    inputClasses: (hasError: boolean) => string
}

export type VCardFormFieldsProps = {
    vCardData: VCardData
    onVCardChange: (field: keyof VCardData, value: string) => void
    hasError: boolean
    inputClasses: (hasError: boolean) => string
}

// --- Subcomponentes de Preview ---
export type ScannedContentProps = {
    value: string
    onCopyText: (text: string) => void
    copiedText: boolean
}

export type VCardCardProps = {
    contact: ParsedVCardData
}

export type WifiCardProps = {
    wifi: ParsedWifiData
}

export type UrlCardProps = {
    url: string
}

export type TextCardProps = {
    text: string
}

export type QRHistoryItem = {
    id: string
    text: string
    type: QRMode
    timestamp: number
}

export type QRHistoryProps = {
    history: QRHistoryItem[]
    onSelect: (item: QRHistoryItem) => void
    onClear: () => void
}

export type QRHistoryWidgetProps = {
    history: QRHistoryItem[]
    onSelect: (item: QRHistoryItem) => void
    onClear: () => void
}

export type Language = {
    code: string
    label: string
    flag: string // Ruta o URL del SVG de la bandera
}
