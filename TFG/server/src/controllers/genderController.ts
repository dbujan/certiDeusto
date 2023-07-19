import {Request, Response} from 'express';
import pool from '../config/database'

class GenderController{
    public async list (req: Request,res: Response) {
        const genders = await pool.promise().query('SELECT * FROM genero');
        res.json(genders[0]);
    }
    public async getOne (req: Request,res: Response){
        const {id} = req.params;
        const genero = await pool.promise().query('SELECT * FROM genero WHERE id = ?', [id]);
        console.log(genero);
        if(genero[0].length > 0){
            return res.json(genero[0][0]);
        }else{
            return res.status(404).json({text:"No existe el genero " + req.params.id});
        }
    }

    public async getOneName (req: Request,res: Response){
        const {name} = req.params;
        const genero = await pool.promise().query('SELECT * FROM genero WHERE name_english = ?', [name]);
        console.log(genero);
        if(genero[0].length > 0){
            return res.json(genero[0][0]);
        }else{
            return res.status(404).json({text:"No existe el genero " + req.params.id});
        }
    }
}
export const genderController = new GenderController();