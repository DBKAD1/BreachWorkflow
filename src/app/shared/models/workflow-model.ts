
import { Deserializable } from "./deserializable.model";

export class WorkflowModel implements Deserializable {

    id: string;
    name: string;
    bpmnXml64: string;

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
