(function (w) {
    var k = function (b, c) {
        typeof c == "undefined" && (c = {});
        this.init(b, c)
    }, a = k.prototype, o, p = ["canvas", "vml"], f = ["oval", "spiral", "square", "rect", "roundRect"], x = /^\#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/, v = navigator.appVersion.indexOf("MSIE") !== -1 && parseFloat(navigator.appVersion.split("MSIE")[1]) === 8 ? true : false, y = !!document.createElement("canvas").getContext, q = true, n = function (b, c, a) {
        var b = document.createElement(b), d;
        for (d in a)b[d] = a[d];
        typeof c !== "undefined" && c.appendChild(b);
        return b
    }, m = function (b,
                     c) {
        for (var a in c)b.style[a] = c[a];
        return b
    }, t = function (b, c) {
        for (var a in c)b.setAttribute(a, c[a]);
        return b
    }, u = function (b, c, a, d) {
        b.save();
        b.translate(c, a);
        b.rotate(d);
        b.translate(-c, -a);
        b.beginPath()
    };
    a.init = function (b, c) {
        if (typeof c.safeVML === "boolean")q = c.safeVML;
        try {
            this.mum = document.getElementById(b) !== void 0 ? document.getElementById(b) : document.body
        } catch (a) {
            this.mum = document.body
        }
        c.id = typeof c.id !== "undefined" ? c.id : "canvasLoader";
        this.cont = n("div", this.mum, {id: c.id});
        if (y)o = p[0], this.can = n("canvas",
            this.cont), this.con = this.can.getContext("2d"), this.cCan = m(n("canvas", this.cont), {display: "none"}), this.cCon = this.cCan.getContext("2d"); else {
            o = p[1];
            if (typeof k.vmlSheet === "undefined") {
                document.getElementsByTagName("head")[0].appendChild(n("style"));
                k.vmlSheet = document.styleSheets[document.styleSheets.length - 1];
                var d = ["group", "oval", "roundrect", "fill"], e;
                for (e in d)k.vmlSheet.addRule(d[e], "behavior:url(#default#VML); position:absolute;")
            }
            this.vml = n("group", this.cont)
        }
        this.setColor(this.color);
        this.draw();
        m(this.cont, {display: "none"})
    };
    a.cont = {};
    a.can = {};
    a.con = {};
    a.cCan = {};
    a.cCon = {};
    a.timer = {};
    a.activeId = 0;
    a.diameter = 40;
    a.setDiameter = function (b) {
        this.diameter = Math.round(Math.abs(b));
        this.redraw()
    };
    a.getDiameter = function () {
        return this.diameter
    };
    a.cRGB = {};
    a.color = "#000000";
    a.setColor = function (b) {
        this.color = x.test(b) ? b : "#000000";
        this.cRGB = this.getRGB(this.color);
        this.redraw()
    };
    a.getColor = function () {
        return this.color
    };
    a.shape = f[0];
    a.setShape = function (b) {
        for (var c in f)if (b === f[c]) {
            this.shape = b;
            this.redraw();
            break
        }
    };
    a.getShape = function () {
        return this.shape
    };
    a.density = 40;
    a.setDensity = function (b) {
        this.density = q && o === p[1] ? Math.round(Math.abs(b)) <= 40 ? Math.round(Math.abs(b)) : 40 : Math.round(Math.abs(b));
        if (this.density > 360)this.density = 360;
        this.activeId = 0;
        this.redraw()
    };
    a.getDensity = function () {
        return this.density
    };
    a.range = 1.3;
    a.setRange = function (b) {
        this.range = Math.abs(b);
        this.redraw()
    };
    a.getRange = function () {
        return this.range
    };
    a.speed = 2;
    a.setSpeed = function (b) {
        this.speed = Math.round(Math.abs(b))
    };
    a.getSpeed = function () {
        return this.speed
    };
    a.fps = 24;
    a.setFPS = function (b) {
        this.fps = Math.round(Math.abs(b));
        this.reset()
    };
    a.getFPS = function () {
        return this.fps
    };
    a.getRGB = function (b) {
        b = b.charAt(0) === "#" ? b.substring(1, 7) : b;
        return {
            r: parseInt(b.substring(0, 2), 16),
            g: parseInt(b.substring(2, 4), 16),
            b: parseInt(b.substring(4, 6), 16)
        }
    };
    a.draw = function () {
        var b = 0, c, a, d, e, h, k, j, r = this.density, s = Math.round(r * this.range), l, i, q = 0;
        i = this.cCon;
        var g = this.diameter;
        if (o === p[0]) {
            i.clearRect(0, 0, 1E3, 1E3);
            t(this.can, {width: g, height: g});
            for (t(this.cCan, {width: g, height: g}); b <
            r;) {
                l = b <= s ? 1 - 1 / s * b : l = 0;
                k = 270 - 360 / r * b;
                j = k / 180 * Math.PI;
                i.fillStyle = "rgba(" + this.cRGB.r + "," + this.cRGB.g + "," + this.cRGB.b + "," + l.toString() + ")";
                switch (this.shape) {
                    case f[0]:
                    case f[1]:
                        c = g * 0.07;
                        e = g * 0.47 + Math.cos(j) * (g * 0.47 - c) - g * 0.47;
                        h = g * 0.47 + Math.sin(j) * (g * 0.47 - c) - g * 0.47;
                        i.beginPath();
                        this.shape === f[1] ? i.arc(g * 0.5 + e, g * 0.5 + h, c * l, 0, Math.PI * 2, false) : i.arc(g * 0.5 + e, g * 0.5 + h, c, 0, Math.PI * 2, false);
                        break;
                    case f[2]:
                        c = g * 0.12;
                        e = Math.cos(j) * (g * 0.47 - c) + g * 0.5;
                        h = Math.sin(j) * (g * 0.47 - c) + g * 0.5;
                        u(i, e, h, j);
                        i.fillRect(e, h - c * 0.5,
                            c, c);
                        break;
                    case f[3]:
                    case f[4]:
                        a = g * 0.3, d = a * 0.27, e = Math.cos(j) * (d + (g - d) * 0.13) + g * 0.5, h = Math.sin(j) * (d + (g - d) * 0.13) + g * 0.5, u(i, e, h, j), this.shape === f[3] ? i.fillRect(e, h - d * 0.5, a, d) : (c = d * 0.55, i.moveTo(e + c, h - d * 0.5), i.lineTo(e + a - c, h - d * 0.5), i.quadraticCurveTo(e + a, h - d * 0.5, e + a, h - d * 0.5 + c), i.lineTo(e + a, h - d * 0.5 + d - c), i.quadraticCurveTo(e + a, h - d * 0.5 + d, e + a - c, h - d * 0.5 + d), i.lineTo(e + c, h - d * 0.5 + d), i.quadraticCurveTo(e, h - d * 0.5 + d, e, h - d * 0.5 + d - c), i.lineTo(e, h - d * 0.5 + c), i.quadraticCurveTo(e, h - d * 0.5, e + c, h - d * 0.5))
                }
                i.closePath();
                i.fill();
                i.restore();
                ++b
            }
        } else {
            m(this.cont, {width: g, height: g});
            m(this.vml, {width: g, height: g});
            switch (this.shape) {
                case f[0]:
                case f[1]:
                    j = "oval";
                    c = 140;
                    break;
                case f[2]:
                    j = "roundrect";
                    c = 120;
                    break;
                case f[3]:
                case f[4]:
                    j = "roundrect", c = 300
            }
            a = d = c;
            e = 500 - d;
            for (h = -d * 0.5; b < r;) {
                l = b <= s ? 1 - 1 / s * b : l = 0;
                k = 270 - 360 / r * b;
                switch (this.shape) {
                    case f[1]:
                        a = d = c * l;
                        e = 500 - c * 0.5 - c * l * 0.5;
                        h = (c - c * l) * 0.5;
                        break;
                    case f[0]:
                    case f[2]:
                        v && (h = 0, this.shape === f[2] && (e = 500 - d * 0.5));
                        break;
                    case f[3]:
                    case f[4]:
                        a = c * 0.95, d = a * 0.28, v ? (e = 0, h = 500 - d * 0.5) : (e = 500 - a, h =
                            -d * 0.5), q = this.shape === f[4] ? 0.6 : 0
                }
                i = t(m(n("group", this.vml), {width: 1E3, height: 1E3, rotation: k}), {
                    coordsize: "1000,1000",
                    coordorigin: "-500,-500"
                });
                i = m(n(j, i, {stroked: false, arcSize: q}), {width: a, height: d, top: h, left: e});
                n("fill", i, {color: this.color, opacity: l});
                ++b
            }
        }
        this.tick(true)
    };
    a.clean = function () {
        if (o === p[0])this.con.clearRect(0, 0, 1E3, 1E3); else {
            var b = this.vml;
            if (b.hasChildNodes())for (; b.childNodes.length >= 1;)b.removeChild(b.firstChild)
        }
    };
    a.redraw = function () {
        this.clean();
        this.draw()
    };
    a.reset = function () {
        typeof this.timer ===
        "number" && (this.hide(), this.show())
    };
    a.tick = function (b) {
        var a = this.con, f = this.diameter;
        b || (this.activeId += 360 / this.density * this.speed);
        o === p[0] ? (a.clearRect(0, 0, f, f), u(a, f * 0.5, f * 0.5, this.activeId / 180 * Math.PI), a.drawImage(this.cCan, 0, 0, f, f), a.restore()) : (this.activeId >= 360 && (this.activeId -= 360), m(this.vml, {rotation: this.activeId}))
    };
    a.show = function () {
        if (typeof this.timer !== "number") {
            var a = this;
            this.timer = self.setInterval(function () {
                a.tick()
            }, Math.round(1E3 / this.fps));
            m(this.cont, {display: "block"})
        }
    };
    a.hide = function () {
        typeof this.timer === "number" && (clearInterval(this.timer), delete this.timer, m(this.cont, {display: "none"}))
    };
    a.kill = function () {
        var a = this.cont;
        typeof this.timer === "number" && this.hide();
        o === p[0] ? (a.removeChild(this.can), a.removeChild(this.cCan)) : a.removeChild(this.vml);
        for (var c in this)delete this[c]
    };
    w.CanvasLoader = k
})(window);


