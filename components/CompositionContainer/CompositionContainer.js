'use client'
import styles from "./CompositionContainer.module.css";
import { Tooltip } from "react-tooltip";

export default function CompositionContainer({ composition }) {
  const totalPercentage = composition.reduce(
    (acc, item) => acc + item.percent,
    0
  );

  let currentPosition = 0;
  const compositionStyles = composition.map((item) => {
    const style = {
      backgroundColor: item.color,
      width: `${(item.percent / totalPercentage) * 100}%`,
    };
    currentPosition += (item.percent / totalPercentage) * 100;
    return style;
  });

  return (
    <div className={styles.container}>
      {compositionStyles.map((style, index) => (
        <>
          <div
            key={index}
            className={styles.compositionItem}
            style={style}
            data-tooltip-id={"" + index}
            data-tooltip-content={`${composition[index].name} ${composition[index].percent}%`}
            data-tooltip-place="top"
          ></div>
            <Tooltip id={"" + index} style={{overflow:"hidden"}}/>
        </>
      ))}
    </div>
  );
}
