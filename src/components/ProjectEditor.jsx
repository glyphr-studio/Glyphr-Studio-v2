import {storage} from "./../lib/storage/Storage";

export default React.createClass({
  propTypes: {
    router: React.PropTypes.object.isRequired,
    route: React.PropTypes.object.isRequired,
  },
  componentWillMount() {
    if(storage.getHead() === null) {
      this.props.router.push("/");
    }
  },
  render() {
    return (
      <div ref="root">
        <div> {this.props.children} </div>
      </div>
    )
  }
})