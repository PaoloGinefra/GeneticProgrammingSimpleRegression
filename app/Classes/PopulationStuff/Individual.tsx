import OpNode from "./Nodes/OpNode";
import ConstantNode from "./Nodes/ConstantNode";

interface Individual_interface {
    fitness: number;
    root: OpNode;
    variable: ConstantNode;
    evaluate(x: number): number;
    mutate(): void;
    crossover(A: Individual, B: Individual): Individual;
}

export default class Individual {
    fitness: number;
    root: OpNode;
    variable: ConstantNode;

    constructor() {
        this.fitness = 0;
        this.root = new ConstantNode(0);
        this.variable = new ConstantNode(0);
    }

    evaluate(x: number): number {
        return 0;
    }

    mutate(): void {
    }

    static crossover(A: Individual, B: Individual): Individual {
        return new Individual();
    }
}