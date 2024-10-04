export const getCategoryColor = (categoryName: string) => {
  switch (categoryName.toLowerCase()) {
    case "work":
      return "#de1256";
    case "personal":
      return "#2196f3";
    case "shopping":
      return "#e33fe2";
    case "travel planning":
      return "#ec76eb";
    case "health & fitness":
      return "#7a0cd5";
    default:
      return "#25b6ca";
  }
};
