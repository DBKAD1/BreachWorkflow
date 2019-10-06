
import { Deserializable } from "./deserializable.model";
import { Activiti } from "./activiti.model"
import { from } from "rxjs";

export class AtivitiResponse implements Deserializable {
    data: Activiti[]
    order: string
    size: number
    sort: string
    start: number
    total: number
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
