import EventStream from "./../../../../lib/core/support/eventStream/EventStream";

export default class CanvasEventStream extends EventStream {
  constructor() {
    super(CanvasEventStream.getStreamName());
  }

  static getStreamName() {
    return "CanvasEventStream";
  }
}