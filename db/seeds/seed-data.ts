import { faker } from "@faker-js/faker";
import { User } from "src/users/entities/user.entity";
import { EntityManager } from "typeorm";
import * as bcrypt from "bcrypt"
import { Artist } from "src/artists/entities/artist.entity";
import { Playlist } from "src/playlist/entities/playlist.entity";

export const seedData = async (manager: EntityManager): Promise<void> => {
    //1
    // Add your seeding logic here using the manager
    // For example:
    await seedUser();
    await seedArtist();
    await seedPlayLists();
    //2
    async function seedUser() {
        //2
        const salt = await bcrypt.genSalt();
        const encryptedPassword = await bcrypt.hash("123456", salt);
        const user = new User();
        user.firstName = faker.person.firstName();
        user.lastName = faker.person.lastName();
        user.email = faker.internet.email();
        user.password = encryptedPassword;
        await manager.getRepository(User).save(user);

    }

    async function seedArtist() {
        const salt = await bcrypt.genSalt();
        const encryptedPassword = await bcrypt.hash("123456", salt);
        const user = new User();
        user.firstName = faker.person.firstName();
        user.lastName = faker.person.lastName();
        user.email = faker.internet.email();
        user.password = encryptedPassword;
        const artist = new Artist();
        artist.user = user;
        await manager.getRepository(User).save(user);
        await manager.getRepository(Artist).save(artist);
    }
    async function seedPlayLists() {
        const salt = await bcrypt.genSalt();
        const encryptedPassword = await bcrypt.hash("123456", salt);
        const user = new User();
        user.firstName = faker.person.firstName();
        user.lastName = faker.person.lastName();
        user.email = faker.internet.email();
        user.password = encryptedPassword;
        const playList = new Playlist();
        playList.name = faker.music.genre();
        playList.user = user;
        await manager.getRepository(User).save(user);
        await manager.getRepository(Playlist).save(playList);
    }
} 