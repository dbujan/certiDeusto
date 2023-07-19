import {Request, Response} from 'express';
import pool from '../config/database'

class AsignaturaCompetenciaController {
   
    public async listFromAsignatura (req: Request,res: Response) {
        const {id} = req.params;
        const alumnoAsignaturas = await pool.promise().query('SELECT * FROM asignatura_competencia WHERE id_asignatura = ?', [id]);
        res.json(alumnoAsignaturas[0]);
    }
    public async create (req: Request,res: Response){
        const {id_asignatura, id_competencia} = req.params;
        console.log(req.body);
        await pool.promise().query('INSERT INTO asignatura_competencia set ?', [req.body]);
        res.json({message:'asignatura_competencia guardada'});
    }
    public async delete (req: Request,res: Response){
        const {idasignatura, idcompetencia} = req.params;
        await pool.promise().query('DELETE FROM asignatura_competencia WHERE id_asignatura = ? AND id_competencia = ?', [idasignatura, idcompetencia]);
        res.json({message:'asignatura_competencia eliminada'});
    }
}

export const asignaturaCompetenciaController = new AsignaturaCompetenciaController();