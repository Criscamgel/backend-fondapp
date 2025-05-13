import { Request, Response } from "express";
import { prisma } from "../../config/data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

export class TodosController {

    constructor(){}

    public get = async(req:Request, res:Response) => {

        const todos = await prisma.todo.findMany();

        res.json(todos);

    }

    public getById = async(req:Request | any, res:Response | any) => {
        const id = +req.params.id;
        if( isNaN(id) ) return res.status(400).json({ error: 'ID argument is not a number' });
        
        const todo = await prisma.todo.findFirst({
            where: {id}
        });

        ( todo ) 
            ? res.json(todo) 
            : res.status(404). json({ error: `TODO with ${ id } not found` })
    }

    public create = async(req:Request | any, res:Response | any) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({error});

        const todo = await prisma.todo.create({
            data: createTodoDto!
        })
        res.json(todo);
    }

    public update = async(req:Request | any, res:Response | any) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.update({...req.body, id});
        if(error) return res.status(400).json({error});

        const todo = await prisma.todo.findFirst({
            where: {id}
        });

        if( !todo ) return res.status(404).json({ error: `TODO with id ${ id } not found` });

        const updateTodo = await prisma.todo.update({
            where: {id},
            data: updateTodoDto!.values
        });

        res.json(updateTodo);
    }

    public delete = async(req:Request | any, res:Response | any) => {
        const id = +req.params.id;
        if( isNaN(id) ) return res.status(400).json({ error: 'ID argument is not a number' });

        const todo = await prisma.todo.findFirst({
            where: {id}
        });
        if( !todo ) return res.status(404).json({ error: `TODO with id ${ id } not found` });

        const deleteTodo = await prisma.todo.delete({
            where: {id}
        });

        (deleteTodo) ? res.json(deleteTodo) : res.status(400).json({ error: `TODO width id ${ id } not found` }); 

        res.json({todo, deleteTodo});

    }

}