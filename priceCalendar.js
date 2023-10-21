import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/getPriceCalendar',
  params: {
    originSkyId: 'LAX',
    destinationSkyId: 'NRT',
    fromDate: '2024-02-01',
    toDate: '2024-02-28',
  },
  headers: {
    'X-RapidAPI-Key': '09ef9e1020msh18337269f10325ap1d38f0jsn067e41395a43',
    'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}