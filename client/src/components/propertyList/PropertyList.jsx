import useFetch from "../../hooks/useFetch";
import "./propertyList.css";

function PropertyList() {
  const { data, loading } = useFetch("hotel/countByType");

  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTadtP4RyWHi8xNkPiXuR9f3etQK0-Iv_EbFw&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy8ZNhy8taBGwIftNiCgpcpe5KrLTQU5R-kW1eEs7KpIaNufvUPxQ8D7oKKz0iQtrxR_o&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqWKcp88aBLeKumZS6mpyB7cBq5V3_benjf5d4Owtr&s",
    "https://stylesatlife.com/wp-content/uploads/2021/02/Latest-villa-designs15.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuqxQ6oRyqcorUc_jNAatBTZeKapPvAM_LnRP-caFXgeKbUaZeS1NGkJjhXjw3us6zywg&usqp=CAU",
  ];

  return (
    <div className="pList">
      {loading ? (
        "Please Wait For Loading ☻♥"
      ) : (
        <>
          {data &&
            images.map((image, i) => (
              <div className="pLItem" key={i}>
                <img src={image} alt="" className="pLImg" />
                <div className="pLTitles">
                  <h1>{data[i]?.type}</h1>
                  <h2>
                    {data[i]?.count} {data[i]?.type}
                  </h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
}

export default PropertyList;
