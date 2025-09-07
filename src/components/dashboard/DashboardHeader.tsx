import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDashboard } from '@/contexts/DashboardContext';

interface DashboardHeaderProps {
  onSearch: (query: string) => void;
}

const DashboardHeader = ({ onSearch }: DashboardHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="bg-surface border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">CNAPP Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your cloud security and compliance widgets
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search widgets..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 w-64 bg-background border-border focus:border-dashboard-accent"
            />
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            className="border-border hover:bg-surface-secondary"
          >
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;