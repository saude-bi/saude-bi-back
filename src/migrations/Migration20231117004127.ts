import { Migration } from '@mikro-orm/migrations';

export class Migration20231117004127 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "geographic_map_establishments_with_access" ("geographic_map_id" int not null, "establishment_id" int not null, constraint "geographic_map_establishments_with_access_pkey" primary key ("geographic_map_id", "establishment_id"));');

    this.addSql('alter table "geographic_map_establishments_with_access" add constraint "geographic_map_establishments_with_access_geograp_c4c68_foreign" foreign key ("geographic_map_id") references "geographic_map" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "geographic_map_establishments_with_access" add constraint "geographic_map_establishments_with_access_establi_57aca_foreign" foreign key ("establishment_id") references "establishment" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "geographic_map_establishments_with_access" cascade;');
  }

}
