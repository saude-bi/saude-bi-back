import { Migration } from '@mikro-orm/migrations';

export class Migration20230618201633 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists "working_establishment" cascade;');

    this.addSql('alter table "work_relation" add column "establishment_id" int not null;');
    this.addSql('alter table "work_relation" add constraint "work_relation_establishment_id_foreign" foreign key ("establishment_id") references "establishment" ("id") on update cascade;');
    this.addSql('alter table "work_relation" add constraint "work_relation_worker_id_occupation_id_establishment_id_unique" unique ("worker_id", "occupation_id", "establishment_id");');
  }

  async down(): Promise<void> {
    this.addSql('create table "working_establishment" ("work_relation_id" int not null, "establishment_id" int not null, constraint "working_establishment_pkey" primary key ("work_relation_id", "establishment_id"));');

    this.addSql('alter table "working_establishment" add constraint "working_establishment_work_relation_id_foreign" foreign key ("work_relation_id") references "work_relation" ("id") on update cascade;');
    this.addSql('alter table "working_establishment" add constraint "working_establishment_establishment_id_foreign" foreign key ("establishment_id") references "establishment" ("id") on update cascade;');

    this.addSql('alter table "work_relation" drop constraint "work_relation_establishment_id_foreign";');

    this.addSql('alter table "work_relation" drop constraint "work_relation_worker_id_occupation_id_establishment_id_unique";');
    this.addSql('alter table "work_relation" drop column "establishment_id";');
  }

}
