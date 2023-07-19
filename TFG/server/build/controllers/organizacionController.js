"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizacionController = void 0;
const database_1 = __importDefault(require("../config/database"));
class OrganizacionController {
    async list(req, res) {
        const organizaciones = await database_1.default.promise().query('SELECT * FROM organizacion');
        res.json(organizaciones[0]);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const organizacion = await database_1.default.promise().query('SELECT * FROM organizacion WHERE id = ?', [id]);
        console.log(organizacion);
        if (organizacion[0].length > 0) {
            return res.json(organizacion[0][0]);
        }
        else {
            return res.status(404).json({ text: "No existe la organizacion " + req.params.id });
        }
    }
    async create(req, res) {
        console.log(req.body);
        await database_1.default.promise().query('INSERT INTO organizacion set ?', [req.body]);
        res.json({ message: 'organizacion guardada' });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.promise().query('DELETE FROM organizacion WHERE id = ?', [id]);
        res.json({ message: "la organizacion fue eliminada" });
    }
    async update(req, res) {
        const { id } = req.params;
        await database_1.default.promise().query('UPDATE organizacion set ? WHERE id = ? ', [req.body, id]);
        res.json({ message: "la organizacion fue actualizada" });
    }
}
exports.organizacionController = new OrganizacionController();
