import {storage} from "../../lib/storage/Storage";
import * as $ from "../../utils/helpers";
import DevLabel from "../DevLabel";
import OpenProject from "./OpenProject";

export default React.createClass({
  getInitialState() {
    return null;
  },
  componentWillMount() {
    let head = this.props.params.project;
    if (storage.headExists(head) === true) {
      storage.setHead(head)
    } else {
      this.props.router.push('/');
    }
  },
  componentDidMount(){
  },
  resetHead() {
    window.localStorage.clear();
    this.router.push('/');
  },
  downloadProject() {
    $.download(`${storage.getHead()}`, storage.exportProjectToJson());
  },
  render() {
    return (
      <div>
        <DevLabel/>
        <p>{storage.getAllHeads().map((item) => {
          return (<span><Link to={`project/${item}`} onClick={(()=>{storage.setHead(item);})}>{item} </Link> | </span>)
        })}
        </p>
        <p>Current project is: {storage.getHead()}. <Link to="/" onClick={this.resetHead}>clear localStorage</Link> | <Link to={`project/${storage.getHead()}`} onClick={this.downloadProject}>download</Link></p>

        <Link to="/project/new">Projects...</Link>

        <p>We're currently working at: <Link to={`/project/${storage.getHead()}/editor/leftframe/tray/attributes`}>project editor</Link></p>
      </div>
    )
  }
})