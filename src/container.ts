import { Container } from 'inversify'
import { VillagerResolver } from './villager/VillagerResolver'
import { VillagerDataSource } from './villager/VillagerDataSource'

export const container = new Container()

// Resolvers
//    Must be bound to their concrete names
container.bind<VillagerResolver>(VillagerResolver).toSelf().inSingletonScope()

// Services
container.bind<VillagerDataSource>(VillagerDataSource).toSelf().inSingletonScope
