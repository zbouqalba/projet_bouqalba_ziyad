export type PollutionData = {
    id: number;
    title: string;
    typePollution: string;
    description: string;
    date: string;
    lieu: string;
    latitude: number;
    longitude: number;
    photo?: string | null;
}

export type UserData = {
    login: string;
    password: string;
    passwordConfirm: string;
    firstName: string;
    lastName: string;
    email: string;
}