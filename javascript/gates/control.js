
Control.prototype.constructor = Control
function Control(html_element){
    if (!html_element)
        return
    var that = this
    this.html = html_element
    this.listeners = { } // Format: event: [ [object, method], [object, method]]

    var responding_to = ["onchange", "oninput"]
    responding_to.each(function (ev) {
        that.listeners[ev] = []
        that.html[ev] = function () {
            if (!that)
                return
           var result = that.constructor.prototype[ev].apply(that, arguments)
           for (var i=0; i<that.listeners[ev].length; i++)
               that.listeners[ev][i][0][that.listeners[ev][i][1]](that, that.value())
           return result
        }
    })
}

Control.s = {}

Control.prototype.subscribe = function(ev, obj, method) {
    this.listeners[ev].push([obj, method])
}

Control.prototype.value = function () {
    if (!arguments.length)
        return this.html.valueAsNumber

    this.html.value = arguments[0]
}

Control.prototype.onchange = function() { }
Control.prototype.oninput = function() { }
