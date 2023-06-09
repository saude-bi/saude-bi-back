import { Migration } from '@mikro-orm/migrations';

export class Migration20230609153007 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "dashboard_category" ("id" serial primary key, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "name" varchar(255) not null);');

    this.addSql('create table "dashboard_data_source" ("id" serial primary key, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "name" varchar(255) not null, "url" varchar(255) not null, "credentials_login" varchar(255) null, "credentials_password" varchar(255) null);');

    this.addSql('create table "dashboard" ("id" serial primary key, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "data_source_id" int not null, "category_id" int not null, "metabase_id" int not null, "name" varchar(255) not null);');

    this.addSql('create table "establishment" ("id" serial primary key, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "cnes" varchar(255) not null, "name" varchar(255) not null);');
    this.addSql('create index "establishment_cnes_index" on "establishment" ("cnes");');
    this.addSql('alter table "establishment" add constraint "establishment_cnes_unique" unique ("cnes");');

    this.addSql('create table "occupation_category" ("id" serial primary key, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "name" varchar(255) not null);');

    this.addSql('create table "occupation" ("id" serial primary key, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "name" varchar(255) not null, "cbo" varchar(255) not null, "category_id" int not null);');
    this.addSql('create index "occupation_cbo_index" on "occupation" ("cbo");');
    this.addSql('alter table "occupation" add constraint "occupation_cbo_unique" unique ("cbo");');

    this.addSql('create table "user" ("id" serial primary key, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "username" varchar(255) not null, "password" varchar(255) not null, "is_admin" boolean not null);');
    this.addSql('create index "user_username_index" on "user" ("username");');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');

    this.addSql('create table "medical_worker" ("id" serial primary key, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "user_id" int not null, "name" varchar(255) not null, "gender" varchar(255) not null, "cns" varchar(255) not null, "cpf" varchar(255) not null);');
    this.addSql('alter table "medical_worker" add constraint "medical_worker_user_id_unique" unique ("user_id");');
    this.addSql('create index "medical_worker_cns_index" on "medical_worker" ("cns");');
    this.addSql('alter table "medical_worker" add constraint "medical_worker_cns_unique" unique ("cns");');

    this.addSql('create table "work_relation" ("id" serial primary key, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "worker_id" int not null, "occupation_id" int not null);');

    this.addSql('create table "working_establishment" ("work_relation_id" int not null, "establishment_id" int not null, constraint "working_establishment_pkey" primary key ("work_relation_id", "establishment_id"));');

    this.addSql('alter table "dashboard" add constraint "dashboard_data_source_id_foreign" foreign key ("data_source_id") references "dashboard_data_source" ("id") on update cascade;');
    this.addSql('alter table "dashboard" add constraint "dashboard_category_id_foreign" foreign key ("category_id") references "dashboard_category" ("id") on update cascade;');

    this.addSql('alter table "occupation" add constraint "occupation_category_id_foreign" foreign key ("category_id") references "occupation_category" ("id") on update cascade;');

    this.addSql('alter table "medical_worker" add constraint "medical_worker_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "work_relation" add constraint "work_relation_worker_id_foreign" foreign key ("worker_id") references "medical_worker" ("id") on update cascade;');
    this.addSql('alter table "work_relation" add constraint "work_relation_occupation_id_foreign" foreign key ("occupation_id") references "occupation" ("id") on update cascade;');

    this.addSql('alter table "working_establishment" add constraint "working_establishment_work_relation_id_foreign" foreign key ("work_relation_id") references "work_relation" ("id") on update cascade;');
    this.addSql('alter table "working_establishment" add constraint "working_establishment_establishment_id_foreign" foreign key ("establishment_id") references "establishment" ("id") on update cascade;');
  }

}
