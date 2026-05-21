import express, { type Application } from 'express';
import cors from 'cors';
import { registerOnboarding } from '../modules/roomies/infrastructure/http/roomie.controller.js';
import { loginController } from '../modules/roomies/infrastructure/http/roomie.controller.js';

// ... dentro de createServer ...

export const createServer = (): Application => {
    const app = express();
    
    // Middlewares
    app.use(cors());
    app.use(express.json());

    // Routes
    app.post('/api/v1/auth/register', registerOnboarding);
    app.post('/api/v1/auth/login', loginController);

    app.get('/api/health', (req, res) => {
        res.status(200).json({ status: 'ok', message: 'Backend funcionando' });
    });

    return app;
};