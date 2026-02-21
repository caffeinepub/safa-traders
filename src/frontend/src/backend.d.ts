import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface SizeInfo {
    height: bigint;
    length: bigint;
    units: string;
    width: bigint;
}
export interface UserProfile {
    name: string;
    dealerContactNumber?: string;
    dealerLocation?: string;
    companyAddress?: string;
    profileType: ProfileType;
    companyRegistrationNumber?: string;
}
export interface QuotationRequest {
    requester: Principal;
    additionalNotes: string;
    contactPerson: string;
    siteAddress: string;
    email: string;
    siteType: string;
    timestamp: Time;
    companyName: string;
    phoneNumber: string;
    sizeInfo: Array<SizeInfo>;
}
export enum ProfileType {
    dealer = "dealer",
    company = "company"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addQuotationRequest(companyName: string, contactPerson: string, phoneNumber: string, email: string, siteType: string, siteAddress: string, sizeInfo: Array<SizeInfo>, additionalNotes: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllQuotationRequests(): Promise<Array<QuotationRequest>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCompanyProfile(): Promise<UserProfile | null>;
    getDealerProfile(): Promise<UserProfile | null>;
    getRequestsByRequester(requester: Principal): Promise<Array<QuotationRequest>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveCompanyProfile(name: string, address: string, registrationNumber: string): Promise<void>;
    saveDealerProfile(name: string, location: string, contactNumber: string): Promise<void>;
}
