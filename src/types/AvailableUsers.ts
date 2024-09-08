export interface AvailableUsersProps {
  id: number;
  start_hour: string;
  end_hour: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  UserId: number;
  WorkTypeId: number;
  users: {
    id: number;
    name: string;
    email: string;
    isProvider: boolean;
    createdAt: string;
    updatedAt: string;
  };
  workTypes: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
}