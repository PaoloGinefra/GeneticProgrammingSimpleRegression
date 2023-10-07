import OpNode from "./Nodes/OpNode";
import ConstantNode from "./Nodes/ConstantNode";
import BinaryNode from "./Nodes/BinaryNode";
import BinaryOperations from "./Nodes/BinaryOperation";

interface Individual_interface {
    fitness: number;
    root: OpNode;
    variable: ConstantNode;
    evaluate(x: number): number;
    mutate(): void;
}

export default class Individual implements Individual_interface {
    fitness: number;
    root: OpNode;
    variable: ConstantNode;

    constructor() {
        this.fitness = 0;
        this.variable = new ConstantNode(0, true);
        this.root = this.buildRandomTree(2);
    }

    evaluate(x: number): number {
        this.variable.load(x);
        return this.root.evaluate();
    }

    mutate(): void {
    }

    buildRandomTree(expectedDepth: number): OpNode {
        const k = 0.9
        const tau = 1.5104448922239067
        const p = 0.51 + k * Math.exp(-expectedDepth / tau)
        if (Math.random() < 1 / expectedDepth) {
            if (Math.random() < 0.5) return this.variable;
            return new ConstantNode((Math.random() - 0.5) * 2);
        }
        return new BinaryNode(
            this.buildRandomTree(expectedDepth),
            this.buildRandomTree(expectedDepth),
            Math.random() < 0.5 ? BinaryOperations.ADD : BinaryOperations.MULTIPLY
        );

    }

    static crossover(A: Individual, B: Individual): Individual {
        return new Individual();
    }
}