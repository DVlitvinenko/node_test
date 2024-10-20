module.exports = (baseUrl) => (req, res, next) => {
  const parsedUrl = new URL(`${baseUrl}${req.url}`);
  req.pathname = parsedUrl.pathname;
  const params = {};
  parsedUrl.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  req.query = parsedUrl.searchParams;
  req.params = params;
  next();
};
