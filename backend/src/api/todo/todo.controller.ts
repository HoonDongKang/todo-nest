import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from 'src/database/todo.entity';
import { JwtGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('todo')
@UseGuards(JwtGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(): Promise<Todo[]> {
    return await this.todoService.findAll();
  }

  @Get(':id')
  async findByUser(@Param('id') id: string): Promise<Todo[]> {
    const todos = await this.todoService.findByUser(id);

    return todos;
  }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return await this.todoService.create(createTodoDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTodoDto: Partial<Todo>,
  ): Promise<void> {
    return await this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.todoService.delete(id);
  }
}
