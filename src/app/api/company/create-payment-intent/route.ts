import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from "@/Lib/prisma"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia' as const,
});

export async function POST(req: Request) {
  try {
    const { companyId } = await req.json();

    const customer = await stripe.customers.create({
      metadata: {
        companyId: companyId,
      }
    });

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'cad',
            product_data: {
              name: 'Company Membership',
              description: 'Company Membership Subscription',
            },
            unit_amount: 10000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/company/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/company/profile`,
      metadata: {
        companyId: companyId,
      },
      invoice_creation: {
        enabled: true, 
      },
    });

    await prisma.companyPayments.create({
      data: {
        companyId,
        amount: 100.00,
        status: 'PENDING',
        stripeSessionId: session.id,
      },
    });

    await prisma.companyMembership.upsert({
      where: {
        companyId: companyId,
      },
      update: {
        status: 'PENDING',
      },
      create: {
        companyId: companyId,
        status: 'PENDING',
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
} 