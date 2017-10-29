var controls = Control.s

function load() {

    var ctls_foo = document.getElementsByTagName("input")
    for (var i=0; i<ctls_foo.length; i++){
        var Constr = Control
        if (window[ctls_foo[i].id.class_name()])
            Constr = window[ctls_foo[i].id.class_name()]
        try {
            controls[ ctls_foo[i].id ] = new Constr(ctls_foo[i])
        }catch (err) { alert("Error: " + ctls_foo[i].id + "\n Check for input tag id.")}

    }

    new World(controls)
}



function main() {
    load()
}
