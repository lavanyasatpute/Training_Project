import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1745898885351 implements MigrationInterface {
    name = 'NewMigration1745898885351'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Event_tbl" DROP COLUMN "Title"`);
        await queryRunner.query(`ALTER TABLE "Event_tbl" ADD "Title" varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Event_tbl" DROP COLUMN "Location"`);
        await queryRunner.query(`ALTER TABLE "Event_tbl" ADD "Location" varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Event_tbl" DROP COLUMN "Categories"`);
        await queryRunner.query(`ALTER TABLE "Event_tbl" ADD "Categories" varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Event_tbl" DROP CONSTRAINT "DF_452d07c0f0bb8b8ef7f9c43db6b"`);
        await queryRunner.query(`ALTER TABLE "Event_tbl" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "Event_tbl" ADD "createdAt" datetime NOT NULL CONSTRAINT "DF_452d07c0f0bb8b8ef7f9c43db6b" DEFAULT Tue Apr 29 2025 09:24:49 GMT+0530 (India Standard Time)`);
        await queryRunner.query(`ALTER TABLE "Event_tbl" DROP CONSTRAINT "DF_4d4122912624e69f02815c0e095"`);
        await queryRunner.query(`ALTER TABLE "Event_tbl" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "Event_tbl" ADD "updatedAt" datetime NOT NULL CONSTRAINT "DF_4d4122912624e69f02815c0e095" DEFAULT getdate()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Event_tbl" DROP CONSTRAINT "DF_4d4122912624e69f02815c0e095"`);
        await queryRunner.query(`ALTER TABLE "Event_tbl" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "Event_tbl" ADD "updatedAt" datetime2 NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Event_tbl" ADD CONSTRAINT "DF_4d4122912624e69f02815c0e095" DEFAULT getdate() FOR "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "Event_tbl" DROP CONSTRAINT "DF_452d07c0f0bb8b8ef7f9c43db6b"`);
        await queryRunner.query(`ALTER TABLE "Event_tbl" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "Event_tbl" ADD "createdAt" datetime2 NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Event_tbl" ADD CONSTRAINT "DF_452d07c0f0bb8b8ef7f9c43db6b" DEFAULT getdate() FOR "createdAt"`);
        await queryRunner.query(`ALTER TABLE "Event_tbl" DROP COLUMN "Categories"`);
        await queryRunner.query(`ALTER TABLE "Event_tbl" ADD "Categories" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Event_tbl" DROP COLUMN "Location"`);
        await queryRunner.query(`ALTER TABLE "Event_tbl" ADD "Location" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Event_tbl" DROP COLUMN "Title"`);
        await queryRunner.query(`ALTER TABLE "Event_tbl" ADD "Title" nvarchar(255) NOT NULL`);
    }

}
