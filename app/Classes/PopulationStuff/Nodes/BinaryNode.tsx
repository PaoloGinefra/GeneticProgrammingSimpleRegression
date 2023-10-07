import OpNode from "./OpNode";
import { BinaryOperation } from "./BinaryOperation";

interface BinaryNode_interface {
    left: OpNode;
    right: OpNode;
    operation: BinaryOperation;
    evaluate(): number;
    mutate(): void;
}

export default class BinaryNode extends OpNode implements BinaryNode_interface {
    left: OpNode;
    right: OpNode;
    operation: BinaryOperation;

    constructor(left: OpNode, right: OpNode, operation: BinaryOperation) {
        super();
        this.left = left;
        this.right = right;
        this.operation = operation;
    }

    evaluate(): number {
        return 0;
    }

    mutate(): void {
    }
}