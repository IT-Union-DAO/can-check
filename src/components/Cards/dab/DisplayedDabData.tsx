import {Spinner} from "../../Spinner/Spinner";
import {CanisterMetadata} from "@psychedelic/dab-js/dist/interfaces/dab_registry";
import NoData from "../NoData";

interface DisplayedDabDataProps {
  isLoading: boolean;
  content?: CanisterMetadata;
}

export const DisplayedDabData = ({
                                   isLoading,
                                   content,
                                 }: DisplayedDabDataProps) => {
  if (isLoading) {
    return <Spinner/>;
  } else {
    if (content === undefined) {
      return <NoData/>;
    } else {
      return (
          <div className="p-2">
            <div className="flex flex-wrap space-x-1 justify-center align-top">
              <img
                  className="object-center h-5 align-top"
                  src={content?.logo_url}
              />

              <h4 className="text-gray-900 text-lg mb-2">
                {content?.name}
              </h4>
            </div>
            <div>
              <p className="text-gray-700 text-base mb-4">
                {content?.description}
              </p>
              <a className="text-blue-700 text-base mb-4">{content?.url}</a>
            </div>
          </div>
      );
    }
  }
};
