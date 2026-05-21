import { type Request, type Response } from 'express';
import { SupabaseAdapter } from '../adapters/supabase.adapter.js';

const supabaseAdapter = new SupabaseAdapter();

export const registerOnboarding = async (req: Request, res: Response) => {
    console.log("📥 [Controller]: Request received from Frontend.");
    
    try {
        // 1. Extract exact names sent by Frontend
        const { email, fullName, passwordHash, preferences } = req.body;

        // 2. Map to internal English variables
        const name = fullName;
        const password = passwordHash;
        const budget = preferences?.maxBudget; // Nested Object

        // 3. Validation with IFs
        if (!email || !email.includes('@')) {
            return res.status(400).json({ message: "Invalid email." });
        }
        if (!name || name.length < 2) {
            return res.status(400).json({ message: "Name is too short." });
        }
        if (!budget || budget < 0) {
            return res.status(400).json({ message: "Invalid budget." });
        }

        console.log("🛡️ [Controller]: Validation passed. Calling adapter...");

        // 4. Call to Adapter
        // Nota: Como la variable ahora se llama 'preferences' igual que en el JSON,
        // no necesitas hacer 'preferencias: preferences', basta con poner 'preferences'
        await supabaseAdapter.saveTenant({ 
            email, 
            name, 
            budget, 
            preferences 
        });

        // 5. Frontend Response
        res.status(201).json({ 
            success: true, 
            message: "Successful registration in Supabase" 
        });

    } catch (error: any) {
        console.error("❌ [Controller]: Fatal error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, passwordHash } = req.body;
        console.log("📥 [Login]: Access successful for:", email);
        
        // Simulating success
        res.status(200).json({ jwt: 'token_simulado_roomiesmart_123' });
    } catch (error) {
        res.status(401).json({ message: "Invalid credentials" });
    }
};