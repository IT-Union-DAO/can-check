import Stepper from "../Stepper/Stepper";

interface AccordionProps {
  title: string;
}

interface ButtonProps {
  title: string;
}

const AccordionButton = ({ title }: ButtonProps) => {
  return (
    <button
      className="
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
          ease-in-out"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target={`#${title}`}
      aria-expanded="false"
      aria-controls={title}
    >
      {title}
    </button>
  );
};

const Accordion = ({ title }: AccordionProps) => {
  return (
    <div className="min-w-min p-1">
      <AccordionButton title={title} />
      <div
        className="flex justify-center collapse mt-4 mb-4 max-h-64 overflow-y-auto text-base max-w-full"
        id={`${title}`}
      >
        <Stepper title={title} />
      </div>
    </div>
  );
};
export default Accordion;
