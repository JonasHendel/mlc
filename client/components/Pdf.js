import React from "react";
import {
  Page,
  Text,
  View,
  Link,
  Document,
  Svg,
  PDFViewer,
  Font,
  Image,
} from "@react-pdf/renderer";
import { useSelector } from "react-redux";
import { styles } from "../styles/pdfStyles";

import MlcLogo from "../public/mlcLOGOv2.svg";

// Create styles
const Pdf = () => {
  const meetingPoint = useSelector(
    (state) => state.meetingPoint.point
  );
  const startPoints = useSelector((state)=>state.startPoints.points)
  const trip = meetingPoint.tripToAirport
  return (
    <PDFViewer showToolbar="false" width="640" height="944">
      <Document>
        <Page style={styles.body}>
          <View style={styles.header}>
            <Text style={styles.title}>MLC</Text>
            <Image
              style={styles.logo}
              source="http://localhost:3000/mlcLOGOv2.jpg"
            />
          </View>
          <View>
            <Text style={styles.calculationText}>
              Initially, the geodesic median is calculated. The geodesic median
              is the point where the sum of distances to all other points is the
              smallest.
            </Text>
            <Text style={styles.calculationText}>
              The geodesic median is not always the point where the total
              emissions from each trip are the smallest, since planes consume
              more fuel in the LTO (landing and takeoff) phase than in the CCD
              (climb, cruise, and descent) phase.
            </Text>
            <Text style={styles.calculationText}>
              To take this into account, an algorithm runs, which sets the
              meeting point to the closest start point. It then compares the
              total CO2 emissions of the two meeting points with another. If the
              total CO2 emissions to the second meeting point (closest start
              point) are less than the emissions to the geodesic median, the
              second meeting point is set as the point with the least emissions.
              The emissions are calculated using data obtained from the European
              Environment Agency and EMEP, using this data the average emissions
              for the three most common airplanes for short/medium-range and
              long-range are calculated.
            </Text>
            <Text style={styles.calculationText}>
              Since the emissions in the CCD phase do not increase
              proportionally to the distance there is emission data for several
              different distances. If the trip is 250 nautical miles long the
              average CO2 emissions per nautical mile are more than if the trip
              is 500 nautical miles long. Therefore the CO2 emissions of a trip
              are always calculated using the emission data for the closest
              distance. If the trip is 280 nautical miles long, the emissions
              for 250 nautical miles are divided by 250 and then multiplied by
              280.
            </Text>
          </View>
          <View>
            <Text style={styles.subtitle}>Meeting-point:</Text>
          </View>
          {/* <View style={styles.mapImageCont}>
						<Image style={styles.mapImage} source='http://localhost:3000/exampleScreenshot.png' />
        </View> */}
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Airport/City</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Latitude</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Longitude</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Total CO2</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Total distance</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{meetingPoint.airport.iata_code}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {meetingPoint.airport.coordinates[0]}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {meetingPoint.airport.coordinates[1]}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {Math.round(meetingPoint.tripToAirport.totalCO2) / 1000}t
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {Math.round(meetingPoint.tripToAirport.totalDistance)}km
                </Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.subtitle}>Trips:</Text>
          </View>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader1}>
                <Text style={styles.tableCellHeader}>From</Text>
              </View>
              <View style={styles.tableColHeader1}>
                <Text style={styles.tableCellHeader}>To</Text>
              </View>
              <View style={styles.tableColHeader2}>
                <Text style={styles.tableCellHeader}>LTO/CCD C02</Text>
              </View>
              <View style={styles.tableColHeader1}>
                <Text style={styles.tableCellHeader}>CO2</Text>
              </View>
              <View style={styles.tableColHeader1}>
                <Text style={styles.tableCellHeader}>Distance</Text>
              </View>
            </View>
            {startPoints.map((point, index) => (
              <View style={styles.tableRow}>
                <View style={styles.tableCol1}>
                  <Text style={styles.tableCell}>{point.airport.iata_code}</Text>
                </View>
                <View style={styles.tableCol1}>
                  <Text style={styles.tableCell}>
                    {meetingPoint.airport.iata_code}
                  </Text>
                </View>
                <View style={styles.tableCol2}>
                  {Math.round(meetingPoint.tripToAirport.co2Array[index]) == 0 ? (
                    <Text style={styles.tableCell}>0t/0t</Text>
                  ) : (
                    <Text style={styles.tableCell}>
                      3.153/
                      {Math.round(meetingPoint.tripToAirport.co2Array[index] - 3153) / 1000}t
                    </Text>
                  )}
                </View>
                <View style={styles.tableCol1}>
                  <Text style={styles.tableCell}>
                    {Math.round(meetingPoint.tripToAirport.co2Array[index]) / 1000}t
                  </Text>
                </View>
                <View style={styles.tableCol1}>
                  <Text style={styles.tableCell}>
                    {Math.round(meetingPoint.tripToAirport.distanceArray[index])}KM
                  </Text>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.emmissonSrc}>
            <Link src={`${process.env.NEXT_PUBLIC_BASE_URL}/emissions.json`}>
              Emission Data
            </Link>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default Pdf;
