// Middleware
{
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
  });

  let user = {
    name: "mukesh kumar",
    isAdmin: false,
    isLogin: false,
  };

  const isLogin = (req, res, next) => {
    if (user.isLogin) {
      next();
    } else {
      res.status(401).json({
        msg: "Unuthorized",
      });
    }
  };

  app.use(isLogin);
}
