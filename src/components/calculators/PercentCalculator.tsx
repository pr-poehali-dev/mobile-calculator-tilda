import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

const PercentCalculator = () => {
  const [amount, setAmount] = useState('');
  const [percent, setPercent] = useState('');
  const [vatRate, setVatRate] = useState('20');

  const calculatePercent = () => {
    const a = parseFloat(amount);
    const p = parseFloat(percent);
    if (isNaN(a) || isNaN(p)) return 0;
    return (a * p) / 100;
  };

  const calculateVatAdd = () => {
    const a = parseFloat(amount);
    const v = parseFloat(vatRate);
    if (isNaN(a) || isNaN(v)) return 0;
    return a * (1 + v / 100);
  };

  const calculateVatExtract = () => {
    const a = parseFloat(amount);
    const v = parseFloat(vatRate);
    if (isNaN(a) || isNaN(v)) return 0;
    return a / (1 + v / 100);
  };

  const ResultCard = ({ title, value, subtitle }: { title: string; value: number; subtitle?: string }) => (
    <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-none shadow-md">
      <div className="text-sm text-gray-600 mb-1">{title}</div>
      <div className="text-2xl font-bold text-gray-800 font-mono">
        {value.toLocaleString('ru-RU', { maximumFractionDigits: 2 })}
      </div>
      {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="percent-amount" className="text-base font-semibold">
            Расчёт процентов
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Input
                id="percent-amount"
                type="number"
                placeholder="Сумма"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-12 text-lg rounded-xl shadow-sm"
              />
            </div>
            <div>
              <Input
                type="number"
                placeholder="Процент"
                value={percent}
                onChange={(e) => setPercent(e.target.value)}
                className="h-12 text-lg rounded-xl shadow-sm"
              />
            </div>
          </div>
        </div>

        {amount && percent && (
          <div className="grid grid-cols-2 gap-3 animate-fade-in">
            <ResultCard 
              title="Результат" 
              value={calculatePercent()}
              subtitle={`${percent}% от ${amount}`}
            />
            <ResultCard 
              title="С учётом процента" 
              value={parseFloat(amount) + calculatePercent()}
              subtitle={`${amount} + ${percent}%`}
            />
          </div>
        )}
      </div>

      <div className="border-t pt-6">
        <div className="space-y-4">
          <Label htmlFor="vat-amount" className="text-base font-semibold">
            Расчёт НДС
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <Input
              id="vat-amount"
              type="number"
              placeholder="Сумма"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="h-12 text-lg rounded-xl shadow-sm"
            />
            <div className="flex gap-2">
              {['10', '20'].map((rate) => (
                <Button
                  key={rate}
                  onClick={() => setVatRate(rate)}
                  variant={vatRate === rate ? 'default' : 'outline'}
                  className={`flex-1 h-12 rounded-xl font-semibold transition-all ${
                    vatRate === rate 
                      ? 'bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white shadow-md' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {rate}%
                </Button>
              ))}
            </div>
          </div>
        </div>

        {amount && (
          <div className="grid grid-cols-2 gap-3 mt-4 animate-fade-in">
            <ResultCard 
              title="Добавить НДС" 
              value={calculateVatAdd()}
              subtitle={`+${vatRate}% НДС`}
            />
            <ResultCard 
              title="Выделить НДС" 
              value={calculateVatExtract()}
              subtitle={`Без НДС (${vatRate}%)`}
            />
            <Card className="col-span-2 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-none shadow-md">
              <div className="text-sm text-gray-600 mb-1">Сумма НДС</div>
              <div className="text-2xl font-bold text-gray-800 font-mono">
                {(parseFloat(amount) - calculateVatExtract()).toLocaleString('ru-RU', { maximumFractionDigits: 2 })}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default PercentCalculator;
