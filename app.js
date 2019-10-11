const express = require('express');
const app = express();
const port = 5555 || process.env.PORT;

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/contact",express.static('Views'));

app.post("/contact", (req,res) => {
    console.log(req.body.email);
    console.log(req.body.pwd);
    res.json({"Status" : "Success"});
})

app.listen(port, () => {
    console.log(`Server started at ${port}`);
});

