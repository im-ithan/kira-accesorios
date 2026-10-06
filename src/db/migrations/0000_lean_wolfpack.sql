CREATE TABLE "carrito_producto" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"carrito_id" uuid NOT NULL,
	"producto_id" uuid NOT NULL,
	"cantidad" integer DEFAULT 1 NOT NULL,
	CONSTRAINT "carrito_producto_carrito_id_producto_id_unique" UNIQUE("carrito_id","producto_id"),
	CONSTRAINT "carrito_producto_cantidad_check" CHECK ("carrito_producto"."cantidad" > 0)
);
--> statement-breakpoint
CREATE TABLE "carritos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"usuario_id" uuid NOT NULL,
	"estado" varchar(20) NOT NULL,
	"fecha_creacion" timestamp with time zone DEFAULT now() NOT NULL,
	"fecha_actualizacion" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "carritos_estado_check" CHECK ("carritos"."estado" IN ('ACTIVO', 'COMPRADO', 'ABANDONADO'))
);
--> statement-breakpoint
CREATE TABLE "categorias" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nombre" varchar(100) NOT NULL,
	"descripcion" text,
	"imagen" varchar(500),
	"activo" boolean DEFAULT true NOT NULL,
	"fecha_creacion" timestamp with time zone DEFAULT now() NOT NULL,
	"fecha_actualizacion" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "categorias_nombre_unique" UNIQUE("nombre")
);
--> statement-breakpoint
CREATE TABLE "codigos_promocionales" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"promocion_id" uuid NOT NULL,
	"codigo" varchar(50) NOT NULL,
	"limite_usos" integer,
	"usos_realizados" integer DEFAULT 0 NOT NULL,
	"fecha_inicio" timestamp with time zone NOT NULL,
	"fecha_fin" timestamp with time zone,
	"activo" boolean DEFAULT true NOT NULL,
	"fecha_creacion" timestamp with time zone DEFAULT now() NOT NULL,
	"fecha_actualizacion" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "codigos_promocionales_codigo_unique" UNIQUE("codigo"),
	CONSTRAINT "codigos_limite_usos_check" CHECK ("codigos_promocionales"."limite_usos" IS NULL OR "codigos_promocionales"."limite_usos" > 0),
	CONSTRAINT "codigos_usos_realizados_check" CHECK ("codigos_promocionales"."usos_realizados" >= 0),
	CONSTRAINT "codigos_usos_limite_check" CHECK ("codigos_promocionales"."limite_usos" IS NULL OR "codigos_promocionales"."usos_realizados" <= "codigos_promocionales"."limite_usos"),
	CONSTRAINT "codigos_fechas_check" CHECK ("codigos_promocionales"."fecha_fin" IS NULL OR "codigos_promocionales"."fecha_fin" >= "codigos_promocionales"."fecha_inicio")
);
--> statement-breakpoint
CREATE TABLE "gift_card_movimientos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"gift_card_id" uuid NOT NULL,
	"tipo" varchar(30) NOT NULL,
	"monto" numeric(10, 2) NOT NULL,
	"pedido_id" uuid,
	"fecha" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "gift_card_movimientos_tipo_check" CHECK ("gift_card_movimientos"."tipo" IN ('COMPRA', 'USO', 'AJUSTE')),
	CONSTRAINT "gift_card_movimientos_monto_check" CHECK ("gift_card_movimientos"."monto" > 0)
);
--> statement-breakpoint
CREATE TABLE "gift_cards" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"codigo" varchar(50) NOT NULL,
	"valor_inicial" numeric(10, 2) NOT NULL,
	"saldo_actual" numeric(10, 2) NOT NULL,
	"comprador_id" uuid NOT NULL,
	"destinatario_id" uuid,
	"estado" varchar(20) NOT NULL,
	"fecha_creacion" timestamp with time zone DEFAULT now() NOT NULL,
	"fecha_expiracion" timestamp with time zone,
	"fecha_actualizacion" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "gift_cards_codigo_unique" UNIQUE("codigo"),
	CONSTRAINT "gift_cards_estado_check" CHECK ("gift_cards"."estado" IN (
        'PENDIENTE',
        'ACTIVA',
        'AGOTADA',
        'EXPIRADA'
      )),
	CONSTRAINT "gift_cards_valor_inicial_check" CHECK ("gift_cards"."valor_inicial" > 0),
	CONSTRAINT "gift_cards_saldo_check" CHECK ("gift_cards"."saldo_actual" >= 0),
	CONSTRAINT "gift_cards_saldo_maximo_check" CHECK ("gift_cards"."saldo_actual" <= "gift_cards"."valor_inicial")
);
--> statement-breakpoint
CREATE TABLE "marcas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nombre" varchar(100) NOT NULL,
	"logo" varchar(500),
	"activo" boolean DEFAULT true NOT NULL,
	"fecha_creacion" timestamp with time zone DEFAULT now() NOT NULL,
	"fecha_actualizacion" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "marcas_nombre_unique" UNIQUE("nombre")
);
--> statement-breakpoint
CREATE TABLE "metodos_pago" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"usuario_id" uuid NOT NULL,
	"tipo" varchar(30) NOT NULL,
	"proveedor" varchar(50),
	"referencia_externa" varchar(255),
	"ultimos_digitos" varchar(4),
	"activo" boolean DEFAULT true NOT NULL,
	"fecha_creacion" timestamp with time zone DEFAULT now() NOT NULL,
	"fecha_actualizacion" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pagos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pedido_id" uuid NOT NULL,
	"metodo_pago_id" uuid,
	"gift_card_id" uuid,
	"tipo" varchar(30) NOT NULL,
	"monto" numeric(10, 2) NOT NULL,
	"estado" varchar(20) NOT NULL,
	"referencia_externa" varchar(255),
	"fecha_pago" timestamp with time zone,
	"fecha_creacion" timestamp with time zone DEFAULT now() NOT NULL,
	"fecha_actualizacion" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "pagos_tipo_check" CHECK ("pagos"."tipo" IN (
        'QR',
        'TARJETA',
        'GIFT_CARD'
      )),
	CONSTRAINT "pagos_estado_check" CHECK ("pagos"."estado" IN (
        'PENDIENTE',
        'PAGADO',
        'FALLIDO'
      )),
	CONSTRAINT "pagos_monto_check" CHECK ("pagos"."monto" > 0),
	CONSTRAINT "pagos_metodo_coherente_check" CHECK ((
        ("pagos"."tipo" = 'GIFT_CARD' AND "pagos"."gift_card_id" IS NOT NULL AND "pagos"."metodo_pago_id" IS NULL)
        OR
        ("pagos"."tipo" IN ('QR', 'TARJETA') AND "pagos"."gift_card_id" IS NULL)
      ))
);
--> statement-breakpoint
CREATE TABLE "pedido_producto" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pedido_id" uuid NOT NULL,
	"producto_id" uuid NOT NULL,
	"promocion_id" uuid,
	"nombre_producto" varchar(150) NOT NULL,
	"precio_unitario" numeric(10, 2) NOT NULL,
	"cantidad" integer NOT NULL,
	"descuento" numeric(10, 2) DEFAULT '0' NOT NULL,
	"subtotal" numeric(10, 2) NOT NULL,
	CONSTRAINT "pedido_producto_precio_check" CHECK ("pedido_producto"."precio_unitario" >= 0),
	CONSTRAINT "pedido_producto_cantidad_check" CHECK ("pedido_producto"."cantidad" > 0),
	CONSTRAINT "pedido_producto_descuento_check" CHECK ("pedido_producto"."descuento" >= 0),
	CONSTRAINT "pedido_producto_subtotal_check" CHECK ("pedido_producto"."subtotal" >= 0)
);
--> statement-breakpoint
CREATE TABLE "pedidos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"usuario_id" uuid NOT NULL,
	"estado" varchar(30) NOT NULL,
	"subtotal" numeric(10, 2) NOT NULL,
	"descuento" numeric(10, 2) DEFAULT '0' NOT NULL,
	"total" numeric(10, 2) NOT NULL,
	"total_gift_card" numeric(10, 2) DEFAULT '0' NOT NULL,
	"total_pagado" numeric(10, 2) DEFAULT '0' NOT NULL,
	"fecha_creacion" timestamp with time zone DEFAULT now() NOT NULL,
	"fecha_actualizacion" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "pedidos_estado_check" CHECK ("pedidos"."estado" IN (
        'PENDIENTE',
        'PAGADO',
        'PROCESANDO',
        'COMPLETADO',
        'CANCELADO'
      )),
	CONSTRAINT "pedidos_subtotal_check" CHECK ("pedidos"."subtotal" >= 0),
	CONSTRAINT "pedidos_descuento_check" CHECK ("pedidos"."descuento" >= 0),
	CONSTRAINT "pedidos_total_check" CHECK ("pedidos"."total" >= 0),
	CONSTRAINT "pedidos_gift_card_check" CHECK ("pedidos"."total_gift_card" >= 0),
	CONSTRAINT "pedidos_total_pagado_check" CHECK ("pedidos"."total_pagado" >= 0)
);
--> statement-breakpoint
CREATE TABLE "productos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"categoria_id" uuid NOT NULL,
	"marca_id" uuid,
	"sku" varchar(50) NOT NULL,
	"nombre" varchar(200) NOT NULL,
	"slug" varchar(220) NOT NULL,
	"descripcion_corta" varchar(300),
	"descripcion" text,
	"material" varchar(100),
	"dimensiones" varchar(100),
	"precio" numeric(10, 2) NOT NULL,
	"imagen_principal" varchar(500) NOT NULL,
	"destacado" boolean DEFAULT false NOT NULL,
	"activo" boolean DEFAULT true NOT NULL,
	"fecha_creacion" timestamp with time zone DEFAULT now() NOT NULL,
	"fecha_actualizacion" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "productos_sku_unique" UNIQUE("sku"),
	CONSTRAINT "productos_slug_unique" UNIQUE("slug"),
	CONSTRAINT "productos_precio_check" CHECK ("productos"."precio" >= 0)
);
--> statement-breakpoint
CREATE TABLE "productos_inventario" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"producto_id" uuid NOT NULL,
	"stock_actual" integer DEFAULT 0 NOT NULL,
	"stock_minimo" integer DEFAULT 0 NOT NULL,
	"fecha_actualizacion" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "productos_inventario_producto_id_unique" UNIQUE("producto_id"),
	CONSTRAINT "inventario_stock_actual_check" CHECK ("productos_inventario"."stock_actual" >= 0),
	CONSTRAINT "inventario_stock_minimo_check" CHECK ("productos_inventario"."stock_minimo" >= 0)
);
--> statement-breakpoint
CREATE TABLE "productos_media" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"producto_id" uuid NOT NULL,
	"url" varchar(500) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "promociones" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nombre" varchar(150) NOT NULL,
	"descripcion" text,
	"tipo" varchar(30) NOT NULL,
	"valor" numeric(10, 2),
	"cantidad_requerida" integer,
	"cantidad_cobrada" integer,
	"precio_paquete" numeric(10, 2),
	"compra_minima" numeric(10, 2),
	"descuento_maximo" numeric(10, 2),
	"fecha_inicio" timestamp with time zone NOT NULL,
	"fecha_fin" timestamp with time zone NOT NULL,
	"activo" boolean DEFAULT true NOT NULL,
	"fecha_creacion" timestamp with time zone DEFAULT now() NOT NULL,
	"fecha_actualizacion" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "promociones_tipo_check" CHECK ("promociones"."tipo" IN (
        'PORCENTAJE',
        'MONTO_FIJO',
        'COMPRA_POR_CANTIDAD',
        'PRECIO_POR_CANTIDAD'
      )),
	CONSTRAINT "promociones_valor_check" CHECK ("promociones"."valor" IS NULL OR "promociones"."valor" >= 0),
	CONSTRAINT "promociones_cantidad_requerida_check" CHECK ("promociones"."cantidad_requerida" IS NULL OR "promociones"."cantidad_requerida" > 0),
	CONSTRAINT "promociones_cantidad_cobrada_check" CHECK ("promociones"."cantidad_cobrada" IS NULL OR "promociones"."cantidad_cobrada" > 0),
	CONSTRAINT "promociones_precio_paquete_check" CHECK ("promociones"."precio_paquete" IS NULL OR "promociones"."precio_paquete" >= 0),
	CONSTRAINT "promociones_compra_minima_check" CHECK ("promociones"."compra_minima" IS NULL OR "promociones"."compra_minima" >= 0),
	CONSTRAINT "promociones_descuento_maximo_check" CHECK ("promociones"."descuento_maximo" IS NULL OR "promociones"."descuento_maximo" >= 0),
	CONSTRAINT "promociones_cantidad_coherente_check" CHECK ("promociones"."cantidad_cobrada" IS NULL OR "promociones"."cantidad_requerida" IS NULL OR "promociones"."cantidad_cobrada" <= "promociones"."cantidad_requerida"),
	CONSTRAINT "promociones_fechas_check" CHECK ("promociones"."fecha_fin" >= "promociones"."fecha_inicio")
);
--> statement-breakpoint
CREATE TABLE "promociones_productos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"promocion_id" uuid NOT NULL,
	"producto_id" uuid NOT NULL,
	CONSTRAINT "promociones_productos_promocion_id_producto_id_unique" UNIQUE("promocion_id","producto_id")
);
--> statement-breakpoint
CREATE TABLE "usuarios" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"ci" varchar(20) NOT NULL,
	"nombre" varchar(100) NOT NULL,
	"apellido" varchar(100) NOT NULL,
	"correo" varchar(255) NOT NULL,
	"contrasena_hash" varchar(255) NOT NULL,
	"telefono" varchar(20),
	"rol" varchar(20) NOT NULL,
	"activo" boolean DEFAULT true NOT NULL,
	"fecha_creacion" timestamp with time zone DEFAULT now() NOT NULL,
	"fecha_actualizacion" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "usuarios_ci_unique" UNIQUE("ci"),
	CONSTRAINT "usuarios_correo_unique" UNIQUE("correo"),
	CONSTRAINT "usuarios_rol_check" CHECK ("usuarios"."rol" IN ('CLIENTE', 'ADMINISTRADOR'))
);
--> statement-breakpoint
ALTER TABLE "carrito_producto" ADD CONSTRAINT "carrito_producto_carrito_id_carritos_id_fk" FOREIGN KEY ("carrito_id") REFERENCES "public"."carritos"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "carrito_producto" ADD CONSTRAINT "carrito_producto_producto_id_productos_id_fk" FOREIGN KEY ("producto_id") REFERENCES "public"."productos"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "carritos" ADD CONSTRAINT "carritos_usuario_id_usuarios_id_fk" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "codigos_promocionales" ADD CONSTRAINT "codigos_promocionales_promocion_id_promociones_id_fk" FOREIGN KEY ("promocion_id") REFERENCES "public"."promociones"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "gift_card_movimientos" ADD CONSTRAINT "gift_card_movimientos_gift_card_id_gift_cards_id_fk" FOREIGN KEY ("gift_card_id") REFERENCES "public"."gift_cards"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "gift_card_movimientos" ADD CONSTRAINT "gift_card_movimientos_pedido_id_pedidos_id_fk" FOREIGN KEY ("pedido_id") REFERENCES "public"."pedidos"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "gift_cards" ADD CONSTRAINT "gift_cards_comprador_id_usuarios_id_fk" FOREIGN KEY ("comprador_id") REFERENCES "public"."usuarios"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "gift_cards" ADD CONSTRAINT "gift_cards_destinatario_id_usuarios_id_fk" FOREIGN KEY ("destinatario_id") REFERENCES "public"."usuarios"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "metodos_pago" ADD CONSTRAINT "metodos_pago_usuario_id_usuarios_id_fk" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "pagos" ADD CONSTRAINT "pagos_pedido_id_pedidos_id_fk" FOREIGN KEY ("pedido_id") REFERENCES "public"."pedidos"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "pagos" ADD CONSTRAINT "pagos_metodo_pago_id_metodos_pago_id_fk" FOREIGN KEY ("metodo_pago_id") REFERENCES "public"."metodos_pago"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "pagos" ADD CONSTRAINT "pagos_gift_card_id_gift_cards_id_fk" FOREIGN KEY ("gift_card_id") REFERENCES "public"."gift_cards"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "pedido_producto" ADD CONSTRAINT "pedido_producto_pedido_id_pedidos_id_fk" FOREIGN KEY ("pedido_id") REFERENCES "public"."pedidos"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "pedido_producto" ADD CONSTRAINT "pedido_producto_producto_id_productos_id_fk" FOREIGN KEY ("producto_id") REFERENCES "public"."productos"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "pedido_producto" ADD CONSTRAINT "pedido_producto_promocion_id_promociones_id_fk" FOREIGN KEY ("promocion_id") REFERENCES "public"."promociones"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_usuario_id_usuarios_id_fk" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "productos" ADD CONSTRAINT "productos_categoria_id_categorias_id_fk" FOREIGN KEY ("categoria_id") REFERENCES "public"."categorias"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "productos" ADD CONSTRAINT "productos_marca_id_marcas_id_fk" FOREIGN KEY ("marca_id") REFERENCES "public"."marcas"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "productos_inventario" ADD CONSTRAINT "productos_inventario_producto_id_productos_id_fk" FOREIGN KEY ("producto_id") REFERENCES "public"."productos"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "productos_media" ADD CONSTRAINT "productos_media_producto_id_productos_id_fk" FOREIGN KEY ("producto_id") REFERENCES "public"."productos"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "promociones_productos" ADD CONSTRAINT "promociones_productos_promocion_id_promociones_id_fk" FOREIGN KEY ("promocion_id") REFERENCES "public"."promociones"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "promociones_productos" ADD CONSTRAINT "promociones_productos_producto_id_productos_id_fk" FOREIGN KEY ("producto_id") REFERENCES "public"."productos"("id") ON DELETE cascade ON UPDATE cascade;