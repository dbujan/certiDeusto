import {Request, Response} from 'express';
import pool from '../config/database'

class Users_roleController {

    public async list (req: Request,res: Response) {
        const users_role = await pool.promise().query('SELECT * FROM users_role');
        res.json(users_role[0]);
    }
    public async getOne (req: Request,res: Response) {
        const {id} = req.params;
        const users_role = await pool.promise().query('SELECT * FROM users_role WHERE id = ?', [id]);
        console.log(users_role);
        if(users_role[0].length > 0){
            return res.json(users_role[0][0]);//Un problema a la hora de enviar solo el alumno envia datos buffer... que no interesan por eso [0][0]
        }else{
            return res.status(404).json({text:"No existe el rol de usuario " + req.params.id});
        }
        
    }
    public async create (req: Request,res: Response){
        console.log(req.body);
        await pool.promise().query('INSERT INTO users_role set ?', [req.body]);
        res.json({message:'rol de usuario guardado'});
    }
    public async delete (req: Request,res: Response){
        const {id} = req.params;
        await pool.promise().query('DELETE FROM users_role WHERE id = ?',[id]);
        res.json({message:"el rol de usuario fue eliminado"});
    }
    public async update (req: Request,res: Response){
        const {id} = req.params;
        await pool.promise().query('UPDATE users_role set ? WHERE id = ? ', [req.body, id]);
        res.json({message:"el rol de usuario fue actualizado"})
    }
}

export const users_roleController = new Users_roleController();