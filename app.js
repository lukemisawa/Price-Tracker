import express from "express";
import { fileURLToPath } from 'url'; // Import the 'url' module
import path from "path";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle the root route (http://localhost:3000/)
app.get('/', (req, res) => {
  // Send the 'index.html' file when someone accesses the root route
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/prices', (req, res) => {
  // Send the 'index.html' file when someone accesses the root route
  res.sendFile(path.join(__dirname, 'public', 'prices.html'));
});

app.get('/flightDetails', async (req, res) => {

  // const departureDate = req.query.departureDate;
  // const returningDate = req.query.returningDate;

  const flightDetails = {
    method: 'GET',
    url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights',
    params: {
      originSkyId: 'LAX',
      destinationSkyId: 'NRT',
      originEntityId: '95673368',
      destinationEntityId: '128668889',
      date: '2023-10-21',
      returnDate: '2023-10-28',
      adults: '1',
      currency: 'USD',
      market: 'en-US',
      countryCode: 'US'
    },
    headers: {
      'X-RapidAPI-Key': 'cf0dcedc89mshb0295d9f8b9c32cp11635djsnc11688930d6d',
      //c48e331dd8msh1de9d8583d49c57p19468bjsn34d3b135755f
      'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
    }
  };
  
  const flightDataArray = [];
  try {
    const response = await axios.request(flightDetails);
    const responseData = response.data;
  
  // console.log(responseData);

      responseData.data.itineraries.forEach((itinerary) => {
        const flightData = {
          airlineName: itinerary.legs[0].carriers.marketing[0].name,
          price: itinerary.price.formatted,
          flightDeparture1: itinerary.legs[0].origin.id,
          flightArrival1: itinerary.legs[0].destination.id,
          totalFlightTime1: itinerary.legs[0].durationInMinutes,
          departureTime1: itinerary.legs[0].segments[0].departure,
          arrivaltTime1: itinerary.legs[0].segments[0].arrival,
          totalStops1: itinerary.legs[0].stopCount,
          flightDeparture2: itinerary.legs[1].origin.id,
          flightArrival2: itinerary.legs[1].destination.id,
          totalFlightTime2: itinerary.legs[1].durationInMinutes,
          departureTime2: itinerary.legs[1].segments[0].departure,
          arrivaltTime2: itinerary.legs[1].segments[0].arrival,
          totalStops2: itinerary.legs[1].stopCount
        };
        flightDataArray.push(flightData);
      });
      
      const filteredData = flightDataArray.filter((flightData) => {
          return flightData.totalStops1 === 0 && flightData.totalStops2 === 0 && parseFloat(flightData.price.replace('$', '').replace(',', '')) < 2000;
        });
  res.render("flightDetails.ejs", {flightDataArray: filteredData});
  } catch (error) {
          console.error(error);
  }
        });
        
  

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});




  



