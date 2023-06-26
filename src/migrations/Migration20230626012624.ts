import { Migration } from '@mikro-orm/migrations';

export class Migration20230626012624 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "dashboard" add column "establishment_property_name" varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "dashboard" drop column "establishment_property_name";');
  }

}
