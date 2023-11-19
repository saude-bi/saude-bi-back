import { Migration } from '@mikro-orm/migrations';

export class Migration20231119194043 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "geographic_layer" add column "establishment_property_name" varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "geographic_layer" drop column "establishment_property_name";');
  }

}
