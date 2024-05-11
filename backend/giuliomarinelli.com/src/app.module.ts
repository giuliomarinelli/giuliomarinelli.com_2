import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configurations } from './config/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUserModule } from './nest_modules/auth-user/auth-user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [...configurations],
      isGlobal: true,
      envFilePath: ['development.env']
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configSvc: ConfigService) => configSvc.get('DB'),
      inject: [ConfigService]
    }),
    AuthUserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
