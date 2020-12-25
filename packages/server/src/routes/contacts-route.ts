import { Router } from 'express';
import CreateContactService from '../services/create-contact-service';

const contactsRouter = Router();

contactsRouter.post('/', async (request, response) => {
  const { meet, discord, zoom } = request.body;
  const createContactService = new CreateContactService({
    userId: 'bfa14713-b4d1-4501-84ba-63bc80011d0b',
    contactInfo: {
      meet,
      discord,
      zoom,
    },
  });

  const contact = await createContactService.execute();

  return response.status(201).json(contact);
});

export default contactsRouter;
