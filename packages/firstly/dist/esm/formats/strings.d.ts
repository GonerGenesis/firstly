export declare const formatNumber: (number: number, digitNumber?: number) => string;
export declare function displayPhone(_entity: any, value: string | undefined): string;
export declare const arrToStr: (arr: string | undefined | (string | undefined)[]) => string;
export declare const mask: (str: string | undefined) => string;
export declare const suffixWithS: (value: number, str: string) => string;
export declare const toTitleCase: (str: string) => string;
export declare const extractMailInfo: (mail: string, withThrow?: boolean) => {
    firstName: string;
    lastName: string;
    email: string;
};
