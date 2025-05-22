import { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { CreateTodo, DeleteTodo, GetTodo, TodoRepository, UpdateTodo } from "../../domain";
import { GetTodos } from '../../domain/use-cases/todo/get-todos';

export class TodosController {

    constructor(
        private readonly todoRepository: TodoRepository
    ){}

    public get = (req:Request, res:Response) => {
        new GetTodos( this.todoRepository )
        .execute()
        .then( todos => res.json(todos))
        .catch( error => res.status(400).json({error}) );
    }

    public getById = (req:Request | any, res:Response | any) => {
        const id = +req.params.id;
        
        new GetTodo( this.todoRepository )
        .execute(id)
        .then( todos => res.json(todos))
        .catch( error => res.status(400).json({error}) );

    }

    public create = (req:Request | any, res:Response | any) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({error});

        new CreateTodo( this.todoRepository )
        .execute( createTodoDto! )
        .then( todo => res.json(todo))
        .catch( error => res.status(400).json({error}) );
    }

    public update = (req:Request | any, res:Response | any) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.update({...req.body, id});
        if(error) return res.status(400).json({error});

        new UpdateTodo( this.todoRepository )
        .execute( updateTodoDto! )
        .then( todo => res.json(todo))
        .catch( error => res.status(400).json({error}) );
    }

    public delete = (req:Request | any, res:Response | any) => {
        const id = +req.params.id;
        
        new DeleteTodo( this.todoRepository )
        .execute(id)
        .then( todos => res.json(todos))
        .catch( error => res.status(400).json({error}) );

    }

}