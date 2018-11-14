import React from 'react';
import PieceLogic from '../VanillaClasses/PieceLogic';
import '../CSS/Piece.css';

class Piece extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      pieceLogic: new PieceLogic(this.props.x, this.props.y),
      icon: `${this.props.icon}`
    }
  }

  //this function returns click coord to parent method
  passCoordsToBoard = () => {
    this.props.pieceClick(this.state.pieceLogic.returnX(), this.state.pieceLogic.returnY());
  }

  //icon is re-defined is props change
  componentDidUpdate(prevProps){
    if (this.props.icon !== prevProps.icon){
      this.setState({icon: this.props.icon})
    }
  }
  componentDidMount(){
    console.log(this.props.health);
  }

  //simple render of each icon
  render(){
    return(
      <div onClick={this.passCoordsToBoard} className="piece">
        <img className="pieceIcon" src={this.state.icon} alt="pieceIcon"/>
      </div>
    )
  }
}

export default Piece;