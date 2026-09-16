# Especificación de Diseño Técnico: Tienda Virtual Alina Shop

**Fecha:** 2026-09-15  
**Cliente:** Alina Shop — Insumos de Repostería  
**Repositorio GitHub:** `https://github.com/WebFixSoluciones/alinashop.git`  
**Plataforma de Despliegue:** Vercel (con Vercel Blob Storage)  
**Pasarela de Pago:** Payphone Ecuador (API v3 / Botón de Pagos)  
**Canal de Ventas Directo:** Pedidos por WhatsApp con Analítica de Interacción  

---

## 1. Resumen Ejecutivo e Identidad de Marca

Alina Shop es un negocio especializado en insumos de repostería profesional, bases de torta en MDF de corte láser, toppers en acrílico y vinil, cajas de acetato y cartulina, apliques y utensilios para pastelerías, reposteros y talleres de horneado en todo el Ecuador.

### Identidad Visual y Diseño
- **Estilo:** Boutique Moderna & Minimalista — diseño ultra limpio, espacioso, sin ruido visual, con el producto y sus especificaciones técnicas como protagonistas.
- **Iconografía:** 100% iconografía profesional SVG (estilo Lucide / Feather con trazos limpios de 1.5px/2px). **Cero emojis** en el panel administrativo y componentes técnicos.
- **Tipografía Oficial:**
  - **Poppins (Weights 600, 700, 800):** Encabezados, títulos de producto, llamados a la acción y banners de marca (aporta calidez geométrica que armoniza con la repostería).
  - **Inter (Weights 400, 500, 600):** Cuerpos de texto, descripciones, tablas técnicas de medidas, números, formularios y paneles de datos.
- **Paleta de Colores:**
  - **Rosa Alina Oficial:** `#E83D84` (Acentos de marca, botones principales, insignias).
  - **Rosa Acento Suave:** `#FFF1F6` / `#FDF2F8` (Fondos de selección y estados activos).
  - **Neutros:** Blanco Puro `#FFFFFF`, Gris de Fondo `#F9FAFB`, Bordes `#E2E8F0` / `#E5E7EB`, Texto Principal Carbón `#0F172A` / `#111827`, Texto Secundario `#64748B`.
  - **Semánticos:** Verde WhatsApp `#25D366` / Éxito `#15803D`, Azul Información `#1D4ED8`, Naranja Pendiente `#C2410C`, Morado Taller `#7E22CE`.

---

## 2. Arquitectura Tecnológica & Despliegue

La solución se implementa como un monorepo full-stack en **Next.js 15** utilizando el modelo App Router, Server Components y Server Actions con tipado estricto en TypeScript.

```
+-------------------------------------------------------------------------+
|                              CLIENTES                                    |
|   Navegador Web / Dispositivos Móviles (Responsive First, Fast Loading) |
+------------------------------------+------------------------------------+
                                     |
                                     v
+-------------------------------------------------------------------------+
|                  NEXT.JS 15 APP ROUTER (VERCEL EDGE / NODE)              |
|  - Middleware de Seguridad & Headers (CSP, HSTS, X-Frame-Options)       |
|  - Storefront Público (/catalogo, /producto/[slug], /checkout, /rastreo)|
|  - Panel Administrativo (/admin: pedidos, productos, analítica, ajustes)|
|  - Server Actions & API Routes (/api/payphone, /api/analytics, /api/blob)|
+-------------------+-----------------+-------------------+---------------+
                    |                 |                   |
                    v                 v                   v
+-----------------------+ +---------------------+ +-----------------------+
|  POSTGRESQL (PRISMA)  | |  VERCEL BLOB CDN    | |  PAYPHONE API v3      |
|  - Catálogo & Medidas | |  - Fotos Productos  | |  - Tokenización Card  |
|  - Pedidos & Tracking | |  - Logos Clientes   | |  - Webhook de Cobro   |
|  - Analítica WhatsApp | |  - Comprobantes     | |                       |
+-----------------------+ +---------------------+ +-----------------------+
```

