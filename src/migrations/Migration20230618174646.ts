import { Migration } from '@mikro-orm/migrations';

export class Migration20230618174646 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "medical_worker" drop constraint "medical_worker_user_id_foreign";');

    this.addSql('alter table "user" alter column "is_admin" type boolean using ("is_admin"::boolean);');
    this.addSql('alter table "user" alter column "is_admin" set default false;');

    this.addSql('alter table "medical_worker" alter column "user_id" type int using ("user_id"::int);');
    this.addSql('alter table "medical_worker" alter column "user_id" drop not null;');
    this.addSql('alter table "medical_worker" add constraint "medical_worker_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "medical_worker" drop constraint "medical_worker_user_id_foreign";');

    this.addSql('alter table "user" alter column "is_admin" drop default;');
    this.addSql('alter table "user" alter column "is_admin" type boolean using ("is_admin"::boolean);');

    this.addSql('alter table "medical_worker" alter column "user_id" type int using ("user_id"::int);');
    this.addSql('alter table "medical_worker" alter column "user_id" set not null;');
    this.addSql('alter table "medical_worker" add constraint "medical_worker_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
  }

}
