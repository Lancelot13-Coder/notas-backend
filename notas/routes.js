const router = require('express').Router();
const { registrar } = require('./controller');
 
/**
 * @swagger
 * /api/notas:
 *   post:
 *     summary: Registrar o actualizar notas de un estudiante
 *     tags: [Notas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Nota'
 *     responses:
 *       201:
 *         description: Notas guardadas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *                 data:
 *                   type: object
 *                   properties:
 *                     nota1:      { type: number }
 *                     nota2:      { type: number }
 *                     nota3:      { type: number }
 *                     nota4:      { type: number }
 *                     definitiva: { type: number }
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Estudiante no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', registrar);
 
module.exports = router;
 