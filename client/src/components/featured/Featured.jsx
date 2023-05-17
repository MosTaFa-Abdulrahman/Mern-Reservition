import "./featured.css";
import useFetch from "../../hooks/useFetch";

function Featured() {
  const { data, loading } = useFetch(
    "hotel/countByCity?cities=london,manchester,newCastle"
  );

  return (
    <div className="featured">
      {loading ? (
        "Please Wait For Loading ☻♥"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1w70-bSiiCCdYVEJA4MtEjPgsbNLCl-sLeQ&usqp=CAU"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>London</h1> {/* City*/}
              <h2>{data[0]} Properites</h2> {/* Number*/}
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://i0.wp.com/handluggageonly.co.uk/wp-content/uploads/2018/03/Hand-Luggage-Only-7-5.jpg?resize=1000%2C668&ssl=1"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Manchester</h1>
              <h2>{data[1]} Properites</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://dayoutinengland.com/wp-content/uploads/2020/11/London-Landmarks-Day-Out-in-England.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>newCastle</h1>
              <h2>{data[2]} Properites</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Featured;
