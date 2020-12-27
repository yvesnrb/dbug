import { Router } from 'express';
import { validate } from 'express-validation';
import CreateContactService from '../services/create-contact-service';
import authorizeToken from '../middleware/authorize-token-middleware';
import UpdateContactService from '../services/update-contact-service';
import contactSchema from '../schemas/contact-schema';

const contactsRouter = Router();

contactsRouter.post(
  '/',
  authorizeToken,
  validate({ body: contactSchema }),
  async (request, response) => {
    const { meet, discord, zoom } = request.body;
    const createContactService = new CreateContactService({
      userId: request.session.id,
      contactInfo: {
        meet,
        discord,
        zoom,
      },
    });

    const contact = await createContactService.execute();

    return response.status(201).json(contact);
  },
);

contactsRouter.put(
  '/',
  authorizeToken,
  validate({ body: contactSchema }),
  async (request, response) => {
    const { meet, discord, zoom } = request.body;
    const updateContactService = new UpdateContactService({
      userId: request.session.id,
      contactInfo: {
        meet,
        discord,
        zoom,
      },
    });

    const contact = await updateContactService.execute();

    return response.status(200).json(contact);
  },
);

export default contactsRouter;
