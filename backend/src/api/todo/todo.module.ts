import { Module } from '@nestjs/common';
import { JwtModule } from '../jwt/jwt.module';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from 'src/database/todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), JwtModule],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
