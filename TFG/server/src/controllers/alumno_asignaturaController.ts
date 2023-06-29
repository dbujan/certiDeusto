import {Request, Response} from 'express';
import pool from '../config/database'

class AlumnoAsignaturaController {
    public async listFromAlumno (req: Request,res: Response) {
        const {id} = req.params;
        const alumnoAsignaturas = await pool.promise().query('SELECT * FROM alumno_asignatura WHERE id_alumno = ?', [id]);
        res.json(alumnoAsignaturas[0]);
    }

    public async getGrade (req: Request,res: Response) {
        const {idalumno} = req.params;
        const {idasignatura} = req.params;
        const alumnoAsignaturas = await pool.promise().query('SELECT * FROM alumno_asignatura WHERE id_alumno = ? AND id_asignatura = ?', [idalumno, idasignatura]);
        res.json(alumnoAsignaturas[0][0]);

    }

    public async listFromAsignatura (req: Request,res: Response) {
        const {id} = req.params;
        const alumnoAsignaturas = await pool.promise().query('SELECT * FROM alumno_asignatura WHERE id_asignatura = ?', [id]);
        res.json(alumnoAsignaturas[0]);
    }

    public async gradeStudent (req: Request,res: Response) {
        const {idalumno} = req.params;
        const {idasignatura} = req.params;
        const {grade} = req.body;
        console.log(idalumno + " " + idasignatura + " " + grade);
        const alumnoAsignaturas = await pool.promise().query('UPDATE alumno_asignatura SET grade = ? WHERE id_alumno = ? AND id_asignatura = ?', [grade, idalumno, idasignatura]);
        res.json(alumnoAsignaturas[0]);
    }
    public async delete (req: Request,res: Response) {
        const {idalumno} = req.params;
        const {idasignatura} = req.params;
        const alumnoAsignaturas = await pool.promise().query('DELETE FROM alumno_asignatura WHERE id_alumno = ? AND id_asignatura = ?', [idalumno, idasignatura]);
        res.json(alumnoAsignaturas[0]);
    }

    public async create (req: Request,res: Response) {
        const {idalumno} = req.params;
        const {idasignatura} = req.params;
        const grade = null;
        const alumnoAsignaturas = await pool.promise().query('INSERT INTO alumno_asignatura set ?', [req.body]);
        res.json(alumnoAsignaturas[0]);
    }
}

export const alumnoAsignaturaController = new AlumnoAsignaturaController();