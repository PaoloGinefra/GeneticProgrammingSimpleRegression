import Environment from "../EnviromentStuff/Enviroment";
import Individual from "./Individual";

interface Population_interface {
    populationSize: number;
    generation: number;
    mutationRate: number;
    tournamentSize: number;
    newIndividualsPerGeneration: number;
    individuals: Individual[];
    scoreIndividuals(env: Environment): void;
    tournamentSelection(): Individual;
    breeding(): void;
    sortIndividuals(): void;
    selection(): void;
    runGeneration(env: Environment): void;
}


class Population implements Population_interface {
    populationSize: number;
    generation: number;
    mutationRate: number;
    tournamentSize: number;
    newIndividualsPerGeneration: number;
    individuals: Individual[];

    constructor(populationSize: number, mutationRate: number, tournamentSize: number, newIndividualsPerGeneration: number) {
        this.populationSize = populationSize;
        this.generation = 0;
        this.mutationRate = mutationRate;
        this.tournamentSize = tournamentSize;
        this.newIndividualsPerGeneration = newIndividualsPerGeneration;
        this.individuals = [];
    }

    scoreIndividuals(env: Environment): void {

    }

    tournamentSelection(): Individual {
        return new Individual();
    }

    breeding(): void {

    }

    sortIndividuals(): void {
    }

    selection(): void {
    }

    runGeneration(env: Environment): void {
    }
}