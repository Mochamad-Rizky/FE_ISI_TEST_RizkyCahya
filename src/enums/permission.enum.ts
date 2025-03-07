export namespace Permission {
  export enum lead {
    CreateTask = 'CreateTask',
    UpdateSpecificTask = 'UpdateSpecificTask',
    ViewTaskHistory = 'ViewTaskHistory',
  }

  export enum team {}
}

export enum PermissionRole {
  lead = 'lead',
  team = 'team',
}

type Values<T> = T[keyof T];
type NestedValues<T> = Values<{
  [K in keyof T]: T[K] extends object ? Values<T[K]> : T[K];
}>;

export type PermissionType = NestedValues<typeof Permission>;
