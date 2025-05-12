import { Router } from "express";
import { TodosController } from "./controller";

export class TodoRoutes {

    static get routes(): Router {

        const router = Router()
        const todoController = new TodosController();

        router.get('/', todoController.get);
        router.get('/:id', todoController.getById);
        router.post('/', todoController.create);
        router.put('/:id', todoController.update);
        router.delete('/:id', todoController.delete);

        return router;
    }

}