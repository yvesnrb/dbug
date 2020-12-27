import { getRepository } from 'typeorm';
import Contact from '../entities/contact-entity';
import User from '../entities/user-entity';
import defineAbilitiesFor from '../abilities/user-abilities';
import AppError from '../errors/app-error';

interface Request {
  userId: string;
  contactInfo: {
    meet?: string;
    discord?: string;
    zoom?: string;
  };
}

class CreateContactService {
  private userId: string;

  private contactInfo: Request['contactInfo'];

  private contactsRepository = getRepository(Contact);

  private usersRepository = getRepository(User);

  private user: User;

  private contact: Contact;

  constructor(data: Request) {
    this.userId = data.userId;
    this.contactInfo = data.contactInfo;
  }

  public async execute(): Promise<Contact> {
    await this.fetchUser();
    this.verifyAbility();
    await this.createContact();

    return this.contact;
  }

  public async fetchUser(): Promise<void> {
    this.user = await this.usersRepository.findOneOrFail({
      where: { id: this.userId },
    });
  }

  public async createContact(): Promise<void> {
    this.contact = new Contact();

    this.contact.meet = this.contactInfo.meet;
    this.contact.discord = this.contactInfo.discord;
    this.contact.zoom = this.contactInfo.zoom;

    await this.contactsRepository.save(this.contact);

    this.user.contact_id = this.contact.id;

    await this.usersRepository.save(this.user);
  }

  public verifyAbility(): void {
    const ability = defineAbilitiesFor(this.user);

    if (ability.cannot('create', 'Contact'))
      throw new AppError('badrequest', 400);
  }
}

export default CreateContactService;
