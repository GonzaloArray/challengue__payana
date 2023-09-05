import { useState } from "react";
import "./App.css";
import QuestionJSON from "./Question.json";
import { Box, Rating, Typography } from "@mui/material";

export interface Questions {
  preguntas: Pregunta[];
}

export interface Pregunta {
  id: number;
  texto: string;
  valoracion: number;
}

interface Rating {
  value: number;
  onChange: (value: number) => void;
  isReadOnly: boolean;
}

const questions: Pregunta[] = QuestionJSON.preguntas;

const RatingPayana = ({ value, onChange, isReadOnly }: Rating) => {
  return (
    <Rating
      readOnly={isReadOnly}
      name="simple-controlled"
      value={value}
      size="large"
      onChange={(e, newValue) => newValue && onChange(newValue)}
    />
  );
};

function App() {
  const [questionStep, setQuestionStep] = useState(0);
  const [responseQuestion, setResponseQuestion] = useState<number[]>([]);

  const currentQuestion = questions[questionStep];

  if (questions.length <= questionStep) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {responseQuestion.map((response, i) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "2rem",
            }}
            key={i}
          >
            <Typography variant="h4">{questions[i].texto}</Typography>
            <Rating name="read-only" value={response} readOnly />
          </Box>
        ))}
      </Box>
    );
  }

  const handleChange = (rating: number) => {
    if (questions.length > questionStep) {
      setQuestionStep(questionStep + 1);
      setResponseQuestion(() => [...responseQuestion, rating]);
    }
  };

  return (
    <>
      <Typography variant="h2" component="h2" mb={5}>Preguntas: </Typography>
      <Box sx={{display: 'flex', gap: '2rem', flexDirection: 'column', alignItems: 'center'}}>
        <Typography variant="h4">{currentQuestion.texto}</Typography>
        <RatingPayana value={0} onChange={handleChange} isReadOnly={false} />
      </Box>
    </>
  );
}

export default App;
