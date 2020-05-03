import { registerEnumType } from 'type-graphql'

export enum Personality {
    Cranky,
    Jock,
    Peppy,
    Snooty,
    Normal,
    Smug,
    Lazy,
    Uchi,
}

registerEnumType(Personality, {
    name: 'Personality',
    description: 'The personality of the villager. See: https://animalcrossing.fandom.com/wiki/Category:Personalities',
})
