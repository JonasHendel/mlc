import { MapContainer, TileLayer, AttributionControl} from 'react-leaflet';
import GeoJson from './GeoJson';
import styles from '../../styles/Leaflet.module.css';
import 'leaflet/dist/leaflet.css';
import geoJson from '../../public/demoGeoJson.json';
import SideBar from '../SideBar'

const Map = ({setTotalCO2, totalCO2}) => {
	return (
		<div>
      <SideBar totalCO2={totalCO2}/>
			<MapContainer className={styles.map} center={[51.93083589023145, 4.81320276432186]} zoom={5} zoomControl={false} attributionControl={false}>
				<TileLayer
					attribution='© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'
					url='https://api.mapbox.com/styles/v1/jonashendel/cktwy56fx189v18qjl5x00urx/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam9uYXNoZW5kZWwiLCJhIjoiY2t0aWYzajUxMHF2djJ4bXpyejl5dzl4MiJ9.IUHTwT6wueVEMUHRkVoZBg'
				/>
				<GeoJson data={geoJson} setTotalCO2={setTotalCO2} />
				<AttributionControl position='bottomright' prefix={false} />
			</MapContainer>
			<div className={styles.mapboxAttr} />
		</div>
	);
}
 
export default Map
