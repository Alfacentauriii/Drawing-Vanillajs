//Al clicar sobre el botón undo se activa la función deshacer.
document.getElementById('undo').addEventListener('click', undo, false);
function undo(e) {
	if (strokes.length > 0) {
		undoedStrokes.push(strokes.pop());//Elimina el último trazo y guarda la información de trazo en el array undoedStrokes.
		document.getElementById('redo').disabled = false;
		if (strokes.length <= 0) {
			document.getElementById('undo').disabled = true;
		}
	}
	draw();
}

//Al clicar sobre el botón redo se activa la función rehacer.
document.getElementById('redo').addEventListener('click', redo, false);
function redo(e) {
	if (undoedStrokes.length > 0) {
		strokes.push(undoedStrokes.pop());
		document.getElementById('undo').disabled = false;
		if (undoedStrokes.length <= 0) {
			document.getElementById('redo').disabled = true;
		}
	}
	draw();
}

//Al clicar sobre el botón de la goma de borrar se activa la función clear, borra todos los trazos.
document.getElementById('clear').addEventListener('click', clear, false);
function clear(e) {
	document.getElementById('undo').disabled = true;
	strokes = [];
	draw();
}

//Añade clase activa(active) al color seleccionado y le asigna el valor del color al pincel(brush) seleccionado.
function selectedColor() {
	var circle = document.getElementsByClassName("circle");
	for (var i = 0; i < circle.length; i++) {
		circle[i].addEventListener("click", function (e) {
			//Asigna el color al brush(pincel)
			brush.color = e.target.value;
			//Elimina la clase active del botón anterior si ha sido asignada
			var current = document.getElementsByClassName("active");
			if (current.length > 0) {
				current[0].className = current[0].className.replace(" active", "");
			}
			//Añade la clase active al button clicado
			this.className += " active";
		}, false);
	}
}

//Añade clase activa(selected) al pincel seleccionado y le asigna el valor del tamaño al pincel(brush) seleccionado.
function selectedBrush() {
	var brushSize = document.getElementsByClassName("brushSize");
	for (var i = 0; i < brushSize.length; i++) {
		brushSize[i].addEventListener("click", function (e) {
			//Asigna el tamaño al brush(pincel)
			brush.size = e.target.value;
			//Elimina la clase selected del botón anterior si ha sido asignada 
			var current = document.getElementsByClassName("selected");
			if (current.length > 0) {
				current[0].className = current[0].className.replace(" selected", "");
			}
			//Añade la clase selected al botón clicado
			this.className += " selected";
		}, false);
	}
}
