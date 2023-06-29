import {Request, Response} from 'express';
import pool from '../config/database'

class MovilidadController {

    public async list (req: Request,res: Response) {
        const movilidades = await pool.promise().query('SELECT * FROM movilidad');
        res.json(movilidades[0]);
    }
    public async getOne (req: Request,res: Response) {
        const {id} = req.params;
        const movilidad = await pool.promise().query('SELECT * FROM movilidad WHERE id = ?', [id]);
        console.log(movilidad);
        if(movilidad[0].length > 0){
            return res.json(movilidad[0][0]);
        }else{
            return res.status(404).json({text:"No existe la movilidad " + req.params.id});
        }
        
    }
    public async create (req: Request,res: Response){
        console.log(req.body);
        await pool.promise().query('INSERT INTO movilidad set ?', [req.body]);
        res.json({message:'movilidad guardada'});
    }
    public async delete (req: Request,res: Response){
        const {id} = req.params;
        await pool.promise().query('DELETE FROM movilidad WHERE id = ?',[id]);
        res.json({message:"la movilidad fue eliminada"});
    }
    public async update (req: Request,res: Response){
        const {id} = req.params;
        await pool.promise().query('UPDATE movilidad set ? WHERE id = ? ', [req.body, id]);
        res.json({message:"la movilidad fue actualizada"})
    }
}

export const movilidadController = new MovilidadController();