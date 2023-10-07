import OpNode from "./Nodes/OpNode";
import ConstantNode from "./Nodes/ConstantNode";
import BinaryNode from "./Nodes/BinaryNode";
import BinaryOperations from "./Nodes/BinaryOperation";
import Population from "./Population";

interface Individual_interface {
    fitness: number;
    root: OpNode;
    evaluate(x: number): number;
    mutate(): void;
}

export default class Individual implements Individual_interface {
    fitness: number;
    root: OpNode;
    static variable = new ConstantNode(0, true);

    constructor() {
        this.fitness = 0;
        this.root = this.buildRandomTree(2);
    }

    static loadX(x: number): void {
        this.variable.load(x);
    }

    evaluate(x: number): number {
        Individual.loadX(x);
        return this.root.evaluate();
    }

    mutate(): void {
        if (Math.random() < Population.newRandomTreeProbability) {
            this.root = this.buildRandomTree(2);
            return;
        }
        this.root.mutate();

    }

    buildRandomTree(expectedDepth: number): OpNode {
        const k = 0.9
        const tau = 1.5104448922239067
        const p = 0.51 + k * Math.exp(-expectedDepth / tau)
        if (Math.random() < p) {
            if (Math.random() < Population.variableProbability) return Individual.variable;
            return new ConstantNode((Math.random() - 0.5) * 2);
        }
        return new BinaryNode(
            this.buildRandomTree(expectedDepth),
            this.buildRandomTree(expectedDepth),
            Math.random() < Population.sumProbability ? BinaryOperations.ADD : BinaryOperations.MULTIPLY
        );

    }

    static treeDeepCopy(root: OpNode): OpNode {
        if (root instanceof BinaryNode) {
            return new BinaryNode(Individual.treeDeepCopy(root.left), Individual.treeDeepCopy(root.right), root.operation);
        } else if (root instanceof ConstantNode) {
            return new ConstantNode(root.value, root.isVariable);
        }
        return new ConstantNode();
    }

    static crossover(A: Individual, B: Individual): Individual {
        function recursiveCrossover(Baby: OpNode, A: OpNode, B: OpNode) {
            if (A instanceof BinaryNode && B instanceof BinaryNode && Baby instanceof BinaryNode) {
                if (Math.random() < 0.5) {
                    Baby.left = Individual.treeDeepCopy(B.left);
                } else {
                    Baby.left = Individual.treeDeepCopy(A.right);
                }

                if (Math.random() < 0.5) {
                    Baby.right = Individual.treeDeepCopy(B.right);
                } else {
                    Baby.right = Individual.treeDeepCopy(A.right);
                }

                if (Baby.left instanceof BinaryNode)
                    recursiveCrossover(Baby.left, A.left, B.left);
                if (Baby.right instanceof BinaryNode)
                    recursiveCrossover(Baby.right, A.right, B.right);
            }
        }

        let newIndividual = new Individual();
        newIndividual.root = Individual.treeDeepCopy(A.root);
        recursiveCrossover(newIndividual.root, A.root, B.root);

        return newIndividual;
    }
}