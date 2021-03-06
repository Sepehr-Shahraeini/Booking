/*
 AngularJS v1.7.2
 (c) 2010-2018 Google, Inc. http://angularjs.org
 License: MIT
*/
(function (S, m) {
    'use strict'; function Ea(a, b, c) { if (!a) throw Pa("areq", b || "?", c || "required"); return a } function Fa(a, b) { if (!a && !b) return ""; if (!a) return b; if (!b) return a; V(a) && (a = a.join(" ")); V(b) && (b = b.join(" ")); return a + " " + b } function Qa(a) { var b = {}; a && (a.to || a.from) && (b.to = a.to, b.from = a.from); return b } function W(a, b, c) { var d = ""; a = V(a) ? a : a && B(a) && a.length ? a.split(/\s+/) : []; t(a, function (a, e) { a && 0 < a.length && (d += 0 < e ? " " : "", d += c ? b + a : a + b) }); return d } function Ga(a) {
        if (a instanceof z) switch (a.length) {
            case 0: return a;
            case 1: if (1 === a[0].nodeType) return a; break; default: return z(ua(a))
        }if (1 === a.nodeType) return z(a)
    } function ua(a) { if (!a[0]) return a; for (var b = 0; b < a.length; b++) { var c = a[b]; if (1 === c.nodeType) return c } } function Ra(a, b, c) { t(b, function (b) { a.addClass(b, c) }) } function Sa(a, b, c) { t(b, function (b) { a.removeClass(b, c) }) } function X(a) { return function (b, c) { c.addClass && (Ra(a, b, c.addClass), c.addClass = null); c.removeClass && (Sa(a, b, c.removeClass), c.removeClass = null) } } function oa(a) {
        a = a || {}; if (!a.$$prepared) {
            var b = a.domOperation ||
                O; a.domOperation = function () { a.$$domOperationFired = !0; b(); b = O }; a.$$prepared = !0
        } return a
    } function ha(a, b) { Ha(a, b); Ia(a, b) } function Ha(a, b) { b.from && (a.css(b.from), b.from = null) } function Ia(a, b) { b.to && (a.css(b.to), b.to = null) } function T(a, b, c) {
        var d = b.options || {}; c = c.options || {}; var g = (d.addClass || "") + " " + (c.addClass || ""), e = (d.removeClass || "") + " " + (c.removeClass || ""); a = Ta(a.attr("class"), g, e); c.preparationClasses && (d.preparationClasses = ca(c.preparationClasses, d.preparationClasses), delete c.preparationClasses);
        g = d.domOperation !== O ? d.domOperation : null; va(d, c); g && (d.domOperation = g); d.addClass = a.addClass ? a.addClass : null; d.removeClass = a.removeClass ? a.removeClass : null; b.addClass = d.addClass; b.removeClass = d.removeClass; return d
    } function Ta(a, b, c) {
        function d(a) { B(a) && (a = a.split(" ")); var b = {}; t(a, function (a) { a.length && (b[a] = !0) }); return b } var g = {}; a = d(a); b = d(b); t(b, function (a, b) { g[b] = 1 }); c = d(c); t(c, function (a, b) { g[b] = 1 === g[b] ? null : -1 }); var e = { addClass: "", removeClass: "" }; t(g, function (b, c) {
            var d, g; 1 === b ? (d = "addClass",
                g = !a[c] || a[c + "-remove"]) : -1 === b && (d = "removeClass", g = a[c] || a[c + "-add"]); g && (e[d].length && (e[d] += " "), e[d] += c)
        }); return e
    } function I(a) { return a instanceof z ? a[0] : a } function Ua(a, b, c) { var d = ""; b && (d = W(b, "ng-", !0)); c.addClass && (d = ca(d, W(c.addClass, "-add"))); c.removeClass && (d = ca(d, W(c.removeClass, "-remove"))); d.length && (c.preparationClasses = d, a.addClass(d)) } function pa(a, b) { var c = b ? "-" + b + "s" : ""; ka(a, [la, c]); return [la, c] } function wa(a, b) { var c = b ? "paused" : "", d = Y + "PlayState"; ka(a, [d, c]); return [d, c] } function ka(a,
        b) { a.style[b[0]] = b[1] } function ca(a, b) { return a ? b ? a + " " + b : a : b } function Ja(a, b, c) { var d = Object.create(null), g = a.getComputedStyle(b) || {}; t(c, function (a, b) { var c = g[a]; if (c) { var N = c.charAt(0); if ("-" === N || "+" === N || 0 <= N) c = Va(c); 0 === c && (c = null); d[b] = c } }); return d } function Va(a) { var b = 0; a = a.split(/\s*,\s*/); t(a, function (a) { "s" === a.charAt(a.length - 1) && (a = a.substring(0, a.length - 1)); a = parseFloat(a) || 0; b = b ? Math.max(a, b) : a }); return b } function xa(a) { return 0 === a || null != a } function Ka(a, b) {
            var c = Q, d = a + "s"; b ? c += "Duration" :
                d += " linear all"; return [c, d]
        } function La() { var a = Object.create(null); return { flush: function () { a = Object.create(null) }, count: function (b) { return (b = a[b]) ? b.total : 0 }, get: function (b) { return (b = a[b]) && b.value }, put: function (b, c) { a[b] ? a[b].total++ : a[b] = { total: 1, value: c } } } } function Ma(a, b, c) { t(c, function (c) { a[c] = ya(a[c]) ? a[c] : b.style.getPropertyValue(c) }) } var Q, za, Y, Aa; void 0 === S.ontransitionend && void 0 !== S.onwebkittransitionend ? (Q = "WebkitTransition", za = "webkitTransitionEnd transitionend") : (Q = "transition", za =
            "transitionend"); void 0 === S.onanimationend && void 0 !== S.onwebkitanimationend ? (Y = "WebkitAnimation", Aa = "webkitAnimationEnd animationend") : (Y = "animation", Aa = "animationend"); var qa = Y + "Delay", Ba = Y + "Duration", la = Q + "Delay", Na = Q + "Duration", Pa = m.$$minErr("ng"), Wa = { transitionDuration: Na, transitionDelay: la, transitionProperty: Q + "Property", animationDuration: Ba, animationDelay: qa, animationIterationCount: Y + "IterationCount" }, Xa = { transitionDuration: Na, transitionDelay: la, animationDuration: Ba, animationDelay: qa }, Ca, va,
                t, V, ya, Z, Da, ra, B, P, z, O; m.module("ngAnimate", [], function () { O = m.noop; Ca = m.copy; va = m.extend; z = m.element; t = m.forEach; V = m.isArray; B = m.isString; ra = m.isObject; P = m.isUndefined; ya = m.isDefined; Da = m.isFunction; Z = m.isElement }).info({ angularVersion: "1.7.2" }).directive("ngAnimateSwap", ["$animate", function (a) {
                    return {
                        restrict: "A", transclude: "element", terminal: !0, priority: 600, link: function (b, c, d, g, e) {
                            var r, G; b.$watchCollection(d.ngAnimateSwap || d["for"], function (b) {
                                r && a.leave(r); G && (G.$destroy(), G = null); (b || 0 === b) &&
                                    e(function (b, d) { r = b; G = d; a.enter(b, null, c) })
                            })
                        }
                    }
                }]).directive("ngAnimateChildren", ["$interpolate", function (a) { return { link: function (b, c, d) { function g(a) { c.data("$$ngAnimateChildren", "on" === a || "true" === a) } var e = d.ngAnimateChildren; B(e) && 0 === e.length ? c.data("$$ngAnimateChildren", !0) : (g(a(e)(b)), d.$observe("ngAnimateChildren", g)) } } }]).factory("$$rAFScheduler", ["$$rAF", function (a) {
                    function b(a) { d = d.concat(a); c() } function c() {
                        if (d.length) {
                            for (var b = d.shift(), r = 0; r < b.length; r++)b[r](); g || a(function () {
                                g ||
                                c()
                            })
                        }
                    } var d, g; d = b.queue = []; b.waitUntilQuiet = function (b) { g && g(); g = a(function () { g = null; b(); c() }) }; return b
                }]).provider("$$animateQueue", ["$animateProvider", function (a) {
                    function b(a) { if (!a) return null; a = a.split(" "); var b = Object.create(null); t(a, function (a) { b[a] = !0 }); return b } function c(a, c) { if (a && c) { var d = b(c); return a.split(" ").some(function (a) { return d[a] }) } } function d(a, b, c) { return e[a].some(function (a) { return a(b, c) }) } function g(a, b) {
                        var c = 0 < (a.addClass || "").length, d = 0 < (a.removeClass || "").length;
                        return b ? c && d : c || d
                    } var e = this.rules = { skip: [], cancel: [], join: [] }; e.join.push(function (a, b) { return !a.structural && g(a) }); e.skip.push(function (a, b) { return !a.structural && !g(a) }); e.skip.push(function (a, b) { return "leave" === b.event && a.structural }); e.skip.push(function (a, b) { return b.structural && 2 === b.state && !a.structural }); e.cancel.push(function (a, b) { return b.structural && a.structural }); e.cancel.push(function (a, b) { return 2 === b.state && a.structural }); e.cancel.push(function (a, b) {
                        if (b.structural) return !1; var d =
                            a.addClass, g = a.removeClass, e = b.addClass, sa = b.removeClass; return P(d) && P(g) || P(e) && P(sa) ? !1 : c(d, sa) || c(g, e)
                    }); this.$get = ["$$rAF", "$rootScope", "$rootElement", "$document", "$$Map", "$$animation", "$$AnimateRunner", "$templateRequest", "$$jqLite", "$$forceReflow", "$$isDocumentHidden", function (b, c, e, l, J, sa, da, v, E, h, L) {
                        function x() { var a = !1; return function (b) { a ? b() : c.$$postDigest(function () { a = !0; b() }) } } function C(a, b, c) {
                            var f = [], d = k[c]; d && t(d, function (d) {
                                u.call(d.node, b) ? f.push(d.callback) : "leave" === c && u.call(d.node,
                                    a) && f.push(d.callback)
                            }); return f
                        } function H(a, b, c) { var f = ua(b); return a.filter(function (a) { return !(a.node === f && (!c || a.callback === c)) }) } function p(a, k, w) {
                            function p(a, c, f, d) { N(function () { var a = C(na, q, c); a.length ? b(function () { t(a, function (a) { a(e, f, d) }); "close" !== f || q.parentNode || ba.off(q) }) : "close" !== f || q.parentNode || ba.off(q) }); a.progress(c, f, d) } function H(a) {
                                var b = e, c = h; c.preparationClasses && (b.removeClass(c.preparationClasses), c.preparationClasses = null); c.activeClasses && (b.removeClass(c.activeClasses),
                                    c.activeClasses = null); Oa(e, h); ha(e, h); h.domOperation(); l.complete(!a)
                            } var h = Ca(w), e = Ga(a), q = I(e), na = q && q.parentNode, h = oa(h), l = new da, N = x(); V(h.addClass) && (h.addClass = h.addClass.join(" ")); h.addClass && !B(h.addClass) && (h.addClass = null); V(h.removeClass) && (h.removeClass = h.removeClass.join(" ")); h.removeClass && !B(h.removeClass) && (h.removeClass = null); h.from && !ra(h.from) && (h.from = null); h.to && !ra(h.to) && (h.to = null); if (!(f && q && Ya(q, k, w) && D(q, h))) return H(), l; var v = 0 <= ["enter", "move", "leave"].indexOf(k), u =
                                L(), J = u || ga.get(q); w = !J && y.get(q) || {}; var E = !!w.state; J || E && 1 === w.state || (J = !K(q, na, k)); if (J) return u && p(l, k, "start"), H(), u && p(l, k, "close"), l; v && ta(q); u = { structural: v, element: e, event: k, addClass: h.addClass, removeClass: h.removeClass, close: H, options: h, runner: l }; if (E) {
                                    if (d("skip", u, w)) { if (2 === w.state) return H(), l; T(e, w, u); return w.runner } if (d("cancel", u, w)) if (2 === w.state) w.runner.end(); else if (w.structural) w.close(); else return T(e, w, u), w.runner; else if (d("join", u, w)) if (2 === w.state) T(e, u, {}); else return Ua(e,
                                        v ? k : null, h), k = u.event = w.event, h = T(e, w, u), w.runner
                                } else T(e, u, {}); (E = u.structural) || (E = "animate" === u.event && 0 < Object.keys(u.options.to || {}).length || g(u)); if (!E) return H(), n(q), l; var m = (w.counter || 0) + 1; u.counter = m; F(q, 1, u); c.$$postDigest(function () {
                                    e = Ga(a); var b = y.get(q), c = !b, b = b || {}, f = 0 < (e.parent() || []).length && ("animate" === b.event || b.structural || g(b)); if (c || b.counter !== m || !f) { c && (Oa(e, h), ha(e, h)); if (c || v && b.event !== k) h.domOperation(), l.end(); f || n(q) } else k = !b.structural && g(b, !0) ? "setClass" : b.event,
                                        F(q, 2), b = sa(e, k, b.options), l.setHost(b), p(l, k, "start", {}), b.done(function (a) { H(!a); (a = y.get(q)) && a.counter === m && n(q); p(l, k, "close", {}) })
                                }); return l
                        } function ta(a) { a = a.querySelectorAll("[data-ng-animate]"); t(a, function (a) { var b = parseInt(a.getAttribute("data-ng-animate"), 10), c = y.get(a); if (c) switch (b) { case 2: c.runner.end(); case 1: y.delete(a) } }) } function n(a) { a.removeAttribute("data-ng-animate"); y.delete(a) } function K(a, b, c) {
                            c = l[0].body; var f = I(e), d = a === c || "HTML" === a.nodeName, k = a === f, h = !1, q = ga.get(a),
                                C; for ((a = z.data(a, "$ngAnimatePin")) && (b = I(a)); b;) { k || (k = b === f); if (1 !== b.nodeType) break; a = y.get(b) || {}; if (!h) { var p = ga.get(b); if (!0 === p && !1 !== q) { q = !0; break } else !1 === p && (q = !1); h = a.structural } if (P(C) || !0 === C) a = z.data(b, "$$ngAnimateChildren"), ya(a) && (C = a); if (h && !1 === C) break; d || (d = b === c); if (d && k) break; if (!k && (a = z.data(b, "$ngAnimatePin"))) { b = I(a); continue } b = b.parentNode } return (!h || C) && !0 !== q && k && d
                        } function F(a, b, c) { c = c || {}; c.state = b; a.setAttribute("data-ng-animate", b); c = (b = y.get(a)) ? va(b, c) : c; y.set(a, c) }
                        var y = new J, ga = new J, f = null, q = c.$watch(function () { return 0 === v.totalPendingRequests }, function (a) { a && (q(), c.$$postDigest(function () { c.$$postDigest(function () { null === f && (f = !0) }) })) }), k = Object.create(null); J = a.customFilter(); var na = a.classNameFilter(); h = function () { return !0 }; var Ya = J || h, D = na ? function (a, b) { var c = [a.getAttribute("class"), b.addClass, b.removeClass].join(" "); return na.test(c) } : h, Oa = X(E), u = S.Node.prototype.contains || function (a) { return this === a || !!(this.compareDocumentPosition(a) & 16) }, ba = {
                            on: function (a,
                                b, c) { var f = ua(b); k[a] = k[a] || []; k[a].push({ node: f, callback: c }); z(b).on("$destroy", function () { y.get(f) || ba.off(a, b, c) }) }, off: function (a, b, c) { if (1 !== arguments.length || B(arguments[0])) { var f = k[a]; f && (k[a] = 1 === arguments.length ? null : H(f, b, c)) } else for (f in b = arguments[0], k) k[f] = H(k[f], b) }, pin: function (a, b) { Ea(Z(a), "element", "not an element"); Ea(Z(b), "parentElement", "not an element"); a.data("$ngAnimatePin", b) }, push: function (a, b, c, f) { c = c || {}; c.domOperation = f; return p(a, b, c) }, enabled: function (a, b) {
                                    var c = arguments.length;
                                    if (0 === c) b = !!f; else if (Z(a)) { var d = I(a); 1 === c ? b = !ga.get(d) : ga.set(d, !b) } else b = f = !!a; return b
                                }
                        }; return ba
                    }]
                }]).provider("$$animation", ["$animateProvider", function (a) {
                    var b = this.drivers = []; this.$get = ["$$jqLite", "$rootScope", "$injector", "$$AnimateRunner", "$$Map", "$$rAFScheduler", function (a, d, g, e, r, G) {
                        function N(a) {
                            function b(a) {
                                if (a.processed) return a; a.processed = !0; var d = a.domNode, e = d.parentNode; h.set(d, a); for (var p; e;) { if (p = h.get(e)) { p.processed || (p = b(p)); break } e = e.parentNode } (p || c).children.push(a);
                                return a
                            } var c = { children: [] }, d, h = new r; for (d = 0; d < a.length; d++) { var e = a[d]; h.set(e.domNode, a[d] = { domNode: e.domNode, fn: e.fn, children: [] }) } for (d = 0; d < a.length; d++)b(a[d]); return function (a) { var b = [], c = [], d; for (d = 0; d < a.children.length; d++)c.push(a.children[d]); a = c.length; var h = 0, e = []; for (d = 0; d < c.length; d++) { var g = c[d]; 0 >= a && (a = h, h = 0, b.push(e), e = []); e.push(g.fn); g.children.forEach(function (a) { h++; c.push(a) }); a-- } e.length && b.push(e); return b }(c)
                        } var l = [], J = X(a); return function (r, m, v) {
                            function E(a) {
                                a = a.hasAttribute("ng-animate-ref") ?
                                    [a] : a.querySelectorAll("[ng-animate-ref]"); var b = []; t(a, function (a) { var c = a.getAttribute("ng-animate-ref"); c && c.length && b.push(a) }); return b
                            } function h(a) {
                                var b = [], c = {}; t(a, function (a, d) { var k = I(a.element), h = 0 <= ["enter", "move"].indexOf(a.event), k = a.structural ? E(k) : []; if (k.length) { var e = h ? "to" : "from"; t(k, function (a) { var b = a.getAttribute("ng-animate-ref"); c[b] = c[b] || {}; c[b][e] = { animationID: d, element: z(a) } }) } else b.push(a) }); var d = {}, h = {}; t(c, function (c, e) {
                                    var g = c.from, q = c.to; if (g && q) {
                                        var C = a[g.animationID],
                                        p = a[q.animationID], y = g.animationID.toString(); if (!h[y]) { var n = h[y] = { structural: !0, beforeStart: function () { C.beforeStart(); p.beforeStart() }, close: function () { C.close(); p.close() }, classes: L(C.classes, p.classes), from: C, to: p, anchors: [] }; n.classes.length ? b.push(n) : (b.push(C), b.push(p)) } h[y].anchors.push({ out: g.element, "in": q.element })
                                    } else g = g ? g.animationID : q.animationID, q = g.toString(), d[q] || (d[q] = !0, b.push(a[g]))
                                }); return b
                            } function L(a, b) {
                                a = a.split(" "); b = b.split(" "); for (var c = [], d = 0; d < a.length; d++) {
                                    var h =
                                        a[d]; if ("ng-" !== h.substring(0, 3)) for (var e = 0; e < b.length; e++)if (h === b[e]) { c.push(h); break }
                                } return c.join(" ")
                            } function x(a) { for (var c = b.length - 1; 0 <= c; c--) { var d = g.get(b[c])(a); if (d) return d } } function C(a, b) { function c(a) { (a = a.data("$$animationRunner")) && a.setHost(b) } a.from && a.to ? (c(a.from.element), c(a.to.element)) : c(a.element) } function H() { var a = r.data("$$animationRunner"); !a || "leave" === m && v.$$domOperationFired || a.end() } function p(b) {
                                r.off("$destroy", H); r.removeData("$$animationRunner"); J(r, v); ha(r,
                                    v); v.domOperation(); F && a.removeClass(r, F); r.removeClass("ng-animate"); n.complete(!b)
                            } v = oa(v); var ta = 0 <= ["enter", "move", "leave"].indexOf(m), n = new e({ end: function () { p() }, cancel: function () { p(!0) } }); if (!b.length) return p(), n; r.data("$$animationRunner", n); var K = Fa(r.attr("class"), Fa(v.addClass, v.removeClass)), F = v.tempClasses; F && (K += " " + F, v.tempClasses = null); var y; ta && (y = "ng-" + m + "-prepare", a.addClass(r, y)); l.push({
                                element: r, classes: K, event: m, structural: ta, options: v, beforeStart: function () {
                                    r.addClass("ng-animate");
                                    F && a.addClass(r, F); y && (a.removeClass(r, y), y = null)
                                }, close: p
                            }); r.on("$destroy", H); if (1 < l.length) return n; d.$$postDigest(function () {
                                var a = []; t(l, function (b) { b.element.data("$$animationRunner") ? a.push(b) : b.close() }); l.length = 0; var b = h(a), c = []; t(b, function (a) {
                                    c.push({
                                        domNode: I(a.from ? a.from.element : a.element), fn: function () {
                                            a.beforeStart(); var b, c = a.close; if ((a.anchors ? a.from.element || a.to.element : a.element).data("$$animationRunner")) { var d = x(a); d && (b = d.start) } b ? (b = b(), b.done(function (a) { c(!a) }), C(a, b)) :
                                                c()
                                        }
                                    })
                                }); G(N(c))
                            }); return n
                        }
                    }]
                }]).provider("$animateCss", ["$animateProvider", function (a) {
                    var b = La(), c = La(); this.$get = ["$window", "$$jqLite", "$$AnimateRunner", "$timeout", "$$forceReflow", "$sniffer", "$$rAFScheduler", "$$animateQueue", function (a, g, e, r, G, N, l, J) {
                        function m(a, b) { var c = a.parentNode; return (c.$$ngAnimateParentKey || (c.$$ngAnimateParentKey = ++L)) + "-" + a.getAttribute("class") + "-" + b } function da(h, e, p, r) {
                            var n; 0 < b.count(p) && (n = c.get(p), n || (e = W(e, "-stagger"), g.addClass(h, e), n = Ja(a, h, r), n.animationDuration =
                                Math.max(n.animationDuration, 0), n.transitionDuration = Math.max(n.transitionDuration, 0), g.removeClass(h, e), c.put(p, n))); return n || {}
                        } function v(a) { x.push(a); l.waitUntilQuiet(function () { b.flush(); c.flush(); for (var a = G(), d = 0; d < x.length; d++)x[d](a); x.length = 0 }) } function E(c, h, e) {
                            h = b.get(e); h || (h = Ja(a, c, Wa), "infinite" === h.animationIterationCount && (h.animationIterationCount = 1)); b.put(e, h); c = h; e = c.animationDelay; h = c.transitionDelay; c.maxDelay = e && h ? Math.max(e, h) : e || h; c.maxDuration = Math.max(c.animationDuration *
                                c.animationIterationCount, c.transitionDuration); return c
                        } var h = X(g), L = 0, x = []; return function (a, c) {
                            function d() { n() } function l() { n(!0) } function n(b) {
                                if (!(L || ba && u)) {
                                    L = !0; u = !1; f.$$skipPreparationClasses || g.removeClass(a, fa); g.removeClass(a, ca); wa(k, !1); pa(k, !1); t(x, function (a) { k.style[a[0]] = "" }); h(a, f); ha(a, f); Object.keys(q).length && t(q, function (a, b) { a ? k.style.setProperty(b, a) : k.style.removeProperty(b) }); if (f.onDone) f.onDone(); ea && ea.length && a.off(ea.join(" "), y); var c = a.data("$$animateCss"); c && (r.cancel(c[0].timer),
                                        a.removeData("$$animateCss")); z && z.complete(!b)
                                }
                            } function K(a) { s.blockTransition && pa(k, a); s.blockKeyframeAnimation && wa(k, !!a) } function F() { z = new e({ end: d, cancel: l }); v(O); n(); return { $$willAnimate: !1, start: function () { return z }, end: d } } function y(a) { a.stopPropagation(); var b = a.originalEvent || a; b.target === k && (a = b.$manualTimeStamp || Date.now(), b = parseFloat(b.elapsedTime.toFixed(3)), Math.max(a - T, 0) >= P && b >= M && (ba = !0, n())) } function ga() {
                                function b() {
                                    if (!L) {
                                        K(!1); t(x, function (a) { k.style[a[0]] = a[1] }); h(a, f);
                                        g.addClass(a, ca); if (s.recalculateTimingStyles) { ma = k.getAttribute("class") + " " + fa; ja = m(k, ma); A = E(k, ma, ja); $ = A.maxDelay; w = Math.max($, 0); M = A.maxDuration; if (0 === M) { n(); return } s.hasTransitions = 0 < A.transitionDuration; s.hasAnimations = 0 < A.animationDuration } s.applyAnimationDelay && ($ = "boolean" !== typeof f.delay && xa(f.delay) ? parseFloat(f.delay) : $, w = Math.max($, 0), A.animationDelay = $, aa = [qa, $ + "s"], x.push(aa), k.style[aa[0]] = aa[1]); P = 1E3 * w; S = 1E3 * M; if (f.easing) {
                                            var d, e = f.easing; s.hasTransitions && (d = Q + "TimingFunction",
                                                x.push([d, e]), k.style[d] = e); s.hasAnimations && (d = Y + "TimingFunction", x.push([d, e]), k.style[d] = e)
                                        } A.transitionDuration && ea.push(za); A.animationDuration && ea.push(Aa); T = Date.now(); var l = P + 1.5 * S; d = T + l; var e = a.data("$$animateCss") || [], p = !0; if (e.length) { var F = e[0]; (p = d > F.expectedEndTime) ? r.cancel(F.timer) : e.push(n) } p && (l = r(c, l, !1), e[0] = { timer: l, expectedEndTime: d }, e.push(n), a.data("$$animateCss", e)); if (ea.length) a.on(ea.join(" "), y); f.to && (f.cleanupStyles && Ma(q, k, Object.keys(f.to)), Ia(a, f))
                                    }
                                } function c() {
                                    var b =
                                        a.data("$$animateCss"); if (b) { for (var d = 1; d < b.length; d++)b[d](); a.removeData("$$animateCss") }
                                } if (!L) if (k.parentNode) { var d = function (a) { if (ba) u && a && (u = !1, n()); else if (u = !a, A.animationDuration) if (a = wa(k, u), u) x.push(a); else { var b = x, c = b.indexOf(a); 0 <= a && b.splice(c, 1) } }, e = 0 < Z && (A.transitionDuration && 0 === U.transitionDuration || A.animationDuration && 0 === U.animationDuration) && Math.max(U.animationDelay, U.transitionDelay); e ? r(b, Math.floor(e * Z * 1E3), !1) : b(); B.resume = function () { d(!0) }; B.pause = function () { d(!1) } } else n()
                            }
                            var f = c || {}; f.$$prepared || (f = oa(Ca(f))); var q = {}, k = I(a); if (!k || !k.parentNode || !J.enabled()) return F(); var x = [], G = a.attr("class"), D = Qa(f), L, u, ba, z, B, w, P, M, S, T, ea = []; if (0 === f.duration || !N.animations && !N.transitions) return F(); var ia = f.event && V(f.event) ? f.event.join(" ") : f.event, X = "", R = ""; ia && f.structural ? X = W(ia, "ng-", !0) : ia && (X = ia); f.addClass && (R += W(f.addClass, "-add")); f.removeClass && (R.length && (R += " "), R += W(f.removeClass, "-remove")); f.applyClassesEarly && R.length && h(a, f); var fa = [X, R].join(" ").trim(),
                                ma = G + " " + fa, ca = W(fa, "-active"), G = D.to && 0 < Object.keys(D.to).length; if (!(0 < (f.keyframeStyle || "").length || G || fa)) return F(); var ja, U; 0 < f.stagger ? (D = parseFloat(f.stagger), U = { transitionDelay: D, animationDelay: D, transitionDuration: 0, animationDuration: 0 }) : (ja = m(k, ma), U = da(k, fa, ja, Xa)); f.$$skipPreparationClasses || g.addClass(a, fa); f.transitionStyle && (D = [Q, f.transitionStyle], ka(k, D), x.push(D)); 0 <= f.duration && (D = 0 < k.style[Q].length, D = Ka(f.duration, D), ka(k, D), x.push(D)); f.keyframeStyle && (D = [Y, f.keyframeStyle],
                                    ka(k, D), x.push(D)); var Z = U ? 0 <= f.staggerIndex ? f.staggerIndex : b.count(ja) : 0; (ia = 0 === Z) && !f.skipBlocking && pa(k, 9999); var A = E(k, ma, ja), $ = A.maxDelay; w = Math.max($, 0); M = A.maxDuration; var s = {}; s.hasTransitions = 0 < A.transitionDuration; s.hasAnimations = 0 < A.animationDuration; s.hasTransitionAll = s.hasTransitions && "all" === A.transitionProperty; s.applyTransitionDuration = G && (s.hasTransitions && !s.hasTransitionAll || s.hasAnimations && !s.hasTransitions); s.applyAnimationDuration = f.duration && s.hasAnimations; s.applyTransitionDelay =
                                        xa(f.delay) && (s.applyTransitionDuration || s.hasTransitions); s.applyAnimationDelay = xa(f.delay) && s.hasAnimations; s.recalculateTimingStyles = 0 < R.length; if (s.applyTransitionDuration || s.applyAnimationDuration) M = f.duration ? parseFloat(f.duration) : M, s.applyTransitionDuration && (s.hasTransitions = !0, A.transitionDuration = M, D = 0 < k.style[Q + "Property"].length, x.push(Ka(M, D))), s.applyAnimationDuration && (s.hasAnimations = !0, A.animationDuration = M, x.push([Ba, M + "s"])); if (0 === M && !s.recalculateTimingStyles) return F(); if (null !=
                                            f.delay) { var aa; "boolean" !== typeof f.delay && (aa = parseFloat(f.delay), w = Math.max(aa, 0)); s.applyTransitionDelay && x.push([la, aa + "s"]); s.applyAnimationDelay && x.push([qa, aa + "s"]) } null == f.duration && 0 < A.transitionDuration && (s.recalculateTimingStyles = s.recalculateTimingStyles || ia); P = 1E3 * w; S = 1E3 * M; f.skipBlocking || (s.blockTransition = 0 < A.transitionDuration, s.blockKeyframeAnimation = 0 < A.animationDuration && 0 < U.animationDelay && 0 === U.animationDuration); f.from && (f.cleanupStyles && Ma(q, k, Object.keys(f.from)), Ha(a, f));
                            s.blockTransition || s.blockKeyframeAnimation ? K(M) : f.skipBlocking || pa(k, !1); return { $$willAnimate: !0, end: d, start: function () { if (!L) return B = { end: d, cancel: l, resume: null, pause: null }, z = new e(B), v(ga), z } }
                        }
                    }]
                }]).provider("$$animateCssDriver", ["$$animationProvider", function (a) {
                    a.drivers.push("$$animateCssDriver"); this.$get = ["$animateCss", "$rootScope", "$$AnimateRunner", "$rootElement", "$sniffer", "$$jqLite", "$document", function (a, c, d, g, e, r, G) {
                        function N(a) { return a.replace(/\bng-\S+\b/g, "") } function l(a, b) {
                        B(a) &&
                            (a = a.split(" ")); B(b) && (b = b.split(" ")); return a.filter(function (a) { return -1 === b.indexOf(a) }).join(" ")
                        } function J(c, e, g) {
                            function r(a) { var b = {}, c = I(a).getBoundingClientRect(); t(["width", "height", "top", "left"], function (a) { var d = c[a]; switch (a) { case "top": d += v.scrollTop; break; case "left": d += v.scrollLeft }b[a] = Math.floor(d) + "px" }); return b } function G() {
                                var c = N(g.attr("class") || ""), d = l(c, n), c = l(n, c), d = a(m, { to: r(g), addClass: "ng-anchor-in " + d, removeClass: "ng-anchor-out " + c, delay: !0 }); return d.$$willAnimate ?
                                    d : null
                            } function p() { m.remove(); e.removeClass("ng-animate-shim"); g.removeClass("ng-animate-shim") } var m = z(I(e).cloneNode(!0)), n = N(m.attr("class") || ""); e.addClass("ng-animate-shim"); g.addClass("ng-animate-shim"); m.addClass("ng-anchor"); E.append(m); var K; c = function () { var c = a(m, { addClass: "ng-anchor-out", delay: !0, from: r(e) }); return c.$$willAnimate ? c : null }(); if (!c && (K = G(), !K)) return p(); var F = c || K; return {
                                start: function () {
                                    function a() { c && c.end() } var b, c = F.start(); c.done(function () {
                                        c = null; if (!K && (K = G())) return c =
                                            K.start(), c.done(function () { c = null; p(); b.complete() }), c; p(); b.complete()
                                    }); return b = new d({ end: a, cancel: a })
                                }
                            }
                        } function m(a, b, c, e) { var g = da(a, O), l = da(b, O), r = []; t(e, function (a) { (a = J(c, a.out, a["in"])) && r.push(a) }); if (g || l || 0 !== r.length) return { start: function () { function a() { t(b, function (a) { a.end() }) } var b = []; g && b.push(g.start()); l && b.push(l.start()); t(r, function (a) { b.push(a.start()) }); var c = new d({ end: a, cancel: a }); d.all(b, function (a) { c.complete(a) }); return c } } } function da(c) {
                            var d = c.element, e = c.options ||
                                {}; c.structural && (e.event = c.event, e.structural = !0, e.applyClassesEarly = !0, "leave" === c.event && (e.onDone = e.domOperation)); e.preparationClasses && (e.event = ca(e.event, e.preparationClasses)); c = a(d, e); return c.$$willAnimate ? c : null
                        } if (!e.animations && !e.transitions) return O; var v = G[0].body; c = I(g); var E = z(c.parentNode && 11 === c.parentNode.nodeType || v.contains(c) ? c : v); return function (a) { return a.from && a.to ? m(a.from, a.to, a.classes, a.anchors) : da(a) }
                    }]
                }]).provider("$$animateJs", ["$animateProvider", function (a) {
                this.$get =
                    ["$injector", "$$AnimateRunner", "$$jqLite", function (b, c, d) {
                        function g(c) { c = V(c) ? c : c.split(" "); for (var d = [], e = {}, g = 0; g < c.length; g++) { var m = c[g], t = a.$$registeredAnimations[m]; t && !e[m] && (d.push(b.get(t)), e[m] = !0) } return d } var e = X(d); return function (a, b, d, l) {
                            function m() { l.domOperation(); e(a, l) } function z(a, b, d, e, f) {
                                switch (d) { case "animate": b = [b, e.from, e.to, f]; break; case "setClass": b = [b, h, L, f]; break; case "addClass": b = [b, h, f]; break; case "removeClass": b = [b, L, f]; break; default: b = [b, f] }b.push(e); if (a = a.apply(a,
                                    b)) if (Da(a.start) && (a = a.start()), a instanceof c) a.done(f); else if (Da(a)) return a; return O
                            } function B(a, b, d, e, f) { var g = []; t(e, function (e) { var h = e[f]; h && g.push(function () { var e, f, g = !1, k = function (a) { g || (g = !0, (f || O)(a), e.complete(!a)) }; e = new c({ end: function () { k() }, cancel: function () { k(!0) } }); f = z(h, a, b, d, function (a) { k(!1 === a) }); return e }) }); return g } function v(a, b, d, e, f) {
                                var g = B(a, b, d, e, f); if (0 === g.length) {
                                    var h, l; "beforeSetClass" === f ? (h = B(a, "removeClass", d, e, "beforeRemoveClass"), l = B(a, "addClass", d, e, "beforeAddClass")) :
                                        "setClass" === f && (h = B(a, "removeClass", d, e, "removeClass"), l = B(a, "addClass", d, e, "addClass")); h && (g = g.concat(h)); l && (g = g.concat(l))
                                } if (0 !== g.length) return function (a) { var b = []; g.length && t(g, function (a) { b.push(a()) }); b.length ? c.all(b, a) : a(); return function (a) { t(b, function (b) { a ? b.cancel() : b.end() }) } }
                            } var E = !1; 3 === arguments.length && ra(d) && (l = d, d = null); l = oa(l); d || (d = a.attr("class") || "", l.addClass && (d += " " + l.addClass), l.removeClass && (d += " " + l.removeClass)); var h = l.addClass, L = l.removeClass, x = g(d), C, H; if (x.length) {
                                var p,
                                I; "leave" === b ? (I = "leave", p = "afterLeave") : (I = "before" + b.charAt(0).toUpperCase() + b.substr(1), p = b); "enter" !== b && "move" !== b && (C = v(a, b, l, x, I)); H = v(a, b, l, x, p)
                            } if (C || H) {
                                var n; return {
                                    $$willAnimate: !0, end: function () { n ? n.end() : (E = !0, m(), ha(a, l), n = new c, n.complete(!0)); return n }, start: function () {
                                        function b(c) { E = !0; m(); ha(a, l); n.complete(c) } if (n) return n; n = new c; var d, e = []; C && e.push(function (a) { d = C(a) }); e.length ? e.push(function (a) { m(); a(!0) }) : m(); H && e.push(function (a) { d = H(a) }); n.setHost({
                                            end: function () {
                                                E || ((d ||
                                                    O)(void 0), b(void 0))
                                            }, cancel: function () { E || ((d || O)(!0), b(!0)) }
                                        }); c.chain(e, b); return n
                                    }
                                }
                            }
                        }
                    }]
                }]).provider("$$animateJsDriver", ["$$animationProvider", function (a) {
                    a.drivers.push("$$animateJsDriver"); this.$get = ["$$animateJs", "$$AnimateRunner", function (a, c) {
                        function d(c) { return a(c.element, c.event, c.classes, c.options) } return function (a) {
                            if (a.from && a.to) {
                                var b = d(a.from), m = d(a.to); if (b || m) return {
                                    start: function () {
                                        function a() { return function () { t(d, function (a) { a.end() }) } } var d = []; b && d.push(b.start()); m &&
                                            d.push(m.start()); c.all(d, function (a) { g.complete(a) }); var g = new c({ end: a(), cancel: a() }); return g
                                    }
                                }
                            } else return d(a)
                        }
                    }]
                }])
})(window, window.angular);
//# sourceMappingURL=angular-animate.min.js.map