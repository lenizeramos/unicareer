import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia' as const,
});

export async function createCheckoutSession(req: Request) {
  try {
    const body = await req.json();
    const { items } = body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(() => ({
        price_data: {
          currency: 'cad',
          product_data: {
            name: "Company Membership",
            description: "Company Membership",
          },
          unit_amount: 10000,
        },
        quantity: 1,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/company/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/company/profile`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Error creating checkout session' },
      { status: 500 }
    );
  }
}