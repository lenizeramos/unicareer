import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia' as const,
});

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    const invoice = await stripe.invoices.retrieve(session.invoice as string);

    return NextResponse.json({ 
      invoiceUrl: invoice.hosted_invoice_url 
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Error fetching invoice' },
      { status: 500 }
    );
  }
} 