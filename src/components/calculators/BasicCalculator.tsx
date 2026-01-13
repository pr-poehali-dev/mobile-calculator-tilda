import { useState } from 'react';
import { Button } from '@/components/ui/button';

const BasicCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(display);
    
    if (previousValue === null) {
      setPreviousValue(current);
    } else if (operation) {
      const result = calculate(previousValue, current, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }
    
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return a / b;
      default: return b;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const current = parseFloat(display);
      const result = calculate(previousValue, current, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
      setNewNumber(true);
    }
  };

  const CalcButton = ({ 
    value, 
    onClick, 
    className = '', 
    variant = 'default' 
  }: { 
    value: string; 
    onClick: () => void; 
    className?: string;
    variant?: 'default' | 'operator' | 'equals' | 'clear';
  }) => {
    const baseClass = 'h-16 text-xl font-semibold rounded-2xl shadow-lg transition-all active:scale-95';
    const variantClasses = {
      default: 'bg-white hover:bg-gray-50 text-gray-800',
      operator: 'bg-gradient-to-br from-[#667eea] to-[#764ba2] hover:from-[#5a6fd8] hover:to-[#6a4191] text-white',
      equals: 'bg-gradient-to-r from-[#f093fb] to-[#f5576c] hover:from-[#e083eb] hover:to-[#e5476c] text-white',
      clear: 'bg-red-500 hover:bg-red-600 text-white'
    };

    return (
      <Button
        onClick={onClick}
        className={`${baseClass} ${variantClasses[variant]} ${className}`}
      >
        {value}
      </Button>
    );
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-inner">
        <div className="text-right">
          <div className="text-gray-500 text-sm h-6 font-mono">
            {previousValue !== null && operation && `${previousValue} ${operation}`}
          </div>
          <div className="text-4xl md:text-5xl font-bold text-gray-800 font-mono break-all">
            {display}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <CalcButton value="C" onClick={handleClear} variant="clear" />
        <CalcButton value="⌫" onClick={handleBackspace} />
        <CalcButton value="÷" onClick={() => handleOperation('÷')} variant="operator" />
        <CalcButton value="×" onClick={() => handleOperation('×')} variant="operator" />
        
        <CalcButton value="7" onClick={() => handleNumber('7')} />
        <CalcButton value="8" onClick={() => handleNumber('8')} />
        <CalcButton value="9" onClick={() => handleNumber('9')} />
        <CalcButton value="-" onClick={() => handleOperation('-')} variant="operator" />
        
        <CalcButton value="4" onClick={() => handleNumber('4')} />
        <CalcButton value="5" onClick={() => handleNumber('5')} />
        <CalcButton value="6" onClick={() => handleNumber('6')} />
        <CalcButton value="+" onClick={() => handleOperation('+')} variant="operator" />
        
        <CalcButton value="1" onClick={() => handleNumber('1')} />
        <CalcButton value="2" onClick={() => handleNumber('2')} />
        <CalcButton value="3" onClick={() => handleNumber('3')} />
        <CalcButton value="=" onClick={handleEquals} variant="equals" className="row-span-2" />
        
        <CalcButton value="0" onClick={() => handleNumber('0')} className="col-span-2" />
        <CalcButton value="." onClick={handleDecimal} />
      </div>
    </div>
  );
};

export default BasicCalculator;
