import type { ParsedWifiData, ParsedVCardData } from "../types/types"

export function parseWifiString(text: string): ParsedWifiData {
    const ssidMatch = text.match(/S:([^;]+)/)
    const passMatch = text.match(/P:([^;]+)/)
    const secMatch = text.match(/T:([^;]+)/)
    return {
        ssid: ssidMatch ? ssidMatch[1].replace(/\\([;,:\\])/g, "$1") : "Red WiFi",
        password: passMatch ? passMatch[1].replace(/\\([;,:\\])/g, "$1") : "",
        security: secMatch ? secMatch[1] : "nopass"
    }
}

export function parseVCardString(text: string): ParsedVCardData {
    const fnMatch = text.match(/FN:(.+)/)
    const telMatch = text.match(/TEL.*:(.+)/)
    const emailMatch = text.match(/EMAIL.*:(.+)/)
    const orgMatch = text.match(/ORG:(.+)/)
    return {
        name: fnMatch ? fnMatch[1].trim() : "Contacto",
        phone: telMatch ? telMatch[1].trim() : "",
        email: emailMatch ? emailMatch[1].trim() : "",
        company: orgMatch ? orgMatch[1].trim() : ""
    }
}