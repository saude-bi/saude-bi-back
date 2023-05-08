import { Migration } from '@mikro-orm/migrations'

export class Migration20230406144849 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "user" ("id" varchar(255) not null, "created" timestamptz(0) not null, "updated" timestamptz(0) not null, "username" varchar(255) not null, "password" varchar(255) not null, constraint "user_pkey" primary key ("id"));'
    )
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");')
  }
}
