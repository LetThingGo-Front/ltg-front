export async function GET() {
  const data = { status: 'success', message: 'GET method' };
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json', authorization: 'Bearer reissue-access-token' },
  });
}
