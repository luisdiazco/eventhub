import React, { useState } from "react";
import { styles } from "../utils/MapStyle";

import {
  Text,
  TouchableOpacity,
  Animated,
  Image,
  Dimensions,
  View,
  PermissionsAndroid,
  Linking,
  Modal,
} from "react-native";
import Geolocation from "react-native-geolocation-service";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/Ionicons";
import { Button } from "react-native-paper";
import MapViewDirections from "react-native-maps-directions";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT + 150;
const TICKETMASTER_APIKEY = "4J2LVS6gluXbSCacZERsocPyJgOgZTQp";
const GOOGLE_MAPS_APIKEY = "AIzaSyDJUm2k0TzAmIWLqkRO_7fqJz-JODGJHdE";

// used to debug project
//<script src="http://localhost:8097"></script>

/* The map component that generates the home page.
 * Displays the map and nearby events. Map currently features the following:
 * Login, cards, event markers, and event details.
 */
export default class Map extends React.Component {
  // contains props to manage the current state of the app
  constructor(props) {
    super(props);
    this.state = {
      latlon: 0,
      latitude: 0,
      longitude: 0,
      dest_lat: 0,
      dest_long: 0,
      coordinates: [], // origin coord
      eventArr: [], // object that lists every event
      groupedArr: [], // object that lists events by venue
      modalOpen: false,
      eventUrl: "",
      eventDate: "",
      eventDistance: 0,
      eventObj: [],
      eventCostMin: 0,
      eventCostMax: 0,
      eventCurrency: "",
      eventImg: "",
      filterIcon: "bookmark-outline",
      showDefaultIcon: true,
      eventsFiltered: [],
    };
  }

