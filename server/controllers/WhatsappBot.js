import { google } from 'googleapis';
import dotenv from 'dotenv';
import twilio from 'twilio';
dotenv.config();

//Loading the Environment Variables
const {
    SID: accountSid,
    KEY: TwilloAuthToken,
    APIKEY: googleApiKey,
    CX: cx
} = process.env;

twilio(accountSid, TwilloAuthToken);
const { MessagingResponse } = twilio.twiml;
const customsearch = google.customsearch('v1');

/**
 * @class WhatsappBot
 * @description class based component to implement the bot functionality
 */
class WhatsappBot {
    /**
     * @memberof WhatsappBot
     * @param {object} req - Request sent to the route
     * @param {object} res - Response sent from the controller
     * @param {object} next - Error handler
     * @returns {object} - object representing response message
     */
    static async googleSearch(req, res, next) {
        const twiml = new MessagingResponse(); // Initializng MessgingResponse object
        const q = req.body.Body; // Extract the query the user is sending from req.body.Body
        const options = { cx, q, auth: googleApiKey };

        try {
            const result = await customsearch.cse.list(options);//calling the Google customsearch method and passing it the options parameter
            const firstResult = result.data.items[0]; //Get the first content from the search result and send back to the user.
            const searchData = firstResult.snippet;
            const link = firstResult.link;

            twiml.message(`${searchData} ${link}`);

            res.set('Content-Type', 'text/xml');

            return res.status(200).send(twiml.toString());
        } catch (error) {
            return next(error);
        }
    }
}