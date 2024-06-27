import { FastifyReply, FastifyRequest } from 'fastify';
import sendMessageWhatsapp from '../commons/wa-service';
import WaRequest from '../types/wa-request';
import ThrowError from '../throws/ThrowError';

export default function (request: FastifyRequest<{ Body: WaRequest }>, response: FastifyReply) {
  if (!request.body) throw new ThrowError(400, 'data empty');

  const { message, to } = request.body;

  if (!message || !to) throw new ThrowError(400, 'data empty');
  try {
    sendMessageWhatsapp(to, message);
  } catch (error: any) {
    response.code(400).send({ message: error.message, statusCode: 500, data: '' });
  }

  response.code(200).send({ message: 'berhasil', statusCode: 200, data: '' });
}
