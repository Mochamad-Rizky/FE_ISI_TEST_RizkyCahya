export type Task = {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  creatorName: string;
  statusId: string;
  statusName: string;
  createdAt: string;
  updatedAt: string;
  assignees: TaskAssignee[];
};

export type TaskAssignee = {
  id: string;
  name: string;
  email: string;
  roleId: string;
  roleName: string;
  createdAt: string;
  updatedAt: string;
};

export type TaskHistory = {
  id: string;
  taskId: string;
  userId: string;
  userName: string;
  taskStatus: string;
  createdAt: string;
  updatedAt: string;
};

export type TaskStatus = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};
