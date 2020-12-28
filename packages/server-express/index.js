const app = require('./src/express-config');
require('dotenv').config();

app.listen(`${process.env.port || 4000}`, () => {
	console.log(`Server started at port : ${process.env.port}`);
});
