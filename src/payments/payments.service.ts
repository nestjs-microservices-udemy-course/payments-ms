import { Injectable } from '@nestjs/common';
import envs from 'src/config/envs';
import Stripe from 'stripe';
import { PaymentSessionDto } from './dto/payment-session.dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(envs.STRIPE_SECRET_KEY, {});

  async createPaymentSession(paymentSessionDto: PaymentSessionDto) {
    const { currency, items } = paymentSessionDto;

    const session = await this.stripe.checkout.sessions.create({
      payment_intent_data: {},
      line_items: items.map((item) => ({
        price_data: {
          currency,
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `http://localhost:${envs.PORT}/payments/success`,
      cancel_url: `http://localhost:${envs.PORT}/payments/cancel`,
    });

    return session;
  }
}
