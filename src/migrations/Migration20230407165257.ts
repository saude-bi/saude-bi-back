import { Migration } from '@mikro-orm/migrations';

export class Migration20230407165257 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "is_admin" boolean not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "is_admin";');
  }

}