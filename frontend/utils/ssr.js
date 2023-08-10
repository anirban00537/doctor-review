import { parseCookies } from "nookies";

export const SSRAuthCheck = async (ctx, redirect) => {
  try {
    const cookies = parseCookies(ctx);
    ctx.token = cookies.token;
    ctx.res.writeHead(302, {
      Location: "/signin" + "?redirect=" + redirect,
    });
    ctx.res.end();

    return false;
  } catch (error) {
      
  }
};
