import { Migration } from '@mikro-orm/migrations';

export class Migration20230625215948 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "dashboard_establishments_with_access" ("dashboard_id" int not null, "establishment_id" int not null, constraint "dashboard_establishments_with_access_pkey" primary key ("dashboard_id", "establishment_id"));');

    this.addSql('alter table "dashboard_establishments_with_access" add constraint "dashboard_establishments_with_access_dashboard_id_foreign" foreign key ("dashboard_id") references "dashboard" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "dashboard_establishments_with_access" add constraint "dashboard_establishments_with_access_establishment_id_foreign" foreign key ("establishment_id") references "establishment" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "dashboard_establishments_with_access" cascade;');
  }

}
