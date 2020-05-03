import { Resolver, Query, Int, Arg, ArgsType, Field, Args } from 'type-graphql'
import { injectable } from 'inversify'
import { Hemisphere } from '../common/enums/Hemisphere'
import { Month } from '../common/enums/Month'
import { CreatureResolver, AvailabilityArgs, PriceArgs } from '../common/CreatureResolver'
import Fish from './Fish'
import { FishDataSource } from './FishDataSource'

@ArgsType()
class GetFishArgs {
    @Field(() => AvailabilityArgs, { nullable: true })
    availability?: AvailabilityArgs

    @Field(() => PriceArgs, { nullable: true })
    price?: PriceArgs
}

@Resolver()
@injectable()
export class FishResolver extends CreatureResolver {
    constructor(readonly fishDataSource: FishDataSource) {
        super()
    }

    @Query(() => [Fish], { description: 'Query for a list of fishes.' })
    async fishes(@Args() { availability, price }: GetFishArgs): Promise<Fish[]> {
        const results = await this.fishDataSource.getAll()

        return this.filter(results, price, availability)
    }

    @Query(() => Fish, { description: 'Query for a single fish.' })
    async fish(
        @Arg('id', () => Int, { nullable: false, description: 'The id of the fish.' }) id: number,
    ): Promise<Fish> {
        return await this.fishDataSource.get(id)
    }

    @Query(() => [Fish], { description: 'Query for a list of fishes that are expiring on the given month.' })
    async fishExpiring(
        @Arg('month', () => Month, { description: 'The month to query on' }) month: Month,
        @Arg('hemisphere', () => Hemisphere, { description: 'The hemisphere.' }) hemisphere: Hemisphere,
    ): Promise<Fish[]> {
        const results = await this.fishDataSource.getAll()

        return this.filterExpiring(results, month, hemisphere)
    }
}
