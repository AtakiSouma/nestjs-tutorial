import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistRepo: Repository<Artist>
  ) { }
  findArtist(userId: number): Promise<Artist> {
    return this.artistRepo.findOneBy({ user: { id: userId } });
  }
  create(createArtistDto: CreateArtistDto) {
    return createArtistDto;
  }

  findAll() {
    return `This action returns all artists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} artist`;
  }

  update(id: number, updateArtistDto: UpdateArtistDto) {
    return `This action updates a #${id} artist ${updateArtistDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} artist`;
  }
}
