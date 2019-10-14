parcelRequire = (function(e, r, t, n) {
  var i,
    o = 'function' == typeof parcelRequire && parcelRequire,
    u = 'function' == typeof require && require;
  function f(t, n) {
    if (!r[t]) {
      if (!e[t]) {
        var i = 'function' == typeof parcelRequire && parcelRequire;
        if (!n && i) return i(t, !0);
        if (o) return o(t, !0);
        if (u && 'string' == typeof t) return u(t);
        var c = new Error("Cannot find module '" + t + "'");
        throw ((c.code = 'MODULE_NOT_FOUND'), c);
      }
      (p.resolve = function(r) {
        return e[t][1][r] || r;
      }),
        (p.cache = {});
      var l = (r[t] = new f.Module(t));
      e[t][0].call(l.exports, p, l, l.exports, this);
    }
    return r[t].exports;
    function p(e) {
      return f(p.resolve(e));
    }
  }
  (f.isParcelRequire = !0),
    (f.Module = function(e) {
      (this.id = e), (this.bundle = f), (this.exports = {});
    }),
    (f.modules = e),
    (f.cache = r),
    (f.parent = o),
    (f.register = function(r, t) {
      e[r] = [
        function(e, r) {
          r.exports = t;
        },
        {}
      ];
    });
  for (var c = 0; c < t.length; c++)
    try {
      f(t[c]);
    } catch (e) {
      i || (i = e);
    }
  if (t.length) {
    var l = f(t[t.length - 1]);
    'object' == typeof exports && 'undefined' != typeof module
      ? (module.exports = l)
      : 'function' == typeof define && define.amd
      ? define(function() {
          return l;
        })
      : n && (this[n] = l);
  }
  if (((parcelRequire = f), i)) throw i;
  return f;
})(
  {
    a30m: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.onUnexpectedError = n),
          (exports.onUnexpectedExternalError = t),
          (exports.transformErrorForSerialization = o),
          (exports.isPromiseCanceledError = s),
          (exports.canceled = i),
          (exports.illegalArgument = c),
          (exports.illegalState = l),
          (exports.errorHandler = exports.ErrorHandler = void 0);
        var r = (function() {
          function r() {
            (this.listeners = []),
              (this.unexpectedErrorHandler = function(r) {
                setTimeout(function() {
                  if (r.stack) throw new Error(r.message + '\n\n' + r.stack);
                  throw r;
                }, 0);
              });
          }
          return (
            (r.prototype.emit = function(r) {
              this.listeners.forEach(function(e) {
                e(r);
              });
            }),
            (r.prototype.onUnexpectedError = function(r) {
              this.unexpectedErrorHandler(r), this.emit(r);
            }),
            (r.prototype.onUnexpectedExternalError = function(r) {
              this.unexpectedErrorHandler(r);
            }),
            r
          );
        })();
        exports.ErrorHandler = r;
        var e = new r();
        function n(r) {
          s(r) || e.onUnexpectedError(r);
        }
        function t(r) {
          s(r) || e.onUnexpectedExternalError(r);
        }
        function o(r) {
          return r instanceof Error ? { $isError: !0, name: r.name, message: r.message, stack: r.stacktrace || r.stack } : r;
        }
        exports.errorHandler = e;
        var a = 'Canceled';
        function s(r) {
          return r instanceof Error && r.name === a && r.message === a;
        }
        function i() {
          var r = new Error(a);
          return (r.name = r.message), r;
        }
        function c(r) {
          return r ? new Error('Illegal argument: ' + r) : new Error('Illegal argument');
        }
        function l(r) {
          return r ? new Error('Illegal state: ' + r) : new Error('Illegal state');
        }
      },
      {}
    ],
    DRKG: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.isDisposable = i),
          (exports.dispose = r),
          (exports.combinedDisposable = n),
          (exports.toDisposable = p),
          (exports.ImmortalReference = exports.MutableDisposable = exports.Disposable = exports.DisposableStore = void 0);
        var e = !1,
          s = '__is_disposable_tracked__';
        function t(t) {
          if (e && t && t !== u.None)
            try {
              t[s] = !0;
            } catch (o) {}
        }
        function o(t) {
          if (!e) return t;
          var o = new Error('Potentially leaked disposable').stack;
          return (
            setTimeout(function() {
              t[s] || console.log(o);
            }, 3e3),
            t
          );
        }
        function i(e) {
          return 'function' == typeof e.dispose && 0 === e.dispose.length;
        }
        function r(e) {
          return Array.isArray(e)
            ? (e.forEach(function(e) {
                e && (t(e), e.dispose());
              }),
              [])
            : e
            ? (t(e), e.dispose(), e)
            : void 0;
        }
        function n() {
          for (var e = [], s = 0; s < arguments.length; s++) e[s] = arguments[s];
          return (
            e.forEach(t),
            o({
              dispose: function() {
                return r(e);
              }
            })
          );
        }
        function p(e) {
          var s = o({
            dispose: function() {
              t(s), e();
            }
          });
          return s;
        }
        var a = (function() {
          function e() {
            (this._toDispose = new Set()), (this._isDisposed = !1);
          }
          return (
            (e.prototype.dispose = function() {
              this._isDisposed || (t(this), (this._isDisposed = !0), this.clear());
            }),
            (e.prototype.clear = function() {
              this._toDispose.forEach(function(e) {
                return e.dispose();
              }),
                this._toDispose.clear();
            }),
            (e.prototype.add = function(e) {
              if (!e) return e;
              if (e === this) throw new Error('Cannot register a disposable on itself!');
              return (
                t(e),
                this._isDisposed
                  ? console.warn(
                      new Error('Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!')
                        .stack
                    )
                  : this._toDispose.add(e),
                e
              );
            }),
            e
          );
        })();
        exports.DisposableStore = a;
        var u = (function() {
          function e() {
            (this._store = new a()), o(this);
          }
          return (
            (e.prototype.dispose = function() {
              t(this), this._store.dispose();
            }),
            (e.prototype._register = function(e) {
              if (e === this) throw new Error('Cannot register a disposable on itself!');
              return this._store.add(e);
            }),
            (e.None = Object.freeze({ dispose: function() {} })),
            e
          );
        })();
        exports.Disposable = u;
        var c = (function() {
          function e() {
            (this._isDisposed = !1), o(this);
          }
          return (
            Object.defineProperty(e.prototype, 'value', {
              get: function() {
                return this._isDisposed ? void 0 : this._value;
              },
              set: function(e) {
                this._isDisposed || e === this._value || (this._value && this._value.dispose(), e && t(e), (this._value = e));
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.clear = function() {
              this.value = void 0;
            }),
            (e.prototype.dispose = function() {
              (this._isDisposed = !0), t(this), this._value && this._value.dispose(), (this._value = void 0);
            }),
            e
          );
        })();
        exports.MutableDisposable = c;
        var d = (function() {
          function e(e) {
            this.object = e;
          }
          return (e.prototype.dispose = function() {}), e;
        })();
        exports.ImmortalReference = d;
      },
      {}
    ],
    mXUW: [
      function(require, module, exports) {
        var t,
          e,
          n = (module.exports = {});
        function r() {
          throw new Error('setTimeout has not been defined');
        }
        function o() {
          throw new Error('clearTimeout has not been defined');
        }
        function i(e) {
          if (t === setTimeout) return setTimeout(e, 0);
          if ((t === r || !t) && setTimeout) return (t = setTimeout), setTimeout(e, 0);
          try {
            return t(e, 0);
          } catch (n) {
            try {
              return t.call(null, e, 0);
            } catch (n) {
              return t.call(this, e, 0);
            }
          }
        }
        function u(t) {
          if (e === clearTimeout) return clearTimeout(t);
          if ((e === o || !e) && clearTimeout) return (e = clearTimeout), clearTimeout(t);
          try {
            return e(t);
          } catch (n) {
            try {
              return e.call(null, t);
            } catch (n) {
              return e.call(this, t);
            }
          }
        }
        !(function() {
          try {
            t = 'function' == typeof setTimeout ? setTimeout : r;
          } catch (n) {
            t = r;
          }
          try {
            e = 'function' == typeof clearTimeout ? clearTimeout : o;
          } catch (n) {
            e = o;
          }
        })();
        var c,
          s = [],
          l = !1,
          a = -1;
        function f() {
          l && c && ((l = !1), c.length ? (s = c.concat(s)) : (a = -1), s.length && h());
        }
        function h() {
          if (!l) {
            var t = i(f);
            l = !0;
            for (var e = s.length; e; ) {
              for (c = s, s = []; ++a < e; ) c && c[a].run();
              (a = -1), (e = s.length);
            }
            (c = null), (l = !1), u(t);
          }
        }
        function m(t, e) {
          (this.fun = t), (this.array = e);
        }
        function p() {}
        (n.nextTick = function(t) {
          var e = new Array(arguments.length - 1);
          if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
          s.push(new m(t, e)), 1 !== s.length || l || i(h);
        }),
          (m.prototype.run = function() {
            this.fun.apply(null, this.array);
          }),
          (n.title = 'browser'),
          (n.env = {}),
          (n.argv = []),
          (n.version = ''),
          (n.versions = {}),
          (n.on = p),
          (n.addListener = p),
          (n.once = p),
          (n.off = p),
          (n.removeListener = p),
          (n.removeAllListeners = p),
          (n.emit = p),
          (n.prependListener = p),
          (n.prependOnceListener = p),
          (n.listeners = function(t) {
            return [];
          }),
          (n.binding = function(t) {
            throw new Error('process.binding is not supported');
          }),
          (n.cwd = function() {
            return '/';
          }),
          (n.chdir = function(t) {
            throw new Error('process.chdir is not supported');
          }),
          (n.umask = function() {
            return 0;
          });
      },
      {}
    ],
    wdE2: [
      function(require, module, exports) {
        var process = require('process');
        var global = arguments[3];
        var e = require('process'),
          i = arguments[3];
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.setImmediate = L),
          (exports.OS = exports.globals = exports.isWeb = exports.isNative = exports.isLinux = exports.isMacintosh = exports.isWindows = void 0);
        var o = 'en',
          t = !1,
          r = !1,
          s = !1,
          a = !1,
          n = !1,
          v = void 0,
          p = o,
          d = void 0,
          l = void 0,
          x = void 0 !== e && void 0 !== e.versions && void 0 !== e.versions.electron && 'renderer' === e.type;
        if ('object' != typeof navigator || x) {
          if ('object' == typeof e) {
            (t = 'win32' === e.platform), (r = 'darwin' === e.platform), (s = 'linux' === e.platform), (v = o), (p = o);
            var f = void 0;
            if (f)
              try {
                var c = JSON.parse(f),
                  u = c.availableLanguages['*'];
                (v = c.locale), (p = u || o), (d = c._translationsConfigFile);
              } catch (I) {}
            a = !0;
          }
        } else
          (t = (l = navigator.userAgent).indexOf('Windows') >= 0),
            (r = l.indexOf('Macintosh') >= 0),
            (s = l.indexOf('Linux') >= 0),
            (n = !0),
            (p = v = navigator.language);
        var b = 0;
        r ? (b = 1) : t ? (b = 3) : s && (b = 2);
        var g = t;
        exports.isWindows = g;
        var m = r;
        exports.isMacintosh = m;
        var y = s;
        exports.isLinux = y;
        var O = a;
        exports.isNative = O;
        var j = n;
        exports.isWeb = j;
        var w = 'object' == typeof self ? self : 'object' == typeof i ? i : {},
          W = w;
        exports.globals = W;
        var h = null;
        function L(i) {
          return (
            null === h &&
              (h = W.setImmediate
                ? W.setImmediate.bind(W)
                : void 0 !== e && 'function' == typeof e.nextTick
                ? e.nextTick.bind(e)
                : W.setTimeout.bind(W)),
            h(i)
          );
        }
        var M = r ? 2 : t ? 1 : 3;
        exports.OS = M;
      },
      { process: 'mXUW' }
    ],
    wwPi: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.isArray = r),
          (exports.isString = n),
          (exports.isObject = e),
          (exports.isNumber = o),
          (exports.isBoolean = i),
          (exports.isUndefined = u),
          (exports.isUndefinedOrNull = s),
          (exports.isEmptyObject = f),
          (exports.isFunction = a),
          (exports.validateConstraints = p),
          (exports.validateConstraint = l),
          (exports.getAllPropertyNames = y),
          (exports.getAllMethodNames = d),
          (exports.createProxyObject = g),
          (exports.withNullAsUndefined = x),
          (exports.withUndefinedAsNull = b);
        var t = { number: 'number', string: 'string', undefined: 'undefined', object: 'object', function: 'function' };
        function r(r) {
          return Array.isArray ? Array.isArray(r) : !(!r || typeof r.length !== t.number || r.constructor !== Array);
        }
        function n(r) {
          return typeof r === t.string || r instanceof String;
        }
        function e(r) {
          return !(typeof r !== t.object || null === r || Array.isArray(r) || r instanceof RegExp || r instanceof Date);
        }
        function o(r) {
          return (typeof r === t.number || r instanceof Number) && !isNaN(r);
        }
        function i(t) {
          return !0 === t || !1 === t;
        }
        function u(r) {
          return typeof r === t.undefined;
        }
        function s(t) {
          return u(t) || null === t;
        }
        var c = Object.prototype.hasOwnProperty;
        function f(t) {
          if (!e(t)) return !1;
          for (var r in t) if (c.call(t, r)) return !1;
          return !0;
        }
        function a(r) {
          return typeof r === t.function;
        }
        function p(t, r) {
          for (var n = Math.min(t.length, r.length), e = 0; e < n; e++) l(t[e], r[e]);
        }
        function l(t, r) {
          if (n(r)) {
            if (typeof t !== r) throw new Error('argument does not match constraint: typeof ' + r);
          } else if (a(r)) {
            try {
              if (t instanceof r) return;
            } catch (e) {}
            if (!s(t) && t.constructor === r) return;
            if (1 === r.length && !0 === r.call(void 0, t)) return;
            throw new Error(
              'argument does not match one of these constraints: arg instanceof constraint, arg.constructor === constraint, nor constraint(arg) === true'
            );
          }
        }
        function y(t) {
          for (var r = [], n = Object.getPrototypeOf(t); Object.prototype !== n; )
            (r = r.concat(Object.getOwnPropertyNames(n))), (n = Object.getPrototypeOf(n));
          return r;
        }
        function d(t) {
          for (var r = [], n = 0, e = y(t); n < e.length; n++) {
            var o = e[n];
            'function' == typeof t[o] && r.push(o);
          }
          return r;
        }
        function g(t, r) {
          for (
            var n = function(t) {
                return function() {
                  var n = Array.prototype.slice.call(arguments, 0);
                  return r(t, n);
                };
              },
              e = {},
              o = 0,
              i = t;
            o < i.length;
            o++
          ) {
            var u = i[o];
            e[u] = n(u);
          }
          return e;
        }
        function x(t) {
          return null === t ? void 0 : t;
        }
        function b(t) {
          return void 0 === t ? null : t;
        }
      },
      {}
    ],
    eVCz: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.logOnceWebWorkerWarning = u),
          (exports.create = p),
          (exports.SimpleWorkerServer = exports.SimpleWorkerClient = void 0);
        var e = require('../errors.js'),
          r = require('../lifecycle.js'),
          t = require('../platform.js'),
          o = s(require('../types.js'));
        function n() {
          if ('function' != typeof WeakMap) return null;
          var e = new WeakMap();
          return (
            (n = function() {
              return e;
            }),
            e
          );
        }
        function s(e) {
          if (e && e.__esModule) return e;
          var r = n();
          if (r && r.has(e)) return r.get(e);
          var t = {};
          if (null != e) {
            var o = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var s in e)
              if (Object.prototype.hasOwnProperty.call(e, s)) {
                var i = o ? Object.getOwnPropertyDescriptor(e, s) : null;
                i && (i.get || i.set) ? Object.defineProperty(t, s, i) : (t[s] = e[s]);
              }
          }
          return (t.default = e), r && r.set(e, t), t;
        }
        var i = (function() {
            var e = function(r, t) {
              return (e =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function(e, r) {
                    e.__proto__ = r;
                  }) ||
                function(e, r) {
                  for (var t in r) r.hasOwnProperty(t) && (e[t] = r[t]);
                })(r, t);
            };
            return function(r, t) {
              function o() {
                this.constructor = r;
              }
              e(r, t), (r.prototype = null === t ? Object.create(t) : ((o.prototype = t.prototype), new o()));
            };
          })(),
          a = '$initialize',
          l = !1;
        function u(e) {
          t.isWeb &&
            (l ||
              ((l = !0),
              console.warn(
                'Could not create web worker(s). Falling back to loading web worker code in main thread, which might cause UI freezes. Please see https://github.com/Microsoft/monaco-editor#faq'
              )),
            console.warn(e.message));
        }
        var c = (function() {
            function r(e) {
              (this._workerId = -1), (this._handler = e), (this._lastSentReq = 0), (this._pendingReplies = Object.create(null));
            }
            return (
              (r.prototype.setWorkerId = function(e) {
                this._workerId = e;
              }),
              (r.prototype.sendMessage = function(e, r) {
                var t = this,
                  o = String(++this._lastSentReq);
                return new Promise(function(n, s) {
                  (t._pendingReplies[o] = { resolve: n, reject: s }), t._send({ vsWorker: t._workerId, req: o, method: e, args: r });
                });
              }),
              (r.prototype.handleMessage = function(e) {
                e && e.vsWorker && ((-1 !== this._workerId && e.vsWorker !== this._workerId) || this._handleMessage(e));
              }),
              (r.prototype._handleMessage = function(r) {
                var t = this;
                if (r.seq) {
                  var o = r;
                  if (!this._pendingReplies[o.seq]) return void console.warn('Got reply to unknown seq');
                  var n = this._pendingReplies[o.seq];
                  if ((delete this._pendingReplies[o.seq], o.err)) {
                    var s = o.err;
                    return (
                      o.err.$isError && (((s = new Error()).name = o.err.name), (s.message = o.err.message), (s.stack = o.err.stack)),
                      void n.reject(s)
                    );
                  }
                  n.resolve(o.res);
                } else {
                  var i = r,
                    a = i.req;
                  this._handler.handleMessage(i.method, i.args).then(
                    function(e) {
                      t._send({ vsWorker: t._workerId, seq: a, res: e, err: void 0 });
                    },
                    function(r) {
                      r.detail instanceof Error && (r.detail = (0, e.transformErrorForSerialization)(r.detail)),
                        t._send({ vsWorker: t._workerId, seq: a, res: void 0, err: (0, e.transformErrorForSerialization)(r) });
                    }
                  );
                }
              }),
              (r.prototype._send = function(e) {
                var r = [];
                if (e.req) for (var t = e, o = 0; o < t.args.length; o++) t.args[o] instanceof ArrayBuffer && r.push(t.args[o]);
                else (t = e).res instanceof ArrayBuffer && r.push(t.res);
                this._handler.sendMessage(e, r);
              }),
              r
            );
          })(),
          f = (function(e) {
            function r(r, t, n) {
              var s = e.call(this) || this,
                i = null;
              (s._worker = s._register(
                r.create(
                  'vs/base/common/worker/simpleWorker',
                  function(e) {
                    s._protocol.handleMessage(e);
                  },
                  function(e) {
                    i && i(e);
                  }
                )
              )),
                (s._protocol = new c({
                  sendMessage: function(e, r) {
                    s._worker.postMessage(e, r);
                  },
                  handleMessage: function(e, r) {
                    if ('function' != typeof n[e]) return Promise.reject(new Error('Missing method ' + e + ' on main thread host.'));
                    try {
                      return Promise.resolve(n[e].apply(n, r));
                    } catch (t) {
                      return Promise.reject(t);
                    }
                  }
                })),
                s._protocol.setWorkerId(s._worker.getId());
              var l = null;
              void 0 !== self.require && 'function' == typeof self.require.getConfig
                ? (l = self.require.getConfig())
                : void 0 !== self.requirejs && (l = self.requirejs.s.contexts._.config);
              var u = o.getAllMethodNames(n);
              s._onModuleLoaded = s._protocol.sendMessage(a, [s._worker.getId(), JSON.parse(JSON.stringify(l)), t, u]);
              var f = function(e, r) {
                return s._request(e, r);
              };
              return (
                (s._lazyProxy = new Promise(function(e, r) {
                  (i = r),
                    s._onModuleLoaded.then(
                      function(r) {
                        e(o.createProxyObject(r, f));
                      },
                      function(e) {
                        r(e), s._onError('Worker failed to load ' + t, e);
                      }
                    );
                })),
                s
              );
            }
            return (
              i(r, e),
              (r.prototype.getProxyObject = function() {
                return this._lazyProxy;
              }),
              (r.prototype._request = function(e, r) {
                var t = this;
                return new Promise(function(o, n) {
                  t._onModuleLoaded.then(function() {
                    t._protocol.sendMessage(e, r).then(o, n);
                  }, n);
                });
              }),
              (r.prototype._onError = function(e, r) {
                console.error(e), console.info(r);
              }),
              r
            );
          })(r.Disposable);
        exports.SimpleWorkerClient = f;
        var d = (function() {
          function e(e, r) {
            var t = this;
            (this._requestHandlerFactory = r),
              (this._requestHandler = null),
              (this._protocol = new c({
                sendMessage: function(r, t) {
                  e(r, t);
                },
                handleMessage: function(e, r) {
                  return t._handleMessage(e, r);
                }
              }));
          }
          return (
            (e.prototype.onmessage = function(e) {
              this._protocol.handleMessage(e);
            }),
            (e.prototype._handleMessage = function(e, r) {
              if (e === a) return this.initialize(r[0], r[1], r[2], r[3]);
              if (!this._requestHandler || 'function' != typeof this._requestHandler[e])
                return Promise.reject(new Error('Missing requestHandler or method: ' + e));
              try {
                return Promise.resolve(this._requestHandler[e].apply(this._requestHandler, r));
              } catch (t) {
                return Promise.reject(t);
              }
            }),
            (e.prototype.initialize = function(e, r, t, n) {
              var s = this;
              this._protocol.setWorkerId(e);
              var i = o.createProxyObject(n, function(e, r) {
                return s._protocol.sendMessage(e, r);
              });
              return this._requestHandlerFactory
                ? ((this._requestHandler = this._requestHandlerFactory(i)), Promise.resolve(o.getAllMethodNames(this._requestHandler)))
                : (r &&
                    (void 0 !== r.baseUrl && delete r.baseUrl,
                    void 0 !== r.paths && void 0 !== r.paths.vs && delete r.paths.vs,
                    (r.catchError = !0),
                    self.require.config(r)),
                  new Promise(function(e, r) {
                    self.require(
                      [t],
                      function(t) {
                        (s._requestHandler = t.create(i)),
                          s._requestHandler ? e(o.getAllMethodNames(s._requestHandler)) : r(new Error('No RequestHandler!'));
                      },
                      r
                    );
                  }));
            }),
            e
          );
        })();
        function p(e) {
          return new d(e, null);
        }
        exports.SimpleWorkerServer = d;
      },
      { '../errors.js': 'a30m', '../lifecycle.js': 'DRKG', '../platform.js': 'wdE2', '../types.js': 'wwPi' }
    ],
    WVUY: [
      function(require, module, exports) {
        'use strict';
        function r(r, t) {
          return void 0 === t && (t = 0), r[r.length - (1 + t)];
        }
        function t(r) {
          if (0 === r.length) throw new Error('Invalid tail call');
          return [r.slice(0, r.length - 1), r[r.length - 1]];
        }
        function n(r, t, n) {
          if (
            (void 0 === n &&
              (n = function(r, t) {
                return r === t;
              }),
            r === t)
          )
            return !0;
          if (!r || !t) return !1;
          if (r.length !== t.length) return !1;
          for (var e = 0, o = r.length; e < o; e++) if (!n(r[e], t[e])) return !1;
          return !0;
        }
        function e(r, t, n) {
          for (var e = 0, o = r.length - 1; e <= o; ) {
            var i = ((e + o) / 2) | 0,
              u = n(r[i], t);
            if (u < 0) e = i + 1;
            else {
              if (!(u > 0)) return i;
              o = i - 1;
            }
          }
          return -(e + 1);
        }
        function o(r, t) {
          var n = 0,
            e = r.length;
          if (0 === e) return 0;
          for (; n < e; ) {
            var o = Math.floor((n + e) / 2);
            t(r[o]) ? (e = o) : (n = o + 1);
          }
          return n;
        }
        function i(r, t) {
          return f(r, t, 0, r.length - 1, []), r;
        }
        function u(r, t, n, e, o, i) {
          for (var u = n, f = e + 1, s = n; s <= o; s++) i[s] = r[s];
          for (s = n; s <= o; s++) u > e ? (r[s] = i[f++]) : f > o ? (r[s] = i[u++]) : t(i[f], i[u]) < 0 ? (r[s] = i[f++]) : (r[s] = i[u++]);
        }
        function f(r, t, n, e, o) {
          if (!(e <= n)) {
            var i = (n + (e - n) / 2) | 0;
            f(r, t, n, i, o), f(r, t, i + 1, e, o), t(r[i], r[i + 1]) <= 0 || u(r, t, n, i, e, o);
          }
        }
        function s(r, t) {
          for (var n = [], e = void 0, o = 0, u = i(r.slice(0), t); o < u.length; o++) {
            var f = u[o];
            e && 0 === t(e[0], f) ? e.push(f) : ((e = [f]), n.push(e));
          }
          return n;
        }
        function a(r) {
          return r.filter(function(r) {
            return !!r;
          });
        }
        function c(r) {
          return !Array.isArray(r) || 0 === r.length;
        }
        function l(r) {
          return Array.isArray(r) && r.length > 0;
        }
        function p(r, t) {
          if (!t)
            return r.filter(function(t, n) {
              return r.indexOf(t) === n;
            });
          var n = Object.create(null);
          return r.filter(function(r) {
            var e = t(r);
            return !n[e] && ((n[e] = !0), !0);
          });
        }
        function v(r) {
          var t = new Set();
          return r.filter(function(r) {
            return !t.has(r) && (t.add(r), !0);
          });
        }
        function h(r, t) {
          for (var n = 0; n < r.length; n++) {
            if (t(r[n])) return n;
          }
          return -1;
        }
        function x(r, t, n) {
          void 0 === n && (n = void 0);
          var e = h(r, t);
          return e < 0 ? n : r[e];
        }
        function d(r) {
          var t;
          return (t = []).concat.apply(t, r);
        }
        function y(r, t) {
          var n = 'number' == typeof t ? r : 0;
          'number' == typeof t ? (n = r) : ((n = 0), (t = r));
          var e = [];
          if (n <= t) for (var o = n; o < t; o++) e.push(o);
          else for (o = n; o > t; o--) e.push(o);
          return e;
        }
        function g(r, t, n) {
          var e = r.slice(0, t),
            o = r.slice(t);
          return e.concat(n, o);
        }
        function A(r, t) {
          var n = r.indexOf(t);
          n > -1 && (r.splice(n, 1), r.unshift(t));
        }
        function O(r, t) {
          var n = r.indexOf(t);
          n > -1 && (r.splice(n, 1), r.push(t));
        }
        function S(r) {
          return Array.isArray(r) ? r : [r];
        }
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.tail = r),
          (exports.tail2 = t),
          (exports.equals = n),
          (exports.binarySearch = e),
          (exports.findFirstInSorted = o),
          (exports.mergeSort = i),
          (exports.groupBy = s),
          (exports.coalesce = a),
          (exports.isFalsyOrEmpty = c),
          (exports.isNonEmptyArray = l),
          (exports.distinct = p),
          (exports.distinctES6 = v),
          (exports.firstIndex = h),
          (exports.first = x),
          (exports.flatten = d),
          (exports.range = y),
          (exports.arrayInsert = g),
          (exports.pushToStart = A),
          (exports.pushToEnd = O),
          (exports.asArray = S);
      },
      {}
    ],
    HivA: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.DiffChange = void 0);
        var t = (function() {
          function t(t, i, e, n) {
            (this.originalStart = t), (this.originalLength = i), (this.modifiedStart = e), (this.modifiedLength = n);
          }
          return (
            (t.prototype.getOriginalEnd = function() {
              return this.originalStart + this.originalLength;
            }),
            (t.prototype.getModifiedEnd = function() {
              return this.modifiedStart + this.modifiedLength;
            }),
            t
          );
        })();
        exports.DiffChange = t;
      },
      {}
    ],
    UuLR: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.stringDiff = i),
          (exports.LcsDiff = exports.MyArray = exports.Debug = void 0);
        var t = require('./diffChange.js');
        function e(t) {
          return {
            getLength: function() {
              return t.length;
            },
            getElementAtIndex: function(e) {
              return t.charCodeAt(e);
            }
          };
        }
        function i(t, i, n) {
          return new s(e(t), e(i)).ComputeDiff(n);
        }
        var n = (function() {
          function t() {}
          return (
            (t.Assert = function(t, e) {
              if (!t) throw new Error(e);
            }),
            t
          );
        })();
        exports.Debug = n;
        var r = (function() {
          function t() {}
          return (
            (t.Copy = function(t, e, i, n, r) {
              for (var o = 0; o < r; o++) i[n + o] = t[e + o];
            }),
            t
          );
        })();
        exports.MyArray = r;
        var o = 1447,
          a = (function() {
            function e() {
              (this.m_changes = []),
                (this.m_originalStart = Number.MAX_VALUE),
                (this.m_modifiedStart = Number.MAX_VALUE),
                (this.m_originalCount = 0),
                (this.m_modifiedCount = 0);
            }
            return (
              (e.prototype.MarkNextChange = function() {
                (this.m_originalCount > 0 || this.m_modifiedCount > 0) &&
                  this.m_changes.push(new t.DiffChange(this.m_originalStart, this.m_originalCount, this.m_modifiedStart, this.m_modifiedCount)),
                  (this.m_originalCount = 0),
                  (this.m_modifiedCount = 0),
                  (this.m_originalStart = Number.MAX_VALUE),
                  (this.m_modifiedStart = Number.MAX_VALUE);
              }),
              (e.prototype.AddOriginalElement = function(t, e) {
                (this.m_originalStart = Math.min(this.m_originalStart, t)),
                  (this.m_modifiedStart = Math.min(this.m_modifiedStart, e)),
                  this.m_originalCount++;
              }),
              (e.prototype.AddModifiedElement = function(t, e) {
                (this.m_originalStart = Math.min(this.m_originalStart, t)),
                  (this.m_modifiedStart = Math.min(this.m_modifiedStart, e)),
                  this.m_modifiedCount++;
              }),
              (e.prototype.getChanges = function() {
                return (this.m_originalCount > 0 || this.m_modifiedCount > 0) && this.MarkNextChange(), this.m_changes;
              }),
              (e.prototype.getReverseChanges = function() {
                return (this.m_originalCount > 0 || this.m_modifiedCount > 0) && this.MarkNextChange(), this.m_changes.reverse(), this.m_changes;
              }),
              e
            );
          })(),
          s = (function() {
            function e(t, e, i) {
              void 0 === i && (i = null),
                (this.OriginalSequence = t),
                (this.ModifiedSequence = e),
                (this.ContinueProcessingPredicate = i),
                (this.m_forwardHistory = []),
                (this.m_reverseHistory = []);
            }
            return (
              (e.prototype.ElementsAreEqual = function(t, e) {
                return this.OriginalSequence.getElementAtIndex(t) === this.ModifiedSequence.getElementAtIndex(e);
              }),
              (e.prototype.OriginalElementsAreEqual = function(t, e) {
                return this.OriginalSequence.getElementAtIndex(t) === this.OriginalSequence.getElementAtIndex(e);
              }),
              (e.prototype.ModifiedElementsAreEqual = function(t, e) {
                return this.ModifiedSequence.getElementAtIndex(t) === this.ModifiedSequence.getElementAtIndex(e);
              }),
              (e.prototype.ComputeDiff = function(t) {
                return this._ComputeDiff(0, this.OriginalSequence.getLength() - 1, 0, this.ModifiedSequence.getLength() - 1, t);
              }),
              (e.prototype._ComputeDiff = function(t, e, i, n, r) {
                var o = this.ComputeDiffRecursive(t, e, i, n, [!1]);
                return r ? this.PrettifyChanges(o) : o;
              }),
              (e.prototype.ComputeDiffRecursive = function(e, i, r, o, a) {
                for (a[0] = !1; e <= i && r <= o && this.ElementsAreEqual(e, r); ) e++, r++;
                for (; i >= e && o >= r && this.ElementsAreEqual(i, o); ) i--, o--;
                if (e > i || r > o) {
                  var s = void 0;
                  return (
                    r <= o
                      ? (n.Assert(e === i + 1, 'originalStart should only be one more than originalEnd'),
                        (s = [new t.DiffChange(e, 0, r, o - r + 1)]))
                      : e <= i
                      ? (n.Assert(r === o + 1, 'modifiedStart should only be one more than modifiedEnd'),
                        (s = [new t.DiffChange(e, i - e + 1, r, 0)]))
                      : (n.Assert(e === i + 1, 'originalStart should only be one more than originalEnd'),
                        n.Assert(r === o + 1, 'modifiedStart should only be one more than modifiedEnd'),
                        (s = [])),
                    s
                  );
                }
                var h = [0],
                  d = [0],
                  g = this.ComputeRecursionPoint(e, i, r, o, h, d, a),
                  f = h[0],
                  u = d[0];
                if (null !== g) return g;
                if (!a[0]) {
                  var l = this.ComputeDiffRecursive(e, f, r, u, a),
                    m = [];
                  return (
                    (m = a[0]
                      ? [new t.DiffChange(f + 1, i - (f + 1) + 1, u + 1, o - (u + 1) + 1)]
                      : this.ComputeDiffRecursive(f + 1, i, u + 1, o, a)),
                    this.ConcatenateChanges(l, m)
                  );
                }
                return [new t.DiffChange(e, i - e + 1, r, o - r + 1)];
              }),
              (e.prototype.WALKTRACE = function(e, i, n, r, o, s, h, d, g, f, u, l, m, c, p, y, C, S) {
                var _,
                  A,
                  E = null,
                  v = new a(),
                  L = i,
                  M = n,
                  q = m[0] - y[0] - r,
                  O = Number.MIN_VALUE,
                  w = this.m_forwardHistory.length - 1;
                do {
                  (A = q + e) === L || (A < M && g[A - 1] < g[A + 1])
                    ? ((c = (u = g[A + 1]) - q - r), u < O && v.MarkNextChange(), (O = u), v.AddModifiedElement(u + 1, c), (q = A + 1 - e))
                    : ((c = (u = g[A - 1] + 1) - q - r), u < O && v.MarkNextChange(), (O = u - 1), v.AddOriginalElement(u, c + 1), (q = A - 1 - e)),
                    w >= 0 && ((e = (g = this.m_forwardHistory[w])[0]), (L = 1), (M = g.length - 1));
                } while (--w >= -1);
                if (((_ = v.getReverseChanges()), S[0])) {
                  var x = m[0] + 1,
                    D = y[0] + 1;
                  if (null !== _ && _.length > 0) {
                    var I = _[_.length - 1];
                    (x = Math.max(x, I.getOriginalEnd())), (D = Math.max(D, I.getModifiedEnd()));
                  }
                  E = [new t.DiffChange(x, l - x + 1, D, p - D + 1)];
                } else {
                  (v = new a()),
                    (L = s),
                    (M = h),
                    (q = m[0] - y[0] - d),
                    (O = Number.MAX_VALUE),
                    (w = C ? this.m_reverseHistory.length - 1 : this.m_reverseHistory.length - 2);
                  do {
                    (A = q + o) === L || (A < M && f[A - 1] >= f[A + 1])
                      ? ((c = (u = f[A + 1] - 1) - q - d),
                        u > O && v.MarkNextChange(),
                        (O = u + 1),
                        v.AddOriginalElement(u + 1, c + 1),
                        (q = A + 1 - o))
                      : ((c = (u = f[A - 1]) - q - d), u > O && v.MarkNextChange(), (O = u), v.AddModifiedElement(u + 1, c + 1), (q = A - 1 - o)),
                      w >= 0 && ((o = (f = this.m_reverseHistory[w])[0]), (L = 1), (M = f.length - 1));
                  } while (--w >= -1);
                  E = v.getChanges();
                }
                return this.ConcatenateChanges(_, E);
              }),
              (e.prototype.ComputeRecursionPoint = function(e, i, n, a, s, h, d) {
                var g,
                  f = 0,
                  u = 0,
                  l = 0,
                  m = 0,
                  c = 0,
                  p = 0;
                e--, n--, (s[0] = 0), (h[0] = 0), (this.m_forwardHistory = []), (this.m_reverseHistory = []);
                var y,
                  C,
                  S = i - e + (a - n),
                  _ = S + 1,
                  A = new Array(_),
                  E = new Array(_),
                  v = a - n,
                  L = i - e,
                  M = e - n,
                  q = i - a,
                  O = (L - v) % 2 == 0;
                for (A[v] = e, E[L] = i, d[0] = !1, g = 1; g <= S / 2 + 1; g++) {
                  var w = 0,
                    x = 0;
                  for (l = this.ClipDiagonalBound(v - g, g, v, _), m = this.ClipDiagonalBound(v + g, g, v, _), y = l; y <= m; y += 2) {
                    for (
                      u = (f = y === l || (y < m && A[y - 1] < A[y + 1]) ? A[y + 1] : A[y - 1] + 1) - (y - v) - M, C = f;
                      f < i && u < a && this.ElementsAreEqual(f + 1, u + 1);

                    )
                      f++, u++;
                    if (((A[y] = f), f + u > w + x && ((w = f), (x = u)), !O && Math.abs(y - L) <= g - 1 && f >= E[y]))
                      return (
                        (s[0] = f),
                        (h[0] = u),
                        C <= E[y] && o > 0 && g <= o + 1 ? this.WALKTRACE(v, l, m, M, L, c, p, q, A, E, f, i, s, u, a, h, O, d) : null
                      );
                  }
                  var D = (w - e + (x - n) - g) / 2;
                  if (null !== this.ContinueProcessingPredicate && !this.ContinueProcessingPredicate(w, this.OriginalSequence, D))
                    return (
                      (d[0] = !0),
                      (s[0] = w),
                      (h[0] = x),
                      D > 0 && o > 0 && g <= o + 1
                        ? this.WALKTRACE(v, l, m, M, L, c, p, q, A, E, f, i, s, u, a, h, O, d)
                        : (e++, n++, [new t.DiffChange(e, i - e + 1, n, a - n + 1)])
                    );
                  for (c = this.ClipDiagonalBound(L - g, g, L, _), p = this.ClipDiagonalBound(L + g, g, L, _), y = c; y <= p; y += 2) {
                    for (
                      u = (f = y === c || (y < p && E[y - 1] >= E[y + 1]) ? E[y + 1] - 1 : E[y - 1]) - (y - L) - q, C = f;
                      f > e && u > n && this.ElementsAreEqual(f, u);

                    )
                      f--, u--;
                    if (((E[y] = f), O && Math.abs(y - v) <= g && f <= A[y]))
                      return (
                        (s[0] = f),
                        (h[0] = u),
                        C >= A[y] && o > 0 && g <= o + 1 ? this.WALKTRACE(v, l, m, M, L, c, p, q, A, E, f, i, s, u, a, h, O, d) : null
                      );
                  }
                  if (g <= o) {
                    var I = new Array(m - l + 2);
                    (I[0] = v - l + 1),
                      r.Copy(A, l, I, 1, m - l + 1),
                      this.m_forwardHistory.push(I),
                      ((I = new Array(p - c + 2))[0] = L - c + 1),
                      r.Copy(E, c, I, 1, p - c + 1),
                      this.m_reverseHistory.push(I);
                  }
                }
                return this.WALKTRACE(v, l, m, M, L, c, p, q, A, E, f, i, s, u, a, h, O, d);
              }),
              (e.prototype.PrettifyChanges = function(t) {
                for (var e = 0; e < t.length; e++) {
                  for (
                    var i = t[e],
                      n = e < t.length - 1 ? t[e + 1].originalStart : this.OriginalSequence.getLength(),
                      r = e < t.length - 1 ? t[e + 1].modifiedStart : this.ModifiedSequence.getLength(),
                      o = i.originalLength > 0,
                      a = i.modifiedLength > 0;
                    i.originalStart + i.originalLength < n &&
                    i.modifiedStart + i.modifiedLength < r &&
                    (!o || this.OriginalElementsAreEqual(i.originalStart, i.originalStart + i.originalLength)) &&
                    (!a || this.ModifiedElementsAreEqual(i.modifiedStart, i.modifiedStart + i.modifiedLength));

                  )
                    i.originalStart++, i.modifiedStart++;
                  var s = [null];
                  e < t.length - 1 && this.ChangesOverlap(t[e], t[e + 1], s) && ((t[e] = s[0]), t.splice(e + 1, 1), e--);
                }
                for (e = t.length - 1; e >= 0; e--) {
                  (i = t[e]), (n = 0), (r = 0);
                  if (e > 0) {
                    var h = t[e - 1];
                    h.originalLength > 0 && (n = h.originalStart + h.originalLength),
                      h.modifiedLength > 0 && (r = h.modifiedStart + h.modifiedLength);
                  }
                  (o = i.originalLength > 0), (a = i.modifiedLength > 0);
                  for (var d = 0, g = this._boundaryScore(i.originalStart, i.originalLength, i.modifiedStart, i.modifiedLength), f = 1; ; f++) {
                    var u = i.originalStart - f,
                      l = i.modifiedStart - f;
                    if (u < n || l < r) break;
                    if (o && !this.OriginalElementsAreEqual(u, u + i.originalLength)) break;
                    if (a && !this.ModifiedElementsAreEqual(l, l + i.modifiedLength)) break;
                    var m = this._boundaryScore(u, i.originalLength, l, i.modifiedLength);
                    m > g && ((g = m), (d = f));
                  }
                  (i.originalStart -= d), (i.modifiedStart -= d);
                }
                return t;
              }),
              (e.prototype._OriginalIsBoundary = function(t) {
                if (t <= 0 || t >= this.OriginalSequence.getLength() - 1) return !0;
                var e = this.OriginalSequence.getElementAtIndex(t);
                return 'string' == typeof e && /^\s*$/.test(e);
              }),
              (e.prototype._OriginalRegionIsBoundary = function(t, e) {
                if (this._OriginalIsBoundary(t) || this._OriginalIsBoundary(t - 1)) return !0;
                if (e > 0) {
                  var i = t + e;
                  if (this._OriginalIsBoundary(i - 1) || this._OriginalIsBoundary(i)) return !0;
                }
                return !1;
              }),
              (e.prototype._ModifiedIsBoundary = function(t) {
                if (t <= 0 || t >= this.ModifiedSequence.getLength() - 1) return !0;
                var e = this.ModifiedSequence.getElementAtIndex(t);
                return 'string' == typeof e && /^\s*$/.test(e);
              }),
              (e.prototype._ModifiedRegionIsBoundary = function(t, e) {
                if (this._ModifiedIsBoundary(t) || this._ModifiedIsBoundary(t - 1)) return !0;
                if (e > 0) {
                  var i = t + e;
                  if (this._ModifiedIsBoundary(i - 1) || this._ModifiedIsBoundary(i)) return !0;
                }
                return !1;
              }),
              (e.prototype._boundaryScore = function(t, e, i, n) {
                return (this._OriginalRegionIsBoundary(t, e) ? 1 : 0) + (this._ModifiedRegionIsBoundary(i, n) ? 1 : 0);
              }),
              (e.prototype.ConcatenateChanges = function(t, e) {
                var i = [];
                if (0 === t.length || 0 === e.length) return e.length > 0 ? e : t;
                if (this.ChangesOverlap(t[t.length - 1], e[0], i)) {
                  var n = new Array(t.length + e.length - 1);
                  return r.Copy(t, 0, n, 0, t.length - 1), (n[t.length - 1] = i[0]), r.Copy(e, 1, n, t.length, e.length - 1), n;
                }
                n = new Array(t.length + e.length);
                return r.Copy(t, 0, n, 0, t.length), r.Copy(e, 0, n, t.length, e.length), n;
              }),
              (e.prototype.ChangesOverlap = function(e, i, r) {
                if (
                  (n.Assert(e.originalStart <= i.originalStart, 'Left change is not less than or equal to right change'),
                  n.Assert(e.modifiedStart <= i.modifiedStart, 'Left change is not less than or equal to right change'),
                  e.originalStart + e.originalLength >= i.originalStart || e.modifiedStart + e.modifiedLength >= i.modifiedStart)
                ) {
                  var o = e.originalStart,
                    a = e.originalLength,
                    s = e.modifiedStart,
                    h = e.modifiedLength;
                  return (
                    e.originalStart + e.originalLength >= i.originalStart && (a = i.originalStart + i.originalLength - e.originalStart),
                    e.modifiedStart + e.modifiedLength >= i.modifiedStart && (h = i.modifiedStart + i.modifiedLength - e.modifiedStart),
                    (r[0] = new t.DiffChange(o, a, s, h)),
                    !0
                  );
                }
                return (r[0] = null), !1;
              }),
              (e.prototype.ClipDiagonalBound = function(t, e, i, n) {
                if (t >= 0 && t < n) return t;
                var r = e % 2 == 0;
                return t < 0 ? (r === (i % 2 == 0) ? 0 : 1) : r === ((n - i - 1) % 2 == 0) ? n - 1 : n - 2;
              }),
              e
            );
          })();
        exports.LcsDiff = s;
      },
      { './diffChange.js': 'HivA' }
    ],
    xnTK: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.getSequenceIterator = e),
          (exports.MappedIterator = exports.ArrayNavigator = exports.ArrayIterator = exports.Iterator = exports.FIN = void 0);
        var t,
          r = (function() {
            var t = function(r, n) {
              return (t =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function(t, r) {
                    t.__proto__ = r;
                  }) ||
                function(t, r) {
                  for (var n in r) r.hasOwnProperty(n) && (t[n] = r[n]);
                })(r, n);
            };
            return function(r, n) {
              function e() {
                this.constructor = r;
              }
              t(r, n), (r.prototype = null === n ? Object.create(n) : ((e.prototype = n.prototype), new e()));
            };
          })(),
          n = { done: !0, value: void 0 };
        function e(r) {
          return Array.isArray(r) ? t.fromArray(r) : r;
        }
        (exports.FIN = n),
          (exports.Iterator = t),
          (function(t) {
            var r = {
              next: function() {
                return n;
              }
            };
            (t.empty = function() {
              return r;
            }),
              (t.single = function(t) {
                var r = !1;
                return {
                  next: function() {
                    return r ? n : ((r = !0), { done: !1, value: t });
                  }
                };
              }),
              (t.fromArray = function(t, r, e) {
                return (
                  void 0 === r && (r = 0),
                  void 0 === e && (e = t.length),
                  {
                    next: function() {
                      return r >= e ? n : { done: !1, value: t[r++] };
                    }
                  }
                );
              }),
              (t.from = function(r) {
                return r ? (Array.isArray(r) ? t.fromArray(r) : r) : t.empty();
              }),
              (t.map = function(t, r) {
                return {
                  next: function() {
                    var e = t.next();
                    return e.done ? n : { done: !1, value: r(e.value) };
                  }
                };
              }),
              (t.filter = function(t, r) {
                return {
                  next: function() {
                    for (;;) {
                      var e = t.next();
                      if (e.done) return n;
                      if (r(e.value)) return { done: !1, value: e.value };
                    }
                  }
                };
              }),
              (t.forEach = function(t, r) {
                for (var n = t.next(); !n.done; n = t.next()) r(n.value);
              }),
              (t.collect = function(t, r) {
                void 0 === r && (r = Number.POSITIVE_INFINITY);
                var n = [];
                if (0 === r) return n;
                for (var e = 0, o = t.next(); !(o.done || (n.push(o.value), ++e >= r)); o = t.next());
                return n;
              }),
              (t.concat = function() {
                for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
                var e = 0;
                return {
                  next: function() {
                    if (e >= t.length) return n;
                    var r = t[e].next();
                    return r.done ? (e++, this.next()) : r;
                  }
                };
              });
          })(t || (exports.Iterator = t = {}));
        var o = (function() {
          function t(t, r, n, e) {
            void 0 === r && (r = 0),
              void 0 === n && (n = t.length),
              void 0 === e && (e = r - 1),
              (this.items = t),
              (this.start = r),
              (this.end = n),
              (this.index = e);
          }
          return (
            (t.prototype.first = function() {
              return (this.index = this.start), this.current();
            }),
            (t.prototype.next = function() {
              return (this.index = Math.min(this.index + 1, this.end)), this.current();
            }),
            (t.prototype.current = function() {
              return this.index === this.start - 1 || this.index === this.end ? null : this.items[this.index];
            }),
            t
          );
        })();
        exports.ArrayIterator = o;
        var i = (function(t) {
          function n(r, n, e, o) {
            return void 0 === n && (n = 0), void 0 === e && (e = r.length), void 0 === o && (o = n - 1), t.call(this, r, n, e, o) || this;
          }
          return (
            r(n, t),
            (n.prototype.current = function() {
              return t.prototype.current.call(this);
            }),
            (n.prototype.previous = function() {
              return (this.index = Math.max(this.index - 1, this.start - 1)), this.current();
            }),
            (n.prototype.first = function() {
              return (this.index = this.start), this.current();
            }),
            (n.prototype.last = function() {
              return (this.index = this.end - 1), this.current();
            }),
            (n.prototype.parent = function() {
              return null;
            }),
            n
          );
        })(o);
        exports.ArrayNavigator = i;
        var u = (function() {
          function t(t, r) {
            (this.iterator = t), (this.fn = r);
          }
          return (
            (t.prototype.next = function() {
              return this.fn(this.iterator.next());
            }),
            t
          );
        })();
        exports.MappedIterator = u;
      },
      {}
    ],
    z9aY: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.URI = void 0);
        var t,
          e = require('./platform.js'),
          r = (function() {
            var t = function(e, r) {
              return (t =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function(t, e) {
                    t.__proto__ = e;
                  }) ||
                function(t, e) {
                  for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
                })(e, r);
            };
            return function(e, r) {
              function o() {
                this.constructor = e;
              }
              t(e, r), (e.prototype = null === r ? Object.create(r) : ((o.prototype = r.prototype), new o()));
            };
          })(),
          o = /^\w[\w\d+.-]*$/,
          n = /^\//,
          i = /^\/\//,
          h = !0;
        function s(t, e) {
          if (!t.scheme) {
            if (e || h)
              throw new Error(
                '[UriError]: Scheme is missing: {scheme: "", authority: "' +
                  t.authority +
                  '", path: "' +
                  t.path +
                  '", query: "' +
                  t.query +
                  '", fragment: "' +
                  t.fragment +
                  '"}'
              );
            console.warn(
              '[UriError]: Scheme is missing: {scheme: "", authority: "' +
                t.authority +
                '", path: "' +
                t.path +
                '", query: "' +
                t.query +
                '", fragment: "' +
                t.fragment +
                '"}'
            );
          }
          if (t.scheme && !o.test(t.scheme)) throw new Error('[UriError]: Scheme contains illegal characters.');
          if (t.path)
            if (t.authority) {
              if (!n.test(t.path))
                throw new Error(
                  '[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character'
                );
            } else if (i.test(t.path))
              throw new Error(
                '[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")'
              );
        }
        function a(t, e) {
          return e || h ? t || f : (t || (console.trace('BAD uri lacks scheme, falling back to file-scheme.'), (t = 'file')), t);
        }
        function u(t, e) {
          switch (t) {
            case 'https':
            case 'http':
            case 'file':
              e ? e[0] !== c && (e = c + e) : (e = c);
          }
          return e;
        }
        var f = '',
          c = '/',
          p = /^(([^:\/?#]+?):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,
          m = (function() {
            function t(t, e, r, o, n, i) {
              void 0 === i && (i = !1),
                'object' == typeof t
                  ? ((this.scheme = t.scheme || f),
                    (this.authority = t.authority || f),
                    (this.path = t.path || f),
                    (this.query = t.query || f),
                    (this.fragment = t.fragment || f))
                  : ((this.scheme = a(t, i)),
                    (this.authority = e || f),
                    (this.path = u(this.scheme, r || f)),
                    (this.query = o || f),
                    (this.fragment = n || f),
                    s(this, i));
            }
            return (
              (t.isUri = function(e) {
                return (
                  e instanceof t ||
                  (!!e &&
                    ('string' == typeof e.authority &&
                      'string' == typeof e.fragment &&
                      'string' == typeof e.path &&
                      'string' == typeof e.query &&
                      'string' == typeof e.scheme &&
                      'function' == typeof e.fsPath &&
                      'function' == typeof e.with &&
                      'function' == typeof e.toString))
                );
              }),
              Object.defineProperty(t.prototype, 'fsPath', {
                get: function() {
                  return b(this);
                },
                enumerable: !0,
                configurable: !0
              }),
              (t.prototype.with = function(t) {
                if (!t) return this;
                var e = t.scheme,
                  r = t.authority,
                  o = t.path,
                  n = t.query,
                  i = t.fragment;
                return (
                  void 0 === e ? (e = this.scheme) : null === e && (e = f),
                  void 0 === r ? (r = this.authority) : null === r && (r = f),
                  void 0 === o ? (o = this.path) : null === o && (o = f),
                  void 0 === n ? (n = this.query) : null === n && (n = f),
                  void 0 === i ? (i = this.fragment) : null === i && (i = f),
                  e === this.scheme && r === this.authority && o === this.path && n === this.query && i === this.fragment
                    ? this
                    : new y(e, r, o, n, i)
                );
              }),
              (t.parse = function(t, e) {
                void 0 === e && (e = !1);
                var r = p.exec(t);
                return r
                  ? new y(
                      r[2] || f,
                      decodeURIComponent(r[4] || f),
                      decodeURIComponent(r[5] || f),
                      decodeURIComponent(r[7] || f),
                      decodeURIComponent(r[9] || f),
                      e
                    )
                  : new y(f, f, f, f, f);
              }),
              (t.file = function(t) {
                var r = f;
                if ((e.isWindows && (t = t.replace(/\\/g, c)), t[0] === c && t[1] === c)) {
                  var o = t.indexOf(c, 2);
                  -1 === o ? ((r = t.substring(2)), (t = c)) : ((r = t.substring(2, o)), (t = t.substring(o) || c));
                }
                return new y('file', r, t, f, f);
              }),
              (t.from = function(t) {
                return new y(t.scheme, t.authority, t.path, t.query, t.fragment);
              }),
              (t.prototype.toString = function(t) {
                return void 0 === t && (t = !1), w(this, t);
              }),
              (t.prototype.toJSON = function() {
                return this;
              }),
              (t.revive = function(e) {
                if (e) {
                  if (e instanceof t) return e;
                  var r = new y(e);
                  return (r._formatted = e.external), (r._fsPath = e._sep === d ? e.fsPath : null), r;
                }
                return e;
              }),
              t
            );
          })();
        exports.URI = m;
        var d = e.isWindows ? 1 : void 0,
          y = (function(t) {
            function e() {
              var e = (null !== t && t.apply(this, arguments)) || this;
              return (e._formatted = null), (e._fsPath = null), e;
            }
            return (
              r(e, t),
              Object.defineProperty(e.prototype, 'fsPath', {
                get: function() {
                  return this._fsPath || (this._fsPath = b(this)), this._fsPath;
                },
                enumerable: !0,
                configurable: !0
              }),
              (e.prototype.toString = function(t) {
                return void 0 === t && (t = !1), t ? w(this, !0) : (this._formatted || (this._formatted = w(this, !1)), this._formatted);
              }),
              (e.prototype.toJSON = function() {
                var t = { $mid: 1 };
                return (
                  this._fsPath && ((t.fsPath = this._fsPath), (t._sep = d)),
                  this._formatted && (t.external = this._formatted),
                  this.path && (t.path = this.path),
                  this.scheme && (t.scheme = this.scheme),
                  this.authority && (t.authority = this.authority),
                  this.query && (t.query = this.query),
                  this.fragment && (t.fragment = this.fragment),
                  t
                );
              }),
              e
            );
          })(m),
          l =
            (((t = {})[58] = '%3A'),
            (t[47] = '%2F'),
            (t[63] = '%3F'),
            (t[35] = '%23'),
            (t[91] = '%5B'),
            (t[93] = '%5D'),
            (t[64] = '%40'),
            (t[33] = '%21'),
            (t[36] = '%24'),
            (t[38] = '%26'),
            (t[39] = '%27'),
            (t[40] = '%28'),
            (t[41] = '%29'),
            (t[42] = '%2A'),
            (t[43] = '%2B'),
            (t[44] = '%2C'),
            (t[59] = '%3B'),
            (t[61] = '%3D'),
            (t[32] = '%20'),
            t);
        function g(t, e) {
          for (var r = void 0, o = -1, n = 0; n < t.length; n++) {
            var i = t.charCodeAt(n);
            if (
              (i >= 97 && i <= 122) ||
              (i >= 65 && i <= 90) ||
              (i >= 48 && i <= 57) ||
              45 === i ||
              46 === i ||
              95 === i ||
              126 === i ||
              (e && 47 === i)
            )
              -1 !== o && ((r += encodeURIComponent(t.substring(o, n))), (o = -1)), void 0 !== r && (r += t.charAt(n));
            else {
              void 0 === r && (r = t.substr(0, n));
              var h = l[i];
              void 0 !== h ? (-1 !== o && ((r += encodeURIComponent(t.substring(o, n))), (o = -1)), (r += h)) : -1 === o && (o = n);
            }
          }
          return -1 !== o && (r += encodeURIComponent(t.substring(o))), void 0 !== r ? r : t;
        }
        function v(t) {
          for (var e = void 0, r = 0; r < t.length; r++) {
            var o = t.charCodeAt(r);
            35 === o || 63 === o ? (void 0 === e && (e = t.substr(0, r)), (e += l[o])) : void 0 !== e && (e += t[r]);
          }
          return void 0 !== e ? e : t;
        }
        function b(t) {
          var r;
          return (
            (r =
              t.authority && t.path.length > 1 && 'file' === t.scheme
                ? '//' + t.authority + t.path
                : 47 === t.path.charCodeAt(0) &&
                  ((t.path.charCodeAt(1) >= 65 && t.path.charCodeAt(1) <= 90) || (t.path.charCodeAt(1) >= 97 && t.path.charCodeAt(1) <= 122)) &&
                  58 === t.path.charCodeAt(2)
                ? t.path[1].toLowerCase() + t.path.substr(2)
                : t.path),
            e.isWindows && (r = r.replace(/\//g, '\\')),
            r
          );
        }
        function w(t, e) {
          var r = e ? v : g,
            o = '',
            n = t.scheme,
            i = t.authority,
            h = t.path,
            s = t.query,
            a = t.fragment;
          if ((n && ((o += n), (o += ':')), (i || 'file' === n) && ((o += c), (o += c)), i)) {
            var u = i.indexOf('@');
            if (-1 !== u) {
              var f = i.substr(0, u);
              (i = i.substr(u + 1)),
                -1 === (u = f.indexOf(':')) ? (o += r(f, !1)) : ((o += r(f.substr(0, u), !1)), (o += ':'), (o += r(f.substr(u + 1), !1))),
                (o += '@');
            }
            -1 === (u = (i = i.toLowerCase()).indexOf(':')) ? (o += r(i, !1)) : ((o += r(i.substr(0, u), !1)), (o += i.substr(u)));
          }
          if (h) {
            if (h.length >= 3 && 47 === h.charCodeAt(0) && 58 === h.charCodeAt(2))
              (p = h.charCodeAt(1)) >= 65 && p <= 90 && (h = '/' + String.fromCharCode(p + 32) + ':' + h.substr(3));
            else if (h.length >= 2 && 58 === h.charCodeAt(1)) {
              var p;
              (p = h.charCodeAt(0)) >= 65 && p <= 90 && (h = String.fromCharCode(p + 32) + ':' + h.substr(2));
            }
            o += r(h, !0);
          }
          return s && ((o += '?'), (o += r(s, !1))), a && ((o += '#'), (o += e ? a : g(a, !1))), o;
        }
      },
      { './platform.js': 'wdE2' }
    ],
    E9Bb: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.Position = void 0);
        var e = (function() {
          function e(e, n) {
            (this.lineNumber = e), (this.column = n);
          }
          return (
            (e.prototype.with = function(n, t) {
              return (
                void 0 === n && (n = this.lineNumber),
                void 0 === t && (t = this.column),
                n === this.lineNumber && t === this.column ? this : new e(n, t)
              );
            }),
            (e.prototype.delta = function(e, n) {
              return void 0 === e && (e = 0), void 0 === n && (n = 0), this.with(this.lineNumber + e, this.column + n);
            }),
            (e.prototype.equals = function(n) {
              return e.equals(this, n);
            }),
            (e.equals = function(e, n) {
              return (!e && !n) || (!!e && !!n && e.lineNumber === n.lineNumber && e.column === n.column);
            }),
            (e.prototype.isBefore = function(n) {
              return e.isBefore(this, n);
            }),
            (e.isBefore = function(e, n) {
              return e.lineNumber < n.lineNumber || (!(n.lineNumber < e.lineNumber) && e.column < n.column);
            }),
            (e.prototype.isBeforeOrEqual = function(n) {
              return e.isBeforeOrEqual(this, n);
            }),
            (e.isBeforeOrEqual = function(e, n) {
              return e.lineNumber < n.lineNumber || (!(n.lineNumber < e.lineNumber) && e.column <= n.column);
            }),
            (e.compare = function(e, n) {
              var t = 0 | e.lineNumber,
                i = 0 | n.lineNumber;
              return t === i ? (0 | e.column) - (0 | n.column) : t - i;
            }),
            (e.prototype.clone = function() {
              return new e(this.lineNumber, this.column);
            }),
            (e.prototype.toString = function() {
              return '(' + this.lineNumber + ',' + this.column + ')';
            }),
            (e.lift = function(n) {
              return new e(n.lineNumber, n.column);
            }),
            (e.isIPosition = function(e) {
              return e && 'number' == typeof e.lineNumber && 'number' == typeof e.column;
            }),
            e
          );
        })();
        exports.Position = e;
      },
      {}
    ],
    IT6S: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.Range = void 0);
        var n = require('./position.js'),
          e = (function() {
            function e(n, e, t, r) {
              n > t || (n === t && e > r)
                ? ((this.startLineNumber = t), (this.startColumn = r), (this.endLineNumber = n), (this.endColumn = e))
                : ((this.startLineNumber = n), (this.startColumn = e), (this.endLineNumber = t), (this.endColumn = r));
            }
            return (
              (e.prototype.isEmpty = function() {
                return e.isEmpty(this);
              }),
              (e.isEmpty = function(n) {
                return n.startLineNumber === n.endLineNumber && n.startColumn === n.endColumn;
              }),
              (e.prototype.containsPosition = function(n) {
                return e.containsPosition(this, n);
              }),
              (e.containsPosition = function(n, e) {
                return (
                  !(e.lineNumber < n.startLineNumber || e.lineNumber > n.endLineNumber) &&
                  (!(e.lineNumber === n.startLineNumber && e.column < n.startColumn) && !(e.lineNumber === n.endLineNumber && e.column > n.endColumn))
                );
              }),
              (e.prototype.containsRange = function(n) {
                return e.containsRange(this, n);
              }),
              (e.containsRange = function(n, e) {
                return (
                  !(e.startLineNumber < n.startLineNumber || e.endLineNumber < n.startLineNumber) &&
                  (!(e.startLineNumber > n.endLineNumber || e.endLineNumber > n.endLineNumber) &&
                    (!(e.startLineNumber === n.startLineNumber && e.startColumn < n.startColumn) &&
                      !(e.endLineNumber === n.endLineNumber && e.endColumn > n.endColumn)))
                );
              }),
              (e.prototype.strictContainsRange = function(n) {
                return e.strictContainsRange(this, n);
              }),
              (e.strictContainsRange = function(n, e) {
                return (
                  !(e.startLineNumber < n.startLineNumber || e.endLineNumber < n.startLineNumber) &&
                  (!(e.startLineNumber > n.endLineNumber || e.endLineNumber > n.endLineNumber) &&
                    (!(e.startLineNumber === n.startLineNumber && e.startColumn <= n.startColumn) &&
                      !(e.endLineNumber === n.endLineNumber && e.endColumn >= n.endColumn)))
                );
              }),
              (e.prototype.plusRange = function(n) {
                return e.plusRange(this, n);
              }),
              (e.plusRange = function(n, t) {
                var r, u, i, m;
                return (
                  t.startLineNumber < n.startLineNumber
                    ? ((r = t.startLineNumber), (u = t.startColumn))
                    : t.startLineNumber === n.startLineNumber
                    ? ((r = t.startLineNumber), (u = Math.min(t.startColumn, n.startColumn)))
                    : ((r = n.startLineNumber), (u = n.startColumn)),
                  t.endLineNumber > n.endLineNumber
                    ? ((i = t.endLineNumber), (m = t.endColumn))
                    : t.endLineNumber === n.endLineNumber
                    ? ((i = t.endLineNumber), (m = Math.max(t.endColumn, n.endColumn)))
                    : ((i = n.endLineNumber), (m = n.endColumn)),
                  new e(r, u, i, m)
                );
              }),
              (e.prototype.intersectRanges = function(n) {
                return e.intersectRanges(this, n);
              }),
              (e.intersectRanges = function(n, t) {
                var r = n.startLineNumber,
                  u = n.startColumn,
                  i = n.endLineNumber,
                  m = n.endColumn,
                  o = t.startLineNumber,
                  s = t.startColumn,
                  a = t.endLineNumber,
                  b = t.endColumn;
                return (
                  r < o ? ((r = o), (u = s)) : r === o && (u = Math.max(u, s)),
                  i > a ? ((i = a), (m = b)) : i === a && (m = Math.min(m, b)),
                  r > i ? null : r === i && u > m ? null : new e(r, u, i, m)
                );
              }),
              (e.prototype.equalsRange = function(n) {
                return e.equalsRange(this, n);
              }),
              (e.equalsRange = function(n, e) {
                return (
                  !!n &&
                  !!e &&
                  n.startLineNumber === e.startLineNumber &&
                  n.startColumn === e.startColumn &&
                  n.endLineNumber === e.endLineNumber &&
                  n.endColumn === e.endColumn
                );
              }),
              (e.prototype.getEndPosition = function() {
                return new n.Position(this.endLineNumber, this.endColumn);
              }),
              (e.prototype.getStartPosition = function() {
                return new n.Position(this.startLineNumber, this.startColumn);
              }),
              (e.prototype.toString = function() {
                return '[' + this.startLineNumber + ',' + this.startColumn + ' -> ' + this.endLineNumber + ',' + this.endColumn + ']';
              }),
              (e.prototype.setEndPosition = function(n, t) {
                return new e(this.startLineNumber, this.startColumn, n, t);
              }),
              (e.prototype.setStartPosition = function(n, t) {
                return new e(n, t, this.endLineNumber, this.endColumn);
              }),
              (e.prototype.collapseToStart = function() {
                return e.collapseToStart(this);
              }),
              (e.collapseToStart = function(n) {
                return new e(n.startLineNumber, n.startColumn, n.startLineNumber, n.startColumn);
              }),
              (e.fromPositions = function(n, t) {
                return void 0 === t && (t = n), new e(n.lineNumber, n.column, t.lineNumber, t.column);
              }),
              (e.lift = function(n) {
                return n ? new e(n.startLineNumber, n.startColumn, n.endLineNumber, n.endColumn) : null;
              }),
              (e.isIRange = function(n) {
                return (
                  n &&
                  'number' == typeof n.startLineNumber &&
                  'number' == typeof n.startColumn &&
                  'number' == typeof n.endLineNumber &&
                  'number' == typeof n.endColumn
                );
              }),
              (e.areIntersectingOrTouching = function(n, e) {
                return (
                  !(n.endLineNumber < e.startLineNumber || (n.endLineNumber === e.startLineNumber && n.endColumn < e.startColumn)) &&
                  !(e.endLineNumber < n.startLineNumber || (e.endLineNumber === n.startLineNumber && e.endColumn < n.startColumn))
                );
              }),
              (e.areIntersecting = function(n, e) {
                return (
                  !(n.endLineNumber < e.startLineNumber || (n.endLineNumber === e.startLineNumber && n.endColumn <= e.startColumn)) &&
                  !(e.endLineNumber < n.startLineNumber || (e.endLineNumber === n.startLineNumber && e.endColumn <= n.startColumn))
                );
              }),
              (e.compareRangesUsingStarts = function(n, e) {
                if (n && e) {
                  var t = 0 | n.startLineNumber,
                    r = 0 | e.startLineNumber;
                  if (t === r) {
                    var u = 0 | n.startColumn,
                      i = 0 | e.startColumn;
                    if (u === i) {
                      var m = 0 | n.endLineNumber,
                        o = 0 | e.endLineNumber;
                      return m === o ? (0 | n.endColumn) - (0 | e.endColumn) : m - o;
                    }
                    return u - i;
                  }
                  return t - r;
                }
                return (n ? 1 : 0) - (e ? 1 : 0);
              }),
              (e.compareRangesUsingEnds = function(n, e) {
                return n.endLineNumber === e.endLineNumber
                  ? n.endColumn === e.endColumn
                    ? n.startLineNumber === e.startLineNumber
                      ? n.startColumn - e.startColumn
                      : n.startLineNumber - e.startLineNumber
                    : n.endColumn - e.endColumn
                  : n.endLineNumber - e.endLineNumber;
              }),
              (e.spansMultipleLines = function(n) {
                return n.endLineNumber > n.startLineNumber;
              }),
              e
            );
          })();
        exports.Range = e;
      },
      { './position.js': 'E9Bb' }
    ],
    dcfJ: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.isFalsyOrWhitespace = t),
          (exports.pad = e),
          (exports.format = u),
          (exports.escape = o),
          (exports.escapeRegExpCharacters = i),
          (exports.trim = a),
          (exports.ltrim = s),
          (exports.rtrim = c),
          (exports.convertSimple2RegExpPattern = f),
          (exports.startsWith = h),
          (exports.endsWith = g),
          (exports.createRegExp = p),
          (exports.regExpLeadsToEndlessLoop = l),
          (exports.regExpFlags = x),
          (exports.firstNonWhitespaceIndex = D),
          (exports.getLeadingWhitespace = C),
          (exports.lastNonWhitespaceIndex = F),
          (exports.compare = d),
          (exports.compareIgnoreCase = v),
          (exports.isLowerAsciiLetter = E),
          (exports.isUpperAsciiLetter = m),
          (exports.equalsIgnoreCase = B),
          (exports.startsWithIgnoreCase = w),
          (exports.commonPrefixLength = b),
          (exports.commonSuffixLength = I),
          (exports.isHighSurrogate = W),
          (exports.isLowSurrogate = R),
          (exports.containsRTL = y),
          (exports.containsEmoji = O),
          (exports.isBasicASCII = T),
          (exports.containsFullWidthCharacter = U),
          (exports.isFullWidthCharacter = _),
          (exports.startsWithUTF8BOM = N),
          (exports.safeBtoa = j),
          (exports.repeat = P),
          (exports.containsUppercaseCharacter = q),
          (exports.singleLetterHash = k),
          (exports.UTF8_BOM_CHARACTER = exports.empty = void 0);
        var r = '';
        function t(r) {
          return !r || 'string' != typeof r || 0 === r.trim().length;
        }
        function e(r, t, e) {
          void 0 === e && (e = '0');
          for (var n = '' + r, u = [n], o = n.length; o < t; o++) u.push(e);
          return u.reverse().join('');
        }
        exports.empty = r;
        var n = /{(\d+)}/g;
        function u(r) {
          for (var t = [], e = 1; e < arguments.length; e++) t[e - 1] = arguments[e];
          return 0 === t.length
            ? r
            : r.replace(n, function(r, e) {
                var n = parseInt(e, 10);
                return isNaN(n) || n < 0 || n >= t.length ? r : t[n];
              });
        }
        function o(r) {
          return r.replace(/[<>&]/g, function(r) {
            switch (r) {
              case '<':
                return '&lt;';
              case '>':
                return '&gt;';
              case '&':
                return '&amp;';
              default:
                return r;
            }
          });
        }
        function i(r) {
          return r.replace(/[\-\\\{\}\*\+\?\|\^\$\.\[\]\(\)\#]/g, '\\$&');
        }
        function a(r, t) {
          return void 0 === t && (t = ' '), c(s(r, t), t);
        }
        function s(r, t) {
          if (!r || !t) return r;
          var e = t.length;
          if (0 === e || 0 === r.length) return r;
          for (var n = 0; r.indexOf(t, n) === n; ) n += e;
          return r.substring(n);
        }
        function c(r, t) {
          if (!r || !t) return r;
          var e = t.length,
            n = r.length;
          if (0 === e || 0 === n) return r;
          for (var u = n, o = -1; -1 !== (o = r.lastIndexOf(t, u - 1)) && o + e === u; ) {
            if (0 === o) return '';
            u = o;
          }
          return r.substring(0, u);
        }
        function f(r) {
          return r.replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, '\\$&').replace(/[\*]/g, '.*');
        }
        function h(r, t) {
          if (r.length < t.length) return !1;
          if (r === t) return !0;
          for (var e = 0; e < t.length; e++) if (r[e] !== t[e]) return !1;
          return !0;
        }
        function g(r, t) {
          var e = r.length - t.length;
          return e > 0 ? r.indexOf(t, e) === e : 0 === e && r === t;
        }
        function p(r, t, e) {
          if ((void 0 === e && (e = {}), !r)) throw new Error('Cannot create regex from empty string');
          t || (r = i(r)), e.wholeWord && (/\B/.test(r.charAt(0)) || (r = '\\b' + r), /\B/.test(r.charAt(r.length - 1)) || (r += '\\b'));
          var n = '';
          return e.global && (n += 'g'), e.matchCase || (n += 'i'), e.multiline && (n += 'm'), e.unicode && (n += 'u'), new RegExp(r, n);
        }
        function l(r) {
          return '^' !== r.source && '^$' !== r.source && '$' !== r.source && '^\\s*$' !== r.source && !(!r.exec('') || 0 !== r.lastIndex);
        }
        function x(r) {
          return (r.global ? 'g' : '') + (r.ignoreCase ? 'i' : '') + (r.multiline ? 'm' : '') + (r.unicode ? 'u' : '');
        }
        function D(r) {
          for (var t = 0, e = r.length; t < e; t++) {
            var n = r.charCodeAt(t);
            if (32 !== n && 9 !== n) return t;
          }
          return -1;
        }
        function C(r, t, e) {
          void 0 === t && (t = 0), void 0 === e && (e = r.length);
          for (var n = t; n < e; n++) {
            var u = r.charCodeAt(n);
            if (32 !== u && 9 !== u) return r.substring(t, n);
          }
          return r.substring(t, e);
        }
        function F(r, t) {
          void 0 === t && (t = r.length - 1);
          for (var e = t; e >= 0; e--) {
            var n = r.charCodeAt(e);
            if (32 !== n && 9 !== n) return e;
          }
          return -1;
        }
        function d(r, t) {
          return r < t ? -1 : r > t ? 1 : 0;
        }
        function v(r, t) {
          for (var e = Math.min(r.length, t.length), n = 0; n < e; n++) {
            var u = r.charCodeAt(n),
              o = t.charCodeAt(n);
            if (u !== o) {
              m(u) && (u += 32), m(o) && (o += 32);
              var i = u - o;
              if (0 !== i) return E(u) && E(o) ? i : d(r.toLowerCase(), t.toLowerCase());
            }
          }
          return r.length < t.length ? -1 : r.length > t.length ? 1 : 0;
        }
        function E(r) {
          return r >= 97 && r <= 122;
        }
        function m(r) {
          return r >= 65 && r <= 90;
        }
        function A(r) {
          return E(r) || m(r);
        }
        function B(r, t) {
          return (r ? r.length : 0) === (t ? t.length : 0) && L(r, t);
        }
        function L(r, t, e) {
          if ((void 0 === e && (e = r.length), 'string' != typeof r || 'string' != typeof t)) return !1;
          for (var n = 0; n < e; n++) {
            var u = r.charCodeAt(n),
              o = t.charCodeAt(n);
            if (u !== o)
              if (A(u) && A(o)) {
                var i = Math.abs(u - o);
                if (0 !== i && 32 !== i) return !1;
              } else if (String.fromCharCode(u).toLowerCase() !== String.fromCharCode(o).toLowerCase()) return !1;
          }
          return !0;
        }
        function w(r, t) {
          var e = t.length;
          return !(t.length > r.length) && L(r, t, e);
        }
        function b(r, t) {
          var e,
            n = Math.min(r.length, t.length);
          for (e = 0; e < n; e++) if (r.charCodeAt(e) !== t.charCodeAt(e)) return e;
          return n;
        }
        function I(r, t) {
          var e,
            n = Math.min(r.length, t.length),
            u = r.length - 1,
            o = t.length - 1;
          for (e = 0; e < n; e++) if (r.charCodeAt(u - e) !== t.charCodeAt(o - e)) return e;
          return n;
        }
        function W(r) {
          return 55296 <= r && r <= 56319;
        }
        function R(r) {
          return 56320 <= r && r <= 57343;
        }
        var S = /(?:[\u05BE\u05C0\u05C3\u05C6\u05D0-\u05F4\u0608\u060B\u060D\u061B-\u064A\u066D-\u066F\u0671-\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u0710\u0712-\u072F\u074D-\u07A5\u07B1-\u07EA\u07F4\u07F5\u07FA-\u0815\u081A\u0824\u0828\u0830-\u0858\u085E-\u08BD\u200F\uFB1D\uFB1F-\uFB28\uFB2A-\uFD3D\uFD50-\uFDFC\uFE70-\uFEFC]|\uD802[\uDC00-\uDD1B\uDD20-\uDE00\uDE10-\uDE33\uDE40-\uDEE4\uDEEB-\uDF35\uDF40-\uDFFF]|\uD803[\uDC00-\uDCFF]|\uD83A[\uDC00-\uDCCF\uDD00-\uDD43\uDD50-\uDFFF]|\uD83B[\uDC00-\uDEBB])/;
        function y(r) {
          return S.test(r);
        }
        var M = /(?:[\u231A\u231B\u23F0\u23F3\u2600-\u27BF\u2B50\u2B55]|\uD83C[\uDDE6-\uDDFF\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F\uDE80-\uDEF8]|\uD83E[\uDD00-\uDDE6])/;
        function O(r) {
          return M.test(r);
        }
        var $ = /^[\t\n\r\x20-\x7E]*$/;
        function T(r) {
          return $.test(r);
        }
        function U(r) {
          for (var t = 0, e = r.length; t < e; t++) if (_(r.charCodeAt(t))) return !0;
          return !1;
        }
        function _(r) {
          return ((r = +r) >= 11904 && r <= 55215) || (r >= 63744 && r <= 64255) || (r >= 65281 && r <= 65374);
        }
        var H = String.fromCharCode(65279);
        function N(r) {
          return !!(r && r.length > 0 && 65279 === r.charCodeAt(0));
        }
        function j(r) {
          return btoa(encodeURIComponent(r));
        }
        function P(r, t) {
          for (var e = '', n = 0; n < t; n++) e += r;
          return e;
        }
        function q(r, t) {
          return void 0 === t && (t = !1), !!r && (t && (r = r.replace(/\\./g, '')), r.toLowerCase() !== r);
        }
        function k(r) {
          return (r %= 52) < 26 ? String.fromCharCode(97 + r) : String.fromCharCode(65 + r - 26);
        }
        exports.UTF8_BOM_CHARACTER = H;
      },
      {}
    ],
    OqVr: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.DiffComputer = void 0);
        var e = require('../../../base/common/diff/diff.js'),
          t = n(require('../../../base/common/strings.js'));
        function i() {
          if ('function' != typeof WeakMap) return null;
          var e = new WeakMap();
          return (
            (i = function() {
              return e;
            }),
            e
          );
        }
        function n(e) {
          if (e && e.__esModule) return e;
          var t = i();
          if (t && t.has(e)) return t.get(e);
          var n = {};
          if (null != e) {
            var r = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var o in e)
              if (Object.prototype.hasOwnProperty.call(e, o)) {
                var a = r ? Object.getOwnPropertyDescriptor(e, o) : null;
                a && (a.get || a.set) ? Object.defineProperty(n, o, a) : (n[o] = e[o]);
              }
          }
          return (n.default = e), t && t.set(e, n), n;
        }
        var r = 5e3,
          o = 3;
        function a(t, i, n, r) {
          return new e.LcsDiff(t, i, n).ComputeDiff(r);
        }
        var u = (function() {
            function e(t) {
              for (var i = [], n = [], r = 0, o = t.length; r < o; r++)
                (i[r] = e._getFirstNonBlankColumn(t[r], 1)), (n[r] = e._getLastNonBlankColumn(t[r], 1));
              (this._lines = t), (this._startColumns = i), (this._endColumns = n);
            }
            return (
              (e.prototype.getLength = function() {
                return this._lines.length;
              }),
              (e.prototype.getElementAtIndex = function(e) {
                return this._lines[e].substring(this._startColumns[e] - 1, this._endColumns[e] - 1);
              }),
              (e.prototype.getStartLineNumber = function(e) {
                return e + 1;
              }),
              (e.prototype.getEndLineNumber = function(e) {
                return e + 1;
              }),
              (e._getFirstNonBlankColumn = function(e, i) {
                var n = t.firstNonWhitespaceIndex(e);
                return -1 === n ? i : n + 1;
              }),
              (e._getLastNonBlankColumn = function(e, i) {
                var n = t.lastNonWhitespaceIndex(e);
                return -1 === n ? i : n + 2;
              }),
              (e.prototype.getCharSequence = function(e, t, i) {
                for (var n = [], r = [], o = [], a = 0, u = t; u <= i; u++)
                  for (var h = this._lines[u], d = e ? this._startColumns[u] : 1, m = e ? this._endColumns[u] : h.length + 1, g = d; g < m; g++)
                    (n[a] = h.charCodeAt(g - 1)), (r[a] = u + 1), (o[a] = g), a++;
                return new s(n, r, o);
              }),
              e
            );
          })(),
          s = (function() {
            function e(e, t, i) {
              (this._charCodes = e), (this._lineNumbers = t), (this._columns = i);
            }
            return (
              (e.prototype.getLength = function() {
                return this._charCodes.length;
              }),
              (e.prototype.getElementAtIndex = function(e) {
                return this._charCodes[e];
              }),
              (e.prototype.getStartLineNumber = function(e) {
                return this._lineNumbers[e];
              }),
              (e.prototype.getStartColumn = function(e) {
                return this._columns[e];
              }),
              (e.prototype.getEndLineNumber = function(e) {
                return this._lineNumbers[e];
              }),
              (e.prototype.getEndColumn = function(e) {
                return this._columns[e] + 1;
              }),
              e
            );
          })(),
          h = (function() {
            function e(e, t, i, n, r, o, a, u) {
              (this.originalStartLineNumber = e),
                (this.originalStartColumn = t),
                (this.originalEndLineNumber = i),
                (this.originalEndColumn = n),
                (this.modifiedStartLineNumber = r),
                (this.modifiedStartColumn = o),
                (this.modifiedEndLineNumber = a),
                (this.modifiedEndColumn = u);
            }
            return (
              (e.createFromDiffChange = function(t, i, n) {
                var r, o, a, u, s, h, d, m;
                return (
                  0 === t.originalLength
                    ? ((r = 0), (o = 0), (a = 0), (u = 0))
                    : ((r = i.getStartLineNumber(t.originalStart)),
                      (o = i.getStartColumn(t.originalStart)),
                      (a = i.getEndLineNumber(t.originalStart + t.originalLength - 1)),
                      (u = i.getEndColumn(t.originalStart + t.originalLength - 1))),
                  0 === t.modifiedLength
                    ? ((s = 0), (h = 0), (d = 0), (m = 0))
                    : ((s = n.getStartLineNumber(t.modifiedStart)),
                      (h = n.getStartColumn(t.modifiedStart)),
                      (d = n.getEndLineNumber(t.modifiedStart + t.modifiedLength - 1)),
                      (m = n.getEndColumn(t.modifiedStart + t.modifiedLength - 1))),
                  new e(r, o, a, u, s, h, d, m)
                );
              }),
              e
            );
          })();
        function d(e) {
          if (e.length <= 1) return e;
          for (var t = [e[0]], i = t[0], n = 1, r = e.length; n < r; n++) {
            var a = e[n],
              u = a.originalStart - (i.originalStart + i.originalLength),
              s = a.modifiedStart - (i.modifiedStart + i.modifiedLength);
            Math.min(u, s) < o
              ? ((i.originalLength = a.originalStart + a.originalLength - i.originalStart),
                (i.modifiedLength = a.modifiedStart + a.modifiedLength - i.modifiedStart))
              : (t.push(a), (i = a));
          }
          return t;
        }
        var m = (function() {
            function e(e, t, i, n, r) {
              (this.originalStartLineNumber = e),
                (this.originalEndLineNumber = t),
                (this.modifiedStartLineNumber = i),
                (this.modifiedEndLineNumber = n),
                (this.charChanges = r);
            }
            return (
              (e.createFromDiffResult = function(t, i, n, r, o, u, s) {
                var m,
                  g,
                  l,
                  f,
                  c = void 0;
                if (
                  (0 === i.originalLength
                    ? ((m = n.getStartLineNumber(i.originalStart) - 1), (g = 0))
                    : ((m = n.getStartLineNumber(i.originalStart)), (g = n.getEndLineNumber(i.originalStart + i.originalLength - 1))),
                  0 === i.modifiedLength
                    ? ((l = r.getStartLineNumber(i.modifiedStart) - 1), (f = 0))
                    : ((l = r.getStartLineNumber(i.modifiedStart)), (f = r.getEndLineNumber(i.modifiedStart + i.modifiedLength - 1))),
                  u && 0 !== i.originalLength && 0 !== i.modifiedLength && o())
                ) {
                  var C = n.getCharSequence(t, i.originalStart, i.originalStart + i.originalLength - 1),
                    L = r.getCharSequence(t, i.modifiedStart, i.modifiedStart + i.modifiedLength - 1),
                    p = a(C, L, o, !0);
                  s && (p = d(p)), (c = []);
                  for (var S = 0, b = p.length; S < b; S++) c.push(h.createFromDiffChange(p[S], C, L));
                }
                return new e(m, g, l, f, c);
              }),
              e
            );
          })(),
          g = (function() {
            function e(e, t, i) {
              (this.shouldComputeCharChanges = i.shouldComputeCharChanges),
                (this.shouldPostProcessCharChanges = i.shouldPostProcessCharChanges),
                (this.shouldIgnoreTrimWhitespace = i.shouldIgnoreTrimWhitespace),
                (this.shouldMakePrettyDiff = i.shouldMakePrettyDiff),
                (this.maximumRunTimeMs = r),
                (this.originalLines = e),
                (this.modifiedLines = t),
                (this.original = new u(e)),
                (this.modified = new u(t)),
                (this.computationStartTime = new Date().getTime());
            }
            return (
              (e.prototype.computeDiff = function() {
                if (1 === this.original.getLength() && 0 === this.original.getElementAtIndex(0).length)
                  return [
                    {
                      originalStartLineNumber: 1,
                      originalEndLineNumber: 1,
                      modifiedStartLineNumber: 1,
                      modifiedEndLineNumber: this.modified.getLength(),
                      charChanges: [
                        {
                          modifiedEndColumn: 0,
                          modifiedEndLineNumber: 0,
                          modifiedStartColumn: 0,
                          modifiedStartLineNumber: 0,
                          originalEndColumn: 0,
                          originalEndLineNumber: 0,
                          originalStartColumn: 0,
                          originalStartLineNumber: 0
                        }
                      ]
                    }
                  ];
                if (1 === this.modified.getLength() && 0 === this.modified.getElementAtIndex(0).length)
                  return [
                    {
                      originalStartLineNumber: 1,
                      originalEndLineNumber: this.original.getLength(),
                      modifiedStartLineNumber: 1,
                      modifiedEndLineNumber: 1,
                      charChanges: [
                        {
                          modifiedEndColumn: 0,
                          modifiedEndLineNumber: 0,
                          modifiedStartColumn: 0,
                          modifiedStartLineNumber: 0,
                          originalEndColumn: 0,
                          originalEndLineNumber: 0,
                          originalStartColumn: 0,
                          originalStartLineNumber: 0
                        }
                      ]
                    }
                  ];
                this.computationStartTime = new Date().getTime();
                var e = a(this.original, this.modified, this._continueProcessingPredicate.bind(this), this.shouldMakePrettyDiff);
                if (this.shouldIgnoreTrimWhitespace) {
                  for (var t = [], i = 0, n = e.length; i < n; i++)
                    t.push(
                      m.createFromDiffResult(
                        this.shouldIgnoreTrimWhitespace,
                        e[i],
                        this.original,
                        this.modified,
                        this._continueProcessingPredicate.bind(this),
                        this.shouldComputeCharChanges,
                        this.shouldPostProcessCharChanges
                      )
                    );
                  return t;
                }
                for (var r = [], o = 0, s = 0, h = ((i = -1), e.length); i < h; i++) {
                  for (
                    var d = i + 1 < h ? e[i + 1] : null,
                      g = d ? d.originalStart : this.originalLines.length,
                      l = d ? d.modifiedStart : this.modifiedLines.length;
                    o < g && s < l;

                  ) {
                    var f = this.originalLines[o],
                      c = this.modifiedLines[s];
                    if (f !== c) {
                      for (var C = u._getFirstNonBlankColumn(f, 1), L = u._getFirstNonBlankColumn(c, 1); C > 1 && L > 1; ) {
                        if (f.charCodeAt(C - 2) !== c.charCodeAt(L - 2)) break;
                        C--, L--;
                      }
                      (C > 1 || L > 1) && this._pushTrimWhitespaceCharChange(r, o + 1, 1, C, s + 1, 1, L);
                      for (
                        var p = u._getLastNonBlankColumn(f, 1), S = u._getLastNonBlankColumn(c, 1), b = f.length + 1, N = c.length + 1;
                        p < b && S < N;

                      ) {
                        if (f.charCodeAt(p - 1) !== f.charCodeAt(S - 1)) break;
                        p++, S++;
                      }
                      (p < b || S < N) && this._pushTrimWhitespaceCharChange(r, o + 1, p, b, s + 1, S, N);
                    }
                    o++, s++;
                  }
                  d &&
                    (r.push(
                      m.createFromDiffResult(
                        this.shouldIgnoreTrimWhitespace,
                        d,
                        this.original,
                        this.modified,
                        this._continueProcessingPredicate.bind(this),
                        this.shouldComputeCharChanges,
                        this.shouldPostProcessCharChanges
                      )
                    ),
                    (o += d.originalLength),
                    (s += d.modifiedLength));
                }
                return r;
              }),
              (e.prototype._pushTrimWhitespaceCharChange = function(e, t, i, n, r, o, a) {
                if (!this._mergeTrimWhitespaceCharChange(e, t, i, n, r, o, a)) {
                  var u = void 0;
                  this.shouldComputeCharChanges && (u = [new h(t, i, t, n, r, o, r, a)]), e.push(new m(t, t, r, r, u));
                }
              }),
              (e.prototype._mergeTrimWhitespaceCharChange = function(e, t, i, n, r, o, a) {
                var u = e.length;
                if (0 === u) return !1;
                var s = e[u - 1];
                return (
                  0 !== s.originalEndLineNumber &&
                  0 !== s.modifiedEndLineNumber &&
                  (s.originalEndLineNumber + 1 === t &&
                    s.modifiedEndLineNumber + 1 === r &&
                    ((s.originalEndLineNumber = t),
                    (s.modifiedEndLineNumber = r),
                    this.shouldComputeCharChanges && s.charChanges.push(new h(t, i, t, n, r, o, r, a)),
                    !0))
                );
              }),
              (e.prototype._continueProcessingPredicate = function() {
                return 0 === this.maximumRunTimeMs || new Date().getTime() - this.computationStartTime < this.maximumRunTimeMs;
              }),
              e
            );
          })();
        exports.DiffComputer = g;
      },
      { '../../../base/common/diff/diff.js': 'UuLR', '../../../base/common/strings.js': 'dcfJ' }
    ],
    zRly: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.toUint8 = r),
          (exports.toUint32 = n),
          (exports.toUint32Array = o),
          (exports.Uint8Matrix = void 0);
        var t = (function() {
          function t(t, r, n) {
            for (var o = new Uint8Array(t * r), e = 0, i = t * r; e < i; e++) o[e] = n;
            (this._data = o), (this.rows = t), (this.cols = r);
          }
          return (
            (t.prototype.get = function(t, r) {
              return this._data[t * this.cols + r];
            }),
            (t.prototype.set = function(t, r, n) {
              this._data[t * this.cols + r] = n;
            }),
            t
          );
        })();
        function r(t) {
          return t < 0 ? 0 : t > 255 ? 255 : 0 | t;
        }
        function n(t) {
          return t < 0 ? 0 : t > 4294967295 ? 4294967295 : 0 | t;
        }
        function o(t) {
          for (var r = t.length, o = new Uint32Array(r), e = 0; e < r; e++) o[e] = n(t[e]);
          return o;
        }
        exports.Uint8Matrix = t;
      },
      {}
    ],
    NWjm: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.PrefixSumComputerWithCache = exports.PrefixSumComputer = exports.PrefixSumIndexOfResult = void 0);
        var t = require('../core/uint.js'),
          e = (function() {
            return function(t, e) {
              (this.index = t), (this.remainder = e);
            };
          })();
        exports.PrefixSumIndexOfResult = e;
        var i = (function() {
          function i(t) {
            (this.values = t),
              (this.prefixSum = new Uint32Array(t.length)),
              (this.prefixSumValidIndex = new Int32Array(1)),
              (this.prefixSumValidIndex[0] = -1);
          }
          return (
            (i.prototype.getCount = function() {
              return this.values.length;
            }),
            (i.prototype.insertValues = function(e, i) {
              e = (0, t.toUint32)(e);
              var u = this.values,
                r = this.prefixSum,
                a = i.length;
              return (
                0 !== a &&
                ((this.values = new Uint32Array(u.length + a)),
                this.values.set(u.subarray(0, e), 0),
                this.values.set(u.subarray(e), e + a),
                this.values.set(i, e),
                e - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = e - 1),
                (this.prefixSum = new Uint32Array(this.values.length)),
                this.prefixSumValidIndex[0] >= 0 && this.prefixSum.set(r.subarray(0, this.prefixSumValidIndex[0] + 1)),
                !0)
              );
            }),
            (i.prototype.changeValue = function(e, i) {
              return (
                (e = (0, t.toUint32)(e)),
                (i = (0, t.toUint32)(i)),
                this.values[e] !== i && ((this.values[e] = i), e - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = e - 1), !0)
              );
            }),
            (i.prototype.removeValues = function(e, i) {
              (e = (0, t.toUint32)(e)), (i = (0, t.toUint32)(i));
              var u = this.values,
                r = this.prefixSum;
              if (e >= u.length) return !1;
              var a = u.length - e;
              return (
                i >= a && (i = a),
                0 !== i &&
                  ((this.values = new Uint32Array(u.length - i)),
                  this.values.set(u.subarray(0, e), 0),
                  this.values.set(u.subarray(e + i), e),
                  (this.prefixSum = new Uint32Array(this.values.length)),
                  e - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = e - 1),
                  this.prefixSumValidIndex[0] >= 0 && this.prefixSum.set(r.subarray(0, this.prefixSumValidIndex[0] + 1)),
                  !0)
              );
            }),
            (i.prototype.getTotalValue = function() {
              return 0 === this.values.length ? 0 : this._getAccumulatedValue(this.values.length - 1);
            }),
            (i.prototype.getAccumulatedValue = function(e) {
              return e < 0 ? 0 : ((e = (0, t.toUint32)(e)), this._getAccumulatedValue(e));
            }),
            (i.prototype._getAccumulatedValue = function(t) {
              if (t <= this.prefixSumValidIndex[0]) return this.prefixSum[t];
              var e = this.prefixSumValidIndex[0] + 1;
              0 === e && ((this.prefixSum[0] = this.values[0]), e++), t >= this.values.length && (t = this.values.length - 1);
              for (var i = e; i <= t; i++) this.prefixSum[i] = this.prefixSum[i - 1] + this.values[i];
              return (this.prefixSumValidIndex[0] = Math.max(this.prefixSumValidIndex[0], t)), this.prefixSum[t];
            }),
            (i.prototype.getIndexOf = function(t) {
              (t = Math.floor(t)), this.getTotalValue();
              for (var i = 0, u = this.values.length - 1, r = 0, a = 0, s = 0; i <= u; )
                if (((r = (i + (u - i) / 2) | 0), t < (s = (a = this.prefixSum[r]) - this.values[r]))) u = r - 1;
                else {
                  if (!(t >= a)) break;
                  i = r + 1;
                }
              return new e(r, t - s);
            }),
            i
          );
        })();
        exports.PrefixSumComputer = i;
        var u = (function() {
          function t(t) {
            (this._cacheAccumulatedValueStart = 0), (this._cache = null), (this._actual = new i(t)), this._bustCache();
          }
          return (
            (t.prototype._bustCache = function() {
              (this._cacheAccumulatedValueStart = 0), (this._cache = null);
            }),
            (t.prototype.insertValues = function(t, e) {
              this._actual.insertValues(t, e) && this._bustCache();
            }),
            (t.prototype.changeValue = function(t, e) {
              this._actual.changeValue(t, e) && this._bustCache();
            }),
            (t.prototype.removeValues = function(t, e) {
              this._actual.removeValues(t, e) && this._bustCache();
            }),
            (t.prototype.getTotalValue = function() {
              return this._actual.getTotalValue();
            }),
            (t.prototype.getAccumulatedValue = function(t) {
              return this._actual.getAccumulatedValue(t);
            }),
            (t.prototype.getIndexOf = function(t) {
              if (((t = Math.floor(t)), null !== this._cache)) {
                var e = t - this._cacheAccumulatedValueStart;
                if (e >= 0 && e < this._cache.length) return this._cache[e];
              }
              return this._actual.getIndexOf(t);
            }),
            (t.prototype.warmUpCache = function(t, e) {
              for (var i = [], u = t; u <= e; u++) i[u - t] = this.getIndexOf(u);
              (this._cache = i), (this._cacheAccumulatedValueStart = t);
            }),
            t
          );
        })();
        exports.PrefixSumComputerWithCache = u;
      },
      { '../core/uint.js': 'zRly' }
    ],
    VhpR: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.MirrorTextModel = void 0);
        var e = require('../core/position.js'),
          t = require('../viewModel/prefixSumComputer.js'),
          i = (function() {
            function i(e, t, i, n) {
              (this._uri = e), (this._lines = t), (this._eol = i), (this._versionId = n), (this._lineStarts = null);
            }
            return (
              (i.prototype.dispose = function() {
                this._lines.length = 0;
              }),
              (i.prototype.getText = function() {
                return this._lines.join(this._eol);
              }),
              (i.prototype.onEvents = function(t) {
                t.eol && t.eol !== this._eol && ((this._eol = t.eol), (this._lineStarts = null));
                for (var i = 0, n = t.changes; i < n.length; i++) {
                  var s = n[i];
                  this._acceptDeleteRange(s.range), this._acceptInsertText(new e.Position(s.range.startLineNumber, s.range.startColumn), s.text);
                }
                this._versionId = t.versionId;
              }),
              (i.prototype._ensureLineStarts = function() {
                if (!this._lineStarts) {
                  for (var e = this._eol.length, i = this._lines.length, n = new Uint32Array(i), s = 0; s < i; s++) n[s] = this._lines[s].length + e;
                  this._lineStarts = new t.PrefixSumComputer(n);
                }
              }),
              (i.prototype._setLineText = function(e, t) {
                (this._lines[e] = t), this._lineStarts && this._lineStarts.changeValue(e, this._lines[e].length + this._eol.length);
              }),
              (i.prototype._acceptDeleteRange = function(e) {
                if (e.startLineNumber !== e.endLineNumber)
                  this._setLineText(
                    e.startLineNumber - 1,
                    this._lines[e.startLineNumber - 1].substring(0, e.startColumn - 1) + this._lines[e.endLineNumber - 1].substring(e.endColumn - 1)
                  ),
                    this._lines.splice(e.startLineNumber, e.endLineNumber - e.startLineNumber),
                    this._lineStarts && this._lineStarts.removeValues(e.startLineNumber, e.endLineNumber - e.startLineNumber);
                else {
                  if (e.startColumn === e.endColumn) return;
                  this._setLineText(
                    e.startLineNumber - 1,
                    this._lines[e.startLineNumber - 1].substring(0, e.startColumn - 1) + this._lines[e.startLineNumber - 1].substring(e.endColumn - 1)
                  );
                }
              }),
              (i.prototype._acceptInsertText = function(e, t) {
                if (0 !== t.length) {
                  var i = t.split(/\r\n|\r|\n/);
                  if (1 !== i.length) {
                    (i[i.length - 1] += this._lines[e.lineNumber - 1].substring(e.column - 1)),
                      this._setLineText(e.lineNumber - 1, this._lines[e.lineNumber - 1].substring(0, e.column - 1) + i[0]);
                    for (var n = new Uint32Array(i.length - 1), s = 1; s < i.length; s++)
                      this._lines.splice(e.lineNumber + s - 1, 0, i[s]), (n[s - 1] = i[s].length + this._eol.length);
                    this._lineStarts && this._lineStarts.insertValues(e.lineNumber, n);
                  } else
                    this._setLineText(
                      e.lineNumber - 1,
                      this._lines[e.lineNumber - 1].substring(0, e.column - 1) + i[0] + this._lines[e.lineNumber - 1].substring(e.column - 1)
                    );
                }
              }),
              i
            );
          })();
        exports.MirrorTextModel = i;
      },
      { '../core/position.js': 'E9Bb', '../viewModel/prefixSumComputer.js': 'NWjm' }
    ],
    s6WU: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.ensureValidWordDefinition = t),
          (exports.getWordAtText = u),
          (exports.DEFAULT_WORD_REGEXP = exports.USUAL_WORD_SEPARATORS = void 0);
        var e = '`~!@#$%^&*()-=+[{]}\\|;:\'",.<>/?';
        function n(n) {
          void 0 === n && (n = '');
          for (var r = '(-?\\d*\\.\\d\\w*)|([^', t = 0, o = e; t < o.length; t++) {
            var l = o[t];
            n.indexOf(l) >= 0 || (r += '\\' + l);
          }
          return (r += '\\s]+)'), new RegExp(r, 'g');
        }
        exports.USUAL_WORD_SEPARATORS = e;
        var r = n();
        function t(e) {
          var n = r;
          if (e && e instanceof RegExp)
            if (e.global) n = e;
            else {
              var t = 'g';
              e.ignoreCase && (t += 'i'), e.multiline && (t += 'm'), e.unicode && (t += 'u'), (n = new RegExp(e.source, t));
            }
          return (n.lastIndex = 0), n;
        }
        function o(e, n, r, t) {
          var o,
            l = e - 1 - t,
            u = r.lastIndexOf(' ', l - 1) + 1;
          for (n.lastIndex = u; (o = n.exec(r)); ) {
            var a = o.index || 0;
            if (a <= l && n.lastIndex >= l) return { word: o[0], startColumn: t + 1 + a, endColumn: t + 1 + n.lastIndex };
          }
          return null;
        }
        function l(e, n, r, t) {
          var o,
            l = e - 1 - t;
          for (n.lastIndex = 0; (o = n.exec(r)); ) {
            var u = o.index || 0;
            if (u > l) return null;
            if (n.lastIndex >= l) return { word: o[0], startColumn: t + 1 + u, endColumn: t + 1 + n.lastIndex };
          }
          return null;
        }
        function u(e, n, r, t) {
          n.lastIndex = 0;
          var u = n.exec(r);
          if (!u) return null;
          var a = u[0].indexOf(' ') >= 0 ? l(e, n, r, t) : o(e, n, r, t);
          return (n.lastIndex = 0), a;
        }
        exports.DEFAULT_WORD_REGEXP = r;
      },
      {}
    ],
    FUMp: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.CharacterSet = exports.CharacterClassifier = void 0);
        var t = require('./uint.js'),
          e = (function() {
            function e(r) {
              var a = (0, t.toUint8)(r);
              (this._defaultValue = a), (this._asciiMap = e._createAsciiMap(a)), (this._map = new Map());
            }
            return (
              (e._createAsciiMap = function(t) {
                for (var e = new Uint8Array(256), r = 0; r < 256; r++) e[r] = t;
                return e;
              }),
              (e.prototype.set = function(e, r) {
                var a = (0, t.toUint8)(r);
                e >= 0 && e < 256 ? (this._asciiMap[e] = a) : this._map.set(e, a);
              }),
              (e.prototype.get = function(t) {
                return t >= 0 && t < 256 ? this._asciiMap[t] : this._map.get(t) || this._defaultValue;
              }),
              e
            );
          })();
        exports.CharacterClassifier = e;
        var r = (function() {
          function t() {
            this._actual = new e(0);
          }
          return (
            (t.prototype.add = function(t) {
              this._actual.set(t, 1);
            }),
            (t.prototype.has = function(t) {
              return 1 === this._actual.get(t);
            }),
            t
          );
        })();
        exports.CharacterSet = r;
      },
      { './uint.js': 'zRly' }
    ],
    XIPe: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.computeLinks = u),
          (exports.LinkComputer = exports.StateMachine = void 0);
        var e = require('../core/characterClassifier.js'),
          t = require('../core/uint.js'),
          r = (function() {
            function e(e) {
              for (var r = 0, n = 0, a = 0, o = e.length; a < o; a++) {
                var i = e[a],
                  s = i[0];
                (f = i[1]) > r && (r = f), s > n && (n = s), (h = i[2]) > n && (n = h);
              }
              r++, n++;
              var u = new t.Uint8Matrix(n, r, 0);
              for (a = 0, o = e.length; a < o; a++) {
                var c = e[a],
                  f = ((s = c[0]), c[1]),
                  h = c[2];
                u.set(s, f, h);
              }
              (this._states = u), (this._maxCharCode = r);
            }
            return (
              (e.prototype.nextState = function(e, t) {
                return t < 0 || t >= this._maxCharCode ? 0 : this._states.get(e, t);
              }),
              e
            );
          })();
        exports.StateMachine = r;
        var n = null;
        function a() {
          return (
            null === n &&
              (n = new r([
                [1, 104, 2],
                [1, 72, 2],
                [1, 102, 6],
                [1, 70, 6],
                [2, 116, 3],
                [2, 84, 3],
                [3, 116, 4],
                [3, 84, 4],
                [4, 112, 5],
                [4, 80, 5],
                [5, 115, 9],
                [5, 83, 9],
                [5, 58, 10],
                [6, 105, 7],
                [6, 73, 7],
                [7, 108, 8],
                [7, 76, 8],
                [8, 101, 9],
                [8, 69, 9],
                [9, 58, 10],
                [10, 47, 11],
                [11, 47, 12]
              ])),
            n
          );
        }
        var o = null;
        function i() {
          if (null === o) {
            o = new e.CharacterClassifier(0);
            for (var t = 0; t < ' \t<>\'"、。｡､，．：；？！＠＃＄％＆＊‘“〈《「『【〔（［｛｢｣｝］）〕】』」》〉”’｀～…'.length; t++)
              o.set(' \t<>\'"、。｡､，．：；？！＠＃＄％＆＊‘“〈《「『【〔（［｛｢｣｝］）〕】』」》〉”’｀～…'.charCodeAt(t), 1);
            for (t = 0; t < '.,;'.length; t++) o.set('.,;'.charCodeAt(t), 2);
          }
          return o;
        }
        var s = (function() {
          function e() {}
          return (
            (e._createLink = function(e, t, r, n, a) {
              var o = a - 1;
              do {
                var i = t.charCodeAt(o);
                if (2 !== e.get(i)) break;
                o--;
              } while (o > n);
              if (n > 0) {
                var s = t.charCodeAt(n - 1),
                  u = t.charCodeAt(o);
                ((40 === s && 41 === u) || (91 === s && 93 === u) || (123 === s && 125 === u)) && o--;
              }
              return { range: { startLineNumber: r, startColumn: n + 1, endLineNumber: r, endColumn: o + 2 }, url: t.substring(n, o + 1) };
            }),
            (e.computeLinks = function(t, r) {
              void 0 === r && (r = a());
              for (var n = i(), o = [], s = 1, u = t.getLineCount(); s <= u; s++) {
                for (var c = t.getLineContent(s), f = c.length, h = 0, l = 0, v = 0, C = 1, d = !1, k = !1, p = !1; h < f; ) {
                  var g = !1,
                    b = c.charCodeAt(h);
                  if (13 === C) {
                    var L = void 0;
                    switch (b) {
                      case 40:
                        (d = !0), (L = 0);
                        break;
                      case 41:
                        L = d ? 0 : 1;
                        break;
                      case 91:
                        (k = !0), (L = 0);
                        break;
                      case 93:
                        L = k ? 0 : 1;
                        break;
                      case 123:
                        (p = !0), (L = 0);
                        break;
                      case 125:
                        L = p ? 0 : 1;
                        break;
                      case 39:
                        L = 34 === v || 96 === v ? 0 : 1;
                        break;
                      case 34:
                        L = 39 === v || 96 === v ? 0 : 1;
                        break;
                      case 96:
                        L = 39 === v || 34 === v ? 0 : 1;
                        break;
                      default:
                        L = n.get(b);
                    }
                    1 === L && (o.push(e._createLink(n, c, s, l, h)), (g = !0));
                  } else if (12 === C) {
                    L = void 0;
                    91 === b ? ((k = !0), (L = 0)) : (L = n.get(b)), 1 === L ? (g = !0) : (C = 13);
                  } else 0 === (C = r.nextState(C, b)) && (g = !0);
                  g && ((C = 1), (d = !1), (k = !1), (p = !1), (l = h + 1), (v = b)), h++;
                }
                13 === C && o.push(e._createLink(n, c, s, l, f));
              }
              return o;
            }),
            e
          );
        })();
        function u(e) {
          return e && 'function' == typeof e.getLineCount && 'function' == typeof e.getLineContent ? s.computeLinks(e) : [];
        }
        exports.LinkComputer = s;
      },
      { '../core/characterClassifier.js': 'FUMp', '../core/uint.js': 'zRly' }
    ],
    vkZY: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.BasicInplaceReplace = void 0);
        var e = (function() {
          function e() {
            this._defaultValueSet = [
              ['true', 'false'],
              ['True', 'False'],
              ['Private', 'Public', 'Friend', 'ReadOnly', 'Partial', 'Protected', 'WriteOnly'],
              ['public', 'protected', 'private']
            ];
          }
          return (
            (e.prototype.navigateValueSet = function(e, t, a, l, r) {
              var n;
              if (e && t && (n = this.doNavigateValueSet(t, r))) return { range: e, value: n };
              if (a && l && (n = this.doNavigateValueSet(l, r))) return { range: a, value: n };
              return null;
            }),
            (e.prototype.doNavigateValueSet = function(e, t) {
              var a = this.numberReplace(e, t);
              return null !== a ? a : this.textReplace(e, t);
            }),
            (e.prototype.numberReplace = function(e, t) {
              var a = Math.pow(10, e.length - (e.lastIndexOf('.') + 1)),
                l = Number(e),
                r = parseFloat(e);
              return isNaN(l) || isNaN(r) || l !== r ? null : 0 !== l || t ? ((l = Math.floor(l * a)), (l += t ? a : -a), String(l / a)) : null;
            }),
            (e.prototype.textReplace = function(e, t) {
              return this.valueSetsReplace(this._defaultValueSet, e, t);
            }),
            (e.prototype.valueSetsReplace = function(e, t, a) {
              for (var l = null, r = 0, n = e.length; null === l && r < n; r++) l = this.valueSetReplace(e[r], t, a);
              return l;
            }),
            (e.prototype.valueSetReplace = function(e, t, a) {
              var l = e.indexOf(t);
              return l >= 0 ? ((l += a ? 1 : -1) < 0 ? (l = e.length - 1) : (l %= e.length), e[l]) : null;
            }),
            (e.INSTANCE = new e()),
            e
          );
        })();
        exports.BasicInplaceReplace = e;
      },
      {}
    ],
    GIVt: [
      function(require, module, exports) {
        var define;
        var global = arguments[3];
        var e,
          t = arguments[3];
        !(function(t, n) {
          'object' == typeof exports && 'undefined' != typeof module ? n() : 'function' == typeof e && e.amd ? e(n) : n();
        })(0, function() {
          'use strict';
          function e(e) {
            var t = this.constructor;
            return this.then(
              function(n) {
                return t.resolve(e()).then(function() {
                  return n;
                });
              },
              function(n) {
                return t.resolve(e()).then(function() {
                  return t.reject(n);
                });
              }
            );
          }
          var n = setTimeout;
          function o() {}
          function r(e) {
            if (!(this instanceof r)) throw new TypeError('Promises must be constructed via new');
            if ('function' != typeof e) throw new TypeError('not a function');
            (this._state = 0), (this._handled = !1), (this._value = void 0), (this._deferreds = []), s(e, this);
          }
          function i(e, t) {
            for (; 3 === e._state; ) e = e._value;
            0 !== e._state
              ? ((e._handled = !0),
                r._immediateFn(function() {
                  var n = 1 === e._state ? t.onFulfilled : t.onRejected;
                  if (null !== n) {
                    var o;
                    try {
                      o = n(e._value);
                    } catch (r) {
                      return void u(t.promise, r);
                    }
                    f(t.promise, o);
                  } else (1 === e._state ? f : u)(t.promise, e._value);
                }))
              : e._deferreds.push(t);
          }
          function f(e, t) {
            try {
              if (t === e) throw new TypeError('A promise cannot be resolved with itself.');
              if (t && ('object' == typeof t || 'function' == typeof t)) {
                var n = t.then;
                if (t instanceof r) return (e._state = 3), (e._value = t), void c(e);
                if ('function' == typeof n)
                  return void s(
                    ((o = n),
                    (i = t),
                    function() {
                      o.apply(i, arguments);
                    }),
                    e
                  );
              }
              (e._state = 1), (e._value = t), c(e);
            } catch (f) {
              u(e, f);
            }
            var o, i;
          }
          function u(e, t) {
            (e._state = 2), (e._value = t), c(e);
          }
          function c(e) {
            2 === e._state &&
              0 === e._deferreds.length &&
              r._immediateFn(function() {
                e._handled || r._unhandledRejectionFn(e._value);
              });
            for (var t = 0, n = e._deferreds.length; t < n; t++) i(e, e._deferreds[t]);
            e._deferreds = null;
          }
          function a(e, t, n) {
            (this.onFulfilled = 'function' == typeof e ? e : null), (this.onRejected = 'function' == typeof t ? t : null), (this.promise = n);
          }
          function s(e, t) {
            var n = !1;
            try {
              e(
                function(e) {
                  n || ((n = !0), f(t, e));
                },
                function(e) {
                  n || ((n = !0), u(t, e));
                }
              );
            } catch (o) {
              if (n) return;
              (n = !0), u(t, o);
            }
          }
          (r.prototype.catch = function(e) {
            return this.then(null, e);
          }),
            (r.prototype.then = function(e, t) {
              var n = new this.constructor(o);
              return i(this, new a(e, t, n)), n;
            }),
            (r.prototype.finally = e),
            (r.all = function(e) {
              return new r(function(t, n) {
                if (!e || void 0 === e.length) throw new TypeError('Promise.all accepts an array');
                var o = Array.prototype.slice.call(e);
                if (0 === o.length) return t([]);
                var r = o.length;
                function i(e, f) {
                  try {
                    if (f && ('object' == typeof f || 'function' == typeof f)) {
                      var u = f.then;
                      if ('function' == typeof u)
                        return void u.call(
                          f,
                          function(t) {
                            i(e, t);
                          },
                          n
                        );
                    }
                    (o[e] = f), 0 == --r && t(o);
                  } catch (c) {
                    n(c);
                  }
                }
                for (var f = 0; f < o.length; f++) i(f, o[f]);
              });
            }),
            (r.resolve = function(e) {
              return e && 'object' == typeof e && e.constructor === r
                ? e
                : new r(function(t) {
                    t(e);
                  });
            }),
            (r.reject = function(e) {
              return new r(function(t, n) {
                n(e);
              });
            }),
            (r.race = function(e) {
              return new r(function(t, n) {
                for (var o = 0, r = e.length; o < r; o++) e[o].then(t, n);
              });
            }),
            (r._immediateFn =
              ('function' == typeof setImmediate &&
                function(e) {
                  setImmediate(e);
                }) ||
              function(e) {
                n(e, 0);
              }),
            (r._unhandledRejectionFn = function(e) {
              'undefined' != typeof console && console && console.warn('Possible Unhandled Promise Rejection:', e);
            });
          var l = (function() {
            if ('undefined' != typeof self) return self;
            if ('undefined' != typeof window) return window;
            if (void 0 !== t) return t;
            throw new Error('unable to locate global object');
          })();
          'Promise' in l ? l.Promise.prototype.finally || (l.Promise.prototype.finally = e) : (l.Promise = r);
        });
      },
      {}
    ],
    shDG: [
      function(require, module, exports) {
        'use strict';
        function e(e) {
          var t,
            r = this,
            n = !1;
          return function() {
            return n ? t : ((n = !0), (t = e.apply(r, arguments)));
          };
        }
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.once = e);
      },
      {}
    ],
    Xnev: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.LinkedList = void 0);
        var e = require('./iterator.js'),
          t = (function() {
            function e(t) {
              (this.element = t), (this.next = e.Undefined), (this.prev = e.Undefined);
            }
            return (e.Undefined = new e(void 0)), e;
          })(),
          i = (function() {
            function i() {
              (this._first = t.Undefined), (this._last = t.Undefined), (this._size = 0);
            }
            return (
              Object.defineProperty(i.prototype, 'size', {
                get: function() {
                  return this._size;
                },
                enumerable: !0,
                configurable: !0
              }),
              (i.prototype.isEmpty = function() {
                return this._first === t.Undefined;
              }),
              (i.prototype.clear = function() {
                (this._first = t.Undefined), (this._last = t.Undefined), (this._size = 0);
              }),
              (i.prototype.unshift = function(e) {
                return this._insert(e, !1);
              }),
              (i.prototype.push = function(e) {
                return this._insert(e, !0);
              }),
              (i.prototype._insert = function(e, i) {
                var n = this,
                  r = new t(e);
                if (this._first === t.Undefined) (this._first = r), (this._last = r);
                else if (i) {
                  var s = this._last;
                  (this._last = r), (r.prev = s), (s.next = r);
                } else {
                  var f = this._first;
                  (this._first = r), (r.next = f), (f.prev = r);
                }
                this._size += 1;
                var o = !1;
                return function() {
                  o || ((o = !0), n._remove(r));
                };
              }),
              (i.prototype.shift = function() {
                if (this._first !== t.Undefined) {
                  var e = this._first.element;
                  return this._remove(this._first), e;
                }
              }),
              (i.prototype.pop = function() {
                if (this._last !== t.Undefined) {
                  var e = this._last.element;
                  return this._remove(this._last), e;
                }
              }),
              (i.prototype._remove = function(e) {
                if (e.prev !== t.Undefined && e.next !== t.Undefined) {
                  var i = e.prev;
                  (i.next = e.next), (e.next.prev = i);
                } else
                  e.prev === t.Undefined && e.next === t.Undefined
                    ? ((this._first = t.Undefined), (this._last = t.Undefined))
                    : e.next === t.Undefined
                    ? ((this._last = this._last.prev), (this._last.next = t.Undefined))
                    : e.prev === t.Undefined && ((this._first = this._first.next), (this._first.prev = t.Undefined));
                this._size -= 1;
              }),
              (i.prototype.iterator = function() {
                var i,
                  n = this._first;
                return {
                  next: function() {
                    return n === t.Undefined ? e.FIN : (i ? (i.value = n.element) : (i = { done: !1, value: n.element }), (n = n.next), i);
                  }
                };
              }),
              (i.prototype.toArray = function() {
                for (var e = [], i = this._first; i !== t.Undefined; i = i.next) e.push(i.element);
                return e;
              }),
              i
            );
          })();
        exports.LinkedList = i;
      },
      { './iterator.js': 'xnTK' }
    ],
    Qj2A: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.Relay = exports.EventBufferer = exports.EventMultiplexer = exports.PauseableEmitter = exports.Emitter = exports.Event = void 0);
        var e,
          t = require('./errors.js'),
          n = require('./functional.js'),
          i = require('./lifecycle.js'),
          r = require('./linkedList.js'),
          o = (function() {
            var e = function(t, n) {
              return (e =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function(e, t) {
                    e.__proto__ = t;
                  }) ||
                function(e, t) {
                  for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
                })(t, n);
            };
            return function(t, n) {
              function i() {
                this.constructor = t;
              }
              e(t, n), (t.prototype = null === n ? Object.create(n) : ((i.prototype = n.prototype), new i()));
            };
          })();
        (exports.Event = e),
          (function(e) {
            function t(e) {
              return function(t, n, i) {
                void 0 === n && (n = null);
                var r,
                  o = !1;
                return (
                  (r = e(
                    function(e) {
                      if (!o) return r ? r.dispose() : (o = !0), t.call(n, e);
                    },
                    null,
                    i
                  )),
                  o && r.dispose(),
                  r
                );
              };
            }
            function n(e, t) {
              return u(function(n, i, r) {
                return (
                  void 0 === i && (i = null),
                  e(
                    function(e) {
                      return n.call(i, t(e));
                    },
                    null,
                    r
                  )
                );
              });
            }
            function r(e, t) {
              return u(function(n, i, r) {
                return (
                  void 0 === i && (i = null),
                  e(
                    function(e) {
                      t(e), n.call(i, e);
                    },
                    null,
                    r
                  )
                );
              });
            }
            function o(e, t) {
              return u(function(n, i, r) {
                return (
                  void 0 === i && (i = null),
                  e(
                    function(e) {
                      return t(e) && n.call(i, e);
                    },
                    null,
                    r
                  )
                );
              });
            }
            function s(e, t, i) {
              var r = i;
              return n(e, function(e) {
                return (r = t(r, e));
              });
            }
            function u(e) {
              var t,
                n = new c({
                  onFirstListenerAdd: function() {
                    t = e(n.fire, n);
                  },
                  onLastListenerRemove: function() {
                    t.dispose();
                  }
                });
              return n.event;
            }
            function f(e) {
              var t,
                n = !0;
              return o(e, function(e) {
                var i = n || e !== t;
                return (n = !1), (t = e), i;
              });
            }
            (e.None = function() {
              return i.Disposable.None;
            }),
              (e.once = t),
              (e.map = n),
              (e.forEach = r),
              (e.filter = o),
              (e.signal = function(e) {
                return e;
              }),
              (e.any = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                return function(t, n, r) {
                  return (
                    void 0 === n && (n = null),
                    i.combinedDisposable.apply(
                      void 0,
                      e.map(function(e) {
                        return e(
                          function(e) {
                            return t.call(n, e);
                          },
                          null,
                          r
                        );
                      })
                    )
                  );
                };
              }),
              (e.reduce = s),
              (e.snapshot = u),
              (e.debounce = function(e, t, n, i, r) {
                var o;
                void 0 === n && (n = 100), void 0 === i && (i = !1);
                var s = void 0,
                  u = void 0,
                  f = 0,
                  a = new c({
                    leakWarningThreshold: r,
                    onFirstListenerAdd: function() {
                      o = e(function(e) {
                        f++,
                          (s = t(s, e)),
                          i && !u && a.fire(s),
                          clearTimeout(u),
                          (u = setTimeout(function() {
                            var e = s;
                            (s = void 0), (u = void 0), (!i || f > 1) && a.fire(e), (f = 0);
                          }, n));
                      });
                    },
                    onLastListenerRemove: function() {
                      o.dispose();
                    }
                  });
                return a.event;
              }),
              (e.stopwatch = function(e) {
                var i = new Date().getTime();
                return n(t(e), function(e) {
                  return new Date().getTime() - i;
                });
              }),
              (e.latch = f),
              (e.buffer = function(e, t, n) {
                void 0 === t && (t = !1), void 0 === n && (n = []);
                var i = n.slice(),
                  r = e(function(e) {
                    i ? i.push(e) : s.fire(e);
                  }),
                  o = function() {
                    i &&
                      i.forEach(function(e) {
                        return s.fire(e);
                      }),
                      (i = null);
                  },
                  s = new c({
                    onFirstListenerAdd: function() {
                      r ||
                        (r = e(function(e) {
                          return s.fire(e);
                        }));
                    },
                    onFirstListenerDidAdd: function() {
                      i && (t ? setTimeout(o) : o());
                    },
                    onLastListenerRemove: function() {
                      r && r.dispose(), (r = null);
                    }
                  });
                return s.event;
              });
            var a = (function() {
              function e(e) {
                this.event = e;
              }
              return (
                (e.prototype.map = function(t) {
                  return new e(n(this.event, t));
                }),
                (e.prototype.forEach = function(t) {
                  return new e(r(this.event, t));
                }),
                (e.prototype.filter = function(t) {
                  return new e(o(this.event, t));
                }),
                (e.prototype.reduce = function(t, n) {
                  return new e(s(this.event, t, n));
                }),
                (e.prototype.latch = function() {
                  return new e(f(this.event));
                }),
                (e.prototype.on = function(e, t, n) {
                  return this.event(e, t, n);
                }),
                (e.prototype.once = function(e, n, i) {
                  return t(this.event)(e, n, i);
                }),
                e
              );
            })();
            (e.chain = function(e) {
              return new a(e);
            }),
              (e.fromNodeEventEmitter = function(e, t, n) {
                void 0 === n &&
                  (n = function(e) {
                    return e;
                  });
                var i = function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    return r.fire(n.apply(void 0, e));
                  },
                  r = new c({
                    onFirstListenerAdd: function() {
                      return e.on(t, i);
                    },
                    onLastListenerRemove: function() {
                      return e.removeListener(t, i);
                    }
                  });
                return r.event;
              }),
              (e.fromDOMEventEmitter = function(e, t, n) {
                void 0 === n &&
                  (n = function(e) {
                    return e;
                  });
                var i = function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    return r.fire(n.apply(void 0, e));
                  },
                  r = new c({
                    onFirstListenerAdd: function() {
                      return e.addEventListener(t, i);
                    },
                    onLastListenerRemove: function() {
                      return e.removeEventListener(t, i);
                    }
                  });
                return r.event;
              }),
              (e.fromPromise = function(e) {
                var t = new c(),
                  n = !1;
                return (
                  e
                    .then(void 0, function() {
                      return null;
                    })
                    .then(function() {
                      n
                        ? t.fire(void 0)
                        : setTimeout(function() {
                            return t.fire(void 0);
                          }, 0);
                    }),
                  (n = !0),
                  t.event
                );
              }),
              (e.toPromise = function(e) {
                return new Promise(function(n) {
                  return t(e)(n);
                });
              });
          })(e || (exports.Event = e = {}));
        var s = -1,
          u = (function() {
            function e(e, t) {
              void 0 === t &&
                (t = Math.random()
                  .toString(18)
                  .slice(2, 5)),
                (this.customThreshold = e),
                (this.name = t),
                (this._warnCountdown = 0);
            }
            return (
              (e.prototype.dispose = function() {
                this._stacks && this._stacks.clear();
              }),
              (e.prototype.check = function(e) {
                var t = this,
                  n = s;
                if (('number' == typeof this.customThreshold && (n = this.customThreshold), !(n <= 0 || e < n))) {
                  this._stacks || (this._stacks = new Map());
                  var i = new Error().stack
                      .split('\n')
                      .slice(3)
                      .join('\n'),
                    r = this._stacks.get(i) || 0;
                  if ((this._stacks.set(i, r + 1), (this._warnCountdown -= 1), this._warnCountdown <= 0)) {
                    var o;
                    this._warnCountdown = 0.5 * n;
                    var u = 0;
                    this._stacks.forEach(function(e, t) {
                      (!o || u < e) && ((o = t), (u = e));
                    }),
                      console.warn(
                        '[' +
                          this.name +
                          '] potential listener LEAK detected, having ' +
                          e +
                          ' listeners already. MOST frequent listener (' +
                          u +
                          '):'
                      ),
                      console.warn(o);
                  }
                  return function() {
                    var e = t._stacks.get(i) || 0;
                    t._stacks.set(i, e - 1);
                  };
                }
              }),
              e
            );
          })(),
          c = (function() {
            function e(e) {
              (this._disposed = !1),
                (this._options = e),
                (this._leakageMon = s > 0 ? new u(this._options && this._options.leakWarningThreshold) : void 0);
            }
            return (
              Object.defineProperty(e.prototype, 'event', {
                get: function() {
                  var t = this;
                  return (
                    this._event ||
                      (this._event = function(n, o, s) {
                        t._listeners || (t._listeners = new r.LinkedList());
                        var u = t._listeners.isEmpty();
                        u && t._options && t._options.onFirstListenerAdd && t._options.onFirstListenerAdd(t);
                        var c,
                          f,
                          a = t._listeners.push(o ? [n, o] : n);
                        return (
                          u && t._options && t._options.onFirstListenerDidAdd && t._options.onFirstListenerDidAdd(t),
                          t._options && t._options.onListenerDidAdd && t._options.onListenerDidAdd(t, n, o),
                          t._leakageMon && (c = t._leakageMon.check(t._listeners.size)),
                          (f = {
                            dispose: function() {
                              (c && c(), (f.dispose = e._noop), t._disposed) ||
                                (a(),
                                t._options &&
                                  t._options.onLastListenerRemove &&
                                  ((t._listeners && !t._listeners.isEmpty()) || t._options.onLastListenerRemove(t)));
                            }
                          }),
                          s instanceof i.DisposableStore ? s.add(f) : Array.isArray(s) && s.push(f),
                          f
                        );
                      }),
                    this._event
                  );
                },
                enumerable: !0,
                configurable: !0
              }),
              (e.prototype.fire = function(e) {
                if (this._listeners) {
                  this._deliveryQueue || (this._deliveryQueue = new r.LinkedList());
                  for (var n = this._listeners.iterator(), i = n.next(); !i.done; i = n.next()) this._deliveryQueue.push([i.value, e]);
                  for (; this._deliveryQueue.size > 0; ) {
                    var o = this._deliveryQueue.shift(),
                      s = o[0],
                      u = o[1];
                    try {
                      'function' == typeof s ? s.call(void 0, u) : s[0].call(s[1], u);
                    } catch (i) {
                      (0, t.onUnexpectedError)(i);
                    }
                  }
                }
              }),
              (e.prototype.dispose = function() {
                this._listeners && this._listeners.clear(),
                  this._deliveryQueue && this._deliveryQueue.clear(),
                  this._leakageMon && this._leakageMon.dispose(),
                  (this._disposed = !0);
              }),
              (e._noop = function() {}),
              e
            );
          })();
        exports.Emitter = c;
        var f = (function(e) {
          function t(t) {
            var n = e.call(this, t) || this;
            return (n._isPaused = 0), (n._eventQueue = new r.LinkedList()), (n._mergeFn = t && t.merge), n;
          }
          return (
            o(t, e),
            (t.prototype.pause = function() {
              this._isPaused++;
            }),
            (t.prototype.resume = function() {
              if (0 !== this._isPaused && 0 == --this._isPaused)
                if (this._mergeFn) {
                  var t = this._eventQueue.toArray();
                  this._eventQueue.clear(), e.prototype.fire.call(this, this._mergeFn(t));
                } else for (; !this._isPaused && 0 !== this._eventQueue.size; ) e.prototype.fire.call(this, this._eventQueue.shift());
            }),
            (t.prototype.fire = function(t) {
              this._listeners && (0 !== this._isPaused ? this._eventQueue.push(t) : e.prototype.fire.call(this, t));
            }),
            t
          );
        })(c);
        exports.PauseableEmitter = f;
        var a = (function() {
          function e() {
            var e = this;
            (this.hasListeners = !1),
              (this.events = []),
              (this.emitter = new c({
                onFirstListenerAdd: function() {
                  return e.onFirstListenerAdd();
                },
                onLastListenerRemove: function() {
                  return e.onLastListenerRemove();
                }
              }));
          }
          return (
            Object.defineProperty(e.prototype, 'event', {
              get: function() {
                return this.emitter.event;
              },
              enumerable: !0,
              configurable: !0
            }),
            (e.prototype.add = function(e) {
              var t = this,
                r = { event: e, listener: null };
              this.events.push(r), this.hasListeners && this.hook(r);
              return (0, i.toDisposable)(
                (0, n.once)(function() {
                  t.hasListeners && t.unhook(r);
                  var e = t.events.indexOf(r);
                  t.events.splice(e, 1);
                })
              );
            }),
            (e.prototype.onFirstListenerAdd = function() {
              var e = this;
              (this.hasListeners = !0),
                this.events.forEach(function(t) {
                  return e.hook(t);
                });
            }),
            (e.prototype.onLastListenerRemove = function() {
              var e = this;
              (this.hasListeners = !1),
                this.events.forEach(function(t) {
                  return e.unhook(t);
                });
            }),
            (e.prototype.hook = function(e) {
              var t = this;
              e.listener = e.event(function(e) {
                return t.emitter.fire(e);
              });
            }),
            (e.prototype.unhook = function(e) {
              e.listener && e.listener.dispose(), (e.listener = null);
            }),
            (e.prototype.dispose = function() {
              this.emitter.dispose();
            }),
            e
          );
        })();
        exports.EventMultiplexer = a;
        var p = (function() {
          function e() {
            this.buffers = [];
          }
          return (
            (e.prototype.wrapEvent = function(e) {
              var t = this;
              return function(n, i, r) {
                return e(
                  function(e) {
                    var r = t.buffers[t.buffers.length - 1];
                    r
                      ? r.push(function() {
                          return n.call(i, e);
                        })
                      : n.call(i, e);
                  },
                  void 0,
                  r
                );
              };
            }),
            (e.prototype.bufferEvents = function(e) {
              var t = [];
              this.buffers.push(t);
              var n = e();
              return (
                this.buffers.pop(),
                t.forEach(function(e) {
                  return e();
                }),
                n
              );
            }),
            e
          );
        })();
        exports.EventBufferer = p;
        var h = (function() {
          function t() {
            var t = this;
            (this.listening = !1),
              (this.inputEvent = e.None),
              (this.inputEventListener = i.Disposable.None),
              (this.emitter = new c({
                onFirstListenerDidAdd: function() {
                  (t.listening = !0), (t.inputEventListener = t.inputEvent(t.emitter.fire, t.emitter));
                },
                onLastListenerRemove: function() {
                  (t.listening = !1), t.inputEventListener.dispose();
                }
              })),
              (this.event = this.emitter.event);
          }
          return (
            Object.defineProperty(t.prototype, 'input', {
              set: function(e) {
                (this.inputEvent = e),
                  this.listening && (this.inputEventListener.dispose(), (this.inputEventListener = e(this.emitter.fire, this.emitter)));
              },
              enumerable: !0,
              configurable: !0
            }),
            (t.prototype.dispose = function() {
              this.inputEventListener.dispose(), this.emitter.dispose();
            }),
            t
          );
        })();
        exports.Relay = h;
      },
      { './errors.js': 'a30m', './functional.js': 'shDG', './lifecycle.js': 'DRKG', './linkedList.js': 'Xnev' }
    ],
    vZX4: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.CancellationTokenSource = exports.CancellationToken = void 0);
        var e,
          t = require('./event.js'),
          n = Object.freeze(function(e, t) {
            var n = setTimeout(e.bind(t), 0);
            return {
              dispose: function() {
                clearTimeout(n);
              }
            };
          });
        (exports.CancellationToken = e),
          (function(e) {
            (e.isCancellationToken = function(t) {
              return (
                t === e.None ||
                t === e.Cancelled ||
                t instanceof i ||
                (!(!t || 'object' != typeof t) && 'boolean' == typeof t.isCancellationRequested && 'function' == typeof t.onCancellationRequested)
              );
            }),
              (e.None = Object.freeze({ isCancellationRequested: !1, onCancellationRequested: t.Event.None })),
              (e.Cancelled = Object.freeze({ isCancellationRequested: !0, onCancellationRequested: n }));
          })(e || (exports.CancellationToken = e = {}));
        var i = (function() {
            function e() {
              (this._isCancelled = !1), (this._emitter = null);
            }
            return (
              (e.prototype.cancel = function() {
                this._isCancelled || ((this._isCancelled = !0), this._emitter && (this._emitter.fire(void 0), this.dispose()));
              }),
              Object.defineProperty(e.prototype, 'isCancellationRequested', {
                get: function() {
                  return this._isCancelled;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, 'onCancellationRequested', {
                get: function() {
                  return this._isCancelled ? n : (this._emitter || (this._emitter = new t.Emitter()), this._emitter.event);
                },
                enumerable: !0,
                configurable: !0
              }),
              (e.prototype.dispose = function() {
                this._emitter && (this._emitter.dispose(), (this._emitter = null));
              }),
              e
            );
          })(),
          o = (function() {
            function t(e) {
              (this._token = void 0), (this._parentListener = void 0), (this._parentListener = e && e.onCancellationRequested(this.cancel, this));
            }
            return (
              Object.defineProperty(t.prototype, 'token', {
                get: function() {
                  return this._token || (this._token = new i()), this._token;
                },
                enumerable: !0,
                configurable: !0
              }),
              (t.prototype.cancel = function() {
                this._token ? this._token instanceof i && this._token.cancel() : (this._token = e.Cancelled);
              }),
              (t.prototype.dispose = function() {
                this._parentListener && this._parentListener.dispose(),
                  this._token ? this._token instanceof i && this._token.dispose() : (this._token = e.None);
              }),
              t
            );
          })();
        exports.CancellationTokenSource = o;
      },
      { './event.js': 'Qj2A' }
    ],
    sJ0P: [
      function(require, module, exports) {
        var define;
        var e;
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.KeyChord = u),
          (exports.createKeybinding = d),
          (exports.createSimpleKeybinding = a),
          (exports.ResolvedKeybinding = exports.ResolvedKeybindingPart = exports.ChordKeybinding = exports.SimpleKeybinding = exports.KeyCodeUtils = void 0);
        var t,
          r = require('./errors.js'),
          o = (function() {
            function e() {
              (this._keyCodeToStr = []), (this._strToKeyCode = Object.create(null));
            }
            return (
              (e.prototype.define = function(e, t) {
                (this._keyCodeToStr[e] = t), (this._strToKeyCode[t.toLowerCase()] = e);
              }),
              (e.prototype.keyCodeToStr = function(e) {
                return this._keyCodeToStr[e];
              }),
              (e.prototype.strToKeyCode = function(e) {
                return this._strToKeyCode[e.toLowerCase()] || 0;
              }),
              e
            );
          })(),
          n = new o(),
          i = new o(),
          s = new o();
        function u(e, t) {
          return (e | (((65535 & t) << 16) >>> 0)) >>> 0;
        }
        function d(e, t) {
          if (0 === e) return null;
          var r = (65535 & e) >>> 0,
            o = (4294901760 & e) >>> 16;
          return new h(0 !== o ? [a(r, t), a(o, t)] : [a(r, t)]);
        }
        function a(e, t) {
          var r = !!(2048 & e),
            o = !!(256 & e);
          return new y(2 === t ? o : r, !!(1024 & e), !!(512 & e), 2 === t ? r : o, 255 & e);
        }
        !(function() {
          function e(e, t, r, o) {
            void 0 === r && (r = t), void 0 === o && (o = r), n.define(e, t), i.define(e, r), s.define(e, o);
          }
          e(0, 'unknown'),
            e(1, 'Backspace'),
            e(2, 'Tab'),
            e(3, 'Enter'),
            e(4, 'Shift'),
            e(5, 'Ctrl'),
            e(6, 'Alt'),
            e(7, 'PauseBreak'),
            e(8, 'CapsLock'),
            e(9, 'Escape'),
            e(10, 'Space'),
            e(11, 'PageUp'),
            e(12, 'PageDown'),
            e(13, 'End'),
            e(14, 'Home'),
            e(15, 'LeftArrow', 'Left'),
            e(16, 'UpArrow', 'Up'),
            e(17, 'RightArrow', 'Right'),
            e(18, 'DownArrow', 'Down'),
            e(19, 'Insert'),
            e(20, 'Delete'),
            e(21, '0'),
            e(22, '1'),
            e(23, '2'),
            e(24, '3'),
            e(25, '4'),
            e(26, '5'),
            e(27, '6'),
            e(28, '7'),
            e(29, '8'),
            e(30, '9'),
            e(31, 'A'),
            e(32, 'B'),
            e(33, 'C'),
            e(34, 'D'),
            e(35, 'E'),
            e(36, 'F'),
            e(37, 'G'),
            e(38, 'H'),
            e(39, 'I'),
            e(40, 'J'),
            e(41, 'K'),
            e(42, 'L'),
            e(43, 'M'),
            e(44, 'N'),
            e(45, 'O'),
            e(46, 'P'),
            e(47, 'Q'),
            e(48, 'R'),
            e(49, 'S'),
            e(50, 'T'),
            e(51, 'U'),
            e(52, 'V'),
            e(53, 'W'),
            e(54, 'X'),
            e(55, 'Y'),
            e(56, 'Z'),
            e(57, 'Meta'),
            e(58, 'ContextMenu'),
            e(59, 'F1'),
            e(60, 'F2'),
            e(61, 'F3'),
            e(62, 'F4'),
            e(63, 'F5'),
            e(64, 'F6'),
            e(65, 'F7'),
            e(66, 'F8'),
            e(67, 'F9'),
            e(68, 'F10'),
            e(69, 'F11'),
            e(70, 'F12'),
            e(71, 'F13'),
            e(72, 'F14'),
            e(73, 'F15'),
            e(74, 'F16'),
            e(75, 'F17'),
            e(76, 'F18'),
            e(77, 'F19'),
            e(78, 'NumLock'),
            e(79, 'ScrollLock'),
            e(80, ';', ';', 'OEM_1'),
            e(81, '=', '=', 'OEM_PLUS'),
            e(82, ',', ',', 'OEM_COMMA'),
            e(83, '-', '-', 'OEM_MINUS'),
            e(84, '.', '.', 'OEM_PERIOD'),
            e(85, '/', '/', 'OEM_2'),
            e(86, '`', '`', 'OEM_3'),
            e(110, 'ABNT_C1'),
            e(111, 'ABNT_C2'),
            e(87, '[', '[', 'OEM_4'),
            e(88, '\\', '\\', 'OEM_5'),
            e(89, ']', ']', 'OEM_6'),
            e(90, "'", "'", 'OEM_7'),
            e(91, 'OEM_8'),
            e(92, 'OEM_102'),
            e(93, 'NumPad0'),
            e(94, 'NumPad1'),
            e(95, 'NumPad2'),
            e(96, 'NumPad3'),
            e(97, 'NumPad4'),
            e(98, 'NumPad5'),
            e(99, 'NumPad6'),
            e(100, 'NumPad7'),
            e(101, 'NumPad8'),
            e(102, 'NumPad9'),
            e(103, 'NumPad_Multiply'),
            e(104, 'NumPad_Add'),
            e(105, 'NumPad_Separator'),
            e(106, 'NumPad_Subtract'),
            e(107, 'NumPad_Decimal'),
            e(108, 'NumPad_Divide');
        })(),
          (exports.KeyCodeUtils = t),
          (function(e) {
            (e.toString = function(e) {
              return n.keyCodeToStr(e);
            }),
              (e.fromString = function(e) {
                return n.strToKeyCode(e);
              }),
              (e.toUserSettingsUS = function(e) {
                return i.keyCodeToStr(e);
              }),
              (e.toUserSettingsGeneral = function(e) {
                return s.keyCodeToStr(e);
              }),
              (e.fromUserSettings = function(e) {
                return i.strToKeyCode(e) || s.strToKeyCode(e);
              });
          })(t || (exports.KeyCodeUtils = t = {}));
        var y = (function() {
          function e(e, t, r, o, n) {
            (this.ctrlKey = e), (this.shiftKey = t), (this.altKey = r), (this.metaKey = o), (this.keyCode = n);
          }
          return (
            (e.prototype.equals = function(e) {
              return (
                this.ctrlKey === e.ctrlKey &&
                this.shiftKey === e.shiftKey &&
                this.altKey === e.altKey &&
                this.metaKey === e.metaKey &&
                this.keyCode === e.keyCode
              );
            }),
            (e.prototype.isModifierKey = function() {
              return 0 === this.keyCode || 5 === this.keyCode || 57 === this.keyCode || 6 === this.keyCode || 4 === this.keyCode;
            }),
            (e.prototype.toChord = function() {
              return new h([this]);
            }),
            (e.prototype.isDuplicateModifierCase = function() {
              return (
                (this.ctrlKey && 5 === this.keyCode) ||
                (this.shiftKey && 4 === this.keyCode) ||
                (this.altKey && 6 === this.keyCode) ||
                (this.metaKey && 57 === this.keyCode)
              );
            }),
            e
          );
        })();
        exports.SimpleKeybinding = y;
        var h = (function() {
          function e(e) {
            if (0 === e.length) throw (0, r.illegalArgument)('parts');
            this.parts = e;
          }
          return (
            (e.prototype.equals = function(e) {
              if (null === e) return !1;
              if (this.parts.length !== e.parts.length) return !1;
              for (var t = 0; t < this.parts.length; t++) if (!this.parts[t].equals(e.parts[t])) return !1;
              return !0;
            }),
            e
          );
        })();
        exports.ChordKeybinding = h;
        var f = (function() {
          return function(e, t, r, o, n, i) {
            (this.ctrlKey = e), (this.shiftKey = t), (this.altKey = r), (this.metaKey = o), (this.keyLabel = n), (this.keyAriaLabel = i);
          };
        })();
        exports.ResolvedKeybindingPart = f;
        var p = (function() {
          return function() {};
        })();
        exports.ResolvedKeybinding = p;
      },
      { './errors.js': 'a30m' }
    ],
    t33O: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.Selection = void 0);
        var t = require('./position.js'),
          n = require('./range.js'),
          e = (function() {
            var t = function(n, e) {
              return (t =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function(t, n) {
                    t.__proto__ = n;
                  }) ||
                function(t, n) {
                  for (var e in n) n.hasOwnProperty(e) && (t[e] = n[e]);
                })(n, e);
            };
            return function(n, e) {
              function i() {
                this.constructor = n;
              }
              t(n, e), (n.prototype = null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()));
            };
          })(),
          i = (function(n) {
            function i(t, e, i, o) {
              var r = n.call(this, t, e, i, o) || this;
              return (r.selectionStartLineNumber = t), (r.selectionStartColumn = e), (r.positionLineNumber = i), (r.positionColumn = o), r;
            }
            return (
              e(i, n),
              (i.prototype.clone = function() {
                return new i(this.selectionStartLineNumber, this.selectionStartColumn, this.positionLineNumber, this.positionColumn);
              }),
              (i.prototype.toString = function() {
                return (
                  '[' +
                  this.selectionStartLineNumber +
                  ',' +
                  this.selectionStartColumn +
                  ' -> ' +
                  this.positionLineNumber +
                  ',' +
                  this.positionColumn +
                  ']'
                );
              }),
              (i.prototype.equalsSelection = function(t) {
                return i.selectionsEqual(this, t);
              }),
              (i.selectionsEqual = function(t, n) {
                return (
                  t.selectionStartLineNumber === n.selectionStartLineNumber &&
                  t.selectionStartColumn === n.selectionStartColumn &&
                  t.positionLineNumber === n.positionLineNumber &&
                  t.positionColumn === n.positionColumn
                );
              }),
              (i.prototype.getDirection = function() {
                return this.selectionStartLineNumber === this.startLineNumber && this.selectionStartColumn === this.startColumn ? 0 : 1;
              }),
              (i.prototype.setEndPosition = function(t, n) {
                return 0 === this.getDirection()
                  ? new i(this.startLineNumber, this.startColumn, t, n)
                  : new i(t, n, this.startLineNumber, this.startColumn);
              }),
              (i.prototype.getPosition = function() {
                return new t.Position(this.positionLineNumber, this.positionColumn);
              }),
              (i.prototype.setStartPosition = function(t, n) {
                return 0 === this.getDirection() ? new i(t, n, this.endLineNumber, this.endColumn) : new i(this.endLineNumber, this.endColumn, t, n);
              }),
              (i.fromPositions = function(t, n) {
                return void 0 === n && (n = t), new i(t.lineNumber, t.column, n.lineNumber, n.column);
              }),
              (i.liftSelection = function(t) {
                return new i(t.selectionStartLineNumber, t.selectionStartColumn, t.positionLineNumber, t.positionColumn);
              }),
              (i.selectionsArrEqual = function(t, n) {
                if ((t && !n) || (!t && n)) return !1;
                if (!t && !n) return !0;
                if (t.length !== n.length) return !1;
                for (var e = 0, i = t.length; e < i; e++) if (!this.selectionsEqual(t[e], n[e])) return !1;
                return !0;
              }),
              (i.isISelection = function(t) {
                return (
                  t &&
                  'number' == typeof t.selectionStartLineNumber &&
                  'number' == typeof t.selectionStartColumn &&
                  'number' == typeof t.positionLineNumber &&
                  'number' == typeof t.positionColumn
                );
              }),
              (i.createWithDirection = function(t, n, e, o, r) {
                return 0 === r ? new i(t, n, e, o) : new i(e, o, t, n);
              }),
              i
            );
          })(n.Range);
        exports.Selection = i;
      },
      { './position.js': 'E9Bb', './range.js': 'IT6S' }
    ],
    CifP: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.TokenizationResult2 = exports.TokenizationResult = exports.Token = void 0);
        var t = (function() {
          function t(t, e, n) {
            (this.offset = 0 | t), (this.type = e), (this.language = n);
          }
          return (
            (t.prototype.toString = function() {
              return '(' + this.offset + ', ' + this.type + ')';
            }),
            t
          );
        })();
        exports.Token = t;
        var e = (function() {
          return function(t, e) {
            (this.tokens = t), (this.endState = e);
          };
        })();
        exports.TokenizationResult = e;
        var n = (function() {
          return function(t, e) {
            (this.tokens = t), (this.endState = e);
          };
        })();
        exports.TokenizationResult2 = n;
      },
      {}
    ],
    H2Ah: [
      function(require, module, exports) {
        'use strict';
        var e, t, n, r, o, i, E, s, _, p, a, T, l, c, d, C, S, u, A, x, K, N, O, U, R, I, M, g, P, m;
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.SymbolTag = exports.SymbolKind = exports.DocumentHighlightKind = exports.SignatureHelpTriggerKind = exports.CompletionTriggerKind = exports.CompletionItemInsertTextRule = exports.CompletionItemTag = exports.CompletionItemKind = exports.IndentAction = exports.MouseTargetType = exports.OverlayWidgetPositionPreference = exports.ContentWidgetPositionPreference = exports.RenderLineNumbersType = exports.TextEditorCursorStyle = exports.TextEditorCursorBlinkingStyle = exports.WrappingIndent = exports.RenderMinimap = exports.CursorChangeReason = exports.ScrollType = exports.TrackedRangeStickiness = exports.EndOfLineSequence = exports.DefaultEndOfLine = exports.EndOfLinePreference = exports.MinimapPosition = exports.OverviewRulerLane = exports.ScrollbarVisibility = exports.SelectionDirection = exports.KeyCode = exports.MarkerSeverity = exports.MarkerTag = void 0),
          (exports.MarkerTag = e),
          (function(e) {
            (e[(e.Unnecessary = 1)] = 'Unnecessary'), (e[(e.Deprecated = 2)] = 'Deprecated');
          })(e || (exports.MarkerTag = e = {})),
          (exports.MarkerSeverity = t),
          (function(e) {
            (e[(e.Hint = 1)] = 'Hint'), (e[(e.Info = 2)] = 'Info'), (e[(e.Warning = 4)] = 'Warning'), (e[(e.Error = 8)] = 'Error');
          })(t || (exports.MarkerSeverity = t = {})),
          (exports.KeyCode = n),
          (function(e) {
            (e[(e.Unknown = 0)] = 'Unknown'),
              (e[(e.Backspace = 1)] = 'Backspace'),
              (e[(e.Tab = 2)] = 'Tab'),
              (e[(e.Enter = 3)] = 'Enter'),
              (e[(e.Shift = 4)] = 'Shift'),
              (e[(e.Ctrl = 5)] = 'Ctrl'),
              (e[(e.Alt = 6)] = 'Alt'),
              (e[(e.PauseBreak = 7)] = 'PauseBreak'),
              (e[(e.CapsLock = 8)] = 'CapsLock'),
              (e[(e.Escape = 9)] = 'Escape'),
              (e[(e.Space = 10)] = 'Space'),
              (e[(e.PageUp = 11)] = 'PageUp'),
              (e[(e.PageDown = 12)] = 'PageDown'),
              (e[(e.End = 13)] = 'End'),
              (e[(e.Home = 14)] = 'Home'),
              (e[(e.LeftArrow = 15)] = 'LeftArrow'),
              (e[(e.UpArrow = 16)] = 'UpArrow'),
              (e[(e.RightArrow = 17)] = 'RightArrow'),
              (e[(e.DownArrow = 18)] = 'DownArrow'),
              (e[(e.Insert = 19)] = 'Insert'),
              (e[(e.Delete = 20)] = 'Delete'),
              (e[(e.KEY_0 = 21)] = 'KEY_0'),
              (e[(e.KEY_1 = 22)] = 'KEY_1'),
              (e[(e.KEY_2 = 23)] = 'KEY_2'),
              (e[(e.KEY_3 = 24)] = 'KEY_3'),
              (e[(e.KEY_4 = 25)] = 'KEY_4'),
              (e[(e.KEY_5 = 26)] = 'KEY_5'),
              (e[(e.KEY_6 = 27)] = 'KEY_6'),
              (e[(e.KEY_7 = 28)] = 'KEY_7'),
              (e[(e.KEY_8 = 29)] = 'KEY_8'),
              (e[(e.KEY_9 = 30)] = 'KEY_9'),
              (e[(e.KEY_A = 31)] = 'KEY_A'),
              (e[(e.KEY_B = 32)] = 'KEY_B'),
              (e[(e.KEY_C = 33)] = 'KEY_C'),
              (e[(e.KEY_D = 34)] = 'KEY_D'),
              (e[(e.KEY_E = 35)] = 'KEY_E'),
              (e[(e.KEY_F = 36)] = 'KEY_F'),
              (e[(e.KEY_G = 37)] = 'KEY_G'),
              (e[(e.KEY_H = 38)] = 'KEY_H'),
              (e[(e.KEY_I = 39)] = 'KEY_I'),
              (e[(e.KEY_J = 40)] = 'KEY_J'),
              (e[(e.KEY_K = 41)] = 'KEY_K'),
              (e[(e.KEY_L = 42)] = 'KEY_L'),
              (e[(e.KEY_M = 43)] = 'KEY_M'),
              (e[(e.KEY_N = 44)] = 'KEY_N'),
              (e[(e.KEY_O = 45)] = 'KEY_O'),
              (e[(e.KEY_P = 46)] = 'KEY_P'),
              (e[(e.KEY_Q = 47)] = 'KEY_Q'),
              (e[(e.KEY_R = 48)] = 'KEY_R'),
              (e[(e.KEY_S = 49)] = 'KEY_S'),
              (e[(e.KEY_T = 50)] = 'KEY_T'),
              (e[(e.KEY_U = 51)] = 'KEY_U'),
              (e[(e.KEY_V = 52)] = 'KEY_V'),
              (e[(e.KEY_W = 53)] = 'KEY_W'),
              (e[(e.KEY_X = 54)] = 'KEY_X'),
              (e[(e.KEY_Y = 55)] = 'KEY_Y'),
              (e[(e.KEY_Z = 56)] = 'KEY_Z'),
              (e[(e.Meta = 57)] = 'Meta'),
              (e[(e.ContextMenu = 58)] = 'ContextMenu'),
              (e[(e.F1 = 59)] = 'F1'),
              (e[(e.F2 = 60)] = 'F2'),
              (e[(e.F3 = 61)] = 'F3'),
              (e[(e.F4 = 62)] = 'F4'),
              (e[(e.F5 = 63)] = 'F5'),
              (e[(e.F6 = 64)] = 'F6'),
              (e[(e.F7 = 65)] = 'F7'),
              (e[(e.F8 = 66)] = 'F8'),
              (e[(e.F9 = 67)] = 'F9'),
              (e[(e.F10 = 68)] = 'F10'),
              (e[(e.F11 = 69)] = 'F11'),
              (e[(e.F12 = 70)] = 'F12'),
              (e[(e.F13 = 71)] = 'F13'),
              (e[(e.F14 = 72)] = 'F14'),
              (e[(e.F15 = 73)] = 'F15'),
              (e[(e.F16 = 74)] = 'F16'),
              (e[(e.F17 = 75)] = 'F17'),
              (e[(e.F18 = 76)] = 'F18'),
              (e[(e.F19 = 77)] = 'F19'),
              (e[(e.NumLock = 78)] = 'NumLock'),
              (e[(e.ScrollLock = 79)] = 'ScrollLock'),
              (e[(e.US_SEMICOLON = 80)] = 'US_SEMICOLON'),
              (e[(e.US_EQUAL = 81)] = 'US_EQUAL'),
              (e[(e.US_COMMA = 82)] = 'US_COMMA'),
              (e[(e.US_MINUS = 83)] = 'US_MINUS'),
              (e[(e.US_DOT = 84)] = 'US_DOT'),
              (e[(e.US_SLASH = 85)] = 'US_SLASH'),
              (e[(e.US_BACKTICK = 86)] = 'US_BACKTICK'),
              (e[(e.US_OPEN_SQUARE_BRACKET = 87)] = 'US_OPEN_SQUARE_BRACKET'),
              (e[(e.US_BACKSLASH = 88)] = 'US_BACKSLASH'),
              (e[(e.US_CLOSE_SQUARE_BRACKET = 89)] = 'US_CLOSE_SQUARE_BRACKET'),
              (e[(e.US_QUOTE = 90)] = 'US_QUOTE'),
              (e[(e.OEM_8 = 91)] = 'OEM_8'),
              (e[(e.OEM_102 = 92)] = 'OEM_102'),
              (e[(e.NUMPAD_0 = 93)] = 'NUMPAD_0'),
              (e[(e.NUMPAD_1 = 94)] = 'NUMPAD_1'),
              (e[(e.NUMPAD_2 = 95)] = 'NUMPAD_2'),
              (e[(e.NUMPAD_3 = 96)] = 'NUMPAD_3'),
              (e[(e.NUMPAD_4 = 97)] = 'NUMPAD_4'),
              (e[(e.NUMPAD_5 = 98)] = 'NUMPAD_5'),
              (e[(e.NUMPAD_6 = 99)] = 'NUMPAD_6'),
              (e[(e.NUMPAD_7 = 100)] = 'NUMPAD_7'),
              (e[(e.NUMPAD_8 = 101)] = 'NUMPAD_8'),
              (e[(e.NUMPAD_9 = 102)] = 'NUMPAD_9'),
              (e[(e.NUMPAD_MULTIPLY = 103)] = 'NUMPAD_MULTIPLY'),
              (e[(e.NUMPAD_ADD = 104)] = 'NUMPAD_ADD'),
              (e[(e.NUMPAD_SEPARATOR = 105)] = 'NUMPAD_SEPARATOR'),
              (e[(e.NUMPAD_SUBTRACT = 106)] = 'NUMPAD_SUBTRACT'),
              (e[(e.NUMPAD_DECIMAL = 107)] = 'NUMPAD_DECIMAL'),
              (e[(e.NUMPAD_DIVIDE = 108)] = 'NUMPAD_DIVIDE'),
              (e[(e.KEY_IN_COMPOSITION = 109)] = 'KEY_IN_COMPOSITION'),
              (e[(e.ABNT_C1 = 110)] = 'ABNT_C1'),
              (e[(e.ABNT_C2 = 111)] = 'ABNT_C2'),
              (e[(e.MAX_VALUE = 112)] = 'MAX_VALUE');
          })(n || (exports.KeyCode = n = {})),
          (exports.SelectionDirection = r),
          (function(e) {
            (e[(e.LTR = 0)] = 'LTR'), (e[(e.RTL = 1)] = 'RTL');
          })(r || (exports.SelectionDirection = r = {})),
          (exports.ScrollbarVisibility = o),
          (function(e) {
            (e[(e.Auto = 1)] = 'Auto'), (e[(e.Hidden = 2)] = 'Hidden'), (e[(e.Visible = 3)] = 'Visible');
          })(o || (exports.ScrollbarVisibility = o = {})),
          (exports.OverviewRulerLane = i),
          (function(e) {
            (e[(e.Left = 1)] = 'Left'), (e[(e.Center = 2)] = 'Center'), (e[(e.Right = 4)] = 'Right'), (e[(e.Full = 7)] = 'Full');
          })(i || (exports.OverviewRulerLane = i = {})),
          (exports.MinimapPosition = E),
          (function(e) {
            e[(e.Inline = 1)] = 'Inline';
          })(E || (exports.MinimapPosition = E = {})),
          (exports.EndOfLinePreference = s),
          (function(e) {
            (e[(e.TextDefined = 0)] = 'TextDefined'), (e[(e.LF = 1)] = 'LF'), (e[(e.CRLF = 2)] = 'CRLF');
          })(s || (exports.EndOfLinePreference = s = {})),
          (exports.DefaultEndOfLine = _),
          (function(e) {
            (e[(e.LF = 1)] = 'LF'), (e[(e.CRLF = 2)] = 'CRLF');
          })(_ || (exports.DefaultEndOfLine = _ = {})),
          (exports.EndOfLineSequence = p),
          (function(e) {
            (e[(e.LF = 0)] = 'LF'), (e[(e.CRLF = 1)] = 'CRLF');
          })(p || (exports.EndOfLineSequence = p = {})),
          (exports.TrackedRangeStickiness = a),
          (function(e) {
            (e[(e.AlwaysGrowsWhenTypingAtEdges = 0)] = 'AlwaysGrowsWhenTypingAtEdges'),
              (e[(e.NeverGrowsWhenTypingAtEdges = 1)] = 'NeverGrowsWhenTypingAtEdges'),
              (e[(e.GrowsOnlyWhenTypingBefore = 2)] = 'GrowsOnlyWhenTypingBefore'),
              (e[(e.GrowsOnlyWhenTypingAfter = 3)] = 'GrowsOnlyWhenTypingAfter');
          })(a || (exports.TrackedRangeStickiness = a = {})),
          (exports.ScrollType = T),
          (function(e) {
            (e[(e.Smooth = 0)] = 'Smooth'), (e[(e.Immediate = 1)] = 'Immediate');
          })(T || (exports.ScrollType = T = {})),
          (exports.CursorChangeReason = l),
          (function(e) {
            (e[(e.NotSet = 0)] = 'NotSet'),
              (e[(e.ContentFlush = 1)] = 'ContentFlush'),
              (e[(e.RecoverFromMarkers = 2)] = 'RecoverFromMarkers'),
              (e[(e.Explicit = 3)] = 'Explicit'),
              (e[(e.Paste = 4)] = 'Paste'),
              (e[(e.Undo = 5)] = 'Undo'),
              (e[(e.Redo = 6)] = 'Redo');
          })(l || (exports.CursorChangeReason = l = {})),
          (exports.RenderMinimap = c),
          (function(e) {
            (e[(e.None = 0)] = 'None'),
              (e[(e.Small = 1)] = 'Small'),
              (e[(e.Large = 2)] = 'Large'),
              (e[(e.SmallBlocks = 3)] = 'SmallBlocks'),
              (e[(e.LargeBlocks = 4)] = 'LargeBlocks');
          })(c || (exports.RenderMinimap = c = {})),
          (exports.WrappingIndent = d),
          (function(e) {
            (e[(e.None = 0)] = 'None'), (e[(e.Same = 1)] = 'Same'), (e[(e.Indent = 2)] = 'Indent'), (e[(e.DeepIndent = 3)] = 'DeepIndent');
          })(d || (exports.WrappingIndent = d = {})),
          (exports.TextEditorCursorBlinkingStyle = C),
          (function(e) {
            (e[(e.Hidden = 0)] = 'Hidden'),
              (e[(e.Blink = 1)] = 'Blink'),
              (e[(e.Smooth = 2)] = 'Smooth'),
              (e[(e.Phase = 3)] = 'Phase'),
              (e[(e.Expand = 4)] = 'Expand'),
              (e[(e.Solid = 5)] = 'Solid');
          })(C || (exports.TextEditorCursorBlinkingStyle = C = {})),
          (exports.TextEditorCursorStyle = S),
          (function(e) {
            (e[(e.Line = 1)] = 'Line'),
              (e[(e.Block = 2)] = 'Block'),
              (e[(e.Underline = 3)] = 'Underline'),
              (e[(e.LineThin = 4)] = 'LineThin'),
              (e[(e.BlockOutline = 5)] = 'BlockOutline'),
              (e[(e.UnderlineThin = 6)] = 'UnderlineThin');
          })(S || (exports.TextEditorCursorStyle = S = {})),
          (exports.RenderLineNumbersType = u),
          (function(e) {
            (e[(e.Off = 0)] = 'Off'),
              (e[(e.On = 1)] = 'On'),
              (e[(e.Relative = 2)] = 'Relative'),
              (e[(e.Interval = 3)] = 'Interval'),
              (e[(e.Custom = 4)] = 'Custom');
          })(u || (exports.RenderLineNumbersType = u = {})),
          (exports.ContentWidgetPositionPreference = A),
          (function(e) {
            (e[(e.EXACT = 0)] = 'EXACT'), (e[(e.ABOVE = 1)] = 'ABOVE'), (e[(e.BELOW = 2)] = 'BELOW');
          })(A || (exports.ContentWidgetPositionPreference = A = {})),
          (exports.OverlayWidgetPositionPreference = x),
          (function(e) {
            (e[(e.TOP_RIGHT_CORNER = 0)] = 'TOP_RIGHT_CORNER'),
              (e[(e.BOTTOM_RIGHT_CORNER = 1)] = 'BOTTOM_RIGHT_CORNER'),
              (e[(e.TOP_CENTER = 2)] = 'TOP_CENTER');
          })(x || (exports.OverlayWidgetPositionPreference = x = {})),
          (exports.MouseTargetType = K),
          (function(e) {
            (e[(e.UNKNOWN = 0)] = 'UNKNOWN'),
              (e[(e.TEXTAREA = 1)] = 'TEXTAREA'),
              (e[(e.GUTTER_GLYPH_MARGIN = 2)] = 'GUTTER_GLYPH_MARGIN'),
              (e[(e.GUTTER_LINE_NUMBERS = 3)] = 'GUTTER_LINE_NUMBERS'),
              (e[(e.GUTTER_LINE_DECORATIONS = 4)] = 'GUTTER_LINE_DECORATIONS'),
              (e[(e.GUTTER_VIEW_ZONE = 5)] = 'GUTTER_VIEW_ZONE'),
              (e[(e.CONTENT_TEXT = 6)] = 'CONTENT_TEXT'),
              (e[(e.CONTENT_EMPTY = 7)] = 'CONTENT_EMPTY'),
              (e[(e.CONTENT_VIEW_ZONE = 8)] = 'CONTENT_VIEW_ZONE'),
              (e[(e.CONTENT_WIDGET = 9)] = 'CONTENT_WIDGET'),
              (e[(e.OVERVIEW_RULER = 10)] = 'OVERVIEW_RULER'),
              (e[(e.SCROLLBAR = 11)] = 'SCROLLBAR'),
              (e[(e.OVERLAY_WIDGET = 12)] = 'OVERLAY_WIDGET'),
              (e[(e.OUTSIDE_EDITOR = 13)] = 'OUTSIDE_EDITOR');
          })(K || (exports.MouseTargetType = K = {})),
          (exports.IndentAction = N),
          (function(e) {
            (e[(e.None = 0)] = 'None'),
              (e[(e.Indent = 1)] = 'Indent'),
              (e[(e.IndentOutdent = 2)] = 'IndentOutdent'),
              (e[(e.Outdent = 3)] = 'Outdent');
          })(N || (exports.IndentAction = N = {})),
          (exports.CompletionItemKind = O),
          (function(e) {
            (e[(e.Method = 0)] = 'Method'),
              (e[(e.Function = 1)] = 'Function'),
              (e[(e.Constructor = 2)] = 'Constructor'),
              (e[(e.Field = 3)] = 'Field'),
              (e[(e.Variable = 4)] = 'Variable'),
              (e[(e.Class = 5)] = 'Class'),
              (e[(e.Struct = 6)] = 'Struct'),
              (e[(e.Interface = 7)] = 'Interface'),
              (e[(e.Module = 8)] = 'Module'),
              (e[(e.Property = 9)] = 'Property'),
              (e[(e.Event = 10)] = 'Event'),
              (e[(e.Operator = 11)] = 'Operator'),
              (e[(e.Unit = 12)] = 'Unit'),
              (e[(e.Value = 13)] = 'Value'),
              (e[(e.Constant = 14)] = 'Constant'),
              (e[(e.Enum = 15)] = 'Enum'),
              (e[(e.EnumMember = 16)] = 'EnumMember'),
              (e[(e.Keyword = 17)] = 'Keyword'),
              (e[(e.Text = 18)] = 'Text'),
              (e[(e.Color = 19)] = 'Color'),
              (e[(e.File = 20)] = 'File'),
              (e[(e.Reference = 21)] = 'Reference'),
              (e[(e.Customcolor = 22)] = 'Customcolor'),
              (e[(e.Folder = 23)] = 'Folder'),
              (e[(e.TypeParameter = 24)] = 'TypeParameter'),
              (e[(e.Snippet = 25)] = 'Snippet');
          })(O || (exports.CompletionItemKind = O = {})),
          (exports.CompletionItemTag = U),
          (function(e) {
            e[(e.Deprecated = 1)] = 'Deprecated';
          })(U || (exports.CompletionItemTag = U = {})),
          (exports.CompletionItemInsertTextRule = R),
          (function(e) {
            (e[(e.KeepWhitespace = 1)] = 'KeepWhitespace'), (e[(e.InsertAsSnippet = 4)] = 'InsertAsSnippet');
          })(R || (exports.CompletionItemInsertTextRule = R = {})),
          (exports.CompletionTriggerKind = I),
          (function(e) {
            (e[(e.Invoke = 0)] = 'Invoke'),
              (e[(e.TriggerCharacter = 1)] = 'TriggerCharacter'),
              (e[(e.TriggerForIncompleteCompletions = 2)] = 'TriggerForIncompleteCompletions');
          })(I || (exports.CompletionTriggerKind = I = {})),
          (exports.SignatureHelpTriggerKind = M),
          (function(e) {
            (e[(e.Invoke = 1)] = 'Invoke'), (e[(e.TriggerCharacter = 2)] = 'TriggerCharacter'), (e[(e.ContentChange = 3)] = 'ContentChange');
          })(M || (exports.SignatureHelpTriggerKind = M = {})),
          (exports.DocumentHighlightKind = g),
          (function(e) {
            (e[(e.Text = 0)] = 'Text'), (e[(e.Read = 1)] = 'Read'), (e[(e.Write = 2)] = 'Write');
          })(g || (exports.DocumentHighlightKind = g = {})),
          (exports.SymbolKind = P),
          (function(e) {
            (e[(e.File = 0)] = 'File'),
              (e[(e.Module = 1)] = 'Module'),
              (e[(e.Namespace = 2)] = 'Namespace'),
              (e[(e.Package = 3)] = 'Package'),
              (e[(e.Class = 4)] = 'Class'),
              (e[(e.Method = 5)] = 'Method'),
              (e[(e.Property = 6)] = 'Property'),
              (e[(e.Field = 7)] = 'Field'),
              (e[(e.Constructor = 8)] = 'Constructor'),
              (e[(e.Enum = 9)] = 'Enum'),
              (e[(e.Interface = 10)] = 'Interface'),
              (e[(e.Function = 11)] = 'Function'),
              (e[(e.Variable = 12)] = 'Variable'),
              (e[(e.Constant = 13)] = 'Constant'),
              (e[(e.String = 14)] = 'String'),
              (e[(e.Number = 15)] = 'Number'),
              (e[(e.Boolean = 16)] = 'Boolean'),
              (e[(e.Array = 17)] = 'Array'),
              (e[(e.Object = 18)] = 'Object'),
              (e[(e.Key = 19)] = 'Key'),
              (e[(e.Null = 20)] = 'Null'),
              (e[(e.EnumMember = 21)] = 'EnumMember'),
              (e[(e.Struct = 22)] = 'Struct'),
              (e[(e.Event = 23)] = 'Event'),
              (e[(e.Operator = 24)] = 'Operator'),
              (e[(e.TypeParameter = 25)] = 'TypeParameter');
          })(P || (exports.SymbolKind = P = {})),
          (exports.SymbolTag = m),
          (function(e) {
            e[(e.Deprecated = 1)] = 'Deprecated';
          })(m || (exports.SymbolTag = m = {}));
      },
      {}
    ],
    vf9U: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.createMonacoBaseAPI = p),
          (exports.KeyMod = void 0),
          require('./promise-polyfill/polyfill.js');
        var e = require('../../../base/common/cancellation.js'),
          r = require('../../../base/common/event.js'),
          o = require('../../../base/common/keyCodes.js'),
          t = require('../../../base/common/uri.js'),
          n = require('../core/position.js'),
          i = require('../core/range.js'),
          a = require('../core/selection.js'),
          c = require('../core/token.js'),
          u = l(require('./standaloneEnums.js'));
        function s() {
          if ('function' != typeof WeakMap) return null;
          var e = new WeakMap();
          return (
            (s = function() {
              return e;
            }),
            e
          );
        }
        function l(e) {
          if (e && e.__esModule) return e;
          var r = s();
          if (r && r.has(e)) return r.get(e);
          var o = {};
          if (null != e) {
            var t = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var n in e)
              if (Object.prototype.hasOwnProperty.call(e, n)) {
                var i = t ? Object.getOwnPropertyDescriptor(e, n) : null;
                i && (i.get || i.set) ? Object.defineProperty(o, n, i) : (o[n] = e[n]);
              }
          }
          return (o.default = e), r && r.set(e, o), o;
        }
        var f = (function() {
          function e() {}
          return (
            (e.chord = function(e, r) {
              return (0, o.KeyChord)(e, r);
            }),
            (e.CtrlCmd = 2048),
            (e.Shift = 1024),
            (e.Alt = 512),
            (e.WinCtrl = 256),
            e
          );
        })();
        function p() {
          return {
            editor: void 0,
            languages: void 0,
            CancellationTokenSource: e.CancellationTokenSource,
            Emitter: r.Emitter,
            KeyCode: u.KeyCode,
            KeyMod: f,
            Position: n.Position,
            Range: i.Range,
            Selection: a.Selection,
            SelectionDirection: u.SelectionDirection,
            MarkerSeverity: u.MarkerSeverity,
            MarkerTag: u.MarkerTag,
            Uri: t.URI,
            Token: c.Token
          };
        }
        exports.KeyMod = f;
      },
      {
        './promise-polyfill/polyfill.js': 'GIVt',
        '../../../base/common/cancellation.js': 'vZX4',
        '../../../base/common/event.js': 'Qj2A',
        '../../../base/common/keyCodes.js': 'sJ0P',
        '../../../base/common/uri.js': 'z9aY',
        '../core/position.js': 'E9Bb',
        '../core/range.js': 'IT6S',
        '../core/selection.js': 't33O',
        '../core/token.js': 'CifP',
        './standaloneEnums.js': 'H2Ah'
      }
    ],
    i0Ia: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.create = v), (exports.EditorSimpleWorker = void 0);
        var e = require('../../../base/common/arrays.js'),
          t = require('../../../base/common/diff/diff.js'),
          r = require('../../../base/common/iterator.js'),
          n = require('../../../base/common/platform.js'),
          o = require('../../../base/common/uri.js'),
          i = require('../core/position.js'),
          u = require('../core/range.js'),
          s = require('../diff/diffComputer.js'),
          l = require('../model/mirrorTextModel.js'),
          a = require('../model/wordHelper.js'),
          m = require('../modes/linkComputer.js'),
          d = require('../modes/supports/inplaceReplaceSupport.js'),
          c = require('../standalone/standaloneBase.js'),
          p = g(require('../../../base/common/types.js'));
        function f() {
          if ('function' != typeof WeakMap) return null;
          var e = new WeakMap();
          return (
            (f = function() {
              return e;
            }),
            e
          );
        }
        function g(e) {
          if (e && e.__esModule) return e;
          var t = f();
          if (t && t.has(e)) return t.get(e);
          var r = {};
          if (null != e) {
            var n = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var o in e)
              if (Object.prototype.hasOwnProperty.call(e, o)) {
                var i = n ? Object.getOwnPropertyDescriptor(e, o) : null;
                i && (i.get || i.set) ? Object.defineProperty(r, o, i) : (r[o] = e[o]);
              }
          }
          return (r.default = e), t && t.set(e, r), r;
        }
        var h = (function() {
            var e = function(t, r) {
              return (e =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function(e, t) {
                    e.__proto__ = t;
                  }) ||
                function(e, t) {
                  for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
                })(t, r);
            };
            return function(t, r) {
              function n() {
                this.constructor = t;
              }
              e(t, r), (t.prototype = null === r ? Object.create(r) : ((n.prototype = r.prototype), new n()));
            };
          })(),
          b = (function(e) {
            function t() {
              return (null !== e && e.apply(this, arguments)) || this;
            }
            return (
              h(t, e),
              Object.defineProperty(t.prototype, 'uri', {
                get: function() {
                  return this._uri;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, 'version', {
                get: function() {
                  return this._versionId;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, 'eol', {
                get: function() {
                  return this._eol;
                },
                enumerable: !0,
                configurable: !0
              }),
              (t.prototype.getValue = function() {
                return this.getText();
              }),
              (t.prototype.getLinesContent = function() {
                return this._lines.slice(0);
              }),
              (t.prototype.getLineCount = function() {
                return this._lines.length;
              }),
              (t.prototype.getLineContent = function(e) {
                return this._lines[e - 1];
              }),
              (t.prototype.getWordAtPosition = function(e, t) {
                var r = (0, a.getWordAtText)(e.column, (0, a.ensureValidWordDefinition)(t), this._lines[e.lineNumber - 1], 0);
                return r ? new u.Range(e.lineNumber, r.startColumn, e.lineNumber, r.endColumn) : null;
              }),
              (t.prototype.getWordUntilPosition = function(e, t) {
                var r = this.getWordAtPosition(e, t);
                return r
                  ? {
                      word: this._lines[e.lineNumber - 1].substring(r.startColumn - 1, e.column - 1),
                      startColumn: r.startColumn,
                      endColumn: e.column
                    }
                  : { word: '', startColumn: e.column, endColumn: e.column };
              }),
              (t.prototype.createWordIterator = function(e) {
                var t,
                  n,
                  o = this,
                  i = 0,
                  u = 0,
                  s = [],
                  l = function() {
                    if (u < s.length) {
                      var a = n.substring(s[u].start, s[u].end);
                      return (u += 1), t ? (t.value = a) : (t = { done: !1, value: a }), t;
                    }
                    return i >= o._lines.length ? r.FIN : ((n = o._lines[i]), (s = o._wordenize(n, e)), (u = 0), (i += 1), l());
                  };
                return { next: l };
              }),
              (t.prototype.getLineWords = function(e, t) {
                for (var r = this._lines[e - 1], n = [], o = 0, i = this._wordenize(r, t); o < i.length; o++) {
                  var u = i[o];
                  n.push({ word: r.substring(u.start, u.end), startColumn: u.start + 1, endColumn: u.end + 1 });
                }
                return n;
              }),
              (t.prototype._wordenize = function(e, t) {
                var r,
                  n = [];
                for (t.lastIndex = 0; (r = t.exec(e)) && 0 !== r[0].length; ) n.push({ start: r.index, end: r.index + r[0].length });
                return n;
              }),
              (t.prototype.getValueInRange = function(e) {
                if ((e = this._validateRange(e)).startLineNumber === e.endLineNumber)
                  return this._lines[e.startLineNumber - 1].substring(e.startColumn - 1, e.endColumn - 1);
                var t = this._eol,
                  r = e.startLineNumber - 1,
                  n = e.endLineNumber - 1,
                  o = [];
                o.push(this._lines[r].substring(e.startColumn - 1));
                for (var i = r + 1; i < n; i++) o.push(this._lines[i]);
                return o.push(this._lines[n].substring(0, e.endColumn - 1)), o.join(t);
              }),
              (t.prototype.offsetAt = function(e) {
                return (
                  (e = this._validatePosition(e)), this._ensureLineStarts(), this._lineStarts.getAccumulatedValue(e.lineNumber - 2) + (e.column - 1)
                );
              }),
              (t.prototype.positionAt = function(e) {
                (e = Math.floor(e)), (e = Math.max(0, e)), this._ensureLineStarts();
                var t = this._lineStarts.getIndexOf(e),
                  r = this._lines[t.index].length;
                return { lineNumber: 1 + t.index, column: 1 + Math.min(t.remainder, r) };
              }),
              (t.prototype._validateRange = function(e) {
                var t = this._validatePosition({ lineNumber: e.startLineNumber, column: e.startColumn }),
                  r = this._validatePosition({ lineNumber: e.endLineNumber, column: e.endColumn });
                return t.lineNumber !== e.startLineNumber ||
                  t.column !== e.startColumn ||
                  r.lineNumber !== e.endLineNumber ||
                  r.column !== e.endColumn
                  ? { startLineNumber: t.lineNumber, startColumn: t.column, endLineNumber: r.lineNumber, endColumn: r.column }
                  : e;
              }),
              (t.prototype._validatePosition = function(e) {
                if (!i.Position.isIPosition(e)) throw new Error('bad position');
                var t = e.lineNumber,
                  r = e.column,
                  n = !1;
                if (t < 1) (t = 1), (r = 1), (n = !0);
                else if (t > this._lines.length) (t = this._lines.length), (r = this._lines[t - 1].length + 1), (n = !0);
                else {
                  var o = this._lines[t - 1].length + 1;
                  r < 1 ? ((r = 1), (n = !0)) : r > o && ((r = o), (n = !0));
                }
                return n ? { lineNumber: t, column: r } : e;
              }),
              t
            );
          })(l.MirrorTextModel),
          _ = (function() {
            function r(e, t) {
              (this._host = e), (this._models = Object.create(null)), (this._foreignModuleFactory = t), (this._foreignModule = null);
            }
            return (
              (r.prototype.dispose = function() {
                this._models = Object.create(null);
              }),
              (r.prototype._getModel = function(e) {
                return this._models[e];
              }),
              (r.prototype._getModels = function() {
                var e = this,
                  t = [];
                return (
                  Object.keys(this._models).forEach(function(r) {
                    return t.push(e._models[r]);
                  }),
                  t
                );
              }),
              (r.prototype.acceptNewModel = function(e) {
                this._models[e.url] = new b(o.URI.parse(e.url), e.lines, e.EOL, e.versionId);
              }),
              (r.prototype.acceptModelChanged = function(e, t) {
                this._models[e] && this._models[e].onEvents(t);
              }),
              (r.prototype.acceptRemovedModel = function(e) {
                this._models[e] && delete this._models[e];
              }),
              (r.prototype.computeDiff = function(e, t, r) {
                var n = this._getModel(e),
                  o = this._getModel(t);
                if (!n || !o) return Promise.resolve(null);
                var i = n.getLinesContent(),
                  u = o.getLinesContent(),
                  l = new s.DiffComputer(i, u, {
                    shouldComputeCharChanges: !0,
                    shouldPostProcessCharChanges: !0,
                    shouldIgnoreTrimWhitespace: r,
                    shouldMakePrettyDiff: !0
                  }).computeDiff(),
                  a = !(l.length > 0) && this._modelsAreIdentical(n, o);
                return Promise.resolve({ identical: a, changes: l });
              }),
              (r.prototype._modelsAreIdentical = function(e, t) {
                var r = e.getLineCount();
                if (r !== t.getLineCount()) return !1;
                for (var n = 1; n <= r; n++) {
                  if (e.getLineContent(n) !== t.getLineContent(n)) return !1;
                }
                return !0;
              }),
              (r.prototype.computeMoreMinimalEdits = function(n, o) {
                var i = this._getModel(n);
                if (!i) return Promise.resolve(o);
                for (
                  var s = [],
                    l = void 0,
                    a = 0,
                    m = (o = (0, e.mergeSort)(o, function(e, t) {
                      return e.range && t.range ? u.Range.compareRangesUsingStarts(e.range, t.range) : (e.range ? 0 : 1) - (t.range ? 0 : 1);
                    }));
                  a < m.length;
                  a++
                ) {
                  var d = m[a],
                    c = d.range,
                    p = d.text,
                    f = d.eol;
                  if (('number' == typeof f && (l = f), !u.Range.isEmpty(c) || p)) {
                    var g = i.getValueInRange(c);
                    if (g !== (p = p.replace(/\r\n|\n|\r/g, i.eol)))
                      if (Math.max(p.length, g.length) > r._diffLimit) s.push({ range: c, text: p });
                      else
                        for (
                          var h = (0, t.stringDiff)(g, p, !1), b = i.offsetAt(u.Range.lift(c).getStartPosition()), _ = 0, v = h;
                          _ < v.length;
                          _++
                        ) {
                          var y = v[_],
                            C = i.positionAt(b + y.originalStart),
                            N = i.positionAt(b + y.originalStart + y.originalLength),
                            L = {
                              text: p.substr(y.modifiedStart, y.modifiedLength),
                              range: { startLineNumber: C.lineNumber, startColumn: C.column, endLineNumber: N.lineNumber, endColumn: N.column }
                            };
                          i.getValueInRange(L.range) !== L.text && s.push(L);
                        }
                  }
                }
                return (
                  'number' == typeof l && s.push({ eol: l, text: '', range: { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0 } }),
                  Promise.resolve(s)
                );
              }),
              (r.prototype.computeLinks = function(e) {
                var t = this._getModel(e);
                return t ? Promise.resolve((0, m.computeLinks)(t)) : Promise.resolve(null);
              }),
              (r.prototype.textualSuggest = function(e, t, n, o) {
                var i = this._getModel(e);
                if (!i) return Promise.resolve(null);
                var u = Object.create(null),
                  s = [],
                  l = new RegExp(n, o),
                  a = i.getWordUntilPosition(t, l),
                  m = i.getWordAtPosition(t, l);
                m && (u[i.getValueInRange(m)] = !0);
                for (var d = i.createWordIterator(l), c = d.next(); !c.done && s.length <= r._suggestionsLimit; c = d.next()) {
                  var p = c.value;
                  u[p] ||
                    ((u[p] = !0),
                    isNaN(Number(p)) &&
                      s.push({
                        kind: 18,
                        label: p,
                        insertText: p,
                        range: { startLineNumber: t.lineNumber, startColumn: a.startColumn, endLineNumber: t.lineNumber, endColumn: a.endColumn }
                      }));
                }
                return Promise.resolve({ suggestions: s });
              }),
              (r.prototype.computeWordRanges = function(e, t, r, n) {
                var o = this._getModel(e);
                if (!o) return Promise.resolve(Object.create(null));
                for (var i = new RegExp(r, n), u = Object.create(null), s = t.startLineNumber; s < t.endLineNumber; s++)
                  for (var l = 0, a = o.getLineWords(s, i); l < a.length; l++) {
                    var m = a[l];
                    if (isNaN(Number(m.word))) {
                      var d = u[m.word];
                      d || ((d = []), (u[m.word] = d)),
                        d.push({ startLineNumber: s, startColumn: m.startColumn, endLineNumber: s, endColumn: m.endColumn });
                    }
                  }
                return Promise.resolve(u);
              }),
              (r.prototype.navigateValueSet = function(e, t, r, n, o) {
                var i = this._getModel(e);
                if (!i) return Promise.resolve(null);
                var u = new RegExp(n, o);
                t.startColumn === t.endColumn &&
                  (t = {
                    startLineNumber: t.startLineNumber,
                    startColumn: t.startColumn,
                    endLineNumber: t.endLineNumber,
                    endColumn: t.endColumn + 1
                  });
                var s = i.getValueInRange(t),
                  l = i.getWordAtPosition({ lineNumber: t.startLineNumber, column: t.startColumn }, u);
                if (!l) return Promise.resolve(null);
                var a = i.getValueInRange(l),
                  m = d.BasicInplaceReplace.INSTANCE.navigateValueSet(t, s, l, a, r);
                return Promise.resolve(m);
              }),
              (r.prototype.loadForeignModule = function(e, t, r) {
                var n = this,
                  o = {
                    host: p.createProxyObject(r, function(e, t) {
                      return n._host.fhr(e, t);
                    }),
                    getMirrorModels: function() {
                      return n._getModels();
                    }
                  };
                return this._foreignModuleFactory
                  ? ((this._foreignModule = this._foreignModuleFactory(o, t)), Promise.resolve(p.getAllMethodNames(this._foreignModule)))
                  : Promise.reject(new Error('Unexpected usage'));
              }),
              (r.prototype.fmr = function(e, t) {
                if (!this._foreignModule || 'function' != typeof this._foreignModule[e])
                  return Promise.reject(new Error('Missing requestHandler or method: ' + e));
                try {
                  return Promise.resolve(this._foreignModule[e].apply(this._foreignModule, t));
                } catch (r) {
                  return Promise.reject(r);
                }
              }),
              (r._diffLimit = 1e5),
              (r._suggestionsLimit = 1e4),
              r
            );
          })();
        function v(e) {
          return new _(e, null);
        }
        (exports.EditorSimpleWorker = _), 'function' == typeof importScripts && (n.globals.monaco = (0, c.createMonacoBaseAPI)());
      },
      {
        '../../../base/common/arrays.js': 'WVUY',
        '../../../base/common/diff/diff.js': 'UuLR',
        '../../../base/common/iterator.js': 'xnTK',
        '../../../base/common/platform.js': 'wdE2',
        '../../../base/common/uri.js': 'z9aY',
        '../core/position.js': 'E9Bb',
        '../core/range.js': 'IT6S',
        '../diff/diffComputer.js': 'OqVr',
        '../model/mirrorTextModel.js': 'VhpR',
        '../model/wordHelper.js': 's6WU',
        '../modes/linkComputer.js': 'XIPe',
        '../modes/supports/inplaceReplaceSupport.js': 'vkZY',
        '../standalone/standaloneBase.js': 'vf9U',
        '../../../base/common/types.js': 'wwPi'
      }
    ],
    Cd57: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.initialize = s);
        var e = require('../base/common/worker/simpleWorker.js'),
          r = require('./common/services/editorSimpleWorker.js'),
          o = !1;
        function s(s) {
          if (!o) {
            o = !0;
            var i = new e.SimpleWorkerServer(
              function(e) {
                self.postMessage(e);
              },
              function(e) {
                return new r.EditorSimpleWorker(e, s);
              }
            );
            self.onmessage = function(e) {
              i.onmessage(e.data);
            };
          }
        }
        self.onmessage = function(e) {
          o || s(null);
        };
      },
      { '../base/common/worker/simpleWorker.js': 'eVCz', './common/services/editorSimpleWorker.js': 'i0Ia' }
    ]
  },
  {},
  ['Cd57'],
  null
);
