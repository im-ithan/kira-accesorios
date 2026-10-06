ALTER TABLE "pagos" DROP CONSTRAINT "pagos_metodo_coherente_check";--> statement-breakpoint
ALTER TABLE "pagos" ADD CONSTRAINT "pagos_metodo_coherente_check" CHECK ((
    (
      "pagos"."tipo" = 'GIFT_CARD'
      AND "pagos"."gift_card_id" IS NOT NULL
      AND "pagos"."metodo_pago_id" IS NULL
    )
    OR
    (
      "pagos"."tipo" IN ('QR', 'TARJETA')
      AND "pagos"."metodo_pago_id" IS NOT NULL
      AND "pagos"."gift_card_id" IS NULL
    )
  ));