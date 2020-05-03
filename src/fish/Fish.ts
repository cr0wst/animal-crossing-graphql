import { ObjectType } from 'type-graphql'
import Creature from '../common/Creature'

@ObjectType({ description: 'An Animal Crossing fish.' })
export default class Fish extends Creature {}
