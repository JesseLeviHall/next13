/* import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  skipJwksCache: true,
  debug: true,
  publicRoutes: ["/", "/api/webhook", "/question/[id]", "/tags", "/tags/[id]", "/profile/[id]", "/community", "/jobs"],
  ignoredRoutes: ["/api/webhook", "/api/chatgpt"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
 */

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {}
