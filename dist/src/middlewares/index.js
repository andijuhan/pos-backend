"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const lodash_1 = require("lodash");
const prisma_1 = __importDefault(require("../../prisma/prisma"));
const isAuthenticated = async (req, res, next) => {
    try {
        const sessionToken = req.cookies['APP-AUTH'];
        if (!sessionToken) {
            return res.sendStatus(403);
        }
        const existingUser = await prisma_1.default.users.findFirst({
            where: {
                sessionToken,
            },
        });
        if (!existingUser) {
            return res.sendStatus(403);
        }
        (0, lodash_1.merge)(req, { identity: existingUser });
        return next();
    }
    catch (error) {
        console.log(error);
    }
};
exports.isAuthenticated = isAuthenticated;
//# sourceMappingURL=index.js.map