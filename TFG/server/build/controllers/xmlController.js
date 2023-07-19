"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.xmlController = void 0;
const database_1 = __importDefault(require("../config/database"));
class XmlController {
    async getXml(req, res) {
        const { xml } = req.body;
        console.log(req.body.xml + "xml ORIIIGIIIIINALLLLL");
    }
    async signXml(req, res) {
        let xml = req.body.xml;
        let xmlComillas = xml.replaceAll("\"", "'");
        //let xmlSinHeader = xmlComillas.replace("<?xml version='1.0' encoding='UTF-8'?>", "");
        //console.log(xmlSinHeader+ "xml ORIIIGIIIIINALLLLL Sin commillas");
        let xmlString = xmlComillas.toString();
        console.log(xml + "xml ORIIIGIIIIINALLLLL");
        console.log(JSON.stringify(xmlString) + "xml ORIIIGIIIIINALLLLL STRIIINNGGGG");
        console.log("a" + "xml L");
        const { spawn } = require('node:child_process');
        let xmlprueba = "<DigitalCredential><CredentialData><ValidFrom>2023-04-29T10:35:21+02:00</ValidFrom><ValidUntil>2033-04-29T10:35:21+02:00</ValidUntil><Issuer><Name content-type='text/plain' lang='en'>Universidad de Deusto</Name><URL>https://www.deusto.es/</URL><Email content-type='text/plain' lang='en'>deusto@deusto.es</Email><City content-type='text/plain' lang='en'>Bilbao</City><Country content-type='text/plain' lang='en'>España</Country></Issuer></CredentialData><CredentialSubject><FullName content-type='text/plain' lang='en'>Gonzalo Perez Uriarte</FullName><Email content-type='text/plain' lang='en'>gonzalo@opendeusto.es</Email><DNI content-type='text/plain' lang='en'>78967831N</DNI><BornDate>2000-03-13T18:00:03.000Z</BornDate></CredentialSubject><CredentialCourse><CourseName content-type='text/plain' lang='en'>calculo</CourseName><CourseDescription content-type='text/plain' lang='en'>calculo I para ingenieria</CourseDescription><CourseECTS>6</CourseECTS><CourseStartDate>2023-03-20T08:32:15.000Z</CourseStartDate><CourseEndDate>2023-06-20T07:32:15.000Z</CourseEndDate><CourseTeacher><TeacherFullName content-type='text/plain' lang='en'>profesor prueba prueba2</TeacherFullName><TeacherEmail content-type='text/plain' lang='en'>profesor@deusto.es</TeacherEmail></CourseTeacher><CourseCompetences><Competence><CompetenceName content-type='text/plain' lang='en'>prueba</CompetenceName><CompetenceDescription content-type='text/plain' lang='en'>descripcion de prueba</CompetenceDescription><CompetenceESCOURL>url prueba</CompetenceESCOURL></Competence><Competence><CompetenceName content-type='text/plain' lang='en'>work as a team</CompetenceName><CompetenceDescription content-type='text/plain' lang='en'>To recognize the importance of team work, building and maintaining effective working relationships with all colleagues and within the business.</CompetenceDescription><CompetenceESCOURL>http://data.europa.eu/esco/skill/c291acb4-6992-46ff-bf72-681eb378daa5</CompetenceESCOURL></Competence></CourseCompetences></CredentialCourse></DigitalCredential>";
        console.log(xmlprueba + "xml prueba");
        const ls = spawn('python', ["C:/Users/Usuario/Proyectos/TFG/server/src/config/py/xmlSign.py", xmlString, "C:/Users/Usuario/deusto.crt", "C:/Users/Usuario/deusto.key"]);
        console.log("signXml");
        let xmlFirmado = {};
        ls.stdout.on('data', (data) => {
            console.log(data.toString());
            xmlFirmado = {
                "xml": data.toString()
            };
        });
        ls.on('close', (code) => {
            console.log(`child process close all stdio with code ${code}`);
            let jos = {
                "name": "John",
                "age": 30
            };
            res.send(xmlFirmado);
        });
    }
    async loginTrustOs(req, res) {
        const url = 'https://lab.trustos.telefonicatech.com/cert/api/v1/login';
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        const data = {
            "id": "did:vtn:trustid:4ebd35b70de8547fc0514fb67558a9b3812b905b508aeba94ac9d0bc4122d01f",
            "password": "6j6WMybAK7du"
        };
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            res.json(responseData);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred' });
        }
    }
    async insertTrustOS(req, res) {
        const jwt = req.body.jwt;
        const hash = req.body.hash;
        const id_alumno = req.body.id_alumno;
        const id_asignatura = req.body.id_asignatura;
        const namecredential = req.body.name;
        const url = 'https://lab.trustos.telefonicatech.com/cert/api/v1/certificate/file/create';
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        };
        const data = {
            "name": namecredential,
            "description": "digital credential for" + namecredential,
            "content": {
                "file_hash": hash
            },
            "public": true
        };
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            //res.json(responseData);
            const object = { asset_id: responseData.output.certID, id_alumno: id_alumno, id_asignatura: id_asignatura };
            const credentials = await database_1.default.promise().query('INSERT INTO credential set ?', [object]);
            res.json(credentials[0]);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred' });
        }
    }
    async getFromTrustOS(req, res) {
        const certtId = req.body.assetId;
        const jwt = req.body.jwt;
        console.log(certtId);
        const url = 'https://lab.trustos.telefonicatech.com/cert/api/v1/certificate/' + certtId;
        console.log(url);
        console.log(jwt);
        const headers = {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + jwt
        };
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers
            });
            const responseData = await response.json();
            res.json(responseData);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred' });
        }
    }
    async pruebaPy(req, res) {
        const { spawn } = require('node:child_process');
        let dataprob = 'holiwis';
        const ls = spawn('python', ["C:/Users/Ander/Proyectos/TFG/server/src/config/py/prueba.py", 'node.js', dataprob]);
        var dataToSend = "";
        ls.stdout.on('data', (data) => {
            console.log('Pipe data from python script ...');
            dataToSend = data.toString();
            console.log(dataToSend);
        });
        ls.on('close', (code) => {
            console.log(`child process close all stdio with code ${code}`);
            // send data to browser
            let jos = {
                "name": "John",
                "age": 30
            };
            res.send(jos);
        });
    }
}
exports.xmlController = new XmlController();
