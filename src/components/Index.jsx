import {storage} from "../lib/storage/Storage";
import * as $ from "../utils/helpers";
import DevLabel from "./DevLabel";

export default React.createClass({
  getInitialState() {
    return null;
  },
  componentWillMount() {
  },
  componentDidMount(){
  },
  resetHead() {
    window.localStorage.clear();
    location.reload();
  },
  downloadProject() {
    $.download(`${storage.getHead()}`, storage.exportProjectToJson());
  },
  render() {
    return (
      <div>
        <DevLabel/>
        <p>{storage.getAllHeads().map((item) => {
          return (<span><Link to="#" onClick={(()=>{storage.setHead(item), window.location.reload();})}>{item} </Link> | </span>)
        })}
        </p>
        <p>Current project is: {storage.getHead()}. <Link to="/" onClick={this.resetHead}>clear localStorage</Link> | <Link to="#" onClick={this.downloadProject}>download</Link></p>

        <Link to="/projects">Projects...</Link>

        <p>We're currently working at: <Link to="/project/editor/leftframe/tray/attributes">project editor</Link></p>
      </div>
    )
  }
})