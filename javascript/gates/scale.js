Scale.prototype = new Control
Scale.prototype.constructor = Scale
function Scale() {
    Control.apply(this, arguments)
    Control.s["apparent_radius"].subscribe("oninput", this, "update")
    Control.s["planet_radius"].subscribe("oninput", this, "update")
    this.apparent_radius = Control.s["apparent_radius"].value()
    this.planet_radius = Control.s["planet_radius"].value()
    this.update()
}

Scale.prototype.update = function (caller, value) {
    var name
    var k = 10000
    if( arguments.length > 1 ) {
        name = caller.constructor.name.underscore()
        this[name] = value
    }

    this.value( Math.round(this.apparent_radius / this.planet_radius * k) / k)
}
