import p5types from "p5";
import Individual from "../PopulationStuff/Individual";

interface Environment_interface {
    points: p5types.Vector[];
    computeFitness(individual: Individual): number;
}

export default class Environment implements Environment_interface {
    points: p5types.Vector[];

    constructor(points: p5types.Vector[]) {
        this.points = points;
    }

    computeFitness(individual: Individual): number {
        return 0;
    }

}
