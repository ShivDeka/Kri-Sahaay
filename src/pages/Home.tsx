import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  MessageCircle, 
  User, 
  TrendingUp, 
  Wheat, 
  CloudRain,
  Lightbulb,
  BarChart3,
  Gift
} from 'lucide-react';
import heroImage from '@/assets/agriculture-hero.jpg';

const Home = () => {
  const navigate = useNavigate();

  const recommendations = [
    { crop: 'Rice', confidence: '95%', season: 'Kharif' },
    { crop: 'Wheat', confidence: '88%', season: 'Rabi' },
    { crop: 'Maize', confidence: '82%', season: 'Both' }
  ];

  const marketData = [
    { crop: 'Rice', price: '₹2,150/quintal', trend: 'up', change: '+5%' },
    { crop: 'Wheat', price: '₹2,025/quintal', trend: 'up', change: '+3%' },
    { crop: 'Onion', price: '₹3,200/quintal', trend: 'down', change: '-8%' }
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header Section */}
      <div 
        className="relative h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        
        {/* Top Navigation */}
        <div className="relative z-10 flex justify-between items-center p-6 pt-8">
          <Button
            variant="ghost"
            size="icon-lg"
            className="bg-white/20 hover:bg-white/30 text-white border border-white/20"
            onClick={() => navigate('/profile')}
          >
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-agriculture-green text-white">
                <User className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
          </Button>

          <Button
            variant="chat"
            size="lg"
            onClick={() => navigate('/chat')}
            className="shadow-xl"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Chat with AI
          </Button>
        </div>

        {/* Weather Info Overlay */}
        <div className="absolute bottom-4 left-6 right-6 z-10">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center">
                  <CloudRain className="w-5 h-5 mr-2" />
                  <div>
                    <p className="text-sm font-medium">Weather Forecast</p>
                    <p className="text-xs opacity-90">Partly cloudy, 28°C</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Humidity: 65%</p>
                  <p className="text-xs opacity-90">Wind: 12 km/h</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6 -mt-4 relative z-10">
        {/* AI Recommendations */}
        <Card className="shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-agriculture-earth">
              <Lightbulb className="w-5 h-5 mr-2 text-agriculture-green" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-agriculture-wheat/30 rounded-lg">
                <div className="flex items-center">
                  <Wheat className="w-4 h-4 mr-3 text-agriculture-green" />
                  <div>
                    <p className="font-medium text-agriculture-soil">{rec.crop}</p>
                    <p className="text-xs text-muted-foreground">{rec.season} Season</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-agriculture-green">{rec.confidence}</p>
                  <p className="text-xs text-muted-foreground">Match</p>
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => navigate('/recommendations')}
            >
              View Detailed Analysis
            </Button>
          </CardContent>
        </Card>

        {/* Market Data */}
        <Card className="shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-agriculture-earth">
              <TrendingUp className="w-5 h-5 mr-2 text-agriculture-gold" />
              Market Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {marketData.map((market, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-agriculture-soil">{market.crop}</p>
                  <p className="text-sm text-agriculture-green font-bold">{market.price}</p>
                </div>
                <div className="text-right">
                  <div className={`flex items-center ${
                    market.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <BarChart3 className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{market.change}</span>
                  </div>
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => navigate('/market')}
            >
              View Market Trends
            </Button>
          </CardContent>
        </Card>

        {/* Government Schemes */}
        <Card className="shadow-lg bg-gradient-to-r from-agriculture-wheat/20 to-agriculture-gold/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-agriculture-earth">
              <Gift className="w-5 h-5 mr-2 text-agriculture-green" />
              Government Schemes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              New subsidies and support programs available
            </p>
            <Button variant="agriculture" size="sm">
              Explore Schemes
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;