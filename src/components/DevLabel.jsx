export default React.createClass({
  render() {
    return (
      <div className="logo" style={{textAlign: "center", padding: "10px 0"}}>
        <svg version="1.1" x="0px" y="0px" width="35" height="35" viewBox="0 0 50 50">
          <rect fill="transparent" width={50} height={50} />
          <g fill="rgb(0,0,0)">
            <g>
              <path d="M39.5,20.9c0-5.5-2.4-10-6.8-12.5C28,5.7,22,5.7,17.3,8.4c-4.4,2.5-6.8,7-6.8,12.5c0,3.3,1.7,6.2,4.8,8.1c2.6,1.6,6,2.5,9.7,2.5c4.2,0,8.7-1.2,11.5-3.8V33c0,5.2-6,7.6-11.5,7.6c-5,0-10.3-1.9-11.3-6.1h1.8v-3h-5V33c0,3.3,1.7,6.2,4.8,8.1c2.6,1.6,6,2.5,9.7,2.5c7,0,14.5-3.3,14.5-10.6L39.5,20.9L39.5,20.9z M25,28.5c-5.5,0-11.5-2.4-11.5-7.6c0-4.4,1.9-7.9,5.3-9.9c3.7-2.1,8.7-2.1,12.4,0c3.4,2,5.3,5.5,5.3,9.9h0C36.5,26.1,30.5,28.5,25,28.5z" />
            </g>
            <g transform="translate(1,1)">
              <path d="M24,0.5c10.4,0,16.2,0,19.8,3.7c3.7,3.7,3.7,9.4,3.7,19.8s0,16.2-3.7,19.8c-3.7,3.7-9.4,3.7-19.8,3.7s-16.2,0-19.8-3.7C0.5,40.2,0.5,34.4,0.5,24s0-16.2,3.7-19.8C7.8,0.5,13.6,0.5,24,0.5 M24,0C13.5,0,7.6,0,3.8,3.8C0,7.6,0,13.5,0,24s0,16.4,3.8,20.2C7.6,48,13.5,48,24,48s16.4,0,20.2-3.8C48,40.4,48,34.5,48,24s0-16.4-3.8-20.2C40.4,0,34.5,0,24,0L24,0z" />
            </g>
          </g>
        </svg><span style={{fontSize: 10}}>dev</span>
      </div>
    );
  }
});