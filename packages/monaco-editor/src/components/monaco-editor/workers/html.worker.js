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
    ],
    M4HU: [
      function(require, module, exports) {
        'use strict';
        function e(e, n) {
          return 0 === n.length
            ? e
            : e.replace(/\{(\d+)\}/g, function(e, r) {
                var t = r[0];
                return void 0 !== n[t] ? n[t] : e;
              });
        }
        function n(n, r) {
          for (var t = [], o = 2; o < arguments.length; o++) t[o - 2] = arguments[o];
          return e(r, t);
        }
        function r(e) {
          return n;
        }
        function t(e) {
          return r;
        }
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.loadMessageBundle = r), (exports.config = t);
      },
      {}
    ],
    aQAr: [
      function(require, module, exports) {
        'use strict';
        var t, e, n;
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.ScannerState = exports.TokenType = exports.SelectionRangeKind = void 0),
          (exports.SelectionRangeKind = t),
          (function(t) {
            (t.Empty = ''), (t.Statement = 'statement'), (t.Declaration = 'declaration');
          })(t || (exports.SelectionRangeKind = t = {})),
          (exports.TokenType = e),
          (function(t) {
            (t[(t.StartCommentTag = 0)] = 'StartCommentTag'),
              (t[(t.Comment = 1)] = 'Comment'),
              (t[(t.EndCommentTag = 2)] = 'EndCommentTag'),
              (t[(t.StartTagOpen = 3)] = 'StartTagOpen'),
              (t[(t.StartTagClose = 4)] = 'StartTagClose'),
              (t[(t.StartTagSelfClose = 5)] = 'StartTagSelfClose'),
              (t[(t.StartTag = 6)] = 'StartTag'),
              (t[(t.EndTagOpen = 7)] = 'EndTagOpen'),
              (t[(t.EndTagClose = 8)] = 'EndTagClose'),
              (t[(t.EndTag = 9)] = 'EndTag'),
              (t[(t.DelimiterAssign = 10)] = 'DelimiterAssign'),
              (t[(t.AttributeName = 11)] = 'AttributeName'),
              (t[(t.AttributeValue = 12)] = 'AttributeValue'),
              (t[(t.StartDoctypeTag = 13)] = 'StartDoctypeTag'),
              (t[(t.Doctype = 14)] = 'Doctype'),
              (t[(t.EndDoctypeTag = 15)] = 'EndDoctypeTag'),
              (t[(t.Content = 16)] = 'Content'),
              (t[(t.Whitespace = 17)] = 'Whitespace'),
              (t[(t.Unknown = 18)] = 'Unknown'),
              (t[(t.Script = 19)] = 'Script'),
              (t[(t.Styles = 20)] = 'Styles'),
              (t[(t.EOS = 21)] = 'EOS');
          })(e || (exports.TokenType = e = {})),
          (exports.ScannerState = n),
          (function(t) {
            (t[(t.WithinContent = 0)] = 'WithinContent'),
              (t[(t.AfterOpeningStartTag = 1)] = 'AfterOpeningStartTag'),
              (t[(t.AfterOpeningEndTag = 2)] = 'AfterOpeningEndTag'),
              (t[(t.WithinDoctype = 3)] = 'WithinDoctype'),
              (t[(t.WithinTag = 4)] = 'WithinTag'),
              (t[(t.WithinEndTag = 5)] = 'WithinEndTag'),
              (t[(t.WithinComment = 6)] = 'WithinComment'),
              (t[(t.WithinScriptContent = 7)] = 'WithinScriptContent'),
              (t[(t.WithinStyleContent = 8)] = 'WithinStyleContent'),
              (t[(t.AfterAttributeName = 9)] = 'AfterAttributeName'),
              (t[(t.BeforeAttributeValue = 10)] = 'BeforeAttributeValue');
          })(n || (exports.ScannerState = n = {}));
      },
      {}
    ],
    WRaN: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.createScanner = k);
        var e = r(require('../../../fillers/vscode-nls.js')),
          t = require('../htmlLanguageTypes.js');
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
        function r(e) {
          if (e && e.__esModule) return e;
          var t = n();
          if (t && t.has(e)) return t.get(e);
          var r = {};
          if (null != e) {
            var a = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var o in e)
              if (Object.prototype.hasOwnProperty.call(e, o)) {
                var i = a ? Object.getOwnPropertyDescriptor(e, o) : null;
                i && (i.get || i.set) ? Object.defineProperty(r, o, i) : (r[o] = e[o]);
              }
          }
          return (r.default = e), t && t.set(e, r), r;
        }
        var a = e.loadMessageBundle(),
          o = (function() {
            function e(e, t) {
              (this.source = e), (this.len = e.length), (this.position = t);
            }
            return (
              (e.prototype.eos = function() {
                return this.len <= this.position;
              }),
              (e.prototype.getSource = function() {
                return this.source;
              }),
              (e.prototype.pos = function() {
                return this.position;
              }),
              (e.prototype.goBackTo = function(e) {
                this.position = e;
              }),
              (e.prototype.goBack = function(e) {
                this.position -= e;
              }),
              (e.prototype.advance = function(e) {
                this.position += e;
              }),
              (e.prototype.goToEnd = function() {
                this.position = this.source.length;
              }),
              (e.prototype.nextChar = function() {
                return this.source.charCodeAt(this.position++) || 0;
              }),
              (e.prototype.peekChar = function(e) {
                return void 0 === e && (e = 0), this.source.charCodeAt(this.position + e) || 0;
              }),
              (e.prototype.advanceIfChar = function(e) {
                return e === this.source.charCodeAt(this.position) && (this.position++, !0);
              }),
              (e.prototype.advanceIfChars = function(e) {
                var t;
                if (this.position + e.length > this.source.length) return !1;
                for (t = 0; t < e.length; t++) if (this.source.charCodeAt(this.position + t) !== e[t]) return !1;
                return this.advance(t), !0;
              }),
              (e.prototype.advanceIfRegExp = function(e) {
                var t = this.source.substr(this.position).match(e);
                return t ? ((this.position = this.position + t.index + t[0].length), t[0]) : '';
              }),
              (e.prototype.advanceUntilRegExp = function(e) {
                var t = this.source.substr(this.position).match(e);
                return t ? ((this.position = this.position + t.index), t[0]) : (this.goToEnd(), '');
              }),
              (e.prototype.advanceUntilChar = function(e) {
                for (; this.position < this.source.length; ) {
                  if (this.source.charCodeAt(this.position) === e) return !0;
                  this.advance(1);
                }
                return !1;
              }),
              (e.prototype.advanceUntilChars = function(e) {
                for (; this.position + e.length <= this.source.length; ) {
                  for (var t = 0; t < e.length && this.source.charCodeAt(this.position + t) === e[t]; t++);
                  if (t === e.length) return !0;
                  this.advance(1);
                }
                return this.goToEnd(), !1;
              }),
              (e.prototype.skipWhitespace = function() {
                return (
                  this.advanceWhileChar(function(e) {
                    return e === l || e === y || e === f || e === g || e === S;
                  }) > 0
                );
              }),
              (e.prototype.advanceWhileChar = function(e) {
                for (var t = this.position; this.position < this.len && e(this.source.charCodeAt(this.position)); ) this.position++;
                return this.position - t;
              }),
              e
            );
          })(),
          i = '!'.charCodeAt(0),
          c = '-'.charCodeAt(0),
          s = '<'.charCodeAt(0),
          p = '>'.charCodeAt(0),
          h = '/'.charCodeAt(0),
          u = '='.charCodeAt(0),
          T = '"'.charCodeAt(0),
          d = "'".charCodeAt(0),
          f = '\n'.charCodeAt(0),
          S = '\r'.charCodeAt(0),
          g = '\f'.charCodeAt(0),
          l = ' '.charCodeAt(0),
          y = '\t'.charCodeAt(0),
          C = { 'text/x-handlebars-template': !0 };
        function k(e, n, r) {
          void 0 === n && (n = 0), void 0 === r && (r = t.ScannerState.WithinContent);
          var f,
            S,
            g,
            l,
            y,
            k = new o(e, n),
            v = r,
            W = 0,
            A = t.TokenType.Unknown;
          function x() {
            return k.advanceIfRegExp(/^[_:\w][_:\w-.\d]*/).toLowerCase();
          }
          function E(e, t, n) {
            return (A = t), (W = e), (f = n), t;
          }
          return {
            scan: function() {
              var e = k.pos(),
                n = v,
                r = (function e() {
                  var n,
                    r = k.pos();
                  if (k.eos()) return E(r, t.TokenType.EOS);
                  switch (v) {
                    case t.ScannerState.WithinComment:
                      return k.advanceIfChars([c, c, p])
                        ? ((v = t.ScannerState.WithinContent), E(r, t.TokenType.EndCommentTag))
                        : (k.advanceUntilChars([c, c, p]), E(r, t.TokenType.Comment));
                    case t.ScannerState.WithinDoctype:
                      return k.advanceIfChar(p)
                        ? ((v = t.ScannerState.WithinContent), E(r, t.TokenType.EndDoctypeTag))
                        : (k.advanceUntilChar(p), E(r, t.TokenType.Doctype));
                    case t.ScannerState.WithinContent:
                      if (k.advanceIfChar(s)) {
                        if (!k.eos() && k.peekChar() === i) {
                          if (k.advanceIfChars([i, c, c])) return (v = t.ScannerState.WithinComment), E(r, t.TokenType.StartCommentTag);
                          if (k.advanceIfRegExp(/^!doctype/i)) return (v = t.ScannerState.WithinDoctype), E(r, t.TokenType.StartDoctypeTag);
                        }
                        return k.advanceIfChar(h)
                          ? ((v = t.ScannerState.AfterOpeningEndTag), E(r, t.TokenType.EndTagOpen))
                          : ((v = t.ScannerState.AfterOpeningStartTag), E(r, t.TokenType.StartTagOpen));
                      }
                      return k.advanceUntilChar(s), E(r, t.TokenType.Content);
                    case t.ScannerState.AfterOpeningEndTag:
                      var o = x();
                      return o.length > 0
                        ? ((v = t.ScannerState.WithinEndTag), E(r, t.TokenType.EndTag))
                        : k.skipWhitespace()
                        ? E(r, t.TokenType.Whitespace, a('error.unexpectedWhitespace', 'Tag name must directly follow the open bracket.'))
                        : ((v = t.ScannerState.WithinEndTag),
                          k.advanceUntilChar(p),
                          r < k.pos() ? E(r, t.TokenType.Unknown, a('error.endTagNameExpected', 'End tag name expected.')) : e());
                    case t.ScannerState.WithinEndTag:
                      if (k.skipWhitespace()) return E(r, t.TokenType.Whitespace);
                      if (k.advanceIfChar(p)) return (v = t.ScannerState.WithinContent), E(r, t.TokenType.EndTagClose);
                      n = a('error.tagNameExpected', 'Closing bracket expected.');
                      break;
                    case t.ScannerState.AfterOpeningStartTag:
                      return (
                        (g = x()),
                        (y = void 0),
                        (l = void 0),
                        g.length > 0
                          ? ((S = !1), (v = t.ScannerState.WithinTag), E(r, t.TokenType.StartTag))
                          : k.skipWhitespace()
                          ? E(r, t.TokenType.Whitespace, a('error.unexpectedWhitespace', 'Tag name must directly follow the open bracket.'))
                          : ((v = t.ScannerState.WithinTag),
                            k.advanceUntilChar(p),
                            r < k.pos() ? E(r, t.TokenType.Unknown, a('error.startTagNameExpected', 'Start tag name expected.')) : e())
                      );
                    case t.ScannerState.WithinTag:
                      return k.skipWhitespace()
                        ? ((S = !0), E(r, t.TokenType.Whitespace))
                        : S && (l = k.advanceIfRegExp(/^[^\s"'>\/=\x00-\x0F\x7F\x80-\x9F]*/).toLowerCase()).length > 0
                        ? ((v = t.ScannerState.AfterAttributeName), (S = !1), E(r, t.TokenType.AttributeName))
                        : k.advanceIfChars([h, p])
                        ? ((v = t.ScannerState.WithinContent), E(r, t.TokenType.StartTagSelfClose))
                        : k.advanceIfChar(p)
                        ? ((v =
                            'script' === g
                              ? y && C[y]
                                ? t.ScannerState.WithinContent
                                : t.ScannerState.WithinScriptContent
                              : 'style' === g
                              ? t.ScannerState.WithinStyleContent
                              : t.ScannerState.WithinContent),
                          E(r, t.TokenType.StartTagClose))
                        : (k.advance(1), E(r, t.TokenType.Unknown, a('error.unexpectedCharacterInTag', 'Unexpected character in tag.')));
                    case t.ScannerState.AfterAttributeName:
                      return k.skipWhitespace()
                        ? ((S = !0), E(r, t.TokenType.Whitespace))
                        : k.advanceIfChar(u)
                        ? ((v = t.ScannerState.BeforeAttributeValue), E(r, t.TokenType.DelimiterAssign))
                        : ((v = t.ScannerState.WithinTag), e());
                    case t.ScannerState.BeforeAttributeValue:
                      if (k.skipWhitespace()) return E(r, t.TokenType.Whitespace);
                      var f = k.advanceIfRegExp(/^[^\s"'`=<>\/]+/);
                      if (f.length > 0) return 'type' === l && (y = f), (v = t.ScannerState.WithinTag), (S = !1), E(r, t.TokenType.AttributeValue);
                      var W = k.peekChar();
                      return W === d || W === T
                        ? (k.advance(1),
                          k.advanceUntilChar(W) && k.advance(1),
                          'type' === l && (y = k.getSource().substring(r + 1, k.pos() - 1)),
                          (v = t.ScannerState.WithinTag),
                          (S = !1),
                          E(r, t.TokenType.AttributeValue))
                        : ((v = t.ScannerState.WithinTag), (S = !1), e());
                    case t.ScannerState.WithinScriptContent:
                      for (var A = 1; !k.eos(); ) {
                        var m = k.advanceIfRegExp(/<!--|-->|<\/?script\s*\/?>?/i);
                        if (0 === m.length) return k.goToEnd(), E(r, t.TokenType.Script);
                        if ('\x3c!--' === m) 1 === A && (A = 2);
                        else if ('--\x3e' === m) A = 1;
                        else if ('/' !== m[1]) 2 === A && (A = 3);
                        else {
                          if (3 !== A) {
                            k.goBack(m.length);
                            break;
                          }
                          A = 2;
                        }
                      }
                      return (v = t.ScannerState.WithinContent), r < k.pos() ? E(r, t.TokenType.Script) : e();
                    case t.ScannerState.WithinStyleContent:
                      return k.advanceUntilRegExp(/<\/style/i), (v = t.ScannerState.WithinContent), r < k.pos() ? E(r, t.TokenType.Styles) : e();
                  }
                  return k.advance(1), (v = t.ScannerState.WithinContent), E(r, t.TokenType.Unknown, n);
                })();
              return r !== t.TokenType.EOS && e === k.pos()
                ? (console.log('Scanner.scan has not advanced at offset ' + e + ', state before: ' + n + ' after: ' + v),
                  k.advance(1),
                  E(e, t.TokenType.Unknown))
                : r;
            },
            getTokenType: function() {
              return A;
            },
            getTokenOffset: function() {
              return W;
            },
            getTokenLength: function() {
              return k.pos() - W;
            },
            getTokenEnd: function() {
              return k.pos();
            },
            getTokenText: function() {
              return k.getSource().substring(W, k.pos());
            },
            getScannerState: function() {
              return v;
            },
            getTokenError: function() {
              return f;
            }
          };
        }
      },
      { '../../../fillers/vscode-nls.js': 'M4HU', '../htmlLanguageTypes.js': 'aQAr' }
    ],
    EW6i: [
      function(require, module, exports) {
        'use strict';
        function r(r, e) {
          var t = 0,
            n = r.length;
          if (0 === n) return 0;
          for (; t < n; ) {
            var o = Math.floor((t + n) / 2);
            e(r[o]) ? (n = o) : (t = o + 1);
          }
          return t;
        }
        function e(r, e, t) {
          for (var n = 0, o = r.length - 1; n <= o; ) {
            var f = ((n + o) / 2) | 0,
              i = t(r[f], e);
            if (i < 0) n = f + 1;
            else {
              if (!(i > 0)) return f;
              o = f - 1;
            }
          }
          return -(n + 1);
        }
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.findFirst = r), (exports.binarySearch = e);
      },
      {}
    ],
    F0NQ: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.isVoidElement = o), (exports.VOID_ELEMENTS = void 0);
        var e = t(require('../utils/arrays.js'));
        function r() {
          if ('function' != typeof WeakMap) return null;
          var e = new WeakMap();
          return (
            (r = function() {
              return e;
            }),
            e
          );
        }
        function t(e) {
          if (e && e.__esModule) return e;
          var t = r();
          if (t && t.has(e)) return t.get(e);
          var n = {};
          if (null != e) {
            var o = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var a in e)
              if (Object.prototype.hasOwnProperty.call(e, a)) {
                var i = o ? Object.getOwnPropertyDescriptor(e, a) : null;
                i && (i.get || i.set) ? Object.defineProperty(n, a, i) : (n[a] = e[a]);
              }
          }
          return (n.default = e), t && t.set(e, n), n;
        }
        var n = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'];
        function o(r) {
          return (
            !!r &&
            e.binarySearch(n, r.toLowerCase(), function(e, r) {
              return e.localeCompare(r);
            }) >= 0
          );
        }
        exports.VOID_ELEMENTS = n;
      },
      { '../utils/arrays.js': 'EW6i' }
    ],
    rehe: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.parse = i), (exports.Node = void 0);
        var e = require('./htmlScanner.js'),
          t = require('../utils/arrays.js'),
          n = require('../htmlLanguageTypes.js'),
          r = require('../languageFacts/fact.js'),
          a = (function() {
            function e(e, t, n, r) {
              (this.start = e), (this.end = t), (this.children = n), (this.parent = r), (this.closed = !1);
            }
            return (
              Object.defineProperty(e.prototype, 'attributeNames', {
                get: function() {
                  return this.attributes ? Object.keys(this.attributes) : [];
                },
                enumerable: !0,
                configurable: !0
              }),
              (e.prototype.isSameTag = function(e) {
                return this.tag && e && this.tag.length === e.length && this.tag.toLowerCase() === e;
              }),
              Object.defineProperty(e.prototype, 'firstChild', {
                get: function() {
                  return this.children[0];
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(e.prototype, 'lastChild', {
                get: function() {
                  return this.children.length ? this.children[this.children.length - 1] : void 0;
                },
                enumerable: !0,
                configurable: !0
              }),
              (e.prototype.findNodeBefore = function(e) {
                var n =
                  (0, t.findFirst)(this.children, function(t) {
                    return e <= t.start;
                  }) - 1;
                if (n >= 0) {
                  var r = this.children[n];
                  if (e > r.start) {
                    if (e < r.end) return r.findNodeBefore(e);
                    var a = r.lastChild;
                    return a && a.end === r.end ? r.findNodeBefore(e) : r;
                  }
                }
                return this;
              }),
              (e.prototype.findNodeAt = function(e) {
                var n =
                  (0, t.findFirst)(this.children, function(t) {
                    return e <= t.start;
                  }) - 1;
                if (n >= 0) {
                  var r = this.children[n];
                  if (e > r.start && e <= r.end) return r.findNodeAt(e);
                }
                return this;
              }),
              e
            );
          })();
        function i(t) {
          for (
            var i = (0, e.createScanner)(t), o = new a(0, t.length, [], void 0), s = o, d = -1, l = null, u = null, c = i.scan();
            c !== n.TokenType.EOS;

          ) {
            switch (c) {
              case n.TokenType.StartTagOpen:
                var f = new a(i.getTokenOffset(), t.length, [], s);
                s.children.push(f), (s = f);
                break;
              case n.TokenType.StartTag:
                s.tag = i.getTokenText();
                break;
              case n.TokenType.StartTagClose:
                (s.end = i.getTokenEnd()),
                  (s.startTagEnd = i.getTokenEnd()),
                  s.tag && (0, r.isVoidElement)(s.tag) && s.parent && ((s.closed = !0), (s = s.parent));
                break;
              case n.TokenType.StartTagSelfClose:
                s.parent && ((s.closed = !0), (s.end = i.getTokenEnd()), (s.startTagEnd = i.getTokenEnd()), (s = s.parent));
                break;
              case n.TokenType.EndTagOpen:
                (d = i.getTokenOffset()), (l = null);
                break;
              case n.TokenType.EndTag:
                l = i.getTokenText().toLowerCase();
                break;
              case n.TokenType.EndTagClose:
                if (l) {
                  for (var T = s; !T.isSameTag(l) && T.parent; ) T = T.parent;
                  if (T.parent) {
                    for (; s !== T; ) (s.end = d), (s.closed = !1), (s = s.parent);
                    (s.closed = !0), (s.endTagStart = d), (s.end = i.getTokenEnd()), (s = s.parent);
                  }
                }
                break;
              case n.TokenType.AttributeName:
                (u = i.getTokenText()), (p = s.attributes) || (s.attributes = p = {}), (p[u] = null);
                break;
              case n.TokenType.AttributeValue:
                var p,
                  g = i.getTokenText();
                (p = s.attributes) && u && ((p[u] = g), (u = null));
            }
            c = i.scan();
          }
          for (; s.parent; ) (s.end = t.length), (s.closed = !1), (s = s.parent);
          return { roots: o.children, findNodeBefore: o.findNodeBefore.bind(o), findNodeAt: o.findNodeAt.bind(o) };
        }
        exports.Node = a;
      },
      { './htmlScanner.js': 'WRaN', '../utils/arrays.js': 'EW6i', '../htmlLanguageTypes.js': 'aQAr', '../languageFacts/fact.js': 'F0NQ' }
    ],
    vCc8: [
      function(require, module, exports) {
        'use strict';
        var e, t, n, r, i, o, s, a, c, u, d, f, p, g, l, x, m, h, v;
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.TextDocumentSaveReason = exports.TextDocument = exports.EOL = exports.DocumentLink = exports.FormattingOptions = exports.CodeLens = exports.CodeAction = exports.CodeActionContext = exports.CodeActionKind = exports.DocumentSymbol = exports.SymbolInformation = exports.SymbolKind = exports.DocumentHighlight = exports.DocumentHighlightKind = exports.SignatureInformation = exports.ParameterInformation = exports.Hover = exports.MarkedString = exports.CompletionList = exports.CompletionItem = exports.InsertTextFormat = exports.CompletionItemKind = exports.MarkupContent = exports.MarkupKind = exports.TextDocumentItem = exports.VersionedTextDocumentIdentifier = exports.TextDocumentIdentifier = exports.WorkspaceChange = exports.WorkspaceEdit = exports.DeleteFile = exports.RenameFile = exports.CreateFile = exports.TextDocumentEdit = exports.TextEdit = exports.Command = exports.Diagnostic = exports.DiagnosticSeverity = exports.DiagnosticRelatedInformation = exports.FoldingRange = exports.FoldingRangeKind = exports.ColorPresentation = exports.ColorInformation = exports.Color = exports.LocationLink = exports.Location = exports.Range = exports.Position = void 0),
          (exports.Position = e),
          (function(e) {
            (e.create = function(e, t) {
              return { line: e, character: t };
            }),
              (e.is = function(e) {
                var t = e;
                return $.objectLiteral(t) && $.number(t.line) && $.number(t.character);
              });
          })(e || (exports.Position = e = {})),
          (exports.Range = t),
          (function(t) {
            (t.create = function(t, n, r, i) {
              if ($.number(t) && $.number(n) && $.number(r) && $.number(i)) return { start: e.create(t, n), end: e.create(r, i) };
              if (e.is(t) && e.is(n)) return { start: t, end: n };
              throw new Error('Range#create called with invalid arguments[' + t + ', ' + n + ', ' + r + ', ' + i + ']');
            }),
              (t.is = function(t) {
                var n = t;
                return $.objectLiteral(n) && e.is(n.start) && e.is(n.end);
              });
          })(t || (exports.Range = t = {})),
          (exports.Location = n),
          (function(e) {
            (e.create = function(e, t) {
              return { uri: e, range: t };
            }),
              (e.is = function(e) {
                var n = e;
                return $.defined(n) && t.is(n.range) && ($.string(n.uri) || $.undefined(n.uri));
              });
          })(n || (exports.Location = n = {})),
          (exports.LocationLink = r),
          (function(e) {
            (e.create = function(e, t, n, r) {
              return { targetUri: e, targetRange: t, targetSelectionRange: n, originSelectionRange: r };
            }),
              (e.is = function(e) {
                var n = e;
                return (
                  $.defined(n) &&
                  t.is(n.targetRange) &&
                  $.string(n.targetUri) &&
                  (t.is(n.targetSelectionRange) || $.undefined(n.targetSelectionRange)) &&
                  (t.is(n.originSelectionRange) || $.undefined(n.originSelectionRange))
                );
              });
          })(r || (exports.LocationLink = r = {})),
          (exports.Color = i),
          (function(e) {
            (e.create = function(e, t, n, r) {
              return { red: e, green: t, blue: n, alpha: r };
            }),
              (e.is = function(e) {
                var t = e;
                return $.number(t.red) && $.number(t.green) && $.number(t.blue) && $.number(t.alpha);
              });
          })(i || (exports.Color = i = {})),
          (exports.ColorInformation = o),
          (function(e) {
            (e.create = function(e, t) {
              return { range: e, color: t };
            }),
              (e.is = function(e) {
                var n = e;
                return t.is(n.range) && i.is(n.color);
              });
          })(o || (exports.ColorInformation = o = {})),
          (exports.ColorPresentation = s),
          (function(e) {
            (e.create = function(e, t, n) {
              return { label: e, textEdit: t, additionalTextEdits: n };
            }),
              (e.is = function(e) {
                var t = e;
                return (
                  $.string(t.label) &&
                  ($.undefined(t.textEdit) || g.is(t)) &&
                  ($.undefined(t.additionalTextEdits) || $.typedArray(t.additionalTextEdits, g.is))
                );
              });
          })(s || (exports.ColorPresentation = s = {})),
          (exports.FoldingRangeKind = a),
          (function(e) {
            (e.Comment = 'comment'), (e.Imports = 'imports'), (e.Region = 'region');
          })(a || (exports.FoldingRangeKind = a = {})),
          (exports.FoldingRange = c),
          (function(e) {
            (e.create = function(e, t, n, r, i) {
              var o = { startLine: e, endLine: t };
              return $.defined(n) && (o.startCharacter = n), $.defined(r) && (o.endCharacter = r), $.defined(i) && (o.kind = i), o;
            }),
              (e.is = function(e) {
                var t = e;
                return (
                  $.number(t.startLine) &&
                  $.number(t.startLine) &&
                  ($.undefined(t.startCharacter) || $.number(t.startCharacter)) &&
                  ($.undefined(t.endCharacter) || $.number(t.endCharacter)) &&
                  ($.undefined(t.kind) || $.string(t.kind))
                );
              });
          })(c || (exports.FoldingRange = c = {})),
          (exports.DiagnosticRelatedInformation = u),
          (function(e) {
            (e.create = function(e, t) {
              return { location: e, message: t };
            }),
              (e.is = function(e) {
                var t = e;
                return $.defined(t) && n.is(t.location) && $.string(t.message);
              });
          })(u || (exports.DiagnosticRelatedInformation = u = {})),
          (exports.DiagnosticSeverity = d),
          (function(e) {
            (e.Error = 1), (e.Warning = 2), (e.Information = 3), (e.Hint = 4);
          })(d || (exports.DiagnosticSeverity = d = {})),
          (exports.Diagnostic = f),
          (function(e) {
            (e.create = function(e, t, n, r, i, o) {
              var s = { range: e, message: t };
              return (
                $.defined(n) && (s.severity = n),
                $.defined(r) && (s.code = r),
                $.defined(i) && (s.source = i),
                $.defined(o) && (s.relatedInformation = o),
                s
              );
            }),
              (e.is = function(e) {
                var n = e;
                return (
                  $.defined(n) &&
                  t.is(n.range) &&
                  $.string(n.message) &&
                  ($.number(n.severity) || $.undefined(n.severity)) &&
                  ($.number(n.code) || $.string(n.code) || $.undefined(n.code)) &&
                  ($.string(n.source) || $.undefined(n.source)) &&
                  ($.undefined(n.relatedInformation) || $.typedArray(n.relatedInformation, u.is))
                );
              });
          })(f || (exports.Diagnostic = f = {})),
          (exports.Command = p),
          (function(e) {
            (e.create = function(e, t) {
              for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
              var i = { title: e, command: t };
              return $.defined(n) && n.length > 0 && (i.arguments = n), i;
            }),
              (e.is = function(e) {
                var t = e;
                return $.defined(t) && $.string(t.title) && $.string(t.command);
              });
          })(p || (exports.Command = p = {})),
          (exports.TextEdit = g),
          (function(e) {
            (e.replace = function(e, t) {
              return { range: e, newText: t };
            }),
              (e.insert = function(e, t) {
                return { range: { start: e, end: e }, newText: t };
              }),
              (e.del = function(e) {
                return { range: e, newText: '' };
              }),
              (e.is = function(e) {
                var n = e;
                return $.objectLiteral(n) && $.string(n.newText) && t.is(n.range);
              });
          })(g || (exports.TextEdit = g = {})),
          (exports.TextDocumentEdit = l),
          (function(e) {
            (e.create = function(e, t) {
              return { textDocument: e, edits: t };
            }),
              (e.is = function(e) {
                var t = e;
                return $.defined(t) && C.is(t.textDocument) && Array.isArray(t.edits);
              });
          })(l || (exports.TextDocumentEdit = l = {})),
          (exports.CreateFile = x),
          (function(e) {
            (e.create = function(e, t) {
              var n = { kind: 'create', uri: e };
              return void 0 === t || (void 0 === t.overwrite && void 0 === t.ignoreIfExists) || (n.options = t), n;
            }),
              (e.is = function(e) {
                var t = e;
                return (
                  t &&
                  'create' === t.kind &&
                  $.string(t.uri) &&
                  (void 0 === t.options ||
                    ((void 0 === t.options.overwrite || $.boolean(t.options.overwrite)) &&
                      (void 0 === t.options.ignoreIfExists || $.boolean(t.options.ignoreIfExists))))
                );
              });
          })(x || (exports.CreateFile = x = {})),
          (exports.RenameFile = m),
          (function(e) {
            (e.create = function(e, t, n) {
              var r = { kind: 'rename', oldUri: e, newUri: t };
              return void 0 === n || (void 0 === n.overwrite && void 0 === n.ignoreIfExists) || (r.options = n), r;
            }),
              (e.is = function(e) {
                var t = e;
                return (
                  t &&
                  'rename' === t.kind &&
                  $.string(t.oldUri) &&
                  $.string(t.newUri) &&
                  (void 0 === t.options ||
                    ((void 0 === t.options.overwrite || $.boolean(t.options.overwrite)) &&
                      (void 0 === t.options.ignoreIfExists || $.boolean(t.options.ignoreIfExists))))
                );
              });
          })(m || (exports.RenameFile = m = {})),
          (exports.DeleteFile = h),
          (function(e) {
            (e.create = function(e, t) {
              var n = { kind: 'delete', uri: e };
              return void 0 === t || (void 0 === t.recursive && void 0 === t.ignoreIfNotExists) || (n.options = t), n;
            }),
              (e.is = function(e) {
                var t = e;
                return (
                  t &&
                  'delete' === t.kind &&
                  $.string(t.uri) &&
                  (void 0 === t.options ||
                    ((void 0 === t.options.recursive || $.boolean(t.options.recursive)) &&
                      (void 0 === t.options.ignoreIfNotExists || $.boolean(t.options.ignoreIfNotExists))))
                );
              });
          })(h || (exports.DeleteFile = h = {})),
          (exports.WorkspaceEdit = v),
          (function(e) {
            e.is = function(e) {
              var t = e;
              return (
                t &&
                (void 0 !== t.changes || void 0 !== t.documentChanges) &&
                (void 0 === t.documentChanges ||
                  t.documentChanges.every(function(e) {
                    return $.string(e.kind) ? x.is(e) || m.is(e) || h.is(e) : l.is(e);
                  }))
              );
            };
          })(v || (exports.WorkspaceEdit = v = {}));
        var b,
          C,
          y,
          k,
          E,
          I,
          D,
          w,
          _,
          T,
          S,
          R,
          L,
          A,
          F,
          O,
          M,
          P = (function() {
            function e(e) {
              this.edits = e;
            }
            return (
              (e.prototype.insert = function(e, t) {
                this.edits.push(g.insert(e, t));
              }),
              (e.prototype.replace = function(e, t) {
                this.edits.push(g.replace(e, t));
              }),
              (e.prototype.delete = function(e) {
                this.edits.push(g.del(e));
              }),
              (e.prototype.add = function(e) {
                this.edits.push(e);
              }),
              (e.prototype.all = function() {
                return this.edits;
              }),
              (e.prototype.clear = function() {
                this.edits.splice(0, this.edits.length);
              }),
              e
            );
          })(),
          j = (function() {
            function e(e) {
              var t = this;
              (this._textEditChanges = Object.create(null)),
                e &&
                  ((this._workspaceEdit = e),
                  e.documentChanges
                    ? e.documentChanges.forEach(function(e) {
                        if (l.is(e)) {
                          var n = new P(e.edits);
                          t._textEditChanges[e.textDocument.uri] = n;
                        }
                      })
                    : e.changes &&
                      Object.keys(e.changes).forEach(function(n) {
                        var r = new P(e.changes[n]);
                        t._textEditChanges[n] = r;
                      }));
            }
            return (
              Object.defineProperty(e.prototype, 'edit', {
                get: function() {
                  return this._workspaceEdit;
                },
                enumerable: !0,
                configurable: !0
              }),
              (e.prototype.getTextEditChange = function(e) {
                if (C.is(e)) {
                  if ((this._workspaceEdit || (this._workspaceEdit = { documentChanges: [] }), !this._workspaceEdit.documentChanges))
                    throw new Error('Workspace edit is not configured for document changes.');
                  var t = e;
                  if (!(r = this._textEditChanges[t.uri])) {
                    var n = { textDocument: t, edits: (i = []) };
                    this._workspaceEdit.documentChanges.push(n), (r = new P(i)), (this._textEditChanges[t.uri] = r);
                  }
                  return r;
                }
                if ((this._workspaceEdit || (this._workspaceEdit = { changes: Object.create(null) }), !this._workspaceEdit.changes))
                  throw new Error('Workspace edit is not configured for normal text edit changes.');
                var r;
                if (!(r = this._textEditChanges[e])) {
                  var i = [];
                  (this._workspaceEdit.changes[e] = i), (r = new P(i)), (this._textEditChanges[e] = r);
                }
                return r;
              }),
              (e.prototype.createFile = function(e, t) {
                this.checkDocumentChanges(), this._workspaceEdit.documentChanges.push(x.create(e, t));
              }),
              (e.prototype.renameFile = function(e, t, n) {
                this.checkDocumentChanges(), this._workspaceEdit.documentChanges.push(m.create(e, t, n));
              }),
              (e.prototype.deleteFile = function(e, t) {
                this.checkDocumentChanges(), this._workspaceEdit.documentChanges.push(h.create(e, t));
              }),
              (e.prototype.checkDocumentChanges = function() {
                if (!this._workspaceEdit || !this._workspaceEdit.documentChanges)
                  throw new Error('Workspace edit is not configured for document changes.');
              }),
              e
            );
          })();
        (exports.WorkspaceChange = j),
          (exports.TextDocumentIdentifier = b),
          (function(e) {
            (e.create = function(e) {
              return { uri: e };
            }),
              (e.is = function(e) {
                var t = e;
                return $.defined(t) && $.string(t.uri);
              });
          })(b || (exports.TextDocumentIdentifier = b = {})),
          (exports.VersionedTextDocumentIdentifier = C),
          (function(e) {
            (e.create = function(e, t) {
              return { uri: e, version: t };
            }),
              (e.is = function(e) {
                var t = e;
                return $.defined(t) && $.string(t.uri) && (null === t.version || $.number(t.version));
              });
          })(C || (exports.VersionedTextDocumentIdentifier = C = {})),
          (exports.TextDocumentItem = y),
          (function(e) {
            (e.create = function(e, t, n, r) {
              return { uri: e, languageId: t, version: n, text: r };
            }),
              (e.is = function(e) {
                var t = e;
                return $.defined(t) && $.string(t.uri) && $.string(t.languageId) && $.number(t.version) && $.string(t.text);
              });
          })(y || (exports.TextDocumentItem = y = {})),
          (exports.MarkupKind = k),
          (function(e) {
            (e.PlainText = 'plaintext'), (e.Markdown = 'markdown');
          })(k || (exports.MarkupKind = k = {})),
          (function(e) {
            e.is = function(t) {
              var n = t;
              return n === e.PlainText || n === e.Markdown;
            };
          })(k || (exports.MarkupKind = k = {})),
          (exports.MarkupContent = E),
          (function(e) {
            e.is = function(e) {
              var t = e;
              return $.objectLiteral(e) && k.is(t.kind) && $.string(t.value);
            };
          })(E || (exports.MarkupContent = E = {})),
          (exports.CompletionItemKind = I),
          (function(e) {
            (e.Text = 1),
              (e.Method = 2),
              (e.Function = 3),
              (e.Constructor = 4),
              (e.Field = 5),
              (e.Variable = 6),
              (e.Class = 7),
              (e.Interface = 8),
              (e.Module = 9),
              (e.Property = 10),
              (e.Unit = 11),
              (e.Value = 12),
              (e.Enum = 13),
              (e.Keyword = 14),
              (e.Snippet = 15),
              (e.Color = 16),
              (e.File = 17),
              (e.Reference = 18),
              (e.Folder = 19),
              (e.EnumMember = 20),
              (e.Constant = 21),
              (e.Struct = 22),
              (e.Event = 23),
              (e.Operator = 24),
              (e.TypeParameter = 25);
          })(I || (exports.CompletionItemKind = I = {})),
          (exports.InsertTextFormat = D),
          (function(e) {
            (e.PlainText = 1), (e.Snippet = 2);
          })(D || (exports.InsertTextFormat = D = {})),
          (exports.CompletionItem = w),
          (function(e) {
            e.create = function(e) {
              return { label: e };
            };
          })(w || (exports.CompletionItem = w = {})),
          (exports.CompletionList = _),
          (function(e) {
            e.create = function(e, t) {
              return { items: e || [], isIncomplete: !!t };
            };
          })(_ || (exports.CompletionList = _ = {})),
          (exports.MarkedString = T),
          (function(e) {
            (e.fromPlainText = function(e) {
              return e.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&');
            }),
              (e.is = function(e) {
                var t = e;
                return $.string(t) || ($.objectLiteral(t) && $.string(t.language) && $.string(t.value));
              });
          })(T || (exports.MarkedString = T = {})),
          (exports.Hover = S),
          (function(e) {
            e.is = function(e) {
              var n = e;
              return (
                !!n &&
                $.objectLiteral(n) &&
                (E.is(n.contents) || T.is(n.contents) || $.typedArray(n.contents, T.is)) &&
                (void 0 === e.range || t.is(e.range))
              );
            };
          })(S || (exports.Hover = S = {})),
          (exports.ParameterInformation = R),
          (function(e) {
            e.create = function(e, t) {
              return t ? { label: e, documentation: t } : { label: e };
            };
          })(R || (exports.ParameterInformation = R = {})),
          (exports.SignatureInformation = L),
          (function(e) {
            e.create = function(e, t) {
              for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
              var i = { label: e };
              return $.defined(t) && (i.documentation = t), $.defined(n) ? (i.parameters = n) : (i.parameters = []), i;
            };
          })(L || (exports.SignatureInformation = L = {})),
          (exports.DocumentHighlightKind = A),
          (function(e) {
            (e.Text = 1), (e.Read = 2), (e.Write = 3);
          })(A || (exports.DocumentHighlightKind = A = {})),
          (exports.DocumentHighlight = F),
          (function(e) {
            e.create = function(e, t) {
              var n = { range: e };
              return $.number(t) && (n.kind = t), n;
            };
          })(F || (exports.DocumentHighlight = F = {})),
          (exports.SymbolKind = O),
          (function(e) {
            (e.File = 1),
              (e.Module = 2),
              (e.Namespace = 3),
              (e.Package = 4),
              (e.Class = 5),
              (e.Method = 6),
              (e.Property = 7),
              (e.Field = 8),
              (e.Constructor = 9),
              (e.Enum = 10),
              (e.Interface = 11),
              (e.Function = 12),
              (e.Variable = 13),
              (e.Constant = 14),
              (e.String = 15),
              (e.Number = 16),
              (e.Boolean = 17),
              (e.Array = 18),
              (e.Object = 19),
              (e.Key = 20),
              (e.Null = 21),
              (e.EnumMember = 22),
              (e.Struct = 23),
              (e.Event = 24),
              (e.Operator = 25),
              (e.TypeParameter = 26);
          })(O || (exports.SymbolKind = O = {})),
          (exports.SymbolInformation = M),
          (function(e) {
            e.create = function(e, t, n, r, i) {
              var o = { name: e, kind: t, location: { uri: r, range: n } };
              return i && (o.containerName = i), o;
            };
          })(M || (exports.SymbolInformation = M = {}));
        var K,
          H,
          W,
          N,
          U,
          V = (function() {
            return function() {};
          })();
        (exports.DocumentSymbol = V),
          (function(e) {
            (e.create = function(e, t, n, r, i, o) {
              var s = { name: e, detail: t, kind: n, range: r, selectionRange: i };
              return void 0 !== o && (s.children = o), s;
            }),
              (e.is = function(e) {
                var n = e;
                return (
                  n &&
                  $.string(n.name) &&
                  $.number(n.kind) &&
                  t.is(n.range) &&
                  t.is(n.selectionRange) &&
                  (void 0 === n.detail || $.string(n.detail)) &&
                  (void 0 === n.deprecated || $.boolean(n.deprecated)) &&
                  (void 0 === n.children || Array.isArray(n.children))
                );
              });
          })(V || (exports.DocumentSymbol = V = {})),
          (exports.CodeActionKind = K),
          (function(e) {
            (e.QuickFix = 'quickfix'),
              (e.Refactor = 'refactor'),
              (e.RefactorExtract = 'refactor.extract'),
              (e.RefactorInline = 'refactor.inline'),
              (e.RefactorRewrite = 'refactor.rewrite'),
              (e.Source = 'source'),
              (e.SourceOrganizeImports = 'source.organizeImports');
          })(K || (exports.CodeActionKind = K = {})),
          (exports.CodeActionContext = H),
          (function(e) {
            (e.create = function(e, t) {
              var n = { diagnostics: e };
              return null != t && (n.only = t), n;
            }),
              (e.is = function(e) {
                var t = e;
                return $.defined(t) && $.typedArray(t.diagnostics, f.is) && (void 0 === t.only || $.typedArray(t.only, $.string));
              });
          })(H || (exports.CodeActionContext = H = {})),
          (exports.CodeAction = W),
          (function(e) {
            (e.create = function(e, t, n) {
              var r = { title: e };
              return p.is(t) ? (r.command = t) : (r.edit = t), void 0 !== n && (r.kind = n), r;
            }),
              (e.is = function(e) {
                var t = e;
                return (
                  t &&
                  $.string(t.title) &&
                  (void 0 === t.diagnostics || $.typedArray(t.diagnostics, f.is)) &&
                  (void 0 === t.kind || $.string(t.kind)) &&
                  (void 0 !== t.edit || void 0 !== t.command) &&
                  (void 0 === t.command || p.is(t.command)) &&
                  (void 0 === t.edit || v.is(t.edit))
                );
              });
          })(W || (exports.CodeAction = W = {})),
          (exports.CodeLens = N),
          (function(e) {
            (e.create = function(e, t) {
              var n = { range: e };
              return $.defined(t) && (n.data = t), n;
            }),
              (e.is = function(e) {
                var n = e;
                return $.defined(n) && t.is(n.range) && ($.undefined(n.command) || p.is(n.command));
              });
          })(N || (exports.CodeLens = N = {})),
          (exports.FormattingOptions = U),
          (function(e) {
            (e.create = function(e, t) {
              return { tabSize: e, insertSpaces: t };
            }),
              (e.is = function(e) {
                var t = e;
                return $.defined(t) && $.number(t.tabSize) && $.boolean(t.insertSpaces);
              });
          })(U || (exports.FormattingOptions = U = {}));
        var z = (function() {
          return function() {};
        })();
        (exports.DocumentLink = z),
          (function(e) {
            (e.create = function(e, t, n) {
              return { range: e, target: t, data: n };
            }),
              (e.is = function(e) {
                var n = e;
                return $.defined(n) && t.is(n.range) && ($.undefined(n.target) || $.string(n.target));
              });
          })(z || (exports.DocumentLink = z = {}));
        var q,
          B,
          Q = ['\n', '\r\n', '\r'];
        (exports.EOL = Q),
          (exports.TextDocument = q),
          (function(e) {
            (e.create = function(e, t, n, r) {
              return new G(e, t, n, r);
            }),
              (e.is = function(e) {
                var t = e;
                return !!(
                  $.defined(t) &&
                  $.string(t.uri) &&
                  ($.undefined(t.languageId) || $.string(t.languageId)) &&
                  $.number(t.lineCount) &&
                  $.func(t.getText) &&
                  $.func(t.positionAt) &&
                  $.func(t.offsetAt)
                );
              }),
              (e.applyEdits = function(e, t) {
                for (
                  var n = e.getText(),
                    r = (function e(t, n) {
                      if (t.length <= 1) return t;
                      var r = (t.length / 2) | 0,
                        i = t.slice(0, r),
                        o = t.slice(r);
                      e(i, n), e(o, n);
                      for (var s = 0, a = 0, c = 0; s < i.length && a < o.length; ) {
                        var u = n(i[s], o[a]);
                        t[c++] = u <= 0 ? i[s++] : o[a++];
                      }
                      for (; s < i.length; ) t[c++] = i[s++];
                      for (; a < o.length; ) t[c++] = o[a++];
                      return t;
                    })(t, function(e, t) {
                      var n = e.range.start.line - t.range.start.line;
                      return 0 === n ? e.range.start.character - t.range.start.character : n;
                    }),
                    i = n.length,
                    o = r.length - 1;
                  o >= 0;
                  o--
                ) {
                  var s = r[o],
                    a = e.offsetAt(s.range.start),
                    c = e.offsetAt(s.range.end);
                  if (!(c <= i)) throw new Error('Overlapping edit');
                  (n = n.substring(0, a) + s.newText + n.substring(c, n.length)), (i = a);
                }
                return n;
              });
          })(q || (exports.TextDocument = q = {})),
          (exports.TextDocumentSaveReason = B),
          (function(e) {
            (e.Manual = 1), (e.AfterDelay = 2), (e.FocusOut = 3);
          })(B || (exports.TextDocumentSaveReason = B = {}));
        var $,
          G = (function() {
            function t(e, t, n, r) {
              (this._uri = e), (this._languageId = t), (this._version = n), (this._content = r), (this._lineOffsets = null);
            }
            return (
              Object.defineProperty(t.prototype, 'uri', {
                get: function() {
                  return this._uri;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, 'languageId', {
                get: function() {
                  return this._languageId;
                },
                enumerable: !0,
                configurable: !0
              }),
              Object.defineProperty(t.prototype, 'version', {
                get: function() {
                  return this._version;
                },
                enumerable: !0,
                configurable: !0
              }),
              (t.prototype.getText = function(e) {
                if (e) {
                  var t = this.offsetAt(e.start),
                    n = this.offsetAt(e.end);
                  return this._content.substring(t, n);
                }
                return this._content;
              }),
              (t.prototype.update = function(e, t) {
                (this._content = e.text), (this._version = t), (this._lineOffsets = null);
              }),
              (t.prototype.getLineOffsets = function() {
                if (null === this._lineOffsets) {
                  for (var e = [], t = this._content, n = !0, r = 0; r < t.length; r++) {
                    n && (e.push(r), (n = !1));
                    var i = t.charAt(r);
                    (n = '\r' === i || '\n' === i), '\r' === i && r + 1 < t.length && '\n' === t.charAt(r + 1) && r++;
                  }
                  n && t.length > 0 && e.push(t.length), (this._lineOffsets = e);
                }
                return this._lineOffsets;
              }),
              (t.prototype.positionAt = function(t) {
                t = Math.max(Math.min(t, this._content.length), 0);
                var n = this.getLineOffsets(),
                  r = 0,
                  i = n.length;
                if (0 === i) return e.create(0, t);
                for (; r < i; ) {
                  var o = Math.floor((r + i) / 2);
                  n[o] > t ? (i = o) : (r = o + 1);
                }
                var s = r - 1;
                return e.create(s, t - n[s]);
              }),
              (t.prototype.offsetAt = function(e) {
                var t = this.getLineOffsets();
                if (e.line >= t.length) return this._content.length;
                if (e.line < 0) return 0;
                var n = t[e.line],
                  r = e.line + 1 < t.length ? t[e.line + 1] : this._content.length;
                return Math.max(Math.min(n + e.character, r), n);
              }),
              Object.defineProperty(t.prototype, 'lineCount', {
                get: function() {
                  return this.getLineOffsets().length;
                },
                enumerable: !0,
                configurable: !0
              }),
              t
            );
          })();
        !(function(e) {
          var t = Object.prototype.toString;
          (e.defined = function(e) {
            return void 0 !== e;
          }),
            (e.undefined = function(e) {
              return void 0 === e;
            }),
            (e.boolean = function(e) {
              return !0 === e || !1 === e;
            }),
            (e.string = function(e) {
              return '[object String]' === t.call(e);
            }),
            (e.number = function(e) {
              return '[object Number]' === t.call(e);
            }),
            (e.func = function(e) {
              return '[object Function]' === t.call(e);
            }),
            (e.objectLiteral = function(e) {
              return null !== e && 'object' == typeof e;
            }),
            (e.typedArray = function(e, t) {
              return Array.isArray(e) && e.every(t);
            });
        })($ || ($ = {}));
      },
      {}
    ],
    OFAP: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.entities = void 0);
        var r = {
          'Aacute;': 'Á',
          Aacute: 'Á',
          'aacute;': 'á',
          aacute: 'á',
          'Abreve;': 'Ă',
          'abreve;': 'ă',
          'ac;': '∾',
          'acd;': '∿',
          'acE;': '∾̳',
          'Acirc;': 'Â',
          Acirc: 'Â',
          'acirc;': 'â',
          acirc: 'â',
          'acute;': '´',
          acute: '´',
          'Acy;': 'А',
          'acy;': 'а',
          'AElig;': 'Æ',
          AElig: 'Æ',
          'aelig;': 'æ',
          aelig: 'æ',
          'af;': '⁡',
          'Afr;': '𝔄',
          'afr;': '𝔞',
          'Agrave;': 'À',
          Agrave: 'À',
          'agrave;': 'à',
          agrave: 'à',
          'alefsym;': 'ℵ',
          'aleph;': 'ℵ',
          'Alpha;': 'Α',
          'alpha;': 'α',
          'Amacr;': 'Ā',
          'amacr;': 'ā',
          'amalg;': '⨿',
          'AMP;': '&',
          AMP: '&',
          'amp;': '&',
          amp: '&',
          'And;': '⩓',
          'and;': '∧',
          'andand;': '⩕',
          'andd;': '⩜',
          'andslope;': '⩘',
          'andv;': '⩚',
          'ang;': '∠',
          'ange;': '⦤',
          'angle;': '∠',
          'angmsd;': '∡',
          'angmsdaa;': '⦨',
          'angmsdab;': '⦩',
          'angmsdac;': '⦪',
          'angmsdad;': '⦫',
          'angmsdae;': '⦬',
          'angmsdaf;': '⦭',
          'angmsdag;': '⦮',
          'angmsdah;': '⦯',
          'angrt;': '∟',
          'angrtvb;': '⊾',
          'angrtvbd;': '⦝',
          'angsph;': '∢',
          'angst;': 'Å',
          'angzarr;': '⍼',
          'Aogon;': 'Ą',
          'aogon;': 'ą',
          'Aopf;': '𝔸',
          'aopf;': '𝕒',
          'ap;': '≈',
          'apacir;': '⩯',
          'apE;': '⩰',
          'ape;': '≊',
          'apid;': '≋',
          'apos;': "'",
          'ApplyFunction;': '⁡',
          'approx;': '≈',
          'approxeq;': '≊',
          'Aring;': 'Å',
          Aring: 'Å',
          'aring;': 'å',
          aring: 'å',
          'Ascr;': '𝒜',
          'ascr;': '𝒶',
          'Assign;': '≔',
          'ast;': '*',
          'asymp;': '≈',
          'asympeq;': '≍',
          'Atilde;': 'Ã',
          Atilde: 'Ã',
          'atilde;': 'ã',
          atilde: 'ã',
          'Auml;': 'Ä',
          Auml: 'Ä',
          'auml;': 'ä',
          auml: 'ä',
          'awconint;': '∳',
          'awint;': '⨑',
          'backcong;': '≌',
          'backepsilon;': '϶',
          'backprime;': '‵',
          'backsim;': '∽',
          'backsimeq;': '⋍',
          'Backslash;': '∖',
          'Barv;': '⫧',
          'barvee;': '⊽',
          'Barwed;': '⌆',
          'barwed;': '⌅',
          'barwedge;': '⌅',
          'bbrk;': '⎵',
          'bbrktbrk;': '⎶',
          'bcong;': '≌',
          'Bcy;': 'Б',
          'bcy;': 'б',
          'bdquo;': '„',
          'becaus;': '∵',
          'Because;': '∵',
          'because;': '∵',
          'bemptyv;': '⦰',
          'bepsi;': '϶',
          'bernou;': 'ℬ',
          'Bernoullis;': 'ℬ',
          'Beta;': 'Β',
          'beta;': 'β',
          'beth;': 'ℶ',
          'between;': '≬',
          'Bfr;': '𝔅',
          'bfr;': '𝔟',
          'bigcap;': '⋂',
          'bigcirc;': '◯',
          'bigcup;': '⋃',
          'bigodot;': '⨀',
          'bigoplus;': '⨁',
          'bigotimes;': '⨂',
          'bigsqcup;': '⨆',
          'bigstar;': '★',
          'bigtriangledown;': '▽',
          'bigtriangleup;': '△',
          'biguplus;': '⨄',
          'bigvee;': '⋁',
          'bigwedge;': '⋀',
          'bkarow;': '⤍',
          'blacklozenge;': '⧫',
          'blacksquare;': '▪',
          'blacktriangle;': '▴',
          'blacktriangledown;': '▾',
          'blacktriangleleft;': '◂',
          'blacktriangleright;': '▸',
          'blank;': '␣',
          'blk12;': '▒',
          'blk14;': '░',
          'blk34;': '▓',
          'block;': '█',
          'bne;': '=⃥',
          'bnequiv;': '≡⃥',
          'bNot;': '⫭',
          'bnot;': '⌐',
          'Bopf;': '𝔹',
          'bopf;': '𝕓',
          'bot;': '⊥',
          'bottom;': '⊥',
          'bowtie;': '⋈',
          'boxbox;': '⧉',
          'boxDL;': '╗',
          'boxDl;': '╖',
          'boxdL;': '╕',
          'boxdl;': '┐',
          'boxDR;': '╔',
          'boxDr;': '╓',
          'boxdR;': '╒',
          'boxdr;': '┌',
          'boxH;': '═',
          'boxh;': '─',
          'boxHD;': '╦',
          'boxHd;': '╤',
          'boxhD;': '╥',
          'boxhd;': '┬',
          'boxHU;': '╩',
          'boxHu;': '╧',
          'boxhU;': '╨',
          'boxhu;': '┴',
          'boxminus;': '⊟',
          'boxplus;': '⊞',
          'boxtimes;': '⊠',
          'boxUL;': '╝',
          'boxUl;': '╜',
          'boxuL;': '╛',
          'boxul;': '┘',
          'boxUR;': '╚',
          'boxUr;': '╙',
          'boxuR;': '╘',
          'boxur;': '└',
          'boxV;': '║',
          'boxv;': '│',
          'boxVH;': '╬',
          'boxVh;': '╫',
          'boxvH;': '╪',
          'boxvh;': '┼',
          'boxVL;': '╣',
          'boxVl;': '╢',
          'boxvL;': '╡',
          'boxvl;': '┤',
          'boxVR;': '╠',
          'boxVr;': '╟',
          'boxvR;': '╞',
          'boxvr;': '├',
          'bprime;': '‵',
          'Breve;': '˘',
          'breve;': '˘',
          'brvbar;': '¦',
          brvbar: '¦',
          'Bscr;': 'ℬ',
          'bscr;': '𝒷',
          'bsemi;': '⁏',
          'bsim;': '∽',
          'bsime;': '⋍',
          'bsol;': '\\',
          'bsolb;': '⧅',
          'bsolhsub;': '⟈',
          'bull;': '•',
          'bullet;': '•',
          'bump;': '≎',
          'bumpE;': '⪮',
          'bumpe;': '≏',
          'Bumpeq;': '≎',
          'bumpeq;': '≏',
          'Cacute;': 'Ć',
          'cacute;': 'ć',
          'Cap;': '⋒',
          'cap;': '∩',
          'capand;': '⩄',
          'capbrcup;': '⩉',
          'capcap;': '⩋',
          'capcup;': '⩇',
          'capdot;': '⩀',
          'CapitalDifferentialD;': 'ⅅ',
          'caps;': '∩︀',
          'caret;': '⁁',
          'caron;': 'ˇ',
          'Cayleys;': 'ℭ',
          'ccaps;': '⩍',
          'Ccaron;': 'Č',
          'ccaron;': 'č',
          'Ccedil;': 'Ç',
          Ccedil: 'Ç',
          'ccedil;': 'ç',
          ccedil: 'ç',
          'Ccirc;': 'Ĉ',
          'ccirc;': 'ĉ',
          'Cconint;': '∰',
          'ccups;': '⩌',
          'ccupssm;': '⩐',
          'Cdot;': 'Ċ',
          'cdot;': 'ċ',
          'cedil;': '¸',
          cedil: '¸',
          'Cedilla;': '¸',
          'cemptyv;': '⦲',
          'cent;': '¢',
          cent: '¢',
          'CenterDot;': '·',
          'centerdot;': '·',
          'Cfr;': 'ℭ',
          'cfr;': '𝔠',
          'CHcy;': 'Ч',
          'chcy;': 'ч',
          'check;': '✓',
          'checkmark;': '✓',
          'Chi;': 'Χ',
          'chi;': 'χ',
          'cir;': '○',
          'circ;': 'ˆ',
          'circeq;': '≗',
          'circlearrowleft;': '↺',
          'circlearrowright;': '↻',
          'circledast;': '⊛',
          'circledcirc;': '⊚',
          'circleddash;': '⊝',
          'CircleDot;': '⊙',
          'circledR;': '®',
          'circledS;': 'Ⓢ',
          'CircleMinus;': '⊖',
          'CirclePlus;': '⊕',
          'CircleTimes;': '⊗',
          'cirE;': '⧃',
          'cire;': '≗',
          'cirfnint;': '⨐',
          'cirmid;': '⫯',
          'cirscir;': '⧂',
          'ClockwiseContourIntegral;': '∲',
          'CloseCurlyDoubleQuote;': '”',
          'CloseCurlyQuote;': '’',
          'clubs;': '♣',
          'clubsuit;': '♣',
          'Colon;': '∷',
          'colon;': ':',
          'Colone;': '⩴',
          'colone;': '≔',
          'coloneq;': '≔',
          'comma;': ',',
          'commat;': '@',
          'comp;': '∁',
          'compfn;': '∘',
          'complement;': '∁',
          'complexes;': 'ℂ',
          'cong;': '≅',
          'congdot;': '⩭',
          'Congruent;': '≡',
          'Conint;': '∯',
          'conint;': '∮',
          'ContourIntegral;': '∮',
          'Copf;': 'ℂ',
          'copf;': '𝕔',
          'coprod;': '∐',
          'Coproduct;': '∐',
          'COPY;': '©',
          COPY: '©',
          'copy;': '©',
          copy: '©',
          'copysr;': '℗',
          'CounterClockwiseContourIntegral;': '∳',
          'crarr;': '↵',
          'Cross;': '⨯',
          'cross;': '✗',
          'Cscr;': '𝒞',
          'cscr;': '𝒸',
          'csub;': '⫏',
          'csube;': '⫑',
          'csup;': '⫐',
          'csupe;': '⫒',
          'ctdot;': '⋯',
          'cudarrl;': '⤸',
          'cudarrr;': '⤵',
          'cuepr;': '⋞',
          'cuesc;': '⋟',
          'cularr;': '↶',
          'cularrp;': '⤽',
          'Cup;': '⋓',
          'cup;': '∪',
          'cupbrcap;': '⩈',
          'CupCap;': '≍',
          'cupcap;': '⩆',
          'cupcup;': '⩊',
          'cupdot;': '⊍',
          'cupor;': '⩅',
          'cups;': '∪︀',
          'curarr;': '↷',
          'curarrm;': '⤼',
          'curlyeqprec;': '⋞',
          'curlyeqsucc;': '⋟',
          'curlyvee;': '⋎',
          'curlywedge;': '⋏',
          'curren;': '¤',
          curren: '¤',
          'curvearrowleft;': '↶',
          'curvearrowright;': '↷',
          'cuvee;': '⋎',
          'cuwed;': '⋏',
          'cwconint;': '∲',
          'cwint;': '∱',
          'cylcty;': '⌭',
          'Dagger;': '‡',
          'dagger;': '†',
          'daleth;': 'ℸ',
          'Darr;': '↡',
          'dArr;': '⇓',
          'darr;': '↓',
          'dash;': '‐',
          'Dashv;': '⫤',
          'dashv;': '⊣',
          'dbkarow;': '⤏',
          'dblac;': '˝',
          'Dcaron;': 'Ď',
          'dcaron;': 'ď',
          'Dcy;': 'Д',
          'dcy;': 'д',
          'DD;': 'ⅅ',
          'dd;': 'ⅆ',
          'ddagger;': '‡',
          'ddarr;': '⇊',
          'DDotrahd;': '⤑',
          'ddotseq;': '⩷',
          'deg;': '°',
          deg: '°',
          'Del;': '∇',
          'Delta;': 'Δ',
          'delta;': 'δ',
          'demptyv;': '⦱',
          'dfisht;': '⥿',
          'Dfr;': '𝔇',
          'dfr;': '𝔡',
          'dHar;': '⥥',
          'dharl;': '⇃',
          'dharr;': '⇂',
          'DiacriticalAcute;': '´',
          'DiacriticalDot;': '˙',
          'DiacriticalDoubleAcute;': '˝',
          'DiacriticalGrave;': '`',
          'DiacriticalTilde;': '˜',
          'diam;': '⋄',
          'Diamond;': '⋄',
          'diamond;': '⋄',
          'diamondsuit;': '♦',
          'diams;': '♦',
          'die;': '¨',
          'DifferentialD;': 'ⅆ',
          'digamma;': 'ϝ',
          'disin;': '⋲',
          'div;': '÷',
          'divide;': '÷',
          divide: '÷',
          'divideontimes;': '⋇',
          'divonx;': '⋇',
          'DJcy;': 'Ђ',
          'djcy;': 'ђ',
          'dlcorn;': '⌞',
          'dlcrop;': '⌍',
          'dollar;': '$',
          'Dopf;': '𝔻',
          'dopf;': '𝕕',
          'Dot;': '¨',
          'dot;': '˙',
          'DotDot;': '⃜',
          'doteq;': '≐',
          'doteqdot;': '≑',
          'DotEqual;': '≐',
          'dotminus;': '∸',
          'dotplus;': '∔',
          'dotsquare;': '⊡',
          'doublebarwedge;': '⌆',
          'DoubleContourIntegral;': '∯',
          'DoubleDot;': '¨',
          'DoubleDownArrow;': '⇓',
          'DoubleLeftArrow;': '⇐',
          'DoubleLeftRightArrow;': '⇔',
          'DoubleLeftTee;': '⫤',
          'DoubleLongLeftArrow;': '⟸',
          'DoubleLongLeftRightArrow;': '⟺',
          'DoubleLongRightArrow;': '⟹',
          'DoubleRightArrow;': '⇒',
          'DoubleRightTee;': '⊨',
          'DoubleUpArrow;': '⇑',
          'DoubleUpDownArrow;': '⇕',
          'DoubleVerticalBar;': '∥',
          'DownArrow;': '↓',
          'Downarrow;': '⇓',
          'downarrow;': '↓',
          'DownArrowBar;': '⤓',
          'DownArrowUpArrow;': '⇵',
          'DownBreve;': '̑',
          'downdownarrows;': '⇊',
          'downharpoonleft;': '⇃',
          'downharpoonright;': '⇂',
          'DownLeftRightVector;': '⥐',
          'DownLeftTeeVector;': '⥞',
          'DownLeftVector;': '↽',
          'DownLeftVectorBar;': '⥖',
          'DownRightTeeVector;': '⥟',
          'DownRightVector;': '⇁',
          'DownRightVectorBar;': '⥗',
          'DownTee;': '⊤',
          'DownTeeArrow;': '↧',
          'drbkarow;': '⤐',
          'drcorn;': '⌟',
          'drcrop;': '⌌',
          'Dscr;': '𝒟',
          'dscr;': '𝒹',
          'DScy;': 'Ѕ',
          'dscy;': 'ѕ',
          'dsol;': '⧶',
          'Dstrok;': 'Đ',
          'dstrok;': 'đ',
          'dtdot;': '⋱',
          'dtri;': '▿',
          'dtrif;': '▾',
          'duarr;': '⇵',
          'duhar;': '⥯',
          'dwangle;': '⦦',
          'DZcy;': 'Џ',
          'dzcy;': 'џ',
          'dzigrarr;': '⟿',
          'Eacute;': 'É',
          Eacute: 'É',
          'eacute;': 'é',
          eacute: 'é',
          'easter;': '⩮',
          'Ecaron;': 'Ě',
          'ecaron;': 'ě',
          'ecir;': '≖',
          'Ecirc;': 'Ê',
          Ecirc: 'Ê',
          'ecirc;': 'ê',
          ecirc: 'ê',
          'ecolon;': '≕',
          'Ecy;': 'Э',
          'ecy;': 'э',
          'eDDot;': '⩷',
          'Edot;': 'Ė',
          'eDot;': '≑',
          'edot;': 'ė',
          'ee;': 'ⅇ',
          'efDot;': '≒',
          'Efr;': '𝔈',
          'efr;': '𝔢',
          'eg;': '⪚',
          'Egrave;': 'È',
          Egrave: 'È',
          'egrave;': 'è',
          egrave: 'è',
          'egs;': '⪖',
          'egsdot;': '⪘',
          'el;': '⪙',
          'Element;': '∈',
          'elinters;': '⏧',
          'ell;': 'ℓ',
          'els;': '⪕',
          'elsdot;': '⪗',
          'Emacr;': 'Ē',
          'emacr;': 'ē',
          'empty;': '∅',
          'emptyset;': '∅',
          'EmptySmallSquare;': '◻',
          'emptyv;': '∅',
          'EmptyVerySmallSquare;': '▫',
          'emsp;': ' ',
          'emsp13;': ' ',
          'emsp14;': ' ',
          'ENG;': 'Ŋ',
          'eng;': 'ŋ',
          'ensp;': ' ',
          'Eogon;': 'Ę',
          'eogon;': 'ę',
          'Eopf;': '𝔼',
          'eopf;': '𝕖',
          'epar;': '⋕',
          'eparsl;': '⧣',
          'eplus;': '⩱',
          'epsi;': 'ε',
          'Epsilon;': 'Ε',
          'epsilon;': 'ε',
          'epsiv;': 'ϵ',
          'eqcirc;': '≖',
          'eqcolon;': '≕',
          'eqsim;': '≂',
          'eqslantgtr;': '⪖',
          'eqslantless;': '⪕',
          'Equal;': '⩵',
          'equals;': '=',
          'EqualTilde;': '≂',
          'equest;': '≟',
          'Equilibrium;': '⇌',
          'equiv;': '≡',
          'equivDD;': '⩸',
          'eqvparsl;': '⧥',
          'erarr;': '⥱',
          'erDot;': '≓',
          'Escr;': 'ℰ',
          'escr;': 'ℯ',
          'esdot;': '≐',
          'Esim;': '⩳',
          'esim;': '≂',
          'Eta;': 'Η',
          'eta;': 'η',
          'ETH;': 'Ð',
          ETH: 'Ð',
          'eth;': 'ð',
          eth: 'ð',
          'Euml;': 'Ë',
          Euml: 'Ë',
          'euml;': 'ë',
          euml: 'ë',
          'euro;': '€',
          'excl;': '!',
          'exist;': '∃',
          'Exists;': '∃',
          'expectation;': 'ℰ',
          'ExponentialE;': 'ⅇ',
          'exponentiale;': 'ⅇ',
          'fallingdotseq;': '≒',
          'Fcy;': 'Ф',
          'fcy;': 'ф',
          'female;': '♀',
          'ffilig;': 'ﬃ',
          'fflig;': 'ﬀ',
          'ffllig;': 'ﬄ',
          'Ffr;': '𝔉',
          'ffr;': '𝔣',
          'filig;': 'ﬁ',
          'FilledSmallSquare;': '◼',
          'FilledVerySmallSquare;': '▪',
          'fjlig;': 'fj',
          'flat;': '♭',
          'fllig;': 'ﬂ',
          'fltns;': '▱',
          'fnof;': 'ƒ',
          'Fopf;': '𝔽',
          'fopf;': '𝕗',
          'ForAll;': '∀',
          'forall;': '∀',
          'fork;': '⋔',
          'forkv;': '⫙',
          'Fouriertrf;': 'ℱ',
          'fpartint;': '⨍',
          'frac12;': '½',
          frac12: '½',
          'frac13;': '⅓',
          'frac14;': '¼',
          frac14: '¼',
          'frac15;': '⅕',
          'frac16;': '⅙',
          'frac18;': '⅛',
          'frac23;': '⅔',
          'frac25;': '⅖',
          'frac34;': '¾',
          frac34: '¾',
          'frac35;': '⅗',
          'frac38;': '⅜',
          'frac45;': '⅘',
          'frac56;': '⅚',
          'frac58;': '⅝',
          'frac78;': '⅞',
          'frasl;': '⁄',
          'frown;': '⌢',
          'Fscr;': 'ℱ',
          'fscr;': '𝒻',
          'gacute;': 'ǵ',
          'Gamma;': 'Γ',
          'gamma;': 'γ',
          'Gammad;': 'Ϝ',
          'gammad;': 'ϝ',
          'gap;': '⪆',
          'Gbreve;': 'Ğ',
          'gbreve;': 'ğ',
          'Gcedil;': 'Ģ',
          'Gcirc;': 'Ĝ',
          'gcirc;': 'ĝ',
          'Gcy;': 'Г',
          'gcy;': 'г',
          'Gdot;': 'Ġ',
          'gdot;': 'ġ',
          'gE;': '≧',
          'ge;': '≥',
          'gEl;': '⪌',
          'gel;': '⋛',
          'geq;': '≥',
          'geqq;': '≧',
          'geqslant;': '⩾',
          'ges;': '⩾',
          'gescc;': '⪩',
          'gesdot;': '⪀',
          'gesdoto;': '⪂',
          'gesdotol;': '⪄',
          'gesl;': '⋛︀',
          'gesles;': '⪔',
          'Gfr;': '𝔊',
          'gfr;': '𝔤',
          'Gg;': '⋙',
          'gg;': '≫',
          'ggg;': '⋙',
          'gimel;': 'ℷ',
          'GJcy;': 'Ѓ',
          'gjcy;': 'ѓ',
          'gl;': '≷',
          'gla;': '⪥',
          'glE;': '⪒',
          'glj;': '⪤',
          'gnap;': '⪊',
          'gnapprox;': '⪊',
          'gnE;': '≩',
          'gne;': '⪈',
          'gneq;': '⪈',
          'gneqq;': '≩',
          'gnsim;': '⋧',
          'Gopf;': '𝔾',
          'gopf;': '𝕘',
          'grave;': '`',
          'GreaterEqual;': '≥',
          'GreaterEqualLess;': '⋛',
          'GreaterFullEqual;': '≧',
          'GreaterGreater;': '⪢',
          'GreaterLess;': '≷',
          'GreaterSlantEqual;': '⩾',
          'GreaterTilde;': '≳',
          'Gscr;': '𝒢',
          'gscr;': 'ℊ',
          'gsim;': '≳',
          'gsime;': '⪎',
          'gsiml;': '⪐',
          'GT;': '>',
          GT: '>',
          'Gt;': '≫',
          'gt;': '>',
          gt: '>',
          'gtcc;': '⪧',
          'gtcir;': '⩺',
          'gtdot;': '⋗',
          'gtlPar;': '⦕',
          'gtquest;': '⩼',
          'gtrapprox;': '⪆',
          'gtrarr;': '⥸',
          'gtrdot;': '⋗',
          'gtreqless;': '⋛',
          'gtreqqless;': '⪌',
          'gtrless;': '≷',
          'gtrsim;': '≳',
          'gvertneqq;': '≩︀',
          'gvnE;': '≩︀',
          'Hacek;': 'ˇ',
          'hairsp;': ' ',
          'half;': '½',
          'hamilt;': 'ℋ',
          'HARDcy;': 'Ъ',
          'hardcy;': 'ъ',
          'hArr;': '⇔',
          'harr;': '↔',
          'harrcir;': '⥈',
          'harrw;': '↭',
          'Hat;': '^',
          'hbar;': 'ℏ',
          'Hcirc;': 'Ĥ',
          'hcirc;': 'ĥ',
          'hearts;': '♥',
          'heartsuit;': '♥',
          'hellip;': '…',
          'hercon;': '⊹',
          'Hfr;': 'ℌ',
          'hfr;': '𝔥',
          'HilbertSpace;': 'ℋ',
          'hksearow;': '⤥',
          'hkswarow;': '⤦',
          'hoarr;': '⇿',
          'homtht;': '∻',
          'hookleftarrow;': '↩',
          'hookrightarrow;': '↪',
          'Hopf;': 'ℍ',
          'hopf;': '𝕙',
          'horbar;': '―',
          'HorizontalLine;': '─',
          'Hscr;': 'ℋ',
          'hscr;': '𝒽',
          'hslash;': 'ℏ',
          'Hstrok;': 'Ħ',
          'hstrok;': 'ħ',
          'HumpDownHump;': '≎',
          'HumpEqual;': '≏',
          'hybull;': '⁃',
          'hyphen;': '‐',
          'Iacute;': 'Í',
          Iacute: 'Í',
          'iacute;': 'í',
          iacute: 'í',
          'ic;': '⁣',
          'Icirc;': 'Î',
          Icirc: 'Î',
          'icirc;': 'î',
          icirc: 'î',
          'Icy;': 'И',
          'icy;': 'и',
          'Idot;': 'İ',
          'IEcy;': 'Е',
          'iecy;': 'е',
          'iexcl;': '¡',
          iexcl: '¡',
          'iff;': '⇔',
          'Ifr;': 'ℑ',
          'ifr;': '𝔦',
          'Igrave;': 'Ì',
          Igrave: 'Ì',
          'igrave;': 'ì',
          igrave: 'ì',
          'ii;': 'ⅈ',
          'iiiint;': '⨌',
          'iiint;': '∭',
          'iinfin;': '⧜',
          'iiota;': '℩',
          'IJlig;': 'Ĳ',
          'ijlig;': 'ĳ',
          'Im;': 'ℑ',
          'Imacr;': 'Ī',
          'imacr;': 'ī',
          'image;': 'ℑ',
          'ImaginaryI;': 'ⅈ',
          'imagline;': 'ℐ',
          'imagpart;': 'ℑ',
          'imath;': 'ı',
          'imof;': '⊷',
          'imped;': 'Ƶ',
          'Implies;': '⇒',
          'in;': '∈',
          'incare;': '℅',
          'infin;': '∞',
          'infintie;': '⧝',
          'inodot;': 'ı',
          'Int;': '∬',
          'int;': '∫',
          'intcal;': '⊺',
          'integers;': 'ℤ',
          'Integral;': '∫',
          'intercal;': '⊺',
          'Intersection;': '⋂',
          'intlarhk;': '⨗',
          'intprod;': '⨼',
          'InvisibleComma;': '⁣',
          'InvisibleTimes;': '⁢',
          'IOcy;': 'Ё',
          'iocy;': 'ё',
          'Iogon;': 'Į',
          'iogon;': 'į',
          'Iopf;': '𝕀',
          'iopf;': '𝕚',
          'Iota;': 'Ι',
          'iota;': 'ι',
          'iprod;': '⨼',
          'iquest;': '¿',
          iquest: '¿',
          'Iscr;': 'ℐ',
          'iscr;': '𝒾',
          'isin;': '∈',
          'isindot;': '⋵',
          'isinE;': '⋹',
          'isins;': '⋴',
          'isinsv;': '⋳',
          'isinv;': '∈',
          'it;': '⁢',
          'Itilde;': 'Ĩ',
          'itilde;': 'ĩ',
          'Iukcy;': 'І',
          'iukcy;': 'і',
          'Iuml;': 'Ï',
          Iuml: 'Ï',
          'iuml;': 'ï',
          iuml: 'ï',
          'Jcirc;': 'Ĵ',
          'jcirc;': 'ĵ',
          'Jcy;': 'Й',
          'jcy;': 'й',
          'Jfr;': '𝔍',
          'jfr;': '𝔧',
          'jmath;': 'ȷ',
          'Jopf;': '𝕁',
          'jopf;': '𝕛',
          'Jscr;': '𝒥',
          'jscr;': '𝒿',
          'Jsercy;': 'Ј',
          'jsercy;': 'ј',
          'Jukcy;': 'Є',
          'jukcy;': 'є',
          'Kappa;': 'Κ',
          'kappa;': 'κ',
          'kappav;': 'ϰ',
          'Kcedil;': 'Ķ',
          'kcedil;': 'ķ',
          'Kcy;': 'К',
          'kcy;': 'к',
          'Kfr;': '𝔎',
          'kfr;': '𝔨',
          'kgreen;': 'ĸ',
          'KHcy;': 'Х',
          'khcy;': 'х',
          'KJcy;': 'Ќ',
          'kjcy;': 'ќ',
          'Kopf;': '𝕂',
          'kopf;': '𝕜',
          'Kscr;': '𝒦',
          'kscr;': '𝓀',
          'lAarr;': '⇚',
          'Lacute;': 'Ĺ',
          'lacute;': 'ĺ',
          'laemptyv;': '⦴',
          'lagran;': 'ℒ',
          'Lambda;': 'Λ',
          'lambda;': 'λ',
          'Lang;': '⟪',
          'lang;': '⟨',
          'langd;': '⦑',
          'langle;': '⟨',
          'lap;': '⪅',
          'Laplacetrf;': 'ℒ',
          'laquo;': '«',
          laquo: '«',
          'Larr;': '↞',
          'lArr;': '⇐',
          'larr;': '←',
          'larrb;': '⇤',
          'larrbfs;': '⤟',
          'larrfs;': '⤝',
          'larrhk;': '↩',
          'larrlp;': '↫',
          'larrpl;': '⤹',
          'larrsim;': '⥳',
          'larrtl;': '↢',
          'lat;': '⪫',
          'lAtail;': '⤛',
          'latail;': '⤙',
          'late;': '⪭',
          'lates;': '⪭︀',
          'lBarr;': '⤎',
          'lbarr;': '⤌',
          'lbbrk;': '❲',
          'lbrace;': '{',
          'lbrack;': '[',
          'lbrke;': '⦋',
          'lbrksld;': '⦏',
          'lbrkslu;': '⦍',
          'Lcaron;': 'Ľ',
          'lcaron;': 'ľ',
          'Lcedil;': 'Ļ',
          'lcedil;': 'ļ',
          'lceil;': '⌈',
          'lcub;': '{',
          'Lcy;': 'Л',
          'lcy;': 'л',
          'ldca;': '⤶',
          'ldquo;': '“',
          'ldquor;': '„',
          'ldrdhar;': '⥧',
          'ldrushar;': '⥋',
          'ldsh;': '↲',
          'lE;': '≦',
          'le;': '≤',
          'LeftAngleBracket;': '⟨',
          'LeftArrow;': '←',
          'Leftarrow;': '⇐',
          'leftarrow;': '←',
          'LeftArrowBar;': '⇤',
          'LeftArrowRightArrow;': '⇆',
          'leftarrowtail;': '↢',
          'LeftCeiling;': '⌈',
          'LeftDoubleBracket;': '⟦',
          'LeftDownTeeVector;': '⥡',
          'LeftDownVector;': '⇃',
          'LeftDownVectorBar;': '⥙',
          'LeftFloor;': '⌊',
          'leftharpoondown;': '↽',
          'leftharpoonup;': '↼',
          'leftleftarrows;': '⇇',
          'LeftRightArrow;': '↔',
          'Leftrightarrow;': '⇔',
          'leftrightarrow;': '↔',
          'leftrightarrows;': '⇆',
          'leftrightharpoons;': '⇋',
          'leftrightsquigarrow;': '↭',
          'LeftRightVector;': '⥎',
          'LeftTee;': '⊣',
          'LeftTeeArrow;': '↤',
          'LeftTeeVector;': '⥚',
          'leftthreetimes;': '⋋',
          'LeftTriangle;': '⊲',
          'LeftTriangleBar;': '⧏',
          'LeftTriangleEqual;': '⊴',
          'LeftUpDownVector;': '⥑',
          'LeftUpTeeVector;': '⥠',
          'LeftUpVector;': '↿',
          'LeftUpVectorBar;': '⥘',
          'LeftVector;': '↼',
          'LeftVectorBar;': '⥒',
          'lEg;': '⪋',
          'leg;': '⋚',
          'leq;': '≤',
          'leqq;': '≦',
          'leqslant;': '⩽',
          'les;': '⩽',
          'lescc;': '⪨',
          'lesdot;': '⩿',
          'lesdoto;': '⪁',
          'lesdotor;': '⪃',
          'lesg;': '⋚︀',
          'lesges;': '⪓',
          'lessapprox;': '⪅',
          'lessdot;': '⋖',
          'lesseqgtr;': '⋚',
          'lesseqqgtr;': '⪋',
          'LessEqualGreater;': '⋚',
          'LessFullEqual;': '≦',
          'LessGreater;': '≶',
          'lessgtr;': '≶',
          'LessLess;': '⪡',
          'lesssim;': '≲',
          'LessSlantEqual;': '⩽',
          'LessTilde;': '≲',
          'lfisht;': '⥼',
          'lfloor;': '⌊',
          'Lfr;': '𝔏',
          'lfr;': '𝔩',
          'lg;': '≶',
          'lgE;': '⪑',
          'lHar;': '⥢',
          'lhard;': '↽',
          'lharu;': '↼',
          'lharul;': '⥪',
          'lhblk;': '▄',
          'LJcy;': 'Љ',
          'ljcy;': 'љ',
          'Ll;': '⋘',
          'll;': '≪',
          'llarr;': '⇇',
          'llcorner;': '⌞',
          'Lleftarrow;': '⇚',
          'llhard;': '⥫',
          'lltri;': '◺',
          'Lmidot;': 'Ŀ',
          'lmidot;': 'ŀ',
          'lmoust;': '⎰',
          'lmoustache;': '⎰',
          'lnap;': '⪉',
          'lnapprox;': '⪉',
          'lnE;': '≨',
          'lne;': '⪇',
          'lneq;': '⪇',
          'lneqq;': '≨',
          'lnsim;': '⋦',
          'loang;': '⟬',
          'loarr;': '⇽',
          'lobrk;': '⟦',
          'LongLeftArrow;': '⟵',
          'Longleftarrow;': '⟸',
          'longleftarrow;': '⟵',
          'LongLeftRightArrow;': '⟷',
          'Longleftrightarrow;': '⟺',
          'longleftrightarrow;': '⟷',
          'longmapsto;': '⟼',
          'LongRightArrow;': '⟶',
          'Longrightarrow;': '⟹',
          'longrightarrow;': '⟶',
          'looparrowleft;': '↫',
          'looparrowright;': '↬',
          'lopar;': '⦅',
          'Lopf;': '𝕃',
          'lopf;': '𝕝',
          'loplus;': '⨭',
          'lotimes;': '⨴',
          'lowast;': '∗',
          'lowbar;': '_',
          'LowerLeftArrow;': '↙',
          'LowerRightArrow;': '↘',
          'loz;': '◊',
          'lozenge;': '◊',
          'lozf;': '⧫',
          'lpar;': '(',
          'lparlt;': '⦓',
          'lrarr;': '⇆',
          'lrcorner;': '⌟',
          'lrhar;': '⇋',
          'lrhard;': '⥭',
          'lrm;': '‎',
          'lrtri;': '⊿',
          'lsaquo;': '‹',
          'Lscr;': 'ℒ',
          'lscr;': '𝓁',
          'Lsh;': '↰',
          'lsh;': '↰',
          'lsim;': '≲',
          'lsime;': '⪍',
          'lsimg;': '⪏',
          'lsqb;': '[',
          'lsquo;': '‘',
          'lsquor;': '‚',
          'Lstrok;': 'Ł',
          'lstrok;': 'ł',
          'LT;': '<',
          LT: '<',
          'Lt;': '≪',
          'lt;': '<',
          lt: '<',
          'ltcc;': '⪦',
          'ltcir;': '⩹',
          'ltdot;': '⋖',
          'lthree;': '⋋',
          'ltimes;': '⋉',
          'ltlarr;': '⥶',
          'ltquest;': '⩻',
          'ltri;': '◃',
          'ltrie;': '⊴',
          'ltrif;': '◂',
          'ltrPar;': '⦖',
          'lurdshar;': '⥊',
          'luruhar;': '⥦',
          'lvertneqq;': '≨︀',
          'lvnE;': '≨︀',
          'macr;': '¯',
          macr: '¯',
          'male;': '♂',
          'malt;': '✠',
          'maltese;': '✠',
          'Map;': '⤅',
          'map;': '↦',
          'mapsto;': '↦',
          'mapstodown;': '↧',
          'mapstoleft;': '↤',
          'mapstoup;': '↥',
          'marker;': '▮',
          'mcomma;': '⨩',
          'Mcy;': 'М',
          'mcy;': 'м',
          'mdash;': '—',
          'mDDot;': '∺',
          'measuredangle;': '∡',
          'MediumSpace;': ' ',
          'Mellintrf;': 'ℳ',
          'Mfr;': '𝔐',
          'mfr;': '𝔪',
          'mho;': '℧',
          'micro;': 'µ',
          micro: 'µ',
          'mid;': '∣',
          'midast;': '*',
          'midcir;': '⫰',
          'middot;': '·',
          middot: '·',
          'minus;': '−',
          'minusb;': '⊟',
          'minusd;': '∸',
          'minusdu;': '⨪',
          'MinusPlus;': '∓',
          'mlcp;': '⫛',
          'mldr;': '…',
          'mnplus;': '∓',
          'models;': '⊧',
          'Mopf;': '𝕄',
          'mopf;': '𝕞',
          'mp;': '∓',
          'Mscr;': 'ℳ',
          'mscr;': '𝓂',
          'mstpos;': '∾',
          'Mu;': 'Μ',
          'mu;': 'μ',
          'multimap;': '⊸',
          'mumap;': '⊸',
          'nabla;': '∇',
          'Nacute;': 'Ń',
          'nacute;': 'ń',
          'nang;': '∠⃒',
          'nap;': '≉',
          'napE;': '⩰̸',
          'napid;': '≋̸',
          'napos;': 'ŉ',
          'napprox;': '≉',
          'natur;': '♮',
          'natural;': '♮',
          'naturals;': 'ℕ',
          'nbsp;': ' ',
          nbsp: ' ',
          'nbump;': '≎̸',
          'nbumpe;': '≏̸',
          'ncap;': '⩃',
          'Ncaron;': 'Ň',
          'ncaron;': 'ň',
          'Ncedil;': 'Ņ',
          'ncedil;': 'ņ',
          'ncong;': '≇',
          'ncongdot;': '⩭̸',
          'ncup;': '⩂',
          'Ncy;': 'Н',
          'ncy;': 'н',
          'ndash;': '–',
          'ne;': '≠',
          'nearhk;': '⤤',
          'neArr;': '⇗',
          'nearr;': '↗',
          'nearrow;': '↗',
          'nedot;': '≐̸',
          'NegativeMediumSpace;': '​',
          'NegativeThickSpace;': '​',
          'NegativeThinSpace;': '​',
          'NegativeVeryThinSpace;': '​',
          'nequiv;': '≢',
          'nesear;': '⤨',
          'nesim;': '≂̸',
          'NestedGreaterGreater;': '≫',
          'NestedLessLess;': '≪',
          'NewLine;': '\n',
          'nexist;': '∄',
          'nexists;': '∄',
          'Nfr;': '𝔑',
          'nfr;': '𝔫',
          'ngE;': '≧̸',
          'nge;': '≱',
          'ngeq;': '≱',
          'ngeqq;': '≧̸',
          'ngeqslant;': '⩾̸',
          'nges;': '⩾̸',
          'nGg;': '⋙̸',
          'ngsim;': '≵',
          'nGt;': '≫⃒',
          'ngt;': '≯',
          'ngtr;': '≯',
          'nGtv;': '≫̸',
          'nhArr;': '⇎',
          'nharr;': '↮',
          'nhpar;': '⫲',
          'ni;': '∋',
          'nis;': '⋼',
          'nisd;': '⋺',
          'niv;': '∋',
          'NJcy;': 'Њ',
          'njcy;': 'њ',
          'nlArr;': '⇍',
          'nlarr;': '↚',
          'nldr;': '‥',
          'nlE;': '≦̸',
          'nle;': '≰',
          'nLeftarrow;': '⇍',
          'nleftarrow;': '↚',
          'nLeftrightarrow;': '⇎',
          'nleftrightarrow;': '↮',
          'nleq;': '≰',
          'nleqq;': '≦̸',
          'nleqslant;': '⩽̸',
          'nles;': '⩽̸',
          'nless;': '≮',
          'nLl;': '⋘̸',
          'nlsim;': '≴',
          'nLt;': '≪⃒',
          'nlt;': '≮',
          'nltri;': '⋪',
          'nltrie;': '⋬',
          'nLtv;': '≪̸',
          'nmid;': '∤',
          'NoBreak;': '⁠',
          'NonBreakingSpace;': ' ',
          'Nopf;': 'ℕ',
          'nopf;': '𝕟',
          'Not;': '⫬',
          'not;': '¬',
          not: '¬',
          'NotCongruent;': '≢',
          'NotCupCap;': '≭',
          'NotDoubleVerticalBar;': '∦',
          'NotElement;': '∉',
          'NotEqual;': '≠',
          'NotEqualTilde;': '≂̸',
          'NotExists;': '∄',
          'NotGreater;': '≯',
          'NotGreaterEqual;': '≱',
          'NotGreaterFullEqual;': '≧̸',
          'NotGreaterGreater;': '≫̸',
          'NotGreaterLess;': '≹',
          'NotGreaterSlantEqual;': '⩾̸',
          'NotGreaterTilde;': '≵',
          'NotHumpDownHump;': '≎̸',
          'NotHumpEqual;': '≏̸',
          'notin;': '∉',
          'notindot;': '⋵̸',
          'notinE;': '⋹̸',
          'notinva;': '∉',
          'notinvb;': '⋷',
          'notinvc;': '⋶',
          'NotLeftTriangle;': '⋪',
          'NotLeftTriangleBar;': '⧏̸',
          'NotLeftTriangleEqual;': '⋬',
          'NotLess;': '≮',
          'NotLessEqual;': '≰',
          'NotLessGreater;': '≸',
          'NotLessLess;': '≪̸',
          'NotLessSlantEqual;': '⩽̸',
          'NotLessTilde;': '≴',
          'NotNestedGreaterGreater;': '⪢̸',
          'NotNestedLessLess;': '⪡̸',
          'notni;': '∌',
          'notniva;': '∌',
          'notnivb;': '⋾',
          'notnivc;': '⋽',
          'NotPrecedes;': '⊀',
          'NotPrecedesEqual;': '⪯̸',
          'NotPrecedesSlantEqual;': '⋠',
          'NotReverseElement;': '∌',
          'NotRightTriangle;': '⋫',
          'NotRightTriangleBar;': '⧐̸',
          'NotRightTriangleEqual;': '⋭',
          'NotSquareSubset;': '⊏̸',
          'NotSquareSubsetEqual;': '⋢',
          'NotSquareSuperset;': '⊐̸',
          'NotSquareSupersetEqual;': '⋣',
          'NotSubset;': '⊂⃒',
          'NotSubsetEqual;': '⊈',
          'NotSucceeds;': '⊁',
          'NotSucceedsEqual;': '⪰̸',
          'NotSucceedsSlantEqual;': '⋡',
          'NotSucceedsTilde;': '≿̸',
          'NotSuperset;': '⊃⃒',
          'NotSupersetEqual;': '⊉',
          'NotTilde;': '≁',
          'NotTildeEqual;': '≄',
          'NotTildeFullEqual;': '≇',
          'NotTildeTilde;': '≉',
          'NotVerticalBar;': '∤',
          'npar;': '∦',
          'nparallel;': '∦',
          'nparsl;': '⫽⃥',
          'npart;': '∂̸',
          'npolint;': '⨔',
          'npr;': '⊀',
          'nprcue;': '⋠',
          'npre;': '⪯̸',
          'nprec;': '⊀',
          'npreceq;': '⪯̸',
          'nrArr;': '⇏',
          'nrarr;': '↛',
          'nrarrc;': '⤳̸',
          'nrarrw;': '↝̸',
          'nRightarrow;': '⇏',
          'nrightarrow;': '↛',
          'nrtri;': '⋫',
          'nrtrie;': '⋭',
          'nsc;': '⊁',
          'nsccue;': '⋡',
          'nsce;': '⪰̸',
          'Nscr;': '𝒩',
          'nscr;': '𝓃',
          'nshortmid;': '∤',
          'nshortparallel;': '∦',
          'nsim;': '≁',
          'nsime;': '≄',
          'nsimeq;': '≄',
          'nsmid;': '∤',
          'nspar;': '∦',
          'nsqsube;': '⋢',
          'nsqsupe;': '⋣',
          'nsub;': '⊄',
          'nsubE;': '⫅̸',
          'nsube;': '⊈',
          'nsubset;': '⊂⃒',
          'nsubseteq;': '⊈',
          'nsubseteqq;': '⫅̸',
          'nsucc;': '⊁',
          'nsucceq;': '⪰̸',
          'nsup;': '⊅',
          'nsupE;': '⫆̸',
          'nsupe;': '⊉',
          'nsupset;': '⊃⃒',
          'nsupseteq;': '⊉',
          'nsupseteqq;': '⫆̸',
          'ntgl;': '≹',
          'Ntilde;': 'Ñ',
          Ntilde: 'Ñ',
          'ntilde;': 'ñ',
          ntilde: 'ñ',
          'ntlg;': '≸',
          'ntriangleleft;': '⋪',
          'ntrianglelefteq;': '⋬',
          'ntriangleright;': '⋫',
          'ntrianglerighteq;': '⋭',
          'Nu;': 'Ν',
          'nu;': 'ν',
          'num;': '#',
          'numero;': '№',
          'numsp;': ' ',
          'nvap;': '≍⃒',
          'nVDash;': '⊯',
          'nVdash;': '⊮',
          'nvDash;': '⊭',
          'nvdash;': '⊬',
          'nvge;': '≥⃒',
          'nvgt;': '>⃒',
          'nvHarr;': '⤄',
          'nvinfin;': '⧞',
          'nvlArr;': '⤂',
          'nvle;': '≤⃒',
          'nvlt;': '<⃒',
          'nvltrie;': '⊴⃒',
          'nvrArr;': '⤃',
          'nvrtrie;': '⊵⃒',
          'nvsim;': '∼⃒',
          'nwarhk;': '⤣',
          'nwArr;': '⇖',
          'nwarr;': '↖',
          'nwarrow;': '↖',
          'nwnear;': '⤧',
          'Oacute;': 'Ó',
          Oacute: 'Ó',
          'oacute;': 'ó',
          oacute: 'ó',
          'oast;': '⊛',
          'ocir;': '⊚',
          'Ocirc;': 'Ô',
          Ocirc: 'Ô',
          'ocirc;': 'ô',
          ocirc: 'ô',
          'Ocy;': 'О',
          'ocy;': 'о',
          'odash;': '⊝',
          'Odblac;': 'Ő',
          'odblac;': 'ő',
          'odiv;': '⨸',
          'odot;': '⊙',
          'odsold;': '⦼',
          'OElig;': 'Œ',
          'oelig;': 'œ',
          'ofcir;': '⦿',
          'Ofr;': '𝔒',
          'ofr;': '𝔬',
          'ogon;': '˛',
          'Ograve;': 'Ò',
          Ograve: 'Ò',
          'ograve;': 'ò',
          ograve: 'ò',
          'ogt;': '⧁',
          'ohbar;': '⦵',
          'ohm;': 'Ω',
          'oint;': '∮',
          'olarr;': '↺',
          'olcir;': '⦾',
          'olcross;': '⦻',
          'oline;': '‾',
          'olt;': '⧀',
          'Omacr;': 'Ō',
          'omacr;': 'ō',
          'Omega;': 'Ω',
          'omega;': 'ω',
          'Omicron;': 'Ο',
          'omicron;': 'ο',
          'omid;': '⦶',
          'ominus;': '⊖',
          'Oopf;': '𝕆',
          'oopf;': '𝕠',
          'opar;': '⦷',
          'OpenCurlyDoubleQuote;': '“',
          'OpenCurlyQuote;': '‘',
          'operp;': '⦹',
          'oplus;': '⊕',
          'Or;': '⩔',
          'or;': '∨',
          'orarr;': '↻',
          'ord;': '⩝',
          'order;': 'ℴ',
          'orderof;': 'ℴ',
          'ordf;': 'ª',
          ordf: 'ª',
          'ordm;': 'º',
          ordm: 'º',
          'origof;': '⊶',
          'oror;': '⩖',
          'orslope;': '⩗',
          'orv;': '⩛',
          'oS;': 'Ⓢ',
          'Oscr;': '𝒪',
          'oscr;': 'ℴ',
          'Oslash;': 'Ø',
          Oslash: 'Ø',
          'oslash;': 'ø',
          oslash: 'ø',
          'osol;': '⊘',
          'Otilde;': 'Õ',
          Otilde: 'Õ',
          'otilde;': 'õ',
          otilde: 'õ',
          'Otimes;': '⨷',
          'otimes;': '⊗',
          'otimesas;': '⨶',
          'Ouml;': 'Ö',
          Ouml: 'Ö',
          'ouml;': 'ö',
          ouml: 'ö',
          'ovbar;': '⌽',
          'OverBar;': '‾',
          'OverBrace;': '⏞',
          'OverBracket;': '⎴',
          'OverParenthesis;': '⏜',
          'par;': '∥',
          'para;': '¶',
          para: '¶',
          'parallel;': '∥',
          'parsim;': '⫳',
          'parsl;': '⫽',
          'part;': '∂',
          'PartialD;': '∂',
          'Pcy;': 'П',
          'pcy;': 'п',
          'percnt;': '%',
          'period;': '.',
          'permil;': '‰',
          'perp;': '⊥',
          'pertenk;': '‱',
          'Pfr;': '𝔓',
          'pfr;': '𝔭',
          'Phi;': 'Φ',
          'phi;': 'φ',
          'phiv;': 'ϕ',
          'phmmat;': 'ℳ',
          'phone;': '☎',
          'Pi;': 'Π',
          'pi;': 'π',
          'pitchfork;': '⋔',
          'piv;': 'ϖ',
          'planck;': 'ℏ',
          'planckh;': 'ℎ',
          'plankv;': 'ℏ',
          'plus;': '+',
          'plusacir;': '⨣',
          'plusb;': '⊞',
          'pluscir;': '⨢',
          'plusdo;': '∔',
          'plusdu;': '⨥',
          'pluse;': '⩲',
          'PlusMinus;': '±',
          'plusmn;': '±',
          plusmn: '±',
          'plussim;': '⨦',
          'plustwo;': '⨧',
          'pm;': '±',
          'Poincareplane;': 'ℌ',
          'pointint;': '⨕',
          'Popf;': 'ℙ',
          'popf;': '𝕡',
          'pound;': '£',
          pound: '£',
          'Pr;': '⪻',
          'pr;': '≺',
          'prap;': '⪷',
          'prcue;': '≼',
          'prE;': '⪳',
          'pre;': '⪯',
          'prec;': '≺',
          'precapprox;': '⪷',
          'preccurlyeq;': '≼',
          'Precedes;': '≺',
          'PrecedesEqual;': '⪯',
          'PrecedesSlantEqual;': '≼',
          'PrecedesTilde;': '≾',
          'preceq;': '⪯',
          'precnapprox;': '⪹',
          'precneqq;': '⪵',
          'precnsim;': '⋨',
          'precsim;': '≾',
          'Prime;': '″',
          'prime;': '′',
          'primes;': 'ℙ',
          'prnap;': '⪹',
          'prnE;': '⪵',
          'prnsim;': '⋨',
          'prod;': '∏',
          'Product;': '∏',
          'profalar;': '⌮',
          'profline;': '⌒',
          'profsurf;': '⌓',
          'prop;': '∝',
          'Proportion;': '∷',
          'Proportional;': '∝',
          'propto;': '∝',
          'prsim;': '≾',
          'prurel;': '⊰',
          'Pscr;': '𝒫',
          'pscr;': '𝓅',
          'Psi;': 'Ψ',
          'psi;': 'ψ',
          'puncsp;': ' ',
          'Qfr;': '𝔔',
          'qfr;': '𝔮',
          'qint;': '⨌',
          'Qopf;': 'ℚ',
          'qopf;': '𝕢',
          'qprime;': '⁗',
          'Qscr;': '𝒬',
          'qscr;': '𝓆',
          'quaternions;': 'ℍ',
          'quatint;': '⨖',
          'quest;': '?',
          'questeq;': '≟',
          'QUOT;': '"',
          QUOT: '"',
          'quot;': '"',
          quot: '"',
          'rAarr;': '⇛',
          'race;': '∽̱',
          'Racute;': 'Ŕ',
          'racute;': 'ŕ',
          'radic;': '√',
          'raemptyv;': '⦳',
          'Rang;': '⟫',
          'rang;': '⟩',
          'rangd;': '⦒',
          'range;': '⦥',
          'rangle;': '⟩',
          'raquo;': '»',
          raquo: '»',
          'Rarr;': '↠',
          'rArr;': '⇒',
          'rarr;': '→',
          'rarrap;': '⥵',
          'rarrb;': '⇥',
          'rarrbfs;': '⤠',
          'rarrc;': '⤳',
          'rarrfs;': '⤞',
          'rarrhk;': '↪',
          'rarrlp;': '↬',
          'rarrpl;': '⥅',
          'rarrsim;': '⥴',
          'Rarrtl;': '⤖',
          'rarrtl;': '↣',
          'rarrw;': '↝',
          'rAtail;': '⤜',
          'ratail;': '⤚',
          'ratio;': '∶',
          'rationals;': 'ℚ',
          'RBarr;': '⤐',
          'rBarr;': '⤏',
          'rbarr;': '⤍',
          'rbbrk;': '❳',
          'rbrace;': '}',
          'rbrack;': ']',
          'rbrke;': '⦌',
          'rbrksld;': '⦎',
          'rbrkslu;': '⦐',
          'Rcaron;': 'Ř',
          'rcaron;': 'ř',
          'Rcedil;': 'Ŗ',
          'rcedil;': 'ŗ',
          'rceil;': '⌉',
          'rcub;': '}',
          'Rcy;': 'Р',
          'rcy;': 'р',
          'rdca;': '⤷',
          'rdldhar;': '⥩',
          'rdquo;': '”',
          'rdquor;': '”',
          'rdsh;': '↳',
          'Re;': 'ℜ',
          'real;': 'ℜ',
          'realine;': 'ℛ',
          'realpart;': 'ℜ',
          'reals;': 'ℝ',
          'rect;': '▭',
          'REG;': '®',
          REG: '®',
          'reg;': '®',
          reg: '®',
          'ReverseElement;': '∋',
          'ReverseEquilibrium;': '⇋',
          'ReverseUpEquilibrium;': '⥯',
          'rfisht;': '⥽',
          'rfloor;': '⌋',
          'Rfr;': 'ℜ',
          'rfr;': '𝔯',
          'rHar;': '⥤',
          'rhard;': '⇁',
          'rharu;': '⇀',
          'rharul;': '⥬',
          'Rho;': 'Ρ',
          'rho;': 'ρ',
          'rhov;': 'ϱ',
          'RightAngleBracket;': '⟩',
          'RightArrow;': '→',
          'Rightarrow;': '⇒',
          'rightarrow;': '→',
          'RightArrowBar;': '⇥',
          'RightArrowLeftArrow;': '⇄',
          'rightarrowtail;': '↣',
          'RightCeiling;': '⌉',
          'RightDoubleBracket;': '⟧',
          'RightDownTeeVector;': '⥝',
          'RightDownVector;': '⇂',
          'RightDownVectorBar;': '⥕',
          'RightFloor;': '⌋',
          'rightharpoondown;': '⇁',
          'rightharpoonup;': '⇀',
          'rightleftarrows;': '⇄',
          'rightleftharpoons;': '⇌',
          'rightrightarrows;': '⇉',
          'rightsquigarrow;': '↝',
          'RightTee;': '⊢',
          'RightTeeArrow;': '↦',
          'RightTeeVector;': '⥛',
          'rightthreetimes;': '⋌',
          'RightTriangle;': '⊳',
          'RightTriangleBar;': '⧐',
          'RightTriangleEqual;': '⊵',
          'RightUpDownVector;': '⥏',
          'RightUpTeeVector;': '⥜',
          'RightUpVector;': '↾',
          'RightUpVectorBar;': '⥔',
          'RightVector;': '⇀',
          'RightVectorBar;': '⥓',
          'ring;': '˚',
          'risingdotseq;': '≓',
          'rlarr;': '⇄',
          'rlhar;': '⇌',
          'rlm;': '‏',
          'rmoust;': '⎱',
          'rmoustache;': '⎱',
          'rnmid;': '⫮',
          'roang;': '⟭',
          'roarr;': '⇾',
          'robrk;': '⟧',
          'ropar;': '⦆',
          'Ropf;': 'ℝ',
          'ropf;': '𝕣',
          'roplus;': '⨮',
          'rotimes;': '⨵',
          'RoundImplies;': '⥰',
          'rpar;': ')',
          'rpargt;': '⦔',
          'rppolint;': '⨒',
          'rrarr;': '⇉',
          'Rrightarrow;': '⇛',
          'rsaquo;': '›',
          'Rscr;': 'ℛ',
          'rscr;': '𝓇',
          'Rsh;': '↱',
          'rsh;': '↱',
          'rsqb;': ']',
          'rsquo;': '’',
          'rsquor;': '’',
          'rthree;': '⋌',
          'rtimes;': '⋊',
          'rtri;': '▹',
          'rtrie;': '⊵',
          'rtrif;': '▸',
          'rtriltri;': '⧎',
          'RuleDelayed;': '⧴',
          'ruluhar;': '⥨',
          'rx;': '℞',
          'Sacute;': 'Ś',
          'sacute;': 'ś',
          'sbquo;': '‚',
          'Sc;': '⪼',
          'sc;': '≻',
          'scap;': '⪸',
          'Scaron;': 'Š',
          'scaron;': 'š',
          'sccue;': '≽',
          'scE;': '⪴',
          'sce;': '⪰',
          'Scedil;': 'Ş',
          'scedil;': 'ş',
          'Scirc;': 'Ŝ',
          'scirc;': 'ŝ',
          'scnap;': '⪺',
          'scnE;': '⪶',
          'scnsim;': '⋩',
          'scpolint;': '⨓',
          'scsim;': '≿',
          'Scy;': 'С',
          'scy;': 'с',
          'sdot;': '⋅',
          'sdotb;': '⊡',
          'sdote;': '⩦',
          'searhk;': '⤥',
          'seArr;': '⇘',
          'searr;': '↘',
          'searrow;': '↘',
          'sect;': '§',
          sect: '§',
          'semi;': ';',
          'seswar;': '⤩',
          'setminus;': '∖',
          'setmn;': '∖',
          'sext;': '✶',
          'Sfr;': '𝔖',
          'sfr;': '𝔰',
          'sfrown;': '⌢',
          'sharp;': '♯',
          'SHCHcy;': 'Щ',
          'shchcy;': 'щ',
          'SHcy;': 'Ш',
          'shcy;': 'ш',
          'ShortDownArrow;': '↓',
          'ShortLeftArrow;': '←',
          'shortmid;': '∣',
          'shortparallel;': '∥',
          'ShortRightArrow;': '→',
          'ShortUpArrow;': '↑',
          'shy;': '­',
          shy: '­',
          'Sigma;': 'Σ',
          'sigma;': 'σ',
          'sigmaf;': 'ς',
          'sigmav;': 'ς',
          'sim;': '∼',
          'simdot;': '⩪',
          'sime;': '≃',
          'simeq;': '≃',
          'simg;': '⪞',
          'simgE;': '⪠',
          'siml;': '⪝',
          'simlE;': '⪟',
          'simne;': '≆',
          'simplus;': '⨤',
          'simrarr;': '⥲',
          'slarr;': '←',
          'SmallCircle;': '∘',
          'smallsetminus;': '∖',
          'smashp;': '⨳',
          'smeparsl;': '⧤',
          'smid;': '∣',
          'smile;': '⌣',
          'smt;': '⪪',
          'smte;': '⪬',
          'smtes;': '⪬︀',
          'SOFTcy;': 'Ь',
          'softcy;': 'ь',
          'sol;': '/',
          'solb;': '⧄',
          'solbar;': '⌿',
          'Sopf;': '𝕊',
          'sopf;': '𝕤',
          'spades;': '♠',
          'spadesuit;': '♠',
          'spar;': '∥',
          'sqcap;': '⊓',
          'sqcaps;': '⊓︀',
          'sqcup;': '⊔',
          'sqcups;': '⊔︀',
          'Sqrt;': '√',
          'sqsub;': '⊏',
          'sqsube;': '⊑',
          'sqsubset;': '⊏',
          'sqsubseteq;': '⊑',
          'sqsup;': '⊐',
          'sqsupe;': '⊒',
          'sqsupset;': '⊐',
          'sqsupseteq;': '⊒',
          'squ;': '□',
          'Square;': '□',
          'square;': '□',
          'SquareIntersection;': '⊓',
          'SquareSubset;': '⊏',
          'SquareSubsetEqual;': '⊑',
          'SquareSuperset;': '⊐',
          'SquareSupersetEqual;': '⊒',
          'SquareUnion;': '⊔',
          'squarf;': '▪',
          'squf;': '▪',
          'srarr;': '→',
          'Sscr;': '𝒮',
          'sscr;': '𝓈',
          'ssetmn;': '∖',
          'ssmile;': '⌣',
          'sstarf;': '⋆',
          'Star;': '⋆',
          'star;': '☆',
          'starf;': '★',
          'straightepsilon;': 'ϵ',
          'straightphi;': 'ϕ',
          'strns;': '¯',
          'Sub;': '⋐',
          'sub;': '⊂',
          'subdot;': '⪽',
          'subE;': '⫅',
          'sube;': '⊆',
          'subedot;': '⫃',
          'submult;': '⫁',
          'subnE;': '⫋',
          'subne;': '⊊',
          'subplus;': '⪿',
          'subrarr;': '⥹',
          'Subset;': '⋐',
          'subset;': '⊂',
          'subseteq;': '⊆',
          'subseteqq;': '⫅',
          'SubsetEqual;': '⊆',
          'subsetneq;': '⊊',
          'subsetneqq;': '⫋',
          'subsim;': '⫇',
          'subsub;': '⫕',
          'subsup;': '⫓',
          'succ;': '≻',
          'succapprox;': '⪸',
          'succcurlyeq;': '≽',
          'Succeeds;': '≻',
          'SucceedsEqual;': '⪰',
          'SucceedsSlantEqual;': '≽',
          'SucceedsTilde;': '≿',
          'succeq;': '⪰',
          'succnapprox;': '⪺',
          'succneqq;': '⪶',
          'succnsim;': '⋩',
          'succsim;': '≿',
          'SuchThat;': '∋',
          'Sum;': '∑',
          'sum;': '∑',
          'sung;': '♪',
          'Sup;': '⋑',
          'sup;': '⊃',
          'sup1;': '¹',
          sup1: '¹',
          'sup2;': '²',
          sup2: '²',
          'sup3;': '³',
          sup3: '³',
          'supdot;': '⪾',
          'supdsub;': '⫘',
          'supE;': '⫆',
          'supe;': '⊇',
          'supedot;': '⫄',
          'Superset;': '⊃',
          'SupersetEqual;': '⊇',
          'suphsol;': '⟉',
          'suphsub;': '⫗',
          'suplarr;': '⥻',
          'supmult;': '⫂',
          'supnE;': '⫌',
          'supne;': '⊋',
          'supplus;': '⫀',
          'Supset;': '⋑',
          'supset;': '⊃',
          'supseteq;': '⊇',
          'supseteqq;': '⫆',
          'supsetneq;': '⊋',
          'supsetneqq;': '⫌',
          'supsim;': '⫈',
          'supsub;': '⫔',
          'supsup;': '⫖',
          'swarhk;': '⤦',
          'swArr;': '⇙',
          'swarr;': '↙',
          'swarrow;': '↙',
          'swnwar;': '⤪',
          'szlig;': 'ß',
          szlig: 'ß',
          'Tab;': '\t',
          'target;': '⌖',
          'Tau;': 'Τ',
          'tau;': 'τ',
          'tbrk;': '⎴',
          'Tcaron;': 'Ť',
          'tcaron;': 'ť',
          'Tcedil;': 'Ţ',
          'tcedil;': 'ţ',
          'Tcy;': 'Т',
          'tcy;': 'т',
          'tdot;': '⃛',
          'telrec;': '⌕',
          'Tfr;': '𝔗',
          'tfr;': '𝔱',
          'there4;': '∴',
          'Therefore;': '∴',
          'therefore;': '∴',
          'Theta;': 'Θ',
          'theta;': 'θ',
          'thetasym;': 'ϑ',
          'thetav;': 'ϑ',
          'thickapprox;': '≈',
          'thicksim;': '∼',
          'ThickSpace;': '  ',
          'thinsp;': ' ',
          'ThinSpace;': ' ',
          'thkap;': '≈',
          'thksim;': '∼',
          'THORN;': 'Þ',
          THORN: 'Þ',
          'thorn;': 'þ',
          thorn: 'þ',
          'Tilde;': '∼',
          'tilde;': '˜',
          'TildeEqual;': '≃',
          'TildeFullEqual;': '≅',
          'TildeTilde;': '≈',
          'times;': '×',
          times: '×',
          'timesb;': '⊠',
          'timesbar;': '⨱',
          'timesd;': '⨰',
          'tint;': '∭',
          'toea;': '⤨',
          'top;': '⊤',
          'topbot;': '⌶',
          'topcir;': '⫱',
          'Topf;': '𝕋',
          'topf;': '𝕥',
          'topfork;': '⫚',
          'tosa;': '⤩',
          'tprime;': '‴',
          'TRADE;': '™',
          'trade;': '™',
          'triangle;': '▵',
          'triangledown;': '▿',
          'triangleleft;': '◃',
          'trianglelefteq;': '⊴',
          'triangleq;': '≜',
          'triangleright;': '▹',
          'trianglerighteq;': '⊵',
          'tridot;': '◬',
          'trie;': '≜',
          'triminus;': '⨺',
          'TripleDot;': '⃛',
          'triplus;': '⨹',
          'trisb;': '⧍',
          'tritime;': '⨻',
          'trpezium;': '⏢',
          'Tscr;': '𝒯',
          'tscr;': '𝓉',
          'TScy;': 'Ц',
          'tscy;': 'ц',
          'TSHcy;': 'Ћ',
          'tshcy;': 'ћ',
          'Tstrok;': 'Ŧ',
          'tstrok;': 'ŧ',
          'twixt;': '≬',
          'twoheadleftarrow;': '↞',
          'twoheadrightarrow;': '↠',
          'Uacute;': 'Ú',
          Uacute: 'Ú',
          'uacute;': 'ú',
          uacute: 'ú',
          'Uarr;': '↟',
          'uArr;': '⇑',
          'uarr;': '↑',
          'Uarrocir;': '⥉',
          'Ubrcy;': 'Ў',
          'ubrcy;': 'ў',
          'Ubreve;': 'Ŭ',
          'ubreve;': 'ŭ',
          'Ucirc;': 'Û',
          Ucirc: 'Û',
          'ucirc;': 'û',
          ucirc: 'û',
          'Ucy;': 'У',
          'ucy;': 'у',
          'udarr;': '⇅',
          'Udblac;': 'Ű',
          'udblac;': 'ű',
          'udhar;': '⥮',
          'ufisht;': '⥾',
          'Ufr;': '𝔘',
          'ufr;': '𝔲',
          'Ugrave;': 'Ù',
          Ugrave: 'Ù',
          'ugrave;': 'ù',
          ugrave: 'ù',
          'uHar;': '⥣',
          'uharl;': '↿',
          'uharr;': '↾',
          'uhblk;': '▀',
          'ulcorn;': '⌜',
          'ulcorner;': '⌜',
          'ulcrop;': '⌏',
          'ultri;': '◸',
          'Umacr;': 'Ū',
          'umacr;': 'ū',
          'uml;': '¨',
          uml: '¨',
          'UnderBar;': '_',
          'UnderBrace;': '⏟',
          'UnderBracket;': '⎵',
          'UnderParenthesis;': '⏝',
          'Union;': '⋃',
          'UnionPlus;': '⊎',
          'Uogon;': 'Ų',
          'uogon;': 'ų',
          'Uopf;': '𝕌',
          'uopf;': '𝕦',
          'UpArrow;': '↑',
          'Uparrow;': '⇑',
          'uparrow;': '↑',
          'UpArrowBar;': '⤒',
          'UpArrowDownArrow;': '⇅',
          'UpDownArrow;': '↕',
          'Updownarrow;': '⇕',
          'updownarrow;': '↕',
          'UpEquilibrium;': '⥮',
          'upharpoonleft;': '↿',
          'upharpoonright;': '↾',
          'uplus;': '⊎',
          'UpperLeftArrow;': '↖',
          'UpperRightArrow;': '↗',
          'Upsi;': 'ϒ',
          'upsi;': 'υ',
          'upsih;': 'ϒ',
          'Upsilon;': 'Υ',
          'upsilon;': 'υ',
          'UpTee;': '⊥',
          'UpTeeArrow;': '↥',
          'upuparrows;': '⇈',
          'urcorn;': '⌝',
          'urcorner;': '⌝',
          'urcrop;': '⌎',
          'Uring;': 'Ů',
          'uring;': 'ů',
          'urtri;': '◹',
          'Uscr;': '𝒰',
          'uscr;': '𝓊',
          'utdot;': '⋰',
          'Utilde;': 'Ũ',
          'utilde;': 'ũ',
          'utri;': '▵',
          'utrif;': '▴',
          'uuarr;': '⇈',
          'Uuml;': 'Ü',
          Uuml: 'Ü',
          'uuml;': 'ü',
          uuml: 'ü',
          'uwangle;': '⦧',
          'vangrt;': '⦜',
          'varepsilon;': 'ϵ',
          'varkappa;': 'ϰ',
          'varnothing;': '∅',
          'varphi;': 'ϕ',
          'varpi;': 'ϖ',
          'varpropto;': '∝',
          'vArr;': '⇕',
          'varr;': '↕',
          'varrho;': 'ϱ',
          'varsigma;': 'ς',
          'varsubsetneq;': '⊊︀',
          'varsubsetneqq;': '⫋︀',
          'varsupsetneq;': '⊋︀',
          'varsupsetneqq;': '⫌︀',
          'vartheta;': 'ϑ',
          'vartriangleleft;': '⊲',
          'vartriangleright;': '⊳',
          'Vbar;': '⫫',
          'vBar;': '⫨',
          'vBarv;': '⫩',
          'Vcy;': 'В',
          'vcy;': 'в',
          'VDash;': '⊫',
          'Vdash;': '⊩',
          'vDash;': '⊨',
          'vdash;': '⊢',
          'Vdashl;': '⫦',
          'Vee;': '⋁',
          'vee;': '∨',
          'veebar;': '⊻',
          'veeeq;': '≚',
          'vellip;': '⋮',
          'Verbar;': '‖',
          'verbar;': '|',
          'Vert;': '‖',
          'vert;': '|',
          'VerticalBar;': '∣',
          'VerticalLine;': '|',
          'VerticalSeparator;': '❘',
          'VerticalTilde;': '≀',
          'VeryThinSpace;': ' ',
          'Vfr;': '𝔙',
          'vfr;': '𝔳',
          'vltri;': '⊲',
          'vnsub;': '⊂⃒',
          'vnsup;': '⊃⃒',
          'Vopf;': '𝕍',
          'vopf;': '𝕧',
          'vprop;': '∝',
          'vrtri;': '⊳',
          'Vscr;': '𝒱',
          'vscr;': '𝓋',
          'vsubnE;': '⫋︀',
          'vsubne;': '⊊︀',
          'vsupnE;': '⫌︀',
          'vsupne;': '⊋︀',
          'Vvdash;': '⊪',
          'vzigzag;': '⦚',
          'Wcirc;': 'Ŵ',
          'wcirc;': 'ŵ',
          'wedbar;': '⩟',
          'Wedge;': '⋀',
          'wedge;': '∧',
          'wedgeq;': '≙',
          'weierp;': '℘',
          'Wfr;': '𝔚',
          'wfr;': '𝔴',
          'Wopf;': '𝕎',
          'wopf;': '𝕨',
          'wp;': '℘',
          'wr;': '≀',
          'wreath;': '≀',
          'Wscr;': '𝒲',
          'wscr;': '𝓌',
          'xcap;': '⋂',
          'xcirc;': '◯',
          'xcup;': '⋃',
          'xdtri;': '▽',
          'Xfr;': '𝔛',
          'xfr;': '𝔵',
          'xhArr;': '⟺',
          'xharr;': '⟷',
          'Xi;': 'Ξ',
          'xi;': 'ξ',
          'xlArr;': '⟸',
          'xlarr;': '⟵',
          'xmap;': '⟼',
          'xnis;': '⋻',
          'xodot;': '⨀',
          'Xopf;': '𝕏',
          'xopf;': '𝕩',
          'xoplus;': '⨁',
          'xotime;': '⨂',
          'xrArr;': '⟹',
          'xrarr;': '⟶',
          'Xscr;': '𝒳',
          'xscr;': '𝓍',
          'xsqcup;': '⨆',
          'xuplus;': '⨄',
          'xutri;': '△',
          'xvee;': '⋁',
          'xwedge;': '⋀',
          'Yacute;': 'Ý',
          Yacute: 'Ý',
          'yacute;': 'ý',
          yacute: 'ý',
          'YAcy;': 'Я',
          'yacy;': 'я',
          'Ycirc;': 'Ŷ',
          'ycirc;': 'ŷ',
          'Ycy;': 'Ы',
          'ycy;': 'ы',
          'yen;': '¥',
          yen: '¥',
          'Yfr;': '𝔜',
          'yfr;': '𝔶',
          'YIcy;': 'Ї',
          'yicy;': 'ї',
          'Yopf;': '𝕐',
          'yopf;': '𝕪',
          'Yscr;': '𝒴',
          'yscr;': '𝓎',
          'YUcy;': 'Ю',
          'yucy;': 'ю',
          'Yuml;': 'Ÿ',
          'yuml;': 'ÿ',
          yuml: 'ÿ',
          'Zacute;': 'Ź',
          'zacute;': 'ź',
          'Zcaron;': 'Ž',
          'zcaron;': 'ž',
          'Zcy;': 'З',
          'zcy;': 'з',
          'Zdot;': 'Ż',
          'zdot;': 'ż',
          'zeetrf;': 'ℨ',
          'ZeroWidthSpace;': '​',
          'Zeta;': 'Ζ',
          'zeta;': 'ζ',
          'Zfr;': 'ℨ',
          'zfr;': '𝔷',
          'ZHcy;': 'Ж',
          'zhcy;': 'ж',
          'zigrarr;': '⇝',
          'Zopf;': 'ℤ',
          'zopf;': '𝕫',
          'Zscr;': '𝒵',
          'zscr;': '𝓏',
          'zwj;': '‍',
          'zwnj;': '‌'
        };
        exports.entities = r;
      },
      {}
    ],
    g97J: [
      function(require, module, exports) {
        'use strict';
        function t(t, r) {
          if (t.length < r.length) return !1;
          for (var e = 0; e < r.length; e++) if (t[e] !== r[e]) return !1;
          return !0;
        }
        function r(t, r) {
          var e = t.length - r.length;
          return e > 0 ? t.lastIndexOf(r) === e : 0 === e && t === r;
        }
        function e(t, r) {
          var e,
            n = Math.min(t.length, r.length);
          for (e = 0; e < n; e++) if (t.charCodeAt(e) !== r.charCodeAt(e)) return e;
          return n;
        }
        function n(t, r) {
          for (var e = ''; r > 0; ) 1 == (1 & r) && (e += t), (t += t), (r >>>= 1);
          return e;
        }
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.startsWith = t),
          (exports.endsWith = r),
          (exports.commonPrefixLength = e),
          (exports.repeat = n),
          (exports.isLetterOrDigit = f);
        var o = 'a'.charCodeAt(0),
          a = 'z'.charCodeAt(0),
          h = 'A'.charCodeAt(0),
          c = 'Z'.charCodeAt(0),
          i = '0'.charCodeAt(0),
          u = '9'.charCodeAt(0);
        function f(t, r) {
          var e = t.charCodeAt(r);
          return (o <= e && e <= a) || (h <= e && e <= c) || (i <= e && e <= u);
        }
      },
      {}
    ],
    muLC: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.HTMLDataProvider = void 0);
        var t = (function() {
          function t(t, a) {
            var e = this;
            (this.id = t),
              (this._tags = []),
              (this._tagMap = {}),
              (this._attributeMap = {}),
              (this._valueSetMap = {}),
              (this._tags = a.tags || []),
              (this._globalAttributes = a.globalAttributes || []),
              this._tags.forEach(function(t) {
                (e._tagMap[t.name] = t),
                  t.attributes &&
                    t.attributes.forEach(function(t) {
                      e._attributeMap[t.name] = t;
                    });
              }),
              this._globalAttributes.forEach(function(t) {
                e._attributeMap[t.name] = t;
              }),
              a.valueSets &&
                a.valueSets.forEach(function(t) {
                  e._valueSetMap[t.name] = t.values;
                });
          }
          return (
            (t.prototype.isApplicable = function() {
              return !0;
            }),
            (t.prototype.getId = function() {
              return this.id;
            }),
            (t.prototype.provideTags = function() {
              return this._tags;
            }),
            (t.prototype.provideAttributes = function(t) {
              var a = [],
                e = function(t) {
                  a.push({ name: t.name, description: t.description, valueSet: t.valueSet });
                };
              return (
                this._tagMap[t] &&
                  this._tagMap[t].attributes.forEach(function(t) {
                    e(t);
                  }),
                this._globalAttributes.forEach(function(t) {
                  e(t);
                }),
                a
              );
            }),
            (t.prototype.provideValues = function(t, a) {
              var e = this,
                i = [],
                r = function(t) {
                  t.forEach(function(t) {
                    t.name === a &&
                      (t.values &&
                        t.values.forEach(function(t) {
                          i.push(t);
                        }),
                      t.valueSet &&
                        e._valueSetMap[t.valueSet] &&
                        e._valueSetMap[t.valueSet].forEach(function(t) {
                          i.push(t);
                        }));
                  });
                };
              return this._tagMap[t] ? (r(this._tagMap[t].attributes), r(this._globalAttributes), i) : [];
            }),
            t
          );
        })();
        exports.HTMLDataProvider = t;
      },
      {}
    ],
    DdcB: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.HTML5_TAGS = void 0);
        var e = [
          {
            name: 'html',
            description: 'The html element represents the root of an HTML document.',
            attributes: [
              {
                name: 'manifest',
                description:
                  'Specifies the URI of a resource manifest indicating resources that should be cached locally. See [Using the application cache](/en-US/docs/Web/HTML/Using_the_application_cache) for details.'
              },
              {
                name: 'version',
                description:
                  'Specifies the version of the HTML [Document Type Definition](/en-US/docs/Glossary/DTD "Document Type Definition: In HTML, the doctype is the required "<!DOCTYPE html>" preamble found at the top of all documents. Its sole purpose is to prevent a browser from switching into so-called “quirks mode” when rendering a document; that is, the "<!DOCTYPE html>" doctype ensures that the browser makes a best-effort attempt at following the relevant specifications, rather than using a different rendering mode that is incompatible with some specifications.") that governs the current document. This attribute is not needed, because it is redundant with the version information in the document type declaration.'
              },
              {
                name: 'xmlns',
                description:
                  'Specifies the XML Namespace of the document. Default value is `"http://www.w3.org/1999/xhtml"`. This is required in documents parsed with XML parsers, and optional in text/html documents.'
              }
            ]
          },
          {
            name: 'head',
            description: 'The head element represents a collection of metadata for the Document.',
            attributes: [{ name: 'profile', description: 'The URIs of one or more metadata profiles, separated by white space.' }]
          },
          {
            name: 'title',
            description:
              "The title element represents the document's title or name. Authors should use titles that identify their documents even when they are used out of context, for example in a user's history or bookmarks, or in search results. The document's title is often different from its first heading, since the first heading does not have to stand alone when taken out of context.",
            attributes: []
          },
          {
            name: 'base',
            description:
              'The base element allows authors to specify the document base URL for the purposes of resolving relative URLs, and the name of the default browsing context for the purposes of following hyperlinks. The element does not represent any content beyond this information.',
            attributes: [
              {
                name: 'href',
                description:
                  'The base URL to be used throughout the document for relative URL addresses. If this attribute is specified, this element must come before any other elements with attributes whose values are URLs. Absolute and relative URLs are allowed.'
              },
              {
                name: 'target',
                description:
                  'A name or keyword indicating the default location to display the result when hyperlinks or forms cause navigation, for elements that do not have an explicit target reference. It is a name of, or keyword for, a _browsing context_ (for example: tab, window, or inline frame). The following keywords have special meanings:\n\n*   `_self`: Load the result into the same browsing context as the current one. This value is the default if the attribute is not specified.\n*   `_blank`: Load the result into a new unnamed browsing context.\n*   `_parent`: Load the result into the parent browsing context of the current one. If there is no parent, this option behaves the same way as `_self`.\n*   `_top`: Load the result into the top-level browsing context (that is, the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as `_self`.\n\nIf this attribute is specified, this element must come before any other elements with attributes whose values are URLs.'
              }
            ]
          },
          {
            name: 'link',
            description: 'The link element allows authors to link their document to other resources.',
            attributes: [
              {
                name: 'href',
                description:
                  'This attribute specifies the [URL](/en-US/docs/Glossary/URL "URL: Uniform Resource Locator (URL) is a text string specifying where a resource can be found on the Internet.") of the linked resource. A URL can be absolute or relative.'
              },
              {
                name: 'crossorigin',
                valueSet: 'xo',
                description:
                  'This enumerated attribute indicates whether [CORS](/en-US/docs/Glossary/CORS "CORS: CORS (Cross-Origin Resource Sharing) is a system, consisting of transmitting HTTP headers, that determines whether browsers block frontend JavaScript code from accessing responses for cross-origin requests.") must be used when fetching the resource. [CORS-enabled images](/en-US/docs/Web/HTML/CORS_Enabled_Image) can be reused in the [`<canvas>`](/en-US/docs/Web/HTML/Element/canvas "Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.") element without being _tainted_. The allowed values are:\n\n`anonymous`\n\nA cross-origin request (i.e. with an [`Origin`](/en-US/docs/Web/HTTP/Headers/Origin "The Origin request header indicates where a fetch originates from. It doesn\'t include any path information, but only the server name. It is sent with CORS requests, as well as with POST requests. It is similar to the Referer header, but, unlike this header, it doesn\'t disclose the whole path.") HTTP header) is performed, but no credential is sent (i.e. no cookie, X.509 certificate, or HTTP Basic authentication). If the server does not give credentials to the origin site (by not setting the [`Access-Control-Allow-Origin`](/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin "The Access-Control-Allow-Origin response header indicates whether the response can be shared with requesting code from the given origin.") HTTP header) the image will be tainted and its usage restricted.\n\n`use-credentials`\n\nA cross-origin request (i.e. with an `Origin` HTTP header) is performed along with a credential sent (i.e. a cookie, certificate, and/or HTTP Basic authentication is performed). If the server does not give credentials to the origin site (through [`Access-Control-Allow-Credentials`](/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials "The Access-Control-Allow-Credentials response header tells browsers whether to expose the response to frontend JavaScript code when the request\'s credentials mode (Request.credentials) is "include".") HTTP header), the resource will be _tainted_ and its usage restricted.\n\nIf the attribute is not present, the resource is fetched without a [CORS](/en-US/docs/Glossary/CORS "CORS: CORS (Cross-Origin Resource Sharing) is a system, consisting of transmitting HTTP headers, that determines whether browsers block frontend JavaScript code from accessing responses for cross-origin requests.") request (i.e. without sending the `Origin` HTTP header), preventing its non-tainted usage. If invalid, it is handled as if the enumerated keyword **anonymous** was used. See [CORS settings attributes](/en-US/docs/Web/HTML/CORS_settings_attributes) for additional information.'
              },
              {
                name: 'rel',
                description:
                  'This attribute names a relationship of the linked document to the current document. The attribute must be a space-separated list of the [link types values](/en-US/docs/Web/HTML/Link_types).'
              },
              {
                name: 'media',
                description:
                  "This attribute specifies the media that the linked resource applies to. Its value must be a media type / [media query](/en-US/docs/Web/CSS/Media_queries). This attribute is mainly useful when linking to external stylesheets — it allows the user agent to pick the best adapted one for the device it runs on.\n\n**Notes:**\n\n*   In HTML 4, this can only be a simple white-space-separated list of media description literals, i.e., [media types and groups](/en-US/docs/Web/CSS/@media), where defined and allowed as values for this attribute, such as `print`, `screen`, `aural`, `braille`. HTML5 extended this to any kind of [media queries](/en-US/docs/Web/CSS/Media_queries), which are a superset of the allowed values of HTML 4.\n*   Browsers not supporting [CSS3 Media Queries](/en-US/docs/Web/CSS/Media_queries) won't necessarily recognize the adequate link; do not forget to set fallback links, the restricted set of media queries defined in HTML 4."
              },
              {
                name: 'hreflang',
                description:
                  'This attribute indicates the language of the linked resource. It is purely advisory. Allowed values are determined by [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt). Use this attribute only if the `[href](/en-US/docs/Web/HTML/Element/a#attr-href)` attribute is present.'
              },
              {
                name: 'type',
                description:
                  'This attribute is used to define the type of the content linked to. The value of the attribute should be a MIME type such as **text/html**, **text/css**, and so on. The common use of this attribute is to define the type of stylesheet being referenced (such as **text/css**), but given that CSS is the only stylesheet language used on the web, not only is it possible to omit the `type` attribute, but is actually now recommended practice. It is also used on `rel="preload"` link types, to make sure the browser only downloads file types that it supports.'
              },
              {
                name: 'sizes',
                description:
                  "This attribute defines the sizes of the icons for visual media contained in the resource. It must be present only if the `[rel](/en-US/docs/Web/HTML/Element/link#attr-rel)` contains a value of `icon` or a non-standard type such as Apple's `apple-touch-icon`. It may have the following values:\n\n*   `any`, meaning that the icon can be scaled to any size as it is in a vector format, like `image/svg+xml`.\n*   a white-space separated list of sizes, each in the format `_<width in pixels>_x_<height in pixels>_` or `_<width in pixels>_X_<height in pixels>_`. Each of these sizes must be contained in the resource.\n\n**Note:** Most icon formats are only able to store one single icon; therefore most of the time the `[sizes](/en-US/docs/Web/HTML/Global_attributes#attr-sizes)` contains only one entry. MS's ICO format does, as well as Apple's ICNS. ICO is more ubiquitous; you should definitely use it."
              },
              {
                name: 'as',
                description:
                  'This attribute is only used when `rel="preload"` or `rel="prefetch"` has been set on the `<link>` element. It specifies the type of content being loaded by the `<link>`, which is necessary for content prioritization, request matching, application of correct [content security policy](/en-US/docs/Web/HTTP/CSP), and setting of correct [`Accept`](/en-US/docs/Web/HTTP/Headers/Accept "The Accept request HTTP header advertises which content types, expressed as MIME types, the client is able to understand. Using content negotiation, the server then selects one of the proposals, uses it and informs the client of its choice with the Content-Type response header. Browsers set adequate values for this header depending on the context where the request is done: when fetching a CSS stylesheet a different value is set for the request than when fetching an image, video or a script.") request header.'
              },
              {
                name: 'importance',
                description: 'Indicates the relative importance of the resource. Priority hints are delegated using the values:'
              },
              {
                name: 'importance',
                description:
                  '**`auto`**: Indicates **no preference**. The browser may use its own heuristics to decide the priority of the resource.\n\n**`high`**: Indicates to the browser that the resource is of **high** priority.\n\n**`low`**: Indicates to the browser that the resource is of **low** priority.\n\n**Note:** The `importance` attribute may only be used for the `<link>` element if `rel="preload"` or `rel="prefetch"` is present.'
              },
              {
                name: 'integrity',
                description:
                  'Contains inline metadata — a base64-encoded cryptographic hash of the resource (file) you’re telling the browser to fetch. The browser can use this to verify that the fetched resource has been delivered free of unexpected manipulation. See [Subresource Integrity](/en-US/docs/Web/Security/Subresource_Integrity).'
              },
              {
                name: 'referrerpolicy',
                description:
                  'A string indicating which referrer to use when fetching the resource:\n\n*   `no-referrer` means that the [`Referer`](/en-US/docs/Web/HTTP/Headers/Referer "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.") header will not be sent.\n*   `no-referrer-when-downgrade` means that no [`Referer`](/en-US/docs/Web/HTTP/Headers/Referer "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.") header will be sent when navigating to an origin without TLS (HTTPS). This is a user agent’s default behavior, if no policy is otherwise specified.\n*   `origin` means that the referrer will be the origin of the page, which is roughly the scheme, the host, and the port.\n*   `origin-when-cross-origin` means that navigating to other origins will be limited to the scheme, the host, and the port, while navigating on the same origin will include the referrer\'s path.\n*   `unsafe-url` means that the referrer will include the origin and the path (but not the fragment, password, or username). This case is unsafe because it can leak origins and paths from TLS-protected resources to insecure origins.'
              },
              {
                name: 'title',
                description:
                  'The `title` attribute has special semantics on the `<link>` element. When used on a `<link rel="stylesheet">` it defines a [preferred or an alternate stylesheet](/en-US/docs/Web/CSS/Alternative_style_sheets). Incorrectly using it may [cause the stylesheet to be ignored](/en-US/docs/Correctly_Using_Titles_With_External_Stylesheets).'
              }
            ]
          },
          {
            name: 'meta',
            description:
              'The meta element represents various kinds of metadata that cannot be expressed using the title, base, link, style, and script elements.',
            attributes: [
              {
                name: 'name',
                description:
                  'This attribute defines the name of a piece of document-level metadata. It should not be set if one of the attributes `[itemprop](/en-US/docs/Web/HTML/Global_attributes#attr-itemprop)`, `[http-equiv](/en-US/docs/Web/HTML/Element/meta#attr-http-equiv)` or `[charset](/en-US/docs/Web/HTML/Element/meta#attr-charset)` is also set.\n\nThis metadata name is associated with the value contained by the `[content](/en-US/docs/Web/HTML/Element/meta#attr-content)` attribute. The possible values for the name attribute are:\n\n*   `application-name` which defines the name of the application running in the web page.\n    \n    **Note:**\n    \n    *   Browsers may use this to identify the application. It is different from the [`<title>`](/en-US/docs/Web/HTML/Element/title "The HTML Title element (<title>) defines the document\'s title that is shown in a browser\'s title bar or a page\'s tab.") element, which usually contain the application name, but may also contain information like the document name or a status.\n    *   Simple web pages shouldn\'t define an application-name.\n    \n*   `author` which defines the name of the document\'s author.\n*   `description` which contains a short and accurate summary of the content of the page. Several browsers, like Firefox and Opera, use this as the default description of bookmarked pages.\n*   `generator` which contains the identifier of the software that generated the page.\n*   `keywords` which contains words relevant to the page\'s content separated by commas.\n*   `referrer` which controls the [`Referer` HTTP header](/en-US/docs/Web/HTTP/Headers/Referer) attached to requests sent from the document:\n    \n    Values for the `content` attribute of `<meta name="referrer">`\n    \n    `no-referrer`\n    \n    Do not send a HTTP `Referrer` header.\n    \n    `origin`\n    \n    Send the [origin](/en-US/docs/Glossary/Origin) of the document.\n    \n    `no-referrer-when-downgrade`\n    \n    Send the [origin](/en-US/docs/Glossary/Origin) as a referrer to URLs as secure as the current page, (https→https), but does not send a referrer to less secure URLs (https→http). This is the default behaviour.\n    \n    `origin-when-cross-origin`\n    \n    Send the full URL (stripped of parameters) for same-origin requests, but only send the [origin](/en-US/docs/Glossary/Origin) for other cases.\n    \n    `same-origin`\n    \n    A referrer will be sent for [same-site origins](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy), but cross-origin requests will contain no referrer information.\n    \n    `strict-origin`\n    \n    Only send the origin of the document as the referrer to a-priori as-much-secure destination (HTTPS->HTTPS), but don\'t send it to a less secure destination (HTTPS->HTTP).\n    \n    `strict-origin-when-cross-origin`\n    \n    Send a full URL when performing a same-origin request, only send the origin of the document to a-priori as-much-secure destination (HTTPS->HTTPS), and send no header to a less secure destination (HTTPS->HTTP).\n    \n    `unsafe-URL`\n    \n    Send the full URL (stripped of parameters) for same-origin or cross-origin requests.\n    \n    **Notes:**\n    \n    *   Some browsers support the deprecated values of `always`, `default`, and `never` for referrer.\n    *   Dynamically inserting `<meta name="referrer">` (with [`document.write`](/en-US/docs/Web/API/Document/write) or [`appendChild`](/en-US/docs/Web/API/Node/appendChild)) makes the referrer behaviour unpredictable.\n    *   When several conflicting policies are defined, the no-referrer policy is applied.\n    \n\nThis attribute may also have a value taken from the extended list defined on [WHATWG Wiki MetaExtensions page](https://wiki.whatwg.org/wiki/MetaExtensions). Although none have been formally accepted yet, a few commonly used names are:\n\n*   `creator` which defines the name of the creator of the document, such as an organization or institution. If there are more than one, several [`<meta>`](/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") elements should be used.\n*   `googlebot`, a synonym of `robots`, is only followed by Googlebot (the indexing crawler for Google).\n*   `publisher` which defines the name of the document\'s publisher.\n*   `robots` which defines the behaviour that cooperative crawlers, or "robots", should use with the page. It is a comma-separated list of the values below:\n    \n    Values for the content of `<meta name="robots">`\n    \n    Value\n    \n    Description\n    \n    Used by\n    \n    `index`\n    \n    Allows the robot to index the page (default).\n    \n    All\n    \n    `noindex`\n    \n    Requests the robot to not index the page.\n    \n    All\n    \n    `follow`\n    \n    Allows the robot to follow the links on the page (default).\n    \n    All\n    \n    `nofollow`\n    \n    Requests the robot to not follow the links on the page.\n    \n    All\n    \n    `none`\n    \n    Equivalent to `noindex, nofollow`\n    \n    [Google](https://support.google.com/webmasters/answer/79812)\n    \n    `noodp`\n    \n    Prevents using the [Open Directory Project](https://www.dmoz.org/) description, if any, as the page description in search engine results.\n    \n    [Google](https://support.google.com/webmasters/answer/35624#nodmoz), [Yahoo](https://help.yahoo.com/kb/search-for-desktop/meta-tags-robotstxt-yahoo-search-sln2213.html#cont5), [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)\n    \n    `noarchive`\n    \n    Requests the search engine not to cache the page content.\n    \n    [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives), [Yahoo](https://help.yahoo.com/kb/search-for-desktop/SLN2213.html), [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)\n    \n    `nosnippet`\n    \n    Prevents displaying any description of the page in search engine results.\n    \n    [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives), [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)\n    \n    `noimageindex`\n    \n    Requests this page not to appear as the referring page of an indexed image.\n    \n    [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives)\n    \n    `nocache`\n    \n    Synonym of `noarchive`.\n    \n    [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)\n    \n    **Notes:**\n    \n    *   Only cooperative robots follow these rules. Do not expect to prevent e-mail harvesters with them.\n    *   The robot still needs to access the page in order to read these rules. To prevent bandwidth consumption, use a _[robots.txt](/en-US/docs/Glossary/robots.txt "robots.txt: Robots.txt is a file which is usually placed in the root of any website. It decides whether crawlers are permitted or forbidden access to the web site.")_ file.\n    *   If you want to remove a page, `noindex` will work, but only after the robot visits the page again. Ensure that the `robots.txt` file is not preventing revisits.\n    *   Some values are mutually exclusive, like `index` and `noindex`, or `follow` and `nofollow`. In these cases the robot\'s behaviour is undefined and may vary between them.\n    *   Some crawler robots, like Google, Yahoo and Bing, support the same values for the HTTP header `X-Robots-Tag`; this allows non-HTML documents like images to use these rules.\n    \n*   `slurp`, is a synonym of `robots`, but only for Slurp - the crawler for Yahoo Search.\n*   `viewport`, which gives hints about the size of the initial size of the [viewport](/en-US/docs/Glossary/viewport "viewport: A viewport represents a polygonal (normally rectangular) area in computer graphics that is currently being viewed. In web browser terms, it refers to the part of the document you\'re viewing which is currently visible in its window (or the screen, if the document is being viewed in full screen mode). Content outside the viewport is not visible onscreen until scrolled into view."). Used by mobile devices only.\n    \n    Values for the content of `<meta name="viewport">`\n    \n    Value\n    \n    Possible subvalues\n    \n    Description\n    \n    `width`\n    \n    A positive integer number, or the text `device-width`\n    \n    Defines the pixel width of the viewport that you want the web site to be rendered at.\n    \n    `height`\n    \n    A positive integer, or the text `device-height`\n    \n    Defines the height of the viewport. Not used by any browser.\n    \n    `initial-scale`\n    \n    A positive number between `0.0` and `10.0`\n    \n    Defines the ratio between the device width (`device-width` in portrait mode or `device-height` in landscape mode) and the viewport size.\n    \n    `maximum-scale`\n    \n    A positive number between `0.0` and `10.0`\n    \n    Defines the maximum amount to zoom in. It must be greater or equal to the `minimum-scale` or the behaviour is undefined. Browser settings can ignore this rule and iOS10+ ignores it by default.\n    \n    `minimum-scale`\n    \n    A positive number between `0.0` and `10.0`\n    \n    Defines the minimum zoom level. It must be smaller or equal to the `maximum-scale` or the behaviour is undefined. Browser settings can ignore this rule and iOS10+ ignores it by default.\n    \n    `user-scalable`\n    \n    `yes` or `no`\n    \n    If set to `no`, the user is not able to zoom in the webpage. The default is `yes`. Browser settings can ignore this rule, and iOS10+ ignores it by default.\n    \n    Specification\n    \n    Status\n    \n    Comment\n    \n    [CSS Device Adaptation  \n    The definition of \'<meta name="viewport">\' in that specification.](https://drafts.csswg.org/css-device-adapt/#viewport-meta)\n    \n    Working Draft\n    \n    Non-normatively describes the Viewport META element\n    \n    See also: [`@viewport`](/en-US/docs/Web/CSS/@viewport "The @viewport CSS at-rule lets you configure the viewport through which the document is viewed. It\'s primarily used for mobile devices, but is also used by desktop browsers that support features like "snap to edge" (such as Microsoft Edge).")\n    \n    **Notes:**\n    \n    *   Though unstandardized, this declaration is respected by most mobile browsers due to de-facto dominance.\n    *   The default values may vary between devices and browsers.\n    *   To learn about this declaration in Firefox for Mobile, see [this article](/en-US/docs/Mobile/Viewport_meta_tag "Mobile/Viewport meta tag").'
              },
              {
                name: 'http-equiv',
                description:
                  'Defines a pragma directive. The attribute is named `**http-equiv**(alent)` because all the allowed values are names of particular HTTP headers:\n\n*   `"content-language"`  \n    Defines the default language of the page. It can be overridden by the [lang](/en-US/docs/Web/HTML/Global_attributes/lang) attribute on any element.\n    \n    **Warning:** Do not use this value, as it is obsolete. Prefer the `lang` attribute on the [`<html>`](/en-US/docs/Web/HTML/Element/html "The HTML <html> element represents the root (top-level element) of an HTML document, so it is also referred to as the root element. All other elements must be descendants of this element.") element.\n    \n*   `"content-security-policy"`  \n    Allows page authors to define a [content policy](/en-US/docs/Web/Security/CSP/CSP_policy_directives) for the current page. Content policies mostly specify allowed server origins and script endpoints which help guard against cross-site scripting attacks.\n*   `"content-type"`  \n    Defines the [MIME type](/en-US/docs/Glossary/MIME_type) of the document, followed by its character encoding. It follows the same syntax as the HTTP `content-type` entity-header field, but as it is inside a HTML page, most values other than `text/html` are impossible. Therefore the valid syntax for its `content` is the string \'`text/html`\' followed by a character set with the following syntax: \'`; charset=_IANAcharset_`\', where `IANAcharset` is the _preferred MIME name_ for a character set as [defined by the IANA.](https://www.iana.org/assignments/character-sets)\n    \n    **Warning:** Do not use this value, as it is obsolete. Use the `[charset](/en-US/docs/Web/HTML/Element/meta#attr-charset)` attribute on the [`<meta>`](/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") element.\n    \n    **Note:** As [`<meta>`](/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") can\'t change documents\' types in XHTML or HTML5\'s XHTML serialization, never set the MIME type to an XHTML MIME type with `<meta>`.\n    \n*   `"refresh"`  \n    This instruction specifies:\n    *   The number of seconds until the page should be reloaded - only if the `[content](/en-US/docs/Web/HTML/Element/meta#attr-content)` attribute contains a positive integer.\n    *   The number of seconds until the page should redirect to another - only if the `[content](/en-US/docs/Web/HTML/Element/meta#attr-content)` attribute contains a positive integer followed by the string \'`;url=`\', and a valid URL.\n*   `"set-cookie"`  \n    Defines a [cookie](/en-US/docs/cookie) for the page. Its content must follow the syntax defined in the [IETF HTTP Cookie Specification](https://tools.ietf.org/html/draft-ietf-httpstate-cookie-14).\n    \n    **Warning:** Do not use this instruction, as it is obsolete. Use the HTTP header [`Set-Cookie`](/en-US/docs/Web/HTTP/Headers/Set-Cookie) instead.'
              },
              {
                name: 'content',
                description:
                  'This attribute contains the value for the `[http-equiv](/en-US/docs/Web/HTML/Element/meta#attr-http-equiv)` or `[name](/en-US/docs/Web/HTML/Element/meta#attr-name)` attribute, depending on which is used.'
              },
              {
                name: 'charset',
                description:
                  'This attribute declares the page\'s character encoding. It must contain a [standard IANA MIME name for character encodings](https://www.iana.org/assignments/character-sets). Although the standard doesn\'t request a specific encoding, it suggests:\n\n*   Authors are encouraged to use [`UTF-8`](/en-US/docs/Glossary/UTF-8).\n*   Authors should not use ASCII-incompatible encodings to avoid security risk: browsers not supporting them may interpret harmful content as HTML. This happens with the `JIS_C6226-1983`, `JIS_X0212-1990`, `HZ-GB-2312`, `JOHAB`, the ISO-2022 family and the EBCDIC family.\n\n**Note:** ASCII-incompatible encodings are those that don\'t map the 8-bit code points `0x20` to `0x7E` to the `0x0020` to `0x007E` Unicode code points)\n\n*   Authors **must not** use `CESU-8`, `UTF-7`, `BOCU-1` and/or `SCSU` as [cross-site scripting](/en-US/docs/Glossary/Cross-site_scripting) attacks with these encodings have been demonstrated.\n*   Authors should not use `UTF-32` because not all HTML5 encoding algorithms can distinguish it from `UTF-16`.\n\n**Notes:**\n\n*   The declared character encoding must match the one the page was saved with to avoid garbled characters and security holes.\n*   The [`<meta>`](/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") element declaring the encoding must be inside the [`<head>`](/en-US/docs/Web/HTML/Element/head "The HTML <head> element provides general information (metadata) about the document, including its title and links to its scripts and style sheets.") element and **within the first 1024 bytes** of the HTML as some browsers only look at those bytes before choosing an encoding.\n*   This [`<meta>`](/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") element is only one part of the [algorithm to determine a page\'s character set](https://www.whatwg.org/specs/web-apps/current-work/multipage/parsing.html#encoding-sniffing-algorithm "Algorithm charset page"). The [`Content-Type` header](/en-US/docs/Web/HTTP/Headers/Content-Type) and any [Byte-Order Marks](/en-US/docs/Glossary/Byte-Order_Mark "The definition of that term (Byte-Order Marks) has not been written yet; please consider contributing it!") override this element.\n*   It is strongly recommended to define the character encoding. If a page\'s encoding is undefined, cross-scripting techniques are possible, such as the [`UTF-7` fallback cross-scripting technique](https://code.google.com/p/doctype-mirror/wiki/ArticleUtf7).\n*   The [`<meta>`](/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") element with a `charset` attribute is a synonym for the pre-HTML5 `<meta http-equiv="Content-Type" content="text/html; charset=_IANAcharset_">`, where _`IANAcharset`_ contains the value of the equivalent `[charset](/en-US/docs/Web/HTML/Element/meta#attr-charset)` attribute. This syntax is still allowed, although no longer recommended.'
              },
              {
                name: 'scheme',
                description:
                  'This attribute defines the scheme in which metadata is described. A scheme is a context leading to the correct interpretations of the `[content](/en-US/docs/Web/HTML/Element/meta#attr-content)` value, like a format.\n\n**Warning:** Do not use this value, as it is obsolete. There is no replacement as there was no real usage for it.'
              }
            ]
          },
          {
            name: 'style',
            description:
              'The style element allows authors to embed style information in their documents. The style element is one of several inputs to the styling processing model. The element does not represent content for the user.',
            attributes: [
              {
                name: 'media',
                description:
                  'This attribute defines which media the style should be applied to. Its value is a media query, which defaults to all if the attribute is missing.\n'
              },
              {
                name: 'nonce',
                description:
                  'A cryptographic nonce (number used once) used to whitelist inline styles in a style-src Content-Security-Policy. The server must generate a unique nonce value each time it transmits a policy. It is critical to provide a nonce that cannot be guessed as bypassing a resource’s policy is otherwise trivial.\n'
              },
              {
                name: 'type',
                description:
                  'This attribute defines the styling language as a MIME type (charset should not be specified). This attribute is optional and defaults to text/css if it is not specified — there is very little reason to include this in modern web documents.\n'
              },
              { name: 'scoped', valueSet: 'v' },
              { name: 'title', description: 'This attribute specifies alternative style sheet sets.\n' }
            ]
          },
          {
            name: 'body',
            description: 'The body element represents the content of the document.',
            attributes: [
              { name: 'onafterprint', description: 'Function to call after the user has printed the document.' },
              { name: 'onbeforeprint', description: 'Function to call when the user requests printing of the document.' },
              { name: 'onbeforeunload', description: 'Function to call when the document is about to be unloaded.' },
              {
                name: 'onhashchange',
                description:
                  "Function to call when the fragment identifier part (starting with the hash (`'#'`) character) of the document's current address has changed."
              },
              { name: 'onlanguagechange', description: 'Function to call when the preferred languages changed.' },
              { name: 'onmessage', description: 'Function to call when the document has received a message.' },
              { name: 'onoffline', description: 'Function to call when network communication has failed.' },
              { name: 'ononline', description: 'Function to call when network communication has been restored.' },
              { name: 'onpagehide' },
              { name: 'onpageshow' },
              { name: 'onpopstate', description: 'Function to call when the user has navigated session history.' },
              { name: 'onstorage', description: 'Function to call when the storage area has changed.' },
              { name: 'onunload', description: 'Function to call when the document is going away.' },
              {
                name: 'alink',
                description:
                  'Color of text for hyperlinks when selected. _This method is non-conforming, use CSS [`color`](/en-US/docs/Web/CSS/color "The color CSS property sets the foreground color value of an element\'s text and text decorations, and sets the currentcolor value.") property in conjunction with the [`:active`](/en-US/docs/Web/CSS/:active "The :active CSS pseudo-class represents an element (such as a button) that is being activated by the user.") pseudo-class instead._'
              },
              {
                name: 'background',
                description:
                  'URI of a image to use as a background. _This method is non-conforming, use CSS [`background`](/en-US/docs/Web/CSS/background "The background shorthand CSS property sets all background style properties at once, such as color, image, origin and size, or repeat method.") property on the element instead._'
              },
              {
                name: 'bgcolor',
                description:
                  'Background color for the document. _This method is non-conforming, use CSS [`background-color`](/en-US/docs/Web/CSS/background-color "The background-color CSS property sets the background color of an element.") property on the element instead._'
              },
              {
                name: 'bottommargin',
                description:
                  'The margin of the bottom of the body. _This method is non-conforming, use CSS [`margin-bottom`](/en-US/docs/Web/CSS/margin-bottom "The margin-bottom CSS property sets the margin area on the bottom of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") property on the element instead._'
              },
              {
                name: 'leftmargin',
                description:
                  'The margin of the left of the body. _This method is non-conforming, use CSS [`margin-left`](/en-US/docs/Web/CSS/margin-left "The margin-left CSS property sets the margin area on the left side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") property on the element instead._'
              },
              {
                name: 'link',
                description:
                  'Color of text for unvisited hypertext links. _This method is non-conforming, use CSS [`color`](/en-US/docs/Web/CSS/color "The color CSS property sets the foreground color value of an element\'s text and text decorations, and sets the currentcolor value.") property in conjunction with the [`:link`](/en-US/docs/Web/CSS/:link "The :link CSS pseudo-class represents an element that has not yet been visited. It matches every unvisited <a>, <area>, or <link> element that has an href attribute.") pseudo-class instead._'
              },
              { name: 'onblur', description: 'Function to call when the document loses focus.' },
              { name: 'onerror', description: 'Function to call when the document fails to load properly.' },
              { name: 'onfocus', description: 'Function to call when the document receives focus.' },
              { name: 'onload', description: 'Function to call when the document has finished loading.' },
              { name: 'onredo', description: 'Function to call when the user has moved forward in undo transaction history.' },
              { name: 'onresize', description: 'Function to call when the document has been resized.' },
              { name: 'onundo', description: 'Function to call when the user has moved backward in undo transaction history.' },
              {
                name: 'rightmargin',
                description:
                  'The margin of the right of the body. _This method is non-conforming, use CSS [`margin-right`](/en-US/docs/Web/CSS/margin-right "The margin-right CSS property sets the margin area on the right side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") property on the element instead._'
              },
              {
                name: 'text',
                description:
                  'Foreground color of text. _This method is non-conforming, use CSS [`color`](/en-US/docs/Web/CSS/color "The color CSS property sets the foreground color value of an element\'s text and text decorations, and sets the currentcolor value.") property on the element instead._'
              },
              {
                name: 'topmargin',
                description:
                  'The margin of the top of the body. _This method is non-conforming, use CSS [`margin-top`](/en-US/docs/Web/CSS/margin-top "The margin-top CSS property sets the margin area on the top of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") property on the element instead._'
              },
              {
                name: 'vlink',
                description:
                  'Color of text for visited hypertext links. _This method is non-conforming, use CSS [`color`](/en-US/docs/Web/CSS/color "The color CSS property sets the foreground color value of an element\'s text and text decorations, and sets the currentcolor value.") property in conjunction with the [`:visited`](/en-US/docs/Web/CSS/:visited "The :visited CSS pseudo-class represents links that the user has already visited. For privacy reasons, the styles that can be modified using this selector are very limited.") pseudo-class instead._'
              }
            ]
          },
          {
            name: 'article',
            description:
              'The article element represents a complete, or self-contained, composition in a document, page, application, or site and that is, in principle, independently distributable or reusable, e.g. in syndication. This could be a forum post, a magazine or newspaper article, a blog entry, a user-submitted comment, an interactive widget or gadget, or any other independent item of content. Each article should be identified, typically by including a heading (h1–h6 element) as a child of the article element.',
            attributes: []
          },
          {
            name: 'section',
            description:
              'The section element represents a generic section of a document or application. A section, in this context, is a thematic grouping of content. Each section should be identified, typically by including a heading ( h1- h6 element) as a child of the section element.',
            attributes: []
          },
          {
            name: 'nav',
            description:
              'The nav element represents a section of a page that links to other pages or to parts within the page: a section with navigation links.',
            attributes: []
          },
          {
            name: 'aside',
            description:
              'The aside element represents a section of a page that consists of content that is tangentially related to the content around the aside element, and which could be considered separate from that content. Such sections are often represented as sidebars in printed typography.',
            attributes: []
          },
          { name: 'h1', description: 'The h1 element represents a section heading.', attributes: [] },
          { name: 'h2', description: 'The h2 element represents a section heading.', attributes: [] },
          { name: 'h3', description: 'The h3 element represents a section heading.', attributes: [] },
          { name: 'h4', description: 'The h4 element represents a section heading.', attributes: [] },
          { name: 'h5', description: 'The h5 element represents a section heading.', attributes: [] },
          { name: 'h6', description: 'The h6 element represents a section heading.', attributes: [] },
          {
            name: 'header',
            description:
              'The header element represents introductory content for its nearest ancestor sectioning content or sectioning root element. A header typically contains a group of introductory or navigational aids. When the nearest ancestor sectioning content or sectioning root element is the body element, then it applies to the whole page.',
            attributes: []
          },
          {
            name: 'footer',
            description:
              'The footer element represents a footer for its nearest ancestor sectioning content or sectioning root element. A footer typically contains information about its section such as who wrote it, links to related documents, copyright data, and the like.',
            attributes: []
          },
          {
            name: 'address',
            description:
              'The address element represents the contact information for its nearest article or body element ancestor. If that is the body element, then the contact information applies to the document as a whole.',
            attributes: []
          },
          { name: 'p', description: 'The p element represents a paragraph.', attributes: [] },
          {
            name: 'hr',
            description:
              'The hr element represents a paragraph-level thematic break, e.g. a scene change in a story, or a transition to another topic within a section of a reference book.',
            attributes: [
              { name: 'align', description: 'Sets the alignment of the rule on the page. If no value is specified, the default value is left.\n' },
              { name: 'color', description: 'Sets the color of the rule through color name or hexadecimal value.\n' },
              { name: 'noshade', description: 'Sets the rule to have no shading.\n' },
              { name: 'size', description: 'Sets the height, in pixels, of the rule.\n' },
              { name: 'width', description: 'Sets the length of the rule on the page through a pixel or percentage value.\n' }
            ]
          },
          {
            name: 'pre',
            description:
              'The pre element represents a block of preformatted text, in which structure is represented by typographic conventions rather than by elements.',
            attributes: [
              {
                name: 'cols',
                description:
                  'Contains the preferred count of characters that a line should have. It was a non-standard synonym of \\[width](/en-US/docs/Web/HTML/Element/pre#attr-width). To achieve such an effect, use CSS width instead.\n'
              },
              {
                name: 'width',
                description:
                  'Contains the preferred count of characters that a line should have. Though technically still implemented, this attribute has no visual effect; to achieve such an effect, use CSS width instead.\n'
              },
              {
                name: 'wrap',
                description:
                  'Is a hint indicating how the overflow must happen. In modern browser this hint is ignored and no visual effect results in its present; to achieve such an effect, use CSS white-space instead.\n'
              }
            ]
          },
          {
            name: 'blockquote',
            description:
              'The blockquote element represents content that is quoted from another source, optionally with a citation which must be within a footer or cite element, and optionally with in-line changes such as annotations and abbreviations.',
            attributes: [
              {
                name: 'cite',
                description:
                  'A URL that designates a source document or message for the information quoted. This attribute is intended to point to information explaining the context or the reference for the quote.'
              }
            ]
          },
          {
            name: 'ol',
            description:
              'The ol element represents a list of items, where the items have been intentionally ordered, such that changing the order would change the meaning of the document.',
            attributes: [
              {
                name: 'reversed',
                valueSet: 'v',
                description: 'This Boolean attribute specifies that the items of the list are specified in reversed order.'
              },
              {
                name: 'start',
                description:
                  'This integer attribute specifies the start value for numbering the individual list items. Although the ordering type of list elements might be Roman numerals, such as XXXI, or letters, the value of start is always represented as a number. To start numbering elements from the letter "C", use `<ol start="3">`.\n\n**Note**: This attribute was deprecated in HTML4, but reintroduced in HTML5.'
              },
              {
                name: 'type',
                valueSet: 'lt',
                description:
                  "Indicates the numbering type:\n\n*   `'a'` indicates lowercase letters,\n*   `'A'` indicates uppercase letters,\n*   `'i'` indicates lowercase Roman numerals,\n*   `'I'` indicates uppercase Roman numerals,\n*   and `'1'` indicates numbers (default).\n\nThe type set is used for the entire list unless a different `[type](/en-US/docs/Web/HTML/Element/li#attr-type)` attribute is used within an enclosed [`<li>`](/en-US/docs/Web/HTML/Element/li \"The HTML <li> element is used to represent an item in a list. It must be contained in a parent element: an ordered list (<ol>), an unordered list (<ul>), or a menu (<menu>). In menus and unordered lists, list items are usually displayed using bullet points. In ordered lists, they are usually displayed with an ascending counter on the left, such as a number or letter.\") element.\n\n**Note:** This attribute was deprecated in HTML4, but reintroduced in HTML5.\n\nUnless the value of the list number matters (e.g. in legal or technical documents where items are to be referenced by their number/letter), the CSS [`list-style-type`](/en-US/docs/Web/CSS/list-style-type \"The list-style-type CSS property sets the marker (such as a disc, character, or custom counter style) of a list item element.\") property should be used instead."
              },
              {
                name: 'compact',
                description:
                  'This Boolean attribute hints that the list should be rendered in a compact style. The interpretation of this attribute depends on the user agent and it doesn\'t work in all browsers.\n\n**Warning:** Do not use this attribute, as it has been deprecated: the [`<ol>`](/en-US/docs/Web/HTML/Element/ol "The HTML <ol> element represents an ordered list of items, typically rendered as a numbered list.") element should be styled using [CSS](/en-US/docs/CSS). To give an effect similar to the `compact` attribute, the [CSS](/en-US/docs/CSS) property [`line-height`](/en-US/docs/Web/CSS/line-height "The line-height CSS property sets the amount of space used for lines, such as in text. On block-level elements, it specifies the minimum height of line boxes within the element. On non-replaced inline elements, it specifies the height that is used to calculate line box height.") can be used with a value of `80%`.'
              }
            ]
          },
          {
            name: 'ul',
            description:
              'The ul element represents a list of items, where the order of the items is not important — that is, where changing the order would not materially change the meaning of the document.',
            attributes: [
              {
                name: 'compact',
                description:
                  'This Boolean attribute hints that the list should be rendered in a compact style. The interpretation of this attribute depends on the user agent and it doesn\'t work in all browsers.\n\n**Usage note: **Do not use this attribute, as it has been deprecated: the [`<ul>`](/en-US/docs/Web/HTML/Element/ul "The HTML <ul> element represents an unordered list of items, typically rendered as a bulleted list.") element should be styled using [CSS](/en-US/docs/CSS). To give a similar effect as the `compact` attribute, the [CSS](/en-US/docs/CSS) property [line-height](/en-US/docs/CSS/line-height) can be used with a value of `80%`.'
              }
            ]
          },
          {
            name: 'li',
            description:
              "The li element represents a list item. If its parent element is an ol, ul, or menu element, then the element is an item of the parent element's list, as defined for those elements. Otherwise, the list item has no defined list-related relationship to any other li element.",
            attributes: [
              {
                name: 'value',
                description:
                  'This integer attribute indicates the current ordinal value of the list item as defined by the [`<ol>`](/en-US/docs/Web/HTML/Element/ol "The HTML <ol> element represents an ordered list of items, typically rendered as a numbered list.") element. The only allowed value for this attribute is a number, even if the list is displayed with Roman numerals or letters. List items that follow this one continue numbering from the value set. The **value** attribute has no meaning for unordered lists ([`<ul>`](/en-US/docs/Web/HTML/Element/ul "The HTML <ul> element represents an unordered list of items, typically rendered as a bulleted list.")) or for menus ([`<menu>`](/en-US/docs/Web/HTML/Element/menu "The HTML <menu> element represents a group of commands that a user can perform or activate. This includes both list menus, which might appear across the top of a screen, as well as context menus, such as those that might appear underneath a button after it has been clicked.")).\n\n**Note**: This attribute was deprecated in HTML4, but reintroduced in HTML5.\n\n**Note:** Prior to Gecko 9.0, negative values were incorrectly converted to 0. Starting in Gecko 9.0 all integer values are correctly parsed.'
              },
              {
                name: 'type',
                description:
                  'This character attribute indicates the numbering type:\n\n*   `a`: lowercase letters\n*   `A`: uppercase letters\n*   `i`: lowercase Roman numerals\n*   `I`: uppercase Roman numerals\n*   `1`: numbers\n\nThis type overrides the one used by its parent [`<ol>`](/en-US/docs/Web/HTML/Element/ol "The HTML <ol> element represents an ordered list of items, typically rendered as a numbered list.") element, if any.\n\n**Usage note:** This attribute has been deprecated: use the CSS [`list-style-type`](/en-US/docs/Web/CSS/list-style-type "The list-style-type CSS property sets the marker (such as a disc, character, or custom counter style) of a list item element.") property instead.'
              }
            ]
          },
          {
            name: 'dl',
            description:
              'The dl element represents an association list consisting of zero or more name-value groups (a description list). A name-value group consists of one or more names (dt elements) followed by one or more values (dd elements), ignoring any nodes other than dt and dd elements. Within a single dl element, there should not be more than one dt element for each name.',
            attributes: []
          },
          {
            name: 'dt',
            description: 'The dt element represents the term, or name, part of a term-description group in a description list (dl element).',
            attributes: []
          },
          {
            name: 'dd',
            description:
              'The dd element represents the description, definition, or value, part of a term-description group in a description list (dl element).',
            attributes: [
              {
                name: 'nowrap',
                description: 'If the value of this attribute is set to yes, the definition text will not wrap. The default value is no.\n'
              }
            ]
          },
          {
            name: 'figure',
            description:
              'The figure element represents some flow content, optionally with a caption, that is self-contained (like a complete sentence) and is typically referenced as a single unit from the main flow of the document.',
            attributes: []
          },
          {
            name: 'figcaption',
            description:
              "The figcaption element represents a caption or legend for the rest of the contents of the figcaption element's parent figure element, if any.",
            attributes: []
          },
          {
            name: 'main',
            description:
              'The main element represents the main content of the body of a document or application. The main content area consists of content that is directly related to or expands upon the central topic of a document or central functionality of an application.',
            attributes: []
          },
          {
            name: 'div',
            description:
              'The div element has no special meaning at all. It represents its children. It can be used with the class, lang, and title attributes to mark up semantics common to a group of consecutive elements.',
            attributes: []
          },
          {
            name: 'a',
            description: 'If the a element has an href attribute, then it represents a hyperlink (a hypertext anchor) labeled by its contents.',
            attributes: [
              { name: 'href', description: 'Contains a URL or a URL fragment that the hyperlink points to.\n' },
              {
                name: 'target',
                description:
                  'Specifies where to display the linked URL. It is a name of, or keyword for, a browsing context: a tab, window, or &lt;iframe>. The following keywords have special meanings:\n\n\\_self: Load the URL into the same browsing context as the current one. This is the default behavior.\n\n\\_blank: Load the URL into a new browsing context. This is usually a tab, but users can configure browsers to use new windows instead.\n\n\\_parent: Load the URL into the parent browsing context of the current one. If there is no parent, this behaves the same way as \\_self.\n\n\\_top: Load the URL into the top-level browsing context (that is, the "highest" browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this behaves the same way as \\_self.\n\nNote: When using target, consider adding rel="noreferrer" to avoid exploitation of the window.opener API.\n\nNote: Linking to another page using target="\\_blank" will run the new page on the same process as your page. If the new page is executing expensive JS, your page\'s performance may suffer. To avoid this use rel="noopener".\n'
              },
              {
                name: 'download',
                description:
                  'This attribute instructs browsers to download a URL instead of navigating to it, so the user will be prompted to save it as a local file. If the attribute has a value, it is used as the pre-filled file name in the Save prompt (the user can still change the file name if they want). There are no restrictions on allowed values, though / and \\\\ are converted to underscores. Most file systems limit some punctuation in file names, and browsers will adjust the suggested name accordingly.\n\nNotes:\n\nThis attribute only works for same-origin URLs.\n\nAlthough HTTP(s) URLs need to be in the same-origin, blob: URLs and data: URLs are allowed so that content generated by JavaScript, such as pictures created in an image-editor Web app, can be downloaded.\n\nIf the HTTP header Content-Disposition: gives a different filename than this attribute, the HTTP header takes priority over this attribute.\n\nIf Content-Disposition: is set to inline, Firefox prioritizes Content-Disposition, like the filename case, while Chrome prioritizes the download attribute.\n'
              },
              {
                name: 'ping',
                description:
                  'Contains a space-separated list of URLs to which, when the hyperlink is followed, POST requests with the body PING will be sent by the browser (in the background). Typically used for tracking.\n'
              },
              {
                name: 'rel',
                description:
                  'Specifies the relationship of the target object to the link object. The value is a space-separated list of link types.\n'
              },
              {
                name: 'hreflang',
                description:
                  'This attribute indicates the human language of the linked resource. It is purely advisory, with no built-in functionality. Allowed values are determined by BCP47.\n'
              },
              {
                name: 'type',
                description:
                  'Specifies the media type in the form of a MIME type is a string sent along with a file indicating the type of the file (describing the content format, for example, a sound file might be labeled audio/ogg, or an image file image/png).") for the linked URL. It is purely advisory, with no built-in functionality.\n'
              },
              {
                name: 'referrerpolicy',
                description:
                  "Indicates which referrer to send when fetching the URL:\n\n'no-referrer' means the Referer: header will not be sent.\n\n'no-referrer-when-downgrade' means no Referer: header will be sent when navigating to an origin without HTTPS. This is the default behavior.\n\n'origin' means the referrer will be the origin of the page, not including information after the domain.\n\n'origin-when-cross-origin' meaning that navigations to other origins will be limited to the scheme, the host and the port, while navigations on the same origin will include the referrer's path.\n\n'strict-origin-when-cross-origin'\n\n'unsafe-url' means the referrer will include the origin and path, but not the fragment, password, or username. This is unsafe because it can leak data from secure URLs to insecure ones.\n"
              }
            ]
          },
          { name: 'em', description: 'The em element represents stress emphasis of its contents.', attributes: [] },
          {
            name: 'strong',
            description: 'The strong element represents strong importance, seriousness, or urgency for its contents.',
            attributes: []
          },
          { name: 'small', description: 'The small element represents side comments such as small print.', attributes: [] },
          { name: 's', description: 'The s element represents contents that are no longer accurate or no longer relevant.', attributes: [] },
          {
            name: 'cite',
            description:
              'The cite element represents a reference to a creative work. It must include the title of the work or the name of the author(person, people or organization) or an URL reference, or a reference in abbreviated form as per the conventions used for the addition of citation metadata.',
            attributes: []
          },
          {
            name: 'q',
            description: 'The q element represents some phrasing content quoted from another source.',
            attributes: [
              {
                name: 'cite',
                description:
                  'The value of this attribute is a URL that designates a source document or message for the information quoted. This attribute is intended to point to information explaining the context or the reference for the quote.\n'
              }
            ]
          },
          {
            name: 'dfn',
            description:
              'The dfn element represents the defining instance of a term. The paragraph, description list group, or section that is the nearest ancestor of the dfn element must also contain the definition(s) for the term given by the dfn element.',
            attributes: []
          },
          {
            name: 'abbr',
            description:
              'The abbr element represents an abbreviation or acronym, optionally with its expansion. The title attribute may be used to provide an expansion of the abbreviation. The attribute, if specified, must contain an expansion of the abbreviation, and nothing else.',
            attributes: []
          },
          {
            name: 'ruby',
            description:
              'The ruby element allows one or more spans of phrasing content to be marked with ruby annotations. Ruby annotations are short runs of text presented alongside base text, primarily used in East Asian typography as a guide for pronunciation or to include other annotations. In Japanese, this form of typography is also known as furigana. Ruby text can appear on either side, and sometimes both sides, of the base text, and it is possible to control its position using CSS. A more complete introduction to ruby can be found in the Use Cases & Exploratory Approaches for Ruby Markup document as well as in CSS Ruby Module Level 1. [RUBY-UC] [CSSRUBY]',
            attributes: []
          },
          {
            name: 'rb',
            description:
              "The rb element marks the base text component of a ruby annotation. When it is the child of a ruby element, it doesn't represent anything itself, but its parent ruby element uses it as part of determining what it represents.",
            attributes: []
          },
          {
            name: 'rt',
            description:
              "The rt element marks the ruby text component of a ruby annotation. When it is the child of a ruby element or of an rtc element that is itself the child of a ruby element, it doesn't represent anything itself, but its ancestor ruby element uses it as part of determining what it represents.",
            attributes: []
          },
          {
            name: 'rp',
            description:
              "The rp element is used to provide fallback text to be shown by user agents that don't support ruby annotations. One widespread convention is to provide parentheses around the ruby text component of a ruby annotation.",
            attributes: []
          },
          {
            name: 'time',
            description:
              'The time element represents its contents, along with a machine-readable form of those contents in the datetime attribute. The kind of content is limited to various kinds of dates, times, time-zone offsets, and durations, as described below.',
            attributes: [
              {
                name: 'datetime',
                description: 'This attribute indicates the time and/or date of the element and must be in one of the formats described below.\n'
              }
            ]
          },
          {
            name: 'code',
            description:
              'The code element represents a fragment of computer code. This could be an XML element name, a file name, a computer program, or any other string that a computer would recognize.',
            attributes: []
          },
          {
            name: 'var',
            description:
              'The var element represents a variable. This could be an actual variable in a mathematical expression or programming context, an identifier representing a constant, a symbol identifying a physical quantity, a function parameter, or just be a term used as a placeholder in prose.',
            attributes: []
          },
          {
            name: 'samp',
            description: 'The samp element represents sample or quoted output from another program or computing system.',
            attributes: []
          },
          {
            name: 'kbd',
            description:
              'The kbd element represents user input (typically keyboard input, although it may also be used to represent other input, such as voice commands).',
            attributes: []
          },
          { name: 'sub', description: 'The sub element represents a subscript.', attributes: [] },
          { name: 'sup', description: 'The sup element represents a superscript.', attributes: [] },
          {
            name: 'i',
            description:
              'The i element represents a span of text in an alternate voice or mood, or otherwise offset from the normal prose in a manner indicating a different quality of text, such as a taxonomic designation, a technical term, an idiomatic phrase from another language, transliteration, a thought, or a ship name in Western texts.',
            attributes: []
          },
          {
            name: 'b',
            description:
              'The b element represents a span of text to which attention is being drawn for utilitarian purposes without conveying any extra importance and with no implication of an alternate voice or mood, such as key words in a document abstract, product names in a review, actionable words in interactive text-driven software, or an article lede.',
            attributes: []
          },
          {
            name: 'u',
            description:
              'The u element represents a span of text with an unarticulated, though explicitly rendered, non-textual annotation, such as labeling the text as being a proper name in Chinese text (a Chinese proper name mark), or labeling the text as being misspelt.',
            attributes: []
          },
          {
            name: 'mark',
            description:
              "The mark element represents a run of text in one document marked or highlighted for reference purposes, due to its relevance in another context. When used in a quotation or other block of text referred to from the prose, it indicates a highlight that was not originally present but which has been added to bring the reader's attention to a part of the text that might not have been considered important by the original author when the block was originally written, but which is now under previously unexpected scrutiny. When used in the main prose of a document, it indicates a part of the document that has been highlighted due to its likely relevance to the user's current activity.",
            attributes: []
          },
          {
            name: 'bdi',
            description:
              'The bdi element represents a span of text that is to be isolated from its surroundings for the purposes of bidirectional text formatting. [BIDI]',
            attributes: []
          },
          {
            name: 'bdo',
            description:
              'The bdo element represents explicit text directionality formatting control for its children. It allows authors to override the Unicode bidirectional algorithm by explicitly specifying a direction override. [BIDI]',
            attributes: [
              {
                name: 'dir',
                description:
                  "The direction in which text should be rendered in this element's contents. Possible values are:\n\nltr: Indicates that the text should go in a left-to-right direction.\n\nrtl: Indicates that the text should go in a right-to-left direction.\n"
              }
            ]
          },
          {
            name: 'span',
            description:
              "The span element doesn't mean anything on its own, but can be useful when used together with the global attributes, e.g. class, lang, or dir. It represents its children.",
            attributes: []
          },
          {
            name: 'br',
            description: 'The br element represents a line break.',
            attributes: [{ name: 'clear', description: 'Indicates where to begin the next line after the break.' }]
          },
          { name: 'wbr', description: 'The wbr element represents a line break opportunity.', attributes: [] },
          {
            name: 'ins',
            description: 'The ins element represents an addition to the document.',
            attributes: [
              {
                name: 'cite',
                description:
                  'This attribute defines the URI of a resource that explains the change, such as a link to meeting minutes or a ticket in a troubleshooting system.\n'
              },
              {
                name: 'datetime',
                description:
                  'This attribute indicates the time and date of the change and must be a valid date with an optional time string. If the value cannot be parsed as a date with an optional time string, the element does not have an associated time stamp. For the format of the string without a time, see Format of a valid date string in Date and time formats used in HTML. The format of the string if it includes both date and time is covered in Format of a valid local date and time string in Date and time formats used in HTML.\n'
              }
            ]
          },
          {
            name: 'del',
            description: 'The del element represents a removal from the document.',
            attributes: [
              { name: 'cite', description: 'A URI for a resource that explains the change (for example, meeting minutes).\n' },
              {
                name: 'datetime',
                description:
                  'This attribute indicates the time and date of the change and must be a valid date string with an optional time. If the value cannot be parsed as a date with an optional time string, the element does not have an associated time stamp. For the format of the string without a time, see Format of a valid date string in Date and time formats used in HTML. The format of the string if it includes both date and time is covered in Format of a valid local date and time string in Date and time formats used in HTML.\n'
              }
            ]
          },
          {
            name: 'picture',
            description:
              'The picture element is a container which provides multiple sources to its contained img element to allow authors to declaratively control or give hints to the user agent about which image resource to use, based on the screen pixel density, viewport size, image format, and other factors. It represents its children.',
            attributes: []
          },
          {
            name: 'img',
            description: 'An img element represents an image.',
            attributes: [
              {
                name: 'alt',
                description:
                  'This attribute defines an alternative text description of the image.\n\nNote: Browsers do not always display the image referenced by the element. This is the case for non-graphical browsers (including those used by people with visual impairments), if the user chooses not to display images, or if the browser cannot display the image because it is invalid or an unsupported type. In these cases, the browser may replace the image with the text defined in this element\'s alt attribute. You should, for these reasons and others, provide a useful value for alt whenever possible.\n\nNote: Omitting this attribute altogether indicates that the image is a key part of the content, and no textual equivalent is available. Setting this attribute to an empty string (alt="") indicates that this image is not a key part of the content (decorative), and that non-visual browsers may omit it from rendering.\n'
              },
              {
                name: 'src',
                description:
                  "The image URL. This attribute is mandatory for the &lt;img> element. On browsers supporting srcset, src is treated like a candidate image with a pixel density descriptor 1x unless an image with this pixel density descriptor is already defined in srcset, or unless srcset contains 'w' descriptors.\n"
              },
              {
                name: 'srcset',
                description:
                  "A list of one or more strings separated by commas indicating a set of possible image sources for the user agent to use. Each string is composed of:\n\na URL to an image,\n\noptionally, whitespace followed by one of:\n\nA width descriptor, or a positive integer directly followed by 'w'. The width descriptor is divided by the source size given in the sizes attribute to calculate the effective pixel density.\n\nA pixel density descriptor, which is a positive floating point number directly followed by 'x'.\n\nIf no descriptor is specified, the source is assigned the default descriptor: 1x.\n\nIt is incorrect to mix width descriptors and pixel density descriptors in the same srcset attribute. Duplicate descriptors (for instance, two sources in the same srcset which are both described with '2x') are also invalid.\n\nThe user agent selects any one of the available sources at its discretion. This provides them with significant leeway to tailor their selection based on things like user preferences or bandwidth conditions. See our Responsive images tutorial for an example.\n"
              },
              {
                name: 'crossorigin',
                valueSet: 'xo',
                description:
                  'This enumerated attribute indicates if the fetching of the related image must be done using CORS or not. CORS-enabled images can be reused in the &lt;canvas> element without being "tainted." The allowed values are:\n'
              },
              {
                name: 'usemap',
                description:
                  "The partial URL (starting with '#') of an image map associated with the element.\n\nNote: You cannot use this attribute if the &lt;img> element is a descendant of an &lt;a> or &lt;button> element.\n"
              },
              {
                name: 'ismap',
                valueSet: 'v',
                description:
                  'This Boolean attribute indicates that the image is part of a server-side map. If so, the precise coordinates of a click are sent to the server.\n\nNote: This attribute is allowed only if the &lt;img> element is a descendant of an &lt;a> element with a valid \\[href](/en-US/docs/Web/HTML/Element/a#attr-href) attribute.\n'
              },
              { name: 'width', description: 'The intrinsic width of the image in pixels.\n' },
              { name: 'height', description: 'The intrinsic height of the image in pixels.\n' },
              { name: 'decoding', description: 'Provides an image decoding hint to the browser. The allowed values are:\n' },
              {
                name: 'decoding',
                description:
                  'sync\n\nDecode the image synchronously for atomic presentation with other content.\n\nasync\n\nDecode the image asynchronously to reduce delay in presenting other content.\n\nauto\n\nDefault mode, which indicates no preference for the decoding mode. The browser decides what is best for the user.\n'
              },
              {
                name: 'importance',
                description: 'Indicates the relative importance of the resource. Priority hints are delegated using the values:\n'
              },
              {
                name: 'importance',
                description:
                  'auto: Indicates no preference. The browser may use its own heuristics to decide the priority of the image.\n\nhigh: Indicates to the browser that the image is of high priority.\n\nlow: Indicates to the browser that the image is of low priority.\n'
              },
              {
                name: 'intrinsicsize',
                description:
                  'This attribute tells the browser to ignore the actual intrinsic size of the image and pretend it’s the size specified in the attribute. Specifically, the image would raster at these dimensions and naturalWidth/naturalHeight on images would return the values specified in this attribute. Explainer, examples\n'
              },
              {
                name: 'referrerpolicy',
                description:
                  "A string indicating which referrer to use when fetching the resource:\n\nno-referrer: The Referer header will not be sent.\n\nno-referrer-when-downgrade: No Referer header will be sent when navigating to an origin without TLS (HTTPS). This is a user agent’s default behavior if no policy is otherwise specified.\n\norigin: The Referer header will include the page of origin's scheme, the host, and the port.\n\norigin-when-cross-origin: Navigating to other origins will limit the included referral data to the scheme, the host and the port, while navigating from the same origin will include the referrer's full path.\n\nunsafe-url: The Referer header will include the origin and the path, but not the fragment, password, or username. This case is unsafe because it can leak origins and paths from TLS-protected resources to insecure origins.\n"
              },
              {
                name: 'sizes',
                description:
                  "A list of one or more strings separated by commas indicating a set of source sizes. Each source size consists of:\n\na media condition. This must be omitted for the last item.\n\na source size value.\n\nSource size values specify the intended display size of the image. User agents use the current source size to select one of the sources supplied by the srcset attribute, when those sources are described using width ('w') descriptors. The selected source size affects the intrinsic size of the image (the image’s display size if no CSS styling is applied). If the srcset attribute is absent, or contains no values with a width (w) descriptor, then the sizes attribute has no effect.\n"
              }
            ]
          },
          {
            name: 'iframe',
            description: 'The iframe element represents a nested browsing context.',
            attributes: [
              {
                name: 'src',
                description:
                  "The URL of the page to embed. Use a value of about:blank to embed an empty page that conforms to the same-origin policy. Also note that programatically removing an &lt;iframe>'s src attribute (e.g. via Element.removeAttribute()) causes about:blank to be loaded in the frame in Firefox (from version 65), Chromium-based browsers, and Safari/iOS.\n"
              },
              {
                name: 'srcdoc',
                description:
                  'Inline HTML to embed, overriding the src attribute. If a browser does not support the srcdoc attribute, it will fall back to the URL in the src attribute.\n'
              },
              {
                name: 'name',
                description:
                  'A targetable name for the embedded browsing context. This can be used in the target attribute of the &lt;a>, &lt;form>, or &lt;base> elements; the formtarget attribute of the &lt;input> or &lt;button> elements; or the windowName parameter in the window.open() method.\n'
              },
              {
                name: 'sandbox',
                valueSet: 'sb',
                description:
                  'Applies extra restrictions to the content in the frame. The value of the attribute can either be empty to apply all restrictions, or space-separated tokens to lift particular restrictions:\n\nallow-forms: Allows the resource to submit forms. If this keyword is not used, form submission is blocked.\n\nallow-modals: Lets the resource open modal windows.\n\nallow-orientation-lock: Lets the resource lock the screen orientation.\n\nallow-pointer-lock: Lets the resource use the Pointer Lock API.\n\nallow-popups: Allows popups (such as window.open(), target="\\_blank", or showModalDialog()). If this keyword is not used, the popup will silently fail to open.\n\nallow-popups-to-escape-sandbox: Lets the sandboxed document open new windows without those windows inheriting the sandboxing. For example, this can safely sandbox an advertisement without forcing the same restrictions upon the page the ad links to.\n\nallow-presentation: Lets the resource start a presentation session.\n\nallow-same-origin: If this token is not used, the resource is treated as being from a special origin that always fails the same-origin policy.\n\nallow-scripts: Lets the resource run scripts (but not create popup windows).\n\nallow-storage-access-by-user-activation : Lets the resource request access to the parent\'s storage capabilities with the Storage Access API.\n\nallow-top-navigation: Lets the resource navigate the top-level browsing context (the one named \\_top).\n\nallow-top-navigation-by-user-activation: Lets the resource navigate the top-level browsing context, but only if initiated by a user gesture.\n\nNotes about sandboxing:\n\nWhen the embedded document has the same origin as the embedding page, it is strongly discouraged to use both allow-scripts and allow-same-origin, as that lets the embedded document remove the sandbox attribute — making it no more secure than not using the sandbox attribute at all.\n\nSandboxing is useless if the attacker can display content outside a sandboxed iframe — such as if the viewer opens the frame in a new tab. Such content should be also served from a separate origin to limit potential damage.\n\nThe sandbox attribute is unsupported in Internet Explorer 9 and earlier.\n'
              },
              { name: 'seamless', valueSet: 'v' },
              {
                name: 'allowfullscreen',
                valueSet: 'v',
                description: 'Set to true if the &lt;iframe> can activate fullscreen mode by calling the requestFullscreen() method.\n'
              },
              { name: 'width', description: 'The width of the frame in CSS pixels. Default is 300.\n' },
              { name: 'height', description: 'The height of the frame in CSS pixels. Default is 150.\n' },
              { name: 'allow', description: 'Specifies a feature policy for the &lt;iframe>.\n' },
              {
                name: 'allowpaymentrequest',
                description: 'Set to true if a cross-origin &lt;iframe> should be allowed to invoke the Payment Request API.\n'
              },
              { name: 'allowpaymentrequest', description: 'This attribute is considered a legacy attribute and redefined as allow="payment".\n' },
              { name: 'csp', description: 'A Content Security Policy enforced for the embedded resource. See HTMLIFrameElement.csp for details.\n' },
              {
                name: 'importance',
                description:
                  "The download priority of the resource in the &lt;iframe>'s src attribute. Allowed values:\n\nauto (default)\n\nNo preference. The browser uses its own heuristics to decide the priority of the resource.\n\nhigh\n\nThe resource should be downloaded before other lower-priority page resources.\n\nlow\n\nThe resource should be downloaded after other higher-priority page resources.\n"
              },
              {
                name: 'referrerpolicy',
                description:
                  "Indicates which referrer to send when fetching the frame's resource:\n\nno-referrer: The Referer header will not be sent.\n\nno-referrer-when-downgrade (default): The Referer header will not be sent to origins without TLS (HTTPS).\n\norigin: The sent referrer will be limited to the origin of the referring page: its scheme, host, and port.\n\norigin-when-cross-origin: The referrer sent to other origins will be limited to the scheme, the host, and the port. Navigations on the same origin will still include the path.\n\nsame-origin: A referrer will be sent for same origin, but cross-origin requests will contain no referrer information.\n\nstrict-origin: Only send the origin of the document as the referrer when the protocol security level stays the same (HTTPS→HTTPS), but don't send it to a less secure destination (HTTPS→HTTP).\n\nstrict-origin-when-cross-origin: Send a full URL when performing a same-origin request, only send the origin when the protocol security level stays the same (HTTPS→HTTPS), and send no header to a less secure destination (HTTPS→HTTP).\n\nunsafe-url: The referrer will include the origin and the path (but not the fragment, password, or username). This value is unsafe, because it leaks origins and paths from TLS-protected resources to insecure origins.\n"
              }
            ]
          },
          {
            name: 'embed',
            description: 'The embed element provides an integration point for an external (typically non-HTML) application or interactive content.',
            attributes: [
              { name: 'src', description: 'The URL of the resource being embedded.' },
              { name: 'type', description: 'The MIME type to use to select the plug-in to instantiate.' },
              {
                name: 'width',
                description:
                  'The displayed width of the resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). This must be an absolute value; percentages are _not_ allowed.'
              },
              {
                name: 'height',
                description:
                  'The displayed height of the resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). This must be an absolute value; percentages are _not_ allowed.'
              }
            ]
          },
          {
            name: 'object',
            description:
              'The object element can represent an external resource, which, depending on the type of the resource, will either be treated as an image, as a nested browsing context, or as an external resource to be processed by a plugin.',
            attributes: [
              { name: 'data', description: 'The address of the resource as a valid URL. At least one of **data** and **type** must be defined.' },
              {
                name: 'type',
                description:
                  'The [content type](/en-US/docs/Glossary/Content_type) of the resource specified by **data**. At least one of **data** and **type** must be defined.'
              },
              {
                name: 'typemustmatch',
                valueSet: 'v',
                description:
                  'This Boolean attribute indicates if the **type** attribute and the actual [content type](/en-US/docs/Glossary/Content_type) of the resource must match to be used.'
              },
              { name: 'name', description: 'The name of valid browsing context (HTML5), or the name of the control (HTML 4).' },
              {
                name: 'usemap',
                description:
                  'A hash-name reference to a [`<map>`](/en-US/docs/Web/HTML/Element/map "The HTML <map> element is used with <area> elements to define an image map (a clickable link area).") element; that is a \'#\' followed by the value of a `[name](/en-US/docs/Web/HTML/Element/map#attr-name)` of a map element.'
              },
              {
                name: 'form',
                description:
                  'The form element, if any, that the object element is associated with (its _form owner_). The value of the attribute must be an ID of a [`<form>`](/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element in the same document.'
              },
              {
                name: 'width',
                description:
                  'The width of the display resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). -- (Absolute values only. [NO percentages](https://html.spec.whatwg.org/multipage/embedded-content.html#dimension-attributes))'
              },
              {
                name: 'height',
                description:
                  'The height of the displayed resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). -- (Absolute values only. [NO percentages](https://html.spec.whatwg.org/multipage/embedded-content.html#dimension-attributes))'
              },
              { name: 'archive', description: 'A space-separated list of URIs for archives of resources for the object.' },
              { name: 'border', description: 'The width of a border around the control, in pixels.' },
              {
                name: 'classid',
                description: "The URI of the object's implementation. It can be used together with, or in place of, the **data** attribute."
              },
              {
                name: 'codebase',
                description:
                  'The base path used to resolve relative URIs specified by **classid**, **data**, or **archive**. If not specified, the default is the base URI of the current document.'
              },
              { name: 'codetype', description: 'The content type of the data specified by **classid**.' },
              {
                name: 'declare',
                description:
                  'The presence of this Boolean attribute makes this element a declaration only. The object must be instantiated by a subsequent `<object>` element. In HTML5, repeat the <object> element completely each that that the resource is reused.'
              },
              { name: 'standby', description: "A message that the browser can show while loading the object's implementation and data." },
              { name: 'tabindex', description: 'The position of the element in the tabbing navigation order for the current document.' }
            ]
          },
          {
            name: 'param',
            description: 'The param element defines parameters for plugins invoked by object elements. It does not represent anything on its own.',
            attributes: [
              { name: 'name', description: 'Name of the parameter.' },
              { name: 'value', description: 'Specifies the value of the parameter.' },
              {
                name: 'type',
                description: 'Only used if the `valuetype` is set to "ref". Specifies the MIME type of values found at the URI specified by value.'
              },
              {
                name: 'valuetype',
                description:
                  'Specifies the type of the `value` attribute. Possible values are:\n\n*   data: Default value. The value is passed to the object\'s implementation as a string.\n*   ref: The value is a URI to a resource where run-time values are stored.\n*   object: An ID of another [`<object>`](/en-US/docs/Web/HTML/Element/object "The HTML <object> element represents an external resource, which can be treated as an image, a nested browsing context, or a resource to be handled by a plugin.") in the same document.'
              }
            ]
          },
          {
            name: 'video',
            description: 'A video element is used for playing videos or movies, and audio files with captions.',
            attributes: [
              { name: 'src' },
              { name: 'crossorigin', valueSet: 'xo' },
              { name: 'poster' },
              { name: 'preload', valueSet: 'pl' },
              {
                name: 'autoplay',
                valueSet: 'v',
                description:
                  'A Boolean attribute; if specified, the video automatically begins to play back as soon as it can do so without stopping to finish loading the data.\n'
              },
              { name: 'mediagroup' },
              { name: 'loop', valueSet: 'v' },
              { name: 'muted', valueSet: 'v' },
              { name: 'controls', valueSet: 'v' },
              { name: 'width' },
              { name: 'height' }
            ]
          },
          {
            name: 'audio',
            description: 'An audio element represents a sound or audio stream.',
            attributes: [
              {
                name: 'src',
                description:
                  'The URL of the audio to embed. This is subject to HTTP access controls. This is optional; you may instead use the &lt;source> element within the audio block to specify the audio to embed.\n'
              },
              {
                name: 'crossorigin',
                valueSet: 'xo',
                description:
                  'This enumerated attribute indicates whether to use CORS to fetch the related image. CORS-enabled resources can be reused in the &lt;canvas> element without being tainted. The allowed values are:\n\nanonymous\n\nSends a cross-origin request without a credential. In other words, it sends the Origin: HTTP header without a cookie, X.509 certificate, or performing HTTP Basic authentication. If the server does not give credentials to the origin site (by not setting the Access-Control-Allow-Origin: HTTP header), the image will be tainted, and its usage restricted.\n\nuse-credentials\n\nSends a cross-origin request with a credential. In other words, it sends the Origin: HTTP header with a cookie, a certificate, or performing HTTP Basic authentication. If the server does not give credentials to the origin site (through Access-Control-Allow-Credentials: HTTP header), the image will be tainted and its usage restricted.\n\nWhen not present, the resource is fetched without a CORS request (i.e. without sending the Origin: HTTP header), preventing its non-tainted used in &lt;canvas> elements. If invalid, it is handled as if the enumerated keyword anonymous was used. See CORS settings attributes for additional information.\n'
              },
              {
                name: 'preload',
                valueSet: 'pl',
                description:
                  "This enumerated attribute is intended to provide a hint to the browser about what the author thinks will lead to the best user experience. It may have one of the following values:\n\nnone: Indicates that the audio should not be preloaded.\n\nmetadata: Indicates that only audio metadata (e.g. length) is fetched.\n\nauto: Indicates that the whole audio file can be downloaded, even if the user is not expected to use it.\n\nempty string: A synonym of the auto value.\n\nIf not set, preload's default value is browser-defined (i.e. each browser may have its own default value). The spec advises it to be set to metadata.\n\nUsage notes:\n\nThe autoplay attribute has precedence over preload. If autoplay is specified, the browser would obviously need to start downloading the audio for playback.\n\nThe browser is not forced by the specification to follow the value of this attribute; it is a mere hint.\n"
              },
              {
                name: 'autoplay',
                valueSet: 'v',
                description:
                  'A Boolean attribute: if specified, the audio will automatically begin playback as soon as it can do so, without waiting for the entire audio file to finish downloading.\n\nNote: Sites that automatically play audio (or videos with an audio track) can be an unpleasant experience for users, so should be avoided when possible. If you must offer autoplay functionality, you should make it opt-in (requiring a user to specifically enable it). However, this can be useful when creating media elements whose source will be set at a later time, under user control.\n'
              },
              { name: 'mediagroup' },
              {
                name: 'loop',
                valueSet: 'v',
                description:
                  'A Boolean attribute: if specified, the audio player will automatically seek back to the start upon reaching the end of the audio.\n'
              },
              {
                name: 'muted',
                valueSet: 'v',
                description: 'A Boolean attribute that indicates whether the audio will be initially silenced. Its default value is false.\n'
              },
              {
                name: 'controls',
                valueSet: 'v',
                description:
                  'If this attribute is present, the browser will offer controls to allow the user to control audio playback, including volume, seeking, and pause/resume playback.\n'
              }
            ]
          },
          {
            name: 'source',
            description:
              'The source element allows authors to specify multiple alternative media resources for media elements. It does not represent anything on its own.',
            attributes: [
              {
                name: 'src',
                description:
                  'Required for &lt;audio> and &lt;video>, address of the media resource. The value of this attribute is ignored when the &lt;source> element is placed inside a &lt;picture> element.\n'
              },
              {
                name: 'type',
                description:
                  'The MIME-type of the resource, optionally with a codecs parameter. See RFC 4281 for information about how to specify codecs.\n'
              },
              {
                name: 'sizes',
                description:
                  'Is a list of source sizes that describes the final rendered width of the image represented by the source. Each source size consists of a comma-separated list of media condition-length pairs. This information is used by the browser to determine, before laying the page out, which image defined in \\[srcset](/en-US/docs/Web/HTML/Element/source#attr-srcset) to use.\nThe sizes attribute has an effect only when the &lt;source> element is the direct child of a &lt;picture> element.\n'
              },
              {
                name: 'srcset',
                description:
                  "A list of one or more strings separated by commas indicating a set of possible images represented by the source for the browser to use. Each string is composed of:\n\none URL to an image,\n\na width descriptor, that is a positive integer directly followed by 'w'. The default value, if missing, is the infinity.\n\na pixel density descriptor, that is a positive floating number directly followed by 'x'. The default value, if missing, is 1x.\n\nEach string in the list must have at least a width descriptor or a pixel density descriptor to be valid. Among the list, there must be only one string containing the same tuple of width descriptor and pixel density descriptor.\nThe browser chooses the most adequate image to display at a given point of time.\nThe srcset attribute has an effect only when the &lt;source> element is the direct child of a &lt;picture> element.\n"
              },
              { name: 'media', description: "Media query of the resource's intended media; this should be used only in a &lt;picture> element.\n" }
            ]
          },
          {
            name: 'track',
            description:
              'The track element allows authors to specify explicit external timed text tracks for media elements. It does not represent anything on its own.',
            attributes: [
              {
                name: 'default',
                valueSet: 'v',
                description:
                  "This attribute indicates that the track should be enabled unless the user's preferences indicate that another track is more appropriate. This may only be used on one `track` element per media element."
              },
              {
                name: 'kind',
                valueSet: 'tk',
                description:
                  "How the text track is meant to be used. If omitted the default kind is `subtitles`. If the attribute is not present, it will use the `subtitles`. If the attribute contains an invalid value, it will use `metadata`. (Versions of Chrome earlier than 52 treated an invalid value as `subtitles`.) The following keywords are allowed:\n\n*   `subtitles`\n    *   Subtitles provide translation of content that cannot be understood by the viewer. For example dialogue or text that is not English in an English language film.\n    *   Subtitles may contain additional content, usually extra background information. For example the text at the beginning of the Star Wars films, or the date, time, and location of a scene.\n*   `captions`\n    *   Closed captions provide a transcription and possibly a translation of audio.\n    *   It may include important non-verbal information such as music cues or sound effects. It may indicate the cue's source (e.g. music, text, character).\n    *   Suitable for users who are deaf or when the sound is muted.\n*   `descriptions`\n    *   Textual description of the video content.\n    *   Suitable for users who are blind or where the video cannot be seen.\n*   `chapters`\n    *   Chapter titles are intended to be used when the user is navigating the media resource.\n*   `metadata`\n    *   Tracks used by scripts. Not visible to the user."
              },
              {
                name: 'label',
                description: 'A user-readable title of the text track which is used by the browser when listing available text tracks.'
              },
              {
                name: 'src',
                description:
                  'Address of the track (`.vtt` file). Must be a valid URL. This attribute must be specified and its URL value must have the same origin as the document — unless the [`<audio>`](/en-US/docs/Web/HTML/Element/audio "The HTML <audio> element is used to embed sound content in documents. It may contain one or more audio sources, represented using the src attribute or the <source> element: the browser will choose the most suitable one. It can also be the destination for streamed media, using a MediaStream.") or [`<video>`](/en-US/docs/Web/HTML/Element/video "The HTML Video element (<video>) embeds a media player which supports video playback into the document.") parent element of the `track` element has a `[crossorigin](/en-US/docs/Web/HTML/CORS_settings_attributes)` attribute.'
              },
              {
                name: 'srclang',
                description:
                  'Language of the track text data. It must be a valid [BCP 47](https://r12a.github.io/app-subtags/) language tag. If the `kind` attribute is set to `subtitles,` then `srclang` must be defined.'
              }
            ]
          },
          {
            name: 'map',
            description:
              'The map element, in conjunction with an img element and any area element descendants, defines an image map. The element represents its children.',
            attributes: [
              {
                name: 'name',
                description:
                  'The name attribute gives the map a name so that it can be referenced. The attribute must be present and must have a non-empty value with no space characters. The value of the name attribute must not be a compatibility-caseless match for the value of the name attribute of another map element in the same document. If the id attribute is also specified, both attributes must have the same value.'
              }
            ]
          },
          {
            name: 'area',
            description:
              'The area element represents either a hyperlink with some text and a corresponding area on an image map, or a dead area on an image map.',
            attributes: [
              { name: 'alt' },
              { name: 'coords' },
              { name: 'shape', valueSet: 'sh' },
              { name: 'href' },
              { name: 'target' },
              { name: 'download' },
              { name: 'ping' },
              { name: 'rel' },
              { name: 'hreflang' },
              { name: 'type' },
              {
                name: 'accesskey',
                description:
                  'Specifies a keyboard navigation accelerator for the element. Pressing ALT or a similar key in association with the specified character selects the form control correlated with that key sequence. Page designers are forewarned to avoid key sequences already bound to browsers. This attribute is global since HTML5.'
              }
            ]
          },
          {
            name: 'table',
            description: 'The table element represents data with more than one dimension, in the form of a table.',
            attributes: [
              { name: 'sortable', valueSet: 'v' },
              { name: 'border' },
              {
                name: 'align',
                description:
                  'This enumerated attribute indicates how the table must be aligned inside the containing document. It may have the following values:\n\nleft: the table is displayed on the left side of the document;\n\ncenter: the table is displayed in the center of the document;\n\nright: the table is displayed on the right side of the document.\n\nUsage Note\n\nDo not use this attribute, as it has been deprecated. The &lt;table> element should be styled using CSS. Set margin-left and margin-right to auto or margin to 0 auto to achieve an effect that is similar to the align attribute.\n\nPrior to Firefox 4, Firefox also supported the middle, absmiddle, and abscenter values as synonyms of center, in quirks mode only.\n'
              }
            ]
          },
          {
            name: 'caption',
            description: 'The caption element represents the title of the table that is its parent, if it has a parent and that is a table element.',
            attributes: [
              {
                name: 'align',
                description:
                  'This enumerated attribute indicates how the caption must be aligned with respect to the table. It may have one of the following values:\n\nleft\n\nThe caption is displayed to the left of the table.\n\ntop\n\nThe caption is displayed above the table.\n\nright\n\nThe caption is displayed to the right of the table.\n\nbottom\n\nThe caption is displayed below the table.\n\nUsage note: Do not use this attribute, as it has been deprecated. The &lt;caption> element should be styled using the CSS properties caption-side and text-align.\n'
              }
            ]
          },
          {
            name: 'colgroup',
            description:
              'The colgroup element represents a group of one or more columns in the table that is its parent, if it has a parent and that is a table element.',
            attributes: [
              { name: 'span' },
              {
                name: 'align',
                description:
                  'This enumerated attribute specifies how horizontal alignment of each column cell content will be handled. Possible values are:\n\n*   `left`, aligning the content to the left of the cell\n*   `center`, centering the content in the cell\n*   `right`, aligning the content to the right of the cell\n*   `justify`, inserting spaces into the textual content so that the content is justified in the cell\n*   `char`, aligning the textual content on a special character with a minimal offset, defined by the `[char](/en-US/docs/Web/HTML/Element/col#attr-char)` and `[charoff](/en-US/docs/Web/HTML/Element/col#attr-charoff)` attributes Unimplemented (see [bug 2212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 "character alignment not implemented (align=char, charoff=, text-align:<string>)")).\n\nIf this attribute is not set, the `left` value is assumed. The descendant [`<col>`](/en-US/docs/Web/HTML/Element/col "The HTML <col> element defines a column within a table and is used for defining common semantics on all common cells. It is generally found within a <colgroup> element.") elements may override this value using their own `[align](/en-US/docs/Web/HTML/Element/col#attr-align)` attribute.\n\n**Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values:\n    *   Do not try to set the [`text-align`](/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property on a selector giving a [`<colgroup>`](/en-US/docs/Web/HTML/Element/colgroup "The HTML <colgroup> element defines a group of columns within a table.") element. Because [`<td>`](/en-US/docs/Web/HTML/Element/td "The HTML <td> element defines a cell of a table that contains data. It participates in the table model.") elements are not descendant of the [`<colgroup>`](/en-US/docs/Web/HTML/Element/colgroup "The HTML <colgroup> element defines a group of columns within a table.") element, they won\'t inherit it.\n    *   If the table doesn\'t use a `[colspan](/en-US/docs/Web/HTML/Element/td#attr-colspan)` attribute, use one `td:nth-child(an+b)` CSS selector per column, where a is the total number of the columns in the table and b is the ordinal position of this column in the table. Only after this selector the [`text-align`](/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property can be used.\n    *   If the table does use a `[colspan](/en-US/docs/Web/HTML/Element/td#attr-colspan)` attribute, the effect can be achieved by combining adequate CSS attribute selectors like `[colspan=n]`, though this is not trivial.\n*   To achieve the same effect as the `char` value, in CSS3, you can use the value of the `[char](/en-US/docs/Web/HTML/Element/colgroup#attr-char)` as the value of the [`text-align`](/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property Unimplemented.'
              }
            ]
          },
          {
            name: 'col',
            description:
              'If a col element has a parent and that is a colgroup element that itself has a parent that is a table element, then the col element represents one or more columns in the column group represented by that colgroup.',
            attributes: [
              { name: 'span' },
              {
                name: 'align',
                description:
                  'This enumerated attribute specifies how horizontal alignment of each column cell content will be handled. Possible values are:\n\n*   `left`, aligning the content to the left of the cell\n*   `center`, centering the content in the cell\n*   `right`, aligning the content to the right of the cell\n*   `justify`, inserting spaces into the textual content so that the content is justified in the cell\n*   `char`, aligning the textual content on a special character with a minimal offset, defined by the `[char](/en-US/docs/Web/HTML/Element/col#attr-char)` and `[charoff](/en-US/docs/Web/HTML/Element/col#attr-charoff)` attributes Unimplemented (see [bug 2212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 "character alignment not implemented (align=char, charoff=, text-align:<string>)")).\n\nIf this attribute is not set, its value is inherited from the `[align](/en-US/docs/Web/HTML/Element/colgroup#attr-align)` of the [`<colgroup>`](/en-US/docs/Web/HTML/Element/colgroup "The HTML <colgroup> element defines a group of columns within a table.") element this `<col>` element belongs too. If there are none, the `left` value is assumed.\n\n**Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values:\n    *   Do not try to set the [`text-align`](/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property on a selector giving a [`<col>`](/en-US/docs/Web/HTML/Element/col "The HTML <col> element defines a column within a table and is used for defining common semantics on all common cells. It is generally found within a <colgroup> element.") element. Because [`<td>`](/en-US/docs/Web/HTML/Element/td "The HTML <td> element defines a cell of a table that contains data. It participates in the table model.") elements are not descendant of the [`<col>`](/en-US/docs/Web/HTML/Element/col "The HTML <col> element defines a column within a table and is used for defining common semantics on all common cells. It is generally found within a <colgroup> element.") element, they won\'t inherit it.\n    *   If the table doesn\'t use a `[colspan](/en-US/docs/Web/HTML/Element/td#attr-colspan)` attribute, use the `td:nth-child(an+b)` CSS selector. Set `a` to zero and `b` to the position of the column in the table, e.g. `td:nth-child(2) { text-align: right; }` to right-align the second column.\n    *   If the table does use a `[colspan](/en-US/docs/Web/HTML/Element/td#attr-colspan)` attribute, the effect can be achieved by combining adequate CSS attribute selectors like `[colspan=n]`, though this is not trivial.\n*   To achieve the same effect as the `char` value, in CSS3, you can use the value of the `[char](/en-US/docs/Web/HTML/Element/col#attr-char)` as the value of the [`text-align`](/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property Unimplemented.'
              }
            ]
          },
          {
            name: 'tbody',
            description:
              'The tbody element represents a block of rows that consist of a body of data for the parent table element, if the tbody element has a parent and it is a table.',
            attributes: [
              {
                name: 'align',
                description:
                  'This enumerated attribute specifies how horizontal alignment of each cell content will be handled. Possible values are:\n\nleft, aligning the content to the left of the cell\n\ncenter, centering the content in the cell\n\nright, aligning the content to the right of the cell\n\njustify, inserting spaces into the textual content so that the content is justified in the cell\n\nchar, aligning the textual content on a special character with a minimal offset, defined by the \\[char](/en-US/docs/Web/HTML/Element/tbody#attr-char) and \\[charoff](/en-US/docs/Web/HTML/Element/tbody#attr-charoff) attributes.\n\nIf this attribute is not set, the left value is assumed.\n\nNote: Do not use this attribute as it is obsolete (not supported) in the latest standard.\n\nTo achieve the same effect as the left, center, right or justify values, use the CSS text-align property on it.\n\nTo achieve the same effect as the char value, in CSS3, you can use the value of the \\[char](/en-US/docs/Web/HTML/Element/tbody#attr-char) as the value of the text-align property Unimplemented.\n'
              }
            ]
          },
          {
            name: 'thead',
            description:
              'The thead element represents the block of rows that consist of the column labels (headers) for the parent table element, if the thead element has a parent and it is a table.',
            attributes: [
              {
                name: 'align',
                description:
                  'This enumerated attribute specifies how horizontal alignment of each cell content will be handled. Possible values are:\n\n*   `left`, aligning the content to the left of the cell\n*   `center`, centering the content in the cell\n*   `right`, aligning the content to the right of the cell\n*   `justify`, inserting spaces into the textual content so that the content is justified in the cell\n*   `char`, aligning the textual content on a special character with a minimal offset, defined by the `[char](/en-US/docs/Web/HTML/Element/thead#attr-char)` and `[charoff](/en-US/docs/Web/HTML/Element/thead#attr-charoff)` attributes Unimplemented (see [bug 2212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 "character alignment not implemented (align=char, charoff=, text-align:<string>)")).\n\nIf this attribute is not set, the `left` value is assumed.\n\n**Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values, use the CSS [`text-align`](/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property on it.\n*   To achieve the same effect as the `char` value, in CSS3, you can use the value of the `[char](/en-US/docs/Web/HTML/Element/thead#attr-char)` as the value of the [`text-align`](/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property Unimplemented.'
              }
            ]
          },
          {
            name: 'tfoot',
            description:
              'The tfoot element represents the block of rows that consist of the column summaries (footers) for the parent table element, if the tfoot element has a parent and it is a table.',
            attributes: [
              {
                name: 'align',
                description:
                  'This enumerated attribute specifies how horizontal alignment of each cell content will be handled. Possible values are:\n\n*   `left`, aligning the content to the left of the cell\n*   `center`, centering the content in the cell\n*   `right`, aligning the content to the right of the cell\n*   `justify`, inserting spaces into the textual content so that the content is justified in the cell\n*   `char`, aligning the textual content on a special character with a minimal offset, defined by the `[char](/en-US/docs/Web/HTML/Element/tbody#attr-char)` and `[charoff](/en-US/docs/Web/HTML/Element/tbody#attr-charoff)` attributes Unimplemented (see [bug 2212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 "character alignment not implemented (align=char, charoff=, text-align:<string>)")).\n\nIf this attribute is not set, the `left` value is assumed.\n\n**Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values, use the CSS [`text-align`](/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property on it.\n*   To achieve the same effect as the `char` value, in CSS3, you can use the value of the `[char](/en-US/docs/Web/HTML/Element/tfoot#attr-char)` as the value of the [`text-align`](/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property Unimplemented.'
              }
            ]
          },
          {
            name: 'tr',
            description: 'The tr element represents a row of cells in a table.',
            attributes: [
              {
                name: 'align',
                description:
                  'A DOMString which specifies how the cell\'s context should be aligned horizontally within the cells in the row; this is shorthand for using align on every cell in the row individually. Possible values are:\n\nleft\n\nAlign the content of each cell at its left edge.\n\ncenter\n\nCenter the contents of each cell between their left and right edges.\n\nright\n\nAlign the content of each cell at its right edge.\n\njustify\n\nWiden whitespaces within the text of each cell so that the text fills the full width of each cell (full justification).\n\nchar\n\nAlign each cell in the row on a specific character (such that each row in the column that is configured this way will horizontally align its cells on that character). This uses the \\[char](/en-US/docs/Web/HTML/Element/tr#attr-char) and \\[charoff](/en-US/docs/Web/HTML/Element/tr#attr-charoff) to establish the alignment character (typically "." or "," when aligning numerical data) and the number of characters that should follow the alignment character. This alignment type was never widely supported.\n\nIf no value is expressly set for align, the parent node\'s value is inherited.\n\nInstead of using the obsolete align attribute, you should instead use the CSS text-align property to establish left, center, right, or justify alignment for the row\'s cells. To apply character-based alignment, set the CSS text-align property to the alignment character (such as "." or ",").\n'
              }
            ]
          },
          {
            name: 'td',
            description: 'The td element represents a data cell in a table.',
            attributes: [
              { name: 'colspan' },
              { name: 'rowspan' },
              { name: 'headers' },
              {
                name: 'abbr',
                description:
                  "This attribute contains a short abbreviated description of the cell's content. Some user-agents, such as speech readers, may present this description before the content itself.\n\n**Note:** Do not use this attribute as it is obsolete in the latest standard. Alternatively, you can put the abbreviated description inside the cell and place the long content in the **title** attribute."
              },
              {
                name: 'align',
                description:
                  'This enumerated attribute specifies how the cell content\'s horizontal alignment will be handled. Possible values are:\n\n*   `left`: The content is aligned to the left of the cell.\n*   `center`: The content is centered in the cell.\n*   `right`: The content is aligned to the right of the cell.\n*   `justify` (with text only): The content is stretched out inside the cell so that it covers its entire width.\n*   `char` (with text only): The content is aligned to a character inside the `<th>` element with minimal offset. This character is defined by the `[char](/en-US/docs/Web/HTML/Element/td#attr-char)` and `[charoff](/en-US/docs/Web/HTML/Element/td#attr-charoff)` attributes Unimplemented (see [bug 2212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 "character alignment not implemented (align=char, charoff=, text-align:<string>)")).\n\nThe default value when this attribute is not specified is `left`.\n\n**Note:** Do not use this attribute as it is obsolete in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values, apply the CSS [`text-align`](/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property to the element.\n*   To achieve the same effect as the `char` value, give the [`text-align`](/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property the same value you would use for the `[char](/en-US/docs/Web/HTML/Element/td#attr-char)`. Unimplemented in CSS3.'
              },
              {
                name: 'axis',
                description:
                  'This attribute contains a list of space-separated strings. Each string is the `id` of a group of cells that this header applies to.\n\n**Note:** Do not use this attribute as it is obsolete in the latest standard.'
              },
              {
                name: 'bgcolor',
                description:
                  'This attribute defines the background color of each cell in a column. It consists of a 6-digit hexadecimal code as defined in [sRGB](https://www.w3.org/Graphics/Color/sRGB) and is prefixed by \'#\'. This attribute may be used with one of sixteen predefined color strings:\n\n \n\n`black` = "#000000"\n\n \n\n`green` = "#008000"\n\n \n\n`silver` = "#C0C0C0"\n\n \n\n`lime` = "#00FF00"\n\n \n\n`gray` = "#808080"\n\n \n\n`olive` = "#808000"\n\n \n\n`white` = "#FFFFFF"\n\n \n\n`yellow` = "#FFFF00"\n\n \n\n`maroon` = "#800000"\n\n \n\n`navy` = "#000080"\n\n \n\n`red` = "#FF0000"\n\n \n\n`blue` = "#0000FF"\n\n \n\n`purple` = "#800080"\n\n \n\n`teal` = "#008080"\n\n \n\n`fuchsia` = "#FF00FF"\n\n \n\n`aqua` = "#00FFFF"\n\n**Note:** Do not use this attribute, as it is non-standard and only implemented in some versions of Microsoft Internet Explorer: The [`<td>`](/en-US/docs/Web/HTML/Element/td "The HTML <td> element defines a cell of a table that contains data. It participates in the table model.") element should be styled using [CSS](/en-US/docs/CSS). To create a similar effect use the [`background-color`](/en-US/docs/Web/CSS/background-color "The background-color CSS property sets the background color of an element.") property in [CSS](/en-US/docs/CSS) instead.'
              }
            ]
          },
          {
            name: 'th',
            description: 'The th element represents a header cell in a table.',
            attributes: [
              { name: 'colspan' },
              { name: 'rowspan' },
              { name: 'headers' },
              { name: 'scope', valueSet: 's' },
              { name: 'sorted' },
              {
                name: 'abbr',
                description:
                  "This attribute contains a short abbreviated description of the cell's content. Some user-agents, such as speech readers, may present this description before the content itself.\n"
              },
              {
                name: 'align',
                description:
                  "This enumerated attribute specifies how the cell content's horizontal alignment will be handled. Possible values are:\n\nleft: The content is aligned to the left of the cell.\n\ncenter: The content is centered in the cell.\n\nright: The content is aligned to the right of the cell.\n\njustify (with text only): The content is stretched out inside the cell so that it covers its entire width.\n\nchar (with text only): The content is aligned to a character inside the &lt;th> element with minimal offset. This character is defined by the \\[char](/en-US/docs/Web/HTML/Element/th#attr-char) and \\[charoff](/en-US/docs/Web/HTML/Element/th#attr-charoff) attributes.\n\nThe default value when this attribute is not specified is left.\n\nNote: Do not use this attribute as it is obsolete in the latest standard.\n\nTo achieve the same effect as the left, center, right or justify values, apply the CSS text-align property to the element.\n\nTo achieve the same effect as the char value, give the text-align property the same value you would use for the \\[char](/en-US/docs/Web/HTML/Element/th#attr-char). Unimplemented in CSS3.\n"
              },
              {
                name: 'axis',
                description:
                  'This attribute contains a list of space-separated strings. Each string is the id of a group of cells that this header applies to.\n\nNote: Do not use this attribute as it is obsolete in the latest standard: use the \\[scope](/en-US/docs/Web/HTML/Element/th#attr-scope) attribute instead.\n'
              },
              {
                name: 'bgcolor',
                description:
                  'This attribute defines the background color of each cell in a column. It consists of a 6-digit hexadecimal code as defined in sRGB and is prefixed by \'#\'. This attribute may be used with one of sixteen predefined color strings:\n\nblack = "#000000"\n\ngreen = "#008000"\n\nsilver = "#C0C0C0"\n\nlime = "#00FF00"\n\ngray = "#808080"\n\nolive = "#808000"\n\nwhite = "#FFFFFF"\n\nyellow = "#FFFF00"\n\nmaroon = "#800000"\n\nnavy = "#000080"\n\nred = "#FF0000"\n\nblue = "#0000FF"\n\npurple = "#800080"\n\nteal = "#008080"\n\nfuchsia = "#FF00FF"\n\naqua = "#00FFFF"\n\nNote: Do not use this attribute, as it is non-standard and only implemented in some versions of Microsoft Internet Explorer: The &lt;th> element should be styled using CSS. To create a similar effect use the background-color property in CSS instead.\n'
              }
            ]
          },
          {
            name: 'form',
            description:
              'The form element represents a collection of form-associated elements, some of which can represent editable values that can be submitted to a server for processing.',
            attributes: [
              {
                name: 'accept-charset',
                description:
                  'A space- or comma-delimited list of character encodings that the server accepts. The browser uses them in the order in which they are listed. The default value, the reserved string `"UNKNOWN"`, indicates the same encoding as that of the document containing the form element.  \nIn previous versions of HTML, the different character encodings could be delimited by spaces or commas. In HTML5, only spaces are allowed as delimiters.'
              },
              {
                name: 'action',
                description:
                  'The URI of a program that processes the form information. This value can be overridden by a `[formaction](/en-US/docs/Web/HTML/Element/button#attr-formaction)` attribute on a [`<button>`](/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.'
              },
              {
                name: 'autocomplete',
                valueSet: 'o',
                description:
                  "Indicates whether input elements can by default have their values automatically completed by the browser. This setting can be overridden by an `autocomplete` attribute on an element belonging to the form. Possible values are:\n\n*   `off`: The user must explicitly enter a value into each field for every use, or the document provides its own auto-completion method; the browser does not automatically complete entries.\n*   `on`: The browser can automatically complete values based on values that the user has previously entered in the form.\n\nFor most modern browsers (including Firefox 38+, Google Chrome 34+, IE 11+) setting the autocomplete attribute will not prevent a browser's password manager from asking the user if they want to store login fields (username and password), if the user permits the storage the browser will autofill the login the next time the user visits the page. See [The autocomplete attribute and login fields](/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion#The_autocomplete_attribute_and_login_fields)."
              },
              {
                name: 'enctype',
                valueSet: 'et',
                description:
                  'When the value of the `method` attribute is `post`, enctype is the [MIME type](https://en.wikipedia.org/wiki/Mime_type) of content that is used to submit the form to the server. Possible values are:\n\n*   `application/x-www-form-urlencoded`: The default value if the attribute is not specified.\n*   `multipart/form-data`: The value used for an [`<input>`](/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element with the `type` attribute set to "file".\n*   `text/plain`: (HTML5)\n\nThis value can be overridden by a `[formenctype](/en-US/docs/Web/HTML/Element/button#attr-formenctype)` attribute on a [`<button>`](/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.'
              },
              {
                name: 'method',
                valueSet: 'm',
                description:
                  'The [HTTP](/en-US/docs/Web/HTTP) method that the browser uses to submit the form. Possible values are:\n\n*   `post`: Corresponds to the HTTP [POST method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.5) ; form data are included in the body of the form and sent to the server.\n*   `get`: Corresponds to the HTTP [GET method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.3); form data are appended to the `action` attribute URI with a \'?\' as separator, and the resulting URI is sent to the server. Use this method when the form has no side-effects and contains only ASCII characters.\n*   `dialog`: Use when the form is inside a [`<dialog>`](/en-US/docs/Web/HTML/Element/dialog "The HTML <dialog> element represents a dialog box or other interactive component, such as an inspector or window.") element to close the dialog when submitted.\n\nThis value can be overridden by a `[formmethod](/en-US/docs/Web/HTML/Element/button#attr-formmethod)` attribute on a [`<button>`](/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.'
              },
              {
                name: 'name',
                description:
                  'The name of the form. In HTML 4, its use is deprecated (`id` should be used instead). It must be unique among the forms in a document and not just an empty string in HTML 5.'
              },
              {
                name: 'novalidate',
                valueSet: 'v',
                description:
                  'This Boolean attribute indicates that the form is not to be validated when submitted. If this attribute is not specified (and therefore the form is validated), this default setting can be overridden by a `[formnovalidate](/en-US/docs/Web/HTML/Element/button#attr-formnovalidate)` attribute on a [`<button>`](/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element belonging to the form.'
              },
              {
                name: 'target',
                description:
                  'A name or keyword indicating where to display the response that is received after submitting the form. In HTML 4, this is the name/keyword for a frame. In HTML5, it is a name/keyword for a _browsing context_ (for example, tab, window, or inline frame). The following keywords have special meanings:\n\n*   `_self`: Load the response into the same HTML 4 frame (or HTML5 browsing context) as the current one. This value is the default if the attribute is not specified.\n*   `_blank`: Load the response into a new unnamed HTML 4 window or HTML5 browsing context.\n*   `_parent`: Load the response into the HTML 4 frameset parent of the current frame, or HTML5 parent browsing context of the current one. If there is no parent, this option behaves the same way as `_self`.\n*   `_top`: HTML 4: Load the response into the full original window, and cancel all other frames. HTML5: Load the response into the top-level browsing context (i.e., the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as `_self`.\n*   _iframename_: The response is displayed in a named [`<iframe>`](/en-US/docs/Web/HTML/Element/iframe "The HTML Inline Frame element (<iframe>) represents a nested browsing context, embedding another HTML page into the current one.").\n\nHTML5: This value can be overridden by a `[formtarget](/en-US/docs/Web/HTML/Element/button#attr-formtarget)` attribute on a [`<button>`](/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.'
              },
              {
                name: 'accept',
                description:
                  'A comma-separated list of content types that the server accepts.\n\n**Usage note:** This attribute has been removed in HTML5 and should no longer be used. Instead, use the `[accept](/en-US/docs/Web/HTML/Element/input#attr-accept)` attribute of the specific [`<input>`](/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.'
              },
              {
                name: 'autocapitalize',
                description:
                  'This is a nonstandard attribute used by iOS Safari Mobile which controls whether and how the text value for textual form control descendants should be automatically capitalized as it is entered/edited by the user. If the `autocapitalize` attribute is specified on an individual form control descendant, it trumps the form-wide `autocapitalize` setting. The non-deprecated values are available in iOS 5 and later. The default value is `sentences`. Possible values are:\n\n*   `none`: Completely disables automatic capitalization\n*   `sentences`: Automatically capitalize the first letter of sentences.\n*   `words`: Automatically capitalize the first letter of words.\n*   `characters`: Automatically capitalize all characters.\n*   `on`: Deprecated since iOS 5.\n*   `off`: Deprecated since iOS 5.'
              }
            ]
          },
          {
            name: 'label',
            description:
              "The label element represents a caption in a user interface. The caption can be associated with a specific form control, known as the label element's labeled control, either using the for attribute, or by putting the form control inside the label element itself.",
            attributes: [
              {
                name: 'form',
                description:
                  'The [`<form>`](/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element with which the label is associated (its _form owner_). If specified, the value of the attribute is the `id` of a [`<form>`](/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element in the same document. This lets you place label elements anywhere within a document, not just as descendants of their form elements.'
              },
              {
                name: 'for',
                description:
                  'The `[id](/en-US/docs/Web/HTML/Global_attributes#attr-id)` of a [labelable](/en-US/docs/Web/Guide/HTML/Content_categories#Form_labelable) form-related element in the same document as the `<label>` element. The first element in the document with an `id` matching the value of the `for` attribute is the _labeled control_ for this label element, if it is a labelable element. If it is not labelable then the `for` attribute has no effect. If there are other elements which also match the `id` value, later in the document, they are not considered.\n\n**Note**: A `<label>` element can have both a `for` attribute and a contained control element, as long as the `for` attribute points to the contained control element.'
              }
            ]
          },
          {
            name: 'input',
            description: 'The input element represents a typed data field, usually with a form control to allow the user to edit the data.',
            attributes: [
              { name: 'accept' },
              { name: 'alt' },
              { name: 'autocomplete', valueSet: 'inputautocomplete' },
              { name: 'autofocus', valueSet: 'v' },
              { name: 'checked', valueSet: 'v' },
              { name: 'dirname' },
              { name: 'disabled', valueSet: 'v' },
              { name: 'form' },
              { name: 'formaction' },
              { name: 'formenctype', valueSet: 'et' },
              { name: 'formmethod', valueSet: 'fm' },
              { name: 'formnovalidate', valueSet: 'v' },
              { name: 'formtarget' },
              { name: 'height' },
              { name: 'inputmode', valueSet: 'im' },
              { name: 'list' },
              { name: 'max' },
              { name: 'maxlength' },
              { name: 'min' },
              { name: 'minlength' },
              { name: 'multiple', valueSet: 'v' },
              { name: 'name' },
              { name: 'pattern' },
              { name: 'placeholder' },
              { name: 'readonly', valueSet: 'v' },
              { name: 'required', valueSet: 'v' },
              { name: 'size' },
              { name: 'src' },
              { name: 'step' },
              { name: 'type', valueSet: 't' },
              { name: 'value' },
              { name: 'width' }
            ]
          },
          {
            name: 'button',
            description: 'The button element represents a button labeled by its contents.',
            attributes: [
              {
                name: 'autofocus',
                valueSet: 'v',
                description:
                  'This Boolean attribute lets you specify that the button should have input focus when the page loads, unless the user overrides it, for example by typing in a different control. Only one form-associated element in a document can have this attribute specified.\n'
              },
              {
                name: 'disabled',
                valueSet: 'v',
                description:
                  'This Boolean attribute indicates that the user cannot interact with the button. If this attribute is not specified, the button inherits its setting from the containing element, for example &lt;fieldset>; if there is no containing element with the disabled attribute set, then the button is enabled.\n\nFirefox will, unlike other browsers, by default, persist the dynamic disabled state of a &lt;button> across page loads. Use the \\[autocomplete](/en-US/docs/Web/HTML/Element/button#attr-autocomplete) attribute to control this feature.\n'
              },
              {
                name: 'form',
                description:
                  'The form element that the button is associated with (its form owner). The value of the attribute must be the id attribute of a &lt;form> element in the same document. If this attribute is not specified, the &lt;button> element will be associated to an ancestor &lt;form> element, if one exists. This attribute enables you to associate &lt;button> elements to &lt;form> elements anywhere within a document, not just as descendants of &lt;form> elements.\n'
              },
              {
                name: 'formaction',
                description:
                  "The URI of a program that processes the information submitted by the button. If specified, it overrides the \\[action](/en-US/docs/Web/HTML/Element/form#attr-action) attribute of the button's form owner.\n"
              },
              {
                name: 'formenctype',
                valueSet: 'et',
                description:
                  "If the button is a submit button, this attribute specifies the type of content that is used to submit the form to the server. Possible values are:\n\napplication/x-www-form-urlencoded: The default value if the attribute is not specified.\n\nmultipart/form-data: Use this value if you are using an &lt;input> element with the \\[type](/en-US/docs/Web/HTML/Element/input#attr-type) attribute set to file.\n\ntext/plain\n\nIf this attribute is specified, it overrides the \\[enctype](/en-US/docs/Web/HTML/Element/form#attr-enctype) attribute of the button's form owner.\n"
              },
              {
                name: 'formmethod',
                valueSet: 'fm',
                description:
                  "If the button is a submit button, this attribute specifies the HTTP method that the browser uses to submit the form. Possible values are:\n\npost: The data from the form are included in the body of the form and sent to the server.\n\nget: The data from the form are appended to the form attribute URI, with a '?' as a separator, and the resulting URI is sent to the server. Use this method when the form has no side-effects and contains only ASCII characters.\n\nIf specified, this attribute overrides the \\[method](/en-US/docs/Web/HTML/Element/form#attr-method) attribute of the button's form owner.\n"
              },
              {
                name: 'formnovalidate',
                valueSet: 'v',
                description:
                  "If the button is a submit button, this Boolean attribute specifies that the form is not to be validated when it is submitted. If this attribute is specified, it overrides the \\[novalidate](/en-US/docs/Web/HTML/Element/form#attr-novalidate) attribute of the button's form owner.\n"
              },
              {
                name: 'formtarget',
                description:
                  "If the button is a submit button, this attribute is a name or keyword indicating where to display the response that is received after submitting the form. This is a name of, or keyword for, a browsing context (for example, tab, window, or inline frame). If this attribute is specified, it overrides the \\[target](/en-US/docs/Web/HTML/Element/form#attr-target) attribute of the button's form owner. The following keywords have special meanings:\n\n\\_self: Load the response into the same browsing context as the current one. This value is the default if the attribute is not specified.\n\n\\_blank: Load the response into a new unnamed browsing context.\n\n\\_parent: Load the response into the parent browsing context of the current one. If there is no parent, this option behaves the same way as \\_self.\n\n\\_top: Load the response into the top-level browsing context (that is, the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as \\_self.\n"
              },
              { name: 'name', description: 'The name of the button, which is submitted with the form data.\n' },
              {
                name: 'type',
                valueSet: 'bt',
                description:
                  "The type of the button. Possible values are:\n\nsubmit: The button submits the form data to the server. This is the default if the attribute is not specified, or if the attribute is dynamically changed to an empty or invalid value.\n\nreset: The button resets all the controls to their initial values.\n\nbutton: The button has no default behavior. It can have client-side scripts associated with the element's events, which are triggered when the events occur.\n"
              },
              {
                name: 'value',
                description:
                  'The initial value of the button. It defines the value associated with the button which is submitted with the form data. This value is passed to the server in params when the form is submitted.\n'
              },
              {
                name: 'autocomplete',
                description:
                  'The use of this attribute on a &lt;button> is nonstandard and Firefox-specific. By default, unlike other browsers, Firefox persists the dynamic disabled state of a &lt;button> across page loads. Setting the value of this attribute to off (i.e. autocomplete="off") disables this feature. See bug 654072.\n'
              }
            ]
          },
          {
            name: 'select',
            description: 'The select element represents a control for selecting amongst a set of options.',
            attributes: [
              {
                name: 'autocomplete',
                valueSet: 'inputautocomplete',
                description:
                  "A DOMString providing a hint for a user agent's autocomplete feature. See The HTML autocomplete attribute for a complete list of values and details on how to use autocomplete.\n"
              },
              {
                name: 'autofocus',
                valueSet: 'v',
                description:
                  'This Boolean attribute lets you specify that a form control should have input focus when the page loads. Only one form element in a document can have the autofocus attribute.\n'
              },
              {
                name: 'disabled',
                valueSet: 'v',
                description:
                  'This Boolean attribute indicates that the user cannot interact with the control. If this attribute is not specified, the control inherits its setting from the containing element, for example fieldset; if there is no containing element with the disabled attribute set, then the control is enabled.\n'
              },
              {
                name: 'form',
                description:
                  'This attribute lets you specify the form element to which the select element is associated (that is, its "form owner"). If this attribute is specified, its value must be the same as the id of a form element in the same document. This enables you to place select elements anywhere within a document, not just as descendants of their form elements.\n'
              },
              {
                name: 'multiple',
                valueSet: 'v',
                description:
                  'This Boolean attribute indicates that multiple options can be selected in the list. If it is not specified, then only one option can be selected at a time. When multiple is specified, most browsers will show a scrolling list box instead of a single line dropdown.\n'
              },
              { name: 'name', description: 'This attribute is used to specify the name of the control.\n' },
              {
                name: 'required',
                valueSet: 'v',
                description: 'A Boolean attribute indicating that an option with a non-empty string value must be selected.\n'
              },
              {
                name: 'size',
                description:
                  'If the control is presented as a scrolling list box (e.g. when multiple is specified), this attribute represents the number of rows in the list that should be visible at one time. Browsers are not required to present a select element as a scrolled list box. The default value is 0.\n\nNote: According to the HTML5 specification, the default value for size should be 1; however, in practice, this has been found to break some web sites, and no other browser currently does that, so Mozilla has opted to continue to return 0 for the time being with Firefox.\n'
              }
            ]
          },
          {
            name: 'datalist',
            description:
              'The datalist element represents a set of option elements that represent predefined options for other controls. In the rendering, the datalist element represents nothing and it, along with its children, should be hidden.',
            attributes: []
          },
          {
            name: 'optgroup',
            description: 'The optgroup element represents a group of option elements with a common label.',
            attributes: [
              {
                name: 'disabled',
                valueSet: 'v',
                description:
                  "If this Boolean attribute is set, none of the items in this option group is selectable. Often browsers grey out such control and it won't receive any browsing events, like mouse clicks or focus-related ones."
              },
              {
                name: 'label',
                description:
                  'The name of the group of options, which the browser can use when labeling the options in the user interface. This attribute is mandatory if this element is used.'
              }
            ]
          },
          {
            name: 'option',
            description: 'The option element represents an option in a select element or as part of a list of suggestions in a datalist element.',
            attributes: [
              {
                name: 'disabled',
                valueSet: 'v',
                description:
                  "If this Boolean attribute is set, this option is not checkable. Often browsers grey out such control and it won't receive any browsing event, like mouse clicks or focus-related ones. If this attribute is not set, the element can still be disabled if one of its ancestors is a disabled &lt;optgroup> element.\n"
              },
              {
                name: 'label',
                description:
                  "This attribute is text for the label indicating the meaning of the option. If the label attribute isn't defined, its value is that of the element text content.\n"
              },
              {
                name: 'selected',
                valueSet: 'v',
                description:
                  'If present, this Boolean attribute indicates that the option is initially selected. If the &lt;option> element is the descendant of a &lt;select> element whose \\[multiple](/en-US/docs/Web/HTML/Element/select#attr-multiple) attribute is not set, only one single &lt;option> of this &lt;select> element may have the selected attribute.\n'
              },
              {
                name: 'value',
                description:
                  'The content of this attribute represents the value to be submitted with the form, should this option be selected. If this attribute is omitted, the value is taken from the text content of the option element.\n'
              }
            ]
          },
          {
            name: 'textarea',
            description:
              "The textarea element represents a multiline plain text edit control for the element's raw value. The contents of the control represent the control's default value.",
            attributes: [
              {
                name: 'autocomplete',
                valueSet: 'inputautocomplete',
                description:
                  'This attribute indicates whether the value of the control can be automatically completed by the browser. Possible values are:\n\n*   `off`: The user must explicitly enter a value into this field for every use, or the document provides its own auto-completion method; the browser does not automatically complete the entry.\n*   `on`: The browser can automatically complete the value based on values that the user has entered during previous uses.\n\nIf the `autocomplete` attribute is not specified on a `<textarea>` element, then the browser uses the `autocomplete` attribute value of the `<textarea>` element\'s form owner. The form owner is either the [`<form>`](/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element that this `<textarea>` element is a descendant of or the form element whose `id` is specified by the `form` attribute of the input element. For more information, see the `[autocomplete](/en-US/docs/Web/HTML/Element/form#attr-autocomplete)` attribute in [`<form>`](/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.").'
              },
              {
                name: 'autofocus',
                valueSet: 'v',
                description:
                  'This Boolean attribute lets you specify that a form control should have input focus when the page loads. Only one form-associated element in a document can have this attribute specified.'
              },
              {
                name: 'cols',
                description:
                  'The visible width of the text control, in average character widths. If it is specified, it must be a positive integer. If it is not specified, the default value is `20`.'
              },
              { name: 'dirname' },
              {
                name: 'disabled',
                valueSet: 'v',
                description:
                  'This Boolean attribute indicates that the user cannot interact with the control. If this attribute is not specified, the control inherits its setting from the containing element, for example [`<fieldset>`](/en-US/docs/Web/HTML/Element/fieldset "The HTML <fieldset> element is used to group several controls as well as labels (<label>) within a web form."); if there is no containing element when the `disabled` attribute is set, the control is enabled.'
              },
              {
                name: 'form',
                description:
                  'The form element that the `<textarea>` element is associated with (its "form owner"). The value of the attribute must be the `id` of a form element in the same document. If this attribute is not specified, the `<textarea>` element must be a descendant of a form element. This attribute enables you to place `<textarea>` elements anywhere within a document, not just as descendants of form elements.'
              },
              { name: 'inputmode', valueSet: 'im' },
              {
                name: 'maxlength',
                description:
                  "The maximum number of characters (unicode code points) that the user can enter. If this value isn't specified, the user can enter an unlimited number of characters."
              },
              { name: 'minlength', description: 'The minimum number of characters (unicode code points) required that the user should enter.' },
              { name: 'name', description: 'The name of the control.' },
              {
                name: 'placeholder',
                description:
                  'A hint to the user of what can be entered in the control. Carriage returns or line-feeds within the placeholder text must be treated as line breaks when rendering the hint.\n\n**Note:** Placeholders should only be used to show an example of the type of data that should be entered into a form; they are _not_ a substitute for a proper [`<label>`](/en-US/docs/Web/HTML/Element/label "The HTML <label> element represents a caption for an item in a user interface.") element tied to the input. See [Labels and placeholders](/en-US/docs/Web/HTML/Element/input#Labels_and_placeholders "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") in [<input>: The Input (Form Input) element](/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") for a full explanation.'
              },
              {
                name: 'readonly',
                valueSet: 'v',
                description:
                  'This Boolean attribute indicates that the user cannot modify the value of the control. Unlike the `disabled` attribute, the `readonly` attribute does not prevent the user from clicking or selecting in the control. The value of a read-only control is still submitted with the form.'
              },
              {
                name: 'required',
                valueSet: 'v',
                description: 'This attribute specifies that the user must fill in a value before submitting a form.'
              },
              { name: 'rows', description: 'The number of visible text lines for the control.' },
              {
                name: 'wrap',
                valueSet: 'w',
                description:
                  'Indicates how the control wraps text. Possible values are:\n\n*   `hard`: The browser automatically inserts line breaks (CR+LF) so that each line has no more than the width of the control; the `cols` attribute must also be specified for this to take effect.\n*   `soft`: The browser ensures that all line breaks in the value consist of a CR+LF pair, but does not insert any additional line breaks.\n*   `off` : Like `soft` but changes appearance to `white-space: pre` so line segments exceeding `cols` are not wrapped and the `<textarea>` becomes horizontally scrollable.\n\nIf this attribute is not specified, `soft` is its default value.'
              },
              {
                name: 'autocapitalize',
                description:
                  'This is a non-standard attribute supported by WebKit on iOS (therefore nearly all browsers running on iOS, including Safari, Firefox, and Chrome), which controls whether and how the text value should be automatically capitalized as it is entered/edited by the user. The non-deprecated values are available in iOS 5 and later. Possible values are:\n\n*   `none`: Completely disables automatic capitalization.\n*   `sentences`: Automatically capitalize the first letter of sentences.\n*   `words`: Automatically capitalize the first letter of words.\n*   `characters`: Automatically capitalize all characters.\n*   `on`: Deprecated since iOS 5.\n*   `off`: Deprecated since iOS 5.'
              },
              {
                name: 'spellcheck',
                description:
                  "Specifies whether the `<textarea>` is subject to spell checking by the underlying browser/OS. the value can be:\n\n*   `true`: Indicates that the element needs to have its spelling and grammar checked.\n*   `default` : Indicates that the element is to act according to a default behavior, possibly based on the parent element's own `spellcheck` value.\n*   `false` : Indicates that the element should not be spell checked."
              }
            ]
          },
          {
            name: 'output',
            description: 'The output element represents the result of a calculation performed by the application, or the result of a user action.',
            attributes: [
              {
                name: 'for',
                description:
                  'A space-separated list of other elements’ \\[id](/en-US/docs/Web/HTML/Global_attributes/id)s, indicating that those elements contributed input values to (or otherwise affected) the calculation.\n'
              },
              {
                name: 'form',
                description:
                  'The form element that this element is associated with (its "form owner"). The value of the attribute must be an id of a form element in the same document. If this attribute is not specified, the output element must be a descendant of a form element. This attribute enables you to place output elements anywhere within a document, not just as descendants of their form elements.\n'
              },
              { name: 'name', description: 'The name of the element, exposed in the HTMLFormElement API.\n' }
            ]
          },
          {
            name: 'progress',
            description:
              'The progress element represents the completion progress of a task. The progress is either indeterminate, indicating that progress is being made but that it is not clear how much more work remains to be done before the task is complete (e.g. because the task is waiting for a remote host to respond), or the progress is a number in the range zero to a maximum, giving the fraction of work that has so far been completed.',
            attributes: [
              {
                name: 'value',
                description:
                  'This attribute specifies how much of the task that has been completed. It must be a valid floating point number between 0 and `max`, or between 0 and 1 if `max` is omitted. If there is no `value` attribute, the progress bar is indeterminate; this indicates that an activity is ongoing with no indication of how long it is expected to take.'
              },
              {
                name: 'max',
                description:
                  'This attribute describes how much work the task indicated by the `progress` element requires. The `max` attribute, if present, must have a value greater than zero and be a valid floating point number. The default value is 1.'
              }
            ]
          },
          {
            name: 'meter',
            description:
              'The meter element represents a scalar measurement within a known range, or a fractional value; for example disk usage, the relevance of a query result, or the fraction of a voting population to have selected a particular candidate.',
            attributes: [
              {
                name: 'value',
                description:
                  "The current numeric value. This must be between the minimum and maximum values (`min` attribute and `max` attribute) if they are specified. If unspecified or malformed, the value is 0. If specified, but not within the range given by the `min` attribute and `max` attribute, the value is equal to the nearest end of the range.\n\n**Usage note:** Unless the `value` attribute is between `0` and `1` (inclusive), the `min` and `max` attributes should define the range so that the `value` attribute's value is within it."
              },
              {
                name: 'min',
                description:
                  'The lower numeric bound of the measured range. This must be less than the maximum value (`max` attribute), if specified. If unspecified, the minimum value is 0.'
              },
              {
                name: 'max',
                description:
                  'The upper numeric bound of the measured range. This must be greater than the minimum value (`min` attribute), if specified. If unspecified, the maximum value is 1.'
              },
              {
                name: 'low',
                description:
                  'The upper numeric bound of the low end of the measured range. This must be greater than the minimum value (`min` attribute), and it also must be less than the high value and maximum value (`high` attribute and `max` attribute, respectively), if any are specified. If unspecified, or if less than the minimum value, the `low` value is equal to the minimum value.'
              },
              {
                name: 'high',
                description:
                  'The lower numeric bound of the high end of the measured range. This must be less than the maximum value (`max` attribute), and it also must be greater than the low value and minimum value (`low` attribute and **min** attribute, respectively), if any are specified. If unspecified, or if greater than the maximum value, the `high` value is equal to the maximum value.'
              },
              {
                name: 'optimum',
                description:
                  'This attribute indicates the optimal numeric value. It must be within the range (as defined by the `min` attribute and `max` attribute). When used with the `low` attribute and `high` attribute, it gives an indication where along the range is considered preferable. For example, if it is between the `min` attribute and the `low` attribute, then the lower range is considered preferred.'
              },
              {
                name: 'form',
                description:
                  'This attribute associates the element with a `form` element that has ownership of the `meter` element. For example, a `meter` might be displaying a range corresponding to an `input` element of `type` _number_. This attribute is only used if the `meter` element is being used as a form-associated element; even then, it may be omitted if the element appears as a descendant of a `form` element.'
              }
            ]
          },
          {
            name: 'fieldset',
            description: 'The fieldset element represents a set of form controls optionally grouped under a common name.',
            attributes: [
              {
                name: 'disabled',
                valueSet: 'v',
                description:
                  "If this Boolean attribute is set, all form controls that are descendants of the `<fieldset>`, are disabled, meaning they are not editable and won't be submitted along with the `<form>`. They won't receive any browsing events, like mouse clicks or focus-related events. By default browsers display such controls grayed out. Note that form elements inside the [`<legend>`](/en-US/docs/Web/HTML/Element/legend \"The HTML <legend> element represents a caption for the content of its parent <fieldset>.\") element won't be disabled."
              },
              {
                name: 'form',
                description:
                  'This attribute takes the value of the `id` attribute of a [`<form>`](/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element you want the `<fieldset>` to be part of, even if it is not inside the form.'
              },
              {
                name: 'name',
                description:
                  'The name associated with the group.\n\n**Note**: The caption for the fieldset is given by the first [`<legend>`](/en-US/docs/Web/HTML/Element/legend "The HTML <legend> element represents a caption for the content of its parent <fieldset>.") element nested inside it.'
              }
            ]
          },
          {
            name: 'legend',
            description:
              "The legend element represents a caption for the rest of the contents of the legend element's parent fieldset element, if any.",
            attributes: []
          },
          {
            name: 'details',
            description: 'The details element represents a disclosure widget from which the user can obtain additional information or controls.',
            attributes: [
              {
                name: 'open',
                valueSet: 'v',
                description:
                  'This Boolean attribute indicates whether or not the details — that is, the contents of the &lt;details> element — are currently visible. The default, false, means the details are not visible.\n'
              }
            ]
          },
          {
            name: 'summary',
            description:
              "The summary element represents a summary, caption, or legend for the rest of the contents of the summary element's parent details element, if any.",
            attributes: []
          },
          {
            name: 'dialog',
            description:
              'The dialog element represents a part of an application that a user interacts with to perform a task, for example a dialog box, inspector, or window.',
            attributes: [
              {
                name: 'open',
                description:
                  "Indicates that the dialog is active and available for interaction. When the `open` attribute is not set, the dialog shouldn't be shown to the user."
              }
            ]
          },
          {
            name: 'script',
            description:
              'The script element allows authors to include dynamic script and data blocks in their documents. The element does not represent content for the user.',
            attributes: [
              {
                name: 'src',
                description:
                  'This attribute specifies the URI of an external script; this can be used as an alternative to embedding a script directly within a document.\n\nIf a script element has a src attribute specified, it should not have a script embedded inside its tags.\n'
              },
              {
                name: 'type',
                description:
                  'This attribute indicates the type of script represented. The value of this attribute will be in one of the following categories:\n\nOmitted or a JavaScript MIME type: For HTML5-compliant browsers this indicates the script is JavaScript. HTML5 specification urges authors to omit the attribute rather than provide a redundant MIME type. In earlier browsers, this identified the scripting language of the embedded or imported (via the src attribute) code. JavaScript MIME types are listed in the specification.\n\nmodule: For HTML5-compliant browsers the code is treated as a JavaScript module. The processing of the script contents is not affected by the charset and defer attributes. For information on using module, see ES6 in Depth: Modules. Code may behave differently when the module keyword is used.\n\nAny other value: The embedded content is treated as a data block which won\'t be processed by the browser. Developers must use a valid MIME type that is not a JavaScript MIME type to denote data blocks. The src attribute will be ignored.\n\nNote: in Firefox you could specify the version of JavaScript contained in a &lt;script> element by including a non-standard version parameter inside the type attribute — for example type="text/javascript;version=1.8". This has been removed in Firefox 59 (see bug 1428745).\n'
              },
              { name: 'charset' },
              {
                name: 'async',
                valueSet: 'v',
                description:
                  'This is a Boolean attribute indicating that the browser should, if possible, load the script asynchronously.\n\nThis attribute must not be used if the src attribute is absent (i.e. for inline scripts). If it is included in this case it will have no effect.\n\nBrowsers usually assume the worst case scenario and load scripts synchronously, (i.e. async="false") during HTML parsing.\n\nDynamically inserted scripts (using document.createElement()) load asynchronously by default, so to turn on synchronous loading (i.e. scripts load in the order they were inserted) set async="false".\n\nSee Browser compatibility for notes on browser support. See also Async scripts for asm.js.\n'
              },
              {
                name: 'defer',
                valueSet: 'v',
                description:
                  'This Boolean attribute is set to indicate to a browser that the script is meant to be executed after the document has been parsed, but before firing \\[DOMContentLoaded](/en-US/docs/Web/Events/DOMContentLoaded "/en-US/docs/Web/Events/DOMContentLoaded").\n\nScripts with the defer attribute will prevent the DOMContentLoaded event from firing until the script has loaded and finished evaluating.\n\nThis attribute must not be used if the src attribute is absent (i.e. for inline scripts), in this case it would have no effect.\n\nTo achieve a similar effect for dynamically inserted scripts use async="false" instead. Scripts with the defer attribute will execute in the order in which they appear in the document.\n'
              },
              {
                name: 'crossorigin',
                valueSet: 'xo',
                description:
                  'Normal script elements pass minimal information to the window.onerror for scripts which do not pass the standard CORS checks. To allow error logging for sites which use a separate domain for static media, use this attribute. See CORS settings attributes for a more descriptive explanation of its valid arguments.\n'
              },
              {
                name: 'nonce',
                description:
                  "A cryptographic nonce (number used once) to whitelist inline scripts in a script-src Content-Security-Policy. The server must generate a unique nonce value each time it transmits a policy. It is critical to provide a nonce that cannot be guessed as bypassing a resource's policy is otherwise trivial.\n"
              },
              {
                name: 'integrity',
                description:
                  'This attribute contains inline metadata that a user agent can use to verify that a fetched resource has been delivered free of unexpected manipulation. See Subresource Integrity.\n'
              },
              {
                name: 'nomodule',
                description:
                  'This Boolean attribute is set to indicate that the script should not be executed in browsers that support ES2015 modules — in effect, this can be used to serve fallback scripts to older browsers that do not support modular JavaScript code.\n'
              },
              {
                name: 'referrerpolicy',
                description:
                  'Indicates which referrer to send when fetching the script, or resources fetched by the script:\n\nno-referrer: The Referer header will not be sent.\n\nno-referrer-when-downgrade (default): The Referer header will not be sent to origins without TLS (HTTPS).\n\norigin: The sent referrer will be limited to the origin of the referring page: its scheme, host, and port.\n\norigin-when-cross-origin: The referrer sent to other origins will be limited to the scheme, the host, and the port. Navigations on the same origin will still include the path.\n\nsame-origin: A referrer will be sent for same origin, but cross-origin requests will contain no referrer information.\n\nstrict-origin: Only send the origin of the document as the referrer when the protocol security level stays the same (e.g. HTTPS→HTTPS), but don\'t send it to a less secure destination (e.g. HTTPS→HTTP).\n\nstrict-origin-when-cross-origin: Send a full URL when performing a same-origin request, but only send the origin when the protocol security level stays the same (e.g.HTTPS→HTTPS), and send no header to a less secure destination (e.g. HTTPS→HTTP).\n\nunsafe-url: The referrer will include the origin and the path (but not the fragment, password, or username). This value is unsafe, because it leaks origins and paths from TLS-protected resources to insecure origins.\n\nNote: An empty string value ("") is both the default value, and a fallback value if referrerpolicy is not supported. If referrerpolicy is not explicitly specified on the &lt;script> element, it will adopt a higher-level referrer policy, i.e. one set on the whole document or domain. If a higher-level policy is not available, the empty string is treated as being equivalent to no-referrer-when-downgrade.\n'
              },
              {
                name: 'text',
                description:
                  'Like the textContent attribute, this attribute sets the text content of the element. Unlike the textContent attribute, however, this attribute is evaluated as executable code after the node is inserted into the DOM.\n'
              }
            ]
          },
          {
            name: 'noscript',
            description:
              "The noscript element represents nothing if scripting is enabled, and represents its children if scripting is disabled. It is used to present different markup to user agents that support scripting and those that don't support scripting, by affecting how the document is parsed.",
            attributes: []
          },
          {
            name: 'template',
            description: 'The template element is used to declare fragments of HTML that can be cloned and inserted in the document by script.',
            attributes: []
          },
          {
            name: 'canvas',
            description:
              'The canvas element provides scripts with a resolution-dependent bitmap canvas, which can be used for rendering graphs, game graphics, art, or other visual images on the fly.',
            attributes: [
              { name: 'width', description: 'The width of the coordinate space in CSS pixels. Defaults to 300.' },
              { name: 'height', description: 'The height of the coordinate space in CSS pixels. Defaults to 150.' },
              {
                name: 'moz-opaque',
                description:
                  "Lets the canvas know whether or not translucency will be a factor. If the canvas knows there's no translucency, painting performance can be optimized. This is only supported by Mozilla-based browsers; use the standardized [`canvas.getContext('2d', { alpha: false })`](/en-US/docs/Web/API/HTMLCanvasElement/getContext \"The HTMLCanvasElement.getContext() method returns a drawing context on the canvas, or null if the context identifier is not supported.\") instead."
              }
            ]
          }
        ];
        exports.HTML5_TAGS = e;
      },
      {}
    ],
    Mj5a: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.HTML5_EVENTS = void 0);
        var e = [
          { name: 'onabort', description: 'The loading of a resource has been aborted.' },
          { name: 'onblur', description: 'An element has lost focus (does not bubble).' },
          {
            name: 'oncanplay',
            description:
              'The user agent can play the media, but estimates that not enough data has been loaded to play the media up to its end without having to stop for further buffering of content.'
          },
          {
            name: 'oncanplaythrough',
            description: 'The user agent can play the media up to its end without having to stop for further buffering of content.'
          },
          {
            name: 'onchange',
            description:
              "The change event is fired for <input>, <select>, and <textarea> elements when a change to the element's value is committed by the user."
          },
          { name: 'onclick', description: 'A pointing device button has been pressed and released on an element.' },
          { name: 'oncontextmenu', description: 'The right button of the mouse is clicked (before the context menu is displayed).' },
          { name: 'ondblclick', description: 'A pointing device button is clicked twice on an element.' },
          { name: 'ondrag', description: 'An element or text selection is being dragged (every 350ms).' },
          { name: 'ondragend', description: 'A drag operation is being ended (by releasing a mouse button or hitting the escape key).' },
          { name: 'ondragenter', description: 'A dragged element or text selection enters a valid drop target.' },
          { name: 'ondragleave', description: 'A dragged element or text selection leaves a valid drop target.' },
          { name: 'ondragover', description: 'An element or text selection is being dragged over a valid drop target (every 350ms).' },
          { name: 'ondragstart', description: 'The user starts dragging an element or text selection.' },
          { name: 'ondrop', description: 'An element is dropped on a valid drop target.' },
          { name: 'ondurationchange', description: 'The duration attribute has been updated.' },
          {
            name: 'onemptied',
            description:
              'The media has become empty; for example, this event is sent if the media has already been loaded (or partially loaded), and the load() method is called to reload it.'
          },
          { name: 'onended', description: 'Playback has stopped because the end of the media was reached.' },
          { name: 'onerror', description: 'A resource failed to load.' },
          { name: 'onfocus', description: 'An element has received focus (does not bubble).' },
          { name: 'onformchange' },
          { name: 'onforminput' },
          {
            name: 'oninput',
            description: 'The value of an element changes or the content of an element with the attribute contenteditable is modified.'
          },
          { name: 'oninvalid', description: "A submittable element has been checked and doesn't satisfy its constraints." },
          { name: 'onkeydown', description: 'A key is pressed down.' },
          { name: 'onkeypress', description: 'A key is pressed down and that key normally produces a character value (use input instead).' },
          { name: 'onkeyup', description: 'A key is released.' },
          { name: 'onload', description: 'A resource and its dependent resources have finished loading.' },
          { name: 'onloadeddata', description: 'The first frame of the media has finished loading.' },
          { name: 'onloadedmetadata', description: 'The metadata has been loaded.' },
          { name: 'onloadstart', description: 'Progress has begun.' },
          { name: 'onmousedown', description: 'A pointing device button (usually a mouse) is pressed on an element.' },
          { name: 'onmousemove', description: 'A pointing device is moved over an element.' },
          {
            name: 'onmouseout',
            description: 'A pointing device is moved off the element that has the listener attached or off one of its children.'
          },
          {
            name: 'onmouseover',
            description: 'A pointing device is moved onto the element that has the listener attached or onto one of its children.'
          },
          { name: 'onmouseup', description: 'A pointing device button is released over an element.' },
          { name: 'onmousewheel' },
          { name: 'onpause', description: 'Playback has been paused.' },
          { name: 'onplay', description: 'Playback has begun.' },
          { name: 'onplaying', description: 'Playback is ready to start after having been paused or delayed due to lack of data.' },
          { name: 'onprogress', description: 'In progress.' },
          { name: 'onratechange', description: 'The playback rate has changed.' },
          { name: 'onreset', description: 'A form is reset.' },
          { name: 'onresize', description: 'The document view has been resized.' },
          { name: 'onreadystatechange', description: 'The readyState attribute of a document has changed.' },
          { name: 'onscroll', description: 'The document view or an element has been scrolled.' },
          { name: 'onseeked', description: 'A seek operation completed.' },
          { name: 'onseeking', description: 'A seek operation began.' },
          { name: 'onselect', description: 'Some text is being selected.' },
          { name: 'onshow', description: 'A contextmenu event was fired on/bubbled to an element that has a contextmenu attribute' },
          { name: 'onstalled', description: 'The user agent is trying to fetch media data, but data is unexpectedly not forthcoming.' },
          { name: 'onsubmit', description: 'A form is submitted.' },
          { name: 'onsuspend', description: 'Media data loading has been suspended.' },
          { name: 'ontimeupdate', description: 'The time indicated by the currentTime attribute has been updated.' },
          { name: 'onvolumechange', description: 'The volume has changed.' },
          { name: 'onwaiting', description: 'Playback has stopped because of a temporary lack of data.' }
        ];
        exports.HTML5_EVENTS = e;
      },
      {}
    ],
    Nu7a: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.ARIA_ATTRIBUTES = void 0);
        var e = [
          {
            name: 'aria-activedescendant',
            description: 'Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.\n'
          },
          {
            name: 'aria-atomic',
            valueSet: 'b',
            description:
              'Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute.\n'
          },
          {
            name: 'aria-autocomplete',
            valueSet: 'autocomplete',
            description:
              "Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be presented if they are made.\n"
          },
          {
            name: 'aria-busy',
            valueSet: 'b',
            description:
              'Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user.\n'
          },
          {
            name: 'aria-checked',
            valueSet: 'tristate',
            description:
              'Indicates the current "checked" state of checkboxes, radio buttons, and other widgets. See related aria-pressed and aria-selected.\n'
          },
          { name: 'aria-colcount', description: 'Defines the total number of columns in a table, grid, or treegrid. See related aria-colindex.\n' },
          {
            name: 'aria-colindex',
            description:
              "Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid. See related aria-colcount and aria-colspan.\n"
          },
          {
            name: 'aria-colspan',
            description:
              'Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid. See related aria-colindex and aria-rowspan.\n'
          },
          {
            name: 'aria-controls',
            description:
              'Identifies the element (or elements) whose contents or presence are controlled by the current element. See related aria-owns.\n'
          },
          {
            name: 'aria-current',
            valueSet: 'current',
            description: 'Indicates the element that represents the current item within a container or set of related elements.\n'
          },
          { name: 'aria-describedat' },
          { name: 'aria-describedby', description: 'Identifies the element (or elements) that describes the object. See related aria-labelledby.\n' },
          {
            name: 'aria-disabled',
            valueSet: 'b',
            description:
              'Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable. See related aria-hidden and aria-readonly.\n'
          },
          {
            name: 'aria-dropeffect',
            valueSet: 'dropeffect',
            description:
              '\\[Deprecated in ARIA 1.1] Indicates what functions can be performed when a dragged object is released on the drop target.\n'
          },
          {
            name: 'aria-errormessage',
            description: 'Identifies the element that provides an error message for the object. See related aria-invalid and aria-describedby.\n'
          },
          {
            name: 'aria-expanded',
            valueSet: 'u',
            description: 'Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.\n'
          },
          {
            name: 'aria-flowto',
            description:
              "Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion, allows assistive technology to override the general default of reading in document source order.\n"
          },
          {
            name: 'aria-grabbed',
            valueSet: 'u',
            description: '\\[Deprecated in ARIA 1.1] Indicates an element\'s "grabbed" state in a drag-and-drop operation.\n'
          },
          {
            name: 'aria-haspopup',
            valueSet: 'b',
            description:
              'Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element.\n'
          },
          {
            name: 'aria-hidden',
            valueSet: 'b',
            description: 'Indicates whether the element is exposed to an accessibility API. See related aria-disabled.\n'
          },
          {
            name: 'aria-invalid',
            valueSet: 'invalid',
            description: 'Indicates the entered value does not conform to the format expected by the application. See related aria-errormessage.\n'
          },
          { name: 'aria-kbdshortcuts' },
          { name: 'aria-label', description: 'Defines a string value that labels the current element. See related aria-labelledby.\n' },
          {
            name: 'aria-labelledby',
            description: 'Identifies the element (or elements) that labels the current element. See related aria-describedby.\n'
          },
          { name: 'aria-level', description: 'Defines the hierarchical level of an element within a structure.\n' },
          {
            name: 'aria-live',
            valueSet: 'live',
            description:
              'Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.\n'
          },
          { name: 'aria-modal', valueSet: 'b', description: 'Indicates whether an element is modal when displayed.\n' },
          {
            name: 'aria-multiline',
            valueSet: 'b',
            description: 'Indicates whether a text box accepts multiple lines of input or only a single line.\n'
          },
          {
            name: 'aria-multiselectable',
            valueSet: 'b',
            description: 'Indicates that the user may select more than one item from the current selectable descendants.\n'
          },
          {
            name: 'aria-orientation',
            valueSet: 'orientation',
            description: "Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous.\n"
          },
          {
            name: 'aria-owns',
            description:
              'Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship between DOM elements where the DOM hierarchy cannot be used to represent the relationship. See related aria-controls.\n'
          },
          {
            name: 'aria-placeholder',
            description:
              'Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value. A hint could be a sample value or a brief description of the expected format.\n'
          },
          {
            name: 'aria-posinset',
            description:
              "Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. See related aria-setsize.\n"
          },
          {
            name: 'aria-pressed',
            valueSet: 'tristate',
            description: 'Indicates the current "pressed" state of toggle buttons. See related aria-checked and aria-selected.\n'
          },
          {
            name: 'aria-readonly',
            valueSet: 'b',
            description: 'Indicates that the element is not editable, but is otherwise operable. See related aria-disabled.\n'
          },
          {
            name: 'aria-relevant',
            valueSet: 'relevant',
            description:
              'Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified. See related aria-atomic.\n'
          },
          {
            name: 'aria-required',
            valueSet: 'b',
            description: 'Indicates that user input is required on the element before a form may be submitted.\n'
          },
          { name: 'aria-roledescription', description: 'Defines a human-readable, author-localized description for the role of an element.\n' },
          { name: 'aria-rowcount', description: 'Defines the total number of rows in a table, grid, or treegrid. See related aria-rowindex.\n' },
          {
            name: 'aria-rowindex',
            description:
              "Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid. See related aria-rowcount and aria-rowspan.\n"
          },
          {
            name: 'aria-rowspan',
            description:
              'Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid. See related aria-rowindex and aria-colspan.\n'
          },
          {
            name: 'aria-selected',
            valueSet: 'u',
            description: 'Indicates the current "selected" state of various widgets. See related aria-checked and aria-pressed.\n'
          },
          {
            name: 'aria-setsize',
            description:
              'Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. See related aria-posinset.\n'
          },
          {
            name: 'aria-sort',
            valueSet: 'sort',
            description: 'Indicates if items in a table or grid are sorted in ascending or descending order.\n'
          },
          { name: 'aria-valuemax', description: 'Defines the maximum allowed value for a range widget.\n' },
          { name: 'aria-valuemin', description: 'Defines the minimum allowed value for a range widget.\n' },
          { name: 'aria-valuenow', description: 'Defines the current value for a range widget. See related aria-valuetext.\n' },
          { name: 'aria-valuetext', description: 'Defines the human readable text alternative of aria-valuenow for a range widget.\n' },
          {
            name: 'aria-details',
            description: 'Identifies the element that provides a detailed, extended description for the object. See related aria-describedby.\n'
          },
          {
            name: 'aria-keyshortcuts',
            description: 'Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element.\n'
          }
        ];
        exports.ARIA_ATTRIBUTES = e;
      },
      {}
    ],
    Aq8U: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.getHTML5DataProvider = o),
          (exports.HTML5_VALUE_MAP = exports.HTML5_GLOBAL_ATTRIBUTES = void 0);
        var e = require('../dataProvider.js'),
          a = require('./html5Tags.js'),
          n = require('./html5Events.js'),
          m = require('./html5Aria.js');
        function o() {
          return new e.HTMLDataProvider('html5', { version: 1, tags: a.HTML5_TAGS, globalAttributes: t.concat(n.HTML5_EVENTS), valueSets: l });
        }
        var t = m.ARIA_ATTRIBUTES.concat([
          { name: 'accesskey' },
          { name: 'class' },
          { name: 'contenteditable', valueSet: 'b' },
          { name: 'contextmenu' },
          { name: 'dir', valueSet: 'd' },
          { name: 'draggable', valueSet: 'b' },
          { name: 'dropzone' },
          { name: 'hidden', valueSet: 'v' },
          { name: 'id' },
          { name: 'itemid' },
          { name: 'itemprop' },
          { name: 'itemref' },
          { name: 'itemscope', valueSet: 'v' },
          { name: 'itemtype' },
          { name: 'lang' },
          { name: 'role', valueSet: 'roles' },
          { name: 'spellcheck', valueSet: 'b' },
          { name: 'style' },
          { name: 'tabindex' },
          { name: 'title' },
          { name: 'translate', valueSet: 'y' }
        ]);
        exports.HTML5_GLOBAL_ATTRIBUTES = t;
        var l = [
          { name: 'b', values: [{ name: 'true' }, { name: 'false' }] },
          { name: 'u', values: [{ name: 'true' }, { name: 'false' }, { name: 'undefined' }] },
          { name: 'o', values: [{ name: 'on' }, { name: 'off' }] },
          { name: 'y', values: [{ name: 'yes' }, { name: 'no' }] },
          { name: 'w', values: [{ name: 'soft' }, { name: 'hard' }] },
          { name: 'd', values: [{ name: 'ltr' }, { name: 'rtl' }, { name: 'auto' }] },
          { name: 'm', values: [{ name: 'GET' }, { name: 'POST' }, { name: 'dialog' }] },
          { name: 'fm', values: [{ name: 'GET' }, { name: 'POST' }] },
          { name: 's', values: [{ name: 'row' }, { name: 'col' }, { name: 'rowgroup' }, { name: 'colgroup' }] },
          {
            name: 't',
            values: [
              { name: 'hidden' },
              { name: 'text' },
              { name: 'search' },
              { name: 'tel' },
              { name: 'url' },
              { name: 'email' },
              { name: 'password' },
              { name: 'datetime' },
              { name: 'date' },
              { name: 'month' },
              { name: 'week' },
              { name: 'time' },
              { name: 'datetime-local' },
              { name: 'number' },
              { name: 'range' },
              { name: 'color' },
              { name: 'checkbox' },
              { name: 'radio' },
              { name: 'file' },
              { name: 'submit' },
              { name: 'image' },
              { name: 'reset' },
              { name: 'button' }
            ]
          },
          {
            name: 'im',
            values: [
              { name: 'verbatim' },
              { name: 'latin' },
              { name: 'latin-name' },
              { name: 'latin-prose' },
              { name: 'full-width-latin' },
              { name: 'kana' },
              { name: 'kana-name' },
              { name: 'katakana' },
              { name: 'numeric' },
              { name: 'tel' },
              { name: 'email' },
              { name: 'url' }
            ]
          },
          { name: 'bt', values: [{ name: 'button' }, { name: 'submit' }, { name: 'reset' }, { name: 'menu' }] },
          { name: 'lt', values: [{ name: '1' }, { name: 'a' }, { name: 'A' }, { name: 'i' }, { name: 'I' }] },
          { name: 'mt', values: [{ name: 'context' }, { name: 'toolbar' }] },
          { name: 'mit', values: [{ name: 'command' }, { name: 'checkbox' }, { name: 'radio' }] },
          { name: 'et', values: [{ name: 'application/x-www-form-urlencoded' }, { name: 'multipart/form-data' }, { name: 'text/plain' }] },
          { name: 'tk', values: [{ name: 'subtitles' }, { name: 'captions' }, { name: 'descriptions' }, { name: 'chapters' }, { name: 'metadata' }] },
          { name: 'pl', values: [{ name: 'none' }, { name: 'metadata' }, { name: 'auto' }] },
          { name: 'sh', values: [{ name: 'circle' }, { name: 'default' }, { name: 'poly' }, { name: 'rect' }] },
          { name: 'xo', values: [{ name: 'anonymous' }, { name: 'use-credentials' }] },
          {
            name: 'sb',
            values: [
              { name: 'allow-forms' },
              { name: 'allow-modals' },
              { name: 'allow-pointer-lock' },
              { name: 'allow-popups' },
              { name: 'allow-popups-to-escape-sandbox' },
              { name: 'allow-same-origin' },
              { name: 'allow-scripts' },
              { name: 'allow-top-navigation' }
            ]
          },
          { name: 'tristate', values: [{ name: 'true' }, { name: 'false' }, { name: 'mixed' }, { name: 'undefined' }] },
          {
            name: 'inputautocomplete',
            values: [
              { name: 'additional-name' },
              { name: 'address-level1' },
              { name: 'address-level2' },
              { name: 'address-level3' },
              { name: 'address-level4' },
              { name: 'address-line1' },
              { name: 'address-line2' },
              { name: 'address-line3' },
              { name: 'bday' },
              { name: 'bday-year' },
              { name: 'bday-day' },
              { name: 'bday-month' },
              { name: 'billing' },
              { name: 'cc-additional-name' },
              { name: 'cc-csc' },
              { name: 'cc-exp' },
              { name: 'cc-exp-month' },
              { name: 'cc-exp-year' },
              { name: 'cc-family-name' },
              { name: 'cc-given-name' },
              { name: 'cc-name' },
              { name: 'cc-number' },
              { name: 'cc-type' },
              { name: 'country' },
              { name: 'country-name' },
              { name: 'current-password' },
              { name: 'email' },
              { name: 'family-name' },
              { name: 'fax' },
              { name: 'given-name' },
              { name: 'home' },
              { name: 'honorific-prefix' },
              { name: 'honorific-suffix' },
              { name: 'impp' },
              { name: 'language' },
              { name: 'mobile' },
              { name: 'name' },
              { name: 'new-password' },
              { name: 'nickname' },
              { name: 'organization' },
              { name: 'organization-title' },
              { name: 'pager' },
              { name: 'photo' },
              { name: 'postal-code' },
              { name: 'sex' },
              { name: 'shipping' },
              { name: 'street-address' },
              { name: 'tel-area-code' },
              { name: 'tel' },
              { name: 'tel-country-code' },
              { name: 'tel-extension' },
              { name: 'tel-local' },
              { name: 'tel-local-prefix' },
              { name: 'tel-local-suffix' },
              { name: 'tel-national' },
              { name: 'transaction-amount' },
              { name: 'transaction-currency' },
              { name: 'url' },
              { name: 'username' },
              { name: 'work' }
            ]
          },
          { name: 'autocomplete', values: [{ name: 'inline' }, { name: 'list' }, { name: 'both' }, { name: 'none' }] },
          {
            name: 'current',
            values: [
              { name: 'page' },
              { name: 'step' },
              { name: 'location' },
              { name: 'date' },
              { name: 'time' },
              { name: 'true' },
              { name: 'false' }
            ]
          },
          {
            name: 'dropeffect',
            values: [{ name: 'copy' }, { name: 'move' }, { name: 'link' }, { name: 'execute' }, { name: 'popup' }, { name: 'none' }]
          },
          { name: 'invalid', values: [{ name: 'grammar' }, { name: 'false' }, { name: 'spelling' }, { name: 'true' }] },
          { name: 'live', values: [{ name: 'off' }, { name: 'polite' }, { name: 'assertive' }] },
          { name: 'orientation', values: [{ name: 'vertical' }, { name: 'horizontal' }, { name: 'undefined' }] },
          { name: 'relevant', values: [{ name: 'additions' }, { name: 'removals' }, { name: 'text' }, { name: 'all' }, { name: 'additions text' }] },
          { name: 'sort', values: [{ name: 'ascending' }, { name: 'descending' }, { name: 'none' }, { name: 'other' }] },
          {
            name: 'roles',
            values: [
              { name: 'alert' },
              { name: 'alertdialog' },
              { name: 'button' },
              { name: 'checkbox' },
              { name: 'dialog' },
              { name: 'gridcell' },
              { name: 'link' },
              { name: 'log' },
              { name: 'marquee' },
              { name: 'menuitem' },
              { name: 'menuitemcheckbox' },
              { name: 'menuitemradio' },
              { name: 'option' },
              { name: 'progressbar' },
              { name: 'radio' },
              { name: 'scrollbar' },
              { name: 'searchbox' },
              { name: 'slider' },
              { name: 'spinbutton' },
              { name: 'status' },
              { name: 'switch' },
              { name: 'tab' },
              { name: 'tabpanel' },
              { name: 'textbox' },
              { name: 'timer' },
              { name: 'tooltip' },
              { name: 'treeitem' },
              { name: 'combobox' },
              { name: 'grid' },
              { name: 'listbox' },
              { name: 'menu' },
              { name: 'menubar' },
              { name: 'radiogroup' },
              { name: 'tablist' },
              { name: 'tree' },
              { name: 'treegrid' },
              { name: 'application' },
              { name: 'article' },
              { name: 'cell' },
              { name: 'columnheader' },
              { name: 'definition' },
              { name: 'directory' },
              { name: 'document' },
              { name: 'feed' },
              { name: 'figure' },
              { name: 'group' },
              { name: 'heading' },
              { name: 'img' },
              { name: 'list' },
              { name: 'listitem' },
              { name: 'math' },
              { name: 'none' },
              { name: 'note' },
              { name: 'presentation' },
              { name: 'region' },
              { name: 'row' },
              { name: 'rowgroup' },
              { name: 'rowheader' },
              { name: 'separator' },
              { name: 'table' },
              { name: 'term' },
              { name: 'text' },
              { name: 'toolbar' },
              { name: 'banner' },
              { name: 'complementary' },
              { name: 'contentinfo' },
              { name: 'form' },
              { name: 'main' },
              { name: 'navigation' },
              { name: 'region' },
              { name: 'search' },
              { name: 'doc-abstract' },
              { name: 'doc-acknowledgments' },
              { name: 'doc-afterword' },
              { name: 'doc-appendix' },
              { name: 'doc-backlink' },
              { name: 'doc-biblioentry' },
              { name: 'doc-bibliography' },
              { name: 'doc-biblioref' },
              { name: 'doc-chapter' },
              { name: 'doc-colophon' },
              { name: 'doc-conclusion' },
              { name: 'doc-cover' },
              { name: 'doc-credit' },
              { name: 'doc-credits' },
              { name: 'doc-dedication' },
              { name: 'doc-endnote' },
              { name: 'doc-endnotes' },
              { name: 'doc-epigraph' },
              { name: 'doc-epilogue' },
              { name: 'doc-errata' },
              { name: 'doc-example' },
              { name: 'doc-footnote' },
              { name: 'doc-foreword' },
              { name: 'doc-glossary' },
              { name: 'doc-glossref' },
              { name: 'doc-index' },
              { name: 'doc-introduction' },
              { name: 'doc-noteref' },
              { name: 'doc-notice' },
              { name: 'doc-pagebreak' },
              { name: 'doc-pagelist' },
              { name: 'doc-part' },
              { name: 'doc-preface' },
              { name: 'doc-prologue' },
              { name: 'doc-pullquote' },
              { name: 'doc-qna' },
              { name: 'doc-subtitle' },
              { name: 'doc-tip' },
              { name: 'doc-toc' }
            ]
          },
          {
            name: 'metanames',
            values: [
              { name: 'application-name' },
              { name: 'author' },
              { name: 'description' },
              { name: 'format-detection' },
              { name: 'generator' },
              { name: 'keywords' },
              { name: 'publisher' },
              { name: 'referrer' },
              { name: 'robots' },
              { name: 'theme-color' },
              { name: 'viewport' }
            ]
          }
        ];
        exports.HTML5_VALUE_MAP = l;
      },
      { '../dataProvider.js': 'muLC', './html5Tags.js': 'DdcB', './html5Events.js': 'Mj5a', './html5Aria.js': 'Nu7a' }
    ],
    Xsji: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }),
          (exports.getAllDataProviders = o),
          (exports.handleCustomDataProviders = a),
          (exports.builtinDataProviders = void 0);
        var t = require('./data/html5.js'),
          r = [(0, t.getHTML5DataProvider)()];
        exports.builtinDataProviders = r;
        var e = [];
        function o() {
          return r.concat(e);
        }
        function a(t) {
          t.forEach(function(t) {
            e.push(t);
          });
        }
      },
      { './data/html5.js': 'Aq8U' }
    ],
    dq4C: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.HTMLCompletion = void 0);
        var e = require('../../vscode-languageserver-types/main.js'),
          t = require('../parser/htmlScanner.js'),
          n = require('../htmlLanguageTypes.js'),
          r = require('../parser/htmlEntities.js'),
          a = c(require('../../../fillers/vscode-nls.js')),
          i = require('../utils/strings.js'),
          o = require('../languageFacts/builtinDataProviders.js'),
          s = require('../languageFacts/fact.js');
        function u() {
          if ('function' != typeof WeakMap) return null;
          var e = new WeakMap();
          return (
            (u = function() {
              return e;
            }),
            e
          );
        }
        function c(e) {
          if (e && e.__esModule) return e;
          var t = u();
          if (t && t.has(e)) return t.get(e);
          var n = {};
          if (null != e) {
            var r = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var a in e)
              if (Object.prototype.hasOwnProperty.call(e, a)) {
                var i = r ? Object.getOwnPropertyDescriptor(e, a) : null;
                i && (i.get || i.set) ? Object.defineProperty(n, a, i) : (n[a] = e[a]);
              }
          }
          return (n.default = e), t && t.set(e, n), n;
        }
        var f = a.loadMessageBundle(),
          T = (function() {
            function a() {
              this.completionParticipants = [];
            }
            return (
              (a.prototype.setCompletionParticipants = function(e) {
                this.completionParticipants = e || [];
              }),
              (a.prototype.doComplete = function(a, u, c, T) {
                var k = { isIncomplete: !1, items: [] },
                  E = this.completionParticipants,
                  v = (0, o.getAllDataProviders)().filter(function(e) {
                    return e.isApplicable(a.languageId) && (!T || !1 !== T[e.getId()]);
                  }),
                  x = a.getText(),
                  h = a.offsetAt(u),
                  b = c.findNodeBefore(h);
                if (!b) return k;
                var S,
                  y = (0, t.createScanner)(x, b.start),
                  O = '';
                function C(e, t) {
                  return void 0 === t && (t = h), e > h && (e = h), { start: a.positionAt(e), end: a.positionAt(t) };
                }
                function A(t, n) {
                  var r = C(t, n);
                  return (
                    v.forEach(function(t) {
                      t.provideTags().forEach(function(t) {
                        k.items.push({
                          label: t.name,
                          kind: e.CompletionItemKind.Property,
                          documentation: t.description,
                          textEdit: e.TextEdit.replace(r, t.name),
                          insertTextFormat: e.InsertTextFormat.PlainText
                        });
                      });
                    }),
                    k
                  );
                }
                function P(e) {
                  for (var t = e; t > 0; ) {
                    var n = x.charAt(t - 1);
                    if ('\n\r'.indexOf(n) >= 0) return x.substring(t, e);
                    if (!d(n)) return null;
                    t--;
                  }
                  return x.substring(0, e);
                }
                function I(t, r, a) {
                  void 0 === a && (a = h);
                  var i = C(t, a),
                    o = p(x, a, n.ScannerState.WithinEndTag, n.TokenType.EndTagClose) ? '' : '>',
                    s = b;
                  for (r && (s = s.parent); s; ) {
                    var u = s.tag;
                    if (u && (!s.closed || (s.endTagStart && s.endTagStart > h))) {
                      var c = {
                          label: '/' + u,
                          kind: e.CompletionItemKind.Property,
                          filterText: '/' + u + o,
                          textEdit: e.TextEdit.replace(i, '/' + u + o),
                          insertTextFormat: e.InsertTextFormat.PlainText
                        },
                        f = P(s.start),
                        T = P(t - 1);
                      if (null !== f && null !== T && f !== T) {
                        var l = f + '</' + u + o;
                        (c.textEdit = e.TextEdit.replace(C(t - 1 - T.length), l)), (c.filterText = T + '</' + u + o);
                      }
                      return k.items.push(c), k;
                    }
                    s = s.parent;
                  }
                  return r
                    ? k
                    : (v.forEach(function(t) {
                        t.provideTags().forEach(function(t) {
                          k.items.push({
                            label: '/' + t.name,
                            kind: e.CompletionItemKind.Property,
                            documentation: t.description,
                            filterText: '/' + t + o,
                            textEdit: e.TextEdit.replace(i, '/' + t + o),
                            insertTextFormat: e.InsertTextFormat.PlainText
                          });
                        });
                      }),
                      k);
                }
                function F(t, n) {
                  if (T && T.hideAutoCompleteProposals) return k;
                  if (!(0, s.isVoidElement)(n)) {
                    var r = a.positionAt(t);
                    k.items.push({
                      label: '</' + n + '>',
                      kind: e.CompletionItemKind.Property,
                      filterText: '</' + n + '>',
                      textEdit: e.TextEdit.insert(r, '$0</' + n + '>'),
                      insertTextFormat: e.InsertTextFormat.Snippet
                    });
                  }
                  return k;
                }
                function j(e, t) {
                  return A(e, t), I(e, !0, t), k;
                }
                function K(t, r) {
                  void 0 === r && (r = h);
                  for (var a = h; a < r && '<' !== x[a]; ) a++;
                  var o = C(t, a),
                    s = p(x, r, n.ScannerState.AfterAttributeName, n.TokenType.DelimiterAssign) ? '' : '="$1"',
                    u = O.toLowerCase(),
                    f = Object.create(null);
                  return (
                    v.forEach(function(t) {
                      t.provideAttributes(u).forEach(function(t) {
                        if (!f[t.name]) {
                          f[t.name] = !0;
                          var n,
                            r = t.name;
                          'v' !== t.valueSet &&
                            s.length &&
                            ((r += s), t.valueSet && (n = { title: 'Suggest', command: 'editor.action.triggerSuggest' })),
                            k.items.push({
                              label: t.name,
                              kind: 'handler' === t.valueSet ? e.CompletionItemKind.Function : e.CompletionItemKind.Value,
                              documentation: t.description,
                              textEdit: e.TextEdit.replace(o, r),
                              insertTextFormat: e.InsertTextFormat.Snippet,
                              command: n
                            });
                        }
                      });
                    }),
                    (function(t, n) {
                      var r = 'data-',
                        a = {};
                      (a[r] = r + '$1="$2"'),
                        c &&
                          c.roots.forEach(function(e) {
                            return (function e(t) {
                              t.attributeNames.forEach(function(e) {
                                !(0, i.startsWith)(e, r) || a[e] || n[e] || (a[e] = e + '="$1"');
                              });
                              t.children.forEach(function(t) {
                                return e(t);
                              });
                            })(e);
                          });
                      Object.keys(a).forEach(function(n) {
                        return k.items.push({
                          label: n,
                          kind: e.CompletionItemKind.Value,
                          textEdit: e.TextEdit.replace(t, a[n]),
                          insertTextFormat: e.InsertTextFormat.Snippet
                        });
                      });
                    })(o, f),
                    k
                  );
                }
                function w(t, n) {
                  var r, i, o;
                  if ((void 0 === n && (n = h), h > t && h <= n && l(x[t]))) {
                    var s = t + 1,
                      c = n;
                    n > t && x[n - 1] === x[t] && c--;
                    var f = g(x, h, s),
                      T = m(x, h, c);
                    (r = C(f, T)), (o = h >= s && h <= c ? x.substring(s, h) : ''), (i = !1);
                  } else (r = C(t, n)), (o = x.substring(t, h)), (i = !0);
                  var d = O.toLowerCase(),
                    p = S.toLowerCase();
                  if (E.length > 0)
                    for (var b = C(t, n), y = 0, A = E; y < A.length; y++) {
                      var P = A[y];
                      P.onHtmlAttributeValue && P.onHtmlAttributeValue({ document: a, position: u, tag: d, attribute: p, value: o, range: b });
                    }
                  return (
                    v.forEach(function(t) {
                      t.provideValues(d, p).forEach(function(t) {
                        var n = i ? '"' + t.name + '"' : t.name;
                        k.items.push({
                          label: t.name,
                          filterText: n,
                          kind: e.CompletionItemKind.Unit,
                          textEdit: e.TextEdit.replace(r, n),
                          insertTextFormat: e.InsertTextFormat.PlainText
                        });
                      });
                    }),
                    W(),
                    k
                  );
                }
                function V(e) {
                  return h === y.getTokenEnd() && (L = y.scan()) === e && y.getTokenOffset() === h ? y.getTokenEnd() : h;
                }
                function D() {
                  for (var e = 0, t = E; e < t.length; e++) {
                    var n = t[e];
                    n.onHtmlContent && n.onHtmlContent({ document: a, position: u });
                  }
                  return W();
                }
                function W() {
                  for (var t = h - 1, n = u.character; t >= 0 && (0, i.isLetterOrDigit)(x, t); ) t--, n--;
                  if (t >= 0 && '&' === x[t]) {
                    var a = e.Range.create(e.Position.create(u.line, n - 1), u);
                    for (var o in r.entities)
                      if ((0, i.endsWith)(o, ';')) {
                        var s = '&' + o;
                        k.items.push({
                          label: s,
                          kind: e.CompletionItemKind.Keyword,
                          documentation: f('entity.propose', "Character entity representing '" + r.entities[o] + "'"),
                          textEdit: e.TextEdit.replace(a, s),
                          insertTextFormat: e.InsertTextFormat.PlainText
                        });
                      }
                  }
                  return k;
                }
                for (var q, L = y.scan(); L !== n.TokenType.EOS && y.getTokenOffset() <= h; ) {
                  switch (L) {
                    case n.TokenType.StartTagOpen:
                      if (y.getTokenEnd() === h) {
                        var M = V(n.TokenType.StartTag);
                        return (
                          0 === u.line &&
                            ((q = void 0),
                            (q = C(h, M)),
                            k.items.push({
                              label: '!DOCTYPE',
                              kind: e.CompletionItemKind.Property,
                              documentation: 'A preamble for an HTML document.',
                              textEdit: e.TextEdit.replace(q, '!DOCTYPE html>'),
                              insertTextFormat: e.InsertTextFormat.PlainText
                            })),
                          j(h, M)
                        );
                      }
                      break;
                    case n.TokenType.StartTag:
                      if (y.getTokenOffset() <= h && h <= y.getTokenEnd()) return A(y.getTokenOffset(), y.getTokenEnd());
                      O = y.getTokenText();
                      break;
                    case n.TokenType.AttributeName:
                      if (y.getTokenOffset() <= h && h <= y.getTokenEnd()) return K(y.getTokenOffset(), y.getTokenEnd());
                      S = y.getTokenText();
                      break;
                    case n.TokenType.DelimiterAssign:
                      if (y.getTokenEnd() === h) {
                        M = V(n.TokenType.AttributeValue);
                        return w(h, M);
                      }
                      break;
                    case n.TokenType.AttributeValue:
                      if (y.getTokenOffset() <= h && h <= y.getTokenEnd()) return w(y.getTokenOffset(), y.getTokenEnd());
                      break;
                    case n.TokenType.Whitespace:
                      if (h <= y.getTokenEnd())
                        switch (y.getScannerState()) {
                          case n.ScannerState.AfterOpeningStartTag:
                            return j(y.getTokenOffset(), V(n.TokenType.StartTag));
                          case n.ScannerState.WithinTag:
                          case n.ScannerState.AfterAttributeName:
                            return K(y.getTokenEnd());
                          case n.ScannerState.BeforeAttributeValue:
                            return w(y.getTokenEnd());
                          case n.ScannerState.AfterOpeningEndTag:
                            return I(y.getTokenOffset() - 1, !1);
                          case n.ScannerState.WithinContent:
                            return D();
                        }
                      break;
                    case n.TokenType.EndTagOpen:
                      if (h <= y.getTokenEnd()) return I(y.getTokenOffset() + 1, !1, V(n.TokenType.EndTag));
                      break;
                    case n.TokenType.EndTag:
                      if (h <= y.getTokenEnd())
                        for (var $ = y.getTokenOffset() - 1; $ >= 0; ) {
                          var H = x.charAt($);
                          if ('/' === H) return I($, !1, y.getTokenEnd());
                          if (!d(H)) break;
                          $--;
                        }
                      break;
                    case n.TokenType.StartTagClose:
                      if (h <= y.getTokenEnd() && O) return F(y.getTokenEnd(), O);
                      break;
                    case n.TokenType.Content:
                      if (h <= y.getTokenEnd()) return D();
                      break;
                    default:
                      if (h <= y.getTokenEnd()) return k;
                  }
                  L = y.scan();
                }
                return k;
              }),
              (a.prototype.doTagComplete = function(e, r, a) {
                var i = e.offsetAt(r);
                if (i <= 0) return null;
                var o = e.getText().charAt(i - 1);
                if ('>' === o) {
                  if ((c = a.findNodeBefore(i)) && c.tag && !(0, s.isVoidElement)(c.tag) && c.start < i && (!c.endTagStart || c.endTagStart > i))
                    for (var u = (f = (0, t.createScanner)(e.getText(), c.start)).scan(); u !== n.TokenType.EOS && f.getTokenEnd() <= i; ) {
                      if (u === n.TokenType.StartTagClose && f.getTokenEnd() === i) return '$0</' + c.tag + '>';
                      u = f.scan();
                    }
                } else if ('/' === o) {
                  for (var c = a.findNodeBefore(i); c && c.closed; ) c = c.parent;
                  if (c && c.tag) {
                    var f;
                    for (u = (f = (0, t.createScanner)(e.getText(), c.start)).scan(); u !== n.TokenType.EOS && f.getTokenEnd() <= i; ) {
                      if (u === n.TokenType.EndTagOpen && f.getTokenEnd() === i) return c.tag + '>';
                      u = f.scan();
                    }
                  }
                }
                return null;
              }),
              a
            );
          })();
        function l(e) {
          return /^["']*$/.test(e);
        }
        function d(e) {
          return /^\s*$/.test(e);
        }
        function p(e, r, a, i) {
          for (var o = (0, t.createScanner)(e, r, a), s = o.scan(); s === n.TokenType.Whitespace; ) s = o.scan();
          return s === i;
        }
        function g(e, t, n) {
          for (; t > n && !d(e[t - 1]); ) t--;
          return t;
        }
        function m(e, t, n) {
          for (; t < n && !d(e[t]); ) t++;
          return t;
        }
        exports.HTMLCompletion = T;
      },
      {
        '../../vscode-languageserver-types/main.js': 'vCc8',
        '../parser/htmlScanner.js': 'WRaN',
        '../htmlLanguageTypes.js': 'aQAr',
        '../parser/htmlEntities.js': 'OFAP',
        '../../../fillers/vscode-nls.js': 'M4HU',
        '../utils/strings.js': 'g97J',
        '../languageFacts/builtinDataProviders.js': 'Xsji',
        '../languageFacts/fact.js': 'F0NQ'
      }
    ],
    RX4M: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.doHover = a);
        var e = require('../parser/htmlScanner.js'),
          t = require('../../vscode-languageserver-types/main.js'),
          r = require('../htmlLanguageTypes.js'),
          n = require('../languageFacts/builtinDataProviders.js');
        function a(a, o, u) {
          var i = a.offsetAt(o),
            l = u.findNodeAt(i);
          if (!l || !l.tag) return null;
          var s = (0, n.getAllDataProviders)().filter(function(e) {
            return e.isApplicable(a.languageId);
          });
          function g(e, r, n) {
            e = e.toLowerCase();
            for (
              var a = function(a) {
                  var o = null;
                  if (
                    (a.provideTags().forEach(function(a) {
                      if (a.name.toLowerCase() === e.toLowerCase()) {
                        var u = n ? '<' + e + '>' : '</' + e + '>',
                          i = a.description || '';
                        o = { contents: [{ language: 'html', value: u }, t.MarkedString.fromPlainText(i)], range: r };
                      }
                    }),
                    o)
                  )
                    return { value: o };
                },
                o = 0,
                u = s;
              o < u.length;
              o++
            ) {
              var i = a(u[o]);
              if ('object' == typeof i) return i.value;
            }
            return null;
          }
          function f(t, n) {
            for (
              var o = (0, e.createScanner)(a.getText(), n), u = o.scan();
              u !== r.TokenType.EOS && (o.getTokenEnd() < i || (o.getTokenEnd() === i && u !== t));

            )
              u = o.scan();
            return u === t && i <= o.getTokenEnd() ? { start: a.positionAt(o.getTokenOffset()), end: a.positionAt(o.getTokenEnd()) } : null;
          }
          if (l.endTagStart && i >= l.endTagStart) {
            var d = f(r.TokenType.EndTag, l.endTagStart);
            return d ? g(l.tag, d, !1) : null;
          }
          var c = f(r.TokenType.StartTag, l.start);
          return c ? g(l.tag, c, !0) : null;
        }
      },
      {
        '../parser/htmlScanner.js': 'WRaN',
        '../../vscode-languageserver-types/main.js': 'vCc8',
        '../htmlLanguageTypes.js': 'aQAr',
        '../languageFacts/builtinDataProviders.js': 'Xsji'
      }
    ],
    Gg5L: [
      function(require, module, exports) {
        'use strict';
        function e(e, t) {
          return e;
        }
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.js_beautify = e);
      },
      {}
    ],
    fM5P: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.css_beautify = void 0);
        var t = (function(t) {
          var e = {};
          function i(n) {
            if (e[n]) return e[n].exports;
            var _ = (e[n] = { i: n, l: !1, exports: {} });
            return t[n].call(_.exports, _, _.exports, i), (_.l = !0), _.exports;
          }
          return (
            (i.m = t),
            (i.c = e),
            (i.d = function(t, e, n) {
              i.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
            }),
            (i.r = function(t) {
              'undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
                Object.defineProperty(t, '__esModule', { value: !0 });
            }),
            (i.t = function(t, e) {
              if ((1 & e && (t = i(t)), 8 & e)) return t;
              if (4 & e && 'object' == typeof t && t && t.__esModule) return t;
              var n = Object.create(null);
              if ((i.r(n), Object.defineProperty(n, 'default', { enumerable: !0, value: t }), 2 & e && 'string' != typeof t))
                for (var _ in t)
                  i.d(
                    n,
                    _,
                    function(e) {
                      return t[e];
                    }.bind(null, _)
                  );
              return n;
            }),
            (i.n = function(t) {
              var e =
                t && t.__esModule
                  ? function() {
                      return t.default;
                    }
                  : function() {
                      return t;
                    };
              return i.d(e, 'a', e), e;
            }),
            (i.o = function(t, e) {
              return Object.prototype.hasOwnProperty.call(t, e);
            }),
            (i.p = ''),
            i((i.s = 15))
          );
        })([
          ,
          ,
          function(t, e, i) {
            function n(t) {
              (this.__parent = t),
                (this.__character_count = 0),
                (this.__indent_count = -1),
                (this.__alignment_count = 0),
                (this.__wrap_point_index = 0),
                (this.__wrap_point_character_count = 0),
                (this.__wrap_point_indent_count = -1),
                (this.__wrap_point_alignment_count = 0),
                (this.__items = []);
            }
            function _(t, e) {
              (this.__cache = ['']),
                (this.__indent_size = t.indent_size),
                (this.__indent_string = t.indent_char),
                t.indent_with_tabs || (this.__indent_string = new Array(t.indent_size + 1).join(t.indent_char)),
                (e = e || ''),
                t.indent_level > 0 && (e = new Array(t.indent_level + 1).join(this.__indent_string)),
                (this.__base_string = e),
                (this.__base_string_length = e.length);
            }
            function s(t, e) {
              (this.__indent_cache = new _(t, e)),
                (this.raw = !1),
                (this._end_with_newline = t.end_with_newline),
                (this.indent_size = t.indent_size),
                (this.wrap_line_length = t.wrap_line_length),
                (this.__lines = []),
                (this.previous_line = null),
                (this.current_line = null),
                (this.next_line = new n(this)),
                (this.space_before_token = !1),
                (this.non_breaking_space = !1),
                (this.previous_token_wrapped = !1),
                this.__add_outputline();
            }
            (n.prototype.clone_empty = function() {
              var t = new n(this.__parent);
              return t.set_indent(this.__indent_count, this.__alignment_count), t;
            }),
              (n.prototype.item = function(t) {
                return t < 0 ? this.__items[this.__items.length + t] : this.__items[t];
              }),
              (n.prototype.has_match = function(t) {
                for (var e = this.__items.length - 1; e >= 0; e--) if (this.__items[e].match(t)) return !0;
                return !1;
              }),
              (n.prototype.set_indent = function(t, e) {
                this.is_empty() &&
                  ((this.__indent_count = t || 0),
                  (this.__alignment_count = e || 0),
                  (this.__character_count = this.__parent.get_indent_size(this.__indent_count, this.__alignment_count)));
              }),
              (n.prototype._set_wrap_point = function() {
                this.__parent.wrap_line_length &&
                  ((this.__wrap_point_index = this.__items.length),
                  (this.__wrap_point_character_count = this.__character_count),
                  (this.__wrap_point_indent_count = this.__parent.next_line.__indent_count),
                  (this.__wrap_point_alignment_count = this.__parent.next_line.__alignment_count));
              }),
              (n.prototype._should_wrap = function() {
                return (
                  this.__wrap_point_index &&
                  this.__character_count > this.__parent.wrap_line_length &&
                  this.__wrap_point_character_count > this.__parent.next_line.__character_count
                );
              }),
              (n.prototype._allow_wrap = function() {
                if (this._should_wrap()) {
                  this.__parent.add_new_line();
                  var t = this.__parent.current_line;
                  return (
                    t.set_indent(this.__wrap_point_indent_count, this.__wrap_point_alignment_count),
                    (t.__items = this.__items.slice(this.__wrap_point_index)),
                    (this.__items = this.__items.slice(0, this.__wrap_point_index)),
                    (t.__character_count += this.__character_count - this.__wrap_point_character_count),
                    (this.__character_count = this.__wrap_point_character_count),
                    ' ' === t.__items[0] && (t.__items.splice(0, 1), (t.__character_count -= 1)),
                    !0
                  );
                }
                return !1;
              }),
              (n.prototype.is_empty = function() {
                return 0 === this.__items.length;
              }),
              (n.prototype.last = function() {
                return this.is_empty() ? null : this.__items[this.__items.length - 1];
              }),
              (n.prototype.push = function(t) {
                this.__items.push(t);
                var e = t.lastIndexOf('\n');
                -1 !== e ? (this.__character_count = t.length - e) : (this.__character_count += t.length);
              }),
              (n.prototype.pop = function() {
                var t = null;
                return this.is_empty() || ((t = this.__items.pop()), (this.__character_count -= t.length)), t;
              }),
              (n.prototype._remove_indent = function() {
                this.__indent_count > 0 && ((this.__indent_count -= 1), (this.__character_count -= this.__parent.indent_size));
              }),
              (n.prototype._remove_wrap_indent = function() {
                this.__wrap_point_indent_count > 0 && (this.__wrap_point_indent_count -= 1);
              }),
              (n.prototype.trim = function() {
                for (; ' ' === this.last(); ) this.__items.pop(), (this.__character_count -= 1);
              }),
              (n.prototype.toString = function() {
                var t = '';
                return (
                  this.is_empty() ||
                    ((t = this.__parent.get_indent_string(this.__indent_count, this.__alignment_count)), (t += this.__items.join(''))),
                  t
                );
              }),
              (_.prototype.get_indent_size = function(t, e) {
                var i = this.__base_string_length;
                return (e = e || 0), t < 0 && (i = 0), (i += t * this.__indent_size), (i += e);
              }),
              (_.prototype.get_indent_string = function(t, e) {
                var i = this.__base_string;
                return (e = e || 0), t < 0 && ((t = 0), (i = '')), (e += t * this.__indent_size), this.__ensure_cache(e), (i += this.__cache[e]);
              }),
              (_.prototype.__ensure_cache = function(t) {
                for (; t >= this.__cache.length; ) this.__add_column();
              }),
              (_.prototype.__add_column = function() {
                var t = this.__cache.length,
                  e = 0,
                  i = '';
                this.__indent_size &&
                  t >= this.__indent_size &&
                  ((t -= (e = Math.floor(t / this.__indent_size)) * this.__indent_size), (i = new Array(e + 1).join(this.__indent_string))),
                  t && (i += new Array(t + 1).join(' ')),
                  this.__cache.push(i);
              }),
              (s.prototype.__add_outputline = function() {
                (this.previous_line = this.current_line), (this.current_line = this.next_line.clone_empty()), this.__lines.push(this.current_line);
              }),
              (s.prototype.get_line_number = function() {
                return this.__lines.length;
              }),
              (s.prototype.get_indent_string = function(t, e) {
                return this.__indent_cache.get_indent_string(t, e);
              }),
              (s.prototype.get_indent_size = function(t, e) {
                return this.__indent_cache.get_indent_size(t, e);
              }),
              (s.prototype.is_empty = function() {
                return !this.previous_line && this.current_line.is_empty();
              }),
              (s.prototype.add_new_line = function(t) {
                return !(this.is_empty() || (!t && this.just_added_newline())) && (this.raw || this.__add_outputline(), !0);
              }),
              (s.prototype.get_code = function(t) {
                this.trim(!0);
                var e = this.current_line.pop();
                e && ('\n' === e[e.length - 1] && (e = e.replace(/\n+$/g, '')), this.current_line.push(e)),
                  this._end_with_newline && this.__add_outputline();
                var i = this.__lines.join('\n');
                return '\n' !== t && (i = i.replace(/[\n]/g, t)), i;
              }),
              (s.prototype.set_wrap_point = function() {
                this.current_line._set_wrap_point();
              }),
              (s.prototype.set_indent = function(t, e) {
                return (
                  (t = t || 0),
                  (e = e || 0),
                  this.next_line.set_indent(t, e),
                  this.__lines.length > 1 ? (this.current_line.set_indent(t, e), !0) : (this.current_line.set_indent(), !1)
                );
              }),
              (s.prototype.add_raw_token = function(t) {
                for (var e = 0; e < t.newlines; e++) this.__add_outputline();
                this.current_line.set_indent(-1),
                  this.current_line.push(t.whitespace_before),
                  this.current_line.push(t.text),
                  (this.space_before_token = !1),
                  (this.non_breaking_space = !1),
                  (this.previous_token_wrapped = !1);
              }),
              (s.prototype.add_token = function(t) {
                this.__add_space_before_token(),
                  this.current_line.push(t),
                  (this.space_before_token = !1),
                  (this.non_breaking_space = !1),
                  (this.previous_token_wrapped = this.current_line._allow_wrap());
              }),
              (s.prototype.__add_space_before_token = function() {
                this.space_before_token &&
                  !this.just_added_newline() &&
                  (this.non_breaking_space || this.set_wrap_point(), this.current_line.push(' '));
              }),
              (s.prototype.remove_indent = function(t) {
                for (var e = this.__lines.length; t < e; ) this.__lines[t]._remove_indent(), t++;
                this.current_line._remove_wrap_indent();
              }),
              (s.prototype.trim = function(t) {
                for (t = void 0 !== t && t, this.current_line.trim(); t && this.__lines.length > 1 && this.current_line.is_empty(); )
                  this.__lines.pop(), (this.current_line = this.__lines[this.__lines.length - 1]), this.current_line.trim();
                this.previous_line = this.__lines.length > 1 ? this.__lines[this.__lines.length - 2] : null;
              }),
              (s.prototype.just_added_newline = function() {
                return this.current_line.is_empty();
              }),
              (s.prototype.just_added_blankline = function() {
                return this.is_empty() || (this.current_line.is_empty() && this.previous_line.is_empty());
              }),
              (s.prototype.ensure_empty_line_above = function(t, e) {
                for (var i = this.__lines.length - 2; i >= 0; ) {
                  var _ = this.__lines[i];
                  if (_.is_empty()) break;
                  if (0 !== _.item(0).indexOf(t) && _.item(-1) !== e) {
                    this.__lines.splice(i + 1, 0, new n(this)), (this.previous_line = this.__lines[this.__lines.length - 2]);
                    break;
                  }
                  i--;
                }
              }),
              (t.exports.Output = s);
          },
          ,
          ,
          ,
          function(t, e, i) {
            function n(t, e) {
              (this.raw_options = _(t, e)),
                (this.disabled = this._get_boolean('disabled')),
                (this.eol = this._get_characters('eol', 'auto')),
                (this.end_with_newline = this._get_boolean('end_with_newline')),
                (this.indent_size = this._get_number('indent_size', 4)),
                (this.indent_char = this._get_characters('indent_char', ' ')),
                (this.indent_level = this._get_number('indent_level')),
                (this.preserve_newlines = this._get_boolean('preserve_newlines', !0)),
                (this.max_preserve_newlines = this._get_number('max_preserve_newlines', 32786)),
                this.preserve_newlines || (this.max_preserve_newlines = 0),
                (this.indent_with_tabs = this._get_boolean('indent_with_tabs', '\t' === this.indent_char)),
                this.indent_with_tabs && ((this.indent_char = '\t'), 1 === this.indent_size && (this.indent_size = 4)),
                (this.wrap_line_length = this._get_number('wrap_line_length', this._get_number('max_char')));
            }
            function _(t, e) {
              var i,
                n = {};
              for (i in (t = s(t))) i !== e && (n[i] = t[i]);
              if (e && t[e]) for (i in t[e]) n[i] = t[e][i];
              return n;
            }
            function s(t) {
              var e,
                i = {};
              for (e in t) {
                i[e.replace(/-/g, '_')] = t[e];
              }
              return i;
            }
            (n.prototype._get_array = function(t, e) {
              var i = this.raw_options[t],
                n = e || [];
              return (
                'object' == typeof i
                  ? null !== i && 'function' == typeof i.concat && (n = i.concat())
                  : 'string' == typeof i && (n = i.split(/[^a-zA-Z0-9_\/\-]+/)),
                n
              );
            }),
              (n.prototype._get_boolean = function(t, e) {
                var i = this.raw_options[t];
                return void 0 === i ? !!e : !!i;
              }),
              (n.prototype._get_characters = function(t, e) {
                var i = this.raw_options[t],
                  n = e || '';
                return (
                  'string' == typeof i &&
                    (n = i
                      .replace(/\\r/, '\r')
                      .replace(/\\n/, '\n')
                      .replace(/\\t/, '\t')),
                  n
                );
              }),
              (n.prototype._get_number = function(t, e) {
                var i = this.raw_options[t];
                (e = parseInt(e, 10)), isNaN(e) && (e = 0);
                var n = parseInt(i, 10);
                return isNaN(n) && (n = e), n;
              }),
              (n.prototype._get_selection = function(t, e, i) {
                var n = this._get_selection_list(t, e, i);
                if (1 !== n.length)
                  throw new Error(
                    "Invalid Option Value: The option '" +
                      t +
                      "' can only be one of the following values:\n" +
                      e +
                      "\nYou passed in: '" +
                      this.raw_options[t] +
                      "'"
                  );
                return n[0];
              }),
              (n.prototype._get_selection_list = function(t, e, i) {
                if (!e || 0 === e.length) throw new Error('Selection list cannot be empty.');
                if (((i = i || [e[0]]), !this._is_valid_selection(i, e))) throw new Error('Invalid Default Value!');
                var n = this._get_array(t, i);
                if (!this._is_valid_selection(n, e))
                  throw new Error(
                    "Invalid Option Value: The option '" +
                      t +
                      "' can contain only the following values:\n" +
                      e +
                      "\nYou passed in: '" +
                      this.raw_options[t] +
                      "'"
                  );
                return n;
              }),
              (n.prototype._is_valid_selection = function(t, e) {
                return (
                  t.length &&
                  e.length &&
                  !t.some(function(t) {
                    return -1 === e.indexOf(t);
                  })
                );
              }),
              (t.exports.Options = n),
              (t.exports.normalizeOpts = s),
              (t.exports.mergeOpts = _);
          },
          ,
          function(t, e, i) {
            var n = RegExp.prototype.hasOwnProperty('sticky');
            function _(t) {
              (this.__input = t || ''), (this.__input_length = this.__input.length), (this.__position = 0);
            }
            (_.prototype.restart = function() {
              this.__position = 0;
            }),
              (_.prototype.back = function() {
                this.__position > 0 && (this.__position -= 1);
              }),
              (_.prototype.hasNext = function() {
                return this.__position < this.__input_length;
              }),
              (_.prototype.next = function() {
                var t = null;
                return this.hasNext() && ((t = this.__input.charAt(this.__position)), (this.__position += 1)), t;
              }),
              (_.prototype.peek = function(t) {
                var e = null;
                return (t = t || 0), (t += this.__position) >= 0 && t < this.__input_length && (e = this.__input.charAt(t)), e;
              }),
              (_.prototype.__match = function(t, e) {
                t.lastIndex = e;
                var i = t.exec(this.__input);
                return !i || (n && t.sticky) || (i.index !== e && (i = null)), i;
              }),
              (_.prototype.test = function(t, e) {
                return (e = e || 0), (e += this.__position) >= 0 && e < this.__input_length && !!this.__match(t, e);
              }),
              (_.prototype.testChar = function(t, e) {
                var i = this.peek(e);
                return (t.lastIndex = 0), null !== i && t.test(i);
              }),
              (_.prototype.match = function(t) {
                var e = this.__match(t, this.__position);
                return e ? (this.__position += e[0].length) : (e = null), e;
              }),
              (_.prototype.read = function(t, e, i) {
                var n,
                  _ = '';
                return t && (n = this.match(t)) && (_ += n[0]), !e || (!n && t) || (_ += this.readUntil(e, i)), _;
              }),
              (_.prototype.readUntil = function(t, e) {
                var i,
                  n = this.__position;
                t.lastIndex = this.__position;
                var _ = t.exec(this.__input);
                return (
                  _ ? ((n = _.index), e && (n += _[0].length)) : (n = this.__input_length),
                  (i = this.__input.substring(this.__position, n)),
                  (this.__position = n),
                  i
                );
              }),
              (_.prototype.readUntilAfter = function(t) {
                return this.readUntil(t, !0);
              }),
              (_.prototype.get_regexp = function(t, e) {
                var i = null,
                  _ = 'g';
                return e && n && (_ = 'y'), 'string' == typeof t && '' !== t ? (i = new RegExp(t, _)) : t && (i = new RegExp(t.source, _)), i;
              }),
              (_.prototype.get_literal_regexp = function(t) {
                return RegExp(t.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
              }),
              (_.prototype.peekUntilAfter = function(t) {
                var e = this.__position,
                  i = this.readUntilAfter(t);
                return (this.__position = e), i;
              }),
              (_.prototype.lookBack = function(t) {
                var e = this.__position - 1;
                return e >= t.length && this.__input.substring(e - t.length, e).toLowerCase() === t;
              }),
              (t.exports.InputScanner = _);
          },
          ,
          ,
          ,
          ,
          function(t, e, i) {
            function n(t, e) {
              (t = 'string' == typeof t ? t : t.source),
                (e = 'string' == typeof e ? e : e.source),
                (this.__directives_block_pattern = new RegExp(t + / beautify( \w+[:]\w+)+ /.source + e, 'g')),
                (this.__directive_pattern = / (\w+)[:](\w+)/g),
                (this.__directives_end_ignore_pattern = new RegExp(t + /\sbeautify\signore:end\s/.source + e, 'g'));
            }
            (n.prototype.get_directives = function(t) {
              if (!t.match(this.__directives_block_pattern)) return null;
              var e = {};
              this.__directive_pattern.lastIndex = 0;
              for (var i = this.__directive_pattern.exec(t); i; ) (e[i[1]] = i[2]), (i = this.__directive_pattern.exec(t));
              return e;
            }),
              (n.prototype.readIgnored = function(t) {
                return t.readUntilAfter(this.__directives_end_ignore_pattern);
              }),
              (t.exports.Directives = n);
          },
          ,
          function(t, e, i) {
            var n = i(16).Beautifier,
              _ = i(17).Options;
            (t.exports = function(t, e) {
              return new n(t, e).beautify();
            }),
              (t.exports.defaultOptions = function() {
                return new _();
              });
          },
          function(t, e, i) {
            var n = i(17).Options,
              _ = i(2).Output,
              s = i(8).InputScanner,
              r = new (0, i(13).Directives)(/\/\*/, /\*\//),
              h = /\r\n|[\r\n]/,
              o = /\r\n|[\r\n]/g,
              p = /\s/,
              u = /(?:\s|\n)+/g,
              a = /\/\*(?:[\s\S]*?)((?:\*\/)|$)/g,
              c = /\/\/(?:[^\n\r\u2028\u2029]*)/g;
            function l(t, e) {
              (this._source_text = t || ''),
                (this._options = new n(e)),
                (this._ch = null),
                (this._input = null),
                (this.NESTED_AT_RULE = { '@page': !0, '@font-face': !0, '@keyframes': !0, '@media': !0, '@supports': !0, '@document': !0 }),
                (this.CONDITIONAL_GROUP_RULE = { '@media': !0, '@supports': !0, '@document': !0 });
            }
            (l.prototype.eatString = function(t) {
              var e = '';
              for (this._ch = this._input.next(); this._ch; ) {
                if (((e += this._ch), '\\' === this._ch)) e += this._input.next();
                else if (-1 !== t.indexOf(this._ch) || '\n' === this._ch) break;
                this._ch = this._input.next();
              }
              return e;
            }),
              (l.prototype.eatWhitespace = function(t) {
                for (var e = p.test(this._input.peek()), i = !0; p.test(this._input.peek()); )
                  (this._ch = this._input.next()),
                    t && '\n' === this._ch && (this._options.preserve_newlines || i) && ((i = !1), this._output.add_new_line(!0));
                return e;
              }),
              (l.prototype.foundNestedPseudoClass = function() {
                for (var t = 0, e = 1, i = this._input.peek(e); i; ) {
                  if ('{' === i) return !0;
                  if ('(' === i) t += 1;
                  else if (')' === i) {
                    if (0 === t) return !1;
                    t -= 1;
                  } else if (';' === i || '}' === i) return !1;
                  e++, (i = this._input.peek(e));
                }
                return !1;
              }),
              (l.prototype.print_string = function(t) {
                this._output.set_indent(this._indentLevel), (this._output.non_breaking_space = !0), this._output.add_token(t);
              }),
              (l.prototype.preserveSingleSpace = function(t) {
                t && (this._output.space_before_token = !0);
              }),
              (l.prototype.indent = function() {
                this._indentLevel++;
              }),
              (l.prototype.outdent = function() {
                this._indentLevel > 0 && this._indentLevel--;
              }),
              (l.prototype.beautify = function() {
                if (this._options.disabled) return this._source_text;
                var t = this._source_text,
                  e = this._options.eol;
                'auto' === e && ((e = '\n'), t && h.test(t || '') && (e = t.match(h)[0]));
                var i = (t = t.replace(o, '\n')).match(/^[\t ]*/)[0];
                (this._output = new _(this._options, i)),
                  (this._input = new s(t)),
                  (this._indentLevel = 0),
                  (this._nestedLevel = 0),
                  (this._ch = null);
                for (
                  var n, l, d = 0, f = !1, g = !1, w = !1, v = !1, y = !1, m = this._ch;
                  (n = '' !== this._input.read(u)), (l = m), (this._ch = this._input.next()), (m = this._ch), this._ch;

                )
                  if ('/' === this._ch && '*' === this._input.peek()) {
                    this._output.add_new_line(), this._input.back();
                    var b = this._input.read(a),
                      x = r.get_directives(b);
                    x && 'start' === x.ignore && (b += r.readIgnored(this._input)),
                      this.print_string(b),
                      this.eatWhitespace(!0),
                      this._output.add_new_line();
                  } else if ('/' === this._ch && '/' === this._input.peek())
                    (this._output.space_before_token = !0), this._input.back(), this.print_string(this._input.read(c)), this.eatWhitespace(!0);
                  else if ('@' === this._ch)
                    if ((this.preserveSingleSpace(n), '{' === this._input.peek())) this.print_string(this._ch + this.eatString('}'));
                    else {
                      this.print_string(this._ch);
                      var k = this._input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);
                      k.match(/[ :]$/) &&
                        ((k = this.eatString(': ').replace(/\s$/, '')), this.print_string(k), (this._output.space_before_token = !0)),
                        'extend' === (k = k.replace(/\s$/, '')) ? (v = !0) : 'import' === k && (y = !0),
                        k in this.NESTED_AT_RULE
                          ? ((this._nestedLevel += 1), k in this.CONDITIONAL_GROUP_RULE && (w = !0))
                          : f || 0 !== d || -1 === k.indexOf(':') || ((g = !0), this.indent());
                    }
                  else
                    '#' === this._ch && '{' === this._input.peek()
                      ? (this.preserveSingleSpace(n), this.print_string(this._ch + this.eatString('}')))
                      : '{' === this._ch
                      ? (g && ((g = !1), this.outdent()),
                        this.indent(),
                        (this._output.space_before_token = !0),
                        this.print_string(this._ch),
                        w ? ((w = !1), (f = this._indentLevel > this._nestedLevel)) : (f = this._indentLevel >= this._nestedLevel),
                        this._options.newline_between_rules &&
                          f &&
                          this._output.previous_line &&
                          '{' !== this._output.previous_line.item(-1) &&
                          this._output.ensure_empty_line_above('/', ','),
                        this.eatWhitespace(!0),
                        this._output.add_new_line())
                      : '}' === this._ch
                      ? (this.outdent(),
                        this._output.add_new_line(),
                        '{' === l && this._output.trim(!0),
                        (y = !1),
                        (v = !1),
                        g && (this.outdent(), (g = !1)),
                        this.print_string(this._ch),
                        (f = !1),
                        this._nestedLevel && this._nestedLevel--,
                        this.eatWhitespace(!0),
                        this._output.add_new_line(),
                        this._options.newline_between_rules &&
                          !this._output.just_added_blankline() &&
                          '}' !== this._input.peek() &&
                          this._output.add_new_line(!0))
                      : ':' === this._ch
                      ? (!f && !w) || this._input.lookBack('&') || this.foundNestedPseudoClass() || this._input.lookBack('(') || v
                        ? (this._input.lookBack(' ') && (this._output.space_before_token = !0),
                          ':' === this._input.peek() ? ((this._ch = this._input.next()), this.print_string('::')) : this.print_string(':'))
                        : (this.print_string(':'), g || ((g = !0), (this._output.space_before_token = !0), this.eatWhitespace(!0), this.indent()))
                      : '"' === this._ch || "'" === this._ch
                      ? (this.preserveSingleSpace(n), this.print_string(this._ch + this.eatString(this._ch)), this.eatWhitespace(!0))
                      : ';' === this._ch
                      ? (g && (this.outdent(), (g = !1)),
                        (v = !1),
                        (y = !1),
                        this.print_string(this._ch),
                        this.eatWhitespace(!0),
                        '/' !== this._input.peek() && this._output.add_new_line())
                      : '(' === this._ch
                      ? this._input.lookBack('url')
                        ? (this.print_string(this._ch),
                          this.eatWhitespace(),
                          (this._ch = this._input.next()),
                          ')' === this._ch || '"' === this._ch || "'" === this._ch
                            ? (this._input.back(), d++)
                            : this._ch && this.print_string(this._ch + this.eatString(')')))
                        : (d++, this.preserveSingleSpace(n), this.print_string(this._ch), this.eatWhitespace())
                      : ')' === this._ch
                      ? (this.print_string(this._ch), d--)
                      : ',' === this._ch
                      ? (this.print_string(this._ch),
                        this.eatWhitespace(!0),
                        this._options.selector_separator_newline && !g && d < 1 && !y
                          ? this._output.add_new_line()
                          : (this._output.space_before_token = !0))
                      : ('>' === this._ch || '+' === this._ch || '~' === this._ch) && !g && d < 1
                      ? this._options.space_around_combinator
                        ? ((this._output.space_before_token = !0), this.print_string(this._ch), (this._output.space_before_token = !0))
                        : (this.print_string(this._ch), this.eatWhitespace(), this._ch && p.test(this._ch) && (this._ch = ''))
                      : ']' === this._ch
                      ? this.print_string(this._ch)
                      : '[' === this._ch
                      ? (this.preserveSingleSpace(n), this.print_string(this._ch))
                      : '=' === this._ch
                      ? (this.eatWhitespace(), this.print_string('='), p.test(this._ch) && (this._ch = ''))
                      : '!' === this._ch
                      ? (this.print_string(' '), this.print_string(this._ch))
                      : (this.preserveSingleSpace(n), this.print_string(this._ch));
                return this._output.get_code(e);
              }),
              (t.exports.Beautifier = l);
          },
          function(t, e, i) {
            var n = i(6).Options;
            function _(t) {
              n.call(this, t, 'css'),
                (this.selector_separator_newline = this._get_boolean('selector_separator_newline', !0)),
                (this.newline_between_rules = this._get_boolean('newline_between_rules', !0));
              var e = this._get_boolean('space_around_selector_separator');
              this.space_around_combinator = this._get_boolean('space_around_combinator') || e;
            }
            (_.prototype = new n()), (t.exports.Options = _);
          }
        ]);
        const e = t;
        exports.css_beautify = e;
      },
      {}
    ],
    JlSP: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.html_beautify = i);
        var t = require('./beautify.js'),
          e = require('./beautify-css.js'),
          n = (function(t) {
            var e = {};
            function n(i) {
              if (e[i]) return e[i].exports;
              var _ = (e[i] = { i: i, l: !1, exports: {} });
              return t[i].call(_.exports, _, _.exports, n), (_.l = !0), _.exports;
            }
            return (
              (n.m = t),
              (n.c = e),
              (n.d = function(t, e, i) {
                n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: i });
              }),
              (n.r = function(t) {
                'undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
                  Object.defineProperty(t, '__esModule', { value: !0 });
              }),
              (n.t = function(t, e) {
                if ((1 & e && (t = n(t)), 8 & e)) return t;
                if (4 & e && 'object' == typeof t && t && t.__esModule) return t;
                var i = Object.create(null);
                if ((n.r(i), Object.defineProperty(i, 'default', { enumerable: !0, value: t }), 2 & e && 'string' != typeof t))
                  for (var _ in t)
                    n.d(
                      i,
                      _,
                      function(e) {
                        return t[e];
                      }.bind(null, _)
                    );
                return i;
              }),
              (n.n = function(t) {
                var e =
                  t && t.__esModule
                    ? function() {
                        return t.default;
                      }
                    : function() {
                        return t;
                      };
                return n.d(e, 'a', e), e;
              }),
              (n.o = function(t, e) {
                return Object.prototype.hasOwnProperty.call(t, e);
              }),
              (n.p = ''),
              n((n.s = 18))
            );
          })([
            ,
            ,
            function(t, e, n) {
              function i(t) {
                (this.__parent = t),
                  (this.__character_count = 0),
                  (this.__indent_count = -1),
                  (this.__alignment_count = 0),
                  (this.__wrap_point_index = 0),
                  (this.__wrap_point_character_count = 0),
                  (this.__wrap_point_indent_count = -1),
                  (this.__wrap_point_alignment_count = 0),
                  (this.__items = []);
              }
              function _(t, e) {
                (this.__cache = ['']),
                  (this.__indent_size = t.indent_size),
                  (this.__indent_string = t.indent_char),
                  t.indent_with_tabs || (this.__indent_string = new Array(t.indent_size + 1).join(t.indent_char)),
                  (e = e || ''),
                  t.indent_level > 0 && (e = new Array(t.indent_level + 1).join(this.__indent_string)),
                  (this.__base_string = e),
                  (this.__base_string_length = e.length);
              }
              function r(t, e) {
                (this.__indent_cache = new _(t, e)),
                  (this.raw = !1),
                  (this._end_with_newline = t.end_with_newline),
                  (this.indent_size = t.indent_size),
                  (this.wrap_line_length = t.wrap_line_length),
                  (this.__lines = []),
                  (this.previous_line = null),
                  (this.current_line = null),
                  (this.next_line = new i(this)),
                  (this.space_before_token = !1),
                  (this.non_breaking_space = !1),
                  (this.previous_token_wrapped = !1),
                  this.__add_outputline();
              }
              (i.prototype.clone_empty = function() {
                var t = new i(this.__parent);
                return t.set_indent(this.__indent_count, this.__alignment_count), t;
              }),
                (i.prototype.item = function(t) {
                  return t < 0 ? this.__items[this.__items.length + t] : this.__items[t];
                }),
                (i.prototype.has_match = function(t) {
                  for (var e = this.__items.length - 1; e >= 0; e--) if (this.__items[e].match(t)) return !0;
                  return !1;
                }),
                (i.prototype.set_indent = function(t, e) {
                  this.is_empty() &&
                    ((this.__indent_count = t || 0),
                    (this.__alignment_count = e || 0),
                    (this.__character_count = this.__parent.get_indent_size(this.__indent_count, this.__alignment_count)));
                }),
                (i.prototype._set_wrap_point = function() {
                  this.__parent.wrap_line_length &&
                    ((this.__wrap_point_index = this.__items.length),
                    (this.__wrap_point_character_count = this.__character_count),
                    (this.__wrap_point_indent_count = this.__parent.next_line.__indent_count),
                    (this.__wrap_point_alignment_count = this.__parent.next_line.__alignment_count));
                }),
                (i.prototype._should_wrap = function() {
                  return (
                    this.__wrap_point_index &&
                    this.__character_count > this.__parent.wrap_line_length &&
                    this.__wrap_point_character_count > this.__parent.next_line.__character_count
                  );
                }),
                (i.prototype._allow_wrap = function() {
                  if (this._should_wrap()) {
                    this.__parent.add_new_line();
                    var t = this.__parent.current_line;
                    return (
                      t.set_indent(this.__wrap_point_indent_count, this.__wrap_point_alignment_count),
                      (t.__items = this.__items.slice(this.__wrap_point_index)),
                      (this.__items = this.__items.slice(0, this.__wrap_point_index)),
                      (t.__character_count += this.__character_count - this.__wrap_point_character_count),
                      (this.__character_count = this.__wrap_point_character_count),
                      ' ' === t.__items[0] && (t.__items.splice(0, 1), (t.__character_count -= 1)),
                      !0
                    );
                  }
                  return !1;
                }),
                (i.prototype.is_empty = function() {
                  return 0 === this.__items.length;
                }),
                (i.prototype.last = function() {
                  return this.is_empty() ? null : this.__items[this.__items.length - 1];
                }),
                (i.prototype.push = function(t) {
                  this.__items.push(t);
                  var e = t.lastIndexOf('\n');
                  -1 !== e ? (this.__character_count = t.length - e) : (this.__character_count += t.length);
                }),
                (i.prototype.pop = function() {
                  var t = null;
                  return this.is_empty() || ((t = this.__items.pop()), (this.__character_count -= t.length)), t;
                }),
                (i.prototype._remove_indent = function() {
                  this.__indent_count > 0 && ((this.__indent_count -= 1), (this.__character_count -= this.__parent.indent_size));
                }),
                (i.prototype._remove_wrap_indent = function() {
                  this.__wrap_point_indent_count > 0 && (this.__wrap_point_indent_count -= 1);
                }),
                (i.prototype.trim = function() {
                  for (; ' ' === this.last(); ) this.__items.pop(), (this.__character_count -= 1);
                }),
                (i.prototype.toString = function() {
                  var t = '';
                  return (
                    this.is_empty() ||
                      ((t = this.__parent.get_indent_string(this.__indent_count, this.__alignment_count)), (t += this.__items.join(''))),
                    t
                  );
                }),
                (_.prototype.get_indent_size = function(t, e) {
                  var n = this.__base_string_length;
                  return (e = e || 0), t < 0 && (n = 0), (n += t * this.__indent_size), (n += e);
                }),
                (_.prototype.get_indent_string = function(t, e) {
                  var n = this.__base_string;
                  return (e = e || 0), t < 0 && ((t = 0), (n = '')), (e += t * this.__indent_size), this.__ensure_cache(e), (n += this.__cache[e]);
                }),
                (_.prototype.__ensure_cache = function(t) {
                  for (; t >= this.__cache.length; ) this.__add_column();
                }),
                (_.prototype.__add_column = function() {
                  var t = this.__cache.length,
                    e = 0,
                    n = '';
                  this.__indent_size &&
                    t >= this.__indent_size &&
                    ((t -= (e = Math.floor(t / this.__indent_size)) * this.__indent_size), (n = new Array(e + 1).join(this.__indent_string))),
                    t && (n += new Array(t + 1).join(' ')),
                    this.__cache.push(n);
                }),
                (r.prototype.__add_outputline = function() {
                  (this.previous_line = this.current_line), (this.current_line = this.next_line.clone_empty()), this.__lines.push(this.current_line);
                }),
                (r.prototype.get_line_number = function() {
                  return this.__lines.length;
                }),
                (r.prototype.get_indent_string = function(t, e) {
                  return this.__indent_cache.get_indent_string(t, e);
                }),
                (r.prototype.get_indent_size = function(t, e) {
                  return this.__indent_cache.get_indent_size(t, e);
                }),
                (r.prototype.is_empty = function() {
                  return !this.previous_line && this.current_line.is_empty();
                }),
                (r.prototype.add_new_line = function(t) {
                  return !(this.is_empty() || (!t && this.just_added_newline())) && (this.raw || this.__add_outputline(), !0);
                }),
                (r.prototype.get_code = function(t) {
                  this.trim(!0);
                  var e = this.current_line.pop();
                  e && ('\n' === e[e.length - 1] && (e = e.replace(/\n+$/g, '')), this.current_line.push(e)),
                    this._end_with_newline && this.__add_outputline();
                  var n = this.__lines.join('\n');
                  return '\n' !== t && (n = n.replace(/[\n]/g, t)), n;
                }),
                (r.prototype.set_wrap_point = function() {
                  this.current_line._set_wrap_point();
                }),
                (r.prototype.set_indent = function(t, e) {
                  return (
                    (t = t || 0),
                    (e = e || 0),
                    this.next_line.set_indent(t, e),
                    this.__lines.length > 1 ? (this.current_line.set_indent(t, e), !0) : (this.current_line.set_indent(), !1)
                  );
                }),
                (r.prototype.add_raw_token = function(t) {
                  for (var e = 0; e < t.newlines; e++) this.__add_outputline();
                  this.current_line.set_indent(-1),
                    this.current_line.push(t.whitespace_before),
                    this.current_line.push(t.text),
                    (this.space_before_token = !1),
                    (this.non_breaking_space = !1),
                    (this.previous_token_wrapped = !1);
                }),
                (r.prototype.add_token = function(t) {
                  this.__add_space_before_token(),
                    this.current_line.push(t),
                    (this.space_before_token = !1),
                    (this.non_breaking_space = !1),
                    (this.previous_token_wrapped = this.current_line._allow_wrap());
                }),
                (r.prototype.__add_space_before_token = function() {
                  this.space_before_token &&
                    !this.just_added_newline() &&
                    (this.non_breaking_space || this.set_wrap_point(), this.current_line.push(' '));
                }),
                (r.prototype.remove_indent = function(t) {
                  for (var e = this.__lines.length; t < e; ) this.__lines[t]._remove_indent(), t++;
                  this.current_line._remove_wrap_indent();
                }),
                (r.prototype.trim = function(t) {
                  for (t = void 0 !== t && t, this.current_line.trim(); t && this.__lines.length > 1 && this.current_line.is_empty(); )
                    this.__lines.pop(), (this.current_line = this.__lines[this.__lines.length - 1]), this.current_line.trim();
                  this.previous_line = this.__lines.length > 1 ? this.__lines[this.__lines.length - 2] : null;
                }),
                (r.prototype.just_added_newline = function() {
                  return this.current_line.is_empty();
                }),
                (r.prototype.just_added_blankline = function() {
                  return this.is_empty() || (this.current_line.is_empty() && this.previous_line.is_empty());
                }),
                (r.prototype.ensure_empty_line_above = function(t, e) {
                  for (var n = this.__lines.length - 2; n >= 0; ) {
                    var _ = this.__lines[n];
                    if (_.is_empty()) break;
                    if (0 !== _.item(0).indexOf(t) && _.item(-1) !== e) {
                      this.__lines.splice(n + 1, 0, new i(this)), (this.previous_line = this.__lines[this.__lines.length - 2]);
                      break;
                    }
                    n--;
                  }
                }),
                (t.exports.Output = r);
            },
            function(t, e, n) {
              t.exports.Token = function(t, e, n, i) {
                (this.type = t),
                  (this.text = e),
                  (this.comments_before = null),
                  (this.newlines = n || 0),
                  (this.whitespace_before = i || ''),
                  (this.parent = null),
                  (this.next = null),
                  (this.previous = null),
                  (this.opened = null),
                  (this.closed = null),
                  (this.directives = null);
              };
            },
            ,
            ,
            function(t, e, n) {
              function i(t, e) {
                (this.raw_options = _(t, e)),
                  (this.disabled = this._get_boolean('disabled')),
                  (this.eol = this._get_characters('eol', 'auto')),
                  (this.end_with_newline = this._get_boolean('end_with_newline')),
                  (this.indent_size = this._get_number('indent_size', 4)),
                  (this.indent_char = this._get_characters('indent_char', ' ')),
                  (this.indent_level = this._get_number('indent_level')),
                  (this.preserve_newlines = this._get_boolean('preserve_newlines', !0)),
                  (this.max_preserve_newlines = this._get_number('max_preserve_newlines', 32786)),
                  this.preserve_newlines || (this.max_preserve_newlines = 0),
                  (this.indent_with_tabs = this._get_boolean('indent_with_tabs', '\t' === this.indent_char)),
                  this.indent_with_tabs && ((this.indent_char = '\t'), 1 === this.indent_size && (this.indent_size = 4)),
                  (this.wrap_line_length = this._get_number('wrap_line_length', this._get_number('max_char')));
              }
              function _(t, e) {
                var n,
                  i = {};
                for (n in (t = r(t))) n !== e && (i[n] = t[n]);
                if (e && t[e]) for (n in t[e]) i[n] = t[e][n];
                return i;
              }
              function r(t) {
                var e,
                  n = {};
                for (e in t) {
                  n[e.replace(/-/g, '_')] = t[e];
                }
                return n;
              }
              (i.prototype._get_array = function(t, e) {
                var n = this.raw_options[t],
                  i = e || [];
                return (
                  'object' == typeof n
                    ? null !== n && 'function' == typeof n.concat && (i = n.concat())
                    : 'string' == typeof n && (i = n.split(/[^a-zA-Z0-9_\/\-]+/)),
                  i
                );
              }),
                (i.prototype._get_boolean = function(t, e) {
                  var n = this.raw_options[t];
                  return void 0 === n ? !!e : !!n;
                }),
                (i.prototype._get_characters = function(t, e) {
                  var n = this.raw_options[t],
                    i = e || '';
                  return (
                    'string' == typeof n &&
                      (i = n
                        .replace(/\\r/, '\r')
                        .replace(/\\n/, '\n')
                        .replace(/\\t/, '\t')),
                    i
                  );
                }),
                (i.prototype._get_number = function(t, e) {
                  var n = this.raw_options[t];
                  (e = parseInt(e, 10)), isNaN(e) && (e = 0);
                  var i = parseInt(n, 10);
                  return isNaN(i) && (i = e), i;
                }),
                (i.prototype._get_selection = function(t, e, n) {
                  var i = this._get_selection_list(t, e, n);
                  if (1 !== i.length)
                    throw new Error(
                      "Invalid Option Value: The option '" +
                        t +
                        "' can only be one of the following values:\n" +
                        e +
                        "\nYou passed in: '" +
                        this.raw_options[t] +
                        "'"
                    );
                  return i[0];
                }),
                (i.prototype._get_selection_list = function(t, e, n) {
                  if (!e || 0 === e.length) throw new Error('Selection list cannot be empty.');
                  if (((n = n || [e[0]]), !this._is_valid_selection(n, e))) throw new Error('Invalid Default Value!');
                  var i = this._get_array(t, n);
                  if (!this._is_valid_selection(i, e))
                    throw new Error(
                      "Invalid Option Value: The option '" +
                        t +
                        "' can contain only the following values:\n" +
                        e +
                        "\nYou passed in: '" +
                        this.raw_options[t] +
                        "'"
                    );
                  return i;
                }),
                (i.prototype._is_valid_selection = function(t, e) {
                  return (
                    t.length &&
                    e.length &&
                    !t.some(function(t) {
                      return -1 === e.indexOf(t);
                    })
                  );
                }),
                (t.exports.Options = i),
                (t.exports.normalizeOpts = r),
                (t.exports.mergeOpts = _);
            },
            ,
            function(t, e, n) {
              var i = RegExp.prototype.hasOwnProperty('sticky');
              function _(t) {
                (this.__input = t || ''), (this.__input_length = this.__input.length), (this.__position = 0);
              }
              (_.prototype.restart = function() {
                this.__position = 0;
              }),
                (_.prototype.back = function() {
                  this.__position > 0 && (this.__position -= 1);
                }),
                (_.prototype.hasNext = function() {
                  return this.__position < this.__input_length;
                }),
                (_.prototype.next = function() {
                  var t = null;
                  return this.hasNext() && ((t = this.__input.charAt(this.__position)), (this.__position += 1)), t;
                }),
                (_.prototype.peek = function(t) {
                  var e = null;
                  return (t = t || 0), (t += this.__position) >= 0 && t < this.__input_length && (e = this.__input.charAt(t)), e;
                }),
                (_.prototype.__match = function(t, e) {
                  t.lastIndex = e;
                  var n = t.exec(this.__input);
                  return !n || (i && t.sticky) || (n.index !== e && (n = null)), n;
                }),
                (_.prototype.test = function(t, e) {
                  return (e = e || 0), (e += this.__position) >= 0 && e < this.__input_length && !!this.__match(t, e);
                }),
                (_.prototype.testChar = function(t, e) {
                  var n = this.peek(e);
                  return (t.lastIndex = 0), null !== n && t.test(n);
                }),
                (_.prototype.match = function(t) {
                  var e = this.__match(t, this.__position);
                  return e ? (this.__position += e[0].length) : (e = null), e;
                }),
                (_.prototype.read = function(t, e, n) {
                  var i,
                    _ = '';
                  return t && (i = this.match(t)) && (_ += i[0]), !e || (!i && t) || (_ += this.readUntil(e, n)), _;
                }),
                (_.prototype.readUntil = function(t, e) {
                  var n,
                    i = this.__position;
                  t.lastIndex = this.__position;
                  var _ = t.exec(this.__input);
                  return (
                    _ ? ((i = _.index), e && (i += _[0].length)) : (i = this.__input_length),
                    (n = this.__input.substring(this.__position, i)),
                    (this.__position = i),
                    n
                  );
                }),
                (_.prototype.readUntilAfter = function(t) {
                  return this.readUntil(t, !0);
                }),
                (_.prototype.get_regexp = function(t, e) {
                  var n = null,
                    _ = 'g';
                  return e && i && (_ = 'y'), 'string' == typeof t && '' !== t ? (n = new RegExp(t, _)) : t && (n = new RegExp(t.source, _)), n;
                }),
                (_.prototype.get_literal_regexp = function(t) {
                  return RegExp(t.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
                }),
                (_.prototype.peekUntilAfter = function(t) {
                  var e = this.__position,
                    n = this.readUntilAfter(t);
                  return (this.__position = e), n;
                }),
                (_.prototype.lookBack = function(t) {
                  var e = this.__position - 1;
                  return e >= t.length && this.__input.substring(e - t.length, e).toLowerCase() === t;
                }),
                (t.exports.InputScanner = _);
            },
            function(t, e, n) {
              var i = n(8).InputScanner,
                _ = n(3).Token,
                r = n(10).TokenStream,
                s = n(11).WhitespacePattern,
                a = { START: 'TK_START', RAW: 'TK_RAW', EOF: 'TK_EOF' },
                o = function(t, e) {
                  (this._input = new i(t)),
                    (this._options = e || {}),
                    (this.__tokens = null),
                    (this._patterns = {}),
                    (this._patterns.whitespace = new s(this._input));
                };
              (o.prototype.tokenize = function() {
                var t;
                this._input.restart(), (this.__tokens = new r()), this._reset();
                for (var e = new _(a.START, ''), n = null, i = [], s = new r(); e.type !== a.EOF; ) {
                  for (t = this._get_next_token(e, n); this._is_comment(t); ) s.add(t), (t = this._get_next_token(e, n));
                  s.isEmpty() || ((t.comments_before = s), (s = new r())),
                    (t.parent = n),
                    this._is_opening(t)
                      ? (i.push(n), (n = t))
                      : n && this._is_closing(t, n) && ((t.opened = n), (n.closed = t), (n = i.pop()), (t.parent = n)),
                    (t.previous = e),
                    (e.next = t),
                    this.__tokens.add(t),
                    (e = t);
                }
                return this.__tokens;
              }),
                (o.prototype._is_first_token = function() {
                  return this.__tokens.isEmpty();
                }),
                (o.prototype._reset = function() {}),
                (o.prototype._get_next_token = function(t, e) {
                  this._readWhitespace();
                  var n = this._input.read(/.+/g);
                  return n ? this._create_token(a.RAW, n) : this._create_token(a.EOF, '');
                }),
                (o.prototype._is_comment = function(t) {
                  return !1;
                }),
                (o.prototype._is_opening = function(t) {
                  return !1;
                }),
                (o.prototype._is_closing = function(t, e) {
                  return !1;
                }),
                (o.prototype._create_token = function(t, e) {
                  return new _(t, e, this._patterns.whitespace.newline_count, this._patterns.whitespace.whitespace_before_token);
                }),
                (o.prototype._readWhitespace = function() {
                  return this._patterns.whitespace.read();
                }),
                (t.exports.Tokenizer = o),
                (t.exports.TOKEN = a);
            },
            function(t, e, n) {
              function i(t) {
                (this.__tokens = []), (this.__tokens_length = this.__tokens.length), (this.__position = 0), (this.__parent_token = t);
              }
              (i.prototype.restart = function() {
                this.__position = 0;
              }),
                (i.prototype.isEmpty = function() {
                  return 0 === this.__tokens_length;
                }),
                (i.prototype.hasNext = function() {
                  return this.__position < this.__tokens_length;
                }),
                (i.prototype.next = function() {
                  var t = null;
                  return this.hasNext() && ((t = this.__tokens[this.__position]), (this.__position += 1)), t;
                }),
                (i.prototype.peek = function(t) {
                  var e = null;
                  return (t = t || 0), (t += this.__position) >= 0 && t < this.__tokens_length && (e = this.__tokens[t]), e;
                }),
                (i.prototype.add = function(t) {
                  this.__parent_token && (t.parent = this.__parent_token), this.__tokens.push(t), (this.__tokens_length += 1);
                }),
                (t.exports.TokenStream = i);
            },
            function(t, e, n) {
              var i = n(12).Pattern;
              function _(t, e) {
                i.call(this, t, e),
                  e ? (this._line_regexp = this._input.get_regexp(e._line_regexp)) : this.__set_whitespace_patterns('', ''),
                  (this.newline_count = 0),
                  (this.whitespace_before_token = '');
              }
              (_.prototype = new i()),
                (_.prototype.__set_whitespace_patterns = function(t, e) {
                  (t += '\\t '),
                    (e += '\\n\\r'),
                    (this._match_pattern = this._input.get_regexp('[' + t + e + ']+', !0)),
                    (this._newline_regexp = this._input.get_regexp('\\r\\n|[' + e + ']'));
                }),
                (_.prototype.read = function() {
                  (this.newline_count = 0), (this.whitespace_before_token = '');
                  var t = this._input.read(this._match_pattern);
                  if (' ' === t) this.whitespace_before_token = ' ';
                  else if (t) {
                    var e = this.__split(this._newline_regexp, t);
                    (this.newline_count = e.length - 1), (this.whitespace_before_token = e[this.newline_count]);
                  }
                  return t;
                }),
                (_.prototype.matching = function(t, e) {
                  var n = this._create();
                  return n.__set_whitespace_patterns(t, e), n._update(), n;
                }),
                (_.prototype._create = function() {
                  return new _(this._input, this);
                }),
                (_.prototype.__split = function(t, e) {
                  t.lastIndex = 0;
                  for (var n = 0, i = [], _ = t.exec(e); _; ) i.push(e.substring(n, _.index)), (n = _.index + _[0].length), (_ = t.exec(e));
                  return n < e.length ? i.push(e.substring(n, e.length)) : i.push(''), i;
                }),
                (t.exports.WhitespacePattern = _);
            },
            function(t, e, n) {
              function i(t, e) {
                (this._input = t),
                  (this._starting_pattern = null),
                  (this._match_pattern = null),
                  (this._until_pattern = null),
                  (this._until_after = !1),
                  e &&
                    ((this._starting_pattern = this._input.get_regexp(e._starting_pattern, !0)),
                    (this._match_pattern = this._input.get_regexp(e._match_pattern, !0)),
                    (this._until_pattern = this._input.get_regexp(e._until_pattern)),
                    (this._until_after = e._until_after));
              }
              (i.prototype.read = function() {
                var t = this._input.read(this._starting_pattern);
                return (this._starting_pattern && !t) || (t += this._input.read(this._match_pattern, this._until_pattern, this._until_after)), t;
              }),
                (i.prototype.read_match = function() {
                  return this._input.match(this._match_pattern);
                }),
                (i.prototype.until_after = function(t) {
                  var e = this._create();
                  return (e._until_after = !0), (e._until_pattern = this._input.get_regexp(t)), e._update(), e;
                }),
                (i.prototype.until = function(t) {
                  var e = this._create();
                  return (e._until_after = !1), (e._until_pattern = this._input.get_regexp(t)), e._update(), e;
                }),
                (i.prototype.starting_with = function(t) {
                  var e = this._create();
                  return (e._starting_pattern = this._input.get_regexp(t, !0)), e._update(), e;
                }),
                (i.prototype.matching = function(t) {
                  var e = this._create();
                  return (e._match_pattern = this._input.get_regexp(t, !0)), e._update(), e;
                }),
                (i.prototype._create = function() {
                  return new i(this._input, this);
                }),
                (i.prototype._update = function() {}),
                (t.exports.Pattern = i);
            },
            function(t, e, n) {
              function i(t, e) {
                (t = 'string' == typeof t ? t : t.source),
                  (e = 'string' == typeof e ? e : e.source),
                  (this.__directives_block_pattern = new RegExp(t + / beautify( \w+[:]\w+)+ /.source + e, 'g')),
                  (this.__directive_pattern = / (\w+)[:](\w+)/g),
                  (this.__directives_end_ignore_pattern = new RegExp(t + /\sbeautify\signore:end\s/.source + e, 'g'));
              }
              (i.prototype.get_directives = function(t) {
                if (!t.match(this.__directives_block_pattern)) return null;
                var e = {};
                this.__directive_pattern.lastIndex = 0;
                for (var n = this.__directive_pattern.exec(t); n; ) (e[n[1]] = n[2]), (n = this.__directive_pattern.exec(t));
                return e;
              }),
                (i.prototype.readIgnored = function(t) {
                  return t.readUntilAfter(this.__directives_end_ignore_pattern);
                }),
                (t.exports.Directives = i);
            },
            function(t, e, n) {
              var i = n(12).Pattern,
                _ = { django: !1, erb: !1, handlebars: !1, php: !1 };
              function r(t, e) {
                i.call(this, t, e),
                  (this.__template_pattern = null),
                  (this._disabled = Object.assign({}, _)),
                  (this._excluded = Object.assign({}, _)),
                  e &&
                    ((this.__template_pattern = this._input.get_regexp(e.__template_pattern)),
                    (this._excluded = Object.assign(this._excluded, e._excluded)),
                    (this._disabled = Object.assign(this._disabled, e._disabled)));
                var n = new i(t);
                this.__patterns = {
                  handlebars_comment: n.starting_with(/{{!--/).until_after(/--}}/),
                  handlebars: n.starting_with(/{{/).until_after(/}}/),
                  php: n.starting_with(/<\?(?:[=]|php)/).until_after(/\?>/),
                  erb: n.starting_with(/<%[^%]/).until_after(/[^%]%>/),
                  django: n.starting_with(/{%/).until_after(/%}/),
                  django_value: n.starting_with(/{{/).until_after(/}}/),
                  django_comment: n.starting_with(/{#/).until_after(/#}/)
                };
              }
              (r.prototype = new i()),
                (r.prototype._create = function() {
                  return new r(this._input, this);
                }),
                (r.prototype._update = function() {
                  this.__set_templated_pattern();
                }),
                (r.prototype.disable = function(t) {
                  var e = this._create();
                  return (e._disabled[t] = !0), e._update(), e;
                }),
                (r.prototype.exclude = function(t) {
                  var e = this._create();
                  return (e._excluded[t] = !0), e._update(), e;
                }),
                (r.prototype.read = function() {
                  var t = '';
                  t = this._match_pattern
                    ? this._input.read(this._starting_pattern)
                    : this._input.read(this._starting_pattern, this.__template_pattern);
                  for (var e = this._read_template(); e; )
                    this._match_pattern ? (e += this._input.read(this._match_pattern)) : (e += this._input.readUntil(this.__template_pattern)),
                      (t += e),
                      (e = this._read_template());
                  return this._until_after && (t += this._input.readUntilAfter(this._until_pattern)), t;
                }),
                (r.prototype.__set_templated_pattern = function() {
                  var t = [];
                  this._disabled.php || t.push(this.__patterns.php._starting_pattern.source),
                    this._disabled.handlebars || t.push(this.__patterns.handlebars._starting_pattern.source),
                    this._disabled.erb || t.push(this.__patterns.erb._starting_pattern.source),
                    this._disabled.django ||
                      (t.push(this.__patterns.django._starting_pattern.source),
                      t.push(this.__patterns.django_value._starting_pattern.source),
                      t.push(this.__patterns.django_comment._starting_pattern.source)),
                    this._until_pattern && t.push(this._until_pattern.source),
                    (this.__template_pattern = this._input.get_regexp('(?:' + t.join('|') + ')'));
                }),
                (r.prototype._read_template = function() {
                  var t = '',
                    e = this._input.peek();
                  if ('<' === e) {
                    var n = this._input.peek(1);
                    this._disabled.php || this._excluded.php || '?' !== n || (t = t || this.__patterns.php.read()),
                      this._disabled.erb || this._excluded.erb || '%' !== n || (t = t || this.__patterns.erb.read());
                  } else
                    '{' === e &&
                      (this._disabled.handlebars ||
                        this._excluded.handlebars ||
                        (t = (t = t || this.__patterns.handlebars_comment.read()) || this.__patterns.handlebars.read()),
                      this._disabled.django ||
                        (this._excluded.django || this._excluded.handlebars || (t = t || this.__patterns.django_value.read()),
                        this._excluded.django || (t = (t = t || this.__patterns.django_comment.read()) || this.__patterns.django.read())));
                  return t;
                }),
                (t.exports.TemplatablePattern = r);
            },
            ,
            ,
            ,
            function(t, e, n) {
              var i = n(19).Beautifier,
                _ = n(20).Options;
              (t.exports = function(t, e, n, _) {
                return new i(t, e, n, _).beautify();
              }),
                (t.exports.defaultOptions = function() {
                  return new _();
                });
            },
            function(t, e, n) {
              var i = n(20).Options,
                _ = n(2).Output,
                r = n(21).Tokenizer,
                s = n(21).TOKEN,
                a = /\r\n|[\r\n]/,
                o = /\r\n|[\r\n]/g,
                p = function(t, e) {
                  (this.indent_level = 0),
                    (this.alignment_size = 0),
                    (this.max_preserve_newlines = t.max_preserve_newlines),
                    (this.preserve_newlines = t.preserve_newlines),
                    (this._output = new _(t, e));
                };
              (p.prototype.current_line_has_match = function(t) {
                return this._output.current_line.has_match(t);
              }),
                (p.prototype.set_space_before_token = function(t, e) {
                  (this._output.space_before_token = t), (this._output.non_breaking_space = e);
                }),
                (p.prototype.set_wrap_point = function() {
                  this._output.set_indent(this.indent_level, this.alignment_size), this._output.set_wrap_point();
                }),
                (p.prototype.add_raw_token = function(t) {
                  this._output.add_raw_token(t);
                }),
                (p.prototype.print_preserved_newlines = function(t) {
                  var e = 0;
                  t.type !== s.TEXT && t.previous.type !== s.TEXT && (e = t.newlines ? 1 : 0),
                    this.preserve_newlines && (e = t.newlines < this.max_preserve_newlines + 1 ? t.newlines : this.max_preserve_newlines + 1);
                  for (var n = 0; n < e; n++) this.print_newline(n > 0);
                  return 0 !== e;
                }),
                (p.prototype.traverse_whitespace = function(t) {
                  return !(!t.whitespace_before && !t.newlines) && (this.print_preserved_newlines(t) || (this._output.space_before_token = !0), !0);
                }),
                (p.prototype.previous_token_wrapped = function() {
                  return this._output.previous_token_wrapped;
                }),
                (p.prototype.print_newline = function(t) {
                  this._output.add_new_line(t);
                }),
                (p.prototype.print_token = function(t) {
                  t.text && (this._output.set_indent(this.indent_level, this.alignment_size), this._output.add_token(t.text));
                }),
                (p.prototype.indent = function() {
                  this.indent_level++;
                }),
                (p.prototype.get_full_indent = function(t) {
                  return (t = this.indent_level + (t || 0)) < 1 ? '' : this._output.get_indent_string(t);
                });
              var h = function(t, e) {
                var n = null,
                  i = null;
                return e.closed
                  ? ('script' === t ? (n = 'text/javascript') : 'style' === t && (n = 'text/css'),
                    (n =
                      (function(t) {
                        for (var e = null, n = t.next; n.type !== s.EOF && t.closed !== n; ) {
                          if (n.type === s.ATTRIBUTE && 'type' === n.text) {
                            n.next && n.next.type === s.EQUALS && n.next.next && n.next.next.type === s.VALUE && (e = n.next.next.text);
                            break;
                          }
                          n = n.next;
                        }
                        return e;
                      })(e) || n).search('text/css') > -1
                      ? (i = 'css')
                      : n.search(/(text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect)/) > -1
                      ? (i = 'javascript')
                      : n.search(/(text|application|dojo)\/(x-)?(html)/) > -1
                      ? (i = 'html')
                      : n.search(/test\/null/) > -1 && (i = 'null'),
                    i)
                  : null;
              };
              function u(t, e) {
                return -1 !== e.indexOf(t);
              }
              function l(t, e, n) {
                (this.parent = t || null), (this.tag = e ? e.tag_name : ''), (this.indent_level = n || 0), (this.parser_token = e || null);
              }
              function c(t) {
                (this._printer = t), (this._current_frame = null);
              }
              function d(t, e, n, _) {
                (this._source_text = t || ''), (e = e || {}), (this._js_beautify = n), (this._css_beautify = _), (this._tag_stack = null);
                var r = new i(e, 'html');
                (this._options = r),
                  (this._is_wrap_attributes_force = 'force' === this._options.wrap_attributes.substr(0, 'force'.length)),
                  (this._is_wrap_attributes_force_expand_multiline = 'force-expand-multiline' === this._options.wrap_attributes),
                  (this._is_wrap_attributes_force_aligned = 'force-aligned' === this._options.wrap_attributes),
                  (this._is_wrap_attributes_aligned_multiple = 'aligned-multiple' === this._options.wrap_attributes),
                  (this._is_wrap_attributes_preserve = 'preserve' === this._options.wrap_attributes.substr(0, 'preserve'.length)),
                  (this._is_wrap_attributes_preserve_aligned = 'preserve-aligned' === this._options.wrap_attributes);
              }
              (c.prototype.get_parser_token = function() {
                return this._current_frame ? this._current_frame.parser_token : null;
              }),
                (c.prototype.record_tag = function(t) {
                  var e = new l(this._current_frame, t, this._printer.indent_level);
                  this._current_frame = e;
                }),
                (c.prototype._try_pop_frame = function(t) {
                  var e = null;
                  return t && ((e = t.parser_token), (this._printer.indent_level = t.indent_level), (this._current_frame = t.parent)), e;
                }),
                (c.prototype._get_frame = function(t, e) {
                  for (var n = this._current_frame; n && -1 === t.indexOf(n.tag); ) {
                    if (e && -1 !== e.indexOf(n.tag)) {
                      n = null;
                      break;
                    }
                    n = n.parent;
                  }
                  return n;
                }),
                (c.prototype.try_pop = function(t, e) {
                  var n = this._get_frame([t], e);
                  return this._try_pop_frame(n);
                }),
                (c.prototype.indent_to_tag = function(t) {
                  var e = this._get_frame(t);
                  e && (this._printer.indent_level = e.indent_level);
                }),
                (d.prototype.beautify = function() {
                  if (this._options.disabled) return this._source_text;
                  var t = this._source_text,
                    e = this._options.eol;
                  'auto' === this._options.eol && ((e = '\n'), t && a.test(t) && (e = t.match(a)[0]));
                  var n = (t = t.replace(o, '\n')).match(/^[\t ]*/)[0],
                    i = { text: '', type: '' },
                    _ = new f(),
                    h = new p(this._options, n),
                    u = new r(t, this._options).tokenize();
                  this._tag_stack = new c(h);
                  for (var l = null, d = u.next(); d.type !== s.EOF; )
                    d.type === s.TAG_OPEN || d.type === s.COMMENT
                      ? (_ = l = this._handle_tag_open(h, d, _, i))
                      : d.type === s.ATTRIBUTE || d.type === s.EQUALS || d.type === s.VALUE || (d.type === s.TEXT && !_.tag_complete)
                      ? (l = this._handle_inside_tag(h, d, _, u))
                      : d.type === s.TAG_CLOSE
                      ? (l = this._handle_tag_close(h, d, _))
                      : d.type === s.TEXT
                      ? (l = this._handle_text(h, d, _))
                      : h.add_raw_token(d),
                      (i = l),
                      (d = u.next());
                  return h._output.get_code(e);
                }),
                (d.prototype._handle_tag_close = function(t, e, n) {
                  var i = { text: e.text, type: e.type };
                  return (
                    (t.alignment_size = 0),
                    (n.tag_complete = !0),
                    t.set_space_before_token(e.newlines || '' !== e.whitespace_before, !0),
                    n.is_unformatted
                      ? t.add_raw_token(e)
                      : ('<' === n.tag_start_char &&
                          (t.set_space_before_token('/' === e.text[0], !0),
                          this._is_wrap_attributes_force_expand_multiline && n.has_wrapped_attrs && t.print_newline(!1)),
                        t.print_token(e)),
                    !n.indent_content || n.is_unformatted || n.is_content_unformatted || (t.indent(), (n.indent_content = !1)),
                    n.is_inline_element || n.is_unformatted || n.is_content_unformatted || t.set_wrap_point(),
                    i
                  );
                }),
                (d.prototype._handle_inside_tag = function(t, e, n, i) {
                  var _ = n.has_wrapped_attrs,
                    r = { text: e.text, type: e.type };
                  if ((t.set_space_before_token(e.newlines || '' !== e.whitespace_before, !0), n.is_unformatted)) t.add_raw_token(e);
                  else if ('{' === n.tag_start_char && e.type === s.TEXT)
                    t.print_preserved_newlines(e) ? ((e.newlines = 0), t.add_raw_token(e)) : t.print_token(e);
                  else {
                    if (
                      (e.type === s.ATTRIBUTE
                        ? (t.set_space_before_token(!0), (n.attr_count += 1))
                        : e.type === s.EQUALS
                        ? t.set_space_before_token(!1)
                        : e.type === s.VALUE && e.previous.type === s.EQUALS && t.set_space_before_token(!1),
                      e.type === s.ATTRIBUTE &&
                        '<' === n.tag_start_char &&
                        ((this._is_wrap_attributes_preserve || this._is_wrap_attributes_preserve_aligned) &&
                          (t.traverse_whitespace(e), (_ = _ || 0 !== e.newlines)),
                        this._is_wrap_attributes_force))
                    ) {
                      var a = n.attr_count > 1;
                      if (this._is_wrap_attributes_force_expand_multiline && 1 === n.attr_count) {
                        var o,
                          p = !0,
                          h = 0;
                        do {
                          if ((o = i.peek(h)).type === s.ATTRIBUTE) {
                            p = !1;
                            break;
                          }
                          h += 1;
                        } while (h < 4 && o.type !== s.EOF && o.type !== s.TAG_CLOSE);
                        a = !p;
                      }
                      a && (t.print_newline(!1), (_ = !0));
                    }
                    t.print_token(e), (_ = _ || t.previous_token_wrapped()), (n.has_wrapped_attrs = _);
                  }
                  return r;
                }),
                (d.prototype._handle_text = function(t, e, n) {
                  var i = { text: e.text, type: 'TK_CONTENT' };
                  return (
                    n.custom_beautifier_name
                      ? this._print_custom_beatifier_text(t, e, n)
                      : n.is_unformatted || n.is_content_unformatted
                      ? t.add_raw_token(e)
                      : (t.traverse_whitespace(e), t.print_token(e)),
                    i
                  );
                }),
                (d.prototype._print_custom_beatifier_text = function(t, e, n) {
                  var i = this;
                  if ('' !== e.text) {
                    t.print_newline(!1);
                    var _,
                      r = e.text,
                      s = 1;
                    'javascript' === n.custom_beautifier_name && 'function' == typeof this._js_beautify
                      ? (_ = this._js_beautify)
                      : 'css' === n.custom_beautifier_name && 'function' == typeof this._css_beautify
                      ? (_ = this._css_beautify)
                      : 'html' === n.custom_beautifier_name &&
                        (_ = function(t, e) {
                          return new d(t, e, i._js_beautify, i._css_beautify).beautify();
                        }),
                      'keep' === this._options.indent_scripts ? (s = 0) : 'separate' === this._options.indent_scripts && (s = -t.indent_level);
                    var a = t.get_full_indent(s);
                    if (((r = r.replace(/\n[ \t]*$/, '')), _)) {
                      var o = function() {
                        this.eol = '\n';
                      };
                      (o.prototype = this._options.raw_options), (r = _(a + r, new o()));
                    } else {
                      var p = e.whitespace_before;
                      p && (r = r.replace(new RegExp('\n(' + p + ')?', 'g'), '\n')), (r = a + r.replace(/\n/g, '\n' + a));
                    }
                    r && ((e.text = r), (e.whitespace_before = ''), (e.newlines = 0), t.add_raw_token(e), t.print_newline(!0));
                  }
                }),
                (d.prototype._handle_tag_open = function(t, e, n, i) {
                  var _ = this._get_tag_open_token(e);
                  return (
                    (n.is_unformatted || n.is_content_unformatted) && e.type === s.TAG_OPEN && 0 === e.text.indexOf('</')
                      ? t.add_raw_token(e)
                      : (t.traverse_whitespace(e),
                        this._set_tag_position(t, e, _, n, i),
                        _.is_inline_element || t.set_wrap_point(),
                        t.print_token(e)),
                    (this._is_wrap_attributes_force_aligned ||
                      this._is_wrap_attributes_aligned_multiple ||
                      this._is_wrap_attributes_preserve_aligned) &&
                      (_.alignment_size = e.text.length + 1),
                    _.tag_complete || _.is_unformatted || (t.alignment_size = _.alignment_size),
                    _
                  );
                });
              var f = function(t, e) {
                var n;
                ((this.parent = t || null),
                (this.text = ''),
                (this.type = 'TK_TAG_OPEN'),
                (this.tag_name = ''),
                (this.is_inline_element = !1),
                (this.is_unformatted = !1),
                (this.is_content_unformatted = !1),
                (this.is_empty_element = !1),
                (this.is_start_tag = !1),
                (this.is_end_tag = !1),
                (this.indent_content = !1),
                (this.multiline_content = !1),
                (this.custom_beautifier_name = null),
                (this.start_tag_token = null),
                (this.attr_count = 0),
                (this.has_wrapped_attrs = !1),
                (this.alignment_size = 0),
                (this.tag_complete = !1),
                (this.tag_start_char = ''),
                (this.tag_check = ''),
                e)
                  ? ((this.tag_start_char = e.text[0]),
                    (this.text = e.text),
                    '<' === this.tag_start_char
                      ? ((n = e.text.match(/^<([^\s>]*)/)), (this.tag_check = n ? n[1] : ''))
                      : ((n = e.text.match(/^{{[#\^]?([^\s}]+)/)), (this.tag_check = n ? n[1] : '')),
                    (this.tag_check = this.tag_check.toLowerCase()),
                    e.type === s.COMMENT && (this.tag_complete = !0),
                    (this.is_start_tag = '/' !== this.tag_check.charAt(0)),
                    (this.tag_name = this.is_start_tag ? this.tag_check : this.tag_check.substr(1)),
                    (this.is_end_tag = !this.is_start_tag || (e.closed && '/>' === e.closed.text)),
                    (this.is_end_tag =
                      this.is_end_tag || ('{' === this.tag_start_char && (this.text.length < 3 || /[^#\^]/.test(this.text.charAt(2))))))
                  : (this.tag_complete = !0);
              };
              (d.prototype._get_tag_open_token = function(t) {
                var e = new f(this._tag_stack.get_parser_token(), t);
                return (
                  (e.alignment_size = this._options.wrap_attributes_indent_size),
                  (e.is_end_tag = e.is_end_tag || u(e.tag_check, this._options.void_elements)),
                  (e.is_empty_element = e.tag_complete || (e.is_start_tag && e.is_end_tag)),
                  (e.is_unformatted = !e.tag_complete && u(e.tag_check, this._options.unformatted)),
                  (e.is_content_unformatted = !e.is_empty_element && u(e.tag_check, this._options.content_unformatted)),
                  (e.is_inline_element = u(e.tag_name, this._options.inline) || '{' === e.tag_start_char),
                  e
                );
              }),
                (d.prototype._set_tag_position = function(t, e, n, i, _) {
                  if (
                    (n.is_empty_element ||
                      (n.is_end_tag
                        ? (n.start_tag_token = this._tag_stack.try_pop(n.tag_name))
                        : (this._do_optional_end_element(n) &&
                            (n.is_inline_element || (n.parent && (n.parent.multiline_content = !0), t.print_newline(!1))),
                          this._tag_stack.record_tag(n),
                          ('script' !== n.tag_name && 'style' !== n.tag_name) ||
                            n.is_unformatted ||
                            n.is_content_unformatted ||
                            (n.custom_beautifier_name = h(n.tag_check, e)))),
                    u(n.tag_check, this._options.extra_liners) && (t.print_newline(!1), t._output.just_added_blankline() || t.print_newline(!0)),
                    n.is_empty_element)
                  ) {
                    if ('{' === n.tag_start_char && 'else' === n.tag_check)
                      this._tag_stack.indent_to_tag(['if', 'unless', 'each']),
                        (n.indent_content = !0),
                        t.current_line_has_match(/{{#if/) || t.print_newline(!1);
                    ('!--' === n.tag_name && _.type === s.TAG_CLOSE && i.is_end_tag && -1 === n.text.indexOf('\n')) ||
                      n.is_inline_element ||
                      n.is_unformatted ||
                      t.print_newline(!1);
                  } else
                    n.is_unformatted || n.is_content_unformatted
                      ? n.is_inline_element || n.is_unformatted || t.print_newline(!1)
                      : n.is_end_tag
                      ? ((n.start_tag_token && n.start_tag_token.multiline_content) ||
                          !(
                            n.is_inline_element ||
                            i.is_inline_element ||
                            (_.type === s.TAG_CLOSE && n.start_tag_token === i) ||
                            'TK_CONTENT' === _.type
                          )) &&
                        t.print_newline(!1)
                      : ((n.indent_content = !n.custom_beautifier_name),
                        '<' === n.tag_start_char &&
                          ('html' === n.tag_name
                            ? (n.indent_content = this._options.indent_inner_html)
                            : 'head' === n.tag_name
                            ? (n.indent_content = this._options.indent_head_inner_html)
                            : 'body' === n.tag_name && (n.indent_content = this._options.indent_body_inner_html)),
                        n.is_inline_element || 'TK_CONTENT' === _.type || (n.parent && (n.parent.multiline_content = !0), t.print_newline(!1)));
                }),
                (d.prototype._do_optional_end_element = function(t) {
                  var e = null;
                  if (!t.is_empty_element && t.is_start_tag && t.parent)
                    return (
                      'body' === t.tag_name
                        ? (e = e || this._tag_stack.try_pop('head'))
                        : 'li' === t.tag_name
                        ? (e = e || this._tag_stack.try_pop('li', ['ol', 'ul']))
                        : 'dd' === t.tag_name || 'dt' === t.tag_name
                        ? (e = (e = e || this._tag_stack.try_pop('dt', ['dl'])) || this._tag_stack.try_pop('dd', ['dl']))
                        : 'rp' === t.tag_name || 'rt' === t.tag_name
                        ? (e = (e = e || this._tag_stack.try_pop('rt', ['ruby', 'rtc'])) || this._tag_stack.try_pop('rp', ['ruby', 'rtc']))
                        : 'optgroup' === t.tag_name
                        ? (e = e || this._tag_stack.try_pop('optgroup', ['select']))
                        : 'option' === t.tag_name
                        ? (e = e || this._tag_stack.try_pop('option', ['select', 'datalist', 'optgroup']))
                        : 'colgroup' === t.tag_name
                        ? (e = e || this._tag_stack.try_pop('caption', ['table']))
                        : 'thead' === t.tag_name
                        ? (e = (e = e || this._tag_stack.try_pop('caption', ['table'])) || this._tag_stack.try_pop('colgroup', ['table']))
                        : 'tbody' === t.tag_name || 'tfoot' === t.tag_name
                        ? (e =
                            (e =
                              (e = (e = e || this._tag_stack.try_pop('caption', ['table'])) || this._tag_stack.try_pop('colgroup', ['table'])) ||
                              this._tag_stack.try_pop('thead', ['table'])) || this._tag_stack.try_pop('tbody', ['table']))
                        : 'tr' === t.tag_name
                        ? (e =
                            (e = (e = e || this._tag_stack.try_pop('caption', ['table'])) || this._tag_stack.try_pop('colgroup', ['table'])) ||
                            this._tag_stack.try_pop('tr', ['table', 'thead', 'tbody', 'tfoot']))
                        : ('th' !== t.tag_name && 'td' !== t.tag_name) ||
                          (e = (e = e || this._tag_stack.try_pop('td', ['tr'])) || this._tag_stack.try_pop('th', ['tr'])),
                      (t.parent = this._tag_stack.get_parser_token()),
                      e
                    );
                }),
                (t.exports.Beautifier = d);
            },
            function(t, e, n) {
              var i = n(6).Options;
              function _(t) {
                i.call(this, t, 'html'),
                  (this.indent_inner_html = this._get_boolean('indent_inner_html')),
                  (this.indent_body_inner_html = this._get_boolean('indent_body_inner_html', !0)),
                  (this.indent_head_inner_html = this._get_boolean('indent_head_inner_html', !0)),
                  (this.indent_handlebars = this._get_boolean('indent_handlebars', !0)),
                  (this.wrap_attributes = this._get_selection('wrap_attributes', [
                    'auto',
                    'force',
                    'force-aligned',
                    'force-expand-multiline',
                    'aligned-multiple',
                    'preserve',
                    'preserve-aligned'
                  ])),
                  (this.wrap_attributes_indent_size = this._get_number('wrap_attributes_indent_size', this.indent_size)),
                  (this.extra_liners = this._get_array('extra_liners', ['head', 'body', '/html'])),
                  (this.inline = this._get_array('inline', [
                    'a',
                    'abbr',
                    'area',
                    'audio',
                    'b',
                    'bdi',
                    'bdo',
                    'br',
                    'button',
                    'canvas',
                    'cite',
                    'code',
                    'data',
                    'datalist',
                    'del',
                    'dfn',
                    'em',
                    'embed',
                    'i',
                    'iframe',
                    'img',
                    'input',
                    'ins',
                    'kbd',
                    'keygen',
                    'label',
                    'map',
                    'mark',
                    'math',
                    'meter',
                    'noscript',
                    'object',
                    'output',
                    'progress',
                    'q',
                    'ruby',
                    's',
                    'samp',
                    'select',
                    'small',
                    'span',
                    'strong',
                    'sub',
                    'sup',
                    'svg',
                    'template',
                    'textarea',
                    'time',
                    'u',
                    'var',
                    'video',
                    'wbr',
                    'text',
                    'acronym',
                    'big',
                    'strike',
                    'tt'
                  ])),
                  (this.void_elements = this._get_array('void_elements', [
                    'area',
                    'base',
                    'br',
                    'col',
                    'embed',
                    'hr',
                    'img',
                    'input',
                    'keygen',
                    'link',
                    'menuitem',
                    'meta',
                    'param',
                    'source',
                    'track',
                    'wbr',
                    '!doctype',
                    '?xml',
                    'basefont',
                    'isindex'
                  ])),
                  (this.unformatted = this._get_array('unformatted', [])),
                  (this.content_unformatted = this._get_array('content_unformatted', ['pre', 'textarea'])),
                  (this.unformatted_content_delimiter = this._get_characters('unformatted_content_delimiter')),
                  (this.indent_scripts = this._get_selection('indent_scripts', ['normal', 'keep', 'separate']));
              }
              (_.prototype = new i()), (t.exports.Options = _);
            },
            function(t, e, n) {
              var i = n(9).Tokenizer,
                _ = n(9).TOKEN,
                r = n(13).Directives,
                s = n(14).TemplatablePattern,
                a = n(12).Pattern,
                o = {
                  TAG_OPEN: 'TK_TAG_OPEN',
                  TAG_CLOSE: 'TK_TAG_CLOSE',
                  ATTRIBUTE: 'TK_ATTRIBUTE',
                  EQUALS: 'TK_EQUALS',
                  VALUE: 'TK_VALUE',
                  COMMENT: 'TK_COMMENT',
                  TEXT: 'TK_TEXT',
                  UNKNOWN: 'TK_UNKNOWN',
                  START: _.START,
                  RAW: _.RAW,
                  EOF: _.EOF
                },
                p = new r(/<\!--/, /-->/),
                h = function(t, e) {
                  i.call(this, t, e), (this._current_tag_name = '');
                  var n = new s(this._input),
                    _ = new a(this._input);
                  if (
                    ((this.__patterns = {
                      word: n.until(/[\n\r\t <]/),
                      single_quote: n.until_after(/'/),
                      double_quote: n.until_after(/"/),
                      attribute: n.until(/[\n\r\t =\/>]/),
                      element_name: n.until(/[\n\r\t >\/]/),
                      handlebars_comment: _.starting_with(/{{!--/).until_after(/--}}/),
                      handlebars: _.starting_with(/{{/).until_after(/}}/),
                      handlebars_open: _.until(/[\n\r\t }]/),
                      handlebars_raw_close: _.until(/}}/),
                      comment: _.starting_with(/<!--/).until_after(/-->/),
                      cdata: _.starting_with(/<!\[cdata\[/).until_after(/]]>/),
                      conditional_comment: _.starting_with(/<!\[/).until_after(/]>/),
                      processing: _.starting_with(/<\?/).until_after(/\?>/)
                    }),
                    this._options.indent_handlebars && (this.__patterns.word = this.__patterns.word.exclude('handlebars')),
                    (this._unformatted_content_delimiter = null),
                    this._options.unformatted_content_delimiter)
                  ) {
                    var r = this._input.get_literal_regexp(this._options.unformatted_content_delimiter);
                    this.__patterns.unformatted_content_delimiter = _.matching(r).until_after(r);
                  }
                };
              ((h.prototype = new i())._is_comment = function(t) {
                return !1;
              }),
                (h.prototype._is_opening = function(t) {
                  return t.type === o.TAG_OPEN;
                }),
                (h.prototype._is_closing = function(t, e) {
                  return (
                    t.type === o.TAG_CLOSE &&
                    e &&
                    ((('>' === t.text || '/>' === t.text) && '<' === e.text[0]) || ('}}' === t.text && '{' === e.text[0] && '{' === e.text[1]))
                  );
                }),
                (h.prototype._reset = function() {
                  this._current_tag_name = '';
                }),
                (h.prototype._get_next_token = function(t, e) {
                  var n = null;
                  this._readWhitespace();
                  var i = this._input.peek();
                  return null === i
                    ? this._create_token(o.EOF, '')
                    : (n =
                        (n =
                          (n =
                            (n =
                              (n =
                                (n =
                                  (n = (n = n || this._read_open_handlebars(i, e)) || this._read_attribute(i, t, e)) ||
                                  this._read_raw_content(t, e)) || this._read_close(i, e)) || this._read_content_word(i)) || this._read_comment(i)) ||
                          this._read_open(i, e)) || this._create_token(o.UNKNOWN, this._input.next()));
                }),
                (h.prototype._read_comment = function(t) {
                  var e = null,
                    n = null,
                    i = null;
                  if ('<' === t) {
                    var _ = this._input.peek(1);
                    '<' !== t ||
                      ('!' !== _ && '?' !== _) ||
                      ((n = this.__patterns.comment.read())
                        ? (i = p.get_directives(n)) && 'start' === i.ignore && (n += p.readIgnored(this._input))
                        : (n =
                            (n = (n = this.__patterns.cdata.read()) || this.__patterns.conditional_comment.read()) ||
                            this.__patterns.processing.read())),
                      n && ((e = this._create_token(o.COMMENT, n)).directives = i);
                  }
                  return e;
                }),
                (h.prototype._read_open = function(t, e) {
                  var n = null,
                    i = null;
                  return (
                    e ||
                      ('<' === t &&
                        ((n = this._input.next()),
                        '/' === this._input.peek() && (n += this._input.next()),
                        (n += this.__patterns.element_name.read()),
                        (i = this._create_token(o.TAG_OPEN, n)))),
                    i
                  );
                }),
                (h.prototype._read_open_handlebars = function(t, e) {
                  var n = null,
                    i = null;
                  return (
                    e ||
                      (this._options.indent_handlebars &&
                        '{' === t &&
                        '{' === this._input.peek(1) &&
                        ('!' === this._input.peek(2)
                          ? ((n = (n = this.__patterns.handlebars_comment.read()) || this.__patterns.handlebars.read()),
                            (i = this._create_token(o.COMMENT, n)))
                          : ((n = this.__patterns.handlebars_open.read()), (i = this._create_token(o.TAG_OPEN, n))))),
                    i
                  );
                }),
                (h.prototype._read_close = function(t, e) {
                  var n = null,
                    i = null;
                  return (
                    e &&
                      ('<' === e.text[0] && ('>' === t || ('/' === t && '>' === this._input.peek(1)))
                        ? ((n = this._input.next()), '/' === t && (n += this._input.next()), (i = this._create_token(o.TAG_CLOSE, n)))
                        : '{' === e.text[0] &&
                          '}' === t &&
                          '}' === this._input.peek(1) &&
                          (this._input.next(), this._input.next(), (i = this._create_token(o.TAG_CLOSE, '}}')))),
                    i
                  );
                }),
                (h.prototype._read_attribute = function(t, e, n) {
                  var i = null,
                    _ = '';
                  if (n && '<' === n.text[0])
                    if ('=' === t) i = this._create_token(o.EQUALS, this._input.next());
                    else if ('"' === t || "'" === t) {
                      var r = this._input.next();
                      (r += '"' === t ? this.__patterns.double_quote.read() : this.__patterns.single_quote.read()),
                        (i = this._create_token(o.VALUE, r));
                    } else
                      (_ = this.__patterns.attribute.read()) &&
                        (i = e.type === o.EQUALS ? this._create_token(o.VALUE, _) : this._create_token(o.ATTRIBUTE, _));
                  return i;
                }),
                (h.prototype._is_content_unformatted = function(t) {
                  return (
                    -1 === this._options.void_elements.indexOf(t) &&
                    ('script' === t ||
                      'style' === t ||
                      -1 !== this._options.content_unformatted.indexOf(t) ||
                      -1 !== this._options.unformatted.indexOf(t))
                  );
                }),
                (h.prototype._read_raw_content = function(t, e) {
                  var n = '';
                  if (e && '{' === e.text[0]) n = this.__patterns.handlebars_raw_close.read();
                  else if (t.type === o.TAG_CLOSE && '<' === t.opened.text[0]) {
                    var i = t.opened.text.substr(1).toLowerCase();
                    this._is_content_unformatted(i) && (n = this._input.readUntil(new RegExp('</' + i + '[\\n\\r\\t ]*?>', 'ig')));
                  }
                  return n ? this._create_token(o.TEXT, n) : null;
                }),
                (h.prototype._read_content_word = function(t) {
                  var e = '';
                  if (
                    (this._options.unformatted_content_delimiter &&
                      t === this._options.unformatted_content_delimiter[0] &&
                      (e = this.__patterns.unformatted_content_delimiter.read()),
                    e || (e = this.__patterns.word.read()),
                    e)
                  )
                    return this._create_token(o.TEXT, e);
                }),
                (t.exports.Tokenizer = h),
                (t.exports.TOKEN = o);
            }
          ]);
        function i(i, _) {
          return n(i, _, t.js_beautify, e.css_beautify);
        }
      },
      { './beautify.js': 'Gg5L', './beautify-css.js': 'fM5P' }
    ],
    Z1Cv: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.format = r);
        var e = require('../../vscode-languageserver-types/main.js'),
          t = require('../beautify/beautify-html.js'),
          n = require('../utils/strings.js');
        function r(r, u, c) {
          var p = r.getText(),
            d = !0,
            v = 0,
            g = c.tabSize || 4;
          if (u) {
            for (var h = r.offsetAt(u.start), _ = h; _ > 0 && l(p, _ - 1); ) _--;
            0 === _ || f(p, _ - 1) ? (h = _) : _ < h && (h = _ + 1);
            for (var w = r.offsetAt(u.end), b = w; b < p.length && l(p, b); ) b++;
            (b === p.length || f(p, b)) && (w = b), (u = e.Range.create(r.positionAt(h), r.positionAt(w)));
            var m = p.substring(0, h);
            if (new RegExp(/.*[<][^>]*$/).test(m)) return [{ range: u, newText: (p = p.substring(h, w)) }];
            if (((d = w === p.length), (p = p.substring(h, w)), 0 !== h)) {
              var x = r.offsetAt(e.Position.create(u.start.line, 0));
              v = o(r.getText(), x, c);
            }
          } else u = e.Range.create(e.Position.create(0, 0), r.positionAt(p.length));
          var A = {
              indent_size: g,
              indent_char: c.insertSpaces ? ' ' : '\t',
              wrap_line_length: a(c, 'wrapLineLength', 120),
              unformatted: s(c, 'unformatted', void 0),
              content_unformatted: s(c, 'contentUnformatted', void 0),
              indent_inner_html: a(c, 'indentInnerHtml', !1),
              preserve_newlines: a(c, 'preserveNewLines', !0),
              max_preserve_newlines: a(c, 'maxPreserveNewLines', 32786),
              indent_handlebars: a(c, 'indentHandlebars', !1),
              end_with_newline: d && a(c, 'endWithNewline', !1),
              extra_liners: s(c, 'extraLiners', void 0),
              wrap_attributes: a(c, 'wrapAttributes', 'auto'),
              wrap_attributes_indent_size: a(c, 'wrapAttributesIndentSize', void 0),
              eol: '\n'
            },
            y = (0, t.html_beautify)(i(p), A);
          if (v > 0) {
            var L = c.insertSpaces ? (0, n.repeat)(' ', g * v) : (0, n.repeat)('\t', v);
            (y = y.split('\n').join('\n' + L)), 0 === u.start.character && (y = L + y);
          }
          return [{ range: u, newText: y }];
        }
        function i(e) {
          return e.replace(/^\s+/, '');
        }
        function a(e, t, n) {
          if (e && e.hasOwnProperty(t)) {
            var r = e[t];
            if (null !== r) return r;
          }
          return n;
        }
        function s(e, t, n) {
          var r = a(e, t, null);
          return 'string' == typeof r
            ? r.length > 0
              ? r.split(',').map(function(e) {
                  return e.trim().toLowerCase();
                })
              : []
            : n;
        }
        function o(e, t, n) {
          for (var r = t, i = 0, a = n.tabSize || 4; r < e.length; ) {
            var s = e.charAt(r);
            if (' ' === s) i++;
            else {
              if ('\t' !== s) break;
              i += a;
            }
            r++;
          }
          return Math.floor(i / a);
        }
        function u(t) {
          var n = t.getText();
          if (t.lineCount > 1) {
            for (var r = t.offsetAt(e.Position.create(1, 0)), i = r; i > 0 && f(n, i - 1); ) i--;
            return n.substr(i, r - i);
          }
          return '\n';
        }
        function f(e, t) {
          return -1 !== '\r\n'.indexOf(e.charAt(t));
        }
        function l(e, t) {
          return -1 !== ' \t'.indexOf(e.charAt(t));
        }
      },
      { '../../vscode-languageserver-types/main.js': 'vCc8', '../beautify/beautify-html.js': 'JlSP', '../utils/strings.js': 'g97J' }
    ],
    KZoE: [
      function(require, module, exports) {
        var process = require('process');
        var t = require('process');
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.setUriThrowOnMissingScheme = s), (exports.default = void 0);
        var e,
          r = (function() {
            var t =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function(t, e) {
                  t.__proto__ = e;
                }) ||
              function(t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
              };
            return function(e, r) {
              function o() {
                this.constructor = e;
              }
              t(e, r), (e.prototype = null === r ? Object.create(r) : ((o.prototype = r.prototype), new o()));
            };
          })();
        if ('object' == typeof t) e = 'win32' === t.platform;
        else if ('object' == typeof navigator) {
          var o = navigator.userAgent;
          e = o.indexOf('Windows') >= 0;
        }
        var n = /^\w[\w\d+.-]*$/,
          i = /^\//,
          h = /^\/\//,
          a = !0;
        function s(t) {
          var e = a;
          return (a = t), e;
        }
        function u(t, e) {
          if (!t.scheme && (e || a))
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
          if (t.scheme && !n.test(t.scheme)) throw new Error('[UriError]: Scheme contains illegal characters.');
          if (t.path)
            if (t.authority) {
              if (!i.test(t.path))
                throw new Error(
                  '[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character'
                );
            } else if (h.test(t.path))
              throw new Error(
                '[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")'
              );
        }
        function f(t, e) {
          return e || a ? t || p : (t || (t = 'file'), t);
        }
        function c(t, e) {
          switch (t) {
            case 'https':
            case 'http':
            case 'file':
              e ? e[0] !== d && (e = d + e) : (e = d);
          }
          return e;
        }
        var p = '',
          d = '/',
          m = /^(([^:\/?#]+?):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,
          y = (function() {
            function t(t, e, r, o, n, i) {
              void 0 === i && (i = !1),
                'object' == typeof t
                  ? ((this.scheme = t.scheme || p),
                    (this.authority = t.authority || p),
                    (this.path = t.path || p),
                    (this.query = t.query || p),
                    (this.fragment = t.fragment || p))
                  : ((this.scheme = f(t, i)),
                    (this.authority = e || p),
                    (this.path = c(this.scheme, r || p)),
                    (this.query = o || p),
                    (this.fragment = n || p),
                    u(this, i));
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
                  return A(this);
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
                  void 0 === e ? (e = this.scheme) : null === e && (e = p),
                  void 0 === r ? (r = this.authority) : null === r && (r = p),
                  void 0 === o ? (o = this.path) : null === o && (o = p),
                  void 0 === n ? (n = this.query) : null === n && (n = p),
                  void 0 === i ? (i = this.fragment) : null === i && (i = p),
                  e === this.scheme && r === this.authority && o === this.path && n === this.query && i === this.fragment
                    ? this
                    : new b(e, r, o, n, i)
                );
              }),
              (t.parse = function(t, e) {
                void 0 === e && (e = !1);
                var r = m.exec(t);
                return r
                  ? new b(
                      r[2] || p,
                      decodeURIComponent(r[4] || p),
                      decodeURIComponent(r[5] || p),
                      decodeURIComponent(r[7] || p),
                      decodeURIComponent(r[9] || p),
                      e
                    )
                  : new b(p, p, p, p, p);
              }),
              (t.file = function(t) {
                var r = p;
                if ((e && (t = t.replace(/\\/g, d)), t[0] === d && t[1] === d)) {
                  var o = t.indexOf(d, 2);
                  -1 === o ? ((r = t.substring(2)), (t = d)) : ((r = t.substring(2, o)), (t = t.substring(o) || d));
                }
                return new b('file', r, t, p, p);
              }),
              (t.from = function(t) {
                return new b(t.scheme, t.authority, t.path, t.query, t.fragment);
              }),
              (t.prototype.toString = function(t) {
                return void 0 === t && (t = !1), P(this, t);
              }),
              (t.prototype.toJSON = function() {
                return this;
              }),
              (t.revive = function(e) {
                if (e) {
                  if (e instanceof t) return e;
                  var r = new b(e);
                  return (r._formatted = e.external), (r._fsPath = e._sep === g ? e.fsPath : null), r;
                }
                return e;
              }),
              t
            );
          })(),
          l = y;
        exports.default = l;
        var v,
          g = e ? 1 : void 0,
          b = (function(t) {
            function e() {
              var e = (null !== t && t.apply(this, arguments)) || this;
              return (e._formatted = null), (e._fsPath = null), e;
            }
            return (
              r(e, t),
              Object.defineProperty(e.prototype, 'fsPath', {
                get: function() {
                  return this._fsPath || (this._fsPath = A(this)), this._fsPath;
                },
                enumerable: !0,
                configurable: !0
              }),
              (e.prototype.toString = function(t) {
                return void 0 === t && (t = !1), t ? P(this, !0) : (this._formatted || (this._formatted = P(this, !1)), this._formatted);
              }),
              (e.prototype.toJSON = function() {
                var t = { $mid: 1 };
                return (
                  this._fsPath && ((t.fsPath = this._fsPath), (t._sep = g)),
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
          })(y),
          w =
            (((v = {})[58] = '%3A'),
            (v[47] = '%2F'),
            (v[63] = '%3F'),
            (v[35] = '%23'),
            (v[91] = '%5B'),
            (v[93] = '%5D'),
            (v[64] = '%40'),
            (v[33] = '%21'),
            (v[36] = '%24'),
            (v[38] = '%26'),
            (v[39] = '%27'),
            (v[40] = '%28'),
            (v[41] = '%29'),
            (v[42] = '%2A'),
            (v[43] = '%2B'),
            (v[44] = '%2C'),
            (v[59] = '%3B'),
            (v[61] = '%3D'),
            (v[32] = '%20'),
            v);
        function C(t, e) {
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
              var h = w[i];
              void 0 !== h ? (-1 !== o && ((r += encodeURIComponent(t.substring(o, n))), (o = -1)), (r += h)) : -1 === o && (o = n);
            }
          }
          return -1 !== o && (r += encodeURIComponent(t.substring(o))), void 0 !== r ? r : t;
        }
        function _(t) {
          for (var e = void 0, r = 0; r < t.length; r++) {
            var o = t.charCodeAt(r);
            35 === o || 63 === o ? (void 0 === e && (e = t.substr(0, r)), (e += w[o])) : void 0 !== e && (e += t[r]);
          }
          return void 0 !== e ? e : t;
        }
        function A(t) {
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
            e && (r = r.replace(/\//g, '\\')),
            r
          );
        }
        function P(t, e) {
          var r = e ? _ : C,
            o = '',
            n = t.scheme,
            i = t.authority,
            h = t.path,
            a = t.query,
            s = t.fragment;
          if ((n && ((o += n), (o += ':')), (i || 'file' === n) && ((o += d), (o += d)), i)) {
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
              (c = h.charCodeAt(1)) >= 65 && c <= 90 && (h = '/' + String.fromCharCode(c + 32) + ':' + h.substr(3));
            else if (h.length >= 2 && 58 === h.charCodeAt(1)) {
              var c;
              (c = h.charCodeAt(0)) >= 65 && c <= 90 && (h = String.fromCharCode(c + 32) + ':' + h.substr(2));
            }
            o += r(h, !0);
          }
          return a && ((o += '?'), (o += r(a, !1))), s && ((o += '#'), (o += e ? s : C(s, !1))), o;
        }
      },
      { process: 'mXUW' }
    ],
    XW9J: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.findDocumentLinks = g);
        var e = require('../parser/htmlScanner.js'),
          t = require('../../vscode-languageserver-types/main.js'),
          r = i(require('../utils/strings.js')),
          n = s(require('../../vscode-uri/index.js')),
          a = require('../htmlLanguageTypes.js');
        function s(e) {
          return e && e.__esModule ? e : { default: e };
        }
        function u() {
          if ('function' != typeof WeakMap) return null;
          var e = new WeakMap();
          return (
            (u = function() {
              return e;
            }),
            e
          );
        }
        function i(e) {
          if (e && e.__esModule) return e;
          var t = u();
          if (t && t.has(e)) return t.get(e);
          var r = {};
          if (null != e) {
            var n = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var a in e)
              if (Object.prototype.hasOwnProperty.call(e, a)) {
                var s = n ? Object.getOwnPropertyDescriptor(e, a) : null;
                s && (s.get || s.set) ? Object.defineProperty(r, a, s) : (r[a] = e[a]);
              }
          }
          return (r.default = e), t && t.set(e, r), r;
        }
        function o(e, t) {
          var r = e[0];
          return r !== e[e.length - 1] || ("'" !== r && '"' !== r) || (e = e.substr(1, e.length - 2)), e;
        }
        function c(e, t) {
          if (!e.length) return !1;
          if ('handlebars' === t && /{{.*}}/.test(e)) return !1;
          try {
            return !!n.default.parse(e);
          } catch (r) {
            return !1;
          }
        }
        function l(e, t, n, a) {
          return /^\s*javascript\:/i.test(t) || /^\s*\#/i.test(t) || /[\n\r]/.test(t)
            ? null
            : ((t = t.replace(/^\s*/g, '')),
              /^https?:\/\//i.test(t) || /^file:\/\//i.test(t)
                ? t
                : /^\/\//i.test(t)
                ? (r.startsWith(e, 'https://') ? 'https' : 'http') + ':' + t.replace(/^\s*/g, '')
                : n
                ? n.resolveReference(t, a || e)
                : t);
        }
        function f(e, r, n, a, s, u) {
          var i = o(n, e.languageId);
          if (!c(i, e.languageId)) return null;
          i.length < n.length && (a++, s--);
          var f = l(e.uri, i, r, u);
          return f && p(f) ? { range: t.Range.create(e.positionAt(a), e.positionAt(s)), target: f } : null;
        }
        function p(e) {
          try {
            return n.default.parse(e), !0;
          } catch (t) {
            return !1;
          }
        }
        function g(t, r) {
          for (var n = [], s = (0, e.createScanner)(t.getText(), 0), u = s.scan(), i = !1, c = !1, l = void 0; u !== a.TokenType.EOS; ) {
            switch (u) {
              case a.TokenType.StartTag:
                if (!l) c = 'base' === s.getTokenText().toLowerCase();
                break;
              case a.TokenType.AttributeName:
                var p = s.getTokenText().toLowerCase();
                i = 'src' === p || 'href' === p;
                break;
              case a.TokenType.AttributeValue:
                if (i) {
                  var g = s.getTokenText();
                  if (!c) {
                    var v = f(t, r, g, s.getTokenOffset(), s.getTokenEnd(), l);
                    v && n.push(v);
                  }
                  c && void 0 === l && (l = o(g, t.languageId)) && r && (l = r.resolveReference(l, t.uri)), (c = !1), (i = !1);
                }
            }
            u = s.scan();
          }
          return n;
        }
      },
      {
        '../parser/htmlScanner.js': 'WRaN',
        '../../vscode-languageserver-types/main.js': 'vCc8',
        '../utils/strings.js': 'g97J',
        '../../vscode-uri/index.js': 'KZoE',
        '../htmlLanguageTypes.js': 'aQAr'
      }
    ],
    JZGS: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.findDocumentHighlights = r);
        var e = require('../parser/htmlScanner.js'),
          n = require('../../vscode-languageserver-types/main.js'),
          t = require('../htmlLanguageTypes.js');
        function r(e, r, a) {
          var s = e.offsetAt(r),
            u = a.findNodeAt(s);
          if (!u.tag) return [];
          var g = [],
            c = o(t.TokenType.StartTag, e, u.start),
            d = 'number' == typeof u.endTagStart && o(t.TokenType.EndTag, e, u.endTagStart);
          return (
            ((c && i(c, r)) || (d && i(d, r))) &&
              (c && g.push({ kind: n.DocumentHighlightKind.Read, range: c }), d && g.push({ kind: n.DocumentHighlightKind.Read, range: d })),
            g
          );
        }
        function a(e, n) {
          return e.line < n.line || (e.line === n.line && e.character <= n.character);
        }
        function i(e, n) {
          return a(e.start, n) && a(n, e.end);
        }
        function o(n, r, a) {
          for (var i = (0, e.createScanner)(r.getText(), a), o = i.scan(); o !== t.TokenType.EOS && o !== n; ) o = i.scan();
          return o !== t.TokenType.EOS ? { start: r.positionAt(i.getTokenOffset()), end: r.positionAt(i.getTokenEnd()) } : null;
        }
      },
      { '../parser/htmlScanner.js': 'WRaN', '../../vscode-languageserver-types/main.js': 'vCc8', '../htmlLanguageTypes.js': 'aQAr' }
    ],
    uJWe: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.findDocumentSymbols = e);
        var t = require('../../vscode-languageserver-types/main.js');
        function e(t, e) {
          var n = [];
          return (
            e.roots.forEach(function(e) {
              r(t, e, '', n);
            }),
            n
          );
        }
        function r(e, i, a, o) {
          var s = n(i),
            c = t.Location.create(e.uri, t.Range.create(e.positionAt(i.start), e.positionAt(i.end))),
            u = { name: s, location: c, containerName: a, kind: t.SymbolKind.Field };
          o.push(u),
            i.children.forEach(function(t) {
              r(e, t, s, o);
            });
        }
        function n(t) {
          var e = t.tag;
          if (t.attributes) {
            var r = t.attributes.id,
              n = t.attributes.class;
            r && (e += '#' + r.replace(/[\"\']/g, '')),
              n &&
                (e += n
                  .replace(/[\"\']/g, '')
                  .split(/\s+/)
                  .map(function(t) {
                    return '.' + t;
                  })
                  .join(''));
          }
          return e || '?';
        }
      },
      { '../../vscode-languageserver-types/main.js': 'vCc8' }
    ],
    KQdB: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.getFoldingRanges = r);
        var e = require('../../vscode-languageserver-types/main.js'),
          n = require('../htmlLanguageTypes.js'),
          t = require('../parser/htmlScanner.js'),
          a = require('../languageFacts/fact.js');
        function i(e, n) {
          e = e.sort(function(e, n) {
            var t = e.startLine - n.startLine;
            return 0 === t && (t = e.endLine - n.endLine), t;
          });
          for (
            var t = void 0,
              a = [],
              i = [],
              r = [],
              s = function(e, n) {
                (i[e] = n), n < 30 && (r[n] = (r[n] || 0) + 1);
              },
              o = 0;
            o < e.length;
            o++
          ) {
            var g = e[o];
            if (t) {
              if (g.startLine > t.startLine)
                if (g.endLine <= t.endLine) a.push(t), (t = g), s(o, a.length);
                else if (g.startLine > t.endLine) {
                  do {
                    t = a.pop();
                  } while (t && g.startLine > t.endLine);
                  t && a.push(t), (t = g), s(o, a.length);
                }
            } else (t = g), s(o, 0);
          }
          var l = 0,
            f = 0;
          for (o = 0; o < r.length; o++) {
            var T = r[o];
            if (T) {
              if (T + l > n) {
                f = o;
                break;
              }
              l += T;
            }
          }
          var u = [];
          for (o = 0; o < e.length; o++) {
            var L = i[o];
            'number' == typeof L && (L < f || (L === f && l++ < n)) && u.push(e[o]);
          }
          return u;
        }
        function r(r, s) {
          var o = (0, t.createScanner)(r.getText()),
            g = o.scan(),
            l = [],
            f = [],
            T = null,
            u = -1;
          function L(e) {
            l.push(e), (u = e.startLine);
          }
          for (; g !== n.TokenType.EOS; ) {
            switch (g) {
              case n.TokenType.StartTag:
                var p = o.getTokenText(),
                  d = r.positionAt(o.getTokenOffset()).line;
                f.push({ startLine: d, tagName: p }), (T = p);
                break;
              case n.TokenType.EndTag:
                T = o.getTokenText();
                break;
              case n.TokenType.StartTagClose:
                if (!T || !(0, a.isVoidElement)(T)) break;
              case n.TokenType.EndTagClose:
              case n.TokenType.StartTagSelfClose:
                for (var c = f.length - 1; c >= 0 && f[c].tagName !== T; ) c--;
                if (c >= 0) {
                  var h = f[c];
                  (f.length = c), (v = r.positionAt(o.getTokenOffset()).line - 1) > (d = h.startLine) && u !== d && L({ startLine: d, endLine: v });
                }
                break;
              case n.TokenType.Comment:
                d = r.positionAt(o.getTokenOffset()).line;
                var k = o.getTokenText().match(/^\s*#(region\b)|(endregion\b)/);
                if (k)
                  if (k[1]) f.push({ startLine: d, tagName: '' });
                  else {
                    for (c = f.length - 1; c >= 0 && f[c].tagName.length; ) c--;
                    if (c >= 0) {
                      var v;
                      h = f[c];
                      (f.length = c), (v = d) > (d = h.startLine) && u !== d && L({ startLine: d, endLine: v, kind: e.FoldingRangeKind.Region });
                    }
                  }
                else
                  d < (v = r.positionAt(o.getTokenOffset() + o.getTokenLength()).line) &&
                    L({ startLine: d, endLine: v, kind: e.FoldingRangeKind.Comment });
            }
            g = o.scan();
          }
          var m = (s && s.rangeLimit) || Number.MAX_VALUE;
          return l.length > m ? i(l, m) : l;
        }
      },
      {
        '../../vscode-languageserver-types/main.js': 'vCc8',
        '../htmlLanguageTypes.js': 'aQAr',
        '../parser/htmlScanner.js': 'WRaN',
        '../languageFacts/fact.js': 'F0NQ'
      }
    ],
    HziM: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.getSelectionRanges = r);
        var t = require('../../vscode-languageserver-types/main.js'),
          e = require('../parser/htmlScanner.js'),
          n = require('../parser/htmlParser.js'),
          a = require('../htmlLanguageTypes.js');
        function r(e, n) {
          return n.map(function(n) {
            var r = s(e, n);
            return r
              .filter(function(t, e) {
                if (0 === e) return !0;
                var n = r[e - 1];
                return t[0] !== n[0] || t[1] !== n[1];
              })
              .map(function(n) {
                return { range: t.Range.create(e.positionAt(n[0]), e.positionAt(n[1])), kind: a.SelectionRangeKind.Declaration };
              });
          });
        }
        function s(e, a) {
          var r = (0, n.parse)(e.getText()),
            s = e.offsetAt(a),
            i = r.findNodeAt(s),
            T = o(i);
          if (i.startTagEnd && !i.endTagStart) {
            var f = t.Range.create(e.positionAt(i.startTagEnd - 2), e.positionAt(i.startTagEnd));
            return (
              '/>' === e.getText(f) ? T.unshift([i.start + 1, i.startTagEnd - 2]) : T.unshift([i.start + 1, i.startTagEnd - 1]),
              (T = g(e, i, s).concat(T))
            );
          }
          return i.startTagEnd && i.endTagStart
            ? (T.unshift([i.start, i.end]),
              i.start < s && s < i.startTagEnd
                ? (T.unshift([i.start + 1, i.startTagEnd - 1]), (T = g(e, i, s).concat(T)))
                : i.startTagEnd <= s && s <= i.endTagStart
                ? (T.unshift([i.startTagEnd, i.endTagStart]), T)
                : (s >= i.endTagStart + 2 && T.unshift([i.endTagStart + 2, i.end - 1]), T))
            : T;
        }
        function o(t) {
          for (var e, n = t, a = []; n.parent; )
            (n = n.parent),
              ((e = n),
              e.startTagEnd && e.endTagStart && e.startTagEnd < e.endTagStart
                ? [[e.startTagEnd, e.endTagStart], [e.start, e.end]]
                : [[e.start, e.end]]).forEach(function(t) {
                return a.push(t);
              });
          return a;
        }
        function g(n, r, s) {
          for (
            var o = t.Range.create(n.positionAt(r.start), n.positionAt(r.end)),
              g = n.getText(o),
              i = s - r.start,
              T = (0, e.createScanner)(g),
              f = T.scan(),
              u = r.start,
              d = [],
              c = !1,
              k = -1;
            f !== a.TokenType.EOS;

          ) {
            switch (f) {
              case a.TokenType.AttributeName:
                if (i < T.getTokenOffset()) {
                  c = !1;
                  break;
                }
                i <= T.getTokenEnd() && d.unshift([T.getTokenOffset(), T.getTokenEnd()]), (c = !0), (k = T.getTokenOffset());
                break;
              case a.TokenType.AttributeValue:
                if (!c) break;
                var p = T.getTokenText();
                if (i < T.getTokenOffset()) {
                  d.push([k, T.getTokenEnd()]);
                  break;
                }
                i >= T.getTokenOffset() &&
                  i <= T.getTokenEnd() &&
                  (d.unshift([T.getTokenOffset(), T.getTokenEnd()]),
                  (('"' === p[0] && '"' === p[p.length - 1]) || ("'" === p[0] && "'" === p[p.length - 1])) &&
                    i >= T.getTokenOffset() + 1 &&
                    i <= T.getTokenEnd() - 1 &&
                    d.unshift([T.getTokenOffset() + 1, T.getTokenEnd() - 1]),
                  d.push([k, T.getTokenEnd()]));
            }
            f = T.scan();
          }
          return d.map(function(t) {
            return [t[0] + u, t[1] + u];
          });
        }
      },
      {
        '../../vscode-languageserver-types/main.js': 'vCc8',
        '../parser/htmlScanner.js': 'WRaN',
        '../parser/htmlParser.js': 'rehe',
        '../htmlLanguageTypes.js': 'aQAr'
      }
    ],
    fr3X: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 });
        var e = { getLanguageService: !0, newHTMLDataProvider: !0 };
        (exports.getLanguageService = v), (exports.newHTMLDataProvider = f);
        var r = require('./parser/htmlScanner.js'),
          t = require('./parser/htmlParser.js'),
          n = require('./services/htmlCompletion.js'),
          i = require('./services/htmlHover.js'),
          o = require('./services/htmlFormatter.js'),
          s = require('./services/htmlLinks.js'),
          a = require('./services/htmlHighlighting.js'),
          u = require('./services/htmlSymbolsProvider.js'),
          c = require('./services/htmlFolding.js'),
          l = require('./services/htmlSelectionRange.js'),
          d = require('./languageFacts/builtinDataProviders.js'),
          g = require('./languageFacts/dataProvider.js'),
          m = require('./htmlLanguageTypes.js');
        Object.keys(m).forEach(function(r) {
          'default' !== r &&
            '__esModule' !== r &&
            (Object.prototype.hasOwnProperty.call(e, r) ||
              Object.defineProperty(exports, r, {
                enumerable: !0,
                get: function() {
                  return m[r];
                }
              }));
        });
        var p = require('../vscode-languageserver-types/main.js');
        function v(e) {
          var g = new n.HTMLCompletion();
          return (
            e && e.customDataProviders && (0, d.handleCustomDataProviders)(e.customDataProviders),
            {
              createScanner: r.createScanner,
              parseHTMLDocument: function(e) {
                return (0, t.parse)(e.getText());
              },
              doComplete: g.doComplete.bind(g),
              setCompletionParticipants: g.setCompletionParticipants.bind(g),
              doHover: i.doHover,
              format: o.format,
              findDocumentHighlights: a.findDocumentHighlights,
              findDocumentLinks: s.findDocumentLinks,
              findDocumentSymbols: u.findDocumentSymbols,
              getFoldingRanges: c.getFoldingRanges,
              getSelectionRanges: l.getSelectionRanges,
              doTagComplete: g.doTagComplete.bind(g)
            }
          );
        }
        function f(e, r) {
          return new g.HTMLDataProvider(e, r);
        }
        Object.keys(p).forEach(function(r) {
          'default' !== r &&
            '__esModule' !== r &&
            (Object.prototype.hasOwnProperty.call(e, r) ||
              Object.defineProperty(exports, r, {
                enumerable: !0,
                get: function() {
                  return p[r];
                }
              }));
        });
      },
      {
        './parser/htmlScanner.js': 'WRaN',
        './parser/htmlParser.js': 'rehe',
        './services/htmlCompletion.js': 'dq4C',
        './services/htmlHover.js': 'RX4M',
        './services/htmlFormatter.js': 'Z1Cv',
        './services/htmlLinks.js': 'XW9J',
        './services/htmlHighlighting.js': 'JZGS',
        './services/htmlSymbolsProvider.js': 'uJWe',
        './services/htmlFolding.js': 'KQdB',
        './services/htmlSelectionRange.js': 'HziM',
        './languageFacts/builtinDataProviders.js': 'Xsji',
        './languageFacts/dataProvider.js': 'muLC',
        './htmlLanguageTypes.js': 'aQAr',
        '../vscode-languageserver-types/main.js': 'vCc8'
      }
    ],
    r6SZ: [
      function(require, module, exports) {
        'use strict';
        function e() {
          'function' != typeof Object.assign &&
            Object.defineProperty(Object, 'assign', {
              value: function(e, t) {
                if (null !== e)
                  for (var r = 1; r < arguments.length; r++) {
                    var n = arguments[r];
                    if (n) for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
                  }
                return e;
              },
              writable: !0,
              configurable: !0
            });
        }
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.polyfill = e);
      },
      {}
    ],
    VznW: [
      function(require, module, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: !0 }), (exports.create = u), (exports.HTMLWorker = void 0);
        var e = o(require('./_deps/vscode-html-languageservice/htmlLanguageService.js')),
          t = o(require('./_deps/vscode-languageserver-types/main.js')),
          r = o(require('./fillers/polyfills.js'));
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
        function o(e) {
          if (e && e.__esModule) return e;
          var t = n();
          if (t && t.has(e)) return t.get(e);
          var r = {};
          if (null != e) {
            var o = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var i in e)
              if (Object.prototype.hasOwnProperty.call(e, i)) {
                var u = o ? Object.getOwnPropertyDescriptor(e, i) : null;
                u && (u.get || u.set) ? Object.defineProperty(r, i, u) : (r[i] = e[i]);
              }
          }
          return (r.default = e), t && t.set(e, r), r;
        }
        r.polyfill();
        var i = (function() {
          function r(t, r) {
            (this._ctx = t),
              (this._languageSettings = r.languageSettings),
              (this._languageId = r.languageId),
              (this._languageService = e.getLanguageService());
          }
          return (
            (r.prototype.doValidation = function(e) {
              return Promise.resolve([]);
            }),
            (r.prototype.doComplete = function(e, t) {
              var r = this._getTextDocument(e),
                n = this._languageService.parseHTMLDocument(r);
              return Promise.resolve(this._languageService.doComplete(r, t, n, this._languageSettings && this._languageSettings.suggest));
            }),
            (r.prototype.format = function(e, t, r) {
              var n = this._getTextDocument(e),
                o = this._languageService.format(n, t, this._languageSettings && this._languageSettings.format);
              return Promise.resolve(o);
            }),
            (r.prototype.doHover = function(e, t) {
              var r = this._getTextDocument(e),
                n = this._languageService.parseHTMLDocument(r),
                o = this._languageService.doHover(r, t, n);
              return Promise.resolve(o);
            }),
            (r.prototype.findDocumentHighlights = function(e, t) {
              var r = this._getTextDocument(e),
                n = this._languageService.parseHTMLDocument(r),
                o = this._languageService.findDocumentHighlights(r, t, n);
              return Promise.resolve(o);
            }),
            (r.prototype.findDocumentLinks = function(e) {
              var t = this._getTextDocument(e),
                r = this._languageService.findDocumentLinks(t, null);
              return Promise.resolve(r);
            }),
            (r.prototype.findDocumentSymbols = function(e) {
              var t = this._getTextDocument(e),
                r = this._languageService.parseHTMLDocument(t),
                n = this._languageService.findDocumentSymbols(t, r);
              return Promise.resolve(n);
            }),
            (r.prototype.provideFoldingRanges = function(e, t) {
              var r = this._getTextDocument(e),
                n = this._languageService.getFoldingRanges(r, t);
              return Promise.resolve(n);
            }),
            (r.prototype._getTextDocument = function(e) {
              for (var r = 0, n = this._ctx.getMirrorModels(); r < n.length; r++) {
                var o = n[r];
                if (o.uri.toString() === e) return t.TextDocument.create(e, this._languageId, o.version, o.getValue());
              }
              return null;
            }),
            r
          );
        })();
        function u(e, t) {
          return new i(e, t);
        }
        exports.HTMLWorker = i;
      },
      {
        './_deps/vscode-html-languageservice/htmlLanguageService.js': 'fr3X',
        './_deps/vscode-languageserver-types/main.js': 'vCc8',
        './fillers/polyfills.js': 'r6SZ'
      }
    ],
    TRNe: [
      function(require, module, exports) {
        'use strict';
        var e = n(require('../../editor/editor.worker.js')),
          r = require('./htmlWorker.js');
        function t() {
          if ('function' != typeof WeakMap) return null;
          var e = new WeakMap();
          return (
            (t = function() {
              return e;
            }),
            e
          );
        }
        function n(e) {
          if (e && e.__esModule) return e;
          var r = t();
          if (r && r.has(e)) return r.get(e);
          var n = {};
          if (null != e) {
            var i = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var o in e)
              if (Object.prototype.hasOwnProperty.call(e, o)) {
                var u = i ? Object.getOwnPropertyDescriptor(e, o) : null;
                u && (u.get || u.set) ? Object.defineProperty(n, o, u) : (n[o] = e[o]);
              }
          }
          return (n.default = e), r && r.set(e, n), n;
        }
        self.onmessage = function() {
          e.initialize(function(e, t) {
            return new r.HTMLWorker(e, t);
          });
        };
      },
      { '../../editor/editor.worker.js': 'Cd57', './htmlWorker.js': 'VznW' }
    ]
  },
  {},
  ['TRNe'],
  null
);
