"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// 2. Crear els esquemes corresponents a cada col·lecció
var llibreSchema = new mongoose_1.Schema({
    titol: { type: String, required: true },
    autor: { type: String, required: true },
    anyPublicacio: { type: Number, required: true },
    generes: { type: [String], required: true },
    imatge: String,
    biblioteca: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Biblioteca', required: true } // Referència a la biblioteca
});
var bibliotecaSchema = new mongoose_1.Schema({
    nom: { type: String, required: true },
    adreça: { type: String, required: true },
    correu: String,
});
// 3. Crear models per a MongoDB utilitzant Mongoose i TypeScript
var Llibre = mongoose_1.default.model('Llibre', llibreSchema);
var Biblioteca = mongoose_1.default.model('Biblioteca', bibliotecaSchema);
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var biblioteca1, llibre1, llibre2, llibres, llibresPerBiblioteca, updateLlibre;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // 4. Connectar a la base de dades MongoDB
                return [4 /*yield*/, (0, mongoose_1.connect)('mongodb://127.0.0.1:27017/test')];
                case 1:
                    // 4. Connectar a la base de dades MongoDB
                    _a.sent();
                    biblioteca1 = new Biblioteca({
                        nom: "Biblioteca Central",
                        adreça: "Carrer de la Lectura 5",
                        correu: "contacte@bibliotecacentral.com"
                    });
                    return [4 /*yield*/, biblioteca1.save()];
                case 2:
                    _a.sent();
                    llibre1 = new Llibre({
                        titol: "Cien años de soledad",
                        autor: "Gabriel García Márquez",
                        anyPublicacio: 1967,
                        generes: ["novel·la", "realisme màgic"],
                        imatge: "https://exemple.com/cien_anyos.jpg",
                        biblioteca: biblioteca1._id // Enllaçar el llibre amb la biblioteca
                    });
                    return [4 /*yield*/, llibre1.save()];
                case 3:
                    _a.sent();
                    llibre2 = new Llibre({
                        titol: "Don Quijote de la Mancha",
                        autor: "Miguel de Cervantes",
                        anyPublicacio: 1605,
                        generes: ["novel·la", "aventura"],
                        imatge: "https://exemple.com/don_quijote.jpg",
                        biblioteca: biblioteca1._id // Enllaçar el llibre amb la biblioteca
                    });
                    return [4 /*yield*/, llibre2.save()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, Llibre.find().populate('biblioteca').exec()];
                case 5:
                    llibres = _a.sent();
                    llibres.forEach(function (llibre) {
                        console.log("El llibre \"".concat(llibre.titol, "\" pertany a la ").concat(llibre.biblioteca.nom));
                    });
                    return [4 /*yield*/, Llibre.aggregate([
                            {
                                $group: {
                                    _id: "$biblioteca",
                                    totalLlibres: { $sum: 1 }
                                }
                            },
                            {
                                $lookup: {
                                    from: "bibliotecas", // Col·lecció de biblioteques
                                    localField: "_id",
                                    foreignField: "_id",
                                    as: "bibliotecaInfo"
                                }
                            }
                        ])];
                case 6:
                    llibresPerBiblioteca = _a.sent();
                    llibresPerBiblioteca.forEach(function (result) {
                        var _a;
                        var bibliotecaNom = ((_a = result.bibliotecaInfo[0]) === null || _a === void 0 ? void 0 : _a.nom) || "Desconeguda";
                        console.log("Biblioteca: ".concat(bibliotecaNom, ", Nombre de llibres: ").concat(result.totalLlibres));
                    });
                    //------------------------------ ELIMINAR ------------------------------
                    return [4 /*yield*/, Llibre.deleteOne({ titol: "Cien años de soledad" })];
                case 7:
                    //------------------------------ ELIMINAR ------------------------------
                    _a.sent();
                    return [4 /*yield*/, Llibre.findOneAndUpdate({ titol: "Don Quijote de la Mancha" }, { biblioteca: biblioteca1._id }, // Actualitzar la biblioteca si cal
                        { new: true })];
                case 8:
                    updateLlibre = _a.sent();
                    console.log("El llibre \"".concat(updateLlibre === null || updateLlibre === void 0 ? void 0 : updateLlibre.titol, "\" ara pertany a la biblioteca ").concat(updateLlibre === null || updateLlibre === void 0 ? void 0 : updateLlibre.biblioteca));
                    return [2 /*return*/];
            }
        });
    });
}
run().catch(function (err) { return console.log(err); });
