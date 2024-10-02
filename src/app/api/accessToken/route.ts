import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const handler = async (request: NextRequest) => {
  if (request.method === 'DELETE') {
    const cookieStore = cookies();
    cookieStore.delete('accessToken');
    return NextResponse.json({ status: 'success', data: {} });
  }
};

export { handler as DELETE };
