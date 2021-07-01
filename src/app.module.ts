import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, createConnection } from 'typeorm';
import { AppController } from './app.controller';
import { BusinessesController } from './controllers/businesses.controlier';
import { CategoriesController } from './controllers/categories.controller';
import { EventsController } from './controllers/events.controller';
import { UsersControler } from './controllers/users.controller';
import { BusinessEntity } from './entities/business.entity';
import { CategoryEntity } from './entities/category.entity';
import { EventEntity } from './entities/event.entity';
import { UserEntity } from './entities/user.entity';
import { BusinessesService } from './services/businesses.service';
import { CategoriesService } from './services/categories.service';
import { EventsService } from './services/events.service';
import { UsersService } from './services/users.service';
import { HealthController } from './health/health.controller';

@Module({
  controllers: [AppController, UsersControler, BusinessesController, CategoriesController, EventsController, HealthController],
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () => await createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'tito_db',
        entities: [UserEntity, BusinessEntity, CategoryEntity, EventEntity],
        synchronize: true,
      }),
    },
    {
      provide: 'USERS_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(UserEntity),
      inject: ['DATABASE_CONNECTION'],
    },
    {
      provide: 'BUSINESS_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(BusinessEntity),
      inject: ['DATABASE_CONNECTION'],
    },
    {
      provide: 'CATEGORY_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(CategoryEntity),
      inject: ['DATABASE_CONNECTION'],
    },
    {
      provide: 'EVENT_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(EventEntity),
      inject: ['DATABASE_CONNECTION'],
    },
    UsersService,
    BusinessesService,
    CategoriesService,
    EventsService
  ],
  imports:[
    TypeOrmModule,
    TerminusModule
  ]
})
export class AppModule {}
