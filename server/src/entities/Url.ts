import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class Url extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  originalUrl!: string

  @Column({ unique: true })
  shorterUrl!: string

  @ManyToOne(() => User, user => user.urls)
  user!: User

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}