import { ObjectType, Field } from 'type-graphql'
import { AvailableMonth } from './AvailableMonth'

@ObjectType({ description: 'When a creature is available.' })
export class Availability {
    @Field(() => [AvailableMonth], { description: 'The months that a creature is available.' })
    months: AvailableMonth[]
    @Field({ description: 'The time of day a creature is available.' })
    time: string
    @Field({ description: 'True if a creature is available all day.' })
    isAllDay: boolean
    @Field({ description: 'True if a creature is available all year.' })
    isAllYear: boolean
    @Field({ description: 'The location of a creature.' })
    location: string
    @Field({ description: 'The rarity of a creature.' })
    rarity: string
}
