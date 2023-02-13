"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseProvider = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const common_1 = require("@nestjs/common");
let FirebaseProvider = class FirebaseProvider {
    constructor() { }
    initializeApp(instance) {
        firebase_admin_1.default.initializeApp({
            credential: firebase_admin_1.default.credential.cert(instance.accessData),
            databaseURL: instance.databaseURL,
        });
    }
    loggedByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const DecodedIdToken = yield firebase_admin_1.default.auth().verifyIdToken(token);
                return DecodedIdToken.uid;
            }
            catch (error) {
                throw new Error("Error verifying logged by token - Check logs");
            }
        });
    }
    createSessionToken(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return firebase_admin_1.default.auth().createCustomToken(uid);
            }
            catch (error) {
                throw new Error("Error creating session token - Check logs");
            }
        });
    }
    getAccount(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const account = yield firebase_admin_1.default.auth().getUserByEmail(email);
                return account;
            }
            catch (error) {
                throw new Error("Error by getting account - Check logs");
            }
        });
    }
    createAccount(accountDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield firebase_admin_1.default.auth().createUser({
                    disabled: false,
                    email: accountDetails.email,
                    password: accountDetails.psw,
                    displayName: accountDetails.name,
                });
                return newUser;
            }
            catch (error) {
                throw new Error("Error by create account - Check logs");
            }
        });
    }
    deleteAccount(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield firebase_admin_1.default.auth().deleteUser(uid);
                return true;
            }
            catch (error) {
                throw new Error("Error by delete account - Check logs");
            }
        });
    }
};
FirebaseProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FirebaseProvider);
exports.FirebaseProvider = FirebaseProvider;
