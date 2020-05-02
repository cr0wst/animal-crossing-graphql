import { ApolloServer } from 'apollo-server'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { VillagerResolver } from './villager/VillagerResolver'
import { container } from './container'

async function main(): Promise<void> {
    const schema = await buildSchema({
        resolvers: [VillagerResolver],
        container: container,
        emitSchemaFile: true,
        validate: false,
    })

    const server = new ApolloServer({ schema })
    const { url } = await server.listen(process.env.PORT || 3000)
    console.log(url)
}

main().catch((err) => {
    console.error(err)
})
