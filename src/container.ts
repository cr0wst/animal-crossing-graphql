import { Container } from 'inversify'
import { VillagerResolver } from './villager/VillagerResolver'
import { VillagerDataSource } from './villager/VillagerDataSource'
import { BugResolver } from './bug/BugResolver'
import { BugDataSource } from './bug/BugDataSource'
import { AvailabilityResolver } from './common/AvailabilityResolver'

export const container = new Container()

// Resolvers
//    Must be bound to their concrete names
container.bind<VillagerResolver>(VillagerResolver).toSelf().inSingletonScope()
container.bind<BugResolver>(BugResolver).toSelf().inSingletonScope()
container.bind<AvailabilityResolver>(AvailabilityResolver).toSelf().inSingletonScope()

// Services
container.bind<VillagerDataSource>(VillagerDataSource).toSelf().inSingletonScope
container.bind<BugDataSource>(BugDataSource).toSelf().inSingletonScope
