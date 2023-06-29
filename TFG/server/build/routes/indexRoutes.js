"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = require("../controllers/indexController");
const alumnoController_1 = require("../controllers/alumnoController");
const asignaturaController_1 = require("../controllers/asignaturaController");
const competenciaController_1 = require("../controllers/competenciaController");
const facultadController_1 = require("../controllers/facultadController");
const movilidadController_1 = require("../controllers/movilidadController");
const organizacionController_1 = require("../controllers/organizacionController");
const profesorController_1 = require("../controllers/profesorController");
const secretariaController_1 = require("../controllers/secretariaController");
const usersController_1 = require("../controllers/usersController");
const users_roleController_1 = require("../controllers/users_roleController");
const loginController_1 = require("../controllers/loginController");
const alumno_asignaturaController_1 = require("../controllers/alumno_asignaturaController");
const profesor_asignaturaController_1 = require("../controllers/profesor_asignaturaController");
const asignatura_competenciaController_1 = require("../controllers/asignatura_competenciaController");
const mailController_1 = require("../controllers/mailController");
const xmlController_1 = require("../controllers/xmlController");
const countryController_1 = require("../controllers/countryController");
const genderController_1 = require("../controllers/genderController");
const credentialController_1 = require("../controllers/credentialController");
class IndexRoutes {
    router = (0, express_1.Router)();
    constructor() {
        this.config();
    }
    config() {
        this.router.get('/', indexController_1.indexController.index);
        //alumno
        this.router.get('/alumno', alumnoController_1.alumnoController.list);
        this.router.get('/alumno/:id', alumnoController_1.alumnoController.getOne);
        this.router.post('/alumno', alumnoController_1.alumnoController.create);
        this.router.delete('/alumno/:id', alumnoController_1.alumnoController.delete);
        this.router.put('/alumno/:id', alumnoController_1.alumnoController.update);
        this.router.put('/alumno/registered/:id', alumnoController_1.alumnoController.updateRegistered);
        //asignatura    
        this.router.get('/asignatura', asignaturaController_1.asignaturaController.list);
        this.router.get('/asignatura/:id', asignaturaController_1.asignaturaController.getOne);
        this.router.get('/asignatura_terminadas', asignaturaController_1.asignaturaController.getTerminadas);
        this.router.post('/asignatura', asignaturaController_1.asignaturaController.create);
        this.router.delete('/asignatura/:id', asignaturaController_1.asignaturaController.delete);
        this.router.put('/asignatura/:id', asignaturaController_1.asignaturaController.update);
        this.router.put('/asignatura/graded/:id', asignaturaController_1.asignaturaController.updateGraded);
        this.router.put('/asignatura/issued/:id', asignaturaController_1.asignaturaController.updateIssued);
        //competencia
        this.router.get('/competencia', competenciaController_1.competenciaController.list);
        this.router.get('/competencia/:id', competenciaController_1.competenciaController.getOne);
        this.router.get('/competencia_esco/:esco_url', competenciaController_1.competenciaController.getOneByEscourl);
        this.router.post('/competencia', competenciaController_1.competenciaController.create);
        this.router.delete('/competencia/:id', competenciaController_1.competenciaController.delete);
        this.router.put('/competencia/:id', competenciaController_1.competenciaController.update);
        //facultad
        this.router.get('/facultad', facultadController_1.facultadController.list);
        this.router.get('/facultad/:id', facultadController_1.facultadController.getOne);
        this.router.get('/facultad_id/:nombre', facultadController_1.facultadController.getOneByName);
        this.router.post('/facultad', facultadController_1.facultadController.create);
        this.router.delete('/facultad/:id', facultadController_1.facultadController.delete);
        this.router.put('/facultad/:id', facultadController_1.facultadController.update);
        //movilidad
        this.router.get('/movilidad', movilidadController_1.movilidadController.list);
        this.router.get('/movilidad/:id', movilidadController_1.movilidadController.getOne);
        this.router.post('/movilidad', movilidadController_1.movilidadController.create);
        this.router.delete('/movilidad/:id', movilidadController_1.movilidadController.delete);
        this.router.put('/movilidad/:id', movilidadController_1.movilidadController.update);
        //organizacion
        this.router.get('/organizacion', organizacionController_1.organizacionController.list);
        this.router.get('/organizacion/:id', organizacionController_1.organizacionController.getOne);
        this.router.post('/organizacion', organizacionController_1.organizacionController.create);
        this.router.delete('/organizacion/:id', organizacionController_1.organizacionController.delete);
        this.router.put('/organizacion/:id', organizacionController_1.organizacionController.update);
        //profesor
        this.router.get('/profesor', profesorController_1.profesorController.list);
        this.router.get('/profesor/:id', profesorController_1.profesorController.getOne);
        this.router.post('/profesor', profesorController_1.profesorController.create);
        this.router.delete('/profesor/:id', profesorController_1.profesorController.delete);
        this.router.put('/profesor/:id', profesorController_1.profesorController.update);
        this.router.put('/profesor/registered/:id', profesorController_1.profesorController.updateRegistered);
        //secretaria
        this.router.get('/secretaria', secretariaController_1.secretariaController.list);
        this.router.get('/secretaria/:id', secretariaController_1.secretariaController.getOne);
        this.router.post('/secretaria', secretariaController_1.secretariaController.create);
        this.router.delete('/secretaria/:id', secretariaController_1.secretariaController.delete);
        this.router.put('/secretaria/:id', secretariaController_1.secretariaController.update);
        //users
        this.router.get('/users', usersController_1.usersController.list);
        this.router.get('/users/:id', usersController_1.usersController.getOne);
        this.router.get('/userstoken/:token', usersController_1.usersController.getOneToken);
        this.router.post('/users', usersController_1.usersController.create);
        this.router.delete('/users/:id', usersController_1.usersController.delete);
        this.router.put('/users/:id', usersController_1.usersController.update);
        //users_role
        this.router.get('/users_role', users_roleController_1.users_roleController.list);
        this.router.get('/users_role/:id', users_roleController_1.users_roleController.getOne);
        this.router.post('/users_role', users_roleController_1.users_roleController.create);
        this.router.delete('/users_role/:id', users_roleController_1.users_roleController.delete);
        this.router.put('/users_role/:id', users_roleController_1.users_roleController.update);
        //login
        this.router.get('/loginAlumno/:email', loginController_1.loginController.loginAlumno); //no deberia tener que meter el email en la url
        this.router.get('/loginProfesor/:email', loginController_1.loginController.loginProfesor);
        this.router.get('/loginSecretaria/:email', loginController_1.loginController.loginSecretaria);
        this.router.post('/generateToken', loginController_1.loginController.generateToken);
        this.router.post('/verifyToken', loginController_1.loginController.verifyToken);
        //alumno_asignatura
        this.router.get('/alumno_asignatura/:id', alumno_asignaturaController_1.alumnoAsignaturaController.listFromAlumno);
        this.router.get('/alumnos_asignatura/:id', alumno_asignaturaController_1.alumnoAsignaturaController.listFromAsignatura);
        this.router.get('/alumno_asignatura/:idasignatura/:idalumno', alumno_asignaturaController_1.alumnoAsignaturaController.getGrade);
        this.router.put('/alumno_asignatura/:idasignatura/:idalumno', alumno_asignaturaController_1.alumnoAsignaturaController.gradeStudent);
        this.router.delete('/alumno_asignatura/:idasignatura/:idalumno', alumno_asignaturaController_1.alumnoAsignaturaController.delete);
        this.router.post('/alumno_asignatura/:idasignatura/:idalumno', alumno_asignaturaController_1.alumnoAsignaturaController.create);
        //profesor_asignatura
        this.router.get('/profesor_asignatura', profesor_asignaturaController_1.profesorAsignaturaController.list);
        this.router.get('/profesor_asignatura/:id', profesor_asignaturaController_1.profesorAsignaturaController.listFromProfesor);
        this.router.get('/asignatura_profesor/:id', profesor_asignaturaController_1.profesorAsignaturaController.listFromAsignatura);
        this.router.delete('/profesor_asignatura/:idprofesor/:idasignatura', profesor_asignaturaController_1.profesorAsignaturaController.delete);
        this.router.post('/profesor_asignatura', profesor_asignaturaController_1.profesorAsignaturaController.create);
        //asignatura_competencia
        this.router.get('/asignatura_competencia/:id', asignatura_competenciaController_1.asignaturaCompetenciaController.listFromAsignatura);
        this.router.post('/asignatura_competencia', asignatura_competenciaController_1.asignaturaCompetenciaController.create);
        this.router.delete('/asignatura_competencia/:idasignatura/:idcompetencia', asignatura_competenciaController_1.asignaturaCompetenciaController.delete);
        //mail
        this.router.post('/mail', mailController_1.MailController.sendMail);
        this.router.post('/mailrejection', mailController_1.MailController.sendMailRejection);
        //xml
        this.router.post('/xml', xmlController_1.xmlController.signXml);
        this.router.post('/pruebapy', xmlController_1.xmlController.pruebaPy);
        this.router.post('/sendxml', xmlController_1.xmlController.getXml);
        this.router.get('/loginTrustOs', xmlController_1.xmlController.loginTrustOs);
        this.router.post('/insertTrustOs', xmlController_1.xmlController.insertTrustOS);
        this.router.post('/getAsset', xmlController_1.xmlController.getFromTrustOS);
        //country
        this.router.get('/country', countryController_1.countryController.list);
        this.router.get('/country/:id', countryController_1.countryController.getOne);
        //gender
        this.router.get('/gender', genderController_1.genderController.list);
        this.router.get('/gender/:id', genderController_1.genderController.getOne);
        this.router.get('/genderName/:name', genderController_1.genderController.getOneName);
        //credential
        this.router.get('/credentials/:id', credentialController_1.credentialController.listFromAlumno);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
