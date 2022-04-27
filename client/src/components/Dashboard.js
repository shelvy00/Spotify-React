import React, { useState, useEffect } from 'react'
import useAuth from "./useAuth"
import { Container, Form } from "react-bootstrap"
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchResult from './TrackSearchResult'
import PlaySong from './PlaySong'
import axios from 'axios'

const spotifyApi = new SpotifyWebApi({
  clientId: "06466eddfb64409d9c23ab34d3fa8a21",
})

function Dashboard({ code}) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([])
    const [playTrack, setPlayTrack] = useState([])
    const [lyrics, setLyrics] = useState("")
    console.log(searchResults)

    function pickedTrack(track) {
      setPlayTrack(track)
      setSearch("")
      setLyrics("")
    }

    useEffect(() =>{
     if (!playTrack) return

     axios.get("http://localhost:3001/lyrics",{
       params: {
         track: playTrack.title,
         artist: playTrack.artist
       }
     }).then(res => {setLyrics(res.data.lyrics)})
    }, [playTrack])

   useEffect(() =>{
      if (!accessToken) return
      spotifyApi.setAccessToken(accessToken)
   }, [accessToken])

   useEffect(() => {
      if (!search) return setSearchResults([])
      if (!accessToken) return
      
      let cancel = false
      spotifyApi.searchTracks(search).then(res => {
        if (cancel) return
        setSearchResults(res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
            if (image.height < smallest.height) return image
            return smallest
          }, track.album.images[0])

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url
          }
        }))
      })

      return () => cancel = true
   }, [search, accessToken])


  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <Form.Control 
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.map((track) => (
          <TrackSearchResult track={track} key={track.uri} pickedTrack={pickedTrack} />
        ))}
        {searchResults.length === 0 && (<div className="tetx-center" style={{ whiteSpace: "pre" }}>{lyrics}</div>)}
      </div>
      <div><PlaySong accessToken={accessToken} trackUri={playTrack?.uri} /></div>
    </Container>
  )
}

export default Dashboard;
