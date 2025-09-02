import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Upload, User, Save, Camera, ArrowLeft, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileSetup = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState({ avatar: false, resume: false });
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    username: '',
    bio: '',
    avatar_url: '',
    resume_url: ''
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (data) {
        setProfile({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          username: data.username || '',
          bio: data.bio || '',
          avatar_url: data.avatar_url || '',
          resume_url: data.resume_url || ''
        });
      }
    };
    
    fetchProfile();
  }, [user]);

  const uploadFile = async (file: File, bucket: string, path: string) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, { upsert: true });
    
    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);
    
    return publicUrl;
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    
    setUploading({ ...uploading, avatar: true });
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/avatar.${fileExt}`;
      const avatarUrl = await uploadFile(file, 'avatars', fileName);
      
      setProfile(prev => ({ ...prev, avatar_url: avatarUrl }));
      toast({
        title: "Avatar uploaded successfully",
        description: "Your profile picture has been updated.",
      });
    } catch (error) {
      toast({
        title: "Error uploading avatar",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setUploading({ ...uploading, avatar: false });
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOC, or DOCX file.",
        variant: "destructive",
      });
      return;
    }
    
    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }
    
    setUploading({ ...uploading, resume: true });
    setResumeFile(file);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/resume.${fileExt}`;
      
      const { error } = await supabase.storage
        .from('resumes')
        .upload(fileName, file, { upsert: true });
      
      if (error) throw error;
      
      setProfile(prev => ({ ...prev, resume_url: fileName }));
      toast({
        title: "Resume uploaded successfully",
        description: "Your resume has been uploaded.",
      });
    } catch (error) {
      toast({
        title: "Error uploading resume",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setUploading({ ...uploading, resume: false });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          ...profile,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Profile saved successfully",
        description: "Your profile information has been saved.",
      });
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error saving profile",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          onClick={() => navigate('/dashboard')}
          variant="outline"
          size="icon"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-2xl font-bold">Complete Your Profile</h1>
      </div>

      <Card className="border-primary/20 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center gap-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src={profile.avatar_url} alt="Profile" />
                <AvatarFallback className="text-lg bg-primary/10 text-primary">
                  {profile.first_name?.[0]}{profile.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2 flex-1">
                <Label htmlFor="avatar">Profile Picture</Label>
                <div className="flex gap-2">
                  <Input
                    id="avatar-url"
                    placeholder="Or paste image URL"
                    value={profile.avatar_url}
                    onChange={(e) => handleInputChange('avatar_url', e.target.value)}
                    className="flex-1"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      id="avatar-upload"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={uploading.avatar}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon"
                      disabled={uploading.avatar}
                    >
                      {uploading.avatar ? (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Camera className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Upload an image or paste a URL</p>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={profile.first_name}
                  onChange={(e) => handleInputChange('first_name', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={profile.last_name}
                  onChange={(e) => handleInputChange('last_name', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="johndoe"
                value={profile.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                required
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Professional Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about your professional background and career goals..."
                value={profile.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={loading}>
              <Save className="w-4 h-4" />
              {loading ? 'Saving...' : 'Save Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Resume Upload Card */}
      <Card className="border-accent/20 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-accent" />
            Upload Your Resume
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {profile.resume_url || resumeFile ? (
              <div className="border rounded-lg p-4 bg-accent/5">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-accent" />
                  <div className="flex-1">
                    <p className="font-medium">
                      {resumeFile ? resumeFile.name : 'Resume uploaded'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {resumeFile ? `${(resumeFile.size / 1024 / 1024).toFixed(2)} MB` : 'Successfully uploaded'}
                    </p>
                  </div>
                  <div className="relative">
                    <input
                      type="file"
                      id="resume-replace"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={uploading.resume}
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={uploading.resume}
                    >
                      {uploading.resume ? (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        'Replace'
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-accent/50 transition-colors relative">
                <input
                  type="file"
                  id="resume-upload"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={uploading.resume}
                />
                {uploading.resume ? (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4" />
                    <h3 className="text-lg font-medium mb-2">Uploading...</h3>
                    <p className="text-muted-foreground">Please wait while we upload your resume</p>
                  </div>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Upload Resume</h3>
                    <p className="text-muted-foreground mb-4">
                      Drag and drop your resume here, or click to browse
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Supports PDF, DOC, DOCX files up to 10MB
                    </p>
                    <Button variant="outline" className="pointer-events-none">
                      <Upload className="w-4 h-4" />
                      Choose File
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSetup;