
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, SendHorizontal, X, Image, Paperclip } from "lucide-react";
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: Date;
  read: boolean;
  senderName: string;
  senderAvatar?: string;
  isAttachment?: boolean;
  attachmentUrl?: string;
}

interface ChatInterfaceProps {
  chefId: string;
  chefName: string;
  chefAvatar?: string;
  onClose: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  chefId, 
  chefName, 
  chefAvatar, 
  onClose 
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock user data - in a real app, this would come from auth context
  const currentUserId = "user-123";
  const currentUserName = "Cliente";

  // Simulate loading previous messages
  useEffect(() => {
    // In a real app, you would fetch messages from your backend
    const mockMessages: Message[] = [
      {
        id: "msg-1",
        senderId: chefId,
        recipientId: currentUserId,
        content: `${t('chefGreeting')}`,
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        read: true,
        senderName: chefName
      }
    ];
    
    setMessages(mockMessages);
  }, [chefId, chefName, t]);

  // Auto-scroll to the latest message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAttachmentUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Simulate attachment upload
    toast({
      title: t('uploadingFile'),
      description: file.name,
    });

    // Create a mock URL for the uploaded file
    const fileUrl = URL.createObjectURL(file);
    
    setTimeout(() => {
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        senderId: currentUserId,
        recipientId: chefId,
        content: file.name,
        timestamp: new Date(),
        read: false,
        senderName: currentUserName,
        isAttachment: true,
        attachmentUrl: fileUrl
      };
  
      setMessages([...messages, newMessage]);
      
      toast({
        title: t('fileUploaded'),
        description: file.name,
      });

      // Simulate chef response after 2 seconds
      simulateChefResponse(t('fileReceivedResponse'));
    }, 1500);
  };

  const simulateChefResponse = (content: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      const chefResponse: Message = {
        id: `msg-${Date.now() + 1}`,
        senderId: chefId,
        recipientId: currentUserId,
        content,
        timestamp: new Date(),
        read: false,
        senderName: chefName,
        senderAvatar: chefAvatar
      };
      
      setMessages(prev => [...prev, chefResponse]);
      
      toast({
        title: `${chefName} ${t("sendMessage")}`,
        description: t("newMessageReceived"),
      });
    }, 2000);
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUserId,
      recipientId: chefId,
      content: messageText,
      timestamp: new Date(),
      read: false,
      senderName: currentUserName
    };

    setMessages([...messages, newMessage]);
    setMessageText("");

    // Simulate chef response
    simulateChefResponse(t('chefResponse'));
  };

  // Animation variants
  const bubbleVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 12 }
    }
  };

  const typingBubbleVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 }
  };

  // Fixed typingDotVariants to use proper Framer Motion format
  const typingDotVariants = {
    initial: { y: 0 },
    animate: { 
      y: [0, -5, 0]
    },
    transition: { 
      repeat: Infinity, 
      duration: 0.5,
      repeatType: "loop",
      ease: "easeInOut",
      times: [0, 0.5, 1],
      delay: (custom: number) => custom * 0.2
    }
  };

  return (
    <Card className="w-full max-w-md h-[500px] flex flex-col shadow-lg">
      <CardHeader className="pb-3 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src={chefAvatar} alt={chefName} />
              <AvatarFallback className="bg-platemate-orange text-white">
                {chefName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-lg">{chefName}</CardTitle>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="h-8 w-8"
          >
            <X size={18} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-y-auto py-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400 text-center px-4">
            <p>{t("noMessages")}</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <motion.div 
              key={message.id}
              className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
              variants={bubbleVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              <div 
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.senderId === currentUserId 
                    ? 'bg-platemate-orange text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.isAttachment ? (
                  <div className="flex flex-col">
                    <div className="flex items-center mb-2">
                      <Image size={16} className="mr-2" />
                      <span className="text-sm font-medium">{message.content}</span>
                    </div>
                    <img 
                      src={message.attachmentUrl} 
                      alt={message.content}
                      className="rounded max-h-32 w-auto object-contain"
                    />
                  </div>
                ) : (
                  <p className="text-sm">{message.content}</p>
                )}
                <p className="text-xs opacity-70 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))
        )}
        
        {isTyping && (
          <motion.div 
            className="flex justify-start"
            variants={typingBubbleVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="bg-gray-100 rounded-lg px-4 py-2 flex items-center space-x-1">
              {[0, 1, 2].map((dot) => (
                <motion.div
                  key={dot}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 0.5,
                    repeatType: "loop",
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                    delay: dot * 0.2
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
        
        <div ref={messageEndRef} />
      </CardContent>
      
      <CardFooter className="border-t p-3">
        <div className="flex w-full gap-2">
          <input 
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleAttachmentUpload}
            className="flex-shrink-0"
          >
            <Paperclip size={18} className="text-platemate-orange" />
          </Button>
          <Input
            placeholder={t("typeMessage")}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-grow"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
            className="bg-platemate-orange hover:bg-platemate-orange/90 flex-shrink-0"
          >
            <SendHorizontal size={18} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatInterface;
