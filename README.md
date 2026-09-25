# SIGESDOC · Registro de observaciones

Módulo del sistema de gestión documental **SIGESDOC (UAPA)** para registrar los hallazgos encontrados al revisar un expediente y darles seguimiento.

Hecho con **HTML, CSS y JavaScript puro**, sin dependencias ni instalación.

![Vista del módulo](docs/captura.png)

## 🔗 Ver la aplicación en línea

Una vez activado GitHub Pages (ver abajo), la aplicación queda disponible en:

```
https://TU-USUARIO.github.io/sigesdoc-observaciones/
```

## Funciones

- Formulario con validación (expediente y descripción obligatorios, mínimo 10 caracteres).
- Selección de estado: **Pendiente**, **En revisión** o **Resuelta**.
- Usuario y fecha que se completan automáticamente.
- Tabla con filtro por texto y por estado.
- Tarjetas de resumen que se actualizan solas.
- Aviso "Observación registrada correctamente."
- Diseño adaptable a celular (menú lateral desplegable).

## Estructura

```
sigesdoc-observaciones/
├── index.html        → Estructura de la página
├── css/styles.css    → Estilos y diseño responsive
├── js/app.js         → Validación, registro, filtros y contadores
├── docs/captura.png  → Imagen para este README
└── .nojekyll         → Indica a GitHub Pages que publique los archivos tal cual
```

## Publicar en GitHub Pages

1. En GitHub, crea un repositorio nuevo llamado `sigesdoc-observaciones` (público).
2. Sube los archivos de esta carpeta (botón **Add file → Upload files**, arrastra todo el contenido y pulsa **Commit changes**).
3. Ve a **Settings → Pages**.
4. En **Source** elige **Deploy from a branch**, rama **main** y carpeta **/ (root)**. Pulsa **Save**.
5. Espera 1–2 minutos y abre `https://TU-USUARIO.github.io/sigesdoc-observaciones/`.

## Ejecutar en tu computadora

- Abre `index.html` con doble clic, **o**
- En Visual Studio Code, instala la extensión **Live Server** y haz clic derecho sobre `index.html` → **Open with Live Server**.

## Personalizar

En `js/app.js` puedes cambiar:

- `USUARIO_SESION` → nombre del usuario.
- `EXPEDIENTES` → lista de expedientes del selector.
- `observaciones` → datos de ejemplo iniciales.

> **Nota:** es una versión de demostración. Los datos se guardan en memoria; al recargar la página vuelven los datos de ejemplo.
