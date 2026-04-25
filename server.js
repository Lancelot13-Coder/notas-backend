require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/config');
 
const estudiantesRouter = require('./services/estudiantes/routes');
const notasRouter       = require('./services/notas/routes');
 
const app  = express();
const PORT = process.env.PORT || 3000;
 
// Middlewares
app.use(cors());
app.use(express.json());
 
// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
 
// Rutas
app.use('/api/estudiantes', estudiantesRouter);
app.use('/api/notas',       notasRouter);
 
// Health check (Railway lo usa para saber que el servidor está vivo)
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'API Sistema de Notas - funcionando',
    docs: '/api-docs',
  });
});
 
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📄 Swagger en       http://localhost:${PORT}/api-docs`);
});
 