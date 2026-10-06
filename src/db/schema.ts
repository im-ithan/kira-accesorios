import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  integer,
  decimal,
  timestamp,
  unique,
  check,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";

// ============================================================
// USUARIOS
// ============================================================

export const usuarios = pgTable(
  "usuarios",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    ci: varchar("ci", { length: 20 })
      .notNull()
      .unique(),

    nombre: varchar("nombre", { length: 100 })
      .notNull(),

    apellido: varchar("apellido", { length: 100 })
      .notNull(),

    correo: varchar("correo", { length: 255 })
      .notNull()
      .unique(),

    contrasenaHash: varchar("contrasena_hash", {
      length: 255,
    }).notNull(),

    telefono: varchar("telefono", {
      length: 20,
    }),

    rol: varchar("rol", {
      length: 20,
    }).notNull(),

    activo: boolean("activo")
      .notNull()
      .default(true),

    fechaCreacion: timestamp("fecha_creacion", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

    fechaActualizacion: timestamp("fecha_actualizacion", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    rolValido: check(
      "usuarios_rol_check",
      sql`${table.rol} IN ('CLIENTE', 'ADMINISTRADOR')`,
    ),
  }),
);

// ============================================================
// CATEGORIAS
// ============================================================

export const categorias = pgTable("categorias", {
  id: uuid("id").defaultRandom().primaryKey(),

  nombre: varchar("nombre", {
    length: 100,
  })
    .notNull()
    .unique(),

  descripcion: text("descripcion"),

  imagen: varchar("imagen", {
    length: 500,
  }),

  activo: boolean("activo")
    .notNull()
    .default(true),

  fechaCreacion: timestamp("fecha_creacion", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),

  fechaActualizacion: timestamp("fecha_actualizacion", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

// ============================================================
// MARCAS
// ============================================================

export const marcas = pgTable("marcas", {
  id: uuid("id").defaultRandom().primaryKey(),

  nombre: varchar("nombre", {
    length: 100,
  })
    .notNull()
    .unique(),

  logo: varchar("logo", {
    length: 500,
  }),

  activo: boolean("activo")
    .notNull()
    .default(true),

  fechaCreacion: timestamp("fecha_creacion", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),

  fechaActualizacion: timestamp("fecha_actualizacion", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

// ============================================================
// PRODUCTOS
// ============================================================

export const productos = pgTable(
  "productos",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    categoriaId: uuid("categoria_id")
      .notNull()
      .references(() => categorias.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),

    marcaId: uuid("marca_id").references(() => marcas.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),

    sku: varchar("sku", {
      length: 50,
    })
      .notNull()
      .unique(),

    nombre: varchar("nombre", {
      length: 200,
    }).notNull(),

    slug: varchar("slug", {
      length: 220,
    })
      .notNull()
      .unique(),

    descripcionCorta: varchar("descripcion_corta", {
      length: 300,
    }),

    descripcion: text("descripcion"),

    material: varchar("material", {
      length: 100,
    }),

    dimensiones: varchar("dimensiones", {
      length: 100,
    }),

    precio: decimal("precio", {
      precision: 10,
      scale: 2,
    }).notNull(),

    imagenPrincipal: varchar("imagen_principal", {
      length: 500,
    }).notNull(),

    destacado: boolean("destacado")
      .notNull()
      .default(false),

    activo: boolean("activo")
      .notNull()
      .default(true),

    fechaCreacion: timestamp("fecha_creacion", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

    fechaActualizacion: timestamp("fecha_actualizacion", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    precioValido: check(
      "productos_precio_check",
      sql`${table.precio} >= 0`,
    ),
  }),
);

// ============================================================
// PRODUCTOS MEDIA
// ============================================================

export const productosMedia = pgTable(
  "productos_media",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    productoId: uuid("producto_id")
      .notNull()
      .references(() => productos.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

    url: varchar("url", {
      length: 500,
    }).notNull(),
  },
);

// ============================================================
// PRODUCTOS INVENTARIO
// ============================================================

export const productosInventario = pgTable(
  "productos_inventario",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    productoId: uuid("producto_id")
      .notNull()
      .unique()
      .references(() => productos.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

    stockActual: integer("stock_actual")
      .notNull()
      .default(0),

    stockMinimo: integer("stock_minimo")
      .notNull()
      .default(0),

    fechaActualizacion: timestamp("fecha_actualizacion", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    stockActualValido: check(
      "inventario_stock_actual_check",
      sql`${table.stockActual} >= 0`,
    ),

    stockMinimoValido: check(
      "inventario_stock_minimo_check",
      sql`${table.stockMinimo} >= 0`,
    ),
  }),
);

// ============================================================
// PROMOCIONES
// ============================================================

export const promociones = pgTable(
  "promociones",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    nombre: varchar("nombre", {
      length: 150,
    }).notNull(),

    descripcion: text("descripcion"),

    tipo: varchar("tipo", {
      length: 30,
    }).notNull(),

    valor: decimal("valor", {
      precision: 10,
      scale: 2,
    }),

    cantidadRequerida: integer("cantidad_requerida"),

    cantidadCobrada: integer("cantidad_cobrada"),

    precioPaquete: decimal("precio_paquete", {
      precision: 10,
      scale: 2,
    }),

    compraMinima: decimal("compra_minima", {
      precision: 10,
      scale: 2,
    }),

    descuentoMaximo: decimal("descuento_maximo", {
      precision: 10,
      scale: 2,
    }),

    fechaInicio: timestamp("fecha_inicio", {
      withTimezone: true,
    }).notNull(),

    fechaFin: timestamp("fecha_fin", {
      withTimezone: true,
    }).notNull(),

    activo: boolean("activo")
      .notNull()
      .default(true),

    fechaCreacion: timestamp("fecha_creacion", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

    fechaActualizacion: timestamp("fecha_actualizacion", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    tipoValido: check(
      "promociones_tipo_check",
      sql`${table.tipo} IN (
        'PORCENTAJE',
        'MONTO_FIJO',
        'COMPRA_POR_CANTIDAD',
        'PRECIO_POR_CANTIDAD'
      )`,
    ),

    valorValido: check(
      "promociones_valor_check",
      sql`${table.valor} IS NULL OR ${table.valor} >= 0`,
    ),

    cantidadRequeridaValida: check(
      "promociones_cantidad_requerida_check",
      sql`${table.cantidadRequerida} IS NULL OR ${table.cantidadRequerida} > 0`,
    ),

    cantidadCobradaValida: check(
      "promociones_cantidad_cobrada_check",
      sql`${table.cantidadCobrada} IS NULL OR ${table.cantidadCobrada} > 0`,
    ),

    precioPaqueteValido: check(
      "promociones_precio_paquete_check",
      sql`${table.precioPaquete} IS NULL OR ${table.precioPaquete} >= 0`,
    ),

    compraMinimaValida: check(
      "promociones_compra_minima_check",
      sql`${table.compraMinima} IS NULL OR ${table.compraMinima} >= 0`,
    ),

    descuentoMaximoValido: check(
      "promociones_descuento_maximo_check",
      sql`${table.descuentoMaximo} IS NULL OR ${table.descuentoMaximo} >= 0`,
    ),

    cantidadCoherente: check(
      "promociones_cantidad_coherente_check",
      sql`${table.cantidadCobrada} IS NULL OR ${table.cantidadRequerida} IS NULL OR ${table.cantidadCobrada} <= ${table.cantidadRequerida}`,
    ),

    fechasValidas: check(
      "promociones_fechas_check",
      sql`${table.fechaFin} >= ${table.fechaInicio}`,
    ),
  }),
);

// ============================================================
// PROMOCIONES PRODUCTOS
// ============================================================

export const promocionesProductos = pgTable(
  "promociones_productos",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    promocionId: uuid("promocion_id")
      .notNull()
      .references(() => promociones.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

    productoId: uuid("producto_id")
      .notNull()
      .references(() => productos.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => ({
    promocionProductoUnico: unique().on(
      table.promocionId,
      table.productoId,
    ),
  }),
);

// ============================================================
// CODIGOS PROMOCIONALES
// ============================================================

export const codigosPromocionales = pgTable(
  "codigos_promocionales",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    promocionId: uuid("promocion_id")
      .notNull()
      .references(() => promociones.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

    codigo: varchar("codigo", {
      length: 50,
    })
      .notNull()
      .unique(),

    limiteUsos: integer("limite_usos"),

    usosRealizados: integer("usos_realizados")
      .notNull()
      .default(0),

    fechaInicio: timestamp("fecha_inicio", {
      withTimezone: true,
    }).notNull(),

    fechaFin: timestamp("fecha_fin", {
      withTimezone: true,
    }),

    activo: boolean("activo")
      .notNull()
      .default(true),

    fechaCreacion: timestamp("fecha_creacion", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

    fechaActualizacion: timestamp("fecha_actualizacion", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    limiteUsosValido: check(
      "codigos_limite_usos_check",
      sql`${table.limiteUsos} IS NULL OR ${table.limiteUsos} > 0`,
    ),

    usosRealizadosValidos: check(
      "codigos_usos_realizados_check",
      sql`${table.usosRealizados} >= 0`,
    ),

    usosNoSuperanLimite: check(
      "codigos_usos_limite_check",
      sql`${table.limiteUsos} IS NULL OR ${table.usosRealizados} <= ${table.limiteUsos}`,
    ),

    fechasValidas: check(
      "codigos_fechas_check",
      sql`${table.fechaFin} IS NULL OR ${table.fechaFin} >= ${table.fechaInicio}`,
    ),
  }),
);

// ============================================================
// METODOS DE PAGO
// ============================================================

export const metodosPago = pgTable("metodos_pago", {
  id: uuid("id").defaultRandom().primaryKey(),

  usuarioId: uuid("usuario_id")
    .notNull()
    .references(() => usuarios.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),

  tipo: varchar("tipo", {
    length: 30,
  }).notNull(),

  proveedor: varchar("proveedor", {
    length: 50,
  }),

  referenciaExterna: varchar("referencia_externa", {
    length: 255,
  }),

  ultimosDigitos: varchar("ultimos_digitos", {
    length: 4,
  }),

  activo: boolean("activo")
    .notNull()
    .default(true),

  fechaCreacion: timestamp("fecha_creacion", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),

  fechaActualizacion: timestamp("fecha_actualizacion", {
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

// ============================================================
// CARRITOS
// ============================================================

export const carritos = pgTable(
  "carritos",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    usuarioId: uuid("usuario_id")
      .notNull()
      .references(() => usuarios.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

    estado: varchar("estado", {
      length: 20,
    }).notNull(),

    fechaCreacion: timestamp("fecha_creacion", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

    fechaActualizacion: timestamp("fecha_actualizacion", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    estadoValido: check(
      "carritos_estado_check",
      sql`${table.estado} IN ('ACTIVO', 'COMPRADO', 'ABANDONADO')`,
    ),
  }),
);

// ============================================================
// CARRITO PRODUCTO
// ============================================================

export const carritoProducto = pgTable(
  "carrito_producto",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    carritoId: uuid("carrito_id")
      .notNull()
      .references(() => carritos.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

    productoId: uuid("producto_id")
      .notNull()
      .references(() => productos.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),

    cantidad: integer("cantidad")
      .notNull()
      .default(1),
  },
  (table) => ({
    carritoProductoUnico: unique().on(
      table.carritoId,
      table.productoId,
    ),

    cantidadValida: check(
      "carrito_producto_cantidad_check",
      sql`${table.cantidad} > 0`,
    ),
  }),
);

// ============================================================
// PEDIDOS
// ============================================================

export const pedidos = pgTable(
  "pedidos",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    usuarioId: uuid("usuario_id")
      .notNull()
      .references(() => usuarios.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),

    estado: varchar("estado", {
      length: 30,
    }).notNull(),

    subtotal: decimal("subtotal", {
      precision: 10,
      scale: 2,
    }).notNull(),

    descuento: decimal("descuento", {
      precision: 10,
      scale: 2,
    })
      .notNull()
      .default("0"),

    total: decimal("total", {
      precision: 10,
      scale: 2,
    }).notNull(),

    totalGiftCard: decimal("total_gift_card", {
      precision: 10,
      scale: 2,
    })
      .notNull()
      .default("0"),

    totalPagado: decimal("total_pagado", {
      precision: 10,
      scale: 2,
    })
      .notNull()
      .default("0"),

    fechaCreacion: timestamp("fecha_creacion", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

    fechaActualizacion: timestamp("fecha_actualizacion", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    estadoValido: check(
      "pedidos_estado_check",
      sql`${table.estado} IN (
        'PENDIENTE',
        'PAGADO',
        'PROCESANDO',
        'COMPLETADO',
        'CANCELADO'
      )`,
    ),

    subtotalValido: check(
      "pedidos_subtotal_check",
      sql`${table.subtotal} >= 0`,
    ),

    descuentoValido: check(
      "pedidos_descuento_check",
      sql`${table.descuento} >= 0`,
    ),

    totalValido: check(
      "pedidos_total_check",
      sql`${table.total} >= 0`,
    ),

    giftCardValido: check(
      "pedidos_gift_card_check",
      sql`${table.totalGiftCard} >= 0`,
    ),

    totalPagadoValido: check(
      "pedidos_total_pagado_check",
      sql`${table.totalPagado} >= 0`,
    ),
  }),
);

// ============================================================
// GIFT CARDS
// ============================================================

export const giftCards = pgTable(
  "gift_cards",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    codigo: varchar("codigo", {
      length: 50,
    })
      .notNull()
      .unique(),

    valorInicial: decimal("valor_inicial", {
      precision: 10,
      scale: 2,
    }).notNull(),

    saldoActual: decimal("saldo_actual", {
      precision: 10,
      scale: 2,
    }).notNull(),

    compradorId: uuid("comprador_id")
      .notNull()
      .references(() => usuarios.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),

    destinatarioId: uuid("destinatario_id").references(
      () => usuarios.id,
      {
        onDelete: "set null",
        onUpdate: "cascade",
      },
    ),

    estado: varchar("estado", {
      length: 20,
    }).notNull(),

    fechaCreacion: timestamp("fecha_creacion", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

    fechaExpiracion: timestamp("fecha_expiracion", {
      withTimezone: true,
    }),

    fechaActualizacion: timestamp("fecha_actualizacion", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    estadoValido: check(
      "gift_cards_estado_check",
      sql`${table.estado} IN (
        'PENDIENTE',
        'ACTIVA',
        'AGOTADA',
        'EXPIRADA'
      )`,
    ),

    valorInicialValido: check(
      "gift_cards_valor_inicial_check",
      sql`${table.valorInicial} > 0`,
    ),

    saldoValido: check(
      "gift_cards_saldo_check",
      sql`${table.saldoActual} >= 0`,
    ),

    saldoNoSuperaValorInicial: check(
      "gift_cards_saldo_maximo_check",
      sql`${table.saldoActual} <= ${table.valorInicial}`,
    ),
  }),
);

// ============================================================
// GIFT CARD MOVIMIENTOS
// ============================================================

export const giftCardMovimientos = pgTable(
  "gift_card_movimientos",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    giftCardId: uuid("gift_card_id")
      .notNull()
      .references(() => giftCards.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),

    tipo: varchar("tipo", {
      length: 30,
    }).notNull(),

    monto: decimal("monto", {
      precision: 10,
      scale: 2,
    }).notNull(),

    pedidoId: uuid("pedido_id").references(
      () => pedidos.id,
      {
        onDelete: "set null",
        onUpdate: "cascade",
      },
    ),

    fecha: timestamp("fecha", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    tipoValido: check(
      "gift_card_movimientos_tipo_check",
      sql`${table.tipo} IN ('COMPRA', 'USO', 'AJUSTE')`,
    ),

    montoValido: check(
      "gift_card_movimientos_monto_check",
      sql`${table.monto} > 0`,
    ),
  }),
);

// ============================================================
// PEDIDO PRODUCTO
// ============================================================

export const pedidoProducto = pgTable(
  "pedido_producto",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    pedidoId: uuid("pedido_id")
      .notNull()
      .references(() => pedidos.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

    productoId: uuid("producto_id")
      .notNull()
      .references(() => productos.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),

    promocionId: uuid("promocion_id").references(
      () => promociones.id,
      {
        onDelete: "set null",
        onUpdate: "cascade",
      },
    ),

    nombreProducto: varchar("nombre_producto", {
      length: 150,
    }).notNull(),

    precioUnitario: decimal("precio_unitario", {
      precision: 10,
      scale: 2,
    }).notNull(),

    cantidad: integer("cantidad")
      .notNull(),

    descuento: decimal("descuento", {
      precision: 10,
      scale: 2,
    })
      .notNull()
      .default("0"),

    subtotal: decimal("subtotal", {
      precision: 10,
      scale: 2,
    }).notNull(),
  },
  (table) => ({
    precioValido: check(
      "pedido_producto_precio_check",
      sql`${table.precioUnitario} >= 0`,
    ),

    cantidadValida: check(
      "pedido_producto_cantidad_check",
      sql`${table.cantidad} > 0`,
    ),

    descuentoValido: check(
      "pedido_producto_descuento_check",
      sql`${table.descuento} >= 0`,
    ),

    subtotalValido: check(
      "pedido_producto_subtotal_check",
      sql`${table.subtotal} >= 0`,
    ),
  }),
);

// ============================================================
// PAGOS
// ============================================================

export const pagos = pgTable(
  "pagos",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    pedidoId: uuid("pedido_id")
      .notNull()
      .references(() => pedidos.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),

    metodoPagoId: uuid("metodo_pago_id").references(
      () => metodosPago.id,
      {
        onDelete: "set null",
        onUpdate: "cascade",
      },
    ),

    giftCardId: uuid("gift_card_id").references(
      () => giftCards.id,
      {
        onDelete: "set null",
        onUpdate: "cascade",
      },
    ),

    tipo: varchar("tipo", {
      length: 30,
    }).notNull(),

    monto: decimal("monto", {
      precision: 10,
      scale: 2,
    }).notNull(),

    estado: varchar("estado", {
      length: 20,
    }).notNull(),

    referenciaExterna: varchar("referencia_externa", {
      length: 255,
    }),

    fechaPago: timestamp("fecha_pago", {
      withTimezone: true,
    }),

    fechaCreacion: timestamp("fecha_creacion", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

    fechaActualizacion: timestamp("fecha_actualizacion", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    tipoValido: check(
      "pagos_tipo_check",
      sql`${table.tipo} IN (
        'QR',
        'TARJETA',
        'GIFT_CARD'
      )`,
    ),

    estadoValido: check(
      "pagos_estado_check",
      sql`${table.estado} IN (
        'PENDIENTE',
        'PAGADO',
        'FALLIDO'
      )`,
    ),

    montoValido: check(
      "pagos_monto_check",
      sql`${table.monto} > 0`,
    ),

    metodoCoherente: check(
  "pagos_metodo_coherente_check",
  sql`(
    (
      ${table.tipo} = 'GIFT_CARD'
      AND ${table.giftCardId} IS NOT NULL
      AND ${table.metodoPagoId} IS NULL
    )
    OR
    (
      ${table.tipo} IN ('QR', 'TARJETA')
      AND ${table.metodoPagoId} IS NOT NULL
      AND ${table.giftCardId} IS NULL
    )
  )`,
),
  }),
);
// ============================================================
// PUNTOS DE USUARIO
// ============================================================

export const puntosUsuario = pgTable(
  "puntos_usuario",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    usuarioId: uuid("usuario_id")
      .notNull()
      .unique()
      .references(() => usuarios.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),

    saldo: integer("saldo")
      .notNull()
      .default(0),

    fechaCreacion: timestamp("fecha_creacion", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

    fechaActualizacion: timestamp("fecha_actualizacion", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    saldoValido: check(
      "puntos_usuario_saldo_check",
      sql`${table.saldo} >= 0`,
    ),
  }),
);

// ============================================================
// MOVIMIENTOS DE PUNTOS
// ============================================================

export const movimientosPuntos = pgTable(
  "movimientos_puntos",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    usuarioId: uuid("usuario_id")
      .notNull()
      .references(() => usuarios.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),

    tipo: varchar("tipo", {
      length: 30,
    }).notNull(),

    puntos: integer("puntos").notNull(),

    pedidoId: uuid("pedido_id").references(
      () => pedidos.id,
      {
        onDelete: "set null",
        onUpdate: "cascade",
      },
    ),

    descripcion: varchar("descripcion", {
      length: 255,
    }),

    fechaCreacion: timestamp("fecha_creacion", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    tipoValido: check(
      "movimientos_puntos_tipo_check",
      sql`${table.tipo} IN (
        'GANADO',
        'CANJEADO',
        'AJUSTE',
        'EXPIRADO'
      )`,
    ),

    puntosValidos: check(
      "movimientos_puntos_valor_check",
      sql`${table.puntos} > 0`,
    ),
  }),
);

// ============================================================
// RECOMPENSAS DE PUNTOS
// ============================================================

export const recompensasPuntos = pgTable(
  "recompensas_puntos",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    nombre: varchar("nombre", {
      length: 150,
    }).notNull(),

    descripcion: text("descripcion"),

    puntosRequeridos: integer("puntos_requeridos")
      .notNull(),

    promocionId: uuid("promocion_id").references(
      () => promociones.id,
      {
        onDelete: "set null",
        onUpdate: "cascade",
      },
    ),

    activo: boolean("activo")
      .notNull()
      .default(true),

    fechaCreacion: timestamp("fecha_creacion", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

    fechaActualizacion: timestamp("fecha_actualizacion", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    puntosRequeridosValidos: check(
      "recompensas_puntos_requeridos_check",
      sql`${table.puntosRequeridos} > 0`,
    ),
  }),
);

// ============================================================
// CANJES DE PUNTOS
// ============================================================

export const canjesPuntos = pgTable(
  "canjes_puntos",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    usuarioId: uuid("usuario_id")
      .notNull()
      .references(() => usuarios.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),

    recompensaId: uuid("recompensa_id")
      .notNull()
      .references(() => recompensasPuntos.id, {
        onDelete: "restrict",
        onUpdate: "cascade",
      }),

    puntosUtilizados: integer("puntos_utilizados")
      .notNull(),

    codigoPromocionalId: uuid(
      "codigo_promocional_id",
    ).references(() => codigosPromocionales.id, {
      onDelete: "set null",
      onUpdate: "cascade",
    }),

    fechaCanje: timestamp("fecha_canje", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    puntosUtilizadosValidos: check(
      "canjes_puntos_valor_check",
      sql`${table.puntosUtilizados} > 0`,
    ),
  }),
);