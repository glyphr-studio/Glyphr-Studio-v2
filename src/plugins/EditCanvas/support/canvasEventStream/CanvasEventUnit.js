import EventUnit from "./../../../../lib/core/support/eventStream/EventUnit";
import CanvasEventStream from "./CanvasEventStream";
import EventUnitAccess from "./../../../../lib/core/support/eventStream/EventUnitAccess";

export default class CanvasEventUnit extends EventUnit {

  constructor(eventRootName, accessLevel) {
    super(eventRootName, new EventUnitAccess(eventRootName, accessLevel));

    this._streamName  = CanvasEventStream.getStreamName();

    // Make sure the event loop is attached
    if(! this._windowRegister.getStatic(this._streamName)) {
      this._windowRegister.attachStatic({
        [this._streamName]: new CanvasEventStream()
      });
    }

    this._stream = this._windowRegister.getStatic(this._streamName);
  }
}