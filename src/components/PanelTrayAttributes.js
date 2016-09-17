import "./../style/default/Panel";

function updatePathData(e) {
	console.log(e);
}

export default React.createClass({
	render() {
		return (
			<div>
				<h1>ATTRIBUTES</h1>
				<textarea 
					style={{width: '100%', height: '500px'}} 
					value={this.props.data.selectedGlyphPathData}
					onChange={updatePathData}>
				</textarea>
			</div>
		)
	}
})