import { DateTime } from 'luxon'
import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm'
import Env from '@ioc:Adonis/Core/Env'

import { FileCategory } from '../Utils'

export default class File extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fileCategory: FileCategory

  @column()
  public fileName: string

  @column()
  public ownerId: number

  @column.dateTime({
    autoCreate: true,
    serialize: (value: DateTime) => {
      return value.toFormat('dd/MM/yyyy hh:mm:ss')
    },
  })
  public createdAt: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
    serialize: (value: DateTime) => {
      return value.toFormat('dd/MM/yyyy hh:mm:ss')
    },
  })
  public updatedAt: DateTime

  @computed()
  public get url(): string {
    return `http://${Env.get('APP_URL')}/uploads/${this.fileName}`
  }
}
