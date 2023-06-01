import { Migration } from '@mikro-orm/migrations';

export class Migration20230601025910 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "occupation_category" ("id" serial primary key, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "name" varchar(255) not null);');

    this.addSql('alter table "occupation" add column "category_id" int not null;');
    this.addSql('alter table "occupation" add constraint "occupation_category_id_foreign" foreign key ("category_id") references "occupation_category" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "occupation" drop constraint "occupation_category_id_foreign";');

    this.addSql('drop table if exists "occupation_category" cascade;');

    this.addSql('alter table "occupation" drop column "category_id";');
  }

}
