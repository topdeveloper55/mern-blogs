require('dotenv').config();

const Fastify = require('fastify');
const gqlServer = require('@sdblog/graphql/gqlFastify');
const mongoose = require('mongoose');

const dbUrl = `mongodb+srv://${process.env.CLUSTER_UNAME}:${process.env.CLUSTER_PSWD}@${process.env.CLUSTER_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

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

	mongoose
		.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
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
