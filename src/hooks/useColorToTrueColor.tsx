export const ChangeColorToTrueColor = (color: string) => {
  switch (color) {
    case "black":
      return "#242329";
    case "red":
      return "#FF5659";
    case "blue":
      return "#3C00EE";
    case "yellow":
      return "#C1F961";
    case "green":
      return "#5ADE57";
    case "orange":
      return "#FF6601";
    case "lightblue":
      return "#4FC7FF";
    case "purple":
      return "#DD6EFF";
  }
};

export const ChangeColorToBackColor = (color: string) => {
  switch (color) {
    case "black":
      return "rgba(36, 35, 41, 0.2)";  
    case "red":
      return "rgba(255, 86, 89, 0.2)"; 
    case "blue":
      return "rgba(60, 0, 238, 0.2)";  
    case "yellow":
      return "rgba(193, 249, 97, 0.2)"; 
    case "green":
      return "rgba(90, 222, 87, 0.2)";  
    case "orange":
      return "rgba(255, 102, 1, 0.2)";  
    case "lightblue":
      return "rgba(79, 199, 255, 0.2)";  
    case "purple":
      return "rgba(221, 110, 255, 0.2)"; 
  }
};
