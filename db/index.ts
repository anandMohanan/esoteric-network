import { drizzle } from "drizzle-orm/xata-http";
import { XataClient } from "@/xata";


const xata = new XataClient();
export const db = drizzle(xata);
