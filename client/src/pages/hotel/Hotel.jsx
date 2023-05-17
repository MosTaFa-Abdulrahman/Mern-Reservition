import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

function Hotel() {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false); // Slider
  const [openModal, setOpenModal] = useState(false); // Modal
  const location = useLocation();
  const hotelId = location.pathname.split("/")[2];
  const navigate = useNavigate();

  const { data, loading } = useFetch(`hotel/get/${hotelId}`);
  const { date, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  const days = dayDifference(date[0].endDate, date[0].startDate);

  const handleOpenClick = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSliderNumber;

    if (direction === "l")
      newSliderNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    else newSliderNumber = slideNumber === 5 ? 0 : slideNumber + 1;

    setSlideNumber(newSliderNumber);
  };

  // Reservition
  const handleReserve = () => {
    user && setOpenModal(true);
    !user && navigate("/login");
  };

  return (
    <>
      <Navbar />
      <Header type="hotelss" />

      {loading ? (
        "Please Wait For Loading ☻♥"
      ) : (
        <div className="hotelContainer">
          {open && (
            <div className="slider">
              <i
                className="fa-sharp fa-solid fa-circle-xmark close"
                onClick={() => setOpen(false)}
              ></i>

              <i
                className="fa-solid fa-arrow-left arrow"
                onClick={() => handleMove("l")}
              ></i>
              <div className="sliderWrraper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImage"
                />
              </div>
              <i
                className="fa-solid fa-arrow-right arrow"
                onClick={() => handleMove("r")}
              ></i>
            </div>
          )}

          <div className="hotelWrraper">
            <h1 className="hotelTitle">{data.name}</h1>

            <div className="hotelAddress">
              <i className="fa-solid fa-location-dot"></i>
              <div className="hotelAddressText">{data.address}</div>
            </div>

            <span className="hotelDistance">
              Excellent location – {data.distance}M From Center
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over{"  "}
              <b style={{ color: "red", fontSize: "20px" }}>
                {data.chapestPrice}$
              </b>
              {"   "}
              at this property and get a free airport taxi
            </span>

            <div className="hotelImages">
              {data.photos?.map((p, i) => (
                <div className="hotelImagesContainer" key={i}>
                  <img
                    src={p}
                    alt=""
                    className="hotelImage"
                    onClick={() => handleOpenClick(i)}
                  />
                </div>
              ))}
            </div>

            <div className="hotelInfoContainer">
              <div className="hotelInfoText">
                <h1 className="hotelInfoTitle">Stay in the heart of City</h1>
                <p className="hotelInfoDesc">{data.desc}</p>
              </div>

              <div className="hotelInfoPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>{days * data.chapestPrice * options.room}$</b> ({days}{" "}
                  night) ({options.room} room)
                </h2>
                <button onClick={handleReserve}>Reserve Now!</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* i Confuse in Reservition */}
      {openModal && <Reserve setOpenModal={setOpenModal} hotelId={hotelId} />}
      {/* i Confuse in Reservition */}

      <MailList />
      <Footer />
    </>
  );
}

export default Hotel;
