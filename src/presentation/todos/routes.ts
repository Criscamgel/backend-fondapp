import { Router } from "express";
import { TodosController } from "./controller";
import { TodoRepositoryImpl } from "../../infrastructure/repositories/todo.repository.impl";
import { TodoDatasourceImpl } from "../../infrastructure/datasource/todo.datasource.impl";

export class TodoRoutes {

    static get routes(): Router {

        const router = Router()

        const datasource = new TodoDatasourceImpl();
        const TodoRepository = new TodoRepositoryImpl( datasource );

        const todoController = new TodosController(TodoRepository);

        router.get('/', todoController.get);
        router.get('/:id', todoController.getById);
        router.post('/', todoController.create);
        router.put('/:id', todoController.update);
        router.delete('/:id', todoController.delete);

        return router;
    }

}