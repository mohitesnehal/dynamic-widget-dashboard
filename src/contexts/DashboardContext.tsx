import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { DashboardData, Widget, Category } from '@/types/dashboard';
import { initialDashboardData } from '@/data/dashboardData';

type DashboardAction =
  | { type: 'ADD_WIDGET'; categoryId: string; widget: Widget }
  | { type: 'REMOVE_WIDGET'; categoryId: string; widgetId: string }
  | { type: 'ADD_CATEGORY'; category: Category }
  | { type: 'REMOVE_CATEGORY'; categoryId: string };

interface DashboardContextType {
  dashboard: DashboardData;
  addWidget: (categoryId: string, widget: Omit<Widget, 'id'>) => void;
  removeWidget: (categoryId: string, widgetId: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  removeCategory: (categoryId: string) => void;
  getAllWidgets: () => Widget[];
  searchWidgets: (query: string) => Widget[];
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

const dashboardReducer = (state: DashboardData, action: DashboardAction): DashboardData => {
  switch (action.type) {
    case 'ADD_WIDGET':
      return {
        ...state,
        categories: state.categories.map(category =>
          category.id === action.categoryId
            ? { ...category, widgets: [...category.widgets, action.widget] }
            : category
        )
      };
    case 'REMOVE_WIDGET':
      return {
        ...state,
        categories: state.categories.map(category =>
          category.id === action.categoryId
            ? { ...category, widgets: category.widgets.filter(widget => widget.id !== action.widgetId) }
            : category
        )
      };
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.category]
      };
    case 'REMOVE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(category => category.id !== action.categoryId)
      };
    default:
      return state;
  }
};

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dashboard, dispatch] = useReducer(dashboardReducer, initialDashboardData);

  const addWidget = (categoryId: string, widget: Omit<Widget, 'id'>) => {
    const newWidget: Widget = {
      ...widget,
      id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    dispatch({ type: 'ADD_WIDGET', categoryId, widget: newWidget });
  };

  const removeWidget = (categoryId: string, widgetId: string) => {
    dispatch({ type: 'REMOVE_WIDGET', categoryId, widgetId });
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: `category-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    dispatch({ type: 'ADD_CATEGORY', category: newCategory });
  };

  const removeCategory = (categoryId: string) => {
    dispatch({ type: 'REMOVE_CATEGORY', categoryId });
  };

  const getAllWidgets = (): Widget[] => {
    return dashboard.categories.flatMap(category => category.widgets);
  };

  const searchWidgets = (query: string): Widget[] => {
    const allWidgets = getAllWidgets();
    return allWidgets.filter(widget =>
      widget.name.toLowerCase().includes(query.toLowerCase()) ||
      widget.content.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <DashboardContext.Provider value={{
      dashboard,
      addWidget,
      removeWidget,
      addCategory,
      removeCategory,
      getAllWidgets,
      searchWidgets
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};