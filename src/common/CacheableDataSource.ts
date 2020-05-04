import { injectable } from 'inversify'
import axios from 'axios'

const API_URL = 'http://acnhapi.com/'

@injectable()
export abstract class CacheableDataSource<R, D extends { id: number }> {
    private cache: D[]

    protected abstract readonly endpoint: string

    async getAll(): Promise<D[]> {
        if (!this.cache) {
            const response = await axios.get(`${API_URL + this.endpoint}`)

            // ACNH API returns an object of key-value pairs instead of an array.
            this.cache = Object.values(response.data).map((response: R) => {
                return this.transformResponse(response)
            })
        }

        return this.cache
    }

    async get(id: number): Promise<D> {
        return (await this.getAll()).find((cached) => cached.id === id)
    }

    protected abstract transformResponse(response: R): D
}
