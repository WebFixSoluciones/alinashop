# Plan de Implementación: Tienda Virtual Alina Shop

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir la tienda virtual completa para Alina Shop con catálogo precargado de 41 páginas, página de producto neurálgica con calculadora dinámica de medidas y grabado de logo, checkout directo estilo Shopify con pasarela Payphone y pedidos por WhatsApp con rastreo de analítica, panel administrativo profesional con gestión de pedidos, seguimiento de envíos, CRUD de catálogo con Vercel Blob y ajustes configurables.

**Architecture:** Monorepo full-stack en Next.js 15 (App Router) con TypeScript y Tailwind CSS. Prisma ORM conectado a PostgreSQL (Neon / Supabase), almacenamiento de medios en Vercel Blob CDN, pasarela de pago Payphone v3 y analítica de interacción previa a la apertura de WhatsApp.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, Prisma ORM, PostgreSQL, @vercel/blob, Lucide Icons, Zod, Vitest.

---

### Task 1: Estructura del Proyecto, Dependencias y Configuración Inicial

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `tailwind.config.ts` / CSS setup
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`
- Create: `.env.example`

- [ ] **Step 1: Inicializar el proyecto Next.js 15 con TypeScript y dependencias esenciales**
Instalar Next.js, React, Tailwind CSS, `@prisma/client`, `prisma`, `@vercel/blob`, `lucide-react`, `zod`, `bcryptjs`, `clsx`, `tailwind-merge` y dependencias de testing (`vitest`).

- [ ] **Step 2: Configurar las cabeceras de seguridad estrictas en `next.config.ts`**
Configurar `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Strict-Transport-Security` y dominios remotos de imágenes para Vercel Blob (`*.public.blob.vercel-storage.com`).

- [ ] **Step 3: Configurar la tipografía Poppins + Inter y estilos base en `layout.tsx` y `globals.css`**
Importar Poppins (weights 600, 700, 800) e Inter (weights 400, 500, 600, 700), configurando las variables CSS de Alina Shop (`--primary: #E83D84`, etc.).

- [ ] **Step 4: Verificar que el proyecto compila limpiamente**
Ejecutar: `npm run build` o `npx tsc --noEmit`
Esperado: Sin errores de compilación ni tipos.

- [ ] **Step 5: Commit inicial**
```bash
git add package.json tsconfig.json next.config.ts src/ .env.example
git commit -m "chore: scaffold Next.js 15 project with typography and security headers"
```

---

### Task 2: Modelo de Base de Datos (Prisma ORM) y Seed del Catálogo Completo

**Files:**
- Create: `prisma/schema.prisma`
- Create: `src/lib/prisma.ts`
- Create: `prisma/seed.ts`
- Create: `src/lib/catalog-data.ts`

- [ ] **Step 1: Definir el esquema Prisma relacional completo**
Modelos: `User`, `Address`, `Category`, `Product`, `ProductVariant`, `Order`, `OrderItem`, `ShippingTracking`, `WhatsAppInteraction`, `StoreSettings`.

