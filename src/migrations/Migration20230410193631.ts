import { Migration } from '@mikro-orm/migrations';

export class Migration20230410193631 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "establishment" ("cnes" varchar(255) not null, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "name" varchar(255) not null, constraint "establishment_pkey" primary key ("cnes"));');

    this.addSql('alter table "user" drop constraint "user_username_unique";');
    this.addSql('alter table "user" drop constraint "user_pkey";');
    this.addSql('alter table "user" drop column "id";');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("username");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "establishment" cascade;');

    this.addSql('alter table "user" add column "id" varchar(255) not null;');
    this.addSql('alter table "user" drop constraint "user_pkey";');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("id");');
  }

}
