Slider.prototype = new Control
Slider.prototype.constructor = Slider
function Slider() {
    if (!arguments.length)
       return
    Control.apply(this, arguments)
    this.out_position = document.getElementById("data-" + this.constructor.name.underscore())

    this.html.oninput()
}

Slider.prototype.oninput = function (ev) {
    this.out_position.innerHTML = this.value()
}


var sliders = ["ApparentRadius", "PlanetRadius", "Amplitude", "Unwinding", "ExtraPhases", "CalculationSpeed"]

for (var i=0; i<sliders.length; i++){
    var name = sliders[i]
    eval( "function " + name + "() { Slider.apply(this, arguments) }")
    eval( name + ".prototype = new Slider")
    eval( name + ".prototype.constructor = " + name)
}

