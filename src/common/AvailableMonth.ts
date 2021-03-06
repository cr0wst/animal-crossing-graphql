import { ObjectType, Field } from 'type-graphql'
import { Hemisphere } from '../availability/Hemisphere'
import { Month } from '../availability/Month'

@ObjectType({ description: 'The months that a creature is available.' })
export class AvailableMonth {
    @Field(() => Hemisphere)
    hemisphere: Hemisphere
    @Field(() => Month, { description: 'The first month a creature is available.' })
    start: Month
    @Field(() => Month, { description: 'The last month a creature is available.' })
    end: Month
}
