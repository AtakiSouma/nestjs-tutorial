import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserPhone1715451209493 implements MigrationInterface {
    name = 'AddUserPhone1715451209493'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

}
