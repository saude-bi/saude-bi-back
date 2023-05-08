import { Migration } from '@mikro-orm/migrations'

export class Migration20230501231012 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "dashboard_data_source" ("id" serial primary key, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "name" varchar(255) not null, "url" varchar(255) not null);'
    )

    this.addSql('alter table "establishment" add column "id" serial;')
    this.addSql('alter table "establishment" drop constraint "establishment_pkey";')
    this.addSql('create index "establishment_cnes_index" on "establishment" ("cnes");')
    this.addSql(
      'alter table "establishment" add constraint "establishment_cnes_unique" unique ("cnes");'
    )
    this.addSql(
      'alter table "establishment" add constraint "establishment_pkey" primary key ("id");'
    )

    this.addSql('alter table "user" add column "id" serial;')
    this.addSql('alter table "user" drop constraint "user_pkey";')
    this.addSql('create index "user_username_index" on "user" ("username");')
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");')
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("id");')
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "dashboard_data_source" cascade;')

    this.addSql('drop index "establishment_cnes_index";')
    this.addSql('alter table "establishment" drop constraint "establishment_cnes_unique";')
    this.addSql('alter table "establishment" drop constraint "establishment_pkey";')
    this.addSql('alter table "establishment" drop column "id";')
    this.addSql(
      'alter table "establishment" add constraint "establishment_pkey" primary key ("cnes");'
    )

    this.addSql('drop index "user_username_index";')
    this.addSql('alter table "user" drop constraint "user_username_unique";')
    this.addSql('alter table "user" drop constraint "user_pkey";')
    this.addSql('alter table "user" drop column "id";')
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("username");')
  }
}
