var express = require('express');
var router = express.Router();
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('YOUR API KEY');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Форма отправки сообщений' });
});
router.post('/', function(req, res) {
	var message = {
			"text": req.body.desc,
			"from_email": req.body.mail,
			"subject": "send message",
			"from_name": req.body.name,
			"to": [{
							"email": "yourEmail@example.com",
							"name": "Your Name",
							"type": "to"
					}]
	};
	mandrill_client.messages.send({"message": message}, function(result) {
		console.log(result);
		res.render('sent', {title : "Cообщение отправлено", message: message });
	}, function(e) {
		console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
		res.render('index', { title: 'Форма отправки сообщений', message : e.message  });
	});
});
module.exports = router;
