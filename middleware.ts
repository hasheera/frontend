// middleware.ts
import { NextRequest, NextResponse } from "next/server";


export default function middleware(req: NextRequest) {
  const response = NextResponse.next()
  const { cookies } = req
  const token = cookies.get("token")

  if(!token) {
    return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_USER_URL)
    // response.cookies.set("token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvdGVzdGFwaS5zaG9wdXJiYW4uY29cL2FwaVwvYXV0aFwvcGFzc3dvcmQtbG9naW4iLCJpYXQiOjE2NTY3NzgxMzgsImV4cCI6MTY1Nzk4NzczOCwibmJmIjoxNjU2Nzc4MTM4LCJqdGkiOiJFcXk1YzJ1TmhJZzQxbnFxIiwic3ViIjo1LCJwcnYiOiJjZWQ0MDg4M2I4MWFiMDNhZTY1ZTdiNzdmYjNiNzVjZTIyNThkYjg0In0.aeOypH9mplSGBUCtrvv8igwx7Kr4JlJ86_hfH9RDdGI")
  }

  if(req.nextUrl.pathname === "/") return NextResponse.redirect(new URL("/dashboard", req.url))

  return response;
}