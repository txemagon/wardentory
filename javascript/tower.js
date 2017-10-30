Tower.prototype.constructor = Tower
function Tower(controls, world) {
    var that = this
    this.controls = controls
    this.world = world

    this.c = 300000
    this.frequency = this.controls.frequency.value()
    this.amplitude = this.controls.amplitude.value()
    this.longitude = 2 * Math.PI * (this.controls.planet_radius.value() + this.controls.tower_height.value())

    this.step = this.figure_step()

    this.generated = []

    /* Oscillation in the antenna */
    this.generator = this.sin // Several functions allowed by changing this line

    var ev = ["frequency", "amplitude"]
    ev.each(function (ev) {
        that.controls[ev].subscribe("onchange", that, "update_" + ev)
    })
    ev = ["tower_height", "planet_radius"]
    ev.each(function (ev) {
        that.controls[ev].subscribe("onchange", that, "update_longitude" )
    })

    this.regenerate()

}

Tower.prototype.update_frequency = function(caller, value) {
    this.frequency = value
    this.regenerate()
}

Tower.prototype.update_amplitude = function(caller, value) {
    this.amplitude = value
    this.regenerate()
}

Tower.prototype.update_longitude = function(caller, value) {
    this.longitude = 2 * Math.PI * (this.controls.planet_radius.value() + this.controls.tower_height.value() )
    this.regenerate()
}

Tower.prototype.lambda = function() { return  this.c / this.frequency }
Tower.prototype.lambda_ratio = function() { return  this.c / this.longitude / this.frequency }
Tower.prototype.figure_step = function () {
    var px = this.lambda() * this.controls.scale.value()
    return this.step = 1 / ( this.frequency * px )
}

Tower.prototype.sin = function(t) { return  this.amplitude * Math.sin( 2*Math.PI*this.frequency * t )}
Tower.prototype.regenerate = function () {
    this.generated = []
    var T = 1 / this.frequency
    var step = this.figure_step()

    for (var t=0, i=0; t<T; t+=step, i++)
        this.generated[i] = this.generator(t)

    this.world.redraw()
}

Tower.prototype.get = function (t) { return this.generated[t / this.step] }
