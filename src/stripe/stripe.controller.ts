import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerCreate } from './decorators/swagger.decorator';
import { StripeService } from './stripe.service';
import { Auth } from '../auth/decorators/auth.decorator';

@ApiTags('Stripe')
@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Post('checkout/session')
  @Auth()
  @SwaggerCreate()
  async createCheckoutSession(): Promise<string> {
    return this.stripeService.createCheckoutSession();
  }
}
