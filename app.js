const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const todos = require("./models/todo")
const todoModel = mongoose.model("todos")
const bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.json({ extended: false }))
app.use(express.json({ extended: true }))
const router1 = express.Router();

mongoose.connect(
    "mongodb+srv://daniyal:246810@cluster0.sy4wa.mongodb.net/todo?retryWrites=true&w=majority",
    () => {
        console.log("DB Connected Successfully");
    }
)
// app.use(mongoose())
let port = process.env.port || 5000;
router1.get("/todo", (req, res) => {
    // res.send("hello")
    todos.find({}, (err, result) => {
        if (err) {
            res.send(err).status(400);
            return;
        }
        else {
            res.send(result).status(200);
        }
    });
})
router1.get("/Data", (req, res) => {
    // res.send("hello")
    if (res.err) {
        console.log(res)
        // res.send({
        //     { "firstName":"John", "lastName":"Doe" },
        //     { "firstName":"Anna", "lastName":"Smith" },
        //     { "firstName":"Peter", "lastName":"Jones" }
        //   }).status(200);
        return;
    }
    else {
        res.send({
            "firstName": "John",
            "lastName": "Doe"
        }).status(200);
        // res.json({ a: 1 })
    }
});
router1.post("/todo", (req, res) => {
    console.log(req.body.title)
    let time = new Date().getTime()
    let obj = {
        title: req.body.title,
        date: time,
    }
    let data = new todos(obj)
    data.save((err, task) => {
        if (err) {
            console.log(err);
            res.status(400).send(err)
        }
        else {
            console.log(req.body);
            res.status(200).json(task)
        }
    })
})
router1.put("/todo/:id", (req, res) => {
    console.log(req.params.id);
    todoModel.findByIdAndUpdate((req.params.id, req.body), (err, success) => {
        if (err) {
            // console.log(req.params.id);
            res.status(404).send(err)
        }
        else {
            res.status(200).send(success)
            console.log(req.params.id, success);
        }
    })
})
router1.delete("/todo/:id", (req, res) => {
    console.log(req.params.id);
    // let obj = arr.find((x) => x.id == req.params.id)
    todoModel.findOneAndDelete({ _id: req.params.id }, (err, success) => {
        if (err) {
            console.log(req.params.id);
            res.status(404).send(err)
        }
        else {
            res.status(200).send({ "message": "deleted object", data: success })
            console.log(req.params.id, success);
        }
    }
    )
    // }
    // if (!obj) {
    //   res.status(404).send("Data Not Found");
    //   return;
    // }
    // arr.splice(arr.indexOf(obj), 1);
    // res.send("deleted Successfully").status(200);
});
app.use(router1)
    .listen(port, () => {
        console.log("server is Listening at", port);
    })