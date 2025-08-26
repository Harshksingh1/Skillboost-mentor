import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Target, 
  BookOpen, 
  Briefcase, 
  Award, 
  ChevronRight,
  BarChart3,
  Users,
  Lightbulb
} from "lucide-react";

const DashboardPreview = () => {
  const skillsData = [
    { name: "React.js", level: 85, category: "Frontend" },
    { name: "Node.js", level: 78, category: "Backend" },
    { name: "TypeScript", level: 72, category: "Language" },
    { name: "Cloud (AWS)", level: 45, category: "Infrastructure", isGap: true },
    { name: "Machine Learning", level: 30, category: "AI/ML", isGap: true },
  ];

  const jobMatches = [
    { title: "Senior Frontend Developer", match: 92, company: "TechCorp", salary: "$95k-$120k" },
    { title: "Full Stack Engineer", match: 78, company: "StartupX", salary: "$85k-$110k" },
    { title: "React Developer", match: 88, company: "DevStudio", salary: "$75k-$95k" },
  ];

  const learningPath = [
    { skill: "AWS Certification", priority: "High", duration: "6 weeks", icon: Award },
    { skill: "Advanced TypeScript", priority: "Medium", duration: "4 weeks", icon: BookOpen },
    { skill: "System Design", priority: "High", duration: "8 weeks", icon: BarChart3 },
  ];

  return (
    <section id="dashboard" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BarChart3 className="w-4 h-4" />
            Interactive Dashboard Preview
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Your AI-Powered Career 
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Command Center</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how our AI analyzes your resume and provides actionable insights to accelerate your career growth.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 animate-slide-in">
          {/* Skills Analysis */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-card to-card/50 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Skills Analysis & Gap Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {skillsData.map((skill, index) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{skill.name}</span>
                      <Badge variant={skill.isGap ? "destructive" : "secondary"} className="text-xs">
                        {skill.category}
                      </Badge>
                      {skill.isGap && (
                        <Badge variant="outline" className="text-xs text-accent">
                          Skill Gap
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm font-medium">{skill.level}%</span>
                  </div>
                  <Progress 
                    value={skill.level} 
                    className={`h-2 ${skill.isGap ? 'opacity-60' : ''}`}
                  />
                </div>
              ))}
              <Button variant="hero-outline" className="w-full mt-4">
                <Lightbulb className="w-4 h-4" />
                Get Personalized Learning Plan
              </Button>
            </CardContent>
          </Card>

          {/* Job Match Scores */}
          <Card className="bg-gradient-to-br from-card to-primary/5 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Job Match Scores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {jobMatches.map((job, index) => (
                <div key={job.title} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-sm">{job.title}</h4>
                      <p className="text-xs text-muted-foreground">{job.company}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {job.match}% match
                    </Badge>
                  </div>
                  <div className="text-xs text-success font-medium mb-2">{job.salary}</div>
                  <Progress value={job.match} className="h-1" />
                </div>
              ))}
              <Button variant="default" size="sm" className="w-full">
                <ChevronRight className="w-4 h-4" />
                View All Matches
              </Button>
            </CardContent>
          </Card>

          {/* Learning Recommendations */}
          <Card className="lg:col-span-3 bg-gradient-to-br from-accent/5 to-card border-accent/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Personalized Learning Roadmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {learningPath.map((item, index) => (
                  <div key={item.skill} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{item.skill}</h4>
                        <p className="text-xs text-muted-foreground">{item.duration}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={item.priority === "High" ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {item.priority} Priority
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="font-medium">AI Career Coach Insight</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on your profile, focusing on cloud skills could increase your job match rate by 25% and potential salary by $15k-$20k. 
                  Consider AWS certification as your next priority.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;