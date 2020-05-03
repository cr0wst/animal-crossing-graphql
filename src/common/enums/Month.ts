import { registerEnumType } from 'type-graphql'

export enum Month {
    January,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    Novemeber,
    December,
}

registerEnumType(Month, {
    name: 'Month',
    description: 'A month of the year.',
})
