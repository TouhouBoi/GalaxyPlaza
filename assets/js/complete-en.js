/**
 * @license
 jQuery JavaScript Library v1.9.1
 http://jquery.com/

 Includes Sizzle.js
 http://sizzlejs.com/

 Copyright 2005, 2012 jQuery Foundation, Inc. and other contributors
 Released under the MIT license
 http://jquery.org/license

 Date: 2013-2-4
 jQuery v1.9.1 | (c) 2005, 2012 jQuery Foundation, Inc. | jquery.org/license
//@ sourceMappingURL=jquery.min.map
*/
'use strict';
/** @type {function(string): ?} */
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
  return typeof obj;
} : function(obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};
(function(window, undefined) {
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function isArraylike(obj) {
    var length = obj.length;
    var type = jQuery.type(obj);
    return jQuery.isWindow(obj) ? false : 1 === obj.nodeType && length ? true : "array" === type || "function" !== type && (0 === length || "number" == typeof length && length > 0 && length - 1 in obj);
  }
  /**
   * @param {!Object} options
   * @return {?}
   */
  function createOptions(options) {
    var subwikiListsCache = optionsCache[options] = {};
    return jQuery.each(options.match(rnotwhite) || [], function(canCreateDiscussions, wikiId) {
      /** @type {boolean} */
      subwikiListsCache[wikiId] = true;
    }), subwikiListsCache;
  }
  /**
   * @param {!Object} elem
   * @param {string} name
   * @param {boolean} data
   * @param {boolean} pvt
   * @return {?}
   */
  function internalData(elem, name, data, pvt) {
    if (jQuery.acceptData(elem)) {
      var thisCache;
      var ret;
      var internalKey = jQuery.expando;
      /** @type {boolean} */
      var o = "string" == typeof name;
      var isNode = elem.nodeType;
      var cache = isNode ? jQuery.cache : elem;
      var id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
      if (id && cache[id] && (pvt || cache[id].data) || !o || data !== undefined) {
        return id || (isNode ? elem[internalKey] = id = arr.pop() || jQuery.guid++ : id = internalKey), cache[id] || (cache[id] = {}, isNode || (cache[id].toJSON = jQuery.noop)), ("object" == (typeof name === "undefined" ? "undefined" : _typeof(name)) || "function" == typeof name) && (pvt ? cache[id] = jQuery.extend(cache[id], name) : cache[id].data = 
        jQuery.extend(cache[id].data, name)), thisCache = cache[id], pvt || (thisCache.data || (thisCache.data = {}), thisCache = thisCache.data), data !== undefined && (thisCache[jQuery.camelCase(name)] = data), o ? (ret = thisCache[name], null == ret && (ret = thisCache[jQuery.camelCase(name)])) : ret = thisCache, ret;
      }
    }
  }
  /**
   * @param {!Object} elem
   * @param {string} name
   * @param {string} pvt
   * @return {undefined}
   */
  function internalRemoveData(elem, name, pvt) {
    if (jQuery.acceptData(elem)) {
      var i;
      var l;
      var thisCache;
      var isNode = elem.nodeType;
      var cache = isNode ? jQuery.cache : elem;
      var id = isNode ? elem[jQuery.expando] : jQuery.expando;
      if (cache[id]) {
        if (name && (thisCache = pvt ? cache[id] : cache[id].data)) {
          if (jQuery.isArray(name)) {
            name = name.concat(jQuery.map(name, jQuery.camelCase));
          } else {
            if (name in thisCache) {
              /** @type {!Array} */
              name = [name];
            } else {
              name = jQuery.camelCase(name);
              name = name in thisCache ? [name] : name.split(" ");
            }
          }
          /** @type {number} */
          i = 0;
          l = name.length;
          for (; l > i; i++) {
            delete thisCache[name[i]];
          }
          if (!(pvt ? isEmptyDataObject : jQuery.isEmptyObject)(thisCache)) {
            return;
          }
        }
        if (pvt || (delete cache[id].data, isEmptyDataObject(cache[id]))) {
          if (isNode) {
            jQuery.cleanData([elem], true);
          } else {
            if (jQuery.support.deleteExpando || cache != cache.window) {
              delete cache[id];
            } else {
              /** @type {null} */
              cache[id] = null;
            }
          }
        }
      }
    }
  }
  /**
   * @param {!Object} elem
   * @param {string} key
   * @param {?} data
   * @return {?}
   */
  function dataAttr(elem, key, data) {
    if (data === undefined && 1 === elem.nodeType) {
      var name = "data-" + key.replace(regAttr, "-$1").toLowerCase();
      if (data = elem.getAttribute(name), "string" == typeof data) {
        try {
          data = "true" === data ? true : "false" === data ? false : "null" === data ? null : +data + "" === data ? +data : JSON_START.test(data) ? jQuery.parseJSON(data) : data;
        } catch (o) {
        }
        jQuery.data(elem, key, data);
      } else {
        /** @type {!Object} */
        data = undefined;
      }
    }
    return data;
  }
  /**
   * @param {!Object} obj
   * @return {?}
   */
  function isEmptyDataObject(obj) {
    var index;
    for (index in obj) {
      if (("data" !== index || !jQuery.isEmptyObject(obj[index])) && "toJSON" !== index) {
        return false;
      }
    }
    return true;
  }
  /**
   * @return {?}
   */
  function returnTrue() {
    return true;
  }
  /**
   * @return {?}
   */
  function returnFalse() {
    return false;
  }
  /**
   * @param {!Object} cur
   * @param {string} dir
   * @return {?}
   */
  function sibling(cur, dir) {
    do {
      cur = cur[dir];
    } while (cur && 1 !== cur.nodeType);
    return cur;
  }
  /**
   * @param {!Array} text
   * @param {!Object} node
   * @param {boolean} keep
   * @return {?}
   */
  function filter(text, node, keep) {
    if (node = node || 0, jQuery.isFunction(node)) {
      return jQuery.grep(text, function(y, r) {
        /** @type {boolean} */
        var retVal = !!node.call(y, r, y);
        return retVal === keep;
      });
    }
    if (node.nodeType) {
      return jQuery.grep(text, function(elem) {
        return elem === node === keep;
      });
    }
    if ("string" == typeof node) {
      var r = jQuery.grep(text, function(nodeToInspect) {
        return 1 === nodeToInspect.nodeType;
      });
      if (searchImpl.test(node)) {
        return jQuery.filter(node, r, !keep);
      }
      node = jQuery.filter(node, r);
    }
    return jQuery.grep(text, function(e) {
      return jQuery.inArray(e, node) >= 0 === keep;
    });
  }
  /**
   * @param {!Object} document
   * @return {?}
   */
  function createSafeFragment(document) {
    /** @type {!Array<string>} */
    var deadPool = componentsStr.split("|");
    var safeFrag = document.createDocumentFragment();
    if (safeFrag.createElement) {
      for (; deadPool.length;) {
        safeFrag.createElement(deadPool.pop());
      }
    }
    return safeFrag;
  }
  /**
   * @param {!Node} elem
   * @param {string} name
   * @return {?}
   */
  function query(elem, name) {
    return elem.getElementsByTagName(name)[0] || elem.appendChild(elem.ownerDocument.createElement(name));
  }
  /**
   * @param {!Object} elem
   * @return {?}
   */
  function disableScript(elem) {
    var attr = elem.getAttributeNode("type");
    return elem.type = (attr && attr.specified) + "/" + elem.type, elem;
  }
  /**
   * @param {!Object} elem
   * @return {?}
   */
  function restoreScript(elem) {
    /** @type {(Array<string>|null)} */
    var match = rscriptTypeMasked.exec(elem.type);
    return match ? elem.type = match[1] : elem.removeAttribute("type"), elem;
  }
  /**
   * @param {number} elems
   * @param {!NodeList} refElements
   * @return {undefined}
   */
  function setGlobalEval(elems, refElements) {
    var elem;
    /** @type {number} */
    var i = 0;
    for (; null != (elem = elems[i]); i++) {
      jQuery._data(elem, "globalEval", !refElements || jQuery._data(refElements[i], "globalEval"));
    }
  }
  /**
   * @param {!Object} src
   * @param {!Object} dest
   * @return {undefined}
   */
  function cloneCopyEvent(src, dest) {
    if (1 === dest.nodeType && jQuery.hasData(src)) {
      var i;
      var type;
      var tableslen;
      var data = jQuery._data(src);
      var s = jQuery._data(dest, data);
      var handlers = data.events;
      if (handlers) {
        delete s.handle;
        s.events = {};
        for (i in handlers) {
          /** @type {number} */
          type = 0;
          tableslen = handlers[i].length;
          for (; tableslen > type; type++) {
            jQuery.event.add(dest, i, handlers[i][type]);
          }
        }
      }
      if (s.data) {
        s.data = jQuery.extend({}, s.data);
      }
    }
  }
  /**
   * @param {!Object} src
   * @param {!Object} dest
   * @return {undefined}
   */
  function fixCloneNodeIssues(src, dest) {
    var undefined;
    var type;
    var data;
    if (1 === dest.nodeType) {
      if (undefined = dest.nodeName.toLowerCase(), !jQuery.support.noCloneEvent && dest[jQuery.expando]) {
        data = jQuery._data(dest);
        for (type in data.events) {
          jQuery.removeEvent(dest, type, data.handle);
        }
        dest.removeAttribute(jQuery.expando);
      }
      if ("script" === undefined && dest.text !== src.text) {
        disableScript(dest).text = src.text;
        restoreScript(dest);
      } else {
        if ("object" === undefined) {
          if (dest.parentNode) {
            dest.outerHTML = src.outerHTML;
          }
          if (jQuery.support.html5Clone && src.innerHTML && !jQuery.trim(dest.innerHTML)) {
            dest.innerHTML = src.innerHTML;
          }
        } else {
          if ("input" === undefined && reg.test(src.type)) {
            dest.defaultChecked = dest.checked = src.checked;
            if (dest.value !== src.value) {
              dest.value = src.value;
            }
          } else {
            if ("option" === undefined) {
              dest.defaultSelected = dest.selected = src.defaultSelected;
            } else {
              if ("input" === undefined || "textarea" === undefined) {
                dest.defaultValue = src.defaultValue;
              }
            }
          }
        }
      }
    }
  }
  /**
   * @param {!Object} context
   * @param {string} tag
   * @return {?}
   */
  function getAll(context, tag) {
    var element;
    var elem;
    /** @type {number} */
    var name = 0;
    var s = _typeof(context.getElementsByTagName) !== strundefined ? context.getElementsByTagName(tag || "*") : _typeof(context.querySelectorAll) !== strundefined ? context.querySelectorAll(tag || "*") : undefined;
    if (!s) {
      /** @type {!Array} */
      s = [];
      element = context.childNodes || context;
      for (; null != (elem = element[name]); name++) {
        if (!tag || jQuery.nodeName(elem, tag)) {
          s.push(elem);
        } else {
          jQuery.merge(s, getAll(elem, tag));
        }
      }
    }
    return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], s) : s;
  }
  /**
   * @param {!Object} elem
   * @return {undefined}
   */
  function fixDefaultChecked(elem) {
    if (reg.test(elem.type)) {
      elem.defaultChecked = elem.checked;
    }
  }
  /**
   * @param {!Object} style
   * @param {string} name
   * @return {?}
   */
  function vendorPropName(style, name) {
    if (name in style) {
      return name;
    }
    var UserSelect = name.charAt(0).toUpperCase() + name.slice(1);
    /** @type {string} */
    var origName = name;
    /** @type {number} */
    var i = prefixes.length;
    for (; i--;) {
      if (name = prefixes[i] + UserSelect, name in style) {
        return name;
      }
    }
    return origName;
  }
  /**
   * @param {!Object} element
   * @param {!Object} component
   * @return {?}
   */
  function show(element, component) {
    return element = component || element, "none" === jQuery.css(element, "display") || !jQuery.contains(element.ownerDocument, element);
  }
  /**
   * @param {!NodeList} elements
   * @param {number} show
   * @return {?}
   */
  function showHide(elements, show) {
    var display;
    var elem;
    var hidden;
    /** @type {!Array} */
    var values = [];
    /** @type {number} */
    var index = 0;
    var length = elements.length;
    for (; length > index; index++) {
      elem = elements[index];
      if (elem.style) {
        values[index] = jQuery._data(elem, "olddisplay");
        display = elem.style.display;
        if (show) {
          if (!(values[index] || "none" !== display)) {
            /** @type {string} */
            elem.style.display = "";
          }
          if ("" === elem.style.display && show(elem)) {
            values[index] = jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName));
          }
        } else {
          if (!values[index]) {
            hidden = show(elem);
            if (display && "none" !== display || !hidden) {
              jQuery._data(elem, "olddisplay", hidden ? display : jQuery.css(elem, "display"));
            }
          }
        }
      }
    }
    /** @type {number} */
    index = 0;
    for (; length > index; index++) {
      elem = elements[index];
      if (elem.style) {
        if (!(show && "none" !== elem.style.display && "" !== elem.style.display)) {
          elem.style.display = show ? values[index] || "" : "none";
        }
      }
    }
    return elements;
  }
  /**
   * @param {!Object} elem
   * @param {string} name
   * @param {string} source
   * @return {?}
   */
  function fn(elem, name, source) {
    /** @type {(Array<string>|null)} */
    var matches = r.exec(name);
    return matches ? Math.max(0, matches[1] - (source || 0)) + (matches[2] || "px") : name;
  }
  /**
   * @param {!Object} elem
   * @param {string} name
   * @param {?} extra
   * @param {boolean} isBorderBox
   * @param {!Object} styles
   * @return {?}
   */
  function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
    /** @type {number} */
    var i = extra === (isBorderBox ? "border" : "content") ? 4 : "width" === name ? 1 : 0;
    /** @type {number} */
    var val = 0;
    for (; 4 > i; i = i + 2) {
      if ("margin" === extra) {
        val = val + jQuery.css(elem, extra + cssExpand[i], true, styles);
      }
      if (isBorderBox) {
        if ("content" === extra) {
          /** @type {number} */
          val = val - jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        }
        if ("margin" !== extra) {
          /** @type {number} */
          val = val - jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      } else {
        val = val + jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        if ("padding" !== extra) {
          val = val + jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      }
    }
    return val;
  }
  /**
   * @param {!Object} elem
   * @param {string} name
   * @param {!Object} extra
   * @return {?}
   */
  function getWidthOrHeight(elem, name, extra) {
    /** @type {boolean} */
    var valueIsBorderBox = true;
    var val = "width" === name ? elem.offsetWidth : elem.offsetHeight;
    var styles = getStyles(elem);
    var isBorderBox = jQuery.support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing", false, styles);
    if (0 >= val || null == val) {
      if (val = getWH(elem, name, styles), (0 > val || null == val) && (val = elem.style[name]), pre.test(val)) {
        return val;
      }
      valueIsBorderBox = isBorderBox && (jQuery.support.boxSizingReliable || val === elem.style[name]);
      /** @type {number} */
      val = parseFloat(val) || 0;
    }
    return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles) + "px";
  }
  /**
   * @param {?} nodeName
   * @return {?}
   */
  function defaultDisplay(nodeName) {
    var doc = document;
    var node = nodes[nodeName];
    return node || (node = actualDisplay(nodeName, doc), "none" !== node && node || (iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(doc.documentElement), doc = (iframe[0].contentWindow || iframe[0].contentDocument).document, doc.write("<!doctype html><html><body>"), doc.close(), node = actualDisplay(nodeName, doc), 
    iframe.detach()), nodes[nodeName] = node), node;
  }
  /**
   * @param {?} name
   * @param {!Object} doc
   * @return {?}
   */
  function actualDisplay(name, doc) {
    var elem = jQuery(doc.createElement(name)).appendTo(doc.body);
    var style1 = jQuery.css(elem[0], "display");
    return elem.remove(), style1;
  }
  /**
   * @param {string} key
   * @param {!Object} a
   * @param {string} val
   * @param {!Function} func
   * @return {undefined}
   */
  function callback(key, a, val, func) {
    var i;
    if (jQuery.isArray(a)) {
      jQuery.each(a, function(object, params) {
        if (val || VALID_IDENTIFIER_EXPR.test(key)) {
          func(key, params);
        } else {
          callback(key + "[" + ("object" == (typeof params === "undefined" ? "undefined" : _typeof(params)) ? object : "") + "]", params, val, func);
        }
      });
    } else {
      if (val || "object" !== jQuery.type(a)) {
        func(key, a);
      } else {
        for (i in a) {
          callback(key + "[" + i + "]", a[i], val, func);
        }
      }
    }
  }
  /**
   * @param {!Object} structure
   * @return {?}
   */
  function addToPrefiltersOrTransports(structure) {
    return function(name, n) {
      if ("string" != typeof name) {
        /** @type {string} */
        n = name;
        /** @type {string} */
        name = "*";
      }
      var type;
      /** @type {number} */
      var ol = 0;
      var o = name.toLowerCase().match(rnotwhite) || [];
      if (jQuery.isFunction(n)) {
        for (; type = o[ol++];) {
          if ("+" === type[0]) {
            type = type.slice(1) || "*";
            (structure[type] = structure[type] || []).unshift(n);
          } else {
            (structure[type] = structure[type] || []).push(n);
          }
        }
      }
    };
  }
  /**
   * @param {!Object} structure
   * @param {?} options
   * @param {!Object} originalOptions
   * @param {?} jqXHR
   * @return {?}
   */
  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
    /**
     * @param {string} dataType
     * @return {?}
     */
    function inspect(dataType) {
      var selected;
      return inspected[dataType] = true, jQuery.each(structure[dataType] || [], function(canCreateDiscussions, prefilterOrFactory) {
        var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
        return "string" != typeof dataTypeOrTransport || seekingTransport || inspected[dataTypeOrTransport] ? seekingTransport ? !(selected = dataTypeOrTransport) : undefined : (options.dataTypes.unshift(dataTypeOrTransport), inspect(dataTypeOrTransport), false);
      }), selected;
    }
    var inspected = {};
    /** @type {boolean} */
    var seekingTransport = structure === transports;
    return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
  }
  /**
   * @param {?} target
   * @param {?} opts
   * @return {?}
   */
  function ajaxExtend(target, opts) {
    var deep;
    var key;
    var flatOptions = jQuery.ajaxSettings.flatOptions || {};
    for (key in opts) {
      if (opts[key] !== undefined) {
        (flatOptions[key] ? target : deep || (deep = {}))[key] = opts[key];
      }
    }
    return deep && jQuery.extend(true, target, deep), target;
  }
  /**
   * @param {!Object} s
   * @param {!XMLHttpRequest} jqXHR
   * @param {!Array} responses
   * @return {?}
   */
  function ajaxHandleResponses(s, jqXHR, responses) {
    var firstDataType;
    var ct;
    var finalDataType;
    var type;
    var contents = s.contents;
    var dataTypes = s.dataTypes;
    var responseFields = s.responseFields;
    for (type in responseFields) {
      if (type in responses) {
        jqXHR[responseFields[type]] = responses[type];
      }
    }
    for (; "*" === dataTypes[0];) {
      dataTypes.shift();
      if (ct === undefined) {
        ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
      }
    }
    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break;
        }
      }
    }
    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0];
    } else {
      for (type in responses) {
        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
          /** @type {string} */
          finalDataType = type;
          break;
        }
        if (!firstDataType) {
          /** @type {string} */
          firstDataType = type;
        }
      }
      /** @type {(string|undefined)} */
      finalDataType = finalDataType || firstDataType;
    }
    return finalDataType ? (finalDataType !== dataTypes[0] && dataTypes.unshift(finalDataType), responses[finalDataType]) : undefined;
  }
  /**
   * @param {!Object} s
   * @param {string} response
   * @return {?}
   */
  function ajaxConvert(s, response) {
    var conv2;
    var type;
    var conv;
    var part;
    var converters = {};
    /** @type {number} */
    var i = 0;
    var tokens = s.dataTypes.slice();
    var key = tokens[0];
    if (s.dataFilter && (response = s.dataFilter(response, s.dataType)), tokens[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv];
      }
    }
    for (; type = tokens[++i];) {
      if ("*" !== type) {
        if ("*" !== key && key !== type) {
          if (conv = converters[key + " " + type] || converters["* " + type], !conv) {
            for (conv2 in converters) {
              if (part = conv2.split(" "), part[1] === type && (conv = converters[key + " " + part[0]] || converters["* " + part[0]])) {
                if (conv === true) {
                  conv = converters[conv2];
                } else {
                  if (converters[conv2] !== true) {
                    /** @type {string} */
                    type = part[0];
                    tokens.splice(i--, 0, type);
                  }
                }
                break;
              }
            }
          }
          if (conv !== true) {
            if (conv && s["throws"]) {
              response = conv(response);
            } else {
              try {
                response = conv(response);
              } catch (e) {
                return {
                  state : "parsererror",
                  error : conv ? e : "No conversion from " + key + " to " + type
                };
              }
            }
          }
        }
        key = type;
      }
    }
    return {
      state : "success",
      data : response
    };
  }
  /**
   * @return {?}
   */
  function createStandardXHR() {
    try {
      return new window.XMLHttpRequest;
    } catch (t) {
    }
  }
  /**
   * @return {?}
   */
  function getNewXmlHttpRequest() {
    try {
      return new window.ActiveXObject("Microsoft.XMLHTTP");
    } catch (t) {
    }
  }
  /**
   * @return {?}
   */
  function createFxNow() {
    return setTimeout(function() {
      /** @type {!Object} */
      fxNow = undefined;
    }), fxNow = jQuery.now();
  }
  /**
   * @param {?} elem
   * @param {undefined} options
   * @return {undefined}
   */
  function get(elem, options) {
    jQuery.each(options, function(name, refC) {
      var callNodes = (meta[name] || []).concat(meta["*"]);
      /** @type {number} */
      var i = 0;
      var n = callNodes.length;
      for (; n > i; i++) {
        if (callNodes[i].call(elem, name, refC)) {
          return;
        }
      }
    });
  }
  /**
   * @param {(Object|string)} elem
   * @param {?} properties
   * @param {!Object} options
   * @return {?}
   */
  function Animation(elem, properties, options) {
    var result;
    var i;
    /** @type {number} */
    var index = 0;
    /** @type {number} */
    var length = animationPrefilters.length;
    var deferred = jQuery.Deferred().always(function() {
      delete tick.elem;
    });
    /**
     * @return {?}
     */
    var tick = function tick() {
      if (i) {
        return false;
      }
      var currentTime = fxNow || createFxNow();
      /** @type {number} */
      var remaining = Math.max(0, animation.startTime + animation.duration - currentTime);
      /** @type {number} */
      var temp = remaining / animation.duration || 0;
      /** @type {number} */
      var percent = 1 - temp;
      /** @type {number} */
      var index = 0;
      var length = animation.tweens.length;
      for (; length > index; index++) {
        animation.tweens[index].run(percent);
      }
      return deferred.notifyWith(elem, [animation, percent, remaining]), 1 > percent && length ? remaining : (deferred.resolveWith(elem, [animation]), false);
    };
    var animation = deferred.promise({
      elem : elem,
      props : jQuery.extend({}, properties),
      opts : jQuery.extend(true, {
        specialEasing : {}
      }, options),
      originalProperties : properties,
      originalOptions : options,
      startTime : fxNow || createFxNow(),
      duration : options.duration,
      tweens : [],
      createTween : function tick(prop, end) {
        var result = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
        return animation.tweens.push(result), result;
      },
      stop : function tick(value) {
        /** @type {number} */
        var index = 0;
        var count = value ? animation.tweens.length : 0;
        if (i) {
          return this;
        }
        /** @type {boolean} */
        i = true;
        for (; count > index; index++) {
          animation.tweens[index].run(1);
        }
        return value ? deferred.resolveWith(elem, [animation, value]) : deferred.rejectWith(elem, [animation, value]), this;
      }
    });
    var props = animation.props;
    propFilter(props, animation.opts.specialEasing);
    for (; length > index; index++) {
      if (result = animationPrefilters[index].call(animation, elem, props, animation.opts)) {
        return result;
      }
    }
    return get(animation, props), jQuery.isFunction(animation.opts.start) && animation.opts.start.call(elem, animation), jQuery.fx.timer(jQuery.extend(tick, {
      elem : elem,
      anim : animation,
      queue : animation.opts.queue
    })), animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
  }
  /**
   * @param {!Array} props
   * @param {!Array} p
   * @return {undefined}
   */
  function propFilter(props, p) {
    var obj;
    var name;
    var prop;
    var val;
    var hooks;
    for (prop in props) {
      if (name = jQuery.camelCase(prop), val = p[name], obj = props[prop], jQuery.isArray(obj) && (val = obj[1], obj = props[prop] = obj[0]), prop !== name && (props[name] = obj, delete props[prop]), hooks = jQuery.cssHooks[name], hooks && "expand" in hooks) {
        obj = hooks.expand(obj);
        delete props[name];
        for (prop in obj) {
          if (!(prop in props)) {
            props[prop] = obj[prop];
            p[prop] = val;
          }
        }
      } else {
        p[name] = val;
      }
    }
  }
  /**
   * @param {!Object} elem
   * @param {!Object} props
   * @param {!Object} opts
   * @return {undefined}
   */
  function defaultPrefilter(elem, props, opts) {
    var prop;
    var i;
    var l;
    var value;
    var dataShow;
    var matched;
    var tween;
    var hooks;
    var oldfire;
    var anim = this;
    var style = elem.style;
    var orig = {};
    /** @type {!Array} */
    var results = [];
    var hidden = elem.nodeType && show(elem);
    if (!opts.queue) {
      hooks = jQuery._queueHooks(elem, "fx");
      if (null == hooks.unqueued) {
        /** @type {number} */
        hooks.unqueued = 0;
        /** @type {function(): undefined} */
        oldfire = hooks.empty.fire;
        /**
         * @return {undefined}
         */
        hooks.empty.fire = function() {
          if (!hooks.unqueued) {
            oldfire();
          }
        };
      }
      hooks.unqueued++;
      anim.always(function() {
        anim.always(function() {
          hooks.unqueued--;
          if (!jQuery.queue(elem, "fx").length) {
            hooks.empty.fire();
          }
        });
      });
    }
    if (1 === elem.nodeType && ("height" in props || "width" in props)) {
      /** @type {!Array} */
      opts.overflow = [style.overflow, style.overflowX, style.overflowY];
      if ("inline" === jQuery.css(elem, "display") && "none" === jQuery.css(elem, "float")) {
        if (jQuery.support.inlineBlockNeedsLayout && "inline" !== defaultDisplay(elem.nodeName)) {
          /** @type {number} */
          style.zoom = 1;
        } else {
          /** @type {string} */
          style.display = "inline-block";
        }
      }
    }
    if (opts.overflow) {
      /** @type {string} */
      style.overflow = "hidden";
      if (!jQuery.support.shrinkWrapBlocks) {
        anim.always(function() {
          style.overflow = opts.overflow[0];
          style.overflowX = opts.overflow[1];
          style.overflowY = opts.overflow[2];
        });
      }
    }
    for (i in props) {
      if (value = props[i], verRe.exec(value)) {
        if (delete props[i], matched = matched || "toggle" === value, value === (hidden ? "hide" : "show")) {
          continue;
        }
        results.push(i);
      }
    }
    if (l = results.length) {
      dataShow = jQuery._data(elem, "fxshow") || jQuery._data(elem, "fxshow", {});
      if ("hidden" in dataShow) {
        hidden = dataShow.hidden;
      }
      if (matched) {
        /** @type {boolean} */
        dataShow.hidden = !hidden;
      }
      if (hidden) {
        jQuery(elem).show();
      } else {
        anim.done(function() {
          jQuery(elem).hide();
        });
      }
      anim.done(function() {
        var prop;
        jQuery._removeData(elem, "fxshow");
        for (prop in orig) {
          jQuery.style(elem, prop, orig[prop]);
        }
      });
      /** @type {number} */
      i = 0;
      for (; l > i; i++) {
        prop = results[i];
        tween = anim.createTween(prop, hidden ? dataShow[prop] : 0);
        orig[prop] = dataShow[prop] || jQuery.style(elem, prop);
        if (!(prop in dataShow)) {
          dataShow[prop] = tween.start;
          if (hidden) {
            tween.end = tween.start;
            /** @type {number} */
            tween.start = "width" === prop || "height" === prop ? 1 : 0;
          }
        }
      }
    }
  }
  /**
   * @param {?} obj
   * @param {string} key
   * @param {string} object
   * @param {string} end
   * @param {boolean} easing
   * @return {?}
   */
  function Tween(obj, key, object, end, easing) {
    return new Tween.prototype.init(obj, key, object, end, easing);
  }
  /**
   * @param {string} type
   * @param {number} includeWidth
   * @return {?}
   */
  function genFx(type, includeWidth) {
    var which;
    var attrs = {
      height : type
    };
    /** @type {number} */
    var i = 0;
    /** @type {number} */
    includeWidth = includeWidth ? 1 : 0;
    for (; 4 > i; i = i + (2 - includeWidth)) {
      which = cssExpand[i];
      attrs["margin" + which] = attrs["padding" + which] = type;
    }
    return includeWidth && (attrs.opacity = attrs.width = type), attrs;
  }
  /**
   * @param {!Object} elem
   * @return {?}
   */
  function getWindow(elem) {
    return jQuery.isWindow(elem) ? elem : 9 === elem.nodeType ? elem.defaultView || elem.parentWindow : false;
  }
  var readyList;
  var rootjQuery;
  var strundefined = typeof undefined === "undefined" ? "undefined" : _typeof(undefined);
  var document = window.document;
  /** @type {!Location} */
  var location = window.location;
  var _jQuery = window.jQuery;
  var old$ = window.$;
  var class2type = {};
  /** @type {!Array} */
  var arr = [];
  /** @type {string} */
  var core_version = "1.9.1";
  /** @type {function(this:*, ...*): !Array<?>} */
  var concat = arr.concat;
  /** @type {function(this:IArrayLike<T>, ...T): number} */
  var push = arr.push;
  /** @type {function(this:(IArrayLike<T>|string), *=, *=): !Array<T>} */
  var slice = arr.slice;
  /** @type {function(this:(IArrayLike<T>|string), T, number=): number} */
  var indexOf = arr.indexOf;
  /** @type {function(this:*): string} */
  var toString = class2type.toString;
  /** @type {function(this:Object, *): boolean} */
  var hasOwn = class2type.hasOwnProperty;
  /** @type {function(this:string): string} */
  var core_trim = core_version.trim;
  /**
   * @param {?} selector
   * @param {string} context
   * @return {?}
   */
  var jQuery = function jQuerySub(selector, context) {
    return new jQuerySub.fn.init(selector, context, rootjQuery);
  };
  /** @type {string} */
  var FSSource = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
  /** @type {!RegExp} */
  var rnotwhite = /\S+/g;
  /** @type {!RegExp} */
  var REGEX_ESCAPE_EXPR = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
  /** @type {!RegExp} */
  var customSelectorReg = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/;
  /** @type {!RegExp} */
  var rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;
  /** @type {!RegExp} */
  var rValidchars = /^[\],:{}\s]*$/;
  /** @type {!RegExp} */
  var rValidbraces = /(?:^|:|,)(?:\s*\[)+/g;
  /** @type {!RegExp} */
  var rbreakright = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g;
  /** @type {!RegExp} */
  var formattingRemoveEscapes = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g;
  /** @type {!RegExp} */
  var _kerningNamesHash_escapeEscape = /^-ms-/;
  /** @type {!RegExp} */
  var regPlaceholder = /-([\da-z])/gi;
  /**
   * @param {?} length
   * @param {string} segment
   * @return {?}
   */
  var frameworkLibScriptTag = function L(length, segment) {
    return segment.toUpperCase();
  };
  /**
   * @param {!Object} verifiedEvent
   * @return {undefined}
   */
  var onDOMContentLoaded = function sendNavigationTimingMetrics(verifiedEvent) {
    if (document.addEventListener || "load" === verifiedEvent.type || "complete" === document.readyState) {
      gaProd();
      jQuery.ready();
    }
  };
  /**
   * @return {undefined}
   */
  var gaProd = function resolveOnce() {
    if (document.addEventListener) {
      document.removeEventListener("DOMContentLoaded", onDOMContentLoaded, false);
      window.removeEventListener("load", onDOMContentLoaded, false);
    } else {
      document.detachEvent("onreadystatechange", onDOMContentLoaded);
      window.detachEvent("onload", onDOMContentLoaded);
    }
  };
  jQuery.fn = jQuery.prototype = {
    jquery : core_version,
    constructor : jQuery,
    init : function init(selector, context, rootjQuery) {
      var match;
      var elem;
      if (!selector) {
        return this;
      }
      if ("string" == typeof selector) {
        if (match = "<" === selector.charAt(0) && ">" === selector.charAt(selector.length - 1) && selector.length >= 3 ? [null, selector, null] : customSelectorReg.exec(selector), !match || !match[1] && context) {
          return !context || context.jquery ? (context || rootjQuery).find(selector) : this.constructor(context).find(selector);
        }
        if (match[1]) {
          if (context = context instanceof jQuery ? context[0] : context, jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true)), rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
            for (match in context) {
              if (jQuery.isFunction(this[match])) {
                this[match](context[match]);
              } else {
                this.attr(match, context[match]);
              }
            }
          }
          return this;
        }
        if (elem = document.getElementById(match[2]), elem && elem.parentNode) {
          if (elem.id !== match[2]) {
            return rootjQuery.find(selector);
          }
          /** @type {number} */
          this.length = 1;
          this[0] = elem;
        }
        return this.context = document, this.selector = selector, this;
      }
      return selector.nodeType ? (this.context = this[0] = selector, this.length = 1, this) : jQuery.isFunction(selector) ? rootjQuery.ready(selector) : (selector.selector !== undefined && (this.selector = selector.selector, this.context = selector.context), jQuery.makeArray(selector, this));
    },
    selector : "",
    length : 0,
    size : function countTuplets() {
      return this.length;
    },
    toArray : function difference__3373() {
      return slice.call(this);
    },
    get : function get(from) {
      return null == from ? this.toArray() : 0 > from ? this[this.length + from] : this[from];
    },
    pushStack : function pushStack(a) {
      var ret = jQuery.merge(this.constructor(), a);
      return ret.prevObject = this, ret.context = this.context, ret;
    },
    each : function parseDeps(data, callback) {
      return jQuery.each(this, data, callback);
    },
    ready : function ready(fn) {
      return jQuery.ready.promise().done(fn), this;
    },
    slice : function first() {
      return this.pushStack(slice.apply(this, arguments));
    },
    first : function getSubmenuItem() {
      return this.eq(0);
    },
    last : function getSubmenuItem() {
      return this.eq(-1);
    },
    eq : function eq(i) {
      var index = this.length;
      var thisIndex = +i + (0 > i ? index : 0);
      return this.pushStack(thisIndex >= 0 && index > thisIndex ? [this[thisIndex]] : []);
    },
    map : function children(e) {
      return this.pushStack(jQuery.map(this, function(b, change) {
        return e.call(b, change, b);
      }));
    },
    end : function pushStack() {
      return this.prevObject || this.constructor(null);
    },
    push : push,
    sort : [].sort,
    splice : [].splice
  };
  jQuery.fn.init.prototype = jQuery.fn;
  /** @type {function(): ?} */
  jQuery.extend = jQuery.fn.extend = function() {
    var src;
    var copyIsArray;
    var copy;
    var name;
    var options;
    var clone;
    var target = arguments[0] || {};
    /** @type {number} */
    var i = 1;
    /** @type {number} */
    var length = arguments.length;
    /** @type {boolean} */
    var deep = false;
    if ("boolean" == typeof target) {
      /** @type {boolean} */
      deep = target;
      target = arguments[1] || {};
      /** @type {number} */
      i = 2;
    }
    if (!("object" == (typeof target === "undefined" ? "undefined" : _typeof(target)) || jQuery.isFunction(target))) {
      target = {};
    }
    if (length === i) {
      target = this;
      --i;
    }
    for (; length > i; i++) {
      if (null != (options = arguments[i])) {
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target !== copy) {
            if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
              if (copyIsArray) {
                /** @type {boolean} */
                copyIsArray = false;
                clone = src && jQuery.isArray(src) ? src : [];
              } else {
                clone = src && jQuery.isPlainObject(src) ? src : {};
              }
              target[name] = jQuery.extend(deep, clone, copy);
            } else {
              if (copy !== undefined) {
                target[name] = copy;
              }
            }
          }
        }
      }
    }
    return target;
  };
  jQuery.extend({
    noConflict : function reset(deep) {
      return window.$ === jQuery && (window.$ = old$), deep && window.jQuery === jQuery && (window.jQuery = _jQuery), jQuery;
    },
    isReady : false,
    readyWait : 1,
    holdReady : function jQueryCheck(context) {
      if (context) {
        jQuery.readyWait++;
      } else {
        jQuery.ready(true);
      }
    },
    ready : function ready(user) {
      if (user === true ? !--jQuery.readyWait : !jQuery.isReady) {
        if (!document.body) {
          return setTimeout(jQuery.ready);
        }
        /** @type {boolean} */
        jQuery.isReady = true;
        if (!(user !== true && --jQuery.readyWait > 0)) {
          readyList.resolveWith(document, [jQuery]);
          if (jQuery.fn.trigger) {
            jQuery(document).trigger("ready").off("ready");
          }
        }
      }
    },
    isFunction : function isFunction(fn) {
      return "function" === jQuery.type(fn);
    },
    isArray : Array.isArray || function(value) {
      return "array" === jQuery.type(value);
    },
    isWindow : function isWindow(obj) {
      return null != obj && obj == obj.window;
    },
    isNumeric : function _isNumerical(obj) {
      return !isNaN(parseFloat(obj)) && isFinite(obj);
    },
    type : function type(obj) {
      return null == obj ? obj + "" : "object" == (typeof obj === "undefined" ? "undefined" : _typeof(obj)) || "function" == typeof obj ? class2type[toString.call(obj)] || "object" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
    },
    isPlainObject : function isPlainObject(o) {
      if (!o || "object" !== jQuery.type(o) || o.nodeType || jQuery.isWindow(o)) {
        return false;
      }
      try {
        if (o.constructor && !hasOwn.call(o, "constructor") && !hasOwn.call(o.constructor.prototype, "isPrototypeOf")) {
          return false;
        }
      } catch (n) {
        return false;
      }
      var key;
      for (key in o) {
      }
      return key === undefined || hasOwn.call(o, key);
    },
    isEmptyObject : function isEmptyObject(obj) {
      var key;
      for (key in obj) {
        return false;
      }
      return true;
    },
    error : function error(value) {
      throw Error(value);
    },
    parseHTML : function parseHTML(data, context, keepScripts) {
      if (!data || "string" != typeof data) {
        return null;
      }
      if ("boolean" == typeof context) {
        /** @type {!Object} */
        keepScripts = context;
        /** @type {boolean} */
        context = false;
      }
      context = context || document;
      /** @type {(Array<string>|null)} */
      var parsed = rsingleTag.exec(data);
      /** @type {(Array|boolean)} */
      var scripts = !keepScripts && [];
      return parsed ? [context.createElement(parsed[1])] : (parsed = jQuery.buildFragment([data], context, scripts), scripts && jQuery(scripts).remove(), jQuery.merge([], parsed.childNodes));
    },
    parseJSON : function parseJSON(key) {
      return window.JSON && window.JSON.parse ? window.JSON.parse(key) : null === key ? key : "string" == typeof key && (key = jQuery.trim(key), key && rValidchars.test(key.replace(rbreakright, "@").replace(formattingRemoveEscapes, "]").replace(rValidbraces, ""))) ? Function("return " + key)() : (jQuery.error("Invalid JSON: " + key), undefined);
    },
    parseXML : function parseXML(data) {
      var doc;
      var parser;
      if (!data || "string" != typeof data) {
        return null;
      }
      try {
        if (window.DOMParser) {
          /** @type {!DOMParser} */
          parser = new DOMParser;
          /** @type {(Document|null)} */
          doc = parser.parseFromString(data, "text/xml");
        } else {
          doc = new ActiveXObject("Microsoft.XMLDOM");
          /** @type {string} */
          doc.async = "false";
          doc.loadXML(data);
        }
      } catch (o) {
        /** @type {!Object} */
        doc = undefined;
      }
      return doc && doc.documentElement && !doc.getElementsByTagName("parsererror").length || jQuery.error("Invalid XML: " + data), doc;
    },
    noop : function noop() {
    },
    globalEval : function globalEval(data) {
      if (data && jQuery.trim(data)) {
        (window.execScript || function(aNetChannelMessage) {
          window.eval.call(window, aNetChannelMessage);
        })(data);
      }
    },
    camelCase : function camelCase(str) {
      return str.replace(_kerningNamesHash_escapeEscape, "ms-").replace(regPlaceholder, frameworkLibScriptTag);
    },
    nodeName : function nodeName(elem, name) {
      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    },
    each : function each(obj, args, fn) {
      var programWrapper;
      /** @type {number} */
      var i = 0;
      var length = obj.length;
      var isArray = isArraylike(obj);
      if (fn) {
        if (isArray) {
          for (; length > i; i++) {
            if (programWrapper = args.apply(obj[i], fn), programWrapper === false) {
              break;
            }
          }
        } else {
          for (i in obj) {
            if (programWrapper = args.apply(obj[i], fn), programWrapper === false) {
              break;
            }
          }
        }
      } else {
        if (isArray) {
          for (; length > i; i++) {
            if (programWrapper = args.call(obj[i], i, obj[i]), programWrapper === false) {
              break;
            }
          }
        } else {
          for (i in obj) {
            if (programWrapper = args.call(obj[i], i, obj[i]), programWrapper === false) {
              break;
            }
          }
        }
      }
      return obj;
    },
    trim : core_trim && !core_trim.call("\ufeff\u00a0") ? function(text) {
      return null == text ? "" : core_trim.call(text);
    } : function(text) {
      return null == text ? "" : (text + "").replace(REGEX_ESCAPE_EXPR, "");
    },
    makeArray : function each(arr, index) {
      var target = index || [];
      return null != arr && (isArraylike(Object(arr)) ? jQuery.merge(target, "string" == typeof arr ? [arr] : arr) : push.call(target, arr)), target;
    },
    inArray : function inArray(item, arr, i) {
      var len;
      if (arr) {
        if (indexOf) {
          return indexOf.call(arr, item, i);
        }
        len = arr.length;
        i = i ? 0 > i ? Math.max(0, len + i) : i : 0;
        for (; len > i; i++) {
          if (i in arr && arr[i] === item) {
            return i;
          }
        }
      }
      return -1;
    },
    merge : function validateNativeFormat(obj, data) {
      var pos = data.length;
      var i = obj.length;
      /** @type {number} */
      var p = 0;
      if ("number" == typeof pos) {
        for (; pos > p; p++) {
          obj[i++] = data[p];
        }
      } else {
        for (; data[p] !== undefined;) {
          obj[i++] = data[p++];
        }
      }
      return obj.length = i, obj;
    },
    grep : function grep(elems, callback, inv) {
      var retVal;
      /** @type {!Array} */
      var ret = [];
      /** @type {number} */
      var i = 0;
      var length = elems.length;
      /** @type {boolean} */
      inv = !!inv;
      for (; length > i; i++) {
        /** @type {boolean} */
        retVal = !!callback(elems[i], i);
        if (inv !== retVal) {
          ret.push(elems[i]);
        }
      }
      return ret;
    },
    map : function map(obj, callback, source) {
      var value;
      /** @type {number} */
      var i = 0;
      var length = obj.length;
      var isArray = isArraylike(obj);
      /** @type {!Array} */
      var ret = [];
      if (isArray) {
        for (; length > i; i++) {
          value = callback(obj[i], i, source);
          if (null != value) {
            ret[ret.length] = value;
          }
        }
      } else {
        for (i in obj) {
          value = callback(obj[i], i, source);
          if (null != value) {
            ret[ret.length] = value;
          }
        }
      }
      return concat.apply([], ret);
    },
    guid : 1,
    proxy : function proxy(e, s) {
      var c;
      var p;
      var h;
      return "string" == typeof s && (h = e[s], s = e, e = h), jQuery.isFunction(e) ? (c = slice.call(arguments, 2), p = function proxyFn() {
        return e.apply(s || this, c.concat(slice.call(arguments)));
      }, p.guid = e.guid = e.guid || jQuery.guid++, p) : undefined;
    },
    access : function access(elems, fn, key, value, chainable, emptyGet, raw) {
      /** @type {number} */
      var i = 0;
      var len = elems.length;
      /** @type {boolean} */
      var bulk = null == key;
      if ("object" === jQuery.type(key)) {
        /** @type {boolean} */
        chainable = true;
        for (i in key) {
          jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
        }
      } else {
        if (value !== undefined && (chainable = true, jQuery.isFunction(value) || (raw = true), bulk && (raw ? (fn.call(elems, value), fn = null) : (bulk = fn, fn = function fn(elem, value, arg1) {
          return bulk.call(jQuery(elem), arg1);
        })), fn)) {
          for (; len > i; i++) {
            fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
          }
        }
      }
      return chainable ? elems : bulk ? fn.call(elems) : len ? fn(elems[0], key) : emptyGet;
    },
    now : function now() {
      return (new Date).getTime();
    }
  });
  /**
   * @param {!Array} obj
   * @return {?}
   */
  jQuery.ready.promise = function(obj) {
    if (!readyList) {
      if (readyList = jQuery.Deferred(), "complete" === document.readyState) {
        setTimeout(jQuery.ready);
      } else {
        if (document.addEventListener) {
          document.addEventListener("DOMContentLoaded", onDOMContentLoaded, false);
          window.addEventListener("load", onDOMContentLoaded, false);
        } else {
          document.attachEvent("onreadystatechange", onDOMContentLoaded);
          window.attachEvent("onload", onDOMContentLoaded);
          /** @type {boolean} */
          var docElement = false;
          try {
            docElement = null == window.frameElement && document.documentElement;
          } catch (i) {
          }
          if (docElement && docElement.doScroll) {
            (function doScrollCheck() {
              if (!jQuery.isReady) {
                try {
                  docElement.doScroll("left");
                } catch (e) {
                  return setTimeout(doScrollCheck, 50);
                }
                gaProd();
                jQuery.ready();
              }
            })();
          }
        }
      }
    }
    return readyList.promise(obj);
  };
  jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(canCreateDiscussions, p_Interval) {
    class2type["[object " + p_Interval + "]"] = p_Interval.toLowerCase();
  });
  rootjQuery = jQuery(document);
  var optionsCache = {};
  /**
   * @param {!Object} options
   * @return {?}
   */
  jQuery.Callbacks = function(options) {
    options = "string" == typeof options ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
    var serializer;
    var memory;
    var process;
    var n;
    var i;
    var validationVM;
    /** @type {!Array} */
    var val = [];
    /** @type {(Array|boolean)} */
    var stack = !options.once && [];
    /**
     * @param {!Object} data
     * @return {undefined}
     */
    var fire = function fire(data) {
      memory = options.memory && data;
      /** @type {boolean} */
      process = true;
      i = validationVM || 0;
      /** @type {number} */
      validationVM = 0;
      n = val.length;
      /** @type {boolean} */
      serializer = true;
      for (; val && n > i; i++) {
        if (val[i].apply(data[0], data[1]) === false && options.stopOnFalse) {
          /** @type {boolean} */
          memory = false;
          break;
        }
      }
      /** @type {boolean} */
      serializer = false;
      if (val) {
        if (stack) {
          if (stack.length) {
            fire(stack.shift());
          }
        } else {
          if (memory) {
            /** @type {!Array} */
            val = [];
          } else {
            self.disable();
          }
        }
      }
    };
    var self = {
      add : function add() {
        if (val) {
          var v = val.length;
          (function add(args) {
            jQuery.each(args, function(canCreateDiscussions, value) {
              var type = jQuery.type(value);
              if ("function" === type) {
                if (!(options.unique && self.has(value))) {
                  val.push(value);
                }
              } else {
                if (value && value.length && "string" !== type) {
                  add(value);
                }
              }
            });
          })(arguments);
          if (serializer) {
            n = val.length;
          } else {
            if (memory) {
              validationVM = v;
              fire(memory);
            }
          }
        }
        return this;
      },
      remove : function encodeSearch() {
        return val && jQuery.each(arguments, function(canCreateDiscussions, t) {
          var index;
          for (; (index = jQuery.inArray(t, val, index)) > -1;) {
            val.splice(index, 1);
            if (serializer) {
              if (n >= index) {
                n--;
              }
              if (i >= index) {
                i--;
              }
            }
          }
        }), this;
      },
      has : function remove(e) {
        return e ? jQuery.inArray(e, val) > -1 : !(!val || !val.length);
      },
      empty : function fire() {
        return val = [], this;
      },
      disable : function fire() {
        return val = stack = memory = undefined, this;
      },
      disabled : function disabled() {
        return !val;
      },
      lock : function fire() {
        return stack = undefined, memory || self.disable(), this;
      },
      locked : function fire() {
        return !stack;
      },
      fireWith : function add(obj, args) {
        return args = args || [], args = [obj, args.slice ? args.slice() : args], !val || process && !stack || (serializer ? stack.push(args) : fire(args)), this;
      },
      fire : function fire() {
        return self.fireWith(this, arguments), this;
      },
      fired : function fire() {
        return !!process;
      }
    };
    return self;
  };
  jQuery.extend({
    Deferred : function Deferred(func) {
      /** @type {!Array} */
      var args = [["resolve", "done", jQuery.Callbacks("once memory"), "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"], ["notify", "progress", jQuery.Callbacks("memory")]];
      /** @type {string} */
      var state = "pending";
      var promise = {
        state : function attach() {
          return state;
        },
        always : function always() {
          return deferred.done(arguments).fail(arguments), this;
        },
        then : function get() {
          /** @type {!Arguments} */
          var fns = arguments;
          return jQuery.Deferred(function(newDefer) {
            jQuery.each(args, function(i, tuple) {
              var action = tuple[0];
              var fn = jQuery.isFunction(fns[i]) && fns[i];
              deferred[tuple[1]](function() {
                var returned = fn && fn.apply(this, arguments);
                if (returned && jQuery.isFunction(returned.promise)) {
                  returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify);
                } else {
                  newDefer[action + "With"](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                }
              });
            });
            /** @type {null} */
            fns = null;
          }).promise();
        },
        promise : function state(context) {
          return null != context ? jQuery.extend(context, promise) : promise;
        }
      };
      var deferred = {};
      return promise.pipe = promise.then, jQuery.each(args, function(swap, tuple) {
        var list = tuple[2];
        var stateString = tuple[3];
        promise[tuple[1]] = list.add;
        if (stateString) {
          list.add(function() {
            state = stateString;
          }, args[1 ^ swap][2].disable, args[2][2].lock);
        }
        /**
         * @return {?}
         */
        deferred[tuple[0]] = function() {
          return deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments), this;
        };
        deferred[tuple[0] + "With"] = list.fireWith;
      }), promise.promise(deferred), func && func.call(deferred, deferred), deferred;
    },
    when : function start(object) {
      /** @type {number} */
      var i = 0;
      /** @type {!Array<?>} */
      var resolveValues = slice.call(arguments);
      /** @type {number} */
      var length = resolveValues.length;
      /** @type {number} */
      var index = 1 !== length || object && jQuery.isFunction(object.promise) ? length : 0;
      var deferred = 1 === index ? object : jQuery.Deferred();
      /**
       * @param {number} i
       * @param {number} ctx
       * @param {number} val
       * @return {?}
       */
      var updateFn = function updateFn(i, ctx, val) {
        return function(value) {
          ctx[i] = this;
          val[i] = arguments.length > 1 ? slice.call(arguments) : value;
          if (val === progressValues) {
            deferred.notifyWith(ctx, val);
          } else {
            if (!--index) {
              deferred.resolveWith(ctx, val);
            }
          }
        };
      };
      var progressValues;
      var args;
      var data;
      if (length > 1) {
        /** @type {!Array} */
        progressValues = Array(length);
        /** @type {!Array} */
        args = Array(length);
        /** @type {!Array} */
        data = Array(length);
        for (; length > i; i++) {
          if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
            resolveValues[i].promise().done(updateFn(i, data, resolveValues)).fail(deferred.reject).progress(updateFn(i, args, progressValues));
          } else {
            --index;
          }
        }
      }
      return index || deferred.resolveWith(data, resolveValues), deferred.promise();
    }
  });
  jQuery.support = function() {
    var support;
    var all;
    var a;
    var input;
    var select;
    var fragment;
    var opt;
    var eventName;
    var isSupported;
    var i;
    var div = document.createElement("div");
    if (div.setAttribute("className", "t"), div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", all = div.getElementsByTagName("*"), a = div.getElementsByTagName("a")[0], !all || !a || !all.length) {
      return {};
    }
    select = document.createElement("select");
    opt = select.appendChild(document.createElement("option"));
    input = div.getElementsByTagName("input")[0];
    /** @type {string} */
    a.style.cssText = "top:1px;float:left;opacity:.5";
    support = {
      getSetAttribute : "t" !== div.className,
      leadingWhitespace : 3 === div.firstChild.nodeType,
      tbody : !div.getElementsByTagName("tbody").length,
      htmlSerialize : !!div.getElementsByTagName("link").length,
      style : /top/.test(a.getAttribute("style")),
      hrefNormalized : "/a" === a.getAttribute("href"),
      opacity : /^0.5/.test(a.style.opacity),
      cssFloat : !!a.style.cssFloat,
      checkOn : !!input.value,
      optSelected : opt.selected,
      enctype : !!document.createElement("form").enctype,
      html5Clone : "<:nav></:nav>" !== document.createElement("nav").cloneNode(true).outerHTML,
      boxModel : "CSS1Compat" === document.compatMode,
      deleteExpando : true,
      noCloneEvent : true,
      inlineBlockNeedsLayout : false,
      shrinkWrapBlocks : false,
      reliableMarginRight : true,
      boxSizingReliable : true,
      pixelPosition : false
    };
    /** @type {boolean} */
    input.checked = true;
    support.noCloneChecked = input.cloneNode(true).checked;
    /** @type {boolean} */
    select.disabled = true;
    /** @type {boolean} */
    support.optDisabled = !opt.disabled;
    try {
      delete div.test;
    } catch (h) {
      /** @type {boolean} */
      support.deleteExpando = false;
    }
    input = document.createElement("input");
    input.setAttribute("value", "");
    /** @type {boolean} */
    support.input = "" === input.getAttribute("value");
    /** @type {string} */
    input.value = "t";
    input.setAttribute("type", "radio");
    /** @type {boolean} */
    support.radioValue = "t" === input.value;
    input.setAttribute("checked", "t");
    input.setAttribute("name", "t");
    fragment = document.createDocumentFragment();
    fragment.appendChild(input);
    /** @type {boolean} */
    support.appendChecked = input.checked;
    support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;
    if (div.attachEvent) {
      div.attachEvent("onclick", function() {
        /** @type {boolean} */
        support.noCloneEvent = false;
      });
      div.cloneNode(true).click();
    }
    for (i in{
      submit : true,
      change : true,
      focusin : true
    }) {
      div.setAttribute(eventName = "on" + i, "t");
      /** @type {boolean} */
      support[i + "Bubbles"] = eventName in window || div.attributes[eventName].expando === false;
    }
    return div.style.backgroundClip = "content-box", div.cloneNode(true).style.backgroundClip = "", support.clearCloneStyle = "content-box" === div.style.backgroundClip, jQuery(function() {
      var container;
      var root;
      var node;
      /** @type {string} */
      var divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;";
      var ui = document.getElementsByTagName("body")[0];
      if (ui) {
        container = document.createElement("div");
        /** @type {string} */
        container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";
        ui.appendChild(container).appendChild(div);
        /** @type {string} */
        div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
        node = div.getElementsByTagName("td");
        /** @type {string} */
        node[0].style.cssText = "padding:0;margin:0;border:0;display:none";
        /** @type {boolean} */
        isSupported = 0 === node[0].offsetHeight;
        /** @type {string} */
        node[0].style.display = "";
        /** @type {string} */
        node[1].style.display = "none";
        /** @type {boolean} */
        support.reliableHiddenOffsets = isSupported && 0 === node[0].offsetHeight;
        /** @type {string} */
        div.innerHTML = "";
        /** @type {string} */
        div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";
        /** @type {boolean} */
        support.boxSizing = 4 === div.offsetWidth;
        /** @type {boolean} */
        support.doesNotIncludeMarginInBodyOffset = 1 !== ui.offsetTop;
        if (window.getComputedStyle) {
          /** @type {boolean} */
          support.pixelPosition = "1%" !== (window.getComputedStyle(div, null) || {}).top;
          /** @type {boolean} */
          support.boxSizingReliable = "4px" === (window.getComputedStyle(div, null) || {
            width : "4px"
          }).width;
          root = div.appendChild(document.createElement("div"));
          /** @type {string} */
          root.style.cssText = div.style.cssText = divReset;
          /** @type {string} */
          root.style.marginRight = root.style.width = "0";
          /** @type {string} */
          div.style.width = "1px";
          /** @type {boolean} */
          support.reliableMarginRight = !parseFloat((window.getComputedStyle(root, null) || {}).marginRight);
        }
        if (_typeof(div.style.zoom) !== strundefined) {
          /** @type {string} */
          div.innerHTML = "";
          /** @type {string} */
          div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
          /** @type {boolean} */
          support.inlineBlockNeedsLayout = 3 === div.offsetWidth;
          /** @type {string} */
          div.style.display = "block";
          /** @type {string} */
          div.innerHTML = "<div></div>";
          /** @type {string} */
          div.firstChild.style.width = "5px";
          /** @type {boolean} */
          support.shrinkWrapBlocks = 3 !== div.offsetWidth;
          if (support.inlineBlockNeedsLayout) {
            /** @type {number} */
            ui.style.zoom = 1;
          }
        }
        ui.removeChild(container);
        /** @type {null} */
        container = div = node = root = null;
      }
    }), all = select = fragment = opt = a = input = null, support;
  }();
  /** @type {!RegExp} */
  var JSON_START = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/;
  /** @type {!RegExp} */
  var regAttr = /([A-Z])/g;
  jQuery.extend({
    cache : {},
    expando : "jQuery" + (core_version + Math.random()).replace(/\D/g, ""),
    noData : {
      embed : true,
      object : "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
      applet : true
    },
    hasData : function internalRemoveData(elem) {
      return elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando], !!elem && !isEmptyDataObject(elem);
    },
    data : function _data(value, name, data) {
      return internalData(value, name, data);
    },
    removeData : function _removeData(elem, name) {
      return internalRemoveData(elem, name);
    },
    _data : function _data(elem, name, data) {
      return internalData(elem, name, data, true);
    },
    _removeData : function _removeData(elem, name) {
      return internalRemoveData(elem, name, true);
    },
    acceptData : function fetch(elem) {
      if (elem.nodeType && 1 !== elem.nodeType && 9 !== elem.nodeType) {
        return false;
      }
      var noData = elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()];
      return !noData || noData !== true && elem.getAttribute("classid") === noData;
    }
  });
  jQuery.fn.extend({
    data : function data(key, value) {
      var attrs;
      var name;
      var elem = this[0];
      /** @type {number} */
      var origLength = 0;
      /** @type {null} */
      var data = null;
      if (key === undefined) {
        if (this.length && (data = jQuery.data(elem), 1 === elem.nodeType && !jQuery._data(elem, "parsedAttrs"))) {
          attrs = elem.attributes;
          for (; attrs.length > origLength; origLength++) {
            name = attrs[origLength].name;
            if (!name.indexOf("data-")) {
              name = jQuery.camelCase(name.slice(5));
              dataAttr(elem, name, data[name]);
            }
          }
          jQuery._data(elem, "parsedAttrs", true);
        }
        return data;
      }
      return "object" == (typeof key === "undefined" ? "undefined" : _typeof(key)) ? this.each(function() {
        jQuery.data(this, key);
      }) : jQuery.access(this, function(value) {
        return value === undefined ? elem ? dataAttr(elem, key, jQuery.data(elem, key)) : null : (this.each(function() {
          jQuery.data(this, key, value);
        }), undefined);
      }, null, value, arguments.length > 1, null, true);
    },
    removeData : function initialize(key) {
      return this.each(function() {
        jQuery.removeData(this, key);
      });
    }
  });
  jQuery.extend({
    queue : function refresh(obj, type, data) {
      var q;
      return obj ? (type = (type || "fx") + "queue", q = jQuery._data(obj, type), data && (!q || jQuery.isArray(data) ? q = jQuery._data(obj, type, jQuery.makeArray(data)) : q.push(data)), q || []) : undefined;
    },
    dequeue : function render(elem, type) {
      type = type || "fx";
      var queue = jQuery.queue(elem, type);
      var startLength = queue.length;
      var fn = queue.shift();
      var hooks = jQuery._queueHooks(elem, type);
      /**
       * @return {undefined}
       */
      var event = function all() {
        jQuery.dequeue(elem, type);
      };
      if ("inprogress" === fn) {
        fn = queue.shift();
        startLength--;
      }
      hooks.cur = fn;
      if (fn) {
        if ("fx" === type) {
          queue.unshift("inprogress");
        }
        delete hooks.stop;
        fn.call(elem, event, hooks);
      }
      if (!startLength && hooks) {
        hooks.empty.fire();
      }
    },
    _queueHooks : function success(elem, type) {
      /** @type {string} */
      var key = type + "queueHooks";
      return jQuery._data(elem, key) || jQuery._data(elem, key, {
        empty : jQuery.Callbacks("once memory").add(function() {
          jQuery._removeData(elem, type + "queue");
          jQuery._removeData(elem, key);
        })
      });
    }
  });
  jQuery.fn.extend({
    queue : function jump(type, data) {
      /** @type {number} */
      var num = 2;
      return "string" != typeof type && (data = type, type = "fx", num--), num > arguments.length ? jQuery.queue(this[0], type) : data === undefined ? this : this.each(function() {
        var queue = jQuery.queue(this, type, data);
        jQuery._queueHooks(this, type);
        if ("fx" === type && "inprogress" !== queue[0]) {
          jQuery.dequeue(this, type);
        }
      });
    },
    dequeue : function _prependElement(type) {
      return this.each(function() {
        jQuery.dequeue(this, type);
      });
    },
    delay : function init(time, type) {
      return time = jQuery.fx ? jQuery.fx.speeds[time] || time : time, type = type || "fx", this.queue(type, function(fn, incoming_item) {
        /** @type {number} */
        var timer = setTimeout(fn, time);
        /**
         * @return {undefined}
         */
        incoming_item.stop = function() {
          clearTimeout(timer);
        };
      });
    },
    clearQueue : function fixQueue(type) {
      return this.queue(type || "fx", []);
    },
    promise : function next(type, result) {
      var tmp;
      /** @type {number} */
      var j = 1;
      var deferred = jQuery.Deferred();
      var self = this;
      var i = this.length;
      /**
       * @return {undefined}
       */
      var log = function callback() {
        if (!--j) {
          deferred.resolveWith(self, [self]);
        }
      };
      if ("string" != typeof type) {
        /** @type {!Object} */
        result = type;
        /** @type {!Object} */
        type = undefined;
      }
      type = type || "fx";
      for (; i--;) {
        tmp = jQuery._data(self[i], type + "queueHooks");
        if (tmp && tmp.empty) {
          j++;
          tmp.empty.add(log);
        }
      }
      return log(), deferred.promise(result);
    }
  });
  var nodeHook;
  var boolHook;
  /** @type {!RegExp} */
  var rclass = /[\t\r\n]/g;
  /** @type {!RegExp} */
  var n = /\r/g;
  /** @type {!RegExp} */
  var k_r_success_contrls = /^(?:input|select|textarea|button|object)$/i;
  /** @type {!RegExp} */
  var submittable = /^(?:a|area)$/i;
  /** @type {!RegExp} */
  var reBlockName = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i;
  /** @type {!RegExp} */
  var testRxp = /^(?:checked|selected)$/i;
  var getSetAttribute = jQuery.support.getSetAttribute;
  var getSetInput = jQuery.support.input;
  jQuery.fn.extend({
    attr : function prop(name, type) {
      return jQuery.access(this, jQuery.attr, name, type, arguments.length > 1);
    },
    removeAttr : function removeAttr(name) {
      return this.each(function() {
        jQuery.removeAttr(this, name);
      });
    },
    prop : function css(name, value) {
      return jQuery.access(this, jQuery.prop, name, value, arguments.length > 1);
    },
    removeProp : function sort_pipeline(name) {
      return name = jQuery.propFix[name] || name, this.each(function() {
        try {
          /** @type {!Object} */
          this[name] = undefined;
          delete this[name];
        } catch (n) {
        }
      });
    },
    addClass : function addClass(name) {
      var zeroSizeMaxes;
      var n;
      var t;
      var zeroSizeMax;
      var callbackCount;
      /** @type {number} */
      var _i = 0;
      var _len = this.length;
      /** @type {(boolean|string)} */
      var u = "string" == typeof name && name;
      if (jQuery.isFunction(name)) {
        return this.each(function(i) {
          jQuery(this).addClass(name.call(this, i, this.className));
        });
      }
      if (u) {
        zeroSizeMaxes = (name || "").match(rnotwhite) || [];
        for (; _len > _i; _i++) {
          if (n = this[_i], t = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(rclass, " ") : " ")) {
            /** @type {number} */
            callbackCount = 0;
            for (; zeroSizeMax = zeroSizeMaxes[callbackCount++];) {
              if (0 > t.indexOf(" " + zeroSizeMax + " ")) {
                /** @type {string} */
                t = t + (zeroSizeMax + " ");
              }
            }
            n.className = jQuery.trim(t);
          }
        }
      }
      return this;
    },
    removeClass : function removeClass(value) {
      var zeroSizeMaxes;
      var elem;
      var cur;
      var zeroSizeMax;
      var callbackCount;
      /** @type {number} */
      var i = 0;
      var l = this.length;
      /** @type {(boolean|string)} */
      var u = 0 === arguments.length || "string" == typeof value && value;
      if (jQuery.isFunction(value)) {
        return this.each(function(i) {
          jQuery(this).removeClass(value.call(this, i, this.className));
        });
      }
      if (u) {
        zeroSizeMaxes = (value || "").match(rnotwhite) || [];
        for (; l > i; i++) {
          if (elem = this[i], cur = 1 === elem.nodeType && (elem.className ? (" " + elem.className + " ").replace(rclass, " ") : "")) {
            /** @type {number} */
            callbackCount = 0;
            for (; zeroSizeMax = zeroSizeMaxes[callbackCount++];) {
              for (; cur.indexOf(" " + zeroSizeMax + " ") >= 0;) {
                /** @type {string} */
                cur = cur.replace(" " + zeroSizeMax + " ", " ");
              }
            }
            elem.className = value ? jQuery.trim(cur) : "";
          }
        }
      }
      return this;
    },
    toggleClass : function init(value, stateVal) {
      var type = typeof value === "undefined" ? "undefined" : _typeof(value);
      /** @type {boolean} */
      var isBool = "boolean" == typeof stateVal;
      return jQuery.isFunction(value) ? this.each(function(i) {
        jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
      }) : this.each(function() {
        if ("string" === type) {
          var className;
          /** @type {number} */
          var callbackCount = 0;
          var self = jQuery(this);
          /** @type {boolean} */
          var state = stateVal;
          var callbackVals = value.match(rnotwhite) || [];
          for (; className = callbackVals[callbackCount++];) {
            state = isBool ? state : !self.hasClass(className);
            self[state ? "addClass" : "removeClass"](className);
          }
        } else {
          if (type === strundefined || "boolean" === type) {
            if (this.className) {
              jQuery._data(this, "__className__", this.className);
            }
            this.className = this.className || value === false ? "" : jQuery._data(this, "__className__") || "";
          }
        }
      });
    },
    hasClass : function hasClass(name) {
      /** @type {string} */
      var t = " " + name + " ";
      /** @type {number} */
      var i = 0;
      var l = this.length;
      for (; l > i; i++) {
        if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(rclass, " ").indexOf(t) >= 0) {
          return true;
        }
      }
      return false;
    },
    val : function setup(v) {
      var value;
      var hooks;
      var obj;
      var elem = this[0];
      {
        if (arguments.length) {
          return obj = jQuery.isFunction(v), this.each(function(key) {
            var value;
            var minbox = jQuery(this);
            if (1 === this.nodeType) {
              value = obj ? v.call(this, key, minbox.val()) : v;
              if (null == value) {
                /** @type {string} */
                value = "";
              } else {
                if ("number" == typeof value) {
                  /** @type {string} */
                  value = value + "";
                } else {
                  if (jQuery.isArray(value)) {
                    value = jQuery.map(value, function(value) {
                      return null == value ? "" : value + "";
                    });
                  }
                }
              }
              hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
              if (!(hooks && "set" in hooks && hooks.set(this, value, "value") !== undefined)) {
                this.value = value;
              }
            }
          });
        }
        if (elem) {
          return hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()], hooks && "get" in hooks && (value = hooks.get(elem, "value")) !== undefined ? value : (value = elem.value, "string" == typeof value ? value.replace(n, "") : null == value ? "" : value);
        }
      }
    }
  });
  jQuery.extend({
    valHooks : {
      option : {
        get : function diver(elem) {
          var val = elem.attributes.value;
          return !val || val.specified ? elem.value : elem.text;
        }
      },
      select : {
        get : function select(obj) {
          var animal;
          var option;
          var options = obj.options;
          var position = obj.selectedIndex;
          /** @type {boolean} */
          var after = "select-one" === obj.type || 0 > position;
          /** @type {(Array|null)} */
          var html = after ? null : [];
          var item = after ? position + 1 : options.length;
          var name = 0 > position ? item : after ? position : 0;
          for (; item > name; name++) {
            if (option = options[name], !(!option.selected && name !== position || (jQuery.support.optDisabled ? option.disabled : null !== option.getAttribute("disabled")) || option.parentNode.disabled && jQuery.nodeName(option.parentNode, "optgroup"))) {
              if (animal = jQuery(option).val(), after) {
                return animal;
              }
              html.push(animal);
            }
          }
          return html;
        },
        set : function set(elem, value) {
          var n = jQuery.makeArray(value);
          return jQuery(elem).find("option").each(function() {
            /** @type {boolean} */
            this.selected = jQuery.inArray(jQuery(this).val(), n) >= 0;
          }), n.length || (elem.selectedIndex = -1), n;
        }
      }
    },
    attr : function cb(node, name, value) {
      var hooks;
      var notxml;
      var message;
      var root = node.nodeType;
      if (node && 3 !== root && 8 !== root && 2 !== root) {
        return _typeof(node.getAttribute) === strundefined ? jQuery.prop(node, name, value) : (notxml = 1 !== root || !jQuery.isXMLDoc(node), notxml && (name = name.toLowerCase(), hooks = jQuery.attrHooks[name] || (reBlockName.test(name) ? boolHook : nodeHook)), value === undefined ? hooks && notxml && "get" in hooks && null !== (message = hooks.get(node, name)) ? 
        message : (_typeof(node.getAttribute) !== strundefined && (message = node.getAttribute(name)), null == message ? undefined : message) : null !== value ? hooks && notxml && "set" in hooks && (message = hooks.set(node, value, name)) !== undefined ? message : (node.setAttribute(name, value + ""), value) : (jQuery.removeAttr(node, name), undefined));
      }
    },
    removeAttr : function set(elem, value) {
      var name;
      var propName;
      /** @type {number} */
      var i = 0;
      var attrNames = value && value.match(rnotwhite);
      if (attrNames && 1 === elem.nodeType) {
        for (; name = attrNames[i++];) {
          propName = jQuery.propFix[name] || name;
          if (reBlockName.test(name)) {
            if (!getSetAttribute && testRxp.test(name)) {
              /** @type {boolean} */
              elem[jQuery.camelCase("default-" + name)] = elem[propName] = false;
            } else {
              /** @type {boolean} */
              elem[propName] = false;
            }
          } else {
            jQuery.attr(elem, name, "");
          }
          elem.removeAttribute(getSetAttribute ? name : propName);
        }
      }
    },
    attrHooks : {
      type : {
        set : function init(elem, type) {
          if (!jQuery.support.radioValue && "radio" === type && jQuery.nodeName(elem, "input")) {
            var width = elem.value;
            return elem.setAttribute("type", type), width && (elem.value = width), type;
          }
        }
      }
    },
    propFix : {
      tabindex : "tabIndex",
      readonly : "readOnly",
      "for" : "htmlFor",
      "class" : "className",
      maxlength : "maxLength",
      cellspacing : "cellSpacing",
      cellpadding : "cellPadding",
      rowspan : "rowSpan",
      colspan : "colSpan",
      usemap : "useMap",
      frameborder : "frameBorder",
      contenteditable : "contentEditable"
    },
    prop : function cb(elem, name, value) {
      var ret;
      var hooks;
      var a;
      var type = elem.nodeType;
      if (elem && 3 !== type && 8 !== type && 2 !== type) {
        return a = 1 !== type || !jQuery.isXMLDoc(elem), a && (name = jQuery.propFix[name] || name, hooks = jQuery.propHooks[name]), value !== undefined ? hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : elem[name] = value : hooks && "get" in hooks && null !== (ret = hooks.get(elem, 
        name)) ? ret : elem[name];
      }
    },
    propHooks : {
      tabIndex : {
        get : function getHtml(element) {
          var attributeNode = element.getAttributeNode("tabindex");
          return attributeNode && attributeNode.specified ? parseInt(attributeNode.value, 10) : k_r_success_contrls.test(element.nodeName) || submittable.test(element.nodeName) && element.href ? 0 : undefined;
        }
      }
    }
  });
  boolHook = {
    get : function set(elem, name) {
      var val = jQuery.prop(elem, name);
      var i = "boolean" == typeof val && elem.getAttribute(name);
      var _object1Property = "boolean" == typeof val ? getSetInput && getSetAttribute ? null != i : testRxp.test(name) ? elem[jQuery.camelCase("default-" + name)] : !!i : elem.getAttributeNode(name);
      return _object1Property && _object1Property.value !== false ? name.toLowerCase() : undefined;
    },
    set : function set(elem, value, name) {
      return value === false ? jQuery.removeAttr(elem, name) : getSetInput && getSetAttribute || !testRxp.test(name) ? elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name) : elem[jQuery.camelCase("default-" + name)] = elem[name] = true, name;
    }
  };
  if (!(getSetInput && getSetAttribute)) {
    jQuery.attrHooks.value = {
      get : function init(elem, name) {
        var node = elem.getAttributeNode(name);
        return jQuery.nodeName(elem, "input") ? elem.defaultValue : node && node.specified ? node.value : undefined;
      },
      set : function render(elem, value, name) {
        return jQuery.nodeName(elem, "input") ? (elem.defaultValue = value, undefined) : nodeHook && nodeHook.set(elem, value, name);
      }
    };
  }
  if (!getSetAttribute) {
    nodeHook = jQuery.valHooks.button = {
      get : function show(elem, name) {
        var node = elem.getAttributeNode(name);
        return node && ("id" === name || "name" === name || "coords" === name ? "" !== node.value : node.specified) ? node.value : undefined;
      },
      set : function init(elem, value, name) {
        var ret = elem.getAttributeNode(name);
        return ret || elem.setAttributeNode(ret = elem.ownerDocument.createAttribute(name)), ret.value = value = value + "", "value" === name || value === elem.getAttribute(name) ? value : undefined;
      }
    };
    jQuery.attrHooks.contenteditable = {
      get : nodeHook.get,
      set : function set(elem, value, name) {
        nodeHook.set(elem, "" === value ? false : value, name);
      }
    };
    jQuery.each(["width", "height"], function(canCreateDiscussions, name) {
      jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
        set : function set(elem, value) {
          return "" === value ? (elem.setAttribute(name, "auto"), value) : undefined;
        }
      });
    });
  }
  if (!jQuery.support.hrefNormalized) {
    jQuery.each(["href", "src", "width", "height"], function(canCreateDiscussions, name) {
      jQuery.attrHooks[name] = jQuery.extend(jQuery.attrHooks[name], {
        get : function setUpNextBg(e) {
          var key = e.getAttribute(name, 2);
          return null == key ? undefined : key;
        }
      });
    });
    jQuery.each(["href", "src"], function(canCreateDiscussions, name) {
      jQuery.propHooks[name] = {
        get : function href(elem) {
          return elem.getAttribute(name, 4);
        }
      };
    });
  }
  if (!jQuery.support.style) {
    jQuery.attrHooks.style = {
      get : function addDomElement(text) {
        return text.style.cssText || undefined;
      },
      set : function set(text, value) {
        return text.style.cssText = value + "";
      }
    };
  }
  if (!jQuery.support.optSelected) {
    jQuery.propHooks.selected = jQuery.extend(jQuery.propHooks.selected, {
      get : function get(text) {
        var f = text.parentNode;
        return f && (f.selectedIndex, f.parentNode && f.parentNode.selectedIndex), null;
      }
    });
  }
  if (!jQuery.support.enctype) {
    /** @type {string} */
    jQuery.propFix.enctype = "encoding";
  }
  if (!jQuery.support.checkOn) {
    jQuery.each(["radio", "checkbox"], function() {
      jQuery.valHooks[this] = {
        get : function _verifyDateTimes(elem) {
          return null === elem.getAttribute("value") ? "on" : elem.value;
        }
      };
    });
  }
  jQuery.each(["radio", "checkbox"], function() {
    jQuery.valHooks[this] = jQuery.extend(jQuery.valHooks[this], {
      set : function set(elem, value) {
        return jQuery.isArray(value) ? elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0 : undefined;
      }
    });
  });
  /** @type {!RegExp} */
  var rformElems = /^(?:input|select|textarea)$/i;
  /** @type {!RegExp} */
  var SIG_PATTERN = /^key/;
  /** @type {!RegExp} */
  var toggleMaximizeElement = /^(?:mouse|contextmenu)|click/;
  /** @type {!RegExp} */
  var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
  /** @type {!RegExp} */
  var target = /^([^.]*)(?:\.(.+)|)$/;
  jQuery.event = {
    global : {},
    add : function add(elem, path, handler, data, selector) {
      var tmp;
      var events;
      var i;
      var handleObjIn;
      var special;
      var eventHandle;
      var handleObj;
      var handlers;
      var type;
      var m;
      var origType;
      var elemData = jQuery._data(elem);
      if (elemData) {
        if (handler.handler) {
          /** @type {!Object} */
          handleObjIn = handler;
          handler = handleObjIn.handler;
          selector = handleObjIn.selector;
        }
        if (!handler.guid) {
          /** @type {number} */
          handler.guid = jQuery.guid++;
        }
        if (!(events = elemData.events)) {
          events = elemData.events = {};
        }
        if (!(eventHandle = elemData.handle)) {
          /** @type {function(string): ?} */
          eventHandle = elemData.handle = function(event) {
            return (typeof jQuery === "undefined" ? "undefined" : _typeof(jQuery)) === strundefined || event && jQuery.event.triggered === event.type ? undefined : jQuery.event.dispatch.apply(eventHandle.elem, arguments);
          };
          /** @type {!Object} */
          eventHandle.elem = elem;
        }
        path = (path || "").match(rnotwhite) || [""];
        i = path.length;
        for (; i--;) {
          /** @type {!Array} */
          tmp = target.exec(path[i]) || [];
          type = origType = tmp[1];
          m = (tmp[2] || "").split(".").sort();
          special = jQuery.event.special[type] || {};
          type = (selector ? special.delegateType : special.bindType) || type;
          special = jQuery.event.special[type] || {};
          handleObj = jQuery.extend({
            type : type,
            origType : origType,
            data : data,
            handler : handler,
            guid : handler.guid,
            selector : selector,
            needsContext : selector && jQuery.expr.match.needsContext.test(selector),
            namespace : m.join(".")
          }, handleObjIn);
          if (!(handlers = events[type])) {
            /** @type {!Array} */
            handlers = events[type] = [];
            /** @type {number} */
            handlers.delegateCount = 0;
            if (!(special.setup && special.setup.call(elem, data, m, eventHandle) !== false)) {
              if (elem.addEventListener) {
                elem.addEventListener(type, eventHandle, false);
              } else {
                if (elem.attachEvent) {
                  elem.attachEvent("on" + type, eventHandle);
                }
              }
            }
          }
          if (special.add) {
            special.add.call(elem, handleObj);
            if (!handleObj.handler.guid) {
              handleObj.handler.guid = handler.guid;
            }
          }
          if (selector) {
            handlers.splice(handlers.delegateCount++, 0, handleObj);
          } else {
            handlers.push(handleObj);
          }
          /** @type {boolean} */
          jQuery.event.global[type] = true;
        }
        /** @type {null} */
        elem = null;
      }
    },
    remove : function init(elem, data, fn, selector, is_enabled) {
      var j;
      var handleObj;
      var tmp;
      var origCount;
      var i;
      var events;
      var special;
      var handlers;
      var type;
      var h;
      var origType;
      var elemData = jQuery.hasData(elem) && jQuery._data(elem);
      if (elemData && (events = elemData.events)) {
        data = (data || "").match(rnotwhite) || [""];
        i = data.length;
        for (; i--;) {
          if (tmp = target.exec(data[i]) || [], type = origType = tmp[1], h = (tmp[2] || "").split(".").sort(), type) {
            special = jQuery.event.special[type] || {};
            type = (selector ? special.delegateType : special.bindType) || type;
            handlers = events[type] || [];
            tmp = tmp[2] && RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)");
            origCount = j = handlers.length;
            for (; j--;) {
              handleObj = handlers[j];
              if (!(!is_enabled && origType !== handleObj.origType || fn && fn.guid !== handleObj.guid || tmp && !tmp.test(handleObj.namespace) || selector && selector !== handleObj.selector && ("**" !== selector || !handleObj.selector))) {
                handlers.splice(j, 1);
                if (handleObj.selector) {
                  handlers.delegateCount--;
                }
                if (special.remove) {
                  special.remove.call(elem, handleObj);
                }
              }
            }
            if (origCount && !handlers.length) {
              if (!(special.teardown && special.teardown.call(elem, h, elemData.handle) !== false)) {
                jQuery.removeEvent(elem, type, elemData.handle);
              }
              delete events[type];
            }
          } else {
            for (type in events) {
              jQuery.event.remove(elem, type + data[i], fn, selector, true);
            }
          }
        }
        if (jQuery.isEmptyObject(events)) {
          delete elemData.handle;
          jQuery._removeData(elem, "events");
        }
      }
    },
    trigger : function trigger(event, value, elem, bubbling) {
      var handle;
      var ontype;
      var cur;
      var bubbleType;
      var special;
      var tmp;
      var i;
      /** @type {!Array} */
      var eventPath = [elem || document];
      var type = hasOwn.call(event, "type") ? event.type : event;
      var m = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
      if (cur = tmp = elem = elem || document, 3 !== elem.nodeType && 8 !== elem.nodeType && !rfocusMorph.test(type + jQuery.event.triggered) && (type.indexOf(".") >= 0 && (m = type.split("."), type = m.shift(), m.sort()), ontype = 0 > type.indexOf(":") && "on" + type, event = event[jQuery.expando] ? event : new jQuery.Event(type, "object" == 
      (typeof event === "undefined" ? "undefined" : _typeof(event)) && event), event.isTrigger = true, event.namespace = m.join("."), event.namespace_re = event.namespace ? RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, event.result = undefined, event.target || (event.target = elem), value = null == value ? [event] : jQuery.makeArray(value, [event]), special = 
      jQuery.event.special[type] || {}, bubbling || !special.trigger || special.trigger.apply(elem, value) !== false)) {
        if (!bubbling && !special.noBubble && !jQuery.isWindow(elem)) {
          bubbleType = special.delegateType || type;
          if (!rfocusMorph.test(bubbleType + type)) {
            cur = cur.parentNode;
          }
          for (; cur; cur = cur.parentNode) {
            eventPath.push(cur);
            tmp = cur;
          }
          if (tmp === (elem.ownerDocument || document)) {
            eventPath.push(tmp.defaultView || tmp.parentWindow || window);
          }
        }
        /** @type {number} */
        i = 0;
        for (; (cur = eventPath[i++]) && !event.isPropagationStopped();) {
          event.type = i > 1 ? bubbleType : special.bindType || type;
          handle = (jQuery._data(cur, "events") || {})[event.type] && jQuery._data(cur, "handle");
          if (handle) {
            handle.apply(cur, value);
          }
          handle = ontype && cur[ontype];
          if (handle && jQuery.acceptData(cur) && handle.apply && handle.apply(cur, value) === false) {
            event.preventDefault();
          }
        }
        if (event.type = type, !(bubbling || event.isDefaultPrevented() || special._default && special._default.apply(elem.ownerDocument, value) !== false || "click" === type && jQuery.nodeName(elem, "a") || !jQuery.acceptData(elem) || !ontype || !elem[type] || jQuery.isWindow(elem))) {
          tmp = elem[ontype];
          if (tmp) {
            /** @type {null} */
            elem[ontype] = null;
          }
          jQuery.event.triggered = type;
          try {
            elem[type]();
          } catch (v) {
          }
          /** @type {!Object} */
          jQuery.event.triggered = undefined;
          if (tmp) {
            elem[ontype] = tmp;
          }
        }
        return event.result;
      }
    },
    dispatch : function trigger(event) {
      event = jQuery.event.fix(event);
      var i;
      var ret;
      var handleObj;
      var matched;
      var j;
      /** @type {!Array} */
      var handlerQueue = [];
      /** @type {!Array<?>} */
      var args = slice.call(arguments);
      var handlers = (jQuery._data(this, "events") || {})[event.type] || [];
      var special = jQuery.event.special[event.type] || {};
      if (args[0] = event, event.delegateTarget = this, !special.preDispatch || special.preDispatch.call(this, event) !== false) {
        handlerQueue = jQuery.event.handlers.call(this, event, handlers);
        /** @type {number} */
        i = 0;
        for (; (matched = handlerQueue[i++]) && !event.isPropagationStopped();) {
          event.currentTarget = matched.elem;
          /** @type {number} */
          j = 0;
          for (; (handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped();) {
            if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {
              event.handleObj = handleObj;
              event.data = handleObj.data;
              ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
              if (ret !== undefined && (event.result = ret) === false) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
          }
        }
        return special.postDispatch && special.postDispatch.call(this, event), event.result;
      }
    },
    handlers : function _dispatchEvent(event, handlers) {
      var selector;
      var handleObj;
      var matches;
      var j;
      /** @type {!Array} */
      var handlerQueue = [];
      var delegateCount = handlers.delegateCount;
      var cur = event.target;
      if (delegateCount && cur.nodeType && (!event.button || "click" !== event.type)) {
        for (; cur != this; cur = cur.parentNode || this) {
          if (1 === cur.nodeType && (cur.disabled !== true || "click" !== event.type)) {
            /** @type {!Array} */
            matches = [];
            /** @type {number} */
            j = 0;
            for (; delegateCount > j; j++) {
              handleObj = handlers[j];
              /** @type {string} */
              selector = handleObj.selector + " ";
              if (matches[selector] === undefined) {
                matches[selector] = handleObj.needsContext ? jQuery(selector, this).index(cur) >= 0 : jQuery.find(selector, this, null, [cur]).length;
              }
              if (matches[selector]) {
                matches.push(handleObj);
              }
            }
            if (matches.length) {
              handlerQueue.push({
                elem : cur,
                handlers : matches
              });
            }
          }
        }
      }
      return handlers.length > delegateCount && handlerQueue.push({
        elem : this,
        handlers : handlers.slice(delegateCount)
      }), handlerQueue;
    },
    fix : function fix(event) {
      if (event[jQuery.expando]) {
        return event;
      }
      var i;
      var prop;
      var copy;
      var type = event.type;
      /** @type {!Object} */
      var e = event;
      var fixHook = this.fixHooks[type];
      if (!fixHook) {
        this.fixHooks[type] = fixHook = toggleMaximizeElement.test(type) ? this.mouseHooks : SIG_PATTERN.test(type) ? this.keyHooks : {};
      }
      copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
      event = new jQuery.Event(e);
      i = copy.length;
      for (; i--;) {
        prop = copy[i];
        event[prop] = e[prop];
      }
      return event.target || (event.target = e.srcElement || document), 3 === event.target.nodeType && (event.target = event.target.parentNode), event.metaKey = !!event.metaKey, fixHook.filter ? fixHook.filter(event, e) : event;
    },
    props : "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks : {},
    keyHooks : {
      props : "char charCode key keyCode".split(" "),
      filter : function onKeyPressed(e, key) {
        return null == e.which && (e.which = null != key.charCode ? key.charCode : key.keyCode), e;
      }
    },
    mouseHooks : {
      props : "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter : function fixEvent(e, event) {
        var body;
        var eventDoc;
        var doc;
        var button = event.button;
        var fromElement = event.fromElement;
        return null == e.pageX && null != event.clientX && (eventDoc = e.target.ownerDocument || document, doc = eventDoc.documentElement, body = eventDoc.body, e.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0), e.pageY = event.clientY + (doc && doc.scrollTop || 
        body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0)), !e.relatedTarget && fromElement && (e.relatedTarget = fromElement === e.target ? event.toElement : fromElement), e.which || button === undefined || (e.which = 1 & button ? 1 : 2 & button ? 3 : 4 & button ? 2 : 0), e;
      }
    },
    special : {
      load : {
        noBubble : true
      },
      click : {
        trigger : function byBrowser() {
          return jQuery.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), false) : undefined;
        }
      },
      focus : {
        trigger : function _getSelectionStart_or_End() {
          if (this !== document.activeElement && this.focus) {
            try {
              return this.focus(), false;
            } catch (e) {
            }
          }
        },
        delegateType : "focusin"
      },
      blur : {
        trigger : function onPageVisibilityChange() {
          return this === document.activeElement && this.blur ? (this.blur(), false) : undefined;
        },
        delegateType : "focusout"
      },
      beforeunload : {
        postDispatch : function absorbEvent_(event) {
          if (event.result !== undefined) {
            event.originalEvent.returnValue = event.result;
          }
        }
      }
    },
    simulate : function handler(type, elem, event, confirmed) {
      var e = jQuery.extend(new jQuery.Event, event, {
        type : type,
        isSimulated : true,
        originalEvent : {}
      });
      if (confirmed) {
        jQuery.event.trigger(e, null, elem);
      } else {
        jQuery.event.dispatch.call(elem, e);
      }
      if (e.isDefaultPrevented()) {
        event.preventDefault();
      }
    }
  };
  /** @type {function(!Object, !Object, ?): undefined} */
  jQuery.removeEvent = document.removeEventListener ? function(from, type, n) {
    if (from.removeEventListener) {
      from.removeEventListener(type, n, false);
    }
  } : function(target, type, handler) {
    /** @type {string} */
    var name = "on" + type;
    if (target.detachEvent) {
      if (_typeof(target[name]) === strundefined) {
        /** @type {null} */
        target[name] = null;
      }
      target.detachEvent(name, handler);
    }
  };
  /**
   * @param {(Object|string)} src
   * @param {boolean} event
   * @return {?}
   */
  jQuery.Event = function(src, event) {
    return this instanceof jQuery.Event ? (src && src.type ? (this.originalEvent = src, this.type = src.type, this.isDefaultPrevented = src.defaultPrevented || src.returnValue === false || src.getPreventDefault && src.getPreventDefault() ? returnTrue : returnFalse) : this.type = src, event && jQuery.extend(this, event), this.timeStamp = src && src.timeStamp || jQuery.now(), this[jQuery.expando] = 
    true, undefined) : new jQuery.Event(src, event);
  };
  jQuery.Event.prototype = {
    isDefaultPrevented : returnFalse,
    isPropagationStopped : returnFalse,
    isImmediatePropagationStopped : returnFalse,
    preventDefault : function preventDefault() {
      var e = this.originalEvent;
      /** @type {function(): ?} */
      this.isDefaultPrevented = returnTrue;
      if (e) {
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          /** @type {boolean} */
          e.returnValue = false;
        }
      }
    },
    stopPropagation : function stopPropagation() {
      var e = this.originalEvent;
      /** @type {function(): ?} */
      this.isPropagationStopped = returnTrue;
      if (e) {
        if (e.stopPropagation) {
          e.stopPropagation();
        }
        /** @type {boolean} */
        e.cancelBubble = true;
      }
    },
    stopImmediatePropagation : function stopImmediatePropagation() {
      /** @type {function(): ?} */
      this.isImmediatePropagationStopped = returnTrue;
      this.stopPropagation();
    }
  };
  jQuery.each({
    mouseenter : "mouseover",
    mouseleave : "mouseout"
  }, function(orig, fix) {
    jQuery.event.special[orig] = {
      delegateType : fix,
      bindType : fix,
      handle : function handle(event) {
        var _ref12;
        var elem = this;
        var t = event.relatedTarget;
        var handleObj = event.handleObj;
        return (!t || t !== elem && !jQuery.contains(elem, t)) && (event.type = handleObj.origType, _ref12 = handleObj.handler.apply(this, arguments), event.type = fix), _ref12;
      }
    };
  });
  if (!jQuery.support.submitBubbles) {
    jQuery.event.special.submit = {
      setup : function init() {
        return jQuery.nodeName(this, "form") ? false : (jQuery.event.add(this, "click._submit keypress._submit", function(options) {
          var elem = options.target;
          var data = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ? elem.form : undefined;
          if (data && !jQuery._data(data, "submitBubbles")) {
            jQuery.event.add(data, "submit._submit", function(event) {
              /** @type {boolean} */
              event._submit_bubble = true;
            });
            jQuery._data(data, "submitBubbles", true);
          }
        }), undefined);
      },
      postDispatch : function handler(event) {
        if (event._submit_bubble) {
          delete event._submit_bubble;
          if (this.parentNode && !event.isTrigger) {
            jQuery.event.simulate("submit", this.parentNode, event, true);
          }
        }
      },
      teardown : function init() {
        return jQuery.nodeName(this, "form") ? false : (jQuery.event.remove(this, "._submit"), undefined);
      }
    };
  }
  if (!jQuery.support.changeBubbles) {
    jQuery.event.special.change = {
      setup : function init() {
        return rformElems.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (jQuery.event.add(this, "propertychange._change", function(event) {
          if ("checked" === event.originalEvent.propertyName) {
            /** @type {boolean} */
            this._just_changed = true;
          }
        }), jQuery.event.add(this, "click._change", function(event) {
          if (this._just_changed && !event.isTrigger) {
            /** @type {boolean} */
            this._just_changed = false;
          }
          jQuery.event.simulate("change", this, event, true);
        })), false) : (jQuery.event.add(this, "beforeactivate._change", function(options) {
          var elem = options.target;
          if (rformElems.test(elem.nodeName) && !jQuery._data(elem, "changeBubbles")) {
            jQuery.event.add(elem, "change._change", function(event) {
              if (!(!this.parentNode || event.isSimulated || event.isTrigger)) {
                jQuery.event.simulate("change", this.parentNode, event, true);
              }
            });
            jQuery._data(elem, "changeBubbles", true);
          }
        }), undefined);
      },
      handle : function handle(event) {
        var elem = event.target;
        return this !== elem || event.isSimulated || event.isTrigger || "radio" !== elem.type && "checkbox" !== elem.type ? event.handleObj.handler.apply(this, arguments) : undefined;
      },
      teardown : function teardown() {
        return jQuery.event.remove(this, "._change"), !rformElems.test(this.nodeName);
      }
    };
  }
  if (!jQuery.support.focusinBubbles) {
    jQuery.each({
      focus : "focusin",
      blur : "focusout"
    }, function(orig, fix) {
      /** @type {number} */
      var n = 0;
      /**
       * @param {!Object} event
       * @return {undefined}
       */
      var resizeOutput = function handler(event) {
        jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
      };
      jQuery.event.special[fix] = {
        setup : function prepare_draw() {
          if (0 === n++) {
            document.addEventListener(orig, resizeOutput, true);
          }
        },
        teardown : function teardown() {
          if (0 === --n) {
            document.removeEventListener(orig, resizeOutput, true);
          }
        }
      };
    });
  }
  jQuery.fn.extend({
    on : function on(type, options, callback, n, one) {
      var eventType;
      var c;
      if ("object" == (typeof type === "undefined" ? "undefined" : _typeof(type))) {
        if ("string" != typeof options) {
          callback = callback || options;
          /** @type {!Object} */
          options = undefined;
        }
        for (eventType in type) {
          this.on(eventType, options, callback, type[eventType], one);
        }
        return this;
      }
      if (null == callback && null == n ? (n = options, callback = options = undefined) : null == n && ("string" == typeof options ? (n = callback, callback = undefined) : (n = callback, callback = options, options = undefined)), n === false) {
        /** @type {function(): ?} */
        n = returnFalse;
      } else {
        if (!n) {
          return this;
        }
      }
      return 1 === one && (c = n, n = function setup(value) {
        return jQuery().off(value), c.apply(this, arguments);
      }, n.guid = c.guid || (c.guid = jQuery.guid++)), this.each(function() {
        jQuery.event.add(this, type, n, callback, options);
      });
    },
    one : function start_scenario(event, fn, data, callback) {
      return this.on(event, fn, data, callback, 1);
    },
    off : function off(event, name, callback) {
      var handleObj;
      var type;
      if (event && event.preventDefault && event.handleObj) {
        return handleObj = event.handleObj, jQuery(event.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler), this;
      }
      if ("object" == (typeof event === "undefined" ? "undefined" : _typeof(event))) {
        for (type in event) {
          this.off(type, name, event[type]);
        }
        return this;
      }
      return (name === false || "function" == typeof name) && (callback = name, name = undefined), callback === false && (callback = returnFalse), this.each(function() {
        jQuery.event.remove(this, event, callback, name);
      });
    },
    bind : function throwException(message, fn, url) {
      return this.on(message, null, fn, url);
    },
    unbind : function off(event, callback) {
      return this.off(event, null, callback);
    },
    delegate : function delegate(event, filter, data, callback) {
      return this.on(filter, event, data, callback);
    },
    undelegate : function undelegate(selector, event, callback) {
      return 1 === arguments.length ? this.off(selector, "**") : this.off(event, selector || "**", callback);
    },
    trigger : function trigger(event, obj) {
      return this.each(function() {
        jQuery.event.trigger(event, obj, this);
      });
    },
    triggerHandler : function vertexDragEnd(type, name) {
      var value = this[0];
      return value ? jQuery.event.trigger(type, name, value, true) : undefined;
    }
  });
  (function(window, evtObjOrName) {
    /**
     * @param {string} value
     * @return {?}
     */
    function isNative(value) {
      return values.test(value + "");
    }
    /**
     * @return {?}
     */
    function createCache() {
      var tmp_obj;
      /** @type {!Array} */
      var _ = [];
      return tmp_obj = function cache(value, key) {
        return _.push(value = value + " ") > Expr.cacheLength && delete tmp_obj[_.shift()], tmp_obj[value] = key;
      };
    }
    /**
     * @param {!Function} fn
     * @return {?}
     */
    function markFunction(fn) {
      return fn[expando] = true, fn;
    }
    /**
     * @param {!Function} next
     * @return {?}
     */
    function assert(next) {
      var t = document.createElement("div");
      try {
        return next(t);
      } catch (n) {
        return false;
      } finally {
        /** @type {null} */
        t = null;
      }
    }
    /**
     * @param {string} selector
     * @param {!Object} context
     * @param {!Object} results
     * @param {!Array} seed
     * @return {?}
     */
    function Sizzle(selector, context, results, seed) {
      var match;
      var elem;
      var m;
      var nodeType;
      var i;
      var groups;
      var oid;
      var nid;
      var newContext;
      var newSelector;
      if ((context ? context.ownerDocument || context : preferredDoc) !== document && setDocument(context), context = context || document, results = results || [], !selector || "string" != typeof selector) {
        return results;
      }
      if (1 !== (nodeType = context.nodeType) && 9 !== nodeType) {
        return [];
      }
      if (!documentIsXML && !seed) {
        if (match = customSelectorReg.exec(selector)) {
          if (m = match[1]) {
            if (9 === nodeType) {
              if (elem = context.getElementById(m), !elem || !elem.parentNode) {
                return results;
              }
              if (elem.id === m) {
                return results.push(elem), results;
              }
            } else {
              if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
                return results.push(elem), results;
              }
            }
          } else {
            if (match[2]) {
              return push.apply(results, slice.call(context.getElementsByTagName(selector), 0)), results;
            }
            if ((m = match[3]) && support.getByClassName && context.getElementsByClassName) {
              return push.apply(results, slice.call(context.getElementsByClassName(m), 0)), results;
            }
          }
        }
        if (support.qsa && !regex.test(selector)) {
          if (oid = true, nid = expando, newContext = context, newSelector = 9 === nodeType && selector, 1 === nodeType && "object" !== context.nodeName.toLowerCase()) {
            groups = tokenize(selector);
            if (oid = context.getAttribute("id")) {
              nid = oid.replace(rescape, "\\$&");
            } else {
              context.setAttribute("id", nid);
            }
            /** @type {string} */
            nid = "[id='" + nid + "'] ";
            i = groups.length;
            for (; i--;) {
              /** @type {string} */
              groups[i] = nid + toSelector(groups[i]);
            }
            newContext = IS_HTML_FRAGMENT.test(selector) && context.parentNode || context;
            newSelector = groups.join(",");
          }
          if (newSelector) {
            try {
              return push.apply(results, slice.call(newContext.querySelectorAll(newSelector), 0)), results;
            } catch (b) {
            } finally {
              if (!oid) {
                context.removeAttribute("id");
              }
            }
          }
        }
      }
      return select(selector.replace(rtrim, "$1"), context, results, seed);
    }
    /**
     * @param {!Object} b
     * @param {!Object} a
     * @return {?}
     */
    function siblingCheck(b, a) {
      var n = a && b;
      var ret = n && (~a.sourceIndex || j) - (~b.sourceIndex || j);
      if (ret) {
        return ret;
      }
      if (n) {
        for (; n = n.nextSibling;) {
          if (n === a) {
            return -1;
          }
        }
      }
      return b ? 1 : -1;
    }
    /**
     * @param {!Object} name
     * @return {?}
     */
    function jQuerify(name) {
      return function(section) {
        var type = section.nodeName.toLowerCase();
        return "input" === type && section.type === name;
      };
    }
    /**
     * @param {!Object} type
     * @return {?}
     */
    function createButtonPseudo(type) {
      return function(section) {
        var undefined = section.nodeName.toLowerCase();
        return ("input" === undefined || "button" === undefined) && section.type === type;
      };
    }
    /**
     * @param {!Function} fn
     * @return {?}
     */
    function createPositionalPseudo(fn) {
      return markFunction(function(key) {
        return key = +key, markFunction(function(a, b) {
          var i;
          var k = fn([], a.length, key);
          var l = k.length;
          for (; l--;) {
            if (a[i = k[l]]) {
              /** @type {boolean} */
              a[i] = !(b[i] = a[i]);
            }
          }
        });
      });
    }
    /**
     * @param {!Object} context
     * @param {number} body
     * @return {?}
     */
    function tokenize(context, body) {
      var spec;
      var match;
      var tokens;
      var type;
      var s;
      var groups;
      var preFilters;
      var cached = tokenCache[context + " "];
      if (cached) {
        return body ? 0 : cached.slice(0);
      }
      /** @type {!Object} */
      s = context;
      /** @type {!Array} */
      groups = [];
      preFilters = Expr.preFilter;
      for (; s;) {
        if (!spec || (match = re.exec(s))) {
          if (match) {
            s = s.slice(match[0].length) || s;
          }
          groups.push(tokens = []);
        }
        /** @type {boolean} */
        spec = false;
        if (match = regEx.exec(s)) {
          /** @type {string} */
          spec = match.shift();
          tokens.push({
            value : spec,
            type : match[0].replace(rtrim, " ")
          });
          s = s.slice(spec.length);
        }
        for (type in Expr.filter) {
          if (!(!(match = matchExpr[type].exec(s)) || preFilters[type] && !(match = preFilters[type](match)))) {
            spec = match.shift();
            tokens.push({
              value : spec,
              type : type,
              matches : match
            });
            s = s.slice(spec.length);
          }
        }
        if (!spec) {
          break;
        }
      }
      return body ? s.length : s ? Sizzle.error(context) : tokenCache(context, groups).slice(0);
    }
    /**
     * @param {!Array} text
     * @return {?}
     */
    function toSelector(text) {
      /** @type {number} */
      var i = 0;
      var l = text.length;
      /** @type {string} */
      var selector = "";
      for (; l > i; i++) {
        /** @type {string} */
        selector = selector + text[i].value;
      }
      return selector;
    }
    /**
     * @param {!Function} matcher
     * @param {!Object} combinator
     * @param {string} base
     * @return {?}
     */
    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir;
      var checkNonElements = base && "parentNode" === dir;
      /** @type {number} */
      var doneName = done++;
      return combinator.first ? function(elem, stat, context) {
        for (; elem = elem[dir];) {
          if (1 === elem.nodeType || checkNonElements) {
            return matcher(elem, stat, context);
          }
        }
      } : function(elem, context, xml) {
        var data;
        var cache;
        var outerCache;
        var dirkey = dirruns + " " + doneName;
        if (xml) {
          for (; elem = elem[dir];) {
            if ((1 === elem.nodeType || checkNonElements) && matcher(elem, context, xml)) {
              return true;
            }
          }
        } else {
          for (; elem = elem[dir];) {
            if (1 === elem.nodeType || checkNonElements) {
              if (outerCache = elem[expando] || (elem[expando] = {}), (cache = outerCache[dir]) && cache[0] === dirkey) {
                if ((data = cache[1]) === true || data === cachedruns) {
                  return data === true;
                }
              } else {
                if (cache = outerCache[dir] = [dirkey], cache[1] = matcher(elem, context, xml) || cachedruns, cache[1] === true) {
                  return true;
                }
              }
            }
          }
        }
      };
    }
    /**
     * @param {!Object} matchers
     * @return {?}
     */
    function elementMatcher(matchers) {
      return matchers.length > 1 ? function(elem, context, xml) {
        var i = matchers.length;
        for (; i--;) {
          if (!matchers[i](elem, context, xml)) {
            return false;
          }
        }
        return true;
      } : matchers[0];
    }
    /**
     * @param {!Array} data
     * @param {!Object} selector
     * @param {!Object} filter
     * @param {?} context
     * @param {?} obj
     * @return {?}
     */
    function format(data, selector, filter, context, obj) {
      var item;
      /** @type {!Array} */
      var result = [];
      /** @type {number} */
      var index = 0;
      var length = data.length;
      /** @type {boolean} */
      var isDrawLayerVisibled = null != selector;
      for (; length > index; index++) {
        if ((item = data[index]) && (!filter || filter(item, context, obj))) {
          result.push(item);
          if (isDrawLayerVisibled) {
            selector.push(index);
          }
        }
      }
      return result;
    }
    /**
     * @param {!Object} options
     * @param {!Object} selector
     * @param {string} callback
     * @param {!Object} fn
     * @param {string} element
     * @param {!Object} dom
     * @return {?}
     */
    function render(options, selector, callback, fn, element, dom) {
      return fn && !fn[expando] && (fn = render(fn)), element && !element[expando] && (element = render(element, dom)), markFunction(function(process, item, context, extra) {
        var name;
        var i;
        var key;
        /** @type {!Array} */
        var node = [];
        /** @type {!Array} */
        var path = [];
        var row = item.length;
        var score = process || multipleContexts(selector || "*", context.nodeType ? [context] : context, []);
        var result = !options || !process && selector ? score : format(score, node, options, context, extra);
        var data = callback ? element || (process ? options : row || fn) ? [] : item : result;
        if (callback && callback(result, data, context, extra), fn) {
          name = format(data, path);
          fn(name, [], context, extra);
          i = name.length;
          for (; i--;) {
            if (key = name[i]) {
              /** @type {boolean} */
              data[path[i]] = !(result[path[i]] = key);
            }
          }
        }
        if (process) {
          if (element || options) {
            if (element) {
              /** @type {!Array} */
              name = [];
              i = data.length;
              for (; i--;) {
                if (key = data[i]) {
                  name.push(result[i] = key);
                }
              }
              element(null, data = [], name, extra);
            }
            i = data.length;
            for (; i--;) {
              if ((key = data[i]) && (name = element ? path.call(process, key) : node[i]) > -1) {
                /** @type {boolean} */
                process[name] = !(item[name] = key);
              }
            }
          }
        } else {
          data = format(data === item ? data.splice(row, data.length) : data);
          if (element) {
            element(null, item, data, extra);
          } else {
            push.apply(item, data);
          }
        }
      });
    }
    /**
     * @param {!Array} tokens
     * @return {?}
     */
    function matcherFromTokens(tokens) {
      var node;
      var matcher;
      var j;
      var length = tokens.length;
      var leadingRelative = Expr.relative[tokens[0].type];
      var implicitRelative = leadingRelative || Expr.relative[" "];
      /** @type {number} */
      var i = leadingRelative ? 1 : 0;
      var matchContext = addCombinator(function(actualCommand) {
        return actualCommand === node;
      }, implicitRelative, true);
      var matchAnyContext = addCombinator(function(e) {
        return path.call(node, e) > -1;
      }, implicitRelative, true);
      /** @type {!Array} */
      var matchers = [function(elem, context, xml) {
        return !leadingRelative && (xml || context !== outermostContext) || ((node = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
      }];
      for (; length > i; i++) {
        if (matcher = Expr.relative[tokens[i].type]) {
          /** @type {!Array} */
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          if (matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches), matcher[expando]) {
            /** @type {number} */
            j = ++i;
            for (; length > j; j++) {
              if (Expr.relative[tokens[j].type]) {
                break;
              }
            }
            return render(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1)).replace(rtrim, "$1"), matcher, j > i && matcherFromTokens(tokens.slice(i, j)), length > j && matcherFromTokens(tokens = tokens.slice(j)), length > j && toSelector(tokens));
          }
          matchers.push(matcher);
        }
      }
      return elementMatcher(matchers);
    }
    /**
     * @param {!Array} elementMatchers
     * @param {!Array} setMatchers
     * @return {?}
     */
    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      /** @type {number} */
      var matcherCachedRuns = 0;
      /** @type {boolean} */
      var bySet = setMatchers.length > 0;
      /** @type {boolean} */
      var byElement = elementMatchers.length > 0;
      /**
       * @param {!Function} seed
       * @param {!Object} context
       * @param {?} xml
       * @param {!Array} results
       * @param {!Object} expandContext
       * @return {?}
       */
      var superMatcher = function superMatcher(seed, context, xml, results, expandContext) {
        var elem;
        var j;
        var matcher;
        /** @type {!Array} */
        var data = [];
        /** @type {number} */
        var matchedCount = 0;
        /** @type {string} */
        var i = "0";
        var unmatched = seed && [];
        /** @type {boolean} */
        var documentIsHTML = null != expandContext;
        var contextBackup = outermostContext;
        var elems = seed || byElement && Expr.find.TAG("*", expandContext && context.parentNode || context);
        var dirrunsUnique = dirruns = dirruns + (null == contextBackup ? 1 : Math.random() || .1);
        if (documentIsHTML) {
          outermostContext = context !== document && context;
          cachedruns = matcherCachedRuns;
        }
        for (; null != (elem = elems[i]); i++) {
          if (byElement && elem) {
            /** @type {number} */
            j = 0;
            for (; matcher = elementMatchers[j++];) {
              if (matcher(elem, context, xml)) {
                results.push(elem);
                break;
              }
            }
            if (documentIsHTML) {
              dirruns = dirrunsUnique;
              /** @type {number} */
              cachedruns = ++matcherCachedRuns;
            }
          }
          if (bySet) {
            if (elem = !matcher && elem) {
              matchedCount--;
            }
            if (seed) {
              unmatched.push(elem);
            }
          }
        }
        if (matchedCount = matchedCount + i, bySet && i !== matchedCount) {
          /** @type {number} */
          j = 0;
          for (; matcher = setMatchers[j++];) {
            matcher(unmatched, data, context, xml);
          }
          if (seed) {
            if (matchedCount > 0) {
              for (; i--;) {
                if (!(unmatched[i] || data[i])) {
                  data[i] = pop.call(results);
                }
              }
            }
            data = format(data);
          }
          push.apply(results, data);
          if (documentIsHTML && !seed && data.length > 0 && matchedCount + setMatchers.length > 1) {
            Sizzle.uniqueSort(results);
          }
        }
        return documentIsHTML && (dirruns = dirrunsUnique, outermostContext = contextBackup), unmatched;
      };
      return bySet ? markFunction(superMatcher) : superMatcher;
    }
    /**
     * @param {string} selector
     * @param {!NodeList} contexts
     * @param {!Object} results
     * @return {?}
     */
    function multipleContexts(selector, contexts, results) {
      /** @type {number} */
      var i = 0;
      var len = contexts.length;
      for (; len > i; i++) {
        Sizzle(selector, contexts[i], results);
      }
      return results;
    }
    /**
     * @param {!Array} selector
     * @param {!Object} context
     * @param {!Object} results
     * @param {!Array} seed
     * @return {?}
     */
    function select(selector, context, results, seed) {
      var i;
      var tokens;
      var token;
      var type;
      var find;
      var match = tokenize(selector);
      if (!seed && 1 === match.length) {
        if (tokens = match[0] = match[0].slice(0), tokens.length > 2 && "ID" === (token = tokens[0]).type && 9 === context.nodeType && !documentIsXML && Expr.relative[tokens[1].type]) {
          if (context = Expr.find.ID(token.matches[0].replace(runescape, funescape), context)[0], !context) {
            return results;
          }
          selector = selector.slice(tokens.shift().value.length);
        }
        i = matchExpr.needsContext.test(selector) ? 0 : tokens.length;
        for (; i--;) {
          if (token = tokens[i], Expr.relative[type = token.type]) {
            break;
          }
          if ((find = Expr.find[type]) && (seed = find(token.matches[0].replace(runescape, funescape), IS_HTML_FRAGMENT.test(tokens[0].type) && context.parentNode || context))) {
            if (tokens.splice(i, 1), selector = seed.length && toSelector(tokens), !selector) {
              return push.apply(results, slice.call(seed, 0)), results;
            }
            break;
          }
        }
      }
      return compile(selector, match)(seed, context, documentIsXML, results, IS_HTML_FRAGMENT.test(selector)), results;
    }
    /**
     * @return {undefined}
     */
    function setFilters() {
    }
    var i;
    var cachedruns;
    var Expr;
    var print;
    var isXML;
    var compile;
    var hasDuplicate;
    var outermostContext;
    var setDocument;
    var document;
    var docElem;
    var documentIsXML;
    var regex;
    var r;
    var func;
    var contains;
    var compareNodesByOrder;
    /** @type {string} */
    var expando = "sizzle" + -new Date;
    var preferredDoc = window.document;
    var support = {};
    /** @type {number} */
    var dirruns = 0;
    /** @type {number} */
    var done = 0;
    var classCache = createCache();
    var tokenCache = createCache();
    var compilerCache = createCache();
    var strundefined = typeof evtObjOrName === "undefined" ? "undefined" : _typeof(evtObjOrName);
    /** @type {number} */
    var j = 1 << 31;
    /** @type {!Array} */
    var arr = [];
    /** @type {function(this:IArrayLike<T>): T} */
    var pop = arr.pop;
    /** @type {function(this:IArrayLike<T>, ...T): number} */
    var push = arr.push;
    /** @type {function(this:(IArrayLike<T>|string), *=, *=): !Array<T>} */
    var slice = arr.slice;
    /** @type {function(this:(IArrayLike<T>|string), T, number=): number} */
    var path = arr.indexOf || function(item) {
      /** @type {number} */
      var l = 0;
      var i = this.length;
      for (; i > l; l++) {
        if (this[l] === item) {
          return l;
        }
      }
      return -1;
    };
    /** @type {string} */
    var _ = "[\\x20\\t\\r\\n\\f]";
    /** @type {string} */
    var characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+";
    /** @type {string} */
    var identifier = characterEncoding.replace("w", "w#");
    /** @type {string} */
    var scenarioTitle = "([*^$|!~]?=)";
    /** @type {string} */
    var b = "\\[" + _ + "*(" + characterEncoding + ")" + _ + "*(?:" + scenarioTitle + _ + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + _ + "*\\]";
    /** @type {string} */
    var e = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + b.replace(3, 8) + ")*)|.*)\\)|)";
    /** @type {!RegExp} */
    var rtrim = RegExp("^" + _ + "+|((?:^|[^\\\\])(?:\\\\.)*)" + _ + "+$", "g");
    /** @type {!RegExp} */
    var re = RegExp("^" + _ + "*," + _ + "*");
    /** @type {!RegExp} */
    var regEx = RegExp("^" + _ + "*([\\x20\\t\\r\\n\\f>+~])" + _ + "*");
    /** @type {!RegExp} */
    var name = RegExp(e);
    /** @type {!RegExp} */
    var ridentifier = RegExp("^" + identifier + "$");
    var matchExpr = {
      ID : RegExp("^#(" + characterEncoding + ")"),
      CLASS : RegExp("^\\.(" + characterEncoding + ")"),
      NAME : RegExp("^\\[name=['\"]?(" + characterEncoding + ")['\"]?\\]"),
      TAG : RegExp("^(" + characterEncoding.replace("w", "w*") + ")"),
      ATTR : RegExp("^" + b),
      PSEUDO : RegExp("^" + e),
      CHILD : RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + _ + "*(even|odd|(([+-]|)(\\d*)n|)" + _ + "*(?:([+-]|)" + _ + "*(\\d+)|))" + _ + "*\\)|)", "i"),
      needsContext : RegExp("^" + _ + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + _ + "*((?:-\\d)?\\d*)" + _ + "*\\)|)(?=[^-]|$)", "i")
    };
    /** @type {!RegExp} */
    var IS_HTML_FRAGMENT = /[\x20\t\r\n\f]*[+~]/;
    /** @type {!RegExp} */
    var values = /^[^{]+\{\s*\[native code/;
    /** @type {!RegExp} */
    var customSelectorReg = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/;
    /** @type {!RegExp} */
    var inputNodeNames = /^(?:input|select|textarea|button)$/i;
    /** @type {!RegExp} */
    var srsRegex = /^h\d$/i;
    /** @type {!RegExp} */
    var rescape = /'|\\/g;
    /** @type {!RegExp} */
    var comboFinderRx = /=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g;
    /** @type {!RegExp} */
    var runescape = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g;
    /**
     * @param {?} val
     * @param {string} escaped
     * @return {?}
     */
    var funescape = function expand(val, escaped) {
      /** @type {number} */
      var high = "0x" + escaped - 65536;
      return high !== high ? escaped : 0 > high ? String.fromCharCode(high + 65536) : String.fromCharCode(55296 | high >> 10, 56320 | 1023 & high);
    };
    try {
      slice.call(preferredDoc.documentElement.childNodes, 0)[0].nodeType;
    } catch (nt) {
      /**
       * @param {number} v
       * @return {?}
       */
      slice = function pushKeyValue_(v) {
        var testFilePath;
        /** @type {!Array} */
        var path = [];
        for (; testFilePath = this[v++];) {
          path.push(testFilePath);
        }
        return path;
      };
    }
    /** @type {function(!Object): ?} */
    isXML = Sizzle.isXML = function(elem) {
      var documentElement = elem && (elem.ownerDocument || elem).documentElement;
      return documentElement ? "HTML" !== documentElement.nodeName : false;
    };
    /** @type {function(!Object): ?} */
    setDocument = Sizzle.setDocument = function(node) {
      var doc = node ? node.ownerDocument || node : preferredDoc;
      return doc !== document && 9 === doc.nodeType && doc.documentElement ? (document = doc, docElem = doc.documentElement, documentIsXML = isXML(doc), support.tagNameNoComments = assert(function(testee) {
        return testee.appendChild(doc.createComment("")), !testee.getElementsByTagName("*").length;
      }), support.attributes = assert(function(aItem) {
        /** @type {string} */
        aItem.innerHTML = "<select></select>";
        var type = _typeof(aItem.lastChild.getAttribute("multiple"));
        return "boolean" !== type && "string" !== type;
      }), support.getByClassName = assert(function(e) {
        return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", e.getElementsByClassName && e.getElementsByClassName("e").length ? (e.lastChild.className = "e", 2 === e.getElementsByClassName("e").length) : false;
      }), support.getByName = assert(function(div) {
        /** @type {string} */
        div.id = expando + 0;
        /** @type {string} */
        div.innerHTML = "<a name='" + expando + "'></a><div name='" + expando + "'></div>";
        docElem.insertBefore(div, docElem.firstChild);
        var t = doc.getElementsByName && doc.getElementsByName(expando).length === 2 + doc.getElementsByName(expando + 0).length;
        return support.getIdNotName = !doc.getElementById(expando), docElem.removeChild(div), t;
      }), Expr.attrHandle = assert(function(div) {
        return div.innerHTML = "<a href='#'></a>", div.firstChild && _typeof(div.firstChild.getAttribute) !== strundefined && "#" === div.firstChild.getAttribute("href");
      }) ? {} : {
        href : function getValue(value) {
          return value.getAttribute("href", 2);
        },
        type : function getValue(value) {
          return value.getAttribute("type");
        }
      }, support.getIdNotName ? (Expr.find.ID = function(id, elem) {
        if (_typeof(elem.getElementById) !== strundefined && !documentIsXML) {
          var m = elem.getElementById(id);
          return m && m.parentNode ? [m] : [];
        }
      }, Expr.filter.ID = function(id) {
        var attrId = id.replace(runescape, funescape);
        return function(e) {
          return e.getAttribute("id") === attrId;
        };
      }) : (Expr.find.ID = function(id, elem) {
        if (_typeof(elem.getElementById) !== strundefined && !documentIsXML) {
          var root = elem.getElementById(id);
          return root ? root.id === id || _typeof(root.getAttributeNode) !== strundefined && root.getAttributeNode("id").value === id ? [root] : evtObjOrName : [];
        }
      }, Expr.filter.ID = function(id) {
        var attrId = id.replace(runescape, funescape);
        return function(elem) {
          var node = _typeof(elem.getAttributeNode) !== strundefined && elem.getAttributeNode("id");
          return node && node.value === attrId;
        };
      }), Expr.find.TAG = support.tagNameNoComments ? function(elName, root) {
        return _typeof(root.getElementsByTagName) !== strundefined ? root.getElementsByTagName(elName) : evtObjOrName;
      } : function(selector, document) {
        var first;
        /** @type {!Array} */
        var tmp = [];
        /** @type {number} */
        var i = 0;
        var results = document.getElementsByTagName(selector);
        if ("*" === selector) {
          for (; first = results[i++];) {
            if (1 === first.nodeType) {
              tmp.push(first);
            }
          }
          return tmp;
        }
        return results;
      }, Expr.find.NAME = support.getByName && function(canCreateDiscussions, element) {
        return _typeof(element.getElementsByName) !== strundefined ? element.getElementsByName(name) : evtObjOrName;
      }, Expr.find.CLASS = support.getByClassName && function(value, node) {
        return _typeof(node.getElementsByClassName) === strundefined || documentIsXML ? evtObjOrName : node.getElementsByClassName(value);
      }, r = [], regex = [":focus"], (support.qsa = isNative(doc.querySelectorAll)) && (assert(function(elementRoot) {
        /** @type {string} */
        elementRoot.innerHTML = "<select><option selected=''></option></select>";
        if (!elementRoot.querySelectorAll("[selected]").length) {
          regex.push("\\[" + _ + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)");
        }
        if (!elementRoot.querySelectorAll(":checked").length) {
          regex.push(":checked");
        }
      }), assert(function(elementRoot) {
        /** @type {string} */
        elementRoot.innerHTML = "<input type='hidden' i=''/>";
        if (elementRoot.querySelectorAll("[i^='']").length) {
          regex.push("[*^$]=" + _ + "*(?:\"\"|'')");
        }
        if (!elementRoot.querySelectorAll(":enabled").length) {
          regex.push(":enabled", ":disabled");
        }
        elementRoot.querySelectorAll("*,:x");
        regex.push(",.*:");
      })), (support.matchesSelector = isNative(func = docElem.matchesSelector || docElem.mozMatchesSelector || docElem.webkitMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) && assert(function(el) {
        support.disconnectedMatch = func.call(el, "div");
        func.call(el, "[s!='']:x");
        r.push("!=", e);
      }), regex = RegExp(regex.join("|")), r = RegExp(r.join("|")), contains = isNative(docElem.contains) || docElem.compareDocumentPosition ? function(a, b) {
        var adown = 9 === a.nodeType ? a.documentElement : a;
        var bup = b && b.parentNode;
        return a === bup || !(!bup || 1 !== bup.nodeType || !(adown.contains ? adown.contains(bup) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(bup)));
      } : function(a, b) {
        if (b) {
          for (; b = b.parentNode;) {
            if (b === a) {
              return true;
            }
          }
        }
        return false;
      }, compareNodesByOrder = docElem.compareDocumentPosition ? function(a, b) {
        var r;
        return a === b ? (hasDuplicate = true, 0) : (r = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b)) ? 1 & r || a.parentNode && 11 === a.parentNode.nodeType ? a === doc || contains(preferredDoc, a) ? -1 : b === doc || contains(preferredDoc, b) ? 1 : 0 : 4 & r ? -1 : 
        1 : a.compareDocumentPosition ? -1 : 1;
      } : function(a, b) {
        var cur;
        /** @type {number} */
        var i = 0;
        var aup = a.parentNode;
        var bup = b.parentNode;
        /** @type {!Array} */
        var ap = [a];
        /** @type {!Array} */
        var bp = [b];
        if (a === b) {
          return hasDuplicate = true, 0;
        }
        if (!aup || !bup) {
          return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : 0;
        }
        if (aup === bup) {
          return siblingCheck(a, b);
        }
        /** @type {!Object} */
        cur = a;
        for (; cur = cur.parentNode;) {
          ap.unshift(cur);
        }
        /** @type {!Object} */
        cur = b;
        for (; cur = cur.parentNode;) {
          bp.unshift(cur);
        }
        for (; ap[i] === bp[i];) {
          i++;
        }
        return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
      }, hasDuplicate = false, [0, 0].sort(compareNodesByOrder), support.detectDuplicates = hasDuplicate, document) : document;
    };
    /**
     * @param {string} expr
     * @param {?} set
     * @return {?}
     */
    Sizzle.matches = function(expr, set) {
      return Sizzle(expr, null, null, set);
    };
    /**
     * @param {!Object} context
     * @param {string} selector
     * @return {?}
     */
    Sizzle.matchesSelector = function(context, selector) {
      if ((context.ownerDocument || context) !== document && setDocument(context), selector = selector.replace(comboFinderRx, "='$1']"), !(!support.matchesSelector || documentIsXML || r && r.test(selector) || regex.test(selector))) {
        try {
          var ret = func.call(context, selector);
          if (ret || support.disconnectedMatch || context.document && 11 !== context.document.nodeType) {
            return ret;
          }
        } catch (r) {
        }
      }
      return Sizzle(selector, document, null, [context]).length > 0;
    };
    /**
     * @param {!Object} context
     * @param {!Object} selector
     * @return {?}
     */
    Sizzle.contains = function(context, selector) {
      return (context.ownerDocument || context) !== document && setDocument(context), contains(context, selector);
    };
    /**
     * @param {!Object} elem
     * @param {string} name
     * @return {?}
     */
    Sizzle.attr = function(elem, name) {
      var val;
      return (elem.ownerDocument || elem) !== document && setDocument(elem), documentIsXML || (name = name.toLowerCase()), (val = Expr.attrHandle[name]) ? val(elem) : documentIsXML || support.attributes ? elem.getAttribute(name) : ((val = elem.getAttributeNode(name)) || elem.getAttribute(name)) && elem[name] === true ? name : val && 
      val.specified ? val.value : null;
    };
    /**
     * @param {!Function} value
     * @return {?}
     */
    Sizzle.error = function(value) {
      throw Error("Syntax error, unrecognized expression: " + value);
    };
    /**
     * @param {!Array} nodes
     * @return {?}
     */
    Sizzle.uniqueSort = function(nodes) {
      var node;
      /** @type {!Array} */
      var indices = [];
      /** @type {number} */
      var index = 1;
      /** @type {number} */
      var i = 0;
      if (hasDuplicate = !support.detectDuplicates, nodes.sort(compareNodesByOrder), hasDuplicate) {
        for (; node = nodes[index]; index++) {
          if (node === nodes[index - 1]) {
            /** @type {number} */
            i = indices.push(index);
          }
        }
        for (; i--;) {
          nodes.splice(indices[i], 1);
        }
      }
      return nodes;
    };
    /** @type {function(!Object): ?} */
    print = Sizzle.getText = function(e) {
      var i;
      /** @type {string} */
      var out = "";
      /** @type {number} */
      var g = 0;
      var type = e.nodeType;
      if (type) {
        if (1 === type || 9 === type || 11 === type) {
          if ("string" == typeof e.textContent) {
            return e.textContent;
          }
          e = e.firstChild;
          for (; e; e = e.nextSibling) {
            out = out + print(e);
          }
        } else {
          if (3 === type || 4 === type) {
            return e.nodeValue;
          }
        }
      } else {
        for (; i = e[g]; g++) {
          out = out + print(i);
        }
      }
      return out;
    };
    Expr = Sizzle.selectors = {
      cacheLength : 50,
      createPseudo : markFunction,
      match : matchExpr,
      find : {},
      relative : {
        ">" : {
          dir : "parentNode",
          first : true
        },
        " " : {
          dir : "parentNode"
        },
        "+" : {
          dir : "previousSibling",
          first : true
        },
        "~" : {
          dir : "previousSibling"
        }
      },
      preFilter : {
        ATTR : function getRevFileName(match) {
          return match[1] = match[1].replace(runescape, funescape), match[3] = (match[4] || match[5] || "").replace(runescape, funescape), "~=" === match[2] && (match[3] = " " + match[3] + " "), match.slice(0, 4);
        },
        CHILD : function CHILD(match) {
          return match[1] = match[1].toLowerCase(), "nth" === match[1].slice(0, 3) ? (match[3] || Sizzle.error(match[0]), match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * ("even" === match[3] || "odd" === match[3])), match[5] = +(match[7] + match[8] || "odd" === match[3])) : match[3] && Sizzle.error(match[0]), match;
        },
        PSEUDO : function PSEUDO(match) {
          var excess;
          var unquoted = !match[5] && match[2];
          return matchExpr.CHILD.test(match[0]) ? null : (match[4] ? match[2] = match[4] : unquoted && name.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length) && (match[0] = match[0].slice(0, excess), match[2] = unquoted.slice(0, excess)), match.slice(0, 3));
        }
      },
      filter : {
        TAG : function TAG(nodeName) {
          return "*" === nodeName ? function() {
            return true;
          } : (nodeName = nodeName.replace(runescape, funescape).toLowerCase(), function(elem) {
            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
          });
        },
        CLASS : function CLASS(name) {
          var pattern = classCache[name + " "];
          return pattern || (pattern = RegExp("(^|" + _ + ")" + name + "(" + _ + "|$)")) && classCache(name, function(elem) {
            return pattern.test(elem.className || _typeof(elem.getAttribute) !== strundefined && elem.getAttribute("class") || "");
          });
        },
        ATTR : function ATTR(name, string, value) {
          return function(input) {
            var key = Sizzle.attr(input, name);
            return null == key ? "!=" === string : string ? (key = key + "", "=" === string ? key === value : "!=" === string ? key !== value : "^=" === string ? value && 0 === key.indexOf(value) : "*=" === string ? value && key.indexOf(value) > -1 : "$=" === string ? value && key.slice(-value.length) === value : "~=" === 
            string ? (" " + key + " ").indexOf(value) > -1 : "|=" === string ? key === value || key.slice(0, value.length + 1) === value + "-" : false) : true;
          };
        },
        CHILD : function CHILD(type, what, argument, first, last) {
          /** @type {boolean} */
          var simple = "nth" !== type.slice(0, 3);
          /** @type {boolean} */
          var forward = "last" !== type.slice(-4);
          /** @type {boolean} */
          var ofType = "of-type" === what;
          return 1 === first && 0 === last ? function(tplDiv) {
            return !!tplDiv.parentNode;
          } : function(elem, n, xml) {
            var cache;
            var outerCache;
            var node;
            var diff;
            var nodeIndex;
            var start;
            /** @type {string} */
            var dir = simple !== forward ? "nextSibling" : "previousSibling";
            var parent = elem.parentNode;
            var name = ofType && elem.nodeName.toLowerCase();
            /** @type {boolean} */
            var useCache = !xml && !ofType;
            if (parent) {
              if (simple) {
                for (; dir;) {
                  /** @type {!Object} */
                  node = elem;
                  for (; node = node[dir];) {
                    if (ofType ? node.nodeName.toLowerCase() === name : 1 === node.nodeType) {
                      return false;
                    }
                  }
                  /** @type {(boolean|string)} */
                  start = dir = "only" === type && !start && "nextSibling";
                }
                return true;
              }
              if (start = [forward ? parent.firstChild : parent.lastChild], forward && useCache) {
                outerCache = parent[expando] || (parent[expando] = {});
                cache = outerCache[type] || [];
                nodeIndex = cache[0] === dirruns && cache[1];
                diff = cache[0] === dirruns && cache[2];
                node = nodeIndex && parent.childNodes[nodeIndex];
                for (; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop();) {
                  if (1 === node.nodeType && ++diff && node === elem) {
                    /** @type {!Array} */
                    outerCache[type] = [dirruns, nodeIndex, diff];
                    break;
                  }
                }
              } else {
                if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
                  diff = cache[1];
                } else {
                  for (; node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop();) {
                    if ((ofType ? node.nodeName.toLowerCase() === name : 1 === node.nodeType) && ++diff && (useCache && ((node[expando] || (node[expando] = {}))[type] = [dirruns, diff]), node === elem)) {
                      break;
                    }
                  }
                }
              }
              return diff = diff - last, diff === first || 0 === diff % first && diff / first >= 0;
            }
          };
        },
        PSEUDO : function PSEUDO(pseudo, argument) {
          var args;
          var fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error("unsupported pseudo: " + pseudo);
          return fn[expando] ? fn(argument) : fn.length > 1 ? (args = [pseudo, pseudo, "", argument], Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(e, params) {
            var i;
            var result = fn(e, argument);
            var j = result.length;
            for (; j--;) {
              /** @type {number} */
              i = path.call(e, result[j]);
              /** @type {boolean} */
              e[i] = !(params[i] = result[j]);
            }
          }) : function(responce) {
            return fn(responce, 0, args);
          }) : fn;
        }
      },
      pseudos : {
        not : markFunction(function(selector) {
          /** @type {!Array} */
          var a = [];
          /** @type {!Array} */
          var results = [];
          var matcher = compile(selector.replace(rtrim, "$1"));
          return matcher[expando] ? markFunction(function(a, resolvedDeps, n, context) {
            var name;
            var result = matcher(a, null, context, []);
            var i = a.length;
            for (; i--;) {
              if (name = result[i]) {
                /** @type {boolean} */
                a[i] = !(resolvedDeps[i] = name);
              }
            }
          }) : function(sNewObjName, i, context) {
            return a[0] = sNewObjName, matcher(a, null, context, results), !results.pop();
          };
        }),
        has : markFunction(function(selector) {
          return function(elem) {
            return Sizzle(selector, elem).length > 0;
          };
        }),
        contains : markFunction(function(propScope) {
          return function(elem) {
            return (elem.textContent || elem.innerText || print(elem)).indexOf(propScope) > -1;
          };
        }),
        lang : markFunction(function(lang) {
          return ridentifier.test(lang || "") || Sizzle.error("unsupported lang: " + lang), lang = lang.replace(runescape, funescape).toLowerCase(), function(elem) {
            var elemLang;
            do {
              if (elemLang = documentIsXML ? elem.getAttribute("xml:lang") || elem.getAttribute("lang") : elem.lang) {
                return elemLang = elemLang.toLowerCase(), elemLang === lang || 0 === elemLang.indexOf(lang + "-");
              }
            } while ((elem = elem.parentNode) && 1 === elem.nodeType);
            return false;
          };
        }),
        target : function target(value) {
          /** @type {string} */
          var charListNotLatin = window.location && window.location.hash;
          return charListNotLatin && charListNotLatin.slice(1) === value.id;
        },
        root : function root(elem) {
          return elem === docElem;
        },
        focus : function isFocused(element) {
          return element === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(element.type || element.href || ~element.tabIndex);
        },
        enabled : function clickWithWebdriver(selector) {
          return selector.disabled === false;
        },
        disabled : function clickWithWebdriver(selector) {
          return selector.disabled === true;
        },
        checked : function checked(elem) {
          var custom = elem.nodeName.toLowerCase();
          return "input" === custom && !!elem.checked || "option" === custom && !!elem.selected;
        },
        selected : function selected(elem) {
          return elem.parentNode && elem.parentNode.selectedIndex, elem.selected === true;
        },
        empty : function empty(elem) {
          elem = elem.firstChild;
          for (; elem; elem = elem.nextSibling) {
            if (elem.nodeName > "@" || 3 === elem.nodeType || 4 === elem.nodeType) {
              return false;
            }
          }
          return true;
        },
        parent : function filter(type) {
          return !Expr.pseudos.empty(type);
        },
        header : function getCoreTestFilePath(module) {
          return srsRegex.test(module.nodeName);
        },
        input : function input(target) {
          return inputNodeNames.test(target.nodeName);
        },
        button : function button(elem) {
          var left = elem.nodeName.toLowerCase();
          return "input" === left && "button" === elem.type || "button" === left;
        },
        text : function text(node) {
          var EXT;
          return "input" === node.nodeName.toLowerCase() && "text" === node.type && (null == (EXT = node.getAttribute("type")) || EXT.toLowerCase() === node.type);
        },
        first : createPositionalPseudo(function() {
          return [0];
        }),
        last : createPositionalPseudo(function(canCreateDiscussions, isSlidingUp) {
          return [isSlidingUp - 1];
        }),
        eq : createPositionalPseudo(function(canCreateDiscussions, dt, max) {
          return [0 > max ? max + dt : max];
        }),
        even : createPositionalPseudo(function(lastshuffle, propValue) {
          /** @type {number} */
          var value = 0;
          for (; propValue > value; value = value + 2) {
            lastshuffle.push(value);
          }
          return lastshuffle;
        }),
        odd : createPositionalPseudo(function(lastshuffle, propValue) {
          /** @type {number} */
          var value = 1;
          for (; propValue > value; value = value + 2) {
            lastshuffle.push(value);
          }
          return lastshuffle;
        }),
        lt : createPositionalPseudo(function(newNodeLists, dt, max) {
          var itemNodeList = 0 > max ? max + dt : max;
          for (; --itemNodeList >= 0;) {
            newNodeLists.push(itemNodeList);
          }
          return newNodeLists;
        }),
        gt : createPositionalPseudo(function(lightInstances, dt, max) {
          var index = 0 > max ? max + dt : max;
          for (; dt > ++index;) {
            lightInstances.push(index);
          }
          return lightInstances;
        })
      }
    };
    for (i in{
      radio : true,
      checkbox : true,
      file : true,
      password : true,
      image : true
    }) {
      Expr.pseudos[i] = jQuerify(i);
    }
    for (i in{
      submit : true,
      reset : true
    }) {
      Expr.pseudos[i] = createButtonPseudo(i);
    }
    /** @type {function(string, !Array): ?} */
    compile = Sizzle.compile = function(selector, group) {
      var i;
      /** @type {!Array} */
      var setMatchers = [];
      /** @type {!Array} */
      var elementMatchers = [];
      var cached = compilerCache[selector + " "];
      if (!cached) {
        if (!group) {
          group = tokenize(selector);
        }
        i = group.length;
        for (; i--;) {
          cached = matcherFromTokens(group[i]);
          if (cached[expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        }
        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
      }
      return cached;
    };
    Expr.pseudos.nth = Expr.pseudos.eq;
    Expr.filters = setFilters.prototype = Expr.pseudos;
    Expr.setFilters = new setFilters;
    setDocument();
    Sizzle.attr = jQuery.attr;
    /** @type {function(string, !Object, !Object, !Array): ?} */
    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;
    jQuery.expr[":"] = jQuery.expr.pseudos;
    /** @type {function(!Array): ?} */
    jQuery.unique = Sizzle.uniqueSort;
    /** @type {function(!Object): ?} */
    jQuery.text = Sizzle.getText;
    /** @type {function(!Object): ?} */
    jQuery.isXMLDoc = Sizzle.isXML;
    /** @type {function(!Object, !Object): ?} */
    jQuery.contains = Sizzle.contains;
  })(window);
  /** @type {!RegExp} */
  var runtil = /Until$/;
  /** @type {!RegExp} */
  var G = /^(?:parents|prev(?:Until|All))/;
  /** @type {!RegExp} */
  var searchImpl = /^.[^:#\[\.,]*$/;
  var rneedsContext = jQuery.expr.match.needsContext;
  var guaranteedUnique = {
    children : true,
    contents : true,
    next : true,
    prev : true
  };
  jQuery.fn.extend({
    find : function find(selector) {
      var i;
      var ret;
      var a;
      var len = this.length;
      if ("string" != typeof selector) {
        return a = this, this.pushStack(jQuery(selector).filter(function() {
          /** @type {number} */
          i = 0;
          for (; len > i; i++) {
            if (jQuery.contains(a[i], this)) {
              return true;
            }
          }
        }));
      }
      /** @type {!Array} */
      ret = [];
      /** @type {number} */
      i = 0;
      for (; len > i; i++) {
        jQuery.find(selector, this[i], ret);
      }
      return ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret), ret.selector = (this.selector ? this.selector + " " : "") + selector, ret;
    },
    has : function has(name) {
      var i;
      var targets = jQuery(name, this);
      var l = targets.length;
      return this.filter(function() {
        /** @type {number} */
        i = 0;
        for (; l > i; i++) {
          if (jQuery.contains(this, targets[i])) {
            return true;
          }
        }
      });
    },
    not : function last(name) {
      return this.pushStack(filter(this, name, false));
    },
    filter : function find(key) {
      return this.pushStack(filter(this, key, true));
    },
    is : function is(a) {
      return !!a && ("string" == typeof a ? rneedsContext.test(a) ? jQuery(a, this.context).index(this[0]) >= 0 : jQuery.filter(a, this).length > 0 : this.filter(a).length > 0);
    },
    closest : function find(selector, context) {
      var node;
      /** @type {number} */
      var offset = 0;
      var count = this.length;
      /** @type {!Array} */
      var elems = [];
      var collection = rneedsContext.test(selector) || "string" != typeof selector ? jQuery(selector, context || this.context) : 0;
      for (; count > offset; offset++) {
        node = this[offset];
        for (; node && node.ownerDocument && node !== context && 11 !== node.nodeType;) {
          if (collection ? collection.index(node) > -1 : jQuery.find.matchesSelector(node, selector)) {
            elems.push(node);
            break;
          }
          node = node.parentNode;
        }
      }
      return this.pushStack(elems.length > 1 ? jQuery.unique(elems) : elems);
    },
    index : function run(elem) {
      return elem ? "string" == typeof elem ? jQuery.inArray(this[0], jQuery(elem)) : jQuery.inArray(elem.jquery ? elem[0] : elem, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
    },
    add : function find(selector, container) {
      var options = "string" == typeof selector ? jQuery(selector, container) : jQuery.makeArray(selector && selector.nodeType ? [selector] : selector);
      var ret = jQuery.merge(this.get(), options);
      return this.pushStack(jQuery.unique(ret));
    },
    addBack : function end(fn) {
      return this.add(null == fn ? this.prevObject : this.prevObject.filter(fn));
    }
  });
  jQuery.fn.andSelf = jQuery.fn.addBack;
  jQuery.each({
    parent : function isSendButtonOrChild(eventTarget) {
      var target = eventTarget.parentNode;
      return target && 11 !== target.nodeType ? target : null;
    },
    parents : function _nodeClick(e) {
      return jQuery.dir(e, "parentNode");
    },
    parentsUntil : function parentsUntil(elem, i, until) {
      return jQuery.dir(elem, "parentNode", until);
    },
    next : function next(elem) {
      return sibling(elem, "nextSibling");
    },
    prev : function next(elem) {
      return sibling(elem, "previousSibling");
    },
    nextAll : function getNext(string) {
      return jQuery.dir(string, "nextSibling");
    },
    prevAll : function getNext(string) {
      return jQuery.dir(string, "previousSibling");
    },
    nextUntil : function parentsUntil(elem, i, until) {
      return jQuery.dir(elem, "nextSibling", until);
    },
    prevUntil : function parentsUntil(elem, i, until) {
      return jQuery.dir(elem, "previousSibling", until);
    },
    siblings : function prev(elem) {
      return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
    },
    children : function next(elem) {
      return jQuery.sibling(elem.firstChild);
    },
    contents : function init(elem) {
      return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes);
    }
  }, function(name, props) {
    /**
     * @param {string} s
     * @param {!Object} target
     * @return {?}
     */
    jQuery.fn[name] = function(s, target) {
      var data = jQuery.map(this, props, s);
      return runtil.test(name) || (target = s), target && "string" == typeof target && (data = jQuery.filter(target, data)), data = this.length > 1 && !guaranteedUnique[name] ? jQuery.unique(data) : data, this.length > 1 && G.test(name) && (data = data.reverse()), this.pushStack(data);
    };
  });
  jQuery.extend({
    filter : function query(e, type, n) {
      return n && (e = ":not(" + e + ")"), 1 === type.length ? jQuery.find.matchesSelector(type[0], e) ? [type[0]] : [] : jQuery.find.matches(e, type);
    },
    dir : function dir(item, prop, arg) {
      /** @type {!Array} */
      var arr = [];
      var val = item[prop];
      for (; val && 9 !== val.nodeType && (arg === undefined || 1 !== val.nodeType || !jQuery(val).is(arg));) {
        if (1 === val.nodeType) {
          arr.push(val);
        }
        val = val[prop];
      }
      return arr;
    },
    sibling : function sibling(n, elem) {
      /** @type {!Array} */
      var r = [];
      for (; n; n = n.nextSibling) {
        if (1 === n.nodeType && n !== elem) {
          r.push(n);
        }
      }
      return r;
    }
  });
  /** @type {string} */
  var componentsStr = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video";
  /** @type {!RegExp} */
  var yieldRe = / jQuery\d+="(?:null|\d+)"/g;
  /** @type {!RegExp} */
  var name = RegExp("<(?:" + componentsStr + ")[\\s/>]", "i");
  /** @type {!RegExp} */
  var trueRE = /^\s+/;
  /** @type {!RegExp} */
  var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi;
  /** @type {!RegExp} */
  var GoogleImageLayout = /<([\w:]+)/;
  /** @type {!RegExp} */
  var reKeyword = /<tbody/i;
  /** @type {!RegExp} */
  var re_commas = /<|&#?\w+;/;
  /** @type {!RegExp} */
  var reValidName = /<(?:script|style|link)/i;
  /** @type {!RegExp} */
  var reg = /^(?:checkbox|radio)$/i;
  /** @type {!RegExp} */
  var _tacet = /checked\s*(?:[^=]|=\s*.checked.)/i;
  /** @type {!RegExp} */
  var opacityRe = /^$|\/(?:java|ecma)script/i;
  /** @type {!RegExp} */
  var rscriptTypeMasked = /^true\/(.*)/;
  /** @type {!RegExp} */
  var rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
  var wrapMap = {
    option : [1, "<select multiple='multiple'>", "</select>"],
    legend : [1, "<fieldset>", "</fieldset>"],
    area : [1, "<map>", "</map>"],
    param : [1, "<object>", "</object>"],
    thead : [1, "<table>", "</table>"],
    tr : [2, "<table><tbody>", "</tbody></table>"],
    col : [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
    td : [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default : jQuery.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
  };
  var safeFragment = createSafeFragment(document);
  var fragmentDiv = safeFragment.appendChild(document.createElement("div"));
  /** @type {!Array} */
  wrapMap.optgroup = wrapMap.option;
  /** @type {!Array} */
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  /** @type {!Array} */
  wrapMap.th = wrapMap.td;
  jQuery.fn.extend({
    text : function test(value) {
      return jQuery.access(this, function(e) {
        return e === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(e));
      }, null, value, arguments.length);
    },
    wrapAll : function init(e) {
      if (jQuery.isFunction(e)) {
        return this.each(function(i) {
          jQuery(this).wrapAll(e.call(this, i));
        });
      }
      if (this[0]) {
        var t = jQuery(e, this[0].ownerDocument).eq(0).clone(true);
        if (this[0].parentNode) {
          t.insertBefore(this[0]);
        }
        t.map(function() {
          var elem = this;
          for (; elem.firstChild && 1 === elem.firstChild.nodeType;) {
            elem = elem.firstChild;
          }
          return elem;
        }).append(this);
      }
      return this;
    },
    wrapInner : function init(array) {
      return jQuery.isFunction(array) ? this.each(function(i) {
        jQuery(this).wrapInner(array.call(this, i));
      }) : this.each(function() {
        var t = jQuery(this);
        var res = t.contents();
        if (res.length) {
          res.wrapAll(array);
        } else {
          t.append(array);
        }
      });
    },
    wrap : function init(html) {
      var isFunction = jQuery.isFunction(html);
      return this.each(function(i) {
        jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
      });
    },
    unwrap : function removeRef() {
      return this.parent().each(function() {
        if (!jQuery.nodeName(this, "body")) {
          jQuery(this).replaceWith(this.childNodes);
        }
      }).end();
    },
    append : function shimHack() {
      return this.domManip(arguments, true, function(mainViewElement) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          this.appendChild(mainViewElement);
        }
      });
    },
    prepend : function replaceWith() {
      return this.domManip(arguments, true, function(prependMe) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          this.insertBefore(prependMe, this.firstChild);
        }
      });
    },
    before : function replaceWith() {
      return this.domManip(arguments, false, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this);
        }
      });
    },
    after : function replaceWith() {
      return this.domManip(arguments, false, function(elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this.nextSibling);
        }
      });
    },
    remove : function remove(element, keepData) {
      var elem;
      /** @type {number} */
      var i = 0;
      for (; null != (elem = this[i]); i++) {
        if (!element || jQuery.filter(element, [elem]).length > 0) {
          if (!(keepData || 1 !== elem.nodeType)) {
            jQuery.cleanData(getAll(elem));
          }
          if (elem.parentNode) {
            if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
              setGlobalEval(getAll(elem, "script"));
            }
            elem.parentNode.removeChild(elem);
          }
        }
      }
      return this;
    },
    empty : function init() {
      var elem;
      /** @type {number} */
      var i = 0;
      for (; null != (elem = this[i]); i++) {
        if (1 === elem.nodeType) {
          jQuery.cleanData(getAll(elem, false));
        }
        for (; elem.firstChild;) {
          elem.removeChild(elem.firstChild);
        }
        if (elem.options && jQuery.nodeName(elem, "select")) {
          /** @type {number} */
          elem.options.length = 0;
        }
      }
      return this;
    },
    clone : function layout(c, i) {
      return c = null == c ? false : c, i = null == i ? c : i, this.map(function() {
        return jQuery.clone(this, c, i);
      });
    },
    html : function init(value) {
      return jQuery.access(this, function(value) {
        var elem = this[0] || {};
        /** @type {number} */
        var endIdx = 0;
        var i = this.length;
        if (value === undefined) {
          return 1 === elem.nodeType ? elem.innerHTML.replace(yieldRe, "") : undefined;
        }
        if (!("string" != typeof value || reValidName.test(value) || !jQuery.support.htmlSerialize && name.test(value) || !jQuery.support.leadingWhitespace && trueRE.test(value) || wrapMap[(GoogleImageLayout.exec(value) || ["", ""])[1].toLowerCase()])) {
          /** @type {string} */
          value = value.replace(rxhtmlTag, "<$1></$2>");
          try {
            for (; i > endIdx; endIdx++) {
              elem = this[endIdx] || {};
              if (1 === elem.nodeType) {
                jQuery.cleanData(getAll(elem, false));
                /** @type {string} */
                elem.innerHTML = value;
              }
            }
            /** @type {number} */
            elem = 0;
          } catch (o) {
          }
        }
        if (elem) {
          this.empty().append(value);
        }
      }, null, value, arguments.length);
    },
    replaceWith : function link(value) {
      var oldCondition = jQuery.isFunction(value);
      return oldCondition || "string" == typeof value || (value = jQuery(value).not(this).detach()), this.domManip([value], true, function(mod_icons) {
        var nextSibling = this.nextSibling;
        var container = this.parentNode;
        if (container) {
          jQuery(this).remove();
          container.insertBefore(mod_icons, nextSibling);
        }
      });
    },
    detach : function validatedRemove(selector) {
      return this.remove(selector, true);
    },
    domManip : function init(args, table, callback) {
      /** @type {!Array<?>} */
      args = concat.apply([], args);
      var parent;
      var elem;
      var len;
      var context;
      var document;
      var node;
      /** @type {number} */
      var i = 0;
      var l = this.length;
      var allDayAppointments = this;
      /** @type {number} */
      var iNoClone = l - 1;
      var value = args[0];
      var oldCondition = jQuery.isFunction(value);
      if (oldCondition || !(1 >= l || "string" != typeof value || jQuery.support.checkClone) && _tacet.test(value)) {
        return this.each(function(i) {
          var test = allDayAppointments.eq(i);
          if (oldCondition) {
            args[0] = value.call(this, i, table ? test.html() : undefined);
          }
          test.domManip(args, table, callback);
        });
      }
      if (l && (node = jQuery.buildFragment(args, this[0].ownerDocument, false, this), parent = node.firstChild, 1 === node.childNodes.length && (node = parent), parent)) {
        table = table && jQuery.nodeName(parent, "tr");
        context = jQuery.map(getAll(node, "script"), disableScript);
        len = context.length;
        for (; l > i; i++) {
          elem = node;
          if (i !== iNoClone) {
            elem = jQuery.clone(elem, true, true);
            if (len) {
              jQuery.merge(context, getAll(elem, "script"));
            }
          }
          callback.call(table && jQuery.nodeName(this[i], "table") ? query(this[i], "tbody") : this[i], elem, i);
        }
        if (len) {
          document = context[context.length - 1].ownerDocument;
          jQuery.map(context, restoreScript);
          /** @type {number} */
          i = 0;
          for (; len > i; i++) {
            elem = context[i];
            if (opacityRe.test(elem.type || "") && !jQuery._data(elem, "globalEval") && jQuery.contains(document, elem)) {
              if (elem.src) {
                jQuery.ajax({
                  url : elem.src,
                  type : "GET",
                  dataType : "script",
                  async : false,
                  global : false,
                  "throws" : true
                });
              } else {
                jQuery.globalEval((elem.text || elem.textContent || elem.innerHTML || "").replace(rcleanScript, ""));
              }
            }
          }
        }
        /** @type {null} */
        node = parent = null;
      }
      return this;
    }
  });
  jQuery.each({
    appendTo : "append",
    prependTo : "prepend",
    insertBefore : "before",
    insertAfter : "after",
    replaceAll : "replaceWith"
  }, function(original, n) {
    /**
     * @param {?} selector
     * @return {?}
     */
    jQuery.fn[original] = function(selector) {
      var what;
      /** @type {number} */
      var i = 0;
      /** @type {!Array} */
      var ret = [];
      var insert = jQuery(selector);
      /** @type {number} */
      var last = insert.length - 1;
      for (; last >= i; i++) {
        what = i === last ? this : this.clone(true);
        jQuery(insert[i])[n](what);
        push.apply(ret, what.get());
      }
      return this.pushStack(ret);
    };
  });
  jQuery.extend({
    clone : function remove(elem, container, p) {
      var destElements;
      var node;
      var clone;
      var i;
      var srcElements;
      var inPage = jQuery.contains(elem.ownerDocument, elem);
      if (jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !name.test("<" + elem.nodeName + ">") ? clone = elem.cloneNode(true) : (fragmentDiv.innerHTML = elem.outerHTML, fragmentDiv.removeChild(clone = fragmentDiv.firstChild)), !(jQuery.support.noCloneEvent && jQuery.support.noCloneChecked || 1 !== elem.nodeType && 11 !== elem.nodeType || jQuery.isXMLDoc(elem))) {
        destElements = getAll(clone);
        srcElements = getAll(elem);
        /** @type {number} */
        i = 0;
        for (; null != (node = srcElements[i]); ++i) {
          if (destElements[i]) {
            fixCloneNodeIssues(node, destElements[i]);
          }
        }
      }
      if (container) {
        if (p) {
          srcElements = srcElements || getAll(elem);
          destElements = destElements || getAll(clone);
          /** @type {number} */
          i = 0;
          for (; null != (node = srcElements[i]); i++) {
            cloneCopyEvent(node, destElements[i]);
          }
        } else {
          cloneCopyEvent(elem, clone);
        }
      }
      return destElements = getAll(clone, "script"), destElements.length > 0 && setGlobalEval(destElements, !inPage && getAll(elem, "script")), destElements = srcElements = node = null, clone;
    },
    buildFragment : function render(args, context, result, elems) {
      var j;
      var elem;
      var ret;
      var tmp;
      var tag;
      var tbody;
      var wrap;
      var l = args.length;
      var safe = createSafeFragment(context);
      /** @type {!Array} */
      var nodes = [];
      /** @type {number} */
      var i = 0;
      for (; l > i; i++) {
        if (elem = args[i], elem || 0 === elem) {
          if ("object" === jQuery.type(elem)) {
            jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
          } else {
            if (re_commas.test(elem)) {
              tmp = tmp || safe.appendChild(context.createElement("div"));
              tag = (GoogleImageLayout.exec(elem) || ["", ""])[1].toLowerCase();
              wrap = wrapMap[tag] || wrapMap._default;
              tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, "<$1></$2>") + wrap[2];
              j = wrap[0];
              for (; j--;) {
                tmp = tmp.lastChild;
              }
              if (!jQuery.support.leadingWhitespace && trueRE.test(elem) && nodes.push(context.createTextNode(trueRE.exec(elem)[0])), !jQuery.support.tbody) {
                elem = "table" !== tag || reKeyword.test(elem) ? "<table>" !== wrap[1] || reKeyword.test(elem) ? 0 : tmp : tmp.firstChild;
                j = elem && elem.childNodes.length;
                for (; j--;) {
                  if (jQuery.nodeName(tbody = elem.childNodes[j], "tbody") && !tbody.childNodes.length) {
                    elem.removeChild(tbody);
                  }
                }
              }
              jQuery.merge(nodes, tmp.childNodes);
              /** @type {string} */
              tmp.textContent = "";
              for (; tmp.firstChild;) {
                tmp.removeChild(tmp.firstChild);
              }
              tmp = safe.lastChild;
            } else {
              nodes.push(context.createTextNode(elem));
            }
          }
        }
      }
      if (tmp) {
        safe.removeChild(tmp);
      }
      if (!jQuery.support.appendChecked) {
        jQuery.grep(getAll(nodes, "input"), fixDefaultChecked);
      }
      /** @type {number} */
      i = 0;
      for (; elem = nodes[i++];) {
        if ((!elems || -1 === jQuery.inArray(elem, elems)) && (ret = jQuery.contains(elem.ownerDocument, elem), tmp = getAll(safe.appendChild(elem), "script"), ret && setGlobalEval(tmp), result)) {
          /** @type {number} */
          j = 0;
          for (; elem = tmp[j++];) {
            if (opacityRe.test(elem.type || "")) {
              result.push(elem);
            }
          }
        }
      }
      return tmp = null, safe;
    },
    cleanData : function handler(tmp, type) {
      var elem;
      var type;
      var id;
      var data;
      /** @type {number} */
      var i = 0;
      var internalKey = jQuery.expando;
      var cache = jQuery.cache;
      var deleteExpando = jQuery.support.deleteExpando;
      var special = jQuery.event.special;
      for (; null != (elem = tmp[i]); i++) {
        if ((type || jQuery.acceptData(elem)) && (id = elem[internalKey], data = id && cache[id])) {
          if (data.events) {
            for (type in data.events) {
              if (special[type]) {
                jQuery.event.remove(elem, type);
              } else {
                jQuery.removeEvent(elem, type, data.handle);
              }
            }
          }
          if (cache[id]) {
            delete cache[id];
            if (deleteExpando) {
              delete elem[internalKey];
            } else {
              if (_typeof(elem.removeAttribute) !== strundefined) {
                elem.removeAttribute(internalKey);
              } else {
                /** @type {null} */
                elem[internalKey] = null;
              }
            }
            arr.push(id);
          }
        }
      }
    }
  });
  var iframe;
  var getStyles;
  var getWH;
  /** @type {!RegExp} */
  var re = /alpha\([^)]*\)/i;
  /** @type {!RegExp} */
  var flashFilenameRegex = /opacity\s*=\s*([^)]*)/;
  /** @type {!RegExp} */
  var DEFERRED_PREFIX = /^(top|right|bottom|left)$/;
  /** @type {!RegExp} */
  var rdisplayswap = /^(none|table(?!-c[ea]).+)/;
  /** @type {!RegExp} */
  var namespaces = /^margin/;
  /** @type {!RegExp} */
  var r = RegExp("^(" + FSSource + ")(.*)$", "i");
  /** @type {!RegExp} */
  var pre = RegExp("^(" + FSSource + ")(?!px)[a-z%]+$", "i");
  /** @type {!RegExp} */
  var regex = RegExp("^([+-])=(" + FSSource + ")", "i");
  var nodes = {
    BODY : "block"
  };
  var props = {
    position : "absolute",
    visibility : "hidden",
    display : "block"
  };
  var cssNormalTransform = {
    letterSpacing : 0,
    fontWeight : 400
  };
  /** @type {!Array} */
  var cssExpand = ["Top", "Right", "Bottom", "Left"];
  /** @type {!Array} */
  var prefixes = ["Webkit", "O", "Moz", "ms"];
  jQuery.fn.extend({
    css : function add(name, value) {
      return jQuery.access(this, function(elem, name, value) {
        var l;
        var styles;
        var map = {};
        /** @type {number} */
        var i = 0;
        if (jQuery.isArray(name)) {
          styles = getStyles(elem);
          l = name.length;
          for (; l > i; i++) {
            map[name[i]] = jQuery.css(elem, name[i], false, styles);
          }
          return map;
        }
        return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
      }, name, value, arguments.length > 1);
    },
    show : function hide() {
      return showHide(this, true);
    },
    hide : function hide() {
      return showHide(this);
    },
    toggle : function setupPasswords(input) {
      /** @type {boolean} */
      var widget = "boolean" == typeof input;
      return this.each(function() {
        if (widget ? input : show(this)) {
          jQuery(this).show();
        } else {
          jQuery(this).hide();
        }
      });
    }
  });
  jQuery.extend({
    cssHooks : {
      opacity : {
        get : function layout(node, target) {
          if (target) {
            var val = getWH(node, "opacity");
            return "" === val ? "1" : val;
          }
        }
      }
    },
    cssNumber : {
      columnCount : true,
      fillOpacity : true,
      fontWeight : true,
      lineHeight : true,
      opacity : true,
      orphans : true,
      widows : true,
      zIndex : true,
      zoom : true
    },
    cssProps : {
      "float" : jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
    },
    style : function init(data, name, value, obj) {
      if (data && 3 !== data.nodeType && 8 !== data.nodeType && data.style) {
        var result;
        var valueType;
        var hooks;
        var origName = jQuery.camelCase(name);
        var style = data.style;
        if (name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName)), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], value === undefined) {
          return hooks && "get" in hooks && (result = hooks.get(data, false, obj)) !== undefined ? result : style[name];
        }
        if (valueType = typeof value === "undefined" ? "undefined" : _typeof(value), "string" === valueType && (result = regex.exec(value)) && (value = (result[1] + 1) * result[2] + parseFloat(jQuery.css(data, name)), valueType = "number"), !(null == value || "number" === valueType && isNaN(value) || ("number" !== valueType || jQuery.cssNumber[origName] || (value = value + "px"), 
        jQuery.support.clearCloneStyle || "" !== value || 0 !== name.indexOf("background") || (style[name] = "inherit"), hooks && "set" in hooks && (value = hooks.set(data, value, obj)) === undefined))) {
          try {
            /** @type {string} */
            style[name] = value;
          } catch (c) {
          }
        }
      }
    },
    css : function css(elem, name, value, styles) {
      var data;
      var val;
      var hooks;
      var origName = jQuery.camelCase(name);
      return name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName)), hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName], hooks && "get" in hooks && (val = hooks.get(elem, true, value)), val === undefined && (val = getWH(elem, name, styles)), "normal" === val && name in cssNormalTransform && 
      (val = cssNormalTransform[name]), "" === value || value ? (data = parseFloat(val), value === true || jQuery.isNumeric(data) ? data || 0 : val) : val;
    },
    swap : function swap(elem, options, callback, args) {
      var ret;
      var k;
      var rpcAPI = {};
      for (k in options) {
        rpcAPI[k] = elem.style[k];
        elem.style[k] = options[k];
      }
      ret = callback.apply(elem, args || []);
      for (k in options) {
        elem.style[k] = rpcAPI[k];
      }
      return ret;
    }
  });
  if (window.getComputedStyle) {
    /**
     * @param {!Object} text
     * @return {?}
     */
    getStyles = function getStyles(text) {
      return window.getComputedStyle(text, null);
    };
    /**
     * @param {!Object} elem
     * @param {string} name
     * @param {!Object} _computed
     * @return {?}
     */
    getWH = function curCSS(elem, name, _computed) {
      var minWidth;
      var width;
      var maxWidth;
      var computed = _computed || getStyles(elem);
      var ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined;
      var style = elem.style;
      return computed && ("" !== ret || jQuery.contains(elem.ownerDocument, elem) || (ret = jQuery.style(elem, name)), pre.test(ret) && namespaces.test(name) && (minWidth = style.width, width = style.minWidth, maxWidth = style.maxWidth, style.minWidth = style.maxWidth = style.width = ret, ret = computed.width, style.width = minWidth, 
      style.minWidth = width, style.maxWidth = maxWidth)), ret;
    };
  } else {
    if (document.documentElement.currentStyle) {
      /**
       * @param {!Object} elem
       * @return {?}
       */
      getStyles = function getStyles(elem) {
        return elem.currentStyle;
      };
      /**
       * @param {!HTMLElement} elem
       * @param {string} prop
       * @param {!Object} computed
       * @return {?}
       */
      getWH = function curCSS(elem, prop, computed) {
        var left;
        var rs;
        var rsLeft;
        var obj = computed || getStyles(elem);
        var val = obj ? obj[prop] : undefined;
        var style = elem.style;
        return null == val && style && style[prop] && (val = style[prop]), pre.test(val) && !DEFERRED_PREFIX.test(prop) && (left = style.left, rs = elem.runtimeStyle, rsLeft = rs && rs.left, rsLeft && (rs.left = elem.currentStyle.left), style.left = "fontSize" === prop ? "1em" : val, val = style.pixelLeft + 
        "px", style.left = left, rsLeft && (rs.left = rsLeft)), "" === val ? "auto" : val;
      };
    }
  }
  jQuery.each(["height", "width"], function(canCreateDiscussions, prop) {
    jQuery.cssHooks[prop] = {
      get : function get(elem, name, target) {
        return name ? 0 === elem.offsetWidth && rdisplayswap.test(jQuery.css(elem, "display")) ? jQuery.swap(elem, props, function() {
          return getWidthOrHeight(elem, prop, target);
        }) : getWidthOrHeight(elem, prop, target) : undefined;
      },
      set : function getWidthOrHeight(elem, name, extra) {
        var styles = extra && getStyles(elem);
        return fn(elem, name, extra ? augmentWidthOrHeight(elem, prop, extra, jQuery.support.boxSizing && "border-box" === jQuery.css(elem, "boxSizing", false, styles), styles) : 0);
      }
    };
  });
  if (!jQuery.support.opacity) {
    jQuery.cssHooks.opacity = {
      get : function _getIEOpacity(v, filter) {
        return flashFilenameRegex.test((filter && v.currentStyle ? v.currentStyle.filter : v.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : filter ? "1" : "";
      },
      set : function set(elem, value) {
        var style = elem.style;
        var currentStyle = elem.currentStyle;
        /** @type {string} */
        var params = jQuery.isNumeric(value) ? "alpha(opacity=" + 100 * value + ")" : "";
        var url = currentStyle && currentStyle.filter || style.filter || "";
        /** @type {number} */
        style.zoom = 1;
        if (!((value >= 1 || "" === value) && "" === jQuery.trim(url.replace(re, "")) && style.removeAttribute && (style.removeAttribute("filter"), "" === value || currentStyle && !currentStyle.filter))) {
          style.filter = re.test(url) ? url.replace(re, params) : url + " " + params;
        }
      }
    };
  }
  jQuery(function() {
    if (!jQuery.support.reliableMarginRight) {
      jQuery.cssHooks.marginRight = {
        get : function update(elem, value) {
          return value ? jQuery.swap(elem, {
            display : "inline-block"
          }, getWH, [elem, "marginRight"]) : undefined;
        }
      };
    }
    if (!jQuery.support.pixelPosition && jQuery.fn.position) {
      jQuery.each(["top", "left"], function(canCreateDiscussions, name) {
        jQuery.cssHooks[name] = {
          get : function layout(node, val) {
            return val ? (val = getWH(node, name), pre.test(val) ? jQuery(node).position()[name] + "px" : val) : undefined;
          }
        };
      });
    }
  });
  if (jQuery.expr && jQuery.expr.filters) {
    /**
     * @param {!Object} a
     * @return {?}
     */
    jQuery.expr.filters.hidden = function(a) {
      return 0 >= a.offsetWidth && 0 >= a.offsetHeight || !jQuery.support.reliableHiddenOffsets && "none" === (a.style && a.style.display || jQuery.css(a, "display"));
    };
    /**
     * @param {undefined} el
     * @return {?}
     */
    jQuery.expr.filters.visible = function(el) {
      return !jQuery.expr.filters.hidden(el);
    };
  }
  jQuery.each({
    margin : "",
    padding : "",
    border : "Width"
  }, function(prefix, suffix) {
    jQuery.cssHooks[prefix + suffix] = {
      expand : function visit(val) {
        /** @type {number} */
        var i = 0;
        var expanded = {};
        /** @type {!Array} */
        var stops = "string" == typeof val ? val.split(" ") : [val];
        for (; 4 > i; i++) {
          expanded[prefix + cssExpand[i] + suffix] = stops[i] || stops[i - 2] || stops[0];
        }
        return expanded;
      }
    };
    if (!namespaces.test(prefix)) {
      /** @type {function(!Object, string, string): ?} */
      jQuery.cssHooks[prefix + suffix].set = fn;
    }
  });
  /** @type {!RegExp} */
  var regNewline = /%20/g;
  /** @type {!RegExp} */
  var VALID_IDENTIFIER_EXPR = /\[\]$/;
  /** @type {!RegExp} */
  var reVowels = /\r?\n/g;
  /** @type {!RegExp} */
  var reHasHexPrefix = /^(?:submit|button|image|reset|file)$/i;
  /** @type {!RegExp} */
  var rsubmittable = /^(?:input|select|textarea|keygen)/i;
  jQuery.fn.extend({
    serialize : function param() {
      return jQuery.param(this.serializeArray());
    },
    serializeArray : function refresh() {
      return this.map(function() {
        var elements = jQuery.prop(this, "elements");
        return elements ? jQuery.makeArray(elements) : this;
      }).filter(function() {
        var string = this.type;
        return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !reHasHexPrefix.test(string) && (this.checked || !reg.test(string));
      }).map(function(canCreateDiscussions, ctlParams) {
        var val = jQuery(this).val();
        return null == val ? null : jQuery.isArray(val) ? jQuery.map(val, function(val) {
          return {
            name : ctlParams.name,
            value : val.replace(reVowels, "\r\n")
          };
        }) : {
          name : ctlParams.name,
          value : val.replace(reVowels, "\r\n")
        };
      }).get();
    }
  });
  /**
   * @param {?} data
   * @param {string} handler
   * @return {?}
   */
  jQuery.param = function(data, handler) {
    var type;
    /** @type {!Array} */
    var displayUsedBy = [];
    /**
     * @param {?} e
     * @param {string} value
     * @return {undefined}
     */
    var add = function add(e, value) {
      value = jQuery.isFunction(value) ? value() : null == value ? "" : value;
      /** @type {string} */
      displayUsedBy[displayUsedBy.length] = encodeURIComponent(e) + "=" + encodeURIComponent(value);
    };
    if (handler === undefined && (handler = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional), jQuery.isArray(data) || data.jquery && !jQuery.isPlainObject(data)) {
      jQuery.each(data, function() {
        add(this.name, this.value);
      });
    } else {
      for (type in data) {
        callback(type, data[type], handler, add);
      }
    }
    return displayUsedBy.join("&").replace(regNewline, "+");
  };
  jQuery.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(canCreateDiscussions, type) {
    /**
     * @param {!Function} args
     * @param {!Object} callback
     * @return {?}
     */
    jQuery.fn[type] = function(args, callback) {
      return arguments.length > 0 ? this.on(type, null, args, callback) : this.trigger(type);
    };
  });
  /**
   * @param {boolean} fnOver
   * @param {number} fnOut
   * @return {?}
   */
  jQuery.fn.hover = function(fnOver, fnOut) {
    return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
  };
  var path;
  var ajaxLocation;
  var widgetUniqueIDIndex = jQuery.now();
  /** @type {!RegExp} */
  var rquery = /\?/;
  /** @type {!RegExp} */
  var savedRegExp = /#.*$/;
  /** @type {!RegExp} */
  var rts = /([?&])_=[^&]*/;
  /** @type {!RegExp} */
  var multipartRegExp = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm;
  /** @type {!RegExp} */
  var Observable = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/;
  /** @type {!RegExp} */
  var loader = /^(?:GET|HEAD)$/;
  /** @type {!RegExp} */
  var jsre = /^\/\//;
  /** @type {!RegExp} */
  var moveRegex = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/;
  /** @type {function(string, !Array, !Array): ?} */
  var proxyStoreLoad = jQuery.fn.load;
  var prefilters = {};
  var transports = {};
  /** @type {string} */
  var Dn = "*/".concat("*");
  try {
    /** @type {string} */
    ajaxLocation = location.href;
  } catch (Ln) {
    ajaxLocation = document.createElement("a");
    /** @type {string} */
    ajaxLocation.href = "";
    /** @type {string} */
    ajaxLocation = ajaxLocation.href;
  }
  /** @type {!Array} */
  path = moveRegex.exec(ajaxLocation.toLowerCase()) || [];
  /**
   * @param {string} url
   * @param {!Array} value
   * @param {!Array} label
   * @return {?}
   */
  jQuery.fn.load = function(url, value, label) {
    if ("string" != typeof url && proxyStoreLoad) {
      return proxyStoreLoad.apply(this, arguments);
    }
    var selector;
    var response;
    var type;
    var self = this;
    var pos = url.indexOf(" ");
    return pos >= 0 && (selector = url.slice(pos, url.length), url = url.slice(0, pos)), jQuery.isFunction(value) ? (label = value, value = undefined) : value && "object" == (typeof value === "undefined" ? "undefined" : _typeof(value)) && (type = "POST"), self.length > 0 && jQuery.ajax({
      url : url,
      type : type,
      dataType : "html",
      data : value
    }).done(function(responseText) {
      /** @type {!Arguments} */
      response = arguments;
      self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
    }).complete(label && function(a, key) {
      self.each(label, response || [a.responseText, key, a]);
    }), this;
  };
  jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(canCreateDiscussions, type) {
    /**
     * @param {!Function} e
     * @return {?}
     */
    jQuery.fn[type] = function(e) {
      return this.on(type, e);
    };
  });
  jQuery.each(["get", "post"], function(canCreateDiscussions, method) {
    /**
     * @param {string} logErrorUrl
     * @param {!Object} v
     * @param {!Object} s
     * @param {!Object} o
     * @return {?}
     */
    jQuery[method] = function(logErrorUrl, v, s, o) {
      return jQuery.isFunction(v) && (o = o || s, s = v, v = undefined), jQuery.ajax({
        url : logErrorUrl,
        type : method,
        dataType : o,
        data : v,
        success : s
      });
    };
  });
  jQuery.extend({
    active : 0,
    lastModified : {},
    etag : {},
    ajaxSettings : {
      url : ajaxLocation,
      type : "GET",
      isLocal : Observable.test(path[1]),
      global : true,
      processData : true,
      async : true,
      contentType : "application/x-www-form-urlencoded; charset=UTF-8",
      accepts : {
        "*" : Dn,
        text : "text/plain",
        html : "text/html",
        xml : "application/xml, text/xml",
        json : "application/json, text/javascript"
      },
      contents : {
        xml : /xml/,
        html : /html/,
        json : /json/
      },
      responseFields : {
        xml : "responseXML",
        text : "responseText"
      },
      converters : {
        "* text" : window.String,
        "text html" : true,
        "text json" : jQuery.parseJSON,
        "text xml" : jQuery.parseXML
      },
      flatOptions : {
        url : true,
        context : true
      }
    },
    ajaxSetup : function ajaxSetup(target, settings) {
      return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
    },
    ajaxPrefilter : addToPrefiltersOrTransports(prefilters),
    ajaxTransport : addToPrefiltersOrTransports(transports),
    ajax : function init(url, options) {
      /**
       * @param {number} status
       * @param {!Object} nativeStatusText
       * @param {!Array} responses
       * @param {!Object} headers
       * @return {undefined}
       */
      function done(status, nativeStatusText, responses, headers) {
        var isSuccess;
        var success;
        var error;
        var response;
        var modified;
        /** @type {!Object} */
        var statusText = nativeStatusText;
        if (2 !== OBJECT$1) {
          /** @type {number} */
          OBJECT$1 = 2;
          if (_takingTooLongTimeout) {
            clearTimeout(_takingTooLongTimeout);
          }
          /** @type {!Object} */
          transport = undefined;
          name = headers || "";
          /** @type {number} */
          jqXHR.readyState = status > 0 ? 4 : 0;
          if (responses) {
            response = ajaxHandleResponses(s, jqXHR, responses);
          }
          if (status >= 200 && 300 > status || 304 === status) {
            if (s.ifModified) {
              modified = jqXHR.getResponseHeader("Last-Modified");
              if (modified) {
                jQuery.lastModified[cacheURL] = modified;
              }
              modified = jqXHR.getResponseHeader("etag");
              if (modified) {
                jQuery.etag[cacheURL] = modified;
              }
            }
            if (204 === status) {
              /** @type {boolean} */
              isSuccess = true;
              /** @type {string} */
              statusText = "nocontent";
            } else {
              if (304 === status) {
                /** @type {boolean} */
                isSuccess = true;
                /** @type {string} */
                statusText = "notmodified";
              } else {
                isSuccess = ajaxConvert(s, response);
                statusText = isSuccess.state;
                success = isSuccess.data;
                error = isSuccess.error;
                /** @type {boolean} */
                isSuccess = !error;
              }
            }
          } else {
            error = statusText;
            if (status || !statusText) {
              /** @type {string} */
              statusText = "error";
              if (0 > status) {
                /** @type {number} */
                status = 0;
              }
            }
          }
          /** @type {number} */
          jqXHR.status = status;
          /** @type {string} */
          jqXHR.statusText = (nativeStatusText || statusText) + "";
          if (isSuccess) {
            deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
          } else {
            deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
          }
          jqXHR.statusCode(link);
          /** @type {!Object} */
          link = undefined;
          if (g) {
            globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
          }
          completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
          if (g) {
            globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
            if (!--jQuery.active) {
              jQuery.event.trigger("ajaxStop");
            }
          }
        }
      }
      if ("object" == (typeof url === "undefined" ? "undefined" : _typeof(url))) {
        /** @type {(Object|string)} */
        options = url;
        /** @type {!Object} */
        url = undefined;
      }
      options = options || {};
      var toPath;
      var i;
      var cacheURL;
      var name;
      var _takingTooLongTimeout;
      var g;
      var transport;
      var args;
      var s = jQuery.ajaxSetup({}, options);
      var callbackContext = s.context || s;
      var globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event;
      var deferred = jQuery.Deferred();
      var completeDeferred = jQuery.Callbacks("once memory");
      var link = s.statusCode || {};
      var data = {};
      var requestHeadersNames = {};
      /** @type {number} */
      var OBJECT$1 = 0;
      /** @type {string} */
      var status = "canceled";
      var jqXHR = {
        readyState : 0,
        getResponseHeader : function getEventFromListenerAttr_(header) {
          var v;
          if (2 === OBJECT$1) {
            if (!args) {
              args = {};
              for (; v = multipartRegExp.exec(name);) {
                /** @type {string} */
                args[v[1].toLowerCase()] = v[2];
              }
            }
            v = args[header.toLowerCase()];
          }
          return null == v ? null : v;
        },
        getAllResponseHeaders : function disablemouse() {
          return 2 === OBJECT$1 ? name : null;
        },
        setRequestHeader : function setRequestHeader(name, value) {
          var lname = name.toLowerCase();
          return OBJECT$1 || (name = requestHeadersNames[lname] = requestHeadersNames[lname] || name, data[name] = value), this;
        },
        overrideMimeType : function createItem(type) {
          return OBJECT$1 || (s.mimeType = type), this;
        },
        statusCode : function populateRouteTable(data) {
          var type;
          if (data) {
            if (2 > OBJECT$1) {
              for (type in data) {
                /** @type {!Array} */
                link[type] = [link[type], data[type]];
              }
            } else {
              jqXHR.always(data[jqXHR.status]);
            }
          }
          return this;
        },
        abort : function abort(type) {
          var statusText = type || status;
          return transport && transport.abort(statusText), done(0, statusText), this;
        }
      };
      if (deferred.promise(jqXHR).complete = completeDeferred.add, jqXHR.success = jqXHR.done, jqXHR.error = jqXHR.fail, s.url = ((url || s.url || ajaxLocation) + "").replace(savedRegExp, "").replace(jsre, path[1] + "//"), s.type = options.method || options.type || s.method || s.type, s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || 
      [""], null == s.crossDomain && (toPath = moveRegex.exec(s.url.toLowerCase()), s.crossDomain = !(!toPath || toPath[1] === path[1] && toPath[2] === path[2] && (toPath[3] || ("http:" === toPath[1] ? 80 : 443)) == (path[3] || ("http:" === path[1] ? 80 : 443)))), s.data && s.processData && "string" != typeof s.data && (s.data = jQuery.param(s.data, 
      s.traditional)), inspectPrefiltersOrTransports(prefilters, s, options, jqXHR), 2 === OBJECT$1) {
        return jqXHR;
      }
      g = s.global;
      if (g && 0 === jQuery.active++) {
        jQuery.event.trigger("ajaxStart");
      }
      s.type = s.type.toUpperCase();
      /** @type {boolean} */
      s.hasContent = !loader.test(s.type);
      cacheURL = s.url;
      if (!s.hasContent) {
        if (s.data) {
          /** @type {string} */
          cacheURL = s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data;
          delete s.data;
        }
        if (s.cache === false) {
          s.url = rts.test(cacheURL) ? cacheURL.replace(rts, "$1_=" + widgetUniqueIDIndex++) : cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + widgetUniqueIDIndex++;
        }
      }
      if (s.ifModified) {
        if (jQuery.lastModified[cacheURL]) {
          jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
        }
        if (jQuery.etag[cacheURL]) {
          jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
        }
      }
      if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
        jqXHR.setRequestHeader("Content-Type", s.contentType);
      }
      jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + ("*" !== s.dataTypes[0] ? ", " + Dn + "; q=0.01" : "") : s.accepts["*"]);
      for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i]);
      }
      if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || 2 === OBJECT$1)) {
        return jqXHR.abort();
      }
      /** @type {string} */
      status = "abort";
      for (i in{
        success : 1,
        error : 1,
        complete : 1
      }) {
        jqXHR[i](s[i]);
      }
      if (transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR)) {
        /** @type {number} */
        jqXHR.readyState = 1;
        if (g) {
          globalEventContext.trigger("ajaxSend", [jqXHR, s]);
        }
        if (s.async && s.timeout > 0) {
          /** @type {number} */
          _takingTooLongTimeout = setTimeout(function() {
            jqXHR.abort("timeout");
          }, s.timeout);
        }
        try {
          /** @type {number} */
          OBJECT$1 = 1;
          transport.send(data, done);
        } catch (success) {
          if (!(2 > OBJECT$1)) {
            throw success;
          }
          done(-1, success);
        }
      } else {
        done(-1, "No Transport");
      }
      return jqXHR;
    },
    getScript : function getScript(fn, name) {
      return jQuery.get(fn, undefined, name, "script");
    },
    getJSON : function _ResolveContext(id, t, callback) {
      return jQuery.get(id, t, callback, "json");
    }
  });
  jQuery.ajaxSetup({
    accepts : {
      script : "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents : {
      script : /(?:java|ecma)script/
    },
    converters : {
      "text script" : function replaceWith(value) {
        return jQuery.globalEval(value), value;
      }
    }
  });
  jQuery.ajaxPrefilter("script", function(settings) {
    if (settings.cache === undefined) {
      /** @type {boolean} */
      settings.cache = false;
    }
    if (settings.crossDomain) {
      /** @type {string} */
      settings.type = "GET";
      /** @type {boolean} */
      settings.global = false;
    }
  });
  jQuery.ajaxTransport("script", function(s) {
    if (s.crossDomain) {
      var script;
      var head = document.head || jQuery("head")[0] || document.documentElement;
      return {
        send : function jsonp(data, cb) {
          script = document.createElement("script");
          /** @type {boolean} */
          script.async = true;
          if (s.scriptCharset) {
            script.charset = s.scriptCharset;
          }
          script.src = s.url;
          /** @type {function(!Function, string): undefined} */
          script.onload = script.onreadystatechange = function(data, name) {
            if (name || !script.readyState || /loaded|complete/.test(script.readyState)) {
              /** @type {null} */
              script.onload = script.onreadystatechange = null;
              if (script.parentNode) {
                script.parentNode.removeChild(script);
              }
              /** @type {null} */
              script = null;
              if (!name) {
                cb(200, "success");
              }
            }
          };
          head.insertBefore(script, head.firstChild);
        },
        abort : function onMappingTableLoadFn() {
          if (script) {
            script.onload(undefined, true);
          }
        }
      };
    }
  });
  /** @type {!Array} */
  var oldCallbacks = [];
  /** @type {!RegExp} */
  var rjsonp = /(=)\?(?=&|$)|\?\?/;
  jQuery.ajaxSetup({
    jsonp : "callback",
    jsonpCallback : function poll() {
      var indexLookupKey = oldCallbacks.pop() || jQuery.expando + "_" + widgetUniqueIDIndex++;
      return this[indexLookupKey] = true, indexLookupKey;
    }
  });
  jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, scanners) {
    var callbackName;
    var overwritten;
    var responseContainer;
    /** @type {(boolean|string)} */
    var jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : "string" == typeof s.data && !(s.contentType || "").indexOf("application/x-www-form-urlencoded") && rjsonp.test(s.data) && "data");
    return jsonProp || "jsonp" === s.dataTypes[0] ? (callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback, jsonProp ? s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName) : s.jsonp !== false && (s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName), s.converters["script json"] = 
    function() {
      return responseContainer || jQuery.error(callbackName + " was not called"), responseContainer[0];
    }, s.dataTypes[0] = "json", overwritten = window[callbackName], window[callbackName] = function() {
      /** @type {!Arguments} */
      responseContainer = arguments;
    }, scanners.always(function() {
      window[callbackName] = overwritten;
      if (s[callbackName]) {
        s.jsonpCallback = originalSettings.jsonpCallback;
        oldCallbacks.push(callbackName);
      }
      if (responseContainer && jQuery.isFunction(overwritten)) {
        overwritten(responseContainer[0]);
      }
      responseContainer = overwritten = undefined;
    }), "script") : undefined;
  });
  var ref;
  var xmlHttp;
  /** @type {number} */
  var _i = 0;
  var removeValuesOnExit = window.ActiveXObject && function() {
    var name;
    for (name in ref) {
      ref[name](undefined, true);
    }
  };
  /** @type {function(): ?} */
  jQuery.ajaxSettings.xhr = window.ActiveXObject ? function() {
    return !this.isLocal && createStandardXHR() || getNewXmlHttpRequest();
  } : createStandardXHR;
  xmlHttp = jQuery.ajaxSettings.xhr();
  /** @type {boolean} */
  jQuery.support.cors = !!xmlHttp && "withCredentials" in xmlHttp;
  /** @type {boolean} */
  xmlHttp = jQuery.support.ajax = !!xmlHttp;
  if (xmlHttp) {
    jQuery.ajaxTransport(function(options) {
      if (!options.crossDomain || jQuery.support.cors) {
        var callback;
        return {
          send : function ajax(headers, callback) {
            var i;
            var name;
            var xhr = options.xhr();
            if (options.username ? xhr.open(options.type, options.url, options.async, options.username, options.password) : xhr.open(options.type, options.url, options.async), options.xhrFields) {
              for (name in options.xhrFields) {
                xhr[name] = options.xhrFields[name];
              }
            }
            if (options.mimeType && xhr.overrideMimeType) {
              xhr.overrideMimeType(options.mimeType);
            }
            if (!(options.crossDomain || headers["X-Requested-With"])) {
              /** @type {string} */
              headers["X-Requested-With"] = "XMLHttpRequest";
            }
            try {
              for (name in headers) {
                xhr.setRequestHeader(name, headers[name]);
              }
            } catch (l) {
            }
            xhr.send(options.hasContent && options.data || null);
            /**
             * @param {!Function} name
             * @param {string} value
             * @return {undefined}
             */
            callback = function callback(name, value) {
              var _name;
              var orgCol;
              var statusText;
              var responses;
              try {
                if (callback && (value || 4 === xhr.readyState)) {
                  if (callback = undefined, i && (xhr.onreadystatechange = jQuery.noop, removeValuesOnExit && delete ref[i]), value) {
                    if (4 !== xhr.readyState) {
                      xhr.abort();
                    }
                  } else {
                    responses = {};
                    _name = xhr.status;
                    orgCol = xhr.getAllResponseHeaders();
                    if ("string" == typeof xhr.responseText) {
                      /** @type {string} */
                      responses.text = xhr.responseText;
                    }
                    try {
                      statusText = xhr.statusText;
                    } catch (f) {
                      /** @type {string} */
                      statusText = "";
                    }
                    if (_name || !options.isLocal || options.crossDomain) {
                      if (1223 === _name) {
                        /** @type {number} */
                        _name = 204;
                      }
                    } else {
                      /** @type {number} */
                      _name = responses.text ? 200 : 404;
                    }
                  }
                }
              } catch (warFilename) {
                if (!value) {
                  callback(-1, warFilename);
                }
              }
              if (responses) {
                callback(_name, statusText, responses, orgCol);
              }
            };
            if (options.async) {
              if (4 === xhr.readyState) {
                setTimeout(callback);
              } else {
                /** @type {number} */
                i = ++_i;
                if (removeValuesOnExit) {
                  if (!ref) {
                    ref = {};
                    jQuery(window).unload(removeValuesOnExit);
                  }
                  /** @type {function(!Function, string): undefined} */
                  ref[i] = callback;
                }
                /** @type {function(!Function, string): undefined} */
                xhr.onreadystatechange = callback;
              }
            } else {
              callback();
            }
          },
          abort : function extractPresetLocal() {
            if (callback) {
              callback(undefined, true);
            }
          }
        };
      }
    });
  }
  var fxNow;
  var initializeCheckTimer;
  /** @type {!RegExp} */
  var verRe = /^(?:toggle|show|hide)$/;
  /** @type {!RegExp} */
  var rx = RegExp("^(?:([+-])=|)(" + FSSource + ")([a-z%]*)$", "i");
  /** @type {!RegExp} */
  var rrun = /queueHooks$/;
  /** @type {!Array} */
  var animationPrefilters = [defaultPrefilter];
  var meta = {
    "*" : [function(prop, value) {
      var end;
      var unit;
      var tween = this.createTween(prop, value);
      /** @type {(Array<string>|null)} */
      var parts = rx.exec(value);
      var backingRatio = tween.cur();
      /** @type {number} */
      var start = +backingRatio || 0;
      /** @type {number} */
      var scale = 1;
      /** @type {number} */
      var l = 20;
      if (parts) {
        if (end = +parts[2], unit = parts[3] || (jQuery.cssNumber[prop] ? "" : "px"), "px" !== unit && start) {
          start = jQuery.css(tween.elem, prop, true) || end || 1;
          do {
            /** @type {(number|string)} */
            scale = scale || ".5";
            /** @type {number} */
            start = start / scale;
            jQuery.style(tween.elem, prop, start + unit);
          } while (scale !== (scale = tween.cur() / backingRatio) && 1 !== scale && --l);
        }
        /** @type {string} */
        tween.unit = unit;
        tween.start = start;
        tween.end = parts[1] ? start + (parts[1] + 1) * end : end;
      }
      return tween;
    }]
  };
  jQuery.Animation = jQuery.extend(Animation, {
    tweener : function _parseEndpoint(a, callback) {
      if (jQuery.isFunction(a)) {
        /** @type {!Object} */
        callback = a;
        /** @type {!Array} */
        a = ["*"];
      } else {
        a = a.split(" ");
      }
      var name;
      /** @type {number} */
      var y = 0;
      var x = a.length;
      for (; x > y; y++) {
        name = a[y];
        meta[name] = meta[name] || [];
        meta[name].unshift(callback);
      }
    },
    prefilter : function prefilter(callback, options) {
      if (options) {
        animationPrefilters.unshift(callback);
      } else {
        animationPrefilters.push(callback);
      }
    }
  });
  /** @type {function(?, string, string, string, boolean): ?} */
  jQuery.Tween = Tween;
  Tween.prototype = {
    constructor : Tween,
    init : function init(domElem, options, prop, end, easing, unit) {
      /** @type {!Element} */
      this.elem = domElem;
      /** @type {!Object} */
      this.prop = prop;
      this.easing = easing || "swing";
      /** @type {!Object} */
      this.options = options;
      this.start = this.now = this.cur();
      /** @type {number} */
      this.end = end;
      this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
    },
    cur : function _fetch() {
      var hooks = Tween.propHooks[this.prop];
      return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
    },
    run : function run(percent) {
      var eased;
      var hooks = Tween.propHooks[this.prop];
      return this.pos = eased = this.options.duration ? jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration) : percent, this.now = (this.end - this.start) * eased + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), hooks && hooks.set ? hooks.set(this) : Tween.propHooks._default.set(this), this;
    }
  };
  Tween.prototype.init.prototype = Tween.prototype;
  Tween.propHooks = {
    _default : {
      get : function get(data) {
        var charset;
        return null == data.elem[data.prop] || data.elem.style && null != data.elem.style[data.prop] ? (charset = jQuery.css(data.elem, data.prop, ""), charset && "auto" !== charset ? charset : 0) : data.elem[data.prop];
      },
      set : function set(tween) {
        if (jQuery.fx.step[tween.prop]) {
          jQuery.fx.step[tween.prop](tween);
        } else {
          if (tween.elem.style && (null != tween.elem.style[jQuery.cssProps[tween.prop]] || jQuery.cssHooks[tween.prop])) {
            jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
          } else {
            tween.elem[tween.prop] = tween.now;
          }
        }
      }
    }
  };
  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
    set : function set(target) {
      if (target.elem.nodeType && target.elem.parentNode) {
        target.elem[target.prop] = target.now;
      }
    }
  };
  jQuery.each(["toggle", "show", "hide"], function(canCreateDiscussions, name) {
    var cssFn = jQuery.fn[name];
    /**
     * @param {string} x
     * @param {string} callback
     * @param {string} options
     * @return {?}
     */
    jQuery.fn[name] = function(x, callback, options) {
      return null == x || "boolean" == typeof x ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), x, callback, options);
    };
  });
  jQuery.fn.extend({
    fadeTo : function animate(fn, val, delay, callback) {
      return this.filter(show).css("opacity", 0).show().end().animate({
        opacity : val
      }, fn, delay, callback);
    },
    animate : function animate(prop, speed, easing, callback) {
      var empty = jQuery.isEmptyObject(prop);
      var optall = jQuery.speed(speed, easing, callback);
      /**
       * @return {undefined}
       */
      var args = function doAnimation() {
        var anim = Animation(this, jQuery.extend({}, prop), optall);
        /**
         * @return {undefined}
         */
        doAnimation.finish = function() {
          anim.stop(true);
        };
        if (empty || jQuery._data(this, "finish")) {
          anim.stop(true);
        }
      };
      return args.finish = args, empty || optall.queue === false ? this.each(args) : this.queue(optall.queue, args);
    },
    stop : function init(type, value, e) {
      /**
       * @param {!Object} node
       * @return {undefined}
       */
      var printUpdate = function stop(node) {
        var s = node.stop;
        delete node.stop;
        s(e);
      };
      return "string" != typeof type && (e = value, value = type, type = undefined), value && type !== false && this.queue(type || "fx", []), this.each(function() {
        /** @type {boolean} */
        var locked = true;
        var index = null != type && type + "queueHooks";
        /** @type {!Array} */
        var timers = jQuery.timers;
        var data = jQuery._data(this);
        if (index) {
          if (data[index] && data[index].stop) {
            printUpdate(data[index]);
          }
        } else {
          for (index in data) {
            if (data[index] && data[index].stop && rrun.test(index)) {
              printUpdate(data[index]);
            }
          }
        }
        /** @type {number} */
        index = timers.length;
        for (; index--;) {
          if (!(timers[index].elem !== this || null != type && timers[index].queue !== type)) {
            timers[index].anim.stop(e);
            /** @type {boolean} */
            locked = false;
            timers.splice(index, 1);
          }
        }
        if (locked || !e) {
          jQuery.dequeue(this, type);
        }
      });
    },
    finish : function render(type) {
      return type !== false && (type = type || "fx"), this.each(function() {
        var index;
        var data = jQuery._data(this);
        var queue = data[type + "queue"];
        var hooks = data[type + "queueHooks"];
        /** @type {!Array} */
        var timers = jQuery.timers;
        var length = queue ? queue.length : 0;
        /** @type {boolean} */
        data.finish = true;
        jQuery.queue(this, type, []);
        if (hooks && hooks.cur && hooks.cur.finish) {
          hooks.cur.finish.call(this);
        }
        /** @type {number} */
        index = timers.length;
        for (; index--;) {
          if (timers[index].elem === this && timers[index].queue === type) {
            timers[index].anim.stop(true);
            timers.splice(index, 1);
          }
        }
        /** @type {number} */
        index = 0;
        for (; length > index; index++) {
          if (queue[index] && queue[index].finish) {
            queue[index].finish.call(this);
          }
        }
        delete data.finish;
      });
    }
  });
  jQuery.each({
    slideDown : genFx("show"),
    slideUp : genFx("hide"),
    slideToggle : genFx("toggle"),
    fadeIn : {
      opacity : "show"
    },
    fadeOut : {
      opacity : "hide"
    },
    fadeToggle : {
      opacity : "toggle"
    }
  }, function(original, props) {
    /**
     * @param {string} speed
     * @param {string} callback
     * @param {string} options
     * @return {?}
     */
    jQuery.fn[original] = function(speed, callback, options) {
      return this.animate(props, speed, callback, options);
    };
  });
  /**
   * @param {string} speed
   * @param {string} easing
   * @param {string} fn
   * @return {?}
   */
  jQuery.speed = function(speed, easing, fn) {
    var opt = speed && "object" == (typeof speed === "undefined" ? "undefined" : _typeof(speed)) ? jQuery.extend({}, speed) : {
      complete : fn || !fn && easing || jQuery.isFunction(speed) && speed,
      duration : speed,
      easing : fn && easing || easing && !jQuery.isFunction(easing) && easing
    };
    return opt.duration = jQuery.fx.off ? 0 : "number" == typeof opt.duration ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default, (null == opt.queue || opt.queue === true) && (opt.queue = "fx"), opt.old = opt.complete, opt.complete = function() {
      if (jQuery.isFunction(opt.old)) {
        opt.old.call(this);
      }
      if (opt.queue) {
        jQuery.dequeue(this, opt.queue);
      }
    }, opt;
  };
  jQuery.easing = {
    linear : function ensureSlashPath(p) {
      return p;
    },
    swing : function swing(p) {
      return .5 - Math.cos(p * Math.PI) / 2;
    }
  };
  /** @type {!Array} */
  jQuery.timers = [];
  /** @type {function(!Element, !Object, !Object, number, string, !Object): undefined} */
  jQuery.fx = Tween.prototype.init;
  /**
   * @return {undefined}
   */
  jQuery.fx.tick = function() {
    var timer;
    /** @type {!Array} */
    var timers = jQuery.timers;
    /** @type {number} */
    var i = 0;
    fxNow = jQuery.now();
    for (; timers.length > i; i++) {
      timer = timers[i];
      if (!(timer() || timers[i] !== timer)) {
        timers.splice(i--, 1);
      }
    }
    if (!timers.length) {
      jQuery.fx.stop();
    }
    /** @type {!Object} */
    fxNow = undefined;
  };
  /**
   * @param {?} timer
   * @return {undefined}
   */
  jQuery.fx.timer = function(timer) {
    if (timer() && jQuery.timers.push(timer)) {
      jQuery.fx.start();
    }
  };
  /** @type {number} */
  jQuery.fx.interval = 13;
  /**
   * @return {undefined}
   */
  jQuery.fx.start = function() {
    if (!initializeCheckTimer) {
      /** @type {number} */
      initializeCheckTimer = setInterval(jQuery.fx.tick, jQuery.fx.interval);
    }
  };
  /**
   * @return {undefined}
   */
  jQuery.fx.stop = function() {
    clearInterval(initializeCheckTimer);
    /** @type {null} */
    initializeCheckTimer = null;
  };
  jQuery.fx.speeds = {
    slow : 600,
    fast : 200,
    _default : 400
  };
  jQuery.fx.step = {};
  if (jQuery.expr && jQuery.expr.filters) {
    /**
     * @param {?} elem
     * @return {?}
     */
    jQuery.expr.filters.animated = function(elem) {
      return jQuery.grep(jQuery.timers, function(fn) {
        return elem === fn.elem;
      }).length;
    };
  }
  /**
   * @param {undefined} options
   * @return {?}
   */
  jQuery.fn.offset = function(options) {
    if (arguments.length) {
      return options === undefined ? this : this.each(function(i) {
        jQuery.offset.setOffset(this, options, i);
      });
    }
    var doc;
    var win;
    var result = {
      top : 0,
      left : 0
    };
    var node = this[0];
    var elem = node && node.ownerDocument;
    if (elem) {
      return doc = elem.documentElement, jQuery.contains(doc, node) ? (_typeof(node.getBoundingClientRect) !== strundefined && (result = node.getBoundingClientRect()), win = getWindow(elem), {
        top : result.top + (win.pageYOffset || doc.scrollTop) - (doc.clientTop || 0),
        left : result.left + (win.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0)
      }) : result;
    }
  };
  jQuery.offset = {
    setOffset : function setOffset(elem, options, x) {
      var position = jQuery.css(elem, "position");
      if ("static" === position) {
        /** @type {string} */
        elem.style.position = "relative";
      }
      var i = jQuery(elem);
      var curOffset = i.offset();
      var curCSSTop = jQuery.css(elem, "top");
      var curCSSLeft = jQuery.css(elem, "left");
      /** @type {boolean} */
      var u = ("absolute" === position || "fixed" === position) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1;
      var a = {};
      var pos = {};
      var top;
      var start;
      if (u) {
        pos = i.position();
        top = pos.top;
        start = pos.left;
      } else {
        /** @type {number} */
        top = parseFloat(curCSSTop) || 0;
        /** @type {number} */
        start = parseFloat(curCSSLeft) || 0;
      }
      if (jQuery.isFunction(options)) {
        options = options.call(elem, x, curOffset);
      }
      if (null != options.top) {
        /** @type {number} */
        a.top = options.top - curOffset.top + top;
      }
      if (null != options.left) {
        /** @type {number} */
        a.left = options.left - curOffset.left + start;
      }
      if ("using" in options) {
        options.using.call(elem, a);
      } else {
        i.css(a);
      }
    }
  };
  jQuery.fn.extend({
    position : function position() {
      if (this[0]) {
        var offsetParent;
        var offset;
        var parentOffset = {
          top : 0,
          left : 0
        };
        var r = this[0];
        return "fixed" === jQuery.css(r, "position") ? offset = r.getBoundingClientRect() : (offsetParent = this.offsetParent(), offset = this.offset(), jQuery.nodeName(offsetParent[0], "html") || (parentOffset = offsetParent.offset()), parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true), parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true)), {
          top : offset.top - parentOffset.top - jQuery.css(r, "marginTop", true),
          left : offset.left - parentOffset.left - jQuery.css(r, "marginLeft", true)
        };
      }
    },
    offsetParent : function init() {
      return this.map(function() {
        var offsetParent = this.offsetParent || document.documentElement;
        for (; offsetParent && !jQuery.nodeName(offsetParent, "html") && "static" === jQuery.css(offsetParent, "position");) {
          offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || document.documentElement;
      });
    }
  });
  jQuery.each({
    scrollLeft : "pageXOffset",
    scrollTop : "pageYOffset"
  }, function(name, prop) {
    /** @type {boolean} */
    var top = /Y/.test(prop);
    /**
     * @param {string} value
     * @return {?}
     */
    jQuery.fn[name] = function(value) {
      return jQuery.access(this, function(elem, method, val) {
        var win = getWindow(elem);
        return val === undefined ? win ? prop in win ? win[prop] : win.document.documentElement[method] : elem[method] : (win ? win.scrollTo(top ? jQuery(win).scrollLeft() : val, top ? val : jQuery(win).scrollTop()) : elem[method] = val, undefined);
      }, name, value, arguments.length, null);
    };
  });
  jQuery.each({
    Height : "height",
    Width : "width"
  }, function(name, data) {
    jQuery.each({
      padding : "inner" + name,
      content : data,
      "" : "outer" + name
    }, function(defaultExtra, original) {
      /**
       * @param {number} margin
       * @param {boolean} value
       * @return {?}
       */
      jQuery.fn[original] = function(margin, value) {
        var chainable = arguments.length && (defaultExtra || "boolean" != typeof margin);
        var extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
        return jQuery.access(this, function(elem, type, value) {
          var doc;
          return jQuery.isWindow(elem) ? elem.document.documentElement["client" + name] : 9 === elem.nodeType ? (doc = elem.documentElement, Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name])) : value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, 
          type, value, extra);
        }, data, chainable ? margin : undefined, chainable, null);
      };
    });
  });
  /** @type {function(?, string): ?} */
  window.jQuery = window.$ = jQuery;
  if ("function" == typeof define && define.amd && define.amd.jQuery) {
    define("jquery", [], function() {
      return jQuery;
    });
  }
})(window);
var Olv = Olv || {};
(function($, self) {
  if (!self.init) {
    self.init = $.Deferred(function() {
      $(this.resolve);
    }).promise();
    /**
     * @return {undefined}
     */
    self.Router = function() {
      /** @type {!Array} */
      this.routes = [];
      this.guard = $.Deferred();
    };
    $.extend(self.Router.prototype, {
      connect : function applyRoute(route, callback) {
        if (!(route instanceof RegExp)) {
          /** @type {!RegExp} */
          route = new RegExp(route);
        }
        this.routes.push([route, callback]);
      },
      dispatch : function Transition(value) {
        this.guard.resolve(value);
        this.guard = $.Deferred();
        var r;
        var path = value.pathname;
        /** @type {number} */
        var i = 0;
        for (; r = this.routes[i]; i++) {
		  var r2 = this.routes[i];
          var i = path.match(r2[0]);
          if (r2) {
            r2[1].call(this, r2, value, this.guard.promise());
          }
        }
      }
    });
    self.router = new self.Router;
    $(document).on("pjax:end", function(n, usergroup_label) {
      $(document).trigger("olv:pagechange", [usergroup_label]);
      self.router.dispatch(location);
    });
    self.init.done(function() {
      self.init.done(function() {
        self.router.dispatch(location);
      });
    });
    self.Locale = {
      Data : {},
      text : function wrapper(str) {
        /** @type {!Array<?>} */
        var n = Array.prototype.slice.call(arguments);
        return n.splice(1, 0, -1), self.Locale.textN.apply(this, n);
      },
      textN : function init(id, url) {
        if (self.Cookie.get("plain_msgid")) {
          return id;
        }
        /** @type {number} */
        url = +url || 0;
        var options = self.Locale.Data[id];
        if (!options) {
          return id;
        }
        var p;
        var c;
        var FacilitySitePoint_140 = options.quanttype || "o";
        if ("1_o" === FacilitySitePoint_140 && 1 === url || "01_o" === FacilitySitePoint_140 && (0 === url || 1 === url) ? (p = options.text_value_1 || options.value_1, c = options.text_args_1 || options.args_1) : (p = options.text_value || options.value, c = options.text_args || options.args), !c) {
          return p;
        }
        /** @type {!Array<?>} */
        var inheritedOptions = Array.prototype.slice.call(arguments, 2);
        /** @type {number} */
        var xp = 0;
        return p.replace(/%s/g, function() {
          return inheritedOptions[c[xp++] - 1];
        });
      }
    };
    /** @type {function(!Function): ?} */
    self.loc = self.Locale.text;
    /** @type {function(?, number): ?} */
    self.loc_n = self.Locale.textN;
    /**
     * @param {?} reply
     * @return {undefined}
     */
    self.print = function(reply) {
      if ("undefined" != typeof console) {
        console.log(reply);
      }
    };
    /**
     * @param {?} bbls
     * @return {?}
     */
    self.deferredAlert = function(bbls) {
      var ioDeferred = $.Deferred();
      return setTimeout(function() {
        alert(bbls);
        ioDeferred.resolve();
      }, 0), ioDeferred.promise();
    };
    /**
     * @param {?} string
     * @return {?}
     */
    self.deferredConfirm = function(string) {
      var globalPromise = $.Deferred();
      return setTimeout(function() {
        /** @type {boolean} */
        var result = confirm(string);
        globalPromise.resolve(result);
      }, 0), globalPromise.promise();
    };
    self.Cookie = {
      set : function set(text, name, value) {
        /** @type {string} */
        var cookie_string = encodeURIComponent(text) + "=" + encodeURIComponent(name) + "; path=/";
        if (value) {
          /** @type {string} */
          cookie_string = cookie_string + ("; expires=" + value.toUTCString());
        }
        /** @type {string} */
        document.cookie = cookie_string;
      },
      get : function get(elem) {
        if (elem && document.cookie) {
          /** @type {!Array<string>} */
          var paramsSplit = document.cookie.split("; ");
          /** @type {number} */
          var i = 0;
          for (; i < paramsSplit.length; i++) {
            /** @type {!Array<string>} */
            var parsedQR = paramsSplit[i].split("=");
            if (elem === decodeURIComponent(parsedQR[0])) {
              return decodeURIComponent(parsedQR[1]);
            }
          }
        }
      }
    };
    self.ErrorViewer = {
      open : function finish(a) {
        /** @type {number} */
        var value = +(a = a || {}).error_code;
        var msg = a.message || a.msgid && self.loc(a.msgid);
        if (!value) {
          /** @type {number} */
          value = 1219999;
          msg = msg || self.loc("olv.portal.error.500.for_offdevice");
        }
        /** @type {(Array<string>|null)} */
        var openNames = String(value).match(/^([0-9]{3})([0-9]{4})$/);
        if (openNames) {
          /** @type {string} */
          value = openNames[1] + "-" + openNames[2];
        }
        var str = self.loc("olv.portal.error.code", value);
        return self.showMessage(str, msg || "");
      }
    };
    self.Net = {
      ajax : function search(url) {
        var value = $.ajax(url);
        var a = self.Net._pageId;
        var fluid = value.then(function(value, delayedTimestamp, fieldnameTruncated) {
          /** @type {boolean} */
          var d = self.Net._pageId === a;
          /** @type {!Array} */
          var args = [value, delayedTimestamp, fieldnameTruncated, d];
          return value && "object" == (typeof value === "undefined" ? "undefined" : _typeof(value)) && !value.success || !d ? $.Deferred().rejectWith(this, args) : $.Deferred().resolveWith(this, args);
        }, function(resp, type) {
          var response = self.Net.getDataFromXHR(resp);
          if (void 0 === response) {
            response = resp.responseText;
          }
          /** @type {boolean} */
          var d = self.Net._pageId === a;
          return $.Deferred().rejectWith(this, [response, type, resp, d]);
        });
        return fluid.fail(self.Net.errorFeedbackHandler), fluid.promise(value), value;
      },
      _pageId : 1,
      getDataFromXHR : function getData(response) {
        var data = response.responseText;
        var type = response.getResponseHeader("Content-Type");
        if (data && type && /^application\/json(?:;|$)/.test(type)) {
          try {
            return $.parseJSON(data);
          } catch (t) {
          }
        }
      },
      getErrorFromXHR : function finish(options) {
        var doc = self.Net.getDataFromXHR(options);
        var source = doc && doc.errors && doc.errors[0];
        if (source && "object" == (typeof source === "undefined" ? "undefined" : _typeof(source))) {
          return source;
        }
        var type = options.status;
        return type ? type < 500 ? {
          error_code : 1210902,
          message : self.loc("olv.portal.error.failed_to_connect.for_offdevice")
        } : {
          error_code : 1219999,
          message : self.loc("olv.portal.error.500.for_offdevice")
        } : {
          error_code : 1219998,
          message : self.loc("olv.portal.error.network_unavailable.for_offdevice")
        };
      },
      _isLeavingPage : false,
      willLeavePage : function countDown() {
        /** @type {boolean} */
        self.Net._isLeavingPage = true;
        setTimeout(function() {
          /** @type {boolean} */
          self.Net._isLeavingPage = false;
        }, 100);
      },
      errorFeedbackHandler : function on(name, object, event, data) {
        if ("abort" !== object && data && (event.status || !self.Net._isLeavingPage)) {
          var _whitespaceCharClass = this;
          /** @type {!Arguments} */
          var original_arguments = arguments;
          setTimeout(function() {
            self.Net._errorFeedbackHandler.apply(_whitespaceCharClass, original_arguments);
          }, event.status ? 0 : 5e3);
        }
      },
      _errorFeedbackHandler : function countDown(config, cb, o, names) {
        var t = self.Net.getErrorFromXHR(o);
        if (!this.silent) {
          self.ErrorViewer.open(t);
        }
        $(document).trigger("olv:ajax:error", [t, cb, o]);
      },
      get : function get(elem, name, callback, type) {
        return self.Net.ajax({
          method : "GET",
          url : elem,
          data : name,
          success : callback,
          dataType : type
        });
      },
      post : function post(handler, data, o, type) {
        return self.Net.ajax({
          method : "POST",
          url : handler,
          data : data,
          success : o,
          dataType : type
        });
      }
    };
    self.Browsing = {
      setup : function PlaylistModeManager() {
        $(document).on("click", "[data-href]", this.onDataHrefClick);
        $(window).on("click submit", this.onMayLeavePage);
      },
      onDataHrefClick : function handleClick(event) {
        if (!event.isDefaultPrevented() && !$(event.target).closest("a,button").length) {
          var $this = $(this);
          if (!$this.hasClass("disabled")) {
            var action = $this.attr("data-href");
            if (action) {
              self.Net.willLeavePage();
              window.location.href = action;
              event.preventDefault();
            }
          }
        }
      },
      onMayLeavePage : function handler(event) {
        if (!(event.isDefaultPrevented() || "click" === event.type && !$(event.target).closest("[href]").length)) {
          self.Net.willLeavePage();
        }
      }
    };
    self.init.done(function() {
      self.Browsing.setup();
    });
    self.Utils = {};
    self.Utils.toJSONString = "undefined" != typeof JSON ? JSON.stringify : function() {
      /**
       * @param {string} name
       * @return {?}
       */
      function f(name) {
        return "\\u" + (65536 + name.charCodeAt(0)).toString(16).substring(1);
      }
      /**
       * @param {string} obj
       * @return {?}
       */
      function serialize(obj) {
        switch(typeof obj === "undefined" ? "undefined" : _typeof(obj)) {
          case "string":
            return '"' + obj.replace(/[\u0000-\u001f"\\\u2028\u2029]/g, f) + '"';
          case "number":
          case "boolean":
            return "" + obj;
          case "object":
            if (!obj) {
              return "null";
            }
            switch(Object.prototype.toString.call(obj).slice(8, -1)) {
              case "String":
              case "Number":
              case "Boolean":
                return serialize(obj.valueOf());
              case "Array":
                /** @type {!Array} */
                var sort = [];
                /** @type {number} */
                var index = 0;
                for (; index < obj.length; index++) {
                  sort.push(serialize(obj[index]));
                }
                return "[" + sort.join(",") + "]";
              case "Object":
                /** @type {!Array} */
                sort = [];
                for (index in obj) {
                  if (obj.hasOwnProperty(index)) {
                    sort.push(serialize(index) + ":" + serialize(obj[index]));
                  }
                }
                return "{" + sort.join(",") + "}";
            }return "null";
        }
        return "null";
      }
      return serialize;
    }();
    /** @type {null} */
    self.Utils._staticRoot = null;
    /**
     * @param {string} cid
     * @return {?}
     */
    self.Utils.staticURL = function(cid) {
      if (/^https?:/.test(cid)) {
        return cid;
      }
      var undefined = self.Utils._staticRoot;
      return null === undefined && document.body && (undefined = self.Utils._staticRoot = ($(document.body).attr("data-static-root") || "").replace(/\/$/, "")), (undefined || "") + cid.replace(/^(?!\/)/, "/");
    };
    /** @type {boolean} */
    self.Utils.isIE8AndEarlierStyle = !!document.createStyleSheet && void 0 === document.documentElement.style.opacity;
    /** @type {boolean} */
    self.Utils.isIEStyle = !!window.TextRange;
    /**
     * @return {undefined}
     */
    self.Utils.addPlatformClass = function() {
      var classes = $(document.documentElement);
      /** @type {string} */
      var platform = navigator.userAgent;
      /** @type {string} */
      var mod = /\bWin/.test(platform) ? "win" : /\bMac/.test(platform) ? "mac" : "other";
      classes.addClass("os-" + mod);
      if (self.Utils.isIE8AndEarlierStyle) {
        classes.addClass("ie8-earlier");
      }
      if (self.Utils.isIEStyle) {
        classes.addClass("ie");
      }
    };
    self.Utils.addPlatformClass();
    /**
     * @return {undefined}
     */
    self.Utils.fixWebFontLoadTiming = function() {
      var styleSheet = document.createStyleSheet();
      /** @type {string} */
      styleSheet.cssText = ":before, :after { content: none !important; }";
      setTimeout(function() {
        var oldStyle = styleSheet.owningElement;
        oldStyle.parentNode.removeChild(oldStyle);
      }, 20);
    };
    if (self.Utils.isIE8AndEarlierStyle) {
      self.init.done(self.Utils.fixWebFontLoadTiming);
    }
    self.Utils.triggerHandlers = {
      keypress : function handleClick(event) {
        if (!(13 !== event.which || event.isDefaultPrevented())) {
          event.preventDefault();
          $(this).click();
        }
      },
      mouseup : function setupPasswords(input) {
        this.blur();
      }
    };
    self.init.done(function($) {
      $(document).on(self.Utils.triggerHandlers, ".trigger");
    });
    self.Content = {};
    /**
     * @param {string} p
     * @param {!Object} o
     * @return {undefined}
     */
    self.Content.autopagerize = function(p, o) {
      /**
       * @return {undefined}
       */
      function a() {
        if (!(breakpointCombinations._disabledCount || s.scrollTop() + s.height() + 200 < t.offset().top + t.outerHeight())) {
          var _c = $("<div/>").attr("class", "post-list-loading").append($("<img/>").attr({
            src : self.Utils.staticURL("/assets/img/loading-image-green.gif"),
            alt : ""
          })).appendTo(t);
          e = $.ajax({
            url : r,
            headers : {
              "X-AUTOPAGERIZE" : true
            }
          }).done(function(canCreateDiscussions) {
            var s = $("<div>" + canCreateDiscussions + "</div>").find(p);
            if (!(r = s.attr("data-next-page-url") || "")) {
              d.resolve();
            }
            t.trigger("olv:autopagerize", [s, r, _c]);
            s.children().each(function() {
              if (this.id && $("#" + this.id).length) {
                $(this).detach();
              }
            });
            t.attr("data-next-page-url", r);
            t.append(s.children());
            if (r) {
              setTimeout(a, 0);
            }
          }).always(function() {
            _c.remove();
            /** @type {null} */
            e = null;
          });
          breakpointCombinations.disable(e);
        }
      }
      var t = $(p);
      var r = t.attr("data-next-page-url");
      if (r) {
        $(document.body).addClass("is-autopagerized");
        var s = $(window);
        /** @type {null} */
        var e = null;
        var d = $.Deferred();
        /** @type {function(string, !Object): undefined} */
        var breakpointCombinations = self.Content.autopagerize;
        s.on("scroll", a);
        d.done(function() {
          s.off("scroll", a);
          if (e) {
            e.abort();
          }
          $(document.body).removeClass("is-autopagerized");
        });
        setTimeout(a, 0);
        o.done(d.resolve);
      }
    };
    /** @type {number} */
    self.Content.autopagerize._disabledCount = 0;
    /**
     * @param {!Object} instance
     * @return {undefined}
     */
    self.Content.autopagerize.disable = function(instance) {
      /** @type {function(string, !Object): undefined} */
      var n = self.Content.autopagerize;
      n._disabledCount++;
      instance.always(function() {
        n._disabledCount--;
      });
    };
    /**
     * @return {undefined}
     */
    self.Content.preloadImages = function() {
      /** @type {number} */
      var i = arguments.length;
      for (; i--;) {
        document.createElement("img").src = arguments[i];
      }
    };
    self.Form = {
      toggleDisabled : function init(n, result) {
        /** @type {boolean} */
        var type = void 0 === result;
        return n.each(function() {
          var input = $(this);
          var value = type ? !self.Form.isDisabled(input) : result;
          if (input.toggleClass("disabled", value), void 0 !== this.form) {
            input.prop("disabled", value);
          } else {
            /** @type {string} */
            var node = value ? "href" : "data-disabled-href";
            /** @type {string} */
            var type = value ? "data-disabled-href" : "href";
            var l = input.attr(node);
            if (void 0 !== l) {
              input.removeAttr(node);
              input.attr(type, l);
            }
          }
        }), n;
      },
      isDisabled : function enableElementSettingsField(element) {
        return element.length && void 0 !== element[0].form ? element.prop("disabled") : element.hasClass("disabled");
      },
      disable : function multipart(res, obj) {
        return self.Form.toggleDisabled(res, true), obj.always(function() {
          self.Form.toggleDisabled(res, false);
        }), res;
      },
      disableSoon : function main(arg1, options) {
        return setTimeout(function() {
          if ("pending" === options.state()) {
            self.Form.toggleDisabled(arg1, true);
          }
        }, 0), options.always(function() {
          self.Form.toggleDisabled(arg1, false);
        }), arg1;
      },
      emulateInputEvent : function init(e, target) {
        if (e.length && void 0 === e[0].oninput) {
          var t = $.map(e, function(select_ele) {
            return select_ele.value;
          });
          /** @type {number} */
          var chat_retry = setInterval(function() {
            /** @type {number} */
            var n = 0;
            var a = e.length;
            for (; n < a; n++) {
              var val = e[n].value;
              if (val !== t[n]) {
                t[n] = val;
                $(e[n]).trigger("input");
              }
            }
          }, 100);
          target.always(function() {
            clearInterval(chat_retry);
          });
        }
      },
      submit : function submit(el, node) {
        el.trigger("olv:form:submit", [node || $()]);
        var tosend_formatted = el.serializeArray();
        var sel_construtor_name = node && node.is("input, button") && node.prop("name");
        if (sel_construtor_name) {
          tosend_formatted.push({
            name : sel_construtor_name,
            value : node.val()
          });
        }
        var data = {
          method : el.prop("method"),
          url : el.attr("action"),
          data : tosend_formatted
        };
        return this.send(data, node);
      },
      get : function get(elem, name, target) {
        var data = {
          method : "GET",
          url : elem,
          data : name
        };
        return this.send(data, target);
      },
      _token : null,
      token : function callback() {
        return null === self.Form._token && (self.Form._token = $("body").attr("data-token")), self.Form._token;
      },
      post : function render(t, c, target) {
        if (!c) {
          c = {};
        }
        if ($.isArray(c)) {
          c.push({
            name : "token",
            value : self.Form.token()
          });
        } else {
          c.token = self.Form.token();
        }
        var data = {
          method : "POST",
          url : t,
          data : c
        };
        return this.send(data, target);
      },
      send : function render(value, node) {
        var repeat = self.Net.ajax(value);
        return $(document).trigger("olv:form:send", [repeat, value, node || $()]), node && (self.Form.disableSoon(node, repeat), node.addClass("loading"), repeat.always(function() {
          node.removeClass("loading");
        })), repeat;
      },
      updateParentClass : function initialize(options) {
        switch(options.type) {
          case "radio":
            var o = $(options.form ? options.form.elements[options.name] : 'input[name="' + options.name + '"]');
            o.each(function() {
              $(this).parent().toggleClass("checked", this.checked);
            });
            if (self.Utils.isIE8AndEarlierStyle) {
              o.parent().addClass("changing").removeClass("changing");
            }
            break;
          case "checkbox":
            $(options).parent().toggleClass("checked", options.checked);
        }
      },
      setup : function registerEvents() {
        $(document).on("click", "input", function(event) {
          if (!event.isDefaultPrevented()) {
            self.Form.updateParentClass(this);
          }
        });
      },
      setupForPage : function bindEvents() {
        $("input:checked").each(function() {
          self.Form.updateParentClass(this);
        });
      },
      reset : function initialize(ar) {
        ar.each(function() {
          this.reset();
          $(this).find("input").each(function() {
            self.Form.updateParentClass(this);
          });
        });
      },
      validateValueLength : function setPlacard(event) {
        $(this).find("[minlength], [maxlength]").each(function() {
          var $this = $(this);
          /** @type {number} */
          var left = +$this.attr("minlength");
          if (isNaN(left)) {
            /** @type {number} */
            left = -1 / 0;
          }
          /** @type {number} */
          var right = +$this.attr("maxlength");
          if (isNaN(right)) {
            /** @type {number} */
            right = 1 / 0;
          }
          var i = $this.val();
          if (!(i.length >= left && i.length <= right)) {
            event.preventDefault();
          }
        });
      }
    };
    self.init.done(self.Form.setup);
    self.router.connect("", self.Form.setupForPage);
    self.Guest = {
      isGuest : function start() {
        return $("body").hasClass("guest");
      }
    };
    /**
     * @param {!Function} callback
     * @param {number} headers
     * @param {number} headersLength
     * @return {undefined}
     */
    self.DecreasingTimer = function(callback, headers, headersLength) {
      /** @type {!Function} */
      this.callback_ = callback;
      this.initialInterval_ = headers || 1e4;
      this.maxInterval_ = headersLength || 1 / 0;
      this.interval_ = this.initialInterval_;
      /** @type {!Array} */
      this.timeouts_ = [];
    };
    /**
     * @return {undefined}
     */
    self.DecreasingTimer.prototype.resetInterval = function() {
      this.interval_ = this.initialInterval_;
      this.clearAllTimeouts();
      this.invoke();
    };
    /**
     * @return {undefined}
     */
    self.DecreasingTimer.prototype.clearAllTimeouts = function() {
      $(this.timeouts_).each($.proxy(function(canCreateDiscussions, timeoutId) {
        this.clearTimeout(timeoutId);
      }, this));
    };
    /**
     * @param {!Object} id
     * @return {undefined}
     */
    self.DecreasingTimer.prototype.clearTimeout = function(id) {
      /** @type {number} */
      var i = 0;
      var patchLen = this.timeouts_.length;
      for (; i < patchLen; ++i) {
        if (this.timeouts_[i] == id) {
          clearTimeout(this.timeouts_[i]);
          this.timeouts_.splice(i, 1);
          break;
        }
      }
    };
    /**
     * @return {undefined}
     */
    self.DecreasingTimer.prototype.invoke = function() {
      this.callback_();
      var timerId;
      /** @type {number} */
      timerId = setTimeout($.proxy(function() {
        this.invoke();
        this.clearTimeout(timerId);
      }, this), this.interval_);
      this.timeouts_.push(timerId);
      /** @type {number} */
      this.interval_ = Math.min(Math.floor(1.5 * this.interval_), this.maxInterval_);
    };
    /**
     * @param {?} responseXML
     * @param {?} status
     * @return {undefined}
     */
    self.UpdateChecker = function(responseXML, status) {
      this._settings = {};
      self.DecreasingTimer.call(this, this.callback_, responseXML, status);
    };
    self.UpdateChecker.prototype = new self.DecreasingTimer;
    /**
     * @return {?}
     */
    self.UpdateChecker.getInstance = function() {
      return void 0 == self.UpdateChecker.instance && (self.UpdateChecker.instance = new self.UpdateChecker(2e4, 18e5)), self.UpdateChecker.instance;
    };
    /**
     * @return {undefined}
     */
    self.UpdateChecker.prototype.callback_ = function() {
      var cache = {};
      $.each(this._settings, $.proxy(function(i) {
        if (void 0 != this._settings[i].pathname && this._settings[i].pathname != location.pathname) {
          delete this._settings[i];
        } else {
          $.each(this._settings[i].params, $.proxy(function(url, obj) {
            cache[url] = self.Utils.toJSONString(obj);
          }, this));
        }
      }, this));
      self.Net.ajax({
        url : "/check_update.json",
        data : cache,
        silent : true,
        cache : false
      }).done($.proxy(function(isFloating) {
        $(this).triggerHandler("update", [isFloating]);
      }, this));
    };
    /**
     * @param {string} name
     * @param {!Object} data
     * @param {!Function} update
     * @param {?} init
     * @return {undefined}
     */
    self.UpdateChecker.prototype.onUpdate = function(name, data, update, init) {
      this._settings[name] = {
        params : data,
        update : update
      };
      if (init) {
        /** @type {string} */
        this._settings[name].pathname = location.pathname;
      }
    };
    self.SocialButton = {};
    /**
     * @param {!Object} el
     * @return {undefined}
     */
    self.SocialButton.popUpDialog = function(el) {
      window.open(el.attr("data-share-url"), "miiverse_share_" + el.attr("data-service-name"), ["width=" + el.attr("data-width"), "height=" + el.attr("data-height"), "location=yes", "resizable=yes", "toolbar=no", "menubar=no", "scrollbars=no", "status=no"].join(","));
    };
    /**
     * @param {!Event} event
     * @return {undefined}
     */
    self.SocialButton.onClick = function(event) {
      if (!event.isDefaultPrevented()) {
        event.preventDefault();
        var o = $(this);
        if ("1" === o.attr("data-is-popup")) {
          self.SocialButton.popUpDialog(o);
        } else {
          location.href = o.attr("data-share-url");
        }
      }
    };
    /**
     * @param {!Object} onlyFirst
     * @return {undefined}
     */
    self.SocialButton.setup = function(onlyFirst) {
      $(document).on("click", ".social-button", self.SocialButton.onClick);
      onlyFirst.done(function() {
        $(document).off("click", ".social-button", self.SocialButton.onClick);
      });
    };
    self.CookiePolicyNotice = {};
    /**
     * @param {!Object} onlyFirst
     * @return {undefined}
     */
    self.CookiePolicyNotice.setup = function(onlyFirst) {
      var o = $("#cookie-policy-notice");
      if (o.length) {
        o.find(".js-cookie-policy-notice").on("click", function() {
          /** @type {!Date} */
          var temp = new Date;
          temp.setFullYear(temp.getFullYear() + 1);
          self.Cookie.set("cookie_policy_notice_seen", "true", temp);
          o.slideUp("fast", function() {
            o.remove();
          });
        });
      }
    };
    self.OpenTruncatedTextButton = {};
    /**
     * @param {!Object} s
     * @return {undefined}
     */
    self.OpenTruncatedTextButton.setup = function(s) {
      var div = $(s);
      div.on("click", ".js-open-truncated-text-button", function(event) {
        event.preventDefault();
        div.find(".js-truncated-text, .js-open-truncated-text-button").addClass("none");
        div.find(".js-full-text").removeClass("none");
      });
    };
    self.ModalWindowManager = {};
    /** @type {!Array} */
    self.ModalWindowManager._windows = [];
    /** @type {null} */
    self.ModalWindowManager.currentWindow = null;
    /**
     * @return {undefined}
     */
    self.ModalWindowManager.closeAll = function() {
      for (; this.currentWindow;) {
        this.currentWindow.close();
      }
    };
    /**
     * @param {string} excludeWin
     * @return {undefined}
     */
    self.ModalWindowManager.closeUntil = function(excludeWin) {
      if (excludeWin.guard) {
        var win;
        for (; (win = this.currentWindow) && (win.close(), win !== excludeWin);) {
        }
      }
    };
    /**
     * @param {!Object} win
     * @return {undefined}
     */
    self.ModalWindowManager.register = function(win) {
      var windows = this._windows;
      if (windows.length) {
        windows[windows.length - 1].element.removeClass("active-dialog");
      } else {
        this.toggleMask(true);
      }
      win.element.addClass("active-dialog");
      windows.push(win);
      /** @type {!Object} */
      this.currentWindow = win;
    };
    /**
     * @param {?} type
     * @return {undefined}
     */
    self.ModalWindowManager.unregister = function(type) {
      if (this.currentWindow !== type) {
        throw new Error("Failed to unregister modal window");
      }
      var taskStack = this._windows;
      taskStack.pop().element.removeClass("active-dialog");
      var win = taskStack.length ? taskStack[taskStack.length - 1] : null;
      if (win) {
        win.element.addClass("active-dialog");
      } else {
        this.toggleMask(false);
      }
      this.currentWindow = win;
    };
    /** @type {null} */
    self.ModalWindowManager._mask = null;
    /**
     * @param {boolean} show
     * @return {undefined}
     */
    self.ModalWindowManager.toggleMask = function(show) {
      var component = this._mask;
      if (!component) {
        component = this._mask = $("<div>", {
          class : "mask none"
        }).on("click", new Function).appendTo(document.body);
      }
      component.toggleClass("none", !show);
    };
    /**
     * @return {undefined}
     */
    self.ModalWindowManager.setup = function() {
      $(document).on("click", "[data-modal-open]", function(event) {
        var target = $(this);
        if (!self.Form.isDisabled(target) && !event.isDefaultPrevented()) {
          event.preventDefault();
          var e = $.Event("olv:modalopen");
          if (target.trigger(e), !e.isDefaultPrevented()) {
            var model = $(target.attr("data-modal-open"));
            if (model.attr("data-is-template")) {
              model = model.clone().removeAttr("id");
            }
            (new self.ModalWindow(model, this)).open();
          }
        }
      });
      $(document).on("click", ".olv-modal-close-button", function(event) {
        if (!event.isDefaultPrevented()) {
          event.preventDefault();
          var oldWindow = self.ModalWindowManager.currentWindow;
          if (oldWindow) {
            oldWindow.close();
          }
        }
      });
      $(document).on("olv:modal", function(canCreateDiscussions, n, tab) {
        self.Content.autopagerize.disable(tab);
      });
    };
    self.init.done(function() {
      self.ModalWindowManager.setup();
    });
    $(document).on("olv:pagechange", function() {
      self.ModalWindowManager.closeAll();
    });
    /**
     * @param {?} selector
     * @param {?} element
     * @return {undefined}
     */
    self.ModalWindow = function(selector, element) {
      this.element = $(selector);
      this.triggerElement = $(element);
      /** @type {boolean} */
      this.temporary = !this.element.parent().length;
      var componentsStr = $.trim(this.element.attr("data-modal-types"));
      this.types = componentsStr ? componentsStr.split(/\s+/) : [];
      /** @type {null} */
      this.guard = null;
    };
    /**
     * @return {?}
     */
    self.ModalWindow.prototype.open = function() {
      if (!this.guard) {
        return document.activeElement && document.activeElement.blur(), self.ModalWindowManager.register(this), self.Form.toggleDisabled(this.triggerElement, true), this.element.addClass("modal-window-open").removeClass("none"), this.temporary && this.element.appendTo(document.body), this.triggerOpenHandlers($.Deferred()), this;
      }
    };
    /**
     * @param {!Function} result
     * @return {undefined}
     */
    self.ModalWindow.prototype.triggerOpenHandlers = function(result) {
      /** @type {!Function} */
      this.guard = result;
      var type;
      /** @type {!Array} */
      var parameters = [this, result.promise()];
      /** @type {number} */
      var ref = 0;
      for (; type = this.types[ref]; ref++) {
        this.element.trigger("olv:modal:" + type, parameters);
      }
      this.element.trigger("olv:modal", parameters);
    };
    /**
     * @return {?}
     */
    self.ModalWindow.prototype.close = function() {
      if (this.guard) {
        return this.guard.resolve(), this.guard = null, self.ModalWindowManager.unregister(this), this.temporary && this.element.remove(), this.element.addClass("none").removeClass("modal-window-open"), self.Form.toggleDisabled(this.triggerElement, false), this;
      }
    };
    self.SimpleDialog = {
      _element : null,
      element : function render() {
        return (this._element || (this._element = $("<div>", {
          class : "dialog"
        }).append($("<div>", {
          class : "dialog-inner"
        }).append($("<div>", {
          class : "window"
        }).append($("<h1>", {
          class : "window-title"
        }), $("<div>", {
          class : "window-body"
        }).append($("<p>", {
          class : "window-body-content"
        }), $("<div>", {
          class : "form-buttons"
        }).append($("<button>", {
          class : "cancel-button gray-button",
          type : "button",
          "data-event-type" : "cancel"
        }), $("<button>", {
          class : "ok-button black-button",
          type : "button",
          "data-event-type" : "ok"
        })))))))).clone();
      },
      htmlLineBreak : function decodeSdpFileName(str) {
        var subwikiListsCache = {
          "<" : "&lt;",
          ">" : "&gt",
          "&" : "&amp;",
          '"' : "&quot"
        };
        return str.replace(/[<>&"]/g, function(wikiId) {
          return subwikiListsCache[wikiId];
        }).replace(/\n|\r\n?/g, function(canCreateDiscussions) {
          return "<br>" + canCreateDiscussions;
        });
      },
      create : function init(parameters) {
        var node = this.element();
        var d = new self.ModalWindow(node);
        var name = $.trim(parameters.modalTypes || "");
        d.types = name ? name.split(/\s+/) : [];
        node.find(".window-title").text(parameters.title || "");
        var r = this.htmlLineBreak(parameters.body || "");
        node.find(".window-body-content").html(r);
        node.find(".ok-button").text(parameters.okLabel || self.loc("olv.portal.ok"));
        var s = node.find(".cancel-button");
        if (parameters.isConfirm) {
          s.text(parameters.cancelLabel || self.loc("olv.portal.cancel"));
        } else {
          s.detach();
        }
        var defer = $.Deferred();
        var service = {
          ok : true,
          cancel : false
        };
        return node.find("button").on("click", function(event) {
          if (!event.isDefaultPrevented()) {
            event.preventDefault();
            var name = $(this).attr("data-event-type");
            var e = $.Event(name);
            $(d).trigger(e);
            if (!e.isDefaultPrevented()) {
              d.close();
              defer.resolveWith(d, [service[name]]);
            }
          }
        }), defer.promise(d), d;
      },
      show : function show(val) {
        var block = this.create(val);
        return block.open(), block.element.find(".ok-button")[0].focus(), block;
      }
    };
    /**
     * @param {string} msg
     * @param {!Array} element
     * @param {?} name
     * @return {?}
     */
    self.showMessage = function(msg, element, name) {
      var sub = $.extend({
        title : msg,
        body : element
      }, name);
      return self.SimpleDialog.show(sub);
    };
    /**
     * @param {string} url
     * @param {!Array} params
     * @param {?} data
     * @return {?}
     */
    self.showConfirm = function(url, params, data) {
      var i = $.extend({
        title : url,
        body : params,
        isConfirm : true
      }, data);
      return self.SimpleDialog.show(i);
    };
    self.Entry = {};
    /**
     * @param {number} originY
     * @return {undefined}
     */
    self.Entry.incrementReplyCount = function(originY) {
      var n = $("div.post-meta div.reply");
      if (0 !== !n.length && void 0 != originY && 0 != originY) {
        var searchfollowercount = n.find(".reply-count");
        var a = +searchfollowercount.text() + originY;
        searchfollowercount.text(a);
        $(".no-reply-content").toggleClass("none", 0 !== a);
      }
    };
    /**
     * @param {!Object} n
     * @return {undefined}
     */
    self.Entry.setupEditButtons = function(n) {
      /**
       * @param {!Object} data
       * @return {?}
       */
      function init(data) {
        var undefined = self.Form.post(data.action, {
          format : "html"
        }, data.button).done(function(data) {
          $("#main-body").replaceWith($($.parseHTML(data)).find("#main-body"));
        });
        return data.modal.element.trigger("olv:entry:post:delete", data), undefined;
      }
      /**
       * @param {!Object} data
       * @return {?}
       */
      function callback(data) {
        return self.Form.post(data.action, null, data.button).done(function() {
          var $sharepreview = $("#post-content, #post-permalink-comments");
          data.option.prop("disabled", true);
          /**
           * @return {undefined}
           */
          var scrollHeightObserver = function func() {
            $sharepreview.find(".spoiler-status").fadeIn(400, function() {
              $(this).addClass("spoiler");
            });
          };
          data.modal.guard.done(function() {
            setTimeout(scrollHeightObserver, 0);
          });
        });
      }
      /**
       * @param {!Object} settings
       * @return {?}
       */
      function test(settings) {
        return settings.modal.close(), self.showConfirm(self.loc("olv.portal.profile_post"), self.loc("olv.portal.profile_post.confirm_update"), {
          okLabel : self.loc("olv.portal.profile_post.confirm_update.yes"),
          cancelLabel : self.loc("olv.portal.cancel")
        }).done(function(n) {
          if (n) {
            var o = this;
            o.element.find("button").prop("disabled", true);
            self.Form.post(settings.action, null, settings.button, true).done(function() {
              settings.modal.triggerElement.trigger("olv:entry:profile-post:set");
              o.close();
              self.showConfirm(self.loc("olv.portal.profile_post"), self.loc("olv.portal.profile_post.done"), {
                okLabel : self.loc("olv.portal.user.search.go"),
                cancelLabel : self.loc("olv.portal.close")
              }).done(function(canCreateDiscussions) {
                if (canCreateDiscussions) {
                  /** @type {string} */
                  location.href = "/users/@me";
                }
              });
            });
          }
        });
      }
      /**
       * @param {?} $el
       * @param {!Object} data
       * @param {!Object} r
       * @return {undefined}
       */
      function initialize($el, data, r) {
        /**
         * @return {undefined}
         */
        function render() {
          var iElement = app.find(":selected");
          mElmOrSub.text(iElement.text());
          var value = iElement.attr("data-action");
          jmpress.attr("action", value);
          self.Form.toggleDisabled(target, !value);
        }
        /**
         * @param {!Event} event
         * @return {undefined}
         */
        function callback(event) {
          if (!self.Form.isDisabled(target) && !event.isDefaultPrevented()) {
            event.preventDefault();
            var options = {
              action : jmpress.attr("action"),
              button : target,
              modal : data,
              option : app.find(":selected")
            };
            var method = app.val();
            ("delete" == method ? init(options) : "painting-profile-post" === method || "screenshot-profile-post" === method ? test(options) : callback(options)).always(function() {
              data.close();
            });
          }
        }
        data.triggerElement;
        var jmpress = data.element.find("form.edit-post-form");
        var app = jmpress.find('select[name="edit-type"]');
        var mElmOrSub = jmpress.find("span.select-button-content");
        var target = jmpress.find(".post-button");
        app.val("");
        render();
        app.on("change", render);
        target.on("click", callback);
        r.done(function() {
          app.off("change", render);
          target.off("click", callback);
        });
      }
      $(document).on("olv:modal:edit-post", initialize);
      n.done(function() {
        $(document).off("olv:modal:edit-post", initialize);
      });
    };
    /**
     * @param {!Object} onlyFirst
     * @return {undefined}
     */
    self.Entry.setupMoreRepliesButtons = function(onlyFirst) {
      /**
       * @param {!Event} event
       * @return {undefined}
       */
      function render(event) {
        event.preventDefault();
        var target = $(this);
        if (!ioRequest && !self.Form.isDisabled(target)) {
          var r = target.text();
          target.text("").append($("<img/>").attr({
            src : self.Utils.staticURL("/assets/img/loading-image-green.gif"),
            alt : ""
          }));
          ioRequest = self.Form.get(target.attr("data-fragment-url"), null, target).done(function(data) {
            var n = $($.parseHTML(data));
            if (target.hasClass("newest-replies-button") || target.hasClass("oldest-replies-button")) {
              return a.find(".more-button, .reply-list, .info-reply-list").remove(), void a.append(n);
            }
            var arrowDiv = n.filter(".reply-list").children().filter(function() {
              return !$("#" + this.id).length;
            });
            if (target.hasClass("all-replies-button") && (target.remove(), a.find(".reply-list:not(.info-reply-list)").prepend(arrowDiv)), target.hasClass("newer-replies-button") || target.hasClass("older-replies-button")) {
              /** @type {string} */
              var r = target.hasClass("newer-replies-button") ? "newer" : "older";
              var s = n.filter("." + r + "-replies-button");
              if (s.length) {
                target.replaceWith(s);
              } else {
                a.find(".more-button").remove();
              }
              a.find(".reply-list:not(.info-reply-list)")["newer" == r ? "append" : "prepend"](arrowDiv);
            }
          }).always(function() {
            target.text(r);
            /** @type {null} */
            ioRequest = null;
          });
          target.trigger("olv:entry:reply:button");
        }
      }
      var a = $("#reply-content");
      /** @type {null} */
      var ioRequest = null;
      $(document).on("click", ".more-button", render);
      onlyFirst.done(function() {
        $(document).off("click", ".more-button", render);
        if (ioRequest) {
          ioRequest.abort();
        }
      });
    };
    /**
     * @param {!Object} e
     * @return {undefined}
     */
    self.Entry.setupHiddenContents = function(e) {
      /**
       * @param {!Event} event
       * @return {undefined}
       */
      function init(event) {
        if (!event.isDefaultPrevented()) {
          event.preventDefault();
          var jField = $(this);
          var browser_message = (jField.closest(".post").length, jField.closest(".hidden"));
          browser_message.removeClass("hidden");
          browser_message.filter("[data-href-hidden]").add(browser_message.find("[data-href-hidden]")).each(function() {
            var element = $(this);
            element.attr(element.is("a") ? "href" : "data-href", element.attr("data-href-hidden"));
          });
          jField.closest(".hidden-content").remove();
        }
      }
      $(document).on("click", ".hidden-content-button", init);
      e.done(function() {
        $(document).off("click", ".hidden-content-button", init);
      });
    };
    /**
     * @param {!Object} $element
     * @return {?}
     */
    self.Entry.toggleEmpathy = function($element) {
      var elementSize = self.Entry.isEmpathyAdded($element);
      /** @type {boolean} */
      var newSize = !elementSize;
      var value = $element.attr("data-action");
      return elementSize && (value = value + ".delete"), $element.trigger("olv:entry:empathy:toggle", [newSize]), self.Form.post(value, null, $element).done(function() {
        $element.trigger("olv:entry:empathy:toggle:done", [newSize]);
      }).fail(function() {
        $element.trigger("olv:entry:empathy:toggle:fail", [elementSize]);
      });
    };
    /**
     * @param {!Object} $query
     * @return {?}
     */
    self.Entry.isEmpathyAdded = function($query) {
      return $query.hasClass("empathy-added");
    };
    /**
     * @param {!Event} event
     * @return {undefined}
     */
    self.Entry.onEmpathyClick = function(event) {
      if (!event.isDefaultPrevented()) {
        event.preventDefault();
        var elem = $(this);
        if (!self.Form.isDisabled(elem)) {
          self.Entry.toggleEmpathy(elem);
        }
      }
    };
    /**
     * @param {?} sometotal
     * @param {boolean} value
     * @return {undefined}
     */
    self.Entry.onEmpathyToggle = function(sometotal, value) {
      var a = $(this);
      a.toggleClass("empathy-added", value);
      var enter = a.attr("data-feeling") || "normal";
      a.find(".empathy-button-text").text(self.loc("olv.portal.miitoo." + enter + (value ? ".delete" : "")));
      var $query;
      ($query = +a.attr("data-is-in-reply-list") ? a.closest(".reply-meta").find(".empathy-count") : a.closest(".post-meta").find(".empathy-count")).text(+$query.text() + (value ? 1 : -1));
      var mElmOrSub = $(document).find("#js-my-empathy-count");
      if (mElmOrSub[0] && mElmOrSub.text(+mElmOrSub.text() + (value ? 1 : -1)), self.Utils.isIE8AndEarlierStyle) {
        var $button = a.closest(".post-meta").find(".empathy");
        $button.addClass("changing");
        setTimeout(function() {
          $button.removeClass("changing");
        }, 0);
      }
    };
    /**
     * @param {!Object} n
     * @return {undefined}
     */
    self.Entry.setupEmpathyButtons = function(n) {
      $(document).on("olv:entry:empathy:toggle olv:entry:empathy:toggle:fail", ".empathy-button", self.Entry.onEmpathyToggle);
      $(document).on("click", ".empathy-button", self.Entry.onEmpathyClick);
      n.done(function() {
        $(document).off("olv:entry:empathy:toggle olv:entry:empathy:toggle:fail", ".empathy-button", self.Entry.onEmpathyToggle);
        $(document).off("click", ".empathy-button", self.Entry.onEmpathyClick);
      });
    };
    /**
     * @param {!Object} n
     * @return {undefined}
     */
    self.Entry.setupPostEmpathyButton = function(n) {
      /**
       * @param {!Event} options
       * @param {string} key
       * @return {undefined}
       */
      function o(options, key) {
        self.Entry.onEmpathyToggle.apply(this, arguments);
        var $deepPage = $(options.target);
        if (!+$deepPage.attr("data-is-in-reply-list")) {
          var $view = $("#empathy-content");
          /** @type {number} */
          var name = +$deepPage.closest(".post-meta").find(".empathy-count").text();
          $view.find(".visitor").toggle(key);
          $view.find(".extra").toggle(!key);
          $view.toggleClass("none", 0 === name);
        }
      }
      $(document).on("olv:entry:empathy:toggle olv:entry:empathy:toggle:fail", ".empathy-button", o);
      $(document).on("click", ".empathy-button", self.Entry.onEmpathyClick);
      n.done(function() {
        $(document).off("click", ".empathy-button", self.Entry.onEmpathyClick);
        $(document).off("olv:entry:empathy:toggle olv:entry:empathy:toggle:fail", ".empathy-button", o);
      });
    };
    /**
     * @param {!Object} e
     * @return {undefined}
     */
    self.Entry.setupBodyLanguageSelector = function(e) {
      /**
       * @param {!Event} options
       * @return {undefined}
       */
      function getter(options) {
        var conid = $(options.target).val();
        $("#body-language-" + conid).toggleClass("none", false).siblings(".multi-language-body").toggleClass("none", true);
      }
      $(document).on("change", "#body-language-selector", getter);
      e.done(function() {
        $(document).off("change", "#body-language-selector", getter);
      });
    };
    /**
     * @param {!Object} onlyFirst
     * @return {undefined}
     */
    self.Entry.setupMoreContentButton = function(onlyFirst) {
      /**
       * @param {!Event} thing
       * @return {undefined}
       */
      function o(thing) {
        thing.preventDefault();
        var socialButton = $(thing.target);
        socialButton.prev().find(".wrapped").removeClass("none");
        socialButton.remove();
      }
      var a = $("#post-content.official-user.post-subtype-default .post-content-text");
      if (a && 0 != a.length) {
        a.each(function() {
          var div = $(this);
          var properties = div.text().match(/([\s\S]+)(\n+---+\n[\s\S]+)/);
          if (properties) {
            div.text(properties[1]);
            var fieldsDiv = $('<span class="wrapped none"></span>').text(properties[2]);
            div.append(fieldsDiv);
            var i = $('<a href="#" class="more-content-button"></a>');
            i.text(self.loc("olv.portal.read_more_content"));
            div.after(i);
          }
        });
        $(document).on("click", ".more-content-button", o);
        onlyFirst.done(function() {
          $(document).off("click", ".more-content-button", o);
        });
      }
    };
    $(document).on("olv:modal:report", function(canCreateDiscussions, tooltip, sectionInfo) {
      var form = tooltip.element.find("form");
      var target = form.find(".post-button");
      target.on("click", function(event) {
        if (!(self.Form.isDisabled(target) || event.isDefaultPrevented())) {
          event.preventDefault();
          self.Form.submit(form, target).done(function() {
            tooltip.close();
            tooltip.triggerElement.trigger("olv:report:done");
            var event = form.attr("action");
            if (/\/violations$/.test(event)) {
              self.showMessage("", self.loc("olv.portal.dialog.report_violation_done"));
            } else {
              if (/\/violators$/.test(event)) {
                self.showMessage("", self.loc("olv.portal.dialog.report_violation_done"));
              }
            }
          });
        }
      });
      sectionInfo.done(function() {
        target.off("click");
      });
    });
    $(document).on("olv:modal:report-violator", function(canCreateDiscussions, n, sectionInfo) {
      /**
       * @return {undefined}
       */
      function render() {
        /** @type {boolean} */
        var show = !!app.val();
        el.css("display", show ? "" : "none");
        self.Form.toggleDisabled(uncert, !show);
        if ("" == el.val()) {
          el.val(" ").val("");
        }
      }
      var app = n.element.find('select[name="type"]');
      var el = n.element.find('textarea[name="body"]');
      var uncert = n.element.find(".post-button");
      render();
      app.on("change", render);
      sectionInfo.done(function() {
        app.off("change", render);
      });
    });
    $(document).on("olv:modal:report-violation", function(n, options, obj) {
      /**
       * @return {undefined}
       */
      function handler() {
        var $copyFrom = $($element[0].options[$element[0].selectedIndex]);
        mElmOrSub.text($copyFrom.text());
        /** @type {boolean} */
        var show = !!$element.val();
        el.css("display", show ? "" : "none");
      }
      /**
       * @return {undefined}
       */
      function callback() {
        /** @type {boolean} */
        var parentIsCall = !!$($element[0].options[$element[0].selectedIndex]).attr("data-body-required");
        /** @type {boolean} */
        var parentIsMember = !!$element.val();
        /** @type {boolean} */
        var first_result = parentIsCall && /^\s*$/.test(el.val()) || !parentIsMember;
        self.Form.toggleDisabled(uncert, first_result);
      }
      /** @type {boolean} */
      var rawDataIsArray = !!options.triggerElement.attr("data-is-post");
      /** @type {boolean} */
      var rawDataIsList = !!options.triggerElement.attr("data-is-message");
      var c = self.loc(rawDataIsArray ? "olv.portal.report.report_violation" : rawDataIsList ? "olv.portal.report.report_violation_message" : "olv.portal.report.report_violation_comment", options.triggerElement.attr("data-screen-name"));
      var u = self.loc(rawDataIsArray ? "olv.portal.report.report_post_id" : rawDataIsList ? "olv.portal.report.report_message_id" : "olv.portal.report.report_comment_id", options.triggerElement.attr("data-support-text"));
      options.element.find(".window-title").text(c);
      options.element.find(".post-id").text(u);
      options.element.find("form").attr("action", options.triggerElement.attr("data-action"));
      var $element = "1" === options.triggerElement.attr("data-can-report-spoiler") ? options.element.find("select.can-report-spoiler") : options.element.find("select.cannot-report-spoiler");
      options.element.find('select[name="type"]').hide().prop("disabled", true);
      $element.show().prop("disabled", false);
      var el = options.element.find('textarea[name="body"]');
      var uncert = options.element.find(".post-button");
      var mElmOrSub = options.element.find("span.select-button-content");
      el.attr("placeholder", el.attr("data-placeholder"));
      handler();
      callback();
      el.on("input", callback);
      $element.on("change", handler);
      $element.on("change", callback);
      self.Form.emulateInputEvent(el, obj);
      obj.done(function() {
        el.off("input", callback);
        $element.off("change", handler);
        $element.off("change", callback);
      });
    });
    $(document).on("olv:modal:album-detail", function(canCreateDiscussions, n, sectionInfo) {
      var form = n.element.find("form");
      var target = form.find(".js-album-delete-button");
      target.on("click", function(event) {
        if (!(self.Form.isDisabled(target) || event.isDefaultPrevented())) {
          event.preventDefault();
          self.showConfirm(null, self.loc("olv.portal.album.delete_confirm")).done(function(canCreateDiscussions) {
            if (canCreateDiscussions) {
              self.Form.submit(form, target, true).done(function() {
                n.close();
                location.reload();
              });
            }
          });
        }
      });
      sectionInfo.done(function() {
        target.off("click");
      });
    });
    /**
     * @param {!Object} onlyFirst
     * @return {undefined}
     */
    self.Entry.setupCloseTopicPostButton = function(onlyFirst) {
      var o = $(document).find(".js-close-topic-post-form");
      var params = o.find(".js-close-topic-post-button");
      params.on("click", function(event) {
        if (!(self.Form.isDisabled(params) || event.isDefaultPrevented())) {
          event.preventDefault();
          self.showConfirm(self.loc("olv.portal.edit.action.close_topic_post"), self.loc("olv.portal.edit.action.close_topic_post.confirm"), {
            okLabel : self.loc("olv.portal.yes"),
            cancelLabel : self.loc("olv.portal.stop")
          }).done(function(n) {
            if (n) {
              self.Form.post(o.attr("action"), null, params, true).done(function() {
                $(document).find(".js-topic-answer-accepting-status").removeClass("accepting").addClass("not-accepting");
                o.remove();
              });
              this.close();
            }
          });
        }
      });
      onlyFirst.done(function() {
        params.off("click");
      });
    };
    self.EntryForm = {};
    /**
     * @param {!Object} item
     * @param {!Object} n
     * @return {undefined}
     */
    self.EntryForm.setupAlbumImageSelector = function(item, n) {
      /**
       * @param {?} canCreateDiscussions
       * @return {undefined}
       */
      function debouncedUpdateResize(canCreateDiscussions) {
        cursor.toggleClass("none");
      }
      /**
       * @param {?} indata2
       * @return {undefined}
       */
      function a(indata2) {
        cursor.addClass("none");
      }
      /**
       * @param {!Event} b
       * @return {undefined}
       */
      function i(b) {
        var $deepPage = $(b.target);
        var a = $deepPage.attr("data-album-image-preview-src");
        item.find('input[name="album_image_id"]').val($deepPage.attr("data-album-image-id"));
        item.find(".js-album-image-preview").attr("src", a);
        item.find(".js-album-preview-wrapper").toggleClass("none", 0 == a.length);
        item.find('textarea[name="body"]').toggleClass("with-image", a.length > 0);
        item.trigger("olv:entryform:updatescreenshot");
      }
      if (item.length) {
        var cursor = item.find(".js-album-image-selector");
        var $field = item.find(".js-album-list-pager");
        if ($field.length) {
          /**
           * @param {number} value
           * @return {undefined}
           */
          var toggle = function dayHovering(value) {
            /** @type {number} */
            var max = parseInt($field.attr("data-max-page-number"));
            if (!(value > max || value < 1)) {
              item.find(".js-album-selector-page[data-page-number=" + value + "]").removeClass("none").siblings(".js-album-selector-page").addClass("none");
              $field.toggleClass("back-button-disabled", 1 === value);
              $field.toggleClass("next-button-disabled", value === max);
              $field.attr("data-current-page-number", value);
              $field.find(".js-curent-page-number").text(value);
            }
          };
          /**
           * @param {?} hide_incompat
           * @return {undefined}
           */
          var c = function set_hide_incompat(hide_incompat) {
            if (!$field.hasClass("back-button-disabled")) {
              toggle(parseInt($field.attr("data-current-page-number")) - 1);
            }
          };
          /**
           * @param {?} hide_incompat
           * @return {undefined}
           */
          var type = function set_hide_incompat(hide_incompat) {
            if (!$field.hasClass("next-button-disabled")) {
              toggle(parseInt($field.attr("data-current-page-number")) + 1);
            }
          };
          var d = item.find(".js-page-back-button");
          d.on("click", c);
          var dlg = item.find(".js-page-next-button");
          dlg.on("click", type);
          toggle(1);
          n.done(function() {
            d.off("click", c);
            dlg.off("click", type);
          });
        }
        var $scope = item.find(".js-toggle-album-image-selector");
        $scope.on("click", debouncedUpdateResize);
        var resultsEl = cursor.find(".js-close-album-image-selector");
        resultsEl.on("click", a);
        var g = item.find(".js-album-image-link");
        g.on("click", i);
        /**
         * @param {?} e
         * @return {undefined}
         */
        var v = function cellDblClicked(e) {
          item.find('input[name="album_image_id"]').val("");
          item.find(".js-album-image-preview").attr("src", "");
          item.find(".js-album-preview-wrapper").addClass("none");
          item.find('textarea[name="body"]').removeClass("with-image");
        };
        item.on("reset", v);
        n.done(function() {
          $scope.off("click", debouncedUpdateResize);
          resultsEl.off("click", a);
          g.off("click", i);
          item.off("reset", v);
        });
      }
    };
    /**
     * @param {!Object} e
     * @param {!Object} o
     * @return {undefined}
     */
    self.EntryForm.setupSubmission = function(e, o) {
      /**
       * @param {!Event} event
       * @return {undefined}
       */
      function render(event) {
        var target = $(this);
        if (!(self.Form.isDisabled(target) || event.isDefaultPrevented())) {
          event.preventDefault();
          self.Form.submit(e, target).done(function(canCreateDiscussions) {
            if (self.Form.reset(e), self.EntryForm.checkCanPost(e), "topic" === e.attr("data-post-subtype") && !e.attr("data-is-identified")) {
              var $user = e.find('textarea[name="body"]');
              $user.prop("disabled", true);
              $user.attr("placeholder", $user.attr("data-open-topic-post-existing-placeholder"));
            }
            target.trigger("olv:entryform:post:done", arguments);
          }).fail(function() {
            target.trigger("olv:entryform:post:fail", arguments);
          }).always(function() {
            e.find('textarea[name="body"]').trigger("input");
          });
        }
      }
      /**
       * @param {!Event} event
       * @return {?}
       */
      function f(event) {
        return 13 !== event.which;
      }
      /**
       * @param {!Event} candidate
       * @return {undefined}
       */
      function callback(candidate) {
        if (self.Form.isDisabled(target)) {
          candidate.preventDefault();
        }
      }
      if (e.length) {
        e.on("keypress", "input:not(.allow_submit)", f);
        var target = e.find('input[type="submit"], button[type="submit"]');
        target.on("click", render);
        e.on("submit", callback);
        o.done(function() {
          e.off("keypress", "input:not(.allow_submit)", f);
          target.off("click", render);
          e.off("submit", callback);
        });
      }
    };
    /**
     * @param {!Object} body
     * @param {!Object} n
     * @return {undefined}
     */
    self.EntryForm.onTopicPostCreated = function(body, n) {
      var url = $(".js-post-list").children(".post").attr("data-href");
      body.find(".js-existing-open-topic-post-link").attr("href", url);
      if (!$("#post-form").hasClass("for-identified-user")) {
        body.find(".js-cannnot-topic-post").removeClass("none");
        body.find(".js-feeling-selector").addClass("none");
        body.find(".js-topic-categories-container").addClass("none");
        body.find(".js-post-form-spoiler").addClass("none");
        body.find('input[type="text"],textarea').prop("readonly", true);
      }
      body.toggleClass("folded");
    };
    /**
     * @param {!Object} t
     * @param {!Object} obj
     * @return {undefined}
     */
    self.EntryForm.setupFormStatus = function(t, obj) {
      /**
       * @param {!Array} e
       * @return {?}
       */
      function createOffspring(e) {
        /** @type {!RegExp} */
        var currencyRegExp = /^[\s\u00A0\u3000]*$/;
        return e.filter(function() {
          return !currencyRegExp.test($(this).val());
        }).length === e.length;
      }
      /**
       * @param {?} pointSizeParam
       * @return {undefined}
       */
      function callback(pointSizeParam) {
        var parent = s.filter("[data-required]:visible");
        var i = parent.length > 0 && createOffspring(parent);
        /** @type {boolean} */
        var r = folderWatcherManager.filter(function() {
          return !$(this).val();
        }).length > 0;
        self.Form.toggleDisabled(uncert, !i && !c.val() || r);
      }
      /**
       * @param {?} m_w
       * @return {undefined}
       */
      function r(m_w) {
        t.trigger("olv:entryform:reset");
      }
      if (t.length) {
        var s = t.find('input[type="text"], textarea');
        var folderWatcherManager = t.find("select[data-required]");
        var c = t.find('input[name="painting"]').siblings("input:file");
        var uncert = t.find('input[type="submit"], button[type="submit"]');
        s.on("input", callback);
        c.on("change", callback);
        folderWatcherManager.on("change", callback);
        t.on("reset", r);
        var uboard = s.filter(":visible").first();
        self.Form.emulateInputEvent(uboard, obj);
        s.filter(":visible").first().trigger("input");
        obj.done(function() {
          s.off("input", callback);
          c.off("change", callback);
          t.off("reset", r);
          folderWatcherManager.off("change", callback);
        });
      }
    };
    /**
     * @param {!Object} body
     * @param {!Object} e
     * @return {?}
     */
    self.EntryForm.setupFoldedForm = function(body, e) {
      /**
       * @param {?} oscIp
       * @return {undefined}
       */
      function scroll(oscIp) {
        var ptop = el.offset().top;
        body.removeClass("folded");
        /** @type {number} */
        var top = el.offset().top - ptop;
        window.scrollBy(0, top);
      }
      if (body.hasClass("folded")) {
        var el = body.find("[data-open-folded-form]");
        if (el.is(document.activeElement) || el.val() !== el.prop("defaultValue")) {
          body.removeClass("folded");
        } else {
          if ("#js_open_post_form" == location.hash) {
            return location.hash = "", void body.removeClass("folded");
          }
          el.one("focus", scroll);
          e.done(function() {
            el.off("focus", scroll);
          });
        }
      }
    };
    /**
     * @param {?} e
     * @param {!Object} o
     * @return {undefined}
     */
    self.EntryForm.setupIdentifiedUserForm = function(e, o) {
      /**
       * @return {undefined}
       */
      function remove() {
        e.find('textarea[name="body"]').trigger("input");
      }
      /**
       * @param {?} preventRedraw
       * @return {undefined}
       */
      function show(preventRedraw) {
        /** @type {boolean} */
        var value = "1" == e.find('input[name="is_multi_language"]:checked').val();
        self.Form.reset(e);
        e.find('input[name="is_multi_language"]').val([value ? "1" : "0"]);
        e.find(".language-id-selector").toggleClass("none", !value);
        e.find(".language-bodies").toggleClass("none", !value);
        e.find('input[name="painting"]').parent().toggleClass("none", value);
        e.find('textarea[name="body"]').toggleClass("none", value);
        r();
        remove();
      }
      /**
       * @param {?} m_w
       * @return {undefined}
       */
      function r(m_w) {
        query.each(function(canCreateDiscussions, eElement) {
          e.find(".js-language-body-" + $(eElement).val()).toggleClass("none", !eElement.checked);
        });
        remove();
      }
      /**
       * @param {!Event} event
       * @return {undefined}
       */
      function render(event) {
        var a = $(event.target).siblings().filter("input");
        var imgFile = event.target.files[0];
        if (imgFile) {
          /** @type {!FileReader} */
          var reader = new FileReader;
          /**
           * @param {!Object} event
           * @return {undefined}
           */
          reader.onload = function(event) {
            var n = event.target.result.split(",")[1];
            a.val(n);
            a.trigger("olv:entryform:fileselect", e);
            e.find('textarea[name="body"]').trigger("input");
          };
          self.Form.toggleDisabled(uncert, true);
          reader.readAsDataURL(imgFile);
        } else {
          a.val("");
        }
      }
      var uncert = e.find('input[type="submit"]');
      var target = e.find(".file-button");
      var query = e.find('input[name="language_ids"]');
      var $element = e.find('input[name="is_multi_language"]');
      if ("undefined" == typeof FileReader) {
        self.Form.toggleDisabled(target, true);
      }
      target.on("change", render);
      query.on("change", r);
      $element.on("change", show);
      e.on("olv:entryform:post:done", function(canCreateDiscussions) {
        target.siblings().filter("input[type=hidden]").val("");
        show();
      });
      show();
      o.done(function() {
        target.off("change", render);
        query.off("change", r);
        $element.off("change", show);
        e.off("olv:entryform:post:done", resetForm);
      });
    };
    /**
     * @param {!Object} aMsg
     * @return {undefined}
     */
    self.EntryForm.checkCanPost = function(aMsg) {
      /**
       * @param {!Object} self
       * @param {!Object} input
       * @return {undefined}
       */
      function bind(self, input) {
        self.find(".remaining-today-post-count").text(input);
      }
      !function(value) {
        self.Net.ajax({
          type : "GET",
          url : "/users/" + $(document.body).attr("data-user-id") + "/check_can_post.json",
          silent : true
        }).done(function(_serializer) {
          bind(value, _serializer.remaining_today_posts);
        }).fail(function(canCreateDiscussions) {
          bind(value, 0);
        });
      }(aMsg);
    };
    if (-1 != navigator.userAgent.indexOf("iPhone;")) {
      self.init.done(function(canCreateDiscussions) {
        setTimeout(function() {
          if (0 === window.pageYOffset) {
            window.scrollBy(0, 1);
          }
        }, 100);
      });
    }
    self.Community = {};
    /**
     * @param {!Object} item
     * @return {undefined}
     */
    self.Community.setupFavoriteButtons = function(item) {
      /**
       * @param {!Object} cell
       * @param {boolean} value
       * @return {undefined}
       */
      function initialize(cell, value) {
        cell.toggleClass("checked", value);
        if (self.Utils.isIEStyle) {
          cell.addClass("changing").removeClass("changing");
        }
      }
      /**
       * @param {!Event} event
       * @return {undefined}
       */
      function handler(event) {
        var target = $(this);
        if (!self.Form.isDisabled(target) && !event.isDefaultPrevented()) {
          event.preventDefault();
          var value = target.hasClass("checked");
          initialize(target);
          var r = target.attr(value ? "data-action-unfavorite" : "data-action-favorite");
          self.Form.post(r, null, target).done(function() {
            /** @type {boolean} */
            value = !value;
            target.trigger("olv:community:favorite:toggle", [value]);
          }).fail(function() {
            initialize(target, value);
          });
        }
      }
      $(document).on("click", ".favorite-button", handler);
      item.done(function() {
        $(document).off("click", ".favorite-button", handler);
      });
    };
    /**
     * @param {!Object} n
     * @return {undefined}
     */
    self.Community.setupAgeGateDialog = function(n) {
      /**
       * @param {number} month
       * @param {number} year
       * @param {number} d
       * @return {?}
       */
      function render(month, year, d) {
        if (isNaN(month) || isNaN(year) || isNaN(d)) {
          return false;
        }
        /** @type {!Date} */
        var date = new Date(month, year - 1, d);
        return date.getFullYear() === month && date.getMonth() + 1 === year && date.getDate() === d;
      }
      /**
       * @param {number} t
       * @param {number} f
       * @param {number} s
       * @return {?}
       */
      function a(t, f, s) {
        /** @type {!Date} */
        var dCurrent = new Date;
        /** @type {number} */
        var total = 100 * f + s > 100 * (dCurrent.getMonth() + 1) + dCurrent.getDate() ? 1 : 0;
        return dCurrent.getFullYear() - t - total;
      }
      /**
       * @param {number} value
       * @param {number} id
       * @param {number} path
       * @return {?}
       */
      function val(value, id, path) {
        return a(value, id, path) >= 18;
      }
      /**
       * @param {!Object} element
       * @param {?} i
       * @return {undefined}
       */
      function validate(element, i) {
        var punit = units[i];
        var a = $(element[0].options[element[0].selectedIndex]);
        if (isNaN(a.val())) {
          element.find('[value="' + punit + '"]').prop("selected", true);
          element.trigger("change");
          show();
          a.remove();
        }
      }
      /**
       * @param {!Event} event
       * @return {undefined}
       */
      function f(event) {
        var n = $(event.currentTarget);
        validate(n, n.attr("name"));
      }
      /**
       * @return {undefined}
       */
      function show() {
        /** @type {number} */
        var value = +filter.val();
        /** @type {number} */
        var month = +$conditionsRuleMajor.val();
        /** @type {number} */
        var year = +$initHTML.val();
        if (!isNaN(month)) {
          /** @type {number} */
          var c = (new Date(year, month, 0)).getDate();
          /** @type {number} */
          var i = +filter.find("option").last().val();
          if (i > c) {
            filter.find("option").slice(c - i).remove();
          } else {
            if (i < c) {
              /** @type {number} */
              var a = i + 1;
              for (; a <= c; a++) {
                filter.append($("<option>").val(a).text(a));
              }
            }
          }
          if (!isNaN(value) && value > c) {
            filter.find('[value="' + c + '"]').prop("selected", true);
            filter.trigger("change");
          }
        }
      }
      /**
       * @return {undefined}
       */
      function init() {
        $(".age-gate-dialog").remove();
        $("#main-body").children().show();
        self.Cookie.set("age_gate_done", "1");
      }
      /**
       * @param {?} callback
       * @return {undefined}
       */
      function turnOn(callback) {
        show();
      }
      /**
       * @param {?} planned
       * @return {undefined}
       */
      function done(planned) {
        /** @type {number} */
        var i = +$initHTML.val();
        /** @type {number} */
        var d = +$conditionsRuleMajor.val();
        /** @type {number} */
        var k = +filter.val();
        if (self.Cookie.get("age_gate_done")) {
          init();
        } else {
          if (render(i, d, k)) {
            if (val(i, d, k)) {
              init();
            } else {
              $(".age-gate").addClass("none");
              $(".back-dialog").removeClass("none");
            }
          } else {
            self.deferredAlert(self.loc("olv.portal.age_gate.select_label"));
          }
        }
      }
      /**
       * @param {?} bPublic
       * @return {undefined}
       */
      function move(bPublic) {
        history.back();
      }
      $("#main-body").children().filter(function() {
        return !$(this).hasClass("age-gate-dialog");
      }).hide();
      var $sharepreview = $(".age-gate-dialog");
      var filter = $sharepreview.find(".day");
      var $conditionsRuleMajor = $sharepreview.find(".month");
      var $initHTML = $sharepreview.find(".year");
      var units = {
        year : 1990,
        month : 1,
        day : 1
      };
      $(document).on("click", ".age-confirm-button", done);
      $(document).on("mousedown", ".age-gate select", f);
      $(document).on("change", ".age-gate select", turnOn);
      $(document).on("click", ".cancel-button", move);
      n.done(function() {
        $(document).off("click", ".age-confirm-button", done);
        $(document).off("mousedown", ".age-gate select", f);
        $(document).off("change", ".age-gate select", turnOn);
        $(document).off("click", ".cancel-button", move);
      });
    };
    /**
     * @param {!Object} sectionInfo
     * @return {undefined}
     */
    self.Community.setupHotDiaryPostSlideShow = function(sectionInfo) {
      /**
       * @param {!Object} node
       * @param {!Object} tag
       * @return {undefined}
       */
      function click(node, tag) {
        setTimeout(function() {
          node.addClass(a);
        }, 0);
        setTimeout(function() {
          tag.removeClass(a);
        }, 0);
      }
      /**
       * @param {?} v
       * @return {undefined}
       */
      function o(v) {
        var o = v();
        click($(o[0]), $(o[1]));
      }
      /** @type {string} */
      var a = "invisible";
      var i = function(i, s1) {
        /** @type {number} */
        var s2 = 0;
        return function() {
          /** @type {!Array} */
          var joinedPoints = [];
          /** @type {number} */
          var offset = 0;
          for (; offset < i; offset++) {
            /** @type {!Array<?>} */
            joinedPoints = joinedPoints.concat(function(b, x, num) {
              var i = x + num;
              return x >= b.length ? (s2 = 0, b[0]) : i < b.length ? b[i] : b[0];
            }(s1, s2, offset));
          }
          return s2++, joinedPoints;
        };
      }(2, $("#community-eyecatch-main").find(".js-eyecatch-diary-post").get());
      /** @type {string} */
      var m = [".js-eyecatch-diary-post", ":not(." + a + ")"].join("");
      setTimeout(function() {
        o(i);
      }, 1e3);
      (function(method, a) {
        $(document).on("transitionend", method, function(canCreateDiscussions) {
          o(a);
        });
        sectionInfo.done(function() {
          $(document).off("transitionend", method, onPostAppeared);
        });
      })(m, i);
    };
    /**
     * @param {!Object} fixedItem
     * @return {undefined}
     */
    self.Community.setupCommunitySidebar = function(fixedItem) {
      self.Community.setupFavoriteButtons(fixedItem);
      self.OpenTruncatedTextButton.setup(".js-community-description");
    };
    /**
     * @param {!Object} e
     * @return {undefined}
     */
    self.Community.setupPostFilter = function(e) {
      /**
       * @param {!Event} event
       * @return {undefined}
       */
      function toggle(event) {
        if (!event.isDefaultPrevented()) {
          event.preventDefault();
          var downloadHref = $(this).find('select[name="post"]').val();
          window.location.href = downloadHref;
        }
      }
      var element = $("#post-filter-select-page form");
      element.on("submit", toggle);
      e.done(function() {
        element.off("submit", toggle);
      });
    };
    self.User = {};
    /**
     * @param {!Object} o
     * @param {!Object} params
     * @return {undefined}
     */
    self.User.setupFollowButton = function(o, params) {
      /**
       * @param {!Event} candidate
       * @return {undefined}
       */
      function callback(candidate) {
        var target = $(this);
        if (!self.Form.isDisabled(target)) {
          self.Form.post(target.attr("data-action"), null, target).done(function(data) {
            target.addClass("none").siblings().removeClass("none");
            if (target.hasClass("relationship-button")) {
              if (!(params.noReloadOnFollow && true === data.can_follow_more)) {
                location.reload();
              }
            }
            if ("following_count" in data) {
              $(target).trigger("olv:visitor:following-count:change", [data.following_count]);
            }
          });
          candidate.preventDefault();
        }
      }
      /**
       * @param {!Event} event
       * @return {undefined}
       */
      function add(event) {
        var target = $(this);
        var container = target.siblings();
        if (!self.Form.isDisabled(target)) {
          self.showConfirm(self.loc("olv.portal.unfollow"), self.loc("olv.portal.followlist.confirm_unfollow_with_name", target.attr("data-screen-name")), {
            cancelLabel : self.loc("olv.portal.cancel"),
            okLabel : self.loc("olv.portal.button.remove"),
            modalTypes : "unfollow"
          }).done(function(canCreateDiscussions) {
            if (canCreateDiscussions) {
              self.Form.post(target.attr("data-action"), null, target).done(function() {
                if (target.hasClass("relationship-button")) {
                  location.reload();
                } else {
                  target.addClass("none");
                  container.removeClass("none");
                  self.Form.toggleDisabled(container, false);
                }
              });
            }
          });
          event.preventDefault();
        }
      }
      params = $.extend({
        noReloadOnFollow : false,
        container : document
      }, params);
      var self = $(params.container);
      self.on("click", ".toggle-button .follow-button", callback);
      self.on("click", ".toggle-button .unfollow-button", add);
      o.done(function() {
        self.off("click", ".toggle-button .follow-button", callback);
        self.off("click", ".toggle-button .unfollow-button", add);
      });
    };
    /**
     * @param {!Object} t
     * @return {undefined}
     */
    self.User.setupUserSidebar = function(t) {
      self.OpenTruncatedTextButton.setup(".profile-comment");
      self.User.setupFollowButton(t, {
        container : "#sidebar"
      });
    };
    self.Global = {};
    /**
     * @param {?} e
     * @return {?}
     */
    self.Global.atOutsideOfMyMenu = function(e) {
      var n = $(e);
      return !n.hasClass("js-open-global-my-menu") && "global-my-menu" !== n.attr("id");
    };
    /**
     * @return {undefined}
     */
    self.Global.setupMyMenu = function() {
      var tr = $("#global-my-menu");
      $(".js-open-global-my-menu").on("click", function(event) {
        event.preventDefault();
        tr.toggleClass("none");
      });
      $(document).on("click", function(mutationEvent) {
        if (!tr.hasClass("none") && self.Global.atOutsideOfMyMenu(mutationEvent.target)) {
          tr.addClass("none");
        }
      });
    };
    self.init.done(function() {
      self.Global.setupMyMenu();
    });
    self.init.done(function($) {
      if ($("#global-menu-news").length) {
        $("#global-menu-news").on("click", function(event) {
          $(event.currentTarget).find(".badge").hide();
        });
        var that = self.UpdateChecker.getInstance();
        $(that).on("update", function(canCreateDiscussions, members) {
          $.each(that._settings, function(canCreateDiscussions, n) {
            $.each(n.params, function(index, canCreateDiscussions) {
              if (void 0 === members[index]) {
                /** @type {boolean} */
                this.success = false;
              }
            });
            n.update.call(void 0, members, n.params);
          });
        });
        that.onUpdate("check_update", {
          news : {},
          admin_message : {},
          mission : {}
        }, function(eventsDict, n) {
          var markerNav = $("#global-menu-news");
          var t = markerNav.find(".badge");
          if (0 === t.length) {
            (t = $("<span>", {
              class : "badge"
            })).hide().appendTo(markerNav.find("a"));
          }
          /** @type {number} */
          var value = 0;
          $.each(n, function(event, n) {
            value = value + Number(eventsDict[event].unread_count);
          });
          t.text(value);
          t.toggle(value > 0);
        });
        $("body").on("pjax:complete", function(canCreateDiscussions) {
          that.resetInterval();
        });
        that.invoke();
      }
    });
    self.router.connect("^/(?:search)?$", function(n, o, a) {
      /**
       * @return {undefined}
       */
      function validate() {
        var t = $("#post-form");
        self.Form.setupForPage();
        self.EntryForm.setupSubmission(t, a);
        self.EntryForm.setupFormStatus(t, a);
        self.EntryForm.setupFoldedForm(t, a);
        self.User.setupFollowButton(a);
        if (t.hasClass("for-identified-user")) {
          self.EntryForm.setupIdentifiedUserForm(t, a);
        }
        self.Content.autopagerize(".js-post-list", a);
        t.on("olv:entryform:post:done", init);
        a.done(function() {
          t.off("olv:entryform:post:done", init);
          $("form.search").off("submit", self.Form.validateValueLength);
        });
      }
      /**
       * @param {?} _wid_attr
       * @param {string} data
       * @return {undefined}
       */
      function init(_wid_attr, data) {
        var $inside = $(".js-post-list");
        if (!$inside.length) {
          $inside = $("<div>", {
            class : "list post-list js-post-list"
          }).replaceAll(".no-content");
        }
        var layerE = $($.parseHTML(data)).filter("*");
        layerE.hide().fadeIn(400).prependTo($inside);
        var $WINDOW = $(window);
        $WINDOW.scrollTop(layerE.offset().top + layerE.outerHeight() / 2 - $WINDOW.height() / 2);
      }
      self.Entry.setupEmpathyButtons(a);
      self.Entry.setupHiddenContents(a);
      $("form.search").on("submit", self.Form.validateValueLength);
      var s;
      var loadCssDfd;
      var c = $(".content-loading-window");
      if (c.length) {
        var es_endpoint = o.search.substring(1);
        if (es_endpoint) {
          /** @type {string} */
          es_endpoint = "&" + es_endpoint;
        }
        s = self.Net.ajax({
          type : "GET",
          url : o.pathname + "?" + $.param({
            fragment : "activityfeed"
          }) + es_endpoint,
          silent : true
        }).done(function(data) {
          var n = $.parseHTML(data);
          var num = $(n).find("#main-body").children();
          $("#js-main").html(num);
          $(document).trigger("olv:activity:success", [data, n, num]);
        }).fail(function() {
          setTimeout(function() {
            c.remove();
            $(".content-load-error-window").removeClass("none");
          }, 5e3);
        });
        loadCssDfd = "friend" !== self.Cookie.get("view_activity_filter") ? self.Net.ajax({
          type : "GET",
          url : "/my/latest_following_related_profile_posts",
          silent : true
        }) : $.Deferred().resolve().promise();
      } else {
        s = $.Deferred().resolve().promise();
        loadCssDfd = $.Deferred().resolve().promise();
      }
      s.then(function() {
        validate();
      });
      $.when(s, loadCssDfd).done(function(canCreateDiscussions, testPair) {
        var o = $($.parseHTML($.trim(testPair[0])));
        /** @type {!Array} */
        var a = [];
        $("[data-latest-following-relation-profile-post-placeholder]").each(function(e, n) {
          var i = o.get(e);
          if (i) {
            $(n).html(i);
            a.push(n);
          }
        });
        $(a).removeClass("none");
      });
      a.done(function() {
        if (s.abort) {
          s.abort();
        }
      });
    });
    self.router.connect("^(?:/|/communities)$", function(n, canCreateDiscussions, sectionInfo) {
      /**
       * @param {string} name
       * @return {undefined}
       */
      function render(name) {
        $(".tab-body").addClass("none");
        $("#tab-" + name + "-body").removeClass("none");
        $(".platform-tab a").removeClass("selected");
        $("#tab-" + name).addClass("selected");
      }
      /**
       * @param {!Event} event
       * @return {undefined}
       */
      function show(event) {
        var target = $(this);
        if (!self.Form.isDisabled(target) && !event.isDefaultPrevented()) {
          event.preventDefault();
          var a = $(this).attr("data-platform");
          render(a);
          self.Cookie.set("view_platform", a);
        }
      }
      /**
       * @param {!Event} event
       * @return {undefined}
       */
      function toggle(event) {
        if (!event.isDefaultPrevented()) {
          event.preventDefault();
          var downloadHref = $(this).find('select[name="category"]').val();
          window.location.href = downloadHref;
        }
      }
      var viewModel = self.Cookie.get("view_platform");
      if (viewModel) {
        render(viewModel);
      }
      self.Community.setupHotDiaryPostSlideShow(sectionInfo);
      $(".platform-tab a").on("click", show);
      $(".filter-select-page form").on("submit", toggle);
      $("form.search").on("submit", self.Form.validateValueLength);
      sectionInfo.done(function() {
        $(".platform-tab a").off("click", show);
        $(".filter-select-page form").off("submit", toggle);
        $("form.search").off("submit", self.Form.validateValueLength);
      });
    });
    self.router.connect("^/communities/categories/[a-z0-9\\-_]+$", function(n, canCreateDiscussions, a) {
      /**
       * @param {!Event} event
       * @return {undefined}
       */
      function toggle(event) {
        if (!event.isDefaultPrevented()) {
          event.preventDefault();
          var downloadHref = $(this).find('select[name="category"]').val();
          window.location.href = downloadHref;
        }
      }
      self.Content.autopagerize(".community-list", a);
      $("#filter-select-page form").on("submit", toggle);
      a.done(function() {
        $("#filter-select-page form").off("submit", toggle);
      });
    });
    self.router.connect("^/(identified_user_posts|news/my_news)+$", function(canCreateDiscussions, n, Validatable) {
      if (!self.Guest.isGuest()) {
        self.User.setupFollowButton(Validatable);
      }
      self.Content.autopagerize(".js-post-list", Validatable);
    });
    self.router.connect("^/communities/(?:favorites|played)$", function(canCreateDiscussions, n, Validatable) {
      self.Content.autopagerize(".community-list", Validatable);
    });
    self.router.connect("^/search/communities$", function(n, canCreateDiscussions, sectionInfo) {
      $("form.search").on("submit", self.Form.validateValueLength);
      sectionInfo.done(function() {
        $("form.search").off("submit", self.Form.validateValueLength);
      });
    });
    self.router.connect("^(/communities|/messages)/[^/]+(/diary|/new|/hot|/in_game|/old)?$", function(n, canCreateDiscussions, a) {
      /**
       * @return {undefined}
       */
      function turnOn() {
        $(".multi_timeline-topic-filter").addClass("open");
      }
      /**
       * @param {!Event} event
       * @param {string} data
       * @return {undefined}
       */
      function init(event, data) {
        var itemid = $(event.currentTarget).attr("data-post-list-container-selector");
        /** @type {boolean} */
        var useDisableField = !!itemid;
        var $result = $(useDisableField ? itemid + " .js-post-list" : ".js-post-list");
        if (useDisableField) {
          if ($result.hasClass("empty")) {
            $result.removeClass("empty").children().remove();
          }
        } else {
          if (!$result.length) {
            $result = $("<div>", {
              class : "list post-list js-post-list"
            }).replaceAll(".no-content");
          }
        }
        var layerE = $($.parseHTML(data)).filter("*");
        layerE.hide().fadeIn(400).prependTo($result);
        var $WINDOW = $(window);
        $WINDOW.scrollTop(layerE.offset().top + layerE.outerHeight() / 2 - $WINDOW.height() / 2);
      }
      self.Entry.setupHiddenContents(a);
      self.Content.autopagerize(".js-post-list", a);
      self.Community.setupPostFilter(a);
      var t = $("#post-form");
      if (!self.Guest.isGuest()) {
        self.Entry.setupEmpathyButtons(a);
        self.EntryForm.setupSubmission(t, a);
        self.EntryForm.setupFormStatus(t, a);
        self.EntryForm.setupFoldedForm(t, a);
        self.EntryForm.setupAlbumImageSelector(t, a);
        if (t.hasClass("for-identified-user")) {
          self.EntryForm.setupIdentifiedUserForm(t, a);
        }
        if ($(".toggle-button").length) {
          self.User.setupFollowButton(a);
        }
        $(document).on("click", ".js-topic-post-button", turnOn);
        a.done(function() {
          $(document).off("click", ".js-topic-post-button", turnOn);
        });
      }
      if ($(".age-gate-dialog").length) {
        self.Community.setupAgeGateDialog(a);
      }
      t.on("olv:entryform:post:done", init);
      a.done(function() {
        t.off("olv:entryform:post:done", init);
      });
    });
    self.router.connect("^/communities/[0-9]+(/artwork(/hot|/new)?|/topic(/new|/open)?)$", function(stdouts, canCreateDiscussions, a) {
      /**
       * @param {?} rfb
       * @param {string} text
       * @return {undefined}
       */
      function init(rfb, text) {
        var $inside = $(".js-post-list");
        if (!$inside.length) {
          $inside = $("<div>", {
            class : "list multi-timeline-post-list js-post-list"
          }).replaceAll(".no-content");
        }
        var layerE = $($.parseHTML(text)).filter("*");
        layerE.hide().fadeIn(400).prependTo($inside);
        if (/^\/topic(?:\/(?:new|open))?$/.test(stdouts[1])) {
          self.EntryForm.onTopicPostCreated(t, a);
          self.EntryForm.setupFoldedForm(t, a);
        }
        var $WINDOW = $(window);
        $WINDOW.scrollTop(layerE.offset().top + layerE.outerHeight() / 2 - $WINDOW.height() / 2);
      }
      self.Entry.setupHiddenContents(a);
      self.Content.autopagerize(".js-post-list", a);
      self.Community.setupPostFilter(a);
      var t = $("#post-form");
      if (!self.Guest.isGuest()) {
        self.Entry.setupEmpathyButtons(a);
        self.EntryForm.setupSubmission(t, a);
        self.EntryForm.setupFormStatus(t, a);
        self.EntryForm.setupFoldedForm(t, a);
        self.EntryForm.setupAlbumImageSelector(t, a);
        if (t.hasClass("for-identified-user")) {
          self.EntryForm.setupIdentifiedUserForm(t, a);
        }
        if ($(".toggle-button").length) {
          self.User.setupFollowButton(a);
        }
      }
      if ($(".age-gate-dialog").length) {
        self.Community.setupAgeGateDialog(a);
      }
      t.on("olv:entryform:post:done", init);
      a.done(function() {
        t.off("olv:entryform:post:done", init);
      });
    });
    self.router.connect(/^\/posts\/([0-9A-Za-z\-_]+)$/, function(n, canCreateDiscussions, item) {
      /**
       * @param {?} event
       * @param {string} data
       * @return {undefined}
       */
      function update(event, data) {
        var $WINDOW = $(window);
        var layerE = $($.parseHTML(data)).filter("*");
        layerE.hide().fadeIn(400).appendTo(".reply-list");
        $WINDOW.scrollTop(layerE.offset().top + layerE.outerHeight() / 2 - $WINDOW.height() / 2);
        self.Entry.incrementReplyCount(1);
      }
      /**
       * @param {!Event} options
       * @param {?} guard
       * @return {undefined}
       */
      function callback(options, guard) {
        var a = $(options.target);
        if (a.attr("data-is-post")) {
          self.Form.toggleDisabled(a, true);
        } else {
          a.remove();
        }
      }
      self.Entry.setupHiddenContents(item);
      self.Entry.setupMoreRepliesButtons(item);
      self.SocialButton.setup(item);
      var s = $("#reply-form");
      if (!self.Guest.isGuest()) {
        self.Entry.setupPostEmpathyButton(item);
        self.Entry.setupEditButtons(item);
        self.EntryForm.setupSubmission(s, item);
        self.EntryForm.setupFormStatus(s, item);
        self.EntryForm.setupAlbumImageSelector(s, item);
        if (s.hasClass("for-identified-user")) {
          self.EntryForm.setupIdentifiedUserForm(s, item);
        }
        self.Entry.setupCloseTopicPostButton(item);
      }
      self.Entry.setupBodyLanguageSelector(item);
      self.Entry.setupMoreContentButton(item);
      $(document).on("olv:entryform:post:done", update);
      $(document).on("olv:report:done", callback);
      item.done(function() {
        $(document).off("olv:entryform:post:done", update);
        $(document).off("olv:report:done", callback);
      });
    });
    self.router.connect(/^\/replies\/([0-9A-Za-z\-_]+)$/, function(n, canCreateDiscussions, item) {
      /**
       * @param {!Event} options
       * @param {?} guard
       * @return {undefined}
       */
      function callback(options, guard) {
        var a = $(options.target);
        if (a.attr("data-is-post")) {
          self.Form.toggleDisabled(a, true);
        } else {
          a.remove();
        }
      }
      self.SocialButton.setup(item);
      var r = $("#reply-form");
      if (!self.Guest.isGuest()) {
        self.Entry.setupPostEmpathyButton(item);
        self.Entry.setupEditButtons(item);
        self.EntryForm.setupSubmission(r, item);
        self.EntryForm.setupFormStatus(r, item);
      }
      self.Entry.setupBodyLanguageSelector(item);
      $(document).on("olv:report:done", callback);
      item.done(function() {
        $(document).off("olv:report:done", callback);
      });
    });
    self.router.connect("^/users$", function(n, canCreateDiscussions, a) {
      self.Content.autopagerize("#searched-user-list", a);
      if (!self.Guest.isGuest()) {
        self.User.setupFollowButton(a);
      }
      $("form.search").on("submit", self.Form.validateValueLength);
      a.done(function() {
        $("form.search").off("submit", self.Form.validateValueLength);
      });
    });
    self.router.connect("^/users/[0-9a-zA-Z\\-_.]+/(empathies|posts)$", function(canCreateDiscussions, n, Validatable) {
      self.Content.autopagerize(".js-post-list", Validatable);
    });
    self.router.connect("^/users/[0-9a-zA-Z\\-_.]+(/friends|/following|/followers)$", function(canCreateDiscussions, n, Validatable) {
      self.Content.autopagerize("#friend-list-content", Validatable);
    });
    self.router.connect("^/users/[0-9a-zA-Z\\-_.]+(/diary)$", function(n, o, a) {
      /**
       * @param {?} _wid_attr
       * @param {string} data
       * @return {undefined}
       */
      function init(_wid_attr, data) {
        var $question = $(".js-post-list");
        $question.find(".no-content").addClass("none");
        var layerE = $($.parseHTML(data)).filter("*");
        layerE.hide().fadeIn(400).prependTo($question);
        $this.remove();
        window.history.replaceState(window.history.state, "", o.href.replace(/\?.*/, ""));
        var mElmOrSub = $(document).find("#js-my-post-count");
        if (mElmOrSub[0]) {
          mElmOrSub.text(+mElmOrSub.text() + 1);
        }
        var $WINDOW = $(window);
        $WINDOW.scrollTop(layerE.offset().top + layerE.outerHeight() / 2 - $WINDOW.height() / 2);
      }
      /**
       * @param {?} name
       * @param {?} funcOrValue
       * @return {undefined}
       */
      function r(name, funcOrValue) {
        $this.remove();
      }
      /**
       * @param {!Event} options
       * @param {?} guard
       * @return {undefined}
       */
      function callback(options, guard) {
        self.Form.toggleDisabled($(options.target), true);
      }
      self.Entry.setupHiddenContents(a);
      self.Content.autopagerize(".js-post-list", a);
      var $this = $("#post-form");
      if (!self.Guest.isGuest()) {
        self.Entry.setupEmpathyButtons(a);
        self.EntryForm.setupSubmission($this, a);
        self.EntryForm.setupFormStatus($this, a);
        if ($this.hasClass("for-identified-user")) {
          self.EntryForm.setupIdentifiedUserForm($this, a);
        }
      }
      $(document).on("olv:report:done", callback);
      $this.on("olv:entryform:post:done", init);
      var rect = $this.find(".cancel-button");
      rect.on("click", r);
      a.done(function() {
        showButton.off("click");
        $(document).off("olv:report:done", callback);
        $this.off("olv:entryform:post:done", init);
        rect.off("click", r);
      });
    });
    self.router.connect("^/users/[0-9a-zA-Z\\-_.]+(/friends|/following|/followers|/empathies|/posts)?$", function(n, canCreateDiscussions, a) {
      /**
       * @param {!Event} options
       * @param {?} guard
       * @return {undefined}
       */
      function callback(options, guard) {
        self.Form.toggleDisabled($(options.target), true);
      }
      /**
       * @param {?} p
       * @param {undefined} v
       * @return {undefined}
       */
      function r(p, v) {
        if ($("#user-content.is-visitor").length) {
          $("#js-following-count").text(v);
        }
      }
      self.User.setupFollowButton(a, {
        container : ".main-column",
        noReloadOnFollow : true
      });
      self.Entry.setupHiddenContents(a);
      $(document).on("olv:report:done", callback);
      $(document).on("olv:visitor:following-count:change", r);
      a.done(function() {
        showButton.off("click");
        $(document).off("olv:report:done", callback);
        $(document).off("olv:visitor:following-count:change", r);
      });
      self.Entry.setupEmpathyButtons(a);
    });
    self.router.connect("^/users/[0-9a-zA-Z\\-_.]+/favorites$", function(canCreateDiscussions, n, Validatable) {
      self.Content.autopagerize(".community-list", Validatable);
    });
    self.router.connect("^/settings/(?:account|profile|themes)$", function(n, canCreateDiscussions, sectionInfo) {
      /**
       * @param {!Event} event
       * @return {undefined}
       */
      function show(event) {
        var target = $(this);
        var form = target.closest("form");
        if (!(self.Form.isDisabled(target) || event.isDefaultPrevented())) {
          event.preventDefault();
          self.Form.submit(form, target).done(function(canCreateDiscussions) {
            self.showMessage("", self.loc("olv.portal.dialog.apply_settings_done"));
          });
        }
      }
      /**
       * @param {?} singleSequence
       * @return {undefined}
       */
      function test(singleSequence) {
        var handler = $(this);
        self.showConfirm(self.loc("olv.portal.profile_post"), self.loc("olv.portal.profile_post.confirm_remove"), {
          okLabel : self.loc("olv.portal.button.remove"),
          cancelLabel : self.loc("olv.portal.stop")
        }).done(function(canCreateDiscussions) {
          if (canCreateDiscussions) {
            self.Form.post("/settings/profile_post.unset.json", null, handler).done(function() {
              handler.trigger("olv:entry:profile-post:remove");
              handler.remove();
            });
          }
        });
      }
      /**
       * @param {?} keyBindingMapper
       * @return {undefined}
       */
      function initialize(keyBindingMapper) {
        var a = $();
        var $disableButton = $();
        var n = $("#favorite-game-genre select");
        n.each(function() {
          var e = $(this);
          var o = e.find("option[value=" + e.val() + "]").attr("data-is-configurable");
          if (null != o && "0" != o) {
            n.filter(function() {
              return !$(this).is(e);
            }).each(function() {
              var img = $(this).find("option[value=" + e.val() + "]");
              a = a.add(img);
            });
          }
        });
        $disableButton = n.find("option").filter(function() {
          return !$(this).is(a);
        });
        a.prop("disabled", true);
        $disableButton.prop("disabled", false);
      }
      initialize();
      $(document).on("click", ".apply-button", show);
      $(document).on("click", "#profile-post", test);
      $(document).on("change", "#favorite-game-genre select", initialize);
      sectionInfo.done(function() {
        $(document).off("click", ".apply-button", show);
        $(document).off("click", "#profile-post", test);
        $(document).off("change", "#favorite-game-genre select", initialize);
      });
    });
    self.router.connect("^(/users/[0-9a-zA-Z\\-_.]+|/communities/(favorites|played)|/my_menu|/settings/profile)", function(canCreateDiscussions, n, tResult) {
      self.User.setupUserSidebar(tResult);
    });
    self.router.connect("^/communities/[0-9]+", function(canCreateDiscussions, n, item) {
      self.Community.setupCommunitySidebar(item);
      self.SocialButton.setup(item);
    });
    self.init.done(function() {
      self.CookiePolicyNotice.setup();
    });
    self.GoogleAnalytics = {};
    /**
     * @param {(Object|string)} url
     * @return {undefined}
     */
    self.GoogleAnalytics.setCommonVars = function(url) {
      var element = $(document.body);
      var NULL_VALUE = element.attr("data-hashed-pid");
      var hash = $(".body-content").attr("data-region") || element.attr("data-user-region") || "";
      if (url) {
        var hasAttendees = url.pathname.match(new RegExp("^/titles/([0-9]+)/([0-9]+)"));
        var hprefix = hasAttendees ? hasAttendees[1] : "";
        var tprefix = hasAttendees ? hasAttendees[2] : "";
        ga("set", "dimension16", tprefix);
        ga("set", "dimension17", hprefix);
      }
      if (ga("set", "dimension7", hash), ga("set", "dimension13", "PC"), NULL_VALUE) {
        var hash = element.attr("data-country") || "";
        var customData = element.attr("data-lang") || "";
        var category = element.attr("data-user-region") || "";
        var url = element.attr("data-age") || "";
        var domain = element.attr("data-gender") || "";
        var round = element.attr("data-game-skill");
        /** @type {string} */
        round = "1" === round ? "beginner" : "2" === round ? "intermediate" : "3" === round ? "advanced" : "";
        var value = element.attr("data-follow-done");
        /** @type {string} */
        value = "1" === value ? "yes" : "0" === value ? "no" : "";
        var val = element.attr("data-post-done");
        /** @type {string} */
        val = "1" === val ? "yes" : "0" === val ? "no" : "";
        ga("set", "userId", NULL_VALUE);
        ga("set", "dimension1", hash);
        ga("set", "dimension2", customData);
        ga("set", "dimension3", category);
        ga("set", "dimension4", url);
        ga("set", "dimension5", domain);
        ga("set", "dimension6", round);
        ga("set", "dimension8", value);
        ga("set", "dimension9", val);
      }
    };
    /**
     * @param {(Object|string)} newLocation
     * @return {undefined}
     */
    self.GoogleAnalytics.refleshLocation = function(newLocation) {
      ga("set", "location", newLocation.href);
    };
    /**
     * @param {(Object|string)} url
     * @return {undefined}
     */
    self.GoogleAnalytics.trackPageView = function(url) {
      self.GoogleAnalytics.refleshLocation(url);
      self.GoogleAnalytics.setCommonVars(url);
      ga("send", "pageview");
    };
    /**
     * @param {string} message
     * @return {undefined}
     */
    self.GoogleAnalytics.trackError = function(message) {
      self.GoogleAnalytics.setCommonVars();
      ga("send", "exception", {
        exDescription : message
      });
    };
    /**
     * @param {!Object} $el
     * @return {?}
     */
    self.GoogleAnalytics.createEventVars = function($el) {
      return {
        dimension10 : $el.attr("data-community-id") || "",
        dimension11 : $el.attr("data-title-id") || "",
        dimension12 : $el.attr("data-url-id") || "",
        dimension14 : $el.attr("data-post-with-screenshot") || "",
        dimension15 : $el.attr("data-post-content-type") || ""
      };
    };
    /**
     * @param {string} category
     * @param {string} type
     * @param {?} label
     * @param {?} value
     * @return {undefined}
     */
    self.GoogleAnalytics.trackEvent = function(category, type, label, value) {
      ga("send", "event", category, type, label, value);
    };
    self.router.connect(/^/, function(n, url, a) {
      var inputel = $(".track-error");
      if (inputel.length > 0) {
        self.GoogleAnalytics.trackError(inputel.attr("data-track-error"));
      } else {
        self.GoogleAnalytics.trackPageView(url);
      }
    });
    $(document).on("olv:ajax:error", function(canCreateDiscussions, result, isSlidingUp, testsStatus) {
      if (testsStatus.status) {
        self.GoogleAnalytics.trackError(result.error_code);
      }
    });
    /**
     * @param {string} event
     * @param {string} message
     * @param {string} url
     * @return {undefined}
     */
    window.onerror = function(event, message, url) {
      /** @type {string} */
      var error_msg = message + ":" + url + " - " + event;
      self.GoogleAnalytics.trackError(error_msg);
    };
    self.init.done(function($) {
      $(document).on("click", "[data-track-action]", function(n) {
        var $el = $(this);
        if (!self.Form.isDisabled($el) || void 0 !== $el.attr("data-modal-open")) {
          var category = $el.attr("data-track-category");
          var action = $el.attr("data-track-action");
          var label = $el.attr("data-track-label");
          var value = self.GoogleAnalytics.createEventVars($el);
          self.GoogleAnalytics.trackEvent(category, action, label, value);
        }
      });
      $(document).on("olv:modal:report-violation olv:modal:report-violator", function(canCreateDiscussions, options, sectionInfo) {
        /**
         * @return {undefined}
         */
        function trackClick() {
          var busy = element.find("option:selected").attr("data-track-action");
          $el.attr("data-track-action", busy);
        }
        var $el = options.element.find(".post-button");
        var i = options.triggerElement.attr("data-can-report-spoiler");
        var element = "1" === i ? options.element.find("select.can-report-spoiler") : "0" === i ? options.element.find("select.cannot-report-spoiler") : options.element.find('select[name="type"]');
        var label = options.triggerElement.attr("data-track-label");
        var range = options.triggerElement.attr("data-url-id") || "";
        $el.attr("data-track-label", label);
        $el.attr("data-url-id", range);
        element.on("change", trackClick);
        sectionInfo.done(function() {
          element.off("change", trackClick);
        });
      });
      $(document).on("olv:community:favorite:toggle", function(jEvent, n) {
        $(jEvent.target).attr("data-track-action", n ? "cancelFavorite" : "favorite");
      });
      $(document).on("olv:entry:empathy:toggle", function(jEvent, n) {
        $(jEvent.target).attr("data-track-action", n ? "cancelYeah" : "yeah");
      });
      /**
       * @param {!Object} width
       * @return {undefined}
       */
      var on_focusin_clear_placeholder = function fn(width) {
        var layerG = width.find("input[type=submit]");
        var n = width.find('input[name="album_image_id"]').length && width.find('input[name="album_image_id"]').val().length > 0;
        var readable = width.find('input[name="screenshot"]').length && width.find('input[name="screenshot"]').val().length > 0;
        layerG.attr("data-post-with-screenshot", n || readable ? "screenshot" : "nodata");
      };
      $(document).on("olv:entryform:updatescreenshot", function(jEvent) {
        var input = $(jEvent.target);
        on_focusin_clear_placeholder(input);
      });
      $(document).on("olv:entryform:fileselect", function(jEvent, mei) {
        var o = $(jEvent.target);
        var bind = $(mei).find('input[type="submit"]');
        if ("screenshot" === o.attr("name")) {
          bind.attr("data-post-with-screenshot", "screenshot");
        } else {
          if ("painting" === o.attr("name")) {
            bind.attr("data-post-content-type", "draw");
          }
        }
      });
      $(document).on("olv:entryform:reset", function(jEvent) {
        var input = $(jEvent.target);
        input.find("input[type=submit]").attr("data-post-content-type", "text");
        setTimeout(function() {
          on_focusin_clear_placeholder(input);
        }, 0);
      });
      $(document).on("olv:modal:unfollow", function(canCreateDiscussions, e, n) {
        var $el = e.element.find(".ok-button");
        $el.attr("data-track-category", "follow");
        $el.attr("data-track-action", "unfollow");
        $el.attr("data-track-label", "user");
      });
      $(document).on("olv:entry:profile-post:set", function(canCreateDiscussions) {
        self.GoogleAnalytics.trackEvent("profilePost", "setProfilePost");
      });
      $(document).on("olv:entry:profile-post:remove", function(canCreateDiscussions) {
        self.GoogleAnalytics.trackEvent("profilePost", "unsetProfilePost");
      });
      $(document).on("olv:entry:post:delete", function(n, o) {
        var $el = $(o.option);
        var category = $el.attr("data-track-category");
        var action = $el.attr("data-track-action");
        var label = $el.attr("data-track-label");
        var value = self.GoogleAnalytics.createEventVars($el);
        self.GoogleAnalytics.trackEvent(category, action, label, value);
      });
    });
  }
}).call(undefined, jQuery, Olv);
Olv.Locale.Data = {
  "olv.portal.age_gate.select_label" : {
    "value" : "Please enter your date of birth."
  },
  "olv.portal.album.delete_confirm" : {
    "value" : "Are you sure you want to delete this?"
  },
  "olv.portal.button.remove" : {
    "value" : "Yes"
  },
  "olv.portal.cancel" : {
    "value" : "Cancel"
  },
  "olv.portal.close" : {
    "value" : "Close"
  },
  "olv.portal.dialog.apply_settings_done" : {
    "value" : "Settings saved."
  },
  "olv.portal.dialog.report_spoiler_done" : {
    "value" : "Spoiler reported. Thank you for your help!"
  },
  "olv.portal.dialog.report_violation_done" : {
    "value" : "Violation reported. Thank you for your help!"
  },
  "olv.portal.edit.action.close_topic_post" : {
    "value" : "Close for Comments"
  },
  "olv.portal.edit.action.close_topic_post.confirm" : {
    "value" : "It will no longer be possible to post comments on this discussion. Is that OK? (This action cannot be reversed.)"
  },
  "olv.portal.edit.edit_post" : {
    "value" : "Edit Post"
  },
  "olv.portal.edit.edit_reply" : {
    "value" : "Edit Comment"
  },
  "olv.portal.error.500.for_offdevice" : {
    "value" : "An error occurred.\nPlease try again later."
  },
  "olv.portal.error.album_limit_exceeded" : {
    "value" : "Unable to save because the maximum number of screenshots that can be saved has been reached. Please delete some saved screenshots, and then try again."
  },
  "olv.portal.error.code" : {
    "args" : [1],
    "value" : "Error Code: %s"
  },
  "olv.portal.error.code %1" : {
    "args" : [1],
    "value" : "Error Code: %s"
  },
  "olv.portal.error.code [_1]" : {
    "args" : [1],
    "value" : "Error Code: %s"
  },
  "olv.portal.error.daily_post_limit_exceeded" : {
    "value" : "You have already exceeded the number of posts that you can contribute in a single day. Please try again tomorrow."
  },
  "olv.portal.error.failed_to_connect.for_offdevice" : {
    "value" : "An error occurred."
  },
  "olv.portal.error.network_unavailable.for_offdevice" : {
    "value" : "Cannot connect to the Internet. Please check your network connection and try again."
  },
  "olv.portal.error.post_time_restriction" : {
    "args" : [],
    "value" : "Multiple posts cannot be made in such a short period of time. Please try posting again later."
  },
  "olv.portal.error.post_time_restriction %1" : {
    "args" : [],
    "value" : "Multiple posts cannot be made in such a short period of time. Please try posting again later."
  },
  "olv.portal.error.post_time_restriction [_1]" : {
    "args" : [],
    "value" : "Multiple posts cannot be made in such a short period of time. Please try posting again later."
  },
  "olv.portal.followlist.confirm_unfollow_with_name" : {
    "args" : [1],
    "value" : "Remove %s from your follow list?"
  },
  "olv.portal.followlist.confirm_unfollow_with_name %1" : {
    "args" : [1],
    "value" : "Remove %s from your follow list?"
  },
  "olv.portal.followlist.confirm_unfollow_with_name [_1]" : {
    "args" : [1],
    "value" : "Remove %s from your follow list?"
  },
  "olv.portal.miitoo.frustrated" : {
    "value" : "Yeah..."
  },
  "olv.portal.miitoo.frustrated.delete" : {
    "value" : "Unyeah"
  },
  "olv.portal.miitoo.happy" : {
    "value" : "Yeah!"
  },
  "olv.portal.miitoo.happy.delete" : {
    "value" : "Unyeah"
  },
  "olv.portal.miitoo.like" : {
    "value" : "Yeah\u2665"
  },
  "olv.portal.miitoo.like.delete" : {
    "value" : "Unyeah"
  },
  "olv.portal.miitoo.normal" : {
    "value" : "Yeah!"
  },
  "olv.portal.miitoo.normal.delete" : {
    "value" : "Unyeah"
  },
  "olv.portal.miitoo.puzzled" : {
    "value" : "Yeah..."
  },
  "olv.portal.miitoo.puzzled.delete" : {
    "value" : "Unyeah"
  },
  "olv.portal.miitoo.surprised" : {
    "value" : "Yeah!?"
  },
  "olv.portal.miitoo.surprised.delete" : {
    "value" : "Unyeah"
  },
  "olv.portal.ok" : {
    "value" : "OK"
  },
  "olv.portal.post.delete_confirm" : {
    "value" : "Delete this post?"
  },
  "olv.portal.profile_post" : {
    "value" : "Favorite Post"
  },
  "olv.portal.profile_post.confirm_remove" : {
    "value" : "Remove this post from your profile?\nThe original post will not be deleted."
  },
  "olv.portal.profile_post.confirm_update" : {
    "value" : "Set this post as your favorite?\nPlease note, it will replace any existing favorite post."
  },
  "olv.portal.profile_post.confirm_update.yes" : {
    "value" : "OK"
  },
  "olv.portal.profile_post.done" : {
    "value" : "Your favorite post has been set.\nWould you like to view your profile?"
  },
  "olv.portal.read_more_content" : {
    "value" : "Read More"
  },
  "olv.portal.reply.delete_confirm" : {
    "value" : "Delete this comment?"
  },
  "olv.portal.report.report_comment_id" : {
    "args" : [1],
    "value" : "Comment ID: %s"
  },
  "olv.portal.report.report_comment_id %1" : {
    "args" : [1],
    "value" : "Comment ID: %s"
  },
  "olv.portal.report.report_comment_id [_1]" : {
    "args" : [1],
    "value" : "Comment ID: %s"
  },
  "olv.portal.report.report_post_id" : {
    "args" : [1],
    "value" : "Post ID: %s"
  },
  "olv.portal.report.report_post_id %1" : {
    "args" : [1],
    "value" : "Post ID: %s"
  },
  "olv.portal.report.report_post_id [_1]" : {
    "args" : [1],
    "value" : "Post ID: %s"
  },
  "olv.portal.report.report_spoiler" : {
    "args" : [],
    "value" : "Report Spoilers to Miiverse Administrators"
  },
  "olv.portal.report.report_spoiler %1" : {
    "args" : [],
    "value" : "Report Spoilers to Miiverse Administrators"
  },
  "olv.portal.report.report_spoiler [_1]" : {
    "args" : [],
    "value" : "Report Spoilers to Miiverse Administrators"
  },
  "olv.portal.report.report_spoiler_comment" : {
    "args" : [],
    "value" : "Report Spoilers to Miiverse Administrators"
  },
  "olv.portal.report.report_spoiler_comment %1" : {
    "args" : [],
    "value" : "Report Spoilers to Miiverse Administrators"
  },
  "olv.portal.report.report_spoiler_comment [_1]" : {
    "args" : [],
    "value" : "Report Spoilers to Miiverse Administrators"
  },
  "olv.portal.report.report_violation" : {
    "args" : [],
    "value" : "Report Violation to Miiverse Administrators"
  },
  "olv.portal.report.report_violation %1" : {
    "args" : [],
    "value" : "Report Violation to Miiverse Administrators"
  },
  "olv.portal.report.report_violation [_1]" : {
    "args" : [],
    "value" : "Report Violation to Miiverse Administrators"
  },
  "olv.portal.report.report_violation_comment" : {
    "args" : [],
    "value" : "Report Violation to Miiverse Administrators"
  },
  "olv.portal.report.report_violation_comment %1" : {
    "args" : [],
    "value" : "Report Violation to Miiverse Administrators"
  },
  "olv.portal.report.report_violation_comment [_1]" : {
    "args" : [],
    "value" : "Report Violation to Miiverse Administrators"
  },
  "olv.portal.report.report_violation_message" : {
    "args" : [],
    "value" : "Report Violation to Miiverse Administrators"
  },
  "olv.portal.report.report_violation_message %1" : {
    "args" : [],
    "value" : "Report Violation to Miiverse Administrators"
  },
  "olv.portal.report.report_violation_message [_1]" : {
    "args" : [],
    "value" : "Report Violation to Miiverse Administrators"
  },
  "olv.portal.setup" : {
    "value" : "Set Up"
  },
  "olv.portal.show_more_content" : {
    "value" : "View Entire Post"
  },
  "olv.portal.stop" : {
    "value" : "Cancel"
  },
  "olv.portal.unfollow" : {
    "value" : "Unfollow"
  },
  "olv.portal.user.search.go" : {
    "value" : "View Profile"
  },
  "olv.portal.yes" : {
    "value" : "Yes"
  }
};
