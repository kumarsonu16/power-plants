import { Request, Response } from "express";
import {
  getPlants,
  getPlantsListByState
} from "./plantService";

export const getTopPlants = async (req: Request,res: Response): Promise<any> => {
  const method = `palnt/controller/getTopPlants`;
  try {
    const plants = await getPlants(parseInt(req.params.topN));

    // If there are no plants, return a 204 response
    if (!plants || plants.length === 0) {
      return res.status(204).json({ message: "No plants found" });
    }
    return res.status(200).json(plants);
  } catch (error) {
    console.error(`${method} - error `, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPlantsOfstate = async (req: Request,res: Response): Promise<any> => {
  const method = `palnt/controller/getPlantsOfstate`;
  try {
    const plant = await getPlantsListByState(req.params.state);
    if (!plant) {
      return res.status(204).json({ message: "No plant found" });
    }
    return res.status(200).json(plant);
  } catch (error) {
    console.error(`${method} - error `, error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getPlantsByState = async (req: Request,res: Response): Promise<any> => {
 const method = `palnt/controller/getPlantsByState`;
  try {
    const plants = await getPlantsListByState();
    if (!plants || plants.length === 0) {
      return res.status(204).json({ message: "No plants found" });
    }
    return res.status(200).json(plants);
  } catch (error) {
    console.error(`${method} - error `, error);
    return res.status(500).json({ message: "Internal server error" });
  }
};