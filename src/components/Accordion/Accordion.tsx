import Stepper from "../Stepper/Stepper";
import {MouseEventHandler, useState} from "react";

interface AccordionProps {
  title: string;
}

interface ButtonProps {
  title: string;
  onClick: MouseEventHandler
}

const AccordionButton = ({title, onClick}: ButtonProps) => {

  return (
      <button
          className={`
          inline-block
          px-6 py-2.5
          bg-pink-800
          text-white
          text-sm
          leading-tight
          rounded-full
          shadow-md
          hover:bg-orange-500
          hover:shadow-lg
          focus:bg-orange-600
          focus:shadow-lg focus:outline-none focus:ring-0
          active:shadow-lg
          transition duration-150
          ease-in-out
          `}
          type="button"
          data-bs-toggle="collapse"
          data-target={`#${title}`}
          aria-expanded="false"
          aria-controls={title}
          onClick={onClick}
      >
        {title}
      </button>
  );
};

const Accordion = ({title}: AccordionProps) => {
  const [shouldShow, setShouldShow] = useState(false)
  const collapsedStyle = shouldShow ? "show" : "collapse"

  const toggleContent = () => {
    setShouldShow(!shouldShow)
  }

  return (
      <div className="min-w-min p-1">
        <AccordionButton title={title} onClick={toggleContent}/>
        <div
            className={`flex justify-center mt-4 mb-4 max-h-64 overflow-y-auto text-base max-w-full ${collapsedStyle}`}
            id={title}
        >
          <Stepper title={title}/>
        </div>
      </div>
  );
};
export default Accordion;