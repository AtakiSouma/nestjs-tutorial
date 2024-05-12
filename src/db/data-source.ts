import { DataSource, DataSourceOptions } from "typeorm";
export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: "localhost",
    port: 5430,
    username: "postgres",
    password: "01685835912nam",
    database: "song",
    entities: ["dist/**/*.entity.js"], //1
    synchronize: false, // 2
    migrations: ["dist/db/migrations/*.js"], // 3
};
const dataSource = new DataSource(dataSourceOptions); //4
export default dataSource;
