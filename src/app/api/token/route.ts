import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = cookies();

  cookieStore.set('refreshToken', 'test-refresh-token');

  const data = { status: 'success', message: 'refresh token is set' };

  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
}
