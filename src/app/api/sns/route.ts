import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const handler = (request: NextRequest, response: NextResponse) => {
  const data = response.body;
  const cookieStore = cookies();

  return redirect('/');
};

export { handler as GET, handler as POST };
