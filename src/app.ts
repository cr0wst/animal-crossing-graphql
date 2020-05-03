import { ApolloServer } from 'apollo-server'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { VillagerResolver } from './villager/VillagerResolver'
import { container } from './container'
import { BugResolver } from './bug/BugResolver'
import { AvailabilityResolver } from './availability/AvailabilityResolver'
import { FishResolver } from './fish/FishResolver'

async function main(): Promise<void> {
    const schema = await buildSchema({
        resolvers: [VillagerResolver, BugResolver, AvailabilityResolver, FishResolver],
        container: container,
        emitSchemaFile: true,
        validate: false,
    })

    const server = new ApolloServer({ schema })
    const { url } = await server.listen(process.env.PORT || 3000)
    console.log(`Listening on ${url}`)
}

main().catch((err) => {
    console.error(err)
})
