"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
const database_1 = __importDefault(require("../config/database"));
class UsersController {
    async list(req, res) {
        const users = await database_1.default.promise().query('SELECT * FROM users');
        res.json(users[0]);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const user = await database_1.default.promise().query('SELECT * FROM users WHERE id = ?', [id]);
        console.log(user);
        if (user[0].length > 0) {
            return res.json(user[0][0]); //Un problema a la hora de enviar solo el alumno envia datos buffer... que no interesan por eso [0][0]
        }
        else {
            return res.status(404).json({ text: "No existe el usuario " + req.params.id });
        }
    }
    async getOneToken(req, res) {
        const { token } = req.params;
        const user = await database_1.default.promise().query('SELECT * FROM users WHERE token = ?', [token]);
        console.log(user);
        if (user[0].length > 0) {
            return res.json(user[0][0]); //Un problema a la hora de enviar solo el alumno envia datos buffer... que no interesan por eso [0][0]
        }
        else {
            return res.status(404).json({ text: "No existe el usuario " + req.params.id });
        }
    }
    async create(req, res) {
        console.log(req.body);
        await database_1.default.promise().query('INSERT INTO users set ?', [req.body]);
        res.json({ message: 'usuario guardado' });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.promise().query('DELETE FROM users WHERE id = ?', [id]);
        res.json({ message: "el usuario fue eliminado" });
    }
    async update(req, res) {
        const { id } = req.params;
        await database_1.default.promise().query('UPDATE users set ? WHERE id = ? ', [req.body, id]);
        res.json({ message: "el usuario fue actualizado" });
    }
}
exports.usersController = new UsersController();
