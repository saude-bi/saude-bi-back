import { Migration } from '@mikro-orm/migrations';

export class Migration20231120002651 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "geographic_data_source" drop constraint "geographic_data_source_category_id_foreign";');

    this.addSql('alter table "geographic_data_source" drop column "category_id";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "geographic_data_source" add column "category_id" int not null;');
    this.addSql('alter table "geographic_data_source" add constraint "geographic_data_source_category_id_foreign" foreign key ("category_id") references "dashboard_category" ("id") on update cascade;');
  }

}
