import OpNode from "./OpNode";

export interface BinaryOperation {
    neutralElement: number;
    evaluate: (A: OpNode, B: OpNode) => number;
    symbol: string;
}

const BinaryOperations: { [key: string]: BinaryOperation } = {
    ADD: {
        neutralElement: 0,
        evaluate: function (A: OpNode, B: OpNode) { return A.evaluate() + B.evaluate() },
        symbol: "+"
    },
    MULTIPLY: {
        neutralElement: 1,
        evaluate: function (A: OpNode, B: OpNode) { return A.evaluate() * B.evaluate() },
        symbol: "*"
    },
}

export default BinaryOperations;