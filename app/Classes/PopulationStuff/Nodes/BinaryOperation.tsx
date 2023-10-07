import OpNode from "./OpNode";

export interface BinaryOperation {
    nutralElement: number;
    evaluate: (A: OpNode, B: OpNode) => number;
}

const BinaryOperations: { [key: string]: BinaryOperation } = {
    ADD: {
        nutralElement: 0,
        evaluate: function (A: OpNode, B: OpNode) { return A.evaluate() + B.evaluate() }
    },
    MULTIPLY: {
        nutralElement: 1,
        evaluate: function (A: OpNode, B: OpNode) { return A.evaluate() * B.evaluate() }
    },
}

export default BinaryOperations;