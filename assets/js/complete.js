/*!
 * complete.js
 */
var Olv = Olv || {};
(function (t, e) {
    e.init || (e.init = t.Deferred(function () {
        t(this.resolve)
    }).promise(), e.Router = function () {
        this.routes = [], this.guard = t.Deferred()
    }, t.extend(e.Router.prototype, {
        connect: function (t, e) {
            t instanceof RegExp || (t = new RegExp(t)), this.routes.push([t, e])
        },
        dispatch: function (e) {
            this.guard.resolve(e), this.guard = t.Deferred();
            for (var n, o = e.pathname, a = 0; n = this.routes[a]; a++) {
                var i = o.match(n[0]);
                i && n[1].call(this, i, e, this.guard.promise())
            }
        }
    }), e.router = new e.Router, t(document).on("pjax:end", function (n, o) {
        t(document).trigger("olv:pagechange", [o]), e.router.dispatch(location)
    }), e.init.done(function () {
        e.init.done(function () {
            e.router.dispatch(location)
        })
    }), e.Locale = {
        Data: {},
        text: function (t) {
            var n = Array.prototype.slice.call(arguments);
            return n.splice(1, 0, -1), e.Locale.textN.apply(this, n)
        },
        textN: function (t, n) {
            if (e.Cookie.get("plain_msgid")) return t;
            n = +n || 0;
            var o = e.Locale.Data[t];
            if (!o) return t;
            var a, i, r = o.quanttype || "o";
            if ("1_o" === r && 1 === n || "01_o" === r && (0 === n || 1 === n) ? (a = o.text_value_1 || o.value_1, i = o.text_args_1 || o.args_1) : (a = o.text_value || o.value, i = o.text_args || o.args), !i) return a;
            var s = Array.prototype.slice.call(arguments, 2),
                l = 0;
            return a.replace(/%s/g, function () {
                return s[i[l++] - 1]
            })
        }
    }, e.loc = e.Locale.text, e.loc_n = e.Locale.textN, e.print = function (t) {
        "undefined" != typeof console && console.log(t)
    }, e.deferredAlert = function (e) {
        var n = t.Deferred();
        return setTimeout(function () {
            alert(e), n.resolve()
        }, 0), n.promise()
    }, e.deferredConfirm = function (e) {
        var n = t.Deferred();
        return setTimeout(function () {
            var t = confirm(e);
            n.resolve(t)
        }, 0), n.promise()
    }, e.Cookie = {
        set: function (t, e, n) {
            var o = encodeURIComponent(t) + "=" + encodeURIComponent(e) + "; path=/";
            n && (o += "; expires=" + n.toUTCString()), document.cookie = o
        },
        get: function (t) {
            if (t && document.cookie)
                for (var e = document.cookie.split("; "), n = 0; n < e.length; n++) {
                    var o = e[n].split("=");
                    if (t === decodeURIComponent(o[0])) return decodeURIComponent(o[1])
                }
        }
    }, e.ErrorViewer = {
        open: function (t) {
            var n = +(t = t || {}).error_code,
                o = t.message || t.msgid && e.loc(t.msgid);
            n || (n = 1219999, o = o || e.loc("olv.portal.error.500.for_offdevice"));
            var a = String(n).match(/^([0-9]{3})([0-9]{4})$/);
            a && (n = a[1] + "-" + a[2]);
            var i = e.loc("olv.portal.error.code", n);
            return e.showMessage(i, o || "")
        }
    }, e.Net = {
        ajax: function (n) {
            var o = t.ajax(n),
                a = e.Net._pageId,
                i = o.then(function (n, o, i) {
                    var r = e.Net._pageId === a,
                        s = [n, o, i, r];
                    return n && "object" == typeof n && !n.success || !r ? t.Deferred().rejectWith(this, s) : t.Deferred().resolveWith(this, s)
                }, function (n, o) {
                    var i = e.Net.getDataFromXHR(n);
                    void 0 === i && (i = n.responseText);
                    var r = e.Net._pageId === a;
                    return t.Deferred().rejectWith(this, [i, o, n, r])
                });
            return i.fail(e.Net.errorFeedbackHandler), i.promise(o), o
        },
        _pageId: 1,
        getDataFromXHR: function (e) {
            var n = e.responseText,
                o = e.getResponseHeader("Content-Type");
            if (n && o && /^application\/json(?:;|$)/.test(o)) try {
                return t.parseJSON(n)
            } catch (t) {}
        },
        getErrorFromXHR: function (t) {
            var n = e.Net.getDataFromXHR(t),
                o = n && n.errors && n.errors[0];
            if (o && "object" == typeof o) return o;
            var a = t.status;
            return a ? a < 500 ? {
                error_code: 1210902,
                message: e.loc("olv.portal.error.failed_to_connect.for_offdevice")
            } : {
                error_code: 1219999,
                message: e.loc("olv.portal.error.500.for_offdevice")
            } : {
                error_code: 1219998,
                message: e.loc("olv.portal.error.network_unavailable.for_offdevice")
            }
        },
        _isLeavingPage: !1,
        willLeavePage: function () {
            e.Net._isLeavingPage = !0, setTimeout(function () {
                e.Net._isLeavingPage = !1
            }, 100)
        },
        errorFeedbackHandler: function (t, n, o, a) {
            if ("abort" !== n && a && (o.status || !e.Net._isLeavingPage)) {
                var i = this,
                    r = arguments;
                setTimeout(function () {
                    e.Net._errorFeedbackHandler.apply(i, r)
                }, o.status ? 0 : 5e3)
            }
        },
        _errorFeedbackHandler: function (n, o, a, i) {
            var r = e.Net.getErrorFromXHR(a);
            this.silent || e.ErrorViewer.open(r), t(document).trigger("olv:ajax:error", [r, o, a])
        },
        get: function (t, n, o, a) {
            return e.Net.ajax({
                method: "GET",
                url: t,
                data: n,
                success: o,
                dataType: a
            })
        },
        post: function (t, n, o, a) {
            return e.Net.ajax({
                method: "POST",
                url: t,
                data: n,
                success: o,
                dataType: a
            })
        }
    }, e.Browsing = {
        setup: function () {
            t(document).on("click", "[data-href]", this.onDataHrefClick), t(window).on("click submit", this.onMayLeavePage)
        },
        onDataHrefClick: function (n) {
            if (!n.isDefaultPrevented() && !t(n.target).closest("a,button").length) {
                var o = t(this);
                if (!o.hasClass("disabled")) {
                    var a = o.attr("data-href");
                    a && (e.Net.willLeavePage(), window.location.href = a, n.preventDefault())
                }
            }
        },
        onMayLeavePage: function (n) {
            n.isDefaultPrevented() || "click" === n.type && !t(n.target).closest("[href]").length || e.Net.willLeavePage()
        }
    }, e.init.done(function () {
        e.Browsing.setup()
    }), e.Utils = {}, e.Utils.toJSONString = "undefined" != typeof JSON ? JSON.stringify : function () {
        function t(t) {
            return "\\u" + (65536 + t.charCodeAt(0)).toString(16).substring(1)
        }

        function e(n) {
            switch (typeof n) {
            case "string":
                return '"' + n.replace(/[\u0000-\u001f\"\\\u2028\u2029]/g, t) + '"';
            case "number":
            case "boolean":
                return "" + n;
            case "object":
                if (!n) return "null";
                switch (Object.prototype.toString.call(n).slice(8, -1)) {
                case "String":
                case "Number":
                case "Boolean":
                    return e(n.valueOf());
                case "Array":
                    for (var o = [], a = 0; a < n.length; a++) o.push(e(n[a]));
                    return "[" + o.join(",") + "]";
                case "Object":
                    o = [];
                    for (var a in n) n.hasOwnProperty(a) && o.push(e(a) + ":" + e(n[a]));
                    return "{" + o.join(",") + "}"
                }
                return "null"
            }
            return "null"
        }
        return e
    }(), e.Utils._staticRoot = null, e.Utils.staticURL = function (n) {
        if (/^https?:/.test(n)) return n;
        var o = e.Utils._staticRoot;
        return null === o && document.body && (o = e.Utils._staticRoot = (t(document.body).attr("data-static-root") || "").replace(/\/$/, "")), (o || "") + n.replace(/^(?!\/)/, "/")
    }, e.Utils.isIE8AndEarlierStyle = !!document.createStyleSheet && void 0 === document.documentElement.style.opacity, e.Utils.isIEStyle = !!window.TextRange, e.Utils.addPlatformClass = function () {
        var n = t(document.documentElement),
            o = navigator.userAgent,
            a = /\bWin/.test(o) ? "win" : /\bMac/.test(o) ? "mac" : "other";
        n.addClass("os-" + a), e.Utils.isIE8AndEarlierStyle && n.addClass("ie8-earlier"), e.Utils.isIEStyle && n.addClass("ie")
    }, e.Utils.addPlatformClass(), e.Utils.fixWebFontLoadTiming = function () {
        var t = document.createStyleSheet();
        t.cssText = ":before, :after { content: none !important; }", setTimeout(function () {
            var e = t.owningElement;
            e.parentNode.removeChild(e)
        }, 20)
    }, e.Utils.isIE8AndEarlierStyle && e.init.done(e.Utils.fixWebFontLoadTiming), e.Utils.triggerHandlers = {
        keypress: function (e) {
            13 !== e.which || e.isDefaultPrevented() || (e.preventDefault(), t(this).click())
        },
        mouseup: function (t) {
            this.blur()
        }
    }, e.init.done(function (t) {
        t(document).on(e.Utils.triggerHandlers, ".trigger")
    }), e.Content = {}, e.Content.autopagerize = function (n, o) {
        function a() {
            if (!(u._disabledCount || s.scrollTop() + s.height() + 200 < i.offset().top + i.outerHeight())) {
                var o = t("<div/>").attr("class", "post-list-loading").append(t("<img/>").attr({
                    src: e.Utils.staticURL("/assets/img/loading-image-green.gif"),
                    alt: ""
                })).appendTo(i);
                l = t.ajax({
                    url: r,
                    headers: {
                        "X-AUTOPAGERIZE": !0
                    }
                }).done(function (e) {
                    var s = t("<div>" + e + "</div>").find(n);
                    (r = s.attr("data-next-page-url") || "") || c.resolve(), i.trigger("olv:autopagerize", [s, r, o]), s.children().each(function () {
                        this.id && t("#" + this.id).length && t(this).detach()
                    }), i.attr("data-next-page-url", r), i.append(s.children()), r && setTimeout(a, 0)
                }).always(function () {
                    o.remove(), l = null
                }), u.disable(l)
            }
        }
        var i = t(n),
            r = i.attr("data-next-page-url");
        if (r) {
            t(document.body).addClass("is-autopagerized");
            var s = t(window),
                l = null,
                c = t.Deferred(),
                u = e.Content.autopagerize;
            s.on("scroll", a), c.done(function () {
                s.off("scroll", a), l && l.abort(), t(document.body).removeClass("is-autopagerized")
            }), setTimeout(a, 0), o.done(c.resolve)
        }
    }, e.Content.autopagerize._disabledCount = 0, e.Content.autopagerize.disable = function (t) {
        var n = e.Content.autopagerize;
        n._disabledCount++, t.always(function () {
            n._disabledCount--
        })
    }, e.Content.preloadImages = function () {
        for (var t = arguments.length; t--;) document.createElement("img").src = arguments[t]
    }, e.Form = {
        toggleDisabled: function (n, o) {
            var a = void 0 === o;
            return n.each(function () {
                var n = t(this),
                    i = a ? !e.Form.isDisabled(n) : o;
                if (n.toggleClass("disabled", i), void 0 !== this.form) n.prop("disabled", i);
                else {
                    var r = i ? "href" : "data-disabled-href",
                        s = i ? "data-disabled-href" : "href",
                        l = n.attr(r);
                    void 0 !== l && (n.removeAttr(r), n.attr(s, l))
                }
            }), n
        },
        isDisabled: function (t) {
            return t.length && void 0 !== t[0].form ? t.prop("disabled") : t.hasClass("disabled")
        },
        disable: function (t, n) {
            return e.Form.toggleDisabled(t, !0), n.always(function () {
                e.Form.toggleDisabled(t, !1)
            }), t
        },
        disableSoon: function (t, n) {
            return setTimeout(function () {
                "pending" === n.state() && e.Form.toggleDisabled(t, !0)
            }, 0), n.always(function () {
                e.Form.toggleDisabled(t, !1)
            }), t
        },
        emulateInputEvent: function (e, n) {
            if (e.length && void 0 === e[0].oninput) {
                var o = t.map(e, function (t) {
                        return t.value
                    }),
                    a = setInterval(function () {
                        for (var n = 0, a = e.length; n < a; n++) {
                            var i = e[n].value;
                            i !== o[n] && (o[n] = i, t(e[n]).trigger("input"))
                        }
                    }, 100);
                n.always(function () {
                    clearInterval(a)
                })
            }
        },
        submit: function (e, n) {
            e.trigger("olv:form:submit", [n || t()]);
            var o = e.serializeArray(),
                a = n && n.is("input, button") && n.prop("name");
            a && o.push({
                name: a,
                value: n.val()
            });
            var i = {
                method: e.prop("method"),
                url: e.attr("action"),
                data: o
            };
            return this.send(i, n)
        },
        get: function (t, e, n) {
            var o = {
                method: "GET",
                url: t,
                data: e
            };
            return this.send(o, n)
        },
        _token: null,
        token: function () {
            return null === e.Form._token && (e.Form._token = t("body").attr("data-token")), e.Form._token
        },
        post: function (n, o, a) {
            o || (o = {}), t.isArray(o) ? o.push({
                name: "token",
                value: e.Form.token()
            }) : o.token = e.Form.token();
            var i = {
                method: "POST",
                url: n,
                data: o
            };
            return this.send(i, a)
        },
        send: function (n, o) {
            var a = e.Net.ajax(n);
            return t(document).trigger("olv:form:send", [a, n, o || t()]), o && (e.Form.disableSoon(o, a), o.addClass("loading"), a.always(function () {
                o.removeClass("loading")
            })), a
        },
        updateParentClass: function (n) {
            switch (n.type) {
            case "radio":
                var o = t(n.form ? n.form.elements[n.name] : 'input[name="' + n.name + '"]');
                o.each(function () {
                    t(this).parent().toggleClass("checked", this.checked)
                }), e.Utils.isIE8AndEarlierStyle && o.parent().addClass("changing").removeClass("changing");
                break;
            case "checkbox":
                t(n).parent().toggleClass("checked", n.checked)
            }
        },
        setup: function () {
            t(document).on("click", "input", function (t) {
                t.isDefaultPrevented() || e.Form.updateParentClass(this)
            })
        },
        setupForPage: function () {
            t("input:checked").each(function () {
                e.Form.updateParentClass(this)
            })
        },
        reset: function (n) {
            n.each(function () {
                this.reset(), t(this).find("input").each(function () {
                    e.Form.updateParentClass(this)
                })
            })
        },
        validateValueLength: function (e) {
            t(this).find("[minlength], [maxlength]").each(function () {
                var n = t(this),
                    o = +n.attr("minlength");
                isNaN(o) && (o = -1 / 0);
                var a = +n.attr("maxlength");
                isNaN(a) && (a = 1 / 0);
                var i = n.val();
                i.length >= o && i.length <= a || e.preventDefault()
            })
        }
    }, e.init.done(e.Form.setup), e.router.connect("", e.Form.setupForPage), e.Guest = {
        isGuest: function () {
            return t("body").hasClass("guest")
        }
    }, e.DecreasingTimer = function (t, e, n) {
        this.callback_ = t, this.initialInterval_ = e || 1e4, this.maxInterval_ = n || 1 / 0, this.interval_ = this.initialInterval_, this.timeouts_ = []
    }, e.DecreasingTimer.prototype.resetInterval = function () {
        this.interval_ = this.initialInterval_, this.clearAllTimeouts(), this.invoke()
    }, e.DecreasingTimer.prototype.clearAllTimeouts = function () {
        t(this.timeouts_).each(t.proxy(function (t, e) {
            this.clearTimeout(e)
        }, this))
    }, e.DecreasingTimer.prototype.clearTimeout = function (t) {
        for (var e = 0, n = this.timeouts_.length; e < n; ++e)
            if (this.timeouts_[e] == t) {
                clearTimeout(this.timeouts_[e]), this.timeouts_.splice(e, 1);
                break
            }
    }, e.DecreasingTimer.prototype.invoke = function () {
        this.callback_();
        var e;
        e = setTimeout(t.proxy(function () {
            this.invoke(), this.clearTimeout(e)
        }, this), this.interval_), this.timeouts_.push(e), this.interval_ = Math.min(Math.floor(1.5 * this.interval_), this.maxInterval_)
    }, e.UpdateChecker = function (t, n) {
        this._settings = {}, e.DecreasingTimer.call(this, this.callback_, t, n)
    }, e.UpdateChecker.prototype = new e.DecreasingTimer, e.UpdateChecker.getInstance = function () {
        return void 0 == e.UpdateChecker.instance && (e.UpdateChecker.instance = new e.UpdateChecker(2e4, 18e5)), e.UpdateChecker.instance
    }, e.UpdateChecker.prototype.callback_ = function () {
        var n = {};
        t.each(this._settings, t.proxy(function (o) {
            void 0 != this._settings[o].pathname && this._settings[o].pathname != location.pathname ? delete this._settings[o] : t.each(this._settings[o].params, t.proxy(function (t, o) {
                n[t] = e.Utils.toJSONString(o)
            }, this))
        }, this)), e.Net.ajax({
            url: "/check_update.json",
            data: n,
            silent: !0,
            cache: !1
        }).done(t.proxy(function (e) {
            t(this).triggerHandler("update", [e])
        }, this))
    }, e.UpdateChecker.prototype.onUpdate = function (t, e, n, o) {
        this._settings[t] = {
            params: e,
            update: n
        }, o && (this._settings[t].pathname = location.pathname)
    }, e.SocialButton = {}, e.SocialButton.popUpDialog = function (t) {
        window.open(t.attr("data-share-url"), "miiverse_share_" + t.attr("data-service-name"), ["width=" + t.attr("data-width"), "height=" + t.attr("data-height"), "location=yes", "resizable=yes", "toolbar=no", "menubar=no", "scrollbars=no", "status=no"].join(","))
    }, e.SocialButton.onClick = function (n) {
        if (!n.isDefaultPrevented()) {
            n.preventDefault();
            var o = t(this);
            "1" === o.attr("data-is-popup") ? e.SocialButton.popUpDialog(o) : location.href = o.attr("data-share-url")
        }
    }, e.SocialButton.setup = function (n) {
        t(document).on("click", ".social-button", e.SocialButton.onClick), n.done(function () {
            t(document).off("click", ".social-button", e.SocialButton.onClick)
        })
    }, e.CookiePolicyNotice = {}, e.CookiePolicyNotice.setup = function (n) {
        var o = t("#cookie-policy-notice");
        o.length && o.find(".js-cookie-policy-notice").on("click", function () {
            var t = new Date;
            t.setFullYear(t.getFullYear() + 1), e.Cookie.set("cookie_policy_notice_seen", "true", t), o.slideUp("fast", function () {
                o.remove()
            })
        })
    }, e.OpenTruncatedTextButton = {}, e.OpenTruncatedTextButton.setup = function (e) {
        var n = t(e);
        n.on("click", ".js-open-truncated-text-button", function (t) {
            t.preventDefault(), n.find(".js-truncated-text, .js-open-truncated-text-button").addClass("none"), n.find(".js-full-text").removeClass("none")
        })
    }, e.ModalWindowManager = {}, e.ModalWindowManager._windows = [], e.ModalWindowManager.currentWindow = null, e.ModalWindowManager.closeAll = function () {
        for (; this.currentWindow;) this.currentWindow.close()
    }, e.ModalWindowManager.closeUntil = function (t) {
        if (t.guard)
            for (var e;
                (e = this.currentWindow) && (e.close(), e !== t););
    }, e.ModalWindowManager.register = function (t) {
        var e = this._windows;
        e.length ? e[e.length - 1].element.removeClass("active-dialog") : this.toggleMask(!0), t.element.addClass("active-dialog"), e.push(t), this.currentWindow = t
    }, e.ModalWindowManager.unregister = function (t) {
        if (this.currentWindow !== t) throw new Error("Failed to unregister modal window");
        var e = this._windows;
        e.pop().element.removeClass("active-dialog");
        var n = e.length ? e[e.length - 1] : null;
        n ? n.element.addClass("active-dialog") : this.toggleMask(!1), this.currentWindow = n
    }, e.ModalWindowManager._mask = null, e.ModalWindowManager.toggleMask = function (e) {
        var n = this._mask;
        n || (n = this._mask = t("<div>", {
            class: "mask none"
        }).on("click", new Function).appendTo(document.body)), n.toggleClass("none", !e)
    }, e.ModalWindowManager.setup = function () {
        t(document).on("click", "[data-modal-open]", function (n) {
            var o = t(this);
            if (!e.Form.isDisabled(o) && !n.isDefaultPrevented()) {
                n.preventDefault();
                var a = t.Event("olv:modalopen");
                if (o.trigger(a), !a.isDefaultPrevented()) {
                    var i = t(o.attr("data-modal-open"));
                    i.attr("data-is-template") && (i = i.clone().removeAttr("id")), new e.ModalWindow(i, this).open()
                }
            }
        }), t(document).on("click", ".olv-modal-close-button", function (t) {
            if (!t.isDefaultPrevented()) {
                t.preventDefault();
                var n = e.ModalWindowManager.currentWindow;
                n && n.close()
            }
        }), t(document).on("olv:modal", function (t, n, o) {
            e.Content.autopagerize.disable(o)
        })
    }, e.init.done(function () {
        e.ModalWindowManager.setup()
    }), t(document).on("olv:pagechange", function () {
        e.ModalWindowManager.closeAll()
    }), e.ModalWindow = function (e, n) {
        this.element = t(e), this.triggerElement = t(n), this.temporary = !this.element.parent().length;
        var o = t.trim(this.element.attr("data-modal-types"));
        this.types = o ? o.split(/\s+/) : [], this.guard = null
    }, e.ModalWindow.prototype.open = function () {
        if (!this.guard) return document.activeElement && document.activeElement.blur(), e.ModalWindowManager.register(this), e.Form.toggleDisabled(this.triggerElement, !0), this.element.addClass("modal-window-open").removeClass("none"), this.temporary && this.element.appendTo(document.body), this.triggerOpenHandlers(t.Deferred()), this
    }, e.ModalWindow.prototype.triggerOpenHandlers = function (t) {
        this.guard = t;
        for (var e, n = [this, t.promise()], o = 0; e = this.types[o]; o++) this.element.trigger("olv:modal:" + e, n);
        this.element.trigger("olv:modal", n)
    }, e.ModalWindow.prototype.close = function () {
        if (this.guard) return this.guard.resolve(), this.guard = null, e.ModalWindowManager.unregister(this), this.temporary && this.element.remove(), this.element.addClass("none").removeClass("modal-window-open"), e.Form.toggleDisabled(this.triggerElement, !1), this
    }, e.SimpleDialog = {
        _element: null,
        element: function () {
            return (this._element || (this._element = t("<div>", {
                class: "dialog"
            }).append(t("<div>", {
                class: "dialog-inner"
            }).append(t("<div>", {
                class: "window"
            }).append(t("<h1>", {
                class: "window-title"
            }), t("<div>", {
                class: "window-body"
            }).append(t("<p>", {
                class: "window-body-content"
            }), t("<div>", {
                class: "form-buttons"
            }).append(t("<button>", {
                class: "cancel-button gray-button",
                type: "button",
                "data-event-type": "cancel"
            }), t("<button>", {
                class: "ok-button black-button",
                type: "button",
                "data-event-type": "ok"
            })))))))).clone()
        },
        htmlLineBreak: function (t) {
            var e = {
                "<": "&lt;",
                ">": "&gt",
                "&": "&amp;",
                '"': "&quot"
            };
            return t.replace(/[<>&\"]/g, function (t) {
                return e[t]
            }).replace(/\n|\r\n?/g, function (t) {
                return "<br>" + t
            })
        },
        create: function (n) {
            var o = this.element(),
                a = new e.ModalWindow(o),
                i = t.trim(n.modalTypes || "");
            a.types = i ? i.split(/\s+/) : [], o.find(".window-title").text(n.title || "");
            var r = this.htmlLineBreak(n.body || "");
            o.find(".window-body-content").html(r), o.find(".ok-button").text(n.okLabel || e.loc("olv.portal.ok"));
            var s = o.find(".cancel-button");
            n.isConfirm ? s.text(n.cancelLabel || e.loc("olv.portal.cancel")) : s.detach();
            var l = t.Deferred(),
                c = {
                    ok: !0,
                    cancel: !1
                };
            return o.find("button").on("click", function (e) {
                if (!e.isDefaultPrevented()) {
                    e.preventDefault();
                    var n = t(this).attr("data-event-type"),
                        o = t.Event(n);
                    t(a).trigger(o), o.isDefaultPrevented() || (a.close(), l.resolveWith(a, [c[n]]))
                }
            }), l.promise(a), a
        },
        show: function (t) {
            var e = this.create(t);
            return e.open(), e.element.find(".ok-button")[0].focus(), e
        }
    }, e.showMessage = function (n, o, a) {
        var i = t.extend({
            title: n,
            body: o
        }, a);
        return e.SimpleDialog.show(i)
    }, e.showConfirm = function (n, o, a) {
        var i = t.extend({
            title: n,
            body: o,
            isConfirm: !0
        }, a);
        return e.SimpleDialog.show(i)
    }, e.Entry = {}, e.Entry.incrementReplyCount = function (e) {
        var n = t("div.post-meta div.reply");
        if (0 !== !n.length && void 0 != e && 0 != e) {
            var o = n.find(".reply-count"),
                a = +o.text() + e;
            o.text(a), t(".no-reply-content").toggleClass("none", 0 !== a)
        }
    }, e.Entry.setupEditButtons = function (n) {
        function o(n) {
            var o = e.Form.post(n.action, {
                format: "html"
            }, n.button).done(function (e) {
                t("#main-body").replaceWith(t(t.parseHTML(e)).find("#main-body"))
            });
            return n.modal.element.trigger("olv:entry:post:delete", n), o
        }

        function a(n) {
            return e.Form.post(n.action, null, n.button).done(function () {
                var e = t("#post-content, #post-permalink-comments");
                n.option.prop("disabled", !0);
                var o = function () {
                    e.find(".spoiler-status").fadeIn(400, function () {
                        t(this).addClass("spoiler")
                    })
                };
                n.modal.guard.done(function () {
                    setTimeout(o, 0)
                })
            })
        }

        function i(t) {
            return t.modal.close(), e.showConfirm(e.loc("olv.portal.profile_post"), e.loc("olv.portal.profile_post.confirm_update"), {
                okLabel: e.loc("olv.portal.profile_post.confirm_update.yes"),
                cancelLabel: e.loc("olv.portal.cancel")
            }).done(function (n) {
                if (n) {
                    var o = this;
                    o.element.find("button").prop("disabled", !0), e.Form.post(t.action, null, t.button, !0).done(function () {
                        t.modal.triggerElement.trigger("olv:entry:profile-post:set"), o.close(), e.showConfirm(e.loc("olv.portal.profile_post"), e.loc("olv.portal.profile_post.done"), {
                            okLabel: e.loc("olv.portal.user.search.go"),
                            cancelLabel: e.loc("olv.portal.close")
                        }).done(function (t) {
                            t && (location.href = "/users/@me")
                        })
                    })
                }
            })
        }

        function r(t, n, r) {
            function s() {
                var t = u.find(":selected");
                d.text(t.text());
                var n = t.attr("data-action");
                c.attr("action", n), e.Form.toggleDisabled(f, !n)
            }

            function l(t) {
                if (!e.Form.isDisabled(f) && !t.isDefaultPrevented()) {
                    t.preventDefault();
                    var r = {
                            action: c.attr("action"),
                            button: f,
                            modal: n,
                            option: u.find(":selected")
                        },
                        s = u.val();
                    ("delete" == s ? o(r) : "painting-profile-post" === s || "screenshot-profile-post" === s ? i(r) : a(r)).always(function () {
                        n.close()
                    })
                }
            }
            n.triggerElement;
            var c = n.element.find("form.edit-post-form"),
                u = c.find('select[name="edit-type"]'),
                d = c.find("span.select-button-content"),
                f = c.find(".post-button");
            u.val(""), s(), u.on("change", s), f.on("click", l), r.done(function () {
                u.off("change", s), f.off("click", l)
            })
        }
        t(document).on("olv:modal:edit-post", r), n.done(function () {
            t(document).off("olv:modal:edit-post", r)
        })
    }, e.Entry.setupMoreRepliesButtons = function (n) {
        function o(n) {
            n.preventDefault();
            var o = t(this);
            if (!i && !e.Form.isDisabled(o)) {
                var r = o.text();
                o.text("").append(t("<img/>").attr({
                    src: e.Utils.staticURL("/assets/img/loading-image-green.gif"),
                    alt: ""
                })), i = e.Form.get(o.attr("data-fragment-url"), null, o).done(function (e) {
                    var n = t(t.parseHTML(e));
                    if (o.hasClass("newest-replies-button") || o.hasClass("oldest-replies-button")) return a.find(".more-button, .reply-list, .info-reply-list").remove(), void a.append(n);
                    var i = n.filter(".reply-list").children().filter(function () {
                        return !t("#" + this.id).length
                    });
                    if (o.hasClass("all-replies-button") && (o.remove(), a.find(".reply-list:not(.info-reply-list)").prepend(i)), o.hasClass("newer-replies-button") || o.hasClass("older-replies-button")) {
                        var r = o.hasClass("newer-replies-button") ? "newer" : "older",
                            s = n.filter("." + r + "-replies-button");
                        s.length ? o.replaceWith(s) : a.find(".more-button").remove(), a.find(".reply-list:not(.info-reply-list)")["newer" == r ? "append" : "prepend"](i)
                    }
                }).always(function () {
                    o.text(r), i = null
                }), o.trigger("olv:entry:reply:button")
            }
        }
        var a = t("#reply-content"),
            i = null;
        t(document).on("click", ".more-button", o), n.done(function () {
            t(document).off("click", ".more-button", o), i && i.abort()
        })
    }, e.Entry.setupHiddenContents = function (e) {
        function n(e) {
            if (!e.isDefaultPrevented()) {
                e.preventDefault();
                var n = t(this),
                    o = (n.closest(".post").length, n.closest(".hidden"));
                o.removeClass("hidden"), o.filter("[data-href-hidden]").add(o.find("[data-href-hidden]")).each(function () {
                    var e = t(this);
                    e.attr(e.is("a") ? "href" : "data-href", e.attr("data-href-hidden"))
                }), n.closest(".hidden-content").remove()
            }
        }
        t(document).on("click", ".hidden-content-button", n), e.done(function () {
            t(document).off("click", ".hidden-content-button", n)
        })
    }, e.Entry.toggleEmpathy = function (t) {
        var n = e.Entry.isEmpathyAdded(t),
            o = !n,
            a = t.attr("data-action");
        return n && (a += ".delete"), t.trigger("olv:entry:empathy:toggle", [o]), e.Form.post(a, null, t).done(function () {
            t.trigger("olv:entry:empathy:toggle:done", [o])
        }).fail(function () {
            t.trigger("olv:entry:empathy:toggle:fail", [n])
        })
    }, e.Entry.isEmpathyAdded = function (t) {
        return t.hasClass("empathy-added")
    }, e.Entry.onEmpathyClick = function (n) {
        if (!n.isDefaultPrevented()) {
            n.preventDefault();
            var o = t(this);
            e.Form.isDisabled(o) || e.Entry.toggleEmpathy(o)
        }
    }, e.Entry.onEmpathyToggle = function (n, o) {
        var a = t(this);
        a.toggleClass("empathy-added", o);
        var i = a.attr("data-feeling") || "normal";
        a.find(".empathy-button-text").text(e.loc("olv.portal.miitoo." + i + (o ? ".delete" : "")));
        var r;
        (r = +a.attr("data-is-in-reply-list") ? a.closest(".reply-meta").find(".empathy-count") : a.closest(".post-meta").find(".empathy-count")).text(+r.text() + (o ? 1 : -1));
        var s = t(document).find("#js-my-empathy-count");
        if (s[0] && s.text(+s.text() + (o ? 1 : -1)), e.Utils.isIE8AndEarlierStyle) {
            var l = a.closest(".post-meta").find(".empathy");
            l.addClass("changing"), setTimeout(function () {
                l.removeClass("changing")
            }, 0)
        }
    }, e.Entry.setupEmpathyButtons = function (n) {
        t(document).on("olv:entry:empathy:toggle olv:entry:empathy:toggle:fail", ".empathy-button", e.Entry.onEmpathyToggle), t(document).on("click", ".empathy-button", e.Entry.onEmpathyClick), n.done(function () {
            t(document).off("olv:entry:empathy:toggle olv:entry:empathy:toggle:fail", ".empathy-button", e.Entry.onEmpathyToggle), t(document).off("click", ".empathy-button", e.Entry.onEmpathyClick)
        })
    }, e.Entry.setupPostEmpathyButton = function (n) {
        function o(n, o) {
            e.Entry.onEmpathyToggle.apply(this, arguments);
            var a = t(n.target);
            if (!+a.attr("data-is-in-reply-list")) {
                var i = t("#empathy-content"),
                    r = +a.closest(".post-meta").find(".empathy-count").text();
                i.find(".visitor").toggle(o), i.find(".extra").toggle(!o), i.toggleClass("none", 0 === r)
            }
        }
        t(document).on("olv:entry:empathy:toggle olv:entry:empathy:toggle:fail", ".empathy-button", o), t(document).on("click", ".empathy-button", e.Entry.onEmpathyClick), n.done(function () {
            t(document).off("click", ".empathy-button", e.Entry.onEmpathyClick), t(document).off("olv:entry:empathy:toggle olv:entry:empathy:toggle:fail", ".empathy-button", o)
        })
    }, e.Entry.setupBodyLanguageSelector = function (e) {
        function n(e) {
            var n = t(e.target).val();
            t("#body-language-" + n).toggleClass("none", !1).siblings(".multi-language-body").toggleClass("none", !0)
        }
        t(document).on("change", "#body-language-selector", n), e.done(function () {
            t(document).off("change", "#body-language-selector", n)
        })
    }, e.Entry.setupMoreContentButton = function (n) {
        function o(e) {
            e.preventDefault();
            var n = t(e.target);
            n.prev().find(".wrapped").removeClass("none"), n.remove()
        }
        var a = t("#post-content.official-user.post-subtype-default .post-content-text");
        a && 0 != a.length && (a.each(function () {
            var n = t(this),
                o = n.text().match(/([\s\S]+)(\n+---+\n[\s\S]+)/);
            if (o) {
                n.text(o[1]);
                var a = t('<span class="wrapped none"></span>').text(o[2]);
                n.append(a);
                var i = t('<a href="#" class="more-content-button"></a>');
                i.text(e.loc("olv.portal.read_more_content")), n.after(i)
            }
        }), t(document).on("click", ".more-content-button", o), n.done(function () {
            t(document).off("click", ".more-content-button", o)
        }))
    }, t(document).on("olv:modal:report", function (t, n, o) {
        var a = n.element.find("form"),
            i = a.find(".post-button");
        i.on("click", function (t) {
            e.Form.isDisabled(i) || t.isDefaultPrevented() || (t.preventDefault(), e.Form.submit(a, i).done(function () {
                n.close(), n.triggerElement.trigger("olv:report:done");
                var t = a.attr("action");
                /\/violations$/.test(t) ? e.showMessage("", e.loc("olv.portal.dialog.report_violation_done")) : /\/violators$/.test(t) && e.showMessage("", e.loc("olv.portal.dialog.report_violation_done"))
            }))
        }), o.done(function () {
            i.off("click")
        })
    }), t(document).on("olv:modal:report-violator", function (t, n, o) {
        function a() {
            var t = !!i.val();
            r.css("display", t ? "" : "none"), e.Form.toggleDisabled(s, !t), "" == r.val() && r.val(" ").val("")
        }
        var i = n.element.find('select[name="type"]'),
            r = n.element.find('textarea[name="body"]'),
            s = n.element.find(".post-button");
        a(), i.on("change", a), o.done(function () {
            i.off("change", a)
        })
    }), t(document).on("olv:modal:report-violation", function (n, o, a) {
        function i() {
            var e = t(d[0].options[d[0].selectedIndex]);
            m.text(e.text());
            var n = !!d.val();
            f.css("display", n ? "" : "none")
        }

        function r() {
            var n = !!t(d[0].options[d[0].selectedIndex]).attr("data-body-required"),
                o = !!d.val(),
                a = n && /^\s*$/.test(f.val()) || !o;
            e.Form.toggleDisabled(p, a)
        }
        var s = !!o.triggerElement.attr("data-is-post"),
            l = !!o.triggerElement.attr("data-is-message"),
            c = e.loc(s ? "olv.portal.report.report_violation" : l ? "olv.portal.report.report_violation_message" : "olv.portal.report.report_violation_comment", o.triggerElement.attr("data-screen-name")),
            u = e.loc(s ? "olv.portal.report.report_post_id" : l ? "olv.portal.report.report_message_id" : "olv.portal.report.report_comment_id", o.triggerElement.attr("data-support-text"));
        o.element.find(".window-title").text(c), o.element.find(".post-id").text(u), o.element.find("form").attr("action", o.triggerElement.attr("data-action"));
        var d = "1" === o.triggerElement.attr("data-can-report-spoiler") ? o.element.find("select.can-report-spoiler") : o.element.find("select.cannot-report-spoiler");
        o.element.find('select[name="type"]').hide().prop("disabled", !0), d.show().prop("disabled", !1);
        var f = o.element.find('textarea[name="body"]'),
            p = o.element.find(".post-button"),
            m = o.element.find("span.select-button-content");
        f.attr("placeholder", f.attr("data-placeholder")), i(), r(), f.on("input", r), d.on("change", i), d.on("change", r), e.Form.emulateInputEvent(f, a), a.done(function () {
            f.off("input", r), d.off("change", i), d.off("change", r)
        })
    }), t(document).on("olv:modal:album-detail", function (t, n, o) {
        var a = n.element.find("form"),
            i = a.find(".js-album-delete-button");
        i.on("click", function (t) {
            e.Form.isDisabled(i) || t.isDefaultPrevented() || (t.preventDefault(), e.showConfirm(null, e.loc("olv.portal.album.delete_confirm")).done(function (t) {
                t && e.Form.submit(a, i, !0).done(function () {
                    n.close(), location.reload()
                })
            }))
        }), o.done(function () {
            i.off("click")
        })
    }), e.Entry.setupCloseTopicPostButton = function (n) {
        var o = t(document).find(".js-close-topic-post-form"),
            a = o.find(".js-close-topic-post-button");
        a.on("click", function (n) {
            e.Form.isDisabled(a) || n.isDefaultPrevented() || (n.preventDefault(), e.showConfirm(e.loc("olv.portal.edit.action.close_topic_post"), e.loc("olv.portal.edit.action.close_topic_post.confirm"), {
                okLabel: e.loc("olv.portal.yes"),
                cancelLabel: e.loc("olv.portal.stop")
            }).done(function (n) {
                n && (e.Form.post(o.attr("action"), null, a, !0).done(function () {
                    t(document).find(".js-topic-answer-accepting-status").removeClass("accepting").addClass("not-accepting"), o.remove()
                }), this.close())
            }))
        }), n.done(function () {
            a.off("click")
        })
    }, e.EntryForm = {}, e.EntryForm.setupAlbumImageSelector = function (e, n) {
        function o(t) {
            r.toggleClass("none")
        }

        function a(t) {
            r.addClass("none")
        }

        function i(n) {
            var o = t(n.target),
                a = o.attr("data-album-image-preview-src");
            e.find('input[name="album_image_id"]').val(o.attr("data-album-image-id")), e.find(".js-album-image-preview").attr("src", a), e.find(".js-album-preview-wrapper").toggleClass("none", 0 == a.length), e.find('textarea[name="body"]').toggleClass("with-image", a.length > 0), e.trigger("olv:entryform:updatescreenshot")
        }
        if (e.length) {
            var r = e.find(".js-album-image-selector"),
                s = e.find(".js-album-list-pager");
            if (s.length) {
                var l = function (t) {
                        var n = parseInt(s.attr("data-max-page-number"));
                        t > n || t < 1 || (e.find(".js-album-selector-page[data-page-number=" + t + "]").removeClass("none").siblings(".js-album-selector-page").addClass("none"), s.toggleClass("back-button-disabled", 1 === t), s.toggleClass("next-button-disabled", t === n), s.attr("data-current-page-number", t), s.find(".js-curent-page-number").text(t))
                    },
                    c = function (t) {
                        s.hasClass("back-button-disabled") || l(parseInt(s.attr("data-current-page-number")) - 1)
                    },
                    u = function (t) {
                        s.hasClass("next-button-disabled") || l(parseInt(s.attr("data-current-page-number")) + 1)
                    },
                    d = e.find(".js-page-back-button");
                d.on("click", c);
                var f = e.find(".js-page-next-button");
                f.on("click", u), l(1), n.done(function () {
                    d.off("click", c), f.off("click", u)
                })
            }
            var p = e.find(".js-toggle-album-image-selector");
            p.on("click", o);
            var m = r.find(".js-close-album-image-selector");
            m.on("click", a);
            var g = e.find(".js-album-image-link");
            g.on("click", i);
            var v = function (t) {
                e.find('input[name="album_image_id"]').val(""), e.find(".js-album-image-preview").attr("src", ""), e.find(".js-album-preview-wrapper").addClass("none"), e.find('textarea[name="body"]').removeClass("with-image")
            };
            e.on("reset", v), n.done(function () {
                p.off("click", o), m.off("click", a), g.off("click", i), e.off("reset", v)
            })
        }
    }, e.EntryForm.setupSubmission = function (n, o) {
        function a(o) {
            var a = t(this);
            e.Form.isDisabled(a) || o.isDefaultPrevented() || (o.preventDefault(), e.Form.submit(n, a).done(function (t) {
                if (e.Form.reset(n), e.EntryForm.checkCanPost(n), "topic" === n.attr("data-post-subtype") && !n.attr("data-is-identified")) {
                    var o = n.find('textarea[name="body"]');
                    o.prop("disabled", !0), o.attr("placeholder", o.attr("data-open-topic-post-existing-placeholder"))
                }
                a.trigger("olv:entryform:post:done", arguments)
            }).fail(function () {
                a.trigger("olv:entryform:post:fail", arguments)
            }).always(function () {
                n.find('textarea[name="body"]').trigger("input")
            }))
        }

        function i(t) {
            return 13 !== t.which
        }

        function r(t) {
            e.Form.isDisabled(s) && t.preventDefault()
        }
        if (n.length) {
            n.on("keypress", "input:not(.allow_submit)", i);
            var s = n.find('input[type="submit"], button[type="submit"]');
            s.on("click", a), n.on("submit", r), o.done(function () {
                n.off("keypress", "input:not(.allow_submit)", i), s.off("click", a), n.off("submit", r)
            })
        }
    }, e.EntryForm.onTopicPostCreated = function (e, n) {
        var o = t(".js-post-list").children(".post").attr("data-href");
        e.find(".js-existing-open-topic-post-link").attr("href", o), t("#post-form").hasClass("for-identified-user") || (e.find(".js-cannnot-topic-post").removeClass("none"), e.find(".js-feeling-selector").addClass("none"), e.find(".js-topic-categories-container").addClass("none"), e.find(".js-post-form-spoiler").addClass("none"), e.find('input[type="text"],textarea').prop("readonly", !0)), e.toggleClass("folded")
    }, e.EntryForm.setupFormStatus = function (n, o) {
        function a(e) {
            var n = /^[\s\u00A0\u3000]*$/;
            return e.filter(function () {
                return !n.test(t(this).val())
            }).length === e.length
        }

        function i(n) {
            var o = s.filter("[data-required]:visible"),
                i = o.length > 0 && a(o),
                r = l.filter(function () {
                    return !t(this).val()
                }).length > 0;
            e.Form.toggleDisabled(u, !i && !c.val() || r)
        }

        function r(t) {
            n.trigger("olv:entryform:reset")
        }
        if (n.length) {
            var s = n.find('input[type="text"], textarea'),
                l = n.find("select[data-required]"),
                c = n.find('input[name="painting"]').siblings("input:file"),
                u = n.find('input[type="submit"], button[type="submit"]');
            s.on("input", i), c.on("change", i), l.on("change", i), n.on("reset", r);
            var d = s.filter(":visible").first();
            e.Form.emulateInputEvent(d, o), s.filter(":visible").first().trigger("input"), o.done(function () {
                s.off("input", i), c.off("change", i), n.off("reset", r), l.off("change", i)
            })
        }
    }, e.EntryForm.setupFoldedForm = function (t, e) {
        function n(e) {
            var n = o.offset().top;
            t.removeClass("folded");
            var a = o.offset().top - n;
            window.scrollBy(0, a)
        }
        if (t.hasClass("folded")) {
            var o = t.find("[data-open-folded-form]");
            if (o.is(document.activeElement) || o.val() !== o.prop("defaultValue")) t.removeClass("folded");
            else {
                if ("#js_open_post_form" == location.hash) return location.hash = "", void t.removeClass("folded");
                o.one("focus", n), e.done(function () {
                    o.off("focus", n)
                })
            }
        }
    }, e.EntryForm.setupIdentifiedUserForm = function (n, o) {
        function a() {
            n.find('textarea[name="body"]').trigger("input")
        }

        function i(t) {
            var o = "1" == n.find('input[name="is_multi_language"]:checked').val();
            e.Form.reset(n), n.find('input[name="is_multi_language"]').val([o ? "1" : "0"]), n.find(".language-id-selector").toggleClass("none", !o), n.find(".language-bodies").toggleClass("none", !o), n.find('input[name="painting"]').parent().toggleClass("none", o), n.find('textarea[name="body"]').toggleClass("none", o), r(), a()
        }

        function r(e) {
            u.each(function (e, o) {
                n.find(".js-language-body-" + t(o).val()).toggleClass("none", !o.checked)
            }), a()
        }

        function s(o) {
            var a = t(o.target).siblings().filter("input"),
                i = o.target.files[0];
            if (i) {
                var r = new FileReader;
                r.onload = function (t) {
                    var e = t.target.result.split(",")[1];
                    a.val(e), a.trigger("olv:entryform:fileselect", n), n.find('textarea[name="body"]').trigger("input")
                }, e.Form.toggleDisabled(l, !0), r.readAsDataURL(i)
            } else a.val("")
        }
        var l = n.find('input[type="submit"]'),
            c = n.find(".file-button"),
            u = n.find('input[name="language_ids"]'),
            d = n.find('input[name="is_multi_language"]');
        "undefined" == typeof FileReader && e.Form.toggleDisabled(c, !0), c.on("change", s), u.on("change", r), d.on("change", i), n.on("olv:entryform:post:done", function (t) {
            c.siblings().filter("input[type=hidden]").val(""), i()
        }), i(), o.done(function () {
            c.off("change", s), u.off("change", r), d.off("change", i), n.off("olv:entryform:post:done", resetForm)
        })
    }, e.EntryForm.checkCanPost = function (n) {
        function o(t, e) {
            t.find(".remaining-today-post-count").text(e)
        }! function (n) {
            e.Net.ajax({
                type: "GET",
                url: "/users/" + t(document.body).attr("data-user-id") + "/check_can_post.json",
                silent: !0
            }).done(function (t) {
                o(n, t.remaining_today_posts)
            }).fail(function (t) {
                o(n, 0)
            })
        }(n)
    }, -1 != navigator.userAgent.indexOf("iPhone;") && e.init.done(function (t) {
        setTimeout(function () {
            0 === window.pageYOffset && window.scrollBy(0, 1)
        }, 100)
    }), e.Community = {}, e.Community.setupFavoriteButtons = function (n) {
        function o(t, n) {
            t.toggleClass("checked", n), e.Utils.isIEStyle && t.addClass("changing").removeClass("changing")
        }

        function a(n) {
            var a = t(this);
            if (!e.Form.isDisabled(a) && !n.isDefaultPrevented()) {
                n.preventDefault();
                var i = a.hasClass("checked");
                o(a);
                var r = a.attr(i ? "data-action-unfavorite" : "data-action-favorite");
                e.Form.post(r, null, a).done(function () {
                    i = !i, a.trigger("olv:community:favorite:toggle", [i])
                }).fail(function () {
                    o(a, i)
                })
            }
        }
        t(document).on("click", ".favorite-button", a), n.done(function () {
            t(document).off("click", ".favorite-button", a)
        })
    }, e.Community.setupAgeGateDialog = function (n) {
        function o(t, e, n) {
            if (isNaN(t) || isNaN(e) || isNaN(n)) return !1;
            var o = new Date(t, e - 1, n);
            return o.getFullYear() === t && o.getMonth() + 1 === e && o.getDate() === n
        }

        function a(t, e, n) {
            var o = new Date,
                a = 100 * e + n > 100 * (o.getMonth() + 1) + o.getDate() ? 1 : 0;
            return o.getFullYear() - t - a
        }

        function i(t, e, n) {
            return a(t, e, n) >= 18
        }

        function r(e, n) {
            var o = h[n],
                a = t(e[0].options[e[0].selectedIndex]);
            isNaN(a.val()) && (e.find('[value="' + o + '"]').prop("selected", !0), e.trigger("change"), l(), a.remove())
        }

        function s(e) {
            var n = t(e.currentTarget);
            r(n, n.attr("name"))
        }

        function l() {
            var e = +m.val(),
                n = +g.val(),
                o = +v.val();
            if (!isNaN(n)) {
                var a = new Date(o, n, 0).getDate(),
                    i = +m.find("option").last().val();
                if (i > a) m.find("option").slice(a - i).remove();
                else if (i < a)
                    for (var r = i + 1; r <= a; r++) m.append(t("<option>").val(r).text(r));
                !isNaN(e) && e > a && (m.find('[value="' + a + '"]').prop("selected", !0), m.trigger("change"))
            }
        }

        function c() {
            t(".age-gate-dialog").remove(), t("#main-body").children().show(), e.Cookie.set("age_gate_done", "1")
        }

        function u(t) {
            l()
        }

        function d(n) {
            var a = +v.val(),
                r = +g.val(),
                s = +m.val();
            e.Cookie.get("age_gate_done") ? c() : o(a, r, s) ? i(a, r, s) ? c() : (t(".age-gate").addClass("none"), t(".back-dialog").removeClass("none")) : e.deferredAlert(e.loc("olv.portal.age_gate.select_label"))
        }

        function f(t) {
            history.back()
        }
        t("#main-body").children().filter(function () {
            return !t(this).hasClass("age-gate-dialog")
        }).hide();
        var p = t(".age-gate-dialog"),
            m = p.find(".day"),
            g = p.find(".month"),
            v = p.find(".year"),
            h = {
                year: 1990,
                month: 1,
                day: 1
            };
        t(document).on("click", ".age-confirm-button", d), t(document).on("mousedown", ".age-gate select", s), t(document).on("change", ".age-gate select", u), t(document).on("click", ".cancel-button", f), n.done(function () {
            t(document).off("click", ".age-confirm-button", d), t(document).off("mousedown", ".age-gate select", s), t(document).off("change", ".age-gate select", u), t(document).off("click", ".cancel-button", f)
        })
    }, e.Community.setupHotDiaryPostSlideShow = function (e) {
        function n(t, e) {
            setTimeout(function () {
                t.addClass(a)
            }, 0), setTimeout(function () {
                e.removeClass(a)
            }, 0)
        }

        function o(e) {
            var o = e();
            n(t(o[0]), t(o[1]))
        }
        var a = "invisible",
            i = function (t, e) {
                var n = 0;
                return function () {
                    for (var o = [], a = 0; a < t; a++) o = o.concat(function (t, e, o) {
                        var a = e + o;
                        return e >= t.length ? (n = 0, t[0]) : a < t.length ? t[a] : t[0]
                    }(e, n, a));
                    return n++, o
                }
            }(2, t("#community-eyecatch-main").find(".js-eyecatch-diary-post").get()),
            r = [".js-eyecatch-diary-post", ":not(." + a + ")"].join("");
        setTimeout(function () {
                o(i)
            }, 1e3),
            function (n, a) {
                t(document).on("transitionend", n, function (t) {
                    o(a)
                }), e.done(function () {
                    t(document).off("transitionend", n, onPostAppeared)
                })
            }(r, i)
    }, e.Community.setupCommunitySidebar = function (t) {
        e.Community.setupFavoriteButtons(t), e.OpenTruncatedTextButton.setup(".js-community-description")
    }, e.Community.setupPostFilter = function (e) {
        function n(e) {
            if (!e.isDefaultPrevented()) {
                e.preventDefault();
                var n = t(this).find('select[name="post"]').val();
                window.location.href = n
            }
        }
        var o = t("#post-filter-select-page form");
        o.on("submit", n), e.done(function () {
            o.off("submit", n)
        })
    }, e.User = {}, e.User.setupFollowButton = function (n, o) {
        function a(n) {
            var a = t(this);
            e.Form.isDisabled(a) || (e.Form.post(a.attr("data-action"), null, a).done(function (e) {
                a.addClass("none").siblings().removeClass("none"), a.hasClass("relationship-button") && (o.noReloadOnFollow && !0 === e.can_follow_more || location.reload()), "following_count" in e && t(a).trigger("olv:visitor:following-count:change", [e.following_count])
            }), n.preventDefault())
        }

        function i(n) {
            var o = t(this),
                a = o.siblings();
            e.Form.isDisabled(o) || (e.showConfirm(e.loc("olv.portal.unfollow"), e.loc("olv.portal.followlist.confirm_unfollow_with_name", o.attr("data-screen-name")), {
                cancelLabel: e.loc("olv.portal.cancel"),
                okLabel: e.loc("olv.portal.button.remove"),
                modalTypes: "unfollow"
            }).done(function (t) {
                t && e.Form.post(o.attr("data-action"), null, o).done(function () {
                    o.hasClass("relationship-button") ? location.reload() : (o.addClass("none"), a.removeClass("none"), e.Form.toggleDisabled(a, !1))
                })
            }), n.preventDefault())
        }
        o = t.extend({
            noReloadOnFollow: !1,
            container: document
        }, o);
        var r = t(o.container);
        r.on("click", ".toggle-button .follow-button", a), r.on("click", ".toggle-button .unfollow-button", i), n.done(function () {
            r.off("click", ".toggle-button .follow-button", a), r.off("click", ".toggle-button .unfollow-button", i)
        })
    }, e.User.setupUserSidebar = function (t) {
        e.OpenTruncatedTextButton.setup(".profile-comment"), e.User.setupFollowButton(t, {
            container: "#sidebar"
        })
    }, e.Global = {}, e.Global.atOutsideOfMyMenu = function (e) {
        var n = t(e);
        return !n.hasClass("js-open-global-my-menu") && "global-my-menu" !== n.attr("id")
    }, e.Global.setupMyMenu = function () {
        var n = t("#global-my-menu");
        t(".js-open-global-my-menu").on("click", function (t) {
            t.preventDefault(), n.toggleClass("none")
        }), t(document).on("click", function (t) {
            !n.hasClass("none") && e.Global.atOutsideOfMyMenu(t.target) && n.addClass("none")
        })
    }, e.init.done(function () {
        e.Global.setupMyMenu()
    }), e.init.done(function (t) {
        if (t("#global-menu-news").length) {
            t("#global-menu-news").on("click", function (e) {
                t(e.currentTarget).find(".badge").hide()
            });
            var n = e.UpdateChecker.getInstance();
            t(n).on("update", function (e, o) {
                t.each(n._settings, function (e, n) {
                    t.each(n.params, function (t, e) {
                        void 0 === o[t] && (this.success = !1)
                    }), n.update.call(void 0, o, n.params)
                })
            }), n.onUpdate("check_update", {
                news: {},
                admin_message: {},
                mission: {}
            }, function (e, n) {
                var o = t("#global-menu-news"),
                    a = o.find(".badge");
                0 === a.length && (a = t("<span>", {
                    class: "badge"
                })).hide().appendTo(o.find("a"));
                var i = 0;
                t.each(n, function (t, n) {
                    i += Number(e[t].unread_count)
                }), a.text(i), a.toggle(i > 0)
            }), t("body").on("pjax:complete", function (t) {
                n.resetInterval()
            }), n.invoke()
        }
    }), e.router.connect("^/(?:search)?$", function (n, o, a) {
        function i() {
            var n = t("#post-form");
            e.Form.setupForPage(), e.EntryForm.setupSubmission(n, a), e.EntryForm.setupFormStatus(n, a), e.EntryForm.setupFoldedForm(n, a), e.User.setupFollowButton(a), n.hasClass("for-identified-user") && e.EntryForm.setupIdentifiedUserForm(n, a), e.Content.autopagerize(".js-post-list", a), n.on("olv:entryform:post:done", r), a.done(function () {
                n.off("olv:entryform:post:done", r), t("form.search").off("submit", e.Form.validateValueLength)
            })
        }

        function r(e, n) {
            var o = t(".js-post-list");
            o.length || (o = t("<div>", {
                class: "list post-list js-post-list"
            }).replaceAll(".no-content"));
            var a = t(t.parseHTML(n)).filter("*");
            a.hide().fadeIn(400).prependTo(o);
            var i = t(window);
            i.scrollTop(a.offset().top + a.outerHeight() / 2 - i.height() / 2)
        } /*e.Content.autopagerize(".js-post-list",a),*/
        e.Entry.setupEmpathyButtons(a), e.Entry.setupHiddenContents(a), t("form.search").on("submit", e.Form.validateValueLength);
        var s, l, c = t(".content-loading-window");
        if (c.length) {
            var u = o.search.substring(1);
            u && (u = "&" + u), s = e.Net.ajax({
                type: "GET",
                url: o.pathname + "?" + t.param({
                    fragment: "activityfeed"
                }) + u,
                silent: !0
            }).done(function (e) {
                var n = t.parseHTML(e),
                    o = t(n).find("#main-body").children();
                t("#js-main").html(o), t(document).trigger("olv:activity:success", [e, n, o])
            }).fail(function () {
                setTimeout(function () {
                    c.remove(), t(".content-load-error-window").removeClass("none")
                }, 5e3)
            })
        } else s = t.Deferred().resolve().promise();
        s.then(function () {
            i()
        })
    }), e.router.connect("^(?:/|/communities)$", function (n, o, a) {
        function i(e) {
            t(".tab-body").addClass("none"), t("#tab-" + e + "-body").removeClass("none"), t(".platform-tab a").removeClass("selected"), t("#tab-" + e).addClass("selected")
        }

        function r(n) {
            var o = t(this);
            if (!e.Form.isDisabled(o) && !n.isDefaultPrevented()) {
                n.preventDefault();
                var a = t(this).attr("data-platform");
                i(a), e.Cookie.set("view_platform", a)
            }
        }

        function s(e) {
            if (!e.isDefaultPrevented()) {
                e.preventDefault();
                var n = t(this).find('select[name="category"]').val();
                window.location.href = n
            }
        }
        var l = e.Cookie.get("view_platform");
        l && i(l), e.Community.setupHotDiaryPostSlideShow(a), t(".platform-tab a").on("click", r), t(".filter-select-page form").on("submit", s), t("form.search").on("submit", e.Form.validateValueLength), a.done(function () {
            t(".platform-tab a").off("click", r), t(".filter-select-page form").off("submit", s), t("form.search").off("submit", e.Form.validateValueLength)
        })
    }), e.router.connect("^/communities/categories/[a-z0-9\\-_]+$", function (n, o, a) {
        function i(e) {
            if (!e.isDefaultPrevented()) {
                e.preventDefault();
                var n = t(this).find('select[name="category"]').val();
                window.location.href = n
            }
        }
        e.Content.autopagerize(".community-list", a), t("#filter-select-page form").on("submit", i), a.done(function () {
            t("#filter-select-page form").off("submit", i)
        })
    }), e.router.connect("^/(identified_user_posts|news/my_news)+$", function (t, n, o) {
        e.Guest.isGuest() || e.User.setupFollowButton(o), e.Content.autopagerize(".js-post-list", o)
    }), e.router.connect("^/communities/(?:favorites|played)$", function (t, n, o) {
        e.Content.autopagerize(".community-list", o)
    }), e.router.connect("^/search/communities$", function (n, o, a) {
        t("form.search").on("submit", e.Form.validateValueLength), a.done(function () {
            t("form.search").off("submit", e.Form.validateValueLength)
        })
    }), e.router.connect("^(/communities|/messages)/[^/\]+(/diary|/new|/hot|/in_game|/old)?$", function (n, o, a) {
        function i() {
            t(".multi_timeline-topic-filter").addClass("open")
        }

        function r(e, n) {
            var o = t(e.currentTarget).attr("data-post-list-container-selector"),
                a = !!o,
                i = t(a ? o + " .js-post-list" : ".js-post-list");
            a ? i.hasClass("empty") && i.removeClass("empty").children().remove() : i.length || (i = t("<div>", {
                class: "list post-list js-post-list"
            }).replaceAll(".no-content"));
            var r = t(t.parseHTML(n)).filter("*");
            r.hide().fadeIn(400).prependTo(i);
            var s = t(window);
            s.scrollTop(r.offset().top + r.outerHeight() / 2 - s.height() / 2)
        }
        e.Entry.setupHiddenContents(a), e.Content.autopagerize(".js-post-list", a), e.Community.setupPostFilter(a);
        var s = t("#post-form");
        e.Guest.isGuest() || (e.Entry.setupEmpathyButtons(a), e.EntryForm.setupSubmission(s, a), e.EntryForm.setupFormStatus(s, a), e.EntryForm.setupFoldedForm(s, a), e.EntryForm.setupAlbumImageSelector(s, a), s.hasClass("for-identified-user") && e.EntryForm.setupIdentifiedUserForm(s, a), t(".toggle-button").length && e.User.setupFollowButton(a), t(document).on("click", ".js-topic-post-button", i), a.done(function () {
            t(document).off("click", ".js-topic-post-button", i)
        })), t(".age-gate-dialog").length && e.Community.setupAgeGateDialog(a), s.on("olv:entryform:post:done", r), a.done(function () {
            s.off("olv:entryform:post:done", r)
        })
    }), e.router.connect("^/communities/[0-9]+(/artwork(/hot|/new)?|/topic(/new|/open)?)$", function (n, o, a) {
        function i(o, i) {
            var s = t(".js-post-list");
            s.length || (s = t("<div>", {
                class: "list multi-timeline-post-list js-post-list"
            }).replaceAll(".no-content"));
            var l = t(t.parseHTML(i)).filter("*");
            l.hide().fadeIn(400).prependTo(s), /^\/topic(?:\/(?:new|open))?$/.test(n[1]) && (e.EntryForm.onTopicPostCreated(r, a), e.EntryForm.setupFoldedForm(r, a));
            var c = t(window);
            c.scrollTop(l.offset().top + l.outerHeight() / 2 - c.height() / 2)
        }
        e.Entry.setupHiddenContents(a), e.Content.autopagerize(".js-post-list", a), e.Community.setupPostFilter(a);
        var r = t("#post-form");
        e.Guest.isGuest() || (e.Entry.setupEmpathyButtons(a), e.EntryForm.setupSubmission(r, a), e.EntryForm.setupFormStatus(r, a), e.EntryForm.setupFoldedForm(r, a), e.EntryForm.setupAlbumImageSelector(r, a), r.hasClass("for-identified-user") && e.EntryForm.setupIdentifiedUserForm(r, a), t(".toggle-button").length && e.User.setupFollowButton(a)), t(".age-gate-dialog").length && e.Community.setupAgeGateDialog(a), r.on("olv:entryform:post:done", i), a.done(function () {
            r.off("olv:entryform:post:done", i)
        })
    }), e.router.connect(/^\/posts\/([0-9A-Za-z\-_]+)$/, function (n, o, a) {
        function i(n, o) {
            var a = t(window),
                i = t(t.parseHTML(o)).filter("*");
            i.hide().fadeIn(400).appendTo(".reply-list"), a.scrollTop(i.offset().top + i.outerHeight() / 2 - a.height() / 2), e.Entry.incrementReplyCount(1)
        }

        function r(n, o) {
            var a = t(n.target);
            a.attr("data-is-post") ? e.Form.toggleDisabled(a, !0) : a.remove()
        }
        e.Entry.setupHiddenContents(a), e.Entry.setupMoreRepliesButtons(a), e.SocialButton.setup(a);
        var s = t("#reply-form");
        e.Guest.isGuest() || (e.Entry.setupPostEmpathyButton(a), e.Entry.setupEditButtons(a), e.EntryForm.setupSubmission(s, a), e.EntryForm.setupFormStatus(s, a), e.EntryForm.setupAlbumImageSelector(s, a), s.hasClass("for-identified-user") && e.EntryForm.setupIdentifiedUserForm(s, a), e.Entry.setupCloseTopicPostButton(a)), e.Entry.setupBodyLanguageSelector(a), e.Entry.setupMoreContentButton(a), t(document).on("olv:entryform:post:done", i), t(document).on("olv:report:done", r), a.done(function () {
            t(document).off("olv:entryform:post:done", i), t(document).off("olv:report:done", r)
        })
    }), e.router.connect(/^\/replies\/([0-9A-Za-z\-_]+)$/, function (n, o, a) {
        function i(n, o) {
            var a = t(n.target);
            a.attr("data-is-post") ? e.Form.toggleDisabled(a, !0) : a.remove()
        }
        e.SocialButton.setup(a);
        var r = t("#reply-form");
        e.Guest.isGuest() || (e.Entry.setupPostEmpathyButton(a), e.Entry.setupEditButtons(a), e.EntryForm.setupSubmission(r, a), e.EntryForm.setupFormStatus(r, a)), e.Entry.setupBodyLanguageSelector(a), t(document).on("olv:report:done", i), a.done(function () {
            t(document).off("olv:report:done", i)
        })
    }), e.router.connect("^/users$", function (n, o, a) {
        e.Content.autopagerize("#searched-user-list", a), e.Guest.isGuest() || e.User.setupFollowButton(a), t("form.search").on("submit", e.Form.validateValueLength), a.done(function () {
            t("form.search").off("submit", e.Form.validateValueLength)
        })
    }), e.router.connect("^/users/[0-9a-zA-Z\\-_.]+/(empathies|posts)$", function (t, n, o) {
        e.Content.autopagerize(".js-post-list", o)
    }), e.router.connect("^/users/[0-9a-zA-Z\\-_.]+(/friends|/following|/followers)$", function (t, n, o) {
        e.Content.autopagerize("#friend-list-content", o)
    }), e.router.connect("^/users/[0-9a-zA-Z\\-_.]+(/diary)$", function (n, o, a) {
        function i(e, n) {
            var a = t(".js-post-list");
            a.find(".no-content").addClass("none");
            var i = t(t.parseHTML(n)).filter("*");
            i.hide().fadeIn(400).prependTo(a), l.remove(), window.history.replaceState(window.history.state, "", o.href.replace(/\?.*/, ""));
            var r = t(document).find("#js-my-post-count");
            r[0] && r.text(+r.text() + 1);
            var s = t(window);
            s.scrollTop(i.offset().top + i.outerHeight() / 2 - s.height() / 2)
        }

        function r(t, e) {
            l.remove()
        }

        function s(n, o) {
            e.Form.toggleDisabled(t(n.target), !0)
        }
        e.Entry.setupHiddenContents(a), e.Content.autopagerize(".js-post-list", a);
        var l = t("#post-form");
        e.Guest.isGuest() || (e.Entry.setupEmpathyButtons(a), e.EntryForm.setupSubmission(l, a), e.EntryForm.setupFormStatus(l, a), l.hasClass("for-identified-user") && e.EntryForm.setupIdentifiedUserForm(l, a)), t(document).on("olv:report:done", s), l.on("olv:entryform:post:done", i);
        var c = l.find(".cancel-button");
        c.on("click", r), a.done(function () {
            showButton.off("click"), t(document).off("olv:report:done", s), l.off("olv:entryform:post:done", i), c.off("click", r)
        })
    }), e.router.connect("^/users/[0-9a-zA-Z\\-_.]+(/friends|/following|/followers|/empathies|/posts)?$", function (n, o, a) {
        function i(n, o) {
            e.Form.toggleDisabled(t(n.target), !0)
        }

        function r(e, n) {
            t("#user-content.is-visitor").length && t("#js-following-count").text(n)
        }
        e.User.setupFollowButton(a, {
            container: ".main-column",
            noReloadOnFollow: !0
        }), e.Entry.setupHiddenContents(a), t(document).on("olv:report:done", i), t(document).on("olv:visitor:following-count:change", r), a.done(function () {
            showButton.off("click"), t(document).off("olv:report:done", i), t(document).off("olv:visitor:following-count:change", r)
        }), e.Entry.setupEmpathyButtons(a)
    }), e.router.connect("^/users/[0-9a-zA-Z\\-_.]+/favorites$", function (t, n, o) {
        e.Content.autopagerize(".community-list", o)
    }), e.router.connect("^/settings/(?:account|profile|themes)$", function (n, o, a) {
        function i(n) {
            var o = t(this),
                a = o.closest("form");
            e.Form.isDisabled(o) || n.isDefaultPrevented() || (n.preventDefault(), e.Form.submit(a, o).done(function (t) {
                e.showMessage("", e.loc("olv.portal.dialog.apply_settings_done"))
            }))
        }

        function r(n) {
            var o = t(this);
            e.showConfirm(e.loc("olv.portal.profile_post"), e.loc("olv.portal.profile_post.confirm_remove"), {
                okLabel: e.loc("olv.portal.button.remove"),
                cancelLabel: e.loc("olv.portal.stop")
            }).done(function (t) {
                t && e.Form.post("/settings/profile_post.unset.json", null, o).done(function () {
                    o.trigger("olv:entry:profile-post:remove"), o.remove()
                })
            })
        }

        function s(e) {
            var n = t(),
                o = t(),
                a = t("#favorite-game-genre select");
            a.each(function () {
                var e = t(this),
                    o = e.find("option[value=" + e.val() + "]").attr("data-is-configurable");
                null != o && "0" != o && a.filter(function () {
                    return !t(this).is(e)
                }).each(function () {
                    var o = t(this).find("option[value=" + e.val() + "]");
                    n = n.add(o)
                })
            }), o = a.find("option").filter(function () {
                return !t(this).is(n)
            }), n.prop("disabled", !0), o.prop("disabled", !1)
        }
        s(), t(document).on("click", ".apply-button", i), t(document).on("click", "#profile-post", r), t(document).on("change", "#favorite-game-genre select", s), a.done(function () {
            t(document).off("click", ".apply-button", i), t(document).off("click", "#profile-post", r), t(document).off("change", "#favorite-game-genre select", s)
        })
    }), e.router.connect("^(/users/[0-9a-zA-Z\\-_.]+|/communities/(favorites|played)|/my_menu|/settings/profile)", function (t, n, o) {
        e.User.setupUserSidebar(o)
    }), e.router.connect("^/communities/[0-9]+", function (t, n, o) {
        e.Community.setupCommunitySidebar(o), e.SocialButton.setup(o)
    }))
}).call(this, jQuery, Olv);