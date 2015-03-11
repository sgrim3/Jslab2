//require my modules
var path = require("path");
var User = require(path.join(__dirname,"../models/models")).user;
var Twote = require(path.join(__dirname,"../models/models")).twote;


var users = {};

//gets list of all twotes and sorts by timestamp
users.list = function(req, res) {
	User.find().exec(function (err, users) {
		if (err) {
			return console.log ("Something broke");
		}
		else {
			res.render("users", {
				users: users
			})
		}
	})
};

users.add = function (req, res) {
	var found = false;
	var username = (JSON.stringify (req.user.displayName)).replace(/\"/g, "");
	console.log("stringify displayName: "+username);

	User.find().exec(function (err, users) {
		if (err) {
			return console.log("Something broke!");
		}
		else {
			console.log("users: " + users)
			for (var i=0; i<users.length;i++) {
				if (users[i].username===username) {
					found = true;
					console.log("Found")
					break;
				}
			}

			if (found===false) {
				console.log("found is false")
				var userObj = new User({
					username: username
				});

				//save new user to databse
				userObj.save(function (err) {
			    	if (err) {
			    		console.log("Err: " + err);
			    	}
			    	else {
			    		res.redirect("/")	
				    }
			    });
			}

			else {res.redirect('/')}
		}
	})
};

users.login = function (req, res) {
	res.render ("login")
};

users.logout = function (req, res) {
	req.logout();
	res.redirect('/');
}

module.exports = users;


