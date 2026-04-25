const pool = require('../../db/connection');
 
// POST /api/notas
const registrar = async (req, res) => {
  const { cedula, nota1, nota2, nota3, nota4 } = req.body;
  if (!cedula || nota1 == null || nota2 == null || nota3 == null || nota4 == null) {
    return res.status(400).json({ message: 'Cédula y las 4 notas son obligatorias' });
  }
  const notas = [nota1, nota2, nota3, nota4];
  if (notas.some(n => isNaN(n) || n < 0 || n > 5)) {
    return res.status(400).json({ message: 'Las notas deben estar entre 0 y 5' });
  }
  try {
    // Buscar el estudiante por cédula
    const est = await pool.query(
      'SELECT id FROM estudiantes WHERE cedula = $1', [cedula]
    );
    if (est.rows.length === 0) {
      return res.status(404).json({ message: 'Estudiante no encontrado' });
    }
    const estudianteId = est.rows[0].id;
 
    // Insertar o actualizar notas (upsert)
    const { rows } = await pool.query(
      `INSERT INTO notas (estudiante_id, nota1, nota2, nota3, nota4)
       VALUES ($1,$2,$3,$4,$5)
       ON CONFLICT (estudiante_id)
       DO UPDATE SET nota1=$2, nota2=$3, nota3=$4, nota4=$5, updated_at=NOW()
       RETURNING *`,
      [estudianteId, nota1, nota2, nota3, nota4]
    );
    res.status(201).json({ message: 'Notas guardadas', data: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
 
module.exports = { registrar };
 