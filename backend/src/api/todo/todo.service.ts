import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findByUser(id: string): Promise<Todo[]> {
    const todos = await this.todoRepo.find({
      where: { _user: +id },
    });
    // if (!todo) throw new NotFoundException('Todo Not Found');

    return todos;
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return await this.todoRepo.save(createTodoDto);
  }

  async update(id: string, updateTodoDto: Partial<Todo>): Promise<void> {
    const { affected } = await this.todoRepo.update({ id: +id }, updateTodoDto);

    if (affected === 0) throw new NotFoundException('Todo Not Found');
  }

  async delete(id: string): Promise<void> {
    const { affected } = await this.todoRepo.delete({ id: +id });

    if (affected === 0) throw new NotFoundException('Todo Not Found');
  }
}
