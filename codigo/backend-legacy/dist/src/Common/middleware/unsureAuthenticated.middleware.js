"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnsureAuthenticated = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
let UnsureAuthenticated = class UnsureAuthenticated {
    use(req, res, next) {
        const authToken = req.headers.authorization;
        if (!authToken) {
            res.status(401).json({
                statusCode: 401,
                message: "Something bad happened",
                error: "Unauthorized"
            });
            return;
        }
        let token = "";
        token = authToken.split(" ")[1];
        try {
            const { sub } = jwt.verify(token, process.env.USER_LOGIN_HASH);
            req.id = sub;
            return next();
        }
        catch (err) {
            res.status(401).json({
                statusCode: 401,
                message: "Something bad happened",
                error: "Unauthorized"
            });
            return;
        }
    }
};
UnsureAuthenticated = __decorate([
    (0, common_1.Injectable)()
], UnsureAuthenticated);
exports.UnsureAuthenticated = UnsureAuthenticated;
//# sourceMappingURL=unsureAuthenticated.middleware.js.map