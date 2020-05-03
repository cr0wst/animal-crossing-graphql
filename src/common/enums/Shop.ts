import { registerEnumType } from 'type-graphql'

export enum Shop {
    Nook,
    Flick,
    CJ,
    Lief,
}

registerEnumType(Shop, {
    name: 'Shop',
    description: 'The shop that an item can be sold at.',
})
