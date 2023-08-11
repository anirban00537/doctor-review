import { parseCookies } from "nookies";

export const SSRAuthCheck = async (ctx) => {
  try {
    const cookies = parseCookies(ctx);
    console.log(cookies.token, "cookies.token;");
    cookies.token;
    if (!cookies.token) {
      ctx.res.writeHead(302, {
        Location: "/login",
      });
      ctx.res.end();
      return false;
    }
    return true;
  } catch (error) {}
};
