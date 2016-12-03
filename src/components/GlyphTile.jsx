// import React;
import {storage} from "./../lib/storage/Storage";
import Locale from "./../locale/Locale";
import * as encoding from "./../lib/encoding/encoding";
import PluginEventUnit from "./../lib/core/pluginEventStream/PluginEventUnit";


// Panel Input Event Emitter
let gtee = new PluginEventUnit('glyphTile', 3);

export default React.createClass({
  propTypes: {
    unicode: React.PropTypes.string,
    glyphs: React.PropTypes.object,
  },
	getDefaultProps() {
		return {
		  unicode: "",
			data: {},
      glyphs: {}
		}
	},
  getInitialState() {
    return {
      selectedGlyph: myStorage.getInput("selectedGlyph")
    }
  },
  componentDidMount() {
  },
	componentWillMount() {
    // Initiate the click handler
    if(myStorage.getInput("selectedGlyph") === this.props.unicode) this.handleClick();

		if(typeof this.props.glyphs[this.props.unicode] === "undefined") return;
		console.log('\n\t GlyphTile_componentDidMount ' + this.props.unicode);

		let glyphSVGs = this.props.glyphs[data.selectedGlyph].svgPathData.split('Z');
		console.log('\t Parsed Glyph SVG: \n' + glyphSVGs);


		// Create Glyph
		console.log('Compound Path');
		let glyph = new paper.CompoundPath({});
		let path;

		glyphSVGs.forEach(function(v, i, a){
			console.log('\t Compound Fill Path ' + i);
			if(!v) return;
			path = new paper.Path({pathData: (v + 'Z')});
			glyph.addChild(path);
			console.log('\t\t clockwise ' + path.clockwise);
		});

		// Generate SVG
		// glyph.fitBounds(new paper.Path.Rectangle(0,0,50,50));
		this.svg = glyph.exportSVG({asString: false}).getAttribute('d');

		console.log(this.svg);
		console.log('\t END GlyphTile_componentDidMount ' + this.props.unicode);
	},

	handleClick() {
    let _this = this;

    // Below we make sure that:
    // 1. there is one single event handler at the same time for toggling tiles,
    // 2. only two tiles will respond to a click
    let clickHandler = function(unicode) {
      _this.setState({selectedGlyph: unicode});
      // Restrict to one handler per tile
      gtee.off(clickHandler);
    };
    myStorage.setInput("selectedGlyph", this.props.unicode);
    _this.setState({selectedGlyph: this.props.unicode});
    gtee.emit("click", this.props.unicode);
    gtee.on("glyphTile.click", clickHandler);

		console.log('\n\t GlyphTile_onClick ' + this.props.unicode)

		// console.log('\t END GlyphTile_onClick ' + this.props.unicode);
	},

	render() {
		let unicode = this.props.unicode;
    let glyphname = Locale.get(["unicode", unicode].join(".")) || 'Name not found';
    let tooltip = glyphname + '\n' + unicode;
		let glyphchar = String.fromCharCode(1 * unicode);
		let glyphpreview = glyphchar;	// In the future this could also be the true thumbnail preview
		let canvasID = 'tileCanvas_' + unicode;

		if(unicode === '0x0020') {
			glyphchar = 'space';
			glyphpreview = '';
		}

		if(this.props.glyphs[unicode]){
			// glyphpreview = <canvas id={canvasID}></canvas>;
			glyphpreview = (<svg width="46" height="46" viewBox="0 0 1000 1000">
                        <path fill="black" d={this.svg}></path>
                      </svg>);
			console.log('\t this.svg is: \n' + this.svg);
		}

		// let breakpoint = (codepoint === '0x005A' || codepoint === '0x007A' || codepoint === '0x0021');
		let breakpoint = false;

		// console.log('Selected Glyph: ' + this.props.data.selectedGlyph + ' codepoint: ' + this.props.unicode + ' are they equal? ');
		return (
      // TODO: no style specs in components; use varying className instead
			<div onClick={this.handleClick}
				className={this.state.selectedGlyph === this.props.unicode ? "glyphtileselected" : "glyphtile"}
				title={tooltip}
				style={breakpoint? {marginRight: '3000px'} : {}}>
					<div className="preview">{glyphpreview}</div>
					<div className="name">{glyphchar}</div>
			</div>
		)
	}
});

class GlyphTileStorage {
  _path = {
    input (x) {
      return ['glyphTile', x].join('.').replace(/[ -]/g, '_');
    }
  };

  setInput(x, value) {
    storage.set(this._path.input(x), value);
  }

  getInput(x) {
    return storage.get(this._path.input(x));
  }
}

let myStorage = new GlyphTileStorage();