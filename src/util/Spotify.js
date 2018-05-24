const clientId = 'd2da9b3a189d417fa6346b7bdedaa7cc';
//const redirectURI = 'http://localhost:3000/';
const redirectURI = 'http://surge_jamming.surge.sh'


let accessToken;

const Spotify = {

    getAccessToken(){
        if (accessToken) {
            return accessToken;
        }
         const accessTokenUrl = window.location.href.match(/access_token=([^&]*)/);
         const expiresInUrl = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenUrl && expiresInUrl) {
            accessToken = accessTokenUrl[1];
            let expiresIn = Number(expiresInUrl[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null,'/');
            return accessToken;
        } else {
            const SpotUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = SpotUrl;       
        }
 },

    search(term) {
        const accessToken = Spotify.getAccessToken()
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, 
        {
            headers: { Authorization: `Bearer ${accessToken}`}
        }).then (
          response => {
                    return response.json() 
                }).then (jsonResponse => { 
            if(!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track =>({ 
                id: track.id, 
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    
 },

    savePlaylist(playlistName, trackURIs ){
        if(!playlistName || !trackURIs.length ){
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userId;

        return fetch(`https://api.spotify.com/v1/me`, { headers: headers })
            .then(response => response.json())
            .then(jsonResponse => {
                userId = jsonResponse.id;
                // eslint-disable-next-line
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ name: playlistName })
                }).then(
                    response => response.json()
                    ).then(jsonResponse => {
                        const playlistId = jsonResponse.id
                        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                            headers: headers,
                            method: 'POST',
                            body: JSON.stringify({ uris: trackURIs })
                        });

                    });
            });
    }
};

export default Spotify;