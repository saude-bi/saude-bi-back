import { Migration } from '@mikro-orm/migrations';

export class Migration20231117012443 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "dashboard" add column "public" boolean not null;');

    this.addSql('alter table "geographic_map" add column "public" boolean not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "dashboard" drop column "public";');

    this.addSql('alter table "geographic_map" drop column "public";');
  }

}
