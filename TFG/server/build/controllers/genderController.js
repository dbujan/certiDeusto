"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genderController = void 0;
const database_1 = __importDefault(require("../config/database"));
class GenderController {
    async list(req, res) {
        const genders = await database_1.default.promise().query('SELECT * FROM genero');
        res.json(genders[0]);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const genero = await database_1.default.promise().query('SELECT * FROM genero WHERE id = ?', [id]);
        console.log(genero);
        if (genero[0].length > 0) {
            return res.json(genero[0][0]);
        }
        else {
            return res.status(404).json({ text: "No existe el genero " + req.params.id });
        }
    }
    async getOneName(req, res) {
        const { name } = req.params;
        const genero = await database_1.default.promise().query('SELECT * FROM genero WHERE name_english = ?', [name]);
        console.log(genero);
        if (genero[0].length > 0) {
            return res.json(genero[0][0]);
        }
        else {
            return res.status(404).json({ text: "No existe el genero " + req.params.id });
        }
    }
}
exports.genderController = new GenderController();
