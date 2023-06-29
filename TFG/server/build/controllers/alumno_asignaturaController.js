"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.alumnoAsignaturaController = void 0;
const database_1 = __importDefault(require("../config/database"));
class AlumnoAsignaturaController {
    async listFromAlumno(req, res) {
        const { id } = req.params;
        const alumnoAsignaturas = await database_1.default.promise().query('SELECT * FROM alumno_asignatura WHERE id_alumno = ?', [id]);
        res.json(alumnoAsignaturas[0]);
    }
    async getGrade(req, res) {
        const { idalumno } = req.params;
        const { idasignatura } = req.params;
        const alumnoAsignaturas = await database_1.default.promise().query('SELECT * FROM alumno_asignatura WHERE id_alumno = ? AND id_asignatura = ?', [idalumno, idasignatura]);
        res.json(alumnoAsignaturas[0][0]);
    }
    async listFromAsignatura(req, res) {
        const { id } = req.params;
        const alumnoAsignaturas = await database_1.default.promise().query('SELECT * FROM alumno_asignatura WHERE id_asignatura = ?', [id]);
        res.json(alumnoAsignaturas[0]);
    }
    async gradeStudent(req, res) {
        const { idalumno } = req.params;
        const { idasignatura } = req.params;
        const { grade } = req.body;
        console.log(idalumno + " " + idasignatura + " " + grade);
        const alumnoAsignaturas = await database_1.default.promise().query('UPDATE alumno_asignatura SET grade = ? WHERE id_alumno = ? AND id_asignatura = ?', [grade, idalumno, idasignatura]);
        res.json(alumnoAsignaturas[0]);
    }
    async delete(req, res) {
        const { idalumno } = req.params;
        const { idasignatura } = req.params;
        const alumnoAsignaturas = await database_1.default.promise().query('DELETE FROM alumno_asignatura WHERE id_alumno = ? AND id_asignatura = ?', [idalumno, idasignatura]);
        res.json(alumnoAsignaturas[0]);
    }
    async create(req, res) {
        const { idalumno } = req.params;
        const { idasignatura } = req.params;
        const grade = null;
        const alumnoAsignaturas = await database_1.default.promise().query('INSERT INTO alumno_asignatura set ?', [req.body]);
        res.json(alumnoAsignaturas[0]);
    }
}
exports.alumnoAsignaturaController = new AlumnoAsignaturaController();
