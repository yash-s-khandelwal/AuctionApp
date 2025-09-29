import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosConfig';
import { Link } from 'react-router-dom';

function UserBidsTable() {
    const { user } = useAuth();
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    const userId = user?.userId;
    useEffect(() => {
        if (!userId) {
            setLoading(false);
            setMessage("Please log in to view your bids.");
            return;
        }

        const fetchBids = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/api/v0/bid/getBidsOfUser/${userId}`);
                setBids(response.data);
            } catch (err) {
                setMessage("Failed to fetch bids. Please try again.");
                console.error("Bid Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBids();
    }, [userId]); // Re-fetch when the user ID changes

    // --- Bid Cancellation Logic ---
    const handleCancelBid = async (bidId) => {
        setMessage('');
        const confirmCancel = window.confirm("Are you sure you want to cancel this bid?");

        if (confirmCancel) {
            try {
                // Assuming you have a DELETE or PUT/PATCH endpoint for cancellation
                await api.put(`/api/v0/bid/deleteBid/${bidId}`);

                // Optimistically update the UI: remove the canceled bid from the state
                setBids(bids.filter(bid => bid.bidId !== bidId));
                setMessage("Bid cancelled successfully!");
            } catch (error) {
                setMessage("Cancellation failed. Check auction status or try again.");
                console.error("Cancel Bid Error:", error);
            }
        }
    };

    // --- Conditional Rendering ---
    if (loading) return <div style={styles.container}>Loading bid history...</div>;
    if (message && !bids.length) return <div style={styles.container}><p style={{ color: 'red' }}>{message}</p></div>;

    if (!bids || bids.length === 0) {
        return <div style={styles.container}><p>You have not placed any bids yet.</p></div>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Your Placed Bids</h2>
            {message && <p style={styles.message}>{message}</p>}
            <table style={styles.table}>
                <thead>
                    <tr style={styles.tableHeaderRow}>
                        <th style={styles.tableHeader}>Product Name</th>
                        <th style={styles.tableHeader}>Bid Amount</th>
                        <th style={styles.tableHeader}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {bids.map((bid) => (
                        <tr key={bid.bidId} style={styles.tableRow}>
                            <Link to={`/product/${bid.product?.productId}`}>
                                <td style={styles.tableData}>{bid.product?.productName}</td>
                            </Link>
                            <td style={styles.tableData}>₹{bid.price.toFixed(2)}</td>
                            <td style={styles.tableData}>
                                <button
                                    onClick={() => handleCancelBid(bid.bidId)}
                                    style={styles.cancelButton}
                                >
                                    Cancel Bid
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// --- Styles ---
const styles = {
    primaryColor: '#7a1528',
    container: {
        maxWidth: '600px',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    },
    title: {
        color: '#7a1528',
        borderBottom: `2px solid #f0f0f0`,
        paddingBottom: '10px',
        marginBottom: '20px',
        fontSize: '1.8rem',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    tableHeaderRow: {
        backgroundColor: '#f5f5f5',
        borderBottom: '2px solid #7a1528',
    },
    tableHeader: {
        padding: '12px 15px',
        textAlign: 'left',
        color: '#7a1528',
        fontWeight: '700',
    },
    tableRow: {
        borderBottom: '1px solid #eee',
    },
    tableData: {
        padding: '12px 15px',
        fontSize: '1rem',
        color: '#333',
    },
    cancelButton: {
        backgroundColor: '#7a1528',
        color: 'white',
        border: 'none',
        padding: '8px 15px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '600',
        transition: 'background-color 0.2s',
    },
    message: {
        padding: '10px',
        backgroundColor: '#fff0f3',
        color: '#7a1528',
        border: '1px solid #7a1528',
        borderRadius: '4px',
        textAlign: 'center',
    }
};

export default UserBidsTable;