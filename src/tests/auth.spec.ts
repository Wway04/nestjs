// tests/auth.spec.ts
import { test, expect } from '@playwright/test';

test('signup → login → gọi protected route', async ({ request }) => {
  // 1. Signup
  await request.post('/auth/signup', {
    data: { email: 'flow@test.com', password: 'Password@123', username: 'flowuser' },
  });

  // 2. Login lấy token
  const loginRes = await request.put('/auth/login', {
    data: { email: 'flow@test.com', password: 'Password@123' },
  });
  const { accessToken } = await loginRes.json();

  // 3. Gọi protected route với token
  const profileRes = await request.get('/auth/profile', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  expect(profileRes.status()).toBe(200);
});
