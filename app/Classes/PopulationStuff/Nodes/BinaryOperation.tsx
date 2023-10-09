import OpNode from "./OpNode";

export interface BinaryOperation {
    neutralElement: number;
    evaluate: (A: OpNode, B: OpNode) => number;
    symbol: string;
    degreeOperation: (A: number, B: number) => number;
}

const BinaryOperations: { [key: string]: BinaryOperation } = {
    ADD: {
        neutralElement: 0,
        evaluate: function (A: OpNode, B: OpNode) { return A.evaluate() + B.evaluate() },
        symbol: "+",
        degreeOperation: function (A: number, B: number) { return Math.max(A, B) }
    },
    MULTIPLY: {
        neutralElement: 1,
        evaluate: function (A: OpNode, B: OpNode) { return A.evaluate() * B.evaluate() },
        symbol: "*",
        degreeOperation: function (A: number, B: number) { return A + B }
    },
}

export default BinaryOperations;