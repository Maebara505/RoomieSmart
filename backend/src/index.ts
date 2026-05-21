// src/index.ts
import { createServer } from './core/server.js'; // Fíjate en el .js al final

const PORT = 3000;
const app = createServer();

app.listen(PORT, () => {
    console.log(`[Servidor]: 🚀 RoomieSmart Backend corriendo en http://localhost:${PORT}`);
});