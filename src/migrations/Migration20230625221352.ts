import { Migration } from '@mikro-orm/migrations';

export class Migration20230625221352 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "medical_worker_id" int null;');
    this.addSql('alter table "user" add constraint "user_medical_worker_id_foreign" foreign key ("medical_worker_id") references "medical_worker" ("id") on update cascade on delete set null;');
    this.addSql('alter table "user" add constraint "user_medical_worker_id_unique" unique ("medical_worker_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop constraint "user_medical_worker_id_foreign";');

    this.addSql('alter table "user" drop constraint "user_medical_worker_id_unique";');
    this.addSql('alter table "user" drop column "medical_worker_id";');
  }

}
