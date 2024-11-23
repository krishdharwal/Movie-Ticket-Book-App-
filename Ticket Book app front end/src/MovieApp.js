import React, { useState } from "react";

const MovieApp = () => {
  const API_BASE_URL = "http://localhost:9091/movie";

  const [movieData, setMovieData] = useState({
    name: "",
    language: "",
    genre: "",
    duration: 0,
    releaseDate: "",
    price: 0,
  });

  const [hallData, setHallData] = useState({
    movieName: "",
    screenName: "",
    totalSeats: 0,
  });

  const [detailsData, setDetailsData] = useState({
    movieName: "",
    movieDetails: null,
  });

  const [bookingData, setBookingData] = useState({
    movieName: "",
    hallNumber: 1,
    seatNumbers: [],
    user: {
      username: "",
      email: "",
    },
  });

  const [responseMessage, setResponseMessage] = useState("");

  // Save Movie API
  const saveMovie = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movieData),
      });
      const data = await response.json();
      setResponseMessage(data.message || data.error);
    } catch (error) {
      setResponseMessage("Failed to save movie.");
    }
  };

  // Set Hall for Movie API
  const setHallForMovie = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/InHall/${hallData.movieName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          screenName: hallData.screenName,
          totalSeats: hallData.totalSeats,
        }),
      });
      const data = await response.json();
      setResponseMessage(data.message || data.error);
    } catch (error) {
      setResponseMessage("Failed to set hall.");
    }
  };

  // Get Movie Details API
  const getMovieDetails = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/details/${detailsData.movieName}`, {
        method: "GET",
      });
      const data = await response.json();
      setDetailsData((prev) => ({ ...prev, movieDetails: data }));
      setResponseMessage(data.message || "Movie details fetched successfully.");
    } catch (error) {
      setResponseMessage("Failed to fetch movie details.");
    }
  };

  // Book Tickets API
  const bookTickets = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      const data = await response.json();
      setResponseMessage(data.message || data.error);
    } catch (error) {
      setResponseMessage("Failed to book tickets.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>Movie Booking System</h1>

      {/* Save Movie */}
      <form onSubmit={saveMovie} style={{ marginBottom: "20px" }}>
        <h2>Save Movie</h2>
        <input
          type="text"
          placeholder="Name"
          value={movieData.name}
          onChange={(e) => setMovieData({ ...movieData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Language"
          value={movieData.language}
          onChange={(e) => setMovieData({ ...movieData, language: e.target.value })}
        />
        <input
          type="text"
          placeholder="Genre"
          value={movieData.genre}
          onChange={(e) => setMovieData({ ...movieData, genre: e.target.value })}
        />
        <input
          type="number"
          placeholder="Duration"
          value={movieData.duration}
          onChange={(e) => setMovieData({ ...movieData, duration: parseInt(e.target.value) })}
        />
        <input
          type="date"
          placeholder="Release Date"
          value={movieData.releaseDate}
          onChange={(e) => setMovieData({ ...movieData, releaseDate: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={movieData.price}
          onChange={(e) => setMovieData({ ...movieData, price: parseFloat(e.target.value) })}
        />
        <button type="submit">Save Movie</button>
      </form>

      {/* Set Hall for Movie */}
      <form onSubmit={setHallForMovie} style={{ marginBottom: "20px" }}>
        <h2>Set Hall for Movie</h2>
        <input
          type="text"
          placeholder="Movie Name"
          value={hallData.movieName}
          onChange={(e) => setHallData({ ...hallData, movieName: e.target.value })}
        />
        <input
          type="text"
          placeholder="name"
          value={hallData.name}
          onChange={(e) => setHallData({ ...hallData, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Total Seats"
          value={hallData.totalSeats}
          onChange={(e) => setHallData({ ...hallData, totalSeats: parseInt(e.target.value) })}
        />
        <button type="submit">Set Hall</button>
      </form>

      {/* Get Movie Details */}
      <form onSubmit={getMovieDetails} style={{ marginBottom: "20px" }}>
        <h2>Get Movie Details</h2>
        <input
          type="text"
          placeholder="Movie Name"
          value={detailsData.movieName}
          onChange={(e) => setDetailsData({ ...detailsData, movieName: e.target.value })}
        />
        <button type="submit">Fetch Details</button>
      </form>
      {detailsData.movieDetails && (
        <div>
          <h3>Movie Details</h3>
          <pre>{JSON.stringify(detailsData.movieDetails, null, 2)}</pre>
        </div>
      )}

      {/* Book Tickets */}
      <form onSubmit={bookTickets} style={{ marginBottom: "20px" }}>
        <h2>Book Tickets</h2>
        <input
          type="text"
          placeholder="Movie Name"
          value={bookingData.movieName}
          onChange={(e) => setBookingData({ ...bookingData, movieName: e.target.value })}
        />
        <input
          type="number"
          placeholder="Hall Number"
          value={bookingData.hallNumber}
          onChange={(e) => setBookingData({ ...bookingData, hallNumber: parseInt(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Seat Numbers (comma-separated)"
          onChange={(e) => {
            const seatNumbers = e.target.value.split(",").map((num) => parseInt(num.trim()));
            setBookingData({ ...bookingData, seatNumbers });
          }}
        />
        <input
          type="text"
          placeholder="User Name"
          value={bookingData.user.username}
          onChange={(e) =>
            setBookingData({ ...bookingData, user: { ...bookingData.user, username: e.target.value } })
          }
        />
        <input
          type="email"
          placeholder="User Email"
          value={bookingData.user.email}
          onChange={(e) =>
            setBookingData({ ...bookingData, user: { ...bookingData.user, email: e.target.value } })
          }
        />
        <button type="submit">Book Tickets</button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default MovieApp;
