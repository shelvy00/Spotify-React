import React from 'react'

export const TrackSearchResult = ({ track, pickedTrack }) => {

  const handlePlay = () => {
    pickedTrack(track)
  }

  return (
    <div className="d-flex m-2 align-items-ceneter" style={{ curso: "pointer" }} onClick={handlePlay}>
      <img src={track.albumUrl} style={{height: "64px", width: "64px"}} />
      <div className="ml-3">
        <div>{track.title}</div>
        <div>{track.artist}</div>
      </div>
    </div>
  )
}

export default TrackSearchResult;
