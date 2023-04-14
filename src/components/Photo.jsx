import { database } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";

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

  const positionList = charPositions?.map((data, index) => {
    return <div key={index}>{JSON.stringify(data)}</div>;
  });

  return (
    <>
      <div>{positionList}</div>
    </>
  );
}

export default Photo;
