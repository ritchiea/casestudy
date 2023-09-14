import { FC, ReactElement } from "react";
import { BIOMARKERS } from "../utils/patientDataToChartData";

interface CompareFormProps {
  options: ReactElement[];
}

const CompareForm: FC<CompareFormProps> = ({ options }) => {
  const biomarkers = BIOMARKERS.map((marker) => (
    <option value={marker}>{marker}</option>
  ));
  return (
    <div className="form-container">
      <h1>Compare Patients (select multiple)</h1>
      <form action="/comparePatients" method="GET">
        <select className="patient-select rounded" name="patients" multiple>
          {options}
        </select>
        <label>
          <h2>Biomarker</h2>
          <select name="biomarker" className="biomarker">
            {biomarkers}
          </select>
        </label>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CompareForm;
