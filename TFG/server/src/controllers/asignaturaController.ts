import {Request, Response} from 'express';
import pool from '../config/database'

class AsignaturaController {
    public async list (req: Request,res: Response) {
        const asignaturas = await pool.promise().query('SELECT * FROM asignatura');
        res.json(asignaturas[0]);
    }
    public async getOne (req: Request,res: Response) {
        const {id} = req.params;
        const asignatura = await pool.promise().query('SELECT * FROM asignatura WHERE id = ?', [id]);
        console.log(asignatura);
        if(asignatura[0].length > 0){
            return res.json(asignatura[0][0]);
        }else{
            return res.status(404).json({text:"No existe la asignatura " + req.params.id});
        }
        
    }
    public async create (req: Request,res: Response){
        console.log(req.body + "cuerpo");
        await pool.promise().query('INSERT INTO asignatura set ?', [req.body]);
        res.json({message:'asignatura guardado'});
    }
    public async delete (req: Request,res: Response){
        const {id} = req.params;
        await pool.promise().query('DELETE FROM asignatura WHERE id = ? ',[id]);
        res.json({message:"el asignatura fue eliminado"});
    }
    public async update (req: Request,res: Response){
        const {id} = req.params;
        await pool.promise().query('UPDATE asignatura set ? WHERE id = ? ', [req.body, id]);
        res.json({message:"la asignatura fue actualizada"})
    }
    public async updateGraded (req: Request,res: Response){
        const {id} = req.params;
        await pool.promise().query('UPDATE asignatura set graded = 1 WHERE id = ? ', [id]);
        res.json({message:"la asignatura fue actualizada"})
    }
    public async getTerminadas (req: Request,res: Response){
        const asignaturas1 = await pool.promise().query('SELECT * FROM asignatura WHERE graded = 1');
        console.log(asignaturas1[0]+"asignaturas from api");
        res.json(asignaturas1[0]);
    }
    public async updateIssued (req: Request,res: Response){
        const {id} = req.params;
        await pool.promise().query('UPDATE asignatura set issued = 1 WHERE id = ? ', [id]);
        res.json({message:"la asignatura fue actualizada"})
    }

}

export const asignaturaController = new AsignaturaController();