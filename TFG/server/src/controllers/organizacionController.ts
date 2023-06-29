import {Request, Response} from 'express';
import pool from '../config/database'

class OrganizacionController {

    public async list (req: Request,res: Response) {
        const organizaciones = await pool.promise().query('SELECT * FROM organizacion');
        res.json(organizaciones[0]);
    }
    public async getOne (req: Request,res: Response) {
        const {id} = req.params;
        const organizacion = await pool.promise().query('SELECT * FROM organizacion WHERE id = ?', [id]);
        console.log(organizacion);
        if(organizacion[0].length > 0){
            return res.json(organizacion[0][0]);
        }else{
            return res.status(404).json({text:"No existe la organizacion " + req.params.id});
        }
        
    }
    public async create (req: Request,res: Response){
        console.log(req.body);
        await pool.promise().query('INSERT INTO organizacion set ?', [req.body]);
        res.json({message:'organizacion guardada'});
    }
    public async delete (req: Request,res: Response){
        const {id} = req.params;
        await pool.promise().query('DELETE FROM organizacion WHERE id = ?',[id]);
        res.json({message:"la organizacion fue eliminada"});
    }
    public async update (req: Request,res: Response){
        const {id} = req.params;
        await pool.promise().query('UPDATE organizacion set ? WHERE id = ? ', [req.body, id]);
        res.json({message:"la organizacion fue actualizada"})
    }
}

export const organizacionController = new OrganizacionController();