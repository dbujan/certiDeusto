import {Request, Response} from 'express';
import pool from '../config/database'

class ProfesorController {

    public async list (req: Request,res: Response) {
        const profesores = await pool.promise().query('SELECT * FROM profesor');
        res.json(profesores[0]);
    }
    public async getOne (req: Request,res: Response) {
        const {id} = req.params;
        const profesor = await pool.promise().query('SELECT * FROM profesor WHERE id = ?', [id]);
        console.log(profesor);
        if(profesor[0].length > 0){
            return res.json(profesor[0][0]);
        }else{
            return res.status(404).json({text:"No existe el profesor " + req.params.id});
        }
        
    }
    public async create (req: Request,res: Response){
        console.log(req.body);
        await pool.promise().query('INSERT INTO profesor set ?', [req.body]);
        res.json({message:'profesor guardado'});
    }
    public async delete (req: Request,res: Response){
        const {id} = req.params;
        await pool.promise().query('DELETE FROM profesor WHERE id = ?',[id]);
        res.json({message:"el profesor fue eliminado"});
    }
    public async update (req: Request,res: Response){
        const {id} = req.params;
        await pool.promise().query('UPDATE profesor set ? WHERE id = ? ', [req.body, id]);
        res.json({message:"el profesor fue actualizado"})
    }
    public async updateRegistered (req: Request,res: Response){
        const {id} = req.params;
        const {registered} = req.body;
        await pool.promise().query('UPDATE profesor set registered = ? WHERE id = ? ', [registered, id]);
        res.json({message:"el profesor fue actualizado"})
    }

}

export const profesorController = new ProfesorController();
