import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.module';
import { SongsController } from './songs/songs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ArtistsModule } from './artists/artists.module';
import { UsersModule } from './users/users.module';
import { PlaylistModule } from './playlist/playlist.module';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validate } from "env.validation";
import { dataSourceOptions } from './db/data-source';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5430,
    //   username: 'postgres',
    //   password: '01685835912nam',
    //   database: 'song',
    //   synchronize: true,
    //   entities: [Song,Artist,User,Playlist],

    // })
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${process.cwd()}/.env.${process.env.NODE_ENV}`],
      load: [configuration],
      validate: validate,
    }),

    // TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    TypeOrmModule.forRoot(dataSourceOptions)
    ,

    SongsModule,

    ArtistsModule,

    UsersModule,

    PlaylistModule,

    AuthModule,

    SeedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
// implements NestModule {
//   constructor(private dataSource: DataSource) {
//     console.log(dataSource.driver.database);
//   }
//   configure(consumer: MiddlewareConsumer) {
//     // consumer.apply(LoggerMiddleware).forRoutes('songs'); // option no 1
//     // consumer
//     // .apply(LoggerMiddleware)
//     // .forRoutes({ path: 'songs', method: RequestMethod.POST }); //option no 2
//     consumer.apply(LoggerMiddleware).forRoutes(SongsController); //option no 3
//   }
// }
