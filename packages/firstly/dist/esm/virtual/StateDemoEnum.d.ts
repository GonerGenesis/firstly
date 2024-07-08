import { KitBaseEnum } from '../KitBaseEnum';
import type { KitBaseEnumOptions } from '../KitBaseEnum';
import '../ui/LibIcon';
export declare class StateDemoEnum extends KitBaseEnum {
    static CHECK: StateDemoEnum;
    static EDIT: StateDemoEnum;
    static DELETE: StateDemoEnum;
    constructor(id: string, options?: KitBaseEnumOptions<StateDemoEnum>);
}