/*! skrollr 0.6.22 (2014-02-21) | Alexander Prinzhorn - https://github.com/Prinzhorn/skrollr | Free to use under terms of MIT license */
(function (e, t, r) {
    "use strict";
    function n(r) {
        if (o = t.documentElement, a = t.body, K(), it = this, r = r || {}, ut = r.constants || {}, r.easing)for (var n in r.easing)U[n] = r.easing[n];
        yt = r.edgeStrategy || "set", ct = {
            beforerender: r.beforerender,
            render: r.render
        }, ft = r.forceHeight !== !1, ft && (zt = r.scale || 1), pt = r.mobileDeceleration || E, gt = r.smoothScrolling !== !1, dt = r.smoothScrollingDuration || x, vt = {targetTop: it.getScrollTop()}, _t = (r.mobileCheck || function () {
            return /Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent || navigator.vendor || e.opera)
        })(), _t ? (st = t.getElementById("skrollr-body"), st && at(), X(), Ct(o, [y, S], [T])) : Ct(o, [y, b], [T]), it.refresh(), St(e, "resize orientationchange", function () {
            var e = o.clientWidth, t = o.clientHeight;
            (t !== $t || e !== Lt) && ($t = t, Lt = e, Mt = !0)
        });
        var i = Y();
        return function l() {
            Z(), bt = i(l)
        }(), it
    }

    var o, a, i = {
        get: function () {
            return it
        }, init: function (e) {
            return it || new n(e)
        }, VERSION: "0.6.22"
    }, l = Object.prototype.hasOwnProperty, s = e.Math, c = e.getComputedStyle, f = "touchstart", u = "touchmove", p = "touchcancel", m = "touchend", g = "skrollable", d = g + "-before", v = g + "-between", h = g + "-after", y = "skrollr", T = "no-" + y, b = y + "-desktop", S = y + "-mobile", w = "linear", k = 1e3, E = .004, x = 200, A = "start", F = "end", C = "center", D = "bottom", H = "___skrollable_id", N = /^(?:input|textarea|button|select)$/i, P = /^\s+|\s+$/g, V = /^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/, z = /\s*([\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi, O = /^([a-z\-]+)\[(\w+)\]$/, q = /-([a-z])/g, I = function (e, t) {
        return t.toUpperCase()
    }, L = /[\-+]?[\d]*\.?[\d]+/g, $ = /\{\?\}/g, M = /rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g, B = /[a-z\-]+-gradient/g, _ = "", G = "", K = function () {
        var e = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;
        if (c) {
            var t = c(a, null);
            for (var n in t)if (_ = n.match(e) || +n == n && t[n].match(e))break;
            if (!_)return _ = G = "", r;
            _ = _[0], "-" === _.slice(0, 1) ? (G = _, _ = {
                "-webkit-": "webkit",
                "-moz-": "Moz",
                "-ms-": "ms",
                "-o-": "O"
            }[_]) : G = "-" + _.toLowerCase() + "-"
        }
    }, Y = function () {
        var t = e.requestAnimationFrame || e[_.toLowerCase() + "RequestAnimationFrame"], r = Nt();
        return (_t || !t) && (t = function (t) {
            var n = Nt() - r, o = s.max(0, 1e3 / 60 - n);
            return e.setTimeout(function () {
                r = Nt(), t()
            }, o)
        }), t
    }, R = function () {
        var t = e.cancelAnimationFrame || e[_.toLowerCase() + "CancelAnimationFrame"];
        return (_t || !t) && (t = function (t) {
            return e.clearTimeout(t)
        }), t
    }, U = {
        begin: function () {
            return 0
        }, end: function () {
            return 1
        }, linear: function (e) {
            return e
        }, quadratic: function (e) {
            return e * e
        }, cubic: function (e) {
            return e * e * e
        }, swing: function (e) {
            return -s.cos(e * s.PI) / 2 + .5
        }, sqrt: function (e) {
            return s.sqrt(e)
        }, outCubic: function (e) {
            return s.pow(e - 1, 3) + 1
        }, bounce: function (e) {
            var t;
            if (.5083 >= e)t = 3; else if (.8489 >= e)t = 9; else if (.96208 >= e)t = 27; else {
                if (!(.99981 >= e))return 1;
                t = 91
            }
            return 1 - s.abs(3 * s.cos(1.028 * e * t) / t)
        }
    };
    n.prototype.refresh = function (e) {
        var n, o, a = !1;
        for (e === r ? (a = !0, lt = [], Bt = 0, e = t.getElementsByTagName("*")) : e = [].concat(e), n = 0, o = e.length; o > n; n++) {
            var i = e[n], l = i, s = [], c = gt, f = yt;
            if (i.attributes) {
                for (var u = 0, p = i.attributes.length; p > u; u++) {
                    var m = i.attributes[u];
                    if ("data-anchor-target" !== m.name)if ("data-smooth-scrolling" !== m.name)if ("data-edge-strategy" !== m.name) {
                        var d = m.name.match(V);
                        if (null !== d) {
                            var v = {props: m.value, element: i};
                            s.push(v);
                            var h = d[1];
                            h && (v.constant = h.substr(1));
                            var y = d[2];
                            /p$/.test(y) ? (v.isPercentage = !0, v.offset = (0 | y.slice(0, -1)) / 100) : v.offset = 0 | y;
                            var T = d[3], b = d[4] || T;
                            T && T !== A && T !== F ? (v.mode = "relative", v.anchors = [T, b]) : (v.mode = "absolute", T === F ? v.isEnd = !0 : v.isPercentage || (v.offset = v.offset * zt))
                        }
                    } else f = m.value; else c = "off" !== m.value; else if (l = t.querySelector(m.value), null === l)throw'Unable to find anchor target "' + m.value + '"'
                }
                if (s.length) {
                    var S, w, k;
                    !a && H in i ? (k = i[H], S = lt[k].styleAttr, w = lt[k].classAttr) : (k = i[H] = Bt++, S = i.style.cssText, w = Ft(i)), lt[k] = {
                        element: i,
                        styleAttr: S,
                        classAttr: w,
                        anchorTarget: l,
                        keyFrames: s,
                        smoothScrolling: c,
                        edgeStrategy: f
                    }, Ct(i, [g], [])
                }
            }
        }
        for (Et(), n = 0, o = e.length; o > n; n++) {
            var E = lt[e[n][H]];
            E !== r && (J(E), et(E))
        }
        return it
    }, n.prototype.relativeToAbsolute = function (e, t, r) {
        var n = o.clientHeight, a = e.getBoundingClientRect(), i = a.top, l = a.bottom - a.top;
        return t === D ? i -= n : t === C && (i -= n / 2), r === D ? i += l : r === C && (i += l / 2), i += it.getScrollTop(), 0 | i + .5
    }, n.prototype.animateTo = function (e, t) {
        t = t || {};
        var n = Nt(), o = it.getScrollTop();
        return mt = {
            startTop: o,
            topDiff: e - o,
            targetTop: e,
            duration: t.duration || k,
            startTime: n,
            endTime: n + (t.duration || k),
            easing: U[t.easing || w],
            done: t.done
        }, mt.topDiff || (mt.done && mt.done.call(it, !1), mt = r), it
    }, n.prototype.stopAnimateTo = function () {
        mt && mt.done && mt.done.call(it, !0), mt = r
    }, n.prototype.isAnimatingTo = function () {
        return !!mt
    }, n.prototype.setScrollTop = function (t, r) {
        return ht = r === !0, _t ? Gt = s.min(s.max(t, 0), Vt) : e.scrollTo(0, t), it
    }, n.prototype.getScrollTop = function () {
        return _t ? Gt : e.pageYOffset || o.scrollTop || a.scrollTop || 0
    }, n.prototype.getMaxScrollTop = function () {
        return Vt
    }, n.prototype.on = function (e, t) {
        return ct[e] = t, it
    }, n.prototype.off = function (e) {
        return delete ct[e], it
    }, n.prototype.destroy = function () {
        var e = R();
        e(bt), kt(), Ct(o, [T], [y, b, S]);
        for (var t = 0, n = lt.length; n > t; t++)ot(lt[t].element);
        o.style.overflow = a.style.overflow = "auto", o.style.height = a.style.height = "auto", st && i.setStyle(st, "transform", "none"), it = r, st = r, ct = r, ft = r, Vt = 0, zt = 1, ut = r, pt = r, Ot = "down", qt = -1, Lt = 0, $t = 0, Mt = !1, mt = r, gt = r, dt = r, vt = r, ht = r, Bt = 0, yt = r, _t = !1, Gt = 0, Tt = r
    };
    var X = function () {
        var n, i, l, c, g, d, v, h, y, T, b, S;
        St(o, [f, u, p, m].join(" "), function (e) {
            var o = e.changedTouches[0];
            for (c = e.target; 3 === c.nodeType;)c = c.parentNode;
            switch (g = o.clientY, d = o.clientX, T = e.timeStamp, N.test(c.tagName) || e.preventDefault(), e.type) {
                case f:
                    n && n.blur(), it.stopAnimateTo(), n = c, i = v = g, l = d, y = T;
                    break;
                case u:
                    N.test(c.tagName) && t.activeElement !== c && e.preventDefault(), h = g - v, S = T - b, it.setScrollTop(Gt - h, !0), v = g, b = T;
                    break;
                default:
                case p:
                case m:
                    var a = i - g, w = l - d, k = w * w + a * a;
                    if (49 > k) {
                        if (!N.test(n.tagName)) {
                            n.focus();
                            var E = t.createEvent("MouseEvents");
                            E.initMouseEvent("click", !0, !0, e.view, 1, o.screenX, o.screenY, o.clientX, o.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null), n.dispatchEvent(E)
                        }
                        return
                    }
                    n = r;
                    var x = h / S;
                    x = s.max(s.min(x, 3), -3);
                    var A = s.abs(x / pt), F = x * A + .5 * pt * A * A, C = it.getScrollTop() - F, D = 0;
                    C > Vt ? (D = (Vt - C) / F, C = Vt) : 0 > C && (D = -C / F, C = 0), A *= 1 - D, it.animateTo(0 | C + .5, {
                        easing: "outCubic",
                        duration: A
                    })
            }
        }), e.scrollTo(0, 0), o.style.overflow = a.style.overflow = "hidden"
    }, j = function () {
        var e, t, r, n, a, i, l, c, f, u, p, m = o.clientHeight, g = xt();
        for (c = 0, f = lt.length; f > c; c++)for (e = lt[c], t = e.element, r = e.anchorTarget, n = e.keyFrames, a = 0, i = n.length; i > a; a++)l = n[a], u = l.offset, p = g[l.constant] || 0, l.frame = u, l.isPercentage && (u *= m, l.frame = u), "relative" === l.mode && (ot(t), l.frame = it.relativeToAbsolute(r, l.anchors[0], l.anchors[1]) - u, ot(t, !0)), l.frame += p, ft && !l.isEnd && l.frame > Vt && (Vt = l.frame);
        for (Vt = s.max(Vt, At()), c = 0, f = lt.length; f > c; c++) {
            for (e = lt[c], n = e.keyFrames, a = 0, i = n.length; i > a; a++)l = n[a], p = g[l.constant] || 0, l.isEnd && (l.frame = Vt - l.offset + p);
            e.keyFrames.sort(Pt)
        }
    }, W = function (e, t) {
        for (var r = 0, n = lt.length; n > r; r++) {
            var o, a, s = lt[r], c = s.element, f = s.smoothScrolling ? e : t, u = s.keyFrames, p = u[0].frame, m = u[u.length - 1].frame, y = p > f, T = f > m, b = u[y ? 0 : u.length - 1];
            if (y || T) {
                if (y && -1 === s.edge || T && 1 === s.edge)continue;
                switch (Ct(c, [y ? d : h], [d, v, h]), s.edge = y ? -1 : 1, s.edgeStrategy) {
                    case"reset":
                        ot(c);
                        continue;
                    case"ease":
                        f = b.frame;
                        break;
                    default:
                    case"set":
                        var S = b.props;
                        for (o in S)l.call(S, o) && (a = nt(S[o].value), i.setStyle(c, o, a));
                        continue
                }
            } else 0 !== s.edge && (Ct(c, [g, v], [d, h]), s.edge = 0);
            for (var w = 0, k = u.length - 1; k > w; w++)if (f >= u[w].frame && u[w + 1].frame >= f) {
                var E = u[w], x = u[w + 1];
                for (o in E.props)if (l.call(E.props, o)) {
                    var A = (f - E.frame) / (x.frame - E.frame);
                    A = E.props[o].easing(A), a = rt(E.props[o].value, x.props[o].value, A), a = nt(a), i.setStyle(c, o, a)
                }
                break
            }
        }
    }, Z = function () {
        Mt && (Mt = !1, Et());
        var e, t, n = it.getScrollTop(), o = Nt();
        if (mt)o >= mt.endTime ? (n = mt.targetTop, e = mt.done, mt = r) : (t = mt.easing((o - mt.startTime) / mt.duration), n = 0 | mt.startTop + t * mt.topDiff), it.setScrollTop(n, !0); else if (!ht) {
            var a = vt.targetTop - n;
            a && (vt = {
                startTop: qt,
                topDiff: n - qt,
                targetTop: n,
                startTime: It,
                endTime: It + dt
            }), vt.endTime >= o && (t = U.sqrt((o - vt.startTime) / dt), n = 0 | vt.startTop + t * vt.topDiff)
        }
        if (_t && st && i.setStyle(st, "transform", "translate(0, " + -Gt + "px) " + Tt), ht || qt !== n) {
            Ot = n > qt ? "down" : qt > n ? "up" : Ot, ht = !1;
            var l = {
                curTop: n,
                lastTop: qt,
                maxTop: Vt,
                direction: Ot
            }, s = ct.beforerender && ct.beforerender.call(it, l);
            s !== !1 && (W(n, it.getScrollTop()), qt = n, ct.render && ct.render.call(it, l)), e && e.call(it, !1)
        }
        It = o
    }, J = function (e) {
        for (var t = 0, r = e.keyFrames.length; r > t; t++) {
            for (var n, o, a, i, l = e.keyFrames[t], s = {}; null !== (i = z.exec(l.props));)a = i[1], o = i[2], n = a.match(O), null !== n ? (a = n[1], n = n[2]) : n = w, o = o.indexOf("!") ? Q(o) : [o.slice(1)], s[a] = {
                value: o,
                easing: U[n]
            };
            l.props = s
        }
    }, Q = function (e) {
        var t = [];
        return M.lastIndex = 0, e = e.replace(M, function (e) {
            return e.replace(L, function (e) {
                return 100 * (e / 255) + "%"
            })
        }), G && (B.lastIndex = 0, e = e.replace(B, function (e) {
            return G + e
        })), e = e.replace(L, function (e) {
            return t.push(+e), "{?}"
        }), t.unshift(e), t
    }, et = function (e) {
        var t, r, n = {};
        for (t = 0, r = e.keyFrames.length; r > t; t++)tt(e.keyFrames[t], n);
        for (n = {}, t = e.keyFrames.length - 1; t >= 0; t--)tt(e.keyFrames[t], n)
    }, tt = function (e, t) {
        var r;
        for (r in t)l.call(e.props, r) || (e.props[r] = t[r]);
        for (r in e.props)t[r] = e.props[r]
    }, rt = function (e, t, r) {
        var n, o = e.length;
        if (o !== t.length)throw"Can't interpolate between \"" + e[0] + '" and "' + t[0] + '"';
        var a = [e[0]];
        for (n = 1; o > n; n++)a[n] = e[n] + (t[n] - e[n]) * r;
        return a
    }, nt = function (e) {
        var t = 1;
        return $.lastIndex = 0, e[0].replace($, function () {
            return e[t++]
        })
    }, ot = function (e, t) {
        e = [].concat(e);
        for (var r, n, o = 0, a = e.length; a > o; o++)n = e[o], r = lt[n[H]], r && (t ? (n.style.cssText = r.dirtyStyleAttr, Ct(n, r.dirtyClassAttr)) : (r.dirtyStyleAttr = n.style.cssText, r.dirtyClassAttr = Ft(n), n.style.cssText = r.styleAttr, Ct(n, r.classAttr)))
    }, at = function () {
        Tt = "translateZ(0)", i.setStyle(st, "transform", Tt);
        var e = c(st), t = e.getPropertyValue("transform"), r = e.getPropertyValue(G + "transform"), n = t && "none" !== t || r && "none" !== r;
        n || (Tt = "")
    };
    i.setStyle = function (e, t, r) {
        var n = e.style;
        if (t = t.replace(q, I).replace("-", ""), "zIndex" === t)n[t] = isNaN(r) ? r : "" + (0 | r); else if ("float" === t)n.styleFloat = n.cssFloat = r; else try {
            _ && (n[_ + t.slice(0, 1).toUpperCase() + t.slice(1)] = r), n[t] = r
        } catch (o) {
        }
    };
    var it, lt, st, ct, ft, ut, pt, mt, gt, dt, vt, ht, yt, Tt, bt, St = i.addEvent = function (t, r, n) {
        var o = function (t) {
            return t = t || e.event, t.target || (t.target = t.srcElement), t.preventDefault || (t.preventDefault = function () {
                t.returnValue = !1
            }), n.call(this, t)
        };
        r = r.split(" ");
        for (var a, i = 0, l = r.length; l > i; i++)a = r[i], t.addEventListener ? t.addEventListener(a, n, !1) : t.attachEvent("on" + a, o), Kt.push({
            element: t,
            name: a,
            listener: n
        })
    }, wt = i.removeEvent = function (e, t, r) {
        t = t.split(" ");
        for (var n = 0, o = t.length; o > n; n++)e.removeEventListener ? e.removeEventListener(t[n], r, !1) : e.detachEvent("on" + t[n], r)
    }, kt = function () {
        for (var e, t = 0, r = Kt.length; r > t; t++)e = Kt[t], wt(e.element, e.name, e.listener);
        Kt = []
    }, Et = function () {
        var e = it.getScrollTop();
        Vt = 0, ft && !_t && (a.style.height = "auto"), j(), ft && !_t && (a.style.height = Vt + o.clientHeight + "px"), _t ? it.setScrollTop(s.min(it.getScrollTop(), Vt)) : it.setScrollTop(e, !0), ht = !0
    }, xt = function () {
        var e, t, r = o.clientHeight, n = {};
        for (e in ut)t = ut[e], "function" == typeof t ? t = t.call(it) : /p$/.test(t) && (t = t.slice(0, -1) / 100 * r), n[e] = t;
        return n
    }, At = function () {
        var e = st && st.offsetHeight || 0, t = s.max(e, a.scrollHeight, a.offsetHeight, o.scrollHeight, o.offsetHeight, o.clientHeight);
        return t - o.clientHeight
    }, Ft = function (t) {
        var r = "className";
        return e.SVGElement && t instanceof e.SVGElement && (t = t[r], r = "baseVal"), t[r]
    }, Ct = function (t, n, o) {
        var a = "className";
        if (e.SVGElement && t instanceof e.SVGElement && (t = t[a], a = "baseVal"), o === r)return t[a] = n, r;
        for (var i = t[a], l = 0, s = o.length; s > l; l++)i = Ht(i).replace(Ht(o[l]), " ");
        i = Dt(i);
        for (var c = 0, f = n.length; f > c; c++)-1 === Ht(i).indexOf(Ht(n[c])) && (i += " " + n[c]);
        t[a] = Dt(i)
    }, Dt = function (e) {
        return e.replace(P, "")
    }, Ht = function (e) {
        return " " + e + " "
    }, Nt = Date.now || function () {
            return +new Date
        }, Pt = function (e, t) {
        return e.frame - t.frame
    }, Vt = 0, zt = 1, Ot = "down", qt = -1, It = Nt(), Lt = 0, $t = 0, Mt = !1, Bt = 0, _t = !1, Gt = 0, Kt = [];
    "function" == typeof define && define.amd ? define("skrollr", function () {
        return i
    }) : e.skrollr = i
})(window, document);


