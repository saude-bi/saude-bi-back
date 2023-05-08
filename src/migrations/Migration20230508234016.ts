import { Migration } from '@mikro-orm/migrations'

export class Migration20230508234016 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "medical_worker" ("id" serial primary key, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "user_id" int not null, "name" varchar(255) not null, "gender" varchar(255) not null, "cns" varchar(255) not null, "cpf" varchar(255) not null);'
    )
    this.addSql(
      'alter table "medical_worker" add constraint "medical_worker_user_id_unique" unique ("user_id");'
    )
    this.addSql('create index "medical_worker_cns_index" on "medical_worker" ("cns");')
    this.addSql(
      'alter table "medical_worker" add constraint "medical_worker_cns_unique" unique ("cns");'
    )

    this.addSql(
      'alter table "medical_worker" add constraint "medical_worker_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;'
    )
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "medical_worker" cascade;')
  }
}
