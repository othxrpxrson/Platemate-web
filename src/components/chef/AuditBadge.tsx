
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Award, Shield, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface AuditBadgeProps {
  lastAuditDate?: string; // ISO date string
  status: 'approved' | 'pending' | 'failed';
  size?: 'sm' | 'md' | 'lg';
}

const AuditBadge: React.FC<AuditBadgeProps> = ({ 
  lastAuditDate = '', 
  status,
  size = 'md'
}) => {
  const { t } = useLanguage();
  
  // Format date
  const formattedDate = lastAuditDate 
    ? new Date(lastAuditDate).toLocaleDateString()
    : '';
  
  // Badge style based on status
  const badgeStyle = {
    approved: {
      className: 'bg-green-100 text-green-800 hover:bg-green-200',
      icon: <Award size={size === 'sm' ? 14 : 16} className="mr-1 text-green-600" />
    },
    pending: {
      className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
      icon: <Shield size={size === 'sm' ? 14 : 16} className="mr-1 text-yellow-600" />
    },
    failed: {
      className: 'bg-red-100 text-red-800 hover:bg-red-200',
      icon: <AlertCircle size={size === 'sm' ? 14 : 16} className="mr-1 text-red-600" />
    }
  };

  const { className, icon } = badgeStyle[status];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className={`${className} cursor-help ${size === 'sm' ? 'text-xs py-0' : 'text-sm'}`}>
            {icon}
            {size !== 'sm' && `${t('lastAudit')}: ${formattedDate}`}
            {size === 'sm' && formattedDate}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('lastAudit')}: {formattedDate}</p>
          <p>{status === 'approved' ? t('approved') : status === 'pending' ? 'Pendiente' : 'No aprobada'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AuditBadge;
