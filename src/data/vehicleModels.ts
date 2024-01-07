export interface VehicleModelsType {
    id: number
    code: string
    description: string
}

// ==============================|| DATA - USER TYPES ||============================== //

const vehicleModels: readonly VehicleModelsType[] = [
    { id: 0, code: "Motor", description: "Motor" }, 
];

export default vehicleModels;
