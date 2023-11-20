import { Migration } from '@mikro-orm/migrations';

export class Migration20231120010511 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "geographic_data_source" alter column "credentials_username" type varchar(255) using ("credentials_username"::varchar(255));');
    this.addSql('alter table "geographic_data_source" alter column "credentials_username" drop not null;');
    this.addSql('alter table "geographic_data_source" alter column "credentials_password" type varchar(255) using ("credentials_password"::varchar(255));');
    this.addSql('alter table "geographic_data_source" alter column "credentials_password" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "geographic_data_source" alter column "credentials_username" type varchar(255) using ("credentials_username"::varchar(255));');
    this.addSql('alter table "geographic_data_source" alter column "credentials_username" set not null;');
    this.addSql('alter table "geographic_data_source" alter column "credentials_password" type varchar(255) using ("credentials_password"::varchar(255));');
    this.addSql('alter table "geographic_data_source" alter column "credentials_password" set not null;');
  }

}
