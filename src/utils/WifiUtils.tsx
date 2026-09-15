export function generateWifiString(
    ssid: string,
    password: string,
    security: "WPA" | "WEP" | "nopass"
): string {
    // Escapar caracteres especiales
    const escape = (str: string) => str
        .replace(/\\/g, "\\\\")
        .replace(/;/g, "\\;")
        .replace(/,/g, "\\,")
        .replace(/:/g, "\\:")

    const ssidEscaped = escape(ssid)
    const passwordEscaped = escape(password)

    // Si no hay contraseña, forzar nopass
    const actualSecurity = security === "nopass" ? "nopass" : security
    const passwordField = actualSecurity === "nopass" ? "" : `P:${passwordEscaped};`

    return `WIFI:T:${actualSecurity};S:${ssidEscaped};${passwordField};`
}

/**
 * Valida los campos del formulario WiFi
 */
export function validateWifiInput(
    ssid: string,
    password: string,
    security: "WPA" | "WEP" | "nopass"
): { valid: boolean; error?: string } {
    // SSID obligatorio
    if (!ssid.trim()) {
        return { valid: false, error: "El nombre de la red (SSID) es obligatorio" }
    }

    // SSID muy largo (máx 32 caracteres estándar)
    if (ssid.length > 32) {
        return { valid: false, error: "El SSID no puede superar 32 caracteres" }
    }

    // Contraseña obligatoria si no es red abierta
    if (security !== "nopass" && !password) {
        return { valid: false, error: "Introduce la contraseña o selecciona 'Red abierta'" }
    }

    // Contraseña mínima para WPA (8 caracteres)
    if (security === "WPA" && password.length < 8) {
        return { valid: false, error: "WPA requiere mínimo 8 caracteres" }
    }

    // Contraseña mínima para WEP (5 o 13 caracteres)
    if (security === "WEP" && password.length < 5) {
        return { valid: false, error: "WEP requiere mínimo 5 caracteres" }
    }

    return { valid: true }
}