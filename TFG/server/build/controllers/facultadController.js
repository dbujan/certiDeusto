"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultadController = void 0;
const database_1 = __importDefault(require("../config/database"));
class FacultadController {
    async list(req, res) {
        const facultades = await database_1.default.promise().query('SELECT * FROM facultad');
        res.json(facultades[0]);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const facultad = await database_1.default.promise().query('SELECT * FROM facultad WHERE id = ?', [id]);
        console.log(facultad);
        if (facultad[0].length > 0) {
            return res.json(facultad[0][0]);
        }
        else {
            return res.status(404).json({ text: "No existe la facultad " + req.params.id });
        }
    }
    async getOneByName(req, res) {
        const { nombre } = req.params;
        const facultad = await database_1.default.promise().query('SELECT * FROM facultad WHERE name = ?', [nombre]);
        console.log(facultad);
        if (facultad[0].length > 0) {
            return res.json(facultad[0][0]);
        }
        else {
            return res.status(404).json({ text: "No existe la facultad " + req.params.nombre });
        }
    }
    async create(req, res) {
        console.log(req.body);
        await database_1.default.promise().query('INSERT INTO facultad set ?', [req.body]);
        res.json({ message: 'facultad guardada' });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.promise().query('DELETE FROM facultad WHERE id = ?', [id]);
        res.json({ message: "la facultad fue eliminada" });
    }
    async update(req, res) {
        const { id } = req.params;
        await database_1.default.promise().query('UPDATE facultad set ? WHERE id = ? ', [req.body, id]);
        res.json({ message: "la facultad fue actualizada" });
    }
}
exports.facultadController = new FacultadController();
