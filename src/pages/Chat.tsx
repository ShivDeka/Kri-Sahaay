import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Send, 
  Mic, 
  Camera, 
  Save,
  Bot,
  User,
  CloudRain,
  Thermometer
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  imageUrl?: string;
}

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AgriSmart AI assistant. I can help you with crop recommendations, weather advice, and market insights. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('weather')) {
      return 'Based on current weather data, expect partly cloudy conditions with 28°C temperature. Humidity is at 65%. Good conditions for most crops. Would you like specific advice for your crops?';
    } else if (input.includes('crop') || input.includes('plant')) {
      return 'For your region and current season, I recommend Rice (95% match) or Wheat (88% match). These crops suit your soil type and climate conditions. Would you like detailed planting guidance?';
    } else if (input.includes('market') || input.includes('price')) {
      return 'Current market rates: Rice ₹2,150/quintal (+5%), Wheat ₹2,025/quintal (+3%). Prices are trending upward. Good time to sell rice. Need specific crop pricing?';
    } else if (input.includes('soil')) {
      return 'Your soil analysis shows pH 6.8 (optimal), good nitrogen levels, moderate phosphorus. Perfect for cereal crops. Consider organic fertilizer for better yield. Want soil improvement tips?';
    } else {
      return 'I understand you need farming advice. I can help with crops, weather, market prices, soil analysis, and more. Could you be more specific about what you\'d like to know?';
    }
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    // In real app, implement voice recording functionality
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setInputValue('What crops should I plant this season?');
      }, 2000);
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In real app, process and upload image
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: 'Uploaded an image for analysis',
        timestamp: new Date(),
        imageUrl: URL.createObjectURL(file)
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: 'I can see your crop image. The plants look healthy with good green color. I notice some minor leaf spotting which might indicate early nutrient deficiency. Consider applying nitrogen-rich fertilizer. Monitor for 1 week.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1500);
    }
  };

  const saveConversation = () => {
    // In real app, save to backend or local storage
    alert('Conversation saved successfully!');
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white shadow-sm border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/home')}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <div className="flex items-center">
          <Bot className="w-6 h-6 text-agriculture-green mr-2" />
          <h1 className="text-lg font-semibold text-agriculture-earth">AI Assistant</h1>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={saveConversation}
        >
          <Save className="w-4 h-4 mr-1" />
          Save
        </Button>
      </div>

      {/* Weather & Soil Info Cards */}
      <div className="p-4 bg-muted/30 border-b">
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3">
              <div className="flex items-center text-blue-700">
                <CloudRain className="w-4 h-4 mr-2" />
                <div>
                  <p className="text-xs font-medium">Weather</p>
                  <p className="text-sm">28°C, Humid</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-3">
              <div className="flex items-center text-amber-700">
                <Thermometer className="w-4 h-4 mr-2" />
                <div>
                  <p className="text-xs font-medium">Soil pH</p>
                  <p className="text-sm">6.8 (Good)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-[80%] ${
              message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}>
              <Avatar className="w-8 h-8 mt-1">
                <AvatarFallback className={
                  message.type === 'user' 
                    ? 'bg-agriculture-green text-white' 
                    : 'bg-agriculture-gold text-agriculture-soil'
                }>
                  {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </AvatarFallback>
              </Avatar>
              
              <div className={`rounded-2xl p-3 ${
                message.type === 'user'
                  ? 'bg-agriculture-green text-white'
                  : 'bg-white border border-border shadow-sm'
              }`}>
                {message.imageUrl && (
                  <img 
                    src={message.imageUrl} 
                    alt="Uploaded" 
                    className="w-full rounded-lg mb-2 max-h-40 object-cover"
                  />
                )}
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.type === 'user' ? 'text-white/70' : 'text-muted-foreground'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="p-4 bg-white border-t">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about crops, weather, market prices..."
              className="pr-20 h-12 bg-muted/50"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className={isRecording ? 'text-red-500 animate-pulse' : ''}
                onClick={handleVoiceRecord}
              >
                <Mic className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleImageUpload}
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            variant="agriculture"
            size="icon-lg"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        
        {isRecording && (
          <div className="mt-2 flex items-center justify-center text-red-500 text-sm">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2" />
            Recording... Tap mic again to stop
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;