import { Router } from 'express';

import {indexController} from '../controllers/indexController'
import {alumnoController} from '../controllers/alumnoController'
import {asignaturaController} from '../controllers/asignaturaController'
import {competenciaController} from '../controllers/competenciaController'
import {facultadController} from '../controllers/facultadController'
import {movilidadController} from '../controllers/movilidadController';
import {organizacionController} from '../controllers/organizacionController';
import { profesorController } from '../controllers/profesorController';
import { secretariaController } from '../controllers/secretariaController';
import { usersController } from '../controllers/usersController';
import { users_roleController } from '../controllers/users_roleController';
import { loginController } from '../controllers/loginController';
import { alumnoAsignaturaController } from '../controllers/alumno_asignaturaController';
import { profesorAsignaturaController } from '../controllers/profesor_asignaturaController';
import { asignaturaCompetenciaController } from '../controllers/asignatura_competenciaController';
import {MailController} from '../controllers/mailController';
import {xmlController} from '../controllers/xmlController';
import { countryController } from '../controllers/countryController';
import { genderController } from '../controllers/genderController';
import { credentialController } from '../controllers/credentialController';

class IndexRoutes {

    public router: Router = Router(); 

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', indexController.index);
        //alumno
        this.router.get('/alumno', alumnoController.list);
        this.router.get('/alumno/:id', alumnoController.getOne);
        this.router.post('/alumno', alumnoController.create);
        this.router.delete('/alumno/:id', alumnoController.delete);
        this.router.put('/alumno/:id', alumnoController.update);
        this.router.put('/alumno/registered/:id', alumnoController.updateRegistered);

        //asignatura    
        this.router.get('/asignatura', asignaturaController.list);
        this.router.get('/asignatura/:id', asignaturaController.getOne);
        this.router.get('/asignatura_terminadas', asignaturaController.getTerminadas)
        this.router.post('/asignatura', asignaturaController.create);
        this.router.delete('/asignatura/:id', asignaturaController.delete);
        this.router.put('/asignatura/:id', asignaturaController.update);
        this.router.put('/asignatura/graded/:id', asignaturaController.updateGraded);
        this.router.put('/asignatura/issued/:id', asignaturaController.updateIssued);


        //competencia
        this.router.get('/competencia', competenciaController.list);
        this.router.get('/competencia/:id', competenciaController.getOne);
        this.router.get('/competencia_esco/:esco_url', competenciaController.getOneByEscourl);
        this.router.post('/competencia', competenciaController.create);
        this.router.delete('/competencia/:id', competenciaController.delete);
        this.router.put('/competencia/:id', competenciaController.update);

        //facultad
        this.router.get('/facultad', facultadController.list);
        this.router.get('/facultad/:id', facultadController.getOne);
        this.router.get('/facultad_id/:nombre', facultadController.getOneByName)
        this.router.post('/facultad', facultadController.create);
        this.router.delete('/facultad/:id', facultadController.delete);
        this.router.put('/facultad/:id', facultadController.update);

        //movilidad
        this.router.get('/movilidad', movilidadController.list);
        this.router.get('/movilidad/:id', movilidadController.getOne);
        this.router.post('/movilidad', movilidadController.create);
        this.router.delete('/movilidad/:id', movilidadController.delete);
        this.router.put('/movilidad/:id', movilidadController.update);

        //organizacion
        this.router.get('/organizacion', organizacionController.list);
        this.router.get('/organizacion/:id', organizacionController.getOne);
        this.router.post('/organizacion', organizacionController.create);
        this.router.delete('/organizacion/:id', organizacionController.delete);
        this.router.put('/organizacion/:id', organizacionController.update);

        //profesor
        this.router.get('/profesor', profesorController.list);
        this.router.get('/profesor/:id', profesorController.getOne);
        this.router.post('/profesor', profesorController.create);
        this.router.delete('/profesor/:id', profesorController.delete);
        this.router.put('/profesor/:id', profesorController.update);
        this.router.put('/profesor/registered/:id', profesorController.updateRegistered);

