import {Request, Response} from 'express';
import pool from '../config/database'

class FacultadController {

    public async list (req: Request,res: Response) {
        const facultades = await pool.promise().query('SELECT * FROM facultad');
        res.json(facultades[0]);
    }
    public async getOne (req: Request,res: Response) {
        const {id} = req.params;
        const facultad = await pool.promise().query('SELECT * FROM facultad WHERE id = ?', [id]);
        console.log(facultad);
        if(facultad[0].length > 0){
            return res.json(facultad[0][0]);
        }else{
            return res.status(404).json({text:"No existe la facultad " + req.params.id});
        }
        
    }
    public async getOneByName (req: Request,res: Response) {
        const {nombre} = req.params;
        const facultad = await pool.promise().query('SELECT * FROM facultad WHERE name = ?', [nombre]);
        console.log(facultad);
        if(facultad[0].length > 0){
            return res.json(facultad[0][0]);
        }else{
            return res.status(404).json({text:"No existe la facultad " + req.params.nombre});
        }
    }
    public async create (req: Request,res: Response){
        console.log(req.body);
        await pool.promise().query('INSERT INTO facultad set ?', [req.body]);
        res.json({message:'facultad guardada'});
    }
    public async delete (req: Request,res: Response){
        const {id} = req.params;
        await pool.promise().query('DELETE FROM facultad WHERE id = ?',[id]);
        res.json({message:"la facultad fue eliminada"});
    }
    public async update (req: Request,res: Response){
        const {id} = req.params;
        await pool.promise().query('UPDATE facultad set ? WHERE id = ? ', [req.body, id]);
        res.json({message:"la facultad fue actualizada"})
    }

}

export const facultadController = new FacultadController();