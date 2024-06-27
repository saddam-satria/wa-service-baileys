import makeWASocket, { useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';

class WaService {
  whatsapp;
  static waService: WaService | null = null;
  static getInstance(): WaService {
    if (!WaService.waService) {
      return new WaService();
    }

    return this.waService;
  }

  async connect(): Promise<void> {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
    const socket = makeWASocket({
      printQRInTerminal: true,
      auth: state,
    });
    this.whatsapp = socket;

    this.whatsapp.ev.on('creds.update', saveCreds);

    this.whatsapp.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect } = update;
      if (connection === 'close') {
        const shouldReconnect = (lastDisconnect!.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
        console.log('connection closed due to ', lastDisconnect!.error, ', reconnecting ', shouldReconnect);
        if (shouldReconnect) {
          this.connect();
        }
      } else if (connection === 'open') {
        console.log('opened connection');
      }
    });
  }
}
export default WaService;
