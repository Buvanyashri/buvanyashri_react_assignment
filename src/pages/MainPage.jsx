import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import ConnectionTable from '../components/ConnectionTable';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';
import MonthlyConnectionRequestsChart from '../components/MonthlyConnectionRequestsChart';
import NavBar from '../components/NavBar';

const MainPage = () => {
    const [connections, setConnections] = useState([]);
    const [filteredConnections, setFilteredConnections] = useState([]);
    const [filterDate, setFilterDate] = useState('');
    const navigate = useNavigate();

    // Fetch data from Firebase Firestore
    useEffect(() => {
        const fetchConnections = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'users'));
                const fetchedConnections = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setConnections(fetchedConnections);
                setFilteredConnections(fetchedConnections);
            } catch (error) {
                console.error('Error fetching connections:', error);
            }
        };

        fetchConnections();
    }, []);

    // Function to handle search based on Applicant ID
    const handleSearch = (searchTerm) => {
        if (searchTerm === '') {
            setFilteredConnections(connections);
        } else {
            const filtered = connections.filter(conn =>
                conn.ID.toString().includes(searchTerm)
            );
            setFilteredConnections(filtered);
        }
    };

    // Function to handle date change
    const handleDateChange = (event) => {
        setFilterDate(event.target.value);
    };

    // Function to apply date filter
    const applyDateFilter = () => {
        console.log("Selected Date:", filterDate);

        if (filterDate) {
            // Convert the filterDate (YYYY-MM-DD) to DD/MM/YY
            const dateParts = filterDate.split('-'); // Split by hyphen
            if (dateParts.length === 3) {
                const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0].slice(-2)}`; // Create DD/MM/YY format

                const filtered = connections.filter(conn => {
                    // Check if Date_of_Application exists and is a string
                    if (conn.Date_of_Application && typeof conn.Date_of_Application === 'string') {
                        return conn.Date_of_Application === formattedDate; // Compare with formatted date
                    }
                    return false;
                });

                setFilteredConnections(filtered);
            } else {
                console.error("Invalid date format:", filterDate);
            }
        } else {
            setFilteredConnections(connections); // Reset to full list if no date is selected
        }
    };

    // Function to handle edit redirection
    const handleEdit = (applicationID) => {
        navigate(`/edit/${applicationID}`);
    };

    return (
        <div>
            <NavBar />
            <SearchBar onSearch={handleSearch} />
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                <input
                    type="date"
                    value={filterDate}
                    onChange={handleDateChange}
                    style={{
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        fontSize: '16px',
                        marginRight: '10px', // Space between input and button
                    }}
                />
                <button
                    onClick={applyDateFilter}
                    style={{
                        padding: '8px 12px',
                        backgroundColor: '#615bdf',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        transition: 'background-color 0.3s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#37347d')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#615bdf')}
                >
                    Apply
                </button>
            </div>


            <ConnectionTable connections={filteredConnections} onEdit={handleEdit} />

        </div>
    );
};

export default MainPage; 
