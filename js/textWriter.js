class TextWriter {
    constructor() {
		this.canvas = document.getElementById('text');
		this.context = this.canvas.getContext('2d');
	}
	clear() {			
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
    write(text, x, y, style) {        
		this._output(text, x, y, style, "left");
	}
	writeCentered(text, x, y, style) {
		this._output(text, x, y, style, "center");
	}
	_output(text, x, y, style, textAlign) {
		this.context.textAlign = textAlign;
		this.context.font = '16px "MECC"';
		this.context.fillStyle = style;
		this.context.fillText(text, x * 2, y * 2);
	}
}
if(!window.textWriter) window.textWriter = new TextWriter();