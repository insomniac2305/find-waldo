/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { collection, getDocs } from "firebase/firestore";
import { React, useState, useEffect, useRef } from "react";
import database from "../firebase";
import Image from "../assets/find-waldo-1.jpg";
import SelectionPopup from "./SelectionPopup";

function Photo({ onCompletion }) {
  const [charPositions, setCharPositions] = useState([]);
  const [clickedPosition, setClickedPosition] = useState([]);

  const imgRef = useRef(null);

  useEffect(() => {
    const fetchCharPositions = async () => {
      const storedPositions = await getDocs(collection(database, "positions"));
      const positionData = storedPositions.docs.map((doc) => ({ ...doc.data(), id: doc.id, found: false }));
      setCharPositions(positionData);
    };
    fetchCharPositions();
  }, []);

  useEffect(() => {
    if (charPositions.length === 0) return;

    const foundCharacters = charPositions.filter((char) => char.found);

    if (foundCharacters.length === charPositions.length) {
      onCompletion();
    }
  }, [charPositions]);

  const wantedChars = charPositions.map((data) => ({ id: data.id, title: data.character }));
  const wantedCharListItems = charPositions.map((data) => {
    return (
      <li className="flex flex-col items-center gap-2" key={data.id}>
        <div className="relative">
          <span className={"absolute flex h-28 w-28 items-center justify-center rounded-full bg-green-950/80 text-5xl text-green-400 " + (data.found ? "" : "invisible")}>
            ✓
          </span>
          <img
            className="h-28 w-28 rounded-full bg-zinc-700 object-cover object-top"
            src={data.picture}
            alt={data.character}
          />
        </div>
        <span>{data.character}</span>
      </li>
    );
  });

  const setRelativeClickPosition = (e) => {
    const targetArea = e.target.getBoundingClientRect();
    const clickedX = e.pageX - targetArea.left - window.scrollX;
    const clickedY = e.pageY - targetArea.top - window.scrollY;
    const renderedWidth = e.target.clientWidth;
    const renderedHeight = e.target.clientHeight;
    const normalWidth = e.target.naturalWidth;
    const normalHeight = e.target.naturalHeight;
    const pixelX = Math.round((clickedX / renderedWidth) * normalWidth);
    const pixelY = Math.round((clickedY / renderedHeight) * normalHeight);

    setClickedPosition([pixelX, pixelY]);
  };

  const validateSelection = (charId) => {
    const characterPosition = charPositions.find((char) => char.id === charId);
    if (!characterPosition) return;

    const [charX, charY] = characterPosition.coordinates;
    const [selectedX, selectedY] = clickedPosition;
    const [toleranceX, toleranceY] = [imgRef.current.naturalWidth * 0.02, imgRef.current.naturalHeight * 0.04];

    if (
      selectedX < charX + toleranceX &&
      selectedX > charX - toleranceX &&
      selectedY < charY + toleranceY &&
      selectedY > charY - toleranceY
    ) {
      const newCharPositions = [...charPositions];
      const charFoundIndex = newCharPositions.findIndex((char) => char.id === charId);
      newCharPositions[charFoundIndex].found = true;

      setCharPositions(newCharPositions);
    }
  };

  return (
    <div>
      <div className="fixed left-0 top-24 flex w-full justify-center">
        <div className="flex flex-col items-center gap-4 rounded-lg bg-zinc-900 p-2">
          <h2 className="text-2xl font-bold tracking-tighter text-orange-400">Wanted</h2>
          <ul className="flex gap-4 font-semibold">{wantedCharListItems}</ul>
        </div>
      </div>
      <img ref={imgRef} className="w-full" onClick={setRelativeClickPosition} src={Image} alt="Find Waldo" />
      <SelectionPopup list={wantedChars} selectArea={imgRef.current} onSelect={validateSelection} />
    </div>
  );
}

export default Photo;
