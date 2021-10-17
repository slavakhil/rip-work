import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('items')
export class ItemEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({ default: false })
    complete: boolean
}
