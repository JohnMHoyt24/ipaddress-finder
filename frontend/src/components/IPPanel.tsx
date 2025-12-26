interface IPPanelProps {
    ipaddress: string;
    location: string;
    timezone: string;
    isp: string;
}

const IPPanel: React.FC<IPPanelProps> = (props) => {
    return (
        <div>
            <ul>
                <li>{props.ipaddress}</li>
                <li>{props.location}</li>
                <li>{props.timezone}</li>
                <li>{props.isp}</li>
            </ul>
        </div>
    );
}

export default IPPanel;