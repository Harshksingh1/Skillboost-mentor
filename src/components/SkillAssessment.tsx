import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, Brain, TrendingUp, Target, Award } from "lucide-react";

interface Question {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

const SkillAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showResults, setShowResults] = useState(false);

  const questions: Question[] = [
    {
      id: "1",
      category: "Technical Skills",
      question: "Which of the following best describes your experience with version control systems?",
      options: [
        "I'm not familiar with version control",
        "I know basic git commands",
        "I can manage branches and resolve conflicts",
        "I can design complex workflows and mentor others"
      ],
      correctAnswer: 3
    },
    {
      id: "2",
      category: "Leadership",
      question: "How do you typically handle conflicting priorities in a team project?",
      options: [
        "I usually avoid conflicts",
        "I discuss with my immediate supervisor",
        "I facilitate team discussions to find solutions",
        "I develop frameworks for priority management"
      ],
      correctAnswer: 3
    },
    {
      id: "3",
      category: "Problem Solving",
      question: "When facing a complex technical problem, what's your first approach?",
      options: [
        "Ask someone for help immediately",
        "Try different solutions until something works",
        "Break down the problem systematically",
        "Research similar problems and adapt solutions"
      ],
      correctAnswer: 3
    },
    {
      id: "4",
      category: "Communication",
      question: "How comfortable are you presenting technical concepts to non-technical stakeholders?",
      options: [
        "I prefer to avoid such presentations",
        "I can present with preparation",
        "I'm comfortable and can adapt my communication style",
        "I excel at translating complex concepts clearly"
      ],
      correctAnswer: 3
    }
  ];

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleNextQuestion = () => {
    const answerIndex = parseInt(selectedAnswer);
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    setSelectedAnswer("");

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateResults = () => {
    const totalPoints = answers.reduce((sum, answer) => sum + answer, 0);
    const maxPoints = questions.length * 3;
    const percentage = Math.round((totalPoints / maxPoints) * 100);
    
    const categoryScores = questions.reduce((acc, question, index) => {
      const category = question.category;
      if (!acc[category]) acc[category] = { total: 0, count: 0 };
      acc[category].total += answers[index];
      acc[category].count += 1;
      return acc;
    }, {} as Record<string, { total: number; count: number }>);

    const skillLevels = Object.entries(categoryScores).map(([category, scores]) => ({
      category,
      level: Math.round((scores.total / (scores.count * 3)) * 100)
    }));

    return { totalScore: percentage, skillLevels };
  };

  const getSkillLevel = (percentage: number) => {
    if (percentage >= 80) return { level: "Expert", color: "bg-green-500", icon: Award };
    if (percentage >= 60) return { level: "Advanced", color: "bg-blue-500", icon: TrendingUp };
    if (percentage >= 40) return { level: "Intermediate", color: "bg-yellow-500", icon: Target };
    return { level: "Beginner", color: "bg-gray-500", icon: Brain };
  };

  if (showResults) {
    const results = calculateResults();
    const overallLevel = getSkillLevel(results.totalScore);

    return (
      <div className="space-y-6">
        <Card className="border-primary/20">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Assessment Complete!</CardTitle>
            <CardDescription>
              Here's your detailed skill analysis and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Overall Score */}
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold text-primary">{results.totalScore}%</div>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <overallLevel.icon className="w-4 h-4 mr-2" />
                {overallLevel.level}
              </Badge>
              <Progress value={results.totalScore} className="w-full" />
            </div>

            {/* Category Breakdown */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Skill Breakdown</h3>
              {results.skillLevels.map((skill) => {
                const skillLevel = getSkillLevel(skill.level);
                return (
                  <div key={skill.category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.category}</span>
                      <Badge variant="outline">
                        <skillLevel.icon className="w-3 h-3 mr-1" />
                        {skillLevel.level}
                      </Badge>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                    <p className="text-sm text-muted-foreground">{skill.level}%</p>
                  </div>
                );
              })}
            </div>

            {/* Recommendations */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <h4 className="font-medium">Immediate Focus Areas:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Strengthen leadership skills through team project management</li>
                    <li>• Practice public speaking and presentation skills</li>
                    <li>• Explore advanced technical frameworks and tools</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Recommended Learning Path:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Advanced Git & DevOps Practices</li>
                    <li>• Technical Leadership Bootcamp</li>
                    <li>• System Design and Architecture</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button className="flex-1">
                View Learning Roadmap
              </Button>
              <Button variant="outline" onClick={() => {
                setCurrentQuestion(0);
                setAnswers([]);
                setShowResults(false);
                setSelectedAnswer("");
              }}>
                Retake Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <Badge variant="outline">
              Question {currentQuestion + 1} of {questions.length}
            </Badge>
            <Badge variant="secondary">{question.category}</Badge>
          </div>
          <Progress value={progress} className="mb-4" />
          <CardTitle className="text-xl">{question.question}</CardTitle>
          <CardDescription>
            Select the option that best describes your current level
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            value={selectedAnswer}
            onValueChange={handleAnswerSelect}
            className="space-y-3"
          >
            {question.options.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
            >
              {currentQuestion === questions.length - 1 ? "Finish Assessment" : "Next Question"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillAssessment;