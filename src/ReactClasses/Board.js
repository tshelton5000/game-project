import React from 'react';
import BoardLogic from '../VanillaClasses/BoardLogic';
import Piece from './Piece';
import '../CSS/Board.css';

class Board extends React.Component {
  constructor(){
    super();
    this.state = {
      boardLogic: new BoardLogic(),
      fClick: false,
      fCoords: [],
      sCoords: [],
      defaultIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBRr7z1bIJjpv7EeWyWmd_wrO8qKSLX2NAoAn_ekY3V6styR3n',
      circularIcon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkNsSdo_4IuoUzKNb2u0pFB8IF2CL_m5we6Y9-mqltXpv07oM-pQ',
      plusArray: [[0, 0], [2, 2], [6, 6]],
      healthArray: [100, 100, 100]
    }
  }

  pieceClick = (x, y) => {
    if (!this.state.fClick){ //lns 21-30 set fClick coords if there's a match with a piece coords
      for (let coords of this.state.plusArray){
        if (coords[0] === x && coords[1] === y){ 
          this.setState({
            fCoords: [x,y],
            fClick: true
          })
        }
      }
    }
    else {  //lns 31-36 set the sClick coords and handle movement cases
      this.setState({
        sCoords: [x,y],
        fClick: false
      }, this.moveHandling)
    }
  }

  moveHandling = () => {  //deals with the following cases: 2nd click to empty, other piece, or self

    //the below checks if the 2nd click coords match a piece coords, runs moveToPiece if true
    if (this.state.plusArray.filter(coords => coords[0] === this.state.sCoords[0] && coords[1] === this.state.sCoords[1]).length > 0){
      this.moveToPiece();
      return;
    }
    //the below runs the moveToEmpty function based upon the first click coords
    this.moveToEmpty(this.state.plusArray.filter(coords => coords[0] === this.state.fCoords[0] && coords[1] === this.state.fCoords[1])[0]);
    return;
  }

  //the below method resets the click pair
  moveToPiece = () => {
    this.setState({fClick: false})
  }

  //the below method redefines the plusArray in state so Pieces re-render with the correct icons
  moveToEmpty = (coords) => {
      this.setState((state) => {
        let destArr = [[this.state.sCoords[0], this.state.sCoords[1]]];
        let cArr = state.plusArray;
        return {
          plusArray: cArr.slice(0, cArr.indexOf(coords)).concat(destArr).concat(cArr.slice(cArr.indexOf(coords) + 1, cArr.length))
        }
      }, () => console.log(this.state))
  }

  //the below method displays the 8x8 grid of Pieces
  boardDisplay = () => {
    let xArr = [0,1,2,3,4,5,6,7];
    let yArr = [0,1,2,3,4,5,6,7];

    return(
      //we map the array of x's
      xArr.map(xVal => {
        return(
          //we map each Piece from the y's
          yArr.map(yVal => {
            //this is a check for char icon placement
            let coordsBool = false;
            for (let coords of this.state.plusArray){
              if (xVal === coords[0] && yVal === coords[1]){
                coordsBool = true;
              }
            }
            //the below Pieces have character icons
            if (coordsBool === true){
              console.log(this.state.plusArray.indexOf([xVal, yVal]));
              return(
                <Piece pieceClick={this.pieceClick} key={[xVal,yVal]} x={xVal} y={yVal} icon={this.state.circularIcon} />
              )
            } else {
              //the below Pieces have default icons
              return(
                <Piece pieceClick={this.pieceClick} key={[xVal,yVal]} x={xVal} y={yVal} icon={this.state.defaultIcon} health={0}/>
              )
            }
          })
        )
      })
    )
  }

  render(){
    return(
      <div className="board">
        {this.boardDisplay()}
      </div>
    );
  }
}

export default Board;