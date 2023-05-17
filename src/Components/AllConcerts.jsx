import React, { useState, useEffect } from 'react';
import './Concerts.css';

function AllConcerts() {
  const [concerts, setConcerts] = useState([]);

  const API_KEY = '76aa70471c12c49d7b077d57c21e5248';
  const BASE_URL = 'https://rest.bandsintown.com';
  const ARTIST_NAME = 'arctic%20monkeys';
  const DATE = 'upcoming';
  const API_URL = `${BASE_URL}/artists/${ARTIST_NAME}/events?app_id=${API_KEY}&date=${DATE}`;

  async function fetchConcerts() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setConcerts(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  useEffect(() => {
    fetchConcerts();
  }, []);
  

  function showConcerts() {
    return concerts.map(event => {
      // extract the desired information from each event object
      const datetime = event.datetime;
      const venueName = event.venue.name;
      const venueLocation = event.venue.location;
      const eventOffers = event.offers;

      // create a new row element for the table
      return (

        <tr key={event.id} className='ConcertsTable'>
          <td className='datetime'>{datetime}</td>
          <td className='venue'>{venueName}</td>
          <td className='location'>{venueLocation}</td>
          <td className='tickets'>
  {eventOffers.length > 0 ? (
    <a href={eventOffers[0].url} target='_blank'>Tickets</a>
  ) : (
    <span>No tickets available</span>
  )}
</td>

        </tr>

      );
    });
  }

  // render the component
  return (
    <div className='table-container'>
      <table>
        <tbody>
          {showConcerts()}
        </tbody>
      </table>
    </div>
  );
}

export default AllConcerts;

/*

import React, { useState, useEffect } from 'react';
import './Concerts.css';

function ConcertTable() {
  const [concerts, setConcerts] = useState([]);

  const API_KEY = '76aa70471c12c49d7b077d57c21e5248';
  const BASE_URL = 'https://rest.bandsintown.com';
  const ARTIST_NAME = 'arctic%20monkeys';
  const DATE = 'upcoming';
  const API_URL = `${BASE_URL}/artists/${ARTIST_NAME}/events?app_id=${API_KEY}&date=${DATE}`;

  useEffect(() => {
    fetchConcerts();
  }, []);

  function fetchConcerts() {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setConcerts(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  function showConcerts() {
    const slicedData = concerts.slice(0, 5);
    return slicedData.map(event => {
      // extract the desired information from each event object
      const datetime = event.datetime;
      const venueName = event.venue.name;
      const venueLocation = event.venue.location;
      const eventOffers = event.offers;

      // create a new row element for the table
      return (
        <tr key={event.id}>
          <td className='datetime'>{datetime}</td>
          <td className='venue'>{venueName}</td>
          <td className='location'>{venueLocation}</td>
          <td className='tickets'><a href={eventOffers[0].url} target='_blank'>Tickets</a></td>
        </tr>
      );
    });
  }

  const [isShowingAll, setIsShowingAll] = useState(false);

  function handleSeeMore() {
    const url = `${BASE_URL}/artists/${ARTIST_NAME}/events?app_id=${API_KEY}&date=${DATE}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setConcerts(data);
        setIsShowingAll(true);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  

  // render the component
  return (
    <div className='table-container'>
      <table>
        <tbody>
          {showConcerts()}
        </tbody>
      </table>
      <button onClick={handleSeeMore}>See More</button>
    </div>
  );
}

export default ConcertTable;

*/