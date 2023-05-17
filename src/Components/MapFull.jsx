/*import './Concerts.css';
import { GoogleMap, useLoadScript} from '@react-google-maps/api';

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function Map(){
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  if (!isLoaded ) return <div>Loading..</div>;
  return <GoogleMap zoom={10} center={{lat:44,lng:-80,}} mapContainerClassName="map-container"></GoogleMap>;
}


import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 37.7749,
  lng: -122.4194
};

function Map() {
  const [map, setMap] = useState(null);

  const onMapLoad = (map) => {
    setMap(map);
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onLoad={onMapLoad}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;

import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 37.7749,
  lng: -122.4194
};

function Map() {
  const [map, setMap] = useState(null);
  const [concerts, setConcerts] = useState([]);
  const API_KEY = '76aa70471c12c49d7b077d57c21e5248';
  const BASE_URL = 'https://rest.bandsintown.com';
  const ARTIST_NAME = 'arctic%20monkeys';
  const DATE = 'upcoming';
  const API_URL = `${BASE_URL}/artists/${ARTIST_NAME}/events?app_id=${API_KEY}&date=${DATE}`;

  const onMapLoad = (map) => {
    setMap(map);
  };

  useEffect(() => {
    fetchConcerts();
  }, []);

  function fetchConcerts() {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const slicedData = data.slice(0, 5);
        setConcerts(slicedData);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onLoad={onMapLoad}
      >
        {concerts.map((concert) => (
          <Marker key={concert.id} position={{ lat: concert.venue.latitude, lng: concert.venue.longitude }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;

//este muestra los pins 
import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 37.7749,
  lng: -122.4194
};

function Map() {
  const [map, setMap] = useState(null);
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    fetch("https://rest.bandsintown.com/artists/arctic%20monkeys/events?app_id=76aa70471c12c49d7b077d57c21e5248&date=upcoming")
      .then(response => response.json())
      .then(data => setConcerts(data))
  }, []);

  const onMapLoad = map => {
    setMap(map);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDVPoRBFavgFvmLUAnTogVIcjQ2asLRTuY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onLoad={onMapLoad}
      >
        {concerts.map(concert => (
          <Marker
            key={concert.id}
            position={{
              lat: parseFloat(concert.venue.latitude),
              lng: parseFloat(concert.venue.longitude)
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;

//YO SE QUE FUNCIONARAS
import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

function Map() {
  const [map, setMap] = useState(null);
  const [concerts, setConcerts] = useState([]);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
        setUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      }, () => {
        // If the user denies location permission, default to San Francisco
        setUserPosition({
          lat: 37.7749,
          lng: -122.4194
        });
      });

    fetch("https://rest.bandsintown.com/artists/arctic%20monkeys/events?app_id=76aa70471c12c49d7b077d57c21e5248&date=upcoming")
      .then(response => response.json())
      .then(data => setConcerts(data))
  }, []);

  const onMapLoad = map => {
    setMap(map);
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_API_KEY">
      {userPosition && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userPosition} // Use the user's position as the center
          zoom={13}
          onLoad={onMapLoad}
        >
          {concerts.map(concert => (
            <Marker
              key={concert.id}
              position={{
                lat: parseFloat(concert.venue.latitude),
                lng: parseFloat(concert.venue.longitude)
              }}
            />
          ))}
        </GoogleMap>
      )}
    </LoadScript>
  );
}

export default Map; 

//este muestra un popup con data

import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 37.7749,
  lng: -122.4194
};

const mapStyles = [
  {
    featureType: "all",
    elementType: "all",
    stylers: [
      {
        saturation: -100
      },
      {
        lightness: "64"
      },
      {
        color: "#a0a084"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        color: "#ffffff"
      }
    ]
  }
];


function Map() {
  const [map, setMap] = useState(null);
  const [concerts, setConcerts] = useState([]);
  const [selectedConcert, setSelectedConcert] = useState(null);

  useEffect(() => {
    fetch("https://rest.bandsintown.com/artists/arctic%20monkeys/events?app_id=76aa70471c12c49d7b077d57c21e5248&date=upcoming")
      .then(response => response.json())
      .then(data => setConcerts(data))
  }, []);

  const onMapLoad = map => {
    setMap(map);
  };

  const handleClick = (event, concert) => {
    setSelectedConcert(concert);
  };

  const handleCloseClick = () => {
    setSelectedConcert(null);
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={4}
        onLoad={onMapLoad}
      >
        {concerts.map(concert => (
          <Marker
  key={concert.id}
  position={{
    lat: parseFloat(concert.venue.latitude),
    lng: parseFloat(concert.venue.longitude)
  }}
  onClick={event => handleClick(event, concert)}
  label={{ color: "black", fontWeight: "bold", fontSize: "14px", text: concert.venue.city }}
/>

        ))}
        {selectedConcert && (
          <InfoWindow
  position={{
    lat: parseFloat(selectedConcert.venue.latitude),
    lng: parseFloat(selectedConcert.venue.longitude)
  }}
  onCloseClick={handleCloseClick}
  zIndex={100}
>

            <div>
              <h3>{selectedConcert.venue.name}</h3>
              <p>{selectedConcert.venue.city}, {selectedConcert.venue.region}</p>
              <p>{selectedConcert.datetime}</p>
              <a href={selectedConcert.offers[0].url} target="_blank" rel="noopener noreferrer">Get Tickets</a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;/*

//este tiene todos los pins pero no la tabla 

import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

function MapFull() {
  const [map, setMap] = useState(null);
  const [concerts, setConcerts] = useState([]);
  const [selectedConcert, setSelectedConcert] = useState(null);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
        setUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      }, () => {
        // If the user denies location permission, default to San Francisco
        setUserPosition({
          lat: 37.7749,
          lng: -122.4194
        });
      });

    fetch("https://rest.bandsintown.com/artists/arctic%20monkeys/events?app_id=76aa70471c12c49d7b077d57c21e5248&date=upcoming")
      .then(response => response.json())
      .then(data => {
        const sortedConcerts = data.sort((a, b) => {
          const aDistance = getDistance(userPosition, a.venue);
          const bDistance = getDistance(userPosition, b.venue);
          return aDistance - bDistance;
        });
        setConcerts(sortedConcerts);
      });
  }, [userPosition]);

  const onMapLoad = map => {
    setMap(map);
  };

  const handleClick = (event, concert) => {
    setSelectedConcert(concert);
  };

  const handleCloseClick = () => {
    setSelectedConcert(null);
  };

  const getDistance = (position1, position2) => {
    const lat1 = position1.lat;
    const lng1 = position1.lng;
    const lat2 = parseFloat(position2.latitude);
    const lng2 = parseFloat(position2.longitude);
    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) *
        Math.cos(φ2) *
        Math.sin(Δλ / 2) *
        Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;

    return d;
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      {userPosition && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userPosition} // Use the user's position as the center
          zoom={12}
          onLoad={onMapLoad}
          options={{
            styles: [
              {
                featureType: "all",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#a0a084"
                  }
                ]
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [
                  {
                    color: "#ffffff"
                  }
                ]
              }
            ]
          }}
        >
          {concerts.map(concert => (
            <Marker
              key={concert.id}
              position={{
                lat: parseFloat(concert.venue.latitude),
                lng: parseFloat(concert.venue.longitude)
              }}
              onClick={event => handleClick(event, concert)}
            />

          ))}
          {selectedConcert && (
            <InfoWindow
              position={{
                lat: parseFloat(selectedConcert.venue.latitude),
                lng: parseFloat(selectedConcert.venue.longitude)
              }}
              onCloseClick={handleCloseClick}
              zIndex={100}
            >
              <div>
                <h3>{selectedConcert.venue.name}</h3>
                <p>{selectedConcert.venue.city}, {selectedConcert.venue.region}</p>
                <p>{selectedConcert.datetime}</p>
                <a href={selectedConcert.offers[0].url} target="_blank" rel="noopener noreferrer">Get Tickets</a>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </LoadScript>
  );
}

export default MapFull;

/
//sera q se combina la tabla con el mapa??
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import './Concerts.css';

const containerStyle = {
  width: '100%',
  height: '400px'
};

function ConcertTable({ events }) {
  function showConcerts() {
    return events.map(event => {
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
          <td className='tickets'><a href={eventOffers[0].url} target='_blank'>Tickets</a></td>
        </tr>
      );
    });
  }

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

function Map() {
  const [map, setMap] = useState(null);
  const [concerts, setConcerts] = useState([]);
  const [selectedConcert, setSelectedConcert] = useState(null);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    // Wrap async code in an async function
    const fetchData = async () => {
      try {
        // Use template literal to include dynamic values
        const response = await fetch(`https://rest.bandsintown.com/artists/arctic%20monkeys/events?app_id=76aa70471c12c49d7b077d57c21e5248&date=upcoming`);
        const data = await response.json();

        const sortedConcerts = data.sort((a, b) => {
          const aDistance = getDistance(userPosition, a.venue);
          const bDistance = getDistance(userPosition, b.venue);
          return aDistance - bDistance;
        });

        const slicedConcerts = sortedConcerts.slice(0, 5);

        setConcerts(slicedConcerts);

        // Use React state to update the table
        // Remove direct manipulation of the DOM
      } catch (error) {
        console.error('Error:', error);
      }
    };

    navigator.geolocation.getCurrentPosition(position => {
      setUserPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    }, () => {
      // If the user denies location permission, default to San Francisco
      setUserPosition({
        lat: 37.7749,
        lng: -122.4194
      });
    });

    fetchData();

  // Fix the syntax error and add userPosition as a dependency
  }, [userPosition]);

  const onMapLoad = map => {
    setMap(map);
  };

  const handleClick = (event, concert) => {
    setSelectedConcert(concert);
  };

  const handleCloseClick = () => {
    setSelectedConcert(null);
  };

  const getDistance = (position1, position2) => {
    const lat1 = position1.lat;
    const lng1 = position1.lng;
    const lat2 = parseFloat(position2.latitude);
    const lng2 = parseFloat(position2.longitude);
   

    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lng2 - lng1) * Math.PI) / 180;
    const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) *
      Math.cos(φ2) *
      Math.sin(Δλ / 2) *
      Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c;

  return d;
};

return (
  <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
    {userPosition && (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userPosition} // Use the user's position as the center
        zoom={12}
        onLoad={onMapLoad}
        
      >
        {concerts.map(concert => (
          <Marker
              key={concert.id}
              position={{
                lat: parseFloat(concert.venue.latitude),
                lng: parseFloat(concert.venue.longitude)
              }}
              onClick={event => handleClick(event, concert)}
            />

        ))}
        {selectedConcert && (
          <InfoWindow
            position={{
              lat: parseFloat(selectedConcert.venue.latitude),
              lng: parseFloat(selectedConcert.venue.longitude)
            }}
            onCloseClick={handleCloseClick}
            zIndex={100}
          >
            <div>
              <h3>{selectedConcert.venue.name}</h3>
              <p>{selectedConcert.venue.city}, {selectedConcert.venue.region}</p>
              <p>{selectedConcert.datetime}</p>
              <a href={selectedConcert.offers[0].url} target="_blank" rel="noopener noreferrer">Get Tickets</a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    )}
    <ConcertTable events={concerts} />
  </LoadScript>
);
}

export default Map;

import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import './Concerts.css';

const containerStyle = {
  width: '100%',
  height: '400px'
};

function getDistance(userLoc, venueLoc) {
  if (!userLoc || !venueLoc) {
    return null; // or some other default value
  }

  const lat1 = userLoc.lat;
  const lng1 = userLoc.lng;
  const lat2 = venueLoc.lat;
  const lng2 = venueLoc.lng;

  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) *
      Math.cos(φ2) *
      Math.sin(Δλ / 2) *
      Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c;

  return d;
}


function ConcertTable({ events, userPosition }) {
  const sortedEvents = events.slice().sort((a, b) => {
    const aDistance = getDistance(userPosition, a.venue);
    const bDistance = getDistance(userPosition, b.venue);
    return aDistance - bDistance;
  });

  const rows = sortedEvents.map((event) => {
    const datetime = event.datetime;
    const venueName = event.venue.name;
    const venueLocation = event.venue.location;
    const eventOffers = event.offers;

    return (
      <tr key={event.id} className="ConcertsTable">
        <td className="datetime">{datetime}</td>
        <td className="venue">{venueName}</td>
        <td className="location">{venueLocation}</td>
        <td className="tickets">
          {eventOffers.length > 0 ? (
            <a href={eventOffers[0].url} target="_blank">
              Tickets
            </a>
          ) : (
            <span>No tickets available</span>
          )}
        </td>
      </tr>
    );
  });

  return (
    <div className="table-container">
      <table>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}


function MapFull() {
  const [map, setMap] = useState(null);
  const [concerts, setConcerts] = useState([]);
  const [selectedConcert, setSelectedConcert] = useState(null);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    // Wrap async code in an async function
    const fetchData = async () => {
      try {
        // Use template literal to include dynamic values
        const response = await fetch(`https://rest.bandsintown.com/artists/arctic%20monkeys/events?app_id=76aa70471c12c49d7b077d57c21e5248&date=upcoming`);
        const data = await response.json();

        setConcerts(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    navigator.geolocation.getCurrentPosition(position => {
      // If the user denies location permission, default to San Francisco
      setUserPosition({
        lat: 37.7749,
        lng: -22.4194
      });
    });

    fetchData();

  // Fix the syntax error and add userPosition as a dependency
  }, []);

  const onMapLoad = map => {
    setMap(map);
  };

  const handleClick = (event, concert) => {
    setSelectedConcert(concert);
  };

  const handleCloseClick = () => {
    setSelectedConcert(null);
  };

return (
  <LoadScript googleMapsApiKey="AIzaSyDVPoRBFavgFvmLUAnTogVIcjQ2asLRTuY">
    {userPosition && (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userPosition} // Use the user's position as the center
        zoom={3}
        onLoad={onMapLoad}
        
      >
        {concerts.map(concert => (
          <Marker
              key={concert.id}
              position={{
                lat: parseFloat(concert.venue.latitude),
                lng: parseFloat(concert.venue.longitude)
              }}
              onClick={event => handleClick(event, concert)}
            />

        ))}
        {selectedConcert && (
          <InfoWindow
            position={{
              lat: parseFloat(selectedConcert.venue.latitude),
              lng: parseFloat(selectedConcert.venue.longitude)
            }}
            onCloseClick={handleCloseClick}
            zIndex={100}
          >
            <div>
              <h3>{selectedConcert.venue.name}</h3>
              <p>{selectedConcert.venue.city}, {selectedConcert.venue.region}</p>
              <p>{selectedConcert.datetime}</p>
              <a href={selectedConcert.offers[0].url} target="_blank" rel="noopener noreferrer">Get Tickets</a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    )}
    <ConcertTable events={concerts} />
  </LoadScript>
);
}

export default MapFull;*/

