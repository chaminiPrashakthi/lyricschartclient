import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { fetchTopArtistsRequest, fetchTopArtistsSuccess, fetchTopArtistsFailure, fetchLatestAlbumsRequest, fetchLatestAlbumsSuccess, fetchLatestAlbumsFailure } from '../actions/musichart';
import { fetchLatestAlbums, fetchTopArtists } from '../api/musichart';
import Grid from '@mui/material/Grid';
import Card from "react-bootstrap/Card";
import CardActionArea from '@mui/material/CardActionArea';
import CircularProgress from '@mui/material/CircularProgress';
import Albums from './albums';
import "../resources/App.css";
import { useNavigate } from 'react-router-dom';
import { CardContent, Typography } from '@mui/material';
import Box from '@mui/material/Box';


const TopArtists = ({ topArtists, fetchTopArtistsRequest, fetchTopArtistsSuccess, fetchTopArtistsFailure, fetchLatestAlbumsRequest, fetchLatestAlbumsSuccess, fetchLatestAlbumsFailure }) => {
    const [clickedCardId, setClickedCardId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchTopArtistsRequest();
        fetchTopArtists('AU')
            .then((data) => fetchTopArtistsSuccess(data))
            .catch((error) => fetchTopArtistsFailure(error));
    }, [fetchTopArtistsRequest, fetchTopArtistsSuccess, fetchTopArtistsFailure]);



    const handleCardClick = (cardId) => {
        setClickedCardId(cardId);
        fetchAndNavigateToAlbumsPage(cardId);
    };

    const fetchAndNavigateToAlbumsPage = (artistId) => {
        if (artistId !== null) {
            fetchLatestAlbumsRequest();
            fetchLatestAlbums(artistId)
                .then((data) => {
                    fetchLatestAlbumsSuccess(data);
                    navigateToAlbumsPage(artistId);
                })
                .catch((error) => {
                    fetchLatestAlbumsFailure(error);
                });
        }
    };

    const navigateToAlbumsPage = (artistId) => {
        navigate(`/album/${artistId}`);
    };

    const currentUri = window.location.href;
    const text = `/album/${clickedCardId}`;

    return (
        <div>
            <Typography variant='h4' align="center">Top Artists</Typography>
            <div style={{ marginTop: '20px' }}>
                <CardActionArea component="a" href="#">
                    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Grid container spacing={1}>
                            {topArtists.map((artist) => (
                                <Grid item key={artist.artist_id} xs={12} sm={6} md={3} lg={4}>
                                    <Card id="cardsStyle" onClick={() => handleCardClick(artist.artist_id)}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                <Typography component="div" variant="h5">
                                                    {artist.artist_name}
                                                </Typography>
                                            </CardContent>
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                    </Box>
                </CardActionArea>
            </div>

            {currentUri.includes(text) && <Albums />}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        topArtists: state.lyrics.topArtists,
        loading: state.lyrics.loading,
        albums: state.lyrics.albums,
    };
};

const mapDispatchToProps = {
    fetchTopArtistsRequest,
    fetchTopArtistsSuccess,
    fetchTopArtistsFailure,
    fetchLatestAlbumsRequest,
    fetchLatestAlbumsSuccess,
    fetchLatestAlbumsFailure,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopArtists);
