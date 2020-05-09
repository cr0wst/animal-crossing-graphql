import { Resolver, Query, ArgsType, Field, Args, Int, Arg } from 'type-graphql'
import Villager from './Villager'
import { Personality } from './Personality'
import { Gender } from './Gender'
import { Species } from './Species'
import { VillagerDataSource } from './VillagerDataSource'
import { injectable } from 'inversify'

@ArgsType()
class GetVillagerArgs {
    @Field(() => [Personality], { nullable: true, description: 'The personalities of the villagers to filter by.' })
    personality?: Personality[]

    @Field(() => [Species], { nullable: true, description: 'The species of the villagers to filter by.' })
    species?: Species[]

    @Field(() => Gender, { nullable: true, description: 'The gender of the villagers to filter by.' })
    gender: Gender

    @Field(() => String, { nullable: true })
    name?: string
}

@Resolver()
@injectable()
export class VillagerResolver {
    constructor(readonly villagerDataSource: VillagerDataSource) {}

    @Query(() => [Villager], { description: 'Query for a list of villagers.' })
    async villagers(@Args() { personality, species, gender, name }: GetVillagerArgs): Promise<Villager[]> {
        let results = await this.villagerDataSource.getAll()

        if (personality) {
            results = results.filter((villager) => {
                return personality.includes(villager.personality)
            })
        }
        if (species) {
            results = results.filter((villager) => {
                return species.includes(villager.species)
            })
        }
        if (gender !== undefined) {
            results = results.filter((villager) => {
                return villager.gender === gender
            })
        }
        if (name !== undefined) {
            results = results.filter((villager) => villager.name.startsWith(name))
        }

        return results
    }

    @Query(() => Villager, { description: 'Query for a single villager.' })
    async villager(
        @Arg('id', () => Int, { nullable: false, description: 'The id of the villager.' }) id: number,
    ): Promise<Villager> {
        return await this.villagerDataSource.get(id)
    }
}
