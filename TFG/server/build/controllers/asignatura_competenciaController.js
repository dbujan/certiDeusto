"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asignaturaCompetenciaController = void 0;
const database_1 = __importDefault(require("../config/database"));
class AsignaturaCompetenciaController {
    async listFromAsignatura(req, res) {
        const { id } = req.params;
        const alumnoAsignaturas = await database_1.default.promise().query('SELECT * FROM asignatura_competencia WHERE id_asignatura = ?', [id]);
        res.json(alumnoAsignaturas[0]);
    }
    async create(req, res) {
        const { id_asignatura, id_competencia } = req.params;
        console.log(req.body);
        await database_1.default.promise().query('INSERT INTO asignatura_competencia set ?', [req.body]);
        res.json({ message: 'asignatura_competencia guardada' });
    }
    async delete(req, res) {
        const { idasignatura, idcompetencia } = req.params;
        await database_1.default.promise().query('DELETE FROM asignatura_competencia WHERE id_asignatura = ? AND id_competencia = ?', [idasignatura, idcompetencia]);
        res.json({ message: 'asignatura_competencia eliminada' });
    }
}
exports.asignaturaCompetenciaController = new AsignaturaCompetenciaController();
