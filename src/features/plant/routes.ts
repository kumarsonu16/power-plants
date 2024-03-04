import { checkSearchParams } from "./validation";
import {
  getPlantsByState,
  getTopPlants,
  getPlantsOfstate
} from "./plantController";

export default [
  {
    path: "/api/v1/power-plants/states/:state",
    method: "get",
    handler: [
      //checkSearchParams /*We can chain things like checking authorization, add caching and many more */
      getPlantsOfstate,
    ],
  },
  {
    path: "/api/v1/power-plants/states",
    method: "get",
    handler: [
      getPlantsByState,
    ],
  },
  {
    path: "/api/v1/power-plants/top/:topN",
    method: "get",
    handler: [
      getTopPlants,
    ],
  },
  
];
