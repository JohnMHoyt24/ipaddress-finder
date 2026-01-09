import { useState, useEffect } from 'react';

const [ipAddress, setIpAddress] = useState('');
const [location, setLocation] = useState('');

interface SearchIpAddress{
    ipAddress: string;
    location: string;
}

const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!ipAddress){
        alert('Please enter an IP address or domain');
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