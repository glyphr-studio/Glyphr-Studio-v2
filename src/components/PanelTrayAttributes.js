import "./../style/default/Panel";

export default React.createClass({
	changeOn() {

	}, 

	render() {
		return (
			<div>
				<h1>ATTRIBUTES</h1>
				<textarea 
					style = {{width: '90%', height: '500px'}} 
					value = {this.props.data.glyphs[this.props.data.selectedGlyph].svgPathData} 
					onChange = {this.changeOn}
				></textarea>
			</div>
		)
	}
})