import { Resolver, Query, Int, Arg, ArgsType, Field, Args } from 'type-graphql'
import { injectable } from 'inversify'
import { BugDataSource } from './BugDataSource'
import Bug from './Bug'
import { Hemisphere } from '../availability/Hemisphere'
import { Month } from '../availability/Month'
import { CreatureResolver, AvailabilityArgs, PriceArgs } from '../creature/CreatureResolver'

@ArgsType()
class GetBugsArgs {
    @Field(() => AvailabilityArgs, { nullable: true })
    availability?: AvailabilityArgs

    @Field(() => PriceArgs, { nullable: true })
    price?: PriceArgs

    @Field(() => String, { nullable: true })
    name?: string
}

@Resolver()
@injectable()
export class BugResolver extends CreatureResolver<Bug> {
    constructor(readonly bugDataSource: BugDataSource) {
        super()
    }

    @Query(() => [Bug], { description: 'Query for a list of bugs.' })
    async bugs(@Args() { availability, price, name }: GetBugsArgs): Promise<Bug[]> {
        const results = await this.bugDataSource.getAll()

        return this.filter(results, price, availability, name)
    }

    @Query(() => Bug, { description: 'Query for a single bug.' })
    async bug(@Arg('id', () => Int, { nullable: false, description: 'The id of the bug.' }) id: number): Promise<Bug> {
        return await this.bugDataSource.get(id)
    }

    @Query(() => [Bug], { description: 'Query for a list of bugs that are expiring on the given month.' })
    async bugsExpiring(
        @Arg('month', () => Month, { description: 'The month to query on' }) month: Month,
        @Arg('hemisphere', () => Hemisphere, { description: 'The hemisphere.' }) hemisphere: Hemisphere,
    ): Promise<Bug[]> {
        const results = await this.bugDataSource.getAll()

        return this.filterExpiring(results, month, hemisphere)
    }
}
