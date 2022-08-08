import schoolInfo from "../../schoolInfo.json";
const SelectGrades = () => {
  const { grades } = schoolInfo;
  return (
    <select className="form-select w-25">
      <option defaultValue>שכבה</option>
      {grades &&
        grades.map((grade, index) => {
          return (
            <option key={index} value={grade}>
              {grade}
            </option>
          );
        })}
    </select>
  );
};
export default SelectGrades;
