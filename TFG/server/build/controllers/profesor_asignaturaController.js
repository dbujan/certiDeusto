"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profesorAsignaturaController = void 0;
const database_1 = __importDefault(require("../config/database"));
class ProfesorAsignaturaController {
    async list(req, res) {
        const profesorAsignaturas = await database_1.default.promise().query('SELECT * FROM profesor_asignatura');
        res.json(profesorAsignaturas[0]);
    }
    async listFromProfesor(req, res) {
        const { id } = req.params;
        const profesorAsignaturas = await database_1.default.promise().query('SELECT * FROM profesor_asignatura WHERE id_profesor = ?', [id]);
        res.json(profesorAsignaturas[0]);
    }
    async listFromAsignatura(req, res) {
        const { id } = req.params;
        const profesorAsignaturas = await database_1.default.promise().query('SELECT * FROM profesor_asignatura WHERE id_asignatura = ?', [id]);
        console.log(profesorAsignaturas[0] + "profesorAsignaturas" + id);
        res.json(profesorAsignaturas[0]);
    }
    async delete(req, res) {
        const { idprofesor } = req.params;
        const { idasignatura } = req.params;
        const profesorAsignaturas = await database_1.default.promise().query('DELETE FROM profesor_asignatura WHERE id_profesor = ? AND id_asignatura = ?', [idprofesor, idasignatura]);
        res.json(profesorAsignaturas[0]);
    }
    async create(req, res) {
        const { idprofesor } = req.params;
        const { idasignatura } = req.params;
        const profesorAsignaturas = await database_1.default.promise().query('INSERT INTO profesor_asignatura set ?', [req.body]);
        res.json(profesorAsignaturas[0]);
    }
}
exports.profesorAsignaturaController = new ProfesorAsignaturaController();
