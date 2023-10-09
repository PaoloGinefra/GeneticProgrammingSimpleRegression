import Environment from "../EnviromentStuff/Enviroment";
import Individual from "./Individual";

interface Population_interface {
    populationSize: number;
    generation: number;
    individuals: Individual[];
    scoreIndividuals(env: Environment): void;
    tournamentSelection(): Individual;
    breeding(): void;
    sortIndividuals(): void;
    selection(): void;
    runGeneration(env: Environment): void;
}


export default class Population implements Population_interface {
    populationSize: number;
    generation: number;
    static mutationRate = 0.1;
    static variableProbability = 0.5;
    static sumProbability = 0.5;
    static addNodeProbability = 0.1;
    static variableConstantSwitchProbability = 0.1;
    static newIndividualsPerGeneration = 30;
    static newRandomTreeProbability = 0.01;
    static tournamentSize = 4;
    static constantMutationStep = 0.01;
    individuals: Individual[];

    constructor(populationSize: number) {
        this.populationSize = populationSize;
        this.generation = 0;
        this.individuals = [];
        for (let i = 0; i < this.populationSize; i++) {
            this.individuals.push(new Individual());
        }
    }

    scoreIndividuals(env: Environment): void {
        this.individuals.forEach(individual => {
            individual.fitness = env.computeFitness(individual);
        });
    }

    tournamentSelection(): Individual {
        //choose random individuals
        let tournament = [];
        for (let i = 0; i < Population.tournamentSize; i++) {
            tournament.push(this.individuals[Math.floor(Math.random() * this.individuals.length)]);
        }
        //sort them
        tournament.sort((a, b) => a.fitness - b.fitness);

        //return the best one
        return tournament[0];
    }

    breeding(): void {
        let newIndividuals = [];
        for (let i = 0; i < Population.newIndividualsPerGeneration; i++) {
            let parent1 = this.tournamentSelection();
            let parent2 = this.tournamentSelection();
            let child = Individual.crossover(parent1, parent2);
            child.mutate();
            newIndividuals.push(child);
        }
        this.individuals = this.individuals.concat(newIndividuals);
    }

    sortIndividuals(): void {
        this.individuals.sort(() => Math.random() - 0.5);
        this.individuals.sort((a, b) => a.fitness - b.fitness);
    }

    selection(): void {
        this.sortIndividuals();
        this.individuals = this.individuals.slice(0, this.populationSize);
    }

    runGeneration(env: Environment): void {
        this.breeding();
        this.scoreIndividuals(env);
        this.selection();
        this.generation++;
    }
}