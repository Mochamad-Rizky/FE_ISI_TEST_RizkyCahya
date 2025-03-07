'use client';

import CheckAccessPermission from '@/components/check-permission';
import { Alert, AlertTitle } from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { globalMessage } from '@/constants/message';
import { Permission } from '@/enums/permission.enum';
import AddTaskForm from '@/features/tasks/components/forms/add-task-form';
import UpdateTaskForm from '@/features/tasks/components/forms/update-task-form';
import TaskHistoryView from '@/features/tasks/components/views/task-history-view';
import { useGetListTask } from '@/features/tasks/hooks/queries/tasks-query';
import { parseError } from '@/utils/parse-error';
import { Fragment } from 'react';

export default function ListTaskView() {
  const { isFetching, data, isError, error } = useGetListTask();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>List Task</h2>
        </CardTitle>
        <CardDescription>This is a list of tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <CheckAccessPermission permissions={[Permission.lead.CreateTask]}>
          <div className='mb-5 flex justify-end'>
            <AddTaskForm />
          </div>
        </CheckAccessPermission>
        {isFetching && (
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {[...Array(8)].map((_, index) => (
              <Skeleton className='h-[200px]' key={index} />
            ))}
          </div>
        )}

        {isError && !isFetching && (
          <Alert variant='destructive'>
            <AlertTitle>
              {parseError(error?.response?.data) ||
                globalMessage.somethingWentWrong}
            </AlertTitle>
          </Alert>
        )}

        {!isError && !isFetching && data && (
          <Fragment>
            {data.data.tasks.length === 0 && (
              <Alert variant='info'>
                <AlertTitle>No tasks found</AlertTitle>
              </Alert>
            )}
          </Fragment>
        )}

        {!isError && !isFetching && data && (
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {data.data.tasks.map((task) => (
              <Card key={task.id} className='overflow-hidden'>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-lg font-medium'>
                    {task.title}
                  </CardTitle>
                  <div className='text-muted-foreground flex items-center gap-2 text-sm'>
                    <span className='rounded-full bg-blue-100 px-2 py-0.5 text-blue-800'>
                      {task.statusName}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className='pb-4'>
                  <p className='mb-3 line-clamp-3 text-sm'>
                    {task.description}
                  </p>

                  <div className='text-muted-foreground mb-3 text-xs'>
                    <p>Created by: {task.creatorName}</p>
                    <p>
                      Created: {new Date(task.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {task.assignees?.length > 0 && (
                    <div className='mb-4'>
                      <p className='mb-1 text-xs font-medium'>Assignees:</p>
                      <div className='flex flex-wrap gap-1'>
                        {task.assignees.map((assignee) => (
                          <span
                            key={assignee.id}
                            className='rounded bg-gray-100 px-2 py-1 text-xs text-gray-800'
                          >
                            {assignee.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className='mt-2 flex justify-end gap-2'>
                    <UpdateTaskForm taskData={task} />
                    <TaskHistoryView taskData={task} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
