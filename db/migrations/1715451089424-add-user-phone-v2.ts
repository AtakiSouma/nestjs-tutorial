import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserPhoneV21715451089424 implements MigrationInterface {
    name = 'AddUserPhoneV21715451089424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

}
