! function(i) {
    function t(t) {
        this._options = {
            checkOnLoad: !1,
            resetOnEnd: !1,
            loopCheckTime: 50,
            loopMaxNumber: 5,
            baitClass: "pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links",
            baitStyle: "width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;",
            debug: !1
        }, this._var = {
            version: "3.2.1",
            bait: null,
            checking: !1,
            loop: null,
            loopNumber: 0,
            event: {
                detected: [],
                notDetected: []
            }
        }, void 0 !== t && this.setOption(t);
        var e = this,
            t = function() {
                setTimeout(function() {
                    !0 === e._options.checkOnLoad && (!0 === e._options.debug && e._log("onload->eventCallback", "A check loading is launched"), null === e._var.bait && e._creatBait(), setTimeout(function() {
                        e.check()
                    }, 1))
                }, 1)
            };
        void 0 !== i.addEventListener ? i.addEventListener("load", t, !1) : i.attachEvent("onload", t)
    }
    t.prototype._options = null, t.prototype._var = null, t.prototype._bait = null, t.prototype._log = function(t, e) {
        console.log("[BlockAdBlock][" + t + "] " + e)
    }, t.prototype.setOption = function(t, e) {
        var o, i;
        for (i in void 0 !== e && (o = t, (t = {})[o] = e), t) this._options[i] = t[i], !0 === this._options.debug && this._log("setOption", 'The option "' + i + '" he was assigned to "' + t[i] + '"');
        return this
    }, t.prototype._creatBait = function() {
        var t = document.createElement("div");
        t.setAttribute("class", this._options.baitClass), t.setAttribute("style", this._options.baitStyle), this._var.bait = i.document.body.appendChild(t), this._var.bait.offsetParent, this._var.bait.offsetHeight, this._var.bait.offsetLeft, this._var.bait.offsetTop, this._var.bait.offsetWidth, this._var.bait.clientHeight, this._var.bait.clientWidth, !0 === this._options.debug && this._log("_creatBait", "Bait has been created")
    }, t.prototype._destroyBait = function() {
        i.document.body.removeChild(this._var.bait), !(this._var.bait = null) === this._options.debug && this._log("_destroyBait", "Bait has been removed")
    }, t.prototype.check = function(t) {
        if (void 0 === t && (t = !0), !0 === this._options.debug && this._log("check", "An audit was requested " + (!0 === t ? "with a" : "without") + " loop"), !0 === this._var.checking) return !0 === this._options.debug && this._log("check", "A check was canceled because there is already an ongoing"), !1;
        this._var.checking = !0, null === this._var.bait && this._creatBait();
        var e = this;
        return !(this._var.loopNumber = 0) === t && (this._var.loop = setInterval(function() {
            e._checkBait(t)
        }, this._options.loopCheckTime)), setTimeout(function() {
            e._checkBait(t)
        }, 1), !0 === this._options.debug && this._log("check", "A check is in progress ..."), !0
    }, t.prototype._checkBait = function(t) {
        var e, o = !1;
        null === this._var.bait && this._creatBait(), null === i.document.body.getAttribute("abp") && null !== this._var.bait.offsetParent && 0 != this._var.bait.offsetHeight && 0 != this._var.bait.offsetLeft && 0 != this._var.bait.offsetTop && 0 != this._var.bait.offsetWidth && 0 != this._var.bait.clientHeight && 0 != this._var.bait.clientWidth || (o = !0), void 0 !== i.getComputedStyle && (!(e = i.getComputedStyle(this._var.bait, null)) || "none" != e.getPropertyValue("display") && "hidden" != e.getPropertyValue("visibility") || (o = !0)), !0 === this._options.debug && this._log("_checkBait", "A check (" + (this._var.loopNumber + 1) + "/" + this._options.loopMaxNumber + " ~" + (1 + this._var.loopNumber * this._options.loopCheckTime) + "ms) was conducted and detection is " + (!0 === o ? "positive" : "negative")), !0 === t && (this._var.loopNumber++, this._var.loopNumber >= this._options.loopMaxNumber && this._stopLoop()), !0 === o ? (this._stopLoop(), this._destroyBait(), this.emitEvent(!0), !0 === t && (this._var.checking = !1)) : null !== this._var.loop && !1 !== t || (this._destroyBait(), this.emitEvent(!1), !0 === t && (this._var.checking = !1))
    }, t.prototype._stopLoop = function(t) {
        clearInterval(this._var.loop), this._var.loop = null, !(this._var.loopNumber = 0) === this._options.debug && this._log("_stopLoop", "A loop has been stopped")
    }, t.prototype.emitEvent = function(t) {
        !0 === this._options.debug && this._log("emitEvent", "An event with a " + (!0 === t ? "positive" : "negative") + " detection was called");
        var e, o = this._var.event[!0 === t ? "detected" : "notDetected"];
        for (e in o) !0 === this._options.debug && this._log("emitEvent", "Call function " + (parseInt(e) + 1) + "/" + o.length), o.hasOwnProperty(e) && o[e]();
        return !0 === this._options.resetOnEnd && this.clearEvent(), this
    }, t.prototype.clearEvent = function() {
        this._var.event.detected = [], this._var.event.notDetected = [], !0 === this._options.debug && this._log("clearEvent", "The event list has been cleared")
    }, t.prototype.on = function(t, e) {
        return this._var.event[!0 === t ? "detected" : "notDetected"].push(e), !0 === this._options.debug && this._log("on", 'A type of event "' + (!0 === t ? "detected" : "notDetected") + '" was added'), this
    }, t.prototype.onDetected = function(t) {
        return this.on(!0, t)
    }, t.prototype.onNotDetected = function(t) {
        return this.on(!1, t)
    }, i.BlockAdBlock = t, void 0 === i.blockAdBlock && (i.blockAdBlock = new t({
        checkOnLoad: !0,
        resetOnEnd: !0
    }))
}(window);