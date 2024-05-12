import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './entity/songs.entity';
import { Artist } from 'src/artists/entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Song,Artist])],
  controllers: [SongsController],
  providers: [SongsService],
  exports: [SongsService]
})
export class SongsModule { }
