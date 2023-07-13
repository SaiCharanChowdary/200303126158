import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';

const TrainsPage = () => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await axios.get(
          'http://20.244.56.144:80/train/trains'
        );
        console.log('API response:', response.data); 
        setTrains(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trains:', error);
        setError('Error fetching trains. Please try again later.');
        setLoading(false);
      }
    };
    

    fetchTrains();
  }, []);

  const renderTrains = () => {
    if (loading) {
      return <Typography>Loading trains...</Typography>;
    }

    if (error) {
      return <Typography>{error}</Typography>;
    }

    if (!Array.isArray(trains)) {
      return <Typography>No train data available.</Typography>;
    }
  
    return trains.map((train) => (
      <ListItem
        key={train.trainNumber}
        button
        component={Link}
        to={`/trains/${train.trainNumber}`}
      >
        <ListItemText
          primary={train.trainName}
          secondary={`Train Number: ${train.trainNumber}`}
        />
      </ListItem>
    ));
  }
  return (
    <div>
      <h1>All Trains</h1>
      <List>{renderTrains()}</List>
    </div>
  );
};

export default TrainsPage;
