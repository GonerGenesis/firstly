import { type FieldOptions, type FieldValidator, type StringFieldOptions } from 'remult';
export declare function addValidator(validators: FieldOptions['validate'], newValidator: FieldOptions['validate'], atStart?: boolean): FieldValidator<any, any> | FieldValidator<any, any>[] | undefined;
export declare class KitFields {
    static string<entityType = unknown, valueType = string>(o?: StringFieldOptions<entityType, valueType> & FieldOptions<entityType, valueType>): import("remult").ClassFieldDecorator<entityType, valueType | undefined>;
    static currency<entityType = any, valueType = any>(o?: FieldOptions<entityType> & FieldOptions<entityType>): import("remult").ClassFieldDecorator<entityType, number | undefined>;
    static dateOnly<entityType = any>(o?: FieldOptions<entityType, Date>): import("remult").ClassFieldDecorator<entityType, Date | undefined>;
    static arrayEnum<enumType = any, entityType = any>(enumClass: enumType, o?: FieldOptions<entityType, any[]>): import("remult").ClassFieldDecorator<entityType, any[] | undefined>;
    static arrayEnumToGql<enumType = any, entityType = any>(enumClass: enumType, o?: FieldOptions<entityType, any[]>): import("remult").ClassFieldDecorator<entityType, any[] | undefined>;
    static arrayValueList<enumType = any, entityType = any>(enumClass: enumType, o?: FieldOptions<entityType, any[]>): import("remult").ClassFieldDecorator<entityType, any[] | undefined>;
}
