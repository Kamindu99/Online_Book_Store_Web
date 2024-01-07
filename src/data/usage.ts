export interface UsageType {
    id: number
    code: string
    description: string
}

// ==============================|| DATA - USER TYPES ||============================== //

const Usage: readonly UsageType[] = [
    { id: 0, code: "Private", description: "Private" },
    { id: 1, code: "Hiring", description: "Hiring" },
    { id: 2, code: "Rent", description: "Rent" }, 
];

export default Usage;
