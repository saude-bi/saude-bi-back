import { Migration } from '@mikro-orm/migrations';

export class Migration20231115184358 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "geographic_layer" rename column "endpoint" to "params";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "geographic_layer" rename column "params" to "endpoint";');
  }

}
