// `apiRoutes.js` file should contain two routes:

//    * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
//    * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic. 

var friendsData = require('../data/friends');
var bodyParser = require('body-parser');

//Routes
module.exports = function(app) {
	//get request
  app.get('/api/friends', function(req, res) {
    res.json(friendsData);
  });

  // API POST Requests
  app.post('/api/friends', function(req, res) {
      var userData = req.body;
      // console.log(userData);
      var userResponses = userData.scores;
      // console.log(userResponses);

      // // //compute
      var matchName = '';
      var matchImage = '';
      var friendDiff = 1000;

      //loop through all friends
      for (var i = 0; i < friendsData.length; i++) {
      	// console.log('friend: ' + JSON.stringify(friendsData[i]));

      	var totalDifference = 0;
      	for (var j = 0; j < friendsData[i].scores[j]; j++) {
      		totalDifference += Math.abs(parseInt(userResponses[j]) - parseInt(friendsData[i].scores[j]));
      	}
      	// console.log("totalDifference: " + totalDifference);
      	//check lowest
      	if(totalDifference <= friendDiff){
      		// console.log('closest match: ' + totalDifference);
      		// console.log('friend name: ' + friendsData[i].name);
      		// console.log('friend image: ' + friendsData[i].photo);

      		friendDiff = totalDifference;
      		matchName = friendsData[i].name;
      		matchImage = friendsData[i].photo;

      	}

      }

      friendsData.push(userData);
      res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
  });
};
