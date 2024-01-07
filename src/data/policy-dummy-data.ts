import { optionProps } from "types/data";

// Asset imports
import iconHome from "assets/images/customer/policy-widgets-home.png";
import iconLorry from "assets/images/customer/policy-widgets-lorry.png";
import iconMotorCar from "assets/images/customer/policy-widgets-motor-car.png";
import iconMotor from "assets/images/customer/policy-widgets-motor.png";
import iconMotorCycle from "assets/images/customer/policy-widgets-motorcycle.png";
import iconThreeWheeler from "assets/images/customer/policy-widgets-three-wheeler.png";
import iconTravel from "assets/images/customer/policy-widgets-travel.png";

export interface PolicyCategoryTypes extends optionProps {
    title?: string
    secondaryTitle?: string
    icon?: any
}

export interface PolicySubCategoryTypes extends optionProps {
    title?: string
    secondaryTitle?: string
    icon?: any
}

const policyCategories: PolicyCategoryTypes[] = [
    {
        id: 1,
        code: "MOTOR-COMPREHENSIVE",
        description: "Motor Comprehensive",
        title: "Motor",
        secondaryTitle: "Comprehensive",
        icon: iconMotor,
    },
    {
        id: 2,
        code: "MOTOR-THIRD-PARTY",
        description: "Motor Third Party",
        title: "Motor",
        secondaryTitle: "Third Party",
        icon: iconMotor,
    },
    {
        id: 3,
        code: "HOME",
        description: "HOME",
        title: "Home",
        secondaryTitle: "",
        icon: iconHome,
    },
    {
        id: 4,
        code: "TRAVEL",
        description: "Travel",
        title: "Travel",
        secondaryTitle: "",
        icon: iconTravel
    },
]

const policySubCategories: PolicySubCategoryTypes[] = [
    {
        id: 1,
        code: "MOTORCYCLE",
        description: "Motorcycle",
        title: "Motorcycle",
        secondaryTitle: "Premium  LKR 707.46",
        icon: iconMotorCycle,
    },
    {
        id: 2,
        code: "THREE-WHEELER",
        description: "Three Wheeler",
        title: "Three Wheeler",
        secondaryTitle: "Premium  LKR 1,251.14",
        icon: iconThreeWheeler,
    },
    {
        id: 3,
        code: "MOTOR-CAR",
        description: "Motor Car",
        title: "Motor Car",
        secondaryTitle: "Premium  LKR 1,251.14",
        icon: iconMotorCar,
    },
    {
        id: 4,
        code: "LORRY",
        description: "Lorry",
        title: "Lorry",
        secondaryTitle: "Premium  LKR 1,253.44",
        icon: iconLorry,
    },
]

export { policyCategories, policySubCategories };

