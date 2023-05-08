import { Migration } from '@mikro-orm/migrations'

export class Migration20230501233032 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "dashboard" ("id" serial primary key, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "data_source_id" int not null, "metabase_id" int not null, "name" varchar(255) not null);'
    )

    this.addSql(
      'alter table "dashboard" add constraint "dashboard_data_source_id_foreign" foreign key ("data_source_id") references "dashboard_data_source" ("id") on update cascade;'
    )
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "dashboard" cascade;')
  }
}
