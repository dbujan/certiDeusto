import {Request, Response} from 'express';
import pool from '../config/database'

class CompetenciaController {

    public async list (req: Request,res: Response) {
        const competencias = await pool.promise().query('SELECT * FROM competencia');
        res.json(competencias[0]);
    }
    public async getOne (req: Request,res: Response) {
        const {id} = req.params;
        const competencia = await pool.promise().query('SELECT * FROM competencia WHERE id = ?', [id]);
        console.log(competencia);
        if(competencia[0].length > 0){
            return res.json(competencia[0][0]);
        }else{
            return res.status(404).json({text:"No existe la competencia " + req.params.id});
        }
        
    }
    public async getOneByEscourl (req: Request,res: Response) {
        const {esco_url} = req.params;
        const escoCompleta ="http://data.europa.eu/esco/skill/"+ esco_url;
        console.log(esco_url + "url de la esco");
        const competencia = await pool.promise().query('SELECT * FROM competencia WHERE esco_url = ?', [escoCompleta]);
        console.log(competencia);
        if(competencia[0].length > 0){
            return res.json(competencia[0][0]);
        }else{
            return res.status(404).json({text:"No existe la competencia " + req.params.id});
        }
    }
    
    public async create (req: Request,res: Response){
        console.log(req.body);
        await pool.promise().query('INSERT INTO competencia set ?', [req.body]);
        res.json({message:"competencia guardada"});
    }
    public async delete (req: Request,res: Response){
        const {id} = req.params;
        await pool.promise().query('DELETE FROM competencia WHERE id = ?',[id]);
        res.json({message:"la competencia fue eliminada"});
    }
    public async update (req: Request,res: Response){
        const {id} = req.params;
        await pool.promise().query('UPDATE competencia set ? WHERE id = ? ', [req.body, id]);
        res.json({message:"la competencia fue actualizada"})
    }

}

export const competenciaController = new CompetenciaController();