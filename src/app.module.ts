import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartementModule } from './module/departement/departement.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'tria_org_str_new',
      autoLoadEntities: true,
      synchronize: true,
    }),
    DepartementModule,
  ],
})
export class AppModule {}
