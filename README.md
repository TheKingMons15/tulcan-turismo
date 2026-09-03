# 🌿 Tulcán Turismo — Plataforma Web Turística & Guía Digital Interactiva

Plataforma turística de última generación para la ciudad de **Tulcán (Carchi, Ecuador)**, conocida como la *Centinela del Norte* (2.980 m.s.n.m.). Diseñada con una estética moderna **Glassmorphism**, arquitectura **React + Tailwind CSS + Node.js (Express)** y un **motor de mapas 100% libre y gratuito basado en Leaflet + OpenStreetMap & CartoDB** (sin dependencia de Google Maps ni claves de API de pago).

---

## 🌟 Características Principales

1. **🗺️ Mapa Interactivo 100% Libre (Zero API Keys)**
   - Renderizado ultrarrápido con **Leaflet.js**.
   - Capas intercambiables: *CartoDB Dark Matter (Elegante Oscuro)*, *CartoDB Voyager (Claro Moderno)*, *OpenStreetMap Estándar* y *OpenTopoMap (Relieve y Volcanes)*.
   - Marcadores semánticos con efecto de brillo pulsante por categoría.
   - Popups flotantes glassmorphism con foto, distancia en tiempo real, horarios y botón "Cómo llegar".
   - Trazado de rutas con polilíneas y paradas numeradas.

2. **🔍 Datos 100% Reales y Verificados de Tulcán**
   - **Más de 32 lugares georreferenciados** con coordenadas GPS reales, direcciones exactas, teléfonos oficiales, horarios y tarifas.
   - Categorías completas:
     - 🌿 **Turismo & Patrimonio:** Cementerio Municipal José María Azael Franco (Topiaria de ciprés), Puente Internacional de Rumichaca, Monumento al Pupo, Teatro Lemarie, Monumento al Ciclismo (Richard Carapaz).
     - ⛪ **Iglesias & Fe:** Catedral de Tulcán (San Miguel), Iglesia San Francisco (1875), Iglesia La Dolorosa, Santuario Gruta de la Paz (caverna natural).
     - 🏔️ **Naturaleza & Páramo:** Reserva Ecológica El Ángel (bosque de frailejones gigantes), Complejo Termal Aguas Hediondas (Tufiño), Volcán Chiles (4.768 msnm), Lagunas Verdes.
     - 🏛️ **Cultura & Museos:** Casa de la Cultura - Núcleo del Carchi (Fases Capulí y Pasto), Museo ITB Germán Bastidas Vaca, Parque de la Independencia, Parque Isidro Ayora.
     - 🏨 **Hoteles:** Hotel Palacio Imperial, Hotel Sara Espíndola, Hotel Torres de Oro, Hotel Los Alpes.
     - 🍽️ **Gastronomía & Cafeterías:** Mercado Central (Hornado Pastuso con tortillas de papa), Café Tulcán (desde 1945, bizcochos y queso amasado), Cuyes de Olmedo, Chanul Restobar.
     - 🏥 **Salud & Emergencias:** Hospital General Provincial Luis G. Dávila (24h), Centro de Salud No. 1, Farmacias Cruz Azul y Fybeca.
     - 🚌 **Transporte & Movilidad:** Terminal Terrestre de Tulcán, Parada Binacional a Rumichaca/Ipiales, Policía Turística.

3. **🧭 Módulo "Descubre Tulcán" — Rutas Curadas y Creador Personalizado**
   - **Ruta Esencial 1 Día en Tulcán** (Topiaria + Centro Histórico + Hornado + Atardecer en el Pupo).
   - **Ruta de Fe & Patrimonio Sagrado** (Catedral + Capuchinos + Gruta de la Paz).
   - **Ruta Gastronómica del Carchi** (Hornado + Bizcochos + Cuy asado + Parrilla andina).
   - **Ruta de Naturaleza & Volcanes** (Aguas Hediondas + Frailejones de El Ángel + Volcán Chiles).
   - **Ruta Fotográfica & Escultórica**.
   - **Constructor de Rutas Personalizadas:** Permite al usuario seleccionar cualquier combinación de lugares, calcular la distancia total (km), tiempo estimado y ver el recorrido en el mapa.

4. **📍 Geolocalización Inteligente & Proximidad**
   - Detección GPS del usuario.
   - Cálculo automático de distancia (fórmula de Haversine) hacia todos los atractivos.
   - Estimación de tiempo a pie y en vehículo.
   - Ordenamiento dinámico de lugares por cercanía.

5. **💎 Diseño UI/UX Glassmorphism Premium**
   - `backdrop-blur-xl`, transparencias andinas, bordes translúcidos, gradientes de noche andina y tonos esmeralda.
   - Microinteracciones, skeleton loaders, drawers laterales y modales interactivos.
   - Diseño Mobile-First 100% responsive.

---

## 🚀 Cómo Iniciar el Proyecto

### 1. Clonar o navegar a la carpeta:
```bash
cd /home/kingmons/.gemini/antigravity/scratch/tulcan-turismo
```

### 2. Ejecutar simultáneamente Backend y Frontend:
```bash
npm run dev
```

Esto iniciará:
- **Backend API (Node.js + Express):** `http://localhost:5000`
- **Frontend App (React + Vite + Tailwind):** `http://localhost:3000`

---

## 📡 Endpoints de la API REST

- `GET /api/places` — Listado completo con filtros por categoría, destacados y búsqueda.
- `GET /api/places/:id` — Detalle completo de un lugar con sitios cercanos.
- `GET /api/places/search?q=...` — Búsqueda semántica e inteligente por lenguaje natural.
- `GET /api/categories` — Categorías con conteo dinámico de lugares.
- `GET /api/routes` — Rutas turísticas curadas con paradas y métricas.
- `POST /api/routes/calculate` — Cálculo de distancia y tiempo para rutas personalizadas.
- `GET /api/health` — Estado del servicio y metadatos de Tulcán.

---

## 📂 Estructura del Proyecto

```
tulcan-turismo/
├── backend/
│   ├── src/
│   │   ├── data/
│   │   │   ├── places.json       # 32 lugares verificados con GPS y metadatos
│   │   │   ├── categories.json   # 9 categorías con colores y símbolos
│   │   │   └── routes.json       # 5 rutas turísticas completas
│   │   ├── routes/
│   │   │   ├── places.js         # Endpoints de lugares y búsqueda
│   │   │   ├── categories.js     # Categorías con conteo
│   │   │   └── itineraries.js    # Rutas e itinerarios
│   │   └── server.js             # Servidor Express + CORS
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/           # GlassCard, Skeleton, QuickEmergencyModal
│   │   │   ├── layout/           # Navbar Glassmorphism & Footer
│   │   │   ├── hero/             # Hero banner con buscador inteligente
│   │   │   ├── search/           # SmartSearchBar con autocompletado
│   │   │   ├── map/              # InteractiveMap Leaflet + MapPopupCard
│   │   │   ├── places/           # CategoryFilter, PlaceCard, PlaceGrid, PlaceDetailModal
│   │   │   ├── routes/           # RouteExplorer & RouteBuilder
│   │   │   └── favorites/        # FavoritesDrawer
│   │   ├── hooks/                # usePlaces, useGeolocation, useFavorites
│   │   ├── utils/                # distance (Haversine) & mapIcons (Leaflet SVG)
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```
