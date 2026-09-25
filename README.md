# SIGESDOC · Registro de observaciones

Módulo de registro de observaciones (UAPA) hecho con HTML, CSS y JavaScript puro, sin dependencias.

## Estructura
```
sigesdoc/
├── index.html      → Estructura de la página
├── css/styles.css  → Estilos y diseño responsive
└── js/app.js       → Lógica: validación, registro, filtros y contadores
```

## Cómo abrirlo en Visual Studio Code
1. Descomprime `sigesdoc.zip`.
2. En VS Code: **Archivo → Abrir carpeta…** y selecciona `sigesdoc`.
3. Instala la extensión **Live Server** (de Ritwick Dey).
4. Clic derecho sobre `index.html` → **Open with Live Server**.

También puedes abrir `index.html` con doble clic en el navegador.

## Funciones
- Formulario con validación (expediente y descripción obligatorios).
- Selección de estado: Pendiente / En revisión / Resuelta.
- Usuario y fecha automáticos.
- Tabla con filtro por texto y por estado.
- Tarjetas de resumen que se actualizan solas.
- Notificación "Observación registrada correctamente."
- Diseño adaptable a celular (menú lateral desplegable).

## Personalizar
En `js/app.js` puedes cambiar:
- `USUARIO_SESION` → nombre del usuario.
- `EXPEDIENTES` → lista de expedientes del selector.
- `observaciones` → datos de ejemplo iniciales.

Nota: los datos se guardan en memoria (modo demostración); al recargar la página vuelven los de ejemplo.
