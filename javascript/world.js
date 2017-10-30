World.prototype.constructor = World
function World(controls) {
    var that = this
    this.controls = controls
    this.canvas   = document.getElementById("viewport").getContext("2d")
    var ev = ["apparent_radius", "tower_height", "planet_radius"]

    ev.each(function (ev) {
        that.controls[ev].subscribe("onchange", that, "update")
    })

    this.screen = { /* Cached values */
        width: 1000,
        height: 1000,
        center_x: 500,
        center_y: 500,
        earth_radius: this.controls.apparent_radius.value(),
        tower_height: this.controls.tower_height.value() * this.controls.scale.value(),
        scale: this.controls.scale.value()
    }

    this.tower = new Tower(controls, this)
    this.redraw()
}

World.prototype.origin = function() { return {x: this.screen.width / 2, y: this.screen.height / 2 } }

World.prototype.redraw = function() {
    if (!this.tower)
        return
    var ctx = this.canvas

    /* The World */
    ctx.clearRect(0,0, this.screen.width, this.screen.height)
    ctx.setLineDash([])
    ctx.beginPath()
    ctx.fillStyle = "blue"
    ctx.arc(this.screen.center_x, this.screen.center_y, this.screen.earth_radius, 0, 2 * Math.PI, true)
    ctx.fill()
    ctx.lineWidth = 2
    ctx.strokeStyle = "#000033"
    ctx.stroke()

    /* Electromagnetic layer */

    ctx.beginPath()
    ctx.arc(this.screen.center_x, this.screen.center_y, this.screen.earth_radius + this.screen.tower_height, 0, 2 * Math.PI, true)
    ctx.lineWidth = 1
    ctx.strokeStyle = "#000033"
    ctx.strokeStyle = "red"
    ctx.setLineDash([30,30,3,30])
    ctx.stroke()

    /* Paint the wave */
    var data_length = this.tower.generated.length
    var r = this.screen.earth_radius + this.screen.tower_height
    var cx = this.screen.center_x
    var cy = this.screen.center_y
    ctx.beginPath()
    ctx.setLineDash([])
    ctx.moveTo(cx, cy - r)
    var angle = 0
    var l_r = 2 * Math.PI * this.tower.lambda_ratio()
    for (var i=0; i<data_length; i++){
        angle =  l_r * i / data_length
        ctx.lineTo(cx + (r + this.tower.generated[i]) * Math.sin(angle),
                   cy - (r + this.tower.generated[i]) * Math.cos(angle))
    }
    ctx.stroke()


}

World.prototype.update = function(caller, value) {
    var name
    if (arguments.length > 1){
        name = caller.html.id
        this.screen.scale = this.controls.scale.value()
        this.screen.earth_radius = this.controls.apparent_radius.value()
        this.screen.tower_height = this.controls.tower_height.value() * this.screen.scale
        this.redraw()
    }
}


