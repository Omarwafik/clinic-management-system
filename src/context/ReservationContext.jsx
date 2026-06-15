import API_BASE from '../config/api';
// ReservationContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const ReservationContext = createContext();

export const useReservations = () => useContext(ReservationContext);

export const ReservationProvider = ({ children }) => {
  const [reservations, setReservations] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('auth_user'));

  useEffect(() => {
    if (!currentUser) return;

    async function fetchReservations() {
      try {
        const res = await axios.get(`${API_BASE}/reservations`);
        const userRes = res.data.filter(r => r.email === currentUser.email);
        setReservations(userRes);
      } catch (err) {
        console.error(err);
      }
    }

    fetchReservations();
  }, [currentUser]);

  const deleteReservation = async (id) => {
    try {
      await axios.delete(`${API_BASE}/reservations/${id}`);
      setReservations(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const addReservation = async (reservation) => {
    try {
      const res = await axios.post(`${API_BASE}/reservations`, reservation);
      setReservations(prev => [...prev, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ReservationContext.Provider value={{ reservations, setReservations, deleteReservation, addReservation }}>
      {children}
    </ReservationContext.Provider>
  );
};
