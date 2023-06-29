import {json, Request, Response} from 'express';
import pool from '../config/database'
import 'dotenv/config';

const jwt = require('jsonwebtoken');

class LoginController {

    

    public async loginAlumno (req: Request, res: Response){
        const {email} = req.params;
        const alumno = await pool.promise().query('SELECT * FROM alumno WHERE email = ?' , [email]);
        //console.log(req.params + "reqparams----");
        console.log("funcionaaaaaaaa");
        console.log(email +"email");
        if(alumno[0].length > 0){
            console.log("entra en el if");
            return res.json(alumno[0][0]);
        }else{
            console.log("entra en el else");
            return res.status(404).json({text:"No existe el alumno " + req.params.email});
        }
        
    }

    public async loginProfesor (req: Request, res: Response){
        const {email} = req.params;
        const profesor = await pool.promise().query('SELECT * FROM profesor WHERE email = ?' , [email]);
        if(profesor[0].length > 0){
            return res.json(profesor[0][0]);
        }else{
            return res.status(404).json({text:"No existe el profesor " + req.params.email});
        }
    }

    public async loginSecretaria (req: Request, res: Response){
        const {email} = req.params;
        const secretaria = await pool.promise().query('SELECT * FROM secretaria WHERE email = ?' , [email]);
        if(secretaria[0].length > 0){
            return res.json(secretaria[0][0]);
        }else{
            return res.status(404).json({text:"No existe la secretaria " + req.params.email});
        }
    }

    public async generateToken (req: Request, res: Response){
        const usuario = {
            id: req.body.id,
            email: req.body.email,
            password: req.body.password
        }
        
        //const user = JSON.parse(usuario);
        console.log(JSON.stringify(usuario)+ " usuarioRecibido");
        //SI DA ERRORES PROBAR CON {usuario: usuario},process.env.ACCESS_TOKEN_SECRET,{expiresIn: '1h',}....
        const token = jwt.sign(usuario,
          process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1h',});
        return res.json(token);
    }
    public async verifyToken (req: Request, res: Response){
        const bearerheader = req.headers['authorization'] ;
        console.log(JSON.stringify(req.headers) + "reqheaders");
        console.log(bearerheader + "bearerheader");
        if(typeof bearerheader !== 'undefined'){
            const bearer = bearerheader.split(' ')[1]; 
            console.log(bearer + "tokenassooooo");
            jwt.verify(bearer, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
                if(err){
                    console.log(err + "error");
                    return res.sendStatus(403);
                }
                console.log(user + "userVerifiedToken");
                return res.json(user);
            });
        }else{
            res.sendStatus(403);
        }

        /*const {token1} = req.params;
        console.log(token1 + " token recibido");*/

        
    }
    
}

export const loginController = new LoginController();