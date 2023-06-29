"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movilidadController = void 0;
const database_1 = __importDefault(require("../config/database"));
class MovilidadController {
    async list(req, res) {
        const movilidades = await database_1.default.promise().query('SELECT * FROM movilidad');
        res.json(movilidades[0]);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const movilidad = await database_1.default.promise().query('SELECT * FROM movilidad WHERE id = ?', [id]);
        console.log(movilidad);
        if (movilidad[0].length > 0) {
            return res.json(movilidad[0][0]);
        }
        else {
            return res.status(404).json({ text: "No existe la movilidad " + req.params.id });
        }
    }
    async create(req, res) {
        console.log(req.body);
        await database_1.default.promise().query('INSERT INTO movilidad set ?', [req.body]);
        res.json({ message: 'movilidad guardada' });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.promise().query('DELETE FROM movilidad WHERE id = ?', [id]);
        res.json({ message: "la movilidad fue eliminada" });
    }
    async update(req, res) {
        const { id } = req.params;
        await database_1.default.promise().query('UPDATE movilidad set ? WHERE id = ? ', [req.body, id]);
        res.json({ message: "la movilidad fue actualizada" });
    }
}
exports.movilidadController = new MovilidadController();
