import { ObjectType } from 'type-graphql'
import Creature from '../creature/Creature'

@ObjectType({ description: 'An Animal Crossing bug.' })
export default class Bug extends Creature {}
