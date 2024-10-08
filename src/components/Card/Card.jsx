import React, { memo } from 'react';
import './Card-css/Card.css';
import { useFocusStore } from '../../requests/requests';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Card({ data, selectedMovieIndex }) {
  const direction = useFocusStore((state) => state.direction);
  const navigate = useNavigate();

  const openInfoPage = (event) => {
    // if (event.code === 'Enter') {
    navigate(`info/?${data.stream_id}`)
    // }
  }

  return (
    <>
      <div className={`Card`} onClick={openInfoPage}>
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
