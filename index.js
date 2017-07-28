const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MeCab = new require('mecab-async');
const mecab = new MeCab();
const ini = require('node-ini');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

const cfg = ini.parseSync('./config.ini');

app.post('/filter', (req, res) => {
  const word = social_filter(req.body.text);
//	console.log(word);
  let json = { "result" : word }		
  res.send(JSON.stringify(json, null , "\t"));
})

app.listen(3000, () => {
  console.log('social_filter server begin');
});

function social_filter(text) {
	let analyzed_text = mecab.parseSync(text);
	let filtered_text = analyzed_text
		.map((word) => filter(word))
		.reduce((prev, elem) => prev + elem);	
	return filtered_text;
}

function filter(word) {
	let result;
	switch(word[1]) { 
    case "名詞": { 
			result = cfg.words.noun;
			break; 
		} 
		case "動詞": {
			result = cfg.words.verb;
			break; 
		}
		case "形容詞": {
			result = cfg.words.adjective;
      break;    
		} 
		default: { 
			result = word[0];
      break;              
		} 
	}
	return result;
}
