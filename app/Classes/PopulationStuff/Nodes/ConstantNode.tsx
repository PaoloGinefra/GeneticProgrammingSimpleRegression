import OpNode from "./OpNode";

interface ConstantNode_interface {
    value: number;
    isVariable: boolean;
    load(x: number): void;
    evaluate(): number;
    mutate(): void;
}

export default class ConstantNode extends OpNode implements ConstantNode_interface {
    value: number;
    isVariable: boolean = false;

    constructor(value: number, isVariable: boolean = false) {
        super();
        this.value = value;
        this.isVariable = isVariable;
    }

    load(x: number): void {
        this.value = x;
    }

    evaluate(): number {
        return this.value;
    }

    mutate(): void {
    }

    toString(): string {
        return this.isVariable ? "x" : "(" + this.value.toFixed(2).toString() + ")";
    }
}