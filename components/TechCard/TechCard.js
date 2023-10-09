'use client'
import React, { useRef } from 'react';
import styles from './TechCard.module.css';

export default function TechCard() {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const cardBounding = card.getBoundingClientRect();
    const mouseX = e.clientX - cardBounding.left;
    const mouseY = e.clientY - cardBounding.top;

    const cardCenterX = cardBounding.width / 2;
    const cardCenterY = cardBounding.height / 2;

    const translateX = (mouseX - cardCenterX) / 12;
    const translateY = (mouseY - cardCenterY) / 12;

    card.style.transform = `rotateX(${translateY}deg) rotateY(${-translateX}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    card.style.transform = 'none';
  };

  return (
    <div
      className={`${styles.container} ${styles.card}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
    >
      <img
        src="https://ethereum.org/static/5dea0acbc8484c42006d7bbed32fa019/366e5/doge-computer.png" // Replace with your image URL
        alt="Tech Image"
        className={styles.image}
      />
      <div className={styles.content}>
        {/* Content of your card */}
      </div>
    </div>
  );
}
