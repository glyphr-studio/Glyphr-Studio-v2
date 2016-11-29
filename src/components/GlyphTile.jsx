// import React

export default React.createClass({

	componentWillMount() {
		var data = this.props.data;

		if(!data.glyphs[this.props.codepoint]) return;
		console.log('\n\t GlyphTile_componentDidMount ' + this.props.codepoint);

		var glyphSVGs = data.glyphs[data.selectedGlyph].svgPathData.split('Z');
		console.log('\t Parsed Glyph SVG: \n' + glyphSVGs);


		// Create Glyph

		console.log('Compound Path');
		var glyph = new paper.CompoundPath({});
		var path;
		glyphSVGs.forEach(function(v, i, a){
			console.log('\t Compound Fill Path ' + i);
			if(!v) return;
			path = new paper.Path({pathData: (v+'Z')});
			glyph.addChild(path);
			console.log('\t\t clockwise ' + path.clockwise);
		});

		// Generate SVG
		// glyph.fitBounds(new paper.Path.Rectangle(0,0,50,50));
		this.svg = glyph.exportSVG({asString: false}).getAttribute('d');

		console.log(this.svg);

		console.log('\t END GlyphTile_componentDidMount ' + this.props.codepoint);
	},

	clickOn() {
		console.log('\n\t GlyphTile_onClick ' + this.props.codepoint)

		// console.log('\t END GlyphTile_onClick ' + this.props.codepoint);
	},

	render() {
		var codepoint = this.props.codepoint;
		var glyphname = unicodeNames[codepoint] || 'Name not found';
		var tooltip = glyphname + '\n' + codepoint;
		var glyphchar = String.fromCharCode(1*codepoint);
		var glyphpreview = glyphchar;	// In the future this could also be the true thumbnail preview
		var canvasID = 'tileCanvas_'+codepoint;

		if(codepoint === '0x0020') {
			glyphchar = 'space';
			glyphpreview = '';
		}

		if(this.props.data.glyphs[codepoint]){
			// glyphpreview = <canvas id={canvasID}></canvas>;
			glyphpreview = <svg width="46" height="46" viewBox="0 0 1000 1000"><path fill="black" d={this.svg}></path></svg>;
			console.log('\t this.svg is: \n' + this.svg);
		}

		// var breakpoint = (codepoint === '0x005A' || codepoint === '0x007A' || codepoint === '0x0021');
		var breakpoint = false;

		// console.log('Selected Glyph: ' + this.props.data.selectedGlyph + ' codepoint: ' + this.props.codepoint + ' are they equal? ');

		return (
			<div
				onClick={this.clickOn}
				className={this.props.data.selectedGlyph == codepoint ? "glyphtileselected" : "glyphtile"}
				title={tooltip}
				style={breakpoint? {marginRight: '3000px'} : {}}>
					<div className="preview">{glyphpreview}</div>
					<div className="name">{glyphchar}</div>
			</div>
		)
	}
});