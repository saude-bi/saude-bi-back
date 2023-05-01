import { Migration } from '@mikro-orm/migrations';

export class Migration20230501231638 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "dashboard_data_source" alter column "credentials_login" type varchar(255) using ("credentials_login"::varchar(255));');
    this.addSql('alter table "dashboard_data_source" alter column "credentials_login" set not null;');
    this.addSql('alter table "dashboard_data_source" alter column "credentials_password" type varchar(255) using ("credentials_password"::varchar(255));');
    this.addSql('alter table "dashboard_data_source" alter column "credentials_password" set not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "dashboard_data_source" alter column "credentials_login" type varchar(255) using ("credentials_login"::varchar(255));');
    this.addSql('alter table "dashboard_data_source" alter column "credentials_login" drop not null;');
    this.addSql('alter table "dashboard_data_source" alter column "credentials_password" type varchar(255) using ("credentials_password"::varchar(255));');
    this.addSql('alter table "dashboard_data_source" alter column "credentials_password" drop not null;');
  }

}
