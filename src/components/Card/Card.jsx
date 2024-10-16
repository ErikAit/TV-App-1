import React, { memo, useEffect, useRef } from 'react';
import './Card-css/Card.css';
import { useFocusStore } from '../../requests/requests';

function Card({ data, selectedMovieIndex, index, categoryIndex }) {
  const direction = useFocusStore((state) => state.direction);

  return (
    <>
      <div className={`Card`}>
        {selectedMovieIndex && (
          <>
            <div className={`selected ${direction}`}></div>
            <div className="scroll"></div>
          </>
        )}
        <img src={data.stream_icon} alt="movie poster" />
        <p>{data.name}</p>
      </div>
    </>
  );
}

export default memo(Card);
