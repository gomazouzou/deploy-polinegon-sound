import React from "react";
import metronome from "../../../images/metronome.png";
import metronomeLight from "../../../images/metronome_light.png";

export const BeatDisplay = ({beat}) => {
  const icons = [0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
    <img src={index === beat ? metronomeLight : metronome} alt="add" width={18} height={18} />
  ));

  return (
    <div className = "metronomeframe">
      {icons}
    </div>
  );
}
