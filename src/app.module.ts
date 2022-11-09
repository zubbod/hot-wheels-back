import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { CarModel } from 'src/models/car.model';
import { RoleModel } from 'src/models/role.model';
import { UserModel } from 'src/models/user.model';
import { CarModule } from 'src/modules/car/car.module';
import { FileUploadModule } from 'src/modules/file-upload/file-upload.module';
import { UserRolesModel } from 'src/modules/user/user-roles.model';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      models: [UserModel, RoleModel, UserRolesModel, CarModel],
      autoLoadModels: true,
    }),
    UserModule,
    RoleModule,
    AuthModule,
    CarModule,
    FileUploadModule,
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '..', 'upload'),
      exclude: ['/api'],
      serveStaticOptions: {
        index: false,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
