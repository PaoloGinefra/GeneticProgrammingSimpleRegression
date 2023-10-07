import OpNode from "./OpNode";

interface ConstantNode_interface {
    value: number;
    load(x: number): void;
    evaluate(): number;
    mutate(): void;
}

export default class ConstantNode extends OpNode implements ConstantNode_interface {
    value: number;

    constructor(value: number) {
        super();
        this.value = value;
    }

    load(x: number): void {
        this.value = x;
    }

    evaluate(): number {
        return this.value;
    }

    mutate(): void {
    }
}