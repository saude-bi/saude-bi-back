import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { UserSeeder } from './UserSeeder';
import { DirectorshipSeeder } from './DirectorshipSeeder';
import { OccupationSeeder } from './OccupationSeeder';

export class DatabaseSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    return this.call(em, [
      DirectorshipSeeder,
      OccupationSeeder,
      UserSeeder,
    ]);
  }

}
