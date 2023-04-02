import { MigrationInterface, QueryRunner } from "typeorm"

export class wallet1680272542731 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS "wallet" (
                "id" serial PRIMARY KEY, 
                "user_id" INT NOT NULL, 
                "currency_id" INT NOT NULL, 
                "balance" NUMERIC(10,2) NOT NULL, 
                "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "FK_wallet_user_id" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_wallet_currency_id" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE CASCADE
            )`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "wallet"`);
    }

}
