# 🎨 Stitch Design System: Bio-Glass (PL_Genesis Quality)

## 1. Design Tokens
- **Background Principal:** Deep Forest (`#062C1D`)
- **Acentos:** Bio-Lime (`#BEF264`)
- **Superficies (Glassmorphism):** Transparencias con `bg-white/5` a `bg-white/10` y `backdrop-blur-xl`.

## 2. Componentes VIP

### 2.1 SeedValidationCard
- **Estética:** Glassmorphism real avanzado. Requiere uso extensivo de `backdrop-blur-xl`, bordes de 1px `border-white/10` y sombras difuminadas.
- **Scanning State:** Durante la validación, debe mostrar un gradiente animado en `bioLime` que recorra la tarjeta de arriba a abajo, emulando la revisión de los satélites y documentos.

### 2.2 NetworkStatusPill
- **Redes Soportadas:** Avalanche, GenLayer. (La red Stellar queda completamente deprecada y eliminada de la interfaz).
- **Estética:** Badge encapsulado tipo píldora, con indicador luminoso pulsante (`animate-pulse`) en `bioLime` para redes conectadas.

## 3. Mapeo de Atributos

| Entidad Lógica | Componente Visual | Red/Origen de Datos | Descripción Visual |
| :--- | :--- | :--- | :--- |
| Intelligent Seed Oracle | `SeedValidationCard` | GenLayer | Muestra el estado de la IA (Idle, Scanning, Validated). |
| RWA Token | `Tokenized Lots Card` | Avalanche | Representa los activos reales envueltos en la red Avalanche. |
| USDC Balance | `Balance Card` | Avalanche | Liquidez actual. |
