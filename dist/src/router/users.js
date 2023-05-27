"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../controller/users");
const middlewares_1 = require("../middlewares");
exports.default = (router) => {
    router.get('/users', middlewares_1.isAuthenticated, users_1.getAllUsers);
};
//# sourceMappingURL=users.js.map