import CheckAccessPermission from '@/components/check-permission';
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
import { Permission } from '@/enums/permission.enum';
import { FetchQueryKey } from '@/enums/querykey-enum';
import {
  useGetListTaskStatus,
  useUpdateTask,
} from '@/features/tasks/hooks/queries/tasks-query';
import {
  updateTaskSchema,
  UpdateTaskSchema,
} from '@/features/tasks/schemas/tasks-schema';
import { Task } from '@/features/tasks/types/tasks-type';
import { useGetListUsers } from '@/features/users/hooks/users-query';
import { queryClient } from '@/providers/provider-query';
import { parseError } from '@/utils/parse-error';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { toast } from 'sonner';

type UpdateTaskFormProps = {
  taskData: Task;
};

export default function UpdateTaskForm({ taskData }: UpdateTaskFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();

  const { mutate, isPending } = useUpdateTask();
  const { data: dataTaskStatuses } = useGetListTaskStatus({
    options: {
      enabled: isOpen,
    },
  });
  const { data: dataUsers } = useGetListUsers({
    options: {
      enabled: session.data?.user.user.roleName === 'lead' && isOpen,
    },
  });

  const form = useForm<UpdateTaskSchema>({
    resolver: zodResolver(updateTaskSchema(session.data?.user.user.roleName)),
    defaultValues: {
      description: taskData.description,
      statusId: taskData.statusId,
      ...(session.data?.user.user.roleName === 'lead' && {
        assigneeIds: taskData.assignees.map((assignee) => assignee.id),
      }),
      ...(session.data?.user.user.roleName === 'lead' && {
        title: taskData.title,
      }),
    },
  });

  const onSubmit = async (data: UpdateTaskSchema) => {
    await mutate(
      {
        taskId: taskData.id,
        data,
      },
      {
        onSuccess: async () => {
          toast.success('Task update successfully');
          await queryClient.invalidateQueries({
            queryKey: [FetchQueryKey.getListTask],
          });
          setIsOpen(false);
        },
        onError: (error) => {
          toast.error(parseError(error.response?.data));
        },
      }
    );
  };

  useEffect(() => {
    if (!isOpen) {
      const reset = form.reset;
      reset();
    }
  }, [form.reset, isOpen]);

  return (
    <Dialog>
      <DialogTrigger size='sm' onClick={() => setIsOpen(true)}>
        Edit
      </DialogTrigger>
      <DialogContent isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
          <DialogDescription>This is a form to update atask</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <FormWrapper onSubmit={form.handleSubmit(onSubmit)}>
            <CheckAccessPermission
              permissions={[Permission.lead.UpdateSpecificTask]}
            >
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel isMandatory>Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value as string}
                        placeholder='Title'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CheckAccessPermission>

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
                      defaultValue={{
                        value: taskData.statusId,
                        label: taskData.statusName,
                      }}
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

            <CheckAccessPermission
              permissions={[Permission.lead.UpdateSpecificTask]}
            >
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
                        defaultValue={taskData?.assignees.map((status) => ({
                          value: status.id,
                          label: status.name,
                        }))}
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
            </CheckAccessPermission>

            <FormAction>
              <Button disabled={isPending}>
                {isPending ? 'Loading...' : 'Update Task'}
              </Button>
            </FormAction>
          </FormWrapper>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
