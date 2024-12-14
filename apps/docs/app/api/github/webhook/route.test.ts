import { describe, it, expect, vi } from 'vitest';
import { POST, GET } from './route';
import { NextResponse } from 'next/server';

describe('GitHub Webhook Handler', () => {
  const mockWebhookSecret = 'test-secret';
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
    process.env.GITHUB_WEBHOOK_SECRET = mockWebhookSecret;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should handle GET request', async () => {
    const response = await GET();
    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(200);
  });

  it('should reject requests with invalid signature', async () => {
    const mockRequest = new Request('http://localhost/api/github/webhook', {
      method: 'POST',
      headers: {
        'x-hub-signature-256': 'invalid-signature',
        'x-github-event': 'push',
      },
      body: JSON.stringify({ test: 'data' }),
    });

    const response = await POST(mockRequest);
    expect(response.status).toBe(401);
  });

  it('should handle push events', async () => {
    const payload = {
      repository: {
        full_name: 'test/repo',
      },
      ref: 'refs/heads/main',
      commits: [{ id: 'test-commit' }],
    };

    // Create valid signature
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', mockWebhookSecret);
    const signature = 'sha256=' + hmac.update(JSON.stringify(payload)).digest('hex');

    const mockRequest = new Request('http://localhost/api/github/webhook', {
      method: 'POST',
      headers: {
        'x-hub-signature-256': signature,
        'x-github-event': 'push',
      },
      body: JSON.stringify(payload),
    });

    const response = await POST(mockRequest);
    expect(response.status).toBe(200);
  });
});
