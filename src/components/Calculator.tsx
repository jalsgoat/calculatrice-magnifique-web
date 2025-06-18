
import React, { useState } from 'react';
import CalculatorButton from './CalculatorButton';
import { evaluateExpression } from '@/utils/calculator';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<string>('');
  const [operation, setOperation] = useState<string>('');
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === '') {
      setPreviousValue(display);
    } else if (operation) {
      const currentValue = parseFloat(previousValue);
      const newValue = evaluateExpression(currentValue, inputValue, operation);
      
      setDisplay(String(newValue));
      setPreviousValue(String(newValue));
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = () => {
    const inputValue = parseFloat(display);
    const currentValue = parseFloat(previousValue);

    if (previousValue && operation) {
      const newValue = evaluateExpression(currentValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue('');
      setOperation('');
      setWaitingForNewValue(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue('');
    setOperation('');
    setWaitingForNewValue(false);
  };

  const deleteLast = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">
      {/* Display */}
      <div className="bg-black/50 rounded-2xl p-6 mb-6 min-h-[100px] flex items-end justify-end">
        <div className="text-right">
          {previousValue && operation && (
            <div className="text-purple-300 text-sm mb-1">
              {previousValue} {operation}
            </div>
          )}
          <div className="text-white text-4xl font-light tracking-wide break-words">
            {display}
          </div>
        </div>
      </div>

      {/* Buttons Grid */}
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <CalculatorButton 
          onClick={clear} 
          className="bg-gradient-to-b from-red-500 to-red-600 hover:from-red-400 hover:to-red-500"
          span={2}
        >
          AC
        </CalculatorButton>
        <CalculatorButton 
          onClick={deleteLast}
          className="bg-gradient-to-b from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500"
        >
          ⌫
        </CalculatorButton>
        <CalculatorButton 
          onClick={() => inputOperation('÷')}
          className="bg-gradient-to-b from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500"
        >
          ÷
        </CalculatorButton>

        {/* Row 2 */}
        <CalculatorButton onClick={() => inputNumber('7')}>7</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('8')}>8</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('9')}>9</CalculatorButton>
        <CalculatorButton 
          onClick={() => inputOperation('×')}
          className="bg-gradient-to-b from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500"
        >
          ×
        </CalculatorButton>

        {/* Row 3 */}
        <CalculatorButton onClick={() => inputNumber('4')}>4</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('5')}>5</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('6')}>6</CalculatorButton>
        <CalculatorButton 
          onClick={() => inputOperation('-')}
          className="bg-gradient-to-b from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500"
        >
          -
        </CalculatorButton>

        {/* Row 4 */}
        <CalculatorButton onClick={() => inputNumber('1')}>1</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('2')}>2</CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('3')}>3</CalculatorButton>
        <CalculatorButton 
          onClick={() => inputOperation('+')}
          className="bg-gradient-to-b from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500"
        >
          +
        </CalculatorButton>

        {/* Row 5 */}
        <CalculatorButton 
          onClick={() => inputNumber('0')} 
          span={2}
        >
          0
        </CalculatorButton>
        <CalculatorButton onClick={inputDecimal}>.</CalculatorButton>
        <CalculatorButton 
          onClick={calculate}
          className="bg-gradient-to-b from-green-500 to-green-600 hover:from-green-400 hover:to-green-500"
        >
          =
        </CalculatorButton>
      </div>
    </div>
  );
};

export default Calculator;
