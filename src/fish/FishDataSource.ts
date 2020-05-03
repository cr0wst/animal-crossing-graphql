import { injectable } from 'inversify'
import { Shop } from '../common/enums/Shop'
import { CreatureDataSource, CreatureResponse, CreatureData } from '../common/CreatureDataSource'

interface FishResponse extends CreatureResponse {
    'price-cj': number
}

type FishData = CreatureData

@injectable()
export class FishDataSource extends CreatureDataSource<FishResponse, FishData> {
    protected getEndpoint(): string {
        return 'fish'
    }

    protected transformResponse(fish: FishResponse): FishData {
        const creatureData = this.buildBaseCreatureData(fish)

        creatureData.prices.push({
            shop: Shop.CJ,
            price: fish['price-cj'],
        })

        return creatureData
    }
}
