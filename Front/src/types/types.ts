export type PollutionData = {
    id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type UserData = {
    login: string;
    password: string;
    passwordConfirm: string;
    firstName: string;
    lastName: string;
    email: string;
}