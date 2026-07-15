import { createClient } from "@supabase/supabase-js";
import type { Database } from "../../types/database.types.js";

import "dotenv/config";

if( !process.env.SUPABASE_URL ){
    throw new Error("Falta SUPABASE_URL");
}

export const supabase = createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY_SERVICE_ROLE!
)