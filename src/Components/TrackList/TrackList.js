import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
<<<<<<< HEAD
    render() {
        return (
            <div className="TrackList">
                {
                    this.props.tracks.map(track => {
                        return (
                            <Track
                                track={track}
                                key={track.id}
                                onAdd={this.props.onAdd}
                                onRemove={this.props.onRemove}
                                isRemoval={this.props.isRemoval} />
                        );
                    })
                }
            </div>
        );
    }

};

export default TrackList;
=======
 render () {
    return (
        <div className="TrackList">
        {
            this.props.tracks.map(track => {
                return(
                    <Track
                    track={track}
                    key={track.id}
                    onAdd={this.props.onAdd}
                    onRemove={this.props.onRemove}
                    isRemoval={this.props.isRemoval}/>
                );
            })
        }
    </div>
);
 }

};

export default TrackList;













>>>>>>> 2c5e2334061081759b823e0b60c0e8c20ef311c5
