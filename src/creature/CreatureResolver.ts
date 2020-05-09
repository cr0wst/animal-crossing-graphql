import { Int, Field, InputType, FieldResolver, Root, Arg, Resolver } from 'type-graphql'
import { injectable } from 'inversify'
import { Hemisphere } from '../availability/Hemisphere'
import { Month } from '../availability/Month'
import Creature from './Creature'
import { Price } from './Price'
import { Shop } from './Shop'

@InputType()
export class AvailabilityArgs {
    @Field({ nullable: true })
    availableAllDay: boolean

    @Field(() => [String], { nullable: true })
    locations: string[]

    @Field(() => [String], { nullable: true })
    rarities: string[]

    @Field(() => [Month], { nullable: true })
    months: Month[]

    @Field(() => Hemisphere, { nullable: true })
    hemisphere: Hemisphere

    @Field({ nullable: true })
    availableAllYear: boolean
}

@InputType()
export class PriceArgs {
    @Field(() => Int, { nullable: true })
    min: number

    @Field(() => Int, { nullable: true })
    max: number

    @Field(() => Shop, { nullable: true })
    shop: Shop
}

@Resolver(() => Creature)
@injectable()
export abstract class CreatureResolver<C extends Creature> {
    @FieldResolver(() => [Price])
    async prices(
        @Root() creature: C,
        @Arg('shop', () => Shop, { nullable: true, description: 'The shop to display results for.' }) shop: Shop,
    ): Promise<Price[]> {
        let filtered = creature.prices

        filtered = filtered.filter((price) => shop === undefined || price.shop === shop)

        return filtered
    }

    protected filter(creatures: C[], price: PriceArgs, availability: AvailabilityArgs, name: string): C[] {
        let results = creatures
        if (availability !== undefined) {
            results = this.filterAvailability(results, availability)
        }

        if (price !== undefined) {
            results = this.filterPrice(results, price)
        }

        if (name !== undefined) {
            results = results.filter((creature) => creature.name.startsWith(name))
        }

        return results
    }

    protected filterExpiring(creatures: C[], month: Month, hemisphere: Hemisphere): C[] {
        return creatures.filter((creature) => {
            const monthAvailable = creature.availability.months.find((month) => {
                return month.hemisphere === hemisphere
            })

            return (
                // End month is this month and not available all year
                !creature.availability.isAllYear &&
                // Only available this month
                month === monthAvailable.end
            )
        })
    }

    protected filterAvailability(results: C[], availability: AvailabilityArgs): C[] {
        let filtered = results

        if (availability.availableAllDay !== undefined) {
            filtered = filtered.filter((result) => {
                return result.availability.isAllDay == availability.availableAllDay
            })
        }

        if (availability.availableAllYear !== undefined) {
            filtered = filtered.filter((result) => {
                return result.availability.isAllYear == availability.availableAllYear
            })
        }

        if (availability.locations) {
            filtered = filtered.filter((result) => {
                return availability.locations.includes(result.availability.location)
            })
        }

        if (availability.rarities) {
            filtered = filtered.filter((result) => {
                return availability.rarities.includes(result.availability.rarity)
            })
        }

        if (availability.months) {
            filtered = filtered.filter((result) => {
                if (result.availability.isAllYear) {
                    return true
                }
                return (
                    result.availability.months.filter((month) => {
                        return (
                            (availability.hemisphere === undefined || availability.hemisphere === month.hemisphere) &&
                            availability.months.filter((availability) =>
                                this.isMonthBetween(availability, month.start, month.end),
                            ).length
                        )
                    }).length > 0
                )
            })
        }

        return filtered
    }

    protected filterPrice(result: C[], priceArg: PriceArgs): C[] {
        let filtered = result

        if (priceArg.min !== undefined) {
            filtered = filtered.filter((result) => {
                return (
                    result.prices.find((price) => {
                        if (priceArg.shop === undefined || priceArg.shop === price.shop) {
                            return price.price >= priceArg.min
                        }
                        return false
                    }) !== undefined
                )
            })
        }

        if (priceArg.max !== undefined) {
            filtered = filtered.filter((result) => {
                return (
                    result.prices.find((price) => {
                        if (priceArg.shop === undefined || priceArg.shop === price.shop) {
                            return price.price <= priceArg.max
                        }
                        return false
                    }) !== undefined
                )
            })
        }

        return filtered
    }

    private isMonthBetween(month: number, start: number, end: number): boolean {
        // First check to see if it's between the two numbers
        // EX: Range 2-9 and month is 7
        if (start <= month && month <= end && start <= end) {
            return true
        }

        // If it's not between the two numbers then we check to see if it's in the boundary
        // EX: Range 9-2 and month is 10 (End < Start)
        if (month <= end && end <= start) {
            return true
        }

        // EX: Range 9-2 and month is 1 (Start > End)
        if (month >= start && end <= start) {
            return true
        }

        return false
    }
}
