export type Priority = 'low' | 'medium' | 'high';
export type ColumnId = 'backlog' | 'in-progress' | 'review' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: ColumnId;
  priority: Priority;
  tags: string[];
  assignee?: string;
  createdAt: string;
}

export interface Column {
  id: ColumnId;
  title: string;
  color: string;
}
