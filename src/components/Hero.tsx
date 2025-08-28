import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Upload, Brain, TrendingUp, Target } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import heroImage from "@/assets/hero-dashboard.jpg";

const Hero = () => {
  const { user } = useAuth();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-30" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Brain className="w-4 h-4" />
                AI-Powered Career Intelligence
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Unlock Your
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Career Potential</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Upload your resume and get instant AI-powered insights, personalized job recommendations, and a clear roadmap to your dream career.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {user ? (
                <Button variant="hero" size="lg" asChild className="text-lg px-8 py-4 h-auto">
                  <Link to="/dashboard">
                    <TrendingUp className="w-5 h-5" />
                    Go to Dashboard
                  </Link>
                </Button>
              ) : (
                <Button variant="hero" size="lg" asChild className="text-lg px-8 py-4 h-auto">
                  <Link to="/auth">
                    <Upload className="w-5 h-5" />
                    Get Started Free
                  </Link>
                </Button>
              )}
              <Button variant="hero-outline" size="lg" className="text-lg px-8 py-4 h-auto">
                <TrendingUp className="w-5 h-5" />
                View Demo Dashboard
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Careers Boosted</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">AI Mentor</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-slide-in">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="AI Career Mentor Dashboard showing career insights and analytics"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 bg-success text-success-foreground p-4 rounded-xl shadow-lg animate-float">
              <Target className="w-6 h-6" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-4 rounded-xl shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
              <Brain className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;