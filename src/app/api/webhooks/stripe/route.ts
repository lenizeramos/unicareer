import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from "@/Lib/prisma"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia' as const,
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const companyId = session.metadata?.companyId;

      const invoice = await stripe.invoices.retrieve(session.invoice as string);

      if (companyId) {
        const payment = await prisma.companyPayments.findFirst({
          where: { companyId: companyId },
          orderBy: { createdAt: 'desc' }
        });

        if (payment) {
          await prisma.companyPayments.update({
            where: { id: payment.id },
            data: { 
              status: 'COMPLETED',
              invoice: invoice.hosted_invoice_url 
            }
          });
        }

        await prisma.companyMembership.update({
          where: {
            companyId: companyId,
          },
          data: {
            status: 'ACTIVE',
          },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
}