import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './entity/songs.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/entities/artist.entity';

@Injectable()
export class SongsService {
    constructor(
        @InjectRepository(Song)
        private songRepository: Repository<Song>,
        @InjectRepository(Artist)
        private artistRepository: Repository<Artist>,
    ) {

    }
    // local DB
    // local array

    async create(songDTO: CreateSongDto): Promise<Song> {
        const song = new Song();
        song.title = songDTO.title;
        song.artists = songDTO.artists;
        song.duration = songDTO.duration;
        song.lyrics = songDTO.lyrics;
        song.releasedDate = songDTO.releasedDate;
        const artists = await this.artistRepository.findByIds(songDTO.artists);
        song.artists = artists;
        return await this.songRepository.save(song);
    }
    findAll(): Promise<Song[]> {
        return this.songRepository.find();
    }
    findOne(id: number): Promise<Song> {
        return this.songRepository.findOneBy({ id });
    }
    async remove(id: number): Promise<void> {
        await this.songRepository.delete(id);
    }
    update(id: number, recordToUpdate: UpdateSongDto): Promise<UpdateResult> {
        return this.songRepository.update(id, recordToUpdate);
    }
    async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
        const queryBuilder = this.songRepository.createQueryBuilder('c');
        queryBuilder.orderBy('c.releasedDate', 'DESC');
        return paginate<Song>(queryBuilder, options);
    }






}
