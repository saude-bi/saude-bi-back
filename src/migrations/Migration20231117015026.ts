import { Migration } from '@mikro-orm/migrations';

export class Migration20231117015026 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "geographic_layer_used_in" ("geographic_layer_id" int not null, "geographic_map_id" int not null, constraint "geographic_layer_used_in_pkey" primary key ("geographic_layer_id", "geographic_map_id"));');

    this.addSql('alter table "geographic_layer_used_in" add constraint "geographic_layer_used_in_geographic_layer_id_foreign" foreign key ("geographic_layer_id") references "geographic_layer" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "geographic_layer_used_in" add constraint "geographic_layer_used_in_geographic_map_id_foreign" foreign key ("geographic_map_id") references "geographic_map" ("id") on update cascade on delete cascade;');

    this.addSql('drop table if exists "geographic_data_source_used_in" cascade;');
  }

  async down(): Promise<void> {
    this.addSql('create table "geographic_data_source_used_in" ("geographic_data_source_id" int not null, "geographic_map_id" int not null, constraint "geographic_data_source_used_in_pkey" primary key ("geographic_data_source_id", "geographic_map_id"));');

    this.addSql('alter table "geographic_data_source_used_in" add constraint "geographic_data_source_used_in_geographic_data_source_id_foreign" foreign key ("geographic_data_source_id") references "geographic_data_source" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "geographic_data_source_used_in" add constraint "geographic_data_source_used_in_geographic_map_id_foreign" foreign key ("geographic_map_id") references "geographic_map" ("id") on update cascade on delete cascade;');

    this.addSql('drop table if exists "geographic_layer_used_in" cascade;');
  }

}
