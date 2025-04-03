
import React from 'react';
import { UserCircle } from 'lucide-react';

type ProfileHeaderProps = {
  title: string;
  email?: string;
};

const ProfileHeader = ({ title, email }: ProfileHeaderProps) => {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
        <UserCircle className="h-16 w-16 text-primary" />
      </div>
      <h1 className="text-2xl font-bold">{title}</h1>
      {email && <p className="text-muted-foreground">{email}</p>}
    </div>
  );
};

export default ProfileHeader;
