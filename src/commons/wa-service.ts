import ThrowError from '../throws/ThrowError';
import WaService from '../configs/wa-gateway';

const sendMessageWhatsapp = async (to: string, body: string, countryCode?: string) => {
  const receiver = to.replace('0', countryCode ?? '62');
  const whatsapp = WaService.getInstance();

  try {
    return await whatsapp.whatsapp.sendMessage(`${receiver}@s.whatsapp.net`, { text: body });
  } catch (error) {
    throw new ThrowError(500, 'something wrong');
  }
};

export default sendMessageWhatsapp;
