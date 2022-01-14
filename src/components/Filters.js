import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import Select, { components } from 'react-select'
import Playlists from "./Playlists";

const Filters = () => {

    const [token, setToken] = useState('');
    const [genres, setGenres] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [playLists, setPlayLists] = useState([]);
    const [optionPlayList, setOptionPlayList] = useState([]);
    const [tracks, setTracks] = useState([]);
    const client_id = "f6792238befd4b018323651d304f70b3";
    const client_secret = "1439895652dd4f489d6e5f65b678531a";
    const { SingleValue, Option } = components;

    const IconSingleValue = (props) => (
        <SingleValue {...props} style={{ display: 'flex', alignItems: 'center' }}>
            <img src={props.data.image} style={{ height: '30px', width: '30px', borderRadius: '50%', marginRight: '10px' }} />
            {props.data.label}
        </SingleValue>
    );

    const IconOption = (props) => (
        <Option {...props} style={{ display: 'flex', alignItems: 'center' }}>
            <img src={props.data.image} style={{ height: '30px', width: '30px', borderRadius: '50%', marginRight: '10px' }} />
            {props.data.label}
        </Option>
    );
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

        }).catch(error => console.log(error))
    }

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

            const playlist = response.data.playlists.items.map(({ id, name, images }) => ({
                value: id,
                label: name,
                image: images[0].url
            }));
            setPlayLists(playlist);

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
                const categories = response.data.categories.items.map(({ id, name, icons }) => ({
                    value: id,
                    label: name,
                    image: icons[0].url
                }));
                setGenres(categories);
            }).catch(error => console.log(error))


        }).catch(error => console.log(error));
    }, []);
    const styles = {
        control: base => ({
            ...base,
            "&:hover": {
                borderColor: "blue"
            }
        }),
        singleValue: base => ({
            ...base,
            display: "flex",
            alignItems: "center",
        }),
        option: styles => ({
            ...styles,
            display: "flex",
            alignItems: "center",
            textAling: "left"
        }),


    };
    return (
        <div className='container'>
            <div className='selects'>
                <Select styles={styles} components={{ SingleValue: IconSingleValue, Option: IconOption }} options={genres} onChange={handleChange} />
                <Select styles={styles} components={{ SingleValue: IconSingleValue, Option: IconOption }} value={optionPlayList} options={playLists} onChange={handleChangeLoad} />
            </div>
            <div className='playlists'>
                <Playlists tracks={tracks} />
            </div>
        </div>
    );
}

export default Filters;

//f6792238befd4b018323651d304f70b3 -Client ID
//1439895652dd4f489d6e5f65b678531a -Client Secret