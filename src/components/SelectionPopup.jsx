import React, { useEffect, useRef, useState } from "react";

function SelectionPopup({ list, selectArea, onSelect }) {
  const [position, setPosition] = useState([0, 0]);
  const [visible, setVisible] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (!selectArea || !popupRef) return;
      const constraints = selectArea.getBoundingClientRect();
      const popupRect = popupRef.current.getBoundingClientRect();

      let posX = e.clientX + window.scrollX;
      let posY = e.clientY + window.scrollY;

      if (
        posX > constraints.right + window.scrollX ||
        posX < constraints.left + window.scrollX ||
        posY > constraints.bottom + window.scrollY ||
        posY < constraints.top + window.scrollY ||
        e.target.closest(["[data-popup]"])
      ) {
        setVisible(false);
        return;
      }
      posX = posX + popupRect.width > constraints.width ? posX - popupRect.width : posX;
      posY = posY + popupRect.height > constraints.height ? posY - popupRect.height : posY;

      setPosition([posX, posY]);
      setVisible(true);
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [selectArea]);

  const selectList = list?.map((entry) => {
    return (
      <li key={entry.id}>
        <button
          className="w-full rounded-md px-2 py-1 text-left text-lg font-semibold hover:bg-orange-400/20"
          onClick={onSelect.bind(this, entry.id)}
        >
          {entry.title}
        </button>
      </li>
    );
  });

  return (
    <div
      data-popup
      ref={popupRef}
      className={"absolute rounded-md bg-zinc-800 p-2 " + (visible ? "visible" : "invisible")}
      style={{
        top: position[1] + "px",
        left: position[0] + "px",
      }}
    >
      <ul className="">{selectList}</ul>
    </div>
  );
}

export default SelectionPopup;
