import React, { useState } from 'react';
import { Category } from '@/types/dashboard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import DashboardWidget from './DashboardWidget';
import AddWidgetModal from './AddWidgetModal';
import { useDashboard } from '@/contexts/DashboardContext';

interface DashboardCategoryProps {
  category: Category;
}

const DashboardCategory = ({ category }: DashboardCategoryProps) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { addWidget, removeWidget } = useDashboard();

  const handleAddWidget = (widget: any) => {
    addWidget(category.id, widget);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">{category.name}</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAddModalOpen(true)}
          className="border-dashboard-accent text-dashboard-accent hover:bg-dashboard-accent/10"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Widget
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.widgets.map((widget) => (
          <DashboardWidget
            key={widget.id}
            widget={widget}
            categoryId={category.id}
            onRemove={removeWidget}
          />
        ))}
        
        <div 
          className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-dashboard-accent/50 hover:bg-dashboard-accent/5 transition-all duration-200 min-h-[120px]"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground font-medium">Add Widget</p>
        </div>
      </div>

      <AddWidgetModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onAddWidget={handleAddWidget}
        categoryName={category.name}
      />
    </div>
  );
};

export default DashboardCategory;