"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const todos = [];
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    console.log(req.body);
    try {
        const newTodo = {
            id: new Date().toString(),
            text: req.body.text
        };
        todos.push(newTodo);
        res.json(todos);
    }
    catch (error) {
        res.status(404).json({ success: "fail" });
    }
});
router.post('/delete', (req, res, next) => {
    let delId = req.body.id;
    let find;
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === delId) {
            find = i;
            break;
        }
    }
    if (find) {
        todos.splice(find, 1);
        res.json(todos);
    }
    else {
        res.status(404).json({ message: "Id not found" });
    }
});
router.post('/edit', (req, res, next) => {
    let find;
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === req.body.id) {
            find = 1;
            todos[i].text = req.body.text;
            break;
        }
    }
    if (find) {
        res.json(todos);
    }
    else {
        res.status(404).json({ message: "Id not found" });
    }
});
exports.default = router;
