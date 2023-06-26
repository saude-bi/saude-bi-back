import { Migration } from '@mikro-orm/migrations';

export class Migration20230626013034 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "dashboard" alter column "establishment_property_name" type varchar(255) using ("establishment_property_name"::varchar(255));');
    this.addSql('alter table "dashboard" alter column "establishment_property_name" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "dashboard" alter column "establishment_property_name" type varchar(255) using ("establishment_property_name"::varchar(255));');
    this.addSql('alter table "dashboard" alter column "establishment_property_name" set not null;');
  }

}
