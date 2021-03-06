import { injectable } from 'inversify'
import { Month } from '../availability/Month'
import { AvailableMonth } from '../availability/AvailableMonth'
import { Hemisphere } from '../availability/Hemisphere'
import { Shop } from './Shop'
import { CacheableDataSource } from '../common/CacheableDataSource'
import Creature from './Creature'

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

@injectable()
export abstract class CreatureDataSource<R extends CreatureResponse, D extends Creature> extends CacheableDataSource<
    R,
    D
> {
    protected buildBaseCreatureData(creature: CreatureResponse): Creature {
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

    private buildAvailableMonth(hemisphere: string, month: string): AvailableMonth {
        const start = Month[Month[+month.split('-')[0] - 1]]
        const end = Month[Month[+month.split('-')[1] - 1]] ?? start
        return {
            hemisphere: hemisphere === 'month-northern' ? Hemisphere.Northern : Hemisphere.Southern,
            start,
            end,
        }
    }

    private buildAvailableMonths(creature: CreatureResponse): AvailableMonth[] {
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
}
