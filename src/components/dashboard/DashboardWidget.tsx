import { Widget } from '@/types/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, TrendingUp, PieChart, BarChart3 } from 'lucide-react';
import WidgetChart from './WidgetChart';
import { cn } from '@/lib/utils';

interface DashboardWidgetProps {
  widget: Widget;
  categoryId: string;
  onRemove: (categoryId: string, widgetId: string) => void;
}

const DashboardWidget = ({ widget, categoryId, onRemove }: DashboardWidgetProps) => {
  const getIcon = () => {
    switch (widget.type) {
      case 'chart':
        return <PieChart className="h-4 w-4 text-dashboard-accent" />;
      case 'stats':
        return <TrendingUp className="h-4 w-4 text-dashboard-success" />;
      default:
        return <BarChart3 className="h-4 w-4 text-dashboard-info" />;
    }
  };

  const getContentStyle = () => {
    if (widget.content.includes('No Graph data available')) {
      return 'text-muted-foreground text-center py-8';
    }
    return 'text-foreground';
  };

  return (
    <Card className="group relative bg-surface border border-border hover:shadow-md transition-all duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {getIcon()}
          {widget.name}
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10 hover:text-destructive"
          onClick={() => onRemove(categoryId, widget.id)}
        >
          <X className="h-3 w-3" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className={cn("text-xs", getContentStyle())}>
          {widget.content}
        </div>
{/* 
        {widget.type === 'chart' && !widget.content.includes('No Graph data available') && (
          <div className="mt-4 h-20 bg-gradient-to-r from-dashboard-accent/5 to-dashboard-success/5 rounded flex items-center justify-center">
            <div className="text-xs text-muted-foreground">Chart visualization</div>
          </div>
        )}
        {widget.type === 'stats' && !widget.content.includes('No Graph data available') && (
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-foreground font-medium">75%</span>
            </div>
            <div className="w-full bg-surface-secondary rounded-full h-2">
              <div className="bg-gradient-to-r from-dashboard-accent to-dashboard-success h-2 rounded-full w-3/4"></div>
            </div>
          </div>
        )}
         */}
        <WidgetChart content={widget.content} type={widget.type} />
      </CardContent>
    </Card>
  );
};

export default DashboardWidget;