import { Migration } from '@mikro-orm/migrations';

export class Migration20230629042439 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "directorship" ("id" serial primary key, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "name" varchar(255) not null, "acronym" varchar(255) not null);');

    this.addSql('alter table "establishment" add column "directorship_id" int not null;');
    this.addSql('alter table "establishment" add constraint "establishment_directorship_id_foreign" foreign key ("directorship_id") references "directorship" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "establishment" drop constraint "establishment_directorship_id_foreign";');

    this.addSql('drop table if exists "directorship" cascade;');

    this.addSql('alter table "establishment" drop column "directorship_id";');
  }

}
