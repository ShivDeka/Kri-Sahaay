import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, X, ChevronRight } from 'lucide-react';

const HelpWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 100 });
  const [isDragging, setIsDragging] = useState(false);

  const helpTopics = [
    { title: 'How to get crop recommendations?', desc: 'Ask our AI about your soil and climate' },
    { title: 'Understanding weather data', desc: 'Learn to read weather forecasts' },
    { title: 'Market price insights', desc: 'How to check current crop prices' },
    { title: 'Voice commands', desc: 'Speak to get instant advice' },
    { title: 'Image analysis', desc: 'Take photos of crops for diagnosis' },
  ];

  const handleDrag = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - 25,
      y: e.clientY - 25,
    });
  };

  return (
    <>
      {/* Floating Help Button */}
      <Button
        variant="floating"
        size="floating"
        className="fixed z-50 shadow-2xl border-2 border-white/20"
        style={{ left: position.x, top: position.y }}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseMove={handleDrag}
        onClick={() => !isDragging && setIsOpen(true)}
      >
        <HelpCircle className="w-6 h-6" />
      </Button>

      {/* Help Panel */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-agriculture-earth">
                <HelpCircle className="w-5 h-5 inline mr-2" />
                How can we help?
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground mb-4">
                Get help with using AgriSmart features
              </p>
              
              {helpTopics.map((topic, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer group"
                >
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-agriculture-earth">
                      {topic.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {topic.desc}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-agriculture-green transition-colors" />
                </div>
              ))}

              <div className="pt-4 border-t">
                <Button variant="agriculture" size="sm" className="w-full">
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default HelpWidget;