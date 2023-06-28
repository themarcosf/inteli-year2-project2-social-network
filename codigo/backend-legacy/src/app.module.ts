import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { ProjectsModule } from './modules/projects/projects.module';
import { UsersModule } from './modules/users/users.module';
import { UnsureAuthenticated } from './Common/middleware/unsureAuthenticated.middleware';
import { UnsureAdmin } from './Common/middleware/unsureAdmin.middleware';
import { ApplyModule } from './modules/apply/apply.module';
import { HealthController } from './modules/health/health.controller';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ProjectsModule, UsersModule, ApplyModule, AuthModule],
  controllers: [HealthController],
  providers: [],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UnsureAdmin)
      .forRoutes(
        { path: 'User/delete/:id', method: RequestMethod.DELETE },
      );
  }
}
