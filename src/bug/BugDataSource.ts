import { injectable } from 'inversify'
import { Shop } from '../creature/Shop'
import { CreatureDataSource, CreatureResponse } from '../creature/CreatureDataSource'
import Bug from './Bug'

interface BugResponse extends CreatureResponse {
    'price-flick': number
}

@injectable()
export class BugDataSource extends CreatureDataSource<BugResponse, Bug> {
    protected getEndpoint(): string {
        return 'bugs'
    }

    protected transformResponse(bug: BugResponse): Bug {
        const creatureData = this.buildBaseCreatureData(bug)

        creatureData.prices.push({
            shop: Shop.Flick,
            price: bug['price-flick'],
        })

        return creatureData
    }
}