//code without requesting user's location
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import './Concerts.css';

const containerStyle = {
  width: '100%',
  height: '400px'
};

function getDistance(userLoc, venueLoc) {
  if (!userLoc || !venueLoc) {
    return null; // or some other default value
  }

  const lat1 = userLoc.lat;
  const lng1 = userLoc.lng;
  const lat2 = venueLoc.lat;
  const lng2 = venueLoc.lng;

  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) *
      Math.cos(φ2) *
      Math.sin(Δλ / 2) *
      Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c;

  return d;
}


function ConcertTable({ events, userPosition }) {
  const sortedEvents = events.slice().sort((a, b) => {
    const aDistance = getDistance(userPosition, a.venue);
    const bDistance = getDistance(userPosition, b.venue);
    return aDistance - bDistance;
  });

  const rows = sortedEvents.map((event) => {
    const datetime = event.datetime;
    const venueName = event.venue.name;
    const venueLocation = event.venue.location;
    const eventOffers = event.offers;

    return (
      <tr key={event.id} className="ConcertsTable">
        <td className="datetime">{datetime}</td>
        <td className="venue">{venueName}</td>
        <td className="location">{venueLocation}</td>
        <td className="tickets">
          {eventOffers.length > 0 ? (
            <a href={eventOffers[0].url} target="_blank">
              Tickets
            </a>
          ) : (
            <span>No tickets available</span>
          )}
        </td>
      </tr>
    );
  });

  return (
    <div className="table-container">
      <table>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}


function MapFull() {
  const [map, setMap] = useState(null);
  const [concerts, setConcerts] = useState([]);
  const [selectedConcert, setSelectedConcert] = useState(null);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    // Wrap async code in an async function
    const fetchData = async () => {
      try {
        // Use template literal to include dynamic values
        const response = await fetch(`https://rest.bandsintown.com/artists/arctic%20monkeys/events?app_id=76aa70471c12c49d7b077d57c21e5248&date=upcoming`);
        const data = await response.json();

        setConcerts(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
      // If the user denies location permission, default to San Francisco
      setUserPosition({
        lat: 37.7749,
        lng: -22.4194
    });

    fetchData();

  // Fix the syntax error and add userPosition as a dependency
  }, []);

  const onMapLoad = map => {
    setMap(map);
  };

  const handleClick = (event, concert) => {
    setSelectedConcert(concert);
  };

  const handleCloseClick = () => {
    setSelectedConcert(null);
  };

return (
  <LoadScript googleMapsApiKey="AIzaSyDVPoRBFavgFvmLUAnTogVIcjQ2asLRTuY">
    {userPosition && (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userPosition} // Use the user's position as the center
        zoom={3}
        onLoad={onMapLoad}
        
      >
        {concerts.map(concert => (
          <Marker
              key={concert.id}
              position={{
                lat: parseFloat(concert.venue.latitude),
                lng: parseFloat(concert.venue.longitude)
              }}
              onClick={event => handleClick(event, concert)}
            />

        ))}
        {selectedConcert && (
          <InfoWindow
            position={{
              lat: parseFloat(selectedConcert.venue.latitude),
              lng: parseFloat(selectedConcert.venue.longitude)
            }}
            onCloseClick={handleCloseClick}
            zIndex={100}
          >
            <div>
              <h3>{selectedConcert.venue.name}</h3>
              <p>{selectedConcert.venue.city}, {selectedConcert.venue.region}</p>
              <p>{selectedConcert.datetime}</p>
              <a href={selectedConcert.offers[0].url} target="_blank" rel="noopener noreferrer">Get Tickets</a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    )}
    <ConcertTable events={concerts} />
  </LoadScript>
);
}

export default MapFull;