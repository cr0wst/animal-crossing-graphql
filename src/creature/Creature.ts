import { Field, ObjectType, ID } from 'type-graphql'
import { Availability } from '../availability/Availability'
import { Price } from './Price'

@ObjectType({ description: 'An Animal Crossing creature.' })
export default class Creature {
    @Field(() => ID, { description: 'The sequential ID of the bug. Has no in-game significance.' })
    id: number

    @Field({ description: 'The English name of the creature.' })
    name: string

    @Field(() => Availability)
    availability: Availability

    @Field(() => [Price])
    prices: Price[]

    @Field({ description: 'The catch-phrase the Villager uses when catching the creature.' })
    catchPhrase: string

    @Field({ description: 'The description that Blathers gives.' })
    museumDescription: string
}
