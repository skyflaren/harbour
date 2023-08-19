import React, { FC } from "react";

interface CardProps {
  name: string;
  image: string;
  desc: string;
}

const Card: FC<CardProps> = ({ image, name, desc }) => {
  return (
    <div className="card">
      <img src={image} />
      <div className="name">{name}</div>
      <div className="desc">{desc}</div>
    </div>
  );
};

export default Card;
