// src/index.ts
import { createServer } from './core/server.js'; 

const PORT = 3000;
const app = createServer();

app.listen(PORT, () => {
    console.log(`[Servidor]: 🚀 RoomieSmart Backend is running at http://localhost:${PORT}`);
});