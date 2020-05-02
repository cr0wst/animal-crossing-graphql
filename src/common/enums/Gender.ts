import { registerEnumType } from 'type-graphql'

export enum Gender {
    Male,
    Female,
}

registerEnumType(Gender, {
    name: 'Gender',
    description: 'The gender of the villager.',
})
