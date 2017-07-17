/**
 * Created by xf.li on 2017/4/14.
 */
define("system-core:data/faceData.js", function(t, e, n) {
    var o = {},
        i = {};
    o.interface = [], o.button = {}, o.fileIcon = {}, o.contextMenu = {
        file: [],
        blank: [],
        share: []
    }, o.checkButtonType = function(t, e) {
        if (void 0 === o.button[t]) throw new Error("[Plugin declare error] [Button Plugin]: The buttons/position of " + e + ' is must be "aside-bottom" or "aside-middle" or "tools" or "listTools" or "list" !')
    }, i.pushInterfacePosition = function(t, e) {
        var n = e;
        n.pluginId = t, o.interface.push(n)
    }, i.pushButtonFuntion = function(t, e, n) {
        var i = e;
        if (i.length) for (var u = 0, f = i.length; f > u; u++) {
            i[u].pluginId = t;
            var l = i[u].position;
            o.button[l] && (n && (i[u].filesType = n.replace(/\*\.|\./g, "")), o.button[l].push(i[u]), i[u].buttonPosition = i[u].position, delete i[u].position)
        } else if ("object" == typeof i) {
            var l = i.position;
            o.button[l] && (n && (i.filesType = n.replace(/\*\.|\./g, ""), i.filesType = n.replace(/\*\.|\./g, "")), o.button[l].push(i), i.buttonPosition = i[u].position, delete i.position)
        }
    }, i.pushFileHandle = function(t, e) {
        if ("object" == typeof e) for (var n in e) e.hasOwnProperty(n) && "undefined" == typeof o.fileIcon[n] && (o.fileIcon[n] = e[n])
    }, i.pushContextMenu = function(t, e) {
        var n = function(e) {
            e.pluginId = t, "object" == typeof e && "undefined" == typeof e.length ? "string" == typeof e.title && ("file" === e.type ? (delete e.type, o.contextMenu.file.push(e)) : (delete e.type, o.contextMenu.blank.push(e)), "share" === e.product && (delete e.product, o.contextMenu.share.push(e))) : e.length && ("undefined" != typeof e[0].index && (e.index = e[0].index), "file" === e[0].type ? (delete e[0].type, o.contextMenu.file.push(e)) : (delete e[0].type, o.contextMenu.blank.push(e)))
        };
        if ("object" == typeof e && "undefined" == typeof e.length) n(e);
        else if (e.length) if (1 === e.length && "string" == typeof e[0].title) n(e);
        else for (var i = 0, u = e.length; u > i; i++) n(e[i])
    }, i.setButtonContainer = function(t) {
        if (t && t.length) {
            o.button = {};
            for (var e = 0, n = t.length; n > e; e++) o.button[t[e]] = []
        }
    }, i.getData = function() {
        return {
            "interface": o.interface,
            button: o.button,
            getButton: function(t) {
                return "string" == typeof t && o.button[t] ? o.button[t] : []
            },
            buttonMap: o.buttonMap,
            fileIcon: o.fileIcon,
            contextMenu: o.contextMenu
        }
    }, n.exports = i
});;
define("system-core:data/regedit.js", function(e, n, t) {
    var i = function(e) {
            var n = e.constructor === Array ? [] : {};
            for (var t in e) e.hasOwnProperty(t) && (n[t] = "object" == typeof e[t] ? i(e[t]) : e[t]);
            return n
        },
        l = {},
        r = {};
    l.nameHash = {}, l.otherInfo = {}, l.fileHandle = {}, l.defaultFileHandle = {}, l.plugin = {}, l.preload = [], l.autoExecute = [], l.randomID = function() {
        var e = String.fromCharCode(l.prefix++);
        return l.prefix > 90 && (l.prefix = 65), e += Math.random().toString(16).substring(3).toUpperCase()
    }, l.prefix = 65, l.handleFile = function(e, n, t) {
        if ("undefined" == typeof t) return void(l.fileHandle._ ? l.fileHandle._.push(e) : l.fileHandle._ = [e]);
        if ("string" == typeof t) {
            if ("*" === t) return void(l.fileHandle["*"] ? l.fileHandle["*"].push(e) : l.fileHandle["*"] = [e]);
            t = t.replace(/\"|\.|\*/g, "").split(",")
        }
        if ("object" == typeof t && t.length) for (var i = 0, r = t.length; r > i; i++) l.fileHandle[t[i]] ? l.fileHandle[t[i]].push(e) : l.fileHandle[t[i]] = [e], 2 != n || l.defaultFileHandle[t[i]] || (l.defaultFileHandle[t[i]] = e)
    }, l.getPluginIdsByExtension = function(e) {
        if ("object" == typeof e && e.length && "undefined" != typeof l.fileHandle[e[0]]) {
            for (var n = l.fileHandle[e[0]], t = n.length, r = 1, a = e.length; a > r; r++) {
                if ("undefined" == typeof l.fileHandle[e[r]]) {
                    n = null;
                    break
                }
                l.fileHandle[e[r]].length < t && (n = l.fileHandle[e[r]], t = t.length)
            }
            if (n) {
                n = i(n);
                for (var o = 0, u = n.length; u > o; o++) for (var f = 0, d = e.length; d > f; f++) {
                    var p = l.plugin;
                    if (-1 === p[n[o]].filesType.indexOf(e[f]) || -1 === p[n[o]].type.indexOf("2")) {
                        n.splice(o, 1), --o, u = n.length;
                        break
                    }
                }
            }
            return n
        }
        return null
    }, l.getPluginsByIds = function(e) {
        var n = [];
        if ("object" == typeof e && e.length) for (var t = 0, i = e.length; i > t; t++) n.push(l.plugin[e[t]]);
        return n
    }, r.register = function(e, n) {
        var t = l.randomID(),
            i = e.name,
            r = e.group;
        if ("string" != typeof r || "string" != typeof i) throw "[PLUGIN REGISTER ERROR] `name` and `group` for plugin " + i + " is nessary!";
        return l.nameHash[r] = l.nameHash[r] || {}, l.nameHash[r][i] = t, l.plugin[t] = {
            pluginId: t,
            name: i,
            loaded: !1,
            type: e.type,
            filesType: e.filesType,
            entranceFile: e.entranceFile
        }, l.otherInfo[t] = {
            group: r,
            depsFiles: e.depsFiles,
            description: e.description,
            version: e.version,
            supportManage: e.supportManage === !1 || "false" === e.supportManage ? !1 : !0
        }, n ? void 0 : (l.handleFile(t, e.type, e.filesType), e.preload === !0 && l.preload.push(e), e.autoExecute === !0 && l.autoExecute.push(e), t)
    }, r.getAllPlugins = function() {
        var e = [];
        for (var n in l.plugin) l.plugin.hasOwnProperty(n) && e.push(l.plugin[n]);
        return e
    }, r.getPluginById = function(e) {
        return void 0 === l.plugin[e] ? null : l.plugin[e]
    }, r.getPluginByNameAndGroup = function(e, n) {
        var t;
        if ("string" != typeof e) throw new Error("[regedit.js] The plugin name is must be a string !");
        var i = e.match(/^(.+)\@(([\w\-]+\.)+[\w\-]+)$/);
        return void 0 === n && i && (e = i[1], n = i[2]), t = l.nameHash[n] && l.nameHash[n][e], this.getPluginById(t)
    }, r.getPluginsByExtension = function(e) {
        var n = l.fileHandle["*"];
        "string" == typeof e && (e = e.replace(/\"|\.|\*/g, "").split(","));
        for (var t = l.getPluginIdsByExtension(e), i = [], r = 0, a = n.length; a > r; r++) - 1 !== l.plugin[n[r]].type.indexOf("2") && i.push(n[r]);
        return null !== t && (i = i.concat(t)), l.getPluginsByIds(i)
    }, r.getDefaultPluginIdByExtension = function(e) {
        return e = e.replace(/\"|\.|\*/g, ""), l.defaultFileHandle[e] ? l.defaultFileHandle[e] : l.fileHandle[e] && l.fileHandle[e][0]
    }, r.getOtherInfoById = function(e) {
        return void 0 === l.otherInfo[e] ? null : l.otherInfo[e]
    }, r.getAutoExecutePlugins = function() {
        return l.autoExecute
    }, r.getPreloadPlugins = function() {
        return l.preload
    }, t.exports = r
});;
define("system-core:pluginControl/loader/loader.js", function(n, e, t) {
    var i = !1,
        l = n("system-core:context/context.js"),
        o = n("system-core:data/regedit.js"),
        s = n("base:widget/libs/underscore.js"),
        u = n("system-core:system/baseService/message/message.js"),
        a = {},
        g = {};
    a.pluginContextMap = {}, a.loadDepsFilesAndEntranceFile = function(e, t) {
        var i, l = [],
            u = [],
            a = function() {
                n.async(e.entranceFile, function(n) {
                    e.loaded = !0, s.isFunction(t) === !0 && t(n)
                })
            };
        if (e.loaded === !0) a();
        else {
            if (i = o.getOtherInfoById(e.pluginId).depsFiles, "" === i || void 0 === i) return void a();
            if ("string" == typeof i) / ^ . + \.(css | less) $ / .test(i) === !0 ? l.push(i) : /^.+\.js$/.test(i) === !0 && u.push(i);
            else if ("object" == typeof i && i.length) for (var g = 0, c = i.length; c > g; g++) / ^ . + \.(css | less) $ / .test(i[g]) === !0 ? l.push(i[g]) : /^.+\.js$/.test(i[g]) === !0 && u.push(i[g]);
            0 === l.length && 0 === u.length ? a() : 0 !== l.length && 0 === u.length ? n.loadCss(l, function() {
                a()
            }) : 0 === l.length && 0 !== u.length ? n.async(u, function() {
                a()
            }) : 0 !== l.length && 0 !== u.length && n.loadCss(l, function() {
                n.async(u, function() {
                    a()
                })
            })
        }
    }, a.loadPlugin = function(n, e) {
        a.loadDepsFilesAndEntranceFile(n, function(t) {
            var i;
            if (a.pluginContextMap[n.pluginId] ? i = a.pluginContextMap[n.pluginId] : (i = new l, a.pluginContextMap[n.pluginId] = i), e && e.run && t[e.run]) {
                var o = e.run;
                delete e.run, t[o] && t[o].call(void 0, i, e, n)
            } else t.start && t.start.call(void 0, i, e, n)
        })
    }, a.initAutoExcutePlugins = function() {
        for (var n = o.getAutoExecutePlugins(), e = 0, t = n.length; t > e; e++) a.loadPlugin(n[e])
    }, a.initPreloadPlugins = function() {
        for (var n = o.getPreloadPlugins(), e = 0, t = n.length; t > e; e++) a.loadDepsFilesAndEntranceFile(n[e])
    }, a.init = function(n) {
        n && n.canAutoExecute !== !1 && (a.initAutoExcutePlugins(), setTimeout(function() {
            a.initPreloadPlugins()
        }, 1e3))
    }, u.manage(function(n, e) {
        var t, l, s;
        "string" == typeof n && n.match(/^plugin\:[A-Z0-9]+$/) ? (t = n.match(/^plugin\:([A-Z0-9]+)$/), null !== t && (t = t[1], l = o.getPluginById(t), i && console.log("[PLUGIN LOADER ERROR] can not find plugin for the id `" + t + "`"))) : "string" == typeof n && n.match(/^plugin\:.+\@([\w\-]+\.)+[\w\-]+$/) && (s = n.match(/^plugin\:(.+)$/), null !== s && (s = s[1], l = o.getPluginByNameAndGroup(s), i && console.log("[PLUGIN LOADER ERROR] can not find plugin for the name `" + s + "`"))), l && a.loadPlugin(l, e)
    }), u.listen("manage-plugin", function() {
        n.async("system-core:pluginControl/manage/manage.js", function(n) {
            n.show()
        })
    }), g.init = function(n) {
        a.init(n || {})
    }, t.exports = g
});;
define("system-core:pluginControl/register/register.js", function(e, n, t) {
    var r = e("system-core:data/faceData.js"),
        o = e("system-core:data/regedit.js"),
        i = e("base:widget/storage/storage.js"),
        a = e("base:widget/tools/tools.js"),
        u = window.manifest,
        c = {},
        s = {};
    c.conf = {}, c.browser = function() {
        return a.client().browserString
    }(), c.initInterfacePosition = function(e) {
        r.pushInterfacePosition(e.pluginId, e.interface)
    }, c.initButtonFuntion = function(e) {
        var n = e.buttons;
        if (!n) throw new Error("[Plugin declare error] [Button Plugin]: The buttons of " + e.name + " is must !");
        if ("object" != typeof n && $.isArray(n) === !1) throw new Error("[Plugin declare error] [Button Plugin]: The buttons of " + e.name + " must be an object or array !");
        r.pushButtonFuntion(e.pluginId, e.buttons, e.filesType, e)
    }, c.initFileHandle = function(e) {
        if (e.filesIcon) {
            var n = e.filesIcon;
            if ("object" != typeof n) throw new Error("[Plugin declare error] [FileHandle Plugin]: The filesIcon of " + e.name + " must be an object !")
        }
        r.pushFileHandle(e.pluginId, e.filesIcon)
    }, c.initContextMenu = function(e) {
        r.pushContextMenu(e.pluginId, e.contextMenu)
    }, c.initEmptyPlugin = function() {}, c.checkUtil = function() {
        var e = {};
        return e.checkName = function(e) {
            if (!e) throw new Error("[Plugin declare error]: The name of plugin is must !");
            if ("string" != typeof e) throw new Error("[Plugin declare error]: The name of plugin must be a string !")
        }, e.checkType = function(e) {
            var n = e.type;
            if ("undefined" == typeof n || null === n) throw new Error("[Plugin declare error]: The type of plugin is must !");
            if ("string" != typeof n && "number" != typeof n && ("object" != typeof n || void 0 === n.length)) throw new Error("[Plugin declare error]: The type of ` " + e.name + " must be an string or array !")
        }, e.checkEntanceFile = function(e) {
            var n = e.entranceFile;
            if (!n) throw new Error("[Plugin declare error]: The entranceFile of " + e.name + " is must !");
            if ("string" != typeof n) throw new Error("[Plugin declare error]: The entranceFile of " + e.name + " must be a string !")
        }, e.checkVersion = function(e) {
            var n = /^\d{1,2}\.\d{1,2}$/,
                t = /^\d{1,2}\.\d{1,2}\.\d{1,2}$/,
                r = e.version;
            if (n.test(r) !== !0 && t.test(r) !== !0) throw new Error("[Plugin declare error]: The version of ` " + e.name + " must like 88.88 or 88.88.88 !")
        }, e.checkBoolean = function(e, n) {
            if ("boolean" != typeof e[n]) throw new Error("[Plugin declare error]: The " + n + " of ` " + e.name + " must be a boolean !")
        }, e
    }(), c.initPlugin = function(n) {
        if (n) {
            var t = c.checkUtil;
            if (i) {
                var r = i.getItem("pan_plugin_cursor");
                if (r === n.cursor) return
            }
            for (var a = 0, u = n.length; u > a; a++) {
                var s = n[a];
                if (t.checkName(s.name), t.checkType(s), "string" == typeof s.notSupport) {
                    var l = c.browser.match(/[a-zA-Z]+/);
                    if (l && (l = new RegExp("(^|,)" + l[0] + "(,|$)")), -1 !== s.notSupport.indexOf(c.browser) || l.test(s.notSupport)) continue
                }
                s.version && t.checkVersion(s), s.preload && t.checkBoolean(s, "preload"), s.autoExecute && t.checkBoolean(s, "autoExecute");
                var f = !1;
                if ("false" === i.getItem("plugin-" + s.name + "-" + s.group) && (f = !0), /^\-\d$/.test(s.type) === !1) {
                    var g = o.register(s, f);
                    s.pluginId = g
                }
                if (!f) {
                    var p = "string" == typeof s.type ? s.type.split(",") : s.type;
                    if (p.length) for (var h = 0, d = p.length; d > h; h++) {
                        var m = +p[h];
                        switch (m) {
                            case 0:
                                c.initInterfacePosition(s);
                                break;
                            case 1:
                                c.initButtonFuntion(s);
                                break;
                            case -2:
                            case 2:
                                c.initFileHandle(s);
                                break;
                            case 3:
                                c.initEmptyPlugin(s);
                                break;
                            default:
                                throw new Error("[register] The manifest.json of plugin must has type!")
                        }
                    }
                    "object" == typeof s.contextMenu && c.initContextMenu(s)
                }
            }
            e.async("system-core:pluginControl/loader/loader.js", function(e) {
                e.init(c.conf)
            })
        }
    }, s = {
        setButtonContainer: function(e) {
            e && e.length && r.setButtonContainer(e)
        },
        getFaceData: function() {
            return r.getData()
        },
        getPluginData: function() {
            return o
        },
        init: function(e) {
            c.conf = e || {}, c.initPlugin(u)
        }
    }, t.exports = s
});;
define("system-core:pluginControl/manage/manage.js", function(e, t, a) {
    var i = (e("system-core:data/faceData.js"), e("system-core:data/regedit.js")),
        s = e("base:widget/libs/jquerypacket.js"),
        n = e("base:widget/storage/storage.js"),
        l = (e("base:widget/tools/tools.js"), e("system-core:context/context.js").instanceForSystem),
        o = {
            config: {
                dialog: null
            },
            node: {},
            templ: {},
            uiEvent: function() {
                o.config.dialog.delegate(".operate", "click", function() {
                    var e = s(this).siblings(".title").data("name"),
                        t = s(this).siblings(".title").data("group");
                    s(this).hasClass("enable") ? (n.setItem("plugin-" + e + "-" + t, "false"), s(this).closest(".one-plugin").addClass("enable-false"), s(this).removeClass("enable").addClass("disable").text("启用")) : (n.removeItem("plugin-" + e + "-" + t), s(this).closest(".one-plugin").removeClass("enable-false"), s(this).removeClass("disable").addClass("enable").text("禁用"))
                })
            },
            util: {
                getPluginInfo: function() {
                    var e = i.getAllPlugins();
                    return e
                },
                storeStorage: function() {},
                getContent: function() {
                    for (var e = '<div class="attention">注意：设置后刷新浏览器起效</div><ul class="all-plugins">', t = o.util.getPluginInfo(), a = 0, s = t.length; s > a; a++) {
                        var l = i.getOtherInfoById(t[a].pluginId);
                        if (l.supportManage !== !1) {
                            var g = !0;
                            "false" === n.getItem("plugin-" + t[a].name + "-" + l.group) && (g = !1), e += '<li class="one-plugin enable-' + g + '">', e += '<div class="title" data-group="' + l.group + '" data-name="' + t[a].name + '">' + t[a].name + "</div>", e += '<div class="desc">' + l.description + "</div>", e += g ? '<a class="operate enable" href="javascript:;">禁用</a>' : '<a class="operate disable" href="javascript:;">启用</a>', e += "</li>"
                        }
                    }
                    return e += "</ul>"
                },
                initData: function() {
                    o.config.dialog = l.ui.window({
                        id: "plugin-manage",
                        title: "插件管理器",
                        width: 600,
                        height: "60%",
                        body: o.util.getContent()
                    })
                }
            },
            init: function() {
                this.util.initData(), this.uiEvent()
            }
        },
        g = {
            show: function() {
                o.config.dialog.show()
            },
            hide: function() {
                o.config.dialog.hide()
            }
        };
    o.init(), a.exports = g
});;
define("system-core:system/baseService/message/message.js", function(e, t, s) {
    var n = e("base:widget/libs/underscore.js"),
        i = "quota-change",
        r = function() {
            this.events = {}
        };
    r.prototype = {
        constructor: r,
        _define: function(e) {
            "string" == typeof e && (this.exist(e) || (this.events[e] = {
                handlers: []
            }))
        },
        exist: function(e) {
            return this.events[e] ? !0 : !1
        },
        listen: function(e, t) {
            if ("string" != typeof e) throw new Error("[message] The eventName must be a string !");
            this.exist(e) || this._define(e), "function" == typeof t && this.events[e].handlers.push(t)
        },
        remove: function(e) {
            this.exist(e) && (this.events[e].handlers = [])
        },
        trigger: function() {
            var e = /^plugin\:.+$/;
            return function(t) {
                if (e.test(t) === !0) return void r.doPlugins(t);
                if (this.exist(t) === !1) return void r.doPlugins(arguments);
                for (var s = this.events[t].handlers, n = [].slice.call(arguments, 1), i = 0, o = s.length; o > i; i++) s[i].apply(void 0, n)
            }
        }(),
        callPlugin: function(e, t) {
            if ("string" != typeof e) throw new Error("[message] The pluginName must be a string !");
            r.trigger("plugin:" + e, t)
        },
        callSystem: function(e, t) {
            if ("string" != typeof e) throw new Error("[message] The systemServiceName must be a string !");
            r.trigger(e, t)
        },
        listenSystem: function(e, t) {
            if ("string" != typeof e || -1 === i.indexOf(e)) throw new Error("[message] Permission denied or the event name is error!");
            r.listen(e, t)
        }
    }, n.extend(r, r.prototype, {
        events: {},
        pluginHandlers: [],
        checkFormatKey: function(e) {
            var t, s;
            if (/_/g.test(e) === !0) throw new Error('[message.define] the key should not use "_"');
            if (/-/g.test(e) === !1) throw new Error('[message.define] the key should use "moduleName-method[-method[-method]]"');
            if (t = e.split("-"), s = t.shift(), /^[a-zA-Z]+$/.test(s) === !1) throw new Error('[message.define] the key should use "moduleName-method[-method[-method]]"');
            for (var n = 0, i = t.length; i > n; n++) if (/^[a-z]+$/.test(t[n]) === !1) throw new Error('[message.define] the key should use "moduleName-method[-method[-method]]"');
            return !0
        },
        doPlugins: function(e) {
            var t = this.pluginHandlers;
            if (0 !== t.length) for (var s = 0, n = t.length; n > s; s++) t[s].apply(void 0, e)
        },
        trigger: function(e) {
            if (this.exist(e) === !1) return void this.doPlugins(arguments);
            for (var t = this.events[e].handlers, s = [].slice.call(arguments, 1), n = 0, i = t.length; i > n; n++) t[n].apply(void 0, s)
        },
        manage: function(e) {
            "function" == typeof e && this.pluginHandlers.push(e)
        }
    }), s.exports = r
});;
define("system-core:system/uiService/log/log.js", function(require, exports, module) {
    function Log(e) {
        var e = e || {};
        this.url = e.url || "/api/analytics", this.logObjectName = e.logObjectName || "fe_log_", this.sendBaseParamTag = !0, this.baseParam = {
            clienttype: 0,
            vmode: null,
            searchForm: null
        }, this.UrlLength = 900, this.data = null, this.eventData = {}, this.ajaxData = {}, this.mixData = {}, this.init()
    }
    var $ = require("base:widget/libs/jquerypacket.js"),
        tools = require("base:widget/tools/tools.js");
    Log.mid = 1, Log.globalInit = 0, Log.prototype = {
        init: function() {
            var e = this;
            $(document).ajaxComplete(function(t, a, o) {
                e._ajaxCallback(t, o, a)
            })
        },
        getParameter: function(e) {
            var t = RegExp("[?&]" + e + "=([^&]*)").exec(window.location.hash);
            return t && decodeURIComponent(t[1].replace(/\+/g, " "))
        },
        hasParameter: function(e) {
            return -1 === window.location.hash.indexOf(e) ? !1 : !0
        },
        _addMid: function(e, t) {
            return "[object object]" === Object.prototype.toString.call(e).toLowerCase() ? (e.mid = t || 1, e) : "[object string]" === Object.prototype.toString.call(e).toLowerCase() ? {
                name: e,
                mid: t || 1
            } : void 0
        },
        _checkLogExist: function(e) {
            if (e && "[object object]" !== Object.prototype.toString.call(e).toLowerCase()) throw new Error("[Log declare error]: The data of log must be a object !");
            if (e.name) {
                var t = e.name || "";
                return this.mixData[t] ? !0 : !1
            }
            throw new Error("[Log declare error]: The name of log must !")
        },
        _checkData: function(e) {
            if (e && "[object object]" !== Object.prototype.toString.call(e).toLowerCase()) throw new Error("[Log declare error]: The data of log must be a object !")
        },
        _sendServerLog: function(e) {
            var t, a = e.url || this.url,
                o = (new Date).getTime(),
                n = {};
            if (this.sendBaseParamTag) for (t in this.baseParam) n[t] = "function" == typeof this.baseParam[t] ? this.baseParam[t]() : this.baseParam[t];
            var i = {
                version: "v5"
            };
            for (t in e)"type" === t && (e[t] = e[t].replace(/\-/g, "_")), "url" !== t && (i[t] = "function" == typeof e ? e[t]() : e[t]);
            for (var r = this._getRequestUrl(o, a, n, i), s = 0, l = r.length; l > s; s++) this._request(o, s, r[s])
        },
        _request: function(e, t, a) {
            var o = this.logObjectName + "_" + e + "_" + t;
            window[o] = new Image;
            var n = window[o];
            n.onload = n.onerror = function() {
                window[o] = null
            }, n.src = a, n = null
        },
        _getRequestUrl: function(e, t, a, o) {
            var n, i = [],
                r = [];
            if (a) {
                a.vmode = this.getParameter("vmode"), a.searchForm = this.hasParameter("search/key");
                for (n in a) r.push(n + "=" + a[n])
            }
            r = r.join("&"), r = "" === r ? "" : "&" + r;
            var s = t + "?_lsid=" + e + "&_lsix=1" + r,
                l = 1;
            for (n in o) if ("[object Array]" === Object.prototype.toString.apply(o[n])) {
                for (var c = o[n], u = [], d = s.length + n.length + 2, g = 0, p = c.length; p > g; g++) d += c[g].length + 1, d > this.UrlLength ? (i.push(s + "&" + n + "=" + u.join()), l++, u = [], d = s.length + n.length + 2, s = t + "?_lsid=" + e + "&_lsix=" + l + r, g--) : u.push(c[g]);
                u.length > 0 && (s += "&" + n + "=" + u.join())
            } else s.length + n.length > this.UrlLength && (i.push(s), l++, s = t + "?_lsid=" + e + "&_lsix=" + l + r), s += "&" + n + "=" + o[n];
            return i.push(s), i
        },
        _ajaxCallback: function(e, conf, data) {
            var $self = this,
                conf = conf || {},
                data = data || {},
                httpStatus, responseData = {},
                url = conf.url,
                result = {},
                time = 0,
                sendServerLog = !1,
                endTime = (new Date).getTime(),
                configItem, value;
            for (var i in $self.ajaxData) if (url.indexOf(i) > -1) {
                url = i;
                break
            }
            configItem = $self.ajaxData[url], configItem && (httpStatus = data.status, "[object string]" === Object.prototype.toString.call(data.responseText).toLowerCase() ? responseData = $.parseJSON(data.responseText) ? $.parseJSON(data.responseText) : eval("(" + data.responseText + ")") : "[object object]" === Object.prototype.toString.call(data.responseText).toLowerCase() && (responseData = data.responseText), e.timeStamp && endTime > e.timeStamp && (time = endTime - e.timeStamp), configItem.callback && (result = configItem.callback(conf, {
                httpStatus: httpStatus,
                responseData: responseData,
                time: time
            }), $self._sendLogData(configItem.logType, result)))
        },
        sendDpTimeLog: function(e) {
            var e = e || {},
                t = e.name || "default",
                a = {},
                o = window.alog ||
                    function() {};
            a["z_" + t] = e.value || "", o && "[object function]" === Object.prototype.toString.call(o).toLowerCase() && o("cus.fire", "time", a)
        },
        sendDpDisLog: function(e) {
            var e = e || {};
            "[object array]" !== Object.prototype.toString.call(e).toLowerCase() && (e = [e]);
            for (var t = window.alog ||
                function() {}, a = 0, o = e.length; o > a; a++) {
                var n = e[a],
                    i = n.name || "default",
                    r = {};
                r["z_" + i] = n.value || "", t("cus.fire", "dis", r)
            }
        },
        sendBaiduLog: function(e, t) {
            var e = e || {},
                a = window._hmt || [];
            if ("object" == typeof a) if ("[object string]" === Object.prototype.toString.call(e).toLowerCase()) a.push(["_trackEvent", e, t ? e + t : ""]);
            else if ("[object object]" === Object.prototype.toString.call(e).toLowerCase() && "pageView" === e.name) a.push(["_trackPageview", e.value]);
            else if ("[object array]" === Object.prototype.toString.call(e.value).toLowerCase()) {
                var o = ["_trackEvent", e.name];
                o.push(e.value[0] ? e.name + "-" + e.value[0] : ""), o.push(e.value[1] ? e.name + "-" + e.value[1] : ""), o.push(e.mid), a.push(o)
            } else if ("[object object]" === Object.prototype.toString.call(e.value).toLowerCase()) {
                var o = ["_trackEvent", e.name],
                    n = 0,
                    i = [];
                for (var r in e.value) e.value.hasOwnProperty(r) && ("name" !== r || "mid" !== r) && 2 > n && (n++, i.push(e.value[r]));
                null != i[0] && o.push(e.name + "-" + i[0]) && null != i[1] && o.push(e.name + "-" + i[0] + "-" + i[1]), o.push(e.mid), a.push(o)
            } else {
                var o = ["_trackEvent", e.name];
                o.push(e.value ? e.name + "-" + e.value : ""), o.push("default"), o.push(e.mid), a.push(o)
            }
        },
        sendUserReport: function(e) {
            var t = "/api/report/user";
            $.ajax(t, {
                type: "POST",
                data: {
                    timestamp: Math.round(new Date / 1e3),
                    action: tools.getParam("from") || e || "web_home"
                }
            })
        },
        _sendCountTypeLog: function(e) {
            var e = e || {};
            if (e.sendServerLog !== !1) {
                var t = {
                    type: e.name,
                    url: e.url
                };
                if ("[object array]" === Object.prototype.toString.call(e.value).toLowerCase()) t.value = e.value[0];
                else if ("[object object]" === Object.prototype.toString.call(e.value).toLowerCase()) for (var a in e.value)!e.value.hasOwnProperty(a) || "name" === a && "mid" === a || (t[a] = e.value[a]);
                else t.value = e.value;
                this._sendServerLog(t)
            }
            this.sendBaiduLog(e)
        },
        _sendLogData: function(e, t) {
            var t = t || {},
                e = e || "count";
            "count" === e ? this._sendCountTypeLog(t) : "time" === e ? this.sendDpTimeLog(t) : "dis" === e && this.sendDpDisLog(t)
        },
        _eventHandle: function(e) {
            var t, a, o = this;
            this._checkData(e);
            for (var n in e) e.hasOwnProperty(n) && (t = e[n], e[n].mid = ++Log.mid, o.eventData[n] = t, a = t.parentDom || $("body"), a instanceof $ ? a = a : "string" == typeof a && (a = $(a)), t.eventType || (t.eventType = "click"), function(e) {
                "click" === e.eventType ? a.delegate(n, "mousedown", function(t) {
                    e.posX = t.clientX, e.posY = t.clientY
                }).delegate(n, "mouseup", function(t) {
                    if (e.posX === t.clientX && e.posY === t.clientY && e.callback) {
                        var a = e.callback(t, $);
                        a = o._addMid(a, e.mid), o._sendLogData(e.logType, a)
                    }
                }) : a.delegate(n, e.eventType, function(t) {
                    if (e.callback) {
                        var a = e.callback(t, $);
                        a = o._addMid(a, e.mid), o._sendLogData(e.logType, a)
                    }
                })
            }(t))
        },
        arrjaxHandle: function(e) {
            var t, a = this;
            this._checkData(e);
            for (var o in e) e.hasOwnProperty(o) && (t = e[o], e[o].mid = ++Log.mid, a.ajaxData[o] = t)
        },
        _mixHandle: function(e) {
            var t, a = this;
            this._checkData(e);
            for (var o in e) e.hasOwnProperty(o) && (t = e[o], e[o].mid = ++Log.mid, a.mixData[o] = t)
        },
        initDataHandle: function(e, t) {
            var a = this,
                e = e;
            "[object array]" !== Object.prototype.toString.call(e).toLowerCase() && (e = [e]);
            for (var o = 0, n = e.length; n > o; o++) {
                var i = e[o];
                "global" === t && 1 === Log.globalInit ? a._mixHandle(i.mix) : (a._eventHandle(i.event), a.arrjaxHandle(i.ajax), a._mixHandle(i.mix))
            }
            "global" === t && (Log.globalInit = 1)
        },
        send: function(e) {
            if (e.type) this._sendServerLog(e);
            else if (this._checkLogExist(e)) {
                var t = this._addMid(e, this.mixData[e.name].mid);
                this._sendLogData(this.mixData[e.name].logType, t)
            }
        },
        add: function(e) {
            this.initDataHandle(e)
        },
        define: function(e, t) {
            this.data || (this.data = e, this.initDataHandle(this.data, t))
        }
    }, Log.instanceForSystem = new Log, window.logConfigs = window.logConfigs || [], window.logConfigs.push({
        mix: {
            apilistCache: {
                logType: "count",
                description: "apilist接口命中缓存"
            },
            apilistRequest: {
                logType: "count",
                description: "apilist接口请求次数"
            }
        }
    }, {
        event: {},
        ajax: {},
        mix: {
            buttonBoxCreate: {
                logType: "time",
                description: "buttonBox从创建到展现的时间"
            },
            buttonClick: {
                logType: "count",
                description: "所有的按钮统计"
            }
        }
    }, {
        event: {},
        ajax: {},
        mix: {
            buttonCreate: {
                logType: "time",
                description: "button从创建到展现的时间"
            },
            buttonHover: {
                logType: "time",
                description: "button状态变化的时间"
            }
        }
    }, {
        mix: {
            listAllSel: {
                logType: "time",
                description: "列表全选响应时间统计"
            },
            listInitTime: {
                logType: "time",
                description: "列表初始化时间统计"
            },
            listScrollTime: {
                logType: "time",
                description: "列表滚动响应时间统计"
            },
            listAllSelCount: {
                logType: "count",
                description: "列表全选次数"
            }
        }
    }, {
        event: {},
        ajax: {},
        mix: {
            tipShow: {
                logType: "time",
                description: "tip展现时间"
            }
        }
    }), window.logConfigs && Log.instanceForSystem.define(window.logConfigs, "global"), module.exports = Log
});;
define("system-core:system/uiService/button/button.js", function(t, n, i) {
    var e = t("base:widget/libs/jquerypacket.js"),
        o = t("base:widget/libs/underscore.js"),
        s = t("base:widget/tools/tools.js"),
        a = t("system-core:system/uiService/log/log.js").instanceForSystem,
        d = (s.client().browserString, function(t) {
            d._length++, this.startTime = (new Date).getTime(), this.dom = null, this.width = 0, this.height = 0, this.container = null, this.menu = {}, this.menuLength = 0, this.id = "b" + d._length++, this.type = t.type || "default", this.config = t, this.config.buttonDefaultConfig = t.buttonDefaultConfig || {}, this._init()
        });
    d._map = {}, d._length = 0, d._secondMenuCallbacks = {}, d.getButton = function(t) {
        return d._map["b" + t] ? d._map["b" + t] : null
    }, d.TPL = o.template('<a class="g-button<%- tips ? \' g-button-hastips\' : ""%>" data-button-id="<%- id %>" data-button-index="<%- index %>" href="<%- link %>" ><span class="g-button-right"><% if (typeof icon !== "undefined") { %><em class="icon <%- icon %>" title="<%- tips ? "" : title %>"></em><% } %><span class="text"><%- title %></span></span><% if (tips !== "") { %><span class="g-button-tips"><%- tips%></span><% } %></a>'), d.prototype = {
        constructor: d,
        _init: function() {
            this._initUserEvent(), this._renderButton(), d._map[this.id] = this
        },
        _renderButton: function() {
            var t = "javascript:void(0);";
            /^(\/|(https?\:\/\/)?(([a-zA-Z0-9]|[\.\-])+){1,3}(cn|com|co|io|gov|org|tv|hk|tw|me))\/?/i.test(this.config.link) && (t = this.config.link);
            var n = {
                    title: this.config.title || "",
                    icon: this.config.icon,
                    id: this.id,
                    index: this.config.index,
                    link: t,
                    tips: this.config.tips || ""
                },
                i = d.TPL(n);
            if ("dropdown" === this.type) {
                var o = '<span class="g-dropdown-button"></span>';
                if (this.dom = e(o), this.dom.append(i), this.dom.menu = e('<span class="menu"></span>'), this.dom.append(this.dom.menu), this.dom.mainButton = this.dom.find(".g-button"), "object" == typeof this.config.menu && this.config.menu.length) {
                    var s = this._renderMenuList(this.config.menu);
                    this.dom.menu.append(s)
                }
            } else this.dom = e(i), this.dom.mainButton = this.dom;
            var u = this._caulateClassName();
            this.dom.mainButton.addClass(u), this._initSizeAndPosition(), this._initDomEvent(), this.isShow = !0, this.isEnable = !0, "none" === this.config.display && (this.dom[0].style.display = "none", this.isShow = !1);
            var h = (new Date).getTime() - this.startTime;
            a.send({
                name: "buttonCreate",
                value: h
            })
        },
        _initSizeAndPosition: function() {
            "left" === this.config.position ? this.dom.css("float", "left") : "right" === this.config.position && this.dom.css("float", "right");
            var t = 0,
                n = 0;
            this.dom.mainButton.find(".text").width("undefined" != typeof this.config.textWidth ? this.config.textWidth : "auto"), "undefined" != typeof this.config.iconMarginRight && this.dom.mainButton.find(".icon").css("margin-right", this.config.iconMarginRight);
            var i = this.dom.mainButton;
            this.config.padding instanceof Array && 2 === this.config.padding.length && (t = this.config.padding[0], n = this.config.padding[1], i.css("padding-left", t), i.find(".g-button-right").css("padding-right", n)), "string" == typeof this.config.margin && i.css("margin", this.config.margin)
        },
        _renderMenuOne: function(t) {
            var n = "b-menu" + this.menuLength++;
            this.menu[n] = t;
            var i = "",
                e = "",
                o = "";
            if ("none" === t.display && (e = ' style="display:none;"'), "function" == typeof t.display && (o = t.display()), t.symLink && t.symLink.config && "dropdown" === t.symLink.config.type && t.symLink.config.multiMenu) {
                t.symLink.config.menuLevel = 2;
                var s = new d(t.symLink.config);
                s.dom.addClass("g-dropdown-button-second"), s.dom.attr("menuLevel", 2);
                var a = s.dom[0].outerHTML;
                return s.id && t.symLink.config.menu && (d._secondMenuCallbacks[s.id] = t.symLink.config.menu), a = "<span" + e + ' data-menu-id="' + n + '" class="g-button-menu g-menu-hasIcon">' + a + "</span>"
            }
            return "string" == typeof t.icon ? (i = '<em class="icon ' + t.icon + '"></em>', "<a" + e + ' data-menu-id="' + n + '" class="g-button-menu g-menu-hasIcon" href="javascript:void(0);">' + i + t.title + "</a>") : t.symLink && t.symLink.config.buttonClass && t.symLink.config.filesType ? "<a" + e + ' data-menu-id="' + n + '" data-excludetype="' + t.symLink.config.filesType + '"  class="g-button-menu ' + t.symLink.config.buttonClass + '" href="javascript:void(0);">' + t.title + "</a>" : t.symLink && t.symLink.config.buttonClass && t.symLink.config.excludeDirType ? "<a" + e + ' data-menu-id="' + n + '" data-excludedir="' + t.symLink.config.excludeDirType + '"  class="g-button-menu ' + t.symLink.config.buttonClass + '" href="javascript:void(0);">' + t.title + "</a>" : "<a " + e + ' data-menu-id="' + n + '" class="g-button-menu ' + o + '" href="javascript:void(0);">' + t.title + "</a>"
        },
        _renderMenuList: function(t, n) {
            var i = "";
            if ("object" == typeof t) {
                if (t.length) for (var o = 0, s = t.length; s > o; o++) i += this._renderMenuOne(t[o])
            } else i = this._renderMenuOne(t);
            return n && e(n).html(i), i
        },
        _initDomEvent: function() {
            this.dom.undelegate();
            var t = this,
                n = (e(this.dom), function(n) {
                    var i = (new Date).getTime();
                    if (t.onMouseEnter(), "dropdown" === t.type) {
                        t.onBeforeOpen() !== !1 && t.dom.addClass("button-open"), "function" == typeof t.config.menu && t.config.menu(t.dom.menu, function(n) {
                            t._renderMenuList(n, t.dom.menu), t.config.resize === !0 && t.resizeButtonWidth()
                        });
                        var o = e(n.currentTarget);
                        if (o.length && o.parent().hasClass("g-dropdown-button-second")) {
                            var s = o.attr("data-button-id"),
                                u = d._secondMenuCallbacks[s],
                                h = o.parent().find(".menu");
                            o.parent().addClass("button-open"), "function" == typeof u && u(h, function(n) {
                                t._renderMenuList(n, h), t.config.resize === !0 && t.resizeButtonWidth()
                            })
                        }
                        e(this).hasClass("g-button-hastips") && e(".g-button-tips").css({
                            visibility: "visible"
                        });
                        var r = (new Date).getTime() - i;
                        a.send({
                            name: "buttonHover",
                            value: r
                        })
                    }
                }),
                i = function(n) {
                    t.onMouseLeave(), e(this).hasClass("g-button-hastips") && e(".g-button-tips").css({
                        visibility: "hidden"
                    });
                    var i = n.currentTarget;
                    t.menuHideTimeout = setTimeout(function() {
                        var t = e(i),
                            n = t.parent().attr("menuLevel");
                        t.length && t.parent().hasClass("g-dropdown-button-second") && 2 === +n && t.parent().removeClass("button-open")
                    }, 100)
                },
                o = function() {
                    t.isEnable && t.onClick()
                };
            this.dom.bind("mouseleave", function() {
                "dropdown" === t.type && t.onBeforeClose() !== !1 && t.dom.removeClass("button-open")
            }).bind("mouseenter", n).bind("mouseleave", i).bind("click", o).delegate(".g-button", "mouseenter", n).delegate(".g-button", "mouseleave", i).delegate(".g-button", "click", o).delegate(".g-button-menu", "click", function(n) {
                if (n.stopPropagation(), !e(this).hasClass("g-disabled")) {
                    var i = e(this).data("menu-id"),
                        o = t.menu[i];
                    o && "function" == typeof o.click && o.click()
                }
            }).delegate("g-dropdown-button-second", "mouseleave", function() {
                "dropdown" === t.type && t.onBeforeClose() !== !1 && t.dom.removeClass("button-open")
            }).delegate(".menu", "mouseenter", function(n) {
                var i = e(n.currentTarget);
                i.length && i.parent().hasClass("g-dropdown-button-second") && t.menuHideTimeout && clearTimeout(t.menuHideTimeout)
            }).delegate(".menu", "mouseleave", function(t) {
                var n = e(t.currentTarget);
                n.length && n.parent().hasClass("g-dropdown-button-second") && n.parent().removeClass("button-open")
            })
        },
        _initUserEvent: function() {
            "function" == typeof this.config.click && (this.onClick = this.config.click), "function" == typeof this.config.mouseEnter && (this.onMouseEnter = this.config.mouseEnter), "function" == typeof this.config.mouseLeave && (this.onMouseLeave = this.config.mouseLeave), "function" == typeof this.config.beforeOpen && (this.onBeforeOpen = this.config.beforeOpen), "function" == typeof this.config.beforeClose && (this.onBeforeClose = this.config.beforeClose), "function" == typeof this.config.visibleChange && (this.onVisibleChange = this.config.visibleChange), "dropdown" !== this.type ? (this.onBeforeOpen = null, this.onBeforeClose = null) : this.onBeforeOpen = this.onBeforeClose = function() {}
        },
        _caulateClassName: function() {
            var t = "",
                n = this.config.color;
            return t = "big" === this.type ? n ? "g-button-" + n + "-large" : "g-button-large" : n ? "g-button-" + n : ""
        },
        appendTo: function(t) {
            return t = e(t), t.append(this.dom), this.resizeButtonWidth(), this.container = t, this
        },
        resizeButtonWidth: function() {
            if ("dropdown" === this.type) {
                for (var t, n = this.dom.menu[0].children, i = 0, o = this.dom.outerWidth(), s = 0, a = n.length; a > s; s++) t = d.caculateDropButtonWidth(e(n[s]), this.config), i < t.width && (i = t.width), this.dom.menu.width(i - 2), this.width = i, this.height = t.height;
                t = d.caculateDropButtonWidth(null, this.config), i < t.width && (i = t.width), o > i && (i = o), this.dom.menu.width(i - 2), this.width = i, this.height = t.height
            } else {
                var t = d.caculataButtonWidth(this.config);
                this.width = t.width, this.height = t.height
            }
        },
        change: function(t, n) {
            if (this.config = e.extend(this.config, t), t.type && t.type !== this.type || n) {
                var i = this.dom;
                this.type = t.type, this._init(), i.after(this.dom).remove(), this.resizeButtonWidth(), i = null
            } else {
                this.dom.mainButton.attr("class", "g-button " + this._caulateClassName());
                var o = this.dom.mainButton.find(".icon");
                o.length && !this.config.icon ? o.remove() : 0 === o.length && this.config.icon ? this.dom.mainButton.prepend('<em class="icon ' + this.config.icon + '"></em>') : o.length && o.attr("class", "icon " + this.config.icon), this.dom.mainButton.find(".text").text(this.config.title), this._initSizeAndPosition()
            }
            return this
        },
        addToMenu: function(t, n) {
            if ("dropdown" === this.type) {
                "object" != typeof t || t.length || (t = [t]);
                var i = this._renderMenuList(t)
            }
            return 0 === n ? this.dom.menu.prepend(i) : this.dom.menu.append(i), this.config.resize === !0 && this.resizeButtonWidth(), this
        },
        triggerClick: function(t) {
            this.isEnable && this.onClick(t)
        },
        removeFromMenu: function(t) {
            var n = e(this.dom.menu.find(".g-button-menu")[t]),
                i = n.data("menu-id");
            return n.remove(), delete this.menu[i], this.config.resize === !0 && this.resizeButtonWidth(), this
        },
        getMenuDom: function(t) {
            return "dropdown" === this.type ? e(this.dom.menu.find(".g-button-menu")[t]) : null
        },
        menuShow: function(t, n) {
            if ("dropdown" === this.type) {
                var i = e(this.dom.menu.find(".g-button-menu")[t]);
                return n === !1 ? i.hide() : i.css("display", "block"), this.config.resize === !0 && this.resizeButtonWidth(), i
            }
            return null
        },
        menuDisable: function(t, n) {
            if ("dropdown" === this.type) {
                var i = e(this.dom.menu.find(".g-button-menu")[t]);
                return n === !1 ? i.removeClass("g-disabled") : i.addClass("g-disabled")
            }
            return null
        },
        hide: function() {
            return this.dom.hide(), this.isShow = !1, this
        },
        show: function() {
            return this.dom.css("display", "inline-block"), this.isShow = !0, this
        },
        disable: function(t) {
            return t === !1 ? (this.dom.removeClass("g-disabled"), this.isEnable = !0) : (this.dom.addClass("g-disabled"), this.isEnable = !1), this
        },
        onClick: function() {},
        onMouseEnter: function() {},
        onMouseLeave: function() {},
        onBeforeOpen: function() {},
        onBeforeClose: function() {},
        onVisibleChange: function() {}
    }, d.caculataButtonWidth = function(t) {
        var n = 2,
            i = t.title,
            e = t.icon,
            o = t.iconMarginRight,
            s = t.padding,
            a = t.textWidth;
        return n += a ? parseInt(a, 10) + 4 : 13 * i.length + 4, "string" == typeof e && (n += "undefined" != typeof o ? 20 + parseInt(o, 10) : 20), n += s ? parseInt(s[0], 10) + parseInt(s[1], 10) : 20, {
            width: n,
            height: 33
        }
    }, d.caculateDropButtonWidth = function(t, n) {
        var i = 2,
            e = n.title,
            o = n.icon,
            s = n.iconMarginRight,
            a = n.padding,
            d = n.textWidth,
            u = n.buttonDefaultConfig.paddingLeft,
            h = n.buttonDefaultConfig.paddingRight,
            r = n.buttonDefaultConfig.paddingHeight;
        return t ? "none" !== t.css("display") ? (i += t.hasClass("g-button-menu") && t.find(".g-dropdown-button-second").length > 0 ? 12 * t.find("a.g-button").text().length : 12 * t.text().length, i += a ? parseInt(a[0], 10) + parseInt(a[1], 10) : 24) : i = 0 : (i += d ? parseInt(d, 10) : 12 * e.length, "string" == typeof o && (i += "undefined" != typeof s ? 20 + parseInt(s, 10) : 24), i += a ? parseInt(a[0], 10) + parseInt(a[1], 10) : u && h ? u + h : 30), {
            width: i,
            height: r || 34
        }
    }, i.exports = d
});;
define("system-core:system/uiService/dialog/dialog.drag.js", function(e, o, a) {
    var i = e("base:widget/libs/jquerypacket.js"),
        t = {
            dialogs: {},
            getDialogById: function(e) {
                return this.dialogs[e]
            },
            hasBind: !1,
            events: function() {
                var e, o, a, d, n, s = this,
                    g = !1,
                    l = !1,
                    r = function(t) {
                        if (e) {
                            var s = i(window).scrollTop();
                            i.browser.msie && "6.0" === i.browser.version && !i.support.style && (s = 0);
                            var g = (e.dialogHeight + t.pageY - a, e.dialogWidth + t.pageX - o),
                                r = t.pageY - a - s < 0 ? 0 : t.pageY - a - s,
                                f = t.pageX - o < 0 ? 0 : t.pageX - o;
                            g > n && (f = n - e.dialogWidth), r > d - 15 && (r = d - 15), e.position({
                                top: r,
                                left: f
                            }), l || (l = !0, o = t.pageX - e.$ele.find(".dialog-drag").offset().left, a = t.pageY - e.$ele.find(".dialog-drag").offset().top)
                        }
                    };
                i(document).on("mousedown", ".dialog-drag", function(t) {
                    var g = i(t.target).attr("class");
                    "select-text" !== g && (d = i(window).height(), n = i(window).width(), e = s.getDialogById(i(this).parent().data("dialogId")), l = !0, i(document).on("mousemove", r), o = t.pageX - i(this).offset().left + 3, a = t.pageY - i(this).offset().top + 3)
                }), i(document).on("mouseup", function() {
                    g || (e = null, i(document).off("mousemove", r)), g = !1, l = !1
                }), i(document).on("mousedown", ".dialog", function() {
                    i(this).data("dialogId")
                }), t.hasBind = !0
            }
        },
        d = {
            enableDrag: function(e, o) {
                t.dialogs[e] = o, o.$dialog.find(".dialog-header").addClass("dialog-drag"), t.hasBind === !1 && t.events()
            }
        };
    a.exports = d
});;
define("system-core:system/uiService/canvas/canvas.js", function(n, a, i) {
    var e = n("base:widget/libs/jquerypacket.js"),
        t = {
            $canvas: null,
            animateConfig: null,
            render: function() {
                var n = e('<div class="module-canvas"></div>');
                n.css({
                    position: "fixed",
                    _position: "absolute",
                    left: 0,
                    top: 0,
                    zIndex: 50,
                    background: "#000",
                    filter: "progid:DXImageTransform.Microsoft.Alpha(opacity=50)",
                    "-moz-opacity": .5,
                    "-khtml-opacity": .5,
                    opacity: .5,
                    width: "100%",
                    height: "100%"
                }), this.$canvas = n, e("body").append(n), this.animateConfig && (n.animate(t.animateConfig, "normal"), this.resetAnimateConfig())
            },
            bindCanvas: function() {
                var n = this;
                e(window).off("resize.canvas").on("resize.canvas", function() {
                    var a = e(this),
                        i = a.width(),
                        t = a.height();
                    n.$canvas.width(i), n.$canvas.height(t)
                })
            },
            unbindCanvas: function() {
                e(window).off("resize.canvas")
            },
            resetAnimateConfig: function() {
                this.animateConfig = null
            },
            referCount: 0
        },
        s = {
            show: function() {
                return t.$canvas ? t.animateConfig ? (t.$canvas.show(), t.$canvas.animate(t.animateConfig, "normal"), t.resetAnimateConfig()) : t.$canvas.show() : t.render(), t.referCount++, this
            },
            hide: function(n) {
                return t.referCount--, t.referCount <= 0 && "keepCanvas" !== n && (t.referCount = 0, t.$canvas && t.$canvas.hide()), this
            },
            addAnimate: function(n) {
                return t.animateConfig = n, this
            }
        };
    i.exports = s
});;
define("system-core:system/uiService/dialog/dialog.js", function(i, t, o) {
    var n = i("base:widget/libs/jquerypacket.js"),
        e = i("base:widget/libs/underscore.js"),
        a = i("system-core:system/uiService/dialog/dialog.drag.js"),
        s = i("system-core:system/uiService/button/button.js"),
        l = i("system-core:system/uiService/canvas/canvas.js"),
        d = function(i) {
            i || (i = {}), this.buttonIns = [], this.buttonMap = {}, this.minimizeBottom = 0, this.animateName = i.animateName || "", this.dialogId = i.id || e.uniqueId("dialog"), i.className = i.className || "", this.status = d.STATUS_NORMAL, this.$dialog = n('<div class="' + d.MODULE_NAME + " dialog-" + this.dialogId + " " + i.className + " " + this.animateName + '" id="' + this.dialogId + '" />'), this.$dialog.data("dialogId", this.dialogId), this.$header = null, this.zIndex = i.zIndex || 0, this.$minHeader = null, this.setConfig(i), this.init()
        };
    d.THEME_DEFAULT = "gray", d.THEME_BLUE = "blue", d.MODULE_NAME = "dialog", d.STATUS_NORMAL = "normal", d.STATUS_MIN = "min", d.STATUS_MAX = "max", d.MIN_ZINDEX = 51, d.MAX_ZINDEX = 70, d.zIndexTop = d.MIN_ZINDEX, d.DEFAULT_CONFIG = {
        title: "",
        titleIcon: "",
        theme: "",
        dialogClass: "",
        max: !1,
        back: !1,
        min: !1,
        close: !0,
        onClose: !1,
        width: "520px",
        minDialogWidth: "auto",
        draggable: !0,
        show: !1,
        lock: !0,
        body: "",
        noHeader: !1,
        noFooter: !0,
        position: {
            xy: "center",
            offset: null
        },
        beforeShow: null,
        beforeHide: null,
        afterShow: null,
        afterHide: null
    }, d.TEMPLATE_HEAD = '<div class="dialog-header"><% if (!titleIcon) { %><h3><span class="dialog-header-title"><em class="select-text"><%= title %></em></span></h3><% } else { %><h3 class="hasicon"><i class="<%- titleIcon %>"></i><span class="dialog-header-title"><em class="select-text"><%= title %></em></span></h3><% } %><div class="dialog-control"><% if (close) { %><span class="dialog-icon dialog-close icon icon-close"><span class="sicon">×</span></span><% } %><% if (max) { %><span class="dialog-icon dialog-max icon icon-maximizing"><span class="sicon">□</span></span><% } %><% if (min) { %><span class="dialog-icon dialog-min icon icon-minimize"><span class="sicon">-</span></span><% } %></div></div>', d.TEMPLATE_HEAD_FOR_MIN = '<div class="dialog-min-header"><% if (!titleIcon) { %><h3><span class="dialog-header-title"><em class="select-text"><%= title %></em></span></h3><% } else { %><h3 class="hasicon"><i class="<%- titleIcon %>"></i><span class="dialog-header-title"><em class="select-text"><%= title %></em></span></h3><% } %><div class="dialog-control"><% if (close) { %><span class="dialog-icon dialog-close icon icon-close"><span class="sicon">×</span></span><% } %><% if (min || max) { %><span class="dialog-icon dialog-back icon icon-maximizing"><span class="sicon">□</span></span><% } %></div></div>', d.TEMPLATE_FOOT = '<div class="dialog-footer g-clearfix"></div>', d.TEMPLATE_EXTRA = '<div class="dialog-extra g-clearfix"></div>', d.QUERY = {
        body: "body",
        dialogHeader: ".dialog-header",
        dialogMinHeader: ".dialog-min-header",
        dialogClose: ".dialog-close",
        dialogTitle: ".dialog-header-title .select-text",
        dialogBody: ".dialog-body",
        dialogFooter: ".dialog-footer",
        dialogExtra: ".dialog-extra"
    }, d.dialogList = [], d.prototype = {
        setConfig: function(i) {
            this.config = n.extend(!0, {}, d.DEFAULT_CONFIG, i)
        },
        init: function() {
            d.dialogList.push(this), this._render(), this.config.show === !0 && this.show(), this._events()
        },
        _render: function() {
            var i = '<div class="dialog-body"><%= body %></div>';
            this.config.dialogClass && this.$dialog.addClass(this.config.dialogClass), this.config.min && (i = d.TEMPLATE_HEAD_FOR_MIN + i), this.config.noHeader || (i = d.TEMPLATE_HEAD + i), this.config.buttons && (i += d.TEMPLATE_FOOT), this.config.extra && (i += d.TEMPLATE_EXTRA);
            var t = null;
            "object" == typeof this.config.body && (t = this.config.body, this.config.body = "");
            var o = e.template(i)(this.config);
            this.$dialog.html(o), t && this.$dialog.find(".dialog-body").append(t), this.createButtons(), this.setTheme(), this.setExtraContent(), this.config.width && (/([\d\.]+)\%$/.test(this.config.width) && (this.config.width = parseFloat(RegExp.$1) / 100 * n(window).width()), this.width(this.config.width)), this.config.height && (/([\d\.]+)\%$/.test(this.config.height) && (this.config.height = parseFloat(RegExp.$1) / 100 * n(window).height()), this.height(this.config.height)), this.$dialog.appendTo("body"), this.$header = this.$dialog.find(".dialog-header"), this.$minHeader = this.$dialog.find(".dialog-min-header")
        },
        setTheme: function() {
            this.$dialog.addClass(this.config.theme ? this.config.theme === d.THEME_BLUE ? "dialog-" + d.THEME_BLUE : "dialog-" + d.THEME_DEFAULT : "dialog-" + d.THEME_DEFAULT)
        },
        createButtons: function() {
            var i = this.config.buttons,
                t = this,
                o = null;
            t.buttonIns.length = 0, e.map(i, function(i) {
                o = new s(i), t.buttonIns.push(o), i.name && (t.buttonMap[i.name] = o);
                var n = o.dom;
                t.$dialog.find(d.QUERY.dialogFooter).append(n)
            })
        },
        setExtraContent: function() {
            var i = this.config.extra;
            this.$dialog.find(d.QUERY.dialogExtra).append(i)
        },
        setButtonDisable: function(i, t) {
            var o = this.buttonIns.length;
            if (void 0 === t) e.map(this.buttonIns, function(t) {
                t.disable(i)
            });
            else for (var n = 0; o > n; n++) n == t && this.buttonIns[n].disable(i)
        },
        _events: function() {
            var i = this;
            this.config.draggable === !0 && this.enableDrag(), this.$dialog.on("click.dialog", d.QUERY.dialogClose, function(t) {
                t.stopPropagation();
                var o = i.onClose.call(i, arguments);
                return e.isFunction(i.onClose) === !0 ? o !== !1 && ("keepCanvas" === o && i.hide("keepCanvas"), i.hide()) : i.hide(), !1
            }), e.each(["min", "back", "max"], function(t) {
                this.$dialog.on("click", ".dialog-" + t, function(o) {
                    o.stopPropagation(), "min" === t ? i.minimize() : "back" === t && i.restore()
                })
            }, this), this.$dialog.on("mousedown.dialog", function() {
                i.zIndex ? i._setIndex(i.zIndex) : i._top()
            })
        },
        _top: function() {
            var i = function() {
                    d.zIndexTop > d.MAX_ZINDEX && t()
                },
                t = function() {
                    var i = d.dialogList,
                        t = d.MIN_ZINDEX;
                    i.sort(function(i, t) {
                        return i.$dialog.css("zIndex") > t.$dialog.css("zIndex")
                    }), e.map(i, function(i) {
                        i.$dialog.css("zIndex", t++)
                    }), d.zIndexTop = t
                };
            return function() {
                this.zIndex !== d.zIndexTop && (d.zIndexTop++, this.zIndex = d.zIndexTop, this.$dialog.css("zIndex", d.zIndexTop), i())
            }
        }(),
        _setIndex: function(i) {
            this.$dialog.css("zIndex", i)
        },
        _unbindEvents: function() {
            this.$dialog.off()
        },
        delegate: function(i, t, o) {
            this.$dialog.delegate(i, t, o)
        },
        topShow: function() {
            this._top(), this.show()
        },
        show: function() {
            return this.$dialog.is(":visible") ? void 0 : ("function" == typeof this.config.beforeShow && this.config.beforeShow.call(this), e.isString(this.config.position.xy) ? this.position(this.config.position.xy, this.config.position.offset) : e.isArray(this.config.position.xy) && this.position({
                top: this.config.position.xy[0],
                left: this.config.position.xy[1]
            }), this.$dialog.show().css("visibility", "visible"), this.config.lock === !0 && this.lock(), this.zIndex ? this._setIndex(this.zIndex) : this._top(), /IE\s[67]/.test(navigator.userAgent) && n("body").css("zoom", 0), "function" == typeof this.config.afterShow && this.config.afterShow.call(this), this)
        },
        getMinDom: function() {
            return this.$dialog.find(d.QUERY.dialogMinHeader)
        },
        move: function() {},
        setMinimizeBottom: function(i) {
            "number" == typeof i && (this.minimizeBottom = i)
        },
        minimize: function() {
            var i = this;
            if (this.status === d.STATUS_MIN) return this;
            if ("bottom-left" === this.config.position.xy || "bottom-right" === this.config.position.xy) {
                var t = function() {
                        i.$dialog.find(d.QUERY.dialogHeader).hide(), "bottom-left" === i.config.position.xy ? i.$dialog.find(d.QUERY.dialogBody).css("height", "0") : i.$dialog.find(d.QUERY.dialogBody).hide(), i.$dialog.find(d.QUERY.dialogHeader).hide(), i.$dialog.find(d.QUERY.dialogMinHeader).show(), "auto" !== i.config.minDialogWidth && i.$dialog.width(i.config.minDialogWidth), i.dialogWidth = i.$dialog.outerWidth(), i.dialogHeight = i.$dialog.outerHeight();
                        var t = 0 === i.minimizeBottom ? 0 : i.minimizeBottom,
                            o = function() {
                                i.config.min && "function" == typeof i.config.min && i.config.min.call(this), i.status = d.STATUS_MIN, i.onSizeChange({
                                    status: "minimize"
                                })
                            };
                        /IE\s[67]/.test(navigator.userAgent) ? (i.$dialog.css({
                            bottom: t
                        }), o(), n("body").css("zoom", 1)) : i.$dialog.animate({
                            bottom: t
                        }, "fast", "linear", o)
                    },
                    o = this.dialogHeight;
                i.$dialog.is(":visible") && !/IE\s[67]/.test(navigator.userAgent) ? this.$dialog.stop().animate({
                    bottom: -o
                }, "fast", "linear", t) : (this.$dialog.css("bottom", -o), t(), n("body").css("zoom", 1))
            }
            return this
        },
        restore: function() {
            var i = this;
            if (this.status === d.STATUS_NORMAL) return this;
            if ("bottom-left" === this.config.position.xy || "bottom-right" === this.config.position.xy) {
                var t = this.dialogHeight,
                    o = function() {
                        i.$dialog.find(d.QUERY.dialogMinHeader).hide(), "bottom-left" === i.config.position.xy ? i.$dialog.find(d.QUERY.dialogBody).css("height", "auto") : i.$dialog.find(d.QUERY.dialogBody).show(), i.$dialog.find(d.QUERY.dialogHeader).show(), i.$dialog.find(d.QUERY.dialogFooter).show(), "auto" !== i.config.minDialogWidth && i.$dialog.width(i.config.width), i.dialogWidth = i.$dialog.outerWidth(), i.dialogHeight = i.$dialog.outerHeight();
                        var t = function() {
                            i.config.max && "function" == typeof i.config.max && i.config.max.call(this), i.status = d.STATUS_NORMAL, i.onSizeChange({
                                status: "normal"
                            })
                        };
                        /IE\s[67]/.test(navigator.userAgent) ? (i.$dialog.css({
                            bottom: 0
                        }), t(), n("body").css("zoom", 0)) : i.$dialog.animate({
                            bottom: 0
                        }, 300, "linear", t)
                    };
                /IE\s[67]/.test(navigator.userAgent) ? (this.$dialog.css({
                    bottom: -t
                }), o(), n("body").css("zoom", 0)) : this.$dialog.is(":animated") || this.$dialog.animate({
                    bottom: -t
                }, "fast", "linear", o)
            }
            return this
        },
        maximize: function() {},
        isVisible: function() {
            return this.$dialog.is(":visible")
        },
        hide: function(i) {
            return this.isVisible() ? ("function" == typeof this.config.beforeHide && this.config.beforeHide.call(this), this.$dialog.hide(), l.hide(i), /IE\s[67]/.test(navigator.userAgent) && n("body").css("zoom", 1), "function" == typeof this.config.afterHide && this.config.afterHide.call(this), this) : void 0
        },
        destroy: function() {
            this.detachedElement = this.$dialog.detach()
        },
        title: function(i) {
            return this.$dialog.find(d.QUERY.dialogTitle).text(i), this
        },
        icon: function(i) {
            if (i) {
                var t = this.$header.find("h3 i"),
                    o = this.$minHeader.find("h3 i");
                0 === t.length && (t = n("<i></i>"), this.$header.find("h3").addClass("hasicon").prepend(t)), 0 === o.length && (o = n("<i></i>"), this.$minHeader.find("h3").addClass("hasicon").prepend(o)), t.attr("class", i), o.attr("class", i)
            } else this.$header.find("h3").removeClass("hasicon"), this.$minHeader.find("h3").removeClass("hasicon");
            return this
        },
        width: function(i) {
            return this.$dialog.width(i), this
        },
        height: function(i) {
            return this.$dialog.height(i), this
        },
        content: function(i) {
            this.$dialog.find(d.QUERY.dialogBody).html(i)
        },
        find: function(i) {
            return this.$dialog.find(i)
        },
        enableDrag: function() {
            a.enableDrag(this.dialogId, this)
        },
        lock: function() {
            l.show()
        },
        reset: function(i) {
            null === this.detachedElement && this.hide(), this.detachedElement.appendTo("body"), i && i(), this.hasInitialPosition && this.position(this.hasInitialPosition)
        },
        position: function(i, t) {
            var o = {
                top: "auto",
                bottom: "auto",
                left: "auto",
                right: "auto"
            };
            if (this.dialogWidth = this.$dialog.outerWidth(), this.dialogHeight = this.$dialog.outerHeight(), "center" === i) {
                var e = n(window).height(),
                    a = n(window).width();
                o = n.extend(o, {
                    top: (e - this.dialogHeight) / 2,
                    left: (a - this.dialogWidth) / 2,
                    bottom: "auto",
                    right: "auto"
                }), o.top < 0 && (o.top = 0)
            } else "bottom-left" === i ? (t || (t = {}), o = n.extend(o, {
                bottom: 0 + (t.bottom || 0),
                left: t.left || 0,
                top: "auto",
                right: "auto"
            })) : "bottom-right" === i ? (t || (t = {}), o = n.extend(o, {
                bottom: 0 + (t.bottom || 0),
                right: t.right || 0,
                top: "auto",
                left: "auto"
            })) : o = n.extend(o, i);
            this.$dialog.css(o), this.$dialog.css("zIndex", d.DEFAULT_ZINDEX++), void 0 === this.hasInitialPosition && (this.hasInitialPosition = o)
        },
        onSizeChange: function() {
            return void 0
        },
        onClose: function() {
            var i, t = this;
            return "function" == typeof this.config.onClose && (i = this.config.onClose.call(t)), i
        }
    }, d._confirmDialog = null, d.confirm = function(i, t, o, n, a, s) {
        var l;
        if (e.isObject(i) === !0) {
            if (!i.title) throw new Error("[context] 确认对话框名称是必须的！");
            if (!i.body) throw new Error("[context] 对话框内容是必须的！");
            l = i
        } else if (e.isString(i) === !0) {
            if (!t) throw new Error("[context] 对话框内容是必须的！");
            l = {
                title: i,
                body: t,
                onSure: o,
                onCancel: n,
                extra: a
            }
        }
        l.dialogDefaultConfig = s || {};
        var g = {
            id: "confirm",
            show: i.show || !0,
            title: l.title,
            width: i.width || d.DEFAULT_CONFIG.width,
            body: '<div style="text-align:center;padding:40px 22px 22px 22px;">' + l.body + "</div>",
            buttons: [{
                name: "confirm",
                title: l.sureText || "确定",
                type: l.dialogDefaultConfig.buttonType || "",
                color: "blue",
                padding: l.dialogDefaultConfig.buttonPadding || ["36px", "36px"],
                click: function() {
                    e.isFunction(l.onSure) === !0 ? l.onSure.call(d._confirmDialog, arguments) !== !1 && d._confirmDialog.hide() : d._confirmDialog.hide()
                }
            }, {
                name: "cancel",
                title: l.cancelText || "取消",
                type: l.dialogDefaultConfig.buttonType || "",
                padding: l.dialogDefaultConfig.buttonPadding || ["36px", "36px"],
                click: function() {
                    e.isFunction(l.onCancel) === !0 ? l.onCancel.call(d._confirmDialog, arguments) !== !1 && d._confirmDialog.hide() : d._confirmDialog.hide()
                }
            }],
            onClose: function() {
                e.isFunction(l.onClose) === !0 ? l.onClose.call(d._confirmDialog, arguments) !== !1 && d._confirmDialog.hide() : d._confirmDialog.hide()
            },
            className: i.className || ""
        };
        return (l.extra || e.isString(l.extra)) && (g.extra = l.extra), null === d._confirmDialog ? d._confirmDialog = new d(g) : (d._confirmDialog.setConfig(g), d._confirmDialog.createButtons(), d._confirmDialog.init()), d._confirmDialog.onCancel = l.onCancel, d._confirmDialog
    }, d._alertDialog = null, d.alert = function(i, t, o) {
        var n;
        if (e.isObject(i) === !0) {
            if (!i.body) throw new Error("[context] 警告内容是必须的！");
            n = i
        } else e.isString(i) === !0 && (n = {
            body: i,
            onSure: t
        });
        n.dialogDefaultConfig = o || {};
        var a = {
            title: n.title || "提示",
            body: '<div style="text-align:center;padding:22px;">' + n.body + "</div>",
            width: n.width || "540px",
            buttons: [{
                name: "confirm",
                title: n.sureText || "确定",
                type: n.dialogDefaultConfig.buttonType || "",
                color: n.dialogDefaultConfig.buttonColor || "",
                click: function() {
                    e.isFunction(n.onSure) === !0 ? n.onSure.call(d._alertDialog, arguments) !== !1 && d._alertDialog.hide() : d._alertDialog.hide()
                }
            }],
            onClose: function() {
                e.isFunction(n.onClose) === !0 ? n.onClose.call(d._alertDialog, arguments) !== !1 && d._alertDialog.hide() : d._alertDialog.hide()
            },
            className: i.className || ""
        };
        return a.noFooter = !1, null === d._alertDialog ? d._alertDialog = new d(a) : (d._alertDialog.setConfig(a), d._alertDialog.createButtons(), d._alertDialog.init()), d._alertDialog.show(), d._alertDialog
    }, d._verifyDialog = null, d.verify = function(i, t, o, a, s, l) {
        var g, c, r = "/api/getvcode?prod=pan",
            h = function(i) {
                n.get(r + "&t=" + Math.random(), function(t) {
                    0 === t.errno ? (c = t.vcode, i(t.img)) : i(!1)
                }, "json")
            };
        e.isObject(i) === !0 ? (g = i, c = g.vcode) : e.isString(i) === !0 && (c = t.vcode, g = {
            title: i,
            img: t.img,
            onSure: o,
            onCancel: a,
            hasError: s
        }), g.dialogDefaultConfig = l || {}, g.title = g.title || "提示", g.body = ['<div class="download-verify" style="margin-top: 10px;padding: 0 28px;text-align: left;font-size: 12px;" id="downloadVerify">', '<div class="verify-body">', '请输入验证码：<input type="text" style="padding: 3px;width: 85px;height: 23px;border: 1px solid #C6C6C6;background-color: white;vertical-align: middle;" class="input-code" maxlength="4">', '<img class="img-code" style="margin-left: 10px;vertical-align: middle;" alt="验证码获取中" src="" width="100" height="30" />', '<a href="javascript:void(0);" style="text-decoration: underline;" class="underline">换一张</a>', "</div>", '<div style="padding-left: 84px;height: 18px;color: #d80000;" class="verify-error">', g.hasError ? "验证码输入错误，请重新输入" : "", "</div>", "</div>"].join("");
        var f = {
            title: g.title,
            body: '<div style="text-align:center;padding:22px;">' + g.body + "</div>",
            width: i.width || d.DEFAULT_CONFIG.width,
            buttons: [{
                name: "confirm",
                title: g.sureText || "确定",
                type: g.dialogDefaultConfig.buttonType || "",
                color: "blue",
                padding: g.dialogDefaultConfig.buttonPadding || ["36px", "36px"],
                click: function() {
                    var i = n("#downloadVerify .input-code"),
                        t = n("#downloadVerify .verify-error"),
                        o = n.trim(i.val());
                    return "" == o ? (t.text("请输入验证码"), void i.focus()) : 4 != o.length ? (t.text("验证码输入错误，请重新输入"), void i.focus()) : (t.text(""), void(e.isFunction(g.onSure) === !0 ? g.onSure(c, o, !0) !== !1 && d._verifyDialog.hide() : d._verifyDialog.hide()))
                }
            }, {
                name: "cancel",
                title: g.cancelText || "取消",
                type: g.dialogDefaultConfig.buttonType || "",
                padding: g.dialogDefaultConfig.buttonPadding || ["36px", "36px"],
                click: function() {
                    e.isFunction(g.onCancel) === !0 ? g.onCancel(arguments) !== !1 && d._verifyDialog.hide() : d._verifyDialog.hide()
                }
            }],
            onClose: function() {
                e.isFunction(g.onClose) === !0 ? g.onClose(arguments) !== !1 && d._verifyDialog.hide() : d._verifyDialog.hide()
            },
            className: i.className || ""
        };
        null === d._verifyDialog ? d._verifyDialog = new d(f) : (d._verifyDialog.setConfig(f), d._verifyDialog.createButtons(), d._verifyDialog.init());
        var u = n("#downloadVerify"),
            m = u.find(".input-code"),
            p = u.find(".img-code"),
            v = u.find(".verify-error");
        return u.find(".underline").click(function() {
            g.img && (h(function(i) {
                p.attr("src", i)
            }), m.focus())
        }), m.blur(function() {
            m.val() && v.text("")
        }).keydown(function(i) {
            if (13 == i.keyCode) {
                try {
                    d._verifyDialog.buttonIns[0].triggerClick()
                } catch (i) {}
                return !1
            }
        }).focus(), d._verifyDialog.onCancel = g.onCancel, g.img && g.vcode ? p.attr("src", g.img) : h(function(i) {
            i === !1 ? p.attr("alt", "验证码获取失败") : (g.img = i, p.attr("alt", "点击换一张"), p.attr("src", g.img))
        }), d._verifyDialog
    }, o.exports = d
});;
define("system-core:system/uiService/tip/tip.js", function(e, i, t) {
    var s = e("base:widget/libs/jquerypacket.js"),
        o = e("base:widget/libs/underscore.js"),
        n = e("system-core:system/uiService/log/log.js").instanceForSystem,
        l = "module-tip",
        r = "loading",
        a = "success",
        c = "caution",
        d = "failure",
        p = "none",
        h = 65,
        u = 3e3,
        f = {
            mode: c,
            hasClose: !1,
            autoClose: !0,
            isVip: !1
        },
        m = {
            $ele: s('<div class="' + l + '"></div>'),
            timeoutId: null,
            checkOption: function(e) {
                var i = !0;
                return e.msg || e.body ? e.mode && this.checkMode(e.mode) === !1 ? !1 : i : !1
            },
            checkMode: function(e) {
                var i = !0;
                switch (e) {
                    case r:
                        i = !0;
                        break;
                    case a:
                        i = !0;
                        break;
                    case c:
                        i = !0;
                        break;
                    case d:
                        i = !0;
                        break;
                    case p:
                        i = !0;
                        break;
                    default:
                        i = !1
                }
                return i
            },
            destroy: function() {
                this.$ele.remove()
            },
            getRenderObj: function(e) {
                var i = {};
                return i.icon = "tip-icon-" + (e.mode || f), i.mode = e.mode || f.mode, i.hasClose = e.hasClose || f.hasClose, i.autoClose = e.autoClose || f.autoClose, i.msg = e.msg, i.body = e.body, i.position = e.position || f.position, i.vipType = e.vipType, i
            },
            getRenderHtml: function() {
                var e = o.template('<div class="tip-inner"><% if (body != null) {%><div class="tip-body"><%= body %></div><%}else {%><% if (vipType == "svip" && (mode == "loading" || mode == "success")) {%><i class="sprite-svip-ic"></i><%}else if (vipType == "vip" && (mode == "loading" || mode == "success")) {%><i class="sprite-vip-ic"></i><%}else {%><i class="tip-icon <%- icon %>"></i><%}%><span class="tip-msg"><%= msg %></span><% if (hasClose) { %><i class="tip-close tip-icon tip-icon-close"></i><% } %><% } %></div>');
                return function(i) {
                    return e(i)
                }
            }(),
            setMsg: function(e) {
                this.$ele.find(".tip-msg").html(e);
                var i = this.$ele.width(),
                    t = {
                        marginLeft: -i / 2
                    };
                this.$ele.css(t)
            },
            hide: function() {
                m.$ele.hide()
            },
            render: function(e) {
                e ? this.renderByPosition(e) : this.renderByDefault(), this.$ele.is(":visible") === !1 && this.$ele.show()
            },
            renderByDefault: function() {
                var e, i, t = s("body");
                this.$ele.appendTo(t), e = this.$ele.width(), i = {
                    top: h,
                    left: "50%",
                    marginLeft: -e / 2
                }, this.$ele.css(i)
            },
            renderByPosition: function(e) {
                var i, t, n = {};
                if (!o.isObject(e)) throw new Error("[TIP] The position of config is not a object !");
                if (e.of) {
                    if (e.of instanceof s) t = e.of;
                    else {
                        if ("string" != typeof e.of) throw new Error("[tip] The position.of of tip is a string or jquery object !");
                        t = s(e.of)
                    }
                    null == t.css("position") && t.css("position", "relative")
                } else t = s("body");
                if (this.$ele.appendTo(t), i = this.$ele.width(), e.top || e.left || e.right || e.bottom) o.each(["top", "left", "bottom", "right"], function(i) {
                    void 0 !== e[i] && (n[i] = e[i])
                });
                else if (e.center) {
                    var l = this.$ele.height();
                    n = {
                        top: "50%",
                        left: "50%",
                        marginLeft: -i / 2,
                        marginTop: -l / 2
                    }
                } else n = {
                    top: 65,
                    left: "50%",
                    marginLeft: -i / 2
                };
                this.$ele.css(n)
            },
            doAutoClose: function(e) {
                var i = this;
                return this.timeoutId && clearTimeout(this.timeoutId), void 0 === e ? void(this.timeoutId = setTimeout(function() {
                    i.$ele.hide()
                }, u)) : "boolean" == typeof e ? void(e === !0 && (this.timeoutId = setTimeout(function() {
                    i.$ele.hide()
                }, u))) : "number" == typeof e ? void(this.timeoutId = setTimeout(function() {
                    i.$ele.hide()
                }, e)) : void 0
            },
            buildTip: function(e) {
                var i = this.getRenderObj(e),
                    t = this.getRenderHtml(i);
                return this.$ele.attr("class", l), this.$ele.removeAttr("style"), "string" == typeof e.className && this.$ele.addClass(e.className), "success" === i.mode || "loading" === i.mode ? ("vip" === i.vipType || "svip" === i.vipType) && this.$ele.addClass("sprite-vip-tips") : this.$ele.hasClass("sprite-vip-tips") && this.$ele.removeClass("sprite-vip-tips"), this.$ele.html(t), this.render(e.position), this.doAutoClose(e.autoClose), this.event(), this
            },
            event: function() {
                var e = !1;
                return function() {
                    e === !1 && (this.$ele.delegate(".tip-close", "click", function() {
                        v.hide()
                    }), e = !0)
                }
            }()
        },
        v = {
            show: function(e) {
                var i = (new Date).getTime();
                if (m.checkOption(e) === !0) {
                    var t = m.buildTip(e),
                        s = (new Date).getTime() - i;
                    return n.send({
                        name: "tipShow",
                        value: s
                    }), t
                }
            },
            hide: m.hide
        };
    t.exports = v
});;
define("system-core:system/cache/listCache/listCache.js", function(e, a, t) {
    var n = !1,
        r = e("base:widget/libs/jquerypacket.js"),
        c = e("system-core:system/uiService/log/log.js").instanceForSystem,
        o = {},
        i = {};
    "object" == typeof window.cache ? o = window.cache : window.cache = o;
    var s = function() {};
    i.DEBUG = !0, s.cache = o, i.addCache = function(e, a, t) {
        var n = !1;
        if (o[e]) {
            if (!o[e].writeable) return void(i.DEBUG && console.warn("cache key:", e, " already exists"));
            n = !0
        }
        o[e] = n ? {
            config: t,
            data: o[e].data
        } : {
            config: t,
            data: {}
        }
    }, i.removeCache = function(e) {
        if (o[e]) {
            var a = o[e].config;
            "object" == typeof a.fileSystem && a.fileSystem.invalidCache()
        }
        o[e] = {}
    }, s.addCache = i.addCache, i.getCacheByName = function(e) {
        return o[e]
    }, i.getCacheConfig = function(e) {
        var a = i.getCacheByName(e);
        return a ? a.config : null
    }, s.getCacheConfig = i.getCacheConfig, i.updateCacheConfig = function(e, a, t) {
        var n = i.getCacheByName(e);
        return n && (n.config = t), null
    }, s.updateCacheConfig = i.updateCacheConfig, i.getCache = function(e) {
        var a = i.getCacheByName(e);
        return a ? a.data : null
    }, i.getDataByKey = function(e, a) {
        var t = i.getCacheByName(e);
        return t && t.data ? t.data[a] : null
    }, s.getDataByKey = i.getDataByKey, s.getCache = i.getCache, i.getCacheData = function(e, a, t, n, r) {
        var c, o, f, l = i.getCacheByName(e),
            d = i.getCacheConfig(e) || {},
            h = d.parentPath || "",
            g = l.data[a];
        if (g || (g = l.data[a] = {
                list: [],
                hasMore: !0
            }), -1 === t ? g.list.length <= 0 && g.hasMore === !0 ? t = -1 : c = g.list : -2 === t ? (t = d.currentPage, g.hasMore === !1 && (c = [])) : (o = t * d.limit, g.hasMore === !1 && (c = [])), f = {
                cacheName: e,
                key: h + a,
                page: t,
                params: r || {},
                config: d,
                callback: n
            }, s.onBeforeGetCacheData(f), c) n.call(null, c, g.hasMore, f);
        else if (window.prefetchEnable) {
            var y = arguments;
            window.prefetchCallback = function() {
                i.getCacheData.apply(null, y)
            }
        } else f.page = f.page + 1, i.getData(f)
    }, s.getCacheData = i.getCacheData, i.onBeforeGetCacheData = function() {}, s.onBeforeGetCacheData = i.onBeforeGetCacheData, i.clearCacheDataByKey = function(e, a) {
        var t = i.getCacheByName(e);
        "undefined" != typeof a && delete t.data[a]
    }, s.clearCacheDataByKey = i.clearCacheDataByKey, i.clearCacheData = function(e) {
        var a = i.getCacheByName(e);
        a.data = {}
    }, s.clearCacheData = i.clearCacheData, i.hasMoreData = function(e, a) {
        var t, n = i.getCache(e);
        return n && (t = n[a]), t && t.hasMore
    }, s.hasMoreData = i.hasMoreData, i.removeByIndexs = function(e, a, t) {
        var n, r, c = i.getCache(e),
            o = c[a];
        if (t.sort(function(e, a) {
                return e - a
            }), o && (n = o.list)) for (var s = t.length - 1; s >= 0; s--) r = t[s], r < n.length && n.splice(r, 1)
    }, i.removeByIndex = function(e, a, t) {
        i.removeByIndexs(e, a, [t])
    }, i.removeByFileList = function() {}, s.removeByIndexs = i.removeByIndexs, s.removeByIndex = i.removeByIndex, i.getIndexsByFiles = function(e, a, t) {
        var n, r = i.getCache(e),
            c = r[a],
            o = [];
        if (t = t.slice(), c && (n = c.list)) for (var s = 0, f = t.length; f > s; s++) for (var l = 0, d = n.length; d > l; l++) if (t[s] === n[l]) {
            o.push(l);
            break
        }
        return o
    }, i.getIndexByFile = function(e, a, t) {
        return i.getIndexsByFiles(e, a, [t])
    }, s.getIndexByFile = i.getIndexByFile, s.getIndexsByFiles = i.getIndexsByFiles, i.updateData = function(e, a, t) {
        var n, r, c, o = i.getCache(e),
            s = o[a];
        if (s && (n = s.list)) for (var f = 0, l = t.length; l > f && (r = t[f], c = n[r.index], c); f++) for (var d in r.obj) r.obj.hasOwnProperty(d) && (c[d] = r.obj[d])
    }, s.updateData = i.updateData, i.addDatasByIndex = function(e, a, t) {
        var n, r, c, o = i.getCache(e),
            s = o[a];
        if (t.sort(function(e, a) {
                return parseInt(e.index, 10) - parseInt(a.index, 10)
            }), s && (c = s.list)) for (var f = 0, l = t.length; l > f; f++) n = t[f], r = n.index, 0 > r && (r = c.length), r = Math.min(r, c.length), c.splice(r, 0, n.obj)
    }, i.addDataBefore = function(e, a, t) {
        var n = [{
            index: 0,
            obj: t
        }];
        i.addDatasByIndex(e, a, n)
    }, i.addDataAfter = function(e, a, t) {
        var n = [{
            index: -1,
            obj: t
        }];
        i.addDatasByIndex(e, a, n)
    }, i.addDatasBefore = function(e, a, t) {
        for (var n = [], r = 0, c = t.length; c > r; r++) n.push({
            index: 0,
            obj: t[j]
        });
        i.addDatasByIndex(e, a, n)
    }, i.addDatasAfter = function(e, a, t) {
        for (var n = [], r = 0, c = t.length; c > r; r++) n.push({
            index: -1,
            obj: t[j]
        });
        i.addDatasByIndex(e, a, n)
    }, s.addDatasByIndex = i.addDatasByIndex, s.addDataBefore = i.addDataBefore, s.addDataAfter = i.addDataAfter, s.addDatasBefore = i.addDatasBefore, s.addDatasAfter = i.addDatasAfter, i.getData = function(e) {
        var a, t, n = {},
            r = e.config;
        a = "function" == typeof r.getPageParams ? r.getPageParams(e.page, r.limit) : {
            page: e.page,
            num: r.limit
        }, t = r.getParamsBykey(e.key);
        for (var c in r.params) r.params.hasOwnProperty(c) && (n[c] = r.params[c]);
        for (var c in a) a.hasOwnProperty(c) && (n[c] = a[c]);
        for (var c in t) t.hasOwnProperty(c) && (n[c] = t[c]);
        i.fetchData(r.api, n, i.afterFetchData, e)
    }, i.addDataToCache = function(e, a, t, n, r) {
        var c = i.getCacheByName(e),
            o = i.getCacheConfig(e),
            s = c.data[a];
        s || (s = c.data[a] = {
            list: [],
            hasMore: !0
        }), s && s.list instanceof Array && Array.prototype.push.apply(s.list, t), s.hasMore = n, o.currentPage = r
    }, s.addDataToCache = i.addDataToCache, i.replaceFirstCache = function(e, a, t) {
        var n = {},
            c = i.getCacheByName(e);
        n.server_filename = t.path.substring(t.path.lastIndexOf("/") + 1), n.local_mtime = n.server_mtime = t.mtime || "-", n.size = 0, n.path = t.path || "/", n.fs_id = t.fs_id, n.dir_empty = 1, n.empty = 0, n.category = 6, c || (c = {
            list: [],
            hasMore: !0
        }), c.data[a] && c.data[a].list[0] && (r.extend(c.data[a].list[0], n), n = null);
        var o = c.config;
        "object" == typeof o.fileSystem && o.fileSystem.invalidCache()
    }, s.replaceFirstCache = i.replaceFirstCache, i.afterFetchSuccess = function(e, a) {
        var t = a.config,
            n = e[a.config.listKey || "list"],
            r = a.cacheName,
            c = a.key,
            o = t.limit,
            s = !1,
            f = null;
        n && n.length >= o && (s = !0), e.parent_oper && (f = {
            parent_oper: e.parent_oper
        }), "undefined" == typeof e.has_more || e.has_more || (s = !1), "searchGlobal" === r && n && "undefined" == typeof e.has_more && (s = e.list.length > 0), i.addDataToCache(r, c, n, s, a.page), "function" == typeof a.callback && a.callback.call(null, n, s, a, f)
    }, i.afterFetchData = function(e, a, t, n) {
        var r = n.config;
        1 === e ? i.afterFetchSuccess(a, n) : ("function" == typeof r.failCallBack && r.failCallBack(a, t, n), i.DEBUG && console.warn("fetch error"))
    }, i._fetchStrs = "", i.fetchData = function(e, a, t, o) {
        a = a || {};
        var s = e + r.stringify(a);
        if (i._fetchStrs === s) return void(n && console.log("fetch too much!"));
        i._fetchStrs = s, a.t = Math.random();
        var f = o.config;
        return a.page < 2 && "object" == typeof f.fileSystem && f.fileSystem.hasApi(e) ? void f.fileSystem.getApi(e, a).then(function(e) {
            i._fetchStrs = "", t.call(null, 1, e, a, o), c.send({
                name: "apilistCache",
                sendServerLog: !1
            })
        }, function() {
            i._fetchStrs = "", f.fileSystem = void 0, i.fetchData(e, a, t, o)
        }) : (r.getJSON(e, a, function(e) {
            var n;
            n = e && 0 === e.errno ? 1 : 0, i._fetchStrs = "", t.call(null, n, e, a, o)
        }).error(function(e) {
            var n;
            try {
                n = r.parseJSON(e.responseText)
            } catch (c) {}
            i._fetchStrs = "", t.call(null, 0, n, a, o)
        }), void c.send({
            name: "apilistRequest",
            sendServerLog: !1
        }))
    }, i.delayFetch = function() {
        return "" !== i._fetchStrs
    }, s.delayFetch = i.delayFetch, t.exports = s
});;
define("system-core:system/cache/listCache/cacheManage.js", function(e, t, n) {
    var a = e("system-core:system/cache/listCache/listCache.js"),
        i = {},
        c = function(e) {
            if ("prototype" === e || "apply" === e || "call" === e || "name" === e) return !0;
            for (var t in o) if (t === e) return !0;
            return !1
        },
        o = function(e, t, n) {
            if (c(e)) throw new Error('instance "' + e + '" is already exists!');
            this.cacheName = e, this.config = t, this.key = n, a.addCache(this.cacheName, this.key, this.config)
        },
        r = function() {
            for (var e in a) a.hasOwnProperty(e) && (o.prototype[e] = function(e) {
                return function() {
                    var t, n = Array.prototype.slice.apply(arguments);
                    return n.unshift(this.key), n.unshift(this.cacheName), t = a[e].apply(null, n), "undefined" == typeof t ? this : t
                }
            }(e))
        };
    r(), o.prototype.onBeforeGetCacheData = function(e) {
        a.onBeforeGetCacheData = e
    }, o.prototype.updateKey = function(e) {
        this.key = e
    }, o.replaceSingleCache = function(e, t, n) {
        return a.replaceFirstCache(e, t, n)
    }, o.prototype.getKey = function() {
        return this.key
    }, o.prototype.getCache = o.getCache = function() {
        return a.cache
    }, o.removeCache = function(e) {
        if (i[e]) {
            var t = i[e].config;
            i[e] = null, "object" == typeof t.fileSystem && t.fileSystem.invalidCache()
        }
        var n = o.getCache();
        if (n[e]) {
            var t = n[e].config;
            "object" == typeof t.fileSystem && t.fileSystem.invalidCache()
        }
        n[e] = null
    }, o.obtainCache = function(e, t, n) {
        return i[e] || (i[e] = new o(e, t, n)), i[e]
    }, o.prototype.selfAddDataToCache = function() {
        a.addDataToCache.apply(void 0, arguments)
    }, n.exports = o
});;
define("system-core:system/uiService/log/updateLog.js", function(e, t, o) {
    "use strict";
    var n = e("base:widget/libs/jquerypacket.js"),
        r = e("system-core:system/uiService/log/log.js"),
        i = e("base:widget/storage/storage.js"),
        s = {
            logCounter: {},
            logTimeout: 2592e5,
            sendLogInterval: 18e4,
            writeLogInterval: 3e4,
            isEmptyObject: function(e) {
                for (var t in e) return !1;
                return !0
            },
            processLog: function(e) {
                if (null == e || null == e.op || null == e.from || null == e.type || null == e.detailKey || String(e.op).indexOf("@") > -1 || String(e.from).indexOf("@") > -1 || String(e.type).indexOf("@") > -1 || String(e.detailKey).indexOf("@") > -1) return !1;
                var t = s.logCounter,
                    o = e.op,
                    n = e.from,
                    r = e.type,
                    i = e.detailKey,
                    l = [o, n, r, i].join("@");
                return t[l] = t[l] || {}, t[l].times = ++t[l].times || 1, t[l].timestamp = +new Date, !0
            },
            processLogForSend: function(e) {
                var t = [];
                if (null != e && !s.isEmptyObject(e)) for (var o in e) if (e.hasOwnProperty(o)) {
                    var n = {},
                        r = o.split("@");
                    n.op = r[0], n.from = r[1], n.type = r[2], n.detailKey = r[3], n.times = e[o].times, n.timestamp = e[o].timestamp, t.push(n)
                }
                return t
            },
            writeLocalStorage: function() {
                if ("undefined" != typeof i) {
                    var e = i.getItem("logReport");
                    if (e = e ? n.parseJSON(e) : {}, !s.isEmptyObject(s.logCounter)) {
                        for (var t in s.logCounter) s.logCounter.hasOwnProperty(t) && (null != e[t] ? e[t].times += s.logCounter[t].times : e[t] = s.logCounter[t]);
                        s.logCounter = {}, s.isEmptyObject(e) || (i.setItem("logReport", n.stringify(e)), i.setItem("logTimestamp", +new Date))
                    }
                    clearInterval(s.setLogTimer), s.setLogTimer = null
                }
            },
            setLocalLog: function(e) {
                s.processLog(e) && (s.setLogTimer || (s.setLogTimer = setInterval(function() {
                    s.writeLocalStorage()
                }, s.writeLogInterval)), s.sendLogTimer || (s.sendLogTimer = setInterval(function() {
                    s.sendLocalLog()
                }, s.sendLogInterval)))
            },
            sendLocalLog: function() {
                if ("undefined" != typeof i && i.getItem("logReport")) {
                    var e = n.parseJSON(i.getItem("logReport")),
                        t = +i.getItem("logTimestamp");
                    if (+new Date - t < s.logTimeout && !s.isEmptyObject(e)) for (var o = s.processLogForSend(e), r = 0; r < o.length; r++) s.sendLog(o[r]);
                    i.removeItem("logReport"), i.setItem("logTimestamp", +new Date), clearInterval(s.sendLogTimer), s.sendLogTimer = null
                }
            },
            sendLog: function(e) {
                var t = n.extend({
                    url: "//update.pan.baidu.com/statistics",
                    clienttype: "0",
                    uk: yunData.MYUK
                }, e);
                s.logInstance.send(t)
            },
            init: function() {
                s.logInstance = new r, setTimeout(function() {
                    s.sendLocalLog(), n(window).bind("beforeunload", function() {
                        s.writeLocalStorage()
                    })
                }, 1e3)
            }
        },
        l = {
            init: function() {
                return s.init(), {
                    sendLog: s.sendLog,
                    setLocalLog: s.setLocalLog
                }
            }
        };
    o.exports = l.init()
});;
define("system-core:system/uiService/page/page.js", function(e, a, t) {
    var i = e("base:widget/libs/jquerypacket.js"),
        s = function(e) {
            if ("object" != typeof e) throw "error: the param CONF is not a object";
            this._listLength = e.allNu || 0, this._everyPageNu = e.everyPageNu || 100, this._im_active = e.im_active || !1, this._pageContainer = e.pageContainer || null, this._pageType = e.pageType || !1, this._pageNuShow = e.pageNuShow || 7, this._pageBorder = e.pageBorder || !1, this._currentPageNu = 1, this._html = void 0, this._display = !1, this._visible = !0, this._activeTimeout = null, this._maxPageNu = 1, this._renderPage(1)
        };
    s.prototype = {
        init: function() {
            var e = this._pageType ? "pagese " + (this._pageBorder ? "page-border" : "") : "paging",
                a = ['<div class="' + e + '">'],
                t = this;
            a.push('<a href="javascript:void(0)" class="page-home mou-evt">首页</a>'), a.push('<a href="javascript:void(0)" class="page-prev">上一页</a>'), t._pageType ? a.push('<span class="page-content"></span>') : (a.push('<span class="txt">第</span>'), a.push('<span class="page-input-wrap"><input type="text" class="page-input"/></span>'), a.push('<span class="txt">/<b class="page-all"></b>页</span>')), a.push('<a href="javascript:void(0)" class="page-next mou-evt">下一页</a>'), a.push('<a href="javascript:void(0)" class="page-end mou-evt" >末页</a>'), a.push("</div>"), this._html = a.join("\n"), null !== this._pageContainer && (!this._pageContainer instanceof i && (this._pageContainer = i(this._pageContainer)), this._initContainerDelegate.call(this))
        },
        _initContainerDelegate: function() {
            var e = this;
            this._pageContainer.delegate(".page-home", "click", function() {
                i(this).hasClass("g-disabled") || 1 === e._currentPageNu || (e._currentPageNu = 1, e._renderPage(e._currentPageNu), e.onActive.call(e, e._currentPageNu, (e._currentPageNu - 1) * e._everyPageNu, e._everyPageNu))
            }), this._pageContainer.delegate(".page-end", "click", function() {
                i(this).hasClass("g-disabled") || e._currentPageNu === e._maxPageNu || (e._currentPageNu = e._maxPageNu, e._renderPage(e._currentPageNu), e.onActive.call(e, e._currentPageNu, (e._currentPageNu - 1) * e._everyPageNu, e._everyPageNu))
            }), this._pageContainer.delegate(".page-prev", "click", function() {
                i(this).hasClass("g-disabled") || 1 === e._currentPageNu || (e._currentPageNu--, e._renderPage(e._currentPageNu), e.onActive.call(e, e._currentPageNu, (e._currentPageNu - 1) * e._everyPageNu, e._everyPageNu))
            }), this._pageContainer.delegate(".page-next", "click", function() {
                i(this).hasClass("g-disabled") || e._currentPageNu === e._maxPageNu || (e._currentPageNu++, e._renderPage(e._currentPageNu), e.onActive.call(e, e._currentPageNu, (e._currentPageNu - 1) * e._everyPageNu, e._everyPageNu))
            }), this._pageContainer.delegate(".page-number", "click", function() {
                if (!i(this).hasClass("g-disabled")) {
                    var a = i(this).text(),
                        t = parseInt(a);
                    e._currentPageNu = t, e._renderPage(t), e.onActive.call(e, e._currentPageNu, (e._currentPageNu - 1) * e._everyPageNu, e._everyPageNu)
                }
            }), this._pageContainer.delegate(".page-input", "keyup", function() {
                if (e._im_active) {
                    var a = i(this).val(),
                        t = parseInt(a);
                    t != a || 0 >= t || t > e._maxPageNu || (e._currentPageNu = t, clearTimeout(e._activeTimeout), e._activeTimeout = setTimeout(function() {
                        e._renderPage(e._currentPageNu), e.onActive.call(e, e._currentPageNu, (e._currentPageNu - 1) * e._everyPageNu, e._everyPageNu)
                    }, 1500))
                }
            }), this._pageContainer.delegate(".page-input", "change", function() {
                var a = i(this).val(),
                    t = parseInt(a);
                t != a || 0 >= t || t > e._maxPageNu || (e._im_active && (clearTimeout(e._activeTimeout), e._im_active = !1, e._activeTimeout = setTimeout(function() {
                    e._im_active = !0
                }, 2e3)), e._currentPageNu = t, e._renderPage(e._currentPageNu), e.onActive.call(e, e._currentPageNu, (e._currentPageNu - 1) * e._everyPageNu, e._everyPageNu))
            })
        },
        _countMaxPageNu: function() {
            if (0 === this._listLength) return this._maxPageNu = 0, this._maxPageNu;
            var e = this._listLength / this._everyPageNu + (this._listLength % this._everyPageNu == 0 ? 0 : 1) || 1;
            return this._maxPageNu = Math.floor(e), this._maxPageNu
        },
        setPageContainer: function(e) {
            return this._pageContainer = !e instanceof i ? i(e) : e, this._initContainerDelegate.call(this), this
        },
        _insertPage: function(e) {
            var a = "";
            if (this._maxPageNu <= this._pageNuShow) for (var t = 0; t < this._maxPageNu; t++) a += '<span class="page-number ' + (e == t + 1 ? "g-disabled" : "") + '">' + (t + 1) + "</span>";
            else {
                a = '<span class="pe-ellipsis">...</span>';
                for (var t = 0; t < this._pageNuShow; t++) a += '<span class="page-number">' + (t + 1) + "</span>";
                a += '<span class="ne-ellipsis">...</span>'
            }
            i(".page-content", this._pageContainer).html(a), this._maxPageNu > this._pageNuShow ? this._countPage(e) : (i(".page-prev", this._pageContainer).addClass("none"), i(".page-next", this._pageContainer).addClass("none"))
        },
        _countPage: function(e) {
            var a = (this._pageNuShow - 1) / 2,
                t = "";
            if (i(".page-prev", this._pageContainer).removeClass("none"), i(".pe-ellipsis", this._pageContainer).removeClass("none"), i(".page-next", this._pageContainer).removeClass("none"), i(".ne-ellipsis", this._pageContainer).removeClass("none"), e > a + 1 && this._maxPageNu - e > a) for (var s = 0; s < this._pageNuShow; s++) t = e + s - a == e ? "g-disabled" : "", i(".page-number", this._pageContainer).eq(s).text(e + s - a).addClass(t);
            else if (a + 1 >= e) i(".page-number", this._pageContainer).eq(e - 1).addClass("g-disabled"), i(".pe-ellipsis", this._pageContainer).addClass("none"), i(".page-prev", this._pageContainer).addClass("none");
            else if (this._maxPageNu - e <= a) {
                for (var s = 0; s < this._pageNuShow; s++) t = this._maxPageNu - this._pageNuShow + s + 1 == e ? "g-disabled" : "", i(".page-number", this._pageContainer).eq(s).text(this._maxPageNu - this._pageNuShow + s + 1).addClass(t);
                i(".ne-ellipsis", this._pageContainer).addClass("none"), i(".page-next", this._pageContainer).addClass("none")
            }
        },
        _renderPage: function(e) {
            return this._countMaxPageNu.call(this), e > this._maxPageNu ? void this._renderPage(this._maxPageNu) : 0 === this._listLength ? void this.setDisplay(!1) : this._maxPageNu <= 1 && this._display ? void this.setDisplay(!1) : (this._maxPageNu > 1 && !this._display ? this.setDisplay(!0) : this._maxPageNu > 1 && this._display && (this._pageType ? this._insertPage(e) : (i(".page-all", this._pageContainer).text(this._maxPageNu), i(".page-input", this._pageContainer).val(e))), i(".page-prev", this._pageContainer).removeClass("g-disabled"), i(".page-home", this._pageContainer).removeClass("g-disabled"), i(".page-next", this._pageContainer).removeClass("g-disabled"), i(".page-end", this._pageContainer).removeClass("g-disabled"), 1 == e && (i(".page-prev", this._pageContainer).addClass("g-disabled"), i(".page-home", this._pageContainer).addClass("g-disabled")), this._maxPageNu == e && (i(".page-next", this._pageContainer).addClass("g-disabled"), i(".page-end", this._pageContainer).addClass("g-disabled")), void(this._currentPageNu = e))
        },
        setDisplay: function(e) {
            if (e) {
                if (1 == this._maxPageNu) return void this.setDisplay(!1);
                if ("undefined" == typeof this._html && this.init.call(this), null === this._pageContainer) return;
                this._pageContainer.html(this._html), this._pageType ? this._insertPage(1) : (i(".page-input", this._pageContainer).val(1), i(".page-all", this._pageContainer).text(this._maxPageNu))
            } else this._pageContainer.html("");
            this._display = e
        },
        setVisible: function(e) {
            e ? this._pageContainer.show() : this._pageContainer.hide(), this._visible = e
        },
        chageAllNu: function(e, a) {
            if (this._listLength == e) return !1;
            this._listLength = e;
            var t = this;
            this._countMaxPageNu(), this._currentPageNu > this._maxPageNu && (this._currentPageNu = this._maxPageNu), this._renderPage(this._currentPageNu), a || t.onActive.call(t, t._currentPageNu, (t._currentPageNu - 1) * t._everyPageNu, t._everyPageNu)
        },
        chageEveryPageNu: function(e) {
            if (1 > e || this._everyPageNu == e) return !1;
            var a = this;
            this._everyPageNu = e, this._countMaxPageNu(), this._currentPageNu > this._maxPageNu && (this._currentPageNu = this._maxPageNu), this._renderPage(this._currentPageNu), a.onActive.call(a, a._currentPageNu, (a._currentPageNu - 1) * a._everyPageNu, a._everyPageNu)
        },
        goNext: function() {
            this._pageContainer.find(".page-next").trigger("click")
        },
        goPrev: function() {
            this._pageContainer.find(".page-prev").trigger("click")
        },
        goTo: function(e, a) {
            return "number" == typeof e && e >= 0 && e <= this._maxPageNu ? (this._currentPageNu = e, this._renderPage(e), void(a && _this.onActive.call(_this, _this._currentPageNu, (_this._currentPageNu - 1) * _this._everyPageNu, _this._everyPageNu))) : !1
        },
        refreshCurrentPage: function(e, a) {
            e && (this._listLength = e), a && (this._everyPageNu = a), this._renderPage(this._currentPageNu), this.onActive(this._currentPageNu, (this._currentPageNu - 1) * this._everyPageNu, this._everyPageNu)
        },
        onActive: function() {}
    }, s.prototype.constructor = s, t.exports = s
});;
define("system-core:system/uiService/motionSensor/motionSensor.js", function(t, i, n) {
    var o = !1,
        s = function(t, i) {
            this._mPrivateFlags = 0, this._mCanvasView = t, this._mOrientation = i, this._mMotionPoint = [-1, -1], this._mLastMotionPoint = [-1, -1], this._mNativeSensors = []
        };
    s.MOTION_LISTENING = 1, s.INSTALLED = 2, s.MOTION_ACCEPT = 4, s.HORIZONTAL = 0, s.VERTICAL = 1, s.TOUCH_THRESHOLD = 5, s.hasMotionCampatibility = function() {
        return "ontouchstart" in document
    }, s.prototype = {
        onMotionStart: function() {},
        onMotionEnd: function() {},
        onMotion: function() {},
        dispatchMotionStart: function(t, i) {
            this._mMotionPoint[0] = t, this._mMotionPoint[1] = i, o && console.log("Motion Start " + t + ":" + i), this._mPrivateFlags |= s.MOTION_LISTENING, this.onMotionStart(this._mCanvasView, this._mMotionPoint)
        },
        dispatchMotionMove: function(t, i) {
            var n = s.MOTION_LISTENING,
                e = s.MOTION_ACCEPT;
            if ((this._mPrivateFlags & n) == n) {
                var a = this._mMotionPoint[0],
                    r = this._mMotionPoint[1],
                    h = -1 == this._mLastMotionPoint[0] ? a : this._mLastMotionPoint[0],
                    m = -1 == this._mLastMotionPoint[1] ? r : this._mLastMotionPoint[1];
                this._mLastMotionPoint[0] = t, this._mLastMotionPoint[1] = i;
                var _ = t - h,
                    c = i - m;
                return o && console.log("Motion Delta: " + _ + "-" + c), (this._mPrivateFlags & e) == e ? void this.onMotion(this._mCanvasView, this._mLastMotionPoint, _, c, this._mOrientation) : void(this._motionAccept(a, r, t, i) && (o && console.log("touch accept"), this._mPrivateFlags |= s.MOTION_ACCEPT, this.onMotion(this._mCanvasView, this._mLastMotionPoint, _, c, this._mOrientation)))
            }
        },
        dispatchMotionEnd: function() {
            o && console.log("Touch End");
            var t = s.MOTION_LISTENING;
            (this._mPrivateFlags & t) == t && (this._mPrivateFlags &= ~ (s.MOTION_LISTENING | s.MOTION_ACCEPT), this._mMotionPoint[0] = -1, this._mMotionPoint[1] = -1, this._mLastMotionPoint[0] = -1, this._mLastMotionPoint[1] = -1)
        },
        getOrientation: function() {
            return this._mOrientation
        },
        setOrientation: function(t) {
            this._mOrientation = t
        },
        getInitialMotionPoint: function() {
            return this._mInitialPoint
        },
        _motionAccept: function(t, i, n, o) {
            var e = n - t,
                a = o - i,
                r = Math.abs(e),
                h = Math.abs(a);
            return this._mOrientation == s.HORIZONTAL ? h > r ? !1 : r < s.TOUCH_THRESHOLD ? !1 : !0 : r > h ? !1 : h < s.TOUCH_THRESHOLD ? !1 : !0
        },
        uninstall: function() {
            var t = s.INSTALLED;
            (this._mPrivateFlags & t) == t && (this._mPrivateFlags &= ~ (s.MOTION_LISTENING | s.MOTION_ACCEPT | s.INSTALLED), this._mCanvasView.removeEventListener("touchstart", this._mNativeSensors[0], !1), this._mCanvasView.removeEventListener("touchmove", this._mNativeSensors[1], !1), document.removeEventListener("touchend", this._mNativeSensors[2], !1), document.removeEventListener("touchcancel", this._mNativeSensors[2], !1))
        },
        install: function() {
            var t = s.INSTALLED,
                i = this;
            if ((this._mPrivateFlags & t) != t) {
                this._mPrivateFlags |= t;
                var n = function(t) {
                    var n = t.touches[0];
                    return i.dispatchMotionStart(n.clientX, n.clientY), !1
                };
                this._mCanvasView.addEventListener("touchstart", n, !1), this._mNativeSensors[0] = n;
                var o = function(t) {
                    var n = t.touches[0];
                    return i.dispatchMotionMove(n.clientX, n.clientY), t.preventDefault(), t.stopPropagation(), !1
                };
                this._mCanvasView.addEventListener("touchmove", o, !1), this._mNativeSensors[1] = o;
                var e = function() {
                    i.dispatchMotionEnd()
                };
                document.addEventListener("touchend", e, !1), document.addEventListener("touchcancel", e, !1), this._mNativeSensors[2] = e
            }
        }
    }, n.exports = s
});;
define("system-core:system/uiService/keyGuard/keyGuard.js", function(e, t, i) {
    var s = !1,
        n = e("base:widget/libs/jquerypacket.js"),
        a = function() {
            this._mPrivateFlags = 0
        };
    a.prototype = {
        onMount: function() {},
        onConnectivity: function() {},
        onKeyAction: function() {},
        onKeyEvent: function() {}
    };
    var r = function() {
        this._mPrivateFlags = 0, this._mListeners = [], this._mHijacker = null, this._mHijackContext = null
    };
    r.EVENT_ARROW_UP = 38, r.EVENT_ARROW_DOWN = 40, r.EVENT_ARROW_LEFT = 37, r.EVENT_ARROW_RIGHT = 39, r.EVENT_PAGE_UP = 33, r.EVENT_PAGE_DOWN = 34, r.EVENT_ENTER = 13, r.EVENT_ESCAPE = 27, r.INSTALL = 1, r.EXCLUSIVE_LOCK = 2, r.prototype = {
        acquire: function(e, t) {
            if ((this._mPrivateFlags & r.EXCLUSIVE_LOCK) == r.EXCLUSIVE_LOCK) throw new Error("exclusive lock must be relase before anybody else try to acqiure keyguard service");
            if (s && console.log("execusive acquire ", t), this._install(), t) {
                this._mPrivateFlags |= r.EXCLUSIVE_LOCK;
                for (var i = 0, n = this._mListeners.length; n > i; i++) this._mListeners[i].onConnectivity(!1)
            }
            this._mListeners.push(e), e.onMount(!0)
        },
        release: function(e) {
            for (var t = (this._mPrivateFlags & r.EXCLUSIVE_LOCK) == r.EXCLUSIVE_LOCK, i = !1, n = 0, a = this._mListeners.length; a > n; n++) if (e == this._mListeners[n]) {
                if (this._mListeners[n].onMount(!1), this._mListeners.splice(n, 1), !t) break
            } else i && this._mListners[n].onConnectivity(!0);
            t && (this._mPrivateFlags &= ~r.EXCLUSIVE_LOCK), this._mHijacker = null, this._mHijackContext = null, s && console.log("relase keyguard and hijacker"), 0 == this._mListeners.length && this._uninstall()
        },
        hijackKeyEvent: function(e, t) {
            var i = (this._mPrivateFlags & r.EXCLUSIVE_LOCK) == r.EXCLUSIVE_LOCK;
            return i ? (this._mHijacker = e, this._mHijackContext = t, s && console.log("hijack keyevent now"), !0) : !1
        },
        dispatchKeyEvent: function(e) {
            for (var t = (this._mPrivateFlags & r.EXCLUSIVE_LOCK) == r.EXCLUSIVE_LOCK, i = null, s = this._mListeners.length, n = s - 1; n >= 0; n--) {
                i = this._mListeners[n];
                var a = !0;
                a &= e.shiftKey, a &= e.ctrlKey, a &= e.altKey;
                var _ = !1;
                if (!a) switch (e.keyCode) {
                    case r.EVENT_ARROW_UP:
                    case r.EVENT_ARROW_DOWN:
                    case r.EVENT_ARROW_LEFT:
                    case r.EVENT_ARROW_RIGHT:
                    case r.EVENT_PAGE_UP:
                    case r.EVENT_PAGE_DOWN:
                    case r.EVENT_ENTER:
                    case r.EVENT_ESCAPE:
                        _ = i.onKeyAction(e.keyCode)
                }
                if (_ || (this._mHijacker ? this._mHijacker.call(this._mHijackContext ? this._mHijackContext : this, e.keyCode, {
                        shift: e.shiftKey,
                        ctrl: e.ctrlKey,
                        alt: e.altKey
                    }) : i.onKeyEvent(e.keyCode, {
                        shift: e.shiftKey,
                        ctrl: e.ctrlKey,
                        alt: e.altKey
                    })), n == s - 1 && t) break
            }
        },
        _install: function() {
            if ((this._mPrivateFlags & r.INSTALL) != r.INSTALL) {
                var e = this;
                n(document).bind("keyup", function(t) {
                    e.dispatchKeyEvent(t)
                }), s && console.log("Keyguard service installed"), this._mPrivateFlags |= r.INSTALL
            }
        },
        _uninstall: function() {
            (this._mPrivateFlags & r.INSTALL) == r.INSTALL && (n(document).unbind("keyup"), s && console.log("Keyguard service uninstalled"), this._mPrivateFlags &= ~r.INSTALL)
        }
    }, i.exports = r
});;
define("system-core:system/uiService/mouseWheelSensor/mouseWheelSensor.js", function(e, t, n) {
    var i = function(e) {
        this._mPrivateFlags = 0, this._mView = e, this.onWheelChanged = null
    };
    i.FORWARD = 1, i.BACKWARD = 2, i.FLAG_PREVENT_DEFAULT = !1, i.BUILD = 4, i.prototype = {
        _init: function() {
            if ((this._mPrivateFlags & i.BUILD) != i.BUILD) {
                var e = this,
                    t = function() {
                        var t = window.event ? window.event : arguments[0],
                            n = 0;
                        t.wheelDelta ? n = t.wheelDelta / 120 : t.detail && (n = -t.detail / 3), n && e._sendWheelChangedMessage(n > 0 ? i.BACKWARD : i.FORWARD, Math.abs(n)), i.FLAG_PREVENT_DEFAULT && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
                    };
                "undefined" != typeof window.attachEvent ? this._mView.attachEvent("onmousewheel", t) : "onmousewheel" in window ? this._mView.addEventListener("mousewheel", t, !1) : "undefined" != typeof window.addEventListener && this._mView.addEventListener("DOMMouseScroll", t, !1), this._mPrivateFlags |= i.BUILD
            }
        },
        sense: function() {
            this._init()
        },
        setPreventDefault: function(e) {
            i.FLAG_PREVENT_DEFAULT = e
        },
        _sendWheelChangedMessage: function(e, t) {
            "function" == typeof this.onWheelChanged && this.onWheelChanged.call(this, e, t)
        }
    }, n.exports = i
});;
define("system-core:system/uiService/historyListManage/historyListManage.js", function(t, i, s) {
    var e = t("base:widget/libs/jquerypacket.js"),
        r = t("base:widget/tools/tools.js"),
        o = t("base:widget/historyManager/historyManager.js"),
        h = t("system-core:system/baseService/message/message.js"),
        n = function(t) {
            this.historyList = [], this.historyListTips = [], this.historyListParents = [], t || (t = {}), t.container ? (t.$container = e(t.container), t.renderDefaultDom = !0) : t.renderDefaultDom = !1, this.config = t, this.init()
        };
    n.prototype.init = function() {
        if (this.config.renderDefaultDom) {
            var t = this.config.$container;
            if (this.config && this.config.needSwitch && this.config.needSwitch === !0) {
                t.find(".history-list-tips").before(a.historySwitchHTML()), this.$swicthButton = t.find(".historylistmanager-switch");
                var i = o.getCurrentParams();
                "grid" === i.vmode && this.$swicthButton.addClass("current")
            }
            t.append(a.historyHTML()), this.$historyList = t.find('ul[node-type="historylistmanager-history"]'), this.$historySubList = t.find('li[node-type="historylistmanager-history-list"]'), this.bindEvent()
        }
    }, n.prototype.bindEvent = function() {
        if (this.config.renderDefaultDom) {
            var t = this;
            t.$historyList.delegate("a", "click", function() {
                var i = e(this),
                    s = parseInt(i.attr("data-deep"), 10);
                t._goHistoryByDeep(s)
            }), this.config && this.config.needSwitch && this.config.needSwitch === !0 && t.config.$container.delegate(".historylistmanager-switch", "click", function() {
                e(this).toggleClass("current");
                var t = e(this).hasClass("current"),
                    i = o.getCurrentParams(),
                    s = o.getCurrentModule();
                i.vmode = t ? "grid" : "list", h.trigger("system-change-view-mode-loadingtip"), o.getDefault().addHistory(o.buildHistory(s, i))
            })
        }
    }, n.prototype._goHistoryByDeep = function(t) {
        -1 === t ? this.goPrev() : this.goToHistory(t + 1)
    }, n.prototype.addHistory = function(t, i) {
        this.historyList.push(t), this.historyListTips.push(i), this.historyChange()
    }, n.prototype.getPath = function() {
        var t = this.historyList.join("/");
        return t = ("/" + t + "/").replace(/^\/+/, "/")
    }, n.prototype.changeHistory = function(t, i, s) {
        t.length !== i.length || t.length <= 0 || (this.historyList = t, this.historyListTips = i, this.historyListParents = s || [], this.historyChange())
    }, n.prototype.goToHistory = function(t) {
        t >= this.historyList.length || 0 > t || (this.historyList.splice(t, this.historyList.length), this.historyListTips.splice(t, this.historyListTips.length), this.historyChange())
    }, n.prototype.goPrev = function() {
        this.goToHistory(this.historyList.length - 1, "isPrev")
    }, n.prototype.clear = function() {
        this.historyList.length = 0, this.historyListTips.length = 0, this.historyChange()
    }, n.prototype.historyChange = function() {
        this.renderHistoryDOM(), this.onHistoryChange(this.historyList, this.historyListTips, this.historyListParents)
    }, n.prototype.getFullPathStr = function(t, i) {
        return i = Math.min(t.length, i), t.slice(0, i + 1).join("/")
    }, n.prototype.renderHistoryDOM = function() {
        var t = 0;
        if (this.config.renderDefaultDom) {
            for (var i = [], s = 0; s < this.historyListTips.length; s++) e.inArray(this.historyListTips[s], this.historyListParents) < 0 ? i.push(this.historyListTips[s]) : t += 1;
            if (this.historyListParents.length > 0 && (this.historyListTips = i), !(this.historyListTips.length > 1)) return void this.$historyList.hide();
            this.$historyList.show();
            var o, h, n = [],
                a = 8,
                y = 4,
                g = this.historyListTips.slice();
            "" === g[g.length - 1] && (g.length = g.length - 1), g.length <= 2 ? a = 30 : g.length <= 3 && (a = 15);
            var l = (this.$historyList.width() - 138, Math.max(g.length - y, 0)),
                c = g;
            if (g.length > y) {
                c = g.slice(l);
                var p = r.encodeHTML(this.getFullPathStr(g, g.length - y));
                n[n.length] = '<span title="' + p + '">...</span><span class="historylistmanager-separator-gt">&gt;</span>'
            }
            for (var u = 0, f = c.length; f > u; u++) {
                o = c[u], h = o.length > a ? o.substring(0, a) + "..." : o, h = r.encodeHTML(h);
                var d = r.encodeHTML(this.getFullPathStr(g, u + l));
                n[n.length] = u !== f - 1 ? '<a href="javascript:;" title="' + d + '" data-deep="' + (u + l) + '">' + h + '</a><span class="historylistmanager-separator-gt">&gt;</span>' : '<span title="' + d + '">' + h + "</span>"
            }
            this.$historySubList.html(n.join("")), this.changeHistoryList()
        }
    }, n.prototype.onHistoryChange = function() {}, n.prototype.changeHistoryList = function() {
        this.$historyList.find(".listTitle").html(this.historyListTips[0]), this.onChangeHistoryList()
    }, n.prototype.onChangeHistoryList = function() {};
    var a = {
        indexArray: function(t, i) {
            return e.inArray(t, i)
        },
        historySwitchHTML: function() {
            return '<a class="historylistmanager-switch"></a>'
        },
        historyHTML: function() {
            return '<ul class="historylistmanager-history" node-type="historylistmanager-history"><li><a data-deep="-1" href="javascript:;">返回上一级</a><span class="historylistmanager-separator">|</span></li><li node-type="historylistmanager-history-list"></li></ul>'
        }
    };
    s.exports = n
});;
define("system-core:system/uiService/list/listHeader.js", function(e, i, t) {
    var s = e("base:widget/libs/jquerypacket.js"),
        n = (e("system-core:system/baseService/message/message.js"), e("system-core:system/uiService/log/log.js").instanceForSystem),
        o = function(e) {
            if (e === !1) this.hasInit = !1;
            else {
                if (!e || !e.container) throw new Error("config.container is empty!");
                this.config = e, this.$container = s(e.container), this.canTriggerOrder = e.canTriggerOrder, this.init()
            }
        };
    o.prototype.init = function() {
        if (this.hasInit !== !1) {
            var e = this.$container;
            e.append(this.getHeaderDom()), this.config.columns && this.buildHeader(this.config), this.bindEvent()
        }
    }, o.prototype.buildHeader = function(e) {
        if (this.hasInit !== !1) {
            this.config = e;
            var i = this.$container.find(c.listCols),
                t = this.getHeaderColumnsDom();
            i.html(t), e.order && this.updateOrder(e.order, e.desc, !0)
        }
    }, o.prototype.bindEvent = function() {
        if (this.hasInit !== !1) {
            var e = this.$container,
                i = this;
            e.delegate(c.col, "click", function() {
                var e = s(this),
                    t = e.index();
                return i.operateClick(t, e), !1
            }).delegate(c.check, "click", function() {
                var e = (new Date).getTime(),
                    t = s(this),
                    o = t.closest(c.col),
                    r = o.index();
                i.operateChecked(r, o);
                var a = (new Date).getTime();
                return n.send({
                    name: "listAllSel",
                    value: a - e
                }), n.send({
                    name: "listAllSelCount",
                    value: 1
                }), !1
            })
        }
    }, o.prototype.getHeaderDom = function() {
        if (this.hasInit !== !1) {
            var e = [];
            return e.push(r.buildBefore()), e.push(r.buildAfter()), e.join("")
        }
    }, o.prototype.getHeaderColumnsDom = function() {
        if (this.hasInit !== !1) {
            for (var e, i = this.config.columns, t = [], s = 0, n = i.length; n > s; s++) e = i[s], t.push(r.buildItem(e, 0 === s, s === n - 1));
            return t.join("")
        }
    }, o.prototype.operateClick = function(e, i) {
        if (this.hasInit !== !1) {
            var t, s = this.config,
                n = s.order,
                o = s.desc;
            t = i.attr(c.dataKey), t === n && (o = 0 === o ? 1 : 0), this.updateOrder(t, o, !1)
        }
    }, o.prototype.operateChecked = function(e, i) {
        if (this.hasInit !== !1) {
            var t = i.hasClass(c.checked);
            this.onCheckChanged(!t)
        }
    }, o.prototype.onCheckChanged = function() {}, o.prototype.updateOrder = function(e, i, t) {
        if (this.hasInit !== !1 && ("function" != typeof this.canTriggerOrder || this.canTriggerOrder() !== !1)) {
            var s, n = this.$container,
                o = n.find('li[data-key~="' + e + '"]'),
                r = o.index();
            if (o.length < 1) return !1;
            if (s = this.config.columns[r], s.order === !1) return !1;
            o.removeClass(c.ascend).removeClass(c.descend), o.siblings().removeClass(c.ascend).removeClass(c.descend), o.addClass(1 === i ? c.descend : c.ascend), this.config.order = e, this.config.desc = i, t || this.onOrderChange(e, i)
        }
    }, o.prototype.changeChecked = function(e, i) {
        if (this.hasInit !== !1) {
            var t = this.$container,
                s = t.find(c.checkbox).parent(),
                n = t.find(c.checkCountTips),
                o = e > 0 && i > 0,
                r = e > 0 && e === i;
            o ? t.addClass(c.visibleOperate) : t.removeClass(c.visibleOperate), r ? s.addClass(c.checked) : s.removeClass(c.checked), n.text(this.getCheckMsg(e, i))
        }
    }, o.prototype.getCheckMsg = function(e) {
        return this.hasInit !== !1 ? "已选中" + e + "个文件/文件夹" : void 0
    }, o.prototype.onOrderChange = function() {}, o.prototype.getOperateContainer = function() {
        if (this.hasInit !== !1) {
            var e = this.$container,
                i = e.find(c.operate);
            return i
        }
    }, o.prototype.changeVmode = function(e) {
        if (this.hasInit !== !1) {
            var i = this.$container,
                t = i.find(c.gridCols),
                s = i.find(c.listCols);
            "list" === e.type ? (t.hide(), s.show()) : "grid" === e.type && (t.show(), s.hide())
        }
    };
    var r = {
            buildItem: function(e, i, t) {
                var s = "",
                    n = "col ",
                    o = "";
                return e.visible === !1 && (s += "display:none;"), i && (n += "first-col "), e.order === !1 && (n += "order-disabled "), t && (n += "last-col "), s += "width:" + e.width + "%;", e.checkbox && (o = r.buildCheckbox()), '<li data-key="' + e.key + '" class="' + n + '" style="' + s + '">' + o + '<span class="text">' + e.name + '</span><span class="order-icon"></span><span class="icon up-icon icon-up"></span><span class="icon downtitle-icon icon-downtitle"></span></li>'
            },
            buildBefore: function() {
                return '<div class="list-header"><ul class="list-cols" node-type="cols">'
            },
            buildAfter: function() {
                return "</ul>" + r.buildGridCols() + r.buildOperateArea() + "</div>"
            },
            buildCheckbox: function() {
                return '<div node-type="check" class="col-item check"><span class="check-icon"></span><span class="check-all-text">全选</span><span class="icon checksmall icon-checksmall"></span></div>'
            },
            buildOperateArea: function() {
                return '<div class="list-header-operatearea global-clearfix"><span class="count-tips"></span><div class="list-header-operate"></div></div>'
            },
            buildGridCols: function() {
                return '<ul class="grid-cols" node-type="cols" style="display: none;"><li class="col first-col">' + r.buildCheckbox() + "</li></ul>"
            }
        },
        c = {
            col: ".col",
            check: ".check",
            operate: ".list-header-operate",
            visibleOperate: "list-header-visible-operate",
            checked: "checked",
            checkCountTips: ".count-tips",
            dataKey: "data-key",
            ascend: "ascend",
            descend: "descend",
            checkbox: 'div[node-type~="check"]',
            gridCols: ".grid-cols",
            listCols: ".list-cols"
        };
    t.exports = o
});;
define("system-core:system/uiService/loading/loading.tpl.js", function(e, n, t) {
    var s = {
        supportCss3: function(e) {
            var n, t = ["webkit", "Moz", "ms", "o"],
                s = [],
                i = document.documentElement.style,
                r = function(e) {
                    return e.replace(/-(\w)/g, function(e, n) {
                        return n.toUpperCase()
                    })
                };
            for (n in t) s.push(r(t[n] + "-" + e));
            s.push(r(e));
            for (n in s) if (s[n] in i) return !0;
            return !1
        }
    };
    t.exports = {
        container: function(e) {
            return ['<div class="loading-container">' + e + "</div>"].join("")
        },
        tpl: function(e, n, t, i) {
            var e = e || "spinner",
                n = n || 65,
                i = i || "#4288ed",
                r = "",
                o = "";
            switch (o = "undefined" == typeof t ? '<p class="loading-text">' + t + "</p>" : t === !1 ? "" : '<p class="loading-text">' + t + "</p>", r = s.supportCss3("stroke-dashoffset") ? ['<svg class="spinner" width="' + n + 'px" height="' + n + 'px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">', '<circle class="path" fill="none" stroke-width="6"', 'stroke-linecap="round" cx="33" cy="33" r="30" style="stroke:' + i + '"></circle>', "</svg>"].join("") : '<img src="/box-static/system-core/system/uiService/loading/img/_nomd5/loading.gif" width="' + n + '" height="' + n + '"/>', e) {
                case "spinner":
                    return r + o;
                default:
                    return ""
            }
        }
    }
});;
define("system-core:system/uiService/loading/loading.js", function(i, n, o) {
    var t = (i("base:widget/libs/jquerypacket.js"), i("system-core:system/uiService/loading/loading.tpl.js")),
        e = function(i) {
            this.config(i), this.init()
        };
    e.prototype.config = function(i) {
        var i = i || {};
        this.config = i, this.config.loadingType = i.loadingType || "spinner", this.config.size = i.size, this.config.text = i.text, this.config.color = i.color, this.config.$container = i.container || !1
    }, e.prototype.doLoading = function() {
        var i = this.config.loadingType || "spinner",
            n = t.tpl(i, this.config.size, this.config.text, this.config.color);
        return this.config.$container ? (this.config.$container.find("loading-container").length > 0 ? this.config.$container.find("loading-container").replaceWith(t.container(n)) : this.config.$container.append(t.container(n)), n) : void 0
    }, e.prototype.tpl = function() {
        var i = this.config.loadingType,
            n = t.tpl(i, this.config.size, this.config.text, this.config.color);
        return n
    }, e.prototype.show = function() {
        this.config.$container.find(".loading-container").show()
    }, e.prototype.hide = function() {
        this.config.$container.find(".loading-container").hide()
    }, e.prototype.init = function() {
        return this.doLoading()
    }, o.exports = e
});;
define("system-core:system/uiService/list/listView/listView.js", function(t, e, i) {
    "use strict";
    var n = (t("base:widget/libs/jquerypacket.js"), function() {
        this.listsData = null, this.dataCount = 0, this.itemHeight = null, this.mPrivateFlags = 0, this.mCheckedChildren = [], this.CLONE_VIEW_BUILD = 1, this.DATA_CHANGED = 2, this.CHECKED_ALL = 128, this.PRESERVE_CHECKED_STATE = 256, this.LOCKED = 512, this.FLAG_PREVENT_DEFAULT = !1
    });
    n.prototype = {
        init: function(t) {
            t = t || {}, "function" == typeof t.buildView && (this.buildView = t.buildView), "function" == typeof t.getView && (this.getView = t.getView), "function" == typeof t.needOrNotLoadMore && (this.needOrNotLoadMore = t.needOrNotLoadMore), "function" == typeof t.onComputeScrollbarChange && (this.onComputeScrollbarChange = t.onComputeScrollbarChange), "function" == typeof t.onCheckeChanged && (this.onCheckeChanged = t.onCheckeChanged), null != t.$listViewOuter && (this.$listViewOuter = t.$listViewOuter), this.bindEvent()
        },
        bindEvent: function() {},
        setBackedData: function() {},
        appendBackedData: function() {},
        updateBackedData: function() {},
        getBackedData: function() {
            return this.listsData
        },
        getElementsData: function() {
            return this.listsData
        },
        getElementDataByPosition: function(t) {
            return this.listsData && t < this.dataCount ? this.listsData[t] : null
        },
        handleDataChanged: function() {
            (this.mPrivateFlags & this.PRESERVE_CHECKED_STATE) !== this.PRESERVE_CHECKED_STATE && (this.mCheckedChildren.length = 0, this.mPrivateFlags &= ~this.CHECKED_ALL)
        },
        dispatchDataChanged: function() {
            this.mPrivateFlags |= this.DATA_CHANGED
        },
        getCount: function() {
            return this.dataCount
        },
        getViewCount: function() {
            return this.viewCount ? this.viewCount : (this.viewCount = parseInt(this.$listViewOuter.height() / this.itemHeight, 10), this.viewCount)
        },
        setItemChecked: function(t, e) {
            this.mCheckedChildren[t] = e;
            var i = (this.mPrivateFlags & this.CHECKED_ALL) === this.CHECKED_ALL;
            if (!e && i) {
                this.mPrivateFlags &= ~this.CHECKED_ALL;
                for (var n = 0, s = this.listsData.length; s > n; n++) n !== t && (this.mCheckedChildren[n] = !0)
            }
            this.onCheckeChanged()
        },
        setItemsChecked: function(t) {
            if (t) {
                var e = this.getElementsData(),
                    i = !0;
                if (null != e) for (var n = 0, s = e.length; s > n; n++) e[n].disableCheck ? (i = !1, this.mCheckedChildren[n] = !1) : this.mCheckedChildren[n] = !0;
                i ? this.mPrivateFlags |= this.CHECKED_ALL : this.mPrivateFlags &= ~this.CHECKED_ALL
            } else this.mPrivateFlags &= ~this.CHECKED_ALL, this.mCheckedChildren.length = 0;
            this.onCheckeChanged()
        },
        isItemChecked: function(t) {
            var e = (this.mPrivateFlags & this.CHECKED_ALL) === this.CHECKED_ALL;
            return e ? !0 : this.mCheckedChildren[t] === !0
        },
        isAllItemChecked: function() {
            return (this.mPrivateFlags & this.CHECKED_ALL) === this.CHECKED_ALL
        },
        getCheckedItems: function() {
            if (this.isAllItemChecked()) {
                if (null == this.listsData) return [];
                for (var t = [], e = 0, i = this.listsData.length; i > e; e++) t.push(this.listsData[e]);
                return t
            }
            var t = [];
            if (!this.listsData) return t;
            for (var e = 0, i = this.mCheckedChildren.length; i > e; e++) this.mCheckedChildren[e] === !0 && t.push(this.listsData[e]);
            return t
        },
        getCheckedIndexs: function() {
            var t = [],
                e = this.isAllItemChecked();
            if (!this.listsData) return t;
            for (var i = 0, n = this.mCheckedChildren.length; n > i; i++)(e || this.mCheckedChildren[i] === !0) && t.push(i);
            return t
        },
        getFirstCheckedIndex: function() {
            if (this.isAllItemChecked()) return 0;
            for (var t = 0, e = this.mCheckedChildren.length; e > t; t++) if (this.mCheckedChildren[t] === !0) return t
        },
        onCheckeChanged: function() {},
        importCheckedState: function() {},
        resetList: function() {},
        getFirstPosition: function() {},
        addItemToFirst: function() {},
        layout: function() {},
        requestLayout: function() {},
        locked: function() {
            return (this.mPrivateFlags & this.LOCKED) === this.LOCKED
        },
        onScroll: function() {},
        lock: function() {},
        onSystemNotify: function() {},
        fixTargetPositionVisible: function() {},
        scrollToPosition: function() {},
        setPreventDefault: function(t) {
            this.FLAG_PREVENT_DEFAULT = t
        }
    }, i.exports = n
});;
define("system-core:system/uiService/list/listView/nativeListView.js", function(t, e, i) {
    "use strict";
    var s = t("base:widget/libs/jquerypacket.js"),
        n = (t("system-core:system/baseService/message/message.js"), t("system-core:system/uiService/list/listView/listView.js")),
        o = {
            getScrollTop: function(t) {
                return t.scrollTop()
            },
            getScrollBottom: function(t) {
                var e = t.height(),
                    i = Math.max(t[0].scrollHeight, e),
                    s = t.scrollTop(),
                    n = Math.max(i - s - e, 0);
                return n
            },
            getScrollPercent: function(t) {
                var e = t.height(),
                    i = Math.max(t[0].scrollHeight, e),
                    s = t.scrollTop(),
                    n = s / (i - e);
                return n
            },
            resolveHasScroll: function(t) {
                return o.getScrollTop(t) > 0 || o.getScrollBottom(t) > 0 ? !0 : !1
            },
            getScrollBarWidth: function() {
                var t, e = document.createElement("div");
                return e.style.cssText = "display:block;width:40px;height:40px;overflow-x:hidden;overflow-y:scroll;position:absolute;left:-20px;top:0px;", document.body.appendChild(e), t = e.offsetWidth - e.clientWidth, e.parentNode.removeChild(e), t
            }
        },
        l = function(t) {
            n.call(this, t), this.startIndex = 0, null != t && (this.init(t), this.initNativeList(t))
        };
    l.prototype = new n, l.prototype.constructor = l, s.extend(l.prototype, {
        initNativeList: function(t) {
            null != t.listContainer && (this.listContainer = t.listContainer), "string" == typeof t.childrenClass && (this.childrenClass = t.childrenClass), "string" == typeof t.listItemDomName && (this.listItemDomName = t.listItemDomName), "function" == typeof t.onScroll && (this.onScroll = t.onScroll), this.bindSubListEvent()
        },
        bindSubListEvent: function() {
            var t = this,
                e = 80,
                i = -1,
                s = t.$listViewOuter,
                n = function() {
                    if ("complete" === document.readyState) {
                        clearTimeout(i), t.onScroll(), i = setTimeout(function() {
                            o.getScrollPercent(s) >= .7 && t.needOrNotLoadMore()
                        }, e);
                        var n = window.event ? window.event : arguments[0];
                        t.FLAG_PREVENT_DEFAULT && n.wheelDelta < 0 && o.getScrollBottom(s) <= 0 && (n.preventDefault ? n.preventDefault() : n.returnValue = !1)
                    }
                };
            "undefined" != typeof window.attachEvent ? s[0].attachEvent("onscroll", n) : "undefined" != typeof window.addEventListener && s[0].addEventListener("scroll", n, !1), window.sidebar && setTimeout(function() {
                s[0].scrollTo(1, 1)
            }, 1e3), "undefined" != typeof window.attachEvent ? s[0].attachEvent("onmousewheel", n) : "mousewheel" in window ? s[0].addEventListener("mousewheel", n, !1) : "undefined" != typeof window.addEventListener && s[0].addEventListener("DOMMouseScroll", n, !1)
        },
        setBackedData: function(t) {
            this.locked() || (this.resetList(), this.listsData = [].concat(t), this.dataCount = null == t ? 0 : t.length, this.startIndex = 0, this.layout(t))
        },
        appendBackedData: function(t) {
            return null == this.listsData || 0 === this.dataCount ? void this.setBackedData(t) : void(this.locked() || (this.startIndex = this.dataCount, this.listsData = this.listsData.concat(t), this.dataCount = this.listsData.length, this.layout(t)))
        },
        updateBackedData: function(t) {
            this.locked() || (this.resetList(), this.listsData = [].concat(t), this.dataCount = null == t ? 0 : t.length, this.startIndex = 0, this.mPrivateFlags |= this.DATA_CHANGED, this.layout(t))
        },
        importCheckedState: function(t) {
            if (t instanceof l) {
                this.mCheckedChildren.length = 0;
                for (var e = 0, i = t.mCheckedChildren, s = i.length; s > e; e++) this.mCheckedChildren[e] = i[e];
                this.isAllItemChecked() === !0 && t.isAllItemChecked() === !1 ? this.mPrivateFlags &= ~this.CHECKED_ALL : this.isAllItemChecked() === !1 && t.isAllItemChecked() === !0 && (this.mPrivateFlags |= this.CHECKED_ALL)
            }
        },
        onScroll: function() {},
        handleLockScroll: function(t) {
            return t.preventDefault && t.preventDefault(), t.returnValue = !1, t.stopPropagation && t.stopPropagation(), !1
        },
        lock: function(t, e) {
            var i = this;
            t ? (this.mPrivateFlags |= this.LOCKED, this.$listViewOuter.on("mousewheel DOMMouseScroll scroll", i.handleLockScroll)) : (this.mPrivateFlags &= ~this.LOCKED, this.$listViewOuter.off("mousewheel DOMMouseScroll scroll", i.handleLockScroll)), e !== !0 && this.onSystemNotify(this.NOTIFY_SYSTEM_LOCK, t)
        },
        resetList: function() {
            this.listsData = null, this.dataCount = 0, this.mPrivateFlags &= ~this.CLONE_VIEW_BUILD, this.mPrivateFlags &= ~this.DATA_CHANGED, this.listContainer.innerHTML = ""
        },
        onLayoutChange: function() {
            this.onScroll()
        },
        handleDataChanged: function() {
            (this.mPrivateFlags & this.PRESERVE_CHECKED_STATE) !== this.PRESERVE_CHECKED_STATE && (this.mCheckedChildren.length = 0, this.mPrivateFlags &= ~this.CHECKED_ALL)
        },
        layout: function(t) {
            (this.mPrivateFlags & this.DATA_CHANGED) === this.DATA_CHANGED && this.handleDataChanged();
            var e = t.length || 0;
            if (e > 0) {
                for (var i = this.startIndex || 0, n = s("<div>"), o = this.buildView(), l = 0; e > l; l++) {
                    var a = this.getView(null, o.cloneNode(!0), l + i, t[l]);
                    n.append(a)
                }
                s(this.listContainer).append(n.children()), !this.itemHeight && (this.itemHeight = s(this.listContainer).find(this.listItemDomName).eq(0).outerHeight()), this.onLayoutChange()
            }
        },
        getFirstPosition: function() {
            var t = this.$listViewOuter,
                e = s(this.listContainer),
                i = e.find(this.listItemDomName);
            if (i.length > 0) {
                var n = t.scrollTop(),
                    o = Math.floor(n / this.itemHeight);
                return o
            }
            return -1
        },
        getRenderingChildByPosition: function(t) {
            var e = this.getFirstPosition();
            return t >= 0 && t <= e + this.getViewCount() ? s(this.listContainer).find(this.childrenClass).eq(t).get(0) : null
        },
        fixTargetPositionVisible: function(t) {
            t += 1;
            var e = this.getFirstPosition(),
                i = this.getViewCount(),
                s = -1;
            return e + 1 >= t ? s = t : t > e + i && (s = t - i + 1), s >= 0 ? (this.scrollToPosition(Math.min(s, this.dataCount)), !0) : !1
        },
        scrollToPosition: function(t) {
            return this.locked() ? void 0 : 0 > t || t > this.dataCount ? !1 : (this.mPrivateFlags |= this.DATA_CHANGED, this.mPrivateFlags |= this.PRESERVE_CHECKED_STATE, this.$listViewOuter.scrollTop((t - 1) * this.itemHeight), this.mPrivateFlags &= ~this.PRESERVE_CHECKED_STATE, !0)
        }
    }), i.exports = l
});;
define("system-core:system/uiService/list/viewRecycler/viewRecycler.js", function(e, i, t) {
    var s = function() {
        this._mRecycledViews = [], this._mActiveViews = [], this._mFirstPosition = 0
    };
    s.prototype = {
        add: function(e) {
            this._mRecycledViews.push(e), e.parentNode.removeChild(e)
        },
        get: function() {
            if (0 == this._mRecycledViews.length) return null;
            var e = this._mRecycledViews.pop();
            return e
        },
        scrapActiveViews: function() {
            var e = this._mActiveViews,
                i = e.length;
            if (0 != i) {
                for (var t = 0, s = e.length; s > t; t++) this._mRecycledViews.push(e[t]);
                for (; this._mRecycledViews.length >= i;) {
                    var c = this._mRecycledViews.pop();
                    c && (c.parentNode.removeChild(c), c = null)
                }
            }
        },
        getActiveView: function(e) {
            var i = e - this._mFirstPosition,
                t = this._mActiveViews;
            if (0 > i || i > t.length - 1) return null;
            var s = t[i];
            return t[i] = null, s
        },
        preseveActiveViews: function(e, i) {
            var t = this._mActiveViews;
            t.length = e.length;
            for (var s = 0, c = e.length; c > s; s++) t[s] = e[s];
            this._mFirstPosition = i
        },
        clear: function() {
            this._mRecycledViews.length = 0
        }
    }, t.exports = s
});;
define("system-core:system/baseService/timerService/timerService.js", function(t, i, e) {
    var n = function(t, i) {
        this._timer = null, this._interval = t, this._actionListener = i, this._isAlive = !1, this._startTime = 0
    };
    n.prototype = {
        isAlive: function() {
            return this._isAlive
        },
        interrupt: function() {
            this._timer && clearTimeout(this._timer), this._timer = null, this._isAlive = !1, this._startTime = 0
        },
        setActionListener: function(t) {
            "function" == typeof t && (this._actionListener = t)
        },
        getActionListener: function() {
            return this._actionListener
        },
        start: function() {
            var t = this;
            this._timer = setTimeout(function() {
                t.interrupt(), t._actionListener.call(t)
            }, this._interval), this._startTime = (new Date).getTime(), this._isAlive = !0
        },
        getElapsed: function() {
            return (new Date).getTime() - this._startTime
        },
        setInterval: function(t) {
            "number" == typeof t && (this._interval = t)
        },
        getInterval: function() {
            return this._interval
        }
    }, e.exports = n
});;
define("system-core:system/uiService/iScrollbar/iScrollbar.js", function(t, e, i) {
    var r = t("base:widget/libs/jquerypacket.js"),
        s = t("system-core:system/baseService/timerService/timerService.js"),
        o = t("system-core:system/uiService/mouseWheelSensor/mouseWheelSensor.js"),
        n = function(t, e) {
            this._mUI = t, this._mConfig = e || {}, this._mThumbTop = 0, this._mClickTimer = null, this._mPrivateFlags = 0, this._mCoorX = -1, this._mCoorY = -1, this._mCoorWidth = 0, this._mCoorHeight = 0, this._mArrowScrollDir = -1, this._mDX = -1, this._mDY = -1, this._mConfig.defaultScroll && this._initDefaultScroll(), this._init()
        };
    n.FORWARD = 1, n.BACKWARD = 2, n.AWAKE = 4, n.THUMB_AWAKE = 8, n.COUNTING = 16, n.USING_SIMULATE_DRAG = 32, n.START_DRAGGING = 64, n.LOCKED = 128, n.HAS_BORDER = 256, n.CLICK_TIMEOUT = 300, n.prototype = {
        _initDefaultScroll: function() {
            var t = r(this._mUI.listContainer.parentNode);
            t.append('<div class="scrollbar" style="display:none" unselectable="on"><div id="scrollbarArrowUp" class="scrollbar-arrow scrollbar-arrow-up sprite" unselectable="on"></div><div class="scrollbar-tracker" unselectable="on"><div class="scrollbar-thumb" unselectable="on"></div></div><div id="scrollbarArrowDown" class="scrollbar-arrow scrollbar-arrow-down sprite" unselectable="on"></div></div>'), this._mUI.tracker = t.find(".scrollbar-tracker")[0], this._mUI.thumb = t.find(".scrollbar-thumb")[0], this._mUI.upArrow = t.find(".scrollbar-arrow-up")[0], this._mUI.downArrow = t.find(".scrollbar-arrow-down")[0], this._mUI.scrollbar = t.find(".scrollbar")[0]
        },
        _init: function() {
            this._mPrivateFlags |= n.AWAKE, this._mPrivateFlags |= n.THUMB_AWAKE, this._mPrivateFlags |= n.HAS_BORDER;
            var t = this;
            this._mUI.tracker && (this._mUI.tracker.onclick = function(e) {
                if (!t.locked()) {
                    var i = e ? e : window.event,
                        r = i.target || i.srcElement;
                    if (r != t._mUI.thumb) {
                        var s = parseInt(i.offsetY || i.layerY);
                        (s < t._mThumbTop || s > t._mThumbTop + t._mUI.thumb.offsetHeight) && (s > t._mThumbTop ? t.onPageScroll(o.FORWARD) : s < t._mThumbTop && t.onPageScroll(o.BACKWARD))
                    }
                }
            });
            var e = function(r) {
                    if ((t._mPrivateFlags & n.COUNTING) == n.COUNTING) {
                        var s = r ? r : window.event,
                            o = s.clientX,
                            l = s.clientY;
                        (o < t._mCoorX || o > t._mCoorX + t._mCoorWidth || l < t._mCoorY || l > t._mCoorY + t._mCoorHeight) && (t.abruptPersistArrowScroll(), t.onPersistArrowScrollEnd(), t._unlisten(document, "mousemove", e), t._unlisten(document, "mouseup", i))
                    }
                },
                i = function() {
                    if ((t._mPrivateFlags & n.COUNTING) == n.COUNTING) {
                        var r = t._mArrowScrollDir;
                        null != t._mClickTimer && t._mClickTimer.isAlive() ? (t._mClickTimer.interrupt(), t.onArrowScroll(r)) : t.onPersistArrowScrollEnd(r), t._mPrivateFlags &= ~n.COUNTING, t._unlisten(document, "mousemove", e), t._unlisten(document, "mouseup", i)
                    }
                },
                r = function(r) {
                    if (!t.locked() && (t._mPrivateFlags & n.COUNTING) != n.COUNTING) {
                        var o = "up" == this.getAttribute("dir") ? n.BACKWARD : n.FORWARD;
                        t._mArrowScrollDir = o;
                        var l = r ? r : window.event;
                        t._mCoorX = l.clientX - parseInt(l.offsetX || l.layerX), t._mCoorY = l.clientY - parseInt(l.offsetY || l.layerY), t._mCoorWidth = this.offsetWidth, t._mCoorHeight = this.offsetHeight, null == t._mClickTimer ? t._mClickTimer = new s(n.CLICK_TIMEOUT, null) : t._mClickTimer.interrupt(), t._mClickTimer.setActionListener(function() {
                            t.onPersistArrowScrollStart(o)
                        }), t._mClickTimer.start(), t._mPrivateFlags |= n.COUNTING, t._listen(document, "mousemove", e), t._listen(document, "mouseup", i)
                    }
                };
            if (this._mUI.upArrow && (this._mUI.upArrow.setAttribute("dir", "up"), this._mUI.upArrow.onmousedown = r), this._mUI.downArrow && (this._mUI.downArrow.setAttribute("dir", "down"), this._mUI.downArrow.onmousedown = r), this._mUI.thumb && this._mUI.tracker) {
                var l = function(e) {
                        if ((t._mPrivateFlags & n.START_DRAGGING) == n.START_DRAGGING) {
                            var i = e ? e : window.event,
                                r = i.clientX,
                                s = i.clientY;
                            t._onDragging(r, s)
                        }
                        i.preventDefault && i.preventDefault()
                    },
                    a = function() {
                        (t._mPrivateFlags & n.COUNTING) == n.COUNTING && ((t._mPrivateFlags & n.START_DRAGGING) == n.START_DRAGGING && t._endDrag(), t._mPrivateFlags &= ~n.COUNTING, t._unlisten(document, "mousemove", l), t._unlisten(document, "mouseup", a))
                    };
                this._mUI.thumb.onmousedown = function(e) {
                    if (!t.locked() && (t._mPrivateFlags & n.COUNTING) != n.COUNTING) {
                        var i = e ? e : window.event;
                        t._mDX = i.clientX, t._mDY = i.clientY, t._startDrag(), t._listen(document, "mouseup", a), t._listen(document, "mousemove", l), t._mPrivateFlags |= n.COUNTING, i.preventDefault && i.preventDefault()
                    }
                }
            }
        },
        lock: function(t) {
            t ? (this._mPrivateFlags |= n.LOCKED, -1 == this._mUI.scrollbar.className.indexOf("locked") && (this._mUI.scrollbar.className += " locked")) : (this._mPrivateFlags &= ~n.LOCKED, this._mUI.scrollbar.className = this._mUI.scrollbar.className.replace(" locked", ""))
        },
        locked: function() {
            return (this._mPrivateFlags & n.LOCKED) == n.LOCKED
        },
        _startDrag: function() {
            this._mPrivateFlags |= n.START_DRAGGING
        },
        _endDrag: function() {
            this._mPrivateFlags &= ~n.START_DRAGGING
        },
        onPageScroll: function() {},
        inSimulateDragging: function() {
            return (this._mPrivateFlags & n.USING_SIMULATE_DRAG) == n.USING_SIMULATE_DRAG
        },
        _onDragging: function(t, e) {
            if (-1 != this._mDX && -1 != this._mDY) {
                var i = e - this._mDY,
                    r = this._mThumbTop + i;
                r = Math.max(0, r), r = Math.min(r, this._mUI.tracker.offsetHeight - this._mUI.thumb.offsetHeight), this.inSimulateDragging() ? this.onThumbStateChange(r, this._mThumbTop) : this.setThumbState(r, null, !1)
            }
            this._mDX = t, this._mDY = e
        },
        _listen: function(t, e, i) {
            "undefined" != typeof t.addEventListener ? t.addEventListener(e, i, !1) : "undefined" != typeof t.attachEvent ? t.attachEvent("on" + e, i) : t["on" + e] = i
        },
        _unlisten: function(t, e, i) {
            "undefined" != typeof t.removeEventListener ? t.removeEventListener(e, i, !1) : "undefined" != typeof t.detachEvent ? t.detachEvent("on" + e, i) : t["on" + e] = null
        },
        abruptPersistArrowScroll: function() {
            return this._mPrivateFlags &= ~n.COUNTING, null != this._mClickTimer && this._mClickTimer.isAlive() ? (this._mClickTimer.interrupt(), !0) : !1
        },
        onPersistArrowScrollStart: function() {},
        onPersistArrowScrollEnd: function() {},
        onArrowScroll: function() {},
        onScroll: function() {},
        awakeThumb: function(t) {
            t ? (this._mPrivateFlags |= n.THUMB_AWAKE, this._mUI.thumb.style.display = "block") : (this._mPrivateFlags &= ~n.THUMB_AWAKE, this._mUI.thumb.style.display = "none")
        },
        isThumbAwake: function() {
            return (this._mPrivateFlags & n.THUMB_AWAKE) == n.THUMB_AWAKE
        },
        setThumbState: function(t, e, i) {
            if (!this.locked() && this.isThumbAwake()) {
                var r = this._mThumbTop;
                if (null != e) {
                    (this._mPrivateFlags & n.HAS_BORDER) == n.HAS_BORDER && (e -= 2, e = Math.max(0, e));
                    try {
                        this._mUI.thumb.style.height = e + "px"
                    } catch (s) {}
                }
                try {
                    this._mUI.thumb.style.top = t + "px"
                } catch (s) {}
                this._mThumbTop = t, i !== !0 && this.onThumbStateChange(t, r)
            }
        },
        onThumbStateChange: function() {},
        getTrackerHeight: function() {
            return this._mUI.tracker.offsetHeight
        },
        isAwake: function() {
            return (this._mPrivateFlags & n.AWAKE) == n.AWAKE
        },
        awake: function(t) {
            t ? (this._mPrivateFlags |= n.AWAKE, this._mUI.scrollbar.style.display = "block") : (this._mPrivateFlags &= ~n.AWAKE, this._mUI.scrollbar.style.display = "none"), this.onAwake(t)
        },
        onAwake: function() {},
        reset: function() {
            this.setThumbState(0, 0, !1)
        },
        setUsingSimulateDraging: function(t) {
            t ? this._mPrivateFlags |= n.USING_SIMULATE_DRAG : this._mPrivateFlags &= ~n.USING_SIMULATE_DRAG
        },
        setBooleanFlags: function(t, e) {
            e ? this._mPrivateFlags |= t : this._mPrivateFlags &= ~t
        },
        isInTheBottom: function() {
            if (0 === this._mUI.tracker.offsetHeight || 0 === this._mUI.thumb.offsetHeight) return !1;
            var t = this._mUI.tracker.offsetHeight - this._mUI.thumb.offsetHeight - this._mThumbTop;
            return 0 === Math.floor(Math.abs(t)) ? !0 : !1
        },
        isInTheTop: function() {
            return this._mThumbTop < 5
        }
    }, i.exports = n
});;
define("system-core:system/uiService/list/listView/recycleListView.js", function(t, i, s) {
    var e = !1,
        o = t("base:widget/libs/jquerypacket.js"),
        h = t("system-core:system/uiService/list/listView/listView.js"),
        n = t("system-core:system/uiService/list/viewRecycler/viewRecycler.js"),
        r = (t("system-core:system/uiService/keyGuard/keyGuard.js"), t("system-core:system/baseService/timerService/timerService.js")),
        l = t("system-core:system/uiService/mouseWheelSensor/mouseWheelSensor.js"),
        a = t("system-core:system/uiService/motionSensor/motionSensor.js"),
        _ = t("system-core:system/uiService/iScrollbar/iScrollbar.js"),
        m = t("system-core:system/uiService/log/log.js").instanceForSystem,
        c = function(t) {
            this._mFirstPosition = 0, this._mChildrenCount = 0, this._mWheelSensor = null, this._mViewRecycler = null, this._mMotionSensor = null, this._mChildren = [], this._mSmoothScroller = null, this._mSmoothScrollDelta = 0, this._mSmoothScrollRemaining = 0, this._mScrollDir = -1, this.LAYOUT_MODE_NORMAL = 0, this.LAYOUT_MODE_FORCE_TOP = 1, this.LAYOUT_MODE_FORCE_BOTTOM = 2, this.LAYOUT_MODE_SPECIFIC = 3, this.LAYOUT_MODE_FROM_SPECIFIC = 4, this._mLayoutMode = this.LAYOUT_MODE_NORMAL, this._mSpecificPosition = -1, this.childrenMarginTop = null, this._mIScrollbar = null, this._mPersistScrollDir = -1, this._mSyncTop = 0, this._mSyncPosition = -1, this._mSyncId = null, this._mDebugAlias = null, this.TOP = 0, this.BOTTOM = 1, this.NOTIFY_LIST_EMPTY = 0, this.NOTIFY_LIST_REPAINT = 1, this.NOTIFY_SYSTEM_LOCK = 2, this.WHEEL_TO_PIXEL_RATIO = 60, this.WHEEL_TO_PIXEL_RATIO_LOW = 60, this.SMOOTH_SCROLL_DURATION = 150, this.SMOOTH_SCROLL_INTERVAL = 5, this.PIXEL_RATIO_ON_DRAGGING_SCALE = 1, this._mScrollDir = -1, this._mWheelSensor = null, this.CLONE_VIEW_BUILD = 1, this.DATA_CHANGED = 2, this.BUILD = 4, this.SMOOTH_SCROLLING = 8, this.USING_SCROLLBAR = 16, this.USING_KEYBOARD_DISPATCHER = 32, this.USING_MOUSE_WHEEL_SENSOR = 64, this.CHECKED_ALL = 128, this.PRESERVE_CHECKED_STATE = 256, this.LOCKED = 512, this.USING_LOW_PIXEL_RATIO = 1024, this.USING_TOUCH_SENSOR = 2048, null != t && (h.call(this, t), this._mUI = {
                defaultScroll: t.defaultScroll,
                listContainer: t.listContainer
            }, this.init(t), this.initRecycleList(t))
        };
    c.prototype = new h, c.prototype.constructor = c, o.extend(c.prototype, {
        initRecycleList: function(t) {
            "function" == typeof t.onComputeScrollbarState && (this.onComputeScrollbarState = t.onComputeScrollbarState), t.booleanFlagParams instanceof Array && this.setBooleanFlag(this[t.booleanFlagParams[0]], t.booleanFlagParams[1]), t.flagParams instanceof Array && this.setFlags(t.flagParams)
        },
        setFlags: function(t) {
            var i = t.length;
            this.flags = 0;
            for (var s = 0; i > s; s++) this.flags |= this[t[s]]
        },
        getView: function() {
            return null
        },
        deactivate: function(t) {
            t ? (this._mUI.listContainer.style.display = "none", this.onSystemNotify(this.NOTIFY_LIST_EMPTY, !0, !0)) : (this._mUI.listContainer.style.display = "block", this.onSystemNotify(this.NOTIFY_LIST_EMPTY, !1, !0))
        },
        setBackedData: function(t) {
            this.locked() || ((this.mPrivateFlags & this.BUILD) != this.BUILD && (this._build(), this.mPrivateFlags |= this.BUILD), this.resetList(), this.listsData = t, this.dataCount = null == t ? 0 : t.length, this.layout())
        },
        setBooleanFlag: function(t, i) {
            i ? this.mPrivateFlags |= t : this.mPrivateFlags &= ~t
        },
        setUsingScrollbar: function(t) {
            t ? this.mPrivateFlags |= this.USING_SCROLLBAR : this.mPrivateFlags &= ~this.USING_SCROLLBAR
        },
        isUsingScrollbar: function() {
            return (this.mPrivateFlags & this.USING_SCROLLBAR) == this.USING_SCROLLBAR
        },
        requestLayout: function() {
            this.locked() || (this.mPrivateFlags |= this.DATA_CHANGED, this._mLayoutMode = this.LAYOUT_MODE_SPECIFIC, this.mPrivateFlags |= this.PRESERVE_CHECKED_STATE, this.layout(), this.mPrivateFlags &= ~this.PRESERVE_CHECKED_STATE)
        },
        kedData: function(t) {
            if (null == this.listsData || 0 == this.dataCount) return void this.setBackedData(t);
            if (!this.locked()) {
                for (var i = 0, s = t.length; s > i; i++) this.listsData.push(t[i]);
                this.dataCount = this.listsData.length, this.requestLayout()
            }
        },
        updateBackedData: function(t, i) {
            if (!this.locked()) {
                if (this.listsData = t, this.dataCount = null == t ? 0 : t.length, this.mPrivateFlags |= this.DATA_CHANGED, this._mLayoutMode = this.LAYOUT_MODE_SPECIFIC, null != this._mSyncId) {
                    var s = this.lookupPositionForId(this._mSyncId); - 1 != s && (e && console.log("recover a position at ", s), this._mSyncPosition = s)
                }
                i === !0 ? this.mPrivateFlags |= this.PRESERVE_CHECKED_STATE : (this.mCheckedChildren.length = 0, this.onCheckeChanged()), this.layout(), i === !0 && (this.mPrivateFlags &= ~this.PRESERVE_CHECKED_STATE)
            }
        },
        getIdForPosition: function() {
            return null
        },
        lookupPositionForId: function() {
            return -1
        },
        changeBackedData: function(t, i) {
            this.locked() || (i === !0 && this.resetList(), this.listsData = t, this.dataCount = null == t ? 0 : t.length, this.mPrivateFlags |= this.DATA_CHANGED, this._mLayoutMode = this.LAYOUT_MODE_FORCE_TOP, this.layout())
        },
        dispatchDataChanged: function() {
            this.mPrivateFlags |= this.DATA_CHANGED
        },
        getScrollTop: function() {
            return this._mFirstPosition * this.itemHeight + Math.abs(this.childrenMarginTop)
        },
        getFirstPosition: function() {
            return this._mFirstPosition
        },
        getFirstCheckedChild: function() {
            if (this.isAllItemChecked()) return this._mChildren[this._mFirstPosition - this._mFirstPosition];
            for (var t = 0, i = this.mCheckedChildren.length; i > t; t++) if (this.mCheckedChildren[t] === !0) return this._mChildren[t - this._mFirstPosition];
            return null
        },
        getRenderingChildAt: function(t) {
            return 0 == this._mChildren.length ? null : 0 > t || t > this._mChildren.length - 1 ? null : this._mChildren[t]
        },
        getRenderingChildByPosition: function(t) {
            var i = t - this._mFirstPosition;
            return this.getRenderingChildAt(i)
        },
        getScrollbar: function(t) {
            var i = this,
                s = this._mIScrollbar;
            return null == s && t === !0 && (s = new _(this._mUI, {
                defaultScroll: this._mUI.defaultScroll
            }), s.onArrowScroll = function(t) {
                i.arrowScroll(t), i._mPersistScrollDir = -1
            }, s.onPersistArrowScrollStart = function(t) {
                i._mPersistScrollDir = t, i.arrowScroll(t)
            }, s.onPersistArrowScrollEnd = function() {
                i._mPersistScrollDir = -1
            }, s.onPageScroll = function(t) {
                i._mPersistScrollDir = -1, i.pageScroll(t)
            }, s.setUsingSimulateDraging(!0), s.onThumbStateChange = function(t, e) {
                var o = i.PIXEL_RATIO_ON_DRAGGING_SCALE * Math.abs(t - e),
                    h = o * i.itemHeight * i.dataCount / s.getTrackerHeight(),
                    n = t - e > 0 ? l.FORWARD : l.BACKWARD;
                i.scrollBy(n, h)
            }, this._mIScrollbar = s), s
        },
        onComputeScrollbarState: function(t, i, s) {
            var e = this._mUI.listContainer.parentNode.offsetHeight,
                o = this.itemHeight,
                h = t.getTrackerHeight(),
                n = 0 == this.dataCount ? 0 : h * e / (o * this.dataCount);
            n = Math.max(n, 20);
            var r = 0 == this.dataCount ? 0 : h * this.getScrollTop() / (o * this.dataCount);
            r = Math.min(r, h - n), r = Math.max(r, 0), t.setThumbState(r, n, !0), this.onComputeScrollbarChange(t, i, s)
        },
        onComputeScrollbarChange: function() {},
        awakeScrollbar: function(t) {
            if (t) {
                var i = this.getScrollbar(!0);
                i.isAwake() || i.awake(!0)
            } else {
                var i = this.getScrollbar();
                null != i && i.isAwake() && i.awake(!1)
            }
        },
        scrollToPosition: function(t) {
            if (!this.locked()) {
                if (0 > t || t > this.dataCount) return !1;
                var i = t >= this._mFirstPosition;
                return this.mPrivateFlags |= this.DATA_CHANGED, this._mLayoutMode = this.LAYOUT_MODE_FROM_SPECIFIC, this._mSpecificPosition = t, this.childrenMarginTop = 0, this._mUI.listContainer.style.marginTop = "0", this.mPrivateFlags |= this.PRESERVE_CHECKED_STATE, this.layout(), this.mPrivateFlags &= ~this.PRESERVE_CHECKED_STATE, i ? this._fixTooHigh() : this._fixTooLow(), !0
            }
        },
        pageScroll: function(t) {
            if (!this.locked()) {
                var i = this._mFirstPosition,
                    s = -1;
                t == l.FORWARD ? (s = i + this._mChildren.length, s = Math.min(s, this.dataCount - 1)) : (s = i - this._mChildren.length, s = Math.max(s, 1)), this.scrollToPosition(s)
            }
        },
        arrowScroll: function(t) {
            if (!this.locked()) {
                var i = this.WHEEL_TO_PIXEL_RATIO;
                (this.mPrivateFlags & this.USING_LOW_PIXEL_RATIO) == this.USING_LOW_PIXEL_RATIO && (i = this.WHEEL_TO_PIXEL_RATIO_LOW), this.smoothScroll(t, 1 * i)
            }
        },
        resetList: function() {
            if (this._mChildren.length = 0, this.childrenMarginTop = 0, this._mUI.listContainer.style.marginTop = "0", this._mFirstPosition = 0, this.listsData = null, this.dataCount = 0, this._mSyncTop = 0, this._mSyncPosition = -1, this._mSyncId = null, this.mPrivateFlags &= ~this.CLONE_VIEW_BUILD, this.mPrivateFlags &= ~this.DATA_CHANGED, this._mViewRecycler && this._mViewRecycler.clear(), "TABLE" == this._mUI.listContainer.nodeName.toUpperCase()) for (var t = this._mUI.listContainer.rows, i = t.length, s = i - 1; s >= 0; s--) this._mUI.listContainer.deleteRow(s);
            else this._mUI.listContainer.innerHTML = ""
        },
        getBackedData: function() {
            return this.listsData
        },
        handleDataChanged: function() {
            (this.mPrivateFlags & this.PRESERVE_CHECKED_STATE) != this.PRESERVE_CHECKED_STATE && (this.mCheckedChildren.length = 0, this.mPrivateFlags &= ~this.CHECKED_ALL)
        },
        addItemToFirst: function(t) {
            this.mCheckedChildren.unshift(t)
        },
        lock: function(t, i) {
            var s = this.getScrollbar();
            t ? (this.mPrivateFlags |= this.LOCKED, null != s && s.lock(!0)) : (this.mPrivateFlags &= ~this.LOCKED, null != s && s.lock(!1)), i !== !0 && this.onSystemNotify(this.NOTIFY_SYSTEM_LOCK, t)
        },
        onSystemNotify: function() {},
        locked: function() {
            return (this.mPrivateFlags & this.LOCKED) == this.LOCKED
        },
        fixTargetPositionVisible: function(t) {
            t += 1;
            var i = this._mFirstPosition,
                s = this.getViewCount(),
                e = -1;
            return i + 1 >= t ? e = t : t > i + s && (e = t - s + 1), e >= 0 ? (this.scrollToPosition(Math.min(e, this.dataCount)), !0) : !1
        },
        hitInVisibleRegion: function(t) {
            return t >= this._mFirstPosition && t < this._mFirstPosition + this._mChildren.length
        },
        _correctSyncPosition: function() {
            this.listsData.length > 0 && this._mSyncPosition > this.listsData.length - 1 && (this._mSyncPosition = -1)
        },
        layout: function() {
            if (0 == this.dataCount) return this.resetList(), this.onPositionChanged(this._mFirstPosition, this._mChildren.length), this._turnPluginDriverOnOrOff(), this.onSystemNotify(this.NOTIFY_LIST_EMPTY, !0), void this.onSystemNotify(this.NOTIFY_LIST_REPAINT, !0);
            if (this.onSystemNotify(this.NOTIFY_LIST_EMPTY, !1), this.onSystemNotify(this.NOTIFY_LIST_REPAINT, !0), (this.mPrivateFlags & this.DATA_CHANGED) == this.DATA_CHANGED && this.handleDataChanged(), (this.mPrivateFlags & this.DATA_CHANGED) == this.DATA_CHANGED) for (var t = this._mChildren.length - 1; t >= 0; t--) this._mViewRecycler.add(this._mChildren.pop());
            else for (var t = this._mChildren.length - 1; t >= 0; t--) this._mViewRecycler.addActiveView(this._mChildren.pop());
            switch (this._mUI.listContainer.style.marginTop = "0", this.childrenMarginTop = 0, this._mLayoutMode) {
                case this.LAYOUT_MODE_FROM_SPECIFIC:
                    var i = this._mSpecificPosition - 1;
                    this._mFirstPosition = i, this._fillFromTop(i), this._mSyncTop = 0, this._mSyncPosition = i, this._mSyncId = null;
                    break;
                case this.LAYOUT_MODE_SPECIFIC:
                    this._correctSyncPosition(), this._mFirstPosition = -1 == this._mSyncPosition ? 0 : this._mSyncPosition, this._mChildrenMarginTop = -Math.abs(this._mSyncTop), this._mUI.listContainer.style.marginTop = this.childrenMarginTop + "px", this._fillFromTop(this._mFirstPosition), this._fixTooHigh(), this._computeSyncState(), this._mSyncId = null;
                    break;
                default:
                    this._mFirstPosition = 0, this._fillFromTop(0), this._mSyncTop = 0, this._mSyncPosition = -1, this._mSyncId = null
            }
            this._mViewRecycler.scrapActiveViews(), this._mLayoutMode = this.LAYOUT_MODE_NORMAL, this._mSpecificPosition = -1, this.mPrivateFlags &= ~this.DATA_CHANGED, this.onPositionChanged(this._mFirstPosition, this._mChildren.length), this._turnPluginDriverOnOrOff()
        },
        _turnPluginDriverOnOrOff: function() {
            var t = this.getScrollbar();
            if (t) {
                var i = !1,
                    s = this._mFirstPosition + this._mChildren.length;
                if (this._mFirstPosition > 0 || s < this.dataCount) i = !0;
                else if (s == this.dataCount) {
                    var e = this.childrenMarginTop,
                        o = this._mChildren.length * this.itemHeight + e,
                        h = this._mUI.listContainer.parentNode.offsetHeight;
                    o > h ? i = !0 : 0 !== o && "undefined" != typeof this.needOrNotLoadMore && this.needOrNotLoadMore()
                }
                t.awake(i)
            }
        },
        _makeAndAddView: function(t) {
            var i = this._mViewRecycler.getActiveView(t);
            if (null == i) {
                var s = this._mViewRecycler.get(t),
                    i = null;
                i = null != s ? this.getView(this._mUI.listContainer, s, t) : this.getView(this._mUI.listContainer, null, t)
            }
            if (null == i) throw new Error("can not obtain a view to build list item");
            return this.insertView(i, t), i
        },
        insertView: function(t, i) {
            var s = i - this._mFirstPosition,
                e = 0 + this._mChildren.length - 1 >> 1;
            s > e ? this._mUI.listContainer.appendChild(t) : this._mUI.listContainer.insertBefore(t, this._mChildren[0])
        },
        removeView: function(t) {
            return this._mUI.listContainer.removeChild(t)
        },
        _fillFromTop: function(t) {
            if (this._mUI) {
                var i = this._mUI.listContainer.parentNode.offsetHeight,
                    s = this.childrenMarginTop,
                    e = t - this._mFirstPosition,
                    o = this.itemHeight,
                    h = 0;
                if ((this.mPrivateFlags & this.CLONE_VIEW_BUILD) != this.CLONE_VIEW_BUILD) {
                    var n = this.getView(this._mUI.listContainer, null, 0);
                    this.insertView(n, 0), this._mChildren[0] = n, o = this.itemHeight = this.itemHeight || n.offsetHeight, h = o, t++, e++, this.mPrivateFlags |= this.CLONE_VIEW_BUILD
                } else h = e * o + s;
                for (var r = null; i > h && t < this.dataCount;) r = this._makeAndAddView(t), this._mChildren[e] = r, h += o, t++, e++
            }
        },
        importCheckedState: function(t) {
            if (t instanceof c) {
                this.mCheckedChildren.length = 0;
                for (var i = 0, s = t.mCheckedChildren, e = s.length; e > i; i++) this.mCheckedChildren[i] = s[i];
                1 == this.isAllItemChecked() && 0 == t.isAllItemChecked() ? this.mPrivateFlags &= ~this.CHECKED_ALL : 0 == this.isAllItemChecked() && 1 == t.isAllItemChecked() && (this.mPrivateFlags |= this.CHECKED_ALL)
            }
        },
        _fillFromBottom: function(t) {
            if (this._mUI) {
                for (var i = (this._mUI.listContainer.parentNode.offsetHeight, this.childrenMarginTop), s = this.itemHeight, e = i, o = null; t >= 0 && e >= 0;) o = this._makeAndAddView(t), i -= s, this._mUI.listContainer.style.marginTop = i + "px", this._mChildren.unshift(o), e -= s, t--;
                this.childrenMarginTop = i, this._mFirstPosition = t + 1
            }
        },
        fillGap: function(t) {
            var i = this._mChildren.length;
            t == l.FORWARD ? (this._fillFromTop(this._mFirstPosition + i), this._fixTooHigh()) : (this._fillFromBottom(this._mFirstPosition - 1), this._fixTooLow())
        },
        _fixTooLow: function() {
            var t = this._mChildren.length;
            if (!(0 >= t)) {
                var i = this.childrenMarginTop,
                    s = this._mChildren.length * this.itemHeight + i,
                    e = this._mUI.listOuterHeight = this._mUI.listOuterHeight || this._mUI.listContainer.parentNode.offsetHeight,
                    o = i,
                    h = o,
                    n = this._mFirstPosition;
                0 == n && h > 0 && (n + t == this.dataCount || s > e) && (n + t == this.dataCount && (h = Math.min(h, s - e)), i -= h, this._mUI.listContainer.style.marginTop = i + "px", this.childrenMarginTop = i, n + t < this.dataCount && this._fillFromTop(n + t), this.onScrollToEdge(this.TOP))
            }
        },
        _fixTooHigh: function() {
            var t = this._mChildren.length;
            if (!(0 >= t)) {
                var i = this.childrenMarginTop,
                    s = this._mChildren.length * this.itemHeight + i,
                    e = this._mUI.listOuterHeight = this._mUI.listOuterHeight || this._mUI.listContainer.parentNode.offsetHeight,
                    o = i,
                    h = e - s,
                    n = this._mFirstPosition;
                (n > 0 || 0 > o) && h > 0 ? (0 == n && (h = Math.min(h, Math.abs(o))), i += h, this.childrenMarginTop = i, this._mUI.listContainer.style.marginTop = i + "px", n > 0 && (this._fillFromBottom(n - 1), this._adjustViewUpOrDown()), this.onScrollToEdge(this.BOTTOM)) : this._mFirstPosition + t == this.dataCount && s == e && this.onScrollToEdge(this.BOTTOM)
            }
        },
        _adjustViewUpOrDown: function() {
            var t = this._mChildren.length;
            t > 0 && this.childrenMarginTop > 0 && (this.childrenMarginTop = 0, this._mUI.listContainer.style.marginTop = this.childrenMarginTop + "px")
        },
        buildView: function() {
            return null
        },
        onScrollToEdge: function() {},
        onPositionChanged: function(t, i) {
            (this.mPrivateFlags & this.USING_SCROLLBAR) == this.USING_SCROLLBAR && (this.awakeScrollbar(!0), this.onComputeScrollbarState(this.getScrollbar(!0), t, i))
        },
        onKeyboardArrowDown: function() {
            this.arrowScroll(l.FORWARD)
        },
        onKeyboardArrowUp: function() {
            this.arrowScroll(l.BACKWARD)
        },
        onKeyboardPageUp: function() {
            this.pageScroll(l.BACKWARD)
        },
        onKeyboardPageDown: function() {
            this.pageScroll(l.FORWARD)
        },
        onScroll: function(t, i) {
            var s = (new Date).getTime(),
                e = this._mFirstPosition,
                o = this._mChildren.length,
                h = this.childrenMarginTop,
                n = h,
                r = this._mChildren.length * this.itemHeight + h,
                a = this._mUI.listContainer.parentNode.offsetHeight;
            if (i = Math.min(i, a - 1), t == l.FORWARD && e + o == this.dataCount && a >= r && i >= 0) return 0 != i;
            if (t == l.BACKWARD && 0 == e && n >= 0 && i >= 0) return 0 != i;
            var _ = 0;
            if (t == l.FORWARD) for (var c = 0, S = this._mChildren.length; S > c && (c + 1) * this.itemHeight - Math.abs(h) < 0; c++) h += this.itemHeight, this._mUI.listContainer.style.marginTop = h + "px", this._mViewRecycler.add(this._mChildren.shift()), _++;
            else for (var c = this._mChildren.length - 1; c >= 0 && this.itemHeight * c + h > a; c--) this._mViewRecycler.add(this._mChildren.pop()), _++;
            t == l.FORWARD ? h -= i : h += i, this._mUI.listContainer.style.marginTop = h + "px", this.childrenMarginTop = h, t == l.FORWARD && (this._mFirstPosition += _), r = this._mChildren.length * this.itemHeight + h, (h > 0 || a > r) && this.fillGap(t), this.FLAG_PREVENT_DEFAULT && this._mWheelSensor.setPreventDefault(this.FLAG_PREVENT_DEFAULT), this._computeSyncState(), this.onPositionChanged(this._mFirstPosition, this._mChildren.length);
            var u = (new Date).getTime();
            m.send({
                name: "listScrollTime",
                value: u - s
            })
        },
        _computeSyncState: function() {
            this._mSyncTop = this.childrenMarginTop, this._mSyncPosition = this._mFirstPosition;
            var t = this.getIdForPosition(this._mFirstPosition);
            null != t && (this._mSyncId = t)
        },
        _computeSmoothScrollArgs: function(t) {
            var i = this.SMOOTH_SCROLL_DURATION;
            if (this._mSmoothScrollDelta = Math.ceil(t / (i / this.SMOOTH_SCROLL_INTERVAL)), this._mSmoothScrollDelta >= this.itemHeight) for (var s = 10, e = 0; this._mSmoothScrollDelta >= this.itemHeight;) {
                if (e >= s) throw new Error("pixelDelta arg is not considered as legal");
                i *= 2, this._mSmoothScrollDelta = Math.ceil(t / (i / this.SMOOTH_SCROLL_INTERVAL)), e++
            }
        },
        _clearSmoothScrollArgs: function() {
            this.mPrivateFlags &= ~this.SMOOTH_SCROLLING, this._mSmoothScrollRemaining = this._mSmoothScrollDelta = 0, this._mScrollDir = -1
        },
        stopSmoothScroll: function() {
            null != this._mSmoothScroller && (this._mSmoothScroller.interrupt(), this._clearSmoothScrollArgs())
        },
        _setupSmoothScrollArgs: function(t) {
            var i = this;
            null == i._mSmoothScroller && (i._mSmoothScroller = new r(i.SMOOTH_SCROLL_INTERVAL, function() {
                var t = !1;
                Math.abs(i._mSmoothScrollRemaining) <= Math.abs(i._mSmoothScrollDelta) ? (t = i.onScroll(i._mScrollDir, i._mSmoothScrollRemaining), i._clearSmoothScrollArgs(), t || -1 == i._mPersistScrollDir ? -1 == i._mPersistScrollDir : i.arrowScroll(i._mPersistScrollDir)) : (i._mSmoothScrollRemaining -= i._mSmoothScrollDelta, t = i.onScroll(i._mScrollDir, i._mSmoothScrollDelta), this.start())
            })), i._computeSmoothScrollArgs(t), i._mSmoothScrollRemaining = t - i._mSmoothScrollDelta, i._mSmoothScroller.start();
            i.onScroll(i._mScrollDir, i._mSmoothScrollDelta);
            i.mPrivateFlags |= i.SMOOTH_SCROLLING
        },
        smoothScroll: function(t, i) {
            this.locked() || (this._mScrollDir = t, this._setupSmoothScrollArgs(i))
        },
        scrollBy: function(t, i) {
            this.locked() || this.onScroll(t, i)
        },
        setUsingKeyboardDispatcher: function(t) {
            t ? this.mPrivateFlags |= this.USING_KEYBOARD_DISPATCHER : this.mPrivateFlags &= ~this.USING_KEYBOARD_DISPATCHER
        },
        activateKeyguard: function(t, i) {
            return
        },
        isUsingKeyboardDispatcher: function() {
            return (this.mPrivateFlags & this.USING_KEYBOARD_DISPATCHER) == this.USING_KEYBOARD_DISPATCHER
        },
        setUsingMouseWheelSensor: function(t) {
            if (t) {
                this.mPrivateFlags |= this.USING_MOUSE_WHEEL_SENSOR;
                var i = this,
                    s = new l(this._mUI.listContainer.parentNode);
                s.onWheelChanged = function(t, s) {
                    if (!i.locked()) {
                        var e = i.WHEEL_TO_PIXEL_RATIO;
                        (i.mPrivateFlags & i.USING_LOW_PIXEL_RATIO) == i.USING_LOW_PIXEL_RATIO && (e = i.WHEEL_TO_PIXEL_RATIO_LOW);
                        var o = s * e;
                        if ((i.mPrivateFlags & i.SMOOTH_SCROLLING) == i.SMOOTH_SCROLLING && i.stopSmoothScroll(), i._mScrollDir = t, 0 != i.itemHeight) {
                            i.onScroll(i._mScrollDir, o)
                        }
                    }
                }, s.sense(), this._mWheelSensor = s
            } else this.mPrivateFlags &= ~this.USING_MOUSE_WHEEL_SENSOR
        },
        _build: function() {
            this._mViewRecycler = new n;
            var t = this.flags;
            "undefined" != typeof t && ((t & this.USING_MOUSE_WHEEL_SENSOR) == this.USING_MOUSE_WHEEL_SENSOR && this.setUsingMouseWheelSensor(!0), (t & this.USING_SCROLLBAR) == this.USING_SCROLLBAR && this.setUsingScrollbar(!0), (t & this.USING_KEYBOARD_DISPATCHER) == this.USING_KEYBOARD_DISPATCHER && this.setUsingKeyboardDispatcher(!0), (t & this.USING_TOUCH_SENSOR) == this.USING_TOUCH_SENSOR && a.hasMotionCampatibility() && (e && console.log("Motion Tracker Installed"), this.setUsingMotionSensor(!0)))
        },
        setUsingMotionSensor: function(t) {
            if (t) {
                this.mPrivateFlags |= this.USING_TOUCH_SENSOR;
                var i = new a(this._mUI.listContainer, a.VERTICAL),
                    s = this;
                i.onMotion = function(t, i, e, o) {
                    if (!s.locked() && ((s.mPrivateFlags & s.SMOOTH_SCROLLING) == s.SMOOTH_SCROLLING && s.stopSmoothScroll(), s._mScrollDir = o > 0 ? l.BACKWARD : l.FORWARD, 0 != s.itemHeight)) {
                        s.onScroll(s._mScrollDir, Math.abs(o))
                    }
                }, i.install(), this._mMotionSensor = i
            } else this.mPrivateFlags &= ~this.USING_TOUCH_SENSOR
        },
        setDebugAlias: function(t) {
            this._mDebugAlias = t
        },
        toString: function() {
            return this._mDebugAlias
        }
    }), s.exports = c
});;
define("system-core:system/uiService/list/listView/nativeGridView.js", function(t, i, e) {
    "use strict";
    var s = t("base:widget/libs/jquerypacket.js"),
        a = t("system-core:system/uiService/list/listView/nativeListView.js"),
        n = function(t) {
            a.call(this, t), null != t && this.initNativeGridView(t)
        };
    n.prototype = new a, n.prototype.constructor = n, s.extend(n.prototype, {
        initNativeGridView: function(t) {
            this.mGridStep = 0, "number" == typeof t.columnWidth && (this.columnWidth = t.columnWidth)
        },
        setColumnsCount: function() {
            var t = s(this.listContainer).width();
            this.mGridStep = Math.max(parseInt(parseInt(t, 10) / this.columnWidth, 10), 1)
        },
        getColumnsCount: function() {
            return this.mGridStep
        },
        fixTargetPositionVisible: function(t) {
            var i = Math.floor(t / this.mGridStep);
            return i >= this.listsData.length && (i = this.listsData.length - 1), a.prototype.fixTargetPositionVisible.call(this, i)
        },
        getCountEx: function() {
            var t = 0;
            if (null === this.listsData) return t;
            for (var i = 0, e = this.listsData.length; e > i; i++) t += this.listsData[i].length;
            return t
        },
        getElementsData: function() {
            var t = [];
            if (!this.listsData) return t;
            for (var i = 0, e = this.listsData.length; e > i; i++) for (var s = 0, a = this.listsData[i].length; a > s; s++) t.push(this.listsData[i][s]);
            return t
        },
        getGroupElementsData: function() {
            return this.listsData
        },
        setItemChecked: function(t, i) {
            this.mCheckedChildren[t] = i;
            var e = (this.mPrivateFlags & this.CHECKED_ALL) === this.CHECKED_ALL;
            if (!i && e) {
                this.mPrivateFlags &= ~this.CHECKED_ALL;
                for (var s = 0, a = this.getElementsData().length; a > s; s++) s !== t && (this.mCheckedChildren[s] = !0)
            }
            this.onCheckeChanged()
        },
        getCheckedItems: function() {
            var t = [];
            if (!this.listsData) return t;
            if (this.isAllItemChecked()) {
                for (var i = 0, e = this.listsData.length; e > i; i++) for (var s = 0, a = this.listsData[i].length; a > s; s++) t.push(this.listsData[i][s]);
                return t
            }
            for (var n = this.listsData.length, i = 0, e = this.mCheckedChildren.length; e > i; i++) if (this.mCheckedChildren[i] === !0) {
                var r = Math.floor(i / this.mGridStep);
                if (r >= n) break;
                t.push(this.listsData[r][i % this.mGridStep])
            }
            return t
        },
        operateGroupdData: function(t) {
            var i = null == t ? 0 : t.length;
            if (0 === i) return [];
            for (var e = [], s = 0, a = this.mGridStep; i > a;) {
                e[s] = [];
                for (var n = 0; a > n; n++) e[s].push(t[s * a + n]);
                s++, i -= a
            }
            i > 0 && (e[s] = []);
            for (var r = 0; i > 0;) e[s].push(t[s * a + r]), i--, r++;
            return e
        },
        setBackedData: function(t) {
            t = this.operateGroupdData(t), a.prototype.setBackedData.call(this, t)
        },
        appendBackedData: function(t) {
            if (null == this.listsData || 0 === this.dataCount) return void this.setBackedData(t);
            var i = this.listsData[this.dataCount - 1];
            i.length % this.mGridStep !== 0 && (this.listsData.splice(-1), t = i.concat(t), this.fixLayoutByPosition(--this.dataCount)), t = this.operateGroupdData(t), a.prototype.appendBackedData.call(this, t)
        },
        updateBackedData: function(t, i) {
            t = this.operateGroupdData(t), a.prototype.updateBackedData.call(this, t, i)
        },
        changeBackedData: function(t, i) {
            t = this.operateGroupdData(t), a.prototype.changeBackedData.call(this, t, i)
        },
        fixLayoutByPosition: function(t) {
            s(this.listContainer).find("dd").eq(t).remove()
        },
        getRenderingChildAt: function(t, i) {
            if (0 > t || t > this.dataCount) return null;
            var e = s(this.listContainer).find("dd").eq(t),
                a = e.children();
            return 0 > i || i > a.length - 1 ? null : a[i]
        },
        getRenderingChildByPosition: function(t) {
            var i = Math.floor(t / this.mGridStep),
                e = t % this.mGridStep;
            return this.getRenderingChildAt(i, e)
        },
        getElementDataByPosition: function(t) {
            var i = this.getElementsData();
            return i && t < i.length ? i[t] : null
        },
        getGridPosition: function(t, i) {
            return i + t * this.mGridStep
        }
    }), e.exports = n
});;
define("system-core:system/uiService/list/listView/recycleGridView.js", function(t, i, e) {
    var s = t("system-core:system/uiService/list/listView/recycleListView.js"),
        r = t("base:widget/libs/jquerypacket.js"),
        n = function(t) {
            s.call(this, t), null != t && this.initRecycleGridView(t)
        };
    n.prototype = new s, n.prototype.constructor = n, r.extend(n.prototype, {
        initRecycleGridView: function(t) {
            this._mGridStep = 0, this.itemHeight = 122, "number" == typeof t.columnWidth && (this.columnWidth = t.columnWidth)
        },
        setConfig: function(t) {
            s.prototype.setConfig.call(this, t), this.setColumnsCount()
        },
        setColumnsCount: function() {
            this._mGridStep = Math.max(parseInt(parseInt(this._mUI.listContainer.offsetWidth, 10) / this.columnWidth, 10), 1)
        },
        getColumnsCount: function() {
            return this._mGridStep
        },
        scrollToPositionEx: function(t) {
            var i = Math.floor(t / this._mGridStep) + 1;
            return i >= this.listsData.length && (i = this.listsData.length - 1), i = Math.max(1, i), this.scrollToPosition(i)
        },
        fixTargetPositionVisible: function(t) {
            var i = Math.floor(t / this._mGridStep);
            return i >= this.listsData.length && (i = this.listsData.length - 1), s.prototype.fixTargetPositionVisible.call(this, i)
        },
        getCountEx: function() {
            var t = 0;
            if (null == this.listsData) return t;
            for (var i = 0, e = this.listsData.length; e > i; i++) t += this.listsData[i].length;
            return t
        },
        isFirstCheckedChildVisible: function() {
            for (var t = 0, i = this.mCheckedChildren.length; i > t; t++) if (this.isItemChecked(t)) return t / this._mGridStep >= this._mFirstPosition && t / this._mGridStep < this._mFirstPosition + this._mChildren.length;
            return !1
        },
        getFirstCheckedChild: function() {
            for (var t = 0, i = this.mCheckedChildren.length; i > t; t++) if (this.mCheckedChildren[t] === !0) return Math.floor(t / this._mGridStep) >= this._mFirstPosition && Math.abs(Math.floor(t / this._mGridStep) - this._mFirstPosition) < this._mChildren.length ? this._mChildren[Math.floor(t / this._mGridStep) - this._mFirstPosition].childNodes[t % this._mGridStep] : null;
            return null
        },
        getElementsData: function() {
            var t = [];
            if (!this.listsData) return t;
            for (var i = 0, e = this.listsData.length; e > i; i++) for (var s = 0, r = this.listsData[i].length; r > s; s++) t.push(this.listsData[i][s]);
            return t
        },
        getGroupElementsData: function() {
            return this.listsData
        },
        setItemChecked: function(t, i) {
            this.mCheckedChildren[t] = i;
            var e = (this.mPrivateFlags & this.CHECKED_ALL) == this.CHECKED_ALL;
            if (!i && e) {
                this.mPrivateFlags &= ~this.CHECKED_ALL;
                for (var s = 0, r = this.getElementsData().length; r > s; s++) s != t && (this.mCheckedChildren[s] = !0)
            }
            this.onCheckeChanged()
        },
        getCheckedItems: function() {
            var t = [];
            if (!this.listsData) return t;
            if (this.isAllItemChecked()) {
                for (var i = 0, e = this.listsData.length; e > i; i++) for (var s = 0, r = this.listsData[i].length; r > s; s++) t.push(this.listsData[i][s]);
                return t
            }
            for (var n = this.listsData.length, i = 0, e = this.mCheckedChildren.length; e > i; i++) if (this.mCheckedChildren[i] === !0) {
                var h = Math.floor(i / this._mGridStep);
                if (h >= n) break;
                t.push(this.listsData[h][i % this._mGridStep])
            }
            return t
        },
        operateGroupdData: function(t) {
            var i = null == t ? 0 : t.length;
            if (0 == i) return [];
            for (var e = new Array, s = 0, r = this._mGridStep; i > r;) {
                e[s] = [];
                for (var n = 0; r > n; n++) e[s].push(t[s * r + n]);
                s++, i -= r
            }
            i > 0 && (e[s] = []);
            for (var h = 0; i > 0;) e[s].push(t[s * r + h]), i--, h++;
            return e
        },
        setBackedData: function(t) {
            t = this.operateGroupdData(t), s.prototype.setBackedData.call(this, t)
        },
        appendBackedData: function(t) {
            return null == this.listsData || 0 == this.dataCount ? void this.setBackedData(t) : (t = this.operateGroupdData(t), void s.prototype.appendBackedData.call(this, t))
        },
        updateBackedData: function(t, i) {
            t = this.operateGroupdData(t), s.prototype.updateBackedData.call(this, t, i)
        },
        changeBackedData: function(t, i) {
            t = this.operateGroupdData(t), s.prototype.changeBackedData.call(this, t, i)
        },
        getRenderingChildAt: function(t, i) {
            if (0 == this._mChildren.length) return null;
            if (0 > t || t > this._mChildren.length - 1) return null;
            var e = this._mChildren[t],
                s = r(e).children();
            return 0 > i || i > s.length - 1 ? null : s[i]
        },
        getRenderingChildByPosition: function(t) {
            var i = Math.floor(t / this._mGridStep),
                e = t % this._mGridStep;
            return i -= this._mFirstPosition, this.getRenderingChildAt(i, e)
        },
        getElementDataByPosition: function(t) {
            var i = this.getElementsData();
            return i && t < i.length ? i[t] : null
        },
        getGridPosition: function(t, i) {
            return i + t * this._mGridStep
        }
    }), e.exports = n
});;
define("system-core:system/uiService/list/listViewManager/listViewManager.js", function(e, i, t) {
    "use strict";
    var n = e("base:widget/libs/jquerypacket.js"),
        s = e("system-core:system/uiService/list/listView/nativeListView.js"),
        c = e("system-core:system/uiService/list/listView/recycleListView.js"),
        o = e("system-core:system/uiService/list/listView/nativeGridView.js"),
        r = e("system-core:system/uiService/list/listView/recycleGridView.js"),
        l = {
            conf: {
                currentList: null
            },
            checkListByViewMode: function(e, i) {
                return "list" === i ? e instanceof s || e instanceof c : e instanceof o || e instanceof r
            },
            checkListByType: function(e, i) {
                return "recycle" === i ? e instanceof c || e instanceof r : e instanceof s || e instanceof o
            },
            chagneListStyle: function() {
                l.conf.$listViewOuter.css("overflow-y", "auto"), n(l.conf.listContainer).height("auto")
            },
            initList: function() {
                return "list" === l.conf.viewMode ? "recycle" === l.conf.type ? (l.conf.currentList = new c(l.conf), l.conf.currentList) : (l.chagneListStyle(), l.conf.currentList = new s(l.conf), l.conf.currentList) : "grid" === l.conf.viewMode ? "recycle" === l.conf.type ? (l.conf.currentList = new r(l.conf), l.conf.currentList) : (l.chagneListStyle(), l.conf.currentList = new o(l.conf), l.conf.currentList) : void 0
            },
            init: function() {
                if (null == l.conf.listContainer) throw new Error("[DOM listContainer] is must");
                if (null == l.conf.childrenClass) throw new Error("[childrenClass] is must");
                if (null == l.conf.listItemDomName) throw new Error("[listItemDomName] is must");
                return l.initList()
            }
        },
        f = {
            init: function(e) {
                return l.conf = n.extend({
                    type: "native",
                    viewMode: "list",
                    listContainer: null,
                    childrenClass: null,
                    listItemDomName: null,
                    $listViewOuter: e.listContainer && n(e.listContainer.parentNode),
                    buildView: function() {},
                    getView: function() {},
                    needOrNotLoadMore: function() {},
                    onCheckedChanged: function() {}
                }, e), l.init()
            },
            checkListByType: l.checkListByType,
            checkListByViewMode: l.checkListByViewMode
        };
    t.exports = f
});;
define("system-core:system/uiService/list/list.js", function(t, e, i) {
    var s = t("base:widget/libs/jquerypacket.js"),
        o = t("base:widget/historyManager/historyManager.js"),
        n = t("system-core:system/uiService/historyListManage/historyListManage.js"),
        r = t("system-core:system/uiService/list/listHeader.js"),
        a = t("system-core:system/uiService/loading/loading.js"),
        h = t("system-core:system/uiService/list/listViewManager/listViewManager.js"),
        l = t("system-core:system/uiService/log/log.js").instanceForSystem,
        c = t("system-core:system/baseService/message/message.js"),
        d = t("system-core:system/uiService/tip/tip.js"),
        u = function(t) {
            var e = new RegExp("(^|&)" + t + "=([^&]*)(&|$)", "i"),
                i = window.location.search.substr(1).match(e);
            return null != i ? decodeURIComponent(i[2]) : null
        },
        g = function(t, e) {
            if (this.$container = null, this.config = e, !t || (this.$container = s(t)).length <= 0) throw new Error("container is empty!");
            this.$loadingTips = null, this.$historyListRootPath = null, this.$emptyTips = null, this.$historyList = null, this.$listHeader = null, this.$listViewContainer = null, this.$gridViewContainer = null, this.historyList = null, this.currentKey = "", this.listHeader = null, this.listTools = null, this.listLoading = null, this.listView = null, this.gridView = null, this._currentView = null, this._normalListModule = "normal", this._recycleListModule = "recycle", this._currentListModule = this._normalListModule, this.cache = null, this.currentCacheName = null, this.listLimit = 100, this.tip = null, this.init()
        },
        p = {
            moduleHistory: '<div node-type="module-history-list" class="module-history-list"><span class="history-list-dir">全部文件</span><span class="history-list-tips">获取更多数据...</span></div>',
            moduleHeader: '<div class="list-view-header"></div>',
            moduleListContainer: '<div class="list-view-container" style="display:none"><div node-type="module-list-view" class="module-list-view"><div class="list-view"></div></div></div>',
            moduleGridContainer: '<div class="grid-view-container"><div node-type="module-grid-view" class="module-grid-view"><div class="grid-view"></div></div></div>',
            moduleEmptyTips: '<div class="list-empty-tips"></div>'
        },
        y = {
            loadingTips: ".history-list-tips",
            historyListRootPath: ".history-list-dir",
            emptyTips: ".list-empty-tips",
            historyList: ".module-history-list",
            listHeader: ".list-view-header",
            listViewContainer: ".list-view-container",
            gridViewContainer: ".grid-view-container",
            listView: ".list-view",
            gridView: ".grid-view",
            moduleListView: ".module-list-view",
            moduleGridView: ".module-grid-view"
        };
    g.prototype.init = function() {
        this.buildDom(), this.initPlugin(), this.bindEvent()
    }, g.prototype.buildDom = function() {
        var t = [],
            e = this.$container;
        t.push(p.moduleHistory), t.push(p.moduleHeader), t.push(p.moduleListContainer), t.push(p.moduleGridContainer), t.push(p.moduleEmptyTips), e.html(t.join("")), this.$loadingTips = e.find(y.loadingTips), this.$historyListRootPath = e.find(y.historyListRootPath), this.$emptyTips = e.find(y.emptyTips), this.$historyList = e.find(y.historyList), this.$listHeader = e.find(y.listHeader), this.$listViewContainer = e.find(y.listViewContainer), this.$gridViewContainer = e.find(y.gridViewContainer), this.$moduleListView = e.find(y.moduleListView), this.$moduleGridView = e.find(y.moduleGridView), this.resize(s(window).height() - e.offset().top)
    }, g.prototype.resize = function(t) {
        var e = this.getCurrentView();
        e && (this.isGridMode() ? (this.$container.height(t), e.setColumnsCount(), this.loadInitData()) : (this.resizeScrollBar(t), e.requestLayout()))
    }, g.prototype.resizeScrollBar = function(t) {
        var e = this.$container;
        if ("number" == typeof t || "string" == typeof t ? e.height(t) : t = e.height(), 0 === t) throw "[Error] list container's height is 0, need to set";
        this.$moduleGridView.height(t - 83), this.$moduleListView.height(t - 83), this.$moduleGridView.find(".scrollbar-tracker").height(t - 83 - 2), this.$moduleListView.find(".scrollbar-tracker").height(t - 83 - 2)
    }, g.prototype.getCurrentView = function() {
        return this._currentView
    };
    var C = null;
    g.prototype.changeCache = function(t) {
        this.cache = t, this.cache.onBeforeGetCacheData(function(t) {
            C = t
        }), this.historyList && this.historyList.clear()
    }, g.prototype.addHistory = function(t, e) {
        this.historyList && this.historyList.addHistory(t, e)
    }, g.prototype.getHistoryIds = function() {
        return this.historyList.historyList
    }, g.prototype.getHistoryList = function() {
        return this.historyList
    }, g.prototype.getHistoryPath = function() {
        var t = this.historyList.getPath();
        return /\S\/+$/.test(t) && (t = t.replace(/\/+$/, "")), t
    }, g.prototype.changeHistory = function(t, e, i) {
        this.historyList && this.historyList.changeHistory(t, e, i)
    }, g.prototype.historyChange = function(t, e) {
        var i, s = !1;
        0 !== t.length && (i = this.currentKey, this.currentKey = t.join("/"), t.length > 1 && (this.currentKey = this.currentKey.substring(1)), s = i !== this.currentKey || this.currentCacheName !== this.cache.cacheName, s && ("/" !== this.currentKey || "" !== i || null !== this.currentCacheName && this.currentCacheName !== this.cache.cacheName || (s = !1)), this.currentCacheName = this.cache.cacheName, s && this.setItemsChecked(!1, !0), this.cache.updateKey(this.currentKey), this.$historyListRootPath.html(e[0]), this.loadInitData(), s && this.onHistoryChange(t, e))
    }, g.prototype.getCurrentDataList = function() {
        return this.getCurrentView().getElementsData()
    }, g.prototype.refreshList = function() {
        this.historyList && this.historyList.historyChange()
    }, g.prototype.loadInitData = function() {
        var t = (new Date).getTime(),
            e = this;
        this.updateLoadingTips(g.LOAD_ING), this.getCurrentView().setBackedData([]), this.updateListLoading(g.LOAD_ING);
        var i = o.getCurrentModule(),
            s = o.getCurrentParams().path;
        this.cache.getCacheData(-1, function(n, r, a, d) {
            if (i === o.getCurrentModule() && s === o.getCurrentParams().path) {
                if (0 === n.length ? (e.$listHeader.hide(), e.updateListLoading(g.LOAD_EMPTY)) : (e.$listHeader.show(), e.updateListLoading()), e.updateLoadingTips(r ? g.LOAD_PART : g.LOAD_ALL, n.length), e.resizeScrollBar(), h.checkListByType(e.listView, "recycle") || n.length <= e.listLimit) e.getCurrentView().setBackedData(n);
                else {
                    var u = n.slice(0, e.listLimit),
                        p = n.slice(e.listLimit);
                    e.getCurrentView().setBackedData(u), setTimeout(function() {
                        e.getCurrentView().appendBackedData(p), c.trigger("system-change-view-mode-loadingtip-close")
                    }, 13)
                }
                e.onLoadedCallBack(n, d);
                var y = (new Date).getTime();
                l.send({
                    name: "listInitTime",
                    value: y - t
                })
            }
        })
    }, g.prototype.loadMoreData = function() {
        var t = this;
        this.cache.hasMoreData() && (this.updateLoadingTips(g.LOAD_ING), this.cache.getCacheData(-2, function(e) {
            t.cache.getCacheData(-1, function(i, o, n) {
                if (s.stringify(C) === s.stringify(n)) {
                    if (i.length < 100 && o === !0) return void t.loadMoreData();
                    t.updateLoadingTips(o ? g.LOAD_PART : g.LOAD_ALL, i.length), t.resizeScrollBar(), t.updateListLoading(), h.checkListByType(t.listView, "recycle") ? t.getCurrentView().updateBackedData(i, !0) : t.getCurrentView().appendBackedData(e), o === !0 && t.onLoadedCallBack(e), t.updateHeaderChecked()
                }
            })
        }))
    }, g.LOAD_ING = 0, g.LOAD_PART = 1, g.LOAD_ALL = 2, g.LOAD_FAILED = 3, g.LOAD_EMPTY = 4, g.prototype.updateListLoading = function(t) {
        var e = this,
            i = "",
            s = e.listLoading.tpl();
        switch (t) {
            case g.LOAD_ING:
                i = '<div class="tip-text">' + s + "</div>";
                break;
            case g.LOAD_FAILED:
                i = '<div class="tip-text">列表加载失败</div>'
        }
        return t === g.LOAD_EMPTY ? void this.listEmptyTip(this.$emptyTips) : void(i ? this.$emptyTips.html(i).css("visibility", "visible") : this.$emptyTips.css("visibility", "hidden"))
    }, g.prototype.listEmptyTip = function(t) {
        t.html('<span class="empty-text">列表数据为空</span>').show()
    }, g.prototype.fixTargetPositionVisible = function(t) {
        var e = this.getCurrentView();
        return e.fixTargetPositionVisible(t)
    }, g.prototype.showErrorTips = function(t) {
        this.updateListLoading(g.LOAD_FAILED), this.updateLoadingTips(g.LOAD_FAILED, 0, t)
    }, g.prototype.updateLoadingTips = function(t, e) {
        var i = "";
        switch (t) {
            case g.LOAD_ING:
                i = "获取更多数据&hellip;";
                break;
            case g.LOAD_PART:
                i = "已加载" + e + "个";
                break;
            case g.LOAD_ALL:
                i = "已全部加载，共" + e + "个";
                break;
            case g.LOAD_FAILED:
                i = "加载失败"
        }
        this.$loadingTips.html(i)
    }, g.prototype.onHistoryChange = function() {}, g.prototype.onLoadedCallBack = function() {}, g.prototype.setViewModule = function(t) {
        if (!(null !== this.gridView && this._currentView === this.gridView && "grid" === t || null !== this.listView && this._currentView === this.listView && "list" === t)) {
            if ("grid" === t) this.$listViewContainer.hide(), this.$gridViewContainer.show(), null === this.gridView && this.initGridView(), this.gridView.setColumnsCount(), this._currentView = this.gridView, this.listView && this.gridView.importCheckedState(this.listView);
            else {
                if ("list" !== t) return;
                this.$gridViewContainer.hide(), this.$listViewContainer.show(), null === this.listView && this.initListView(), this._currentView = this.listView, this.gridView && this.listView.importCheckedState(this.gridView)
            }
            this.onViewModuleChange(t)
        }
    }, g.prototype.onViewModuleChange = function() {}, g.prototype.setListModule = function(t) {
        var e = this.cache && this.cache.config.params;
        if (this._currentListModule !== t || !("normal" === t && 0 === e.include || "recycle" === t && 1 === e.include)) {
            if (this._currentListModule = t, this.cache && "function" == typeof this.cache.getCacheConfig) {
                var i = this.cache.getCacheConfig();
                this.cache.clearCacheData(), i.params.include = t === this._normalListModule ? 0 : 1
            }
            this.onListModuleChange(t)
        }
    }, g.prototype.getListModule = function() {
        return this._currentListModule
    }, g.prototype.onListModuleChange = function() {}, g.prototype.isGridMode = function() {
        return h.checkListByViewMode(this.getCurrentView(), "grid")
    }, g.prototype.getCheckedItems = function() {
        return this.getCurrentView().getCheckedItems()
    }, g.prototype.getFirstPosition = function() {
        return this.getCurrentView().getFirstPosition()
    }, g.prototype.getDomByPosition = function(t) {
        return this.getCurrentView().getRenderingChildByPosition(t)
    }, g.prototype.getElementDataByPosition = function(t) {
        return this.getCurrentView().getElementDataByPosition(t)
    }, g.prototype.getCheckedIndexs = function() {
        return this.getCurrentView().getCheckedIndexs()
    }, g.prototype.setItemsChecked = function(t, e) {
        this.getCurrentView().setItemsChecked(t), e || this.getCurrentView().requestLayout()
    }, g.prototype.setEachItemChecked = function(t, e) {
        this.setItemsChecked(!1, !0);
        for (var i = 0; i < t.length; i++) this.getCurrentView().setItemChecked(t[i], e)
    }, g.prototype.setSingleItemChecked = function(t) {
        this.getCurrentView().setItemsChecked(!1), this.getCurrentView().setItemChecked(t, !0)
    }, g.prototype.setItemChecked = function(t, e) {
        this.getCurrentView().setItemChecked(t, e), this.getCurrentView().requestLayout()
    }, g.prototype.addItemToFirst = function(t) {
        this.getCurrentView().addItemToFirst(t)
    }, g.prototype.isItemChecked = function(t) {
        return this.getCurrentView().isItemChecked(t)
    }, g.prototype.addItemToFirst = function(t) {
        this.getCurrentView().addItemToFirst(t)
    }, g.prototype.getGridPostiion = function(t, e) {
        return this.getCurrentView() && "function" == typeof this.getCurrentView().getGridPosition ? this.getCurrentView().getGridPosition(t, e) : -1
    }, g.prototype.onOrderChange = function(t, e) {
        if (this.cache && "function" == typeof this.cache.getCacheConfig) {
            var i = this.cache.getCacheConfig();
            i.params.order = t, i.params.desc = e, this.checkLocalSort(t, e) ? this.localSort(this.cache, t, e) : this.cache.clearCacheData(), this.config.headerConfig && "function" == typeof this.config.headerConfig.operateOrderKey && this.config.headerConfig.operateOrderKey(i.params), this.refreshList(), this.onListOrderChange(t, e)
        }
    }, g.prototype.onListOrderChange = function() {}, g.prototype.changeHeaderConfig = function(t) {
        this.config.headerConfig = t, this.listHeader.buildHeader(t)
    }, g.prototype.checkLocalSort = function() {
        return !1
    }, g.prototype.localSort = function() {}, g.prototype.checkedChanged = function() {
        0 !== s("#export_menu").length && s("#export_menu").remove(), this.updateHeaderChecked(), this.listTools && this.listTools.filesSelect(this.getCheckedItems()), c.trigger("system-checked-changed", {
            data: this.getCheckedItems()
        })
    }, g.prototype.setListTools = function(t) {
        t && (this.listTools = t, this.listTools.hide())
    }, g.prototype.updateHeaderChecked = function() {
        var t, e = this.getCurrentView().getElementsData(),
            i = 0;
        if (e && this.isAllItemChecked()) for (var s = 0; s < e.length; s++) e[s].disableCheck || i++;
        else null != e && (i = e.length);
        t = this.isAllItemChecked() ? i : this.getCheckedIndexs().length, this.listHeader && this.listHeader.changeChecked(t, i), this.onCheckeChanged(t, i)
    }, g.prototype.isAllItemChecked = function() {
        return this.getCurrentView().isAllItemChecked()
    }, g.prototype.isLocked = function() {
        return this.listView ? this.listView.locked() : this.gridView ? this.gridView.locked() : !1
    }, g.prototype.lock = function(t) {
        this.listView && this.listView.lock(t, !1), this.gridView && this.gridView.lock(t, !1), this.onLockChanged(t)
    }, g.prototype.onLockChanged = function() {}, g.prototype.onCheckeChanged = function() {}, g.prototype.onHeaderCheckChanged = function(t) {
        this.getCurrentView().locked() || (t ? (this.$listViewContainer.find(".list-view-item").addClass("item-active"), this.$gridViewContainer.find(".grid-view-item").addClass("item-active")) : (this.$listViewContainer.find(".list-view-item").removeClass("item-active"), this.$gridViewContainer.find(".grid-view-item").removeClass("item-active")), this.setItemsChecked(t, !0))
    }, g.prototype.initPlugin = function() {
        var t = this;
        if (this.config.historyConfig) {
            var e = this.config.historyConfig;
            e.container = this.$container.find(y.historyList), this.historyList = new n(e), this.historyList.onHistoryChange = function(e, i) {
                t.historyChange.call(t, e, i)
            }, this.historyList.goToHistory = function(e) {
                t.goToHistory(e)
            }, this.historyList.onChangeHistoryList = function() {
                "function" == typeof t.onChangeHistoryList && t.onChangeHistoryList()
            }
        }
        var i = this.config.headerConfig;
        "undefined" == typeof i && (i = {}), i.container = this.$container.find(y.listHeader), i.containerSelector = y.listHeader, this.listHeader = new r(i), this.listHeader.onOrderChange = function(e, i) {
            t.onOrderChange.call(t, e, i)
        }, this.listHeader.getCheckMsg = function(e, i) {
            return t.getCheckMsg.call(t, e, i)
        }, this.listHeader.onCheckChanged = function(e) {
            t.onHeaderCheckChanged.call(t, e)
        }, this.config.defaultViewModle = this.config.defaultViewModle || "list", this.listLoading = new a({
            size: 26,
            text: !1
        }), this.setViewModule(this.config.defaultViewModle), c.listen("system-change-view-mode-loadingtip", function() {
            var e = t.getCurrentView() ? t.getCurrentView().getElementsData() : [];
            null == e && (e = []), !h.checkListByType(t.listView, "recycle") && e.length >= 1500 && (this.tip = d.show({
                mode: "loading",
                msg: "正在切换",
                autoClose: !1
            }))
        }), c.listen("system-change-view-mode-loadingtip-close", function() {
            this.tip && this.tip.hide()
        })
    }, g.prototype.updateOrder = function(t, e) {
        void 0 === e && (e = this.cache.getCacheConfig().params.desc ? 0 : 1), this.listHeader ? this.listHeader.updateOrder(t, e) : this.onOrderChange(t, e)
    }, g.prototype.checkLowBrowser = function() {
        var t = "8.0",
            e = navigator.userAgent;
        return (window.ActiveXObject || "ActiveXObject" in window) && /MSIE ([^;]+)/.test(e) && parseFloat(RegExp.$1, 10) <= t ? !0 : !1
    }, g.prototype.initListView = function() {
        var t = this,
            e = this.config.listViewBuilder,
            i = s.extend({
                type: "native",
                viewMode: "list",
                listContainer: this.$container.find(y.listView)[0],
                childrenClass: ".list-view-item",
                listItemDomName: "dd",
                buildView: function(i, s, o) {
                    return e.buildView.call(t.listView, i, s, o)
                },
                getView: function(i, s, o, n) {
                    return e.getView.call(t.listView, i, s, o, n)
                },
                needOrNotLoadMore: function() {
                    t.cache.hasMoreData() && t.loadMoreData()
                },
                onCheckeChanged: function() {
                    t.checkedChanged()
                },
                onScroll: function() {
                    "function" == typeof e.onScroll && e.onScroll.call(t.listView, this.getCount())
                }
            }, this.config.listConfig);
        (this.checkLowBrowser() || "recycle" === i.type || "recycle" === u("listtype")) && (i = s.extend(i, {
            type: "recycle",
            booleanFlagParams: ["USING_LOW_PIXEL_RATIO", !0],
            flagParams: ["USING_MOUSE_WHEEL_SENSOR", "USING_SCROLLBAR", "USING_KEYBOARD_DISPATCHER", "USING_TOUCH_SENSOR"],
            onComputeScrollbarChange: function(i, o, n) {
                if (i.isInTheTop() ? s(y.listHeader).addClass("is-in-top").removeClass("is-not-top") : s(y.listHeader).removeClass("is-in-top").addClass("is-not-top"), o > 0 && this.getCount() > 0) {
                    var r = parseFloat((o + n) / this.getCount(), 10);
                    r > .7 && t.loadMoreData()
                } else i.isInTheBottom() && t.cache.hasMoreData() && t.loadMoreData();
                "function" == typeof e.onScroll && e.onScroll.call(t.listView, this.getCount())
            }
        })), this.listView = h.init(i), this.listView.parent = t
    }, g.prototype.initGridView = function() {
        var t = this,
            e = this.config.gridViewBuilder,
            i = s.extend({
                type: "native",
                viewMode: "grid",
                listContainer: this.$container.find(y.gridView)[0],
                childrenClass: ".grid-view-item",
                listItemDomName: "dd",
                columnWidth: this.config.gridConfig.columnWidth || 130,
                buildView: function(i, s, o) {
                    return e.buildView.call(t.gridView, i, s, o)
                },
                getView: function(i, s, o) {
                    return e.getView.call(t.gridView, i, s, o)
                },
                needOrNotLoadMore: function() {
                    t.cache.hasMoreData() && t.loadMoreData()
                },
                onCheckeChanged: function() {
                    t.checkedChanged()
                },
                onScroll: function() {
                    "function" == typeof e.onScroll && e.onScroll.call(t.gridView, this.getCount())
                }
            }, this.config.gridConfig);
        (this.checkLowBrowser() || "recycle" === i.type || "recycle" === u("listtype")) && (i = s.extend(i, {
            type: "recycle",
            booleanFlagParams: ["USING_LOW_PIXEL_RATIO", !0],
            flagParams: ["USING_MOUSE_WHEEL_SENSOR", "USING_SCROLLBAR", "USING_KEYBOARD_DISPATCHER", "USING_TOUCH_SENSOR"],
            onComputeScrollbarChange: function(i, o, n) {
                if (i.isInTheTop() ? s(y.listHeader).addClass("is-in-top").removeClass("is-not-top") : s(y.listHeader).removeClass("is-in-top").addClass("is-not-top"), o > 0 && this.getCount() > 0) {
                    var r = parseFloat((o + n) / this.getCount(), 10);
                    r > .7 && t.loadMoreData()
                } else i.isInTheBottom() && t.cache.hasMoreData() && t.loadMoreData();
                "function" == typeof e.onScroll && e.onScroll.call(t.gridView, this.getCount())
            }
        })), this.gridView = h.init(i), this.gridView.parent = t
    }, g.prototype.bindEvent = function() {}, g.prototype.getColumnsCount = function() {
        return this.isGridMode() ? this.getCurrentView().getColumnsCount() : 1
    }, g.prototype.extend = function(t) {
        if ("object" == typeof t) for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e])
    }, g.prototype.goToHistory = function() {}, i.exports = g
});;
define("system-core:system/uiRender/buttonBox/buttonBox.js", function(t, i, e) {
    var n = !1,
        o = t("base:widget/libs/jquerypacket.js"),
        s = t("system-core:system/baseService/message/message.js"),
        r = t("base:widget/tools/tools.js"),
        h = t("system-core:context/context.js").instanceForSystem,
        u = function(t) {
            this.startTime = (new Date).getTime(), this.limit = t && t.limit || 10, this.name = t && t.name || "", this.alwaysShow = t && t.alwaysShow || !1, this.autoWidth = t && t.autoWidth || !1, this.paddingLeft = t && !isNaN(t.paddingLeft) ? t.paddingLeft : !1, this.$container = o(t.container).css({
                "white-space": "nowrap",
                position: "relative"
            }), this.$positionMark = o('<div class="button-box-mark" style="display:inline-block;*display:inline;*zoom:1;width:1px;height:1px;line-height:0;"></div>'), this.$box = o('<div class="' + t.className + '" style="position:absolute;top:0;"></div>').css({
                "padding-top": this.$container.css("padding-top"),
                "line-height": "normal"
            }), this.$canvas = null, this.$container.append(this.$positionMark), this.$container.append(this.$box), this.buttonsData = t.buttons, this.showNum = 0, this.resize = t.resize || !1, this.outSize = t.outSize || 0, this.containerPadding = null, this.buttons = [], this.buttonsWidth = 0, this.moreButton = null, this.moreButtonItem = [], this.moreNum = 0, this.specifiedTypeButton = [], this.specifiedDirButton = [], this.limitNumberButton = [], this.numberSwitchButton = [], this.initData(), u.instances.push(this)
        };
    u.instances = [], u.declareMod = [], u.prototype.initData = function() {
        if (!this.buttonsData) return void console.warn("[LOG FROM BUTTONBOX] key `buttons` is needed.");
        for (var t = this.orderButtons(this.buttonsData), i = 0, e = t.length; e > i; i++) {
            if (t[i].templateVar) {
                var o = !1;
                for (var r in t[i].templateVar) if (t[i].templateVar.hasOwnProperty(r) && yunData[r] != t[i].templateVar[r]) {
                    o = !0;
                    break
                }
                if (o === !0) continue
            }
            var u = this.buttonInstance(t[i]);
            u.appendTo(this.$box), n && console.log("按钮宽度：" + u.width), u.isShow && (this.buttonsWidth += u.width), "function" == typeof t[i].render ? t[i].render({
                $dom: u.dom,
                button: u
            }) : "string" == typeof t[i].render && s.trigger("plugin:" + t[i].pluginId, {
                run: t[i].render,
                $dom: u.dom,
                button: u
            })
        }
        this.initMoreButton(), this.moreButton.isShow && (this.buttonsWidth += this.moreButton.width);
        var l = (new Date).getTime() - this.startTime;
        h.log.send({
            name: "buttonBoxCreate",
            value: l
        })
    }, u.prototype.orderButtons = function(t) {
        return t.sort(function(t, i) {
            return t.index - i.index
        }), t
    }, u.prototype.buttonInstance = function(t) {
        var i = [{}, {}],
            e = t.title,
            o = t.icon;
        "object" == typeof t.title && t.title.length && (2 === t.title.length && (i[0].title = t.title[0], i[1].title = t.title[1]), e = t.title[0]), "object" == typeof t.icon && t.icon.length && (2 === t.icon.length && (i[0].icon = t.icon[0], i[1].icon = t.icon[1]), o = t.icon[0]), t.title = e, t.icon = o, this.limit <= this.showNum && "dropdown" !== t.type ? t.display = "none" : this.showNum++, "string" == typeof t.filesType ? "*" === t.filesType ? (delete t.filesType, n && console.log("普通按钮：" + t.title)) : "none" !== t.display && (n && console.log("文件处理按钮，初始不显示：" + t.title), t.display = "none", this.showNum--) : n && console.log("普通按钮：" + t.title), n && console.log("显示个数：" + this.showNum), this.formatEvent(t);
        var s = h.ui.button(t),
            r = s.config.module && s.config.module.split(",") || [];
        0 !== r.length && u.declareMod.push(s), s.index = this.buttons.length, this.buttons.push(s);
        var l = {
            title: t.title,
            symLink: s,
            click: t.click,
            icon: t.icon
        };
        return "none" === t.display && "string" != typeof t.filesType ? (t.isInMore = !0, l.isShow = !0, n && console.log("超过limit-" + this.limit + "-限制，隐藏按钮：" + t.title)) : l.display = "none", this.moreButtonItem.push(l), t.changePoint && (s.switchConfig = i, this.numberSwitchButton.push(s)), void 0 !== t.filesLimit && this.limitNumberButton.push(s), "string" == typeof t.filesType && "*" !== t.filesType && this.specifiedTypeButton.push(s), "string" == typeof t.excludeDirType && "*" !== t.excludeDirType && this.specifiedDirButton.push(s), s
    }, u.prototype.formatEvent = function(t) {
        var i = this;
        if (void 0 === t.click && void 0 === t.link)"dropdown" !== t.type && (t.click = function(i) {
            s.trigger("plugin:" + t.pluginId, i), h.log.send({
                name: "buttonClick",
                sendServerLog: !1,
                value: t.title
            })
        });
        else if ("string" == typeof t.click) {
            var e = t.click;
            t.click = function(i) {
                i = "object" == typeof i ? o.extend({
                    run: e
                }, i) : {
                    run: e
                }, s.trigger("plugin:" + t.pluginId, i), h.log.send({
                    name: "buttonClick",
                    sendServerLog: !1,
                    value: t.title
                })
            }
        }
        if ("string" == typeof t.mouseEnter) {
            var n = t.mouseEnter;
            t.mouseEnter = function(i) {
                i = "object" == typeof i ? o.extend({
                    run: n
                }, i) : {
                    run: n
                }, s.trigger("plugin:" + t.pluginId, i)
            }
        }
        if ("string" == typeof t.mouseLeave) {
            var n = t.mouseLeave;
            t.mouseLeave = function(i) {
                i = "object" == typeof i ? o.extend({
                    run: n
                }, i) : {
                    run: n
                }, s.trigger("plugin:" + t.pluginId, i)
            }
        }
        if ("string" == typeof t.beforeOpen) {
            var n = t.beforeOpen;
            t.beforeOpen = function(i) {
                i = "object" == typeof i ? o.extend({
                    run: n
                }, i) : {
                    run: n
                }, s.trigger("plugin:" + t.pluginId, i)
            }
        }
        if ("string" == typeof t.beforeClose) {
            var n = t.beforeClose;
            t.beforeClose = function(i) {
                i = "object" == typeof i ? o.extend({
                    run: n
                }, i) : {
                    run: n
                }, s.trigger("plugin:" + t.pluginId, i)
            }
        }
        if ("string" == typeof t.menu) {
            var n = t.menu;
            t.menu = function(i, e) {
                s.trigger("plugin:" + t.pluginId, {
                    run: n,
                    dom: i,
                    format: e
                })
            }
        }
        if ("dropdown" === t.type && "object" == typeof t.menu && t.menu.length) for (var r = 0, u = t.menu.length; u > r; r++) {
            var l = t.menu[r];
            if ("string" == typeof l.click) {
                var n = l.click;
                l.click = function(i) {
                    return function(e) {
                        e = "object" == typeof e ? o.extend({
                            run: i
                        }, e) : {
                            run: i
                        }, s.trigger("plugin:" + t.pluginId, e)
                    }
                }(n)
            }
        }
        this.resize && o(window).bind("resize", function() {
            0 !== i.$container.width() && i.filter()
        })
    }, u.prototype.initMoreButton = function() {
        var t, i = this.moreButtonItem;
        this.moreNum = 0;
        for (var e = 0, n = i.length; n > e; e++) i[e].isShow && this.moreNum++;
        t = this.moreNum > 0 ? void 0 : "none";
        var o = {
            type: "dropdown",
            title: "更多",
            resize: !0,
            display: t,
            menu: i,
            icon: "icon-more"
        };
        this.moreButton = h.ui.button(o).appendTo(this.$box)
    }, u.prototype.triggerClick = function(t, i) {
        if ("number" == typeof t && t >= 0 && t < this.buttons.length) {
            var e = this.buttons[t];
            e.triggerClick(i), e.isInMore && this.moreButton.hide()
        }
    }, u.prototype._disableButton = function(t, i) {
        t.isInMore ? (t.isShow === !0 && (this.buttonsWidth -= t.width, this.showNum--), t.hide(), i !== !1 && "disable" === t.config.disabled ? (this.moreButtonItem[t.index].isShow = !0, this.moreButtonItem[t.index].isEnable = !i, this.moreButton.menuDisable(t.index, i)) : (this.moreButtonItem[t.index].isEnable = void 0, i === !1 ? (this.moreButton.menuShow(t.index), this.moreButtonItem[t.index].isShow = !0) : (this.moreButtonItem[t.index].isShow = !1, this.moreButton.menuShow(t.index, !1)))) : (i === !1 ? (t.isShow === !1 && (this.buttonsWidth += t.width, this.showNum++), t.disable(!1).show()) : "disable" === t.config.disabled ? (t.isShow === !1 && (this.buttonsWidth += t.width, this.showNum++), t.disable().show()) : (t.isShow && (this.buttonsWidth -= t.width, this.showNum--), t.hide()), this.moreButtonItem[t.index].isShow = !1, this.moreButton.menuShow(t.index, !1)), this.moreNum = 0;
        for (var e = 0, n = this.moreButtonItem.length; n > e; e++) this.moreButtonItem[e].isShow && this.moreNum++;
        var o = this.moreButton.isShow;
        this.moreNum > 0 ? (this.moreButton.dom.prev().removeClass("last-button"), this.moreButton.show(), o || (this.buttonsWidth += this.moreButton.width)) : (this.moreButton.dom.prev().addClass("last-button"), this.moreButton.hide(), o && (this.buttonsWidth -= this.moreButton.width))
    }, u.prototype.getContainerWidth = function() {
        if (null === this.containerPadding) {
            var t = 0,
                i = 0;
            this.$container.css("padding-left") && (t = parseInt(this.$container.css("padding-left"), 10)), this.$container.css("padding-right") && (i = parseInt(this.$container.css("padding-right"), 10)), this.containerPadding = t - i
        }
        var e = this.$positionMark.position(),
            n = this.paddingLeft === !1 ? e.left : this.paddingLeft;
        this.$box.css("padding-left", n);
        var o = this.$container.innerWidth();
        this.$container.is(":hidden") && (o = this.$box.innerWidth());
        var s = o - this.containerPadding - (n || e.left);
        return this.$box.width(s), this.autoWidth && this.$box.width("auto"), s -= this.outSize
    }, u.prototype.filter = function(t) {
        for (var i = this.getContainerWidth(), e = this.buttons.length;
             (this.showNum > this.limit || this.buttonsWidth > i) && e > 0;) e--, this.buttons[e].isShow && !this.buttons[e].forbidMore && this.moveToMore(this.buttons[e]);
        for (var n = 0;
             (this.showNum < this.limit && n < this.buttons.length && (0 >= i || this.buttonsWidth + 90 < i) || 1 === this.moreNum && (0 >= i || this.buttonsWidth + 90 - this.moreButton.width < i)) && (n++, void 0 !== this.buttons[n]);) this.buttons[n].isInMore && this.releaseFromMore(this.buttons[n]);
        this.$box.removeClass("opacity-button-box"), t && t.length && this.$box.css("visibility", "visible")
    }, u.prototype.moveToMore = function(t) {
        !t.isInMore && t.isShow && (t.isInMore = !0, t.isEnable === !1 ? this._disableButton(t) : this._disableButton(t, !1))
    }, u.prototype.releaseFromMore = function(t) {
        t.isInMore && this.moreButtonItem[t.index].isShow && (t.isInMore = !1, this.moreButtonItem[t.index].isEnable === !1 ? this._disableButton(t) : this._disableButton(t, !1))
    }, u.prototype._handleSpecifiedTypeButton = function(t) {
        {
            var i = this.specifiedTypeButton;
            t.length
        }
        if (i.length && t.length) {
            for (var e = "", n = 0, s = t.length; s > n; n++) {
                var h = r.getFileCategory(t[n].server_filename || t[n].file_name);
                if (!h || 1 == t[n].isdir) {
                    e = null;
                    break
                } - 1 === e.indexOf(h) && (e += h + ",")
            }
            e = "string" == typeof e ? e.slice(0, -1).split(",") : null;
            for (var n = 0, s = i.length; s > n; n++) {
                var u = !1;
                if (null === e) u = !0;
                else for (var l = 0, a = e.length; a > l; l++) {
                    var d = o.inArray(e[l], i[n].config.filesType.split(","));
                    if (i[n].config.filesTypeStrongMatch && i[n].config.filesTypeStrongMatch === !0) {
                        if (-1 >= d) {
                            u = !0;
                            break
                        }
                    } else if (-1 === i[n].config.filesType.indexOf(e[l])) {
                        u = !0;
                        break
                    }
                }
                t.length > i[n].config.filesLimit && (u = !0), this._disableButton(i[n], u)
            }
        }
    }, u.prototype._handSpecifiedDirButton = function(t) {
        {
            var i = this.specifiedDirButton;
            t.length
        }
        if (i.length && t.length) {
            for (var e = "", n = 0, o = t.length; o > n; n++) {
                var s = !1,
                    r = t[n].path;
                e += r + "?"
            }
            e = "string" == typeof e ? e.slice(0, -1).split("?") : null;
            for (var h = 0, u = i.length; u > h; h++) {
                for (var s = !1, l = 0, a = e.length; a > l; l++) {
                    var d = i[h].config.excludeDirType,
                        p = d && d.indexOf(e[l]);
                    if (-1 != p && -1 === e[l].indexOf(",") && ("," == d.charAt(p + e[l].length) || p + e[l].length == d.length)) {
                        s = !0;
                        break
                    }
                }
                t.length > i[h].config.filesLimit && (s = !0), this._disableButton(i[h], s)
            }
        }
    }, u.prototype.filesSelect = function(t, i, e) {
        var n = this;
        i && i.paddingLeft && (n.paddingLeft = i.paddingLeft), i && i.paddingLeft && (n.paddingLeft = i.paddingLeft), this.timeout_reizer && clearTimeout(this.timeout_reizer), this.timeout_reizer = setTimeout(function() {
            n.resizeButtons(t), e && "function" == typeof e && e()
        }, 20)
    }, u.prototype.resizeButtons = function(t) {
        this.alwaysShow !== !0 && (this.$box.addClass("opacity-button-box"), this.$box.css("visibility", "hidden"));
        var i = this.numberSwitchButton,
            e = this.limitNumberButton,
            n = t.length;
        if (0 !== n) {
            for (var o = 0; o < i.length; o++) i[o].change(n <= i[o].config.changePoint ? i[o].switchConfig[0] : i[o].switchConfig[1]);
            for (var o = 0; o < e.length; o++) {
                var s = e[o].config.filesLimit;
                if (0 !== s || 0 !== n) if ("number" == typeof s && s >= n) this._disableButton(e[o], !1);
                else if ("string" == typeof s && 0 === s.indexOf(">")) {
                    var r = parseInt(s.substring(1));
                    n > r ? this._disableButton(e[o], !1) : this._disableButton(e[o])
                } else this._disableButton(e[o]);
                else this._disableButton(e[o], !1)
            }
            this._handleSpecifiedTypeButton(t), this._handSpecifiedDirButton(t), this.filter(t), this.$box.show()
        } else for (var o = 0; o < e.length; o++) {
            var s = e[o].config.filesLimit;
            0 === s && 0 === n && this._disableButton(e[o], !1)
        }
    }, u.prototype.lock = function(t) {
        return t === !1 && this.$canvas ? void this.$canvas.hide() : (this.$canvas || (this.$canvas = o('<div style="width:100%;height:100%;z-index:30;position:absolute;top:0;left:0;"></div>'), this.$box.prepend(this.$canvas)), void this.$canvas.show())
    }, u.prototype.hide = function(t) {
        return t === !1 ? void this.$box.show() : void this.$box.hide()
    }, u.filesSelect = function(t) {
        for (var i = 0, e = u.instances.length; e > i; i++) u.instances[i].filesSelect(t)
    }, s.listen("system-change-toolbar", function(t) {
        for (var i = t.module || "list", e = u.declareMod, n = null, o = 0; o < e.length; o++) n = e[o], new RegExp(i + "$", "gi").test(n.config.module) || new RegExp(i + ",", "gi").test(n.config.module) ? n.dom.show() : n.dom.hide()
    }), e.exports = u
});;
define("system-core:system/uiService/dialog/dialogManager.js", function(i, e, s) {
    var t = (i("base:widget/libs/jquerypacket.js"), {
        dialogs: {},
        addDialog: function(i, e) {
            this.dialogs[i] = e, this.bindEvents()
        },
        getDialogById: function(i) {
            return this.dialogs[i]
        }
    });
    s.exports = t
});;
define("system-core:system/uiService/rMenu/rMenu.js", function(e, t, n) {
    !
        function() {
            var t = e("base:widget/libs/jquerypacket.js"),
                i = {
                    domConf: {},
                    eventConf: {},
                    menus: {},
                    keyBoard: {},
                    currentShowId: void 0,
                    currentMenuTarget: null,
                    tempHtml: "",
                    tempForCurrentRenderId: void 0,
                    subMenuShowTime: 200,
                    subMenuLoad: null,
                    zIndex: 100,
                    onMenuHide: null
                },
                o = {},
                a = function(e, t, n, i) {
                    var o = function(e) {
                        void 0 === e && (e = window.event), void 0 === e.stopPropagation && (e.stopPropagation = function() {
                            e.cancelBubble = !0
                        }), void 0 === e.preventDefault && (e.preventDefault = function() {
                            e.returnValue = !1
                        }), n(e)
                    };
                    e.addEventListener ? (i = i === !0 ? !0 : !1, e.addEventListener(t, o, i)) : e.attachEvent ? e.attachEvent("on" + t, o) : e["on" + t] = o
                };
            i.contextMenu = function(e, t, n, o) {
                if (e = e || window.event, i.currentMenuTarget = e.target || e.srcElement, i.eventConf = o, !o || "function" != typeof o.beforeMenu || o.beforeMenu.call(i.currentMenuTarget) !== !1) {
                    e.cancelBubble = !0, e.stopPropagation && e.stopPropagation();
                    var a = n.getAttribute("data-cid");
                    a || (a = i.getRandomId(), n.setAttribute("data-cid", a)), i.domConf[a] || (i.tempForCurrentRenderId = a, i.domConf[a] = i.createMenu(t, a)), i.checkDisplay(i.domConf[a]), i.caculatePosition(e, i.domConf[a]), i.showMenu(a), o && "function" == typeof o.afterMenu && o.afterMenu.call(i.currentMenuTarget), o && "function" == typeof o.menuHide && (i.onMenuHide = o.menuHide)
                }
            }, i.getRandomId = function(e) {
                return "string" == typeof e ? e + Math.random().toString().replace(".", "") : "m" + Math.random().toString().replace(".", "")
            }, i.renderOneList = function(e, t) {
                var n = !1;
                if (!e || !e.title) return "";
                e.id = i.getRandomId("i"), i.menus[e.id] = e;
                var o = "",
                    a = "[object Array]" === Object.prototype.toString.call(e.nextMenu) && e.nextMenu.length ? ' class="has-more arrowicon"' : "",
                    r = "function" == typeof e.display ? ' data-check-display="true"' : "";
                if ("function" == typeof e.variableMenu && (a = ' class="has-more arrowicon" data-variable-menu="true"'), o += '<li id="' + e.id + '"' + a + r + ' data-group="' + t + '">', "string" == typeof e.icon && e.icon.length) o += /background\:url\(/.test(e.icon) ? '<em class="icon" style=\'' + e.icon + "'></em><em class=\"icon-hover\" style='" + e.icon + "'></em>" : '<em class="icon ' + e.icon + '"></em><em class="icon-hover ' + e.icon + '"></em>';
                else if ("object" == typeof e.icon && e.icon.length) try {
                    for (var l = 0; l < e.icon.length; l++) {
                        var c = 0 === l ? "icon" : "icon-hover";
                        o += /background\:url\(/.test(e.icon[l]) ? '<em class="' + c + "\" style='" + e.icon[l] + "'></em>" : '<em class="' + c + " " + e.icon[l] + '"></em>'
                    }
                } catch (s) {
                    n && console.log("[rMenu ERROR] the icon in config is ")
                }
                if (o += e.title, e.keyboard && 1 === e.keyboard.length) {
                    var d = e.keyboard.toUpperCase();
                    i.keyBoard[i.tempForCurrentRenderId] || (i.keyBoard[i.tempForCurrentRenderId] = {}), i.keyBoard[i.tempForCurrentRenderId][d] || (o += "(" + d + ")", i.keyBoard[i.tempForCurrentRenderId][d] = e.id)
                }
                return "" !== a && (o += i.renderHtml(e.nextMenu)), o += "</li>"
            }, i.renderHtml = function(e, t) {
                var n = "";
                if ("object" == typeof e && e.length) {
                    t || (n += '<ul class="list">');
                    for (var o = 0, a = 0, r = e.length; r > a; a++) if ("[object Array]" === Object.prototype.toString.call(e[a])) if (e[a].length) {
                        n.match(/\"separate\" data-group=\"\d+\"\>\<\/li\>$/) || (n += '<li class="separate" data-group="' + o+++'"></li>');
                        for (var l = 0, c = e[a].length; c > l; l++) n += i.renderOneList(e[a][l], o);
                        n += '<li class="separate" data-group="' + o+++'"></li>'
                    } else 0 === e[a].length && (n.match(/\"separate\" data-group=\"\d+\"\>\<\/li\>$/) || (n += '<li class="separate" data-group="' + o+++'"></li>'));
                    else n += i.renderOneList(e[a], o);
                    n = n.replace(/\<li\sclass\=\"separate\" data-group=\"\d+\"\>\<\/li\>$/i, ""), n = n.replace(/^\<li\sclass\=\"separate\" data-group=\"\d+\"\>\<\/li\>/i, ""), t || (n += "</ul>")
                } else n += '<ul class="list"></ul>';
                return n
            }, i.createMenu = function(e) {
                var t = document.createElement("div");
                return t.className = "context-menu", t.id = i.tempForCurrentRenderId, document.body.appendChild(t), i.tempHtml = "", t.innerHTML = i.renderHtml(e), i.eventDelegate(t, ".has-more", "mouseover", i.showSubList), i.eventDelegate(t, ".has-more", "mouseout", i.hideSubList), i.eventDelegate(t, "li", "mouseover", i.hideSilibingsList), i.eventDelegate(t, "li", "click", i.listAction), i.eventDelegate(t, ".list", "click", i.variableMenuAction), i.eventDelegate(t, ".list", "mouseover", function(e) {
                    e.stopPropagation()
                }), t.children[0].style.zIndex = i.zIndex, a(t, "contextmenu", function(e) {
                    e.stopPropagation(), e.preventDefault()
                }), a(t, "click", function(e) {
                    e.stopPropagation()
                }), a(t, "mouseover", function(e) {
                    e.stopPropagation()
                }), a(t, "mouseout", function(e) {
                    e.stopPropagation()
                }), a(t, "mousedown", function(e) {
                    e.stopPropagation()
                }), a(t, "mouseup", function(e) {
                    e.stopPropagation()
                }), t.children[0]
            }, i.asyncRenderSubList = function(e, t) {
                "object" == typeof e && e.length && (t.innerHTML = i.renderHtml(e, !0)), i.checkDisplay(t)
            }, i.showSubList = function(e) {
                clearTimeout(i.subMenuLoad);
                var t = this;
                this.className.match(/\sdisable(\s|$)/) || (i.subMenuLoad = setTimeout(function() {
                    if ("true" == t.getAttribute("data-variable-menu")) {
                        var n = t.id;
                        lists = i.menus[n].variableMenu(t.children[0], function(e) {
                            i.asyncRenderSubList(e, t.children[0])
                        }), i.asyncRenderSubList(lists, t.children[0])
                    }
                    t.className.match(/\sopen(\s|$)/) || (t.className = t.className + " open", t.style.zIndex = i.zIndex + 3, i.checkDisplay(t.children[0]), i.caculatePosition(e, t.children[0], t))
                }, i.subMenuShowTime))
            }, i.hideSilibingsList = function() {
                var e;
                e = this === i ? i.domConf[i.currentShowId].children : this.parentElement.children;
                for (var t = 0, n = e.length; n > t; t++) if (e[t] !== this && e[t].className.match(/\sopen(\s|$)/)) {
                    e[t].className = e[t].className.replace(/\s+open(\s|$|\"|\')/g, "$1"), e[t].style.zIndex = i.zIndex + 2, e[t].children[0].style.display = "none";
                    var o = e[t].children[0].innerHTML.replace(/\s+open(\s|$|\"|\')/g, "$1").replace(/display\s*\:\s*block\s*;?/g, "display:none;");
                    e[t].children[0].innerHTML = o
                }
            }, i.listAction = function() {
                if (this.id && i.menus[this.id]) {
                    var e = document.getElementById(this.id);
                    if (e.className.match(/\sdisable(\s|$)/)) return;
                    e.className.match(/(^|\s)has\-more(\s|$)/) || i.hideMenu(), "function" == typeof i.menus[this.id].action && (i.eventConf && "function" == typeof i.eventConf.listItemClickBefore && i.eventConf.listItemClickBefore.call(i.currentMenuTarget, i.menus[this.id], "click"), i.menus[this.id].action.call(i.currentMenuTarget, e))
                }
            }, i.variableMenuAction = function() {
                "true" == this.parentNode.getAttribute("data-variable-menu") && i.hideMenu()
            }, i.hideSubList = function() {
                clearTimeout(i.subMenuLoad)
            }, i.showMenu = function(e) {
                i.currentShowId && (i.domConf[e].style.display = "none"), i.domConf[e].style.display = "block";
                var n = t(i.domConf[e]).find(">li:visible").length;
                0 >= n && (i.domConf[e].style.display = "none"), i.currentShowId = e
            }, i.checkDisplay = function(e) {
                !e && i.currentShowId && (e = i.domConf[i.currentShowId]);
                for (var n = e.children, o = t(n[n.length - 1]).data("group"), a = t(e).find('>li[data-group="0"]').length, r = t(e).find('>li[data-group="' + o + '"]').length, l = 0, c = n.length; c > l; l++) if ("true" === n[l].getAttribute("data-check-display")) {
                    var s = n[l].id;
                    if (s && "function" == typeof i.menus[s].display) {
                        var d = i.menus[s].display.call(i.currentMenuTarget);
                        if (d === !1) {
                            var u = i.getPreviousVisibleSeparate(n[l]),
                                p = i.getNextVisibleSeparate(n[l]);
                            u && p && (u.style.display = "none"), n[l].style.display = "none";
                            var m = t(n[l]).data("group");
                            0 === m && --a <= 1 && t(e).find('>li.separate[data-group="0"]').hide(), m === o && --r <= 1 && t(e).find('>li.separate[data-group="' + (o - 1) + '"]').hide()
                        } else if ("disable" === d) {
                            var h = i.getPreviousHidenSeparate(n[l]);
                            h && (h.style.display = "block"), -1 === n[l].className.indexOf(" disable") && (n[l].className = n[l].className + " disable"), n[l].style.display = "block"
                        } else {
                            var m = t(n[l]).data("group");
                            if (!(1 === m && 1 >= a)) {
                                var h = i.getPreviousHidenSeparate(n[l]);
                                h && (h.style.display = "block")
                            }
                            n[l].className = n[l].className.replace(/(\sdisable)+(?=\s|$)/gi, ""), n[l].style.display = "block"
                        }
                    }
                }
            }, i.getPreviousVisibleSeparate = function(e) {
                for (var t = e.previousElementSibling || e.previousSibling; t;) if ("none" === t.style.display) t = t.previousElementSibling || t.previousSibling;
                else {
                    if ("separate" === t.className) break;
                    t = null
                }
                return t
            }, i.getPreviousHidenSeparate = function(e) {
                for (var t = e.previousElementSibling || e.previousSibling; t;) if ("separate" === t.className) {
                    if ("none" === t.style.display) break;
                    t = null
                } else t = "none" === t.style.display ? t.previousElementSibling || t.previousSibling : null;
                return t
            }, i.getNextVisibleSeparate = function(e) {
                for (var t = e.nextElementSibling || e.nextSibling; t;) if ("none" === t.style.display) t = t.nextElementSibling || t.nextSibling;
                else {
                    if ("separate" === t.className) break;
                    t = null
                }
                return t
            }, i.caculatePosition = function(e, t, n) {
                var i = t.style.left,
                    o = t.style.top;
                t.style.left = "-9999px", t.style.top = "-9999px", t.style.display = "block";
                var a = t.offsetWidth,
                    r = t.offsetHeight,
                    l = document.documentElement.clientWidth,
                    c = document.documentElement.clientHeight;
                if (n) {
                    var s = function() {
                            for (var e = n, t = 0; e;) t += e.offsetTop, e = e.parentElement;
                            return t
                        }(),
                        d = function() {
                            for (var e = n, t = 0; e;) t += e.offsetLeft, e = e.parentElement;
                            return t
                        }(),
                        u = n.offsetWidth,
                        p = n.offsetHeight;
                    o = c >= s + r ? -3 : s > r ? r - 2 - p : s + r - c - 3, i = l >= d + u + a ? u - 3 : -a + 3
                } else {
                    var m = e.clientX,
                        h = e.clientY;
                    i = l >= m + a ? m : l - a, o = c >= h + r ? h : h > r ? h - r : c - r
                }
                t.style.left = i + "px", t.style.top = o + "px"
            }, i.hideMenu = function() {
                i.currentShowId && (i.domConf[i.currentShowId].style.display = "none", i.hideSilibingsList(), i.currentShowId = void 0, i.hideSubList(), "function" == typeof i.onMenuHide && i.onMenuHide.call(i.currentMenuTarget))
            }, i.keyBoardHandler = function(e) {
                var t = String.fromCharCode(e.keyCode);
                if (i.currentShowId && i.keyBoard[i.currentShowId]) {
                    var n = i.keyBoard[i.currentShowId][t];
                    if (n) {
                        var o = document.getElementById(n);
                        if (o.className.match(/\sdisable(\s|$)/)) return;
                        if (o.className.match(/(^|\s)has\-more(\s|$)/)) return i.showSubList.call(o), void i.hideSilibingsList.call(o);
                        "function" == typeof i.menus[n].action && (i.hideMenu(), i.eventConf && "function" == typeof i.eventConf.listItemClickBefore && i.eventConf.listItemClickBefore.call(i.currentMenuTarget, i.menus[n], "keyBoard"), i.menus[n].action.call(i.currentMenuTarget, o))
                    }
                }
            }, i.eventMatcher = function(e, t, n, i) {
                var o = e,
                    a = !1;
                for (n.stopPropagation = function() {
                    a = !0
                }; o && o !== i && o !== document.body && !a;) {
                    for (var r = 0, l = t.length; l > r; r++) {
                        var c = t[r].selector;
                        0 === c.indexOf(".") && -1 !== o.className.toLowerCase().indexOf(c.substring(1)) ? t[r].action.call(o, n) : -1 !== o.tagName.toLowerCase().indexOf(c) && t[r].action.call(o, n)
                    }
                    o = o.parentNode
                }
            }, i.eventDelegate = function(e, t, n, o) {
                e["delegateevent-" + n] ? e["delegateevent-" + n].push({
                    selector: t,
                    action: o
                }) : (e["delegateevent-" + n] = [{
                    selector: t,
                    action: o
                }], a(e, n, function(t) {
                    var o = t.target || t.srcElement,
                        a = e["delegateevent-" + n];
                    i.eventMatcher(o, a, t, e)
                }))
            }, i.init = function() {
                var e = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAyCAMAAACwGaE2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzhGQzA4MUIzRkNFMTFFNEFFNkRGOTBCODU5NjkyMTciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzhGQzA4MUMzRkNFMTFFNEFFNkRGOTBCODU5NjkyMTciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3OEZDMDgxOTNGQ0UxMUU0QUU2REY5MEI4NTk2OTIxNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3OEZDMDgxQTNGQ0UxMUU0QUU2REY5MEI4NTk2OTIxNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpbvuBQAAAAGUExURXp6ev///7iACewAAAACdFJOU/8A5bcwSgAAAElJREFUeNrc0kEKACAIRNHf/S8dSWoz4AVyo4/QRQwrircBLbgkEaRwSAOZc7nqC6FChYr5bb75xS9pCmS29FiyLHWWyGpbgAEA38gCGb87IAIAAAAASUVORK5CYII=";
                arrowImgHover = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAyCAMAAACwGaE2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODAxQTFDRkYzRkNFMTFFNDhCREVDNDI5RDEyNTM1NTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODAxQTFEMDAzRkNFMTFFNDhCREVDNDI5RDEyNTM1NTUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4MDFBMUNGRDNGQ0UxMUU0OEJERUM0MjlEMTI1MzU1NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4MDFBMUNGRTNGQ0UxMUU0OEJERUM0MjlEMTI1MzU1NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PlWhQhkAAAAGUExURf///////1V89WwAAAACdFJOU/8A5bcwSgAAAElJREFUeNrc0kEKACAIRNHf/S8dSWoz4AVyo4/QRQwrircBLbgkEaRwSAOZc7nqC6FChYr5bb75xS9pCmS29FiyLHWWyGpbgAEA38gCGb87IAIAAAAASUVORK5CYII=";
                var t = ".context-menu{position:absolute;font-size:13px!important;color:#000!important;top:0;left:0;-moz-user-select:none;-o-user-select:none;-webkit-user-select:none;user-select:none;}.context-menu .arrowicon{background:url(" + e + ") right center no-repeat}.context-menu .arrowicon.list-hover, .context-menu .arrowicon.open{background-image:url(" + arrowImgHover + ")}.context-menu ul, .context-menu li{list-style:none;padding:0;margin:0;font-size:13px!important;color:#5b667b!important}.context-menu .list{min-height:23px;padding:2px 0;position:absolute;background-color:#FFF;color:#000}.context-menu .list{border: 1px solid #dde0e4;border-radius: 5px;box-shadow: 0 0 8px #ccc;}.context-menu .list li{display:list-item;cursor:default;height:23px;line-height:23px;white-space:nowrap;position:relative;z-index:1;padding: 0 27px 0 20px;}.context-menu .list .disable, .context-menu .list .disable:hover{filter:alpha(opacity=80);opacity: 0.8;color:#A1A192!important;background-color:#FFF;background:none}.context-menu .list li .icon, .context-menu .list li .icon-hover{position:absolute;display:block;width:16px;height:16px;top:3px;left:2px}.context-menu .list li .icon-hover{display:none}.context-menu .list li.list-hover,.context-menu .list .has-more.open{background-color:#4281F4;color:#FFF!important}.context-menu .list li.list-hover>.icon{display:none}.context-menu .list li.list-hover>.icon-hover{display:block}.context-menu .list .has-more{z-index:2;}.context-menu .list .has-more .list{display:none;top:-3px;left:98%;z-index:2;border-radius:0;box-shadow: 0 0 0;} .context-menu .list .separate,.context-menu .list .separate.list-hover{padding:0;margin:5px 0;height:1px;line-height:0;font-size:0!important;background-color:#e9e9e9;cursor:default}.context-menu .list .arrow-down{height:16px;background-position:center -38px}.context-menu .list li:hover { background-color: #4281F4;color: #FFF!important;}.context-menu .list li.separate:hover { background-color: #e9e9e9;}.context-menu .list .arrow-up{height:16px;background-position:center 4px}",
                    n = document.createElement("style");
                n.setAttribute("type", "text/css"), document.all ? n.styleSheet.cssText = t : n.innerHTML = t, document.getElementsByTagName("head").item(0).appendChild(n), a(document.body, "keydown", i.keyBoardHandler, !0), a(document.body, "mousedown", i.hideMenu)
            }, o.bind = function(e, t, n) {
                var o = e.getAttribute("data-cid");
                if (o && i.domConf[o]) {
                    try {
                        i.domConf[o].parentElement.removeChild(i.domConf[o])
                    } catch (a) {}
                    delete i.domConf[o], delete i.eventConf[o], i.keyBoard = {}
                }
                e.oncontextmenu = function(e) {
                    e = void 0 === e && window.event ? window.event : e, e.preventDefault ? e.preventDefault() : e.returnValue = !1, i.contextMenu(e, t, this, n)
                }
            }, "undefined" != typeof n && n.exports ? n.exports = o : window.rMenu = o, "undefined" != typeof t && t.fn && (t.fn.rMenu = function(e, n) {
                t(this).each(function() {
                    var t = dom.getAttribute("data-cid");
                    if (t && i.domConf[t]) {
                        try {
                            i.domConf[t].parentElement.removeChild(i.domConf[t])
                        } catch (o) {}
                        delete i.domConf[t], delete i.eventConf[t], i.keyBoard = {}
                    }
                    this.oncontextmenu = function(t) {
                        t = void 0 === t && window.event ? window.event : t, t.preventDefault ? t.preventDefault() : t.returnValue = !1, i.contextMenu(t, e, this, n)
                    }
                })
            }), i.init()
        }()
});;
define("system-core:context/context.js", function(e, t, n) {
    var i = e("base:widget/libs/jquerypacket.js"),
        o = e("base:widget/libs/underscore.js"),
        r = e("system-core:system/baseService/message/message.js"),
        s = e("system-core:system/uiService/button/button.js"),
        a = e("system-core:system/uiService/dialog/dialog.js"),
        c = e("system-core:system/uiService/tip/tip.js"),
        u = e("system-core:system/cache/listCache/cacheManage.js"),
        d = e("system-core:system/uiService/log/log.js"),
        l = e("system-core:system/uiService/log/updateLog.js"),
        p = e("system-core:system/uiService/page/page.js"),
        f = e("base:widget/tools/tools.js"),
        y = e("system-core:system/uiService/motionSensor/motionSensor.js"),
        g = e("system-core:system/uiService/keyGuard/keyGuard.js"),
        h = e("system-core:system/uiService/mouseWheelSensor/mouseWheelSensor.js"),
        m = e("system-core:system/uiService/list/list.js"),
        w = e("system-core:system/uiService/loading/loading.js"),
        v = e("system-core:pluginControl/register/register.js"),
        _ = 0,
        I = !0,
        b = function(e) {
            e ? (this.message = r, this.isSystem = !0) : (this.message = new r, this.isSystem = !1), this.log = new d, this.updateLog = l
        };
    b.extend = function(e, t) {
        if ("object" == typeof e) for (var n in e) e.hasOwnProperty(n) && (b.prototype[n] ? b.extend(n, e[n]) : b.prototype[n] = e[n]);
        else if ("string" == typeof e && "object" == typeof t) {
            var n = e,
                i = b.prototype[n];
            if (i) for (var o in t) t.hasOwnProperty(o) && (i[o] = t[o])
        }
        if ("object" == typeof t) for (var n in t) t.hasOwnProperty(n) && (b.helps[n] = t[n])
    }, b.helps = {
        file: {
            type: "object",
            description: "文件方法集合",
            _property: {
                list: {
                    type: "function",
                    description: "异步获取文件列表",
                    param: [{
                        type: "string",
                        description: "传入的路径",
                        example: "/"
                    }, {
                        type: "function",
                        description: "接收函数",
                        example: "function(list){}"
                    }],
                    "return": {
                        type: "undefined",
                        description: void 0
                    }
                }
            }
        },
        ui: {
            type: "object",
            description: "文件方法集合",
            _property: {
                List: {
                    type: "function",
                    description: "列表的构造函数，用于表现例如主列表的样式",
                    param: [{
                        type: "object",
                        description: "传入的配置，共有8个配置选项",
                        example: '{defaultViewModle: "list"    historyConfig: "object, 请参见文档"    headerConfig: "object, 请参见文档"    listConfig: "object, 请参见文档"    listViewBuilder: "object, 请参见文档"    gridConfig: "object, 请参见文档"    gridViewBuilder: "object, 请参见文档"    listToolsConfig: "object, 请参见文档"}'
                    }],
                    "return": {
                        type: "object",
                        description: "被实例化的列表对象"
                    }
                }
            }
        }
    }, b.cacheName = "list", b.setList = function(e) {
        e instanceof m && (b.prototype.__listInstance = e)
    }, b.getList = function() {
        return b.prototype.__listInstance
    }, b.prototype = {
        __listInstance: null,
        libs: {
            JQuery: i,
            $: i,
            underscore: o,
            _: o
        },
        extend: function(e, t) {
            b.extend(e, t)
        },
        obtainId: function() {
            return "_system_id_" + ++_
        },
        setList: function(e) {
            b.setList(e)
        },
        getList: function() {
            return b.getList()
        },
        file: {
            _defaultPath: "/",
            list: function(e, t) {
                var n = b.prototype.__listInstance;
                if (n && n.cache) {
                    var i = -1;
                    e = e || this._defaultPath, n.cache.getCacheData(b.cacheName, e, i, t)
                }
            },
            add: function(e, t) {
                var n = b.prototype.__listInstance;
                if (n && n.cache) {
                    var i, r;
                    if (e = e || this._defaultPath, o.isArray(t) === !0) for (r = t.length; r > 0; r--) i = t[r], n.cache.addDataBefore(b.cacheName, e, i);
                    else o.isObject(t) === !0 && (i = t, n.cache.addDataBefore(b.cacheName, e, i))
                }
            },
            remove: function(e) {
                var t = b.prototype.__listInstance;
                if (t && t.cache) {
                    var n;
                    o.isArray(e) === !0 ? t.cache.removeByIndexs(e) : o.isObject(e) === !0 && (n = e, t.cache.removeByIndex(n))
                }
            },
            update: function(e, t) {
                var n = b.prototype.__listInstance;
                n && n.cache && (e = e || this._defaultPath, o.isArray(t) === !0 ? n.cache.updateData(b.cacheName, e, t) : o.isObject(t) === !0 && n.cache.updateData(b.cacheName, e, [t]))
            },
            watchCDNOfPCS: function(e) {
                return
            }
        },
        list: {
            isLocked: function() {
                var e = b.prototype.__listInstance;
                return e ? e.isLocked() : !1
            },
            goHistory: function(e) {
                var t = b.prototype.__listInstance;
                return t ? t.goHistory("list", e) : void(I && console.log("[LOG FORM CONTEXT] can’t find list in this page."))
            },
            getHistoryPath: function() {
                var e = b.prototype.__listInstance;
                return e ? e.getHistoryPath() : void(I && console.log("[LOG FORM CONTEXT] can’t find list in this page."))
            },
            getSelected: function() {
                var e = b.prototype.__listInstance;
                return e ? e.getCheckedItems() : void(I && console.log("[LOG FORM CONTEXT] can’t find list in this page."))
            },
            getCurrentList: function() {
                var e = b.prototype.__listInstance;
                return e ? e.getCurrentDataList() : void(I && console.log("[LOG FORM CONTEXT] can’t find list in this page."))
            },
            getCurrentPath: function() {
                var e = b.prototype.__listInstance;
                return e ? e.currentKey : void(I && console.log("[LOG FORM CONTEXT] can’t find list in this page."))
            },
            refresh: function() {
                var e = b.prototype.__listInstance;
                return e ? e.refreshList() : void(I && console.log("[LOG FORM CONTEXT] can’t find list in this page."))
            },
            removeCacheByPath: function(e) {
                var t = b.prototype.__listInstance;
                return t ? t.removeCacheByPath(e) : void(I && console.log("[LOG FORM CONTEXT] can’t find list in this page."))
            },
            resize: function() {
                var e = b.prototype.__listInstance;
                return e ? e.resize() : void(I && console.log("[LOG FORM CONTEXT] can’t find list in this page."))
            },
            mapFirstFileByCategory: function(e, t) {
                var n = b.prototype.__listInstance;
                return n.mapFirstFileByCategory(e, t)
            },
            getIndexsByFiles: function(e) {
                var t = b.prototype.__listInstance;
                return t.getIndexsByFiles(e)
            },
            showErrorTips: function(e, t) {
                var n = b.prototype.__listInstance;
                n && n.showErrorTips(e, t)
            },
            getCurrentPageMode: function() {
                var e = b.prototype.__listInstance;
                return e.getCurrentPageMode()
            },
            getCurrentListModule: function() {
                var e = b.prototype.__listInstance;
                return e.getListModule()
            },
            getCurrentViewModule: function() {
                var e = b.prototype.__listInstance;
                return e.getCurrentView()
            },
            addItemToFirst: function(e) {
                var t = b.prototype.__listInstance;
                return t.addItemToFirst(e)
            }
        },
        ui: {
            window: function(e) {
                return window.yunHeader && window.yunHeader.fontIe && window.yunHeader.fontIe.api && window.yunHeader.fontIe.api.doAddIcon(), new a(e)
            },
            confirm: function(e, t, n, i) {
                return window.yunHeader && window.yunHeader.fontIe && window.yunHeader.fontIe.api && window.yunHeader.fontIe.api.doAddIcon(), a.confirm.call(a, e, t, n, i)
            },
            alert: function(e, t) {
                return window.yunHeader && window.yunHeader.fontIe && window.yunHeader.fontIe.api && window.yunHeader.fontIe.api.doAddIcon(), a.alert.call(a, e, t)
            },
            verify: function(e, t, n, i, o) {
                return window.yunHeader && window.yunHeader.fontIe && window.yunHeader.fontIe.api && window.yunHeader.fontIe.api.doAddIcon(), a.verify.call(a, e, t, n, i, o)
            },
            tip: function(e) {
                return c.show(e)
            },
            hideTip: function() {
                return c.hide()
            },
            page: function(e) {
                return new p(e)
            },
            contextMenu: function(t, n, i) {
                e.async("system-core:system/uiService/rMenu/rMenu.js", function(e) {
                    e.bind(t, n, i)
                })
            },
            list: function(e, t) {
                var n = new m(e, t);
                return n
            },
            listCache: function(e, t, n) {
                return u.obtainCache(e, t, n)
            },
            cacheManage: u,
            button: function(e) {
                return new s(e)
            },
            loading: function(e) {
                return new w(e)
            }
        },
        size: {
            resize: function(e) {
                o.isFunction(e) === !0 && (this.callback = e)
            },
            window: function(e) {
                var t = i(window);
                e.width && o.isNumber(e.width) && t.width(e.width), e.height && o.isNumber(e.height) && t.height(e.height), this.callback && this.callback.call(void 0)
            },
            document: function(e) {
                var t = i(document);
                e.width && o.isNumber(e.width) && t.width(e.width), e.height && o.isNumber(e.height) && t.height(e.height), this.callback && this.callback.call(void 0)
            }
        },
        tools: {
            baseService: f,
            motionSensor: y,
            keyGuard: g,
            mouseWheelSensor: h
        },
        pageInfo: {
            currentPage: "disk-home",
            currentProduct: "pan"
        },
        data: {
            quota: {
                get: function() {
                    return [100, 1e10]
                },
                update: function(e) {
                    e.call(null, 100, 1e10)
                },
                hasEnoughSpacing: function() {
                    return !0
                }
            }
        },
        help: function() {
            if (0 === arguments.length) return void(I && console.log("[need]"));
            for (var e = b.helps, t = 0, n = arguments.length; n > t; t++) if (e = 0 === t ? e[arguments[t]] : e._property && e._property[arguments[t]], !e) return void(I && console.log("[NO PROPERTY]"));
            return e
        }
    }, b.instanceForSystem = new b(!0), b.instanceForSystem.pluginControl = {
        setButtonContainer: function(e) {
            return v.setButtonContainer(e)
        },
        init: function(e) {
            return v.init(e)
        },
        getFaceData: function() {
            return v.getFaceData()
        },
        pluginData: function() {
            return v.getPluginData()
        }
    }, window.logConfigs && b.instanceForSystem.log.define(window.logConfigs, "global"), n.exports = b
});