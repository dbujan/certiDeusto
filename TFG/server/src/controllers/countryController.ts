import {Request, Response} from 'express';
import pool from '../config/database'

class CountryController {

    public async list (req: Request,res: Response) {
        const countries = await pool.promise().query('SELECT * FROM pais');
        res.json(countries[0]);
    }
    public async getOne (req: Request,res: Response){
        const {id} = req.params;
        const country = await pool.promise().query('SELECT * FROM pais WHERE id = ?', [id]);
        if(country[0].length > 0){
            return res.json(country[0]);
        }
        res.status(404).json({text: 'The country does not exists'});
    }
}

export const countryController = new CountryController();