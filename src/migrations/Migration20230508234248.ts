import { Migration } from '@mikro-orm/migrations'

export class Migration20230508234248 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "occupation" ("id" serial primary key, "created" timestamptz(0) not null, "updated" timestamptz(0) not null);'
    )

    this.addSql(
      'create table "worker_occupation" ("id" serial primary key, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "worker_id" int not null, "occupation_id" int not null);'
    )

    this.addSql(
      'create table "work_relation" ("worker_occupation_id" int not null, "establishment_id" int not null, constraint "work_relation_pkey" primary key ("worker_occupation_id", "establishment_id"));'
    )

    this.addSql(
      'alter table "worker_occupation" add constraint "worker_occupation_worker_id_foreign" foreign key ("worker_id") references "medical_worker" ("id") on update cascade;'
    )
    this.addSql(
      'alter table "worker_occupation" add constraint "worker_occupation_occupation_id_foreign" foreign key ("occupation_id") references "occupation" ("id") on update cascade;'
    )

    this.addSql(
      'alter table "work_relation" add constraint "work_relation_worker_occupation_id_foreign" foreign key ("worker_occupation_id") references "worker_occupation" ("id") on update cascade;'
    )
    this.addSql(
      'alter table "work_relation" add constraint "work_relation_establishment_id_foreign" foreign key ("establishment_id") references "establishment" ("id") on update cascade;'
    )
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "worker_occupation" drop constraint "worker_occupation_occupation_id_foreign";'
    )

    this.addSql(
      'alter table "work_relation" drop constraint "work_relation_worker_occupation_id_foreign";'
    )

    this.addSql('drop table if exists "occupation" cascade;')

    this.addSql('drop table if exists "worker_occupation" cascade;')

    this.addSql('drop table if exists "work_relation" cascade;')
  }
}
