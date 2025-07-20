import { defineStore } from 'pinia';

// Mengembalikan semua rumus dari lampiran, kecuali Chave
export enum Equation {
  BrownDry = 'BrownDry',
  BrownMoist = 'BrownMoist',
  BrownWet = 'BrownWet',
  ShoreaLeprosula = 'ShoreaLeprosula',
  Dipterocarpus = 'Dipterocarpus',
  SwieteniaMacrophylla = 'SwieteniaMacrophylla',
  MangiferaIndica = 'MangiferaIndica',
  AcaciaMangium = 'AcaciaMangium',
}

export interface ProjectData {
  namaHutan: string;
  luasArea: number;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  desa: string;
  selectedMethod: 'sensus' | 'sampling';
  defaultClimate: Equation;
}

export interface Tree {
  id: number;
  name: string;
  species: string;
  circumference: number; // in cm
  height?: number; // in m, optional
  selectedEquation: Equation;
}

interface CalculationResults {
  totalBiomass: number;
  totalCarbon: number;
  detailedTreeResults: any[];
}

export const useCalculatorStore = defineStore('calculator', {
  state: () => ({
    projectData: null as ProjectData | null,
    trees: [] as Tree[],
    results: null as CalculationResults | null,
  }),
  actions: {
    setProjectData(data: ProjectData) {
      this.projectData = data;
      this.trees = [];
      this.addTree();
    },
    addTree() {
      const newTree: Tree = {
        id: Date.now() + Math.random(),
        name: '',
        species: '',
        circumference: 0,
        selectedEquation: this.projectData?.defaultClimate || Equation.BrownMoist,
      };
      this.trees.push(newTree);
    },
    removeTree(treeId: number) {
      if (this.trees.length > 1) {
        this.trees = this.trees.filter(tree => tree.id !== treeId);
      } else {
        alert('Minimal harus ada satu data pohon.');
      }
    },
    calculateResults() {
      if (!this.projectData || this.trees.length === 0) return;

      let totalCarbonKg = 0;
      const detailedTreeResults = [];

      for (const tree of this.trees) {
        if (tree.circumference <= 0) continue;
        
        const diameterCm = tree.circumference / Math.PI;

        let biomassKg = 0; // Ini adalah AGB (Above Ground Biomass)
        switch (tree.selectedEquation) {
            case Equation.BrownDry: biomassKg = 0.139 * Math.pow(diameterCm, 2.32); break;
            case Equation.BrownMoist: biomassKg = 0.118 * Math.pow(diameterCm, 2.53); break;
            case Equation.BrownWet: biomassKg = tree.height ? 0.037 * Math.pow(diameterCm, 1.89) * tree.height : 0; break;
            case Equation.ShoreaLeprosula: biomassKg = 0.096 * Math.pow(diameterCm, 2.604); break;
            case Equation.Dipterocarpus: biomassKg = 0.098 * Math.pow(diameterCm, 2.598); break;
            case Equation.SwieteniaMacrophylla: biomassKg = 0.117 * Math.pow(diameterCm, 2.573); break;
            case Equation.MangiferaIndica: biomassKg = 0.105 * Math.pow(diameterCm, 2.615); break;
            case Equation.AcaciaMangium: biomassKg = 0.109 * Math.pow(diameterCm, 2.587); break;
        }

        // Perhitungan BGB (Below Ground Biomass)
        const bgbKg = biomassKg * 0.26;
        
        // Perhitungan Total Biomassa per Pohon
        const totalBiomassPerTree = biomassKg + bgbKg;

        // Perhitungan Karbon per Pohon
        const carbonKg = totalBiomassPerTree * 0.47;

        totalCarbonKg += carbonKg;

        detailedTreeResults.push({
          name: tree.name || `Pohon #${tree.id.toFixed(0)}`,
          species: tree.species || 'N/A',
          circumference: tree.circumference,
          agb: biomassKg,
        });
      }
      
      const luasAreaHa = this.projectData.luasArea;
      // Menghitung Total Biomassa Keseluruhan (AGB+BGB) dari total karbon
      const totalBiomassAllTreesKg = totalCarbonKg / 0.47;

      let totalBiomassPerHa = 0; // Ton/Ha
      let totalCarbonPerHa = 0; // Ton/Ha

      if (this.projectData.selectedMethod === 'sensus' && luasAreaHa > 0) {
        totalBiomassPerHa = (totalBiomassAllTreesKg / 1000) / luasAreaHa;
        totalCarbonPerHa = (totalCarbonKg / 1000) / luasAreaHa;
      }
      
      this.results = {
        totalBiomass: totalBiomassPerHa,
        totalCarbon: totalCarbonPerHa,
        detailedTreeResults,
      };
    },
  },
});