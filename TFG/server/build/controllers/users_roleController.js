"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users_roleController = void 0;
const database_1 = __importDefault(require("../config/database"));
class Users_roleController {
    async list(req, res) {
        const users_role = await database_1.default.promise().query('SELECT * FROM users_role');
        res.json(users_role[0]);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const users_role = await database_1.default.promise().query('SELECT * FROM users_role WHERE id = ?', [id]);
        console.log(users_role);
        if (users_role[0].length > 0) {
            return res.json(users_role[0][0]); //Un problema a la hora de enviar solo el alumno envia datos buffer... que no interesan por eso [0][0]
        }
        else {
            return res.status(404).json({ text: "No existe el rol de usuario " + req.params.id });
        }
    }
    async create(req, res) {
        console.log(req.body);
        await database_1.default.promise().query('INSERT INTO users_role set ?', [req.body]);
        res.json({ message: 'rol de usuario guardado' });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.promise().query('DELETE FROM users_role WHERE id = ?', [id]);
        res.json({ message: "el rol de usuario fue eliminado" });
    }
    async update(req, res) {
        const { id } = req.params;
        await database_1.default.promise().query('UPDATE users_role set ? WHERE id = ? ', [req.body, id]);
        res.json({ message: "el rol de usuario fue actualizado" });
    }
}
exports.users_roleController = new Users_roleController();
