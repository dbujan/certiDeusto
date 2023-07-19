"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profesorController = void 0;
const database_1 = __importDefault(require("../config/database"));
class ProfesorController {
    async list(req, res) {
        const profesores = await database_1.default.promise().query('SELECT * FROM profesor');
        res.json(profesores[0]);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const profesor = await database_1.default.promise().query('SELECT * FROM profesor WHERE id = ?', [id]);
        console.log(profesor);
        if (profesor[0].length > 0) {
            return res.json(profesor[0][0]);
        }
        else {
            return res.status(404).json({ text: "No existe el profesor " + req.params.id });
        }
    }
    async create(req, res) {
        console.log(req.body);
        await database_1.default.promise().query('INSERT INTO profesor set ?', [req.body]);
        res.json({ message: 'profesor guardado' });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.promise().query('DELETE FROM profesor WHERE id = ?', [id]);
        res.json({ message: "el profesor fue eliminado" });
    }
    async update(req, res) {
        const { id } = req.params;
        await database_1.default.promise().query('UPDATE profesor set ? WHERE id = ? ', [req.body, id]);
        res.json({ message: "el profesor fue actualizado" });
    }
    async updateRegistered(req, res) {
        const { id } = req.params;
        const { registered } = req.body;
        await database_1.default.promise().query('UPDATE profesor set registered = ? WHERE id = ? ', [registered, id]);
        res.json({ message: "el profesor fue actualizado" });
    }
}
exports.profesorController = new ProfesorController();
