
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/context/LanguageContext';
import { CreditCard, Wallet, Banknote } from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  details?: React.ReactNode;
}

interface PaymentMethodSelectorProps {
  onSelect: (methodId: string) => void;
  defaultMethod?: string;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  onSelect,
  defaultMethod = 'credit-card'
}) => {
  const [selectedMethod, setSelectedMethod] = useState(defaultMethod);
  const { t } = useLanguage();
  
  const handleMethodChange = (value: string) => {
    setSelectedMethod(value);
    onSelect(value);
  };
  
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'credit-card',
      name: t('creditCard'),
      icon: <CreditCard className="text-blue-600" size={20} />,
      details: (
        <div className="mt-2 grid grid-cols-2 gap-2">
          <input 
            type="text" 
            placeholder="Número de tarjeta"
            className="col-span-2 p-2 border rounded text-sm"
          />
          <input 
            type="text" 
            placeholder="MM/AA"
            className="p-2 border rounded text-sm"
          />
          <input 
            type="text" 
            placeholder="CVC"
            className="p-2 border rounded text-sm"
          />
        </div>
      )
    },
    {
      id: 'yape',
      name: t('yape'),
      icon: (
        <div className="bg-purple-100 w-5 h-5 rounded-full flex items-center justify-center">
          <span className="text-purple-700 text-xs font-bold">Y</span>
        </div>
      ),
      details: (
        <div className="mt-2 flex items-center justify-between bg-purple-50 p-2 rounded">
          <div>
            <p className="text-sm text-purple-700">Yape al número:</p>
            <p className="font-semibold text-purple-800">+51 999 888 777</p>
          </div>
          <div className="bg-white p-2 rounded">
            <div className="w-16 h-16 bg-gray-200 flex items-center justify-center">
              <span className="text-xs text-gray-500">Código QR</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'plin',
      name: t('plin'),
      icon: (
        <div className="bg-green-100 w-5 h-5 rounded-full flex items-center justify-center">
          <span className="text-green-700 text-xs font-bold">P</span>
        </div>
      ),
      details: (
        <div className="mt-2 flex items-center justify-between bg-green-50 p-2 rounded">
          <div>
            <p className="text-sm text-green-700">Plin al número:</p>
            <p className="font-semibold text-green-800">+51 999 888 777</p>
          </div>
          <div className="bg-white p-2 rounded">
            <div className="w-16 h-16 bg-gray-200 flex items-center justify-center">
              <span className="text-xs text-gray-500">Código QR</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'cash',
      name: t('cash'),
      icon: <Banknote className="text-green-600" size={20} />,
      details: (
        <div className="mt-2 bg-green-50 p-2 rounded">
          <p className="text-sm text-green-700">Paga en efectivo al recibir tu pedido</p>
        </div>
      )
    }
  ];

  return (
    <div>
      <h3 className="font-medium text-platemate-brown mb-4">{t('paymentMethods')}</h3>
      
      <RadioGroup 
        value={selectedMethod} 
        onValueChange={handleMethodChange}
        className="space-y-3"
      >
        {paymentMethods.map((method) => (
          <div key={method.id}>
            <Card className={`border transition-colors ${
              selectedMethod === method.id ? 'border-platemate-orange' : 'border-gray-200'
            }`}>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <RadioGroupItem 
                    value={method.id} 
                    id={method.id}
                    className="text-platemate-orange"
                  />
                  <Label 
                    htmlFor={method.id} 
                    className="flex items-center ml-2 cursor-pointer"
                  >
                    <span className="mr-2">{method.icon}</span>
                    <span>{method.name}</span>
                  </Label>
                </div>
                
                {selectedMethod === method.id && method.details}
              </CardContent>
            </Card>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default PaymentMethodSelector;
