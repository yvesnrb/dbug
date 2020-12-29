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

class UpdateContactService {
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
    await this.fetchContact();
    await this.updateContact();

    return this.contact;
  }

  public async fetchUser(): Promise<void> {
    this.user = await this.usersRepository.findOneOrFail({
      where: { id: this.userId },
    });
  }

  public async fetchContact(): Promise<void> {
    this.contact = await this.contactsRepository.findOneOrFail({
      where: { id: this.user.contact_id },
    });
  }

  public async updateContact(): Promise<void> {
    this.contact.meet = this.contactInfo.meet || null;
    this.contact.discord = this.contactInfo.discord || null;
    this.contact.zoom = this.contactInfo.zoom || null;

    await this.contactsRepository.save(this.contact);
  }

  public verifyAbility(): void {
    const ability = defineAbilitiesFor(this.user);

    if (ability.cannot('update', 'Contact'))
      throw new AppError('badrequest', 400);
  }
}

export default UpdateContactService;
