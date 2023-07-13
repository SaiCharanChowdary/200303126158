import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography } from '@material-ui/core';

const TrainDetailsPage = () => {
  const { trainNumber } = useParams();
  const [train, setTrain] = useState(null);

  useEffect(() => {
    const fetchTrainDetails = async () => {
      try {
        const response = await axios.get(
          `http://20.244.56.144:80/train/trains/${trainNumber}`
        );
        setTrain(response.data);
      } catch (error) {
        console.error('Error fetching train details:', error);
      }
    };

    fetchTrainDetails();
  }, [trainNumber]);

  if (!train) {
    return <Typography>Loading train details...</Typography>;
  }

  return (
    <div>
      <h1>Train Details</h1>
      <Typography variant="h5" component="div">
        Train Name: {train.trainName}
      </Typography>
      <Typography variant="body1" component="div">
        Train Number: {train.trainNumber}
      </Typography>
      <Typography variant="body1" component="div">
        Departure Time: {train.departureTime.Hours}:
        {train.departureTime.Minutes}:
        {train.departureTime.Seconds}
      </Typography>
      <Typography variant="body1" component="div">
        Sleeper Seats Available: {train.seatsAvailable.sleeper}
      </Typography>
      <Typography variant="body1" component="div">
        AC Seats Available: {train.seatsAvailable.AC}
      </Typography>
      <Typography variant="body1" component="div">
        Price (Sleeper): {train.price.sleeper}
      </Typography>
      <Typography variant="body1" component="div">
        Price (AC): {train.price.AC}
      </Typography>
      <Typography variant="body1" component="div">
        Delayed By: {train.delayedBy} minutes
      </Typography>
    </div>
  );
};

export default TrainDetailsPage;
