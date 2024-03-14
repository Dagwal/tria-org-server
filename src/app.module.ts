import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './module/employee/employee.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'orga_structure',
      autoLoadEntities: true,
      synchronize: true,
    }),
    EmployeeModule,
  ],
})
export class AppModule {}
