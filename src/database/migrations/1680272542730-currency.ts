import { MigrationInterface, QueryRunner } from "typeorm"

export class currency1680272542730 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS "currency" (
                "id" serial PRIMARY KEY, 
                "code" VARCHAR(255) UNIQUE NOT NULL, 
                "title" VARCHAR(255) NOT NULL, 
                "buying_rate" NUMERIC(5,2) NOT NULL, 
                "selling_rate" NUMERIC(5,2) NOT NULL
            )`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "currency"`);
    }

}
