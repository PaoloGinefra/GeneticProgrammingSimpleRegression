interface Node_interface {
    evaluate(): number;
    mutate(): void;
}

export default class OpNode implements Node_interface {
    evaluate(): number {
        return 0;
    }

    mutate(): void {
    }
}