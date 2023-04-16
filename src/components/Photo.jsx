/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { collection, getDocs } from "firebase/firestore";
import { React, useState, useEffect, useRef } from "react";
import database from "../firebase";
import Image from "../assets/find-waldo-1.jpg";
import SelectionPopup from "./SelectionPopup";

function Photo() {
  const [charPositions, setCharPositions] = useState(null);
  const imgRef = useRef(null);

  const fetchCharPositions = async () => {
    const storedPositions = await getDocs(collection(database, "positions"));
    const positionData = storedPositions.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setCharPositions(positionData);
  };

  useEffect(() => {
    fetchCharPositions();
  }, []);

  const positionList = charPositions?.map((data) => ({ id: data.id, title: data.character }));

  const getClickPosition = (e) => {
    const bounds = e.target.getBoundingClientRect();
    var left = bounds.left;
    var top = bounds.top;
    var x = e.pageX - left - window.scrollX;
    var y = e.pageY - top - window.scrollY;
    var cw = e.target.clientWidth;
    var ch = e.target.clientHeight;
    var iw = e.target.naturalWidth;
    var ih = e.target.naturalHeight;
    var px = Math.round((x / cw) * iw);
    var py = Math.round((y / ch) * ih);
    // console.log({
    //   "at pixel": px + "," + py,
    //   "mouse pos": x + "," + y,
    //   "relative to boundingClientRect at": left + "," + top,
    //   "client image size": cw + " x " + ch,
    //   "natural image size": iw + " x " + ih,
    // });
    return [px, py];
  };

  return (
    <div>
      <img ref={imgRef} className="w-full" onClick={getClickPosition} src={Image} alt="Find Waldo" />
      <SelectionPopup list={positionList} selectArea={imgRef.current} />
    </div>
  );
}

export default Photo;
