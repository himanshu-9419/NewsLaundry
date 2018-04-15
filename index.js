var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
const request = require('request')
const csv = require('csvtojson')
var router = express.Router();

//read csv file over the network and push all the content in variable data;
var data = [];
csv()
    .fromStream(request.get('https://www.newslaundry.com/sample-data/sample-subscribers.csv'))
    .on('csv', (csvRow) => {
        data.push(csvRow);
    })
    .on('done', (error) => {

    })

//serve static content mainly index.html from  public folder
app.use(express.static(__dirname + '/public'));

//get all the unique month from data (not used in front end)
app.get('Months', function (req, res) {
    var month1 = data.map(x => x[3].split('/')[1]);
    var month2 = data.map(x => x[4].split('/')[1]);
    var month3 = month1.concat(month2)
    var set = new Set(month3)
    res.json({ month3 });
});

//get no of user retained for passed month
app.get('/Retention/:Month', function (req, res) {
    var month = req.params.Month;
    var added = data.filter(x => x[3].split('/')[1] == month).length;
    var lost = data.filter(x => x[4].split('/')[1] == month).length;
    res.json({ Month: month, Property: "Retention", Gain: added, Lost: -lost, Retain: added - lost });
});

//get distribution for passed month
app.get('/Division/:Month', function (req, res) {
    var monthArray = { "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6, "Jul": 7 };
    var month = req.params.Month;
    var GameChanger = data.filter(x =>
        x[1] == "GameChanger" &&
        monthArray[x[4].split('/')[1]] >= monthArray[month] &&
        monthArray[x[3].split('/')[1]] <= monthArray[month]
    ).length;
    var Liberator = data.filter(x =>
        x[1] == "Librator" &&
        monthArray[x[4].split('/')[1]] >= monthArray[month] &&
        monthArray[x[3].split('/')[1]] <= monthArray[month]
    ).length;
    var Disruptor = data.filter(x =>
        x[1] == "Disruptor" &&
        monthArray[x[4].split('/')[1]] >= monthArray[month] &&
        monthArray[x[3].split('/')[1]] <= monthArray[month]
    ).length;
    res.json({ Month: month, Property: "Division", GameChanger: GameChanger, Liberator: Liberator, Disruptor: Disruptor });
});

//make server strt listening on port passed
app.listen(port);
console.log('todo list RESTful API server started on: ' + port)