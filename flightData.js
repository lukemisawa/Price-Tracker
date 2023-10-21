import axios from "axios";

const flightDetails = {
  method: 'GET',
  url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights',
  params: {
    originSkyId: 'LAX',
    destinationSkyId: 'NRT',
    originEntityId: '95673368',
    destinationEntityId: '128668889',
    date: '2024-08-15',
    adults: '1',
    currency: 'USD',
    market: 'en-US',
    countryCode: 'US'
  },
  headers: {
    'X-RapidAPI-Key': '09ef9e1020msh18337269f10325ap1d38f0jsn067e41395a43',
    'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
  }
};

const flightDataArray = [];

axios.request(flightDetails)
  .then((response) => {
    const responseData = response.data;

    responseData.data.itineraries.forEach((itinerary) => {
      const flightData = {
        airlineName: itinerary.legs[0].carriers.marketing[0].name,
        flightDeparture: itinerary.legs[0].origin.id,
        flightArrival: itinerary.legs[0].destination.id,
        totalFlightTime: itinerary.legs[0].durationInMinutes,
        totalStops: itinerary.legs[0].stopCount,
        price: itinerary.price.formatted
      };
      flightDataArray.push(flightData);
    });

    console.log(flightDataArray);
    
    const filteredData = flightDataArray.filter((flightData) => {
        return flightData.totalStops === 0;
      });
  
      console.log(filteredData); 

// Get a reference to the container element
const dataContainer = document.getElementById('dataContainer');

// Loop through the array and create elements for each item
filteredData.forEach((item) => {
  // Create a <div> element for each item
  const itemElement = document.createElement('div');
  itemElement.classList.add('data-item'); // Optional: add a CSS class for styling

  // Create and set the content for the item element
  const itemAirlineName = document.createElement('h2');
  itemAirlineName.textContent = item.airlineName; // Replace 'name' with the property you want to display

  const itemFlightDeparture = document.createElement('p');
  itemFlightDeparture.textContent = item.flightDeparture; // Replace 'description' with the property you want to display

  // Append the content elements to the item element
  itemElement.appendChild(itemAirlineName);
  itemElement.appendChild(itemFlightDeparture);

  // Append the item element to the container
  dataContainer.appendChild(itemElement);
});
      
    })
    .catch((error) => {
      console.error(error);
    });



// const flightData = {
//     airlineName: "",
//     airlineLogo: "",
//     flightDeparture: "",
//     flightArrival: "",
//     totalFlightTime: "",
//     totalStops: "",
//     price: "",

// };

// try {
// 	const response = await axios.request(flightDetails);
//     const responseData = response.data;

//      // Update flightData object with API data
//   flightData.airlineName = responseData.data.itineraries[0].legs[0].carriers.marketing[0].name;
// //   flightData.airlineLogo = responseData.airlineLogo;
//   flightData.flightDeparture = responseData.data.itineraries[0].legs[0].origin.id;
//   flightData.flightArrival = responseData.data.itineraries[0].legs[0].destination.id;
//   flightData.totalFlightTime = responseData.data.itineraries[0].legs[0].durationInMinutes;
//   flightData.totalStops = responseData.data.itineraries[0].legs[0].stopCount;
//   flightData.price = responseData.data.itineraries[0].price.formatted;

// 	console.log(flightData);
// } catch (error) {
// 	console.error(error);
// }






// const axios = require('axios');

// const options = {
//   method: 'GET',
//   url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport',
//   params: {query: 'LAX'},
//   headers: {
//     'X-RapidAPI-Key': '09ef9e1020msh18337269f10325ap1d38f0jsn067e41395a43',
//     'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
//   }
// };

// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }


  
//   const flightSearchOptions = {
//       method: 'GET',
//       url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights',
//       params: {
//           originSkyId: 'LOND',
//           destinationSkyId: 'NYCA',
//           originEntityId: '27544008',
//           destinationEntityId: '27537542',
//           date: '2024-02-20',
//           adults: '1',
//           currency: 'USD',
//           market: 'en-US',
//           countryCode: 'US'
//       },
//       headers: {
//           'X-RapidAPI-Key': '09ef9e1020msh18337269f10325ap1d38f0jsn067e41395a43',
//           'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
//       }
//   };
  
//   // Function to fetch airport data and update the HTML
//   async function fetchAirportData() {
//       try {
//           const response = await axios.request(airportSearchOptions);
//           const airports = response.data; // Adjust this based on the API response format
//           const airportResultsList = document.getElementById('airport-results');
//           airports.forEach((airport) => {
//               const listItem = document.createElement('li');
//               listItem.textContent = `${airport.name}, ${airport.location}`;
//               airportResultsList.appendChild(listItem);
//           });
//       } catch (error) {
//           console.error('Error fetching airport data:', error);
//       }
//   }
  
//   // Function to fetch flight data and update the HTML
//   async function fetchFlightData() {
//       try {
//           const response = await axios.request(flightSearchOptions);
//           const flights = response.data; // Adjust this based on the API response format
//           const flightResultsList = document.getElementById('flight-results');
//           flights.forEach((flight) => {
//               const listItem = document.createElement('li');
//               listItem.textContent = `${flight.origin} to ${flight.destination}, Price: ${flight.price}`;
//               flightResultsList.appendChild(listItem);
//           });
//       } catch (error) {
//           console.error('Error fetching flight data:', error);
//       }
//   }
  
//   // Call the fetchAirportData and fetchFlightData functions when the page loads
//   window.addEventListener('load', () => {
//       fetchAirportData();
//       fetchFlightData();
//   });



