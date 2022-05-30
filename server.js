const Joi = require("joi");
const express = require("express");

const app = express();

app.use(express.json());

const users = [
  { id: 1, name: "USER 1" },
  { id: 2, name: "USER 2" },
  { id: 3, name: "USER 3" },
  { id: 4, name: "USER 4" },
  { id: 5, name: "USER 5" },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World, Welcome to REST API</h1>");
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) res.status(404).send("The User with given Id was NOT Found...!");
  res.send(user);
});

// POST REQUEST

app.post("/users", (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(404).send(result.error.details[0].message);
    return;
  }

  const user = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(user);
  res.send(user);
});

// PUT REQUEST
app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) res.status(404).send("The User with given Id was not found");

  const schema = {
    name: Joi.string().min(3).required(),
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(404).send(result.error.details[0].message);
    return;
  }

  user.name = req.body.name;
  res.send(user);
});

// DELETE REQUEST 


app.delete('/users/:id',(req,res)=>{
    const user=users.find(u=>u.id===parseInt(req.params.id))
    if(!user)  res.status(404).send("The User with given Id was not found")

    const index=users.indexOf(user)
    users.splice(index,1)
    res.send(user)
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Running server");
});
