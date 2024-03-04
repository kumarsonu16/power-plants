import * as XLSX from 'xlsx';

interface Entry {
  plantName: string;
  netGeneration: number;
  federalState: string;
}

const parsePlantsData = () => {
  const workbook: XLSX.WorkBook = XLSX.readFile("eGRID2021_Data_File.xlsx");
  const sheetName: string = workbook.SheetNames[3]; // here index=3 is for Plant as per xlsx file
  const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
  const data: any[] = XLSX.utils.sheet_to_json(worksheet);

  const relevantData: Entry[] = data.slice(1).map((entry: any) => {
  return ({
    plantName: entry['Plant name'],
    netGeneration: parseFloat(entry['Plant annual net generation (MWh)'] || 0),
    federalState: entry['Plant state abbreviation']  
  })});
  return relevantData;
};

export const getPlants = async (topN:number = 10): Promise<any> => {
  const plants: Entry[] = parsePlantsData();
  const sortedByNetGeneration: Entry[] = plants.sort((a, b) => b.netGeneration - a.netGeneration);
  const topPlants: Entry[] = sortedByNetGeneration.slice(0, topN);
  return topPlants;
};

export const getPlantsListByState = async (state:string | undefined = undefined)=>{
    let plants: Entry[] = parsePlantsData();

    //Calculate net generation
    const totalNetGeneration: number = plants.reduce((acc, cur) => acc + cur.netGeneration, 0);

    // Filter plants by state if state is provided
    if (state) {
      plants = plants.filter(plant => plant.federalState.toLowerCase() === state.toLowerCase());
    }
    
    // Calculate total net generation and net generation by state in a single iteration
    const netGenerationByState: { [key: string]: { total: number } } = plants.reduce((acc: any, cur) => {
      acc[cur.federalState] = acc[cur.federalState] || { total: 0};
      acc[cur.federalState].total += cur.netGeneration;
      return acc;
    }, {});
    
    // Calculate percentage of net generation by federal state and format the data
    const plantDataByState = Object.entries(netGenerationByState).map(([state, { total }]) => ({
      state,
      netGeneration: total.toFixed(6),
      netPercentage: ((total / totalNetGeneration) * 100).toFixed(6)
    }));
    return plantDataByState; 
}