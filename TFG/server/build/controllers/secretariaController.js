"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secretariaController = void 0;
const database_1 = __importDefault(require("../config/database"));
class SecretariaController {
    async list(req, res) {
        const secretarias = await database_1.default.promise().query('SELECT * FROM secretaria');
        res.json(secretarias[0]);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const secretaria = await database_1.default.promise().query('SELECT * FROM secretaria WHERE id = ?', [id]);
        console.log(secretaria);
        if (secretaria[0].length > 0) {
            return res.json(secretaria[0][0]);
        }
        else {
            return res.status(404).json({ text: "No existe la secretaria " + req.params.id });
        }
    }
    async create(req, res) {
        console.log(req.body);
        await database_1.default.promise().query('INSERT INTO secretaria set ?', [req.body]);
        res.json({ message: 'secretaria guardada' });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.promise().query('DELETE FROM secretaria WHERE id = ?', [id]);
        res.json({ message: "la secretaria fue eliminada" });
    }
    async update(req, res) {
        const { id } = req.params;
        await database_1.default.promise().query('UPDATE secretaria set ? WHERE id = ? ', [req.body, id]);
        res.json({ message: "la secretaria fue actualizada" });
    }
}
exports.secretariaController = new SecretariaController();
