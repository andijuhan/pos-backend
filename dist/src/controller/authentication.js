"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const prisma_1 = __importDefault(require("../../prisma/prisma"));
const helpers_1 = require("../helpers");
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.sendStatus(400);
        }
        const user = await prisma_1.default.users.findFirst({
            where: {
                email,
            },
        });
        if (!user) {
            return res.sendStatus(400);
        }
        const isPasswordMatch = await (0, helpers_1.validatePassword)(password, user.password);
        if (!isPasswordMatch) {
            console.log(isPasswordMatch);
            return res.sendStatus(403);
        }
        const sessionToken = (0, helpers_1.createSessionToken)(email);
        await prisma_1.default.users.update({
            where: {
                email,
            },
            data: {
                sessionToken,
            },
        });
        res.cookie('APP-AUTH', sessionToken, {
            domain: 'localhost',
            path: '/',
        });
        return res.status(200).json({ message: 'berhasil login' }).end();
    }
    catch (error) {
        console.log(error);
    }
};
exports.login = login;
const register = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.sendStatus(400);
        }
        const existingUser = await prisma_1.default.users.findFirst({
            where: {
                email: email,
            },
        });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: 'username already exist' })
                .end();
        }
        const user = await prisma_1.default.users.create({
            data: {
                username: username,
                email: email,
                password: await (0, helpers_1.hashPassword)(password),
            },
        });
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.register = register;
//# sourceMappingURL=authentication.js.map