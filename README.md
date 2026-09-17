# QR Studio

Generador y lector de códigos QR web. Procesamiento 100% en el cliente (Client-Side), sin envíos a servidores externos.

## Descripción General

QR Studio es una aplicación web para la generación y lectura de códigos QR, construida con React 18, TypeScript y Vite. No se envía ningún dato personal, credencial de WiFi o imagen cargada a ningún servidor externo. Todo el proceso de generación y lectura ocurre de forma local en el navegador.

## Características

| Módulo | Descripción |
|--------|-------------|
| Generación Multi-formato | Soporte para Texto/URL, Redes WiFi (WPA/WPA2/WEP/Abierta) y vCard (tarjetas de contacto digitales) |
| Escáner por Cámara | Lectura y escaneo de códigos QR mediante cámara con carga asíncrona diferida (Lazy Loading) |
| Personalización Avanzada | Control de color del código y fondo con soporte para transparencia e incrustación de logo central con auto-recorte (excavate) |
| Dual Theme System | Modo Claro y Oscuro nativo mediante Tailwind CSS con persistencia en localStorage |
| Internacionalización (i18n) | Soporte multilingüe: Español e Inglés |
| Historial Local | Almacenamiento síncrono del historial reciente de QRs en localStorage |
| App Shell & Skeleton Pattern | Carga inicial fluida con indicador esquelético sin saltos visuales |

## Tecnologías

- React 18
- TypeScript (Strict Mode)
- Tailwind CSS v4
- Vite 6
- qrcode.react (Renderizado SVG/Canvas)
- html5-qrcode / QReader (Lectura de cámara)
- react-i18next & i18next (Internacionalización)
- @vercel/analytics

## Estructura del Proyecto

```
src/
├── components/          # Componentes UI
│   ├── forms/           # Formularios (Text, WiFi, vCard)
│   ├── preview/         # Previsualización, selector de color, acordeón, logo
│   ├── AppLoader.tsx    # Carga diferida con tiempo mínimo
│   ├── AppSkeleton.tsx  # Layout esquelético de carga inicial
│   ├── Header.tsx       # Cabecera con selector de idioma y tema
│   ├── ThemeToggle.tsx  # Conmutador de modo claro/oscuro
│   └── QReader.tsx      # Lector de cámara
├── hooks/               # Hooks personalizados (useQRState, useTheme)
├── locales/             # Archivos de traducción (es.json, en.json)
├── types/               # Definiciones de tipos TypeScript
├── utils/               # Utilidades para descarga (PNG, SVG) y portapapeles
├── App.tsx              # Componente principal
└── main.tsx             # Punto de entrada
```

## Instalación

### Requisitos

- Node.js >= 18.0.0
- npm >= 9.0.0

### Pasos

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/qr-studio.git
cd qr-studio
```

2. Instalar dependencias:

```bash
npm install
```

3. Iniciar servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo con HMR |
| `npm run build` | Compila para producción en `/dist` |
| `npm run preview` | Previsualiza la compilación de producción |
| `npm run lint` | Ejecuta ESLint |

## Optimizaciones de Rendimiento

### Code Splitting

Los módulos pesados se cargan bajo demanda mediante `React.lazy()`. El escáner de cámara solo se carga cuando el usuario lo requiere:

```typescript
const QReader = lazy(() => import('./components/QReader'))

<Suspense fallback={<AppSkeleton />}>
  <QReader />
</Suspense>
```

### Manual Chunking en Vite

Configuración en `vite.config.ts` que separa las dependencias en chunks independientes:

```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-i18next'],
          qr: ['qrcode.react']
        }
      }
    }
  }
})
```

### Skeleton Screen

La estructura visual del skeleton está embebida en el HTML estático con estilos inline mínimos. Se renderiza inmediatamente sin requerir JavaScript, visible incluso en conexiones lentas.

### App Shell Pattern

Cuando React termina de cargar, reemplaza el skeleton por la aplicación real de forma imperceptible.

## Accesibilidad

Todos los elementos interactivos cuentan con etiquetas accesibles:

```typescript
<button type="button" aria-label="Cambiar tema" onClick={toggleTheme}>
  {/* Contenido */}
</button>

<input 
  id="email" 
  type="email" 
  required 
  aria-label="Correo electrónico"
/>
<label htmlFor="email">Correo Electrónico</label>
```

Se verifica contraste mínimo de 4.5:1 en modo claro y oscuro, y todos los elementos de formulario incluyen etiquetas vinculadas.

## Internacionalización

La aplicación soporta múltiples idiomas mediante `react-i18next`. Los diccionarios están en `src/locales/`:

- `es.json` - Español
- `en.json` - Inglés

Para cambiar el idioma:

```typescript
const { t, i18n } = useTranslation()
i18n.changeLanguage('en')
```

## Privacidad

QR Studio es una aplicación 100% orientada al cliente (Client-Side). No se envía ningún dato personal, credencial de WiFi o imagen cargada a ningún servidor externo. Todo el proceso de generación y lectura ocurre de forma local en el navegador.
