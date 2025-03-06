
import React, { useState } from 'react';
import { UserData } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileFormProps {
  user: UserData;
  onSave: (data: Partial<UserData>) => void;
  isWorker?: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user, onSave, isWorker = false }) => {
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [location, setLocation] = useState(user.location || '');
  const [profilePicture, setProfilePicture] = useState<string | undefined>(user.profilePicture);
  const [skills, setSkills] = useState<string[]>(user.skills || []);
  const [newSkill, setNewSkill] = useState('');
  
  // Mock file upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, this would upload to a CDN
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePicture(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };
  
  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSave({
      name,
      email,
      location,
      profilePicture,
      skills: isWorker ? skills : undefined,
      profileComplete: true,
    });
  };
  
  return (
    <Card className="w-full max-w-lg mx-auto border border-border animate-fade-in">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center">Your Profile</CardTitle>
          <CardDescription className="text-center">Update your personal information</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-28 w-28">
              <AvatarImage src={profilePicture} alt={name} />
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                {name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex items-center">
              <Label htmlFor="picture" className="button-hover cursor-pointer bg-secondary px-3 py-1.5 rounded-md text-sm text-secondary-foreground">
                Change picture
              </Label>
              <Input 
                id="picture" 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </div>
          
          {/* Name */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full"
            />
          </div>
          
          {/* Email */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          
          {/* Location */}
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, State"
              className="w-full"
            />
          </div>
          
          {/* Skills (for workers only) */}
          {isWorker && (
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="skills">Skills & Expertise</Label>
              <div className="flex w-full space-x-2">
                <Input
                  id="skills"
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill (e.g., Plumbing, Electrical)"
                  className="w-full"
                />
                <Button type="button" onClick={addSkill} size="sm">Add</Button>
              </div>
              
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.map((skill) => (
                    <Badge key={skill} className="flex items-center gap-1 px-2 py-1">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="rounded-full hover:bg-muted p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <Button type="submit" className="w-full button-hover">Save Profile</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProfileForm;