        //secretaria
        this.router.get('/secretaria', secretariaController.list);
        this.router.get('/secretaria/:id', secretariaController.getOne);
        this.router.post('/secretaria', secretariaController.create);
        this.router.delete('/secretaria/:id', secretariaController.delete);
        this.router.put('/secretaria/:id', secretariaController.update);

        //users
        this.router.get('/users', usersController.list);
        this.router.get('/users/:id', usersController.getOne);
        this.router.get('/userstoken/:token', usersController.getOneToken);
        this.router.post('/users', usersController.create);
        this.router.delete('/users/:id', usersController.delete);
        this.router.put('/users/:id', usersController.update);
        

        //users_role
        this.router.get('/users_role', users_roleController.list);
        this.router.get('/users_role/:id', users_roleController.getOne);
        this.router.post('/users_role', users_roleController.create);
        this.router.delete('/users_role/:id', users_roleController.delete);
        this.router.put('/users_role/:id', users_roleController.update);

        //login
        this.router.get('/loginAlumno/:email', loginController.loginAlumno);//no deberia tener que meter el email en la url
        this.router.get('/loginProfesor/:email', loginController.loginProfesor);
        this.router.get('/loginSecretaria/:email', loginController.loginSecretaria);
        this.router.post('/generateToken', loginController.generateToken);
        this.router.post('/verifyToken', loginController.verifyToken );

        //alumno_asignatura
        this.router.get('/alumno_asignatura/:id', alumnoAsignaturaController.listFromAlumno);
        this.router.get('/alumnos_asignatura/:id', alumnoAsignaturaController.listFromAsignatura);
        this.router.get('/alumno_asignatura/:idasignatura/:idalumno', alumnoAsignaturaController.getGrade)
        this.router.put('/alumno_asignatura/:idasignatura/:idalumno', alumnoAsignaturaController.gradeStudent);
        this.router.delete('/alumno_asignatura/:idasignatura/:idalumno', alumnoAsignaturaController.delete);
        this.router.post('/alumno_asignatura/:idasignatura/:idalumno', alumnoAsignaturaController.create);

        //profesor_asignatura
        this.router.get('/profesor_asignatura', profesorAsignaturaController.list);
        this.router.get('/profesor_asignatura/:id', profesorAsignaturaController.listFromProfesor);
        this.router.get('/asignatura_profesor/:id', profesorAsignaturaController.listFromAsignatura);
        this.router.delete('/profesor_asignatura/:idprofesor/:idasignatura', profesorAsignaturaController.delete);
        this.router.post('/profesor_asignatura', profesorAsignaturaController.create);

        //asignatura_competencia
        this.router.get('/asignatura_competencia/:id', asignaturaCompetenciaController.listFromAsignatura);
        this.router.post('/asignatura_competencia', asignaturaCompetenciaController.create);
        this.router.delete('/asignatura_competencia/:idasignatura/:idcompetencia', asignaturaCompetenciaController.delete);

        //mail
        this.router.post('/mail', MailController.sendMail);
        this.router.post('/mailrejection', MailController.sendMailRejection);

        //xml
        this.router.post('/xml', xmlController.signXml);
        this.router.post('/pruebapy', xmlController.pruebaPy);
        this.router.post('/sendxml', xmlController.getXml);
        this.router.get('/loginTrustOs', xmlController.loginTrustOs);
        this.router.post('/insertTrustOs', xmlController.insertTrustOS);
        this.router.post('/getAsset', xmlController.getFromTrustOS);

        //country
        this.router.get('/country', countryController.list);
        this.router.get('/country/:id', countryController.getOne);

        //gender
        this.router.get('/gender', genderController.list);
        this.router.get('/gender/:id', genderController.getOne);
        this.router.get('/genderName/:name', genderController.getOneName);

        //credential
        this.router.get('/credentials/:id', credentialController.listFromAlumno);

        


        
    }
}
const indexRoutes = new IndexRoutes();
export default indexRoutes.router;

