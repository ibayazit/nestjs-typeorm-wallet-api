import { MigrationInterface, QueryRunner } from "typeorm"

export class processlog1680272869176 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS "processlog" (
                "id" serial PRIMARY KEY, 
                "process" VARCHAR(255) NOT NULL, 
                "user_id" INT NOT NULL, 
                "currency_id" INT NOT NULL, 
                "amount" NUMERIC(10,2) NOT NULL, 
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "FK_processlog_user_id" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_processlog_currency_id" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE CASCADE
            )`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "processlog"`);
    }

}
