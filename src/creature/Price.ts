import { ObjectType, Field, Int } from 'type-graphql'
import { Shop } from './Shop'

@ObjectType({ description: 'How much an object sells for.' })
export class Price {
    @Field(() => Shop)
    shop: Shop
    @Field(() => Int, { description: 'The price at the shop.' })
    price: number
}
