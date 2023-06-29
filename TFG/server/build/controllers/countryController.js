"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countryController = void 0;
const database_1 = __importDefault(require("../config/database"));
class CountryController {
    async list(req, res) {
        const countries = await database_1.default.promise().query('SELECT * FROM pais');
        res.json(countries[0]);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const country = await database_1.default.promise().query('SELECT * FROM pais WHERE id = ?', [id]);
        if (country[0].length > 0) {
            return res.json(country[0]);
        }
        res.status(404).json({ text: 'The country does not exists' });
    }
}
exports.countryController = new CountryController();
