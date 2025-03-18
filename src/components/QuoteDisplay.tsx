
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";

const quotes = [
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
  { text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.", author: "Malcolm X" },
  { text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.", author: "Dr. Seuss" },
  { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
  { text: "The only person who is educated is the one who has learned how to learn and change.", author: "Carl Rogers" }
];

const QuoteDisplay: React.FC = () => {
  const [quote, setQuote] = useState(quotes[0]);
  
  useEffect(() => {
    // Select a random quote on component mount
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);
  
  return (
    <Card className="bg-gradient-to-r from-brand-50 to-white border-brand-100 mb-6">
      <CardContent className="p-6">
        <p className="text-lg italic text-gray-700 mb-2">"{quote.text}"</p>
        <p className="text-right text-sm text-gray-500">— {quote.author}</p>
      </CardContent>
    </Card>
  );
};

export default QuoteDisplay;
