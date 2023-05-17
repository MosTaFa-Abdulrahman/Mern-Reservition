import "./featuredProperties.css";
import useFetch from "../../hooks/useFetch";

function FeaturedProperties() {
  const { data, loading } = useFetch("hotel/get?featured=true&limit=5");

  return (
    <div className="fp">
      {loading ? (
        "Please Wait For Loading ☻♥"
      ) : (
        <>
          {data.map((item, i) => (
            <div className="fpItem" key={i}>
              <img src={item?.photos[0]} alt="" className="fpImg" />
              <div className="fpName">{item.name}</div>
              <div className="fpCity">{item.city}</div>
              <span className="fpPrice">
                Starting from <b>{item.chapestPrice}$</b>
              </span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item?.rating}</button>
                  <div>Excellent</div>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default FeaturedProperties;
