import { FastifyInstance } from 'fastify';
import waService from '../services/wa-service';

const routes = (fastify: FastifyInstance) => {
  fastify.post('/wa/send', waService);
};

export default routes;
