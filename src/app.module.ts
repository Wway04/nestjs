import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import typeorm from './config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        console.log(configService, 'configService');
        console.log(configService.get('DB_HOST'), 'configService.get("DB_HOST")');
        console.log(configService.get('DB_PORT'), 'configService.get("DB_PORT")');
        console.log(configService.get('DB_USERNAME'), 'configService.get("DB_USERNAME")');
        console.log(configService.get('DB_PASSWORD'), 'configService.get("DB_PASSWORD")');
        console.log(configService.get('DB_NAME'), 'configService.get("DB_NAME")');
        return configService.get('typeorm');
      }
    }),
    UsersModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
