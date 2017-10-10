var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose()
const path = require('path')
const dbPath = path.resolve(__dirname, 'taskList.db')
const db = new sqlite3.Database(dbPath)
var stringify = require('json-stringify');


db.serialize(function () {
  db.all("SELECT count(*) FROM sqlite_master WHERE type = 'table' AND name = 'tasks'", function(err, table){

    if(table = 0){
      db.run("CREATE TABLE tasks (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, done INTEGER NOT NULL,  hidden INTEGER NOT NULL);");
      db.run("INSERT into tasks(name, done, hidden) VALUES ('Test Task', 0, 0)");
    }
  });
})
/* GET users listing. */
router.post('/', function(req, res, next) {
  //res.send('respond with a resource');
  //var taskName = req.body.task_name;
  db.run("INSERT into tasks(name, done, hidden) VALUES (" + "'req.body.task_name'" + ", 0, 0)");
  console.log(req.body.task_name);
});

router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  //var taskName = req.body.task_name;
  db.all("SELECT * FROM tasks", function(err, rows){
    res.send(rows);
  });
});

router.delete('/', function(req, res, next) {
  //res.send('respond with a resource');
  //var taskName = req.body.task_name;
  db.run("DELETE from tasks WHERE id =" + req.body.delete_id);
  console.log(req.body.delete_id);
});


module.exports = router;
