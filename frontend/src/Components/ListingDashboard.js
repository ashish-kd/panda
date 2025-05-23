import React, { useState, useEffect } from 'react'
import UploadListing from './UploadListing'

export default function ListingDashboard() {
    const [view, setView] = useState('list')
    const [listings, setListings] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const API = process.env.REACT_APP_API_URL;

    // Fetch the current listings from API
    const fetchListings = async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await fetch(`${API}/api/listing`)
            if (!res.ok) throw new Error(await res.text())
            const data = await res.json()
            setListings(data)
        } catch (err) {
            setError(err.message || 'Failed to load')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (view === 'list') fetchListings()
    }, [view])

    const handleAddListing = async (data) => {
        try {
            const res = await fetch(`${API}/api/listing`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            if (!res.ok) throw new Error(await res.text())
            setView('list')
        } catch (err) {
            alert('Create failed: ' + err.message)
        }
    }

    function formatPhoneNumber(phoneNumberString) {
        const cleaned = phoneNumberString.replace(/\D/g, '');

        if (cleaned.length !== 10) {
            return phoneNumberString;
        }
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }

    // DELETE handler
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this listing?')) return
        try {
            const res = await fetch(`${API}/api/listing/${id}`, { method: 'DELETE' })
            if (!res.ok) throw new Error(await res.text())
            // remove from UI immediately
            setListings(prev => prev.filter(l => l.id !== id))
        } catch (err) {
            alert('Delete failed: ' + err.message)
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            {/* View toggle */}
            <div className="flex space-x-2">
                <button
                    onClick={() => setView('list')}
                    className={`flex-1 py-2 rounded-lg font-medium ${view === 'list'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                        }`}
                >
                    View Listings
                </button>
                <button
                    onClick={() => setView('add')}
                    className={`flex-1 py-2 rounded-lg font-medium ${view === 'add'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                        }`}
                >
                    Add a Listing
                </button>
            </div>

            {/* Content */}
            {view === 'add' ? (
                <UploadListing onSubmit={handleAddListing} />
            ) : (
                <div className="space-y-4">
                    {loading && <p>Loading…</p>}
                    {error && <p className="text-red-500">Error: {error}</p>}
                    {!loading && !error && listings.length === 0 && (
                        <p>No listings yet.</p>
                    )}
                    {!loading &&
                        !error &&
                        listings.map((l, i) => (
                            <div
                                key={i}
                                className="border rounded-lg p-4 hover:shadow-md transition"
                            >
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-semibold">{l.title}</h3>
                                    <button
                                        onClick={() => handleDelete(l.id)}
                                        className="ml-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                                <p className="text-gray-600">{l.description}</p>
                                <div className="mt-2 text-sm text-gray-700">
                                    <span className="font-medium">Rent:</span> ${l.rent}/mo
                                    <span className="ml-4 font-medium">Rooms:</span> {l.rooms}
                                </div>
                                <div className="mt-1 text-sm">
                                    <span className="font-medium">Address:</span> {l.address}
                                </div>
                                <div className="mt-1 text-sm">
                                    <span className="font-medium">Contact Info:</span> {formatPhoneNumber(l.contact)}
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    )
}
