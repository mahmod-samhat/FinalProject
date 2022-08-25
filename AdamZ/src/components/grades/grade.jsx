import React, { useEffect, useState } from "react";
import scoreService from "../../services/scoreServices";

const Grade = ({ student, index, scores, updateScores, semester, lesson }) => {
  const [textGrade, setTextGrade] = useState({});
  const [score, setScore] = useState(null);
  useEffect(() => {
    console.log("students results ", student.results);

    for (const scor of student.results)
      if (scor.lesson == lesson._id && scor.semester == semester) {
        setTextGrade({ textScore: scor.textScore, heged: scor.heged });
        setScore(scor);
      }
  }, []);
  return (
    <>
      <tr style={{ cursor: "pointer" }}>
        <td>{index + 1}</td>
        <td>
          <div className="ms-3">
            <p className="fw-bold mb-1">
              {student.fName + " " + student.lName}
            </p>
          </div>
        </td>
        <td>
          <p className="text-muted mb-0">{student.id}</p>
        </td>
        <td>
          <div class="form-outline me-auto">
            <input
              defaultValue={score ? score.score : ""}
              type="text"
              className="form-control form-control-sm"
              onBlur={(e) => {
                const textG = scoreService.generateTextGrade(
                  Number(e.target.value)
                );
                setTextGrade(textG);
                const score = {
                  student: student._id,
                  score: Number(e.target.value),
                  textScore: textG.textScore,
                  heged: textG.heged,
                  semester,
                  lesson: lesson._id,
                };
                scores[index] = score;
                updateScores(scores);
              }}
            />
          </div>
        </td>
        <td>
          <p className="text-muted mb-0">{textGrade?.textScore}</p>
        </td>
        <td>
          <p className="text-muted mb-0">{textGrade?.heged}</p>
        </td>
      </tr>
    </>
  );
};

export default Grade;
