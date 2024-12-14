import { NextResponse } from 'next/server';
import { createHmac } from 'crypto';

// Verify GitHub webhook signature
function verifySignature(payload: string, signature: string, secret: string) {
  const hmac = createHmac('sha256', secret);
  const digest = Buffer.from('sha256=' + hmac.update(payload).digest('hex'), 'utf8');
  const checksum = Buffer.from(signature, 'utf8');
  return digest.length === checksum.length && crypto.timingSafeEqual(digest, checksum);
}

export async function POST(req: Request) {
  try {
    const payload = await req.text();
    const signature = req.headers.get('x-hub-signature-256');
    const githubEvent = req.headers.get('x-github-event');
    const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET;

    // Verify webhook secret is configured
    if (!webhookSecret) {
      console.error('GITHUB_WEBHOOK_SECRET is not configured');
      return new NextResponse('Webhook secret not configured', { status: 500 });
    }

    // Verify webhook signature
    if (!signature || !verifySignature(payload, signature, webhookSecret)) {
      return new NextResponse('Invalid signature', { status: 401 });
    }

    // Parse the webhook payload
    const data = JSON.parse(payload);

    // Handle different webhook events
    switch (githubEvent) {
      case 'push':
        // Handle push event
        console.log('Push event received:', {
          repository: data.repository.full_name,
          ref: data.ref,
          commits: data.commits?.length || 0,
        });
        break;

      case 'pull_request':
        // Handle pull request event
        console.log('Pull request event received:', {
          repository: data.repository.full_name,
          action: data.action,
          number: data.number,
        });
        break;

      // Add more event handlers as needed
      default:
        console.log(`Unhandled event type: ${githubEvent}`);
    }

    return new NextResponse('Webhook processed successfully', { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new NextResponse('Error processing webhook', { status: 500 });
  }
}

// Optionally handle GET requests to test the endpoint
export async function GET() {
  return new NextResponse('GitHub webhook endpoint is working', { status: 200 });
}
