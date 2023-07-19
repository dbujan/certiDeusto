"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.competenciaController = void 0;
const database_1 = __importDefault(require("../config/database"));
class CompetenciaController {
    async list(req, res) {
        const competencias = await database_1.default.promise().query('SELECT * FROM competencia');
        res.json(competencias[0]);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const competencia = await database_1.default.promise().query('SELECT * FROM competencia WHERE id = ?', [id]);
        console.log(competencia);
        if (competencia[0].length > 0) {
            return res.json(competencia[0][0]);
        }
        else {
            return res.status(404).json({ text: "No existe la competencia " + req.params.id });
        }
    }
    async getOneByEscourl(req, res) {
        const { esco_url } = req.params;
        const escoCompleta = "http://data.europa.eu/esco/skill/" + esco_url;
        console.log(esco_url + "url de la esco");
        const competencia = await database_1.default.promise().query('SELECT * FROM competencia WHERE esco_url = ?', [escoCompleta]);
        console.log(competencia);
        if (competencia[0].length > 0) {
            return res.json(competencia[0][0]);
        }
        else {
            return res.status(404).json({ text: "No existe la competencia " + req.params.id });
        }
    }
    async create(req, res) {
        console.log(req.body);
        await database_1.default.promise().query('INSERT INTO competencia set ?', [req.body]);
        res.json({ message: "competencia guardada" });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.promise().query('DELETE FROM competencia WHERE id = ?', [id]);
        res.json({ message: "la competencia fue eliminada" });
    }
    async update(req, res) {
        const { id } = req.params;
        await database_1.default.promise().query('UPDATE competencia set ? WHERE id = ? ', [req.body, id]);
        res.json({ message: "la competencia fue actualizada" });
    }
}
exports.competenciaController = new CompetenciaController();
