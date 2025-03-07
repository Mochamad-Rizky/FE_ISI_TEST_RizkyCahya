import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormAction,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormWrapper,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { selectBaseStyle } from '@/constants/select-style';
import { FetchQueryKey } from '@/enums/querykey-enum';
import {
  useCreateTask,
  useGetListTaskStatus,
} from '@/features/tasks/hooks/queries/tasks-query';
import {
  createTaskSchema,
  CreateTaskSchema,
} from '@/features/tasks/schemas/tasks-schema';
import { useGetListUsers } from '@/features/users/hooks/queries/users-query';
import { queryClient } from '@/providers/provider-query';
import { parseError } from '@/utils/parse-error';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { toast } from 'sonner';

export default function AddTaskForm() {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate, isPending } = useCreateTask();
  const { data: dataTaskStatuses } = useGetListTaskStatus({
    options: {
      enabled: isOpen,
    },
  });
  const { data: dataUsers } = useGetListUsers({
    options: {
      enabled: isOpen,
    },
  });

  const form = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema()),
    defaultValues: {
      title: '',
      description: '',
      assigneeIds: [],
      statusId: '',
    },
  });

  const onSubmit = async (data: CreateTaskSchema) => {
    await mutate(data, {
      onSuccess: async () => {
        toast.success('Task added successfully');
        await queryClient.invalidateQueries({
          queryKey: [FetchQueryKey.getListTask],
        });
        setIsOpen(false);
      },
      onError: (error) => {
        toast.error(parseError(error.response?.data));
      },
    });
  };

  useEffect(() => {
    if (!isOpen) {
      const reset = form.reset;
      reset();
    }
  }, [form.reset, isOpen]);

  return (
    <Dialog>
      <DialogTrigger onClick={() => setIsOpen(true)}>
        <DialogTitle>Add Task</DialogTitle>
      </DialogTrigger>
      <DialogContent isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            This is a form to add a new task
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <FormWrapper onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel isMandatory>Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Title' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel isMandatory>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder='Description' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='statusId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel isMandatory>Status</FormLabel>
                  <FormControl>
                    <Select
                      styles={selectBaseStyle}
                      placeholder='Select status'
                      options={
                        dataTaskStatuses?.data.statuses.map((status) => ({
                          value: status.id,
                          label: status.name,
                        })) || []
                      }
                      isMulti={false}
                      onChange={(option) => {
                        field.onChange(option?.value || '');
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='assigneeIds'
              render={({ field }) => (
                <FormItem>
                  <FormLabel isMandatory>Assignee</FormLabel>
                  <FormControl>
                    <Select
                      styles={selectBaseStyle}
                      placeholder='Select assignee'
                      options={
                        dataUsers?.data.users.map((user) => ({
                          value: user.id,
                          label: user.name,
                        })) || []
                      }
                      isMulti={true}
                      onChange={(options) => {
                        field.onChange(
                          options?.map((option) => option.value) || []
                        );
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormAction>
              <Button disabled={isPending}>
                {isPending ? 'Loading...' : 'Add Task'}
              </Button>
            </FormAction>
          </FormWrapper>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
