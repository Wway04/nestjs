import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameNameColumnToUsernameColumn1772524912294 implements MigrationInterface {
    name = 'RenameNameColumnToUsernameColumn1772524912294'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "name" TO "username"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "username" TO "name"`);
    }

}
