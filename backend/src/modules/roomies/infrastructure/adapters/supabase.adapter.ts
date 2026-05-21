import { supabaseClient } from "../../../../core/supabase.js";

export class SupabaseAdapter {
    async saveTenant(data: any) {
        console.log("🛠️ [Adapter]: Saving on Supabase...");
        
        if (!supabaseClient) {
            throw new Error("Supabase is not configured.");
        }

        // Tenants Table
        const { data: dbData, error } = await supabaseClient
            .from('tenants')
            .insert([
                { 
                    email: data.email,
                    name: data.name,
                    budget: data.budget,
                    preferences: data.preferences
                }
            ]);

        if (error) {
            console.error("❌ [Adapter]: Supabase error:", error.message);
            throw error;
        }

        console.log("✅ [Adapter]: Data successfully saved in Supabase.");
        return dbData;
    }
}