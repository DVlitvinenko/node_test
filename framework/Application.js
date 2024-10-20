const http = require("http");
const Emitter = require("events");

class Application {
  constructor() {
    this.emitter = new Emitter();
    this.server = this._createServer();
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  next(index) {
    return index++;
  }

  addRouter(router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach((method) => {
        this.emitter.on(this._getRouterMask(path, method), (req, res) => {
          const handler = endpoint[method];

          handler(req, res);
        });
      });
    });
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }

  _createServer() {
    return http.createServer((req, res) => {
      let index = 0;
      const next = () => {
        if (index < this.middlewares.length) {
          const middleware = this.middlewares[index++];
          middleware(req, res, next);
        } else {
          const emitted = this.emitter.emit(
            this._getRouterMask(req.pathname, req.method),
            req,
            res
          );
          if (!emitted) {
            res.end("404");
          }
        }
      };

      next();
    });
  }

  _getRouterMask(path, method) {
    return `[${path}]:[${method}]`;
  }
}

module.exports = Application;
