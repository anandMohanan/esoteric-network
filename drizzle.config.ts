import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./db/schema/*",
    dialect: "postgresql",
    dbCredentials:{
url: process.env.XATA_URL!,
    }
});
