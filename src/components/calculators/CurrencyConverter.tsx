import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ExchangeRates {
  USD: number;
  EUR: number;
  RUB: number;
}

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('1000');
  const [fromCurrency, setFromCurrency] = useState<keyof ExchangeRates>('RUB');
  const [toCurrency, setToCurrency] = useState<keyof ExchangeRates>('USD');
  
  const [rates] = useState<ExchangeRates>({
    USD: 1,
    EUR: 0.92,
    RUB: 95.5
  });

  const currencies = [
    { code: 'USD', symbol: '$', name: 'Доллар США', flag: '🇺🇸' },
    { code: 'EUR', symbol: '€', name: 'Евро', flag: '🇪🇺' },
    { code: 'RUB', symbol: '₽', name: 'Российский рубль', flag: '🇷🇺' }
  ];

  const convert = () => {
    const value = parseFloat(amount);
    if (isNaN(value)) return 0;
    
    const inUSD = value / rates[fromCurrency];
    const result = inUSD * rates[toCurrency];
    return result;
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const CurrencyButton = ({ 
    code, 
    isSelected, 
    onClick 
  }: { 
    code: keyof ExchangeRates; 
    isSelected: boolean; 
    onClick: () => void;
  }) => {
    const currency = currencies.find(c => c.code === code)!;
    
    return (
      <Button
        onClick={onClick}
        variant={isSelected ? 'default' : 'outline'}
        className={`h-auto py-3 px-4 rounded-xl font-semibold transition-all ${
          isSelected 
            ? 'bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white shadow-lg scale-105' 
            : 'hover:bg-gray-50 hover:scale-105'
        }`}
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-2xl">{currency.flag}</span>
          <span className="text-xs font-bold">{currency.code}</span>
        </div>
      </Button>
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-base font-semibold">Из валюты</Label>
        <div className="grid grid-cols-3 gap-3">
          {currencies.map((currency) => (
            <CurrencyButton
              key={currency.code}
              code={currency.code as keyof ExchangeRates}
              isSelected={fromCurrency === currency.code}
              onClick={() => setFromCurrency(currency.code as keyof ExchangeRates)}
            />
          ))}
        </div>
        
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="h-14 text-2xl font-bold text-center rounded-xl shadow-sm"
          placeholder="Введите сумму"
        />
      </div>

      <div className="flex justify-center">
        <Button
          onClick={swapCurrencies}
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg hover:scale-110 transition-all bg-white"
        >
          <Icon name="ArrowDownUp" size={20} />
        </Button>
      </div>

      <div className="space-y-4">
        <Label className="text-base font-semibold">В валюту</Label>
        <div className="grid grid-cols-3 gap-3">
          {currencies.map((currency) => (
            <CurrencyButton
              key={currency.code}
              code={currency.code as keyof ExchangeRates}
              isSelected={toCurrency === currency.code}
              onClick={() => setToCurrency(currency.code as keyof ExchangeRates)}
            />
          ))}
        </div>
      </div>

      {amount && (
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-none shadow-lg animate-scale-in">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">Результат конвертации</div>
            <div className="text-4xl font-bold text-gray-800 mb-2 font-mono">
              {convert().toLocaleString('ru-RU', { 
                minimumFractionDigits: 2,
                maximumFractionDigits: 2 
              })}
              <span className="text-2xl ml-2">
                {currencies.find(c => c.code === toCurrency)?.symbol}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              {parseFloat(amount).toLocaleString('ru-RU')} {fromCurrency} = {convert().toLocaleString('ru-RU', { maximumFractionDigits: 2 })} {toCurrency}
            </div>
          </div>
        </Card>
      )}

      <Card className="p-4 bg-blue-50 border-none">
        <div className="text-xs text-gray-600 space-y-1">
          <div className="font-semibold mb-2 flex items-center gap-2">
            <Icon name="Info" size={14} />
            Курсы валют (относительно USD)
          </div>
          {currencies.map((currency) => (
            <div key={currency.code} className="flex justify-between">
              <span>{currency.flag} {currency.name}:</span>
              <span className="font-mono font-semibold">
                {currency.code === 'USD' ? '1.00' : rates[currency.code as keyof ExchangeRates].toFixed(2)}
              </span>
            </div>
          ))}
          <div className="text-xs text-gray-500 mt-2 pt-2 border-t">
            * Курсы указаны для примера
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CurrencyConverter;
