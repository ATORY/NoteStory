import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    margin: 0;
    color: ${props => (props.whiteColor ? 'white' : 'black')};
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
  }
  .electron-drag {
    -webkit-app-region: 'drag'
  }
  .gutter.gutter-horizontal {
    cursor: ew-resize;
    width: 1px;
    margin-left: -5px;
    z-index: 200;
    background: #d3d3d3;
    background-clip: padding-box;
    border-left: 5px solid hsla(0,0%,100%,0);
  }
  .gutter.gutter-horizontal:hover {
    border-left: 5px solid  #d3d3d3;
  }

  .column-container {
    overflow-y:auto;
    display: flex;
    flex-direction: column;
    height: 100%;
    // &:hover {
    //   overflow-y:scroll;
    // }
  }

  .column-container::-webkit-scrollbar-corner {
    background-color: transparent;
  }
  .column-container::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }
  
  .column-container::-webkit-scrollbar {
    /* width: 17px;
    height: 16px; */
    /* // border-left: 0.5px solid #f7f7f7; */
  }
  
  .column-container::-webkit-scrollbar-thumb {
    height: 6px;
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    border-radius: 10px;
    background-color: #dfdfdf;
    box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 0px rgba(0, 0, 0, 0.05);
  }
`;
