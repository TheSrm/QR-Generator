import type {QRFormProps} from "../types/types.ts";

function QRForm({ value, onChange, onSubmit }: QRFormProps) {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSubmit()
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="Introduce una URL o texto..."
            />

            <button type="submit">
                Generar QR
            </button>
        </form>
    )
}

export default QRForm