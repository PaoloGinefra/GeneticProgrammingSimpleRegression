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
        let fitness = 0;
        this.points.forEach(point => {
            fitness += Math.pow(individual.evaluate(point.x) - point.y, 2);
        });
        return fitness;
    }

}
