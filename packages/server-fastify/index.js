require('module-alias/register');
require('dotenv').config();

const Fastify = require('fastify');

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
	fastify.use(require('fastify-cors')());
	// fastify.register(require('./src/plugins/mongo'));

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
