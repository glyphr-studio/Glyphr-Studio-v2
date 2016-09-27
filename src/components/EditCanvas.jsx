import "script!./../../bower_components/paper/dist/paper-full.js";
import "./../style/default/EditCanvas";

export default React.createClass({
	redrawEditCanvas() {
		console.log('\n\t redrawEditCanvas:');
		var glyphSVGs = this.props.data.selectedGlyphPathData.split('Z');
		var path;
		var glyph = new paper.CompoundPath({children: [], fillRule: 'nonzero'});

		/*
			FILL
		*/
		console.log('FILL');
		glyphSVGs.forEach(function(v, i, a){
			console.log('\t Compound Fill Path ' + i);
			if(!v) return;

			path = new paper.Path({pathData: (v+'Z'), data: {}});

/*					// Working with stupid SVG - REMOVE 
					path.translate(new paper.Point(10, 10));
					if(i === 0 || i === 1) {
						// console.log('\t\t Reversing Path, it was \t' + path.pathData);
						path.reverse();
						path.clockwise = !path.clockwise;
						// console.log('\t\t Now its ' + path.pathData);
					}
					// End stupid*/
			
			glyph.addChild(path);

			console.log('\t\t clockwise ' + path.clockwise);
		});

		glyph.fillRule = 'nonzero';
		glyph.fillColor = 'slategray';
		glyph.strokeWidth = 1;
		glyph.strokeColor = 'gray';


		/*
			STROKE
		*/
		console.log('STROKE');
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

		console.log(glyph);
	},
	render() {
		return (
			<div className="centerframe">
				<script type="text/paperscript" data-paper-canvas="editCanvas"></script>
				<canvas id="editCanvas" 
					onClick={this.redrawEditCanvas} 
					data-paper-resize={true}
				></canvas>
			</div>
		)
	}
});