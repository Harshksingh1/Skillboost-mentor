import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Navigation from "@/components/Navigation";
import ProfileSetup from "@/components/ProfileSetup";
import AIMentorChat from "@/components/AIMentorChat";
import SkillAssessment from "@/components/SkillAssessment";
import CareerGoals from "@/components/CareerGoals";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Users, 
  Calendar,
  MessageSquare,
  ArrowRight,
  Star,
  CheckCircle,
  Clock,
  Briefcase,
  Settings,
  LogOut
} from "lucide-react";

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const { toast } = useToast();
  const [careerProgress, setCareerProgress] = useState(68);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [forceShowDashboard, setForceShowDashboard] = useState(false);

  // Check if user has completed profile setup
  useEffect(() => {
    const checkProfile = async () => {
      if (user) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
        
        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching profile:', error);
        } else if (profile) {
          setUserProfile(profile);
          // Show setup if key fields are missing and user hasn't forced dashboard view
          const isIncomplete = !profile.first_name || !profile.last_name || !profile.username;
          setShowProfileSetup(isIncomplete && !forceShowDashboard);
        } else {
          setShowProfileSetup(!forceShowDashboard);
        }
      }
    };

    checkProfile();
  }, [user]);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out successfully",
        description: "You have been logged out.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const skills = [
    { name: "Python", level: 85, trend: "up" },
    { name: "Data Analysis", level: 78, trend: "up" },
    { name: "Machine Learning", level: 62, trend: "stable" },
    { name: "Communication", level: 90, trend: "up" },
  ];

  const recentActivities = [
    { type: "course", title: "Completed Advanced Python Course", time: "2 hours ago", icon: BookOpen },
    { type: "assessment", title: "Career Assessment Updated", time: "1 day ago", icon: Target },
    { type: "goal", title: "Monthly Goal Achieved", time: "3 days ago", icon: Award },
    { type: "mentor", title: "AI Mentor Session", time: "1 week ago", icon: Brain },
  ];

  const aiInsights = [
    {
      title: "Skill Gap Analysis",
      description: "Focus on cloud computing skills to advance to Senior Developer role",
      priority: "high",
      action: "Take AWS Certification Course"
    },
    {
      title: "Career Opportunity",
      description: "3 new job matches found based on your profile",
      priority: "medium",
      action: "View Job Recommendations"
    },
    {
      title: "Network Growth",
      description: "Connect with professionals in your target companies",
      priority: "low",
      action: "Expand Network"
    }
  ];

  const goals = [
    { title: "Complete Data Science Certification", progress: 75, deadline: "Dec 2024" },
    { title: "Build Portfolio Project", progress: 45, deadline: "Jan 2025" },
    { title: "Network with 10 Industry Professionals", progress: 30, deadline: "Nov 2024" },
  ];

  // Show profile setup if needed
  if (showProfileSetup) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-20 pb-12">
          <div className="container mx-auto px-6">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-2">Welcome to AI Career Mentor!</h1>
              <p className="text-muted-foreground">Let's set up your profile to get personalized career insights</p>
            </div>
            <ProfileSetup onBackToDashboard={() => setForceShowDashboard(true)} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-6 space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">
                Welcome back{userProfile?.first_name ? `, ${userProfile.first_name}` : ''}!
              </h1>
              <p className="text-muted-foreground">Let's continue building your career journey</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setShowProfileSetup(true)}>
                <Settings className="w-4 h-4 mr-2" />
                Profile Setup
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Chat with AI Mentor
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
                  <DialogHeader>
                    <DialogTitle>AI Career Mentor</DialogTitle>
                    <DialogDescription>
                      Get personalized career advice and insights from your AI mentor
                    </DialogDescription>
                  </DialogHeader>
                  <div className="h-[60vh]">
                    <AIMentorChat />
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="mentor">AI Mentor</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Career Progress</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{careerProgress}%</div>
                  <Progress value={careerProgress} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Skills Mastered</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    +3 new skills this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Network Connections</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">47</div>
                  <p className="text-xs text-muted-foreground">
                    +8 connections this week
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities & AI Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="p-2 rounded-full bg-primary/10">
                        <activity.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="ghost" className="w-full justify-center gap-2">
                    View All Activities
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    AI Recommendations
                  </CardTitle>
                  <CardDescription>
                    Personalized insights to accelerate your career
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {aiInsights.slice(0, 3).map((insight, index) => (
                    <div key={index} className="p-4 rounded-lg border border-border">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-medium text-sm">{insight.title}</h4>
                        <Badge 
                          variant={insight.priority === 'high' ? 'destructive' : 
                                 insight.priority === 'medium' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {insight.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{insight.description}</p>
                      <Button variant="outline" size="sm" className="text-xs">
                        {insight.action}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Skills Portfolio</CardTitle>
                <CardDescription>Track your skill development and identify growth areas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        {skill.trend === "up" && <TrendingUp className="w-4 h-4 text-green-500" />}
                      </div>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full mt-6">
                      Take Skill Assessment
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Skill Assessment</DialogTitle>
                      <DialogDescription>
                        Complete this assessment to get personalized insights and recommendations
                      </DialogDescription>
                    </DialogHeader>
                    <SkillAssessment />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <CareerGoals />
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid gap-6">
              {aiInsights.map((insight, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                      <Badge 
                        variant={insight.priority === 'high' ? 'destructive' : 
                               insight.priority === 'medium' ? 'default' : 'secondary'}
                      >
                        {insight.priority} priority
                      </Badge>
                    </div>
                    <CardDescription>{insight.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="gap-2">
                      {insight.action}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mentor" className="space-y-6">
            <AIMentorChat />
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Briefcase className="w-6 h-6" />
                <span className="text-sm">Find Jobs</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <BookOpen className="w-6 h-6" />
                <span className="text-sm">Learn Skills</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Users className="w-6 h-6" />
                <span className="text-sm">Network</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Calendar className="w-6 h-6" />
                <span className="text-sm">Schedule</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;