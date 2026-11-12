export type PollutionData = {
    id: number;
    title: string;
    typePollution: string;
    description: string;
    date: string;
    lieu: string;
    latitude: number;
    longitude: number;
    niveau?: number;
    photo?: string | null;
}

export type UserData = {
    id?: number;
    login: string;
    password?: string;
    passwordConfirm?: string;
    firstName: string;
    lastName: string;
    email: string;
}
