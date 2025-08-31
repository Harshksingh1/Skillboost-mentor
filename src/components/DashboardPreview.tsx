import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  TrendingUp, 
  Award, 
  ArrowRight,
  Star,
  Target,
  BookOpen,
  Briefcase,
  Users,
  MessageSquare,
  BarChart3,
  Clock
} from "lucide-react";

const DashboardPreview = () => {
  const skills = [
    { name: "Python Programming", level: 85, trend: "up", gap: false },
    { name: "Data Analysis", level: 78, trend: "up", gap: false },
    { name: "Machine Learning", level: 62, trend: "stable", gap: true },
    { name: "Cloud Computing", level: 45, trend: "up", gap: true },
  ];

  const jobMatches = [
    { title: "Senior Data Scientist", company: "TechCorp", match: 94, salary: "$120k - $160k" },
    { title: "ML Engineer", company: "DataFlow", match: 87, salary: "$110k - $145k" },
    { title: "AI Researcher", company: "InnovateLab", match: 82, salary: "$130k - $170k" },
  ];

  const learningPlan = [
    { skill: "AWS Certification", priority: "High", duration: "6 weeks", type: "certification" },
    { skill: "Advanced ML Algorithms", priority: "Medium", duration: "8 weeks", type: "course" },
    { skill: "Leadership Skills", priority: "Low", duration: "4 weeks", type: "soft-skill" },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4">
            <BarChart3 className="w-4 h-4 mr-2" />
            Interactive Dashboard
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Your{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI-powered career dashboard
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Get a complete view of your career progress, skill development, and opportunities 
            all in one intelligent dashboard designed to accelerate your growth.
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="max-w-6xl mx-auto">
          {/* Top Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Career Progress</CardTitle>
                <TrendingUp className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">68%</div>
                <Progress value={68} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-gradient-to-br from-background to-accent/5">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Skills Mastered</CardTitle>
                <Award className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">12</div>
                <p className="text-xs text-muted-foreground">
                  +3 new skills this month
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Network Growth</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">47</div>
                <p className="text-xs text-muted-foreground">
                  +8 connections this week
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Skills Analysis */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Skills Analysis & Gaps
                </CardTitle>
                <CardDescription>
                  AI-powered analysis of your skill portfolio with personalized recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{skill.name}</span>
                      <div className="flex items-center gap-2">
                        {skill.gap && (
                          <Badge variant="destructive" className="text-xs">
                            Skill Gap
                          </Badge>
                        )}
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        {skill.trend === "up" && <TrendingUp className="w-4 h-4 text-green-500" />}
                      </div>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  <Brain className="w-4 h-4 mr-2" />
                  Get Personalized Learning Plan
                </Button>
              </CardContent>
            </Card>

            {/* Job Match Scores */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  AI Job Match Analysis
                </CardTitle>
                <CardDescription>
                  Discover your compatibility with current market opportunities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {jobMatches.map((job, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-sm">{job.title}</h4>
                        <p className="text-xs text-muted-foreground">{job.company}</p>
                      </div>
                      <Badge 
                        variant={job.match > 90 ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {job.match}% match
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <Progress value={job.match} className="h-2" />
                      <p className="text-xs font-medium text-accent">{job.salary}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  View All Job Matches
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Learning Recommendations */}
          <Card className="border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Personalized Learning Roadmap
              </CardTitle>
              <CardDescription>
                AI-curated learning path based on your goals and market demands
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {learningPlan.map((item, index) => (
                  <div key={index} className="p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <Badge 
                        variant={item.priority === 'High' ? 'destructive' : 
                               item.priority === 'Medium' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {item.priority}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {item.duration}
                      </div>
                    </div>
                    <h4 className="font-medium text-sm mb-1">{item.skill}</h4>
                    <p className="text-xs text-muted-foreground capitalize">{item.type}</p>
                  </div>
                ))}
              </div>
              
              {/* AI Insight */}
              <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Brain className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-1">AI Career Coach Insight</h4>
                    <p className="text-xs text-muted-foreground">
                      Based on your current skill set and career goals, focusing on cloud computing skills 
                      will increase your job market value by 40% and open up 15+ new high-paying opportunities 
                      in the next 6 months.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Mentor Chat Preview */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                24/7 AI Career Mentor
              </CardTitle>
              <CardDescription>
                Get instant, personalized career advice whenever you need it
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-64 overflow-hidden">
                {/* Sample chat messages */}
                <div className="flex gap-3">
                  <div className="p-2 rounded-full bg-muted">
                    <Brain className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">AI Mentor</p>
                    <div className="bg-muted/50 rounded-lg p-3 text-sm">
                      Great progress on your Python skills! I recommend focusing on AWS next to boost your cloud expertise. Would you like me to create a personalized learning plan?
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 justify-end">
                  <div className="flex-1 space-y-1 text-right">
                    <p className="text-sm font-medium">You</p>
                    <div className="bg-primary/10 rounded-lg p-3 text-sm inline-block">
                      Yes, that sounds perfect! What's the best way to get started?
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="p-2 rounded-full bg-muted">
                    <Brain className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">AI Mentor</p>
                    <div className="bg-muted/50 rounded-lg p-3 text-sm">
                      I've created a 6-week AWS certification roadmap for you! Start with the fundamentals course, then practice with hands-on labs. I'll track your progress and adjust the plan as needed.
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Button>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Start Chatting with AI Mentor
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;