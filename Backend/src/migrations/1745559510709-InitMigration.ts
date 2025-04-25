import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1745559510709 implements MigrationInterface {
    name = 'InitMigration1745559510709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User_tbl_2008" DROP CONSTRAINT "DF_83e070c24882ea1a220e4f3145f"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User_tbl_2008" ADD CONSTRAINT "DF_83e070c24882ea1a220e4f3145f" DEFAULT 'Mumbai' FOR "location"`);
    }

}
