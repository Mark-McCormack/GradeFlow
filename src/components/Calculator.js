import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "./Calculator.css";

const GradeCalculator = () => {
  const [modules, setModules] = useState([]);
  const [moduleYears, setModuleYears] = useState([]);
  const [moduleCredits, setModuleCredits] = useState([]);
  const [yearWeights, setYearWeights] = useState([10, 20, 30, 40]);
  const [gradeData, setGradeData] = useState([]);

  useEffect(() => {
    generateRandomModules();
  }, []);

  const generateRandomModules = () => {
    const courseNames = [
      "Introduction to Computer Science",
      "Data Structures",
      "Algorithms",
      "Database Systems",
      "Operating Systems",
      "Computer Networks",
      "Web Development",
      "Software Engineering",
      "Artificial Intelligence",
      "Machine Learning",
      "Cybersecurity",
      "Computer Graphics",
    ];

    const getRandomCourseName = () => courseNames[Math.floor(Math.random() * courseNames.length)];
    const getRandomGrade = () => Math.floor(Math.random() * 101);

    const modulesPerYear = 3;
    const creditsPerModule = 5;
    const years = [1, 2, 3, 4];

    let generatedModules = [];
    let generatedModuleYears = [];
    let generatedModuleCredits = [];
    let generatedGradeData = [];

    years.forEach((year) => {
      for (let i = 0; i < modulesPerYear; i++) {
        generatedModules.push(getRandomCourseName());
        generatedModuleYears.push(year);
        generatedModuleCredits.push(creditsPerModule);
        generatedGradeData.push(getRandomGrade());
      }
    });

    setModules(generatedModules);
    setModuleYears(generatedModuleYears);
    setModuleCredits(generatedModuleCredits);
    setGradeData(generatedGradeData);
    setYearWeights([10, 20, 30, 40]);
  };

  const calculateYearGrade = (yearIndex) => {
    let yearGrades = gradeData.filter((_, index) => moduleYears[index] === yearIndex + 1);
    let yearModuleCredits = moduleCredits.filter((_, index) => moduleYears[index] === yearIndex + 1);

    let totalWeightedGrade = yearGrades.reduce((sum, grade, index) => sum + grade * yearModuleCredits[index], 0);
    let totalCredits = yearModuleCredits.reduce((sum, credit) => sum + credit, 0);

    return totalCredits > 0 ? totalWeightedGrade / totalCredits : 0;
  };

  const calculateFinalGrade = () => {
    const totalWeight = yearWeights.reduce((sum, weight) => sum + (Number(weight) || 0), 0);
    let weightedGrades = 0;

    yearWeights.forEach((weight, index) => {
      const yearGrade = calculateYearGrade(index);
      const normalizedWeight = totalWeight > 0 ? (Number(weight) || 0) / totalWeight : 0;
      weightedGrades += yearGrade * normalizedWeight;
    });

    return totalWeight > 0 ? weightedGrades.toFixed(2) : 0;
  };

  const finalGrade = calculateFinalGrade();

  const addModule = (yearIndex) => {
    const newYear = yearIndex + 1;
    setModules((prev) => [...prev, `New Module ${prev.length + 1}`]);
    setModuleYears((prev) => [...prev, newYear]);
    setModuleCredits((prev) => [...prev, 5]);
    setGradeData((prev) => [...prev, 50]);
  };

  const removeModule = (moduleIndex) => {
    setModules((prev) => prev.filter((_, index) => index !== moduleIndex));
    setModuleYears((prev) => prev.filter((_, index) => index !== moduleIndex));
    setModuleCredits((prev) => prev.filter((_, index) => index !== moduleIndex));
    setGradeData((prev) => prev.filter((_, index) => index !== moduleIndex));
  };

  const updateModuleName = (moduleIndex, value) => {
    setModules((prev) => prev.map((moduleName, index) => (index === moduleIndex ? value : moduleName)));
  };

  const updateModuleGrade = (moduleIndex, value) => {
    const parsedValue = parseFloat(value);
    setGradeData((prev) =>
      prev.map((grade, index) => (index === moduleIndex ? (Number.isNaN(parsedValue) ? 0 : parsedValue) : grade))
    );
  };

  const updateYearWeight = (yearIndex, value) => {
    const parsedValue = parseFloat(value);
    setYearWeights((prev) => prev.map((weight, index) => (index === yearIndex ? (Number.isNaN(parsedValue) ? 0 : parsedValue) : weight)));
  };

  return (
    <Container fluid className="rainbow-columns">
      <div className="calculator-shell">
        <div className="hero-section">
          <div>
            <p className="eyebrow">Student grade overview</p>
            <h1 className="hero-title">Grade Calculator</h1>
            <p className="hero-subtitle">
              Track yearly performance, compare weighted results, and adjust each year&apos;s importance with ease.
            </p>
          </div>
          <Button className="calc-action-button" onClick={generateRandomModules}>
            Refresh Sample Data
          </Button>
        </div>

        <div className="results-grid">
          <div className="result-card result-card-primary">
            <span className="result-label">Final Grade</span>
            <span className="result-value">{finalGrade}%</span>
          </div>
          <div className="result-card">
            <span className="result-label">Year Weights</span>
            <span className="result-value">{yearWeights.join("% • ")}%</span>
          </div>
        </div>

        <Row className="g-4">
          {[0, 1, 2, 3].map((yearIndex) => (
            <Col xs={12} lg={6} xl={3} key={yearIndex} className="year-column">
              <div className={`year-panel year-panel-${yearIndex + 1}`}>
                <div className="year-header">
                  <h2 className="year-title">Year {yearIndex + 1}</h2>
                  <Button className="add-module-button" onClick={() => addModule(yearIndex)}>
                    + Add Module
                  </Button>
                </div>

                <Form.Group className="field-group">
                  <Form.Label>Year Weight (%)</Form.Label>
                  <Form.Control
                    className="grade-input"
                    type="number"
                    placeholder="Year Weight (%)"
                    value={yearWeights[yearIndex] || ""}
                    onChange={(event) => updateYearWeight(yearIndex, event.target.value)}
                  />
                </Form.Group>

                {modules.map(
                  (module, index) =>
                    moduleYears[index] === yearIndex + 1 && (
                      <Card className="module-card" key={`${yearIndex}-${index}`}>
                        <div className="module-card-header">
                          <span>Module {index + 1}</span>
                          <Button className="remove-module-button" variant="link" onClick={() => removeModule(index)}>
                            ×
                          </Button>
                        </div>
                        <Form.Group>
                          <Form.Label htmlFor={`module-name-${index}`}>Module Name</Form.Label>
                          <Form.Control
                            id={`module-name-${index}`}
                            type="text"
                            value={module}
                            onChange={(event) => updateModuleName(index, event.target.value)}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label htmlFor={`module-grade-${index}`}>Grade (%)</Form.Label>
                          <Form.Control
                            id={`module-grade-${index}`}
                            type="number"
                            value={gradeData[index] || ""}
                            onChange={(event) => updateModuleGrade(index, event.target.value)}
                          />
                        </Form.Group>
                      </Card>
                    )
                )}
              </div>
            </Col>
          ))}

          <Col xs={12} className="year-column">
            <div className="year-panel year-summary">
              <h2 className="year-title">Year Summary</h2>
              <div className="summary-stack">
                {[0, 1, 2, 3].map((year) => (
                  <div key={year} className="summary-item">
                    <span>Year {year + 1}</span>
                    <strong>{calculateYearGrade(year).toFixed(1)}%</strong>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default GradeCalculator;
