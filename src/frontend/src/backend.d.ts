import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface Submission {
    city?: string;
    name: string;
    email: string;
    message: string;
    timestamp: Timestamp;
    phone: string;
}
export type SubmissionId = bigint;
export interface backendInterface {
    getAllSubmissions(): Promise<Array<Submission>>;
    submitContactForm(name: string, email: string, phone: string, message: string, city: string | null): Promise<SubmissionId>;
}
