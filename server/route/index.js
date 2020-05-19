import { Router } from 'express';
import botRouter from './search';

const v1Router = Router();
v1Router.use('/api/v1', botRouter); // Search route for the Whatsapp bot to make the google searches

export default v1Router;