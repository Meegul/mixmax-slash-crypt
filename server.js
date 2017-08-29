const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const cors = require('cors');

// Since Mixmax calls this API directly from the client-side, it must be whitelisted.
const corsOptions = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: true
};

app.get('/typeahead', cors(corsOptions), (req, res) => { console.log(req.query.text); require('./api/typeahead')(req, res);});
app.get('/resolver', cors(corsOptions), require('./api/resolver'));

if (process.env.NODE_ENV === 'production') {
	app.listen(process.env.PORT || 9145);
  } else {
	const pem = require('pem');
	const https = require('https');
	pem.createCertificate({ days: 1, selfSigned: true }, function(err, keys) {
	  if (err) throw err;
  
	  https.createServer({
		key: keys.serviceKey,
		cert: keys.certificate
	  }, app).listen(process.env.PORT || 9145);
	});
  }