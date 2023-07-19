"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asignaturaController = void 0;
const database_1 = __importDefault(require("../config/database"));
class AsignaturaController {
    async list(req, res) {
        const asignaturas = await database_1.default.promise().query('SELECT * FROM asignatura');
        res.json(asignaturas[0]);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const asignatura = await database_1.default.promise().query('SELECT * FROM asignatura WHERE id = ?', [id]);
        console.log(asignatura);
        if (asignatura[0].length > 0) {
            return res.json(asignatura[0][0]);
        }
        else {
            return res.status(404).json({ text: "No existe la asignatura " + req.params.id });
        }
    }
    async create(req, res) {
        console.log(req.body + "cuerpo");
        await database_1.default.promise().query('INSERT INTO asignatura set ?', [req.body]);
        res.json({ message: 'asignatura guardado' });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.promise().query('DELETE FROM asignatura WHERE id = ? ', [id]);
        res.json({ message: "el asignatura fue eliminado" });
    }
    async update(req, res) {
        const { id } = req.params;
        await database_1.default.promise().query('UPDATE asignatura set ? WHERE id = ? ', [req.body, id]);
        res.json({ message: "la asignatura fue actualizada" });
    }
    async updateGraded(req, res) {
        const { id } = req.params;
        await database_1.default.promise().query('UPDATE asignatura set graded = 1 WHERE id = ? ', [id]);
        res.json({ message: "la asignatura fue actualizada" });
    }
    async getTerminadas(req, res) {
        const asignaturas1 = await database_1.default.promise().query('SELECT * FROM asignatura WHERE graded = 1');
        console.log(asignaturas1[0] + "asignaturas from api");
        res.json(asignaturas1[0]);
    }
    async updateIssued(req, res) {
        const { id } = req.params;
        await database_1.default.promise().query('UPDATE asignatura set issued = 1 WHERE id = ? ', [id]);
        res.json({ message: "la asignatura fue actualizada" });
    }
}
exports.asignaturaController = new AsignaturaController();
