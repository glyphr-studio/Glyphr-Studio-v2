// import React
import * as hlpr from "../utils/helpers";
import Locale from "../locale/Locale";

export default React.createClass({

	componentWillMount() {
		var data = this.props.data;
		var currglyph = data._GP.glyphs[this.props.codepoint];

		if(!currglyph) return;
		hlpr.debug('\n\t GlyphTile_componentDidMount ' + this.props.codepoint);

		this.svg = currglyph.pathData;
		hlpr.debug('\t Parsed Glyph SVG: \n' + this.svg);

		hlpr.debug('\t END GlyphTile_componentDidMount ' + this.props.codepoint);
	},

	clickOn() {
		hlpr.debug('\n\t GlyphTile_onClick ' + this.props.codepoint)

		// hlpr.debug('\t END GlyphTile_onClick ' + this.props.codepoint);
	},

	render() {
		var codepoint = this.props.codepoint;
		var glyphname = Locale.get("unicode."+codepoint) || 'Name not found';
		var tooltip = glyphname + '\n' + codepoint;
		var glyphchar = String.fromCharCode(1*codepoint);
		var glyphpreview = glyphchar;	// In the future this could also be the true thumbnail preview
		var canvasID = 'tileCanvas_'+codepoint;

		if(codepoint === '0x0020') {
			glyphchar = 'space';
			glyphpreview = '';
		}

		if(this.props.data._GP.glyphs[codepoint]){
			// glyphpreview = <canvas id={canvasID}></canvas>;
			glyphpreview = <svg width="46" height="46" viewBox="0 0 1000 1000"><path fill="black" d={this.svg}></path></svg>;
			hlpr.debug('\t this.svg is: \n' + this.svg);
		}

		// var breakpoint = (codepoint === '0x005A' || codepoint === '0x007A' || codepoint === '0x0021');
		var breakpoint = false;

		// hlpr.debug('Selected Glyph: ' + this.props.data._UI.selected.glyph + ' codepoint: ' + this.props.codepoint + ' are they equal? ');

		return (
			<div
				onClick={this.clickOn}
				className={this.props.data._UI.selected.glyph == codepoint ? "glyphtileselected" : "glyphtile"}
				title={tooltip}
				style={breakpoint? {marginRight: '3000px'} : {}}>
					<div className="preview">{glyphpreview}</div>
					<div className="name">{glyphchar}</div>
			</div>
		)
	}
});