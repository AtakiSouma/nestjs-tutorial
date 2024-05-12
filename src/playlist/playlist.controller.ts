import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { CreatePlayListDto } from './dto/create-playlist.dto';
import { Playlist } from './entities/playlist.entity';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) { }

  @Post()
  create(
    @Body()
    playlistDTO: CreatePlayListDto
  ): Promise<Playlist> {
    return this.playlistService.create(playlistDTO);
  }

  @Get()
  findAll() {
    return this.playlistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    return this.playlistService.update(+id, updatePlaylistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistService.remove(+id);
  }
}
