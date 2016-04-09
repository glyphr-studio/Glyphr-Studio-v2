import React from "react";
import {Navigation} from "react-router";
import Panel from "./../Panel";
import Glyph from "./Glyph";
import * as helpers from "./../../../../utils/helpers";

export default React.createClass({
  mixins: [Navigation],
  getInitialState() {
    return {
      glyphs: [
        {
          character:     'A',
          characterName: 'capital letter A'
        },
        {
          character:     'B',
          characterName: 'capital letter B'
        }
      ]
    }
  },
  render() {
    return (
      <Panel name="Chooser" title="glyph edit">
        {/* return _this.state.glyphs.map((glyph, i) => { */}
          {/*  return <Glyph key={i} character={glyph.character} characterName={glyph.characterName}/> */}
        {/* }) */}
        
        {(function(_this) {
            return helpers.get_latin_letter_zigzag().map(function (letter, i) {
               return <Glyph key={i} character={letter} characterName={(i % 2 ? "lower letter: " : "capital letter: ") + letter}/>
            })
          })(this)}

        {(function(_this) {
          return helpers.get_arabic_digits().map(function (val, i) {
            return <Glyph key={i} character={i} characterName={"not defined digit " + i}/>
          })
        })(this)}
      </Panel>
    )
  }
})