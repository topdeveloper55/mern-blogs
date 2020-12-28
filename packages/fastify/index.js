require('dotenv').config();

const Fastify = require('fastify');
const dbConnector = require('./src/plugins/connectdb');
const gqlServer = require('@sdblog/graphql/gqlFastify');

async function build() {
	const fastify = Fastify({
		logger: {
			level: 'info',
			prettyPrint: true, // requires pino-pretty pkg
		},
		ignoreTrailingSlash: true,
		caseSensitive: false,
	});

	await fastify.register(require('middie'));
	fastify.register(require('fastify-cors'), {});
	// fastify.register(dbConnector);
	mongoose
		.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
		.then(() => console.log('Connected to MongoDB Cloud...'));
	fastify.register(gqlServer.createHandler());

	return fastify;
}

// Run the server!
const start = async () => {
	build()
		.then((fastify) => fastify.listen(`${process.env.port || 4000}`))
		.catch((err) => {
			console.error(err);
			process.exit(1);
		});
};

start();
