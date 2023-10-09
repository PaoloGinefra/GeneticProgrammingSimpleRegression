import Population from "../Population";
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

    constructor(value: (number | undefined) = undefined, isVariable: boolean = false) {
        super();
        this.value = value === undefined ? (Math.random() - 0.5) * 2 : value;
        this.isVariable = isVariable;
    }

    load(x: number): void {
        this.value = x;
    }

    evaluate(): number {
        return this.value;
    }

    mutate(): void {
        if (Math.random() < Population.mutationRate)
            if (!this.isVariable)
                this.value += (Math.random() - 0.5) * 2 * Population.constantMutationStep;
    }

    toString(): string {
        return this.isVariable ? "x" : "(" + this.value.toFixed(2).toString() + ")";
    }

    getDegree(): number {
        return this.isVariable ? 1 : 0;
    }
}