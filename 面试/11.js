function add (num1, num2) {
  const num1DIgInt = (num1.toString().split('.')[1]).length;
  const num2DIgInt = (num2.toString().split('.')[1]).length;
  const baseNum = Math.pow(Math.max(num1DIgInt, num2DIgInt));
  return (num1 * baseNum + num2 * baseNum) / baseNum;
}