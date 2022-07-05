import { NextResponse } from 'next/server';

export async function middleware(req: { nextUrl: { pathname: string; origin: string } }) {
  const { pathname, origin } = req.nextUrl;
  if (pathname == '/') {
    // return NextResponse.redirect(`${origin}/appointment-scheduling/book-appointment`);
    return;
  }
  return NextResponse.next();
}
