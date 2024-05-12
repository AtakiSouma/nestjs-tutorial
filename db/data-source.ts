import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import {  DataSourceOptions } from "typeorm";
export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (
        configService: ConfigService
    ): Promise<TypeOrmModuleOptions> => {
        console.log("host", configService.get<string>("dbHost"))
        console.log("port", configService.get<number>("dbPort"));
        return {
            type: "postgres",
            host: configService.get<string>("dbHost"),
            port: configService.get<number>("dbPort"),
            username: configService.get<string>("username"),
            database: configService.get<string>("dbName"),
            password: configService.get<string>("password"),
            entities: ["dist/**/*.entity.js"],
            synchronize: false,
            migrations: ["dist/db/migrations/*.js"],
        };
    },
};
export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.USERNAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    entities: ["dist/**/*.entity.js"],
    synchronize: false,
    migrations: ["dist/db/migrations/*.js"],
};
