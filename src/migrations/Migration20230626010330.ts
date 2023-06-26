import { Migration } from '@mikro-orm/migrations';

export class Migration20230626010330 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "dashboard_data_source" drop column "credentials_login";');
    this.addSql('alter table "dashboard_data_source" drop column "credentials_password";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "dashboard_data_source" add column "credentials_login" varchar(255) null, add column "credentials_password" varchar(255) null;');
  }

}
