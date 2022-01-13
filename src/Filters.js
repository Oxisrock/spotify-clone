import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import Select from 'react-select'
import Slider from "react-slick";

const Filters = () => {

    const [token, setToken] = useState('');
    const [genres, setGenres] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [playLists, setPlayLists] = useState([]);
    const [optionPlayList, setOptionPlayList] = useState([]);
    const [tracks, setTracks] = useState([]);
    const client_id = "f6792238befd4b018323651d304f70b3";
    const client_secret = "1439895652dd4f489d6e5f65b678531a";

    const handleChange = async (selectedOption) => {
        setSelectedOption(selectedOption.value);
        axios(`https://api.spotify.com/v1/browse/categories/${selectedOption.value}/playlists`, {
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {

            const playlist = response.data.playlists.items.map(({ id, name }) => ({
                value: id,
                label: name,
            }));
            setPlayLists(playlist);


        }).catch(error => console.log(error))
    }

    const handleChangeLoad = async (optionPlayList) => {
        setOptionPlayList(optionPlayList);
        axios(`https://api.spotify.com/v1/playlists/${optionPlayList.value}/`, {
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {

            setTracks(response.data.tracks.items);
            console.log(tracks);

        }).catch(error => console.log(error))
    }
    useEffect(() => {
        // Api call for retrieving token
        axios('https://accounts.spotify.com/api/token', {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            data: 'grant_type=client_credentials'
        }).then(tokenresponse => {
            console.log(tokenresponse.data.access_token);
            setToken(tokenresponse.data.access_token);

            // Api call for retrieving Genres data
            axios(`https://api.spotify.com/v1/browse/categories`, {
                'method': 'GET',
                'headers': {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + tokenresponse.data.access_token
                }
            }).then(response => {
                const categories = response.data.categories.items.map(({ id, name }) => ({
                    value: id,
                    label: name,
                }));
                setGenres(categories);

            }).catch(error => console.log(error))


        }).catch(error => console.log(error));
    }, []);
    const settings = {
        dots: true,
        speed: 500,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        center: '0',
      };
  
    return (
        <div className='container'>
            <Select options={genres} onChange={handleChange} />

            <Select options={playLists} value={optionPlayList} onChange={handleChangeLoad} />
            <Slider {...settings}>
                {tracks.map((track) => (
                    <div key={track.track.id}>
                        <a href={track.track.external_urls.spotify} target='_blank' className=''>
                            <img src={track.track.album.images[0].url} alt='' />
                        </a>
                    </div>
                ))
                }
            </Slider>
        </div>
    );
}

export default Filters;

//f6792238befd4b018323651d304f70b3 -Client ID
//1439895652dd4f489d6e5f65b678531a -Client Secret