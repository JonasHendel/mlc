import { StyleSheet } from "@react-pdf/renderer";

const BORDER_COLOR = '#000';
const BORDER_STYLE = 'solid';
const COLN_WIDTH = 20
const COL2_WIDTH = 19;
export const styles = StyleSheet.create({
	body: {
		padding: 40,
		paddingHorizontal: 80,
		fontSize: 12,
		fontFamily: 'Times-Roman',
	},
	subtitle: {
    fontFamily: "Times-Bold",
		marginBottom: 10,
    marginTop: 15,
    fontSize: 14,
	},
	title: {
		fontSize: 20,
	},
  logo: {
    height: 40,
    width: 40,
  },
  mapImageCont: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  }, 
  mapImage: {
    width: "70%"
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
	calculationText: {
		fontSize: 10,
		textAlign: 'justify',
		marginBottom: 5,
	},
	table: {
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
	tableColHeader1: {
		width: COL2_WIDTH + '%',
		borderStyle: BORDER_STYLE,
		borderColor: BORDER_COLOR,
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		fontWeight: 'bold',
	},
	tableCol1: {
		width: COL2_WIDTH + '%',
		borderStyle: BORDER_STYLE,
		borderColor: BORDER_COLOR,
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
	},
  tableColHeader2: {
		width: '24%',
		borderStyle: BORDER_STYLE,
		borderColor: BORDER_COLOR,
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
		fontWeight: 'bold',
	},
	tableCol2: {
		width: '24%',
		borderStyle: BORDER_STYLE,
		borderColor: BORDER_COLOR,
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
	},
	tableCellHeader: {
    fontFamily: "Times-Bold",
		margin: 5,
		fontSize: 12,
		fontWeight: 500,
	},
	tableCell: {
		margin: 5,
		fontSize: 10,
	},
  emmissonSrc: {
    position: 'absolute',
    bottom: 40,
    right: 80,
  }
});