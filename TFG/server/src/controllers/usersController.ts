import {Request, Response} from 'express';
import pool from '../config/database'

class UsersController {

    public async list (req: Request,res: Response) {
        const users = await pool.promise().query('SELECT * FROM users');
        res.json(users[0]);
    }
    public async getOne (req: Request,res: Response) {
        const {id} = req.params;
        const user = await pool.promise().query('SELECT * FROM users WHERE id = ?', [id]);
        console.log(user);
        if(user[0].length > 0){
            return res.json(user[0][0]);//Un problema a la hora de enviar solo el alumno envia datos buffer... que no interesan por eso [0][0]
        }else{
            return res.status(404).json({text:"No existe el usuario " + req.params.id});
        }
        
    }
    public async getOneToken (req: Request,res: Response) {
        const {token} = req.params;
        const user = await pool.promise().query('SELECT * FROM users WHERE token = ?', [token]);
        console.log(user);
        if(user[0].length > 0){
            return res.json(user[0][0]);//Un problema a la hora de enviar solo el alumno envia datos buffer... que no interesan por eso [0][0]
        }else{
            return res.status(404).json({text:"No existe el usuario " + req.params.id});
        }
        
    }
    public async create (req: Request,res: Response){
        console.log(req.body);
        await pool.promise().query('INSERT INTO users set ?', [req.body]);
        res.json({message:'usuario guardado'});
    }
    public async delete (req: Request,res: Response){
        const {id} = req.params;
        await pool.promise().query('DELETE FROM users WHERE id = ?',[id]);
        res.json({message:"el usuario fue eliminado"});
    }
    public async update (req: Request,res: Response){
        const {id} = req.params;
        await pool.promise().query('UPDATE users set ? WHERE id = ? ', [req.body, id]);
        res.json({message:"el usuario fue actualizado"})
    }



}

export const usersController = new UsersController();
