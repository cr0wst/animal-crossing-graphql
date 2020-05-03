import { Field, ObjectType, ID } from 'type-graphql'
import { Personality } from './Personality'
import { Species } from './Species'
import { Gender } from './Gender'
import { BirthdayScalar } from './Birthday'

@ObjectType({ description: 'An Animal Crossing villager.' })
export default class Villager {
    @Field(() => ID, { description: 'The sequential ID of the villager. Has no in-game significance.' })
    id: number

    @Field({ description: 'The English name of the villager.' })
    name: string

    @Field(() => Personality)
    personality: Personality

    @Field(() => BirthdayScalar)
    birthday: Date

    @Field(() => Species, {})
    species: Species

    @Field(() => Gender)
    gender: Gender

    @Field({ description: 'The catch-phrase of the villager. See: https://animalcrossing.fandom.com/wiki/Catchphrase' })
    catchPhrase: string
}
