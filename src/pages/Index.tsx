import React, { useState } from 'react';
import { DashboardProvider, useDashboard } from '@/contexts/DashboardContext';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardCategory from '@/components/dashboard/DashboardCategory';

const DashboardContent = () => {
  const { dashboard, searchWidgets } = useDashboard();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredCategories = searchQuery
    ? dashboard.categories.map(category => ({
        ...category,
        widgets: category.widgets.filter(widget =>
          widget.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          widget.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.widgets.length > 0)
    : dashboard.categories;

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader onSearch={handleSearch} />
      
      <div className="p-6 space-y-8">
        {searchQuery && (
          <div className="text-sm text-muted-foreground">
            {filteredCategories.reduce((acc, cat) => acc + cat.widgets.length, 0)} widgets found for "{searchQuery}"
          </div>
        )}
        
        {filteredCategories.map((category) => (
          <DashboardCategory key={category.id} category={category} />
        ))}
        
        {filteredCategories.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No widgets found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
};

export default Index;
