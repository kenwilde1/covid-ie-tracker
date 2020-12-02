import { useState, useEffect } from "react";

const Main = (props) => {
  const [covidData, setCovidData] = useState({});
  const { date } = props;

  const fetchCovidData = async () => {
    const response = await fetch(
      "https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=Date,ConfirmedCovidCases,TotalConfirmedCovidCases,ConfirmedCovidDeaths,TotalCovidDeaths,CovidCasesConfirmed,HospitalisedCovidCases,RequiringICUCovidCases&outSR=4326&f=json"
    );
    const data = await response.json();

    setCovidData(data.features.pop().attributes);
  };

  const fetchSelectedCovidData = async () => {
    const response = await fetch(
      "https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=Date,ConfirmedCovidCases,TotalConfirmedCovidCases,ConfirmedCovidDeaths,TotalCovidDeaths,CovidCasesConfirmed,HospitalisedCovidCases,RequiringICUCovidCases&outSR=4326&f=json"
    );
    const data = await response.json();
    const arrayOfObjects = data.features;
    const result = await arrayOfObjects.filter((object) => {
      return object.attributes.Date === date;
    });
    if (result.length > 0) {
      setCovidData(result[0]["attributes"]);
      console.log(result[0]);
    }
  };

  useEffect(() => {
    fetchCovidData();
  }, []);

  useEffect(() => {
    fetchSelectedCovidData();
  }, [date]);

  return (
    <div className="main">
      <div className="covid-data-container">
        <h1>The latest Daily Covid-19 statistics in Ireland are...</h1>
        <p>
          Confirmed Covid Cases:{" "}
          <strong>{covidData.ConfirmedCovidCases}</strong>
        </p>
        <p>
          Confirmed Covid Deaths:{" "}
          <strong>{covidData.ConfirmedCovidDeaths}</strong>
        </p>
        <p>
          Total Confirmed Cases:{" "}
          <strong>{covidData.TotalConfirmedCovidCases}</strong>
        </p>
        <p>
          Total Confirmed Deaths: <strong>{covidData.TotalCovidDeaths}</strong>
        </p>
      </div>
    </div>
  );
};

export default Main;