  /* function that takes in the users geolocation and radius as params for ticketmaster api
   * fetches json object which contains event details such as name, venues, image, price, etc.
   * sets states for both grouped events and venues.
   */
  getData = (currHash, radius = 25) => {
    fetch(
      "https://app.ticketmaster.com/discovery/v2/events.json?" +
        `latlong=${currHash}` +
        "&size=25" +
        "&unit=km" +
        "&includeTBA=no" +
        `&radius=${radius}` +
        `&apikey=${TICKETMASTER_APIKEY}`
    )
      .then((response) => {
        var jsonResponse = {};
        if (response) {
          return response.json();
        } else {
          while (response != true) {
            jsonResponse = response.json();
          }
          return jsonResponse;
        }
      })
      .then((jsonResponse) => {
        let eventList = [];
        for (let i = 0; i < jsonResponse._embedded.events.length; i++) {
          eventList.push(jsonResponse._embedded.events[i]);
          // if(i==0) console.log(jsonResponse._embedded.events[i])
        }
        this.setState({ eventArr: eventList });
        let groupedEvents = this.state.eventArr.reduce(function (r, a) {
          r[a._embedded.venues[0].name] = r[a._embedded.venues[0].name] || [];
          r[a._embedded.venues[0].name].push(a);
          return r;
        }, Object.create(null));
        this.setState({ groupedArr: groupedEvents });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /* Function invoked after component is rendered
   * asks user for location permissions and saves geolocation.
   * function then calls getdata to display nearby events
   * upon startup.
   */
  componentDidMount() {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "GPS Location Permission",
            message: "GPS needs access to your location",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Location permission granted");

          Geolocation.getCurrentPosition(
            (position) => {
              this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latlon:
                  position.coords.latitude + "," + position.coords.longitude,
                coordinates: this.state.coordinates.concat({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                }),
              });
              this.getData(
                position.coords.latitude + "," + position.coords.longitude,
                100
              ); // fire api request
            },
            (error) => {
              console.log(error);
            },
            {
              showLocationDialog: true,
              enableHighAccuracy: true,
              timeout: 20000,
              maximumAge: 0,
              distanceFilter: 0,
            }
          );
        } else {
          console.log("Location permission denied");
        }
      } catch (err) {
        console.log("error");
        console.warn(err);
      }
    };
    requestLocationPermission();
  }

  render() {
    // User's location
    const origin = {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    };

    // function that re centers the map to user current location
    // takes in the latitude and longitude of the user
    const reCenter = (lat, long) => {
      this.map.animateToRegion({
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    };

    // function that re centers the map to the target venue
    // takes in the latitude and longitude of the event's location
    // sets the state of both destination lat/long to draw map directions
    const gotoVenue = (lat, long) => {
      this.setState({
        dest_lat: parseFloat(lat),
        dest_long: parseFloat(long),
      });
      this.map.animateToRegion({
        latitude: parseFloat(lat),
        longitude: parseFloat(long),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    };

    // toggles the filter icon based on user click
    const changeFilter = () => {
      const defaultIcon = "bookmark-outline";
      const changedIcon = "bookmark";
      var iconScr = this.state.showDefaultIcon ? defaultIcon : changedIcon;
      this.setState({ filterIcon: iconScr });
    };

    {
      /* Object used as react element to display all nearby events as cards. 
    Cards will be used to redirect users to ticketmaster in order to purchase tickets.
    */
    }

    // Map the grouped events based on the venue name to retrieve objects
    // for that specific venue
    var eventCard = Object.keys(this.state.groupedArr).map((item, i) =>
      // traverse throught all events located at the specific venue name
      this.state.groupedArr[item].map((e) => (
        <View key={e.id} style={styles.card}>
          <View styles={styles.textContent}>
          <Image
                  source={{
                    uri: e.images != null ? e.images[0].url : "",
                  }}
                  style={{
                    width: 100,
                    height: 50,
                    alignSelf: "center",
                    borderRadius: 16,
                  }}
                  resizeMode="cover"
                />
            <Text numberOfLines={1} style={styles.cardTitle}>
              {e.name}
            </Text>
            <Text numberOfLines={1} style={styles.cardTitle}>
              {e.classifications[0].segment.name} - {e.classifications[0].genre.name} - {e.dates.start.localDate}
            </Text>
          </View>
          <View styles={styles.cardBtnContainer}>
            <TouchableOpacity
              onPress={() =>
                this.setState({
                  modalOpen: true,
                  eventUrl: e.url,
                  eventObj: e,
                  eventDate: e.dates.start.localDate,
                  eventCostMin:
                    e.priceRanges != null ? e.priceRanges[0].min : "Unknown",
                  eventCostMax:
                    e.priceRanges != null ? e.priceRanges[0].max : "Unknown",
                  eventCurrency:
                    e.priceRanges != null ? e.priceRanges[0].currency : "Unknown",
                  eventImg: 
                    e.images != null ? e.images[0].url : "",
                  eventStatus:
                    e.dates.status.code == "onsale" ? "On sale" : "Unknown",
                  eventSegment:
                    e.classifications[0].segment.name,
                  eventGenre:
                    e.classifications[0].genre.name,
                })
              }
            >
              <View style={styles.btnContainer}>
                <Text style={styles.btnText}>More Info</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                gotoVenue(
                  e._embedded.venues[0].location.latitude,
                  e._embedded.venues[0].location.longitude
                )
              }
            >
              <View style={styles.btnContainer}>
                <Text style={styles.btnText}>Find Venue</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Modal
            transparent
            visible={this.state.modalOpen}
          >
            <View style={[styles.modalCard]}>
              <View>
                <TouchableOpacity
                  style={styles.closeIcon}
                  onPress={() => this.setState({ modalOpen: false })}
                >
                  <Icon style={styles.backBtn} name="chevron-back-sharp" size={30} />
                  <Text style={styles.backBtn}>Back</Text>
                </TouchableOpacity>
                <Image
                  source={{
                    uri: this.state.eventImg,
                  }}
                  style={{
                    width: 300,
                    height: 150,
                    alignSelf: "center",
                    borderRadius: 16,
                  }}
                  resizeMode="cover"
                />
                <View>
                  <Text style={styles.modalTitle}>
                    {this.state.eventObj.name}
                  </Text>
                  <Text style={styles.modalDistanceText}>
                    {this.state.eventObj.distance} KM from current location
                  </Text>
                  <View style={styles.modalContent}>
                    <Text style={styles.infoText}>
                      Date: {this.state.eventDate} {" "} Status: {this.state.eventStatus}
                    </Text>
                    <Text style={styles.infoText}>
                      Cost: ${this.state.eventCostMin} - ${this.state.eventCostMax} ({this.state.eventCurrency})
                    </Text>
                  </View>
                  <View style={styles.modalBtnContainer}>
                    <TouchableOpacity
                      style={styles.modalBtn}
                      onPress={() => Linking.openURL(this.state.eventUrl)}
                    >
                      <Text style={styles.btnText}>Find Tickets</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.modalBtn}
                      onPress={() => {
                        this.setState({
                          showDefaultIcon: !this.state.showDefaultIcon,
                        });
                        changeFilter();
                      }}
                    >
                      <Icon
                        style={styles.btnText}
                        name={this.state.filterIcon}
                        size={30}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalBtn}>
                      <Icon
                        style={styles.btnText}
                        name="share-social-outline"
                        size={30}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      ))
    );

    return (
      <View style={styles.container}>
        <MapView
          ref={(map) => (this.map = map)}
          provider={PROVIDER_GOOGLE}
          style={styles.container}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
            }}
          ></Marker>
          {this.state.eventArr.map((val, index) => {
            return (
              <Marker
                coordinate={{
                  latitude: parseFloat(
                    val._embedded.venues[0].location.latitude
                  ),
                  longitude: parseFloat(
                    val._embedded.venues[0].location.longitude
                  ),
                }}
                key={index}
                title={val._embedded.venues[0].name}
              >
                <View style={styles.markerWrap}>
                  <View style={styles.marker} />
                </View>
              </Marker>
            );
          })}
          <MapViewDirections
            origin={origin}
            destination={
              this.state.dest_lat == 0 && this.state.dest_long == 0
                ? origin
                : {
                    latitude: this.state.dest_lat,
                    longitude: this.state.dest_long,
                  }
            }
            apikey={GOOGLE_MAPS_APIKEY}
            strokeColor="#FF0000"
            strokeColors={["#FF0000"]}
            strokeWidth={2}
          />
        </MapView>

        <Button
          textContent="Re center"
          color="black"
          style={styles.recenterButton}
          onPress={() => reCenter(this.state.latitude, this.state.longitude)}
        >
          <Icon color="red" name="md-locate-sharp" size={30} />
        </Button>

        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {eventCard.length ? eventCard : null}
        </Animated.ScrollView>
      </View>
    );
  }
}