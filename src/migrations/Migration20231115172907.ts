import { Migration } from '@mikro-orm/migrations';

export class Migration20231115172907 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "geographic_data_source" ("id" serial primary key, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "category_id" int not null, "source_url" varchar(255) not null, "name" varchar(255) not null);');

    this.addSql('create table "geographic_layer" ("id" serial primary key, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "source_id" int not null, "endpoint" varchar(255) not null, "name" varchar(255) not null);');

    this.addSql('create table "geographic_map" ("id" serial primary key, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "category_id" int not null, "name" varchar(255) not null);');

    this.addSql('create table "geographic_data_source_used_in" ("geographic_data_source_id" int not null, "geographic_map_id" int not null, constraint "geographic_data_source_used_in_pkey" primary key ("geographic_data_source_id", "geographic_map_id"));');

    this.addSql('alter table "geographic_data_source" add constraint "geographic_data_source_category_id_foreign" foreign key ("category_id") references "dashboard_category" ("id") on update cascade;');

    this.addSql('alter table "geographic_layer" add constraint "geographic_layer_source_id_foreign" foreign key ("source_id") references "geographic_data_source" ("id") on update cascade;');

    this.addSql('alter table "geographic_map" add constraint "geographic_map_category_id_foreign" foreign key ("category_id") references "dashboard_category" ("id") on update cascade;');

    this.addSql('alter table "geographic_data_source_used_in" add constraint "geographic_data_source_used_in_geographic_data_source_id_foreign" foreign key ("geographic_data_source_id") references "geographic_data_source" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "geographic_data_source_used_in" add constraint "geographic_data_source_used_in_geographic_map_id_foreign" foreign key ("geographic_map_id") references "geographic_map" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "geographic_layer" drop constraint "geographic_layer_source_id_foreign";');

    this.addSql('alter table "geographic_data_source_used_in" drop constraint "geographic_data_source_used_in_geographic_data_source_id_foreign";');

    this.addSql('alter table "geographic_data_source_used_in" drop constraint "geographic_data_source_used_in_geographic_map_id_foreign";');

    this.addSql('drop table if exists "geographic_data_source" cascade;');

    this.addSql('drop table if exists "geographic_layer" cascade;');

    this.addSql('drop table if exists "geographic_map" cascade;');

    this.addSql('drop table if exists "geographic_data_source_used_in" cascade;');
  }

}
