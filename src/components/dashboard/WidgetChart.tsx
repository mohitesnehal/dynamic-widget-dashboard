import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface WidgetChartProps {
  content: string;
  type: 'chart' | 'stats' | 'text';
}

const parseChartData = (content: string) => {
  // Parse different data formats from content
  const dataPoints: { name: string; value: number; color: string }[] = [];
  
  // Define colors for different statuses
  const colorMap: { [key: string]: string } = {
    'Connected': 'hsl(var(--dashboard-success))',
    'Not Connected': 'hsl(var(--dashboard-warning))',
    'Failed': 'hsl(var(--destructive))',
    'Warning': 'hsl(var(--dashboard-warning))',
    'Not Available': 'hsl(var(--muted-foreground))',
    'Passed': 'hsl(var(--dashboard-success))',
    'Critical': 'hsl(var(--destructive))',
    'High': 'hsl(var(--dashboard-warning))',
  };
  
  // Extract numbers and labels from content
  const patterns = [
    /(\w+(?:\s+\w+)*)\s*\((\d+)\)/g,
    /(\w+):\s*(\d+)/g
  ];
  
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const name = match[1].trim();
      const value = parseInt(match[2]);
      if (value > 0) {
        dataPoints.push({
          name,
          value,
          color: colorMap[name] || 'hsl(var(--dashboard-accent))'
        });
      }
    }
  }
  
  return dataPoints;
};

const WidgetChart = ({ content, type }: WidgetChartProps) => {
  if (content.includes('No Graph data available')) {
    return (
      <div className="h-24 flex items-center justify-center text-xs text-muted-foreground bg-muted/20 rounded">
        No Graph data available
      </div>
    );
  }

  const data = parseChartData(content);
  
  if (data.length === 0) {
    return (
      <div className="mt-4 h-20 bg-gradient-to-r from-dashboard-accent/5 to-dashboard-success/5 rounded flex items-center justify-center">
        <div className="text-xs text-muted-foreground">Chart visualization</div>
      </div>
    );
  }

  if (type === 'chart') {
    return (
      <div className="mt-4 h-32">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={50}
              innerRadius={20}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--surface))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
                fontSize: '12px'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '10px' }}
              iconSize={8}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // For stats type, show a simple bar representation
  return (
    <div className="mt-3 space-y-2">
      {data.slice(0, 3).map((item, index) => (
        <div key={index} className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">{item.name}</span>
            <span className="text-foreground font-medium">{item.value}</span>
          </div>
          <div className="w-full bg-surface-secondary rounded-full h-1.5">
            <div 
              className="h-1.5 rounded-full transition-all duration-500"
              style={{ 
                width: `${Math.min((item.value / Math.max(...data.map(d => d.value))) * 100, 100)}%`,
                backgroundColor: item.color
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WidgetChart;