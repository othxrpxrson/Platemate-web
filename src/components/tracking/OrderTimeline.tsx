
import { Check } from "lucide-react";

interface TimelineStep {
  id: string;
  label: string;
  completed: boolean;
  time: string | null;
}

interface OrderTimelineProps {
  steps: TimelineStep[];
}

const OrderTimeline = ({ steps }: OrderTimelineProps) => {
  const currentStepIndex = steps.findIndex(step => !step.completed);
  
  return (
    <div className="relative">
      <div className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-gray-200 z-0"></div>
      
      <div className="space-y-6 relative z-10">
        {steps.map((step, index) => {
          const isActive = currentStepIndex === index;
          const isPast = index < currentStepIndex || step.completed;
          
          return (
            <div key={step.id} className="flex items-start">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                ${isPast 
                  ? 'bg-green-100 text-green-600' 
                  : isActive 
                    ? 'bg-platemate-orange/20 text-platemate-orange' 
                    : 'bg-gray-100 text-gray-400'}
              `}>
                {isPast ? <Check size={16} /> : index + 1}
              </div>
              
              <div className="ml-4">
                <h3 className={`font-medium ${isActive ? 'text-platemate-orange' : isPast ? 'text-platemate-brown' : 'text-gray-500'}`}>
                  {step.label}
                </h3>
                
                {step.time && (
                  <p className="text-sm text-gray-500">{step.time}</p>
                )}
                
                {isActive && !step.time && (
                  <div className="flex space-x-1 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-platemate-orange animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-platemate-orange animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-platemate-orange animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTimeline;
