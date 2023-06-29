import {Request, Response} from 'express';
import pool from '../config/database'

class ProfesorAsignaturaController {
    public async list (req: Request,res: Response) {
        const profesorAsignaturas = await pool.promise().query('SELECT * FROM profesor_asignatura');
        res.json(profesorAsignaturas[0]);
    }
    
    public async listFromProfesor (req: Request,res: Response) {
        const {id} = req.params;
        const profesorAsignaturas = await pool.promise().query('SELECT * FROM profesor_asignatura WHERE id_profesor = ?', [id]);
        res.json(profesorAsignaturas[0]);
    }
    public async listFromAsignatura (req: Request,res: Response) {
        const {id} = req.params;
        const profesorAsignaturas = await pool.promise().query('SELECT * FROM profesor_asignatura WHERE id_asignatura = ?', [id]);
        console.log(profesorAsignaturas[0] + "profesorAsignaturas" + id);
        res.json(profesorAsignaturas[0]);
    }

    public async delete (req: Request,res: Response) {
        const {idprofesor} = req.params;
        const {idasignatura} = req.params;
        const profesorAsignaturas = await pool.promise().query('DELETE FROM profesor_asignatura WHERE id_profesor = ? AND id_asignatura = ?', [idprofesor, idasignatura]);
        res.json(profesorAsignaturas[0]);
    }

    public async create (req: Request,res: Response) { 
        const {idprofesor} = req.params;
        const {idasignatura} = req.params;
        const profesorAsignaturas = await pool.promise().query('INSERT INTO profesor_asignatura set ?', [req.body]);
        res.json(profesorAsignaturas[0]);
    }
}

export const profesorAsignaturaController = new ProfesorAsignaturaController();