import { registerEnumType } from 'type-graphql'

export enum Hemisphere {
    Southern,
    Northern,
}

registerEnumType(Hemisphere, {
    name: 'Hemisphere',
    description: 'The hemisphere of the player.',
})
