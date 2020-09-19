import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1600285058624 implements MigrationInterface {
  name = 'Migration1600285058624';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "loan_config" ("id" SERIAL NOT NULL, "systemName" character varying(255) NOT NULL, "name" character varying(255) NOT NULL, "description" text NOT NULL, "interest" double precision NOT NULL, CONSTRAINT "UQ_a38dcc64226e85059235b706bce" UNIQUE ("systemName"), CONSTRAINT "PK_2c55108fc6117959d1309855a10" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "loan_config"`);
  }
}
