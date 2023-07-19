import {Request, Response} from 'express';
import pool from '../config/database'

class CredentialController {
    public async listFromAlumno (req: Request,res: Response) {
        const {id} = req.params;
        const credentials = await pool.promise().query('SELECT * FROM credential WHERE id_alumno = ?', [id]);
        res.json(credentials[0]);
    }
}

export const credentialController = new CredentialController();