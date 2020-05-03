import { injectable } from 'inversify'
import axios from 'axios'
import { Availability } from './Availability'
import { Price } from './Price'
import { Month } from './enums/Month'
import { AvailableMonth } from './AvailableMonth'
import { Hemisphere } from './enums/Hemisphere'
import { Shop } from './enums/Shop'

const API_URL = 'http://acnhapi.com/'

export interface CreatureResponse {
    id: number
    name: string
    availability: {
        'month-northern': string
        'month-southern': string
        time: string
        isAllDay: boolean
        isAllYear: boolean
        location: string
        rarity: string
    }
    price: number
    'catch-phrase': string
    'museum-phrase': string
}

export interface CreatureData {
    id: number
    name: string
    availability: Availability
    prices: Price[]
    catchPhrase: string
    museumDescription: string
}

@injectable()
export abstract class CreatureDataSource<R extends CreatureResponse, D extends CreatureData> {
    async getAll(): Promise<D[]> {
        const response = await axios.get(API_URL + this.getEndpoint())

        // ACNH API returns an object of key-value pairs instead of an array.
        return Object.values(response.data).map((response: R) => {
            return this.transformResponse(response)
        })
    }

    async get(id: number): Promise<D> {
        const response = await axios.get(`${API_URL + this.getEndpoint()}/${id}`)

        return this.transformResponse(response.data)
    }

    protected buildBaseCreatureData(creature: CreatureResponse): CreatureData {
        return {
            id: creature.id,
            name: creature.name['name-en'],
            availability: {
                months: this.buildAvailableMonths(creature),
                time: creature.availability.time,
                isAllDay: creature.availability.isAllDay,
                isAllYear: creature.availability.isAllYear,
                location: creature.availability.location,
                rarity: creature.availability.rarity,
            },
            prices: [
                {
                    shop: Shop.Nook,
                    price: +creature['price'],
                },
            ],
            catchPhrase: creature['catch-phrase'],
            museumDescription: creature['museum-phrase'],
        }
    }

    protected buildAvailableMonth(hemisphere: string, month: string): AvailableMonth {
        const start = Month[Month[+month.split('-')[0] - 1]]
        const end = Month[Month[+month.split('-')[1] - 1]] ?? start
        return {
            hemisphere: hemisphere === 'month-northern' ? Hemisphere.Northern : Hemisphere.Southern,
            start,
            end,
        }
    }

    protected buildAvailableMonths(creature: CreatureResponse): AvailableMonth[] {
        if (creature.availability.isAllYear) {
            return [
                {
                    hemisphere: Hemisphere.Northern,
                    start: Month.January,
                    end: Month.December,
                },
                {
                    hemisphere: Hemisphere.Southern,
                    start: Month.January,
                    end: Month.December,
                },
            ]
        }

        // Iterate through each month from the API and transform
        return creature.availability['month-northern']
            .split(' & ')
            .map((month): AvailableMonth => this.buildAvailableMonth('month-northern', month))
            .concat(
                creature.availability['month-southern']
                    .split(' & ')
                    .map((month): AvailableMonth => this.buildAvailableMonth('month-southern', month)),
            )
    }

    protected abstract transformResponse(response: R): D

    protected abstract getEndpoint(): string
}
