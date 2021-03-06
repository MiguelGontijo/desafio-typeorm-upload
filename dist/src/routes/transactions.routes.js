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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var typeorm_1 = require("typeorm");
var multer_1 = __importDefault(require("multer"));
var TransactionsRepository_1 = __importDefault(require("../repositories/TransactionsRepository"));
var CreateTransactionService_1 = __importDefault(require("../services/CreateTransactionService"));
var DeleteTransactionService_1 = __importDefault(require("../services/DeleteTransactionService"));
var ImportTransactionsService_1 = __importDefault(require("../services/ImportTransactionsService"));
var upload_1 = __importDefault(require("../config/upload"));
var transactionsRouter = express_1.Router();
var upload = multer_1.default(upload_1.default);
transactionsRouter.get('/', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var transactionsRepository, transactions, balance;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                transactionsRepository = typeorm_1.getCustomRepository(TransactionsRepository_1.default);
                return [4 /*yield*/, transactionsRepository.find()];
            case 1:
                transactions = _a.sent();
                return [4 /*yield*/, transactionsRepository.getBalance()];
            case 2:
                balance = _a.sent();
                return [2 /*return*/, response.status(200).json({ transactions: transactions, balance: balance })];
        }
    });
}); });
transactionsRouter.post('/', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, value, type, category, newTransaction, transaction;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, title = _a.title, value = _a.value, type = _a.type, category = _a.category;
                newTransaction = new CreateTransactionService_1.default();
                return [4 /*yield*/, newTransaction.execute({
                        title: title,
                        value: value,
                        type: type,
                        categoryTitle: category,
                    })];
            case 1:
                transaction = _b.sent();
                return [2 /*return*/, response.status(200).json(transaction)];
        }
    });
}); });
transactionsRouter.delete('/:id', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, transactionsService;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = request.params.id;
                transactionsService = new DeleteTransactionService_1.default();
                return [4 /*yield*/, transactionsService.execute(id)];
            case 1:
                _a.sent();
                return [2 /*return*/, response.status(204).send()];
        }
    });
}); });
transactionsRouter.post('/import', upload.single('file'), function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var importTransactions, transactions;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                importTransactions = new ImportTransactionsService_1.default();
                return [4 /*yield*/, importTransactions.execute(request.file.path)];
            case 1:
                transactions = _a.sent();
                return [2 /*return*/, response.status(200).json(transactions)];
        }
    });
}); });
exports.default = transactionsRouter;
