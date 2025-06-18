
export const evaluateExpression = (firstValue: number, secondValue: number, operation: string): number => {
  switch (operation) {
    case '+':
      return firstValue + secondValue;
    case '-':
      return firstValue - secondValue;
    case '×':
      return firstValue * secondValue;
    case '÷':
      return secondValue !== 0 ? firstValue / secondValue : 0;
    default:
      return secondValue;
  }
};
