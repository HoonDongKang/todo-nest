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

  async findById(id: string): Promise<Todo | null> {
    const todo = await this.todoRepo.findOne({
      where: { id: +id },
    });

    console.log(todo);
    if (!todo) throw new NotFoundException('Todo Not Found');

    return todo;
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
