const router = require('express').Router();
const { consultar, registrar } = require('./controller');
 
/**
 * @swagger
 * /api/estudiantes/consulta:
 *   get:
 *     summary: Consultar estudiante y sus notas
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: query
 *         name: cedula
 *         schema:
 *           type: string
 *         description: Cédula del estudiante
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         description: Nombre (búsqueda parcial)
 *     responses:
 *       200:
 *         description: Datos del estudiante con notas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cedula:     { type: string }
 *                 nombre:     { type: string }
 *                 materia:    { type: string }
 *                 nota1:      { type: number }
 *                 nota2:      { type: number }
 *                 nota3:      { type: number }
 *                 nota4:      { type: number }
 *                 definitiva: { type: number }
 *       404:
 *         description: Estudiante no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/consulta', consultar);
 
/**
 * @swagger
 * /api/estudiantes:
 *   post:
 *     summary: Registrar un nuevo estudiante
 *     tags: [Estudiantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Estudiante'
 *     responses:
 *       201:
 *         description: Estudiante registrado exitosamente
 *       400:
 *         description: Campos incompletos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Cédula ya registrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', registrar);
 
module.exports = router;
 