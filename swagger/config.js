const swaggerJsdoc = require('swagger-jsdoc');
 
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API - Sistema de Notas Estudiantiles',
      version: '1.0.0',
      description: 'Microservicios para consultar, registrar estudiantes y registrar notas',
    },
    servers: [
      {
        url: process.env.RAILWAY_STATIC_URL
          ? `https://${process.env.RAILWAY_STATIC_URL}`
          : `http://localhost:${process.env.PORT || 3000}`,
        description: 'Servidor activo',
      },
    ],
    components: {
      schemas: {
        Estudiante: {
          type: 'object',
          required: ['cedula', 'nombre', 'correo', 'celular', 'materia'],
          properties: {
            cedula:  { type: 'string', example: '1001234567' },
            nombre:  { type: 'string', example: 'Ana López' },
            correo:  { type: 'string', example: 'ana@email.com' },
            celular: { type: 'string', example: '3101234567' },
            materia: { type: 'string', example: 'Programación Web' },
          },
        },
        Nota: {
          type: 'object',
          required: ['cedula', 'nota1', 'nota2', 'nota3', 'nota4'],
          properties: {
            cedula: { type: 'string',  example: '1001234567' },
            nota1:  { type: 'number',  example: 4.5 },
            nota2:  { type: 'number',  example: 3.8 },
            nota3:  { type: 'number',  example: 4.2 },
            nota4:  { type: 'number',  example: 4.0 },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./services/**/*.js'],
};
 
module.exports = swaggerJsdoc(options);
 