import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ItemEntity } from './entities/item.entity'
import { Item } from './interfaces/item.interface'

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(ItemEntity)
        private readonly _itemsRepository: Repository<ItemEntity>,
    ) {}

    async findAll(): Promise<ItemEntity[]> {
        return this._itemsRepository.find()
    }

    async create(item: Item): Promise<ItemEntity> {
        const newItem = this._itemsRepository.create(item)

        return await this._itemsRepository.save(newItem)
    }

    async delete(itemId: number): Promise<ItemEntity> {
        const foundItem = await this._itemsRepository.findOne({ id: itemId })

        if (!foundItem) {
            throw new NotFoundException(`Item not found`)
        }

        return this._itemsRepository.softRemove(foundItem)
    }

    async update(item: Item & { itemId: number }): Promise<ItemEntity> {
        const foundItem = await this._itemsRepository.findOne({
            id: item.itemId,
        })

        if (!foundItem) {
            throw new NotFoundException(`Item not found`)
        }

        return await this._itemsRepository.save({
            ...foundItem,
            ...item,
        })
    }
}
