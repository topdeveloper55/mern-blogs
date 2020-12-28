const fastifyPlugin = require('fastify-plugin');

const dbUrl = `mongodb+srv://${process.env.CLUSTER_UNAME}:${process.env.CLUSTER_PSWD}@${process.env.CLUSTER_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

async function dbConnector(fastify) {
	fastify.register(require('fastify-mongodb'), {
		url: dbUrl,
	});
}

module.exports = fastifyPlugin(dbConnector);
