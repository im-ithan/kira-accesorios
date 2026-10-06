CREATE TABLE "canjes_puntos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"usuario_id" uuid NOT NULL,
	"recompensa_id" uuid NOT NULL,
	"puntos_utilizados" integer NOT NULL,
	"codigo_promocional_id" uuid,
	"fecha_canje" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "canjes_puntos_valor_check" CHECK ("canjes_puntos"."puntos_utilizados" > 0)
);
--> statement-breakpoint
CREATE TABLE "movimientos_puntos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"usuario_id" uuid NOT NULL,
	"tipo" varchar(30) NOT NULL,
	"puntos" integer NOT NULL,
	"pedido_id" uuid,
	"descripcion" varchar(255),
	"fecha_creacion" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "movimientos_puntos_tipo_check" CHECK ("movimientos_puntos"."tipo" IN (
        'GANADO',
        'CANJEADO',
        'AJUSTE',
        'EXPIRADO'
      )),
	CONSTRAINT "movimientos_puntos_valor_check" CHECK ("movimientos_puntos"."puntos" > 0)
);
--> statement-breakpoint
CREATE TABLE "puntos_usuario" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"usuario_id" uuid NOT NULL,
	"saldo" integer DEFAULT 0 NOT NULL,
	"fecha_creacion" timestamp with time zone DEFAULT now() NOT NULL,
	"fecha_actualizacion" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "puntos_usuario_usuario_id_unique" UNIQUE("usuario_id"),
	CONSTRAINT "puntos_usuario_saldo_check" CHECK ("puntos_usuario"."saldo" >= 0)
);
--> statement-breakpoint
CREATE TABLE "recompensas_puntos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nombre" varchar(150) NOT NULL,
	"descripcion" text,
	"puntos_requeridos" integer NOT NULL,
	"promocion_id" uuid,
	"activo" boolean DEFAULT true NOT NULL,
	"fecha_creacion" timestamp with time zone DEFAULT now() NOT NULL,
	"fecha_actualizacion" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "recompensas_puntos_requeridos_check" CHECK ("recompensas_puntos"."puntos_requeridos" > 0)
);
--> statement-breakpoint
ALTER TABLE "canjes_puntos" ADD CONSTRAINT "canjes_puntos_usuario_id_usuarios_id_fk" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "canjes_puntos" ADD CONSTRAINT "canjes_puntos_recompensa_id_recompensas_puntos_id_fk" FOREIGN KEY ("recompensa_id") REFERENCES "public"."recompensas_puntos"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "canjes_puntos" ADD CONSTRAINT "canjes_puntos_codigo_promocional_id_codigos_promocionales_id_fk" FOREIGN KEY ("codigo_promocional_id") REFERENCES "public"."codigos_promocionales"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "movimientos_puntos" ADD CONSTRAINT "movimientos_puntos_usuario_id_usuarios_id_fk" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "movimientos_puntos" ADD CONSTRAINT "movimientos_puntos_pedido_id_pedidos_id_fk" FOREIGN KEY ("pedido_id") REFERENCES "public"."pedidos"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "puntos_usuario" ADD CONSTRAINT "puntos_usuario_usuario_id_usuarios_id_fk" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "recompensas_puntos" ADD CONSTRAINT "recompensas_puntos_promocion_id_promociones_id_fk" FOREIGN KEY ("promocion_id") REFERENCES "public"."promociones"("id") ON DELETE set null ON UPDATE cascade;