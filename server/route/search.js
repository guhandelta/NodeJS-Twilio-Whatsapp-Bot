import { Router } from 'express';
import WhatsappBot from '../controllers/WhatsappBot'; // import the WhatsAppbot controller and set post route

const botRouter = Router();

botRouter.post('/incoming', WhatsappBot.googleSearch);

export default botRouter;