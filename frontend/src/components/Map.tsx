interface MapProps {
    geolocation: string;
}

const Map: React.FC<MapProps> = (props) => {
    return(
        <div>
            {props.geolocation}
        </div>
    );
}

export default Map;