define("disk-system:widget/data/yunData.js", function(a, t, n) {
    var i = (-1 !== location.search.indexOf("yundata_debug=true") ? 1 : "undefined" != typeof disk && disk.DEBUG ? !1 : 0, {}),
        d = {};
    i.data = {}, d.setData = function(a) {
        if (1 === arguments.length) {
            if ("object" == typeof a) {
                for (var t in a) a.hasOwnProperty(t) && (i.data[t] = a[t]);
                "function" == typeof Object.freeze && Object.freeze(i.data)
            }
            window.yunData = window.yunData || {}, window.yunData.ISYEARVIP = i.data.is_year_vip, window.yunData.ISVIP = i.data.is_vip, window.yunData.ISSVIP = i.data.is_svip, window.yunData.MYUK = i.data.uk, window.yunData.MYNAME = i.data.username, window.yunData.MYBDSTOKEN = i.data.bdstoken, window.yunData.MYBDUSS = i.data.XDUSS, window.yunData.LOGINSTATUS = i.data.loginstate, window.yunData.sampling = i.data.sampling.expvar ? i.data.sampling.expvar.toString() : i.data.sampling, window.yunData.ISFIRST = i.data.is_first, window.yunData.UINFO = i.data.uinfo, window.yunData.task_key = i.data.task_key, window.yunData.task_time = i.data.task_time, window.yunData.sign1 = i.data.sign1, window.yunData.sign2 = i.data.sign2, window.yunData.sign5 = i.data.sign3, window.yunData.sign3 = i.data.sign3 && i.data.sign3.replace("1", "l").replace("0", "o").replace("e", "a"), window.yunData.sign4 = window.yunData.sign3, window.yunData.timestamp = i.data.timestamp, window.yunData.faceStatus = i.data.face_status, window.yunData.SERVERTIME = i.data.servertime, window.yunData.SHOWVIPAD = i.data.show_vip_ad || -1, window.yunData.VIPENDTIME = i.data.vip_end_time || -1, window.yunData.MYAVATAR = i.data.photo || "", window.yunData.activity_status = i.data.activity_status || 0, window.yunData.CURRACTIVITYCODE = i.data.curr_activity_code || "", window.yunData.activity_end_time = i.data.activity_end_time || "", window.yunData.skinName = i.data.skinName || "white", window.yunData.token = i.data.token || ""
        } else 2 === arguments.length && window.yunData && (window.yunData[arguments[0]] = arguments[1])
    }, d.get = function() {
        return i.data
    }, n.exports = d
});;
define("disk-system:widget/system/util/pcsDownloadUtil.js", function(t, n, s) {
    var e = t("base:widget/libs/jquerypacket.js"),
        i = t("base:widget/tools/tools.js"),
        o = function() {
            throw new Error("can not be instantiated")
        };
    o.fixMultiDomain = function(t, n) {
        var s = "",
            e = 0,
            i = "http:" === document.location.protocol;
        return this.currentDomainIndex >= this.domains.length && (this.currentDomainIndex = 0), e = n ? n : this.currentDomainIndex++, "string" == typeof t && i && (s = t.replace(this.defaultDomain, this.domains[e])), s
    }, o._sList = null, o._sIndex = -1, o._sConnectedIndex = -1, o._sResult = 0, o._path = null, o._sRevision = 0, o.currentDomainIndex = 0, o.defaultDomain = "d.pcs.baidu.com", o.domains = ["d0.pcs.baidu.com", "d1.pcs.baidu.com", "d2.pcs.baidu.com", "d3.pcs.baidu.com", "d4.pcs.baidu.com", "d5.pcs.baidu.com", "d6.pcs.baidu.com", "d7.pcs.baidu.com", "d8.pcs.baidu.com", "d9.pcs.baidu.com"], o._getHostList = function(t) {
        e.ajax({
            url: "https://d.pcs.baidu.com/rest/2.0/pcs/manage?method=listhost&channel=chunlei&clienttype=0&t=" + (new Date).getTime(),
            method: "get",
            dataType: "jsonp",
            success: function(n) {
                n && n.list && (o._path = n.path, o._sList = n.list, o._sRevision = n.rev || 0, o._startTesting(t))
            },
            error: function() {
                "function" == typeof t && t.call(o, 0)
            }
        })
    }, o._startTesting = function(t) {
        o._sIndex++;
        var n = o._sList[o._sIndex];
        if (o._sIndex < o._sList.length) {
            var s = new Image;
            s.onload = function() {
                o._sConnectedIndex = o._sIndex, o._sResult += n.id, o._startTesting(t)
            }, s.onerror = function() {
                o._startTesting(t)
            }, s.src = "//" + n.host + (o._path || "/monitor.jpg?xcode=1a81b0bbd448fc368d78cc336e28561a") + (new Date).getTime()
        } else "function" == typeof t && t.call(o, 1, o._sConnectedIndex, o._sList, o._sResult, o._sRevision, o._path)
    }, o.initPcsDownloadCdnConnectivity = function(t) {
        this._getHostList(function(n, s, e, o, c, a) {
            1 == n && (i.setCookie("cflag", o + ":" + c, 10, "/", ".baidu.com"), a && "function" == typeof t && t.call(null, a))
        })
    }, s.exports = o
});;
define("disk-system:widget/system/uiRender/buttonBox/buttonBox.js", function(t, i, e) {
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
            }), this.$canvas = null, this.$container.append(this.$positionMark), this.$container.append(this.$box), this.listHeaderOperate = ".list-header-operate", this.buttonsData = t.buttons, this.showNum = 0, this.resize = t.resize || !1, this.outSize = t.outSize || 0, this.containerPadding = null, this.buttons = [], this.buttonsWidth = 0, this.moreButton = null, this.moreButtonItem = [], this.moreNum = 0, this.specifiedTypeButton = [], this.specifiedDirButton = [], this.limitNumberButton = [], this.numberSwitchButton = [], this.resetMore = !1, this.initData(), u.instances.push(this)
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
            u.appendTo(this.$box), t[i].button = u, n && console.log("按钮宽度：" + u.width), u.isShow && (this.buttonsWidth += u.width), "function" == typeof t[i].render ? t[i].render({
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
            s.trigger("plugin:" + t.pluginId, i), "string" == typeof t.log && h.log.send({
                type: t.log
            });
            var e = t.name ? t.name : t.icon ? t.icon.replace("icon-", "") : "";
            h.log.send({
                type: "buttonClick_" + e,
                name: "buttonClick",
                sendServerLog: !0,
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
                }, s.trigger("plugin:" + t.pluginId, i), "string" == typeof t.log && h.log.send({
                    type: t.log
                });
                var n = t.name ? t.name : t.icon ? t.icon.replace("icon-", "") : "";
                h.log.send({
                    type: "buttonClick_" + n,
                    name: "buttonClick",
                    sendServerLog: !0,
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
            0 !== i.$container.width() && 0 !== i.$box.width() && (i.resetMore = !1, i.filter())
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
        this.moreButton = h.ui.button(o).appendTo(this.$box), this.moreButton.dom.addClass("tools-more")
    }, u.prototype.triggerClick = function(t, i) {
        if ("number" == typeof t && t >= 0 && t < this.buttons.length) {
            var e = this.buttons[t];
            e.triggerClick(i), e.isInMore && this.moreButton.hide()
        }
    }, u.prototype._disableButton = function(t, i) {
        this.moreNum;
        t.isInMore ? (t.isShow === !0 && (this.buttonsWidth -= t.width, this.showNum--), t.hide(), i !== !1 && "disable" === t.config.disabled ? (!this.moreButtonItem[t.index].isShow, this.moreButtonItem[t.index].isShow = !0, this.moreButtonItem[t.index].isEnable = !i, this.moreButton.menuDisable(t.index, i)) : (this.moreButtonItem[t.index].isEnable = void 0, i === !1 ? (!this.moreButtonItem[t.index].isShow, this.moreButton.menuShow(t.index), this.moreButtonItem[t.index].isShow = !0, this.moreButton.menuDisable(t.index, i)) : (this.moreButtonItem[t.index].isShow, this.moreButtonItem[t.index].isShow = !1, this.moreButton.menuShow(t.index, !1)))) : (i === !1 ? (t.isShow === !1 && (this.buttonsWidth += t.width, this.showNum++), t.disable(!1).show()) : "disable" === t.config.disabled ? (t.isShow === !1 && (this.buttonsWidth += t.width, this.showNum++), t.disable().show(), t.isShow = !0) : (t.isShow && (this.buttonsWidth -= t.width, this.showNum--), t.hide()), this.moreButtonItem[t.index].isShow, this.moreButtonItem[t.index].isShow = !1, this.moreButton.menuShow(t.index, !1));
        var e = this.moreButton.isShow;
        this.moreNum > 0 ? (this.moreButton.dom.prev().removeClass("last-button"), this.moreButton.show(), e || (this.buttonsWidth += this.moreButton.width, this.showNum++)) : (this.moreButton.dom.prev().addClass("last-button"), this.moreButton.hide(), e && (this.buttonsWidth -= this.moreButton.width, this.showNum--))
    }, u.prototype.getContainerWidth = function() {
        if (null === this.containerPadding) {
            var t = 0,
                i = 0;
            this.$container.css("padding-left") && (t = parseInt(this.$container.css("padding-left"), 10)), this.$container.css("padding-right") && (i = parseInt(this.$container.css("padding-right"), 10)), this.containerPadding = t - i
        }
        var e = this.$positionMark.position(),
            n = this.paddingLeft === !1 ? e.left : this.paddingLeft;
        this.$box.css("padding-left", n);
        var s = this.$container.innerWidth();
        this.$container.is(":hidden") && (s = o(this.listHeaderOperate).innerWidth());
        var r = s - this.containerPadding - (n || e.left);
        return this.$box.width(r), this.autoWidth && this.$box.width("auto"), r -= this.outSize
    }, u.prototype.filter = function(t) {
        for (var i = this.showNum, e = this.getContainerWidth(), n = this.buttons.length - 1; n >= 0; n--) if (this.showNum >= this.limit || this.buttonsWidth > e) {
            if (this.showNum === this.limit && this.limit === i && this.buttonsWidth < e) continue;
            this.buttons[n].isShow && !this.buttons[n].forbidMore && (i > this.limit && this.showNum > this.limit || this.buttonsWidth > e) && this.moveToMore(this.buttons[n])
        }
        for (var o = 0; o < this.buttons.length; o++) if (this.showNum < this.limit && this.buttonsWidth <= e) {
            if (void 0 === this.buttons[o]) break;
            this.buttons[o].isInMore && (i > this.limit && this.showNum + 1 === this.limit || this.releaseFromMore(this.buttons[o]))
        }
        this.$box.removeClass("opacity-button-box"), t && t.length && this.$box.css("visibility", "visible")
    }, u.prototype.moveToMore = function(t) {
        !t.isInMore && t.isShow && (t.isInMore = !0, this.moreNum++, t.isEnable === !1 ? this._disableButton(t) : this._disableButton(t, !1))
    }, u.prototype.releaseFromMore = function(t) {
        t.isInMore && this.moreButtonItem[t.index].isShow && (t.isInMore = !1, this.moreNum--, this.moreButtonItem[t.index].isEnable === !1 ? this._disableButton(t) : this._disableButton(t, !1))
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
                var s = !1;
                if (t[n].path) var r = t[n].path.substring(t[n].path.lastIndexOf("/") + 1);
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
        this.alwaysShow !== !0 && (this.$box.addClass("opacity-button-box"), this.$box.css({
            visibility: "hidden",
            width: 0
        }));
        var i = this.numberSwitchButton,
            e = this.limitNumberButton,
            n = t.length;
        if (0 !== n) {
            for (var o = 0; o < i.length; o++) {
                if (n <= i[o].config.changePoint) {
                    var s = i[o];
                    this.moreButtonItem[s.index].icon = s.switchConfig[0].icon, this.moreButtonItem[s.index].title = s.switchConfig[0].title;
                    var r = this.moreButton._renderMenuOne(this.moreButtonItem[s.index]);
                    this.moreButton.dom.find("a.g-button-menu").eq(s.index).replaceWith(r), i[o].change(s.switchConfig[0])
                } else {
                    var s = i[o];
                    this.moreButtonItem[s.index].icon = s.switchConfig[1].icon, this.moreButtonItem[s.index].title = s.switchConfig[1].title;
                    var r = this.moreButton._renderMenuOne(this.moreButtonItem[s.index]);
                    this.moreButton.dom.find("a.g-button-menu").eq(s.index).replaceWith(r), i[o].change(s.switchConfig[1])
                }
                this._disableButton(i[o], !1)
            }
            for (var o = 0; o < e.length; o++) {
                var h = e[o].config.filesLimit;
                if (0 !== h || 0 !== n) if ("number" == typeof h && h >= n) this._disableButton(e[o], !1);
                else if ("string" == typeof h && 0 === h.indexOf(">")) {
                    var u = parseInt(h.substring(1));
                    n > u ? this._disableButton(e[o], !1) : this._disableButton(e[o])
                } else this._disableButton(e[o]);
                else this._disableButton(e[o], !1)
            }
            this._handleSpecifiedTypeButton(t), this._handSpecifiedDirButton(t), this.filter(t), this.$box.show()
        } else for (var o = 0; o < e.length; o++) {
            var h = e[o].config.filesLimit;
            0 === h && 0 === n && this._disableButton(e[o], !1)
        }
    }, u.prototype.lock = function(t) {
        return t === !1 && this.$canvas ? void this.$canvas.hide() : (this.$canvas || (this.$canvas = o('<div style="width:100%;height:100%;z-index:30;position:absolute;top:0;left:0;"></div>'), this.$box.prepend(this.$canvas)), void this.$canvas.show())
    }, u.prototype.hide = function(t) {
        return t === !1 ? void this.$box.show() : void this.$box.hide()
    }, u.filesSelect = function(t) {
        for (var i = 0, e = u.instances.length; e > i; i++) u.instances[i].filesSelect(t)
    }, u.prototype.onVisibilityChange = function(t) {
        if (t) for (var i = this.buttonsData, e = 0, n = i.length; n > e; e++) i[e].button && i[e].button.dom && ("function" == typeof i[e].render ? i[e].render({
            $dom: i[e].button.dom,
            button: i[e].button
        }) : "string" == typeof i[e].render && s.trigger("plugin:" + i[e].pluginId, {
            run: i[e].render,
            $dom: i[e].button.dom,
            button: i[e].button
        }))
    }, s.listen("system-change-toolbar", function(t) {
        for (var i = t.module || "list", e = u.declareMod, n = null, o = 0; o < e.length; o++) n = e[o], new RegExp(i + "$", "gi").test(n.config.module) || new RegExp(i + ",", "gi").test(n.config.module) ? n.dom.show() : n.dom.hide()
    }), e.exports = u
});;
define("disk-system:widget/pageModule/aside/aside.js", function(e) {
    var t = e("base:widget/libs/jquerypacket.js"),
        i = e("base:widget/hash/hash.js"),
        s = e("system-core:data/faceData.js").getData(),
        a = e("system-core:system/baseService/message/message.js"),
        o = (e("base:widget/tools/tools.js"), e("system-core:context/context.js")),
        n = e("disk-system:widget/system/uiRender/buttonBox/buttonBox.js"),
        d = e("base:widget/historyManager/historyManager.js"),
        r = e("base:widget/storage/storage.js"),
        c = {
            mod: "div.module-aside",
            listItem: 'li[node-type~="list-item"]',
            sideMore: 'a[node-type~="side-more"]',
            sideOptlist: 'div[node-type~="side-optlist"]',
            picHotIco: 'em[node-type~="pic-hot"]',
            picItem: 'a[node-type~="pic-item"]',
            itemTitle: 'span[node-type~="item-title"]',
            imgIcon: 'span[node-type~="img-ico"]',
            itemHref: 'a[node-type~="item-href"]'
        },
        l = t(c.mod),
        m = function() {
            var e = '<li node-type="list-item" class="list-item"><a node-type="item-href" class="b-no-ln" hideFocus="true" href="javascript:void(O);"><span class="text"><span node-type="img-ico" class="img-ico"></span><span node-type="item-title"></span></span></a></li>';
            return e
        },
        g = function() {
            var e = function(e, i) {
                var s, a;
                if (i.isVisible === !1 ? e.hide() : e.show(), i.title && e.find(c.itemTitle).text(i.title), i.iconClass && e.find(c.imgIcon).addClass(i.iconClass), i.href && e.find(c.itemHref).attr("href", i.href).removeAttr("cat"), i.guide) {
                    if (s = i.guide, "object" != typeof s) throw new Error("[aside] The new nav item must has property: guide. And the guide must be an object");
                    s.dom && (a = t(s.dom), s.positionX && a.css("left", s.positionX), s.positionY && a.css("top", s.positionY), e.find(c.itemHref).append(a))
                }
                i.click && "function" == typeof i.click && e.bind("click", function(e) {
                    i.click.call(a, e)
                })
            };
            a.listen("nav-add-item", function(i) {
                var s = t(c.listItem),
                    a = t(m());
                e(a, i), i.index && i.index < s.length ? s.eq(i.index).after(a) : s.last().after(a)
            }), a.listen("nav-change-item", function(i) {
                var s, a = t(c.listItem);
                if (!(i.index && i.index < a.length)) throw new Error("[aside] The index of item which you will change must in the range of 0 ~ " + a.length);
                s = a.eq(i.index), e(s, i)
            })
        },
        u = function() {
            l.delegate(c.listItem, "mouseover", function(e) {
                var i = t(e.target).closest(c.listItem);
                i.addClass("hover")
            }), l.delegate(c.listItem, "mouseout", function(e) {
                var i = t(e.target).closest(c.listItem);
                i.removeClass("hover")
            }), l.delegate(c.listItem, "click", function(e) {
                var i = r.getItem("chooseviewtype") || "list",
                    s = t(e.target).closest(c.listItem);
                if (s.hasClass("active") && "all" !== s.data("key")) return !1;
                l.find(c.listItem).removeClass("active"), s.addClass("active"), o.instanceForSystem.log.send({
                    type: "leftSideNavigator_" + s.data("key"),
                    value: s.data("key")
                });
                var a = t(e.target).closest("a").attr("cat"),
                    n = t(e.target).closest("a").attr("path");
                return a ? (d.getDefault().addHistory("category/type=" + a + "&vmode=" + i), !1) : n ? (d.getDefault().addHistory("list/path=" + encodeURIComponent(n) + "&vmode=" + i), !1) : void 0
            });
            var e, i = function() {
                    window.clearTimeout(e), l.find(c.sideOptlist).show()
                },
                s = function() {
                    window.clearTimeout(e), e = window.setTimeout(function() {
                        l.find(c.sideOptlist).hide()
                    }, 50)
                };
            l.delegate(c.sideMore, "mouseover", i), l.delegate(c.sideMore, "mouseout", s), l.delegate(c.sideOptlist, "mouseover", i), l.delegate(c.sideOptlist, "mouseout", s)
        },
        f = function() {
            var e, t = o.instanceForSystem.pageInfo.currentPage,
                s = l.find(c.listItem),
                a = i.get("category/type"),
                n = i.get("path"),
                d = i.get("key"),
                m = i.get("vmode");
            if ("disk-home" === t) {
                var g = r.getItem("chooseviewtype") || "list";
                if (m || setTimeout(function() {
                        i.set("vmode", g)
                    }, 0), n && "" !== n || d && "" !== d) e = "all";
                else switch (a) {
                    case "4":
                        e = "doc";
                        break;
                    case "1":
                        e = "video";
                        break;
                    case "7":
                        e = "mbt";
                        break;
                    case "2":
                        e = "music";
                        break;
                    case "3":
                        e = "pic";
                        break;
                    case "6":
                        e = "other";
                        break;
                    default:
                        e = "all"
                }
            }
            switch (t) {
                case "recyclebin":
                    e = "recyclebin";
                    break;
                case "share-manage":
                    e = "share";
                    break;
                case "disk-pic":
                    e = "pic"
            }
            s.removeClass("active");
            for (var u = 0; u < s.length; u++) s.eq(u).data("key") === e && s.eq(u).addClass("active")
        },
        p = function() {
            u(), f(), g(), i.listen("category/type, path, key", function() {
                f()
            });
            new n({
                name: "aside-middle",
                className: "aside-middle",
                buttons: s.getButton("aside-middle"),
                container: l.find(".middle-button-container")
            }), new n({
                name: "aside-bottom",
                className: "aside-bottom",
                buttons: s.getButton("aside-bottom"),
                container: l.find(".bottom-button-container")
            });
            l.find(".middle-button-container").prev(".item-separator").show(), l.find(".bottom-button-container").prev(".item-separator").show(), a.callPlugin("网盘图片时间轴@com.baidu.pan"), a.trigger("aside-render-finish")
        };
    o.extend({
        nav: {
            addItem: function(e) {
                a.trigger("nav-add-item", e)
            },
            changeItem: function(e) {
                a.trigger("nav-change-item", e)
            }
        }
    }), p()
});;
define("disk-system:widget/system/fileService/fileOperate/fileOperate.js", function(a, e, l) {
    var i = (a("base:widget/libs/jquerypacket.js"), a("system-core:data/faceData.js")),
        m = a("system-core:data/regedit.js"),
        d = a("base:widget/tools/tools.js"),
        n = {};
    n.getInfo = function(a, e, l, n) {
        var r = i.getData().fileIcon,
            t = {};
        if (a = a || "", t.fileName = a.substring(a.lastIndexOf("/") + 1), t.name = d.toEntity(t.fileName), n) return t.smallIcon = "dir-multi-small", t.middleIcon = "dir-multi-middle", t.largeIcon = "dir-multi-large", t;
        if (e) t.smallIcon = "dir-small", t.largeIcon = "dir-large", t.middleIcon = "dir-middle", a.match(/^\/apps$/) && (t.smallIcon = "dir-apps-small", t.largeIcon = "dir-apps-large", t.middleIcon = "dir-apps-middle", t.name = "我的应用数据"), a.match(/^\/百度云收藏$/) && (t.smallIcon = "dir-cang-small", t.largeIcon = "dir-cang-large", t.middleIcon = "dir-cang-middle", t.name = "我的收藏"), a.match(/^\/来自PC的备份文件$/) && (t.smallIcon = "dir-backup-small", t.largeIcon = "dir-backup-large", t.middleIcon = "dir-backup-middle"), (a.match(/^\/apps\//) || a.match(/^\/百度云收藏\//) || a.match(/^\/来自PC的备份文件\//)) && (t.smallIcon = "dir-app-small", t.largeIcon = "dir-app-large", t.middleIcon = "dir-app-middle");
        else {
            t.largeIcon = "default-large", t.smallIcon = "default-small", t.middleIcon = "default-middle";
            var c = -1 !== a.lastIndexOf(".") ? d.getFileCategory(a) : "*";
            r[c] && (3 === r[c].length ? (t.smallIcon = r[c][0], t.largeIcon = r[c][1], t.middleIcon = r[c][2]) : 2 === r[c].length ? (t.smallIcon = r[c][0], t.largeIcon = r[c][1]) : (t.smallIcon = r[c], t.largeIcon = r[c]));
            var g = m.getDefaultPluginIdByExtension(c);
            !l && g && (g = m.getPluginById(g).name + "@" + m.getOtherInfoById(g).group), t.plugin = g
        }
        return t
    }, n.isOpenedFile = function(a, e) {
        var l = [];
        return l = l.concat(["dir", "multi", "shouchang", "yingyong", "yingyong_child", "beifen"]), l = l.concat(["doc", "docx", "xls", "xlsx", "ppt", "pptx", "pdf", "txt"]), e || (l = l.concat(["torrent"])), l = l.concat(["jpg", "jpeg", "gif", "bmp", "png", "jpe", "cur", "svg", "svgz", "tif", "tiff", "ico", "wma", "wav", "mp3", "aac", "ra", "ram", "mp2", "ogg", "aif", "mpega", "amr", "mid", "midi", "m4a", "wmv", "rmvb", "mpeg4", "mpeg2", "flv", "avi", "3gp", "mpga", "qt", "rm", "wmz", "wmd", "wvx", "wmx", "wm", "swf", "mpg", "mp4", "mkv", "mpeg", "mov", "asf", "zip", "rar"]), l.indexOf(a) >= 0 ? !0 : !1
    }, l.exports = n
});;
define("disk-system:widget/pageModule/list/list-view/list-view-builder.js", function(e, t, i) {
    var a = e("base:widget/libs/jquerypacket.js"),
        s = e("system-core:data/faceData.js").getData(),
        n = e("disk-system:widget/system/uiRender/buttonBox/buttonBox.js"),
        l = e("disk-system:widget/system/fileService/fileOperate/fileOperate.js"),
        r = e("base:widget/historyManager/historyManager.js"),
        c = e("base:widget/tools/service/tools.date.js"),
        o = e("base:widget/tools/service/tools.format.js"),
        d = e("base:widget/tools/service/tools.path.js"),
        h = e("system-core:context/context.js").instanceForSystem,
        g = e("system-core:system/baseService/message/message.js"),
        m = new n({
            name: "list",
            limit: 2,
            buttons: s.getButton("list"),
            container: a("<div>")
        }),
        p = {
            LIST: "list",
            CATEGORY: "category",
            SEARCHPATH: "searchPath",
            SEARCHGLOBAL: "searchGlobal",
            SEARCH: "search"
        },
        v = function() {
            var e = this.parent.listHeader.config.columns || [{
                        width: 60
                    }, {
                        width: 16
                    }, {
                        width: 23
                    }],
                t = document.createElement("dd");
            return t.className = "g-clearfix list-view-item", t.innerHTML = '<span node-type="checkbox" class="checkbox"><span class="icon checksmall">&#xe937;</span></span><div class="fileicon"></div><div class="file-name" style="width:' + e[0].width + '%"><div class="text"><a href="javascript:void(0);" class="filename"></a></div><div class="operate">' + m.$container.html() + '</div></div><div class="file-size" style="width:' + e[1].width + '%">-</div><div class="ctime" style="width:' + e[2].width + '%"></div><div class="path-info" style="width:' + (e[3] ? e[3].width - 1 : 0) + '%"><span class="search-feild" node-type="search-feild"></span></div>', t
        },
        u = null,
        f = null,
        b = function() {
            u = null, f = null
        },
        C = function(e, t) {
            if (e && 0 !== e.length) for (var i = 0; i < e.length; i++) {
                var s = a(e[i]),
                    n = s.data("excludedir");
                if (n) {
                    var l = t.path.substring(1); - 1 !== n.indexOf(l) ? s.addClass("g-disabled") : s.removeClass("g-disabled")
                }
                var r = s.data("includetype");
                if (r) {
                    var c = d.getFileCategory(t.path); - 1 === r.indexOf(c) ? s.hide() : s.show()
                }
            }
        },
        w = function(e) {
            var t = /^[.,?\]})'";:`~!%&*|>，﹐。？、】）·！……’”；：]*/;
            if (e.highlighting && e.highlighting.abstract) {
                e.highlighting.abstractFixed = e.highlighting.abstract, e.highlighting.abstract = e.highlighting.abstract.replace(/\n+\s*\n/g, "\n"), e.highlighting.abstract = e.highlighting.abstract.replace(t, "");
                var i = e.highlighting.abstract;
                if (pos = i.search(/<em>/), pos > 36) {
                    var a = pos - 12;
                    i = i.slice(a, i.length), e.highlighting.abstractFixed = i
                }
                e.highlighting.abstractFixed = e.highlighting.abstractFixed.replace(t, "")
            }
            return e
        },
        y = function(e, t, i) {
            var s = t;
            null == s && (s = this.buildView(e, t, i));
            var n = this.getElementDataByPosition(i),
                d = a(s),
                v = this.parent.cache.cacheName === p.SEARCHGLOBAL,
                b = this,
                y = d.find(".fileicon"),
                k = l.getInfo(n.path, n.isdir, !0);
            if (s.setAttribute("_position", i), s.setAttribute("_cmd_installed", 1), this.isAllItemChecked() || this.isItemChecked(i) ? d.addClass("item-active") : d.removeClass("item-active hover-item"), v) {
                if (n = w(n), d.addClass("list-view-vip-search"), 1 !== +n.category && 3 !== +n.category || !k.plugin) y.removeAttr("style");
                else {
                    var x = n.thumbs.url1.replace(/size=.*&/, "size=c50_u50&").replace(/&quality=100/, "&quality=80");
                    y.css("background", "url(" + x + ") 50% 50% no-repeat")
                }
                y.attr("class", "fileicon " + k.middleIcon)
            } else y.attr("class", "fileicon " + k.smallIcon);
            if (n.isdir || k.plugin ? (d.addClass("open-enable"), d.data("plugin", k.plugin)) : (d.removeClass("open-enable"), d.data("plugin", "")), v && n.highlighting.filename ? d.find(".filename").html(n.highlighting.filename).attr("title", k.fileName).data("filename", n.server_filename) : d.find(".filename").html(k.name).attr("title", k.fileName).data("filename", n.server_filename), v) {
                var A = [],
                    L = d.find(".name-desc");
                A.push(n.highlighting && n.highlighting.abstract ? '<div node-type="name-desc" class="name name-desc" title=" ' + n.highlighting.abstract.replace(/\<em\>/g, "").replace(/\<\/em\>/g, "") + '">' : '<div node-type="name-desc" class="name name-desc" title="">'), A.push('<span class="name-text-wrapper">'), A.push(n.highlighting.abstractFixed ? '<span node-type="name-text" class="name-text">' + n.highlighting.abstractFixed + "</span>" : '<span node-type="name-text" class="name-text">' + (n.highlighting.abstract || "") + "</span>"), A.push("</span></div>"), A = A.join(""), 0 === L.length ? d.find(".file-name").append(A) : L.html(A)
            }
            if (d.find(".file-size").text(n.isdir ? "-" : o.toFriendlyFileSize(n.size)), n.server_mtime || (n.server_mtime = "-"), d.find(".ctime").text("-" === n.server_mtime ? n.server_mtime : c.parseDate(n.server_mtime)), this.parent.cache.cacheName === p.SEARCH || this.parent.cache.cacheName === p.SEARCHGLOBAL || this.parent.cache.cacheName === p.SEARCHPATH) {
                var H = n.path.split("/"),
                    I = "",
                    S = "";
                2 === H.length ? (I = "/", S = "全部文件") : (I = H.slice(0, H.length - 1).join("/"), S = H[H.length - 2]), d.find(".search-feild").data("path", I).attr("title", S).text(S)
            }
            if (!s.getAttribute("_installed")) {
                var _, E;
                d.mouseenter(function() {
                    if (_ = (new Date).getTime(), b.parent.isLocked()) return !1;
                    var e = a(this);
                    return e.addClass("hover-item"), !1
                }).mouseleave(function() {
                    if (b.parent.isLocked()) return !1;
                    var e = a(this);
                    return e.removeClass("hover-item"), e.find(".g-dropdown-button").removeClass("button-open"), E = (new Date).getTime(), h.log.send({
                        name: "listListHover",
                        value: E - _
                    }), !1
                }), d.click(function(e) {
                    var t = d.parent().children();
                    t.removeClass("item-active"), b.setItemsChecked(!1);
                    var i = (new Date).getTime();
                    if (b.parent.isLocked()) return !1;
                    var s = parseInt(this.getAttribute("_position"), 10),
                        n = b.isItemChecked(s),
                        l = b.getCheckedIndexs(),
                        r = e.ctrlKey,
                        c = a(this);
                    if (e.shiftKey) {
                        var o = Math.min(s, u),
                            g = Math.max(s, u),
                            m = c,
                            p = !1;
                        if ("number" == typeof f) {
                            var v = Math.min(s, f),
                                C = Math.max(s, f);
                            for (p = v === s; C >= v;) b.setItemChecked(v, !1), m.length > 0 && m.removeClass("item-active"), m = p ? m.next(".list-view-item") : m.prev(".list-view-item"), v++
                        }
                        for (m = c, p = o === s; g >= o;) b.setItemChecked(o, !0), m.length > 0 && m.addClass("item-active"), m = p ? m.next(".list-view-item") : m.prev(".list-view-item"), o++;
                        f = s
                    } else f = null, r || (l.length > 0 && (n === !1 || n && l.length > 1) && (b.setItemsChecked(!1), c.siblings(".list-view-item").removeClass("item-active")), n && l.length > 1 && (n = !1)), b.setItemChecked(s, !n), n ? c.removeClass("item-active") : c.addClass("item-active"), u = s;
                    var w = (new Date).getTime();
                    h.log.send({
                        name: "listListSingleSel",
                        value: w - i
                    }), window.getSelection && window.getSelection().removeAllRanges()
                }), d.delegate(".filename", "click", function() {
                    if (b.parent.isLocked()) return !1;
                    var e = parseInt(a(this).closest(".list-view-item")[0].getAttribute("_position"), 10),
                        t = b.getElementDataByPosition(e);
                    if (t.isdir) if (b.parent.cache.cacheName === p.SEARCH || b.parent.cache.cacheName === p.SEARCHGLOBAL || b.parent.cache.cacheName === p.SEARCHPATH) {
                        var i = r.getCurrentParams().vmode || "",
                            s = i ? "&vmode=" + i : "";
                        r.getDefault().addHistory("list/path=" + encodeURIComponent(t.path) + s)
                    } else b.parent.addHistory(t.server_filename, t.server_filename);
                    else {
                        var n = d.data("plugin");
                        if (!n || !n.length) return !0;
                        g.trigger("plugin:" + n, {
                            filesList: [t]
                        })
                    }
                    return !1
                }).delegate(".g-button", "click", function() {
                    if (b.parent.isLocked()) return !1;
                    var e = parseInt(a(this).closest(".list-view-item")[0].getAttribute("_position"), 10),
                        t = b.getElementDataByPosition(e),
                        i = a(this).next(".menu");
                    if (i.length) {
                        var s = i.find(".g-button-menu");
                        return C(s, t), a(this).closest(".g-dropdown-button").toggleClass("button-open"), void(i.offset().top > a(window).height() - i.outerHeight() ? i.addClass("more-list-up") : i.removeClass("more-list-up"))
                    }
                    var n = a(this).index();
                    m.triggerClick(n, {
                        filesList: [t],
                        position: [e]
                    })
                }).delegate(".g-button-menu", "click", function() {
                    if (b.parent.isLocked()) return !1;
                    var e = parseInt(a(this).closest(".list-view-item")[0].getAttribute("_position"), 10),
                        t = b.getElementDataByPosition(e),
                        i = a(this).index();
                    m.triggerClick(i, {
                        filesList: [t],
                        position: [e]
                    }), a(this).closest(".g-dropdown-button").removeClass("button-open")
                }).delegate(".operate", "click", function(e) {
                    return b.parent.isLocked() ? !1 : void e.stopPropagation()
                }).delegate(".checkbox", "click", function(e) {
                    var t = 0,
                        i = (new Date).getTime();
                    if (b.parent.isLocked()) return !1;
                    e.stopPropagation();
                    var s = a(this).closest(".list-view-item"),
                        t = parseInt(s.attr("_position"), 10),
                        n = b.isItemChecked(t);
                    b.setItemChecked(t, !n), n ? s.removeClass("item-active") : (s.addClass("item-active"), h.log.send({
                        name: "listSel",
                        value: 1
                    })), t = parseInt(a(this).parent()[0].getAttribute("_position"), 10), u = t;
                    var l = (new Date).getTime();
                    h.log.send({
                        name: "listListMultiSel",
                        value: l - i
                    })
                }).delegate(".checkbox", "dblclick", function(e) {
                    e.stopPropagation()
                }).delegate(".search-feild", "click", function(e) {
                    e.stopPropagation(), r.getDefault().addHistory("list/path=" + encodeURIComponent(a(e.target).data("path")) + "&vmode=" + (r.getCurrentParams().vmode || ""))
                }), d.bind("dblclick", function() {
                    if (b.parent.isLocked()) return !1;
                    var e = parseInt(a(this)[0].getAttribute("_position"), 10),
                        t = b.getElementDataByPosition(e);
                    if (t.isdir) b.parent.cache.cacheName === p.SEARCH || b.parent.cache.cacheName === p.SEARCHGLOBAL || b.parent.cache.cacheName === p.SEARCHPATH ? r.assignUrlHash("list/path=" + encodeURIComponent(t.path) + "&vmode=" + r.getCurrentParams().vmode) : b.parent.addHistory(t.server_filename, t.server_filename);
                    else {
                        var i = d.data("plugin");
                        if (!i || !i.length) return !0;
                        g.trigger("plugin:" + i, {
                            filesList: [t]
                        })
                    }
                    return !1
                }), s.setAttribute("_installed", 1)
            }
            return s
        };
    i.exports = {
        getView: y,
        buildView: v,
        clear: b
    }
});;
define("disk-system:widget/system/util/imageSystem/imageSystem.js", function(e, n, t) {
    var i = e("base:widget/tools/tools.js"),
        r = e("disk-system:widget/data/yunData.js").get(),
        o = window.URL && window.URL.revokeObjectURL.bind(window.URL) || window.webkitURL && window.webkitURL.revokeObjectURL.bind(window.webkitURL) || window.revokeObjectURL,
        a = window.URL && window.URL.createObjectURL.bind(window.URL) || window.webkitURL && window.webkitURL.createObjectURL.bind(window.webkitURL) || window.createObjectURL,
        u = {
            name: "ImageSystem",
            version: 1,
            db: null,
            isAvailable: !1,
            isOpen: !1
        },
        s = {
            imageList: "imageList",
            owner: "owner"
        },
        c = {
            imageWithSize: ["imageWithSize", ["fs_id", "w", "h"],
                {
                    unique: !0
                }]
        },
        d = function(e, n, t) {
            return new Promise(function(i, r) {
                n ? e[n] = function(e) {
                    i(e)
                } : e.onsuccess = function(e) {
                    i(e)
                }, t ? e[t] = function(e) {
                    r(e)
                } : e.onerror = function(e) {
                    r(e)
                }
            })
        },
        w = function(e, n) {
            var t = indexedDB.open(e, n);
            return t.onupgradeneeded = function(e) {
                var n, t = e.target.result,
                    i = e.target.transaction;
                n = t.objectStoreNames.contains(s.imageList) ? i.objectStore(s.imageList) : t.createObjectStore(s.imageList, {
                    autoIncrement: !0
                });
                for (var r in c) c.hasOwnProperty(r) && !n.indexNames.contains(r) && n.createIndex.apply(n, c[r]);
                t.objectStoreNames.contains(s.owner) || t.createObjectStore(s.owner, {
                    keyPath: "uk"
                })
            }, d(t)
        },
        b = function() {
            var e = !! window.ProgressEvent,
                n = !! window.FormData,
                t = window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest;
            return e && n && t
        },
        f = function() {
            return !!a
        },
        g = function(e, n) {
            for (var t = u.db.transaction(e, "readwrite"), i = t.objectStore(e), r = 0; r < n.length; r++) i.put(n[r]);
            return d(t, "oncomplete")
        },
        m = function(e) {
            var n = u.db.transaction(e, "readonly"),
                t = n.objectStore(e),
                i = t.openCursor();
            return d(i)
        },
        l = function(e) {
            var n = u.db.transaction(e, "readwrite"),
                t = n.objectStore(e),
                i = t.clear();
            return d(i)
        },
        v = function(e, n) {
            return l(e).then(function() {
                return g(e, n)
            })
        },
        L = function() {
            return m(s.owner).then(function(e) {
                var n = e.target.result;
                return n && n.value.uk === r.uk ? void 0 : l(s.imageList)
            }).then(function() {
                return v(s.owner, [{
                    uk: r.uk
                }])
            })
        },
        h = function() {
            return "object" != typeof indexedDB ? !1 : "function" != typeof Promise ? !1 : "yun.baidu.com" === location.hostname ? !1 : b() && f() ? navigator.userAgent.indexOf("Edge") > -1 ? !1 : navigator.userAgent.indexOf("Safari") > -1 && -1 === navigator.userAgent.indexOf("Chrome") ? !1 : !0 : !1
        },
        R = function() {
            h() && w(u.name, u.version).then(function(e) {
                u.db = e.target.result, u.isOpen = !0
            }, function() {
                u.isOpen = !1, u.isAvailable = !1
            }).then(function() {
                return L()
            }).then(function() {
                u.isAvailable = !0
            }, function() {})
        },
        p = function(e, n) {
            var t = u.db.transaction(s.imageList, "readonly"),
                i = t.objectStore(s.imageList),
                r = i.index(e),
                o = r.get(n);
            return d(o)
        },
        j = function(e) {
            var n = i.getParam("size", e),
                t = /c(\d+)/gi,
                r = /u(\d+)/gi,
                o = t.exec(n);
            t = o ? Number(o[1]) || 0 : Number(i.getParam("height", e)) || 0;
            var a = r.exec(n);
            return r = a ? Number(a[1]) || 0 : Number(i.getParam("height", e)) || 0, {
                w: t,
                h: r
            }
        },
        U = function(e) {
            return new Promise(function(n, t) {
                var i = new XMLHttpRequest;
                i.open("GET", e), i.withCredentials = !0, i.responseType = "blob", i.onload = function(e) {
                    200 === e.target.status ? n(e.target.response) : t(e)
                }, i.onerror = function(e) {
                    t(e)
                }, i.send()
            })
        },
        k = function(e, n) {
            var t = j(n);
            return p(c.imageWithSize[0], IDBKeyRange.only([e, t.w, t.h])).then(function(i) {
                var r = i.target.result;
                return r ? Promise.resolve(a(r.blob)) : U(n).then(function(n) {
                    return g(s.imageList, [{
                        fs_id: e,
                        w: t.w,
                        h: t.h,
                        blob: n
                    }]).then(function() {}, function() {}), Promise.resolve(a(n))
                })
            })
        },
        y = /^blob:/,
        O = {
            isAvailable: function() {
                return u.isAvailable && u.isOpen
            },
            getImageURL: function(e, n) {
                return O.isAvailable() ? k(e, n) : void Promise.reject({})
            },
            revokeBlobURL: function(e) {
                y.test(e) && o(e)
            }
        };
    R(), t.exports = O
});;
define("disk-system:widget/system/util/ThumbLoadStatistics.js", function(t, e, n) {
    function o(t, e) {
        this.startTime = (new Date).getTime(), this.count = t, this.loadedCount = 0, this.token = e
    }
    var i = t("base:widget/libs/underscore.js"),
        s = t("system-core:context/context.js").instanceForSystem,
        u = 0,
        a = Object.create ? Object.create(null) : {};
    setTimeout(function() {
        var t = i.filter(a, function(t) {
            return i.now() - t.startTime > 1e5
        });
        i.each(t, function(t) {
            delete a[t]
        })
    }, 3e5), o.prototype.plus = function() {
        if (this.loadedCount++, this.loadedCount >= this.count) {
            var t = this;
            setTimeout(function(e, n) {
                s.log.send({
                    type: "imgLoading_viewzone_" + e + "_" + n
                }), delete a[t.token]
            }, 0, 50 * Math.ceil((i.now() - t.startTime) / 50), t.loadedCount)
        }
    }, n.exports.setViewZoneThumbCount = function(t) {
        0 === u && (u = t)
    }, n.exports.plusLoadCount = function(t) {
        setTimeout(function() {
            var e = a[t];
            e && e.plus()
        }, 0)
    }, n.exports.makeThumbLoad = function(t) {
        if (u > t) return "";
        var e = i.uniqueId("thumbLoadId");
        return a[e] = new o(t, e), e
    }
});;
define("disk-system:widget/system/util/lazyLoadImage.js", function(e, t, o) {
    function n(e) {
        var t = e ? b : _;
        return l.find(f[t], function(e) {
            return e.leaveCount > 0 ? (e.leaveCount--, !0) : void 0
        })
    }
    function i(e) {
        if (!e) return !1;
        var t = !! e.src,
            o = e.src || e.getAttribute("_src"),
            i = o.indexOf(h) > -1,
            a = o.indexOf(g) > -1,
            s = "",
            m = "",
            r = null,
            c = _;
        return i ? (s = h, r = d ? n() : {
            name: h
        }) : a && (c = b, s = g, r = n(!0)), l.isUndefined(r) ? void 0 : (null !== r && (m = r.name), s !== m && (o = o.replace(s, m)), !t || "undefined" != typeof e.complete && e.complete !== !1 ? (e._domainName = m, e._src = o, e._type = c, e) : null)
    }
    function a() {
        r.call(this), this.images = [], this.fids = []
    }
    for (var s = e("system-core:context/context.js").instanceForSystem, m = e("disk-system:widget/system/util/imageSystem/imageSystem.js"), l = e("base:widget/libs/underscore.js"), r = e("base:widget/tools/service/tools.event.js").EventEmitter, c = e("base:widget/tools/service/tools.util.js"), u = e("disk-system:widget/system/util/ThumbLoadStatistics.js"), d = "http:" === document.location.protocol, h = "d.pcs.baidu.com", g = "thumbnail0.baidupcs", f = {
        normalDomains: Object.create ? Object.create(null) : {},
        thumbsDomains: Object.create ? Object.create(null) : {}
    }, p = 6, _ = "normalDomains", b = "thumbsDomains", v = 0; 10 > v; v++) f.normalDomains["d" + v + ".pcs.baidu.com"] = {
        leaveCount: p,
        name: "d" + v + ".pcs.baidu.com"
    }, f.thumbsDomains["thumbnail" + v + ".baidupcs"] = {
        leaveCount: p,
        name: "thumbnail" + v + ".baidupcs"
    };
    c.inherits(a, r), a.prototype.changeImages = function(e, t) {
        u.setViewZoneThumbCount(e.length);
        var o = u.makeThumbLoad(e.length);
        o && l.each(e, function(e) {
            e._token = o
        }), [].push.apply(this.images, e || []), [].push.apply(this.fids, t || []), this._loadImage()
    }, a.prototype._loadImage = function() {
        if (0 !== this.images.length) {
            var e = this.images.shift(),
                t = this.fids.shift(),
                o = i(e);
            if (!o) return void(l.isUndefined(o) && e && t && (this.images.unshift(e), this.fids.unshift(t)));
            this._installImage(o, t), this._loadImage()
        }
    }, a.prototype._installImage = function(e, t) {
        var o = l.now(),
            n = this,
            i = function(e) {
                e.hasError || (e.src = e._src), e.complete ? n._loadImageSucc(e) : (e.onload = function() {
                    n._loadImageSucc(this, l.now() - o)
                }, e.onerror = function() {
                    e.hasError = !0, n._loadImageFail(this)
                }), s.log.send({
                    name: "thumbnailsFromServer",
                    sendServerLog: !1
                })
            };
        return t && m.isAvailable() ? void m.getImageURL(t, e._src).then(function(t) {
            e.src = t, e.onload = function() {
                n._loadImageSucc(this, l.now() - o)
            }, e.onerror = function() {
                e.hasError = !0, n._loadImageFail(this)
            }, s.log.send({
                name: "thumbnailsFromCache",
                sendServerLog: !1
            })
        }, function() {
            i(e)
        }) : void i(e)
    }, a.prototype._loadImageSucc = function(e, t) {
        this.emit("done", e, t), this._commonLoadImageCall(e, t)
    }, a.prototype._loadImageFail = function(e) {
        this.emit("fail", e), this._commonLoadImageCall(e)
    }, a.prototype._commonLoadImageCall = function(e) {
        e.onload = e.onerror = null, e._type && e._domainName && f[e._type][e._domainName].leaveCount++, e._token && u.plusLoadCount(e._token), this._loadImage()
    }, o.exports = a
});;
define("disk-system:widget/pageModule/list/grid-view/grid-view-builder.js", function(e, t, i) {
    function s(e) {
        b.gridViewContainer || (b.gridViewContainer = e.$gridViewContainer.find(".module-grid-view")), b.itemHeight || (b.itemHeight = e.getCurrentView().itemHeight);
        var t = 0;
        if (b.itemHeight > 0) {
            var i = b.gridViewContainer.scrollTop();
            t = Math.max(parseInt(i / b.itemHeight, 10) - 2, 0)
        }
        b.load(t)
    }
    var a = e("base:widget/libs/jquerypacket.js"),
        n = e("disk-system:widget/system/fileService/fileOperate/fileOperate.js"),
        r = e("base:widget/historyManager/historyManager.js"),
        l = e("disk-system:widget/system/util/lazyLoadImage.js"),
        o = e("system-core:system/baseService/message/message.js"),
        c = e("system-core:context/context.js").instanceForSystem,
        d = e("base:widget/libs/underscore.js"),
        m = {
            LIST: "list",
            CATEGORY: "category",
            SEARCHPATH: "searchPath",
            SEARCHGLOBAL: "searchGlobal",
            SEARCH: "search"
        },
        u = function() {
            var e = document.createElement("dd");
            e.className = "g-clearfix";
            var t = [];
            t.push('<div class="grid-view-item">'), t.push('<div class="fileicon" title="">'), t.push('<img class="thumb"/>'), t.push('<span class="playIcon"></span>'), t.push("</div>"), t.push('<div class="file-name">'), t.push('<a node-type="name" class="filename" href="javascript:void(0);" title=""></a>'), t.push("</div>"), t.push('<span node-type="checkbox" class="checkbox"><span class="icon circle-icon">&#xe93b;</span><span class="icon checkgridsmall">&#xe935;</span></span>'), t.push("</div>");
            for (var i = [], s = b.columnsCount = this.getColumnsCount(), a = 0; s > a; a++) i.push(t.join(""));
            return e.innerHTML = i.join(""), e
        },
        h = 0,
        g = null,
        v = null,
        p = function() {
            g = null, v = null
        },
        f = {},
        C = function(e, t, i) {
            var s, l, d = t;
            null == d && (d = this.buildView(e, t, i));
            for (var u, p = this.getGroupElementsData(), C = p[i], y = a(d), w = this, I = this.getColumnsCount(), k = y.find(".grid-view-item"), L = function(e, t) {
                for (var i in t) a.inArray(+i, e) >= 0 ? t[i].addClass("item-active") : t[i].removeClass("item-active")
            }, A = 0; A < C.length; A++) {
                u = C[A], s = k[A], l = a(s), s.style.display = "block", s.setAttribute("_position", i), f[i * I + A] = l;
                var _ = l.find(".fileicon");
                if (this.isAllItemChecked() || this.isItemChecked(i * I + A) ? l.addClass("item-active") : l.removeClass("item-active hover-item"), !s.getAttribute("_installed")) {
                    var S, H;
                    l.mouseover(function() {
                        if (S = (new Date).getTime(), w.parent.isLocked()) return !1;
                        var e = a(this);
                        return e.addClass("hover-item"), !1
                    }).mouseout(function() {
                        if (w.parent.isLocked()) return !1;
                        var e = a(this);
                        return e.removeClass("hover-item"), H = (new Date).getTime(), c.log.send({
                            name: "gridListHover",
                            value: H - S
                        }), !1
                    }), l.bind("click dblclick", function(e) {
                        var t = (new Date).getTime();
                        if (w.parent.isLocked()) return !1;
                        var i, s = a(this),
                            n = parseInt(s.attr("_position"), 10),
                            l = s.index(),
                            d = n * I + l,
                            u = w.getElementsData()[d],
                            p = w.isItemChecked(d),
                            C = !1;
                        if (e.shiftKey) {
                            w.setItemsChecked(!1);
                            var b = h,
                                y = d;
                            if (y > b) for (; y >= b;) w.setItemChecked(b, !0), b++;
                            else if (b > y) for (; b >= y;) w.setItemChecked(b, !0), b--;
                            else w.setItemChecked(b, !0);
                            L(w.getCheckedIndexs(), f), g = d
                        } else {
                            if (!e.ctrlKey) {
                                if (u.isdir) return w.setItemsChecked(!1), filename = u.server_filename, w.parent.cache.cacheName === m.SEARCH || w.parent.cache.cacheName === m.SEARCHGLOBAL || w.parent.cache.cacheName === m.SEARCHPATH ? r.assignUrlHash("list/path=" + encodeURIComponent(u.path) + "&vmode=" + r.getCurrentParams().vmode) : w.parent.addHistory(u.server_filename, u.server_filename), !1;
                                var k = s.data("plugin");
                                if (k && k.length) return o.trigger("plugin:" + k, {
                                    filesList: [u]
                                }), !1;
                                h = d, i = w.getCheckedIndexs(), i.length > 0 && (p === !1 || p && i.length > 1) && (w.setItemsChecked(!1), C = !0), p && i.length > 1 && (p = !1)
                            }
                            g = d, v = null, w.setItemChecked(d, !p), C ? w.requestLayout() : p ? s.removeClass("item-active") : s.addClass("item-active")
                        }
                        var A = (new Date).getTime();
                        return c.log.send({
                            name: "gridListSingleSel",
                            value: A - t
                        }), window.getSelection && window.getSelection().removeAllRanges(), !1
                    }).delegate(".checkbox", "click", function(e) {
                        var t = (new Date).getTime();
                        if (w.parent.isLocked()) return !1;
                        e.stopPropagation();
                        var i = a(this).closest(".grid-view-item"),
                            s = parseInt(i.attr("_position"), 10),
                            n = i.index(),
                            r = s * I + n,
                            l = w.isItemChecked(r);
                        w.setItemChecked(r, !l), h = r, l ? i.removeClass("item-active") : (i.addClass("item-active"), c.log.send({
                            name: "listSel",
                            value: 1
                        }));
                        var o = (new Date).getTime();
                        c.log.send({
                            name: "gridListMultiSel",
                            value: o - t
                        })
                    }).delegate(".checkbox", "dblclick", function(e) {
                        e.stopPropagation()
                    }), s.setAttribute("_installed", 1)
                }
                var x = n.getInfo(u.path, u.isdir);
                l.find(".playIcon").remove(), "fileicon-large-video" === x.largeIcon && (_.append('<span class="playIcon"></span>'), l.mouseenter(function() {
                    a(this).find(".playIcon").show()
                }).mouseleave(function() {
                    a(this).find(".playIcon").hide()
                })), _.attr("class", "fileicon " + x.largeIcon), u.isdir || x.plugin ? (l.addClass("open-enable"), l.data("plugin", x.plugin)) : (l.removeClass("open-enable"), l.data("plugin", ""));
                var T, j, V = l.find(".fileicon img");
                V.removeAttr("src"), 4 !== u.category && u.thumbs && u.thumbs.url1 ? (j = u.thumbs.url1.replace("size=c140_u90", "size=c180_u194"), V.data("fs_id", u.fs_id), (T = b.loadedImgMap[j]) ? (V.removeAttr("_src").attr("src", T.src).css({
                    left: T.left,
                    top: T.top,
                    visibility: "visible"
                }), V.parent().attr("class", "fileicon")) : V.removeAttr("src").attr("_src", j).css("visibility", "hidden")) : V.removeAttr("_src").removeAttr("src").css("visibility", "hidden"), l.find(".filename").html(x.name).attr("title", x.fileName).data("filename", u.server_name)
            }
            if (C.length != I) for (var E = C.length; I > E; ++E) k[E].style.display = "none";
            return d
        },
        b = {
            columnsCount: 0,
            gridViewContainer: null,
            itemHeight: 0,
            lazyLoadImagePlugin: new l,
            loadedImgMap: {},
            init: function() {
                this.lazyLoadImagePlugin.on("done", d.bind(this.imgLoadedSuccessFunc, this)), this.lazyLoadImagePlugin.on("fail", d.bind(this.imgLoadedFailFunc, this))
            },
            imgLoadedSuccessFunc: function(e, t) {
                e = a(e);
                var i, s = 0,
                    n = 0,
                    r = e.width(),
                    l = e.height();
                r > 0 && l > 0 && (s = (90 - r) / 2, n = (92 - l) / 2), i = {
                    left: s,
                    top: n,
                    visibility: "visible"
                }, e.css(i).removeAttr("_src");
                var o = e.attr("src");
                if (!o) return !1;
                var d = o.replace(/http:\/\/d[0-9]\./, "http://d.");
                i.src = o, this.loadedImgMap[d] = i, e.parent().attr("class", "fileicon"), c.log.send({
                    type: "imgLoading_thumbnail_" + 50 * Math.ceil(t / 50)
                })
            },
            imgLoadedFailFunc: function(e) {
                e = a(e), e.removeAttr("src"), e.removeAttr("_src")
            },
            checkCanLoad: function(e) {
                for (var t = 0, i = b.gridViewContainer, s = i.scrollTop(), a = i.height(); e && -1 === e.className.indexOf("grid-view-item");) e = e.parentNode, t += e.offsetTop;
                return s - 100 > t ? -1 : t > s + a ? 0 : 1
            },
            load: function(e) {
                for (var t = b.gridViewContainer, i = e ? t.find("dd:gt(" + e + ")").find(".thumb[_src]") : t.find(".thumb[_src]"), s = [], n = 0, r = i.length; r > n; n++) {
                    var l = i[n],
                        o = this.checkCanLoad(l);
                    if (0 === o) break; - 1 !== o ? 1 === o && ([].push.apply(s, [].slice.call(i, n, n + this.columnsCount)), n = n + this.columnsCount - 1) : n = n + this.columnsCount - 1
                }
                var c = d.map(s, function(e) {
                    return a(e).data("fs_id")
                });
                this.lazyLoadImagePlugin.changeImages(s, c)
            }
        };
    b.init();
    var y = -1,
        w = 0,
        I = 1e3;
    i.exports = {
        getView: C,
        buildView: u,
        onScroll: d.debounce(function() {
            var e = this.parent,
                t = d.now(),
                i = w;
            clearTimeout(y), w = t, t - i > I ? s(e) : y = setTimeout(s, I, e)
        }, 350),
        clear: p
    }
});;
define("disk-system:widget/system/fileService/asynFileManager/asynFileManagerView.js", function(e, i, n) {
    var a = (e("base:widget/libs/jquerypacket.js"), e("system-core:system/uiService/dialog/dialog.js")),
        s = e("base:widget/tools/tools.js"),
        t = function() {
            var e = {},
                i = {},
                n = function() {
                    i.init()
                };
            return e.showException = function(e) {
                var n = e.title || "确定",
                    s = e.errorList ? (e.flagRepeat ? i.buildRepeatErrorList : i.buildErrorList).call(null, e.errorList, e.repeatToMsg, e.repeatFrmMsg) : "",
                    t = e.checkboxMsg ? i.buildRepeatCheckboxContent(e.checkboxMsg, e.checkboxChecked) : "",
                    l = ['<div class="dialog-asyn-view">', "<h4>" + e.contentTitle + "</h4>", s, t, "</div>"],
                    o = function() {
                        i.resetDialog(), i.hiddenDialog(), e.okCall(i.getCheckStatus())
                    },
                    r = function() {
                        e.cancelCall(), i.resetDialog(), i.hiddenDialog()
                    },
                    c = [];
                e.plusText && c.push({
                    type: "big",
                    color: "blue",
                    name: "confirm",
                    title: e.plusText,
                    click: function() {
                        i.resetDialog(), i.hiddenDialog(), e.plusCall(i.getCheckStatus())
                    }
                }), e.okText && c.push({
                    type: "big",
                    color: "blue",
                    name: "confirm",
                    title: e.okText,
                    padding: ["36px", "36px"],
                    click: function() {
                        o()
                    }
                }), c.push({
                    type: "big",
                    name: "cancel",
                    title: e.cancelText,
                    padding: ["36px", "36px"],
                    click: function() {
                        r()
                    }
                });
                var p = {
                    title: n,
                    body: l.join(""),
                    buttons: c,
                    onClose: function() {
                        r()
                    }
                };
                i.dialog = new a(p), i.hackDialog(), i.dialog.show(), i.bindEvent()
            }, i.dialog = null, i.bindEvent = function() {
                var e = i.dialog.$dialog.find(".asyn-view-checkbox");
                e.click(function() {
                    e.toggleClass("on")
                })
            }, i.getCheckStatus = function() {
                var e = i.dialog.$dialog.find(".asyn-view-checkbox");
                return e.hasClass("on")
            }, i.buildErrorList = function(e) {
                var n, a = [],
                    t = e.length > 10 ? !0 : !1,
                    l = t ? 10 : e.length;
                if (e.length && e.server_filename && e.isdir) {
                    a.push('<ul class="asyn-view-content asyn-view-repeat-content">');
                    for (var o = 0; l > o; o++) n = e[o], n.server_filename = n.from, n.isdir = 0, a.push('<li><span class="global-icon-16 global-icon-16-' + s.encodeHTML(i.getSuffixByFile(n)) + '"></span>' + s.encodeHTML(i.getFileNameByPath(n.from)) + " </li>");
                    t && a.push('<li class="asyn-view-more global-clearfix"><span class="asyn-view-point"></span><span class="asyn-view-point"></span><span class="asyn-view-point"></span></li>'), a.push("</ul>")
                }
                return a.join("")
            }, i.buildRepeatErrorList = function(e, n, a) {
                var s = [],
                    t = e.to_meta,
                    l = e.from_meta;
                return t.path = e.to, l.path = e.from, t.server_filename = i.getFileNameByPath(t.path), l.server_filename = i.getFileNameByPath(l.path), s.push('<div class="asyn-view-content">'), s.push(i.buildRepeatItemErrorList(t, n)), s.push(i.buildRepeatItemErrorList(l, a)), s.push("</div>"), s.join("")
            }, i.buildRepeatItemErrorList = function(e, n) {
                var a = [];
                return a.push('<div class="asyn-view-content-item">'), a.push('<span class="asyn-view-tip-msg">' + n + "</span>"), a.push('<div class="asyn-view-tip-info">'), a.push('<span class="asyn-view-tip-icon global-icon-16 global-icon-16-' + s.encodeHTML(i.getSuffixByFile(e)) + '"></span>'), a.push('<span class="asyn-view-tip-name">' + s.encodeHTML(e.server_filename) + "</span>"), a.push("</div>"), a.push('<span class="asyn-view-tip-date">'), 1 !== parseInt(e.isdir, 10) && a.push("大小：" + s.toFriendlyFileSize(e.size) + "&nbsp;&nbsp;"), a.push("修改日期：" + s.parseDate(e.mtime) + "</span>"), a.push("</div>"), a.join("")
            }, i.buildRepeatCheckboxContent = function(e, i) {
                var n = [];
                return n.push('<div class="asyn-view-checkbox ' + (i ? "on" : "") + '">'), n.push('<span class="global-icon-checkbox"></span>'), n.push(e), n.push("</div>"), n.join("")
            }, i.getSuffixByFile = function(e) {
                var i, n = "";
                return 1 === parseInt(e.isdir, 10) ? n = "dir" : (i = e.server_filename + "", n = s.getFileCategory(i)), n
            }, i.getFileNameByPath = function(e) {
                e = e || "", "/" === e[e.length - 1] && (e = e.substring(0, e.length - 1));
                var i = e.lastIndexOf("/");
                return e.substring(i + 1)
            }, i.q = {
                asynViewClass: "alert-dialog-asyn-view"
            }, i.init = function() {}, i.hackDialog = function() {
                i.dialog && i.dialog.$dialog.addClass(i.q.asynViewClass)
            }, i.resetDialog = function() {
                i.dialog && i.dialog.$dialog.removeClass(i.q.asynViewClass)
            }, i.hiddenDialog = function() {
                i.dialog && i.dialog.hide()
            }, n.apply(e, arguments), e
        };
    n.exports = new t
});;
define("disk-system:widget/system/errorMsg/errorMsg.js", function(a, e, t) {
    var r = window.yunData,
        o = function() {
            var a = "multi-file";
            0 === location.pathname.indexOf("/disk/home") && (a = "disk-home");
            var e = location.protocol + "//yun.baidu.com/buy/center?tag=8&from=" + a,
                t = "购买会员";
            return r && 1 === +r.ISSVIP && (e = location.protocol + "//yun.baidu.com/buy/center?tag=2&from=" + a, t = "购买容量"), '你的空间不足了哟，赶紧<a target="_blank" href="' + e + '">' + t + "</a>吧"
        }(),
        i = {
            0: "成功",
            "-1": "用户名和密码验证失败",
            "-2": "备用",
            "-3": "用户未激活（调用init接口）",
            "-4": "COOKIE中未找到host_key&user_key（或BDUSS）",
            "-5": "host_key和user_key无效",
            "-6": '登录失败，请重新<a href="javascript:window.location.reload();">登录</a>',
            "-7": "文件或目录名错误或无权访问",
            "-8": "该目录下已存在此文件",
            "-9": "文件被所有者删除，操作失败",
            "-10": o,
            "-11": "父目录不存在",
            "-12": "设备尚未注册",
            "-13": "设备已经被绑定",
            "-14": "帐号已经初始化",
            "-21": "预置文件无法进行相关操作",
            "-22": "被分享的文件无法重命名，移动等操作",
            "-23": "数据库操作失败，请联系netdisk管理员",
            "-24": "要取消的文件列表中含有不允许取消public的文件。",
            "-25": "非公测用户",
            "-26": "邀请码失效",
            "-102": "云冲印文件7日内无法删除",
            1: "服务器错误 ",
            2: "接口请求错误，请稍候重试",
            3: "一次操作文件不可超过100个",
            4: "新文件名错误",
            5: "目标目录非法",
            6: "备用",
            7: "NS非法或无权访问",
            8: "ID非法或无权访问",
            9: "申请key失败",
            10: "创建文件的superfile失败",
            11: "user_id(或user_name)非法或不存在",
            12: "部分文件已存在于目标文件夹中",
            13: "此目录无法共享",
            14: "系统错误",
            15: "操作失败",
            102: "无权限操作该目录",
            103: "提取码错误",
            104: "验证cookie无效",
            132: "删除文件需要验证您的身份",
            201: "系统错误",
            202: "系统错误",
            203: "系统错误",
            204: "系统错误",
            205: "系统错误",
            301: "其他请求出错",
            501: "获取的LIST格式非法",
            618: "请求curl返回失败",
            619: "pcs返回错误码",
            600: "json解析出错",
            601: "exception抛出异常",
            617: "getFilelist其他错误",
            211: "无权操作或被封禁",
            404: "秒传md5不匹配 rapidupload 错误码",
            406: "秒传创建文件失败 rapidupload 错误码",
            407: "fileModify接口返回错误，未返回requestid rapidupload 错误码",
            1024: "云冲印购物车文件15日内无法删除",
            31080: "我们的服务器出错了，稍候试试吧",
            31021: "网络连接失败，请检查网络或稍候再试",
            31075: "一次支持操作999个，减点试试吧",
            31116: '你的空间不足了哟，赶紧<a href="//yun.baidu.com/buy/center?tag=2&from=multi-file">购买空间</a>吧',
            112: '页面已过期，请<a href="javascript:window.location.reload();"">刷新</a>后重试',
            111: "当前还有未完成的任务，需完成后才能操作",
            "-32": o,
            9100: '你的帐号存在违规行为，已被冻结，<a href="/disk/appeal" target="_blank">查看详情</a>',
            9200: '你的帐号存在违规行为，已被冻结，<a href="/disk/appeal" target="_blank">查看详情</a>',
            9300: '你的帐号存在违规行为，该功能暂被冻结，<a href="/disk/appeal" target="_blank">查看详情</a>',
            9400: '你的帐号异常，需验证后才能使用该功能，<a href="/disk/appeal" target="_blank">立即验证</a>',
            9500: '你的帐号存在安全风险，已进入保护模式，请修改密码后使用，<a href="/disk/appeal" target="_blank">查看详情</a>'
        },
        n = a("system-core:context/context.js").instanceForSystem;
    n.extend({
        errorMsg: function(a, e) {
            return i[a] || e || "未知错误[" + a + "]"
        },
        accountBan: function(a) {
            var e = !1,
                a = a;
            if (/^9[1-5]\d{2}$/.test(a)) {
                var t = !0;
                a = 100 * parseInt(a / 100, 10), (9100 === a || 9200 === a || 9500 === a) && (t = !1), n.ui.tip({
                    msg: i[a],
                    mode: "caution",
                    autoClose: !1,
                    hasClose: t
                }), e = !0
            }
            return {
                isBan: e,
                errno: a
            }
        }
    }), t.exports = i
});;
define("disk-system:widget/system/fileService/asynFileManager/asynFileManager.js", function(e, a, t) {
    var r = e("base:widget/libs/jquerypacket.js"),
        s = e("base:widget/storage/storage.js"),
        o = e("system-core:context/context.js").instanceForSystem,
        l = e("disk-system:widget/system/fileService/asynFileManager/asynFileManagerView.js"),
        i = e("disk-system:widget/system/errorMsg/errorMsg.js");
    o.extend({
        errorMsg: function(e) {
            return "number" == typeof e || "string" == typeof e ? i[e] : void 0
        }
    });
    var n = function(e) {
        this.config = e, this.tiping = !1
    };
    n.moveFiles = function(e, a, t) {
        c.doCommonTest(e, "move") && c.doMoveCopyThing("move", e, a, t)
    }, n.copyFiles = function(e, a, t) {
        c.doCommonTest(e, "copy") && c.doMoveCopyThing("copy", e, a, t)
    }, n.deleteFiles = function(e, a) {
        c.doCommonTest(e, "delete") && (c.doDeleteThing("delete", e, a), this.operating = !0)
    }, n.deleteFileSync = function(e, a) {
        c.doCommonTest(e, "delete") && r.post("/api/filemanager?opera=delete&async=0", {
            filelist: r.stringify(e)
        }, function(e) {
            e = r.parseJSON(e), e && 0 === e.errno ? a(1, e) : e && 132 === e.errno ? a(132, e) : a(0, e)
        }).error(function(e) {
            var t = r.parseJSON(e.responseText);
            a(0, t)
        })
    }, n.rename = function(e, a, t) {
        c.doCommonTest(e, "rename") && c.doRename("rename", e, a, t)
    }, n.transferFiles = function() {}, n.resolveHasTask = function(e, a, t) {
        var r = {},
            s = {},
            o = {};
        o.taskid = parseInt(e, 10), r.operate = a, s.operate = a, s.callback = t, s.async = 1, c.doMoveCopySuccCall(o, r, s)
    }, n.transferFile = function() {}, n.restore = function(e) {
        var a = "restore";
        c.doCommonTest(e.fidlist, a) && (c.data.selectedFiles = e.selectedFiles, c.getData(a, e, c.doSuccessCall, c.doFailCall))
    };
    var c = {};
    c.data = {}, c.QUERY_TIMEER = 1e3, c.getFileNameByPath = function(e) {
        e = e || "";
        var a = e.lastIndexOf("/");
        return e.substring(a + 1)
    }, c.getDirFromPath = function(e) {
        return e = e || "", e.substring(0, e.lastIndexOf("/"))
    }, c.doCommonTest = function(e, a) {
        var t = e && e.length > 0;
        return o.ui.tip(t ? {
            mode: "loading",
            msg: "正在" + c.getOperateName(a) + "文件，请稍候&hellip;",
            autoClose: !1
        } : {
            mode: "caution",
            msg: "请选择要" + c.getOperateName(a) + "的文件"
        }), t
    }, c.doMoveCopyThing = function(e, a, t, s) {
        var o, l, i = {},
            n = [];
        t = "/" === t ? "" : t;
        for (var p = 0, d = a.length; d > p; p++) o = a[p], l = {
            path: o.path,
            dest: t,
            newname: c.getFileNameByPath(o.path)
        }, n.push(l);
        i.filelist = r.stringify(n), i.list = n, i.callback = s, c.getData(e, i, c.doSuccessCall, c.doFailCall)
    }, c.doDeleteThing = function(e, a, t) {
        var s = {};
        s.filelist = r.stringify(a), s.list = a, s.callback = t, c.getData(e, s, c.doSuccessCall, c.doFailCall)
    }, c.doRename = function(e, a, t, s) {
        var o = {};
        o.filelist = r.stringify([{
            path: a,
            newname: t
        }]), o.callback = s, c.getData(e, o, c.doSuccessCall, c.doRenameFailCall)
    }, c.doSuccessCall = function(e, a, t) {
        c.doMoveCopySuccCall(e, a, t)
    }, c.doFailCall = function(e, a, t) {
        if (2 === t.async || 12 !== e.errno && -8 !== e.errno && -9 !== e.errno || e.info && e.info[0] && 111 === e.info[0].errno) if (132 === e.errno) n = 132, c.callTaskOverCallBack(n, t.callback, e, a, t);
        else {
            var s, l = e.errno,
                i = "文件" + c.getOperateName(t.operate) + "失败，请稍候再试",
                n = 3;
            if (12 === l && "delete" === t.operate ? s = i : (12 === l && e.info && e.info[0] && e.info[0].errno && (l = e.info[0].errno), 102 === l && e.info && e.info[0] && e.info[0].errno && (l = 102 === e.info[0].errno ? "-102" : e.info[0].errno), s = 3 === l ? "一次操作数量不可以超过" + (e.limit || 500) + "个" : o.errorMsg(l) || i), e.flagNetError) {
                if (n = 0, !e.flagNetErrorProcess) {
                    var p = t.list,
                        d = [];
                    if ("delete" === t.operate) for (var u = 0, f = p.length; f > u; u++) d.push({
                        from: p[u]
                    });
                    else if ("restore" === t.operate) {
                        if (c.data.selectedFiles) for (var u = 0; u < c.data.selectedFiles.length; u++) {
                            var g = c.data.selectedFiles[u];
                            d.push({
                                from: g.path
                            })
                        }
                    } else for (var u = 0, f = p.length; f > u; u++) d.push({
                        from: p[u].path
                    });
                    return c.hideTips(), void c.showOtherErrorAsynView("failnet", d, t.operate, a, t)
                }
                s = "任务进度查询失败，请稍候重试"
            }
            c.showErrorCloseTips(s), c.callTaskOverCallBack(n, t.callback, e, a, t)
        } else {
            if (a.async = 2, a.callback = t.callback, "restore" === t.operate) a.url = t.url, a.fidlist = r.stringify(e.faillist);
            else {
                var h = e.info,
                    m = [];
                if (h && h.length > 0) for (var u = 0, f = h.length; f > u; u++) 0 === h[u].errno && m.push(h[u].path);
                if (m.length > 0 && t.list && t.list.length > 0) if ("delete" === t.operate) for (var k = t.list.length - 1; k >= 0; k--) r.inArray(t.list[k], m) >= 0 && t.list.splice(k, 1);
                else for (var k = t.list.length - 1; k >= 0; k--) r.inArray(t.list[k].path, m) >= 0 && t.list.splice(k, 1);
                a.filelist = r.stringify(t.list)
            }
            c.getData(t.operate, a, c.doSuccessCall, c.doFailCall)
        }
    }, c.doRenameFailCall = function(e, a, t) {
        if (e.flagNetError) {
            var r = "网络异常，重名失败，稍后重试下吧";
            c.showErrorCloseTips(r)
        } else 12 === e.errno ? c.showRenameAsynView(e, a, t) : c.callTaskOverCallBack(0, t.callback, e, a, t)
    }, c.doMoveCopySuccCall = function(e, a, t) {
        e.taskid > 0 ? (c.setTaskProcess(e.taskid, 0), c.taskMap.result = e, c.taskMap.params = a, c.taskMap.otherParams = t, s && s.setItem && e.taskid && t.operate && s.setItem(c.getTaskKey(), e.taskid + "_" + t.operate), c.startGetQueryData(t.operate, e.taskid, c.processSuccCall, c.processFailCall, a)) : (c.showSuccTips("文件" + c.getOperateName(t.operate) + "成功"), c.callTaskOverCallBack(1, t.callback, e, a, t))
    }, c.processSuccCall = function(e, a, t) {
        if (0 !== e.task_errno) if (c.hideTips(), -32 === e.task_errno) e.errno = e.task_errno, c.doFailCall(e, a, t);
        else switch (t.operate) {
                case "delete":
                    c.showDeleteAsynView(e, a, t);
                    break;
                case "rename":
                    c.showRenameAsynView(e, a, t);
                    break;
                default:
                    c.showAsynView(e, a, t)
            } else if ("pending" === e.status) n.tiping || c.showProcessTips("正在" + c.getOperateName(t.operate) + "文件，请稍候&hellip;", 0), c.startGetQueryData(t.operate, t.taskid, c.processSuccCall, c.processFailCall, a);
        else if ("running" === e.status) {
            var r = 0;
            r = e.progress ? Math.min(Math.max(parseInt(e.progress, 10), 0), 100) : c.getTaskProcess(e.taskid), c.setTaskProcess(e.taskid, r), n.tiping || c.showProcessTips("正在" + c.getOperateName(t.operate) + "文件，请稍候&hellip;", r), c.startGetQueryData(t.operate, t.taskid, c.processSuccCall, c.processFailCall, a)
        } else "success" === e.status && (s && s.removeItem && s.removeItem(c.getTaskKey()), c.showSuccTips("文件" + c.getOperateName(t.operate) + "成功"), "restore" === t.operate && (e = c.taskMap.ignoreList), c.callTaskOverCallBack(1, c.getLastCallback(), e, a, t))
    }, c.processFailCall = function(e, a, t) {
        e.flagNetErrorProcess = 1, c.doFailCall(e, a, t)
    }, c.getData = function(e, a, t, r) {
        if ("restore" === e) c.getRestoreAndDeleteData(e, a, t, r);
        else {
            var s = {},
                o = 1;
            s.operate = e, s.callback = a.callback, s.list = a.list, delete a.callback, delete a.list, a.async && (o = a.async, s.async = o, delete a.async), o = 2, c.fetchData("/api/filemanager?opera=" + e + "&async=" + o, a, t, r, s)
        }
    }, c.getRestoreAndDeleteData = function(e, a, t, r) {
        var s = a.fidlist ? {
                fidlist: a.fidlist
            } : {
                filelist: a.filelist
            },
            o = a;
        o.operate = e;
        var l = a.url + "&async=" + a.async;
        c.fetchData(l, s, t, r, o)
    }, c.startGetQueryData = function(e, a, t, r, s) {
        setTimeout(function() {
            c.getQueryData(e, a, t, r, s)
        }, c.QUERY_TIMEER)
    }, c.getQueryData = function(e, a, t, r, s) {
        var o = {};
        o.operate = e, o.taskid = a, o.callback = c.getLastCallback(), c.fetchData("/share/taskquery?taskid=" + a, s, t, r, o)
    }, c.fetchData = function(e, a, t, s, l) {
        r.post(e, a, function(i, n, c) {
            if (i && 0 === i.errno) {
                t(i, a, l);
                var p = /taskid=(\d+)&*/i;
                o.log.send({
                    type: "async",
                    op: "async",
                    action: l.operate,
                    url: "//update.pan.baidu.com/statistics",
                    product: "pan",
                    success: 1,
                    taskid: i.taskid || (p.test(e) ? e.match(p)[1] : 0),
                    ajaxerrno: i.errno,
                    ajaxerrmsg: o.errorMsg(i.errno),
                    ajaxstatus: c.status || 0,
                    ajaxurl: encodeURIComponent(e),
                    ajaxparam: r.stringify(a),
                    ajaxdata: r.stringify(i),
                    file: r.stringify(a.filelist)
                })
            } else if (132 === i.errno) s(i, a, l);
            else {
                s(i, a, l);
                var p = /taskid=(\d+)&*/i;
                o.log.send({
                    type: "async",
                    op: "async",
                    action: l.operate,
                    url: "//update.pan.baidu.com/statistics",
                    product: "pan",
                    success: 0,
                    taskid: i.taskid || (p.test(e) ? e.match(p)[1] : 0),
                    ajaxerrno: i.errno,
                    ajaxerrmsg: o.errorMsg(i.errno) || "未知错误",
                    ajaxstatus: c.status || 0,
                    ajaxurl: encodeURIComponent(e),
                    ajaxparam: r.stringify(a),
                    ajaxdata: r.stringify(i),
                    file: r.stringify(a.filelist)
                })
            }
        }, "json").error(function(t, i, n) {
            var c;
            try {
                c = r.parseJSON(t.responseText)
            } catch (p) {}
            c || (c = {}), c.flagNetError = 1, s(c, a, l);
            var d = /taskid=(\d+)&*/i;
            o.log.send({
                type: "async",
                op: "async",
                action: l.operate,
                url: "//update.pan.baidu.com/statistics",
                product: "pan",
                success: 0,
                taskid: c.taskid || (d.test(e) ? e.match(d)[1] : 0),
                ajaxerrno: c.errno || 31021,
                ajaxerrmsg: o.errorMsg(c.errno || 31021),
                ajaxstatus: n.status || 0,
                ajaxurl: encodeURIComponent(e),
                ajaxparam: r.stringify(a),
                ajaxdata: r.stringify(c),
                file: r.stringify(a.filelist)
            })
        })
    }, c.hideTips = function() {
        o.ui.hideTip()
    }, c.showSuccTips = function(e) {
        o.ui.tip({
            mode: "success",
            msg: e
        })
    }, c.showErrorTips = function(e) {
        o.ui.tip({
            mode: "caution",
            msg: e
        })
    }, c.showLoadingTips = function(e) {
        o.ui.tip({
            mode: "loading",
            msg: e,
            autoClose: !1
        })
    }, c.showProcessTips = function(e, a) {
        var t = '<span class="asyn-tip-process" style="display: inline-block;width: 73px;height: 8px;line-height: 8px;background: #ebdfbd;margin: 0 5px;border-radius: 4px;overflow:hidden;"><span class="asyn-tip-process-inner" style="display: inline-block;background: #6cd879;height: 8px;line-height: 8px;font-size: 0;text-align: left;float: left;width:' + a + '%"></span></span>';
        o.ui.tip({
            mode: "none",
            msg: '<span style="padding-left: 15px;"></span>' + e + t + a + "%",
            autoClose: !1,
            hasClose: !1
        })
    }, c.showErrorCloseTips = function(e) {
        o.ui.tip({
            mode: "caution",
            msg: e,
            autoClose: !1,
            hasClose: !0
        })
    }, c.taskMap = {}, c.setTaskProcess = function(e, a) {
        var t = c.taskMap[e];
        t || (t = {}, c.taskMap[e] = t), t.process = a
    }, c.getTaskProcess = function(e) {
        var a = c.taskMap[e],
            t = 0;
        return a && (t = a.process || 0), t
    }, c.getLastCallback = function() {
        var e = c.taskMap;
        return e.otherParams && e.otherParams.callback ? e.otherParams.callback : null
    }, c.getOperateName = function(e) {
        var a = c.taskMap,
            t = "操作";
        switch (e || a.otherParams && a.otherParams.operate && (e = a.otherParams.operate), e) {
            case "copy":
                t = "复制";
                break;
            case "move":
                t = "移动";
                break;
            case "delete":
                t = "删除";
                break;
            case "transfer":
                t = "转存";
                break;
            case "rename":
                t = "重命名";
                break;
            case "restore":
                t = "还原"
        }
        return t
    }, c.addTaskObj = function(e, a, t, r, s, o, l) {
        var i = c.taskMap;
        i.currentTypeIndex = e || 0, i.currentIndex = a || 0, i.defaultList = t, i.repeatFileList = r, i.repeatFolderList = s;
        var n = i.notFoundList;
        n instanceof Array || (n = [], i.notFoundList = n), Array.prototype.push.apply(n, o);
        var p = i.otherList;
        p instanceof Array || (p = [], i.otherList = p), Array.prototype.push.apply(p, l)
    }, c.hasNext = function() {
        var e, a = c.taskMap,
            t = a.currentTypeIndex,
            r = a.currentIndex;
        if (0 === t) e = a.repeatFileList;
        else {
            if (1 !== t) return !1;
            e = a.repeatFolderList
        }
        return r >= e.length ? (a.currentTypeIndex++, a.currentIndex = 0, 0 === t && a.repeatFolderList.length > 0 ? !0 : !1) : !0
    }, c.doNext = function() {
        if (c.hasNext()) {
            var e, a, t, r, s = c.taskMap,
                o = s.currentTypeIndex,
                l = s.currentIndex;
            0 === o ? (e = s.repeatFileList, r = 0) : (e = s.repeatFolderList, r = 1), a = e.length - l - 1, t = e[s.currentIndex], s.currentIndex++, c.showAsynViewItem(t, a, r)
        } else c.doAllDone()
    }, c.doNextAll = function(e) {
        for (var a, t = c.taskMap, r = t.currentTypeIndex, s = t.currentIndex, o = 0 === r ? t.repeatFileList : t.repeatFolderList, l = s, i = o.length; i > l; l++) a = o[l], a.from_meta.isdir && "overwrite" === e ? a.ignore = 1 : a.ondup = e;
        t.currentIndex = o.length, 0 === r ? c.doNext() : c.doAllDone()
    }, c.doRetryTask = function() {
        o.ui.tip({
            mode: "loading",
            msg: "正在" + c.getOperateName() + "文件，请稍候&hellip;",
            autoClose: !1
        });
        var e = c.taskMap;
        c.doCommonDone(e, e.otherList, c.getLastCallback()), e.otherList = []
    }, c.doRetryDeleteTask = function() {
        o.ui.tip({
            mode: "loading",
            msg: "正在" + c.getOperateName() + "文件，请稍候&hellip;",
            autoClose: !1
        });
        for (var e = c.taskMap, a = e.otherParams, t = e.otherList, s = [], l = {}, i = 0, n = t.length; n > i; i++) s.push(t[i].path);
        e.otherList = [], l.list = s, l.filelist = r.stringify(s), l.async = 2, l.callback = a.callback, c.getData(a.operate, l, c.doSuccessCall, c.doFailCall)
    }, c.doNetErrorRetryTask = function(e, a, t, r) {
        o.ui.tip({
            mode: "loading",
            msg: "正在" + c.getOperateName() + "文件，请稍候&hellip;",
            autoClose: !1
        }), t.async = r.async, "restore" === a ? t.url = r.url : (t.list = r.list, delete t.fidlist), t.callback = r.callback, c.getData(a, t, c.doSuccessCall, c.doFailCall)
    }, c.doAllDone = function() {
        var e = c.taskMap,
            a = e.defaultList,
            t = e.repeatFileList,
            r = e.repeatFolderList,
            s = [],
            o = (e.otherParams, c.getLastCallback());
        Array.prototype.push.apply(s, a), Array.prototype.push.apply(s, t), Array.prototype.push.apply(s, r), c.doCommonDone(e, s, o)
    }, c.doCommonDone = function(e, a, t) {
        o.ui.tip({
            mode: "loading",
            msg: "正在" + c.getOperateName() + "文件，请稍候&hellip;",
            autoClose: !1
        });
        for (var l, i, n = e.otherParams, p = [], d = {}, u = [], f = [], g = 0, h = a.length; h > g; g++) l = a[g], l.ignore ? u.push(l.from) : (i = c.getDirFromPath(l.to), i = "/" === i ? "" : i, p.push({
            path: l.from,
            dest: i,
            newname: c.getFileNameByPath(l.from),
            ondup: l.ondup || "fail"
        }), "restore" === n.operate && l.fs_id && f.push({
            fid: l.fs_id,
            ondup: l.ondup || "fail"
        }));
        if (c.taskMap.ignoreList = u, p.length > 0) d.async = 2, d.callback = n.callback, "restore" === n.operate ? (d.url = n.url, d.filelist = r.stringify(f)) : (d.filelist = r.stringify(p), d.list = p), c.getData(n.operate, d, c.doSuccessCall, c.doFailCall);
        else {
            s && s.removeItem && s.removeItem(c.getTaskKey());
            var m = e.repeatFileList.length + e.repeatFolderList.length;
            e.ignoreList.length < m ? c.showSuccTips("文件" + c.getOperateName() + "成功") : c.hideTips(), c.callTaskOverCallBack(1, t, e.result, e.params, e.otherParams)
        }
    }, c.doAllNotFound = function() {
        var e = c.taskMap,
            a = e.notFoundList;
        return a instanceof Array && a.length > 0 ? (c.showOtherErrorAsynView("notfound", a, e.otherParams.operate, e.params, e.otherParams), e.notFoundList = [], !0) : !1
    }, c.doAllFail = function() {
        var e = c.taskMap,
            a = e.otherList;
        return a instanceof Array && a.length > 0 ? (c.showOtherErrorAsynView("fail", a, e.otherParams.operate, e.params, c.getLastCallback()), !0) : !1
    }, c.showDeleteAsynView = function(e, a, t) {
        if (!e.list || e.list.length <= 0) return delete e.errno, void c.doFailCall(e, a, t);
        for (var r, s = e.list, o = [], l = [], i = 0, n = s.length; n > i; i++) r = s[i], r.from = r.path, -9 === r.error_code ? o.push(r) : l.push(r);
        c.addTaskObj(0, 0, [], [], [], o, l), c.doNext()
    }, c.showRenameAsynView = function(e, a, t) {
        if (12 === e.errno || -8 === e.errno || -30 === e.task_errno) {
            var r = {
                title: "提示",
                contentTitle: "此目录下已存在同名文件，是否要保存两个文件",
                okText: "保留两个文件",
                cancelText: "取消",
                okCall: function() {
                    a.ondup = "newcopy", a.callback = t.callback, a.async = 2, c.getData("rename", a, c.doSuccessCall, c.doRenameFailCall)
                },
                cancelCall: function() {
                    var r = c.taskMap;
                    r.otherParams = t, r.result = e, r.params = a, c.callTaskOverCallBack(2, c.getLastCallback(), e, a, t)
                }
            };
            c.hideTips(), l.showException(r)
        } else delete e.errno, c.doFailCall(e, a, t)
    }, c.showAsynView = function(e, a, t) {
        if (!e.list || e.list.length <= 0) return delete e.errno, void c.doFailCall(e, a, t);
        var r, s = e.list,
            o = [],
            l = [],
            i = [],
            n = [],
            p = [];
        if (s instanceof Object) {
            for (var d = 0, u = s.length; u > d; d++) r = s[d], -8 === r.error_code ? r.from_meta && r.to_meta && (r.from_meta.isdir && r.to_meta.isdir ? i.push(r) : r.from_meta.isdir || r.to_meta.isdir ? (r.ondup = "newcopy", o.push(r)) : l.push(r)) : -9 === r.error_code ? n.push(r) : p.push(r);
            c.addTaskObj(0, 0, o, l, i, n, p), c.doNext()
        }
    }, c.showOtherErrorAsynView = function(e, a, t, r, s) {
        var o = {};
        if (o.title = "提示", "restore" === s.operate) for (var i = this.data.selectedFiles, n = 0; n < i.length; n++) for (var p = i[n], d = 0; d < a.length; d++) {
            var u = a[d];
            p.fs_id === u.fs_id && (u.from = p.server_filename, u.to = p.server_filename, u.isdir = p.isdir)
        }("fail" === e || "failnet" === e) && (o.contentTitle = '网络异常，<span class="asyn-red">' + a.length + "</span>个文件" + c.getOperateName(t) + "失败，是否重试？", o.okText = "重试", o.cancelText = "取消"), "fail" === e ? (o.okCall = "delete" === t ?
            function() {
                c.doRetryDeleteTask()
            } : function() {
            c.doRetryTask()
        }, o.cancelCall = function() {
            c.taskMap.otherList = [], c.callTaskOverCallBack(1, c.getLastCallback())
        }) : "failnet" === e ? (o.okCall = function() {
            c.doNetErrorRetryTask(a, t, r, s)
        }, o.cancelCall = function() {}) : (o.cancelText = "我知道了", o.contentTitle = '有<span class="asyn-red">' + a.length + "</span>个文件的源文件找不到了，操作未完成", o.cancelCall = function() {
            c.callTaskOverCallBack(1, c.getLastCallback())
        }), o.flagRepeat = !1, o.errorList = a, l.showException(o)
    }, c.showAsynViewItem = function(e, a, t) {
        var r = e.from_meta,
            s = (e.to_meta, {}),
            o = t ? "夹" : "",
            i = c.getOperateName();
        if (s.title = i + "文件", s.contentTitle = i + "的位置已经包含了同名的文件" + o + "，请选择你的操作：", s.plusText = r.isdir ? "跳过" : "替换文件", s.plusCall = function(a) {
                r.isdir && (e.ignore = 1), e.ondup = "overwrite", a ? c.doNextAll(e.ondup) : c.doNext()
            }, s.okCall = function(a) {
                e.ondup = "newcopy", a ? c.doNextAll(e.ondup) : c.doNext()
            }, s.cancelCall = function() {
                var e = c.taskMap,
                    a = e.otherParams,
                    t = e.result,
                    r = e.params;
                c.callTaskOverCallBack(2, c.getLastCallback(), t, r, a)
            }, s.okText = "保留两个文件" + o, s.cancelText = "取消", a > 0 && (s.checkboxMsg = '为其余的<span class="asyn-red">' + a + "</span>个重名文件" + o + "都执行此操作"), s.flagRepeat = !0, s.repeatToMsg = "已有文件" + o + "：", s.repeatFrmMsg = "正在" + i + "的文件" + o + "：", "还原" === i && this.data.selectedFiles) for (var n = this.data.selectedFiles, p = 0; p < n.length; p++) {
            var d = n[p];
            d.fs_id === e.fs_id && (e.from = d.path, e.to = d.path)
        }
        s.errorList = e, l.showException(s)
    }, c.callTaskOverCallBack = function(e, a, t, r, o) {
        return c.doAllFail() ? void c.hideTips() : (c.doAllNotFound() && c.hideTips(), "function" == typeof a && a.call(null, e, t, r, o, c.taskMap.ignoreList), void((1 === e || 2 === e || 3 === e) && s && s.removeItem && s.removeItem(c.getTaskKey())))
    }, c.getTaskKey = function() {
        return "asynfilemanager_" + (yunData.MYNAME || "").replace(/@/g, "")
    }, t.exports = n
});;
define("disk-system:widget/system/fileService/fileManagerApi/fileManagerApi.js", function(e, r, t) {
    var a = e("base:widget/libs/jquerypacket.js"),
        s = e("system-core:context/context.js").instanceForSystem,
        i = e("system-core:system/baseService/message/message.js"),
        o = e("disk-system:widget/system/fileService/asynFileManager/asynFileManager.js"),
        n = e("disk-system:widget/system/errorMsg/errorMsg.js");
    s.extend({
        errorMsg: function(e) {
            return "number" == typeof e || "string" == typeof e ? n[e] : void 0
        }
    });
    var l = {
            FILE_NAME_REG: /[\\\/\:\*\?"<>\|]/i,
            resolveFileName: function(e) {
                var r = "";
                if (0 === e.indexOf("/") && (e = e.slice(1)), l.FILE_NAME_REG.test(e) && (r = "文件名不能包含以下字符：<,>,|,*,?,,/"), !r) if (e.length > 0) {
                    for (var t = 0, a = 0; t < e.length; t++) e.charCodeAt(t) < 128 ? a++ : a += 2;
                    a > 255 && (r = "文件(夹)名称长度不能超过255字节")
                } else r = "文件(夹)名称不能为空，请输入文件名称";
                return r
            },
            resolveNewName: function(e, r, t) {
                var a = e.substring(0, e.lastIndexOf("/")) + "/",
                    s = r;
                return t && (s = a + s), s
            }
        },
        c = {
            COPY: "copy",
            MOVE: "move",
            DELETE: "delete",
            UPLOAD: "upload",
            createDirFlag: !1,
            sendFileMoveCopyApi: function(e, r, t, i, o) {
                for (var n, l, c = [], g = null, f = 0, p = r.length; p > f; f++) g = r[f].path, n = s.tools.baseService.parseDirPath(g), l = s.tools.baseService.parseDirFromPath(g), c.push({
                    path: n,
                    dest: t,
                    newname: l
                });
                a.post("/api/filemanager?channel=chunlei&clienttype=0&web=1&opera=" + e, {
                    filelist: a.stringify(c)
                }, i).error(o)
            },
            sendCreateNewFileApi: function(e, r, t, i, o, n) {
                var c, g, f = s.tools.baseService.parseDirFromPath(e),
                    p = "";
                if (l.FILE_NAME_REG.test(f)) return p = "文件名不能包含以下字符：<,>,|,*,?,,/", n(p), !1;
                if (f.length > 0) {
                    for (g = 0, c = 0; g < f.length; g++) f.charCodeAt(g) < 128 ? c++ : c += 2;
                    c > 255 && (p = "文件(夹)名称长度不能超过255字节", n(p))
                } else p = "文件(夹)名称不能为空，请输入文件名称", n(p);
                p || a.post("/api/create?a=commit", {
                    path: e,
                    isdir: t,
                    size: r,
                    block_list: i ? '["' + i + '"]' : "[]",
                    method: "post"
                }, o)
            },
            createNewDir: function(e, r, t) {
                var i = this;
                if (i.createDirFlag !== !0) {
                    i.createDirFlag = !0;
                    var o = (s.tools.baseService.parseDirFromPath(e, !0), "");
                    o = l.resolveFileName(t), o ? (r(1, o), i.createDirFlag = !1) : a.post("/api/create?a=commit", {
                        path: e,
                        isdir: 1,
                        block_list: "[]"
                    }, function(e) {
                        var t;
                        try {
                            t = a.parseJSON(e)
                        } catch (n) {}
                        t = t || {}, t && 0 == t.errno ? r(0, "创建文件夹成功", t) : (o = s.errorMsg(t.errno) || "发生未知错误，请稍后重试", r(1, o, t)), i.createDirFlag = !1
                    }).error(function(e) {
                        var t;
                        try {
                            t = a.parseJSON(e.responseText)
                        } catch (n) {}
                        t = t || {}, o = s.errorMsg(t.errno) || "发生未知错误，请稍后重试", r(1, o, t), i.createDirFlag = !1
                    })
                }
            },
            deleteFiles: function(e, r, t) {
                var a = t ? o.deleteFileSync : o.deleteFiles;
                a.call(null, e, function(e, t) {
                    if (1 === e) i.trigger("quota-change"), r(0, "删除成功", t);
                    else if (132 === e) {
                        var a = s.errorMsg(t.errno) || "发生未知错误，请稍后重试";
                        r(132, a, t)
                    } else {
                        t = t || {};
                        var a = s.errorMsg(t.errno) || "发生未知错误，请稍后重试";
                        r(1, a, t)
                    }
                })
            },
            reName: function(e, r, t) {
                var a = "",
                    i = this;
                i.createDirFlag !== !0 && (i.createDirFlag = !0, a = l.resolveFileName(t), a ? (r(1, a), i.createDirFlag = !1) : o.rename.call(null, e, l.resolveNewName(e, t), function(e, t) {
                    1 === e || 2 === e ? (t.status = e, r(0, "重命名成功", t), i.createDirFlag = !1) : (a = -8 === t.errno || -9 === t.errno ? "名称已在使用，请使用其他名称" : s.errorMsg(t.errno) || "重命名失败，请稍候重试", r(1, a, t), i.createDirFlag = !1)
                }))
            }
        };
    t.exports = c
});;
define("disk-system:widget/system/util/selection.js", function(t, e, n) {
    function a(t, e, n) {
        function a() {
            if (e === n) {
                var a = !(!window.attachEvent || -1 !== navigator.userAgent.indexOf("Opera"));
                a && window.setTimeout(function() {
                    t.blur(), window.setTimeout(function() {
                        t.focus()
                    }, 0)
                }, 0)
            }
        }
        if (t) {
            if (e = 0 > e ? 0 : e, n = e > n ? e : n, t.setSelectionRange) return t.focus(), t.setSelectionRange(e, n), void a();
            if (t.createTextRange) {
                var r = t.createTextRange();
                r.collapse(!0), r.moveStart("character", e), r.moveEnd("character", n - e), r.select(), a()
            }
        }
    }
    function r(t) {
        var e = {
            text: "",
            start: 0,
            end: 0
        };
        if (t.setSelectionRange) return e.start = t.selectionStart, e.end = t.selectionEnd, e.text = e.start !== e.end ? t.value.substring(e.start, e.end) : "", e;
        if (document.selection) {
            var n, a = document.selection.createRange(),
                r = document.body.createTextRange();
            r.moveToElementText(t), e.text = a.text, e.bookmark = a.getBookmark();
            try {
                for (n = 0; r.compareEndPoints("StartToStart", a) < 0 && 0 !== a.moveStart("character", -1); n++)"\n" === t.value.charAt(n) && n++;
                e.start = n, e.end = e.text.length + e.start
            } catch (o) {
                var c = document.selection.createRange();
                c.setEndPoint("StartToStart", t.createTextRange()), e.end = c.text.length, e.start = e.end - a.text.length
            }
        }
        return e
    }
    n.exports = {
        setSelectionRange: a,
        getSelectionRange: r
    }
});;
define("disk-system:widget/system/fileService/createNewDir/createNewDir.js", function(e, i, t) {
    var s = e("base:widget/libs/jquerypacket.js"),
        n = e("base:widget/tools/tools.js"),
        a = e("disk-system:widget/system/fileService/fileManagerApi/fileManagerApi.js"),
        o = e("system-core:system/uiService/tip/tip.js"),
        c = e("disk-system:widget/system/util/selection.js"),
        r = e("base:widget/tools/service/tools.date.js"),
        h = function(e, i) {
            this.$container = s(e), this.canNotRenameMap = {
                "/apps": !0
            }, this.config = i || {}, this.path = "", this.parentPath = "", this.filename = "", this.$newDirDom = this.initDom(), this.$box = this.$newDirDom.find(".box"), this.bindEvent()
        };
    h.prototype.isNotRenameByPaths = function(e) {
        var i = !1;
        return this.canNotRenameMap[e] && (i = !0), i
    }, h.prototype.flagExists = function() {
        return "block" === this.$newDirDom.css("display")
    }, h.prototype.isTypeList = function() {
        return "block" === this.$container.find(".list-view-container").css("display")
    }, h.prototype.focus = function(e) {
        e && this.$box.val(s.trim(e));
        var i = s.trim(this.$box.val()),
            t = i.lastIndexOf(".");
        0 >= t && (t = i.length), c.setSelectionRange(this.$box[0], 0, t)
    }, h.prototype.initDom = function() {
        var e = l.dom();
        return this.$container.append(e), this.$container.find(".module-edit-name")
    }, h.prototype.bindEvent = function() {
        var e = this;
        this.$newDirDom.delegate("span", "click", function() {
            var i = s(this);
            return i.hasClass("sure") ? e.sure() : i.hasClass("cancel") && e.cancel(), !1
        }).delegate(".box", "keydown", function(i) {
            13 === i.keyCode ? e.sure() : 27 === i.keyCode && e.cancel()
        })
    }, h.prototype.cancel = function() {
        "function" == typeof this.config.cancelFunc && this.config.cancelFunc.call(null), this.hide()
    }, h.prototype.sure = function() {
        if (this.rename) {
            if (this.filename === s.trim(this.$box.val())) return void this.cancel();
            this.sendNewDir(this.path, s.trim(this.$box.val()))
        } else {
            var e = ("/" === this.parentPath ? "" : this.parentPath) + "/" + s.trim(this.$box.val());
            this.sendNewDir(e, s.trim(this.$box.val()))
        }
    }, h.prototype.sendSuccess = function(e, i) {
        "function" == typeof this.config.successFunc && this.config.successFunc.call(null, e, i), this.hide(i)
    }, h.prototype.sendNewDir = function(e, i) {
        var t = this;
        o.show({
            mode: "loading",
            msg: this.rename ? "正在重命名，请稍候&hellip;" : "正在创建文件夹，请稍候&hellip;",
            autoClose: !1
        });
        var s = this.rename ? a.reName : a.createNewDir;
        s.call(null, e, function(e, s, n) {
            if (1 === e) o.show({
                mode: "caution",
                msg: s
            }), t.focus();
            else {
                if (2 !== n.status && o.show({
                        mode: "success",
                        msg: s
                    }), t.rename) {
                    var a = n.list && n.list[0] || n.info && n.info[0];
                    if (2 === n.status) if (a.from) var c = a.from || i;
                    else var c = a.path || i;
                    else if (a.to) var c = a.to || i;
                    else var c = a.path || i;
                    i = c.substring(c.lastIndexOf("/") + 1)
                }
                t.sendSuccess(i, n)
            }
        }, i)
    }, h.prototype.show = function(e) {
        this.path = e.path;
        var i = "";
        return e.rename && this.isNotRenameByPaths(this.path) ? (i = "预置文件不可以重命名", o.show({
            mode: "caution",
            msg: i
        }), e.cancelFunc.call(null), !1) : (this.rename = e.rename, this.parentPath = n.parseFullDirFromPath(this.path), this.filename = n.parseDirFromPath(this.path), this.viewClassName = e.viewClassName, this.$newDirDom.addClass(this.viewClassName), this.config.cancelFunc = e.cancelFunc, this.config.successFunc = e.successFunc, this.cacheMod = e.cacheMod, e.position && this.$newDirDom.css(e.position), this.rename ? ("searchGlobal" == this.cacheMod ? this.$newDirDom.addClass("searchGlobal-edit-name-mode") : this.$newDirDom.removeClass("searchGlobal-edit-name-mode"), this.$container.addClass("module-edit-name-mode")) : this.$container.removeClass("module-edit-name-mode"), this.$newDirDom.show(), this.focus(this.filename), !0)
    }, h.prototype.hide = function(e) {
        if (this.viewClassName && this.$newDirDom.removeClass(this.viewClassName), this.$newDirDom.removeClass("searchGlobal-edit-name-mode"), e && !this.rename) {
            var i = e.path.substring(e.path.lastIndexOf("/") + 1),
                t = "-" === e.mtime ? e.mtime : r.parseDate(e.mtime);
            this.$newDirDomNode = this.isTypeList() ? this.$container.find('dd[_position="0"]') : this.$container.find('.grid-view-item[_position="0"]').eq(0), this.$newDirDomNode.find(".filename").attr("title", i).text(i), this.$newDirDomNode.find(".ctime").text(t), delete this.$newDirDomNode
        }
        this.$newDirDom.hide()
    };
    var l = {
        dom: function() {
            return ['<div class="module-edit-name">', '<div class="new-dir-item">', '<input node-type="new-dir-box" class="box" type="text" value="" />', '<span node-type="new-dir-sure" class="sure">', '<em class="icon border-icon">&#xe908;</em>', '<em class="icon checksmall-icon">&#xe937;</em>', "</span>", '<span node-type="new-dir-cancel" class="cancel">', '<em class="icon border-icon">&#xe908;</em>', '<em class="icon rename-cancel-icon">&#xe93a;</em>', "</span>", "</div>", "</div>"].join("")
        }
    };
    t.exports = h
});;
define("disk-system:widget/system/fileService/fileDelete/fileDelete.js", function(e, t, i) {
    var n = e("disk-system:widget/system/fileService/fileManagerApi/fileManagerApi.js"),
        s = e("system-core:context/context.js").instanceForSystem,
        r = {},
        o = function(e, t, i) {
            r.conf.paths = e, r.conf.callback = t, r.conf.sync = i;
            var n = "",
                o = r.isNotDeleteByPaths(e);
            if (o) return n = "预置文件不可以删除", s.ui.tip({
                mode: "caution",
                msg: n
            }), void t.call(null, 1, n);
            var a = s.ui.confirm({
                title: "确认删除",
                width: "460px",
                body: r.getTip(e),
                extra: u.getExtra(),
                onSure: function() {
                    a.hide(), r.doDelete(r.conf.paths, r.conf.callback, r.conf.sync)
                },
                onCancel: function() {
                    a.hide()
                }
            });
            a.topShow()
        },
        a = function(e) {
            return !e instanceof Array && (e = [e]), r.isNotDeleteByPaths(e)
        },
        c = {
            "/apps": !0
        },
        r = {
            conf: {},
            defaultFunc: function() {},
            getPartFileTipByPath: function(e) {
                var t = "",
                    i = "你选择的文件包含第三方应用文件，";
                return e += "/", -1 !== e.indexOf("/apps/联通冲印/") ? t = i + "删除后将导致联通冲印服务读取数据异常" : -1 !== e.indexOf("/apps/album/") ? t = "你选择的文件包含百度相册中的文件，删除后百度相册中的文件也将同步删除" : -1 !== e.indexOf("/我的分享/") ? t = "该文件已经分享给你的朋友们了，删除后将无法再被查看" : -1 !== e.indexOf("/apps/") && (t = i + "删除后该应用中的文件也将同步被删除"), t
            },
            getPartFileTipByPaths: function(e) {
                for (var t = "", i = 0, n = e.length; n > i && !(t = r.getPartFileTipByPath(e[i])); i++);
                return t
            },
            getTip: function(e) {
                var t = r.getPartFileTipByPaths(e),
                    i = "";
                return i = t ? t + "<br/>是否继续？" : "确认要把所选文件放入回收站吗？<br/>", i + u.middleText
            },
            isNotDeleteByPaths: function(e) {
                for (var t = !1, i = 0, n = e.length; n > i; i++) if (c[e[i]]) {
                    t = !0;
                    break
                }
                return t
            },
            reportUser: function(e) {
                $.getJSON("/api/report/user?action=sapi_auth", function(t) {
                    $.isFunction(e) && e(t)
                })
            },
            doDelete: function(t, i, o) {
                var a = this;
                n.deleteFiles(t, function(t, n, o) {
                    0 === t ? (s.ui.tip({
                        mode: "success",
                        msg: n
                    }), i.call(null, 0, n, o)) : 132 === t ? (s.ui.tip({
                        mode: "caution",
                        msg: n
                    }), e.async("base:widget/passAPI/passAPI.js", function(e) {
                        e.promiseForceverify.done(function() {
                            e.passAPI.PassportForceInit.netdiskForceVerify(), e.passAPI.PassForceverify.onSubmitFailure = function() {}, e.passAPI.PassForceverify.onSubmitSuccess = function() {
                                a.reportUser(function(e) {
                                    e && 0 === e.errno ? setTimeout(function() {
                                        r.doDelete(r.conf.paths, r.conf.callback, r.conf.sync)
                                    }, 300) : s.ui.tip({
                                        mode: "caution",
                                        msg: "验证失败，请稍后重试！"
                                    })
                                })
                            }
                        })
                    })) : i.call(null, 1, n, o)
                }, o)
            }
        },
        u = {
            middleText: "",
            extra: "<div class='dialog-extra-body'><button onclick='javascript:window.open(\"/buy/center?tag=8&form=deletefile\",\"_blank\");' class='extra-button' title='立即开通'>立即开通</button><em class='extra-picture'></em>开通超级会员，立享回收站文件30天保存期限</div>",
            memberStatus: [10, 15, 30],
            MemberType: {
                NOT_MEMBER: 0,
                ORDINARY_MEMBER: 1,
                SUPER_MEMBER: 2
            },
            isSuperMember: !1,
            getMemberLevel: function() {
                return "1" === String(window.yunData.ISSVIP) ? this.MemberType.SUPER_MEMBER : window.yunData.ISVIP || 0
            },
            init: function() {
                var e = this.getMemberLevel(),
                    t = this.memberStatus[e];
                this.middleText = "删除的文件可在" + t + "天内通过回收站还原", this.isSuperMember = this.getMemberLevel() === this.MemberType.SUPER_MEMBER
            },
            getExtra: function() {
                return this.isSuperMember ? "" : this.extra
            }
        };
    u.init(), i.exports = {
        deleteFiles: o,
        canDelete: a
    }
});;
define("disk-system:widget/system/fileService/fileMoveCopy/fileMoveCopy.js", function(e, t, i) {
    var a = e("system-core:context/context.js").instanceForSystem,
        n = e("disk-system:widget/system/fileService/asynFileManager/asynFileManager.js"),
        o = e("system-core:system/baseService/message/message.js"),
        s = "",
        r = e("base:widget/storage/storage.js"),
        l = function(e) {
            n.tiping = e
        };
    a.extend({
        ui: {
            treeDialog: function(t) {
                e.async("disk-system:widget/system/uiService/fileTreeDialog/fileTreeDialog.js", function(e) {
                    t === !1 ? e.hide() : e.show(t)
                }), window.yunHeader && window.yunHeader.fontIe && window.yunHeader.fontIe.api && window.yunHeader.fontIe.api.doAddIcon()
            }
        }
    });
    var c = {
            "/apps": !0
        },
        u = function(e, t) {
            var i, n, o, s, r = 0,
                l = [];
            for (r; r < e.length; r++) if (i = e[r], n = i.path, o = a.tools.baseService.parseFullDirFromPath(n) || "/", s = 1 === parseInt(i.isdir, 10), s && t !== n && 0 !== (t + "/").indexOf(n + "/") && o !== t || !s && o !== t) l[l.length] = {
                path: e[r].path,
                dest: t,
                newname: a.tools.baseService.parseDirFromPath(e[r].path)
            };
            else if (s) {
                l = [];
                break
            }
            return l
        },
        f = function(e, t, i, s, r) {
            var l, c;
            return "copy" === e ? (l = "复制", c = n.copyFiles) : "move" === e && (l = "移动", c = n.moveFiles), t.length <= 0 ? (a.ui.tip({
                mode: "caution",
                msg: "不能将文件" + l + "到自身或其子目录下"
            }), !1) : void c.call(null, t, i, function(t, a, n, l, c) {
                1 === t ? (o.trigger("quota-change"), s.call(null, e, i, c)) : r.call(null, e, i)
            })
        },
        g = {
            copy: "复制到",
            move: "移动到"
        };
    i.exports = {
        showDialog: function(e, t, i, n) {
            var o = {
                title: g[t],
                confirm: function(o) {
                    a.ui.treeDialog(!1);
                    var s = u(e, o);
                    f(t, s, o, i, n)
                }
            };
            a.ui.treeDialog(o)
        },
        moveTo: function(e, t, i, a) {
            var n = u(e, t);
            f("move", n, t, i, a)
        },
        isNotMoveByPaths: function(e) {
            for (var t = !1, i = 0, a = e.length; a > i; i++) if (c[e[i].path]) {
                t = !0;
                break
            }
            return t
        },
        manageStatus: function() {
            var e = !1,
                t = !! r.getItem("asynfilemanager_" + (yunData.MYNAME || "").replace(/@/g, ""));
            return t ? (s && clearTimeout(s), l(!0), s = setTimeout(function() {
                l(!1)
            }, 2e3), a.ui.tip({
                mode: "caution",
                msg: "当前还有未完成的任务，需完成后才能操作"
            }), e = !0) : e = !1, e
        },
        resolveHasTask: n.resolveHasTask
    }
});;
define("disk-system:widget/pageModule/list/list-view-empty/list-view-empty.js", function(e, o, t) {
    var d = e("base:widget/libs/jquerypacket.js"),
        s = e("base:widget/hash/hash.js"),
        i = e("system-core:context/context.js").instanceForSystem,
        n = {
            dom: {
                module: "div.module-list",
                searchEmptyModule: "div.empty-search-container",
                viewEmptyModule: "div.module-list-view-empty",
                noResultTcode: ".no-result-download-phone",
                noResultTcodePic: 'div[node-type~="no-result-twocode-pic"]',
                noResultTcodeClose: 'a[node-type~="no-result-twocode-close"]',
                newDirBox: 'input[node-type~="new-dir-box"]',
                newDir: 'div[node-type~="new-dir"]',
                upLoad: ".no-result-file-word .up-load",
                swfUpload: ".swfupload",
                iconSpeed: ".icon-speed"
            },
            bindEvent: function() {
                var e = d(n.dom.module);
                e.delegate(n.dom.noResultTcode, "mouseover", function() {
                    d(n.dom.noResultTcodePic).show()
                }), e.delegate(n.dom.noResultTcode, "mouseout", function() {
                    d(n.dom.noResultTcodePic).hide()
                })
            },
            tmpl: {
                emptyViewContainer: '<div class="clearfix module-list-view-empty" style="" node-type="module"><div node-type="new-dir" class="item global-clearfix" style="display: none;"><div class="col c1" style="width: 60%;"><span class="chk"><span class="chk-ico"></span></span><span class="ico global-icon-16 global-icon-16-dir"></span><div class="edit-name" style="display: block;"><input node-type="new-dir-box" class="box" type="text" value=""><span node-type="new-dir-sure" class="sure"></span><span node-type="new-dir-cancel" class="cancel"></span></div></div><div class="col" style="width: 16%">-</div><div class="col" style="width: 23%">-</div></div><div class="no-result-file-download"><div class="no-result-title no-result-file-bottom"><p class="no-result-file-word">您还没上传过文件哦，点击<span class="up-load">上传</span>按钮～</p></div><div class="empty-down-area"><div class="other-app"><div class="hr"></div><span>您还可以下载百度网盘其它客户端</span></div><a hidefocus="true" class="no-result-download-ipad" href="http://pan.baidu.com/download#ipad" target="_blank">iPad版下载</a><a hidefocus="true" class="no-result-download-phone" href="http://pan.baidu.com/download#android" target="_blank">手机版下载</a><a hidefocus="true" class="no-result-download-pc" href="http://pan.baidu.com/download" target="_blank">PC版下载</a></div><div class="no-result-file-twocode" node-type="no-result-twocode-pic"></div></div></div>',
                emptySearchContainer: '<div class="empty-search-container"><div class="search-empty-box"><div class="search-empty-text"><i class="search-little-icon"></i><p>你的网盘中，没有找到相应内容</p></div></div></div>'
            },
            util: {
                render: function() {
                    d(n.tmpl.emptyViewContainer).appendTo(n.dom.module), d(n.tmpl.emptySearchContainer).appendTo(n.dom.module)
                }
            },
            init: function() {
                n.bindEvent()
            }
        };
    d(document).ready(function() {
        n.init()
    });
    var l = {
        emptyView: function() {
            setTimeout(function() {
                i.message.callPlugin("上传@com.baidu.pan", {
                    button: d("p.no-result-file-word .up-load").get(0),
                    mode: "directory",
                    usdDialog: !0
                }), d(document).on("mouseover", "p.no-result-file-word .up-load", function() {
                    d(this).attr({
                        title: ""
                    }).css({
                        cursor: "pointer"
                    })
                }), d(document).on("click", "p.no-result-file-word .up-load", function() {
                    d(this).attr("title", ""), (d(n.dom.iconSpeed).length > 0 || d(n.dom.swfUpload).length > 0) && i.ui.tip({
                        mode: "caution",
                        msg: "请点击左上角“上传”按钮"
                    })
                })
            }, 500);
            var e = s.get("search/key") || s.get("search/vmode") && s.get("key");
            return e ? n.tmpl.emptySearchContainer : n.tmpl.emptyViewContainer
        }
    };
    t.exports = l
});;
define("disk-system:widget/pageModule/list/fileSystem/fileSystem.js", function(e, r, t) {
    var n = e("base:widget/libs/jquerypacket.js"),
        i = e("base:widget/tools/tools.js"),
        o = e("disk-system:widget/data/yunData.js").get(),
        a = e("system-core:context/context.js").instanceForSystem,
        s = e("base:widget/storage/storage.js"),
        u = {
            name: "FileSystem",
            version: 1,
            db: null,
            isAvailable: !1,
            isOpen: !1,
            ajaxApi: "/api/filediff",
            throttleTime: 100,
            syncTime: 3e5,
            fileLimit: 4e4
        },
        c = {
            fileList: "fileList",
            cursor: "cursor",
            owner: "owner"
        },
        l = {
            path: ["path", ["parent_path", "isdir", "server_mtime"],
                {
                    unique: !1
                }],
            pathAndFileName: ["pathAndFileName", ["parent_path", "isdir", "server_filename"],
                {
                    unique: !1
                }],
            pathAndSize: ["pathAndSize", ["parent_path", "isdir", "size"],
                {
                    unique: !1
                }],
            category: ["category", ["category", "isdir", "server_mtime"],
                {
                    unique: !1
                }],
            categoryAndFileName: ["categoryAndFileName", ["category", "isdir", "server_filename"],
                {
                    unique: !1
                }],
            categoryAndSize: ["categoryAndSize", ["category", "isdir", "size"],
                {
                    unique: !1
                }]
        },
        f = function(e, r, t) {
            return new Promise(function(n, i) {
                r ? e[r] = function(e) {
                    n(e)
                } : e.onsuccess = function(e) {
                    n(e)
                }, t ? e[t] = function(e) {
                    i(e)
                } : e.onerror = function(e) {
                    i(e)
                }
            })
        },
        d = function(e, r) {
            var t = indexedDB.open(e, r);
            return t.onupgradeneeded = function(e) {
                var r, t = e.target.result,
                    n = e.target.transaction;
                r = t.objectStoreNames.contains(c.fileList) ? n.objectStore(c.fileList) : t.createObjectStore(c.fileList, {
                    keyPath: "path"
                });
                for (var i in l) l.hasOwnProperty(i) && !r.indexNames.contains(i) && r.createIndex.apply(r, l[i]);
                t.objectStoreNames.contains(c.cursor) || t.createObjectStore(c.cursor, {
                    keyPath: "cursor"
                }), t.objectStoreNames.contains(c.owner) || t.createObjectStore(c.owner, {
                    keyPath: "uk"
                })
            }, f(t)
        },
        m = function(e) {
            var r = e.lastIndexOf("/");
            return r > 0 ? e.slice(0, r) : "/"
        },
        p = function(e, r) {
            var t = u.db.transaction(e, "readwrite"),
                n = t.objectStore(e);
            for (var i in r) if (r.hasOwnProperty(i)) {
                var o = r[i];
                o.path && (o.parent_path = m(o.path)), o.isdelete ? n["delete"](o.path) : n.put(o)
            }
            return f(t, "oncomplete")
        },
        v = function(e) {
            var r = u.db.transaction(e, "readonly"),
                t = r.objectStore(e),
                n = t.openCursor();
            return f(n)
        },
        h = function(e) {
            var r = u.db.transaction(e, "readonly"),
                t = r.objectStore(e),
                n = t.count();
            return f(n)
        },
        g = function(e) {
            var r = u.db.transaction(e, "readwrite"),
                t = r.objectStore(e),
                n = t.clear();
            return f(n)
        },
        y = function(e, r) {
            return g(e).then(function() {
                return p(e, r)
            })
        },
        b = function() {
            return v(c.owner).then(function(e) {
                var r = e.target.result;
                return r && r.value.uk === o.uk ? void 0 : Promise.all([g(c.fileList), g(c.cursor)])
            }).then(function() {
                return y(c.owner, {
                    uk: {
                        uk: o.uk
                    }
                })
            })
        },
        S = function(e, r) {
            return new Promise(function(t, i) {
                n.getJSON(e, r, function(e) {
                    e && 0 === e.errno ? t(e) : i(e)
                }).error(function(e) {
                    i(e)
                })
            })
        },
        A = !0,
        j = i.throttle(function() {
            u.isAvailable || localStorage.getItem("block_uk_" + o.uk) || h(c.fileList).then(function(e) {
                var r = e.target.result;
                return r > u.fileLimit ? (localStorage.setItem("block_uk_" + o.uk, 1), indexedDB.deleteDatabase("FileSystem"), Promise.reject(r)) : Promise.resolve(r)
            }).then(function() {
                return v(c.cursor)
            }).then(function(e) {
                var r = {
                        cursor: "null"
                    },
                    t = e.target.result;
                if (t) r.cursor = t.value.cursor;
                else {
                    if (!A) return Promise.reject(!1);
                    A = !1
                }
                return a.log.send({
                    name: "filediff",
                    sendServerLog: !1
                }), S(u.ajaxApi, r)
            }).then(function(e) {
                var r = Promise.resolve(!0);
                return e.reset && (r = g(c.fileList)), r.then(function() {
                    return Promise.resolve(e)
                })
            }).then(function(e) {
                return Promise.all([p(c.fileList, e.entries), y(c.cursor, {
                    cursor: {
                        cursor: e.cursor
                    }
                })]).then(function() {
                    return Promise.resolve(e)
                })
            }).then(function(e) {
                e.has_more ? j() : (u.isAvailable = !0, C())
            }, function() {})
        }, u.throttleTime, u.throttleTime),
        _ = function() {
            return "object" != typeof indexedDB ? !1 : "function" != typeof Promise ? !1 : "yun.baidu.com" === location.hostname ? !1 : navigator.userAgent.indexOf("Edge") > -1 ? !1 : s.overwrite && !s.indexedDBCall ? !1 : !0
        },
        P = function() {
            _() && d(u.name, u.version).then(function(e) {
                u.db = e.target.result, u.isOpen = !0
            }, function() {
                u.isOpen = !1, u.isAvailable = !1
            }).then(function() {
                return b()
            }).then(function() {
                j()
            }, function() {})
        },
        w = function(e, r) {
            var t = u.db.transaction(c.fileList, "readonly"),
                n = t.objectStore(c.fileList),
                i = n.index(e),
                o = i.openCursor(r, "next");
            return new Promise(function(e, r) {
                var t = [];
                o.onsuccess = function(r) {
                    var n = r.target.result;
                    n ? (t.push(n.value), n["continue"]()) : e(t)
                }, o.onerror = function(e) {
                    r(e)
                }
            })
        },
        k = function(e, r) {
            var t = u.db.transaction(c.fileList, "readonly"),
                n = t.objectStore(c.fileList),
                i = n.index(e),
                o = i.count(IDBKeyRange.bound([r, 1, -1 / 0], [r, 1, String.fromCharCode(65535)]));
            return f(o).then(function(e) {
                return Promise.resolve(e.target.result)
            })
        },
        x = function(e, r) {
            return e && r ? e[0] === r[0] ? x(e.slice(1), r.slice(1)) : /[a-zA-Z]/.test(e[0]) && /[a-zA-Z]/.test(r[0]) || /\W/.test(e[0]) && /\W/.test(r[0]) ? e[0].localeCompare(r[0]) : indexedDB.cmp(e[0], r[0]) : e.localeCompare(r)
        },
        z = function(e) {
            var r = function(e) {
                var r = 100,
                    t = location.protocol + "//pcs.baidu.com/rest/2.0/pcs/thumbnail?method=generate&app_id=250528",
                    n = {
                        path: e,
                        quality: r
                    };
                for (var i in n) if (n.hasOwnProperty(i)) {
                    var o = encodeURIComponent(n[i]);
                    t += "&" + i + "=" + o
                }
                return t
            };
            if ("[object Array]" === Object.prototype.toString.call(e)) for (var t = e.length, n = 0; t > n; n++) if (e[n].category && (1 === e[n].category || 3 === e[n].category) && e[n].path) {
                var i = r(e[n].path);
                e[n].thumbs = {
                    icon: i + "&size=c60_u60",
                    url1: i + "&size=c140_u90",
                    url2: i + "&size=c360_u270",
                    url3: i + "&size=c850_u580"
                }
            }
            return e
        },
        L = {
            "/api/list": function(e, r) {
                var t = l.path[0];
                t = "name" === r.order ? l.pathAndFileName[0] : "size" === r.order ? l.pathAndSize[0] : l.path[0];
                var n = [w(t, IDBKeyRange.bound([r.dir, 1, -1 / 0], [r.dir, 1, String.fromCharCode(65535)]))];
                return r.folder || n.push(w(t, IDBKeyRange.bound([r.dir, 0, -1 / 0], [r.dir, 0, String.fromCharCode(65535)]))), Promise.all(n).then(function(e) {
                    var n = [],
                        i = [];
                    n = e[0], e.length > 1 && (i = e[1]), "name" === r.order && (n.sort(function(e, r) {
                        return x(e.server_filename, r.server_filename)
                    }), i.sort(function(e, r) {
                        return x(e.server_filename, r.server_filename)
                    })), r.desc ? (n.reverse(), i.reverse()) : "size" === r.order && n.reverse();
                    var o = [0];
                    if (r.folder) for (var a = 0; a < n.length; a++) {
                        var s = n[a];
                        o.push(k(t, s.path))
                    }
                    return Promise.all(o).then(function(e) {
                        for (var t = 1; t < e.length; t++) n[t - 1].dir_empty = e[t] > 0 ? 0 : 1;
                        var o = n.concat(i);
                        return r.page && r.page > 1 && (o = o.slice((r.page - 1) * r.num + 1)), o = z(o), Promise.resolve({
                            errno: 0,
                            list: o,
                            has_more: !1
                        })
                    })
                })
            },
            "/api/categorylist": function(e, r) {
                var t = l.category[0];
                return t = "name" === r.order ? l.categoryAndFileName[0] : "size" === r.order ? l.categoryAndSize[0] : l.category[0], w(t, IDBKeyRange.bound([parseInt(r.category, 10), 0, -1 / 0], [parseInt(r.category, 10), 0, String.fromCharCode(65535)])).then(function(e) {
                    var t = e;
                    return "name" === r.order && t.sort(function(e, r) {
                        return x(e.server_filename, r.server_filename)
                    }), r.desc && t.reverse(), r.page && r.page > 1 && (t = t.slice((r.page - 1) * r.num + 1)), t = z(t), Promise.resolve({
                        errno: 0,
                        info: t,
                        has_more: !1
                    })
                })
            }
        },
        C = i.throttle(function() {
            j()
        }, u.syncTime, u.syncTime),
        O = {
            isAvailable: function() {
                return u.isAvailable && u.isOpen
            },
            invalidCache: function() {
                O.isAvailable() && C(), u.isAvailable = !1
            },
            hasApi: function(e) {
                return O.isAvailable() && L.hasOwnProperty(e)
            },
            getApi: function(e, r) {
                return O.hasApi(e) ? L[e](e, r) : Promise.reject({})
            }
        };
    P(), t.exports = O
});;
define("disk-system:widget/pageModule/list/listInit.js", function(e, t, i) {
    var a = e("base:widget/libs/jquerypacket.js"),
        n = e("system-core:context/context.js"),
        r = e("disk-system:widget/pageModule/list/list-view/list-view-builder.js"),
        s = e("disk-system:widget/pageModule/list/grid-view/grid-view-builder.js"),
        o = e("system-core:system/cache/listCache/cacheManage.js"),
        c = e("disk-system:widget/system/fileService/createNewDir/createNewDir.js"),
        l = e("disk-system:widget/system/fileService/fileDelete/fileDelete.js"),
        d = e("disk-system:widget/system/fileService/fileMoveCopy/fileMoveCopy.js"),
        u = (e("system-core:data/faceData.js").getData(), e("system-core:system/baseService/message/message.js")),
        m = e("base:widget/historyManager/historyManager.js"),
        h = e("base:widget/tools/tools.js"),
        g = e("base:widget/storage/storage.js"),
        f = e("disk-system:widget/pageModule/list/list-view-empty/list-view-empty.js"),
        v = (e("disk-system:widget/system/uiRender/buttonBox/buttonBox.js"), e("disk-system:widget/pageModule/list/fileSystem/fileSystem.js")),
        y = "list",
        p = "dir",
        w = "category",
        C = "search",
        k = ".module-list",
        b = "module-list-multselected",
        S = {
            listViewContainer: ".list-view",
            gridViewContainer: ".grid-view",
            listViewItem: ".list-view-item",
            gridViewItem: ".grid-view-item"
        },
        P = a(k),
        I = !0,
        B = 0,
        F = function() {
            var e = {
                defaultViewModle: y
            };
            location.search.match(/panLoginType=qrcode/) && n.instanceForSystem.log.send({
                name: "login_qrcode",
                type: "pan_login_qrcode_success"
            }), e.historyConfig = _(), e.listConfig = D(), e.listViewBuilder = V(), e.gridConfig = L(), e.gridViewBuilder = A();
            var t = n.instanceForSystem.ui.list(k, e);
            n.setList(t);
            var i = a(window).height() - P.offset().top;
            return t.resizeScrollBar(i), t
        },
        M = {
            3: "全部图片",
            2: "全部音乐",
            4: "全部文档",
            1: "全部视频",
            7: "全部种子",
            6: "其它文件"
        },
        _ = function() {
            var e = {};
            return e
        },
        D = function() {
            var e = {
                defaultScroll: !0
            };
            return e
        },
        V = function() {
            return r
        },
        L = function() {
            var e = {
                defaultScroll: !0,
                columnWidth: 128
            };
            return e
        },
        A = function() {
            return s
        },
        x = F();
    x.onListOrderChange = function(e, t) {
        var i = "localorder_" + (yunData.MYNAME || "").replace(/@/g, "");
        if (e) {
            var a = e + "_" + t;
            "undefined" != typeof g && g.setItem(i, a), n.instanceForSystem.log.send({
                type: "listHeaderOrder_" + e,
                name: "listHeaderOrder",
                value: e
            }), n.instanceForSystem.toolbar.setSortSelect({
                item: e,
                desc: t
            })
        } else if ("undefined" != typeof g && "function" == typeof g.getItem) {
            var r, a = g.getItem(i),
                s = m.getCurrentParams();
            if ("undefined" != typeof s && "3" === s.type) return null;
            if (a && 2 === (r = a.split("_")).length) {
                var r = a.split("_"),
                    o = parseInt(r[1], 10),
                    c = {
                        item: r[0],
                        desc: o
                    };
                return n.instanceForSystem.toolbar.setSortSelect(c), c
            }
            return null
        }
    };
    var E = function(e) {
            var t = !0,
                i = !1,
                a = "caution",
                r = "";
            if (!e || -1 !== e.errno && 20 !== e.errno) {
                if (e && e.errno) {
                    var s = e.errno,
                        o = n.instanceForSystem.accountBan(s);
                    if (o.isBan) return x.updateLoadingTips(2, 0), x.listEmptyTip(x.$emptyTips), !1;
                    r = n.instanceForSystem.errorMsg(e.errno) || "网络错误，请稍候重试"
                }
            } else r = '由于您的帐号存在违规行为，帐号已被封禁。<a href="http://help.baidu.com/add?prod_id=48">申诉</a>';
            n.instanceForSystem.ui.tip({
                msg: r,
                mode: a,
                autoClose: i,
                hasClose: t
            }), x.updateLoadingTips(2, 0), x.updateListLoading(3)
        },
        T = function() {
            var e, t, i = x.onListOrderChange();
            i && (e = i.item, t = "number" == typeof i.desc ? i.desc : 1);
            var a = {
                api: "/api/list",
                params: {
                    order: e || "time",
                    desc: void 0 !== t ? t : 1,
                    showempty: 0,
                    web: 1
                },
                limit: 100,
                currentPage: 0,
                listKey: "list",
                fileSystem: v,
                getParamsBykey: function(e) {
                    return {
                        dir: e
                    }
                },
                getPageParams: function(e, t) {
                    return {
                        page: e + 1,
                        num: t
                    }
                },
                getKeyByParams: function(e) {
                    return e.dir
                },
                failCallBack: function(e, t) {
                    E(e, t)
                }
            };
            return a
        },
        j = function() {
            var e, t, i = x.onListOrderChange();
            i && (e = i.item, t = "number" == typeof i.desc ? i.desc : 1);
            var a = {
                api: "/api/categorylist",
                params: {
                    order: e || "time",
                    desc: void 0 !== t ? t : 1,
                    showempty: 0,
                    web: 1
                },
                limit: 100,
                currentPage: 0,
                listKey: "info",
                fileSystem: v,
                getParamsBykey: function(e) {
                    return {
                        category: e
                    }
                },
                getPageParams: function(e, t) {
                    return {
                        page: e + 1,
                        num: t
                    }
                },
                getKeyByParams: function(e) {
                    return e.category
                },
                failCallBack: function(e, t) {
                    E(e, t)
                }
            };
            return a
        },
        H = function() {
            var e = {
                api: "/api/search",
                params: {
                    recursion: 1,
                    order: "time",
                    desc: 1,
                    showempty: 0,
                    web: 1
                },
                limit: 100,
                currentPage: 0,
                listKey: "list",
                getParamsBykey: function(e) {
                    return {
                        key: e
                    }
                },
                getPageParams: function(e, t) {
                    return {
                        page: e + 1,
                        num: t
                    }
                },
                getKeyByParams: function(e) {
                    return e.key
                },
                failCallBack: function(e, t) {
                    E(e, t)
                }
            };
            return e
        },
        $ = function() {
            var e = {
                api: "/api/filemetas",
                params: {
                    recursion: 1,
                    order: "time",
                    desc: 1,
                    showempty: 0,
                    web: 1
                },
                limit: 100,
                currentPage: 0,
                listKey: "info",
                getParamsBykey: function(e) {
                    return {
                        target: a.stringify([e])
                    }
                },
                getPageParams: function(e, t) {
                    return {
                        page: e + 1,
                        num: t
                    }
                },
                getKeyByParams: function(e) {
                    return e.target
                },
                failCallBack: function(e, t) {
                    E(e, t)
                }
            };
            return e
        },
        K = function() {
            var e = {
                api: "/api/textsearch",
                params: {
                    recursion: 1,
                    order: "time",
                    desc: 1,
                    showempty: 0,
                    web: 1
                },
                limit: 100,
                currentPage: 0,
                listKey: "list",
                getParamsBykey: function(e) {
                    return {
                        key: e
                    }
                },
                getPageParams: function(e, t) {
                    return {
                        start: e * t,
                        limit: t
                    }
                },
                getKeyByParams: function(e) {
                    return e.key
                },
                failCallBack: function(e, t) {
                    E(e, t)
                }
            };
            return e
        },
        N = m.getDefault(),
        O = new o("list", T(), ""),
        G = new o("category", j(), ""),
        Y = new o("searchPath", $(), ""),
        R = new o("searchGlobal", K(), ""),
        z = new o("search", H(), "");
    u.listen("system-show-view-mode", function(e) {
        return x.isLocked() ? void(e.returnValue = !1) : (u.trigger("system-change-view-mode-loadingtip"), void Pt(e.type))
    }), u.listen("header-search", function(e) {
        e += "", e ? St(e) : bt(["/"])
    }), x.onViewModuleChange = function(e) {
        u.trigger("system-update-view-mode", {
            type: e
        }), x.listHeader.changeVmode({
            type: e
        })
    };
    var q = new c(k),
        W = function() {
            (new Date).getTime();
            if (q.flagExists()) return void q.focus();
            var e = {
                path: "/-",
                server_filename: "-",
                isdir: 1,
                server_mtime: "-"
            };
            x.setItemsChecked(!1, !0), x.cache.addDataBefore(e), x.refreshList();
            var t = x.cache.getKey(),
                i = t,
                a = x.cache.cacheName;
            t = "/" === t ? "" : t, t += "/新建文件夹", et.flagAdding = !0;
            var r = {
                viewClassName: x.isGridMode() ? "module-edit-name-grid new-dir" : "",
                path: t,
                position: {
                    left: x.isGridMode() ? -3 : 20,
                    top: x.isGridMode() ? 54 : 58
                },
                successFunc: function(e, t) {
                    Q(a, i, t)
                },
                cancelFunc: function() {
                    J()
                }
            };
            q.show(r), x.lock(!0);
            var s = (new Date).getTime();
            n.instanceForSystem.log.send({
                name: "listInsertItem",
                value: s - s
            })
        },
        J = function() {
            et.flagAdding = !1, x.lock(!1), x.cache.removeByIndex(0), x.refreshList()
        },
        Q = function(e, t, i) {
            et.flagAdding = !1, x.lock(!1), x.setItemsChecked(!1, !0), o.replaceSingleCache(e, t, i)
        };
    u.listen("system-newdir", function() {
        W()
    });
    var U = function() {
            et.flagEditing = !1, x.lock(!1), x.setItemsChecked(!1);
            var e = Mt.deleteCacheByMode(ot, x.cache, []);
            x.getCurrentView().updateBackedData(e.list)
        },
        X = function() {
            et.flagEditing = !1, x.lock(!1)
        },
        Z = function(e, t) {
            if (q.flagExists()) return void q.focus();
            et.flagEditing = !0;
            var i = e.path,
                a = {
                    rename: !0,
                    viewClassName: x.isGridMode() ? "module-edit-name-grid" : "",
                    path: e.path,
                    position: t,
                    successFunc: function(t) {
                        var a = h.parseFullDirFromPath(e.path),
                            n = a + "/" + t;
                        e.path = n;
                        var r = !1;
                        e.server_filename && t && e.server_filename.lastIndexOf(".") !== t.lastIndexOf(".") && (r = !0), e.server_filename = t, e.highlighting && e.highlighting.filename && (e.highlighting.filename = t), U(e, i, a, r)
                    },
                    cancelFunc: function() {
                        X()
                    },
                    cacheMod: x.cache.cacheName
                },
                n = q.show(a);
            n && x.lock(!0)
        },
        et = {
            flagEditing: !1,
            flagAdding: !1
        };
    u.listen("system-rename", function(e) {
        var t = d.manageStatus();
        if (!t && !x.isLocked()) {
            var i = e.position,
                n = e.list;
            if (!i) {
                var r = x.getCheckedItems();
                r.length === n.length && n[0] === x.getCheckedItems()[0] && (i = x.getCheckedIndexs())
            }
            if (i && i.length > 0) {
                x.fixTargetPositionVisible(i[0]);
                var s = x.getDomByPosition(i[0]);
                if (!s) return;
                var o = P.offset(),
                    c = a(s).offset(),
                    l = c.left - o.left + 20,
                    u = c.top - o.top;
                x.isGridMode() && (u -= 7, l -= 34), Z(n[0], {
                    left: l,
                    top: u
                })
            }
        }
    });
    var tt = function(e) {
        var t, i = e && e.path;
        "undefined" != typeof e && e.all === !0 ? Mt.removeCacheAll() : e && e.flagChangeSuffix || ("undefined" != typeof i && (i = i || "/", Mt.removeCache(i)), ot === y ? (t = m.getCurrentParams(), i = t.path || "/", i && Mt.removeCache(i)) : ot === w ? Mt.removeCategoryCache() : ot === C && Mt.removeSearchCache()), x.setItemsChecked(!1, !0), x.refreshList()
    };
    u.listen("system-refresh", function(e) {
        tt(e)
    });
    var it = function(e, t, i) {
        for (var a = [], n = 0, r = e.length; r > n; n++) a.push(e[n].path);
        t instanceof Array || (t = x.cache.getIndexsByFiles(e)), l.deleteFiles(a, function(t, a, n) {
            if (0 === t) {
                var n = Mt.deleteCacheByMode(ot, x.cache, e);
                x.setItemsChecked(!1, !0), x.updateLoadingTips(n.hasMore ? 1 : 2, n.list.length), x.getCurrentView().updateBackedData(n.list)
            }
            "function" == typeof i && i.call(null, t, a)
        })
    };
    u.listen("system-delete", function(e) {
        var t = d.manageStatus();
        if (!t && !x.isLocked()) {
            var i = e.list;
            i && i.length > 0 && it(i, x.getCheckedIndexs())
        }
    });
    var at = function(e) {
            if ("move" === e) {
                var t = Mt.deleteCacheByMode(ot, x.cache, rt);
                x.setItemsChecked(!1, !0), x.updateLoadingTips(t.hasMore ? 1 : 2, t.list.length), x.getCurrentView().updateBackedData(t.list)
            } else var t = Mt.deleteCacheByMode(ot, x.cache, [])
        },
        nt = function() {},
        rt = [];
    u.listen("system-copy", function(e) {
        var t = d.manageStatus();
        if (!t && !x.isLocked()) {
            var i = e.list;
            rt = i, i && i.length > 0 && d.showDialog(i, "copy", at, nt)
        }
    }), u.listen("system-move", function(e) {
        var t = d.manageStatus();
        if (!t) {
            var i = d.isNotMoveByPaths(e.list);
            if (i) return void n.instanceForSystem.ui.tip({
                mode: "caution",
                msg: "预置文件不可以移动"
            });
            if (!x.isLocked()) {
                var a = e.list;
                rt = a, a && a.length > 0 && d.showDialog(a, "move", at, nt)
            }
        }
    }), x.onCheckeChanged = function(e) {
        e > 1 ? P.addClass(b) : P.removeClass(b)
    }, x.onLockChanged = function() {}, x.onLoadedCallBack = function(t) {
        function i(e, t, i) {
            a.getJSON("/api/report/user?action=sapi_auth&version=" + t + "&devuid=" + e, function(e) {
                a.isFunction(i) && i(e)
            })
        }
        I && (B = +new Date, I = !1, setTimeout(function() {
            "undefined" != typeof alog && "undefined" != typeof alog.fire && (alog("speed.set", "c_pd", B), alog.fire("mark"))
        }, 1500));
        var r = this.cache.cacheName;
        if ("searchPath" === r && a(x.getDomByPosition(0)).trigger("dblclick"), "searchGlobal" === r && 0 === t.length) {
            var s = m.getCurrentParams().key,
                o = this.cache.getCache();
            if (!(o && o[s] && o[s].list.length)) {
                ot = C;
                var s = m.getCurrentParams().key;
                if (x.changeCache(z), s += "") {
                    var c = ["", s],
                        l = ["全部文件", '搜索："' + s + '"'];
                    x.changeHistory(c, l)
                } else bt(["/"]);
                st()
            }
        }
        u.trigger("after-list-loaded"), "132" === h.getParam("msg") && e.async("base:widget/passAPI/passAPI.js", function(e) {
            e.promiseForceverify.done(function() {
                e.passAPI.PassportForceInit.netdiskForceVerify(), e.passAPI.PassForceverify.onSubmitFailure = function() {}, e.passAPI.PassForceverify.onSubmitSuccess = function() {
                    var e = h.getParam("devuid"),
                        t = h.getParam("version");
                    i(e, t, function(e) {
                        e && 0 === e.errno ? setTimeout(function() {
                            window.location.href = "/disk/home"
                        }, 300) : n.instanceForSystem.ui.tip({
                            mode: "caution",
                            msg: "验证失败，请稍后重试！"
                        })
                    })
                }
            })
        })
    }, x.mapFirstFileByCategory = function(e, t) {
        var i = null;
        if (e.length <= 0) return i;
        i = {};
        var n = x.getFirstPosition();
        if (0 > n) return i;
        for (var r, s, o = x.getDomByPosition(n), c = null; null !== o && e.length > 0;) {
            if (c = x.getElementDataByPosition(n), c && !c.isdir && c.server_filename && (r = h.getFileCategory(c.server_filename)) && r && (r = "." + r, !i[r] && (s = a.inArray(r, e)) >= 0 && (e.splice(s, 1), t.call(null, r, a(o))))) return;
            o = x.getDomByPosition(++n)
        }
    }, x.getIndexsByFiles = function(e) {
        return x.cache.getIndexsByFiles(e)
    }, x.remove = function(e, t) {
        it(e, null, t)
    }, x.removeCacheByPath = function(e) {
        Mt.removeCache(e)
    };
    var st = function() {
            V().clear(), A().clear()
        },
        ot = y,
        ct = function(e, t) {
            var i = m.buildHistory(e, t);
            N.addHistory(i)
        },
        lt = function(e, t) {
            var i = e.vmode;
            x.setViewModule("grid" === i ? "grid" : "list", t), n.instanceForSystem.toolbar.setSortAvailable(e && "search" === e.type ? !1 : !0), ht()
        },
        dt = function(e, t) {
            return u.trigger("system-change-toolbar", {
                module: x.cache.cacheName
            }), "category" === e && 3 === t ? void n.instanceForSystem.toolbar.showTimelineDom() : void n.instanceForSystem.toolbar.showDefault()
        },
        ut = function() {
            var e, t, i = x.onListOrderChange();
            i && (e = i.item, t = "number" == typeof i.desc ? i.desc : 1);
            var a = [{
                order: e || "time",
                desc: void 0 !== t ? t : 1,
                operateOrderKey: function() {},
                columns: [{
                    name: "文件名",
                    key: "name",
                    checkbox: !0,
                    width: 60
                }, {
                    name: "大小",
                    key: "size",
                    width: 16
                }, {
                    name: "修改日期",
                    key: "time",
                    width: 24
                }],
                module: ["list", "category"]
            }, {
                order: "time",
                desc: 1,
                columns: [{
                    name: "文件名",
                    key: "name",
                    checkbox: !0,
                    width: 60,
                    order: !1
                }, {
                    name: "大小",
                    key: "size",
                    width: 16,
                    order: !1
                }, {
                    name: "修改日期",
                    key: "time",
                    width: 13,
                    order: !1
                }, {
                    name: "所在目录",
                    key: "path-info",
                    width: 10,
                    order: !1
                }],
                module: ["searchPath", "searchGlobal", "search"]
            }];
            return a
        },
        mt = function(e) {
            for (var t = ut(), i = x.cache && x.cache.cacheName, n = e.cacheName, r = null, s = [], o = 0; o < t.length; o++) {
                if (r = t[o], s = r.module, -1 !== a.inArray(i, s) && -1 !== a.inArray(n, s) && "category" !== n) return;
                if (-1 != a.inArray(n, s)) return x.changeHeaderConfig(r), e.config.params.order = r.order, void(e.config.params.desc = r.desc)
            }
        },
        ht = function() {
            q && (et.flagEditing || et.flagAdding) && q.cancel()
        },
        gt = function(e) {
            V().clear();
            var t = e.path;
            "undefined" == typeof t && (t = ""), lt(e), pt(t), dt("list", t), st()
        },
        ft = function(e) {
            ct(y, e)
        },
        vt = function(e) {
            var t = e.type,
                i = parseInt(t, 10);
            lt(e), wt(i), dt("category", i), st()
        },
        yt = function(e) {
            var t = e.key,
                i = e.searchpath;
            u.trigger("header-search-val", t), e.type = "search", lt(e), i ? Ct(t, i) : kt(t), dt("search", t), st()
        },
        pt = function(e) {
            ot = y, mt(O), x.changeCache(O), "/" === e && (e = ""), /\S\/+$/.test(e) && (e = e.replace(/\/+$/, ""));
            var t = e.split("/"),
                i = t.slice();
            t[0] = "/", i[0] = "全部文件", x.changeHistory(t, i)
        },
        wt = function(e) {
            ot = w, mt(G), x.changeCache(G);
            var t = M[e];
            if (t) {
                var i = [e],
                    a = [t];
                x.changeHistory(i, a)
            } else bt(["/"])
        },
        Ct = function(e, t) {
            if (ot = C, mt(Y), x.changeCache(Y), e += "") {
                var i = ["", t],
                    a = ["全部文件", '搜索："' + e + '"'];
                x.changeHistory(i, a)
            } else bt(["/"])
        },
        kt = function(e) {
            if (ot = C, +yunData.ISYEARVIP ? (mt(R), x.changeCache(R)) : (mt(z), x.changeCache(z)), !+yunData.ISYEARVIP) var t = function(e) {
                return a('<div node-type="upload-bar" class="upload-bar global-clearfix search-toolbar"><a node-type="btn-close" href="javascript:void(0);" class="close"></a><span node-type="msg-text" class="text">成为<a class="vip-help" target="_blank" href="/buy/center?tag=4#FAQ_YEARVIP&amp;from=search" style="text-decoration: underline;" target="_blank">年费会员</a>，尊享全文检索特权，任意搜索office、pdf等文档里面的文字了！</span><a target="_blank"  class="g-button download" node-type="download-link" href="/buy/center?tag=1&usertype=' + e + '&from=search"><span class="g-button-right"><span class="text">购买年费会员</span></span></a></div>')
            };
            if (!+yunData.ISYEARVIP) {
                var i, r, s; + yunData.ISVIP ? (s = 3, r = g.getItem("search_vip_guide3_" + yunData.MYNAME), i = t("vip")) : (s = 1, r = g.getItem("search_vip_guide1_" + yunData.MYNAME), i = t("novip")), r || (i.find(".close").click(function() {
                    g.setItem("search_vip_guide" + s + "_" + yunData.MYNAME, 1), n.instanceForSystem.toolbar.prevDom(!1)
                }), n.instanceForSystem.toolbar.prevDom(i, !0), i.delegate(".vip-help", "click", function() {
                    n.instanceForSystem.log.send({
                        name: "searchTip",
                        value: "全文检索_会员引导"
                    })
                }).delegate('a[node-type="download-link"]', "click", function() {
                    n.instanceForSystem.log.send({
                        name: "searchTip",
                        value: "全文检索_会员引导"
                    })
                }))
            }
            if (e += "") {
                var o = ["", e],
                    c = ["全部文件", '搜索："' + e + '"'];
                x.changeHistory(o, c)
            } else bt(["/"])
        };
    x.extend({
        getCheckMsg: function(e) {
            return "已选中" + e + "个文件/文件夹"
        },
        resizeScrollBar: function(e) {
            var t = this.$container;
            if ("number" == typeof e || "string" == typeof e ? t.height(e) : e = a(window).height() - t.offset().top, 0 === e) throw "[Error] list container's height is 0, need to set";
            var i = this.listHeader.hasInit === !1 ? 0 : 42;
            "none" === t.find(".module-history-list").css("display") ? (this.$moduleGridView.height(e - i), this.$moduleListView.height(e - i), this.$moduleGridView.find(".scrollbar-tracker").height(e - i), this.$moduleListView.find(".scrollbar-tracker").height(e - i)) : (this.$moduleGridView.height(e - 58), this.$moduleListView.height(e - 58), this.$moduleGridView.find(".scrollbar-tracker").height(e - 58), this.$moduleListView.find(".scrollbar-tracker").height(e - 58))
        }
    }), x.addHistory = function(e) {
        var t = x.getHistoryIds();
        t = t ? t.slice() : [], t.push(e), bt(t)
    }, x.goHistory = function(e, t) {
        var i = m.getCurrentParams(),
            a = {};
        i.vmode && (a.vmode = i.vmode), t ? /\S\/+$/.test(t) && (t = t.replace(/\/+$/, "")) : t = "/", a.path = t, ct(e, a)
    };
    var bt = function(e) {
            ot = y, 1 !== e.length && (e[0] = "");
            var t = m.getCurrentParams(),
                i = {};
            t.vmode && (i.vmode = t.vmode);
            var a = e.join("/");
            /\S\/+$/.test(a) && (a = a.replace(/\/+$/, "")), i.path = a, ct(ot, i)
        },
        St = function(e) {
            ot = C;
            var t = m.getCurrentParams(),
                i = {};
            t.vmode && (i.vmode = t.vmode), i.key = e, ct(ot, i)
        },
        Pt = function(e) {
            var t = m.getCurrentParams();
            t.vmode = "grid" === e ? "grid" : "list", ct(ot, t)
        };
    x.getHistoryList().goToHistory = function(e) {
        if (!(e >= this.historyList.length || 0 > e)) {
            if (ot === C) return u.trigger("header-search-val", ""), void bt(["/"]);
            var t = this.historyList.slice();
            t.splice(e, this.historyList.length), bt(t)
        }
    }, N.listen(y, gt), N.listen(p, ft), N.listen(w, vt), N.listen(C, yt);
    var It = function() {
        var e = m.getCurrentHash();
        return e && e.length > 1 && e[1] && (e[0] === y && e[1] && e[1].path || e[0] === w && e[1] && e[1].type || e[0] === C && e[1] && e[1].key || e[0] === p && e[1] && e[1].path) ? (ot = e[0], !0) : !1
    };
    It() ? m.interpretCurrentWindow() : x.addHistory("/", "全部文件");
    var Bt = function() {
        ht();
        var e = a(window).height() - P.offset().top;
        x.resize(e)
    };
    x.listHeader.canTriggerOrder = function() {
        return et.flagEditing || et.flagAdding ? !1 : !0
    }, x.cancelEidtingDir = function() {
        ht()
    }, x.cancelFilesSelect = function() {
        P.find(".list-view-item").removeClass("item-active"), P.find(".grid-view-item").removeClass("item-active"), x.setItemsChecked(!1, !0)
    };
    var Ft = function() {
        var e = -1;
        a(window).resize(function() {
            clearTimeout(e), e = setTimeout(function() {
                Bt()
            }, 300)
        })
    };
    Ft();
    var Mt = {
        getCache: function() {
            return o.getCache()
        },
        deleteCacheByMode: function(e, t, i) {
            var a = t.getDataByKey();
            this.removeCacheAll();
            for (var n = a && a.list, r = !1, s = "", o = "", c = n.length, l = c - 1; l >= 0; l--) {
                for (var d = i.length, u = d - 1; u >= 0; u--) s = i[u], o = s.path || s, n[l].path == o && (i.splice(u, 1), r = !0);
                r && (n.splice(l, 1), r = !1)
            }
            return a.list = n, Mt.getCache()[t.cacheName].data[t.getKey()] = a, v.invalidCache(), a
        },
        removeCacheByPath: function(e) {
            var t = this.getCache(),
                i = {};
            t && t.list && t.list.data && (i = t.list.data), i[e] && delete i[e], this.removeOtherListCache(), v.invalidCache()
        },
        removeCacheAll: function() {
            var e = this.getCache();
            for (var t in e) e.hasOwnProperty(t) && e[t] && e[t].data && (e[t].data = {});
            v.invalidCache()
        },
        removeCache: function(e, t, i) {
            var a = this.getCache(),
                n = {};
            a && a.list && a.list.data && (n = a.list.data), this.removeSubFiles(n, e), "move" === t && this.removeSubFiles(n, i), this.removeOtherListCache(), v.invalidCache()
        },
        removeSubFiles: function(e, t) {
            t = "/" === t ? t : t + "/";
            for (var i in e) e.hasOwnProperty(i) && 0 === (i + "/").indexOf(t) && delete e[i];
            v.invalidCache()
        },
        removeOtherListCache: function() {
            this.removeCategoryCache(), this.removeSearchCache(), this.removeTreeCache(), v.invalidCache()
        },
        removeCategoryCache: function() {
            this.removeCacheByKey("category"), v.invalidCache()
        },
        removeSearchCache: function() {
            this.removeCacheByKey("search"), v.invalidCache()
        },
        removeTreeCache: function() {
            this.removeCacheByKey("tree"), v.invalidCache()
        },
        removeCacheByKey: function(e) {
            var t = this.getCache();
            t && t[e] && t[e].data && (t[e].data = {}), v.invalidCache()
        }
    };
    e.async("disk-system:widget/pageModule/mouse-utils/mouse-select.js", function(e) {
        new e({
            $dom: a(S.listViewContainer),
            item: S.listViewItem,
            viewMod: "list",
            selectClass: "item-active",
            list: x,
            canSelect: function() {
                return x.isLocked() ? !1 : void 0
            },
            onEnd: function() {
                n.instanceForSystem.log.send({
                    name: "web_mouseSelect",
                    value: "框选"
                })
            }
        }), new e({
            $dom: a(S.gridViewContainer),
            item: S.gridViewItem,
            vieMod: "grid",
            selectClass: "item-active",
            list: x,
            canSelect: function() {
                return x.isLocked() ? !1 : void 0
            },
            onEnd: function() {
                n.instanceForSystem.log.send({
                    name: "web_mouseSelect",
                    value: "框选"
                })
            }
        })
    });
    var _t = function(e) {
        var t = x.getCheckedItems();
        rt = t, d.moveTo(t, e.path, at, nt), n.instanceForSystem.log.send({
            name: "web_mouseDrag",
            value: "拖拽"
        })
    };
    e.async("disk-system:widget/pageModule/mouse-utils/mouse-drag.js", function(e) {
        new e({
            $dom: a(S.listViewContainer),
            item: S.listViewItem,
            viewMod: "list",
            selectClass: "item-active",
            list: x,
            onDragEndCallback: _t
        }), new e({
            $dom: a(S.gridViewContainer),
            item: S.gridViewItem,
            viewMod: "grid",
            selectClass: "item-active",
            list: x,
            onDragEndCallback: _t
        })
    });
    var Dt = function(e) {
        "move" === e || "delete" === e ? (Mt.removeCache(x.cache.getKey(), e), x.refreshList()) : (Mt.removeCacheByKey("list"), x.refreshList())
    };
    setTimeout(function() {
        if ("undefined" != typeof g && "function" == typeof g.getItem) {
            var e, t = "asynfilemanager_" + (yunData.MYNAME || "").replace(/@/g, ""),
                i = g.getItem(t);
            i && 2 === (e = i.split("_")).length && (g.removeItem(t), d.resolveHasTask(e[0], e[1], function(e, t, i, a) {
                1 !== e && 3 !== e || !a || Dt(a.operate)
            }))
        }
    }, 1500), x.listEmptyTip = function(e) {
        x.$listHeader.hide(), e.html(f.emptyView).show()
    };
    var Vt = function() {
        var e = document.referrer,
            t = "fm_self",
            i = /(http|https)\:\/\/(tieba|hao123)\.baidu\.com/gi,
            a = /(http|https)\:\/\/www\.hao123\.com/gi;
        return "string" == typeof e && e.length > 0 && (t = i.test(e) ? "fm_" + RegExp.$2 : a.test(e) ? "fm_hao123" : -1 !== e.indexOf("http://www.baidu.com/s?wd=") ? "fm_baidups" : "fm_not_proved"), t
    };
    n.instanceForSystem.log.sendUserReport(Vt()), i.exports = x
});;
define("disk-system:widget/pageModule/contextMenu/contextMenu.js", function(e) {
    var t = e("base:widget/libs/jquerypacket.js"),
        n = e("system-core:system/uiService/rMenu/rMenu.js"),
        i = (e("base:widget/tools/tools.js"), e("disk-system:widget/pageModule/list/listInit.js")),
        o = e("system-core:context/context.js").instanceForSystem,
        r = e("system-core:system/baseService/message/message.js"),
        a = e("system-core:data/faceData.js").getData(),
        s = {
            target: "#layoutMain"
        },
        u = {
            top: [{
                title: "查看",
                variableMenu: function() {
                    var e = [{
                        title: "列表",
                        keyboard: "l"
                    }, {
                        title: "缩略图",
                        keyboard: "g"
                    }];
                    return i.isGridMode() ? (e[1].icon = ["icon-menu-point", "icon-menu-point-hover"], e[0].action = function() {
                        r.trigger("system-show-view-mode", {
                            type: "list"
                        })
                    }) : (e[0].icon = ["icon-menu-point", "icon-menu-point-hover"], e[1].action = function() {
                        r.trigger("system-show-view-mode", {
                            type: "grid"
                        })
                    }), e
                },
                keyboard: "v"
            }, {
                title: "排序方式",
                nextMenu: [{
                    title: "名称",
                    action: function() {
                        i.updateOrder("name")
                    }
                }, {
                    title: "大小",
                    action: function() {
                        i.updateOrder("size")
                    }
                }, {
                    title: "修改日期",
                    action: function() {
                        i.updateOrder("time")
                    }
                }],
                display: function() {
                    var e = location.hash;
                    return /^#search\//.test(e) ? "disable" : !0
                },
                keyboard: "o"
            }, {
                title: "刷新",
                action: function() {
                    r.trigger("system-refresh")
                },
                keyboard: "e"
            }],
            middle: [{
                title: "重新加载页面",
                action: function() {
                    window.location.reload()
                },
                keyboard: "r"
            }, {
                title: "新建文件夹",
                icon: "icon-menu-createfolder",
                action: function() {
                    r.trigger("system-newdir")
                },
                display: function() {
                    var e = location.hash;
                    return 1 === e.indexOf("list") ? !0 : "disable"
                },
                keyboard: "e"
            }],
            bottom: [{
                title: "会员中心",
                icon: "icon-menu-vip",
                action: function() {
                    o.log.send({
                        name: "rmenu_value_added",
                        value: "右键菜单_会员中心"
                    }), window.open(location.protocol + "//yun.baidu.com/buy/center?tag=8&from=rmenu&version=v5")
                },
                keyboard: "e"
            }]
        },
        l = function() {
            if (null !== l.result) return l.result;
            for (var e = a.contextMenu.blank.sort(function(e, t) {
                return e.index > t.index
            }), t = function(e, t) {
                if (void 0 === e.nextMenu && void 0 === e.variableMenu && void 0 === e.length) {
                    if (void 0 === e.action) e.action = function() {
                        r.trigger("plugin:" + t)
                    };
                    else if ("string" == typeof e.action) {
                        var n = e.action;
                        e.action = function(e) {
                            r.trigger("plugin:" + t, {
                                run: n,
                                dom: e
                            })
                        }
                    }
                } else if ("string" == typeof e.variableMenu) {
                    var n = e.variableMenu;
                    e.variableMenu = function(e, i) {
                        r.trigger("plugin:" + t, {
                            dom: e,
                            format: i,
                            run: n
                        })
                    }
                }
            }, n = 0, i = e.length; i > n; n++) if (delete e[n].index, "middle" === e[n].position ? u.middle.push(e[n]) : "bottom" === e[n].position ? u.bottom.push(e[n]) : u.top.push(e[n]), e[n].length) for (var o = 0, s = e[n].length; s > o; o++) t(e[n][o], e[n].pluginId);
            else t(e[n], e[n].pluginId);
            return u.top.push(u.middle), l.result = u.top.concat(u.bottom), l.result
        };
    l.result = null, n.bind(t(s.target)[0], l(), {
        beforeMenu: function() {
            return t(this).hasClass("module-edit-name") || t(this).closest(".module-edit-name").length ? !1 : (i.cancelEidtingDir(), i.cancelFilesSelect(), void o.log.send({
                name: "web_rightContextMenu_white",
                value: "右键操作"
            }))
        },
        afterMenu: function() {
            i.lock(!0)
        },
        menuHide: function() {
            i.lock(!1)
        }
    })
});;
define("disk-system:widget/pageModule/discovery/discovery.js", function(e) {
    {
        var i = e("base:widget/libs/jquerypacket.js");
        window.yunData
    }
    window.$ = window.jQuery = i;
    var n = {
        q: {
            discoveryMainBox: ".discovery-main-box",
            mainBox: ".discovery-main-box .main-box",
            headerBox: ".discovery-main-box .header-box",
            disFooter: ".discovery-main-box .dis-footer",
            frameMain: ".discovery-main-box .frame-main",
            newMsg: ".discovery-main-box .icon-new-msg"
        },
        util: {
            setMainBoxHeight: function() {
                var e = i(window).height(),
                    o = i(n.q.headerBox).height(),
                    t = i(n.q.disFooter).height();
                i(n.q.mainBox).css({
                    height: e - o - t - 10
                }), i(n.q.frameMain).removeClass("absolute")
            },
            getPcloudNewCound: function(e) {
                var o = "/pcloud/counter/refreshcount?force=1&begin=1";
                i.ajax({
                    type: "GET",
                    url: o,
                    data: {
                        setread: e
                    },
                    success: function(e) {
                        e && 0 === e.errno && e.counts > 0 ? i(n.q.newMsg).show() : i(n.q.newMsg).hide()
                    }
                })
            }
        },
        bindEvent: function() {
            i(window).resize(function() {
                n.util.setMainBoxHeight()
            })
        },
        init: function() {
            n.util.setMainBoxHeight(), n.bindEvent(), n.util.getPcloudNewCound(0)
        }
    };
    n.init();
    var o = function(e, i) {
            var n = null,
                o = document.getElementsByTagName("head")[0];
            n = document.createElement("script"), n.type = "text/javascript", n.src = e, "function" == typeof i && (window.attachEvent ? n.onreadystatechange = function() {
                var e = n.readyState;
                ("loaded" === e || "complete" === e) && (n.onreadystatechange = null, i())
            } : n.onload = i), o.appendChild(n)
        },
        t = "/box-static/disk-header/disk.header.js?t=1491792442612";
    o(t)
});;
define("disk-system:widget/pageModule/list/listMenu.js", function(e) {
    var i = e("base:widget/libs/jquerypacket.js"),
        t = e("system-core:system/uiService/rMenu/rMenu.js"),
        s = e("base:widget/tools/tools.js"),
        n = e("disk-system:widget/pageModule/list/listInit.js"),
        r = e("system-core:context/context.js"),
        o = e("system-core:data/faceData.js").getData(),
        l = (e("system-core:data/regedit.js"), e("system-core:system/baseService/message/message.js")),
        a = void 0,
        d = {
            listTarget: ".list-view-container",
            gridTarget: ".grid-view-container",
            newDirBox: 'input[node-type="new-dir-box"]'
        },
        c = function(e) {
            return "object" == typeof e && e.server_filename && (e = e.server_filename), s.getFileCategory(e)
        },
        f = {
            top: [{
                title: "打开",
                action: function() {
                    n.isGridMode() ? i(this).closest(".grid-view-item").find(".filename").trigger("click") : i(this).closest(".list-view-item").find(".filename").trigger("click")
                },
                display: function() {
                    if (n.getCheckedIndexs().length > 1) return "disable";
                    var e = i(this).closest(".list-view-item");
                    return n.isGridMode() && (e = i(this).closest(".grid-view-item")), e.length && !e.hasClass("open-enable") ? "disable" : void 0
                },
                keyboard: "o"
            }],
            middle: [],
            bottom: []
        },
        u = function() {
            if (null !== u.result) return u.result;
            for (var e = o.contextMenu.file.sort(function(e, i) {
                return e.index - i.index
            }), i = function(e) {
                var i = e.filesType,
                    t = n.getCheckedItems(),
                    s = !1;
                if ("number" == typeof e.filesLimit && t.length > e.filesLimit) s = !0;
                else if ("string" == typeof e.filesLimit && 0 === e.filesLimit.indexOf(">")) {
                    var r = parseInt(e.filesLimit.substring(1));
                    t.length <= r && (s = !0)
                }
                if (s === !1) for (var o = 0, l = t.length; l > o; o++) {
                    var a = c(t[o]),
                        d = t[o].path.substring(t[o].path.lastIndexOf("/") + 1);
                    if ((!a || 1 == t[o].isdir) && "string" == typeof e.filesType && "*" !== e.filesType) {
                        s = !0;
                        break
                    }
                    if ("string" == typeof e.filesType && "*" !== e.filesType && -1 === i.indexOf(a)) {
                        s = !0;
                        break
                    }
                    if (e.excludeDirType && -1 != e.excludeDirType.indexOf(d)) {
                        s = !0;
                        break
                    }
                }
                if (e.templateVar) for (var f in e.templateVar) if (e.templateVar.hasOwnProperty(f) && yunData[f] != e.templateVar[f]) {
                    s = !0;
                    break
                }
                return s === !0 ? "disable" === e.disabled ? "disable" : !1 : !0
            }, t = function(e, t) {
                if (void 0 === e.nextMenu && void 0 === e.variableMenu && void 0 === e.length) {
                    if (void 0 === e.action) e.action = function() {
                        l.trigger("plugin:" + t), "string" == typeof e.log && r.instanceForSystem.log.send({
                            type: e.log
                        })
                    };
                    else if ("string" == typeof e.action) {
                        var s = e.action;
                        e.action = function(i) {
                            l.trigger("plugin:" + t, {
                                run: s,
                                dom: i
                            }), "string" == typeof e.log && r.instanceForSystem.log.send({
                                type: e.log
                            })
                        }
                    }
                } else if ("string" == typeof e.variableMenu) {
                    var s = e.variableMenu;
                    e.variableMenu = function(e, i) {
                        l.trigger("plugin:" + t, {
                            dom: e,
                            format: i,
                            run: s
                        })
                    }
                }("string" == typeof e.filesType && "*" !== e.filesType || "string" == typeof e.excludeDirType) && (e.display = function() {
                    return i(e)
                })
            }, s = 0, a = e.length; a > s; s++) if (delete e[s].index, "middle" === e[s].position ? f.middle.push(e[s]) : "bottom" === e[s].position ? f.bottom.push(e[s]) : f.top.push(e[s]), e[s].length) for (var d = 0, g = e[s].length; g > d; d++) t(e[s][d], e[s].pluginId);
            else t(e[s], e[s].pluginId);
            return f.top.push(f.middle), u.result = f.top.concat(f.bottom), u.result
        };
    u.result = null, t.bind(i(d.listTarget)[0], u(), {
        beforeMenu: function() {
            var e = i(this).closest(".list-view-item")[0];
            if (!e) return !1;
            n.cancelEidtingDir();
            var t = parseInt(e.getAttribute("_position"));
            a = t, n.isItemChecked(t) || (n.setSingleItemChecked(t, !0), i(this).closest(".list-view-container").is(":visible") ? i(this).closest(".module-list-view").find(".list-view-item").removeClass("item-active") : i(this).closest(".module-grid-view").find(".grid-view-item").removeClass("item-active"), i(e).addClass("item-active")), i(e).removeClass("hover-item"), r.instanceForSystem.log.send({
                name: "web_rightContextMenu_list",
                value: "右键操作"
            })
        },
        afterMenu: function() {
            n.lock(!0)
        },
        menuHide: function() {
            n.lock(!1)
        }
    }), t.bind(i(d.gridTarget)[0], u(), {
        beforeMenu: function() {
            var e = i(this).closest(".grid-view-item")[0];
            if (!e) return !1;
            n.cancelEidtingDir();
            var t = parseInt(e.getAttribute("_position")),
                s = i(e).index();
            a = n.getGridPostiion(t, s), n.isItemChecked(a) || (n.setSingleItemChecked(a, !0), i(this).closest(".module-grid-view").find(".grid-view-item").removeClass("item-active"), i(e).addClass("item-active")), i(e).removeClass("hover-item"), r.instanceForSystem.log.send({
                name: "web_rightContextMenu_grid",
                value: "右键操作"
            })
        },
        afterMenu: function() {
            n.lock(!0)
        },
        menuHide: function() {
            n.lock(!1)
        }
    }), i(d.newDirBox).bind("contextmenu", function(e) {
        e.stopPropagation()
    })
});;
define("disk-system:widget/pageModule/mouse-utils/mouse-drag.js", function(t, i, e) {
    function o(t) {
        this.md = new n(t.$dom), this.$dom = t.$dom, this.item = t.item, this.viewMod = t.viewMod, this.selectClass = t.selectClass, this.list = t.list, this.onDragEndCallback = t.onDragEndCallback, this.cacheList = [], this._init()
    } {
        var n = t("base:widget/mouse-utils/mouse-drag.js");
        t("disk-system:widget/system/fileService/fileMoveCopy/fileMoveCopy.js")
    }
    o.prototype._init = function() {
        var t = this;
        t.onStart(), t.onSelect()
    }, o.prototype.onStart = function() {
        var t = this;
        t.md.onStart = function(i) {
            var e, o, n, s, a = t.$dom.find(t.item);
            return n = $(i.target), s = n.closest(t.item), o = s.attr("_position"), e = "list" === t.viewMod ? o : o * t.list.getColumnsCount() + s.index(), 1 !== a.length && s.hasClass(t.selectClass) ? (t.cacheList = a, t.md.setNum(t.list.getCheckedIndexs().length), !0) : !1
        }
    }, o.prototype.onSelect = function() {
        var t = this;
        t.md.onSelect = function(i) {
            "list" === t.viewMod ? t.listViewDrag(i) : t.gridViewDrag(i)
        }
    }, o.prototype.listViewDrag = function(t) {
        var i, e, o, n, s, a, r = this;
        for (e = 0; e < r.cacheList.length; e++) if (a = $(r.cacheList[e]), o = a.attr("_position"), !r.list.isItemChecked(o)) {
            if (n = a.offset(), s = a.outerHeight(), n.top < t.top && n.top + s > t.top) return i = a.data("id"), void(r.md.onDragEnd = function() {
                var t = r.list.getCurrentView().getElementDataByPosition(o);
                return t.isdir ? ("function" == typeof r.onDragEndCallback && r.onDragEndCallback.call(r, t), void(r.md.onDragEnd = void 0)) : !1
            });
            r.md.onDragEnd = void 0
        }
    }, o.prototype.gridViewDrag = function(t) {
        var i, e, o, n, s, a, r, d = this;
        for (e = 0; e < d.cacheList.length; e++) {
            r = $(d.cacheList[e]);
            var l = r.closest(d.item);
            if (o = r.attr("_position") * d.list.getColumnsCount() + l.index(), !d.list.isItemChecked(o)) {
                if (n = r.offset(), s = r.outerHeight(), a = r.outerWidth(), n.top < t.top && n.top + s > t.top && n.left < t.left && n.left + a > t.left) return i = r.data("id"), void(d.md.onDragEnd = function() {
                    var t = d.list.getCurrentView().getElementDataByPosition(o);
                    return t.isdir ? ("function" == typeof d.onDragEndCallback && d.onDragEndCallback.call(d, t), void(d.md.onDragEnd = void 0)) : !1
                });
                d.md.onDragEnd = void 0
            }
        }
    }, e.exports = o
});;
define("disk-system:widget/pageModule/mouse-utils/mouse-select.js", function(t, e, o) {
    function i(t) {
        this.ms = new s(t.$dom), this.$dom = t.$dom, this.item = t.item, this.viewMod = t.viewMod, this.selectClass = t.selectClass, this.list = t.list, this.canSelect = t.canSelect || null, this.cacheList = [], this.positionArray = [], this.params = t || {}, this._init()
    }
    var s = t("base:widget/mouse-utils/mouse-selection.js");
    i.prototype._init = function() {
        var t = this;
        t.onStart(), t.onSelect(), t.onEnd(t.params.onEnd)
    }, i.prototype.onStart = function(t) {
        var e = this;
        e.ms.onStart = function(o) {
            if (null !== e.canSelect && "function" == typeof e.canSelect && e.canSelect() === !1) return !1;
            var i, s, n, l, r = e.$dom.find(e.item);
            return n = $(o.target), l = n.closest(e.item), s = l.attr("_position"), i = "list" === e.viewMod ? s : s * e.list.getColumnsCount() + l.index(), e.positionArray = [], l.hasClass(e.selectClass) ? !1 : (e.cacheList = r, "function" == typeof t && t(o), !0)
        }
    }, i.prototype.onSelect = function(t) {
        var e = this;
        e.ms.onSelect = function(o) {
            "list" === e.viewMod ? e.listMouseSelect(o) : e.gridMouseSelect(o), "function" == typeof t && t(o)
        }
    }, i.prototype.onEnd = function(t) {
        var e = this;
        e.ms.onEnd = function() {
            e.list.setEachItemChecked(e.positionArray, !0), e.positionArray = [], "function" == typeof t && t()
        }
    }, i.prototype.listMouseSelect = function(t) {
        var e, o, i, s, n, l = this;
        for (e = 0; e < l.cacheList.length; e++) if (n = $(l.cacheList[e]), o = n.attr("_position"), i = n.offset(), s = n.outerHeight(), i.top < t.top && i.top + s > t.top || i.top > t.top && i.top + s < t.top + t.height || i.top < t.top + t.height && i.top + s > t.top + t.height) {
            var r = l.positionArray.indexOf(o); - 1 === r && l.positionArray.push(o), n.addClass(l.selectClass)
        } else {
            n.removeClass(l.selectClass);
            var r = l.positionArray.indexOf(o);
            r > -1 && l.positionArray.splice(r, 1)
        }
    }, i.prototype.gridMouseSelect = function(t) {
        var e, o, i, s, n, l, r = this;
        for (e = 0; e < r.cacheList.length; e++) if (n = $(r.cacheList[e]), o = parseInt(n.attr("_position")) * r.list.getColumnsCount() + n.index(), i = n.offset(), s = n.outerHeight(), l = n.outerWidth(), (i.top < t.top && i.top + s > t.top || i.top > t.top && i.top + s < t.top + t.height || i.top < t.top + t.height && i.top + s > t.top + t.height) && (i.left < t.left && i.left + l > t.left || i.left > t.left && i.left + l < t.left + t.width || i.left < t.left + t.width && i.left + l > t.left + t.width)) {
            var a = r.positionArray.indexOf(o); - 1 === a && r.positionArray.push(o), n.addClass(r.selectClass)
        } else {
            n.removeClass(r.selectClass);
            var a = r.positionArray.indexOf(o);
            a > -1 && r.positionArray.splice(a, 1)
        }
    }, o.exports = i
});;
define("disk-system:widget/pageModule/pluginPage/pluginPage.js", function(e) {
    var s = e("base:widget/libs/jquerypacket.js"),
        t = e("base:widget/tools/tools.js"),
        g = e("system-core:system/baseService/message/message.js"),
        a = decodeURIComponent(decodeURIComponent(t.getParam("pluginName"))),
        i = t.getParam("pluginGroup"),
        o = t.getParam("autoExcute");
    "true" === o ? g.trigger("plugin:" + a + "@" + i) : window.loadPlugin = function(e) {
        if (e) {
            try {
                e = s.parseJSON(e)
            } catch (t) {}
            g.trigger("plugin:" + a + "@" + i, {
                filesList: e,
                flag: "BDYGJ"
            })
        }
    }
});;
define("disk-system:widget/pageModule/toolbar/search.js", function(e, r, a) {
    var c = e("base:widget/libs/jquerypacket.js"),
        s = e("base:widget/historyManager/historyManager.js"),
        n = e("system-core:context/context.js").instanceForSystem,
        t = {
            obj: {
                timer: null,
                isSearchIng: !1
            },
            q: {
                searchQuery: '.bar-search input[node-type="search-query click-ele"]',
                searchBtn: '.bar-search  span[node-type="click-ele"]',
                searchPlaceHolder: '.bar-search  span[node-type="search-placeholder"]',
                searchClear: '.bar-search  span[node-type="search-clear"]'
            },
            util: {
                doSearch: function() {
                    var e = s.getDefault(),
                        r = c.trim(c(t.q.searchQuery).val());
                    if ("" === r) return !1;
                    var a = s.buildHistory("search", {
                        key: r
                    });
                    n.log.send({
                        name: "searchValue",
                        value: r
                    }), t.isSearchIng || (t.isSearchIng = !0, t.obj.timer = setTimeout(function() {
                        e.addHistory(a), t.isSearchIng = !1, clearTimeout(t.obj.timer)
                    }, 100))
                },
                unSearch: function() {
                    var e = s.getDefault(),
                        r = s.buildHistory("list", {
                            key: "/"
                        });
                    e.addHistory(r)
                }
            },
            bindEvent: function() {
                c(t.q.searchQuery).on("keydown", function(e) {
                    return 13 === e.keyCode ? (t.util.doSearch(), !1) : void 0
                }), c(t.q.searchBtn).on("click", function() {
                    return t.util.doSearch(), !1
                }), c(t.q.searchQuery).on("focus", function() {
                    "" === c.trim(c(t.q.searchQuery).val()) ? c(t.q.searchPlaceHolder).hide() : c(t.q.searchClear).show()
                }), c(t.q.searchQuery).on("input", function() {
                    "" === c.trim(c(t.q.searchQuery).val()) ? c(t.q.searchClear).hide() : c(t.q.searchClear).show()
                }), c(t.q.searchQuery).on("blur", function() {
                    setTimeout(function() {
                        "" === c.trim(c(t.q.searchQuery).val()) && (c(t.q.searchPlaceHolder).show(), c(t.q.searchClear).hide())
                    }, 100)
                }), c(t.q.searchPlaceHolder).on("click", function() {
                    c(t.q.searchQuery).focus()
                }), c(t.q.searchClear).on("click", function() {
                    c(t.q.searchQuery).val(""), c(t.q.searchPlaceHolder).show(), c(t.q.searchClear).hide(), t.util.unSearch()
                })
            },
            init: function() {
                t.bindEvent()
            }
        };
    t.init();
    var i = {};
    a.exports = i
});;
define("disk-system:widget/pageModule/toolbar/sort.js", function(t, e, i) {
    var o = t("base:widget/libs/jquerypacket.js"),
        s = (t("system-core:context/context.js").instanceForSystem, {
            conf: {
                canSort: !0,
                timer: null
            },
            q: {
                sortSwitchBtn: 'div[node-type="sort-switch-btn"]',
                sortSwitchList: 'div[node-type="sort-switch-list"]',
                sortSwitchItem: 'div[node-type="sort-switch-list"] .sort-item'
            },
            util: {
                openOrCloseList: function(t) {
                    t ? o(s.q.sortSwitchList).show() : o(s.q.sortSwitchList).hide()
                },
                updateOrder: function(e) {
                    t.async("disk-system:widget/pageModule/list/listInit.js", function(t) {
                        t.updateOrder(e)
                    })
                },
                setSortSelect: function(t) {
                    var e = -1;
                    t && "name" === t.item ? e = 0 : t && "size" === t.item ? e = 1 : t && "time" === t.item && (e = 2), e >= 0 && (o(s.q.sortSwitchItem).removeClass("current"), o(s.q.sortSwitchItem).eq(e).addClass("current"))
                },
                setSortAvailable: function(t) {
                    t ? (s.conf.canSort = !0, o(s.q.sortSwitchBtn).removeClass("disabled")) : (s.conf.canSort = !1, o(s.q.sortSwitchBtn).addClass("disabled"))
                }
            },
            bindEvent: function() {
                o(s.q.sortSwitchBtn).on("mouseenter", function() {
                    return s.conf.canSort !== !0 ? !1 : (clearTimeout(s.conf.timer), void s.util.openOrCloseList(!0))
                }), o(s.q.sortSwitchBtn).on("mouseleave", function() {
                    s.conf.timer = setTimeout(function() {
                        s.util.openOrCloseList(!1)
                    }, 300)
                }), o(s.q.sortSwitchList).on("mouseenter", function() {
                    clearTimeout(s.conf.timer), s.util.openOrCloseList(!0)
                }), o(s.q.sortSwitchList).on("mouseleave", function() {
                    s.conf.timer = setTimeout(function() {
                        s.util.openOrCloseList(!1)
                    }, 300)
                }), o(s.q.sortSwitchItem).on("click", function() {
                    var t = (o(this).index(), o(this).attr("data-key"));
                    s.util.updateOrder(t), s.util.openOrCloseList(!1)
                })
            },
            init: function() {
                s.bindEvent(), s.util.setSortSelect({
                    item: "time"
                })
            }
        });
    s.init();
    var n = {
        setSortSelect: s.util.setSortSelect,
        setSortAvailable: s.util.setSortAvailable
    };
    i.exports = n
});;
define("disk-system:widget/pageModule/toolbar/toolbar.js", function(e) {
    var t = e("base:widget/libs/jquerypacket.js"),
        i = e("system-core:system/baseService/message/message.js"),
        o = (e("base:widget/storage/storage.js"), e("system-core:data/faceData.js").getData()),
        s = e("system-core:context/context.js"),
        d = e("disk-system:widget/system/uiRender/buttonBox/buttonBox.js"),
        n = e("disk-system:widget/pageModule/toolbar/sort.js"),
        a = e("base:widget/hash/hash.js"),
        r = t(".module-toolbar"),
        l = {
            listGridSwitch: ".list-grid-switch",
            listSwitch: ".list-switch",
            gridSwitch: ".grid-switch",
            prevDom: "div.prev-dom",
            afterDom: "div.after-dom",
            defaultDom: "div.default-dom",
            userDom: "div.user-dom",
            timeLineDom: "div.yun-pic-bar",
            listTools: "div.list-tools",
            defaultListToolPos: ".module-list div.list-header-operate",
            bar: ".bar"
        },
        m = new d({
            name: "tools",
            className: "tools",
            container: r.find(".bar"),
            buttons: o.getButton("tools"),
            alwaysShow: !0,
            autoWidth: !0,
            paddingLeft: 0,
            limit: 4
        }),
        f = new d({
            name: "listTools",
            className: "list-tools",
            limit: 8,
            outSize: 36,
            resize: !0,
            container: r.find(".bar"),
            buttons: o.getButton("listTools")
        });
    f.hide();
    var h = function(e) {
        "undefined" != typeof localStorage && localStorage.setItem("chooseviewtype", e)
    };
    r.on("click", l.listSwitch, function() {
        if (!t(this).parent().hasClass("list-switched-on")) {
            s.instanceForSystem.log.send({
                name: "vmodeSwitch"
            });
            var e = {
                type: "list"
            };
            h("list"), i.trigger("system-show-view-mode", e)
        }
    }), r.on("click", l.gridSwitch, function() {
        if (!t(this).parent().hasClass("grid-switched-on")) {
            s.instanceForSystem.log.send({
                name: "vmodeSwitch"
            });
            var e = {
                type: "grid"
            };
            h("grid"), i.trigger("system-show-view-mode", e)
        }
    }), i.listen("system-update-view-mode", function(e) {
        var t = r.find(l.listGridSwitch);
        "list" === e.type ? (t.addClass("list-switched-on").removeClass("grid-switched-on"), t.find("a[node-type=list-switch]").hide(), t.find("a[node-type=grid-switch]").show()) : (t.removeClass("list-switched-on").addClass("grid-switched-on"), t.find("a[node-type=list-switch]").show(), t.find("a[node-type=grid-switch]").hide())
    }), i.listen("system-checked-changed", function(e) {
        function i() {
            var i = t(".tools").width();
            "3" === o && (i = 160), f.filesSelect(e.data, {
                paddingLeft: i
            })
        }
        var o = a.get("category/type");
        "3" !== o ? m.filesSelect(e.data, null, i) : i()
    });
    var c = !1,
        w = !1;
    s.extend({
        toolbar: {
            afterDom: function(e, i) {
                if (e) {
                    if (w) return;
                    i === !0 && (w = !0), r.find(l.afterDom).html("").append(e).show()
                } else e === !1 ? (r.find(l.afterDom).html(""), w = !1) : r.find(l.afterDom).hide();
                t(window).trigger("resize")
            },
            prevDom: function(e, i) {
                if (e) {
                    if (c > i) return;
                    (i === !0 || "number" == typeof i) && (c = i > 1 ? i : 1), r.find(l.prevDom).html("").append(e).show()
                } else e === !1 ? (r.find(l.prevDom).html(""), c = !1) : r.find(l.prevDom).hide();
                t(window).trigger("resize")
            },
            showDefault: function() {
                r.find(l.userDom).hide(), r.find(l.defaultDom).show(), r.find(l.prevDom).children().length && r.find(l.prevDom).show(), r.find(l.afterDom).children().length && r.find(l.afterDom).show(), r.find(l.timeLineDom).hide(), r.removeClass("module-toolbar-hackbg");
                var e = t(l.defaultListToolPos).find(l.listTools);
                e.length && e.appendTo(r.find(l.bar)), m.onVisibilityChange(!0)
            },
            setDom: function(e) {
                r.find(l.defaultDom).hide(), r.find(l.prevDom).hide(), r.find(l.afterDom).hide(), r.find(l.timeLineDom).hide(), r.find(l.userDom).html("").append(e).show(), r.removeClass("module-toolbar-hackbg"), t(window).trigger("resize")
            },
            showTimelineDom: function() {
                r.find(l.defaultDom).hide(), r.find(l.prevDom).hide(), r.find(l.afterDom).hide(), r.find(l.userDom).hide(), r.find(l.timeLineDom).show(), r.addClass("module-toolbar-hackbg"), t(window).trigger("resize");
                var e = r.find(l.listTools);
                e.length && e.appendTo(t(l.defaultListToolPos))
            },
            setSortSelect: function(e) {
                n.setSortSelect(e)
            },
            setSortAvailable: function(e) {
                n.setSortAvailable(e)
            }
        }
    })
});;
define("disk-system:widget/system/baseService/payFactory/service/payBase.js", function(o, t, e) {
    var i = function() {};
    i.prototype.toPay = function() {
        this.$form && (window.console && console.log(this.$form.serialize()), $("#" + this.formId).submit())
    }, i.prototype.buildForm = function() {
        throw new Error('The method "buildForm" must be inherited !')
    }, i.prototype.setFormItem = function(o, t) {
        this.$form && this.$form.find('input[name="' + o + '"]').val(t)
    }, e.exports = i
});;
define("disk-system:widget/system/baseService/payFactory/service/payUtil.js", function(t, e, n) {
    var s = (t("base:widget/libs/jquerypacket.js"), t("system-core:context/context.js")),
        i = {
            creatBid: function() {
                return (new Date).getTime() + "" + Math.round(9999 * Math.random())
            },
            timeFormat: function(t, e) {
                var n = new Date(1e3 * parseFloat(t)),
                    s = n.getMonth() + 1,
                    i = n.getDate(),
                    a = n.getHours(),
                    o = n.getMinutes(),
                    r = n.getSeconds();
                return +e ? n.getFullYear() + "-" + (String(s).length < 2 ? "0" + s : s) + "-" + (String(i).length < 2 ? "0" + i : i) + " " + (String(a).length < 2 ? "0" + a : a) + ":" + (String(o).length < 2 ? "0" + o : o) + ":" + (String(r).length < 2 ? "0" + r : r) : n.getFullYear() + "-" + (String(s).length < 2 ? "0" + s : s) + "-" + (String(i).length < 2 ? "0" + i : i)
            },
            toLogin: function() {
                var e = s.instanceForSystem.ui.tip({
                    mode: "loading",
                    msg: "请稍候..."
                });
                t.async("base:widget/passAPI/passAPI.js", function(t) {
                    e.hideTip(), t.promise.done(function() {
                        t.passAPI.PassportInit.netdiskLogin({
                            reload: !0
                        }), t.passAPI.PassLoginDialog.onLoginSuccessCallback = function() {
                            t.passAPI.PassportInit.hide()
                        }
                    })
                })
            }
        };
    n.exports = i
});;
define("disk-system:widget/system/baseService/payFactory/service/payVip.js", function(t, e, i) {
    var s = t("base:widget/libs/jquerypacket.js"),
        r = t("disk-system:widget/system/baseService/payFactory/service/payBase.js"),
        o = t("disk-system:widget/system/baseService/payFactory/service/payUtil.js"),
        m = t("system-core:context/context.js"),
        a = function(t) {
            this.$form = null, this.serverTime = t.serverTime, this.isVip = t.isVip, this.dqStateCode = t.dqStateCode ? t.dqStateCode : "", this.vipStartTime = t.vipStartTime, this.addFormItems = t.addFormItems, this.formId = t.formId || a.DEFAULT_FORM_ID, this.productName = t.productName || a.DEFAULT_PRODUCT_NAME, this.init()
        };
    a.LOG_CODE_IS_VIP = "99_109_139", a.LOG_CODE_IS_NO_VIP = "99_100_138", a.API_ACTION_PAY = "/rest/2.0/membership/product", a.ACTION_MODE = "_target", a.DEFAULT_FORM_ID = "payVipForm", a.PACKAGE_LIST = [{
        product_name: "vip1_1m",
        product_id: "13216777582222349574"
    }, {
        product_name: "vip1_3m",
        product_id: "7322772448495138379"
    }, {
        product_name: "vip1_6m",
        product_id: "7349836666708701604"
    }, {
        product_name: "vip1_1y",
        product_id: "145433372644027012"
    }], a.DEFAULT_PRODUCT_NAME = a.PACKAGE_LIST[2].product_name, a.prototype = new r, s.extend(a.prototype, {
        rePay: function() {
            if (!this.$form) throw new Error("The $form is must !")
        },
        buildForm: function() {
            var t = ['<form target="' + a.ACTION_MODE + '" method="get" action="' + a.API_ACTION_PAY + '" id="' + this.formId + '" style="display:none;">', '<input name="method"/>', '<input name="product_name"/>', '<input name="start"/>', '<input name="business_no"/>', '<input name="buy_way"/>', '<input name="sign"/>', '<input name="dqStatCode"/>', "</form>"];
            this.$form = s(t.join("")), s("body").append(this.$form)
        }
    }), s.extend(a.prototype, {
        init: function() {
            s("#" + this.formId).get(0) && s("#" + this.formId).remove(), this.buildForm(), this.setFormItemsFromConfig(), this.setFormItems()
        },
        setFormItems: function() {
            this.setFormItem("method", "purchase"), this.setFormItem("business_no", o.creatBid()), this.setFormItem("sign", ""), this.setFormItem("product_name", this.productName), this.setFormItem("start", this.vipStartTime), this.setFormItem("buy_way", this.isVip ? 1 : 0), this.setFormItem("dqStatCode", this.dqStateCode ? this.dqStateCode : "")
        },
        setFormItemsFromConfig: function() {
            if (this.addFormItems) for (var t in this.addFormItems) this.$form.append('<input name="' + t + '" value="' + this.addFormItems[t] + '" />')
        },
        fetchUserInfo: function(t) {
            this.ajaxUserInfo(t)
        },
        ajaxUserInfo: function(t) {
            var e = this;
            s.ajax({
                url: "/rest/2.0/membership/user?method=query",
                type: "GET",
                timeout: 1e4,
                cache: !1,
                async: !1,
                dataType: "JSON",
                success: function(i) {
                    e.doVipDuration(i.product_infos, t)
                },
                error: function() {
                    m.instanceForSystem.ui.tip({
                        mode: "caution",
                        msg: "网络错误，请稍候重试"
                    })
                }
            })
        },
        doVipDuration: function(t, e) {
            for (var i, s = [], r = t, o = 0; o < r.length; o++) i = r[o], /vip1/gi.test(i.product_name) && s.push(i);
            if (0 != s.length) var m = parseFloat(s[0].start_time),
                a = parseFloat(s[0].end_time);
            for (var n = 0; n < s.length; n++) m = parseFloat(s[n].start_time) > m ? m : parseFloat(s[n].start_time), a = parseFloat(s[n].end_time) < a ? a : parseFloat(s[n].end_time);
            e && "function" == typeof e && e({
                currentVipStartTime: m,
                currentVipEndTime: a
            })
        }
    }), i.exports = a
});;
define("disk-system:widget/system/baseService/payFactory/service/payCapacity.js", function(t, e, i) {
    var r = t("base:widget/libs/jquerypacket.js"),
        o = t("disk-system:widget/system/baseService/payFactory/service/payBase.js"),
        s = t("disk-system:widget/system/baseService/payFactory/service/payUtil.js"),
        n = t("system-core:context/context.js"),
        a = function(t) {
            this.$form = null, this.serverTime = t.serverTime, this.isVip = t.isVip, this.quotaStartTime = t.quotaStartTime, this.formId = t.formId || a.DEFAULT_FORM_ID, this.productId = t.productId || a.DEFAULT_PRODUCT_ID, this.buyWay = t.buyWay || a.MODE_BUY_WAY_DEFAULT, this.dqStateCode = t.dqStateCode ? t.dqStateCode : "", this.init()
        };
    a.API_ACTION_PAY = "/rest/2.0/membership/product", a.ACTION_MODE = "_target", a.DEFAULT_FORM_ID = "payQuotaForm", a.MODE_BUY_WAY_RENEW = 1, a.MODE_BUY_WAY_COMPOSITION = 2, a.MODE_BUY_WAY_DEFAULT = a.MODE_BUY_WAY_RENEW, a.PACKAGE_LIST = [{
        product_name: "15GB",
        product_id: "4880050357179372399"
    }, {
        product_name: "30GB",
        product_id: "13566730592746897967"
    }, {
        product_name: "50GB",
        product_id: "1669981989677457522"
    }, {
        product_name: "100GB",
        product_id: "17280046393110397375"
    }], a.DEFAULT_PRODUCT_ID = a.PACKAGE_LIST[2].product_id, a.prototype = new o, r.extend(a.prototype, {
        rePay: function() {
            if (!this.$form) throw new Error("The $form is must !")
        },
        buildForm: function() {
            var t = ['<form target="' + a.ACTION_MODE + '" method="get" action="' + a.API_ACTION_PAY + '" id="' + this.formId + '" style="display:none;">', '<input name="method">', '<input name="business_no">', '<input name="sign">', '<input name="product_id">', '<input name="start">', '<input name="buy_way">', '<input name="dqStatCode">', '<input name="pay_way">', '<input name="vcode_str">', "</form>"];
            this.$form = r(t.join("")), r("body").append(this.$form)
        }
    }), r.extend(a.prototype, {
        init: function() {
            r("#" + this.formId).get(0) && r("#" + this.formId).remove(), this.buildForm(), this.setFormItems()
        },
        setFormItems: function() {
            this.setFormItem("method", "purchase"), this.setFormItem("business_no", s.creatBid()), this.setFormItem("sign", ""), this.setFormItem("product_id", this.productId), this.setFormItem("start", this.quotaStartTime), this.setFormItem("buy_way", this.buyWay), this.setFormItem("dqStatCode", this.dqStateCode)
        },
        ajaxCurrenUserQouta: function() {
            var t = this;
            r.ajax({
                url: "/api/quota",
                type: "GET",
                timeout: 1e4,
                cache: !0,
                async: !1,
                dataType: "JSON",
                success: function(e) {
                    t.checkUserProduct(e)
                },
                error: function() {
                    n.instanceForSystem.ui.tip({
                        mode: "caution",
                        msg: "网络错误，请稍候重试"
                    })
                }
            })
        },
        checkUserProduct: function() {
            var t = function(t) {
                for (var e, i = 0, r = 0, o = t.length; o > r; r++) e = t[r], e.end_time > i && (i = e.end_time);
                return i
            };
            return function(e, i) {
                for (var r = e.product_infos, o = [], s = 0; s < a.PACKAGE_LIST.length; s++) for (var n = a.PACKAGE_LIST[s].product_id, d = 0; d < r.length; d++) e.currenttime > r[d].end_time || n == r[d].product_id && o.push(e.product_infos[d]);
                var m = t(o);
                i && "function" == typeof i && i({
                    currentQuotaStartTime: m
                })
            }
        }()
    }), i.exports = a
});;
define("disk-system:widget/system/baseService/payFactory/service/payActivity.js", function(t, e, i) {
    var s = t("base:widget/libs/jquerypacket.js"),
        o = function() {};
    s.extend(o.prototype, {
        rePay: function() {
            if (!this.$form) throw new Error("The $form is must !")
        },
        buildForm: function() {
            var t = ['<form target="' + o.ACTION_MODE + '" method="get" action="' + o.API_ACTION_PAY + '" id="' + this.formId + '" style="display:none;">', '<input name="method"/>', '<input name="product_name"/>', '<input name="start"/>', '<input name="business_no"/>', '<input name="buy_way"/>', '<input name="sign"/>', '<input name="dqStatCode"/>', "</form>"];
            this.$form = s(t.join(""))
        }
    }), s.extend(o.prototype, {
        init: function() {
            this.buildForm(), this.setFormItemsFromConfig(), this.setFormItems()
        },
        setFormItems: function() {
            this.setFormItem("method", "purchase"), this.setFormItem("business_no", payUtil.creatBid()), this.setFormItem("sign", ""), this.setFormItem("product_name", this.productName), this.setFormItem("start", this.vipStartTime), this.setFormItem("buy_way", this.isVip ? 1 : 0), this.setFormItem("dqStatCode", this.dqStateCode ? this.dqStateCode : "")
        },
        setFormItemsFromConfig: function() {
            if (this.addFormItems) for (var t in this.addFormItems) this.$form.append('<input name="' + t + '" value="' + this.addFormItems[t] + '" />')
        },
        fetchUserInfo: function(t) {
            this.ajaxUserInfo(t)
        },
        ajaxUserInfo: function(t) {
            var e = this;
            s.ajax({
                url: "/rest/2.0/membership/user?method=query",
                type: "GET",
                timeout: 1e4,
                cache: !1,
                async: !1,
                dataType: "JSON",
                success: function(i) {
                    e.doVipDuration(i.product_infos, t)
                },
                error: function() {
                    Toast.obtain.useToast({
                        toastMode: Toast.obtain.MODE_LOADING,
                        msg: "网络错误，请稍候重试",
                        sticky: !1,
                        closeType: !1
                    })
                }
            })
        },
        doVipDuration: function(t, e) {
            for (var i, s = [], o = t, r = 0; r < o.length; r++) i = o[r], /vip1/gi.test(i.product_name) && s.push(i);
            if (0 != s.length) var n = parseFloat(s[0].start_time),
                a = parseFloat(s[0].end_time);
            for (var m = 0; m < s.length; m++) n = parseFloat(s[m].start_time) > n ? n : parseFloat(s[m].start_time), a = parseFloat(s[m].end_time) < a ? a : parseFloat(s[m].end_time);
            e && "function" == typeof e && e({
                currentVipStartTime: n,
                currentVipEndTime: a
            })
        }
    }), i.exports = o
});;
define("disk-system:widget/system/baseService/payFactory/payFactory.js", function(e, i, s) {
    var t = (e("base:widget/libs/jquerypacket.js"), e("disk-system:widget/system/baseService/payFactory/service/payVip.js")),
        r = e("disk-system:widget/system/baseService/payFactory/service/payCapacity.js"),
        o = e("disk-system:widget/system/baseService/payFactory/service/payActivity.js"),
        a = e("disk-system:widget/system/baseService/payFactory/service/payUtil.js"),
        y = {};
    y.Mode_Vip = 1, y.Mode_Quota = 2, y.Mode_Activity = 3, y.createPayService = function(e) {
        var i;
        if (!e.mode) throw new Error("The mode of pay is must !");
        if (!e.isLogin) throw new Error("The isLogin of pay is must !");
        if (e.isLogin === !1) return void a.toLogin();
        switch (e.mode) {
            case y.Mode_Vip:
                if (void 0 === e.isVip) throw new Error("The isVip of config is must !");
                if (!e.serverTime) throw new Error("The serverTime of config is must !");
                i = new t(e);
                break;
            case y.Mode_Quota:
                i = new r(e);
                break;
            case y.Mode_Activity:
                i = new o(e);
                break;
            default:
                throw new Error("The mode of pay is empty ! Please check the mode !")
        }
        return i
    }, s.exports = y
});;
define("disk-system:widget/system/fileService/fileDownLoad/dlinkService.js", function(t, r, e) {
    var a = window.yunData,
        n = t("base:widget/libs/jquerypacket.js"),
        o = t("base:widget/libs/underscore.js"),
        i = t("system-core:context/context.js"),
        s = (t("disk-system:widget/system/errorMsg/errorMsg.js"), {
            PRODUCT_PAN: "pan",
            PRODUCT_MBOX: "mbox",
            PRODUCT_SHARE: "share",
            currentProduct: null,
            dialog: null,
            setCurrentProduct: function(t) {
                this.currentProduct = t
            },
            getCurrentProduct: function() {
                return this.currentProduct
            },
            URL_DLINK_PAN: "/api/download",
            URL_DLINK_SHARE: "/api/sharedownload",
            _doError: function(t) {
                var r = "",
                    e = this;
                if (2 == t && (r = "下载失败，请稍候重试"), 116 === t && (r = "该分享不存在！"), -1 === t && (r = "您下载的内容中包含违规信息！"), 118 === t && (r = "没有下载权限！"), (113 === t || 112 === t) && (r = '页面已过期，请<a href="javascript:window.location.reload();">刷新</a>后重试'), -20 === t) return void e._getcaptcha(function(t) {
                    e._showVerifyDialog(t.vcode_img, t.vcode_str)
                });
                121 === t && (r = "你选择操作的文件过多，减点试试吧。"), r = r || "网络错误，请稍候重试";
                new i.instanceForSystem.ui.tip({
                    mode: "caution",
                    msg: r,
                    hasClose: !1,
                    autoClose: !0
                })
            },
            getFsidListData: function(t) {
                return o.isArray(t) === !1 && (t = [t]), n.stringify(o.pluck(t, "fs_id"))
            },
            base64Encode: function(t) {
                var r, e, a, n, o, i, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                for (a = t.length, e = 0, r = ""; a > e;) {
                    if (n = 255 & t.charCodeAt(e++), e == a) {
                        r += s.charAt(n >> 2), r += s.charAt((3 & n) << 4), r += "==";
                        break
                    }
                    if (o = t.charCodeAt(e++), e == a) {
                        r += s.charAt(n >> 2), r += s.charAt((3 & n) << 4 | (240 & o) >> 4), r += s.charAt((15 & o) << 2), r += "=";
                        break
                    }
                    i = t.charCodeAt(e++), r += s.charAt(n >> 2), r += s.charAt((3 & n) << 4 | (240 & o) >> 4), r += s.charAt((15 & o) << 2 | (192 & i) >> 6), r += s.charAt(63 & i)
                }
                return r
            },
            getDlinkPan: function(t, r, e, o, s, c) {
                var d, u, p, l = this;
                try {
                    p = new Function("return " + a.sign2)()
                } catch (g) {
                    throw new Error(g.message)
                }
                return "function" != typeof p ? void this._doError() : ("[object Array]" === Object.prototype.toString.call(t) ? t = n.stringify(t) : "string" != typeof t || /^\[\S+\]$/.test(t) || (t = "[" + t + "]"), d = l.base64Encode(p(a.sign5, a.sign1)), u = {
                    sign: d,
                    timestamp: a.timestamp,
                    fidlist: t,
                    type: r
                }, o && s && (u.ct = o, u.cv = s), void n.ajax({
                    url: this.URL_DLINK_PAN,
                    data: u,
                    dataType: "json",
                    type: c || "GET",
                    success: function(t, r, a) {
                        i.instanceForSystem.log.send({
                            type: "webdownload",
                            url: "//update.pan.baidu.com/statistics",
                            clienttype: "0",
                            op: "download",
                            from: u.type,
                            product: "pan",
                            success: t && 0 === +t.errno ? 1 : 0,
                            reason: t ? t.errno : 0,
                            ajaxstatus: a.status,
                            ajaxurl: "/api/download",
                            ajaxdata: n.stringify(r)
                        }), 0 == t.errno ? t.dlink && t.dlink.length > 0 ? "function" == typeof e && e(t) : l._doError() : l._doError(t.errno)
                    },
                    error: function(t, r) {
                        i.instanceForSystem.log.send({
                            type: "webdownload",
                            url: "//update.pan.baidu.com/statistics",
                            clienttype: "0",
                            op: "download",
                            from: u.type,
                            product: "pan",
                            success: 0,
                            ajaxstatus: t.status,
                            ajaxurl: "/api/download",
                            ajaxdata: n.stringify(r)
                        }), l._doError()
                    }
                }))
            },
            ajaxGetDlinkShare: function() {
                var t = {
                    encrypt: 0
                };
                0 === a.SHARE_PUBLIC && (t.extra = n.stringify({
                    sekey: decodeURIComponent(i.instanceForSystem.tools.baseService.getCookie("BDCLND"))
                }));
                var r = function() {
                    n.get("/share/autoincre", {
                        type: 1,
                        uk: a.SHARE_UK,
                        shareid: a.SHARE_ID,
                        sign: a.SIGN,
                        timestamp: a.TIMESTAMP
                    })
                };
                return function(e, a) {
                    var o = this,
                        s = n.extend({}, t, e),
                        c = s.sign,
                        d = s.timestamp;
                    delete s.sign, delete s.timestamp, shareDlink = this.URL_DLINK_SHARE + "?sign=" + c + "&timestamp=" + d, n.ajax({
                        type: "POST",
                        url: shareDlink,
                        data: s,
                        success: function(t, e, c) {
                            var d = null;
                            try {
                                d = n.parseJSON(t)
                            } catch (u) {}
                            i.instanceForSystem.log.send({
                                type: "websharedownload",
                                url: "//update.pan.baidu.com/statistics",
                                clienttype: "0",
                                op: "download",
                                from: s.product,
                                product: "pan",
                                success: d && 0 === +d.errno ? 1 : 0,
                                reason: d ? d.errno : 0,
                                ajaxstatus: c.status,
                                ajaxurl: "/api/sharedownload",
                                ajaxdata: n.stringify(e)
                            }), d && 0 == d.errno ? (s.product === o.PRODUCT_SHARE && r(), "function" == typeof a && a(d)) : o._doError(d.errno)
                        },
                        error: function(t, r) {
                            i.instanceForSystem.log.send({
                                type: "websharedownload",
                                url: "//update.pan.baidu.com/statistics",
                                clienttype: "0",
                                op: "download",
                                from: s.product,
                                product: "pan",
                                success: 0,
                                ajaxstatus: t.status,
                                ajaxurl: "/api/sharedownload",
                                ajaxdata: n.stringify(r)
                            }), o._doError()
                        }
                    }).error(function() {
                        o._doError()
                    })
                }
            }(),
            getDlinkMbox: function() {
                var t = function(t) {
                    var r = {
                            uk: a.MYUK,
                            product: s.PRODUCT_MBOX,
                            encrypt: 0,
                            timestamp: "",
                            sign: ""
                        },
                        e = {};
                    return t.vcode && (e.vcode = t.vcode, e.input = t.input), t.isForBatch === !0 && (e.type = "batch"), t.isForGuanjia === !0 && (e.encrypt = 1), t.ct && t.cv && (e.ct = t.ct, e.cv = t.cv), e = t.group_id ? n.extend({}, r, e, {
                        primaryid: t.msg_id,
                        fid_list: s.getFsidListData(t.list),
                        extra: n.stringify({
                            type: "group",
                            gid: t.group_id
                        })
                    }) : n.extend({}, r, e, {
                        primaryid: t.msg_id,
                        fid_list: s.getFsidListData(t.list),
                        extra: n.stringify({
                            type: "single",
                            from_uk: t.from_uk,
                            to_uk: t.to_uk
                        })
                    })
                };
                return function(r, e) {
                    this.arguments = arguments, this.ajaxGetDlinkShare(t(r), e)
                }
            }(),
            getDlinkShare: function() {
                var t = function(t) {
                    var r = {
                            product: s.PRODUCT_SHARE,
                            encrypt: 0,
                            timestamp: "",
                            sign: ""
                        },
                        e = {};
                    return t.vcode_input && t.vcode_str && (e.vcode_input = t.vcode_input, e.vcode_str = t.vcode_str), t.isForBatch === !0 && (e.type = "batch"), t.isForGuanjia === !0 && (e.encrypt = 1), t.ct && t.cv && (e.ct = t.ct, e.cv = t.cv), e = n.extend({}, r, e, {
                        uk: t.share_uk,
                        primaryid: t.share_id,
                        fid_list: s.getFsidListData(t.list),
                        sign: t.sign,
                        timestamp: t.timestamp
                    })
                };
                return function(r, e) {
                    this.arguments = arguments, this.ajaxGetDlinkShare(t(r), e)
                }
            }(),
            _showVerifyDialog: function() {
                var t = this;
                t.dialog = i.instanceForSystem.ui.verify({
                    title: "提示",
                    hasError: !0,
                    prod: "pan",
                    onSure: function(r, e) {
                        t.arguments[0] = r, t.arguments[1] = e, t.arguments.callee.apply(t, t.arguments)
                    }
                }), t.dialog.show()
            },
            _getcaptcha: function() {
                var t = this,
                    r = "/api/getcaptcha";
                return function(e) {
                    n.get(r, {
                        prod: "pan"
                    }, function(r) {
                        var a = null;
                        try {
                            a = n.parseJSON(r)
                        } catch (o) {}
                        a && 0 == a.errno ? "function" == typeof e && e(a) : t.doError(a.errno)
                    }).error(function(r) {
                        t.doError(r.errno)
                    })
                }
            }()
        });
    e.exports = s
});;
define("disk-system:widget/system/util/events.js", function(e, t, s) {
    var i = e("base:widget/libs/underscore.js"),
        n = {
            eventNameSplitter: /\s+/,
            on: function(e, t, s) {
                var n = this,
                    r = null;
                if (i.isFunction(t) ? null : t = this[t], !t) throw new Error('no "callback" specified using Events');
                return this._events || (this._events = {}), i.each(e.split(this.eventNameSplitter), function(e) {
                    e.length && (this._events[e] || (this._events[e] = []), this._events[e].push(function() {
                        t.apply(s || n, arguments)
                    }), this._earlyTriggers || (this._earlyTriggers = {}), this._earlyTriggers[e] && (r || (r = []), r.push({
                        eventName: e,
                        data: this._earlyTriggers[e]
                    }), delete this._earlyTriggers[e]))
                }, n), i.each(r, function(e) {
                    i.each(e.data, function(t) {
                        i.each(this._events[e.eventName], function(e) {
                            e.apply(void 0, t)
                        })
                    }, this)
                }, this), i.pendingCalls = null, n
            },
            trigger: function(e) {
                var t = Array.prototype.slice.call(arguments, 1);
                this._events && this._events[e] ? i.each(this._events[e], function(e) {
                    e.apply(void 0, t)
                }) : (this._earlyTriggers || (this._earlyTriggers = {}), this._earlyTriggers[e] || (this._earlyTriggers[e] = []), this._earlyTriggers[e].push(t))
            },
            listenTo: function(e, t, s) {
                e.on(t, s, this)
            }
        };
    s.exports = n
});;
define("disk-system:widget/system/uiRender/layout/layout.js", function(t, e, i) {
    var n = t("base:widget/libs/jquerypacket.js"),
        o = t("base:widget/libs/underscore.js"),
        s = t("system-core:system/baseService/message/message.js"),
        a = t("disk-system:widget/system/util/events.js"),
        r = function(t, e) {
            if (this.layoutElement = t instanceof n ? t : n(t), e || (e = {}), e.putSubIn) {
                if (this.contentElement = e.putSubIn instanceof n ? e.putSubIn : n(e.putSubIn), !this.contentElement.length) throw new Error('Layout error: "putSubIn" not found in DOM')
            } else this.contentElement = this.layoutElement;
            if (e.listenTo) {
                if (void 0 === e.listenTo.layoutElement) throw new Error("listenTo must be an instance of Layout");
                this.listenToMainLayout(e.listenTo)
            }
            e.hasSubLayout && this.onAddingSubLayout()
        };
    o.extend(r.prototype, a, {
        onMainLayoutChange: function(t, e) {
            "top" === t || "bottom" === t ? e = e[1] : ("right" === t || "left" === t) && (e = e[0]);
            var i = this.layoutElement.css(t);
            e = parseInt(i, 10) + parseInt(e, 10), isNaN(e) || this.layoutElement.css(t, e + "px")
        },
        listenToMainLayout: function(t) {
            this.listenTo(t, "top right bottom left", "onMainLayoutChange")
        },
        onAddingSubLayout: function() {
            this.on("top left", function(t, e) {
                this.contentElement.prepend(e)
            }), this.on("bottom right", function(t, e, i) {
                if (i) {
                    if (!this.absoluteContainer && "bottom" === t) {
                        var o = !0;
                        this.absoluteContainer = n("<div>").addClass("aside-absolute-container").css({
                            visibility: "hidden",
                            position: "absolute",
                            width: "100%"
                        })
                    }
                    var s = this.absoluteContainer.height();
                    this.absoluteContainer.height(s + e.height()), this.absoluteContainer.append(e), o && this.absoluteContainer.appendTo(this.contentElement)
                } else this.contentElement.append(e)
            })
        }
    });
    var u = {
        initLayouts: function() {
            var t = this;
            this.app = new r("#layoutApp"), this.aside = new r("#layoutAside", {
                hasSubLayout: !0,
                putSubIn: n(".module-aside")
            }), this.main = new r("#layoutMain", {
                hasSubLayout: !0
            }), s.listen("aside-render-finish", function() {
                var e = t.aside.contentElement,
                    i = t.aside.layoutElement.css("bottom");
                i = parseInt(i, 10), isNaN(i) && (i = 0);
                var o = e.find(".aside-absolute-container");
                if (o.length) {
                    var s = e.offset(),
                        a = n(window),
                        r = function() {
                            var t = n(window).height();
                            window.setTimeout(function() {
                                o.css("visibility", "visible"), t - s.top - i - o.height() < 406 ? (o.css("top", "406px"), o.css("bottom", "auto")) : (o.css("top", "auto"), o.css("bottom", "50px"))
                            }, 0)
                        };
                    r(), n(window).bind("resize", r)
                }
                if (n.browser.msie === !0 && 6 == n.browser.version) {
                    var u = n("#layoutApp"),
                        a = n(window),
                        h = function() {
                            var t = a.height();
                            u.height(t)
                        };
                    n(window).bind("resize", h), h()
                }
            })
        },
        addLayout: function(t) {
            if (!t.area) throw new Error("no area property, ERROR!");
            var e = t.size.split("*");
            if (2 !== e.length) throw new Error("wrong size property: ERROR!");
            var i = this._createSubLayout({
                width: e[0],
                height: e[1],
                bg: t.background,
                pos: t.position,
                area: t.area,
                absolute: t.absolute,
                zIndex: t.zIndex,
                containerId: t.containerId
            });
            "app" === t.area ? this.app.layoutElement.append(i) : this[t.area].trigger(t.position, t.position, i, t.absolute), s.trigger("plugin:" + t.pluginId, {
                $container: i
            })
        },
        removeSubLayout: function() {},
        _createSubLayout: function(t) {
            var e = document.createElement("div");
            return "app" !== t.area && (e.style.width = t.width, e.style.height = t.height, e.style.background = t.bg), (t.zIndex || 0 === t.zIndex) && n(e).css({
                "z-index": t.zIndex
            }), t.containerId && (e.id = t.containerId), t.absolute && (e.style.position = "absolute"), t.absolute && (this[t.area][t.pos + "Offset"] || (this[t.area][t.pos + "Offset"] = 0), e.style[t.pos] = this[t.area][t.pos + "Offset"] + "px", this[t.area][t.pos + "Offset"] += parseInt(t.height, 10)), n(e)
        }
    };
    u.initLayouts(), i.exports = u
});;
define("disk-system:widget/system/uiRender/paint/paint.js", function(e) {
    var s = (e("base:widget/libs/jquerypacket.js"), e("base:widget/libs/underscore.js")),
        t = e("system-core:data/faceData.js").getData(),
        a = e("disk-system:widget/system/uiRender/layout/layout.js"),
        i = !1;
    i && console.log(t), s.each(t.interface, function(e) {
        e.delay !== !0 && a.addLayout(e)
    })
});;
define("disk-system:widget/system/uiService/fileTree/fileTree.js", function(e, t, i) {
    var s = e("base:widget/libs/jquerypacket.js"),
        n = e("system-core:context/context.js").instanceForSystem,
        r = (e("system-core:system/baseService/message/message.js"), e("system-core:system/cache/listCache/cacheManage.js")),
        a = e("disk-system:widget/system/errorMsg/errorMsg.js"),
        o = e("disk-system:widget/pageModule/list/fileSystem/fileSystem.js");
    n.extend({
        errorMsg: function(e) {
            return "number" == typeof e || "string" == typeof e ? a[e] : void 0
        }
    });
    var l = function() {
        this._mHandleListener = disk.obtainId(), this._vHost = null, this._vTreeViewCache = {}, this.selectedCallback = null, this._vInit = !1, this._vUlContent = "", this._vInnerHtml = "", this._vSelectPath = "/", this._vSelectDom = "", this._vError = !0, this.vInitPath = "/", this.historyConfig = {
            maxLength: 40,
            overlength: !1,
            minAveragelength: 5,
            averageLength: 5
        }, this.folderCache = new r("tree", this.folderCacheConfig)
    };
    l.ROOT = 0, l.NORMAL = 1, l.PARTICULAR_DIR_MAP = {
        "/": "/全部文件",
        "/apps": "/我的应用数据",
        "/百度云收藏": "/百度云收藏",
        "/来自PC的备份文件": "/来自PC的备份文件",
        "/我的分享": "/我的分享",
        "/我的作品": "/我的作品"
    }, l.prototype.getParentPath = function(e) {
        var t = e.slice(0, e.lastIndexOf("/"));
        return t = t.length ? t : t = "/"
    }, l.prototype.folderCacheConfig = {
        api: "/api/list",
        params: {
            folder: 1,
            order: "name",
            desc: 0,
            showempty: 0,
            web: 1
        },
        limit: 500,
        currentPage: 0,
        listKey: "list",
        fileSystem: o,
        getParamsBykey: function(e) {
            return {
                dir: e
            }
        },
        getPageParams: function(e, t) {
            return {
                page: e,
                num: t
            }
        },
        getKeyByParams: function(e) {
            return e.dir
        },
        failCallBack: function(e, t, i) {
            i = i.params, i.fileTreeView._errorToast(e), i.host.parent().find(".minus").removeClass("treeview-leaf-loading")
        }
    }, l.prototype.parseNameFromPath = function(e) {
        return e.substring(e.lastIndexOf("/") + 1, e.length)
    }, l.prototype.changePath = function(e) {
        return this.parseNameFromPath(l.PARTICULAR_DIR_MAP[e] ? l.PARTICULAR_DIR_MAP[e] : e)
    }, l.prototype.build = function(e) {
        var t = (new Date).getTime();
        this._vHost = e && e.host, this.selectedCallback = e && e.selectedCallback, e && e.path && (this.vInitPath = e.path), this._vInit ? this._vError && (this._vHost.innerHTML = "", this._init()) : this._init();
        var i = (new Date).getTime() - t;
        n.log.send({
            name: "fileTreeRender",
            value: i
        })
    }, l.prototype._init = function() {
        var e = this,
            t = document.createElement("ul"),
            i = 0;
        return "/" !== e.vInitPath ? (i = 1, e.showFileHistory(e.vInitPath)) : s(".filetree-history").length && s(".filetree-history").remove(), t.className = "treeview treeview-content " + this._mHandleListener, this._vHost.appendChild(t), t.innerHTML = this._tpl({
            nodeRoot: !0,
            minus: !0,
            pdleft: i,
            nodeOn: !0,
            path: e.vInitPath
        }), this._vInit = !0, this._buildTreeView({
            dir: e.vInitPath,
            pl: 15
        }), {
            pane: t
        }
    }, l.prototype.getSelectPath = function() {
        return this._getPath(s(".treeview-node-on"))
    }, l.prototype.showFileHistory = function(e) {
        var t = this,
            i = t.historyConfig,
            n = new Array;
        if (n = e.split("/"), "/" === e) return void(s(".filetree-history").length && s(".filetree-history").remove());
        if (e.length > i.maxLength) {
            t.historyConfig.overlength = !0;
            var r = parseInt(i.maxLength / n.length);
            t.historyConfig.averageLength = r > i.minAveragelength + 3 ? r : 5
        } else t.historyConfig.overlength = !1;
        t.buildHistory(n), t.handleEvent()
    }, l.prototype.buildHistory = function(e) {
        var t = this,
            i = t.historyConfig,
            n = "",
            r = "",
            a = "";
        i.maxDeep = parseInt(i.maxLength / (i.minAveragelength + 3)), a = i.averageLength === i.minAveragelength && e.length > i.maxDeep + 1 ? '<span class="filetree-history-item" node-type="filetree-history-item" path="/">全部文件</span><span class="filetree-separator-gt">></span><span class="dot">...</span>' : '<span class="filetree-history-item" node-type="filetree-history-item" path="/">全部文件</span>';
        for (var o = 1; o < e.length; o++) n = n + "/" + e[o], r = t.historyConfig.overlength && e[o].length > i.maxDeep + 1 ? e[o].substring(0, t.historyConfig.averageLength) + "..." : e[o], i.averageLength === i.minAveragelength && e.length > i.maxDeep + 1 ? o > e.length - (i.maxDeep + 1) && (a = a + '<span class="filetree-separator-gt">></span><span class="filetree-history-item" node-type="filetree-history-item" path="' + n + '">' + r + "</span>") : a = a + '<span class="filetree-separator-gt">></span><span class="filetree-history-item" node-type="filetree-history-item" path="' + n + '">' + r + "</span>";
        s(".filetree-history").length ? s(".filetree-history").html(a) : s(t._vHost).before('<div class="filetree-history">' + a + "</div>")
    }, l.prototype._buildTreeView = function(e) {
        var t = this,
            i = "",
            n = e.dir || "/",
            r = e.host || s(".treeview-root-content"),
            a = e.pl;
        r.parent().find(".minus").addClass("treeview-leaf-loading"), this.folderCache.updateKey(n), this.folderCache.getCacheData(-1, function(e) {
            t._vError = !0, t._vTreeViewCache = e;
            for (var s = 0; s < t._vTreeViewCache.length; s++) i += t._tpl({
                dirEmpty: t._vTreeViewCache[s].dir_empty,
                pdleft: a,
                path: t._vTreeViewCache[s].path
            });
            r.html(i).attr("_pl", a), t.handleEvent(), r.parent().find(".minus").removeClass("treeview-leaf-loading")
        }, {
            host: r,
            fileTreeView: t
        })
    }, l.prototype._tpl = function(e) {
        var t = "",
            i = e.pdleft,
            s = e.path,
            n = e.dirEmpty ? "treenode-empty" : "",
            r = e.nodeOn ? "treeview-node-on" : "",
            a = e.nodeRoot ? "treeview-root" : "",
            o = e.nodeRoot ? "treeview-root-content" : "",
            l = e.minus ? "minus" : "",
            h = e.minus ? "_minus" : "",
            p = e.minus ? "" : "treeview-collapse",
            d = ["<li>", '<div class="treeview-node %dirEmpty% %node-on% %node-root% %_minus%" _pl="%pl%" style="padding-left:%pl%">', '<span class="treeview-node-handler">', '<em class="b-in-blk plus icon-operate %minus%" ></em>', '<dfn class="b-in-blk treeview-ic"></dfn>', '<span class="treeview-txt" node-path="%nodePath%">%fileName%</span>', "</span>", "</div>", '<ul class="treeview %node-root-cont% treeview-content %collapse%" _pl="%pl2%"></ul>', "</li>"];
        return t = d.join("").replace(/%fileName%/g, this.changePath(s)).replace(/%nodePath%/g, s).replace(/%node-on%/g, r).replace(/%collapse%/g, p).replace(/%pl%/g, i + "px").replace(/%pl2%/g, i + 15 + "px").replace(/%node-root%/g, a).replace(/%minus%/g, l).replace(/%_minus%/g, h).replace(/%node-root-cont%/g, o).replace(/%dirEmpty%/g, n)
    }, l.prototype.handleEvent = function() {
        var e = this;
        s(".treeview-node").off().on({
            mouseenter: function() {
                s(this).addClass("treeview-node-hover")
            },
            mouseleave: function() {
                s(this).removeClass("treeview-node-hover")
            },
            click: function() {
                var t = s(this).hasClass("_minus"),
                    i = s(this).hasClass("treeview-node-on"),
                    n = s(this).hasClass("treenode-empty"),
                    r = s(this).attr("_pl"),
                    a = (s(this).hasClass("waitHandle"), e._getPath(s(this))),
                    o = s(this).next("ul");
                i || (s(".treeview-node-on").removeClass("treeview-node-on"), s(this).addClass("treeview-node-on")), i && t || n ? (s(this).removeClass("_minus").find(".plus").removeClass("minus"), o.addClass("treeview-collapse")) : (s(this).addClass("_minus").find(".plus").addClass("minus"), o.removeClass("treeview-collapse")), "function" == typeof e.selectedCallback && e.selectedCallback.call(e.selectedCallback), 0 !== s(this).next("ul").children().length || n || e._buildTreeView({
                    dir: a,
                    host: o,
                    pl: parseInt(r) + 15
                }), "/" !== e.vInitPath && e.showFileHistory(a)
            }
        }), s(".filetree-history-item").off().on({
            click: function() {
                var t = s(this).attr("path");
                "function" == typeof e.selectedCallback && e.selectedCallback.call(e.selectedCallback), e.build({
                    host: e._vHost,
                    path: t || "/"
                }), e.showFileHistory(t)
            }
        })
    }, l.prototype._getPath = function(e) {
        var t = this,
            i = e,
            s = parseInt(i.attr("_pl")) / 15 - 1,
            n = [];
        return -1 == s ? n = "/" : void 0 != i.find(".treeview-txt").attr("node-path") ? n = i.find(".treeview-txt").attr("node-path") : void 0 == i.find(".treeview-txt").attr("node-path") ? (i = i.parent().parent(), n = i.prev().find(".treeview-txt").attr("node-path")) : n = "/", t._vSelectPath = n, t._vSelectPath
    }, l.prototype._errorToast = function(e) {
        var t = n.errorMsg(e.errno) || "列表加载失败，请稍后重试&hellip;";
        this._vError = !1;
        n.ui.tip({
            mode: "failure",
            msg: t
        });
        return !1
    }, l.obtain = new l, i.exports = l.obtain
});;
define("disk-system:widget/system/uiService/fileTree/createFolder.js", function(e, t, s) {
    var n = e("base:widget/libs/jquerypacket.js"),
        i = e("system-core:context/context.js").instanceForSystem,
        r = e("disk-system:widget/system/fileService/fileManagerApi/fileManagerApi.js"),
        a = e("disk-system:widget/system/uiService/fileTree/fileTree.js"),
        l = function() {
            this._mConfirmById = disk.obtainId(), this._mCancleById = disk.obtainId(), this._mInputById = disk.obtainId(), this._mSingle = !1, this._mInsertDom = "", this._mEmpty = !1
        };
    l.ILLEGAL_CHARS = /[\\\/\:\*\?"<>|]/gi, l.obtain = "", l.prototype = {
        reBuild: function(e) {
            if (!e || !e.insertDom) throw Error('you need to specify "insertDom"');
            if (this._mInsertDom = e.insertDom, !e || !e.container) throw new Error('you need to specify "container"');
            this._mContainer = e.container, this._createDom()
        },
        _restNewFolder: function() {
            var e = this,
                t = n("." + e._mInputById).val(),
                s = e.path + "/" + t;
            n("#plus-createFolder").find(".sprite-ic2").addClass("treeview-leaf-loading"), r.createNewDir(s, function(s, r, l) {
                if (0 !== s) {
                    {
                        i.ui.tip({
                            mode: "caution",
                            msg: r
                        })
                    }
                    return !1
                }
                0 === l.path.indexOf(i.list.getCurrentPath()) && (i.list.removeCacheByPath(i.list.getCurrentPath()), i.list.addItemToFirst(void 0), i.list.refresh()), t = l.name || l.path, t = t.substring(t.lastIndexOf("/") + 1), n("#plus-createFolder").remove(), n(".treeview-node-on").removeClass("treeview-node-on"), e._mInsertDom.append(e._listTpl(l.path)), a.handleEvent()
            }, t)
        },
        _createDom: function() {
            var e = this;
            document.getElementById("plus-createFolder") && n("#plus-createFolder").remove(), e._mInsertDom.prev().hasClass("treenode-empty") ? (e._mInsertDom.append(e._folderTpl()).removeClass("treeview-collapse").prev().removeClass("treenode-empty").addClass("_minus").find("em").addClass("minus"), e._mEmpty = !0) : (e._mInsertDom.prev().addClass("_minus").find(".plus").addClass("minus"), e._mInsertDom.removeClass("treeview-collapse"), e._mInsertDom.append(e._folderTpl()), e._mEmpty = !1), e._setOffset(), e._handleInit(), e.path = a.getSelectPath(), a.handleEvent()
        },
        _setOffset: function() {
            var e = n("#plus-createFolder").position().top;
            e = this._mContainer.scrollTop() + e - 211, this._mContainer.scrollTop(e)
        },
        _cancleDom: function() {
            _this = this;
            var e = n("#plus-createFolder");
            _this._mEmpty ? (e.parent().prev().addClass("treeview-node-on"), e.remove(), _this._mInsertDom.addClass("treeview-collapse").prev().addClass("treenode-empty").removeClass("_minus").find("em").removeClass("minus")) : (e.parent().prev().addClass("treeview-node-on"), e.remove())
        },
        _folderTpl: function() {
            var e = parseInt(this._mInsertDom.attr("_pl")),
                t = ['<li id="plus-createFolder">', '<div class="treeview-node treenode-empty" _pl="' + e + '" style="padding-left:' + e + 'px">', '<span class="treeview-node-handler">', '<em class="b-in-blk plus sprite-ic2 "></em>', '<dfn class="b-in-blk treeview-ic"></dfn>', '<span class="plus-create-folder">', '<input class="input ' + this._mInputById + '" type="text" value="新建文件夹">', '<span class="sure ' + this._mConfirmById + '"></span>', '<span class="cancel ' + this._mCancleById + '"></span>', "</span>", "</span>", "</div>", '<ul class="treeview treeview-content treeview-collapse"  _pl="' + (e + 15) + '"></ul>', "</li>"];
            return t = t.join("")
        },
        _listTpl: function(e) {
            var t = parseInt(this._mInsertDom.attr("_pl")),
                s = ["<li>", '<div class="treeview-node treenode-empty treeview-node-on" _pl="' + t + '" style="padding-left:' + t + 'px">', '<span class="treeview-node-handler">', '<em class="b-in-blk plus sprite-ic2 "></em>', '<dfn class="b-in-blk treeview-ic"></dfn>', '<span class="treeview-txt" node-path="' + e + '">' + i.tools.baseService.toEntity(e.substring(e.lastIndexOf("/") + 1)) + "</span>", "</span>", "</div>", '<ul class="treeview treeview-content treeview-collapse" _pl="' + (t + 15) + '"></ul>', "</li>"];
            return s = s.join("")
        },
        _handleInit: function() {
            var e = this;
            n("." + e._mInputById).select().focus().on({
                blur: function() {},
                keyup: function(t) {
                    13 == t.keyCode && e._restNewFolder()
                }
            }), n("." + e._mConfirmById).click(function() {
                e._restNewFolder()
            }), n("." + e._mCancleById).click(function() {
                e._cancleDom()
            })
        }
    }, l.obtain = l.obtain || new l, s.exports = l.obtain
});;
define("disk-system:widget/system/uiService/fileTreeDialog/fileTreeDialog.js", function(e, i, t) {
    var a = e("base:widget/libs/jquerypacket.js"),
        o = e("base:widget/libs/underscore.js"),
        s = e("disk-system:widget/system/uiService/fileTree/fileTree.js"),
        n = e("system-core:system/uiService/dialog/dialog.js"),
        l = e("system-core:context/context.js").instanceForSystem,
        c = function() {
            this.config = {}, this.dialog = null, this.zipPath = "/"
        };
    c.singleton = null, c.obtain = function() {
        return null === c.singleton && (c.singleton = new c), c.singleton
    }, c.DIALOG_ID = "fileTreeDialog", c.prototype.getFileTree = function(e) {
        var i = this,
            t = {
                host: this.dialog.$dialog.find(".file-tree-container")[0],
                path: e || "/"
            };
        e && "/" !== e && a.extend(!0, t, {
            selectedCallback: i.selectedCallback
        }), s.build(t)
    }, c.prototype.setOptions = function(e) {
        if (!e) throw new Error("[fileTreeDialog] must set options for FileTreeDialog");
        if (!e.title) throw new Error('[fileTreeDialog] title "' + e.title + '" should be set');
        if (this.config.title = e.title, !o.isFunction(e.confirm)) throw new Error("[fileTreeDialog] confirm should be set");
        this.confirm = e.confirm, e.zipPath && (this.zipPath = e.zipPath), o.isFunction(e.afterHide) && (this.afterHide = e.afterHide), this.cancel = e.cancel
    }, c.prototype.buildDialog = function() {
        var i = this;
        this.dialog = new n({
            id: c.DIALOG_ID,
            title: this.config.title,
            body: '<div class="file-tree-container"></div>',
            draggable: !0,
            position: {
                xy: "center"
            },
            buttons: [{
                name: "cancel",
                title: "取消",
                type: "big",
                padding: ["50px", "50px"],
                position: "right",
                click: function() {
                    i.dialog.hide(), "function" == typeof i.cancel && i.cancel()
                }
            }, {
                name: "confirm",
                title: "确定",
                type: "big",
                color: "blue",
                padding: ["50px", "50px"],
                position: "right",
                click: function() {
                    var e = s.getSelectPath() || {};
                    a(".save-zip-path").length && a(".save-zip-path").hasClass("check") && (e = i.getSavePath()), i.confirm(e)
                }
            }, {
                title: "新建文件夹",
                icon: "icon-newfolder",
                type: "big",
                position: "left",
                click: function() {
                    var t = i.dialog.$dialog,
                        a = i.dialog.$dialog.find(".treeview-node-on");
                    e.async("disk-system:widget/system/uiService/fileTree/createFolder.js", function(e) {
                        e.reBuild({
                            insertDom: a.next(".treeview-content"),
                            container: t.find(".file-tree-container")
                        })
                    })
                }
            }],
            afterHide: function() {
                "function" == typeof i.afterHide && i.afterHide()
            }
        }), this.bindSavePathEvent()
    }, c.prototype.changeTitle = function() {
        this.config.title && this.dialog.title(this.config.title)
    }, c.prototype.show = function(e) {
        var i = (new Date).getTime();
        this.setOptions(e), this.dialog || this.buildDialog(), this.changeTitle(), this.dialog.show(), e.zipPath ? this.showZipPath(e.zipPath) : a(".save-zip-path").length && a(".save-zip-path").remove(), this.getFileTree();
        var t = (new Date).getTime() - i;
        return l.log.send({
            name: "dialogShow-file",
            value: t
        }), this
    }, c.prototype.hide = function() {
        return this.dialog.hide(), this
    }, c.prototype.showZipPath = function(e) {
        var i = this;
        a(".save-zip-path").length ? (a(".save-zip-path").html('<span class="save-chk-io"></span>解压到压缩包所在目录：' + e), a(".save-zip-path").attr("title", e), a(".save-zip-path").removeClass("check")) : i.dialog.$dialog.find(".dialog-body").after('<div class="save-zip-path" title="' + e + '"><span class="save-chk-io"></span>解压到压缩包所在目录：' + e + "</div>")
    }, c.prototype.getSavePath = function() {
        var e = null;
        return a(".save-zip-path").length && a(".save-zip-path").hasClass("check") && (e = this.zipPath), e
    }, c.prototype.bindSavePathEvent = function() {
        var e = this,
            i = e.dialog.$dialog;
        i.on("click", ".save-zip-path", function() {
            var i = a(this).attr("class");
            i.indexOf("check") >= 0 ? (a(this).removeClass("check"), e.getFileTree("/")) : (a(this).addClass("check"), e.getFileTree(e.zipPath))
        })
    }, c.prototype.selectedCallback = function() {
        a(".save-zip-path").length && a(".save-zip-path").hasClass("check") && a(".save-zip-path").removeClass("check")
    }, t.exports = c.obtain()
});;
define("disk-system:widget/system/uiService/navigator/navigator.js", function(e, i, s) {
    var t = (e("base:widget/libs/jquerypacket.js"), {});
    s.exports = t
});;
define("disk-system:widget/system/uiService/passAPI/passAPI.js", function(o, n, i) {
    var t = o("base:widget/libs/jquerypacket.js"),
        s = {},
        e = s.PassLoginDialog = function() {};
    e._mLoginStatic = 0, e.reload = !1, e.singleton = null, e.obtain = function() {
        return e.singleton ? e.singleton : e.singleton = new e
    }, e.onLoginSuccessCallback = function() {
        disk.DEBUG && console.log("login hide!")
    }, e.onLoginHideCallback = function() {
        disk.DEBUG && console.log("login hide!")
    };
    var a = t.ajax({
        async: !0,
        url: location.protocol + "//passport.baidu.com/passApi/js/uni_login_wrapper.js?cdnversion=" + (new Date).getTime(),
        dataType: "script",
        success: function() {
            var o = encodeURIComponent(location.href);
            s.PassportInit = passport.pop.init({
                apiOpt: {
                    staticPage: location.protocol + "//" + location.host + "/res/static/thirdparty/pass_v3_jump.html",
                    product: "netdisk",
                    u: location.href,
                    overseas: 1,
                    memberPass: !0,
                    safeFlag: 0
                },
                cache: !1,
                registerLink: "https://passport.baidu.com/v2/?reg&regphone=1&tpl=netdisk&u=" + o,
                authsite: ["tsina", "qzone", "renren"],
                authsiteCfg: {
                    act: "implicit"
                },
                onLoginSuccess: function(o) {
                    yunData.LOGINSTATUS = 1, o.returnValue = e.reload, e.reload && window.location.reload(), e.onLoginSuccessCallback(o)
                },
                onHide: function() {},
                onShow: function() {},
                tangram: !0
            }), s.PassportInit.netdiskLogin = function(o) {
                var n = o.reload;
                e.reload = n, setTimeout(function() {
                    s.PassportInit.show()
                }, 100)
            }
        }
    });
    i.exports = {
        promise: a,
        passAPI: s
    }
});;
define("disk-system:widget/system/uiService/userService/getData.js", function(e, t, a) {
    "use strict";
    var c = e("base:widget/libs/jquerypacket.js"),
        s = e("system-core:context/context.js").instanceForSystem,
        n = function(e) {
            c.ajax({
                type: e.type || "get",
                url: e.url,
                dataType: e.dataType || "json",
                timeout: 3e3,
                data: c.extend(e.data, {
                    t: (new Date).getTime()
                }),
                success: function(t) {
                    var a = null;
                    try {
                        a = c.parseJSON(t) || t
                    } catch (s) {}
                    0 === a.errno ? "function" == typeof e.succCallback && e.succCallback.call(e.succCallback, a) : l(e.failCallback, a)
                }
            }).error(function(t) {
                var a = null,
                    s = null;
                t && (a = t.error_code, s = t.responseText);
                try {
                    s = c.parseJSON(t.responseText)
                } catch (n) {}
                l(e.failCallback, s)
            })
        },
        l = function(e, t) {
            "function" == typeof e ? e.call(e, t) : (disk.DEBUG && console.log(""), s.ui.tip({
                mode: "caution",
                msg: "网络错误，请稍候重试"
            }))
        };
    a.exports = n
});;
define("disk-system:widget/system/uiService/userService/addFriendService.js", function(e, i, n) {
    "use strict";
    var c, t = e("base:widget/libs/jquerypacket.js"),
        o = e("disk-system:widget/system/uiService/userService/getData.js"),
        r = e("system-core:context/context.js").instanceForSystem,
        a = function(e) {
            this.member = e.member, this.verifyCancelFunc = e.verifyCancelFunc, this.whenVerifyCodeDialog = e.whenVerifyCodeDialog, this.addSuccFunc = e.addSuccFunc, this.flagFirst = !0, this.vcode = null, this.input = null, this.$shareDailog = t("#share")
        };
    a.ADD_FOLLOW = "/mbox/relation/addfollow", a.prototype.addFollow = function() {
        var e = this,
            i = {};
        i = null === e.vcode && null === e.input ? {
            uk: e.member.uk,
            type: "normal"
        } : {
            uk: e.member.uk,
            type: "normal",
            input: e.input,
            vcode: e.vcode
        }, o({
            url: a.ADD_FOLLOW,
            data: i,
            succCallback: function(i) {
                e.flagFirst = !0, "function" == typeof e.addSuccFunc ? e.addSuccFunc.call(e.addSuccFunc, i) : r.ui.tip({
                    mode: "success",
                    msg: "添加好友成功"
                })
            },
            failCallback: function(i) {
                var n = "网络错误，请稍候重试";
                i && -19 === i.errno ? e.showVerifyDialog(i.img, i.vcode) : (i && 2117 === i.errno ? n = "好友超出限制了" : i && 2118 === i.errno ? n = "已经是好友" : i && 2115 === i.errno ? n = "不能添加自己为好友" : e.flagFirst || "function" != typeof e.verifyCancelFunc || e.verifyCancelFunc.call(e.verifyCancelFunc), r.ui.tip({
                    mode: "caution",
                    msg: n
                }))
            }
        })
    }, a.prototype.showVerifyDialog = function(e, i) {
        var n = this,
            t = {
                img: e,
                vcode: i
            };
        c = r.ui.verify({
            title: "提示",
            hasError: this.flagFirst,
            onSure: function(e, i) {
                n.input = i, n.vcode = e, n.addFollow(), c.hide()
            },
            onCancel: function() {
                "function" == typeof n.verifyCancelFunc && n.verifyCancelFunc.call(n.verifyCancelFunc), n.flagFirst = !0, n.$shareDailog.show(), c.hide()
            }
        }, t), c.show(), "function" == typeof n.whenVerifyCodeDialog && n.whenVerifyCodeDialog.call(n.whenVerifyCodeDialog), n.flagFirst = !1
    }, n.exports = a
});;
define("disk-system:widget/system/uiService/userService/createGroupService.js", function(e, i, c) {
    "use strict";
    var n, t = e("base:widget/libs/jquerypacket.js"),
        a = e("system-core:context/context.js").instanceForSystem,
        r = e("disk-system:widget/system/uiService/userService/getData.js"),
        o = function(e) {
            this.data = e.data, this.verifyCancelFunc = e.verifyCancelFunc, this.whenVerifyCodeDialog = e.whenVerifyCodeDialog, this.addSuccFunc = e.addSuccFunc, this.addFailFunc = e.addFailFunc, this.flagFirst = !0, this.vcode = null, this.input = null, this.$shareDailog = t("#share")
        };
    o.createGroupUrl = "/mbox/group/create", o.prototype.createGroup = function() {
        var e = this,
            i = {};
        i = null === e.vcode && null === e.input ? e.data : t.extend(e.data, {
            input: e.input,
            vcode: e.vcode
        }), r({
            url: o.createGroupUrl,
            data: i,
            succCallback: function(i) {
                e.flagFirst = !0, "function" == typeof e.addSuccFunc ? e.addSuccFunc.call(e.addSuccFunc, i) : a.ui.tip({
                    mode: "sucess",
                    msg: "创建群组成功"
                })
            },
            failCallback: function(i) {
                var c = "网络错误，请稍候重试";
                i && -19 === i.errno ? e.showVerifyDialog(i.img, i.vcode) : "function" == typeof e.addFailFunc ? e.addFailFunc.call(e.addFailFunc, i) : (i && 2101 === i.errno ? c = "你已达到创建2000群上限" : i && 2100 === i.errno ? c = "用户都已经被添加过" : i && 2119 === i.errno ? c = "群成员已满" : i && -60 === i.errno ? c = "群成员超过上限" : i && -20 === i.errno ? c = "获取验证码失败" : i && -73 === i.errno && (c = "创建群个数超过上限"), a.ui.tip({
                    mode: "caution",
                    msg: c
                }))
            }
        })
    }, o.prototype.showVerifyDialog = function(e, i) {
        var c = this,
            t = ({
                scope: c,
                onSubmitFunc: function(e, n) {
                    c.input = n, c.vcode = i, c.createGroup()
                },
                onCancelFunc: function() {
                    "function" == typeof c.verifyCancelFunc && c.verifyCancelFunc.call(c.verifyCancelFunc), c.flagFirst = !0
                },
                flagFirst: c.flagFirst
            }, {
                img: e,
                vcode: i
            });
        n = a.ui.verify({
            title: "提示",
            hasError: this.flagFirst,
            onSure: function(e, i) {
                c.input = i, c.vcode = e, c.createGroup(), n.hide()
            },
            onCancel: function() {
                "function" == typeof c.verifyCancelFunc && c.verifyCancelFunc.call(c.verifyCancelFunc), c.flagFirst = !0, c.$shareDailog.show(), n.hide()
            }
        }, t), n.show(), "function" == typeof c.whenVerifyCodeDialog && c.whenVerifyCodeDialog.call(c.whenVerifyCodeDialog), c.flagFirst = !1
    }, c.exports = o
});;
define("disk-system:widget/system/uiService/userService/searchUserService.js", function(e, i, c) {
    "use strict";
    var s, t = e("base:widget/libs/jquerypacket.js"),
        n = e("system-core:context/context.js").instanceForSystem,
        r = e("disk-system:widget/system/uiService/userService/getData.js"),
        a = function(e) {
            this.query = e.query, this.verifyCancelFunc = e.verifyCancelFunc, this.whenVerifyCodeDialog = e.whenVerifyCodeDialog, this.searchSuccFunc = e.searchSuccFunc, this.searchFailFunc = e.searchFailFunc, this.flagFirst = !0, this.vcode = null, this.input = null, this.$shareDailog = t("#share")
        };
    a.SEARCH_RUL = "/api/user/search", a.prototype.searchUser = function() {
        this.flagFirst === !0 && n.ui.tip({
            mode: "loading",
            msg: "正在搜索用户",
            autoClose: !1
        });
        var e = this,
            i = {};
        i = null === e.vcode && null === e.input ? e.query : t.extend(e.query, {
            input: e.input,
            vcode: e.vcode
        }), r({
            url: a.SEARCH_RUL,
            data: i,
            succCallback: function(i) {
                e.flagFirst = !0, n.ui.hideTip(), "function" == typeof e.searchSuccFunc && e.searchSuccFunc.call(e.searchSuccFunc, i)
            },
            failCallback: function(i) {
                var c = "网络错误，请稍候重试";
                n.ui.hideTip(), i && -19 === i.errno ? e.showVerifyDialog(i.img, i.vcode) : (i && -80 === i.errno && (c = "朋友虽好，可别贪多。明天再来搜吧"), n.ui.tip({
                    mode: "caution",
                    msg: c
                }), "function" == typeof e.searchFailFunc && e.searchFailFunc.call(e.searchFailFunc, i))
            }
        })
    }, a.prototype.showVerifyDialog = function(e, i) {
        var c = this,
            t = {
                img: e,
                vcode: i
            };
        s = n.ui.verify({
            title: "提示",
            hasError: this.flagFirst,
            onSure: function(e, i) {
                c.vcode = e, c.input = i, c.searchUser(), s.hide()
            },
            onCancel: function() {
                "function" == typeof c.verifyCancelFunc && c.verifyCancelFunc.call(c.verifyCancelFunc), c.flagFirst = !0, c.$shareDailog.show(), s.hide()
            }
        }, t), s.show(), "function" == typeof c.whenVerifyCodeDialog && c.whenVerifyCodeDialog.call(c.whenVerifyCodeDialog), c.flagFirst = !1
    }, c.exports = a
});;
define("disk-system:widget/system/util/contextExtend.js", function(e) {
    var n = e("system-core:context/context.js").instanceForSystem,
        t = e("disk-system:widget/data/yunData.js"),
        i = e("disk-system:widget/system/fileService/fileOperate/fileOperate.js"),
        o = e("system-core:system/uiService/list/list.js"),
        r = e("system-core:system/uiService/dialog/dialog.js"),
        d = e("system-core:system/uiService/button/button.js"),
        a = {
            buttonType: "big",
            buttonPadding: ["50px", "50px"],
            buttonColor: "blue"
        },
        u = {
            paddingLeft: 10,
            paddingRight: 10,
            height: 34
        };
    n.extend({
        file: {
            getIconAndPlugin: function(e, n, t) {
                return i.getInfo(e, n, !1, t)
            },
            isOpenedFile: function(e, n) {
                return i.isOpenedFile(e, n)
            },
            getFileInfo: function(e, n, t, o, r) {
                return i.getInfo(e, n, t, o, r)
            }
        },
        data: {
            user: t.get(),
            quota: {
                get: function() {
                    return [100, 1e10]
                },
                update: function(e) {
                    e.call(null, 100, 1e10)
                },
                hasEnoughSpacing: function() {
                    return window.yunData && window.yunData.QUOTAINFOS ? window.yunData.QUOTAINFOS.used < window.yunData.QUOTAINFOS.total : !0
                }
            }
        },
        ui: {
            list: function(e, n) {
                var t = new o(e, n);
                return t.extend({
                    resizeScrollBar: function(e) {
                        var n = this.$container;
                        if ("number" == typeof e || "string" == typeof e ? n.height(e) : e = n.height(), 0 === e) throw "[Error] list container's height is 0, need to set";
                        n.height(e);
                        var t = this.listHeader.hasInit === !1 ? 0 : 52;
                        "none" === n.find(".module-history-list").css("display") ? (n.find(".module-list-view").height(e - t).find(".scrollbar-tracker").height(e - t - 2), n.find(".module-grid-view").height(e - t).find(".scrollbar-tracker").height(e - t - 2)) : (n.find(".module-list-view").height(e - 73).find(".scrollbar-tracker").height(e - 73), n.find(".module-grid-view").height(e - 73).find(".scrollbar-tracker").height(e - 73))
                    }
                }), t
            },
            confirm: function(e, n, t, i, o) {
                return window.yunHeader && window.yunHeader.fontIe && window.yunHeader.fontIe.api && window.yunHeader.fontIe.api.doAddIcon(), r.confirm.call(r, e, n, t, i, o, a)
            },
            alert: function(e, n) {
                return window.yunHeader && window.yunHeader.fontIe && window.yunHeader.fontIe.api && window.yunHeader.fontIe.api.doAddIcon(), r.alert.call(r, e, n, a)
            },
            verify: function(e, n, t, i, o) {
                return window.yunHeader && window.yunHeader.fontIe && window.yunHeader.fontIe.api && window.yunHeader.fontIe.api.doAddIcon(), r.verify.call(r, e, n, t, i, o, a)
            },
            button: function(e) {
                return e.buttonDefaultConfig = u, new d(e)
            }
        }
    })
});;
define("disk-system:widget/system/util/message.js", function(e, t, s) {
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
            for (var t = this.events[e].handlers, s = [].slice.call(arguments, 1), n = 0, i = t.length; i > n; n++) t[n].apply(void 0, s);
            this.doPlugins(arguments)
        },
        manage: function(e) {
            "function" == typeof e && this.pluginHandlers.push(e)
        }
    }), s.exports = r
});;
!
    function() {
        var e = window,
            n = e.document,
            o = require("base:widget/libs/jquerypacket.js"),
            t = require("base:widget/libs/underscore.js"),
            i = require("disk-system:widget/data/yunData.js").get(),
            r = require("system-core:system/baseService/message/message.js"),
            c = require("system-core:context/context.js"),
            a = require("disk-system:widget/system/util/pcsDownloadUtil.js"),
            s = require("base:widget/tools/tools.js");
        !
            function(n) {
                void 0 === n && (n = e.disk = {}), n.DEBUG = function() {
                    var n = e.location.host;
                    return e.console ? "pan.baidu.com" === n || "lab.pan.baidu.com" === n ? !1 : !0 : !1
                }(), n.uniqueId = 0, n.obtainId = function() {
                    return "_disk_id_" + ++n.uniqueId
                }, n.common = {}
            }(e.disk);
        var u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/~！@#￥%……&",
            l = String.fromCharCode,
            f = function(e) {
                if (e.length < 2) {
                    var n = e.charCodeAt(0);
                    return 128 > n ? e : 2048 > n ? l(192 | n >>> 6) + l(128 | 63 & n) : l(224 | n >>> 12 & 15) + l(128 | n >>> 6 & 63) + l(128 | 63 & n)
                }
                var n = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
                return l(240 | n >>> 18 & 7) + l(128 | n >>> 12 & 63) + l(128 | n >>> 6 & 63) + l(128 | 63 & n)
            },
            d = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,
            g = function(e) {
                return (e + "" + Math.random()).replace(d, f)
            },
            m = function(e) {
                var n = [0, 2, 1][e.length % 3],
                    o = e.charCodeAt(0) << 16 | (e.length > 1 ? e.charCodeAt(1) : 0) << 8 | (e.length > 2 ? e.charCodeAt(2) : 0),
                    t = [u.charAt(o >>> 18), u.charAt(o >>> 12 & 63), n >= 2 ? "=" : u.charAt(o >>> 6 & 63), n >= 1 ? "=" : u.charAt(63 & o)];
                return t.join("")
            },
            w = function(e) {
                return e.replace(/[\s\S]{1,3}/g, m)
            },
            h = function() {
                return w(g((new Date).getTime()))
            },
            p = function(e, n) {
                return n ? h(String(e)).replace(/[+\/]/g, function(e) {
                    return "+" == e ? "-" : "_"
                }).replace(/=/g, "") : h(String(e))
            };
        if (function() {
                o(document).ajaxSend(function(e, n, o) {
                    var t = p(c.instanceForSystem.tools.baseService.getCookie("BAIDUID"));
                    o.url += /\?/.test(o.url) ? "&channel=chunlei&web=1&app_id=250528" : "?channel=chunlei&web=1&app_id=250528", ("script" !== o.dataType || o.cache !== !0) && (o.url += "&bdstoken=" + i.bdstoken + "&logid=" + t), o.url += "/disk/plugin" === location.pathname ? "&clienttype=8&version=4.9.9.9" : "132" === s.getParam("msg") && s.getParam("devuid") ? "&clienttype=8" : "&clienttype=0"
                })
            }(), function(e) {
                var n = e.async;
                e.async = function(e, o, t) {
                    n(e, function() {
                        "function" == typeof o && o.apply(this, arguments)
                    }, function() {
                        "function" == typeof t && t.apply(this, arguments)
                    })
                }
            }(require), function(e) {
                var n = e.location.host;
                "undefined" != typeof e.console || "pan.baidu.com" !== n && "yun.baidu.com" !== n || (e.console = {
                    log: function() {},
                    assert: function() {},
                    info: function() {},
                    warn: function() {},
                    error: function() {}
                })
            }(e), function() {
                o.browser.msie && 6 === parseInt(o.browser.version, 10) && n.execCommand("backgroundimagecache", !1, !0)
            }(), function(e) {
                e.trim || (e.trim = function() {
                    return this.replace(/^\s+|\s+$/g, "")
                })
            }(String.prototype), function(e) {
                e.disk.logger = function(e) {
                    var n = {
                            debug: "DEBUG",
                            info: "INFO",
                            warn: "WARN",
                            error: "ERROR",
                            fatal: "FETAL"
                        },
                        t = {
                            blue: "#52A7A2",
                            green: "#33B136",
                            yellow: "#C3C852",
                            red: "#971C1E",
                            purple: "#8C2C85"
                        },
                        i = function() {
                            var e = new Date,
                                n = e.getMonth() + 1,
                                o = e.getDate(),
                                t = e.getHours(),
                                i = e.getMinutes(),
                                r = e.getMinutes(),
                                c = e.getMilliseconds();
                            return e.getFullYear() + "-" + (String(n).length < 2 ? "0" + n : n) + "-" + (String(o).length < 2 ? "0" + o : o) + " " + (String(t).length < 2 ? "0" + t : t) + ":" + (String(i).length < 2 ? "0" + i : i) + ":" + (String(r).length < 2 ? "0" + r : r) + "." + c
                        },
                        r = function(e, n) {
                            return o.browser.msie && parseInt(o.browser.version, 10) <= 8 ? "[QA] [" + i() + "] [" + e + "]  - " + n : "%c[QA] [" + i() + "] [" + e + "]  - " + n
                        };
                    return disk.DEBUG ? o.browser.msie && parseInt(o.browser.version, 10) <= 8 ? {
                        debug: function(o) {
                            e.log(r(n.debug, o))
                        },
                        info: function(o) {
                            e.log(r(n.info, o))
                        },
                        warn: function(o) {
                            e.log(r(n.warn, o))
                        },
                        error: function(o) {
                            e.log(r(n.error, o))
                        },
                        fatal: function(o) {
                            e.log(r(n.fatal, o))
                        }
                    } : {
                        debug: function(o) {
                            e.log(r(n.debug, o), "color: " + t.blue)
                        },
                        info: function(o) {
                            e.log(r(n.info, o), "color: " + t.green)
                        },
                        warn: function(o) {
                            e.log(r(n.warn, o), "color: " + t.yellow)
                        },
                        error: function(o) {
                            e.log(r(n.error, o), "color: " + t.red)
                        },
                        fatal: function(o) {
                            e.log(r(n.fatal, o), "color: " + t.purple)
                        }
                    } : {
                        debug: function() {},
                        info: function() {},
                        warn: function() {},
                        error: function() {},
                        fatal: function() {}
                    }
                }(e.console)
            }(window), function(e) {
                e.indexOf || (e.indexOf = function(e) {
                    return t.indexOf(this, e)
                }, e.forEach || (e.forEach = function(e) {
                    return t.each(this, e)
                }))
            }(Array.prototype), function(e) {
                e.disk.decorator = {}, function() {
                    var n = function(e) {
                        var n = this;
                        this.timers = {}, this.component = e;
                        for (var o in this.component)"function" == typeof this.component[o] && !
                            function(e) {
                                n[e] = function() {
                                    var o, t, i, r = [].slice.call(arguments, 0);
                                    n[e].isAsync = !1;
                                    for (var c = 0, a = r.length; a > c; c++) if (t = r[c], "object" == typeof t) {
                                        for (i in t) if ("function" == typeof t[i] && /asyncEnd\(/g.test(t[i]) === !0) {
                                            n[e].isAsync = !0;
                                            break
                                        }
                                    } else "function" == typeof t && /asyncEnd\(/g.test(t) === !0 && (n[e].isAsync = !0);
                                    return n.startTimer(e), o = n.component[e].apply(n.component, arguments), n[e].isAsync || n.displayTime(e, n.getExecuteTime(e)), o
                                }
                            }(o)
                    };
                    n.prototype = {
                        startTimer: function(e) {
                            this.timers[e] = (new Date).getTime()
                        },
                        getExecuteTime: function(e) {
                            return (new Date).getTime() - this.timers[e]
                        },
                        displayTime: function(n, t) {
                            o.browser.msie && parseInt(o.browser.version, 10) <= 8 ? e.console.log("[disk.decorator.Timer] " + n + ": " + t + " ms") : e.console.log("%c[disk.decorator.Timer] " + n + ": " + t + " ms", "color: #029FE6")
                        },
                        asyncEnd: function(e) {
                            if (void 0 === this[e]) throw new Error("[disk.decorator.Timer][asyncEnd] The methodName of async is wrong.");
                            if (this[e].isAsync !== !0) throw new Error("[disk.decorator.Timer][asyncEnd] If you use asyncEnd of Timer, the arguments of method should has a callback.");
                            this.displayTime(e, this.getExecuteTime(e))
                        }
                    }, e.disk.decorator.Timer = n
                }()
            }(window), function() {
                o.browser.msie === !0 && 6 == o.browser.version && o("body").addClass("fixbug-ie6")
            }(), function() {
                var e = !1;
                r.listen("after-list-loaded", function() {
                    e !== !0 && (a.initPcsDownloadCdnConnectivity(function(e) {
                        e && (new c).file.watchCDNOfPCS(e)
                    }), e = !0)
                })
            }(), function() {
                Object.defineProperty && (Object.defineProperty(window, "navigator", {
                    configurable: !1,
                    writable: !1,
                    value: window.navigator
                }), Object.defineProperty(window.navigator, "platform", {
                    configurable: !1,
                    writable: !1,
                    value: window.navigator.platform
                }), Object.defineProperty(window.navigator, "userAgent", {
                    configurable: !1,
                    writable: !1,
                    value: window.navigator.userAgent
                }))
            }(), window.location.origin || (window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "")), function() {
                for (var e = ["Hm_lvt_773fea2ac036979ebb5fcc768d8beb67", "Hm_lvt_b181fb73f90936ebd334d457c848c8b5", "Hm_lvt_adf736c22cd6bcc36a1d27e5af30949e"], n = "." + location.hostname, o = 0; o < e.length; o++) s.setCookie(e[o], "", -1, "/", n)
            }(), "/disk/home" === location.pathname) {
            var b = null,
                v = s.client().browserString,
                y = 30,
                k = 0,
                A = 2e3;
            (-1 !== v.indexOf("chrome") || -1 !== v.indexOf("firefox") || -1 !== v.indexOf("safari")) && (b = setInterval(function() {
                var e = o("script"),
                    n = e[e.length - 1].src;
                (-1 !== n.indexOf("mjaenbjdjmgolhoafkohbhhbaiedbkno") || -1 !== n.indexOf("acgotaku311") || -1 !== n.indexOf("BaiduExporter")) && (c.instanceForSystem.log.send({
                    name: "chrome-extension",
                    sendServerLog: !0,
                    value: v
                }), clearInterval(b)), ++k > y && clearInterval(b)
            }, A), o(document).delegate("#export_menu", "click", function() {
                c.instanceForSystem.log.send({
                    name: "chrome-used",
                    sendServerLog: !0,
                    value: v
                })
            }))
        }
        "https:" === location.protocol && "serviceWorker" in navigator && navigator.userAgent.indexOf("Firefox") <= -1 && navigator.serviceWorker.register("/disk/serviceworker.js", {
            scope: "/disk/home"
        }).then(function(e) {
            e.installing ? console.log("Service worker installing") : e.waiting ? console.log("Service worker installed") : e.active && console.log("Service worker active")
        }, function(e) {
            console.log(e)
        });
        var v = s.client();
        if ("http:" === location.protocol && v.engine && null != v.engine.ie && ("ie11" === v.browserString || "edge" === v.browserString)) {
            var S = function(e, n, o) {
                var t = new Image;
                t.onload = function(e) {
                    "function" == typeof n && n.call(null, e)
                }, t.onerror = function(e) {
                    "function" == typeof o && o.call(null, e)
                }, t.src = e
            };
            S("https://" + location.host + "/yun-static/common/images/default.gif", function() {
                s.setCookie("secu", 1, 365, "/"), c.instanceForSystem.log.send({
                    type: "httpsAccess" + v.browserString
                })
            })
        }
    }();