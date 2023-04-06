import { EntityRepository } from '@mikro-orm/core'

export type Mock<T> = {
  [P in keyof T]?: jest.Mock
}

export const repositoryMockFactory: () => Mock<EntityRepository<any>> = jest.fn(() => ({
  create: jest.fn().mockImplementation((obj) => obj),
  assign: jest.fn(),
  findAll: jest.fn(),
  findAndCount: jest.fn(),
  findOne: jest.fn(),
  persistAndFlush: jest.fn(),
  removeAndFlush: jest.fn()
}))
