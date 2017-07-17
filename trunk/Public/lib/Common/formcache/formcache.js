/**
 * Created by lixiongfeng on 17/3/3.
 */
/*!
 * Form Cache v0.0.3
 * https://github.com/fengyuanchen/formcache
 *
 * Copyright 2014 Fengyuan Chen
 * Released under the MIT license
 *
 * Date: 2014-12-17T12:42:29.194Z
 */
!
    function(a) {
        "function" == typeof define && define.amd ? define("formcache", ["jquery"], a) : a(jQuery)
    } (function(a) {
        "use strict";
        var b = a(window),
            c = window.sessionStorage,
            d = window.localStorage,
            e = "undefined",
            f = ".formcache",
            g = /[\.\*\+\^\$\:\!\[\]#>~]+/g,
            h = "change" + f,
            i = "beforeunload" + f,
            j = function(a) {
                return "checkbox" === a.type || "radio" === a.type
            },
            k = function(a) {
                return parseInt(a, 10)
            },
            l = function(b, c) {
                this.form = b,
                    this.$form = a(b),
                    this.defaults = a.extend({},
                        l.DEFAULTS, a.isPlainObject(c) ? c: {}),
                    this.init()
            };
        l.prototype = {
            constructor: l,
            init: function() {
                var b = this.defaults;
                b.maxAge = Math.abs(b.maxAge || b.maxage),
                    b.autoStore = Boolean(b.autoStore || b.autostore),
                    this.initKey(),
                    this.initStorage(),
                    this.caches = this.storage.caches,
                    this.index = 0,
                    this.activeIndex = 0,
                    this.storing = null,
                a.isArray(b.controls) || (b.controls = []),
                    this.$controls = this.$form.find(b.controls.join()).not(":file"),
                    this.addListeners(),
                    this.outputCache()
            },
            initKey: function() {
                var b = this.$form,
                    c = this.defaults.key || b.data("key");
                c || (a("form").each(function(b) {
                    a(this).data("key", b)
                }), c = b.data("key")),
                    this.key = location.pathname + "#formcache-" + c
            },
            initStorage: function() {
                var b, e = this.defaults,
                    f = this.key,
                    g = new Date,
                    h = {
                        date: g,
                        maxAge: e.maxAge,
                        caches: []
                    };
                c && (b = c.getItem(f)),
                !b && d && (b = d.getItem(f)),
                    b = "string" == typeof b ? JSON.parse(b) : null,
                    a.isPlainObject(b) ? "number" == typeof b.maxAge && (g - new Date(b.date)) / 1e3 > b.maxAge && (b = h) : b = h,
                    this.storage = b
            },
            addListeners: function() {
                this.defaults.autoStore && (this.$controls.on(h, a.proxy(this.change, this)), b.on(i, a.proxy(this.beforeunload, this)))
            },
            removeListeners: function() {
                this.defaults.autoStore && (this.$controls.off(h, this.change), b.off(i, this.beforeunload))
            },
            change: function(b) {
                var c, d, e = b.target,
                    f = a(e),
                    h = f.attr("name"),
                    i = [];
                h && (c = h.replace(g, ""), this.$controls.filter('[name*="' + c + '"]').each(function() {
                    j(e) ? i.push(this.checked) : (d = a(this).val(), d && i.push(d))
                }), i.length && (this.update(h, i), clearTimeout(this.storing), this.storing = setTimeout(a.proxy(this.store, this), 1e3)))
            },
            beforeunload: function() {
                this.update(),
                    this.store()
            },
            update: function(a, b) {
                var c = this.activeIndex || this.index,
                    d = this.getCache(c);
                "string" == typeof a ? d[a] = b: d = this.serialize(),
                    this.setCache(c, d)
            },
            serialize: function() {
                var b = {};
                return this.$controls.each(function() {
                    var c, d, e = a(this),
                        f = e.attr("name");
                    f && (c = b[f], c = a.isArray(c) ? c: [], j(this) ? c.push(this.checked) : (d = e.val(), d && c.push(d)), c.length && (b[f] = c))
                }),
                    b
            },
            getCache: function(a) {
                return this.caches[k(a) || this.index] || {}
            },
            getCaches: function() {
                return this.caches
            },
            setCache: function(b, c) {
                typeof c === e && (c = b, b = 0 / 0),
                a.isPlainObject(c) && (b = k(b) || this.index, this.caches[b] = c, this.store())
            },
            setCaches: function(b) {
                a.isArray(b) && (this.caches = b, this.store())
            },
            removeCache: function(a) {
                this.caches.splice(k(a) || this.index, 1),
                    this.store()
            },
            removeCaches: function() {
                this.caches = [],
                    this.store()
            },
            outputCache: function(b) {
                var c = this.getCache(b);
                a.isPlainObject(c) && (this.activeIndex = k(b) || this.index, c = a.extend(!0, {},
                    c), this.$controls.each(function() {
                    var b, d, e = a(this),
                        f = e.attr("name");
                    f && (b = c[f], a.isArray(b) && b.length && (d = b.shift(), j(this) ? this.checked = d: e.val(d)))
                }))
            },
            store: function() {
                var a = this.storage,
                    b = this.key,
                    e = this.defaults;
                a.date = new Date,
                    a.maxAge = e.maxAge,
                    a = JSON.stringify(a),
                e.session && c && c.setItem(b, a),
                e.local && d && d.setItem(b, a)
            },
            clear: function() {
                var a = this.key,
                    b = this.defaults;
                b.session && c && c.removeItem(a),
                b.local && d && d.removeItem(a)
            },
            destroy: function() {
                this.removeListeners(),
                    this.$form.removeData("formcache")
            }
        },
            l.DEFAULTS = {
                key: "",
                local: !0,
                session: !0,
                autoStore: !0,
                maxAge: void 0,
                controls: ["select", "textarea", "input"]
            },
            l.setDefaults = function(b) {
                a.extend(l.DEFAULTS, b)
            },
            l.other = a.fn.formcache,
            a.fn.formcache = function(b) {
                var c, d = [].slice.call(arguments, 1);
                return this.each(function() {
                    var e, f = a(this),
                        g = f.data("formcache");
                    g || f.data("formcache", g = new l(this, b)),
                    "string" == typeof b && a.isFunction(e = g[b]) && (c = e.apply(g, d))
                }),
                    typeof c !== e ? c: this
            },
            a.fn.formcache.Constructor = l,
            a.fn.formcache.setDefaults = l.setDefaults,
            a.fn.formcache.noConflict = function() {
                return a.fn.formcache = l.other,
                    this
            },
            a(function() {
                a('form[data-toggle="formcache"]').formcache()
            })
    });