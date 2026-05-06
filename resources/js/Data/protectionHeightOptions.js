import img500 from "@/Assets/2-Up-and-over door - Steps/Step-1/Step-1-500.jpg";
import img1600 from "@/Assets/2-Up-and-over door - Steps/Step-1/Step-1-1.600.jpg";

export const protectionHeightOptions = [
  {
    value: "up-to-500mm",
    labelKey: "upAndOver.protection.options.upTo500.label",
    descriptionKey: "upAndOver.protection.options.upTo500.description",
    image: img500,
    cost: 0
  },
  {
    value: "over-500mm",
    labelKey: "upAndOver.protection.options.over500.label",
    descriptionKey: "upAndOver.protection.options.over500.description",
    image: img1600,
    cost: 300
  }
];