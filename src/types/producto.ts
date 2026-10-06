export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: "Tecnología" | "Escolar" | "Viaje" | "Accesorios";
  imagen: string;
  nuevo: boolean;
  disponible: boolean;
}