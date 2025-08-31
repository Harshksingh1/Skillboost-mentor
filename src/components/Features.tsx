import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Award,
  Zap,
  BarChart3,
  MessageSquare,
  Briefcase,
  Star,
  Shield
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Career Insights",
      description: "Get personalized career recommendations based on your skills, experience, and market trends.",
      highlight: "Smart Analysis"
    },
    {
      icon: Target,
      title: "Goal Tracking & Planning",
      description: "Set career milestones and track your progress with intelligent goal-setting tools.",
      highlight: "Goal Oriented"
    },
    {
      icon: TrendingUp,
      title: "Skill Development Roadmaps", 
      description: "Discover skill gaps and get curated learning paths to advance your career.",
      highlight: "Growth Focused"
    },
    {
      icon: Users,
      title: "Professional Networking",
      description: "Connect with industry professionals and expand your network strategically.",
      highlight: "Network Building"
    },
    {
      icon: BookOpen,
      title: "Personalized Learning",
      description: "Access tailored courses and resources based on your career objectives.",
      highlight: "Custom Learning"
    },
    {
      icon: Award,
      title: "Achievement Recognition",
      description: "Earn badges and certifications as you progress in your career journey.",
      highlight: "Recognition"
    }
  ];

  const stats = [
    {
      icon: Zap,
      value: "10x",
      label: "Faster Career Growth",
      description: "Users report accelerated career progression with AI guidance"
    },
    {
      icon: BarChart3,
      value: "95%",
      label: "Success Rate",
      description: "Of users achieve their career goals within 12 months"
    },
    {
      icon: MessageSquare,
      value: "24/7",
      label: "AI Mentor Support",
      description: "Get instant career advice whenever you need it"
    },
    {
      icon: Briefcase,
      value: "50K+",
      label: "Job Opportunities",
      description: "Access to exclusive positions from partner companies"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4">
            <Star className="w-4 h-4 mr-2" />
            Trusted by 100K+ Professionals
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              accelerate your career
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our AI-powered platform combines cutting-edge technology with proven career development strategies 
            to help you achieve your professional goals faster than ever before.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.highlight}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-primary/5 via-background to-accent/5 rounded-2xl p-8 border border-primary/10">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Proven Results That Speak for Themselves</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of professionals who have transformed their careers with our AI-powered platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <h4 className="font-semibold mb-2">{stat.label}</h4>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-medium">Enterprise-Grade Security</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Your data is protected with bank-level encryption and we never share your personal information. 
            GDPR compliant and SOC 2 certified for your peace of mind.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;