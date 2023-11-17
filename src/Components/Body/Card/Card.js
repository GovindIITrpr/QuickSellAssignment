import React from "react";
import "./Card.css";

const Card = ({ ticket }) => {
  return (
    <div className="card">
      <div className="container">
        <div>
          <span className="name">
            <b>{ticket?.id}</b>
          </span>
          <span className="icon"></span>
        </div>
        <p className="para">{ticket?.title}</p>
        <div className="status">
          <button className="btn">...</button>
          {ticket?.tag &&
            ticket?.tag?.map((t, i) => {
              return (
                <button className="btn" key={i}>
                  {t}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Card;
