var canvas, ctx,
	brush = {
		x: 0,
		y: 0,
		color: '#000000',
		size: 2,
		down: false
	},
	strokes = [], //Guardará las propiedades de los trazos realizadas.
	currentStroke = null, //Guardará las propiedades de el trazo actual.
	undoedStrokes = []; //Guardará las propiedades de los trazos borradas.

//Ajustes de canvas
canvas = document.getElementById('canvas');
canvas.width = 950;
canvas.height = 693;
ctx = canvas.getContext('2d');

document.getElementById('undo').disabled = true; //Activa el boton undo cuando vuvles a dibujar
document.getElementById('redo').disabled = true; //Activa el boton redo cuando vuvles a dibujar

//Función que permite realizar los trazos
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);//borra los píxeles especificados dentro de un rectángulo dado.
	ctx.lineCap = 'round';
	//Por cada trazo se asigna color, medida y coordenadas del ratón.
	for (var i = 0; i < strokes.length; i++) {
		var s = strokes[i];
		ctx.strokeStyle = s.color;
		ctx.lineWidth = s.size;
		ctx.beginPath();
		ctx.moveTo(s.points[0].x, s.points[0].y);
		for (var j = 0; j < s.points.length; j++) {
			var p = s.points[j];
			ctx.lineTo(p.x, p.y);
		}
		ctx.stroke();
	}
}

//
function mouseMovement(e) {
	brush.x = e.pageX - 117;//e.pageX guarda la coordenada horizontal cuando se activa un evento del ratón
	brush.y = e.pageY - 17;	//e.pageY guarda la coordenada vertical cuando se activa un evento del ratón

	//Va añadiendo al array points las cordenadas de la posición actual del ratón.
	currentStroke.points.push({
		x: brush.x,
		y: brush.y,
	});

	draw();
}
//Función que se activa al presionar el ratón
canvas.addEventListener('mousedown', function (e) {
	brush.down = true;
	document.getElementById('undo').disabled = false; //Activa el boton undo cuando vuvles a dibujar

	currentStroke = {
		color: brush.color,
		size: brush.size,
		points: []
	};

	strokes.push(currentStroke); //Guarda los trazos realizados(color, medida y coordenadas) del último trazo.
	mouseMovement(e);
});

//Detecta si se ha dejado de clicar el ratón para no seguir guardando la info de los trazos
canvas.addEventListener('mouseup', function (e) {
	brush.down = false;
	mouseMovement(e);
	currentStroke = null;
});
//Función que se activa cuando el ratón está en movimiento.
canvas.addEventListener('mousemove', function (e) {
	if (brush.down) {
		mouseMovement(e);
	}
});

undo(); //Deshacer los trazos realizados
redo(); //Rehacer los trazos eliminados
clear(); //Borrar todos los trazos

selectedColor(); //Resalta el tamaño del color seleccionada.
selectedBrush(); //Desplaza el grosor de la brocha seleccionada.
