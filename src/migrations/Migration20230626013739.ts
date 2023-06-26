import { Migration } from '@mikro-orm/migrations';

export class Migration20230626013739 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "dashboard_data_source" add column "secret" varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "dashboard_data_source" drop column "secret";');
  }

}
