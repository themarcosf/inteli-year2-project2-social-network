"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const helmet_1 = require("helmet");
const cookieParser = require("cookie-parser");
const common_1 = require("@nestjs/common");
(async function () {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.use((0, helmet_1.default)());
    app.use(cookieParser());
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true, whitelist: true }));
    await app.listen(5500);
    console.log(`Application is running on: ${await app.getUrl()}`);
})();
//# sourceMappingURL=main.js.map