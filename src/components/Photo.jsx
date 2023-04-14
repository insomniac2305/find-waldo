import { collection, getDocs } from "firebase/firestore";
import { React, useState, useEffect } from "react";
import database from "../firebase";

function Photo() {
  const [charPositions, setCharPositions] = useState(null);

  const fetchCharPositions = async () => {
    const storedPositions = await getDocs(collection(database, "positions"));
    const positionData = storedPositions.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setCharPositions(positionData);
  };

  useEffect(() => {
    fetchCharPositions();
  }, []);

  const positionList = charPositions?.map((data) => <div key={data.id}>{JSON.stringify(data)}</div>);

  return <div>{positionList}</div>;
}

export default Photo;
