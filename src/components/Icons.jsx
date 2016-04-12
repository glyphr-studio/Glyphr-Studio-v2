import React from "react";
// html to jsx converter https://facebook.github.io/react/html-jsx.html

export var Icons = {
         panelTabs:       {
           tabsNav: {
             /**
              * These icons will be automatically added to the nav bar (in the specified order).
              * Each icon will point to a route with its own name (/project/editor/<name>) as specified
              * by the property key. Route has to be added manually in Routing.
              */
             menu:        <svg className="switch_nav">
                            <g pointer-events="none">
                              <g>
                                <rect x={12} y="23" width={26} height={3}/>
                                <rect x={12} y="30" width={26} height={3}/>
                                <rect x={12} y="16" width={26} height={3}/>
                              </g>
                              <g transform="translate(1,1)"/>
                            </g>
                          </svg>
             , chooser:   <svg>
                            <g>
                              <path d="M14.6,20.2v2.4H9.9v-1.7c-1.3,1.3-2.7,1.9-4.3,1.9c-1.2,0-2.3-0.4-3.2-1.2C1.5,20.8,1,19.7,1,18.5c0-1.3,0.5-2.3,1.5-3.2c1-0.8,2.1-1.3,3.5-1.3c1.3,0,2.5,0.4,3.7,1.2v-1.3c0-0.7-0.1-1.2-0.2-1.6c-0.1-0.4-0.4-0.7-0.9-1c-0.5-0.3-1.1-0.5-1.9-0.5c-1.3,0-2.3,0.5-2.9,1.6l-2.6-0.7c1.1-2.1,3.1-3.2,5.9-3.2c1,0,1.9,0.1,2.7,0.4c0.7,0.3,1.3,0.6,1.7,1.1c0.4,0.4,0.6,0.9,0.7,1.4c0.1,0.5,0.2,1.3,0.2,2.4v6.3H14.6z M9.7,17.5c-1.2-0.9-2.3-1.4-3.5-1.4c-0.7,0-1.4,0.2-1.9,0.6c-0.5,0.4-0.7,1-0.7,1.7c0,0.6,0.2,1.2,0.7,1.6c0.4,0.4,1,0.6,1.8,0.6c1.3,0,2.5-0.5,3.7-1.6V17.5z"/>
                              <path d="M17,22.6v-2.4h2.4V5.4H17V3h5v7.9c1.3-1.5,3-2.3,4.9-2.3c1.9,0,3.4,0.6,4.7,1.9c1.3,1.3,1.9,3,1.9,5.1c0,2-0.6,3.7-1.9,5.1c-1.2,1.4-2.8,2.1-4.8,2.1c-1.1,0-2.1-0.2-3-0.7c-0.9-0.5-1.5-1-1.9-1.6v2H17z M22.1,15.8c0,1.4,0.4,2.5,1.3,3.4c0.9,0.8,1.9,1.2,3,1.2c1.2,0,2.2-0.4,3.1-1.3c0.9-0.9,1.3-2.1,1.3-3.5c0-1.4-0.4-2.5-1.3-3.3c-0.9-0.8-1.9-1.2-3-1.2c-1.1,0-2.1,0.4-3,1.2C22.6,13.1,22.1,14.2,22.1,15.8z"/>
                              <path d="M48.6,8.8v5.1h-2.4c-0.1-1-0.5-1.7-1.2-2.3c-0.7-0.5-1.5-0.8-2.4-0.8c-1.2,0-2.2,0.4-2.9,1.3c-0.8,0.8-1.1,2-1.1,3.3c0,1.3,0.4,2.4,1.1,3.4c0.7,1,1.7,1.5,3.1,1.5c1.9,0,3.2-0.9,4.1-2.7l2.2,1c-1.2,2.7-3.4,4.1-6.4,4.1c-2.2,0-3.9-0.7-5.1-2.2c-1.2-1.5-1.9-3.2-1.9-5.1c0-2.1,0.7-3.8,2-5.1c1.4-1.3,2.9-2,4.7-2c1.5,0,2.8,0.4,3.8,1.3v-1H48.6z"/>
                              <path d="M8.8,36L6.1,39h1.8v2.4H1.3V39h2l4.1-4.6l-3.9-4.2H1.6v-2.4H8v2.4H6.3l2.4,2.7l2.4-2.7H9.7v-2.4h6.4v2.4h-2.2l-3.7,4.2l4.2,4.6h1.7v2.4H9.7V39h1.9L8.8,36z"/>
                              <path d="M26,41.2l-4.5-11h-2.3v-2.4H26v2.4h-1.6l2.9,7.5l2.9-7.5h-1.8v-2.4H35v2.4h-2l-6.7,17.3h-4.5v-2.3h2.7L26,41.2z"/>
                              <path d="M37.3,41.4v-2.2l8.5-9.2h-5.6v2.6h-2.3v-4.8H49v2.4l-8.6,9h6.2v-2.8H49v5H37.3z"/>
                            </g>
                          </svg>
             , layer:     <svg>
                            <g>
                              <polygon points="25,22 1,11.5 25,1 49,11.5"/>
                              <polygon points="25,31 1,20.5 9,17 25,24 41,17 49,20.5"/>
                              <polygon points="25,40 1,29.5 9,26 25,33 41,26 49,29.5"/>
                              <polygon points="25,49 1,38.5 9,35 25,42 41,35 49,38.5"/>
                            </g>
                          </svg>
             , attribute: <svg>
                            <g>
                              <polygon points="2,9 9,16 18,5 15,2 9,10 5,6"/>
                              <polygon points="20,45 1,45 1,46 20,46 20,45"/>
                              <polygon points="20,37 1,37 1,38 20,38 20,37"/>
                              <polygon points="20,41 1,41 1,42 20,42 20,41"/>
                              <polygon points="20,28 1,28 1,29 20,29 20,28"/>
                              <polygon points="20,20 1,20 1,21 20,21 20,20"/>
                              <polygon points="20,24 1,24 1,25 20,25 20,24"/>
                              <polygon points="49,12 20,12 20,13 49,13 49,12"/>
                              <polygon points="49,4 20,4 20,5 49,5 49,4"/>
                              <polygon points="49,8 20,8 20,9 49,9 49,8"/>
                              <path d="M24,18v13h25V18H24z M26,27l5-5l5,5H26z M42,27l-5-5h10L42,27z"/>
                              <path d="M24,35v13h25V35H24z M26,44l5-5l5,5H26z M42,44l-5-5h10L42,44z"/>
                            </g>
                          </svg>
             , history:   <svg>
                            <g pointer-events="none">
                              <path d="M43.8,11.6L43,12.3c3.1,3.6,5,8.3,5,13.5c0,11.4-9.3,20.7-20.7,20.7c-9.2,0-17-6.1-19.7-14.4l-1,0.3c2.8,8.8,11,15.1,20.7,15.1c12,0,21.7-9.7,21.7-21.7C49,20.4,47,15.4,43.8,11.6z"/>
                              <path d="M27.3,2C15.2,2,5.2,11,3.7,22.7H1l5.1,8.1l5.1-8.1H8.8C10.3,13.8,18,7.1,27.3,7.1c5.2,0,9.8,2.1,13.2,5.5L44.1,9C39.8,4.7,33.8,2,27.3,2z"/>
                              <polygon points="35.9,18.2 34.8,17.1 27.4,24.5 25.4,20.4 24,21 26.3,25.6 22.7,29.2 23.8,30.3 27,27 34.1,41.2 35.5,40.6 28.2,25.9"/>
                            </g>
                          </svg>
             , guides:    <svg>
                            <g pointer-events="none">
                              <polygon points="4,33 10,39 10,33 "/>
                              <polygon points="48,44 0,44 0,46 48,46 48,44 "/>
                              <polygon points="48,13 0,13 0,15 48,15 48,13 "/>
                              <polygon points="48,6 0,6 0,7 48,7 48,6 "/>
                              <polygon points="48,2 0,2 0,4 48,4 48,2 "/>
                              <polygon points="48,29 0,29 0,33 48,33 48,29 "/>
                              <polygon points="14,0 10,0 10,48 14,48 14,0 "/>
                              <polygon points="44.7,0 43.7,0 43.7,48 44.7,48 44.7,0 "/>
                            </g>
                          </svg>
           },
         },
         attributesPanel: {
           shape:   {
             undo:           <svg x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30">
                               <defs />
                               <path fill="rgb(0,43,65)" d="M20.1,23c4.6-5,6.6-9.6,5.5-12.8C24.9,8.2,22.9,7,20,7c-5.9,0-8.8,5.3-8.9,5.5L10.9,13l2.4,4.1l-12,0.8l4-14.4l2.5,4.2l0.9-1.1c0,0,4-4.6,11.2-4.6c4.1,0,7.9,2.8,8.8,6.5C29.4,10.8,29.3,16.3,20.1,23z"/>
                               <path fill="rgb(0,170,255)" d="M20,3c3.1,0,6.9,2,7.8,5.7c0.5,2.1-0.1,4.4-1.6,6.7c0.7-2,0.9-3.9,0.3-5.5C25.7,7.4,23.3,6,20,6c-6.5,0-9.6,5.8-9.8,6.1l-0.5,1l0.6,1l1.3,2.2l-8.9,0.6L5.7,6l0.6,1l1.4,2.4l1.8-2.2C9.6,7.2,13.2,3,20,3 M20,1C12.2,1,8,6,8,6L5,1L0,19l15-1l-3-5c0,0,2.6-5,8-5c7.7,0,7.2,9.2-8,21C39.8,15,29.5,1,20,1L20,1z"/>
                             </svg>
             , paste:        <svg x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30">
                               <defs />
                               <rect fill="rgb(229,234,239)" x={5} y={7} width={20} height={22}/>
                               <path fill="rgb(204,209,214)" d="M24,8v20H6V8H24 M26,6H4v24h22V6L26,6z"/>
                               <path fill="rgb(229,234,239)" d="M9,9V4h3V3c0-1.3,1.8-2,3-2s3,0.7,3,2v1h3v5H9z"/>
                               <path fill="rgb(204,209,214)" d="M15,2c0.9,0,2,0.5,2,1v2h2h1v3H10V5h1h2V3C13,2.5,14.1,2,15,2 M15,0c-1.7,0-4,1-4,3H8v7h14V3h-3C19,1,16.7,0,15,0L15,0z"/>
                             </svg>
             , getShape:     <svg x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30">
                               <defs />
                               <rect fill="rgb(0,43,65)" x={5} y={7} width={20} height={22}/>
                               <path fill="rgb(0,170,255)" d="M24,8v20H6V8H24 M26,6H4v24h22V6L26,6z"/>
                               <path fill="rgb(0,43,65)" d="M9,9V4h3V3c0-1.3,1.8-2,3-2s3,0.7,3,2v1h3v5H9z"/>
                               <path fill="rgb(0,170,255)" d="M15,2c0.9,0,2,0.5,2,1v2h2h1v3H10V5h1h2V3C13,2.5,14.1,2,15,2 M15,0c-1.7,0-4,1-4,3H8v7h14V3h-3C19,1,16.7,0,15,0L15,0z"/>
                               <path fill="rgb(0,170,255)" d="M17.4,20.6h-4.8l-1,3h1.6v1.7H8v-1.7h1.6l3.6-10.2h-1.6V12h6.8v1.5h-1.7l3.7,10.2H22v1.7h-5.2v-1.7h1.7L17.4,20.6z M16.9,19.1l-1.8-5.6H15l-1.8,5.6H16.9z"/>
                             </svg>
             , addShape:     <svg x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30">
                               <defs />
                               <rect fill="rgb(0,43,65)" x={1} y={1} width={16} height={16}/>
                               <path fill="rgb(0,170,255)" d="M16,2v14H2V2H16 M18,0H0v18h18V0L18,0z"/>
                               <rect x={21} y={15} fill="rgb(0,170,255)" width={3} height={15}/>
                               <rect x={15} y={21} fill="rgb(0,170,255)" width={15} height={3}/>
                             </svg>
             , addComponent: <svg x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30">
                               <defs />
                               <rect fill="rgb(0,43,65)" x={1} y={1} width={16} height={16}/>
                               <path fill="rgb(0,210,123)" d="M16,2v14H2V2H16 M18,0H0v18h18V0L18,0z"/>
                               <rect x={21} y={15} fill="rgb(0,210,123)" width={3} height={15}/>
                               <rect x={15} y={21} fill="rgb(0,210,123)" width={15} height={3}/>
                             </svg>
           }
           , glyph: {
             flipVertical: <svg x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30">
                             <defs />
                             <polygon fill="rgb(0,43,65)" points="1,29 1,15.3 9.6,1 13,1 13,23.6 7.6,29"/>
                             <path fill="rgb(127,134,137)" d="M12,2v21.2L7.2,28H2V15.6L10.1,2H12 M14,0H9L0,15v15h8l6-6V0L14,0z"/>
                             <polygon fill="rgb(0,43,65)" points="22.4,29 17,23.6 17,1 20.4,1 29,15.3 29,29"/>
                             <path fill="rgb(0,170,255)" d="M19.9,2L28,15.6V28h-5.2L18,23.2V2H19.9 M21,0h-5v24l6,6h8V15L21,0L21,0z"/>
                           </svg>

             , flipHorizontal: <svg x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30">
                                 <defs />
                                 <polygon fill="rgb(0,43,65)" points="6.4,13 1,7.6 1,1 14.7,1 29,9.6 29,13"/>
                                 <path fill="rgb(127,134,137)" d="M14.2,2L28,10.1V12H6.8L2,7.2V2h12 M15,0H0v8l6,6h24V9L15,0L15,0z"/>
                                 <polygon fill="rgb(0,43,65)" points="1,29 1,22.4 6.4,17 29,17 29,20.4 14.7,29"/>
                                 <path fill="rgb(0,170,255)" d="M28,18v1.9L14.4,28H2v-5.2L6.8,18H28 M30,16H6l-6,6v8h15l15-9V16L30,16z"/>
                               </svg>

           }
         },
         input:           {
           access:
             <svg x="0px" y="0px" width="26px" height="26px" viewBox="0 0 26 26" enable-background="new 0 0 26 26" id="ssylock" className="lockui">
               <path fill="rgb(229,234,239)" d="M17,12V8h-1V7h-1V6h-4v1h-1v1H9v4H8v8h10v-8H17z M15,12h-4V9h1V8h2v1h1V12z" />
             </svg>
         }
       }

  ;