### Stack Técnico
- **Framework:** Next.js 15 (React 19, TypeScript).
- **Estilos:** Tailwind CSS v4, Lucide Icons (`lucide-react`).
- **Base de Datos & ORM:** PostgreSQL (Neon Serverless / Supabase / Vercel Postgres) con Prisma ORM.
- **Almacenamiento de Archivos:** `@vercel/blob` para subida y distribución global de imágenes.
- **Validación de Datos:** Zod para validación estricta de esquemas y Server Actions.
- **Seguridad de Sesiones:** Sesiones seguras basadas en cookies `HttpOnly`, `SameSite=Strict`, con hashing criptográfico (`bcryptjs`).
- **Integración Git/CI:** Commits al repositorio `WebFixSoluciones/alinashop.git` disparan el build y despliegue automático en Vercel.

---

## 3. Modelo de Datos (Prisma ORM)

### Esquema Relacional Principal
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  ADMIN
  CLIENTE
}

enum OrderStatus {
  PENDIENTE
  PAGADO
  EN_PREPARACION
  ENVIADO
  ENTREGADO
  CANCELADO
}

enum PaymentMethod {
  PAYPHONE_CARD
  WHATSAPP_ORDER
  TRANSFERENCIA_DIRECTA
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String
  name          String
  phone         String?
  role          Role      @default(CLIENTE)
  addresses     Address[]
  orders        Order[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Address {
  id           String   @id @default(cuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  recipient    String
  idNumber     String   // Cédula o RUC
  phone        String
  province     String
  city         String
  street       String
  reference    String?
  isDefault    Boolean  @default(false)
  createdAt    DateTime @default(now())
}

model Category {
  id          String    @id @default(cuid())
  name        String    @unique
  slug        String    @unique
  description String?
  order       Int       @default(0)
  products    Product[]
}

model Product {
  id              String           @id @default(cuid())
  sku             String           @unique
  name            String
  slug            String           @unique
  description     String
  material        String?          // Ej: "MDF 3mm", "Acrílico", "Cartulina"
  categoryId      String
  category        Category         @relation(fields: [categoryId], references: [id])
  mainImage       String           // URL en Vercel Blob
  images          String[]         // Galería en Vercel Blob
  hasLogoOption   Boolean          @default(false) // Si admite grabado láser (+ $0.20)
  logoPriceExtra  Decimal          @default(0.20) @db.Decimal(10, 2)
  allowCustomSize Boolean          @default(false) // Si admite medidas bajo pedido
  isActive        Boolean          @default(true)
  variants        ProductVariant[]
  interactions    WhatsAppInteraction[]
  orderItems      OrderItem[]
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt
}

model ProductVariant {
  id            String   @id @default(cuid())
  productId     String
  product       Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  code          String?  // Ej: BBRSL10, TAC001
  sizeLabel     String   // Ej: "10 cm", "20 cm", "30x15 cm"
  shape         String?  // Ej: "Rizada", "Cuadrada", "Redonda", "Estrella", "Corazón", "Punta Redonda"
  color         String?  // Ej: "Blanco", "Wengué", "Dorado"
  unitPrice     Decimal  @db.Decimal(10, 2) // Precio unitario base
  dozenPrice    Decimal  @db.Decimal(10, 2) // Precio unitario por docena
  wholesalePrice Decimal @db.Decimal(10, 2) // Precio unitario por mayor (50+ unds)
  stock         Int      @default(999)
  isActive      Boolean  @default(true)
}

model Order {
  id                    String            @id @default(cuid())
  orderNumber           String            @unique // Ej: ALN-2026-1001
  userId                String?
  user                  User?             @relation(fields: [userId], references: [id])
  customerName          String
  customerIdNumber      String            // Cédula o RUC
  customerEmail         String
  customerPhone         String
  shippingAddress       String
  shippingCity          String
  shippingProvince      String
  shippingReference     String?
  paymentMethod         PaymentMethod
  paymentStatus         String            @default("PENDING") // PENDING, APPROVED, REJECTED
  payphoneTransactionId String?
  orderStatus           OrderStatus       @default(PENDIENTE)
  subtotal              Decimal           @db.Decimal(10, 2)
  shippingCost          Decimal           @default(0.00) @db.Decimal(10, 2)
  total                 Decimal           @db.Decimal(10, 2)
  notes                 String?
  items                 OrderItem[]
  tracking              ShippingTracking?
  createdAt             DateTime          @default(now())
  updatedAt             DateTime          @updatedAt
}

model OrderItem {
  id              String   @id @default(cuid())
  orderId         String
  order           Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId       String
  product         Product  @relation(fields: [productId], references: [id])
  variantDetails  Json     // { size, shape, color, customDimensions, withLogo }
  quantity        Int
  unitPrice       Decimal  @db.Decimal(10, 2)
  subtotal        Decimal  @db.Decimal(10, 2)
}

model ShippingTracking {
  id            String    @id @default(cuid())
  orderId       String    @unique
  order         Order     @relation(fields: [orderId], references: [id], onDelete: Cascade)
  courier       String    // Ej: "Servientrega", "LaarCourier", "Entrega Local", "Cooperativa"
  trackingNumber String
  trackingUrl   String?
  shippedAt     DateTime  @default(now())
  deliveredAt   DateTime?
  notes         String?
}

model WhatsAppInteraction {
  id             String   @id @default(cuid())
  productId      String
  product        Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  variantDetails Json     // Parámetros con los que se dio clic
  calculatedPrice Decimal @db.Decimal(10, 2)
  quantity       Int
  createdAt      DateTime @default(now())
}

model StoreSettings {
  id                    String   @id @default("default")
  whatsappPrimary       String   @default("593985890956")
  whatsappSecondary     String   @default("593979431238")
  whatsappActiveNumber  String   @default("593985890956")
  whatsappTemplate      String   @default("Hola Alina Shop, deseo realizar este pedido: *{orderNumber}*...")
  payphoneClientId      String?
  payphoneAppId         String?
  payphoneToken         String?
  payphoneIsSandbox     Boolean  @default(true)
  shippingBasePichincha Decimal  @default(3.50) @db.Decimal(10, 2)
  shippingBaseNational  Decimal  @default(5.50) @db.Decimal(10, 2)
  updatedAt             DateTime @updatedAt
}
```

---

## 4. El Módulo Neurálgico: Página de Producto (PDP) & Calculadora

La página de cada producto es el eje central del e-commerce. Permite al cliente configurar su producto antes de cualquier acción:

### Componentes de la Calculadora en Tiempo Real
1. **Selector de Formas:**
   - Botones limpios: *Rizada, Ondulada, Cuadrada, Redonda, Estrella, Corazón, Punta Redonda*.
2. **Selector de Material / Acabado:**
   - Botones con muestra de color: *Blanco laminado* vs *Wengué oscuro*.
3. **Selector de Medidas Estándar vs Personalizadas:**
   - **Medidas de Catálogo:** Botones directos de 10 cm, 12 cm, 13 cm, 15 cm, 17 cm, 18 cm, 20 cm, 22 cm, 24 cm, 25 cm, 27 cm, 30 cm, 32 cm, 35 cm, 40 cm con indicación de precio.
   - **Pestaña "Bajo Pedido / Medida Exacta":** Permite ingresar Ancho (cm) y Largo (cm). El sistema calcula el área en $cm^2$ y aplica la fórmula de costo de MDF láser en tiempo real.
4. **Grabado de Logotipo Personalizado (+ $0.20 ctvs):**
   - Checkbox interactivo para incluir grabado de logo. Si está marcado, suma automáticamente $0.20 por cada unidad solicitada.
   - Permite adjuntar o subir el archivo de logo (PDF, AI, PNG de alta resolución) almacenado en Vercel Blob.
5. **Selector de Cantidad y Escala de Precios:**
   - Si la cantidad es < 12: aplica precio unitario base.
   - Si la cantidad es >= 12 y < 50: aplica automáticamente el **PVP Docena**.
   - Si la cantidad es >= 50: aplica automáticamente el **PVP Por Mayor**.
   - Muestra en pantalla el precio unitario resultante, el subtotal total y el badge de ahorro: *"Ahorras $X.XX comprando por mayor"*.

### Canales de Acción en la Pantalla del Producto
- **Botón "Comprar por WhatsApp":**
  1. Ejecuta una petición asíncrona a `/api/analytics/whatsapp-click` registrando el producto, forma, medida, logo, cantidad y subtotal.
  2. Genera el enlace seguro `https://wa.me/{numero_activo}?text={mensaje_preparado}` con todo el pedido detallado.
  3. Abre WhatsApp en una nueva pestaña sin bloquear al usuario.
- **Botón "Pagar con Tarjeta (Payphone)":**
  - Conduce directamente al checkout rápido con los datos preconfigurados.
- **Botón "Agregar al Carrito":**
  - Despliega el Carrito Lateral (Drawer) para continuar explorando más productos.

---

## 5. Catálogo Completo Precargado (Seed 41 Páginas)

El sistema incluirá un script de migración y seed (`prisma/seed.ts`) que precarga el catálogo íntegro del documento oficial de Alina Shop:

| Categoría | Productos / Modelos Incluidos | Variantes de Medidas |
| :--- | :--- | :--- |
| **Bases de Torta MDF** | Rizada (BBRI), Ondulada (BBO), Cuadrada (BBC), Redonda (BBRE), Estrella (BBE), Corazón (BBCO), Punta Redonda (BBCP) | 10, 12, 13, 15, 17, 18, 20, 22, 24, 25, 27, 30, 32, 35, 40 cm. Sin logo y Con logo. |
| **Minibases (Packs 10 unds)** | Rizada (MBR), Cuadrada (MBCU), Circular (MBCI) | 10 cm, 12 cm, 15 cm |
| **Bases Rectangulares** | Rectangulares MDF (BBRT) | 30x15, 30x20, 30x25, 25x35, 30x40, 30x45, 35x45 cm |
| **Bases Diseños** | Luna (BBL), Corazones (BBCP), Flores (BBF), Trébol (BBT) | 15, 18, 20, 22, 25, 30, 35 cm |
| **Toppers Acrílico & MDF** | Diseños TAC001-TAC016, TAB, TAR, TAV (Acrílico y Vinil) + Toppers Números 1 a 10 (TMDF001-TMDF010) + Personalizados | 6 cm, 10 cm, 15 cm, 20 cm, 25 cm |
| **Apliques de Acrílico** | Apliques miniatura y figuras personalizadas | 4 cm, 5 cm, 6 cm, 10 cm, 15 cm |
| **Cajas de Acetato** | Acetato Tapa Blanca y Tapa Transparente con cinta incluida | 17x20, 21.5x24, 25.3x31, 31.2x28, 35.2x25 cm |
| **Cajas Cupcakes** | Cartulina blanca y acabado dorado (2, 4 y 6 servicios) | 16x9x7.5, 16x16x7.5, 24x16x7.5 cm |
| **Cajas Varias & MDF** | Kit torta + cupcakes, cajas halar, mini acetato, Kit torta + portaflores (CKT001), caja 20x15 | Varios formatos |
| **Esferas Decorativas** | Esferas plásticas 20 pzs (Plateado, Azul, Verde, Rojo, Dorado, Rosa, Blanco, Fucsia, Surtido) | 2, 2.5, 3 y 4 cm combinadas |
| **Utensilios** | Cortadores de galleta, cortador margarita, moldes x12, boquillas pequeñas (6, 9, 12 pzs), boquillas grandes + manga, mangas desechables | 25 cm, 30 cm, 35 cm |
| **Pirotinas** | Blanco entero #6, #7, #8, #10 y Cupcake Día Especial | #6, #7, #8, #10 |

---

## 6. Panel Administrativo (`/admin`)

El panel administrativo contará con una interfaz sobria, moderna e iconografía SVG profesional (Lucide Icons):

### 1. Gestión de Pedidos (`/admin/pedidos`)
- Filtros por estado: *Todos, Pendientes, Pagados, En Preparación, Enviados, Entregados*.
- Buscador por número de orden, nombre de cliente o cédula.
- Actualización de estados en 1 clic.
- **Asignación de Guía de Envío:** Modal para registrar transportista (Servientrega, Laar, etc.), número de guía y notas.
- **Botón de Notificación WhatsApp:** Abre un mensaje de WhatsApp preformateado para informar al cliente el número de guía y el link de rastreo.

### 2. Gestión de Catálogo (`/admin/productos`)
- Visualización de todos los productos y variantes.
- Buscador y filtro por categoría.
- **Editor Completo de Producto:**
  - Cambiar nombre, descripción, material, categoría y estado (activo/oculto).
  - **Subida de Imágenes a Vercel Blob:** Arrastrar y soltar imágenes nuevas o reemplazarlas al instante.
  - **Editor de Precios y Medidas:** Modificar valores unitarios, por docena y por mayor de cada variante.
  - **Creador de Nuevas Variantes:** Agregar nuevas dimensiones o formas a cualquier producto existente.

### 3. Analítica de Interacciones WhatsApp (`/admin/analitica`)
- Contador total de interacciones por WhatsApp frente a pedidos completados.
- **Ranking de Productos Más Consultados:** Tabla y gráfica de barras que lista qué productos, medidas y configuraciones reciben más clics.
- Historial detallado con fecha, hora y especificaciones consultadas.

### 4. Pestaña de Ajustes (`/admin/ajustes` — Icono de Engranaje SVG)
- **Configuración de WhatsApp:**
  - Número principal (ej. `593985890956`).
  - Número secundario (ej. `593979431238`).
  - Selector de número activo para recibir pedidos de la tienda.
  - Editor de la plantilla del mensaje de WhatsApp.
- **Configuración de Payphone:**
  - Client ID / App ID.
  - Token de Autenticación API v3.
  - Interruptor Modo Sandbox (pruebas) / Modo Producción.
  - Verificación del estado de conexión con Payphone.
- **Configuración de Envíos:**
  - Tarifa base de envío local (Pichincha / Quito).
  - Tarifa base de envío nacional (resto de provincias).

---

## 7. Seguridad, Integridad y Cabeceras HTTP

### Cabeceras de Seguridad (`next.config.ts`)
```typescript
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://pay.payphonetodoesposible.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https://*.public.blob.vercel-storage.com https://pay.payphonetodoesposible.com; connect-src 'self' https://pay.payphonetodoesposible.com https://api.payphone.com.ec; frame-src 'self' https://pay.payphonetodoesposible.com;"
  }
];
```

### Reglas de Integridad
- **Anti-Tampering:** Ningún cálculo de precio se acepta a ciegas desde el cliente. Las Server Actions validan el ID de variante y el SKU contra la base de datos para computar el subtotal real.
- **Validación Criptográfica de Payphone:** Las confirmaciones de pago en `/api/payphone/confirm` se validan consultando directamente a la API de Payphone con el `clientTxId` y `transactionId`, asegurando que no existan pagos falsos o simulados.
- **Validación de Cédula Ecuatoriana:** Algoritmo módulo 10 para garantizar números de identificación válidos para facturación y envíos.

---

## 8. Plan de Verificación & Criterios de Éxito

### Pruebas Automatizadas
- `npm run build`: Compilación limpia sin errores de tipos TypeScript ni advertencias de ESLint.
- Validación de esquemas Prisma y migraciones relacionales correctas.
- Verificación del cálculo dinámico de precios (unitario vs docena vs mayorista vs grabado de logo).

### Pruebas Funcionales
1. **Flujo de Catálogo & PDP:** Navegación en móvil y escritorio, selección de formas, medidas y verificación del precio dinámico.
2. **Flujo WhatsApp:** Clic en "Comprar por WhatsApp", registro del evento en `/api/analytics/whatsapp-click` y verificación del mensaje preformateado en wa.me.
3. **Flujo Payphone:** Inicio de transacción con botón de pagos, procesamiento y confirmación de webhook.
4. **Flujo Administrativo:** Inicio de sesión en `/admin`, cambio de estado de un pedido, asignación de guía de envío, edición de un producto y prueba de subida de imagen a Vercel Blob.
5. **Configuración:** Cambio del número de WhatsApp en `/admin/ajustes` y verificación de que la tienda empiece a direccionar los pedidos al nuevo número de forma inmediata.
