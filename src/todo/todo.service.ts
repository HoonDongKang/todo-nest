import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from 'src/database/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepo: Repository<Todo>,
  ) {}
  async findAll(): Promise<Todo[]> {
    return await this.todoRepo.find();
  }

  async findById(id: string): Promise<Todo | null> {
    return this.todoRepo.findOne({
      where: { id: +id },
    });
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return await this.todoRepo.save(createTodoDto);
  }

  async update(id: string, updateTodoDto: Partial<Todo>): Promise<void> {
    const result = await this.todoRepo.update({ id: +id }, updateTodoDto);
  }

  async delete(id: string): Promise<void> {
    await this.todoRepo.delete({ id: +id });
  }
}
