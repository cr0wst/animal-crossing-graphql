import { ObjectType, Field } from 'type-graphql'
import Creature from '../creature/Creature'
import { Shadow } from './Shadow'

@ObjectType({ description: 'An Animal Crossing fish.' })
export default class Fish extends Creature {
    @Field(() => Shadow)
    shadow: Shadow
}
