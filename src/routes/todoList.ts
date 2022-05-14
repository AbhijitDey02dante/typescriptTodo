import { fail } from 'assert';
import { Router } from 'express';

import { Todo } from '../model/todo';

const router=Router();

const todos:Todo[]=[];

type requestBody = {text:string};
type requestId = {id:string};
type requestBodyId={id:string;text:string};

router.get('/',(req,res,next)=>{
    res.status(200).json({todos:todos});
})

router.post('/todo',(req,res,next)=>{
    const body=req.body as requestBody;
    try{
        const newTodo:Todo = {
            id:new Date().toString(),
            text:body.text
        };
        todos.push(newTodo);
        res.json(todos);    
    }
    catch(error){
        res.status(404).json({success:"fail"});
    }
})

router.post('/delete',(req,res,next)=>{
    let delId=req.body as requestId;
    let find;
    for(let i=0;i<todos.length;i++){
        if(todos[i].id===delId.id)
        {
            find=i;
            break;
        }
    }
    if(find){
        todos.splice(find,1);
        res.json(todos);
    }
    else{
        res.status(404).json({message:"Id not found"});
    }
})


router.post('/edit',(req,res,next)=>{
    let find;
    const body=req.body as requestBodyId;
    for(let i=0;i<todos.length;i++){
        if(todos[i].id===body.id)
        {
            find=1;
            todos[i].text=body.text;
            break;
        }
    }
    if(find){
        res.json(todos);
    }
    else{
        res.status(404).json({message:"Id not found"});
    }
})

export default router;