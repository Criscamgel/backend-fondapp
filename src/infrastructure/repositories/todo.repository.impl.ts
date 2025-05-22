import { CreateTodoDto, TodoDatasource, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";


export class TodoRepositoryImpl implements TodoRepository {

    constructor(
        private readonly datasourse: TodoDatasource,
    ){}

    create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.datasourse.create(createTodoDto);
    }
    getAll(): Promise<TodoEntity[]> {
        return this.datasourse.getAll();    
    }
    findById(id: number): Promise<TodoEntity> {
        return this.datasourse.findById(id);    
    }
    updateById(UpdateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.updateById(UpdateTodoDto);
    }
    deleteById(id: number): Promise<TodoEntity> {
        return this.datasourse.deleteById(id);    
    }

}