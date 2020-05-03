import { registerEnumType } from 'type-graphql'

export enum Shadow {
    ExtraSmall,
    Small,
    Medium,
    Large,
    ExtraLarge,
    Giant,
}

registerEnumType(Shadow, {
    name: 'Shadow',
    description: 'The shadow of the fish.',
})
