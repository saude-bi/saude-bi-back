import { Migration } from '@mikro-orm/migrations';

export class Migration20231115191142 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "geographic_data_source" add column "credentials_username" varchar(255) not null, add column "credentials_password" varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "geographic_data_source" drop column "credentials_username";');
    this.addSql('alter table "geographic_data_source" drop column "credentials_password";');
  }

}
