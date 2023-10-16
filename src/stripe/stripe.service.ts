import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(configService.get<string>('STRIPE_SECRET_KEY'), { apiVersion: '2022-11-15' });
  }

  /**
   * Créer un consommateur dans stripe
   */
  async createCustomer(email: string) {
    return this.stripe.customers.create({ email });
  }

  /**
   * Créer une session pour le paiement
   */
  async createCheckoutSession(): Promise<string> {
    const session = await this.stripe.checkout.sessions.create({
      line_items: [
        {
          price: '1',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${this.configService.get<string>('FRONT_URL')}/checkout-success`,
      cancel_url: `${this.configService.get<string>('FRONT_URL')}/cart`,
    });

    return session.url;
  }
}
