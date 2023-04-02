import { MigrationInterface, QueryRunner } from "typeorm"

export class user1680271620428 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS "user" (
                "id" serial PRIMARY KEY, 
                "first_name" VARCHAR(255) NOT NULL, 
                "last_name" VARCHAR(255) NOT NULL, 
                "email" VARCHAR(255) UNIQUE NOT NULL, 
                "password" VARCHAR(255) NOT NULL, 
                "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
                "updated_at" TIMESTAMP NOT NULL DEFAULT now()
            )`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "user"`);
    }
}
