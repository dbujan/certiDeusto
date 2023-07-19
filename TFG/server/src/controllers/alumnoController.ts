import {Request, Response} from 'express';
import pool from '../config/database'

class AlumnoController {

    public async list (req: Request,res: Response) {
        const alumnos = await pool.promise().query('SELECT * FROM alumno');
        res.json(alumnos[0]);
    }
    public async getOne (req: Request,res: Response) {
        const {id} = req.params;
        const alumno = await pool.promise().query('SELECT * FROM alumno WHERE id = ?', [id]);
        console.log(alumno);
        if(alumno[0].length > 0){
            return res.json(alumno[0][0]);//Un problema a la hora de enviar solo el alumno envia datos buffer... que no interesan por eso [0][0]
        }else{
            return res.status(404).json({text:"No existe el alumno " + req.params.id});
        }
        
    }
    public async create (req: Request,res: Response){
        console.log(req.body);
        await pool.promise().query('INSERT INTO alumno set ?', [req.body]);
        res.json({message:'alumno guardado'});
    }
    public async delete (req: Request,res: Response){
        const {id} = req.params;
        await pool.promise().query('DELETE FROM alumno WHERE id = ?',[id]);
        res.json({message:"el alumno fue eliminado"});
    }
    public async update (req: Request,res: Response){
        const {id} = req.params;
        await pool.promise().query('UPDATE alumno set ? WHERE id = ? ', [req.body, id]);
        res.json({message:"el alumno fue actualizado"})
    }
    public async updateRegistered (req: Request,res: Response){
        const {id} = req.params;
        const {registered} = req.body;
        await pool.promise().query('UPDATE alumno set registered = ? WHERE id = ? ', [registered, id]);
        res.json({message:"el alumno fue actualizado"})
    }

    
}

export const alumnoController = new AlumnoController();