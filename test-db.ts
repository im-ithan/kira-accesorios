import "dotenv/config";

import { sql } from "drizzle-orm";
import { db } from "./src/db";

async function main() {
  const result = await db.execute(sql`SELECT NOW()`);

  console.log("✅ Conexión a PostgreSQL exitosa");
  console.log(result.rows[0]);
}

main()
  .catch((error) => {
    console.error("❌ Error de conexión:");
    console.error(error);
    process.exit(1);
  });