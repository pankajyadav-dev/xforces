import "next-auth/adapters"

declare module "next-auth/adapters"{
export interface AdapterUser extends BaseAdapterUser{
  isGoogleVerified?: boolean | null;
}
}