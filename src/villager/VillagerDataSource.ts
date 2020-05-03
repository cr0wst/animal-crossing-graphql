import { Personality } from './Personality'
import { Species } from './Species'
import { Gender } from './Gender'
import { injectable } from 'inversify'
import { CacheableDataSource } from '../common/CacheableDataSource'

interface VillagerResponse {
    id: number
    name: string
    personality: string
    species: string
    birthday: string
    'catch-phrase': string
    gender: string
}

interface VillagerData {
    id: number
    name: string
    personality: Personality
    birthday: Date
    species: Species
    gender: Gender
    catchPhrase: string
}

@injectable()
export class VillagerDataSource extends CacheableDataSource<VillagerResponse, VillagerData> {
    protected getEndpoint(): string {
        return 'villagers'
    }

    protected transformResponse(villager: VillagerResponse): VillagerData {
        return {
            id: villager.id,
            name: villager.name['name-en'],
            personality: Personality[villager.personality],
            species: Species[villager.species],
            // The birthday from the API is in day/month format.
            birthday: new Date(villager.birthday.split('/').reverse().join('/')),
            catchPhrase: villager['catch-phrase'],
            gender: Gender[villager.gender],
        }
    }
}
