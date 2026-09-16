import { useTranslation } from "react-i18next"
import type { WifiFormFieldsProps } from "../../types/types"

export function WifiFormFields({
                                   ssid,
                                   password,
                                   security,
                                   onWifiChange,
                                   hasError,
                                   inputClasses
                               }: WifiFormFieldsProps) {
    const { t } = useTranslation()

    return (
        <>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                {t("form.wifi.title", "Red WiFi")}
            </h2>
            <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                {t("form.wifi.description", "Genera un QR para conectarse automáticamente a la red.")}
            </p>

            <div className="mt-8 space-y-5">
                <div>
                    <label htmlFor="wifi-ssid" className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {t("form.labels.ssid", "Nombre de la red (SSID)")}
                    </label>
                    <input
                        id="wifi-ssid"
                        type="text"
                        value={ssid}
                        onChange={(e) => onWifiChange("ssid", e.target.value)}
                        placeholder={t("form.placeholders.ssid", "MiRedWifi")}
                        className={inputClasses(hasError)}
                    />
                </div>

                <div>
                    <label htmlFor="wifi-security" className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {t("form.labels.security", "Seguridad")}
                    </label>
                    <select
                        id="wifi-security"
                        value={security}
                        onChange={(e) => onWifiChange("security", e.target.value as WifiFormFieldsProps["security"])}
                        className="w-full rounded-lg border border-neutral-300 bg-neutral-100 px-4 py-3 text-neutral-900 outline-none transition focus:border-neutral-400 focus:ring-4 focus:ring-neutral-200 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:focus:border-neutral-600 dark:focus:ring-neutral-800/50"
                    >
                        <option value="WPA">WPA / WPA2 / WPA3</option>
                        <option value="WEP">WEP</option>
                        <option value="nopass">{t("form.wifi.openNetwork", "Red abierta (sin contraseña)")}</option>
                    </select>
                </div>

                {security !== "nopass" && (
                    <div>
                        <label htmlFor="wifi-password" className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            {t("form.labels.password", "Contraseña")}
                        </label>
                        <input
                            id="wifi-password"
                            type="password"
                            value={password}
                            onChange={(e) => onWifiChange("password", e.target.value)}
                            placeholder="••••••••"
                            className={inputClasses(hasError)}
                        />
                    </div>
                )}
            </div>
        </>
    )
}