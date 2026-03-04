import { MigrationInterface, QueryRunner } from "typeorm";

export class AuthFeature1772590120355 implements MigrationInterface {
    name = 'AuthFeature1772590120355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "salt" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "salt"`);
    }

}
