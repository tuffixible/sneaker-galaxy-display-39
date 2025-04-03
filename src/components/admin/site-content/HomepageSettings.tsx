
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface HomepageSettingsProps {
  content: {
    homepageTitle: string;
    homepageSubtitle: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const HomepageSettings: React.FC<HomepageSettingsProps> = ({ content, handleInputChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Homepage Settings</CardTitle>
        <CardDescription>Configure homepage content and appearance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="homepageTitle">Homepage Title</Label>
          <Input 
            id="homepageTitle" 
            name="homepageTitle" 
            value={content.homepageTitle} 
            onChange={handleInputChange} 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="homepageSubtitle">Homepage Subtitle</Label>
          <Textarea 
            id="homepageSubtitle" 
            name="homepageSubtitle" 
            value={content.homepageSubtitle} 
            onChange={handleInputChange} 
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default HomepageSettings;
