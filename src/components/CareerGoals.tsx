import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Target, Plus, CheckCircle, Clock, TrendingUp, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  deadline: Date;
  progress: number;
  milestones: Milestone[];
  status: 'active' | 'completed' | 'paused';
}

interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: Date;
}

const CareerGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Complete Data Science Certification',
      description: 'Obtain a professional data science certification to advance my career in analytics',
      category: 'Education',
      priority: 'high',
      deadline: new Date('2024-12-31'),
      progress: 75,
      status: 'active',
      milestones: [
        { id: '1', title: 'Complete Python fundamentals', completed: true },
        { id: '2', title: 'Finish statistics course', completed: true },
        { id: '3', title: 'Build portfolio project', completed: false, dueDate: new Date('2024-11-15') },
        { id: '4', title: 'Take certification exam', completed: false, dueDate: new Date('2024-12-15') }
      ]
    },
    {
      id: '2',
      title: 'Build Professional Network',
      description: 'Connect with 20 industry professionals and attend 5 networking events',
      category: 'Networking',
      priority: 'medium',
      deadline: new Date('2024-11-30'),
      progress: 40,
      status: 'active',
      milestones: [
        { id: '5', title: 'Attend industry conference', completed: true },
        { id: '6', title: 'Connect with 10 professionals on LinkedIn', completed: false },
        { id: '7', title: 'Join professional association', completed: false },
        { id: '8', title: 'Attend 3 more networking events', completed: false }
      ]
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const handleCreateGoal = (newGoal: Partial<Goal>) => {
    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title || '',
      description: newGoal.description || '',
      category: newGoal.category || 'Other',
      priority: newGoal.priority || 'medium',
      deadline: newGoal.deadline || new Date(),
      progress: 0,
      status: 'active',
      milestones: []
    };

    setGoals(prev => [...prev, goal]);
    setIsCreateDialogOpen(false);
  };

  const updateGoalProgress = (goalId: string, progress: number) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, progress } : goal
    ));
  };

  const toggleMilestone = (goalId: string, milestoneId: string) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const updatedMilestones = goal.milestones.map(milestone =>
          milestone.id === milestoneId 
            ? { ...milestone, completed: !milestone.completed }
            : milestone
        );
        
        const completedCount = updatedMilestones.filter(m => m.completed).length;
        const progress = Math.round((completedCount / updatedMilestones.length) * 100);
        
        return { ...goal, milestones: updatedMilestones, progress };
      }
      return goal;
    }));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 50) return 'text-blue-600';
    if (progress >= 25) return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Career Goals</h2>
          <p className="text-muted-foreground">Track your progress and achieve your career milestones</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Career Goal</DialogTitle>
              <DialogDescription>
                Set a new goal to advance your career and track your progress
              </DialogDescription>
            </DialogHeader>
            <CreateGoalForm onSubmit={handleCreateGoal} onCancel={() => setIsCreateDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Goals Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{goals.filter(g => g.status === 'active').length}</p>
                <p className="text-sm text-muted-foreground">Active Goals</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-green-100">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{goals.filter(g => g.status === 'completed').length}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-accent/10">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length)}%
                </p>
                <p className="text-sm text-muted-foreground">Avg Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => (
          <Card key={goal.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{goal.title}</CardTitle>
                    <Badge variant={getPriorityColor(goal.priority) as any}>
                      {goal.priority} priority
                    </Badge>
                    <Badge variant="outline">{goal.category}</Badge>
                  </div>
                  <CardDescription>{goal.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Progress</span>
                  <span className={`text-sm font-medium ${getProgressColor(goal.progress)}`}>
                    {goal.progress}%
                  </span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>

              {/* Deadline */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Due: {format(goal.deadline, 'MMM dd, yyyy')}</span>
                <span className="text-xs bg-muted px-2 py-1 rounded">
                  {Math.ceil((goal.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                </span>
              </div>

              {/* Milestones */}
              {goal.milestones.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Milestones</h4>
                  <div className="space-y-2">
                    {goal.milestones.map((milestone) => (
                      <div key={milestone.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                        <button
                          onClick={() => toggleMilestone(goal.id, milestone.id)}
                          className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                            milestone.completed 
                              ? 'bg-primary border-primary text-primary-foreground' 
                              : 'border-muted-foreground'
                          }`}
                        >
                          {milestone.completed && <CheckCircle className="w-3 h-3" />}
                        </button>
                        <span className={`text-sm flex-1 ${milestone.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {milestone.title}
                        </span>
                        {milestone.dueDate && (
                          <span className="text-xs text-muted-foreground">
                            {format(milestone.dueDate, 'MMM dd')}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Add Milestone
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => updateGoalProgress(goal.id, Math.min(100, goal.progress + 10))}
                >
                  Update Progress
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const CreateGoalForm = ({ onSubmit, onCancel }: { 
  onSubmit: (goal: Partial<Goal>) => void; 
  onCancel: () => void; 
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [deadline, setDeadline] = useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      category,
      priority,
      deadline
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Goal Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Complete AWS Certification"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your goal and why it's important..."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Education">Education</SelectItem>
              <SelectItem value="Skills">Skills</SelectItem>
              <SelectItem value="Networking">Networking</SelectItem>
              <SelectItem value="Leadership">Leadership</SelectItem>
              <SelectItem value="Career">Career Advancement</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Deadline</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !deadline && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {deadline ? format(deadline, "PPP") : "Pick a deadline"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={deadline}
              onSelect={setDeadline}
              initialFocus
              disabled={(date) => date < new Date()}
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1">
          Create Goal
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default CareerGoals;