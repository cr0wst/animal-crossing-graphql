import { Personality } from '../common/enums/Personality'
import { Species } from '../common/enums/Species'
import { Gender } from '../common/enums/Gender'
import { injectable } from 'inversify'
import axios from 'axios'

const API_URL = 'http://acnhapi.com/villagers'

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
export class VillagerDataSource {
    async getAllVillagers(): Promise<VillagerData[]> {
        const response = await axios.get(API_URL)

        // ACNH API returns an object of key-value pairs instead of an array.
        return Object.values(response.data).map((villager: VillagerResponse) => this.transformVillager(villager))
    }

    async getVillager(id: number): Promise<VillagerData> {
        const response = await axios.get(`${API_URL}/${id}`)

        return this.transformVillager(response.data)
    }

    private transformVillager(villager: VillagerResponse): VillagerData {
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
