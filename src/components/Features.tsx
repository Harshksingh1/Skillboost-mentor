import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Upload, 
  Brain, 
  Target, 
  TrendingUp, 
  FileText, 
  Zap,
  Shield,
  Clock,
  Award
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Upload,
      title: "Smart Resume Parsing",
      description: "Upload any format and our AI instantly extracts skills, experience, and achievements with 95% accuracy.",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Brain,
      title: "AI Career Analysis",
      description: "Advanced algorithms analyze your profile against 10,000+ job roles to identify opportunities and gaps.",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: Target,
      title: "Skill Gap Assessment",
      description: "Precise identification of missing skills for your target roles with difficulty ratings and time estimates.",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      icon: TrendingUp,
      title: "Job Match Scoring",
      description: "Real-time compatibility scores with detailed breakdowns of why you're a good fit for specific positions.",
      color: "text-chart-4",
      bgColor: "bg-chart-4/10"
    },
    {
      icon: FileText,
      title: "Learning Roadmaps",
      description: "Personalized step-by-step career paths with course recommendations and milestone tracking.",
      color: "text-chart-5",
      bgColor: "bg-chart-5/10"
    },
    {
      icon: Zap,
      title: "Instant Insights",
      description: "Get comprehensive career analysis in under 30 seconds, powered by cutting-edge AI technology.",
      color: "text-primary",
      bgColor: "bg-primary/10"
    }
  ];

  const stats = [
    { icon: Shield, value: "99.9%", label: "Data Security", description: "Enterprise-grade encryption" },
    { icon: Clock, value: "<30s", label: "Analysis Time", description: "Lightning-fast processing" },
    { icon: Award, value: "95%", label: "Accuracy Rate", description: "Industry-leading precision" },
  ];

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            Powerful AI Features
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need to 
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Accelerate Your Career</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our AI-powered platform provides comprehensive career insights that traditionally require hours of manual analysis.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 animate-slide-in">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
            >
              <CardHeader>
                <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 animate-fade-in">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center p-6 rounded-xl bg-muted/30 border border-border/50">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="font-semibold mb-1">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;