import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    const auth = req.headers.get("authorization") || "";

    const ADMIN_USER = process.env.ADMIN_USER || "admin";
    const ADMIN_PASS = process.env.ADMIN_PASS || "password";

    if (!auth || !auth.startsWith("Basic ")) {
      return new NextResponse("Authentication required", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Restricted"' },
      });
    }

    const base64 = auth.split(" ")[1] || "";
    let decoded = "";
    try {
      // atob is available in the Edge runtime
      decoded = atob(base64);
    } catch (e) {
      return new NextResponse("Invalid authorization header", { status: 400 });
    }

    const [user, pass] = decoded.split(":");
    if (user !== ADMIN_USER || pass !== ADMIN_PASS) {
      return new NextResponse("Invalid credentials", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Restricted"' },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
