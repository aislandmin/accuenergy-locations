import { connect } from "react-redux";
import { useEffect, useRef } from "react";
import styles from "../scss/location-map-show.module.scss";

const google = window.google;

function LocationMapShow(props) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!google) return; //do dothing when window google undefined

    const map = new google.maps.Map(mapRef.current, {
      center: { lat: 43.6532, lng: -79.3832 }, //default center Toronto
      zoom: 8,
    });

    if (props.list.length > 0) {
      props.list.map((userLocationObj, index) => {
        const location = { lat: userLocationObj.lat, lng: userLocationObj.lng };

        if (index === props.list.length - 1) {
          //Center map on latest user location
          map.setCenter(location);
        }

        return new google.maps.Marker({
          position: location,
          map,
        });
      });
    }
  }, [props.list]);

  return (
    <div className={styles["location-map-container"]}>
      <div ref={mapRef} className={styles["location-map"]}></div>
    </div>
  );
}

export default connect((state) => {
  const { list } = state;
  return { list };
})(LocationMapShow);
