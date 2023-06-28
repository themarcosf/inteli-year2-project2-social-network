import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import helmet from "helmet";
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";
////////////////////////////////////////////////////////////////////////////////

/** bootstrap project */
(async function () {
  /** instantiate new project */
  const app = await NestFactory.create(AppModule, { cors: true });

  /** generic middleware */
  app.use(helmet());
  app.use(cookieParser());

  /** empty global validation pipe; configured at handler level */
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  /** start server listener */
  await app.listen(5500);
  console.log(`Application is running on: ${await app.getUrl()}`);
})();
