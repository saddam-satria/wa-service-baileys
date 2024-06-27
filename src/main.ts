import routes from './configs/routes';
import { PORT } from './utils/constant';
import WaService from './configs/wa-gateway';
import Fastify, { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

(() => {
  const fastify = Fastify({
    logger: true,
  });

  routes(fastify);

  try {
    fastify.listen({ port: PORT as number });
    console.log(`listening on port ${PORT}`);

    const waService = WaService.getInstance();

    fastify.setErrorHandler((error: FastifyError, req: FastifyRequest, response: FastifyReply) => {
      response.code(error.statusCode).send({
        message: error.message,
        data: null,
        statusCode: error.statusCode,
      });
    });

    waService
      .connect()
      .then(() => console.log(`whatsapp service run (good)`))
      .catch((err) => {
        throw new Error(err);
      });
  } catch (error: any) {
    console.log(error.message);
  }
})();
