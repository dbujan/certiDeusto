import {Request, Response} from 'express';
import pool from '../config/database'

class SecretariaController {

    public async list (req: Request,res: Response) {
        const secretarias = await pool.promise().query('SELECT * FROM secretaria');
        res.json(secretarias[0]);
    }
    public async getOne (req: Request,res: Response) {
        const {id} = req.params;
        const secretaria = await pool.promise().query('SELECT * FROM secretaria WHERE id = ?', [id]);
        console.log(secretaria);
        if(secretaria[0].length > 0){
            return res.json(secretaria[0][0]);
        }else{
            return res.status(404).json({text:"No existe la secretaria " + req.params.id});
        }
        
    }
    public async create (req: Request,res: Response){
        console.log(req.body);
        await pool.promise().query('INSERT INTO secretaria set ?', [req.body]);
        res.json({message:'secretaria guardada'});
    }
    public async delete (req: Request,res: Response){
        const {id} = req.params;
        await pool.promise().query('DELETE FROM secretaria WHERE id = ?',[id]);
        res.json({message:"la secretaria fue eliminada"});
    }
    public async update (req: Request,res: Response){
        const {id} = req.params;
        await pool.promise().query('UPDATE secretaria set ? WHERE id = ? ', [req.body, id]);
        res.json({message:"la secretaria fue actualizada"})
    }
    
}

export const secretariaController = new SecretariaController();
