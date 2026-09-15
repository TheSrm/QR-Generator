import { useState, useEffect } from "react"
import type { QRHistoryItem, QRMode } from "../types/types"

export function useQRHistory() {
    const [history, setHistory] = useState<QRHistoryItem[]>(() => {
        try {
            const saved = localStorage.getItem("qr_history")
            return saved ? JSON.parse(saved) : []
        } catch {
            return []
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem("qr_history", JSON.stringify(history))
        } catch (err) {
            console.error("Error guardando historial en localStorage:", err)
        }
    }, [history])

    const addItem = (text: string, type: QRMode) => {
        if (!text.trim()) return

        setHistory((prev) => {
            const filtered = prev.filter((item) => item.text !== text)
            const newItem: QRHistoryItem = {
                id: crypto.randomUUID(),
                text,
                type,
                timestamp: Date.now()
            }
            return [newItem, ...filtered].slice(0, 5)
        })
    }

    const clearHistory = () => {
        setHistory([])
        localStorage.removeItem("qr_history")
    }

    return { history, addItem, clearHistory }
}