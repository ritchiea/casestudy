import { FC, ReactElement } from "react";
import { BIOMARKERS } from "@/app/utils/patientDataToChartData";

interface CompareFormProps {
  options: ReactElement[];
}

const CompareForm: FC<CompareFormProps> = ({ options }) => {
  const biomarkers = BIOMARKERS.map((marker) => (
    <option value={marker} key={marker}>
      {marker}
    </option>
  ));
  return (
    <div className="form-container">
      <legend>
        <h1>Click a Client ID to view or check multiple to compare</h1>
      </legend>
      <form action="/comparePatients" method="GET">
        <fieldset>{options}</fieldset>
        <label>
          <h2>Biomarker to compare</h2>
          <select name="biomarker" className="biomarker">
            {biomarkers}
          </select>
        </label>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Compare
        </button>
      </form>
    </div>
  );
};

export default CompareForm;
