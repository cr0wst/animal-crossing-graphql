import { GraphQLScalarType, Kind } from 'graphql'

export const BirthdayScalar = new GraphQLScalarType({
    name: 'Birthday',
    description: 'Month and day representing a villager birthday.',
    parseValue(value: string): Date {
        return new Date(value)
    },
    serialize(value: Date): string {
        return value.toLocaleString('default', { month: 'long', day: 'numeric' })
    },
    parseLiteral(literal): Date {
        if (literal.kind === Kind.STRING) {
            return new Date(literal.value)
        }
        return null
    },
})
