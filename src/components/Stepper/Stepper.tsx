import React, {useState} from "react";
import CoverCard from "@components/Cards/cover/CoverCard";
import DabCard from "@components/Cards/dab/DabCard";

interface StepperProps {
  title: string;
}

enum SelectedOption {
  dab = "dab",
  cover = "cover",
}

export default function Stepper({title}: StepperProps) {
  const [option, setOption] = useState("");

  const selectOption = (event: React.MouseEvent) => {
    setOption(event.currentTarget.id);
  };

  const renderSelectedCard = () => {
    if (option === SelectedOption.dab) {
      return <DabCard canisterId={title}/>;
    }
    if (option == SelectedOption.cover) {
      return <CoverCard canisterId={title}/>;
    }
  };

  return (
      <div className="max-w-xs">
        <ul className="stepper" data-mdb-stepper="stepper">
          <li
              className="stepper-step bg-inherit"
              id={SelectedOption.dab}
              onClick={selectOption}
          >
            <div className="stepper-head rounded-lg">
              <span className="stepper-head-icon bg-purple-700"/>
              <span className="stepper-head-text"> DAB </span>
            </div>
          </li>
          <li
              className="stepper-step"
              id={SelectedOption.cover}
              onClick={selectOption}
          >
            <div className="stepper-head rounded-lg">
              <span className="stepper-head-icon bg-green-400"/>
              <span className="stepper-head-text"> COVER </span>
            </div>
          </li>
        </ul>
        {renderSelectedCard()}
      </div>
  );
}
