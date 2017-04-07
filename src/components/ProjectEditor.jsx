import {storage} from "./../lib/storage/Storage";

export default React.createClass({
  propTypes: {
    router: React.PropTypes.object.isRequired,
    route: React.PropTypes.object.isRequired,
  },
  componentWillMount() {
  },
  render() {
    return (
      <div ref="root">
        <div> {this.props.children} </div>
      </div>
    )
  }
})