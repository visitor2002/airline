// var express = require('express');
// var router = express.Router();


// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// // module.exports = router;
// exports.router = router;



//
// var flight = require('../flight');

// var flight1 = flight({
// 	number: 1,
// 	origin: 'LAX',
// 	destination: 'DCA',
// 	departs: '9AM',
// 	arrives: '4PM'
// });

// var flight2 = flight({
// 	number: 2,
// 	origin: 'LAX',
// 	destination: 'PDX',
// 	departs: '10AM',
// 	arrives: '12PM'
// });

// exports.flight1 = function(req, res){
//   res.json(flight1.getInformation());
// };

// exports.flight2 = function(req, res){
//   res.json(flight2.getInformation());
// };
//




// //
// var flights = require('../data');
// var flight = require('../flight');

// for(var number in flights){
// 	flights[number] = flight(flights[number]);
// };

// exports.flight = function(req, res){
// 	var number = req.param('number');

// 	if(typeof flights[number] === 'undefined'){
// 		res.status(404).json({status: 'error'});
// 	}
// 	else {
// 		res.json(flights[number].getInformation());
// 	};
  
// };
// //



// //
// var flights = require('../data');
// var flight = require('../flight');

// for(var number in flights){
// 	flights[number] = flight(flights[number]);
// };

// exports.flight = function(req, res){
// 	var number = req.param('number');

// 	if(typeof flights[number] === 'undefined'){
// 		res.status(404).json({status: 'error'});
// 	}
// 	else {
// 		res.json(flights[number].getInformation());
// 	};
  
// };

// exports.arrived = function(req, res){
// 	var number = req.param('number');

// 	if(typeof flights[number] === 'undefined'){
// 		res.status(404).json({status: 'error'});
// 	}
// 	else {
// 		flights[number].triggerArrive();
// 		res.json({status: 'done'});
// 	};
  
// };

// //


// //
// var flights = require('../data');
// var flight = require('../flight');

// for(var number in flights){
// 	flights[number] = flight(flights[number]);
// };

// exports.flight = function(req, res){
// 	var number = req.param('number');

// 	if(typeof flights[number] === 'undefined'){
// 		res.status(404).json({status: 'error'});
// 	}
// 	else {
// 		res.json(flights[number].getInformation());
// 	};
  
// };

// exports.arrived = function(req, res){
// 	var number = req.param('number');

// 	if(typeof flights[number] === 'undefined'){
// 		res.status(404).json({status: 'error'});
// 	}
// 	else {
// 		flights[number].triggerArrive();
// 		res.json({status: 'done'});
// 	};
  
// };


// exports.list = function(req, res){
// 	res.render('list', {title: 'All Flights', flights: flights});
  
// };

// //


//


var FlightSchema = require('../schemas/flight');
var Emitter  = require('events').EventEmitter;
var flightEmitter = new Emitter();

flightEmitter.on('arrival', function(flight){
		var record = new FlightSchema(
			flight.getInformation()
			);

		record.save(function(err){
			if(err){
				console.log(err);
			}
		});
});

flightEmitter.on('arrival', function(flight){
		console.log('Flight arrived:' + flight.data.number);
});

module.exports = function(flights){
var func = {};

var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// module.exports = router;
func.router = router;

// var flights = require('../data');
var flight = require('../flight');


for(var number in flights){
	flights[number] = flight(flights[number]);
};

func.flight = function(req, res){
	// var number = req.param('number');
	var number = req.params['number'];

	req.session.lastNumber = number;
	// req.session.lastNumberR = 100;

	if(typeof flights[number] === 'undefined'){
		res.status(404).json({status: 'error'});
	}
	else {
		res.json(flights[number].getInformation());
	};
  
};



func.arrived = function(req, res){
	// var number = req.param('number');
	var number = req.params['number'];

	if(typeof flights[number] === 'undefined'){
		res.status(404).json({status: 'error'});
	}
	else {
		flights[number].triggerArrive();

		flightEmitter.emit('arrival', flights[number]);
		res.json({status: 'success'});


		// var record = new FlightSchema(
		// 	flights[number].getInformation()
		// 	);

		// record.save(function(err){
		// 	if(err){
		// 		console.log(err);
		// 		res.status(500).json({status: 'failure'});
		// 	}
		// 	else {
		// 		res.json({status: 'success'});
		// 	}
		// });

		// res.json({status: 'done'});
	};
  
};



func.list = function(req, res){
	res.render('list', {title: 'All Flights', flights: flights});
  
};


func.listjson = function(req, res){
	var flightDate = [];
	for (var number in flights){
		flightDate.push(flights[number].getInformation());
	};

	// var flightDate = require('../data');
	res.json(flightDate);  
};


func.arrivals = function(req, res){
  FlightSchema.find()
  .setOptions({sort: 'actualArrive'})
  .exec(function(err, arrivals){
  			if(err){
				console.log(err);
				res.status(500).json({status: 'failure'});
			}
			else {
				res.render('arrivals', {title: 'Arrivals',
				 arrivals: arrivals,
				 lastNumber: req.session.lastNumber
				});
			}

  });
};

func.login = function(req, res){
	res.render('login', {title: 'Log in'});
  
};

func.user = function(req, res){
	if(req.session.passport.user === undefined){
		res.redirect('/login');
	}
	else {
		// console.log('req= ', req);
		res.render('user', {title: 'Welcome!',
			user: req.user
	});
	}  
};

return func;

};

//