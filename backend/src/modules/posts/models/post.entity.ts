import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity({ tableName: 'posts' })
export class PostEntity {
  @PrimaryKey()
  id!: number

  @Property({ unique: true })
  slug!: string

  @Property()
  title!: string

  @Property({ nullable: true })
  author?: string

  @Property({ type: 'date', nullable: true })
  date?: Date

  @Property({ type: 'text' })
  content!: string

  @Property({ default: false })
  draft!: boolean
}


