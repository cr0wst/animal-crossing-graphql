import { injectable } from 'inversify'
import { Shop } from '../creature/Shop'
import { CreatureDataSource, CreatureResponse, CreatureData } from '../creature/CreatureDataSource'

interface BugResponse extends CreatureResponse {
    'price-flick': number
}

type BugData = CreatureData

@injectable()
export class BugDataSource extends CreatureDataSource<BugResponse, BugData> {
    protected getEndpoint(): string {
        return 'bugs'
    }

    protected transformResponse(bug: BugResponse): BugData {
        const creatureData = this.buildBaseCreatureData(bug)

        creatureData.prices.push({
            shop: Shop.Flick,
            price: bug['price-flick'],
        })

        return creatureData
    }
}
