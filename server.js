var express = require("express")
var app = express()
var db = require("./database.js")
const cors = require('cors');
var HTTP_PORT = 8000 

app.use(cors({
    origin: '*'
}));

app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

app.get("/", async (req, res, next) => {
    res.send("ok"); 
});

app.get("/api/word/:id", (req, res, next) => {
    var sql = "SELECT * FROM ( select * from words WHERE length(name) = "+req.params.id+") as b LIMIT 1 OFFSET ABS(RANDOM()) % MAX((SELECT COUNT(*) FROM ( select * from words WHERE length(name) ="+req.params.id+")), 1)";

    var test = `SELECT name from words WHERE length(name) = `+req.params.id+`
    ORDER BY RANDOM() 
    LIMIT 1`;
    db.all(test, [],(err, row, ) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json(row[0])
      });
});


app.get("/api/check/:word", (req, res, next) => {
    var sql = "SELECT COUNT(*) FROM words WHERE name = ?";
    const word = (req.params.word).toLocaleLowerCase();
    db.all(sql, [word],(err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }

        res.json({          
            "exits": row[0]["COUNT(*)"] > 0
        })
      });
});


app.use(function(req, res){
    res.status(404);
});