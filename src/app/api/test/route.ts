export async function GET(request: Request) {
  const authorizationHeader = request.headers.get('Authorization');
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const token = authorizationHeader.split(' ')[1];

  if (token === 'test-access-token') {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
    method: 'GET',
  });

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}
