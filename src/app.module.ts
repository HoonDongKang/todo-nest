import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TodoModule } from './todo/todo.module';
import { CountingModule } from './counting/counting.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TodoModule,
    CountingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
