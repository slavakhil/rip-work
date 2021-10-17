import { Controller, Get, Param, Post } from '@nestjs/common'
import { ItemEntity } from './entities/item.entity'
import { Item } from './interfaces/item.interface'
import { ItemsService } from './items.service'

@Controller()
export class ItemsController {
    constructor(private readonly _itemService: ItemsService) {}

    @Get()
    async findAll(): Promise<ItemEntity[]> {
        return await this._itemService.findAll()
    }

    @Post('/create')
    async create(@Param('item') item: Item): Promise<ItemEntity> {
        return await this._itemService.create(item)
    }

    @Post('/delete')
    async delete(@Param('itemId') itemId: number): Promise<ItemEntity> {
        return await this._itemService.delete(itemId)
    }

    @Post('/update')
    async update(
        @Param('item') item: Item & { itemId: number },
    ): Promise<ItemEntity> {
        return await this._itemService.update(item)
    }
}
