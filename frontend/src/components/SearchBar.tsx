import { useState, useEffect } from 'react';
import IPPanel from './IPPanel';
import Map from './Map';

const [search, setSearch] = useState('');
const [ipAddress, setIpAddress] = useState('');
const [location, setLocation] = useState('');
const [timezone, setTimezone] = useState('');
const [isp, setIsp] = useState('');
const [loading, setLoading] = useState(false);
const [errors, setErrors] = useState<{[key: string]: string}>({});

interface SearchIpAddress{
    ip: string;
    location: {
        country: string;
        region: string;
        city: string;
        lat: number;
        lng: number;
        postalCode: string;
        timezone: string;
        geonameId: number;
    };
    as: {
        asn: number;
        name: string;
        route: string;
        domain: string;
        type: string;
    };
    isp: string;
}

const REGEX_IP_ADDRESS = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!REGEX_IP_ADDRESS.test(search)){
        setErrors({search: 'Invalid IP address or domain'});
    }
    else if(!search){
        setErrors({search: 'Please enter an IP address or domain'});
    }
    else {
        setErrors({});

        useEffect(() => {
            const fetchData = async() => {
                try {
                    const response = await fetch('http://127.0.0.1:8000/geolocation');

                    if(!response.ok){
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const result = await response.json();
                    setIpAddress(result.ip);
                    setErrors({});
                }
                catch (err: any){
                    setErrors(err.message);
                }
                finally{
                    setLoading(false);
                }
            }

            fetchData();
        }, []);
    }
}

const SearchBar: React.FC = () => {
    return(
        <div className="bg-blue-300 justify-center items-center h-25">
            <h1 className="text-2xl">IP Address Tracker</h1>
            <input type="search" placeholder="Search for any IP address or domain" className="border-black
            bg-white w-1/2 justify-center items-center" />
        </div>
    );
}

export default SearchBar;