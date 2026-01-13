import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const Index = () => {
  const [amount, setAmount] = useState(100000);
  const [months, setMonths] = useState(12);
  const [displayAmount, setDisplayAmount] = useState(100000);
  const [displayMonths, setDisplayMonths] = useState(12);
  const [isAnimating, setIsAnimating] = useState(false);
  const interestRate = 0.18;

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    
    const animationDuration = 200;
    const steps = 20;
    const amountStep = (amount - displayAmount) / steps;
    const monthsStep = (months - displayMonths) / steps;
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setDisplayAmount(prev => prev + amountStep);
        setDisplayMonths(prev => prev + monthsStep);
      } else {
        setDisplayAmount(amount);
        setDisplayMonths(months);
        clearInterval(interval);
      }
    }, animationDuration / steps);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [amount, months]);

  const calculateMonthlyPayment = () => {
    const monthlyRate = interestRate / 12;
    const payment = displayAmount * (monthlyRate * Math.pow(1 + monthlyRate, displayMonths)) / 
                    (Math.pow(1 + monthlyRate, displayMonths) - 1);
    return payment;
  };

  const getEndDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + Math.round(displayMonths));
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ru-RU').format(Math.round(num));
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-3 sm:p-4">
      <Card className="w-full max-w-md sm:max-w-2xl bg-gradient-to-br from-[#FFB84D] to-[#F5A623] p-6 sm:p-8 md:p-12 rounded-3xl sm:rounded-[2.5rem] shadow-2xl border-none">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 md:mb-12 leading-tight">
          Выберите сумму и срок
        </h1>

        <div className="space-y-6 sm:space-y-8 md:space-y-12">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex justify-between items-baseline gap-2">
              <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">Сумма</span>
              <span className={`text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 transition-all duration-300 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
                {formatNumber(Math.round(displayAmount))} ₽
              </span>
            </div>
            
            <Slider
              value={[amount]}
              onValueChange={(value) => setAmount(value[0])}
              min={1000}
              max={100000}
              step={1000}
              className="py-3 sm:py-4 touch-manipulation transition-all duration-200"
            />
            
            <div className="flex justify-between text-base sm:text-lg md:text-xl text-gray-700 opacity-75">
              <span>1 000 ₽</span>
              <span className="hidden xs:inline">50 000 ₽</span>
              <span>100 000 ₽</span>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex justify-between items-baseline gap-2">
              <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">Срок</span>
              <span className={`text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 transition-all duration-300 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
                {Math.round(displayMonths)} {Math.round(displayMonths) === 1 ? 'месяц' : Math.round(displayMonths) < 5 ? 'месяца' : 'месяцев'}
              </span>
            </div>
            
            <Slider
              value={[months]}
              onValueChange={(value) => setMonths(value[0])}
              min={1}
              max={12}
              step={1}
              className="py-3 sm:py-4 touch-manipulation transition-all duration-200"
            />
            
            <div className="flex justify-between text-base sm:text-lg md:text-xl text-gray-700 opacity-75">
              <span>1 месяц</span>
              <span>12 месяцев</span>
            </div>
          </div>

          <div className="space-y-2.5 sm:space-y-3 text-base sm:text-lg md:text-xl text-gray-800 pt-2 sm:pt-4">
            <div className="flex justify-between items-center gap-2">
              <span className="opacity-75">Вы берете:</span>
              <span className={`font-bold transition-all duration-300 ${isAnimating ? 'scale-105' : 'scale-100'}`}>
                {formatNumber(Math.round(displayAmount))} ₽
              </span>
            </div>
            <div className="flex justify-between items-center gap-2">
              <span className="opacity-75 text-sm sm:text-base md:text-xl">До:</span>
              <span className={`font-bold text-sm sm:text-base md:text-xl transition-all duration-300 ${isAnimating ? 'scale-105' : 'scale-100'}`}>
                {getEndDate()}
              </span>
            </div>
            <div className="flex justify-between items-center gap-2">
              <span className="opacity-75 text-sm sm:text-base md:text-xl">Платеж/мес:</span>
              <span className={`font-bold text-sm sm:text-base md:text-xl transition-all duration-300 ${isAnimating ? 'scale-105' : 'scale-100'}`}>
                {formatNumber(calculateMonthlyPayment())} ₽
              </span>
            </div>
          </div>

          <Button 
            className="w-full h-14 sm:h-16 md:h-20 text-xl sm:text-2xl md:text-3xl font-bold bg-[#6B46C1] hover:bg-[#5A3BA8] text-white rounded-2xl sm:rounded-3xl shadow-xl transition-all active:scale-[0.98] touch-manipulation"
          >
            Получить займ
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Index;