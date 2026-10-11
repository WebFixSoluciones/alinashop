-- ==========================================================
-- ALINA SHOP - BASE DE DATOS MYSQL PARA CPANEL / PHPMYADMIN
-- Generado para compatibilidad nativa MySQL / MariaDB
-- ==========================================================

-- Tabla de Usuarios (Administradores, Colaboradores y Clientes)
CREATE TABLE IF NOT EXISTS `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `idNumber` VARCHAR(191) NULL,
    `role` ENUM('ADMIN', 'COLABORADOR', 'CLIENTE') NOT NULL DEFAULT 'CLIENTE',
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `lastLogin` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabla de Direcciones de Envío
CREATE TABLE IF NOT EXISTS `Address` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `recipient` VARCHAR(191) NOT NULL,
    `idNumber` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `province` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `reference` VARCHAR(191) NULL,
    `isDefault` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabla de Categorías de Productos
CREATE TABLE IF NOT EXISTS `Category` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Category_name_key`(`name`),
    UNIQUE INDEX `Category_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabla de Productos del Catálogo
CREATE TABLE IF NOT EXISTS `Product` (
    `id` VARCHAR(191) NOT NULL,
    `sku` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `material` VARCHAR(191) NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `mainImage` VARCHAR(191) NOT NULL,
    `images` JSON NOT NULL,
    `hasLogoOption` BOOLEAN NOT NULL DEFAULT false,
    `logoPriceExtra` DECIMAL(10, 2) NOT NULL DEFAULT 0.20,
    `allowCustomSize` BOOLEAN NOT NULL DEFAULT false,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Product_sku_key`(`sku`),
    UNIQUE INDEX `Product_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabla de Variantes (Medidas, Formas, Colores y Precios Escalonados)
CREATE TABLE IF NOT EXISTS `ProductVariant` (
    `id` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NULL,
    `sizeLabel` VARCHAR(191) NOT NULL,
    `shape` VARCHAR(191) NULL,
    `color` VARCHAR(191) NULL,
    `unitPrice` DECIMAL(10, 2) NOT NULL,
    `dozenPrice` DECIMAL(10, 2) NOT NULL,
    `wholesalePrice` DECIMAL(10, 2) NOT NULL,
    `stock` INTEGER NOT NULL DEFAULT 999,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabla de Pedidos y Órdenes de Compra
CREATE TABLE IF NOT EXISTS `Order` (
    `id` VARCHAR(191) NOT NULL,
    `orderNumber` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `customerName` VARCHAR(191) NOT NULL,
    `customerIdNumber` VARCHAR(191) NOT NULL,
    `customerEmail` VARCHAR(191) NOT NULL,
    `customerPhone` VARCHAR(191) NOT NULL,
    `shippingAddress` TEXT NOT NULL,
    `shippingCity` VARCHAR(191) NOT NULL,
    `shippingProvince` VARCHAR(191) NOT NULL,
    `shippingReference` TEXT NULL,
    `shippingMethod` VARCHAR(191) NOT NULL DEFAULT 'pichincha',
    `paymentMethod` ENUM('PAYPHONE_CARD', 'WHATSAPP_ORDER', 'TRANSFERENCIA_DIRECTA') NOT NULL,
    `paymentStatus` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `payphoneTransactionId` VARCHAR(191) NULL,
    `orderStatus` ENUM('PENDIENTE', 'PAGADO', 'EN_PREPARACION', 'ENVIADO', 'ENTREGADO', 'CANCELADO') NOT NULL DEFAULT 'PENDIENTE',
    `subtotal` DECIMAL(10, 2) NOT NULL,
    `shippingCost` DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    `total` DECIMAL(10, 2) NOT NULL,
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Order_orderNumber_key`(`orderNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabla de Artículos por Pedido
CREATE TABLE IF NOT EXISTS `OrderItem` (
    `id` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `variantDetails` JSON NOT NULL,
    `quantity` INTEGER NOT NULL,
    `unitPrice` DECIMAL(10, 2) NOT NULL,
    `subtotal` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabla de Guías de Rastreo de Envío (Servientrega, etc.)
CREATE TABLE IF NOT EXISTS `ShippingTracking` (
    `id` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `courier` VARCHAR(191) NOT NULL,
    `trackingNumber` VARCHAR(191) NOT NULL,
    `trackingUrl` VARCHAR(191) NULL,
    `shippedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deliveredAt` DATETIME(3) NULL,
    `notes` TEXT NULL,

    UNIQUE INDEX `ShippingTracking_orderId_key`(`orderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabla de Clics e Interacciones en WhatsApp
CREATE TABLE IF NOT EXISTS `WhatsAppInteraction` (
    `id` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `variantDetails` JSON NOT NULL,
    `calculatedPrice` DECIMAL(10, 2) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabla de Configuración de la Tienda
CREATE TABLE IF NOT EXISTS `StoreSettings` (
    `id` VARCHAR(191) NOT NULL DEFAULT 'default',
    `whatsappPrimary` VARCHAR(191) NOT NULL DEFAULT '593985890956',
    `whatsappSecondary` VARCHAR(191) NOT NULL DEFAULT '593979431238',
    `whatsappActiveNumber` VARCHAR(191) NOT NULL DEFAULT '593985890956',
    `whatsappTemplate` TEXT NOT NULL,
    `payphoneClientId` VARCHAR(191) NULL,
    `payphoneAppId` VARCHAR(191) NULL,
    `payphoneToken` TEXT NULL,
    `payphoneIsSandbox` BOOLEAN NOT NULL DEFAULT true,
    `shippingBasePichincha` DECIMAL(10, 2) NOT NULL DEFAULT 3.50,
    `shippingBaseNational` DECIMAL(10, 2) NOT NULL DEFAULT 5.50,
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Tabla de Publicidad y Notificaciones (Pop-up de Bienvenida y Carrusel Superior)
CREATE TABLE IF NOT EXISTS `PromotionSetting` (
    `id` VARCHAR(191) NOT NULL DEFAULT 'default',
    `config` JSON NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Inserción de Usuarios Administrativos Predeterminados
INSERT INTO `User` (`id`, `email`, `username`, `passwordHash`, `name`, `role`, `isActive`, `createdAt`, `updatedAt`)
VALUES 
('usr_admin_01', 'admin@alinashop.ec', 'admin', '$2b$10$wZJ4eJ6fXbFf0mK8xPq7eOKL4lK6N1/7t7lC2l5C1l7V8q9mZ0qW2', 'Administrador Principal', 'ADMIN', 1, NOW(3), NOW(3)),
('usr_colab_01', 'colaborador@alinashop.ec', 'colaborador', '$2b$10$Y1w.M3T6h8v8G7o8b8f8e.bB1hB9k4v2.7L7k7lC2l5C1l7V8q9mZ', 'Colaborador de Tienda', 'COLABORADOR', 1, NOW(3), NOW(3))
ON DUPLICATE KEY UPDATE `email`=`email`;

-- Claves Foráneas
ALTER TABLE `Address` ADD CONSTRAINT `Address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `ProductVariant` ADD CONSTRAINT `ProductVariant_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE `ShippingTracking` ADD CONSTRAINT `ShippingTracking_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `WhatsAppInteraction` ADD CONSTRAINT `WhatsAppInteraction_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
