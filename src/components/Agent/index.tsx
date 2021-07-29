import React from 'react';

// import { Container } from './styles';

export interface AgentProps {
  height: number;
  img: string;
  intialState: string;
  name: string;
  width: number;
  x: number;
  y: number;
}

const Agent: React.FC<AgentProps> = ({
  img,
  name,
  intialState,
  height,
  width,
  x,
  y,
}) => {
  console.log(height, img, intialState, name, width, x, y);

  return <div />;
};

export default Agent;
