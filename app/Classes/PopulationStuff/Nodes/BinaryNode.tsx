import OpNode from "./OpNode";
import { BinaryOperation } from "./BinaryOperation";
import Population from "../Population";
import BinaryOperations from "./BinaryOperation";
import ConstantNode from "./ConstantNode";
import Individual from "../Individual";

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
        return this.operation.evaluate(this.left, this.right);
    }

    mutate(): void {
        if (Math.random() < Population.addNodeProbability) {
            let operation = Math.random() < Population.sumProbability ? BinaryOperations.ADD : BinaryOperations.MULTIPLY;
            let neutral = new ConstantNode(operation.neutralElement);
            if (Math.random() < 0.5) {
                this.left = new BinaryNode(this.left, neutral, operation);
            } else {
                this.right = new BinaryNode(this.right, neutral, operation);
            }
        }

        if (this.left instanceof ConstantNode && Math.random() < Population.variableConstantSwitchProbability) {
            this.left = this.left.isVariable ? new ConstantNode() : Individual.variable;
        }

        if (this.right instanceof ConstantNode && Math.random() < Population.variableConstantSwitchProbability) {
            this.right = this.right.isVariable ? new ConstantNode() : Individual.variable;
        }

        this.left.mutate();
        this.right.mutate();
    }

    toString(): string {
        return `(${this.left.toString()} ${this.operation.symbol} ${this.right.toString()})`;
    }

    getDegree(): number {
        return this.operation.degreeOperation(this.left.getDegree(), this.right.getDegree());
    }
}