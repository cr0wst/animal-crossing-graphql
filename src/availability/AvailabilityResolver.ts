import { Resolver, Arg, FieldResolver, Root } from 'type-graphql'
import { injectable } from 'inversify'
import { Hemisphere } from './Hemisphere'
import { AvailableMonth } from './AvailableMonth'
import { Availability } from './Availability'

@Resolver(() => Availability)
@injectable()
export class AvailabilityResolver {
    @FieldResolver(() => [Availability])
    months(
        @Root() availability: Availability,
        @Arg('hemisphere', () => Hemisphere, { nullable: true }) hemisphere: Hemisphere,
    ): AvailableMonth[] {
        let filtered = availability.months
        if (hemisphere !== undefined) {
            filtered = filtered.filter((month) => month.hemisphere === hemisphere)
        }

        return filtered
    }
}
