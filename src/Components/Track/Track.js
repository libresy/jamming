import React from 'react';
import './Track.css';


class Track extends React.Component {
    constructor(props) {
        super(props);
        this.removeTrack = this.removeTrack.bind(this);
        this.addTrack = this.addTrack.bind(this);
    };

<<<<<<< HEAD
    addTrack() {
        this.props.onAdd(this.props.track)
    };

    removeTrack() {
        this.props.onRemove(this.props.track)

    };

    renderAction() {
        if (this.props.isRemoval) {
            return <a
                className="Track-action"
                onClick={this.removeTrack}>-</a>
        } else {
            return <a
                className="Track-action"
                onClick={this.addTrack}>+</a>
=======
    addTrack(){
        this.props.onAdd(this.props.track)
    };

    removeTrack(){
        this.props.onRemove(this.props.track)

    };
   
     renderAction() {
        if (this.props.isRemoval){
            return <a 
            className= "Track-action" 
            onClick={this.removeTrack}>-</a>
        } else {
            return <a 
            className="Track-action" 
            onClick={this.addTrack}>+</a>
>>>>>>> 2c5e2334061081759b823e0b60c0e8c20ef311c5
        }

    };


    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album} </p>
                </div>
                {this.renderAction()}
            </div>

        );
    };
};

export default Track;