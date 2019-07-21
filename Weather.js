import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text
} from "native-base";
import { FlatList, TouchableOpacity, Modal } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: []
    };
  }
  fetchForecastData = item => {
    let url =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      item.name +
      "&appid=f7c0c437f148bec726fdfb6426c26347";

    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.props.navigation.navigate("City", {
          city: item,
          forecast: json
        });
      })
      .catch(err => console.log(err));
  };

  weatherFlatList = () => {
    return (
      <FlatList
        data={this.state.city}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item, index }) => (
          <ListItem key={index}>
            <Body>
              <TouchableOpacity
                key={index}
                onPress={() => this.fetchForecastData(item)}
              >
                <Text>{item.name}</Text>
                <Text note>19:04</Text>
              </TouchableOpacity>
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
            <Right>
              <Text note>{this.convertKelvinToCelsius(item.main.temp)}</Text>
            </Right>
          </ListItem>
        )}
      />
    );
  };

  convertKelvinToCelsius = kelvin => {
    if (kelvin < 0) {
      return "below absolute zero (0 K)";
    } else {
      return parseInt(kelvin - 273.15) + " °C";
    }
  };
  getWeatherData = city_name => {
    let url =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city_name +
      "&appid=xxxxxxxxxxx";
    fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          city: [...this.state.city, json]
        });
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <Container>
        <Content>
          <GooglePlacesAutocomplete
            placeholder="Enter Location"
            minLength={2}
            autoFocus={false}
            returnKeyType={"default"}
            listViewDisplayed={false}
            fetchDetails={true}
            query={{
              // available options: https://developers.google.com/places/web-service/autocomplete
              key: "xxxxxxxx",
              language: "en", // language of the results
              types: "(cities)" // default: 'geocode'
            }}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true

              this.getWeatherData(data.description);
            }}
            styles={{
              textInputContainer: {
                borderTopWidth: 0,
                borderBottomWidth: 0
              },
              textInput: {
                marginLeft: 0,
                marginRight: 0,
                height: 38,
                color: "#5d5d5d",
                fontSize: 16
              },
              predefinedPlacesDescription: {
                color: "#1faadb"
              }
            }}
            currentLocation={false}
          />
          {this.weatherFlatList()}
        </Content>
      </Container>
    );
  }
}
