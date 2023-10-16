import { ForbiddenException, Injectable } from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SendgridService {
  constructor(private configService: ConfigService) {
    SendGrid.setApiKey(configService.get<string>('SENDGRID_KEY'));
  }

  /**
   * Envoie d'un email Sendgrid
   */
  async send(mail: SendGrid.MailDataRequired) {
    try {
      return await SendGrid.send(mail);
    } catch (err) {
      throw new ForbiddenException("Erreur lors de l'envoi du mail");
    }
  }
}
