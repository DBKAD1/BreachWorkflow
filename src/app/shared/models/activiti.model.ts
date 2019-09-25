import { Deserializable } from "./deserializable.model";

export class Activiti implements Deserializable{
    id: string;
    url:string;
    key: string;
    version: number;
    name: string;
    description: string;
    tenantId: string;
    deploymentId: 1;
    deploymentUrl:string;
    resource: string;
    diagramResource: string;
    category: string;
    graphicalNotationDefined: boolean;
    suspended: boolean;
    startFormDefined: boolean;
    
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}

