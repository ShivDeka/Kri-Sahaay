import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Search,
  Calendar,
  BarChart3,
  MapPin
} from 'lucide-react';

const Market = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const marketData = [
    { 
      crop: 'Rice', 
      price: '₹2,150', 
      unit: 'per quintal',
      trend: 'up', 
      change: '+5%',
      volume: '2,345 tons',
      location: 'Muzaffarnagar Mandi'
    },
    { 
      crop: 'Wheat', 
      price: '₹2,025', 
      unit: 'per quintal',
      trend: 'up', 
      change: '+3%',
      volume: '1,876 tons',
      location: 'Shamli Mandi'
    },
    { 
      crop: 'Sugarcane', 
      price: '₹350', 
      unit: 'per quintal',
      trend: 'down', 
      change: '-2%',
      volume: '5,678 tons',
      location: 'Baghpat Mandi'
    },
    { 
      crop: 'Onion', 
      price: '₹3,200', 
      unit: 'per quintal',
      trend: 'down', 
      change: '-8%',
      volume: '892 tons',
      location: 'Saharanpur Mandi'
    },
    { 
      crop: 'Potato', 
      price: '₹1,850', 
      unit: 'per quintal',
      trend: 'up', 
      change: '+12%',
      volume: '1,234 tons',
      location: 'Meerut Mandi'
    },
    { 
      crop: 'Mustard', 
      price: '₹5,450', 
      unit: 'per quintal',
      trend: 'up', 
      change: '+7%',
      volume: '456 tons',
      location: 'Muzaffarnagar Mandi'
    }
  ];

  const filteredData = marketData.filter(item =>
    item.crop.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const topGainers = marketData
    .filter(item => item.trend === 'up')
    .sort((a, b) => parseFloat(b.change) - parseFloat(a.change))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="flex items-center p-4 bg-white shadow-sm border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/home')}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-semibold text-agriculture-earth ml-4">Market Prices</h1>
      </div>

      <div className="p-6 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search crops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        {/* Market Summary */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-700">{topGainers.length}</p>
              <p className="text-sm text-green-600">Crops Rising</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
            <CardContent className="p-4 text-center">
              <Calendar className="w-8 h-8 text-amber-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-amber-700">Today</p>
              <p className="text-sm text-amber-600">Live Prices</p>
            </CardContent>
          </Card>
        </div>

        {/* Top Gainers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-agriculture-earth">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Top Gainers Today
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topGainers.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <p className="font-semibold text-agriculture-soil">{item.crop}</p>
                  <p className="text-sm text-muted-foreground">{item.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-agriculture-earth">{item.price}</p>
                  <p className="text-sm text-green-600 font-medium">{item.change}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* All Market Prices */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-agriculture-earth">
              <BarChart3 className="w-5 h-5 mr-2 text-agriculture-gold" />
              All Crop Prices
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredData.map((item, index) => (
              <div key={index} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-agriculture-earth">{item.crop}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {item.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-agriculture-soil">
                      {item.price}
                      <span className="text-sm font-normal text-muted-foreground ml-1">
                        {item.unit}
                      </span>
                    </p>
                    <div className={`flex items-center justify-end mt-1 ${
                      item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      <span className="text-sm font-medium">{item.change}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm text-muted-foreground border-t pt-3">
                  <span>Volume: {item.volume}</span>
                  <span>Updated: 2 hrs ago</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Market Insights */}
        <Card className="bg-gradient-to-r from-agriculture-wheat/20 to-agriculture-gold/20">
          <CardHeader>
            <CardTitle className="text-agriculture-earth">Market Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm">
                🌾 <strong>Rice prices</strong> are up 5% due to good export demand
              </p>
              <p className="text-sm">
                🥔 <strong>Potato prices</strong> surged 12% after supply shortage reports
              </p>
              <p className="text-sm">
                🧅 <strong>Onion prices</strong> dropped 8% following increased arrivals
              </p>
            </div>
            
            <Button variant="outline" size="sm" className="mt-4">
              View Detailed Analysis
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Market;