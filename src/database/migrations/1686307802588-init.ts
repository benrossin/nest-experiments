import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1686307802588 implements MigrationInterface {
    name = 'Init1686307802588'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reset_password" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "resetToken" character varying NOT NULL, "expirationDate" TIMESTAMP NOT NULL, "isConsumed" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_82bffbeb85c5b426956d004a8f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying, "avatar" character varying, "firstName" character varying, "lastName" character varying, "email" character varying NOT NULL, "password" character varying, "googleId" character varying, "refreshToken" character varying, "isActive" boolean NOT NULL DEFAULT true, "stripeCustomerId" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'USER', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_03585d421deb10bbc326fffe4c1" UNIQUE ("refreshToken"), CONSTRAINT "UQ_0bfe583759eb0305b60117be840" UNIQUE ("stripeCustomerId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "parcours_theme_profile_translations" ("parcoursThemeProfileId" uuid NOT NULL, "localeId" uuid NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_234e1efc150ee7d52596fb0b6a9" PRIMARY KEY ("parcoursThemeProfileId", "localeId"))`);
        await queryRunner.query(`CREATE TABLE "parcours_theme_profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "percent" integer NOT NULL, "thumbnail" character varying NOT NULL, "themeId" uuid, CONSTRAINT "PK_054d266cf9c0807ef2d3c8fd364" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "parcours_theme" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "pathStyles" character varying NOT NULL, CONSTRAINT "PK_59d27ea7a4629b95ac709531857" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "parcours" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "thumbnail" character varying NOT NULL, "place" character varying NOT NULL, "time" integer NOT NULL, "isPublished" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "parcoursThemeId" uuid, CONSTRAINT "PK_00109816d3aa823b73fbae38a30" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "parcours_translations" ("parcoursId" uuid NOT NULL, "localeId" uuid NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_de85dee7d0de61c3e0f13d23a72" PRIMARY KEY ("parcoursId", "localeId"))`);
        await queryRunner.query(`CREATE TABLE "locale" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "code" character varying NOT NULL, "isDefault" boolean NOT NULL, "flagIcon" character varying NOT NULL, CONSTRAINT "PK_4b7a3ebe8ec48f1bb2c4b80e349" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reset_password" ADD CONSTRAINT "FK_6315a559e0b7920bdbdf142e306" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parcours_theme_profile_translations" ADD CONSTRAINT "FK_cea9fe8fe402884533072aa64f2" FOREIGN KEY ("parcoursThemeProfileId") REFERENCES "parcours_theme_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parcours_theme_profile_translations" ADD CONSTRAINT "FK_0eb8e0cfd507ae3193dffa18b0e" FOREIGN KEY ("localeId") REFERENCES "locale"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parcours_theme_profile" ADD CONSTRAINT "FK_72991d354463b212f96fb36346d" FOREIGN KEY ("themeId") REFERENCES "parcours_theme"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parcours" ADD CONSTRAINT "FK_9d11e4ff60f2db583e028efe96b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parcours" ADD CONSTRAINT "FK_12353a1732fd77a0705c6be52eb" FOREIGN KEY ("parcoursThemeId") REFERENCES "parcours_theme"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parcours_translations" ADD CONSTRAINT "FK_8449540e03fe97bdd33cdf81514" FOREIGN KEY ("parcoursId") REFERENCES "parcours"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "parcours_translations" ADD CONSTRAINT "FK_66bf4958cb0b3a33918b6ff5368" FOREIGN KEY ("localeId") REFERENCES "locale"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parcours_translations" DROP CONSTRAINT "FK_66bf4958cb0b3a33918b6ff5368"`);
        await queryRunner.query(`ALTER TABLE "parcours_translations" DROP CONSTRAINT "FK_8449540e03fe97bdd33cdf81514"`);
        await queryRunner.query(`ALTER TABLE "parcours" DROP CONSTRAINT "FK_12353a1732fd77a0705c6be52eb"`);
        await queryRunner.query(`ALTER TABLE "parcours" DROP CONSTRAINT "FK_9d11e4ff60f2db583e028efe96b"`);
        await queryRunner.query(`ALTER TABLE "parcours_theme_profile" DROP CONSTRAINT "FK_72991d354463b212f96fb36346d"`);
        await queryRunner.query(`ALTER TABLE "parcours_theme_profile_translations" DROP CONSTRAINT "FK_0eb8e0cfd507ae3193dffa18b0e"`);
        await queryRunner.query(`ALTER TABLE "parcours_theme_profile_translations" DROP CONSTRAINT "FK_cea9fe8fe402884533072aa64f2"`);
        await queryRunner.query(`ALTER TABLE "reset_password" DROP CONSTRAINT "FK_6315a559e0b7920bdbdf142e306"`);
        await queryRunner.query(`DROP TABLE "locale"`);
        await queryRunner.query(`DROP TABLE "parcours_translations"`);
        await queryRunner.query(`DROP TABLE "parcours"`);
        await queryRunner.query(`DROP TABLE "parcours_theme"`);
        await queryRunner.query(`DROP TABLE "parcours_theme_profile"`);
        await queryRunner.query(`DROP TABLE "parcours_theme_profile_translations"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "reset_password"`);
    }

}
