import React, { Component } from "react";
import styled from "styled-components";
import {
  Thumbnail,
  FlatList,
  Col,
  Body,
  Row,
  ListItem,
  Right,
  Text
} from "native-base";
class City extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city_name: "",
      city: [],
      forecast: []
    };
  }

  convertKelvinToCelsius = kelvin => {
    if (kelvin < 0) {
      return "below absolute zero (0 K)";
    } else {
      return parseInt(kelvin - 273.15) + " °C";
    }
  };
  componentDidMount() {
    this.getForecastData();
  }
  getForecastData = () => {
    let city = this.props.navigation.getParam("city");
    let url =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city.name +
      "&appid=xxxxxxxxxx";
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log(json.list);
        this.setState({
          forecast: json
        });
      })
      .catch(err => console.log(err));
  };
  getShortTimeFormat = datetime => {
    return new Date(datetime).toUTCString();
  };

  render() {
    // let temp_min = this.state.city.main.temp_min;
    // let icon = this.state.city.weather[0].icon;
    // let main_temp = this.state.city.main.temp;
    // let weather_state = this.state.city.weather[0].main;
    let city = this.props.navigation.getParam("city");
    let forecast = this.props.navigation.getParam("forecast");
    console.log(forecast);
    return (
      <Container>
        <CityName>{city.name}</CityName>
        <Today>Thursday ,May,22,2019 </Today>

        <MaxandMinTep>
          {this.convertKelvinToCelsius(city.main.temp_min)},
          {this.convertKelvinToCelsius(city.main.temp_max)}
        </MaxandMinTep>

        <Body>
          <Thumbnail
            source={{
              uri:
                "http://openweathermap.org/img/wn/" +
                city.weather[0].icon +
                ".png"
            }}
          />
          <FeatureTemp>
            {this.convertKelvinToCelsius(city.main.temp)}
          </FeatureTemp>
          <WeatherDescription>{city.weather[0].main}</WeatherDescription>
        </Body>
        <FlatList
          data={forecast.list}
          keyExtractor={(item, index) => String(index)}
          renderItem={({ item, index }) => (
            <ListItem key={index}>
              <Body>
                <Text>{item.main.temp}</Text>
                <Text note>{item.dt_text}</Text>
              </Body>
              <Right>
                <Thumbnail
                  source={{
                    uri:
                      "http://openweathermap.org/img/wn/" +
                      item.weather[0].icon +
                      ".png"
                  }}
                />
              </Right>
            </ListItem>
          )}
        />
        <ForcastTitle>24 Hour Forcast</ForcastTitle>
        <ForcastDetailWrapper />
        <CurrentDetail>Current Detail</CurrentDetail>
        <LeftText>Humidity</LeftText>
        <LeftText>Wind</LeftText>
        <LeftText>Presure</LeftText>
        <LeftText>Chance of Rain</LeftText>
        <RightText>{city.main.temp} %</RightText>
        <RightText>{city.wind.speed} km/hr</RightText>
        <RightText>{city.main.pressure} mbar</RightText>
        <RightText>30 %</RightText>
      </Container>
    );
  }
}
const LeftText = styled.Text`
  font-size: 13;
  left: 0;
`;
const RightText = styled.Text`
  font-size: 13;
  left: 0;
  right: 100%;
`;
const ForcastDetailWrapper = styled.View`
  align-items: center;
  align-content: center;
`;
const ForcastTime = styled.Text`
  flex: 1;
  font-size: 10;
`;
const ForcastIcon = styled.Image`
  flex: 1;
  font-size: 10;
`;
const ForcastTemp = styled.Text`
  flex: 1;
  font-size: 10;
`;
const CurrentDetail = styled.Text`
  font-size: 15;
`;
const WeatherDescription = styled.Text`
  align-items: center;
  align-content: center;
  font-size: 20;
  font-weight: 300;
`;
const FeatureTemp = styled.Text`
  align-items: center;
  align-content: center;
  font-size: 60;

  font-weight: 300;
`;
const WeatherIcon = styled.View`
  flex: 1;
  align-items: center;
  height: 30px;
`;
const MaxandMinTep = styled.Text`
  font-size: 12;
  font-weight: 300;
`;
const ForcastTitle = styled.Text`
  font-size: 12;
  font-weight: 300;
`;
const Container = styled.View`
  flex: 1;
  padding: 24px;
  align-content: center;
`;
const CityName = styled.Text`
  font-size: 35;
  font-weight: 500;
  color: grey;
`;
const Today = styled.Text`
  position: relative;
`;
export default City;
