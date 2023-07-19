"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.alumnoController = void 0;
const database_1 = __importDefault(require("../config/database"));
class AlumnoController {
    async list(req, res) {
        const alumnos = await database_1.default.promise().query('SELECT * FROM alumno');
        res.json(alumnos[0]);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const alumno = await database_1.default.promise().query('SELECT * FROM alumno WHERE id = ?', [id]);
        console.log(alumno);
        if (alumno[0].length > 0) {
            return res.json(alumno[0][0]); //Un problema a la hora de enviar solo el alumno envia datos buffer... que no interesan por eso [0][0]
        }
        else {
            return res.status(404).json({ text: "No existe el alumno " + req.params.id });
        }
    }
    async create(req, res) {
        console.log(req.body);
        await database_1.default.promise().query('INSERT INTO alumno set ?', [req.body]);
        res.json({ message: 'alumno guardado' });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.promise().query('DELETE FROM alumno WHERE id = ?', [id]);
        res.json({ message: "el alumno fue eliminado" });
    }
    async update(req, res) {
        const { id } = req.params;
        await database_1.default.promise().query('UPDATE alumno set ? WHERE id = ? ', [req.body, id]);
        res.json({ message: "el alumno fue actualizado" });
    }
    async updateRegistered(req, res) {
        const { id } = req.params;
        const { registered } = req.body;
        await database_1.default.promise().query('UPDATE alumno set registered = ? WHERE id = ? ', [registered, id]);
        res.json({ message: "el alumno fue actualizado" });
    }
}
exports.alumnoController = new AlumnoController();
