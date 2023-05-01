import { Migration } from '@mikro-orm/migrations';

export class Migration20230501234417 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "category" ("id" serial primary key, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "name" varchar(255) not null);');

    this.addSql('alter table "dashboard" add column "category_id" int not null;');
    this.addSql('alter table "dashboard" add constraint "dashboard_category_id_foreign" foreign key ("category_id") references "category" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "dashboard" drop constraint "dashboard_category_id_foreign";');

    this.addSql('drop table if exists "category" cascade;');

    this.addSql('alter table "dashboard" drop column "category_id";');
  }

}
