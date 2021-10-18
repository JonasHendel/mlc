import React from 'react';
import { Page, Text, View, Image, Document, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';

// Create styles
const Pdf = () => (
	<PDFViewer width='800' height='1000'>
		<Document>
			<Page style={styles.body}>
				<View>
					<Text style={styles.title}>MLC</Text>
				</View>
				<View>
					<Text style={styles.calculationText}>
						Initially, the geodesic median is calculated. The geodesic median is the point where the sum of distances to other points is the smallest.
					</Text>
					<Text style={styles.calculationText}>
						The geodesic median is not always also the point where the total emissions from each trip are the smallest since planes consume more fuel in the LTO phase (landing and takeoff)
						than in the CCD (climb, cruise, and descent) phase.
					</Text>
					<Text style={styles.calculationText}>
						To take this into account, an algorithm runs, which sets the meeting point to the closest start point and then compares the CO2 emissions of the two meeting points with
						another. If the total CO2 emissions from the second meeting point (closest start point) are less than the emissions from the geodesic median, the second meeting point is set as
						the point with the least emissions. The emissions are calculated using data obtained by the !!!!!CHANGE!!!!!!, using this data the average emissions for the three most common
						airplanes for short/medium-range and long-range are calculated.
					</Text>
					<Text style={styles.calculationText}>
						Since the emissions in the CCD phase do not increase proportionally to the distance there is emission data for several different distances. If the trip is 250 nautical miles
						long the average CO2 emissions are more than if the trip is 500 nautical miles long. Therefore the CO2 emissions of a trip are always calculated using the emission data for the
						closest distance. If the trip is 280 nautical miles long, the emissions for 250 nautical miles are divided by 250 and then multiplied by 280.
					</Text>
				</View>
				<View style={styles.table}>
					<View style={styles.tableRow}>
						<View style={styles.tableColHeader}>
							<Text style={styles.tableCellHeader}>From</Text>
						</View>
						<View style={styles.tableColHeader}>
							<Text style={styles.tableCellHeader}>To</Text>
						</View>
						<View style={styles.tableColHeader}>
							<Text style={styles.tableCellHeader}>LTO/CCD C02</Text>
						</View>
            <View style={styles.tableColHeader}>
							<Text style={styles.tableCellHeader}>CO2</Text>
						</View>
						<View style={styles.tableColHeader}>
							<Text style={styles.tableCellHeader}>Distance</Text>
						</View>
					</View>
					<View style={styles.tableRow}>
						<View style={styles.tableCol}>
							<Text style={styles.tableCell}>OSL</Text>
						</View>
						<View style={styles.tableCol}>
							<Text style={styles.tableCell}>SXF</Text>
						</View>
            <View style={styles.tableCol}>
							<Text style={styles.tableCell}>4400/8000</Text>
						</View>
						<View style={styles.tableCol}>
							<Text style={styles.tableCell}>8t</Text>
						</View>
						<View style={styles.tableCol}>
							<Text style={styles.tableCell}>700km</Text>
						</View>
					</View>
					<View style={styles.tableRow}>
						<View style={styles.tableCol}>
							<Text style={styles.tableCell}>OSL</Text>
						</View>
						<View style={styles.tableCol}>
							<Text style={styles.tableCell}>SXF</Text>
						</View>
            <View style={styles.tableCol}>
							<Text style={styles.tableCell}>4400/8000</Text>
						</View>
						<View style={styles.tableCol}>
							<Text style={styles.tableCell}>8t</Text>
						</View>
						<View style={styles.tableCol}>
							<Text style={styles.tableCell}>700km</Text>
						</View>
					</View>
					<View style={styles.tableRow}>
						<View style={styles.tableCol}>
							<Text style={styles.tableCell}>OSL</Text>
						</View>
						<View style={styles.tableCol}>
							<Text style={styles.tableCell}>SXF</Text>
						</View>
            <View style={styles.tableCol}>
							<Text style={styles.tableCell}>4400/8000</Text>
						</View>
						<View style={styles.tableCol}>
							<Text style={styles.tableCell}>8t</Text>
						</View>
						<View style={styles.tableCol}>
							<Text style={styles.tableCell}>700km</Text>
						</View>
					</View>
				</View>
			</Page>
		</Document>
	</PDFViewer>
);

Font.register({
	family: 'Oswald',
	src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

const BORDER_COLOR = '#000';
const BORDER_STYLE = 'solid';
const COLN_WIDTH = 20;
const styles = StyleSheet.create({
	body: {
		padding: 40,
		paddingHorizontal: 80,
		fontSize: 12,
		fontFamily: 'Times-Roman',
	},
	subtitle: {
		fontWeight: 'heavy',
	},
	title: {
		fontSize: 20,
		textAlign: 'center',
		marginBottom: 20,
	},

	calculationText: {
		fontSize: 10,
		textAlign: 'justify',
		marginBottom: 5,
	},
	table: {
		marginTop: 10,
		display: 'table',
		width: '100%',
		borderStyle: BORDER_STYLE,
		borderColor: BORDER_COLOR,
		borderWidth: 1,
		borderRightWidth: 0,
		borderBottomWidth: 0,
	},
	tableRow: {
		margin: 'auto',
		flexDirection: 'row',
	},
	tableColHeader: {
		width: COLN_WIDTH + '%',
		borderStyle: BORDER_STYLE,
		borderColor: BORDER_COLOR,
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		fontWeight: 'bold',
	},
	tableCol: {
		width: COLN_WIDTH + '%',
		borderStyle: BORDER_STYLE,
		borderColor: BORDER_COLOR,
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
	},
	tableCellHeader: {
		margin: 5,
		fontSize: 12,
		fontWeight: 500,
	},
	tableCell: {
		margin: 5,
		fontSize: 10,
	},
});
export default Pdf;
