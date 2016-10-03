import "./../style/default/EditCanvas";

export default React.createClass({

	componentDidMount() {
		console.log('\n\t EditCanvas_componentDidMount');
		
		var canvas = document.getElementById('editCanvas');
		paper.setup(canvas);
		console.log(paper);

		this.redrawEditCanvas();

		console.log('\t END EditCanvas_componentDidMount');
	},

	redrawEditCanvas() {
		console.log('\n\t redrawEditCanvas:');
		var data = this.props.data;

		var glyphSVGs = data.glyphs[data.selectedGlyph].svgPathData.split('Z');
		var path;
		var glyph = new paper.CompoundPath();

		/*
			FILL
		*/
		console.log('FILL');
		glyphSVGs.forEach(function(v, i, a){
			console.log('\t Compound Fill Path ' + i);
			if(!v) return;

			path = new paper.Path({pathData: (v+'Z')});

			if(data.selectedPath !== false && data.selectedPath === i){
				path.selected = true;
			}

			path.on('click', function () {
				this.selected = true;
			});

			glyph.addChild(path);

			console.log('\t\t clockwise ' + path.clockwise);
		});

		glyph.fillRule = 'nonzero';
		glyph.fillColor = 'slategray';
		// glyph.strokeWidth = 1;
		// glyph.strokeColor = 'gray';


		/*
			STROKE
		*/
/*		console.log('STROKE');
		glyph.children.forEach(function(v, i, a){
			console.log('\t Stroke Path ' + i);
			if(!v) return;

			path = new paper.Path(v.pathData);
			path.fillRule = 'nonzero';
			path.strokeWidth = 2;
			path.strokeColor = path.clockwise? 'lime' : 'orange';

			console.log('\t\t clockwise ' + path.clockwise);
			console.log('\t\t strokeColor ' + path.strokeColor);
		});
*/
		/*
			POINTS
		*/
		var text;
		console.log('POINTS');
		glyph.children.forEach(function(v, i, a){
			path = new paper.Path(v.pathData);

			path.segments.forEach(function(v, i, a){
				text = new paper.PointText(new paper.Point(v.point.x, v.point.y));
				text.fillColor = 'black';
				text.content = i;
			});
		});

		// paper.view.draw();

		console.log(glyph);
		console.log('\t END redrawEditCanvas');
	},

	clickOn() {

	},

	render() {
		return (
			<div className="centerframe">
				<canvas id="editCanvas"
					onClick={this.clickOn}
					data-paper-resize={true}
				></canvas>
			</div>
		)
	}
});