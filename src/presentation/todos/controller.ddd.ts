import { Request, Response } from "express";
import { prisma } from "../../config/data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

export class TodosController {

    constructor(
        private readonly todoRepository: TodoRepository
    ){}

    public get = async(req:Request, res:Response) => {
        const todos = await this.todoRepository.getAll()
        return res.json(todos);
    }

    public getById = async(req:Request | any, res:Response | any) => {
        const id = +req.params.id;
        if( isNaN(id) ) return res.status(400).json({ error: 'ID argument is not a number' });

        try {
            const todo = await this.todoRepository.findById(id);
            res.json(todo);
        } catch (error) {
          res.status(400).json({error});
        }

    }

    public create = async(req:Request | any, res:Response | any) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({error});

        const todo = await this.todoRepository.create(createTodoDto!);
        res.json(todo);
    }

    public update = async(req:Request | any, res:Response | any) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.update({...req.body, id});
        if(error) return res.status(400).json({error});

        const updateTodo = await this.todoRepository.updateById(updateTodoDto!);
        return res.json(updateTodo);
    }

    public delete = async(req:Request | any, res:Response | any) => {
        const id = +req.params.id;
        const deletedTodo = await this.todoRepository.deleteById(id);
        res.json(deletedTodo);

    }

}