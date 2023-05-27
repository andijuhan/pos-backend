"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePassword = exports.hashPassword = exports.createSessionToken = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = 'ini-sangat-rahasia';
const createSessionToken = (userId) => {
    const payload = { userId };
    const option = {
        expiresIn: '30d',
    };
    const token = jsonwebtoken_1.default.sign(payload, secretKey, option);
    return token;
};
exports.createSessionToken = createSessionToken;
const validateSessionToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        return decoded;
    }
    catch (error) {
        console.log('gagal memvalidasi session token : ' + error);
        return null;
    }
};
const hashPassword = async (password) => {
    try {
        // Generate a salt
        const salt = await bcrypt_1.default.genSalt(10);
        // Hash the password with the salt
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        return hashedPassword;
    }
    catch (error) {
        throw error;
    }
};
exports.hashPassword = hashPassword;
const validatePassword = async (plainPassword, hashedPassword) => {
    try {
        // Compare the provided password with the hashed password
        const isMatch = await bcrypt_1.default.compare(plainPassword, hashedPassword);
        return isMatch;
    }
    catch (error) {
        throw error;
    }
};
exports.validatePassword = validatePassword;
//# sourceMappingURL=index.js.map