- [ ] **Step 2: Construir el dataset completo de 41 páginas en `src/lib/catalog-data.ts`**
Cargar todas las líneas del PDF de Alina Shop:
- Bases MDF 3mm (Rizada, Ondulada, Cuadrada, Redonda, Estrella, Corazón, Punta Redonda en 10, 12, 13, 15, 17, 18, 20, 22, 24, 25, 27, 30, 32, 35, 40 cm, acabados blanco y wengué, precios unitario/docena/mayor).
- Minibases Cheesecake (10, 12, 15 cm en packs de 10).
- Bases Rectangulares (30x15 hasta 35x45 cm).
- Bases Diseños (Luna, Corazones, Flores, Trébol).
- Toppers Acrílicos y MDF/Vinil (TAC001-016, TAB, TAR, TAV, números 1-10 y personalizados).
- Apliques acrílico (4 a 15 cm).
- Cajas de acetato (tapa blanca y transparente con cinta) y cajas cartulina para cupcakes.
- Cajas varias y cajas MDF (Kit torta + portaflores).
- Complementos: Esferas decorativas (8 colores), Utensilios (cortadores, moldes, boquillas, mangas) y Pirotinas (#6 a #10).

- [ ] **Step 3: Crear el script ejecutable `prisma/seed.ts`**
Precargar todas las categorías, productos, variantes y configuración inicial de tienda (WhatsApp `593985890956`, `593979431238`, credenciales sandbox Payphone y tarifas de envío).

- [ ] **Step 4: Ejecutar la generación del cliente Prisma y verificar el seed**
Ejecutar: `npx prisma generate`
Esperado: Cliente de Prisma generado correctamente.

- [ ] **Step 5: Commit de modelos de datos y catálogo**
```bash
git add prisma/ src/lib/prisma.ts src/lib/catalog-data.ts
git commit -m "feat(db): add Prisma schema and full 41-page catalog seed data"
```

---

### Task 3: Motor de Cálculos y Calculadora de Medidas (TDD)

**Files:**
- Create: `src/lib/pricing-calculator.ts`
- Create: `tests/pricing-calculator.test.ts`

- [ ] **Step 1: Escribir pruebas unitarias para todas las reglas de cálculo**
Pruebas para:
- Precio por escala de cantidad (<12: unitario, >=12: docena, >=50: mayorista).
- Grabado de logo (+ $0.20 por base multiplicado por la cantidad).
- Cálculo de medidas bajo pedido personalizadas (ancho x alto en cm con fórmula de $cm^2$ en MDF 3mm).
- Redondeo monetario preciso a 2 decimales.

- [ ] **Step 2: Ejecutar pruebas y verificar que fallen antes de la implementación**
Ejecutar: `npx vitest run tests/pricing-calculator.test.ts`
Esperado: FAIL (función no implementada).

- [ ] **Step 3: Implementar la lógica matemática en `src/lib/pricing-calculator.ts`**
Implementar `calculateProductPrice({ variant, quantity, withLogo, customDimensions })`.

- [ ] **Step 4: Ejecutar pruebas y confirmar que pasen al 100%**
Ejecutar: `npx vitest run tests/pricing-calculator.test.ts`
Esperado: PASS todas las pruebas.

- [ ] **Step 5: Commit del motor de cálculo**
```bash
git add src/lib/pricing-calculator.ts tests/pricing-calculator.test.ts
git commit -m "feat(pricing): implement tiered volume pricing and custom dimension calculator with tests"
```

---

### Task 4: Estado Global, Carrito y Flujo de Compra Directa (Shopify-Style)

**Files:**
- Create: `src/context/cart-context.tsx`
- Create: `src/components/cart/cart-drawer.tsx`
- Create: `src/components/ui/modal.tsx`

- [ ] **Step 1: Crear el contexto de carrito con soporte para compras directas**
Manejo de ítems en carrito (con sus atributos de personalización: medida, forma, logo grabado, precio calculado).
Función `buyNow(item)`: Guarda el ítem en la sesión y redirige inmediatamente al checkout estilo Shopify sin pasar por el carrito.

- [ ] **Step 2: Construir el Cart Drawer lateral**
Panel deslizable moderno, limpio, con desglose de ítems, selector de cantidad `+` / `-`, cálculo de subtotal y botón "Proceder al Pago".

- [ ] **Step 3: Commit del sistema de carrito**
```bash
git add src/context/cart-context.tsx src/components/cart/
git commit -m "feat(cart): add cart context with Shopify-style buy-now direct purchase flow"
```

---

### Task 5: La Página de Producto Neurálgica (PDP)

**Files:**
- Create: `src/app/producto/[slug]/page.tsx`
- Create: `src/components/product/product-customizer.tsx`
- Create: `src/components/product/product-gallery.tsx`
- Create: `src/components/product/whatsapp-buy-button.tsx`

- [ ] **Step 1: Construir la galería de imágenes y ficha técnica**
Vista limpia con selector de imágenes, ficha de especificaciones (MDF 3mm, acrílico, grado alimenticio, corte láser) y código SKU.

- [ ] **Step 2: Construir el configurador neurálgico en tiempo real**
- Selector de formas interactivas (Rizada, Ondulada, Cuadrada, Redonda, Estrella, Corazón, Punta Redonda).
- Selector de acabados (Blanco laminado vs Wengué).
- Pestañas de medida: Catálogo estándar (10 a 40 cm) vs Medida exacta bajo pedido (inputs numéricos de ancho x largo en cm).
- Checkbox de grabado de logo (+ $0.20 ctv por base) y zona para adjuntar logo del cliente.
- Selector de cantidad con indicador de ahorro en vivo por compras al por mayor.

- [ ] **Step 3: Implementar los 3 botones de acción en la PDP**
- **Comprar por WhatsApp:** Dispara el registro de analítica y abre wa.me con el texto del pedido completamente armado.
- **Pagar con Tarjeta (Directo / Shopify-Style):** Ejecuta `buyNow()` y envía directamente a `/checkout`.
- **Agregar al Carrito:** Abre el Cart Drawer sin recargas.

- [ ] **Step 4: Commit de la página de producto neurálgica**
```bash
git add src/app/producto/ src/components/product/
git commit -m "feat(pdp): implement neuralgic product detail page with real-time customizer and WhatsApp/Payphone actions"
```

---

### Task 6: Storefront Público (Home, Catálogo, Filtros y Vista Rápida)

**Files:**
- Create: `src/app/page.tsx`
- Create: `src/app/catalogo/page.tsx`
- Create: `src/components/catalog/product-grid.tsx`
- Create: `src/components/catalog/quick-view-modal.tsx`
- Create: `src/components/layout/navbar.tsx`
- Create: `src/components/layout/footer.tsx`

- [ ] **Step 1: Crear la barra de navegación superior (Navbar) y pie de página**
Logo oficial de Alina Shop, enlaces de catálogo, buscador en vivo, botón de seguimiento de envíos y trigger del carrito con contador.

- [ ] **Step 2: Construir la página de inicio (Home)**
Banners limpios, accesos directos a las líneas de repostería (Bases MDF, Toppers, Cajas, Utensilios), productos destacados y botón flotante de WhatsApp.

- [ ] **Step 3: Construir el catálogo completo con filtros (`/catalogo`)**
Filtro por categoría, buscador por nombre/código y ordenamiento por precio/popularidad.

- [ ] **Step 4: Implementar el Modal de Vista Rápida (Quick View)**
Permite previsualizar el producto, seleccionar medida y comprar rápido desde el catálogo.

- [ ] **Step 5: Commit del storefront**
```bash
git add src/app/page.tsx src/app/catalogo/ src/components/catalog/ src/components/layout/
git commit -m "feat(storefront): implement Home, Catalog with category filters and Quick View modal"
```

---

### Task 7: Checkout Estilo Shopify & Integración Payphone v3

**Files:**
- Create: `src/app/checkout/page.tsx`
- Create: `src/components/checkout/checkout-form.tsx`
- Create: `src/components/checkout/order-summary.tsx`
- Create: `src/app/api/payphone/create-transaction/route.ts`
- Create: `src/app/api/payphone/confirm/route.ts`
- Create: `src/app/pedido/[id]/exito/page.tsx`

- [ ] **Step 1: Diseñar la pantalla de Checkout en 2 columnas (Shopify-Style)**
- Columna izquierda: Información del cliente (Cédula/RUC con validación ecuatoriana, Nombre, Teléfono celular, Email), Dirección de entrega (Provincia, Ciudad, Dirección exacta, Referencia) y Selección de método de pago (Tarjeta con Payphone o Pedido por WhatsApp).
- Columna derecha: Resumen del pedido con miniaturas de productos, desglose de medidas configuradas, subtotal, costo de envío y total en USD.

- [ ] **Step 2: Implementar la creación segura del pedido (Server Action / API)**
Recálculo estricto de precios en el servidor contra la base de datos para prevenir manipulación del total.

- [ ] **Step 3: Integrar el cobro con Payphone v3**
Generación de token de pago, invocación de la pasarela y endpoint de confirmación (`/api/payphone/confirm`) que verifica el pago directamente contra la API de Payphone y actualiza el estado a `PAGADO`.

- [ ] **Step 4: Crear la página de Confirmación y Éxito (`/pedido/[id]/exito`)**
Muestra el código de pedido (ej. `#ALN-2026-1001`), resumen de productos, estado del pago y link directo para dar seguimiento.

- [ ] **Step 5: Commit de checkout y Payphone**
```bash
git add src/app/checkout/ src/components/checkout/ src/app/api/payphone/ src/app/pedido/
git commit -m "feat(checkout): implement 2-column Shopify-style checkout with Payphone v3 card payment"
```

---

### Task 8: Analítica de WhatsApp & Rastreo Público de Envíos

**Files:**
- Create: `src/app/api/analytics/whatsapp-click/route.ts`
- Create: `src/app/rastreo/page.tsx`
- Create: `src/components/tracking/tracking-search.tsx`

- [ ] **Step 1: Implementar el endpoint de analítica de clics de WhatsApp**
Registra en `WhatsAppInteraction` el producto, la variante exacta (medida, forma, grabado), el precio calculado y la fecha/hora.

- [ ] **Step 2: Construir la página pública de rastreo de pedidos (`/rastreo`)**
Permite al cliente ingresar su N° de Pedido o Cédula para consultar en tiempo real el estado de su orden (Pendiente, Pagado, En Preparación, Enviado con Guía y Transportista, Entregado).

- [ ] **Step 3: Commit de analítica y rastreo**
```bash
git add src/app/api/analytics/ src/app/rastreo/ src/components/tracking/
git commit -m "feat(analytics): add WhatsApp interaction tracking endpoint and public shipment tracking page"
```

---

### Task 9: Panel Administrativo - Autenticación y Dashboard Ejecutivo

**Files:**
- Create: `src/app/admin/login/page.tsx`
- Create: `src/app/admin/layout.tsx`
- Create: `src/app/admin/page.tsx`
- Create: `src/components/admin/admin-sidebar.tsx`
- Create: `src/lib/auth.ts`

- [ ] **Step 1: Implementar la autenticación de administradores con cookies HttpOnly**
Protección de rutas `/admin/*` mediante middleware de sesión segura.

- [ ] **Step 2: Construir el layout administrativo con iconografía SVG profesional (Lucide)**
Sidebar limpio con íconos: Pedidos, Catálogo, Analítica WhatsApp, Ajustes. **Cero emojis**.

- [ ] **Step 3: Construir el Dashboard principal (`/admin`) con métricas clave**
Tarjetas de pedidos totales, volumen facturado con Payphone, total de clics de WhatsApp y pedidos en taller.

- [ ] **Step 4: Commit de la base del panel administrativo**
```bash
git add src/app/admin/ src/components/admin/ src/lib/auth.ts
git commit -m "feat(admin): build secure admin layout with professional Lucide iconography and dashboard metrics"
```

---

### Task 10: Panel Administrativo - Gestión de Pedidos y Envíos

**Files:**
- Create: `src/app/admin/pedidos/page.tsx`
- Create: `src/components/admin/orders-table.tsx`
- Create: `src/components/admin/order-detail-modal.tsx`
- Create: `src/components/admin/assign-shipping-modal.tsx`

- [ ] **Step 1: Construir la tabla de pedidos con filtros por estado**
Filtros: Todos, Pendientes, Pagados, En Preparación, Enviados, Entregados. Buscador por N° de orden o cliente.

- [ ] **Step 2: Implementar el modal de detalles técnicos de pedido**
Muestra el desglose de productos con especificaciones exactas (medida, color, archivo de logo adjunto) para el taller de corte y empaque.

- [ ] **Step 3: Implementar la asignación de guía de envío y notificación en 1 clic**
Modal para seleccionar Transportista (Servientrega, LaarCourier, Cooperativa, Local) e ingresar N° de Guía.
Botón para abrir WhatsApp con el mensaje listo informando al cliente su número de guía y link de rastreo.

- [ ] **Step 4: Commit de gestión de pedidos y envíos**
```bash
git add src/app/admin/pedidos/ src/components/admin/orders-table.tsx src/components/admin/order-detail-modal.tsx src/components/admin/assign-shipping-modal.tsx
git commit -m "feat(admin): implement order management, status workflow, and shipment tracking with WhatsApp alerts"
```

---

### Task 11: Panel Administrativo - Catálogo y Subida a Vercel Blob

**Files:**
- Create: `src/app/admin/productos/page.tsx`
- Create: `src/components/admin/products-table.tsx`
- Create: `src/components/admin/product-editor-modal.tsx`
- Create: `src/app/api/blob/upload/route.ts`

- [ ] **Step 1: Construir la tabla de administración del catálogo**
Buscador, filtro por categorías y selector de estado (activo/inactivo).

- [ ] **Step 2: Implementar la subida directa de imágenes con `@vercel/blob`**
Endpoint seguro `/api/blob/upload` para subir nuevas fotos de productos o reemplazar imágenes existentes, almacenándolas en la CDN de Vercel.

- [ ] **Step 3: Implementar el editor de productos y variantes**
Permite cambiar nombre, descripción, material, subir fotos a Vercel Blob y editar en línea los precios unitarios, precios por docena y precios por mayor de cada medida o agregar nuevas medidas.

- [ ] **Step 4: Commit del módulo de catálogo admin**
```bash
git add src/app/admin/productos/ src/components/admin/products-table.tsx src/components/admin/product-editor-modal.tsx src/app/api/blob/
git commit -m "feat(admin): implement catalog CRUD, inline variant price editing and Vercel Blob image uploader"
```

---

### Task 12: Panel Administrativo - Analítica WhatsApp y Pestaña de Ajustes

**Files:**
- Create: `src/app/admin/analitica/page.tsx`
- Create: `src/app/admin/ajustes/page.tsx`
- Create: `src/components/admin/whatsapp-metrics.tsx`
- Create: `src/components/admin/settings-form.tsx`

- [ ] **Step 1: Construir la pantalla de Analítica de Interacciones WhatsApp**
Ranking de productos más consultados, variantes con más interés y gráfica de interacciones en el tiempo.

- [ ] **Step 2: Construir la Pestaña de Ajustes (`/admin/ajustes` con ícono de engranaje SVG)**
- Configuración de WhatsApp: número principal (`593985890956`), número secundario (`593979431238`), selector de número activo y editor de plantilla de mensaje.
- Configuración de Payphone: Client ID, App ID, Token API v3, selector de Sandbox/Producción.
- Configuración de Envíos: Tarifas base de envío local y nacional.

- [ ] **Step 3: Commit de analítica y ajustes**
```bash
git add src/app/admin/analitica/ src/app/admin/ajustes/ src/components/admin/
git commit -m "feat(admin): implement WhatsApp interaction analytics and store settings panel"
```

---

### Task 13: Portal de Clientes y Cuentas de Usuario

**Files:**
- Create: `src/app/login/page.tsx`
- Create: `src/app/registro/page.tsx`
- Create: `src/app/cuenta/pedidos/page.tsx`

- [ ] **Step 1: Construir pantallas de registro e inicio de sesión de clientes**
Formularios limpios con validación de datos.

- [ ] **Step 2: Construir el portal de historial de pedidos (`/cuenta/pedidos`)**
Lista de compras anteriores con estados en tiempo real y botón de "Repetir Pedido" con 1 clic.

- [ ] **Step 3: Commit de cuentas de usuario**
```bash
git add src/app/login/ src/app/registro/ src/app/cuenta/
git commit -m "feat(auth): implement customer registration, login and order history dashboard"
```

---

### Task 14: Verificación Integral, Tests Automatizados y Sincronización GitHub

**Files:**
- Create: `tests/e2e-flow.test.ts`
- Test: `npm run build`
- Test: `npx vitest run`

- [ ] **Step 1: Ejecutar la suite completa de pruebas unitarias y de integración**
Ejecutar: `npx vitest run`
Esperado: 100% pruebas pasando.

- [ ] **Step 2: Compilar el proyecto completo para producción**
Ejecutar: `npm run build`
Esperado: Compilación limpia sin errores de tipos TypeScript ni advertencias.

- [ ] **Step 3: Sincronizar y confirmar todos los cambios en Git**
Confirmar commits y sincronizar con la rama remota en `https://github.com/WebFixSoluciones/alinashop.git`.
