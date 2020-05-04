import { injectable } from 'inversify'
import { Shop } from '../creature/Shop'
import { CreatureDataSource, CreatureResponse } from '../creature/CreatureDataSource'
import { Shadow } from './Shadow'
import Fish from './Fish'

interface FishResponse extends CreatureResponse {
    'price-cj': number
    shadow: string
}

@injectable()
export class FishDataSource extends CreatureDataSource<FishResponse, Fish> {
    protected readonly endpoint = 'fish'

    protected transformResponse(fish: FishResponse): Fish {
        const creatureData = this.buildBaseCreatureData(fish)

        creatureData.prices.push({
            shop: Shop.CJ,
            price: fish['price-cj'],
        })

        const fishData = { ...creatureData, shadow: this.transformFishShadow(fish.shadow) }

        return fishData
    }

    private transformFishShadow(shadow: string): Shadow {
        const lookup = {
            'Smallest (1)': Shadow.ExtraSmall,
            'Small (2)': Shadow.Small,
            'Medium (3)': Shadow.Medium,
            'Large (4)': Shadow.Large,
            'Medium (4)': Shadow.Large,
            'Large (5)': Shadow.ExtraLarge,
            'Largest (6)': Shadow.Giant,
            Narrow: Shadow.Large,
            'Largest with fin (6)': Shadow.Giant,
            'Medium with fin (4)': Shadow.Large,
        }

        return lookup[shadow]
    }
}
