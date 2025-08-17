import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './modules/app/app.module'
import { MikroORM } from '@mikro-orm/core'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { cors: true })
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  const orm = app.get(MikroORM)
  await orm.getSchemaGenerator().updateSchema()
  const port: number = Number(process.env.PORT || 4000)
  await app.listen(port)
}

void bootstrap()


