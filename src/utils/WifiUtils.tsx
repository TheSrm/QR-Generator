import type { WifiSecurity, VCardData } from "../types/types"

export function generateWifiString(
    ssid: string,
    password: string,
    security: WifiSecurity
): string {
    const escape = (str: string) => str
        .replace(/\\/g, "\\\\")
        .replace(/;/g, "\\;")
        .replace(/,/g, "\\,")
        .replace(/:/g, "\\:")

    const ssidEscaped = escape(ssid)
    const passwordEscaped = escape(password)

    const actualSecurity = security === "nopass" ? "nopass" : security
    const passwordField = actualSecurity === "nopass" ? "" : `P:${passwordEscaped};`

    return `WIFI:T:${actualSecurity};S:${ssidEscaped};${passwordField};`
}

export function validateWifiInput(
    ssid: string,
    password: string,
    security: WifiSecurity
): { valid: boolean; error?: string } {
    if (!ssid.trim()) {
        return { valid: false, error: "El nombre de la red (SSID) es obligatorio" }
    }
    if (ssid.length > 32) {
        return { valid: false, error: "El SSID no puede superar 32 caracteres" }
    }
    if (security !== "nopass" && !password) {
        return { valid: false, error: "Introduce la contraseña o selecciona 'Red abierta'" }
    }
    if (security === "WPA" && password.length < 8) {
        return { valid: false, error: "WPA requiere mínimo 8 caracteres" }
    }
    if (security === "WEP" && password.length < 5) {
        return { valid: false, error: "WEP requiere mínimo 5 caracteres" }
    }
    return { valid: true }
}

export function generateVCardString(data: VCardData): string {
    return [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `N:;${data.name};;;`,
        `FN:${data.name}`,
        data.company ? `ORG:${data.company}` : "",
        data.phone ? `TEL;TYPE=CELL:${data.phone}` : "",
        data.email ? `EMAIL:${data.email}` : "",
        "END:VCARD"
    ].filter(Boolean).join("\n")
}

export function validateVCardInput(name: string): { valid: boolean; error?: string } {
    if (!name.trim()) {
        return { valid: false, error: "El nombre es obligatorio para la tarjeta de contacto" }
    }
    return { valid: true }
}