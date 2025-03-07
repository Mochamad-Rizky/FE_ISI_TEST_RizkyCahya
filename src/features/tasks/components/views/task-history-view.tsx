import { Alert, AlertTitle } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { globalMessage } from '@/constants/message';
import { useGetListTaskHistory } from '@/features/tasks/hooks/queries/tasks-query';
import { Task, TaskHistory } from '@/features/tasks/types/tasks-type';
import { parseError } from '@/utils/parse-error';
import { Fragment, useState } from 'react';

type TaskHistoryViewProps = {
  taskData: Task;
};

export default function TaskHistoryView({ taskData }: TaskHistoryViewProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isFetching, data, isError, error } = useGetListTaskHistory({
    taskId: taskData.id,
    options: {
      enabled: isOpen,
    },
  });

  return (
    <Dialog>
      <DialogTrigger size='sm' onClick={() => setIsOpen(true)}>
        History
      </DialogTrigger>
      <DialogContent isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DialogHeader>
          <DialogTitle>History Activity Task</DialogTitle>
          <DialogDescription>
            This is a form to see history activity task
          </DialogDescription>
        </DialogHeader>

        {isFetching && (
          <div className='space-y-4'>
            {[...Array(3)].map((_, index) => (
              <Skeleton className='h-[150px]' key={index} />
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
            {data.data.histories.length === 0 && (
              <Alert variant='info'>
                <AlertTitle>No tasks found</AlertTitle>
              </Alert>
            )}
          </Fragment>
        )}

        {!isError && !isFetching && data && (
          <div className='mt-4 space-y-4'>
            {data.data.histories.map((history: TaskHistory) => (
              <Card
                key={history.id}
                className='p-4 transition-shadow hover:shadow-md'
              >
                <div className='flex items-start justify-between'>
                  <div>
                    <div className='text-base font-medium'>
                      {history.userName}
                    </div>
                    <div className='text-muted-foreground mt-1 text-sm'>
                      Changed status to{' '}
                      <span className='font-semibold'>
                        {history.taskStatus}
                      </span>
                    </div>
                  </div>
                  <div className='text-muted-foreground text-xs'>
                    {new Date(history.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className='text-muted-foreground mt-2 text-xs'>
                  Task ID: {history.taskId}
                </div>
              </Card>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
