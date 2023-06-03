export interface CRUDService<T>{
    list: (skip: number, take: number) => Promise<T[]>
}