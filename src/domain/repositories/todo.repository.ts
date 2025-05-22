import { CreateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";
import { UpdateTodoDto } from '../dtos/todos/update-todo.dto';

export abstract class TodoRepository {

    abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;
    //todo: paginate
    abstract getAll(): Promise<TodoEntity[]>;

    abstract findById(id: number): Promise<TodoEntity>;
    abstract updateById(UpdateTodoDto: UpdateTodoDto): Promise<TodoEntity>;
    abstract deleteById(ud: number): Promise<TodoEntity>;


}