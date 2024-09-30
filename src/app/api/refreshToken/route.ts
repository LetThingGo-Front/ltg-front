import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const handler = async (request: NextRequest) => {
  if (request.method === 'DELETE') {
    cookies().delete('refreshToken');
    return NextResponse.json({ status: 'success', data: {} });
  }
};

export { handler as DELETE };
