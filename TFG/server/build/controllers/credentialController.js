"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.credentialController = void 0;
const database_1 = __importDefault(require("../config/database"));
class CredentialController {
    async listFromAlumno(req, res) {
        const { id } = req.params;
        const credentials = await database_1.default.promise().query('SELECT * FROM credential WHERE id_alumno = ?', [id]);
        res.json(credentials[0]);
    }
}
exports.credentialController = new CredentialController();
