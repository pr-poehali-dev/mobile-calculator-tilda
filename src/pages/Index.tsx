import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import BasicCalculator from '@/components/calculators/BasicCalculator';
import PercentCalculator from '@/components/calculators/PercentCalculator';
import CurrencyConverter from '@/components/calculators/CurrencyConverter';

const Index = () => {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] py-8 px-4">
      <div className="container max-w-2xl mx-auto animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-3">
            Калькулятор
          </h1>
          <p className="text-white/90 text-lg">
            Многофункциональный калькулятор для всех случаев
          </p>
        </div>

        <Card className="p-6 shadow-2xl rounded-3xl backdrop-blur-sm bg-white/95 animate-scale-in">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6 bg-muted/50 p-1 rounded-2xl">
              <TabsTrigger 
                value="basic" 
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md transition-all"
              >
                <Icon name="Calculator" size={18} className="mr-2" />
                <span className="hidden sm:inline">Калькулятор</span>
                <span className="sm:hidden">Калк.</span>
              </TabsTrigger>
              <TabsTrigger 
                value="percent"
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md transition-all"
              >
                <Icon name="Percent" size={18} className="mr-2" />
                <span className="hidden sm:inline">Проценты</span>
                <span className="sm:hidden">%</span>
              </TabsTrigger>
              <TabsTrigger 
                value="currency"
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-md transition-all"
              >
                <Icon name="Coins" size={18} className="mr-2" />
                <span className="hidden sm:inline">Валюты</span>
                <span className="sm:hidden">₽$€</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="mt-0">
              <BasicCalculator />
            </TabsContent>

            <TabsContent value="percent" className="mt-0">
              <PercentCalculator />
            </TabsContent>

            <TabsContent value="currency" className="mt-0">
              <CurrencyConverter />
            </TabsContent>
          </Tabs>
        </Card>

        <div className="mt-6 text-center text-white/80 text-sm">
          <p>© 2026 Калькулятор · Сделано с ❤️</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
