import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { Dialect } from 'sequelize';
import { CarModel } from 'src/models/car.model';
import { RoleModel } from 'src/models/role.model';
import { UserModel } from 'src/models/user.model';
import { CarModule } from 'src/modules/car/car.module';
import { FileUploadModule } from 'src/modules/file-upload/file-upload.module';
import { UserRolesModel } from 'src/modules/user/user-roles.model';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';
import { CarTypeModule } from './modules/car-type/car-type.module';
import { CarTypeModel } from './modules/car-type/entities/car-type.entity';
import { FileModel } from './models/file.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres' as Dialect,
      username: process.env.DB_USER,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
      models: [
        UserModel,
        RoleModel,
        UserRolesModel,
        CarModel,
        CarTypeModel,
        FileModel,
      ],
      autoLoadModels: true,
    }),
    UserModule,
    RoleModule,
    AuthModule,
    CarModule,
    FileUploadModule,
    CarTypeModule,
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '..', 'upload'),
      exclude: ['/api'],
      serveStaticOptions: {
        index: false,
      },
    }),
    CarTypeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
