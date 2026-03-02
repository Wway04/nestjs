import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeletedAtColumn1772433532601 implements MigrationInterface {
    name = 'AddDeletedAtColumn1772433532601'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedAt"`);
    }

}
