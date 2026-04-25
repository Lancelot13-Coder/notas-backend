const pool = require('../../db/connection');
 
// GET /api/estudiantes/consulta?cedula=xxx  o  ?nombre=xxx
const consultar = async (req, res) => {
  const { cedula, nombre } = req.query;
  if (!cedula && !nombre) {
    return res.status(400).json({ message: 'Debe enviar cedula o nombre' });
  }
  try {
    let query, params;
    if (cedula) {
      query  = 'SELECT * FROM v_estudiantes_notas WHERE cedula = $1';
      params = [cedula];
    } else {
      query  = 'SELECT * FROM v_estudiantes_notas WHERE LOWER(nombre) LIKE LOWER($1)';
      params = [`%${nombre}%`];
    }
    const { rows } = await pool.query(query, params);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Estudiante no encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
 
// POST /api/estudiantes
const registrar = async (req, res) => {
  const { cedula, nombre, correo, celular, materia } = req.body;
  if (!cedula || !nombre || !correo || !celular || !materia) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }
  try {
    const { rows } = await pool.query(
      `INSERT INTO estudiantes (cedula, nombre, correo, celular, materia)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [cedula, nombre, correo, celular, materia]
    );
    res.status(201).json({ message: 'Estudiante registrado', data: rows[0] });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ message: 'La cédula ya está registrada' });
    }
    console.error(err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
 
module.exports = { consultar, registrar };
 