import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@radix-ui/themes';

const FeatureCard = ({ title, text, link, icon, color }) => {
  return (
    <div className="feature-card animate__animated animate__zoomIn">
      <div className="feature-icon">{icon}</div>
      <h2>{title}</h2>
      <p>{text}</p>
      <Button
        asChild
        variant="solid"
        color={color}
        size="3"
        radius="full"
      >
        <Link to={link}>
          Explore {title}
        </Link>
      </Button>
    </div>
  );
};

export default FeatureCard; 